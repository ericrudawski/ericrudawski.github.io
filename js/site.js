// The live site, ericrudawski.com: Composite v2 on its own, without the switcher, the circling tool or Ask.
// scripts/build_site.mjs copies this, the modules it imports and the assets they use into dist/, which is what gets deployed.
import { content } from "./content.js?v=150";
import * as site from "./variants/composite2.js?v=150";

const html = document.documentElement;
const KEY = "er.site.theme"; // the visitor's own choice from the pig; until they make one, the page follows their system
const dark = matchMedia("(prefers-color-scheme: dark)");
const chosen = () => { try { const t = localStorage.getItem(KEY); return t === "dark" || t === "light" ? t : null; } catch { return null; } };
const apply = () => { html.dataset.theme = chosen() || (dark.matches ? "dark" : "light"); };
apply();
dark.addEventListener("change", apply);
window.addEventListener("er:theme", (e) => {
  if (e.detail !== "dark" && e.detail !== "light") return;
  try { localStorage.setItem(KEY, e.detail); } catch {}
  apply();
});

const app = document.getElementById("app");
app.innerHTML = site.render(content);
site.mount(app, content);
