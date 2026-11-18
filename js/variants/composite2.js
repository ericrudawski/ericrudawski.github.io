import { esc } from "../content.js?v=150";
import { openLightbox } from "../ui.js?v=150";
import { caps } from "../text.js?v=150";
import { ouroborosHtml, mountOuroboros } from "./ouroboros.js?v=150";
import { opusHtml, mountOpus } from "./opus.js?v=150";
import { pig } from "./pig.js?v=150";

// Composite v2: the Composite's material, stripped back. One short page of collapsible sections, each opening on its own, so a row stays where it is when it is clicked. Only the long reads leave the page:
// an essay or a thesis is its own page. The section opened last is kept in the hash (#/markets), so links to it and the back button work.
export const id = "composite2";
export const label = "Composite v2";
export const inspiration = "The Composite, bare bones: one short page of collapsible sections, with only the long reads on pages of their own";

const SECTIONS = ["about", "work", "opus", "kind-words", "get-in-touch"];
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const route = () => location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);

const parts = (title, note) => `<span class="t">${title}</span>${note ? `<span class="n">${note}</span>` : ""}`;
const row = (href, title, note = "") => `<a class="c2-row" href="#/${href}">${parts(title, note)}<span class="m" aria-hidden="true">→</span></a>`;
const fold = (title, note, body, attrs = "") => `<details class="c2-fold"${attrs}><summary class="c2-row">${parts(title, note)}<span class="m" aria-hidden="true"></span></summary><div class="c2-under">${body}</div></details>`;
const section = (key, title, body, shown) => fold(title, "", `<div class="c2-wide">${body}</div>`, ` data-section="${key}"${shown.has(key) ? " open" : ""}`);
const two = (main, sub, sample) => `<b${sample ? ' class="sample"' : ""}>${main}</b>${sub ? `<small>${sub}</small>` : ""}`;
const label2 = (t) => `<h2 class="c2-label">${t}</h2>`;
// The real size of each picture, so its space is held before it loads and nothing under it moves when it arrives.
const SIZES = { g2g1: [900, 492], g2g2: [900, 492], pbi1: [900, 455], pbi2: [900, 455], pbi3: [900, 455], wood1: [900, 675], wood2: [900, 657], wood4: [900, 675], earl1: [900, 900], table1: [900, 600], paris1: [675, 900] };
const shot = (src, caption = "", sub = "") => { const [w, h] = SIZES[src.replace(/^.*\/|\.\w+$/g, "")] || [900, 600]; return `<figure><button type="button" class="shot" data-zoom data-cap="${esc(caption)}" data-sub="${esc(sub)}" aria-label="Open ${esc(caption || "this image")} full size"><img src="${esc(src)}" alt="${esc(caption)}" loading="lazy" width="${w}" height="${h}" /></button>${caption ? `<figcaption>${esc(caption)}${sub ? `<span>${esc(sub)}</span>` : ""}</figcaption>` : ""}</figure>`; };
const shots = (html, cls = "") => `<div class="c2-shots${cls}" data-shots>${html}</div>`;
const quote = (c, i) => { const t = c.testimonials[i]; return `<blockquote>“${esc(t.text)}”</blockquote><p class="c2-small"><b>${esc(t.who)}</b></p>`; };

const about = (c) => `<div class="c2-cols">${c.about.map(t => `<p>${caps(t)}</p>`).join("")}</div><p class="c2-small c2-center">${c.principles.map(esc).join(" · ")}</p>`;
const work = (c) => {
  const roles = c.experience.filter(e => (e.type === "venture" || e.type === "experience") && e.show !== false), edu = c.experience.find(e => e.type === "education");
  const list = (a) => `<ul class="c2-bullets">${a.map(b => `<li>${caps(b)}</li>`).join("")}</ul>`;
  // a role with a website is not a fold: always shown, with the company name linking out
  const fixed = (r) => `<div class="c2-static"><div class="c2-row">${parts(two(caps(r.role), `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.company)}</a>`), `${esc(r.start)} – ${esc(r.end)}`)}<span class="m" aria-hidden="true"></span></div></div>`;
  return `<p class="c2-small"><a href="${esc(c.resume)}" download>Download the resume ↓</a></p>
    <div class="c2-index">
      ${roles.map(r => r.url ? fixed(r) : fold(two(caps(r.role), esc(r.company)), `${esc(r.start)} – ${esc(r.end)}`, list(r.bullets))).join("")}
      ${fold(two(caps(edu.role), esc(edu.company)), String(edu.year), list([...edu.bullets, "Extensive Excel: advanced formulas / reporting, Power Query / Pivot.", "Advanced Analytics: Power BI / Tableau dashboards, SQL / quality data management.", "Executive Communication: story-telling presentations, management consulting."]))}
    </div>`;
};
const markets = (c, crisesOpen) => `<p>Theses, and a history of being wrong.</p>
  ${label2("Theses")}
  <div class="c2-index">${c.theses.map(t => row(`markets/${slug(t.ticker)}`, two(esc(t.company), esc(t.headline), t.sample), esc(t.ticker))).join("")}</div>
  ${label2("History")}
  <div class="c2-index">${fold("A brief history of financial crises", `${c.crises[0].year} – now`, ouroborosHtml(c.crises), ` data-crises${crisesOpen ? " open" : ""}`)}</div>
  <p class="c2-small c2-fine">For educational purposes only. Not financial advice.</p>`;
const workshop = (c) => {
  const shop = c.workshop, wood = c.writing.find(w => w.title === "Woodworking");
  return `<p>Built for the day job, and after it.</p>
    ${label2("For the day job")}
    <div class="c2-index">
      ${shop.plates.map(p => fold(two(caps(p.title), "", p.sample), "", `<p>${caps(p.text)}</p>${shots(p.views.map(v => shot(v.src, v.caption)).join(""))}<p class="c2-small">${caps(p.credit)}</p>`)).join("")}
      ${fold("Also built", `${shop.ledger.length} things`, `<ul class="c2-plain">${shop.ledger.map(r => `<li><b>${esc(r.what)}</b> <span class="c2-small">${esc(r.when)}</span><br>${caps(r.result)} <span class="c2-small">${esc(r.where)}</span></li>`).join("")}</ul>`)}
    </div>
    ${label2("After hours")}
    <div class="c2-index">
      ${fold(two("Drawings", "", true), `${shop.drawings.length} plates`, `<p>“${caps(shop.cadQuote)}” <a href="#/musings/${slug(wood.title)}">From the essay →</a></p>${shots(shop.drawings.map(d => shot(d.src, d.name, "CAD drawing")).join(""))}`)}
      ${fold("On the bench", "", `<ul class="c2-plain">${c.building.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`)}
    </div>`;
};
const musings = (c) => `<p>A digital shoebox.</p><div class="c2-index">${c.writing.map(w => row(`musings/${slug(w.title)}`, two(esc(w.headline), esc(w.deck)), esc(w.date))).join("")}</div>`;
// Every quote is laid out, unseen, in one spot behind the one showing, so the space is always that of the longest and the button never moves.
const kindWords = (c) => `<div class="c2-stack"><div class="c2-sizer" aria-hidden="true">${c.testimonials.map((t, i) => `<div>${quote(c, i)}</div>`).join("")}</div><div data-quote aria-live="polite">${quote(c, 0)}</div></div><p class="c2-small"><button type="button" class="c2-link" data-next-quote>Another ›</button> <span data-quote-n>1 of ${c.testimonials.length}</span></p>`;
const touch = (c) => `<ul class="c2-plain">${c.social.map(s => `<li><a href="${esc(s.url)}"${s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(s.name)}</a>${s.handle ? ` <span class="c2-small">${esc(s.handle)}</span>` : ""}</li>`).join("")}<li><a href="${esc(c.resume)}" download>Resume</a> <span class="c2-small">PDF, one page</span></li></ul>`;

const home = (c, open, kept) => { const shown = new Set(kept); if (open) shown.add(open); return {
  open,
  html: `<main class="c2-home">
    <h1 tabindex="-1">${esc(c.name)}</h1>
    <p class="c2-lede">The best solutions often start with new questions.</p>
    <div class="c2-index">
      ${section("about", "About", about(c), shown)}
      ${section("work", "Work", work(c), shown)}
      ${section("opus", "Opus", `<div class="cp" data-opus>${opusHtml(c)}</div>`, shown)}
      ${section("kind-words", "Kind words", kindWords(c), shown)}
      ${section("get-in-touch", "Get in touch", touch(c), shown)}
    </div>
  </main>`,
}; };

// A long read: the name goes home, and the other link goes back to the section it came from.
const frame = (c, key, name, title, lede, body) => `<header class="c2-top"><a class="home" href="#/">${esc(c.name)}</a><a href="#/${key}">← ${name}</a></header>
  <main><h1 tabindex="-1">${title}</h1>${lede ? `<p class="c2-lede">${lede}</p>` : ""}${body}</main>`;
const turn = (base, prev, next) => `<nav class="c2-turn" aria-label="More">${prev ? `<a href="#/${base}/${prev.slug}"><span>‹ Previous</span>${esc(prev.title)}</a>` : "<i></i>"}${next ? `<a class="next" href="#/${base}/${next.slug}"><span>Next ›</span>${esc(next.title)}</a>` : "<i></i>"}</nav>`;

const thesis = (c, i) => {
  const t = c.theses[i], card = (x) => x && { slug: slug(x.ticker), title: x.company };
  return { title: t.company, html: frame(c, "markets", "Markets", esc(t.company), esc(t.headline), `<article class="c2-article">
    <p class="c2-small"><span${t.sample ? ' class="sample"' : ""}>${esc(t.ticker)} · ${esc(t.sector)}${t.asOf ? ` · ${esc(t.asOf)}` : ""}</span></p>
    ${t.body.map(p => { const m = p.match(/^([A-Z][A-Z ]+): ([\s\S]*)$/); return `<p>${m ? `<span class="run">${esc(m[1].toLowerCase())}:</span> ${caps(m[2])}` : caps(p)}</p>`; }).join("")}
    ${t.model ? `<p><a href="${esc(t.model)}" download>The model, .xlsx ↓</a></p>` : ""}
    <p class="c2-small c2-fine">For educational purposes only. Not financial advice.</p>
    ${turn("markets", card(c.theses[i - 1]), card(c.theses[i + 1]))}
  </article>`) };
};
// The headline and picture stay above the text: the first essay's "six words at the top" are that headline, and the woodworking essay's "see image above" is its picture.
const essay = (c, i) => {
  const w = c.writing[i], card = (x) => x && { slug: slug(x.title), title: x.headline };
  return { title: w.headline, html: frame(c, "musings", "Musings", esc(w.headline), esc(w.deck), `<article class="c2-article">
    <p class="c2-small">${esc(w.category)} · ${esc(w.date)}</p>
    ${shots(shot(w.essayImage), " one")}
    ${w.body.map(([k, t]) => `<p><span class="run">${esc(k)}:</span> ${caps(t)}</p>`).join("")}
    <blockquote>${esc(w.quote[0])}<footer class="c2-small">${esc(w.quote[1])}</footer></blockquote>
    ${turn("musings", card(c.writing[i - 1]), card(c.writing[i + 1]))}
  </article>`) };
};

const pageFor = (c, [a, b], kept = []) => {
  if (a === "markets" && b) { const i = c.theses.findIndex(t => slug(t.ticker) === b); if (i >= 0) return thesis(c, i); }
  if (a === "musings" && b) { const i = c.writing.findIndex(w => slug(w.title) === b); if (i >= 0) return essay(c, i); }
  return SECTIONS.includes(a) ? home(c, a, kept) : home(c, null, []);
};

export function render(c) {
  return `<div class="c2">
    <button type="button" class="c2-pig" data-dark aria-label="Switch between light and dark" title="Light or dark">${pig}</button>
    <div class="c2-col" data-view>${pageFor(c, route()).html}</div>
  </div>`;
}

export function mount(root, c) {
  const html = document.documentElement, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ac = new AbortController(), { signal } = ac, view = root.querySelector("[data-view]"), page = root.querySelector(".c2");
  let pageAc = null, opusUp = false, q = 0, held = 0;
  const opened = new Set(); // what is open, oldest first: the address names the newest, and coming back from a long read reopens them all
  const foldKey = (d) => d.dataset.section || (d.matches("[data-crises]") ? "crises" : null);
  const rowFor = (p) => view.querySelector(route()[0] === "crises" ? "[data-crises] > summary" : `[data-section="${p.open}"] > summary`);
  const instant = (el) => el.scrollIntoView({ block: "start", behavior: "instant" });
  // Opus measures itself and fetches its records and map, so it waits until it is first opened.
  const startOpus = () => { const box = view.querySelector("[data-section='opus'][open] [data-opus]"); if (box && !opusUp) { opusUp = true; mountOpus(box, c, { signal: pageAc.signal, reduce }); } };
  const settle = (p) => {
    pageAc?.abort(); pageAc = new AbortController(); opusUp = false;
    if (view.querySelector("[data-section]")) { opened.clear(); view.querySelectorAll("[data-section][open], [data-crises][open]").forEach(d => opened.add(foldKey(d))); const [a] = route(); if (opened.delete(a)) opened.add(a); }
    document.title = p.title ? `${c.name} · ${p.title}` : c.name;
    const ou = view.querySelector("[data-ou]"); if (ou) mountOuroboros(ou, c.crises, { signal: pageAc.signal, reduce });
    startOpus();
  };
  const draw = () => {
    const p = pageFor(c, route(), opened);
    held = 0; page.style.minHeight = "";
    view.innerHTML = p.html; q = 0;
    settle(p);
    window.scrollTo({ top: 0, behavior: "instant" });
    view.querySelector("h1")?.focus({ preventScroll: true });
    if (p.open) instant(rowFor(p));
  };
  const first = pageFor(c, route()); settle(first);
  if (first.open) requestAnimationFrame(() => { if (!signal.aborted) instant(rowFor(first)); });
  window.addEventListener("hashchange", draw, { signal });

  // A row stays exactly where it was clicked. Closing something near the bottom would otherwise make the page too short for where you are, and the browser would drag everything down to fit.
  // So the page's height is held for the moment, and let go a little at a time as you scroll back up, which leaves no blank space behind.
  const relax = () => {
    if (!held) return;
    held = Math.min(held, Math.ceil(innerHeight - page.getBoundingClientRect().top));
    if (held <= Math.max(view.offsetHeight, innerHeight)) { held = 0; page.style.minHeight = ""; } else page.style.minHeight = `${held}px`;
  };
  const anchored = (el, change) => {
    const y = el.getBoundingClientRect().top;
    held = Math.max(held, Math.ceil(innerHeight - page.getBoundingClientRect().top)); page.style.minHeight = `${held}px`;
    change();
    const moved = el.getBoundingClientRect().top - y; if (moved) window.scrollBy({ top: moved, behavior: "instant" });
    relax();
  };
  window.addEventListener("scroll", relax, { passive: true, signal });
  window.addEventListener("resize", relax, { signal });

  // toggle does not bubble, so this listens on the way down.
  root.addEventListener("toggle", (e) => {
    const d = e.target; if (!d.matches?.("details")) return;
    const k = foldKey(d);
    if (k && d.open !== opened.has(k)) {
      if (d.open) opened.add(k); else opened.delete(k);
      const target = [...opened].filter(x => x !== "crises" || opened.has("markets")).pop() || "";
      if (view.querySelector("[data-section]") && `#/${target}` !== (location.hash || "#/")) history.replaceState(null, "", `#/${target}`);
    }
    if (d.open && d.matches("[data-section]")) startOpus();
  }, { capture: true, signal });

  root.addEventListener("click", (e) => {
    const t = e.target, row = t.closest(".c2-fold > summary");
    if (row) { e.preventDefault(); const d = row.parentElement; anchored(row, () => { d.open = !d.open; }); return; }
    if (t.closest("[data-dark]")) { window.dispatchEvent(new CustomEvent("er:theme", { detail: html.dataset.theme === "dark" ? "light" : "dark" })); return; }
    const z = t.closest("[data-zoom]");
    if (z) { const all = [...z.closest("[data-shots]").querySelectorAll("[data-zoom]")]; openLightbox(all.map(b => ({ src: b.querySelector("img").getAttribute("src"), caption: b.dataset.cap, sub: b.dataset.sub })), all.indexOf(z)); return; }
    if (t.closest("[data-next-quote]")) { q = (q + 1) % c.testimonials.length; view.querySelector("[data-quote]").innerHTML = quote(c, q); view.querySelector("[data-quote-n]").textContent = `${q + 1} of ${c.testimonials.length}`; }
  }, { signal });

  return () => {
    ac.abort(); pageAc?.abort();
    if (location.hash.startsWith("#/")) history.replaceState(null, "", location.pathname + location.search); // the next option should not inherit a route
  };
}
