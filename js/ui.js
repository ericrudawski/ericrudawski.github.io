// Shared UI helpers used by every variant: modal, lightbox, scroll reveal, records data.
import { esc, icons } from "./content.js?v=150";

// Every modal on the page is one entry in this stack, bottom first, and its phase is the only record of where it is in its life:
// opening (in the page, not yet faded in), open, or closing (fading out, removed 220 ms later, when it also leaves the stack).
// The scroll lock, the keyboard and "is a modal open?" are all read from the stack, never from the page.
const Phase = Object.freeze({ OPENING: "opening", OPEN: "open", CLOSING: "closing" });
const NEXT = Object.freeze({ [Phase.OPENING]: [Phase.OPEN, Phase.CLOSING], [Phase.OPEN]: [Phase.CLOSING], [Phase.CLOSING]: [] });
const stack = [];
const live = (m) => m.phase !== Phase.CLOSING;
const topModal = () => { for (let i = stack.length - 1; i >= 0; i--) if (live(stack[i])) return stack[i]; return null; };
const syncLock = () => { document.body.style.overflow = stack.some(live) ? "hidden" : ""; };
// The one place a modal changes phase. A move that is not in NEXT is refused, so a modal cannot close twice or fade back in while closing.
const move = (m, next) => {
  if (!NEXT[m.phase].includes(next)) return false;
  m.phase = next;
  m.el.classList.toggle("in", next === Phase.OPEN);
  syncLock();
  return true;
};
const drop = (m) => { const i = stack.indexOf(m); if (i < 0) return; stack.splice(i, 1); m.el.remove(); syncLock(); };
const close = (m, { refocus = true } = {}) => {
  if (!move(m, Phase.CLOSING)) return false;
  setTimeout(() => drop(m), 220);
  m.onClose?.();
  if (refocus) m.restoreFocus?.focus?.();
  return true;
};
// One listener for every modal: a key goes to the one on top and to no other, so Escape closes one modal at a time.
window.addEventListener("keydown", (e) => {
  const m = topModal(); if (!m) return;
  if (e.key === "Escape") { e.stopPropagation(); close(m); }
  else m.onKey?.(e);
});

export const isModalOpen = () => stack.length > 0; // a modal that is still fading out counts, as its overlay is still over the page
// Shut everything at once, with no fade and without handing focus back: for when the page under the modals is about to be replaced.
export function closeAllModals() { [...stack].reverse().forEach(m => { close(m, { refocus: false }); drop(m); }); }

export function openModal(html, { className = "", onClose, onKey } = {}) {
  const o = document.createElement("div");
  o.className = `ui-overlay ${className}`;
  o.innerHTML = `<div class="ui-modal" role="dialog" aria-modal="true"><button type="button" class="ui-close" aria-label="Close">✕</button><div class="ui-body">${html}</div></div>`;
  const m = { el: o, phase: Phase.OPENING, restoreFocus: document.activeElement, onClose, onKey };
  stack.push(m);
  document.body.appendChild(o);
  syncLock();
  requestAnimationFrame(() => move(m, Phase.OPEN));
  o.addEventListener("click", (e) => { if (e.target === o || e.target.closest(".ui-close")) close(m); });
  o.querySelector(".ui-close").focus();
  return { el: o, close: () => close(m), body: o.querySelector(".ui-body") }; // close() answers whether it closed anything
}

export function openLightbox(items, index = 0) {
  let i = index;
  const go = (d) => { i = (i + d + items.length) % items.length; draw(); };
  const m = openModal("", { className: "ui-lightbox", onKey: (e) => { if (e.key === "ArrowLeft") go(-1); else if (e.key === "ArrowRight") go(1); } });
  const draw = () => {
    const it = items[i];
    m.body.innerHTML = `
      <figure>
        <img src="${esc(it.src)}" alt="${esc(it.caption || "")}" />
        <figcaption><b>${esc(it.caption || "")}</b>${it.sub ? `<span>${esc(it.sub)}</span>` : ""}${it.href ? `<a href="${esc(it.href)}" target="_blank" rel="noopener">Open ${icons.arrowUpRight}</a>` : ""}</figcaption>
      </figure>
      <button type="button" class="ui-prev" aria-label="Previous">‹</button>
      <button type="button" class="ui-next" aria-label="Next">›</button>
      <div class="ui-count">${i + 1} / ${items.length}</div>`;
  };
  m.body.addEventListener("click", (e) => { if (e.target.closest(".ui-prev")) go(-1); else if (e.target.closest(".ui-next")) go(1); });
  draw();
  return m;
}

export function reveal(root) {
  const els = [...root.querySelectorAll("[data-reveal]")];
  const show = (e) => e.classList.add("in");
  if (!("IntersectionObserver" in window)) { els.forEach(show); return () => {}; }
  const io = new IntersectionObserver((entries) => entries.forEach(en => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  els.forEach(e => io.observe(e));
  // Fallback for fast scrolls that jump past an element between frames, and for the first paint.
  let raf = 0;
  const sweep = () => { raf = 0; const h = window.innerHeight; els.forEach(e => { if (e.classList.contains("in")) return; const r = e.getBoundingClientRect(); if (r.top < h * 0.95 || r.bottom < 0) { show(e); io.unobserve(e); } }); };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep); };
  window.addEventListener("scroll", onScroll, { passive: true });
  requestAnimationFrame(sweep); setTimeout(sweep, 150);
  return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
}

// The record collection is fetched once. It resolves to how that went as well as what came back, so a page can tell
// "still loading" (not resolved yet) from "could not load" from "loaded, and there are none".
export const Records = Object.freeze({ LOADING: "loading", LOADED: "loaded", FAILED: "failed" });
let recordsPromise = null;
export function loadRecords() {
  if (!recordsPromise) recordsPromise = fetch("assets/records.json").then(r => r.json()).then(records => ({ status: Records.LOADED, records }), () => ({ status: Records.FAILED, records: [] }));
  return recordsPromise;
}

export const decade = (y) => (y ? `${Math.floor(y / 10) * 10}s` : "undated");

export function mailto(email, subject, body) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
