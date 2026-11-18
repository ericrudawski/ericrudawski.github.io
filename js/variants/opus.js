import { esc } from "../content.js?v=150";
import { openModal, openLightbox, loadRecords } from "../ui.js?v=150";
import { mountGlobe } from "../globe.js?v=150";

// Opus, used by both Composites: the art strip, the pile on the coffee table, the sleeve from the crate and the collection behind it, and the globe with its flip board.
// It has to sit inside a .cp, and mountOpus expects to be called once what it measures is visible.
const PILE = ["Print ad", "Book cover", "Magazine cover"]; // these three are stacked on the gallery's coffee table
const QUIPS = { "Print ad": "Read the fine print.", "Book cover": "Go ahead, judge it by its cover.", "Magazine cover": "Page-turner, one way or another." };
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

export const opusHtml = (c) => `
      <div class="cp-wall" data-from="17">
        <div class="reel" data-reel-wrap>
          <button type="button" class="step prev" data-reel-step="-1" aria-label="Previous artwork">‹</button>
          <div class="track" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Artworks, swipe or use the arrows" data-reel>${c.wall.map((p, i) => PILE.includes(p.medium) ? "" : `<figure class="piece" style="--ar:${(p.w / p.h).toFixed(3)}">
            <button type="button" class="print" style="--ar:${(p.w / p.h).toFixed(3)}" data-piece="${i}" aria-label="Open ${esc(p.title)}"><img src="${esc(p.src)}" alt="${esc(p.title)}, ${esc(p.credit)}" loading="lazy" width="${p.w}" height="${p.h}" /><span class="plaque">${esc(p.medium)}</span></button>
            <figcaption>${esc(p.title)}<span>${esc(p.credit)}</span></figcaption>
          </figure>`).join("")}</div>
          <button type="button" class="step next" data-reel-step="1" aria-label="Next artwork">›</button>
        </div>
        <figure class="piece pair pile" data-pile>
          <div class="stack" role="group" aria-label="A pile of literature">${c.wall.map((p, i) => !PILE.includes(p.medium) ? "" : `<div class="card" data-card="${i}" style="--ar:${(p.w / p.h).toFixed(3)}">
            <div class="flip">
              <button type="button" class="print face front" data-flip aria-label="Flip ${esc(p.title)} over"><img src="${esc(p.src)}" alt="${esc(p.title)}, ${esc(p.credit)}" loading="lazy" width="${p.w}" height="${p.h}" /></button>
              <div class="face back"><b>${esc(p.title)}</b><span>${esc(p.credit)}</span><span>${esc(p.medium)}</span><span class="quip">${esc(QUIPS[p.medium] || "")}</span><button type="button" data-piece="${i}" aria-label="Open ${esc(p.title)}">View full size</button><button type="button" data-flip aria-label="Flip ${esc(p.title)} back over">⤾ Flip back</button></div>
            </div>
          </div>`).join("")}<span class="tag" aria-hidden="true"><span class="a">Tsundoku</span><span class="b">Reading pile</span></span></div>
          <figcaption><em>On the coffee table</em><span><i class="on-hover">Hover to spread the pile</i><i class="on-touch">Tap to spread the pile</i></span><button type="button" class="another" data-pile-shuffle>⤭ Reshuffle</button></figcaption>
        </figure>
        <figure class="piece pair" data-wall-sleeve>
          <button type="button" class="print" style="--ar:1" data-piece="${c.wall.length}" aria-label="Open this record sleeve"><img class="under" alt="" aria-hidden="true" width="600" height="600" /><img class="front" alt="" loading="lazy" width="600" height="600" /><span class="plaque">From the crate</span></button>
          <figcaption><em data-wall-title></em><span data-wall-sub></span><span class="dig"><button type="button" class="another arrow" data-wall-next="-1" aria-label="Previous record">‹</button><button type="button" class="another" data-wall-next="1" tabindex="-1" aria-hidden="true">Dig</button><button type="button" class="another arrow" data-wall-next="1" aria-label="Next record">›</button></span></figcaption>
        </figure>
      </div>
      <div class="label cp-row after">Reports from around the globe</div>
      <div class="cp-globe" data-from="16,24">
        <div class="stage"><canvas data-globe role="img" aria-label="A dotted globe with a pin on each place in the list beside it"></canvas><article class="dispatch" data-dispatch aria-live="polite"></article><p class="legend">Drag to rotate · click a pin or a place</p><button type="button" class="respin" data-respin>Close photos · spin the globe</button></div>
        <div class="side">
          <ul class="places board" data-places>${c.dispatches.map((d, i) => `<li><button type="button" data-place="${i}" aria-pressed="false" aria-label="${esc(d.place)}"><span class="flap" aria-hidden="true">${[...d.place.toUpperCase()].map(ch => ch === " " ? '<s class="gap"></s>' : `<s data-ch="${esc(ch)}"><b>${esc(ch)}</b></s>`).join("")}</span>${d.text && !d.sample ? '<i class="filed" title="Dispatch filed"></i>' : ""}</button></li>`).join("")}</ul>
        </div>
      </div>

  <div data-collection hidden>
    <header class="cp-head"><h2 id="h-collection">The Collection</h2><p class="sub"><span data-rec-count>110</span> on the shelf</p></header>
    <div class="cp-rec" data-from="2,12">
      <div class="bar"><div class="chips" data-genres role="group" aria-label="Filter by genre"></div><button type="button" class="deal" data-deal>⤭ Deal again</button></div>
      <div class="sleeves" data-sleeves aria-busy="true"></div>
      <p class="readout" data-readout aria-live="polite">Hover a sleeve for its details</p>
      <p class="note">Mostly <span data-rec-genres>hip hop, funk / soul, jazz</span>, kept in a cabinet built to fit them. <a href="${esc(c.social[3].url)}" target="_blank" rel="noopener">The whole collection on Discogs ↗</a></p>
    </div>
  </div>`;

export function mountOpus(root, c, { signal, reduce, onLayout = () => {} }) {
  const $ = (s) => root.querySelector(s), $$ = (s) => [...root.querySelectorAll(s)];
  const cp = root, timers = [];
  /* ---------- picks 2 and 12: sleeves stacked like the Bento card, dealt out into the Monograph grid ---------- */
  const sleeves = $("[data-sleeves]"), readout = $("[data-readout]"), chips = $("[data-genres]");
  let recs = [], genre = "All", items = [], dealt = false, settleT = 0;
  const describe = (r) => [r.artist, r.title].join(" — ") + ` · ${[r.year || "", (r.genres || [])[0], r.label].filter(Boolean).join(" · ")}`;
  const defaultReadout = () => { readout.textContent = genre === "All" ? "Hover a sleeve for its details" : `${recs.filter(r => (r.genres || []).includes(genre)).length} ${genre} records on the shelf`; };
  const deal = (shuffle) => {
    let list = recs.filter(r => genre === "All" || (r.genres || []).includes(genre));
    list = shuffle ? [...list].sort(() => Math.random() - .5) : [...list].sort((a, b) => String(b.added || "").localeCompare(String(a.added || "")));
    const pick = list.slice(0, 24); items = pick.map(r => ({ src: r.cover, caption: `${r.artist} — ${r.title}`, sub: `${r.year || ""}${r.genres?.[0] ? ` · ${r.genres[0]}` : ""}`.replace(/^ · /, ""), href: r.url }));
    clearTimeout(settleT); sleeves.classList.remove("dealt", "settled");
    sleeves.innerHTML = pick.map((r, i) => `<button type="button" class="sl" data-sleeve="${i}" aria-label="${esc(r.artist)} — ${esc(r.title)}" style="--r:${((i * 37) % 7) - 3}deg;--sr:${((i * 53) % 29) - 14}deg;--d:${i * 26}ms"><img src="${esc(r.thumb || r.cover)}" data-hi="${esc(r.cover)}" alt="" width="150" height="150" /></button>`).join("");
    sleeves.setAttribute("aria-busy", "false");
    sleeves.querySelectorAll("img").forEach(im => { const hi = new Image(); hi.onload = () => { if (im.isConnected) im.src = hi.src; }; hi.src = im.dataset.hi; });
    const box = sleeves.getBoundingClientRect(), cxx = box.left + box.width / 2, cyy = box.top + Math.min(box.height, 340) / 2;
    sleeves.querySelectorAll(".sl").forEach((b, i) => { const r = b.getBoundingClientRect(); b.style.setProperty("--dx", `${Math.round(cxx - (r.left + r.width / 2) + (i % 5 - 2) * 12)}px`); b.style.setProperty("--dy", `${Math.round(cyy - (r.top + r.height / 2) + (i % 3 - 1) * 10)}px`); });
    defaultReadout(); onLayout();
    if (dealt) deliver();
  };
  const deliver = () => {
    if (reduce) { sleeves.classList.add("dealt", "settled"); return; }
    void sleeves.offsetWidth; requestAnimationFrame(() => { sleeves.classList.add("dealt"); clearTimeout(settleT); settleT = setTimeout(() => sleeves.classList.add("settled"), 26 * 24 + 800); });
  };
  const startRecords = () => loadRecords().then(({ records: list }) => {
    if (signal.aborted) return;
    if (!list.length) { sleeveFrame.remove(); return; }
    recs = list;
    $("[data-rec-count]").textContent = String(recs.length);
    const g = {}; recs.forEach(r => (r.genres || []).forEach(x => { g[x] = (g[x] || 0) + 1; }));
    const top = Object.entries(g).sort((a, b) => b[1] - a[1]).map(x => x[0]);
    $("[data-rec-genres]").textContent = top.slice(0, 3).map(x => x.toLowerCase()).join(", ");
    chips.innerHTML = ["All", ...top.slice(0, 4)].map((x, i) => `<button type="button" data-genre="${esc(x)}" aria-pressed="${i === 0}">${esc(x)}</button>`).join("");
    deal(false);
    hangSleeve();
  });
  if (document.readyState === "complete") startRecords(); else window.addEventListener("load", startRecords, { once: true, signal });
  const showMeta = (e) => { const b = e.target.closest?.("[data-sleeve]"); if (!b) return; const r = recs.filter(x => genre === "All" || (x.genres || []).includes(genre)); const it = items[+b.dataset.sleeve]; const rec = r.find(x => x.url === it.href); readout.textContent = rec ? describe(rec) : it.caption; };
  sleeves.addEventListener("pointerover", showMeta, { signal }); sleeves.addEventListener("focusin", showMeta, { signal }); sleeves.addEventListener("pointerleave", defaultReadout, { signal });

  /* ---------- the collection lives in a modal, opened from the sleeve hanging in the gallery ---------- */
  const recBox = $("[data-collection]"), recHome = recBox.parentNode;
  const openCollection = () => {
    const m = openModal("", { className: "cp-recbox", onClose: () => setTimeout(() => { if (recBox.parentNode === m.body) { recBox.hidden = true; recHome.appendChild(recBox); } }, 240) });
    m.el.style.setProperty("--accent", getComputedStyle(cp).getPropertyValue("--accent").trim()); // the overlay lives outside .cp, so it has to be handed the visitor's color
    m.el.querySelector(".ui-modal").setAttribute("aria-labelledby", "h-collection");
    m.body.appendChild(recBox); recBox.hidden = false;
    m.body.addEventListener("click", (e) => {
      const t = e.target;
      const sl = t.closest("[data-sleeve]"); if (sl) { openLightbox(items, +sl.dataset.sleeve); return; }
      if (t.closest("[data-deal]")) { deal(true); return; }
      const gb = t.closest("[data-genre]"); if (gb) { genre = gb.dataset.genre; chips.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === gb))); deal(false); }
    });
    dealt = true; deal(false); // laid out now that it is visible, so the sleeves are dealt out from the middle
  };

  /* ---------- pick 17: the gallery. One frame always holds a sleeve off the shelf; its space is held from the start, so nothing below it jumps when the records arrive ---------- */
  const sleeveFrame = $("[data-wall-sleeve]"); let hung = null;
  /* the crate: the whole library in a shuffled order; each step flips the top sleeve down toward the visitor to show the next (or the one before) */
  const sleevePrint = sleeveFrame.querySelector(".print"), sleeveFront = sleevePrint.querySelector(".front"), sleeveUnder = sleevePrint.querySelector(".under");
  let deck = [], deckAt = 0, flipping = false;
  const paintSleeve = (r) => {
    hung = r; sleeveFront.alt = `${r.artist}, ${r.title}`;
    $("[data-wall-title]").textContent = r.title; $("[data-wall-sub]").textContent = `${r.artist}${r.year ? ` · ${r.year}` : ""}`;
  };
  const hangSleeve = (dir = 0) => {
    if (!recs.length) return;
    if (!deck.length) { deck = [...recs].sort(() => Math.random() - .5); deckAt = 0; }
    if (!dir) { paintSleeve(deck[deckAt]); sleeveFront.src = deck[deckAt].cover; return; }
    if (flipping) return;
    deckAt = (deckAt + dir + deck.length) % deck.length;
    const r = deck[deckAt];
    if (reduce) { paintSleeve(r); sleeveFront.src = r.cover; return; }
    flipping = true; sleeveUnder.src = r.cover; sleevePrint.classList.add("tipping");
    timers.push(setTimeout(() => {
      paintSleeve(r); sleeveFront.src = r.cover;
      sleevePrint.classList.add("reset"); sleevePrint.classList.remove("tipping"); void sleevePrint.offsetWidth; sleevePrint.classList.remove("reset");
      flipping = false;
    }, 560));
  };
  /* the pile: three cards show at a time, in a loose heap until hovered or tapped; Reshuffle rotates which ones are on top */
  const pile = $("[data-pile]"), cards = $$("[data-card]"); let heap = cards.slice();
  const layPile = () => heap.forEach((el, k) => { el.dataset.pos = k < 3 ? k : "off"; el.classList.remove("flipped"); el.querySelectorAll("[data-flip], [data-piece]").forEach(b => { b.tabIndex = k < 3 ? 0 : -1; }); });
  layPile();
  const closePile = () => { pile.classList.remove("open"); cards.forEach(el => el.classList.remove("flipped")); };
  document.addEventListener("click", (e) => { if (!e.target.closest("[data-pile]")) closePile(); }, { signal });
  const wallItems = () => [...c.wall.map(p => ({ src: p.src, caption: p.title, sub: `${p.medium} · ${p.credit}` })), ...(hung ? [{ src: hung.cover, caption: `${hung.artist} — ${hung.title}`, sub: "From the shelf", href: hung.url }] : [])];

  /* the art strip: two pieces show at a time; it only moves when swiped, or with the arrows or arrow keys */
  const reel = $("[data-reel]");
  const reelStep = (dir) => {
    const kids = [...reel.children], max = reel.scrollWidth - reel.clientWidth;
    if (dir > 0 && reel.scrollLeft >= max - 4) { reel.scrollTo({ left: 0, behavior: "smooth" }); return; }
    if (dir < 0 && reel.scrollLeft <= 4) { reel.scrollTo({ left: max, behavior: "smooth" }); return; }
    const pad = kids[0].offsetLeft;
    const cur = kids.reduce((b, el, n) => Math.abs(el.offsetLeft - pad - reel.scrollLeft) < Math.abs(kids[b].offsetLeft - pad - reel.scrollLeft) ? n : b, 0);
    const el = kids[Math.max(0, Math.min(kids.length - 1, cur + dir))];
    reel.scrollTo({ left: el.offsetLeft - pad, behavior: "smooth" });
  };
  reel.addEventListener("keydown", (e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); reelStep(e.key === "ArrowRight" ? 1 : -1); } }, { signal });

  /* ---------- picks 16 and 24: the globe, redrawn as dots, and the photos on its pins ---------- */
  const places = $$("[data-place]"), dispatch = $("[data-dispatch]"); let globe = null, placeNow = null, placeIdx = -1;
  // The photos over the globe are in one of two states, and setDispatch is the only thing that changes it: fanned out, with the globe held still
  // under them, or put away, with the globe free to turn. The "open" class and the hold both follow from it. A place with no photos has nothing to fan.
  const Dispatch = Object.freeze({ AWAY: "away", FANNED: "fanned" });
  let dispatchNow = Dispatch.AWAY;
  const setDispatch = (next) => {
    if (next === Dispatch.FANNED && !placeNow?.photos) return false;
    dispatchNow = next;
    dispatch.classList.toggle("open", next === Dispatch.FANNED);
    globe?.hold(next === Dispatch.FANNED);
    return true;
  };
  // Choosing a place fans its photos out; choosing the same place again (or tapping the pile) gathers them back up.
  const selectPlace = (i, focus = true) => {
    const d = c.dispatches[i], again = focus && i === placeIdx;
    placeNow = d; placeIdx = i; places.forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    if (again) { setDispatch(dispatchNow === Dispatch.FANNED ? Dispatch.AWAY : Dispatch.FANNED); globe?.select(i, focus); return; }
    setDispatch(Dispatch.AWAY);
    dispatch.className = `dispatch${d.sample ? " sample" : ""}`;
    dispatch.innerHTML = d.photos ? `<div class="snaps" style="--n:${d.photos.length}">${d.photos.map((p, k) => `<button type="button" class="print" data-snap="${k}" style="--i:${k}" aria-label="Open ${esc(p.caption)}"><img src="${esc(p.src)}" alt="${esc(p.caption)}" width="300" height="225" /></button>`).join("")}</div>` : "";
    if (focus) { void dispatch.offsetWidth; setDispatch(Dispatch.FANNED); }
    globe?.select(i, focus);
  };
  selectPlace(c.dispatches.findIndex(d => d.place === "France"), false);
  fetch("assets/land-dots.json").then(r => r.json()).then(dots => {
    if (signal.aborted) return;
    globe = mountGlobe($("[data-globe]"), { dots, pins: c.dispatches, onSelect: (i) => selectPlace(i), signal });
    globe.select(c.dispatches.findIndex(d => d.place === "France"), false);
  }).catch(() => { $("[data-globe]").closest(".stage").classList.add("failed"); });

  /* ---------- the place list as an airport flip board: each letter clacks through a few others, then settles ---------- */
  const board = $("[data-places]"), FLAPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const clack = (tile, delay) => {
    const face = tile.firstElementChild, end = tile.dataset.ch; let n = 0, steps = 3 + Math.floor(Math.random() * 4);
    const tick = () => {
      if (signal.aborted) return;
      face.textContent = n < steps ? pickOne([...FLAPS]) : end;
      tile.classList.remove("turn"); void tile.offsetWidth; tile.classList.add("turn");
      if (n++ < steps) timers.push(setTimeout(tick, 90));
    };
    timers.push(setTimeout(tick, delay));
  };
  if (!reduce && "IntersectionObserver" in window) {
    const flapIO = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return; flapIO.disconnect();
      $$("[data-places] [data-ch]").forEach((t, i) => clack(t, (i % 24) * 35 + Math.floor(i / 24) * 200));
    }, { threshold: .2 });
    flapIO.observe(board);
  }

  root.addEventListener("click", (e) => {
    const t = e.target;
    const rs = t.closest("[data-reel-step]"); if (rs) { reelStep(+rs.dataset.reelStep); return; }
    if (t.closest("[data-pile-shuffle]")) { heap.push(heap.shift()); layPile(); return; }
    const bk = t.closest(".card.flipped .back"); if (bk && !t.closest("button")) { bk.closest("[data-card]").classList.remove("flipped"); return; }
    const fl = t.closest("[data-flip]"); if (fl) {
      if (!pile.classList.contains("open") && !(matchMedia("(hover: hover)").matches && pile.matches(":hover"))) { pile.classList.add("open"); return; }
      pile.classList.add("open"); const card = fl.closest("[data-card]"), was = card.classList.contains("flipped"); cards.forEach(el => el.classList.remove("flipped")); card.classList.toggle("flipped", !was); return;
    }
    const pc = t.closest("[data-piece]"); if (pc && +pc.dataset.piece === c.wall.length) { openCollection(); return; }
    if (pc) { const list = wallItems(); if (list[+pc.dataset.piece]) openLightbox(list, +pc.dataset.piece); return; }
    const dig = t.closest("[data-wall-next]"); if (dig) { hangSleeve(+dig.dataset.wallNext || 1); return; }
    if (t.closest("[data-respin]")) { setDispatch(Dispatch.AWAY); return; }
    const sn = t.closest("[data-snap]"); if (sn && dispatchNow !== Dispatch.FANNED) { setDispatch(Dispatch.FANNED); return; }
    if (sn) { openLightbox(placeNow.photos.map(p => ({ src: p.src, caption: p.caption, sub: placeNow.place })), +sn.dataset.snap); return; }
    const pl = t.closest("[data-place]"); if (pl) { selectPlace(+pl.dataset.place); return; }
  }, { signal });
  signal.addEventListener("abort", () => { clearTimeout(settleT); timers.forEach(clearTimeout); });
}
