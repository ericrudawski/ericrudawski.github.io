// A dot-matrix globe on a plain 2D canvas: land drawn as halftone dots that swell toward the viewer, in the page's ink
// and accent colours. Drag to rotate (with inertia), pins are clickable, and the page keeps scrolling over it, because
// it never takes the wheel. No WebGL and no dependencies; pauses off-screen. Modeled on the Tall Street Journal globe.
// A pin with `photos` wears the first as a small framed print: one ink until it is hovered or selected, like the page's.
const TAU = Math.PI * 2, RAD = Math.PI / 180;

export function mountGlobe(canvas, { dots, pins, onSelect, signal }) {
  const ctx = canvas.getContext("2d");
  const n = dots.length / 2, sinP = new Float32Array(n), cosP = new Float32Array(n), lam = new Float32Array(n);
  for (let i = 0; i < n; i++) { const p = dots[i * 2] * RAD; sinP[i] = Math.sin(p); cosP[i] = Math.cos(p); lam[i] = dots[i * 2 + 1] * RAD; }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0, dpr = 1, R = 0, cx = 0, cy = 0;
  let lam0 = -40, phi0 = 28, vx = 0, vy = 0, dragging = false, moved = 0, last = null, tween = null;
  let held = false, autoAt = reduce ? Infinity : 0, hover = -1, selected = -1, raf = 0, visible = false, prev = 0, pal = null, palT = 0;

  // Each photo is cut square once, in color and in one ink, so drawing it every frame costs little.
  const THUMB = 112, prints = pins.map(() => null);
  pins.forEach((pin, i) => {
    const src = pin.photos?.[0]?.src; if (!src) return;
    const im = new Image(); im.crossOrigin = "anonymous";
    im.onload = () => {
      if (signal?.aborted) return;
      const s = Math.min(im.naturalWidth, im.naturalHeight), cut = () => { const c = document.createElement("canvas"); c.width = c.height = THUMB; c.getContext("2d").drawImage(im, (im.naturalWidth - s) / 2, (im.naturalHeight - s) / 2, s, s, 0, 0, THUMB, THUMB); return c; };
      const color = cut(), ink = cut(), x = ink.getContext("2d"), d = x.getImageData(0, 0, THUMB, THUMB), p = d.data;
      for (let k = 0; k < p.length; k += 4) p[k] = p[k + 1] = p[k + 2] = Math.min(255, (p[k] * .3 + p[k + 1] * .59 + p[k + 2] * .11) * 1.06);
      x.putImageData(d, 0, 0); prints[i] = { color, ink }; if (W) draw(performance.now());
    };
    im.src = src;
  });
  // Prints that would overlap fan out sideways, so pins close together (San Francisco and Yosemite) both stay visible.
  // A hovered or selected print grows from where it stands, so its neighbours do not jump.
  let frames = {};
  const placeFrames = (list) => {
    const k = Math.max(.72, Math.min(1, R / 240)), s0 = 36 * k, room = s0 + 6;
    const boxes = list.map(({ i, q }) => ({ i, cx: q.x, bottom: q.y - 9 })).sort((a, b) => a.cx - b.cx);
    for (let pass = 0; pass < 4; pass++) for (let a = 0; a < boxes.length - 1; a++) { const A = boxes[a], B = boxes[a + 1]; if (Math.abs(A.bottom - B.bottom) < room && B.cx - A.cx < room) { const push = (room - (B.cx - A.cx)) / 2; A.cx -= push; B.cx += push; } }
    frames = {};
    boxes.forEach(({ i, cx, bottom }) => { const s = (i === selected || i === hover ? 56 : 36) * k; frames[i] = { x: Math.max(1, Math.min(W - s - 4, cx - s / 2)), y: Math.max(1, bottom - s), s }; });
  };
  const drawPrint = (i, q, on) => {
    const f = frames[i], pr = prints[i], mat = 2.5;
    ctx.globalAlpha = Math.min(1, q.z / .22);
    ctx.strokeStyle = pal.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(f.x + f.s / 2, f.y + f.s); ctx.stroke();
    ctx.fillStyle = pal.ink; ctx.fillRect(f.x + 3, f.y + 3, f.s, f.s);
    ctx.fillStyle = "#efebe4"; ctx.fillRect(f.x, f.y, f.s, f.s);
    ctx.drawImage(on ? pr.color : pr.ink, f.x + mat, f.y + mat, f.s - mat * 2, f.s - mat * 2);
    ctx.strokeStyle = pal.ink; ctx.strokeRect(f.x + .5, f.y + .5, f.s - 1, f.s - 1);
    ctx.globalAlpha = 1;
  };

  const size = () => { const w = canvas.getBoundingClientRect().width; if (!w) return; W = w; dpr = Math.min(2, devicePixelRatio || 1); canvas.width = Math.round(W * dpr); canvas.height = Math.round(W * dpr); R = W / 2 - 9; cx = W / 2 - 3; cy = W / 2 - 3; };
  const palette = () => { const cs = getComputedStyle(canvas), v = (k) => cs.getPropertyValue(k).trim(); return { ink: v("--ink"), disc: v("--paper2"), rule: v("--rule"), accent: v("--accent"), paper: v("--paper") }; };
  const project = (latDeg, lonDeg) => {
    const p = latDeg * RAD, d = (lonDeg - lam0) * RAD, s0 = Math.sin(phi0 * RAD), c0 = Math.cos(phi0 * RAD), sp = Math.sin(p), cp = Math.cos(p), cd = Math.cos(d);
    return { x: cx + R * cp * Math.sin(d), y: cy - R * (c0 * sp - s0 * cp * cd), z: s0 * sp + c0 * cp * cd };
  };
  const line = (pts) => { let pen = false; for (const [a, b] of pts) { const q = project(a, b); if (q.z > 0) { if (pen) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); pen = true; } else pen = false; } };

  const draw = (now) => {
    if (!W) return;
    if (!pal || now - palT > 400) { pal = palette(); palT = now; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, W);
    ctx.fillStyle = pal.ink; ctx.beginPath(); ctx.arc(cx + 5, cy + 5, R, 0, TAU); ctx.fill();
    ctx.fillStyle = pal.disc; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
    ctx.strokeStyle = pal.rule; ctx.lineWidth = 1; ctx.beginPath();
    for (let l = -180; l < 180; l += 30) { const a = []; for (let p = -90; p <= 90; p += 6) a.push([p, l]); line(a); }
    for (let p = -60; p <= 60; p += 30) { const a = []; for (let l = -180; l <= 180; l += 6) a.push([p, l]); line(a); }
    ctx.stroke();
    const s0 = Math.sin(phi0 * RAD), c0 = Math.cos(phi0 * RAD), l0 = lam0 * RAD, k = R / 250;
    ctx.fillStyle = pal.ink; ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const d = lam[i] - l0, cd = Math.cos(d), z = s0 * sinP[i] + c0 * cosP[i] * cd;
      if (z <= 0.02) continue;
      const x = cx + R * cosP[i] * Math.sin(d), y = cy - R * (c0 * sinP[i] - s0 * cosP[i] * cd), r = k * (0.3 + 1.15 * z);
      ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, TAU);
    }
    ctx.fill();
    ctx.strokeStyle = pal.ink; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
    let label = null;
    pins.forEach((pin, i) => {
      const q = project(pin.lat, pin.lng); if (q.z <= 0.04) return;
      const on = i === selected || i === hover;
      if (i === selected && !reduce) { const t = (now % 1800) / 1800; ctx.strokeStyle = pal.accent; ctx.globalAlpha = 1 - t; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(q.x, q.y, 6 + 15 * t, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.fillStyle = pal.accent; ctx.strokeStyle = pal.paper; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(q.x, q.y, on ? 6 : 4.5, 0, TAU); ctx.fill(); ctx.stroke();
      if (on && (i === hover || !label)) label = { q, text: pin.place, below: !!prints[i] };
    });
    const showing = pins.map((pin, i) => ({ i, q: project(pin.lat, pin.lng) })).filter(({ i, q }) => prints[i] && q.z > 0.04);
    placeFrames(showing);
    showing.sort((a, b) => (a.i === hover || a.i === selected) - (b.i === hover || b.i === selected)).forEach(({ i, q }) => drawPrint(i, q, i === selected || i === hover));
    if (label) {
      ctx.font = '700 12px "Courier Prime", "Courier New", monospace'; ctx.textBaseline = "middle"; ctx.textAlign = "left";
      const text = label.text.toUpperCase(), tw = ctx.measureText(text).width + 14, x = Math.min(W - tw - 4, Math.max(4, label.q.x + 11)), y = label.below ? label.q.y + 7 : Math.max(4, label.q.y - 11);
      ctx.fillStyle = pal.paper; ctx.fillRect(x, y, tw, 22); ctx.strokeStyle = pal.ink; ctx.lineWidth = 1; ctx.strokeRect(x + .5, y + .5, tw - 1, 21); ctx.fillStyle = pal.ink; ctx.fillText(text, x + 7, y + 11.5);
    }
  };

  // What moves the globe this frame: one answer, worked out here from the turn in progress, the hold, the pointer and the speed, in that order.
  // A turn to a pin wins over a hold, a hold over a drag, and left alone the globe coasts, then waits, then spins on its own.
  const Motion = Object.freeze({ TURN: "turn", HELD: "held", DRAG: "drag", COAST: "coast", SPIN: "spin", WAIT: "wait" });
  const motion = (now) => tween ? Motion.TURN : held ? Motion.HELD : dragging ? Motion.DRAG : Math.abs(vx) + Math.abs(vy) > .01 ? Motion.COAST : now > autoAt ? Motion.SPIN : Motion.WAIT;
  const step = (now) => {
    raf = 0; if (signal?.aborted || !visible) return;
    const dt = Math.min(50, now - (prev || now)); prev = now;
    switch (motion(now)) {
      case Motion.TURN: {
        const u = Math.min(1, (now - tween.t0) / tween.ms), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        lam0 = tween.l0 + tween.dl * e; phi0 = tween.p0 + tween.dp * e; if (u >= 1) tween = null;
        break;
      }
      case Motion.HELD: vx = vy = 0; break;
      case Motion.COAST: lam0 -= vx * dt; phi0 = Math.max(-75, Math.min(75, phi0 + vy * dt)); vx *= .94; vy *= .94; break;
      case Motion.SPIN: lam0 -= dt * .005; break;
      // DRAG: the pointer handler turns it. WAIT: nothing does, until autoAt.
    }
    draw(now); raf = requestAnimationFrame(step);
  };
  const kick = () => { if (!raf && visible && !signal?.aborted) { prev = 0; raf = requestAnimationFrame(step); } };

  const hit = (e) => { const r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; let best = -1, bd = 15; pins.forEach((pin, i) => { const q = project(pin.lat, pin.lng); if (q.z <= .04) return; if (frames[i]) { const f = frames[i]; if (x >= f.x && x <= f.x + f.s && y >= f.y && y <= f.y + f.s) { best = i; bd = 0; return; } } const d = Math.hypot(q.x - x, q.y - y); if (d < bd) { bd = d; best = i; } }); return best; };
  const opts = { signal };
  canvas.addEventListener("pointerdown", (e) => { dragging = true; moved = 0; tween = null; vx = vy = 0; last = { x: e.clientX, y: e.clientY, t: performance.now() }; autoAt = reduce ? Infinity : performance.now() + 9000; try { canvas.setPointerCapture(e.pointerId); } catch {} canvas.classList.add("grabbing"); }, opts);
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) { const h = hit(e); if (h !== hover) { hover = h; canvas.style.cursor = h >= 0 ? "pointer" : ""; if (!raf && W) draw(performance.now()); } return; }
    const now = performance.now(), dx = e.clientX - last.x, dy = e.clientY - last.y, dtm = Math.max(1, now - last.t), kk = 90 / Math.max(1, R);
    moved += Math.abs(dx) + Math.abs(dy); lam0 -= dx * kk; phi0 = Math.max(-75, Math.min(75, phi0 + dy * kk)); vx = dx * kk / dtm; vy = dy * kk / dtm; last = { x: e.clientX, y: e.clientY, t: now }; autoAt = reduce ? Infinity : now + 9000;
  }, opts);
  const end = (e) => { if (!dragging) return; dragging = false; canvas.classList.remove("grabbing"); if (moved < 6) { vx = vy = 0; const h = hit(e); if (h >= 0) onSelect?.(h); } if (performance.now() - last.t > 80) vx = vy = 0; };
  canvas.addEventListener("pointerup", end, opts); canvas.addEventListener("pointercancel", () => { dragging = false; canvas.classList.remove("grabbing"); }, opts);
  canvas.addEventListener("pointerleave", () => { hover = -1; }, opts);

  const io = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }, { rootMargin: "120px" }) : null;
  if (io) io.observe(canvas); else { visible = true; }
  const ro = "ResizeObserver" in window ? new ResizeObserver(() => { size(); if (W) draw(performance.now()); }) : null; ro?.observe(canvas);
  size(); draw(performance.now()); kick();
  signal?.addEventListener("abort", () => { io?.disconnect(); ro?.disconnect(); if (raf) cancelAnimationFrame(raf); });

  const api = {
    select(i, focus = true) {
      selected = i; const pin = pins[i]; if (!pin) return;
      if (focus) { autoAt = reduce ? Infinity : performance.now() + 12000; vx = vy = 0; const dl = ((pin.lng - lam0 + 540) % 360) - 180, p = Math.max(-60, Math.min(60, pin.lat * .85)); if (reduce) { lam0 += dl; phi0 = p; } else tween = { t0: performance.now(), ms: 900, l0: lam0, p0: phi0, dl, dp: p - phi0 }; }
      if (W) draw(performance.now()); kick();
    },
    hold(on) { held = !!on; if (!on && !reduce) autoAt = 0; },
    rotation: () => [lam0, phi0], pinAt: (i) => project(pins[i].lat, pins[i].lng), printed: () => prints.filter(Boolean).length,
  };
  canvas.__globe = api;
  return api;
}
