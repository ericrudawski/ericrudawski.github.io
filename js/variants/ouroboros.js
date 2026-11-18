// A brief history of financial crises as an ouroboros: history eating its own tail. The snake is engraved procedurally and kept on
// its own layer, so spinning it costs the browser nothing. Clicking a medal highlights it and spins the snake until its head rests
// over that crisis. The medals are in crisis-icons.js.
import { esc } from "../content.js?v=150";
import { caps } from "../text.js?v=150";
import { medal, medalDefs } from "./crisis-icons.js?v=150";

const C = 500, R = 424, W = 44, NECK = -8, SWEEP = 345.5, NECK_W = 34, TILT = 2.4; // angles are degrees clockwise from the top
const f = (n) => n.toFixed(1);
const at = (phi, r) => { const a = phi * Math.PI / 180; return [C + r * Math.sin(a), C - r * Math.cos(a)]; };
const pair = (phi, r) => at(phi, r).map(f).join(" ");
// t runs from the neck (0) to the tip of the tail (1), going backward round the circle.
const phiOf = (t) => NECK - t * SWEEP;
const tOf = (phi) => (NECK - phi) / SWEEP;
const widthOf = (t) => {
  const s = Math.min(1, t / .07), neck = NECK_W + (W - NECK_W) * s * s * (3 - 2 * s);
  const u = Math.max(0, (t - .42) / .58), taper = .2 + .8 * (1 - Math.pow(u, 1.45));
  return neck * taper * (t > .985 ? (1 - t) / .015 : 1);
};
const onBody = (t, u) => pair(phiOf(t), R + u * widthOf(t));
const DEG = 180 / (Math.PI * R); // units along the circle, in degrees
const BELT = -.62;

// The engraving is thousands of tiny strokes, and Safari slows to a crawl drawing them as one long path. So each kind is cut into arcs round the ring.
const ARCS = 36;
const sectors = () => {
  const arc = Array.from({ length: ARCS }, () => "");
  return { add: (phi, d) => { arc[Math.min(ARCS - 1, Math.max(0, Math.floor((NECK - phi) / SWEEP * ARCS)))] += d; }, html: (cls) => arc.filter(Boolean).map(d => `<path class="${cls}" d="${d}"/>`).join("") };
};
const line = (u, n = 360) => { const pts = Array.from({ length: n + 1 }, (_, k) => onBody(k / n, u)); return pts; };
const pieces = (pts, each = 30) => { let d = ""; for (let i = 0; i < pts.length - 1; i += each) d += `<path d="M${pts.slice(i, i + each + 1).join("L")}"/>`; return d; };

// The silhouette, then the engraving on it: overlapping scales, belly plates on the inside, fine hatching on the outside for roundness, and diamonds down the back.
const body = () => {
  const outer = line(1), inner = line(-1), belt = line(BELT);
  const scales = sectors(), plates = sectors(), hatch = sectors(), diamonds = sectors(), pips = sectors(), seeds = sectors(), flank = sectors();
  // Each scale's tip reaches the row behind it, which is what makes it a net of scales rather than rows of waves. They shrink with the tail.
  let col = 0;
  for (let phi = NECK; phi > NECK - SWEEP + 2; col++) {
    const w = widthOf(tOf(phi)), H = w > 21 ? .33 : w > 11 ? .55 : 1, step = H * w * .68 * DEG;
    for (let u = BELT - (col % 2 ? H / 2 : 0); u + H < 1; u += H) scales.add(phi, `M${pair(phi, R + u * w)}Q${pair(phi - 2 * step, R + (u + H / 2) * w)} ${pair(phi, R + (u + H) * w)}`);
    phi -= step;
  }
  for (let phi = NECK; phi > NECK - SWEEP + 2;) {
    const w = widthOf(tOf(phi));
    plates.add(phi, `M${pair(phi, R + BELT * w)}L${pair(phi - .3 * w / W, R - .985 * w)}`);
    phi -= Math.max(.7, 1.5 * w / W);
  }
  for (let phi = NECK; phi > NECK - SWEEP + 2;) {
    const w = widthOf(tOf(phi));
    if (w > 10) hatch.add(phi, `M${pair(phi, R + .84 * w)}L${pair(phi - .14, R + .995 * w)}`);
    phi -= Math.max(.34, .58 * w / W);
  }
  for (let phi = NECK - 7; phi > NECK - SWEEP + 8;) {
    const w = widthOf(tOf(phi)), len = 4.3 * w / W, mid = R + .2 * w, half = .55 * w;
    if (w < 9) break;
    const dia = (k) => `M${pair(phi + len * k, mid)}L${pair(phi, mid + half * k)}L${pair(phi - len * k, mid)}L${pair(phi, mid - half * k)}Z`;
    diamonds.add(phi, dia(1)); pips.add(phi, dia(.56)); seeds.add(phi, dia(.2));
    const gap = len * 2.62; flank.add(phi, `M${pair(phi - gap / 2 + .7 * w / W, mid)}L${pair(phi - gap / 2, mid + .17 * w)}L${pair(phi - gap / 2 - .7 * w / W, mid)}L${pair(phi - gap / 2, mid - .17 * w)}Z`);
    phi -= gap;
  }
  const back = (pts) => [...pts].reverse().join("L");
  return { fill: `M${outer.join("L")}L${back(inner)}Z`, band: `M${belt.join("L")}L${back(inner)}Z`, edges: pieces(outer) + pieces(inner), beltLine: pieces(belt), scales, plates, hatch, diamonds, pips, seeds, flank };
};

/* The head, drawn in its own frame: the origin is on the mid-line, +x runs forward along the circle, -y outward. It leaves the neck on the body's own curve, so there is no seam,
   and the jaws open round the tail. Curves are written as four points so the scales along the lips can be stepped between them. */
const bez = ([a, b, c, d], t) => { const m = 1 - t, q = (i) => m * m * m * a[i] + 3 * m * m * t * b[i] + 3 * m * t * t * c[i] + t * t * t * d[i]; return [q(0), q(1)]; };
const cu = (c) => `C${c[1].join(" ")} ${c[2].join(" ")} ${c[3].join(" ")}`; // forward, assuming the pen is at the start
const uc = (c) => `C${c[2].join(" ")} ${c[1].join(" ")} ${c[0].join(" ")}`; // backward, assuming the pen is at the end
const between = (A, B, n, t0 = 0, t1 = 1) => Array.from({ length: n }, (_, k) => { const t = t0 + (t1 - t0) * k / (n - 1), a = bez(A, t), b = bez(B, t); return `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`; }).join("");
const inFrame = (phi, r) => { const a = (phi - TILT) * Math.PI / 180; return [+(r * Math.sin(a)).toFixed(1), +(R - r * Math.cos(a)).toFixed(1)]; };
const tangent = (p, k) => { const a = (NECK - TILT) * Math.PI / 180; return [+(p[0] + k * Math.cos(a)).toFixed(1), +(p[1] + k * Math.sin(a)).toFixed(1)]; };

const head = () => {
  const nOut = inFrame(NECK, R + NECK_W), nIn = inFrame(NECK, R - NECK_W), nBelt = inFrame(NECK, R + BELT * NECK_W);
  const crown = [nOut, tangent(nOut, 30), [-32, -55], [-6, -58]], brow = [[-6, -58], [16, -61], [38, -57], [58, -47]], nose = [[58, -47], [74, -42], [90, -35], [100, -25]], tip = [[100, -25], [105, -18], [104, -10], [97, -8.5]];
  const lip = [[-16, 6], [4, -3], [48, -7], [97, -8.5]], lipRow = [[-3, -7], [20, -16], [52, -20], [91, -23]];
  const low = [[-16, 6], [6, 9], [44, 20], [79, 29]], lowRow = [[-5, 15], [14, 19], [46, 30], [78, 38]];
  const chinTip = [[79, 29], [87, 31.5], [90, 36], [85, 41]], jawF = [[24, 53], [50, 55], [75, 50], [85, 41]], jawB = [nIn, tangent(nIn, 30), [0, 51.5], [24, 53]];
  const beltB = [nBelt, tangent(nBelt, 28), [-2, 40], [24, 43]], beltF = [[24, 43], [46, 45.5], [66, 42], [79, 37]];
  const outline = `M${nOut.join(" ")}${cu(crown)}${cu(brow)}${cu(nose)}${cu(tip)}${uc(lip)}${cu(low)}${cu(chinTip)}${uc(jawF)}${uc(jawB)}`;
  let net = ""; for (let col = 0, x = 104; x > -94; x -= 9, col++) for (let y = -66 - (col % 2 ? 6.5 : 0); y < 58; y += 13) net += `M${x} ${y}Q${x - 18} ${y + 6.5} ${x} ${y + 13}`;
  let top = ""; for (const [c, n] of [[crown, 15], [brow, 10]]) for (let k = 0; k < n; k++) { const [x, y] = bez(c, k / n); top += `M${f(x)} ${f(y)}L${f(x + 1.4)} ${f(y + 8.5)}`; }
  return {
    cavity: `<path class="ou-ink" d="M-16 6C4 -3 48 -7 66 -7.8C53 2 53 14 60 24.4C44 20 6 9 -16 6Z"/>`,
    front: `<defs><clipPath id="ou-head"><path d="${outline}Z"/></clipPath></defs>
    <path class="ou-paper ou-tooth" d="M26 16L30 5L34 18ZM40 20L44 9L48 22ZM54 24L58 13.5L62 27Z"/>
    <path class="ou-paper ou-tooth" d="M62 -11C62 5 66 14 73.5 22.5C75 12 76 3 76.5 -11Z"/><path class="ou-paper ou-tooth" d="M44 -10C44 1 46 6.5 50.5 11.5C51.5 5.5 52.5 1 53 -10Z"/>
    <path class="ou-paper" d="${outline}Z"/>
    <g clip-path="url(#ou-head)"><path class="ou-scale" d="${net}"/>
      <path class="ou-paper" d="M${lip[0].join(" ")}${cu(lip)}L${lipRow[3].join(" ")}${uc(lipRow)}Z"/><path class="ou-paper" d="M${low[0].join(" ")}${cu(low)}L${lowRow[3].join(" ")}${uc(lowRow)}Z"/>
      <path class="ou-paper" d="M${beltB[0].join(" ")}${cu(beltB)}${cu(beltF)}L${jawF[3].join(" ")}${uc(jawF)}${uc(jawB)}Z"/>
    </g>
    <path class="ou-hatch" d="${top}"/>
    <path class="ou-belt" d="M${beltB[0].join(" ")}${cu(beltB)}${cu(beltF)}"/><path class="ou-plate" d="${between(jawB, beltB, 13, .04, 1)}${between(jawF, beltF, 11, .1, .96)}"/>
    <path class="ou-belt" d="M${lipRow[0].join(" ")}${cu(lipRow)}M${lowRow[0].join(" ")}${cu(lowRow)}"/>
    <path class="ou-thin" d="${between(lip, lipRow, 11, .1, .94)}${between(low, lowRow, 9, .12, .96)}"/>
    <path class="ou-hinge" d="M-16 5.5C-26 8.5 -37 11 -49 12"/>
    <path class="ou-out" d="${outline}"/>
    <path class="ou-ink" d="M81 -31.5C84 -34.8 90 -34 92 -29.6C88.4 -28 84.6 -28.2 81 -31.5Z"/><path class="ou-thin" d="M93 -22C91 -18 91 -13 93.6 -9.5"/>
    <path class="ou-brow" d="M3 -43C14 -54 38 -54 53 -39"/>
    <circle class="ou-paper" cx="28" cy="-33" r="13"/><circle class="ou-iris" cx="28" cy="-33" r="9.7"/><path class="ou-ink" d="M28 -42.6C31.6 -38 31.6 -28 28 -23.4C24.4 -28 24.4 -38 28 -42.6Z"/><circle class="ou-paper" cx="24.2" cy="-37.2" r="1.9"/><circle class="ou-out" cx="28" cy="-33" r="13"/>`,
  };
};

const snake = () => {
  const b = body(), h = head(), [hx, hy] = at(TILT, R), frame = `translate(${f(hx)} ${f(hy)}) rotate(${TILT})`;
  return `<svg class="ou-snake-art" viewBox="0 0 1000 1000" aria-hidden="true">
    <g transform="${frame}">${h.cavity}</g>
    <path class="ou-paper" d="${b.fill}"/>
    ${b.scales.html("ou-scale")}
    <path class="ou-paper" d="${b.band}"/>${b.plates.html("ou-plate")}<g class="ou-belt">${b.beltLine}</g>
    ${b.hatch.html("ou-hatch")}
    ${b.flank.html("ou-halo")}${b.diamonds.html("ou-dia")}${b.pips.html("ou-pip")}${b.seeds.html("ou-ink")}
    <g class="ou-out">${b.edges}</g>
    <g transform="${frame}">${h.front}</g>
  </svg>`;
};

const RING = 27.6; // how far out the medals sit, as a percentage of the stage
const pos = (i, n) => { const a = i * 2 * Math.PI / n; return `left:${f(50 + RING * Math.sin(a))}%;top:${f(50 - RING * Math.cos(a))}%`; };
const details = (cr) => `
  <p class="name">${esc(cr.name)}</p>
  <h3>${esc(cr.headline)}</h3>
  <dl><div><dt>Cause</dt><dd>${caps(cr.cause)}</dd></div><div><dt>Outcome</dt><dd>${caps(cr.outcome)}</dd></div></dl>
  <p class="damage"><b>Damage</b> ${esc(cr.damage)}</p>
  <a href="${esc(cr.url)}" target="_blank" rel="noopener">Read the full history ↗</a>`;

export const ouroborosHtml = (crises) => {
  const start = crises.findIndex(x => x.open);
  return `<div class="ou" data-ou>${medalDefs}
    <div class="ou-stage">
      <div class="ou-snake" data-ou-snake>${snake()}</div>
      <div class="ou-center" aria-hidden="true"><b data-ou-year>${crises[start].year}</b><span data-ou-name>${esc(crises[start].name)}</span></div>
      ${crises.map((cr, i) => `<button type="button" class="ou-medal${i === start ? " on" : ""}" style="${pos(i, crises.length)}" data-crisis="${i}" aria-pressed="${i === start}" aria-label="${cr.year}: ${esc(cr.name)}" title="${cr.year}: ${esc(cr.name)}">${medal(cr.year)}</button>`).join("")}
    </div>
    <div class="ou-box"><div class="ou-sizer" aria-hidden="true">${crises.map(cr => `<div class="ou-text">${details(cr)}</div>`).join("")}</div><article class="ou-text" data-ou-text aria-live="polite">${details(crises[start])}</article></div>
  </div>`;
};

export function mountOuroboros(root, crises, { signal, reduce }) {
  const n = crises.length, wrap = root.querySelector("[data-ou-snake]"), text = root.querySelector("[data-ou-text]"), medals = [...root.querySelectorAll(".ou-medal")];
  const year = root.querySelector("[data-ou-year]"), name = root.querySelector("[data-ou-name]");
  let cur = crises.findIndex(x => x.open), turn = 0;
  // Always forward, the way the snake is going, at least once round, and landing with the head over the chosen medal.
  const spinTo = (i, laps = 1) => {
    const target = i * 360 / n, ahead = ((target - turn) % 360 + 360) % 360;
    turn += ahead + (reduce ? 0 : laps * 360);
    wrap.style.setProperty("--turn", `${turn}deg`);
  };
  const pick = (i) => {
    if (i !== cur) {
      cur = i;
      medals.forEach((m, k) => { m.classList.toggle("on", k === i); m.setAttribute("aria-pressed", String(k === i)); });
      year.textContent = crises[i].year; name.textContent = crises[i].name;
      text.innerHTML = details(crises[i]);
      if (!reduce) { text.classList.remove("in"); void text.offsetWidth; text.classList.add("in"); }
    }
    spinTo(i);
  };
  // It starts a turn behind, then comes round when it is first seen.
  wrap.style.transition = "none"; turn = cur * 360 / n - (reduce ? 0 : 360); wrap.style.setProperty("--turn", `${turn}deg`); void wrap.offsetWidth; wrap.style.transition = "";
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { io.disconnect(); turn += 360; wrap.style.setProperty("--turn", `${turn}deg`); } }, { threshold: .3 });
    io.observe(root); signal.addEventListener("abort", () => io.disconnect());
  } else { turn = cur * 360 / n; wrap.style.setProperty("--turn", `${turn}deg`); }
  root.addEventListener("click", (e) => { const b = e.target.closest("[data-crisis]"); if (b) pick(+b.dataset.crisis); }, { signal });
  return { pick, at: () => cur, turn: () => turn };
}
