import { esc } from "./content.js?v=150";

// Acronyms are set in small caps, as a typesetter would: FP&A, SAP, KPIs. Escapes as it goes.
// It lives here rather than in Monograph, where it began, so the live site can use it without carrying the Monograph option along.
export const caps = (s) => String(s).split(/(\b[A-Z][A-Z&0-9]+s?\b)/).map((t, i) => i % 2 ? `<span class="caps">${esc(t)}</span>` : esc(t)).join("");
