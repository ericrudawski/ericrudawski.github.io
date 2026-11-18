// Ten struck medals, one for each financial crisis, drawn by hand in a 120-unit box for the ouroboros. Everything is two inks:
// .k and .s are ink, .w and .u are paper, so a medal can be struck in negative just by swapping the two colors.
//   .k ink fill   .s ink line   .t fine ink line   .p paper fill with an ink outline   .w paper fill   .u paper line   .v fine paper line
const pt = (r, deg, cx = 60, cy = 60) => { const a = deg * Math.PI / 180; return [+(cx + r * Math.sin(a)).toFixed(2), +(cy - r * Math.cos(a)).toFixed(2)]; };
const flip = (d) => d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => `${+(120 - +x).toFixed(2)} ${y}`); // mirror a path of absolute coordinates left to right
const lines = (ys, x0, x1, cls = "t") => `<path class="${cls}" d="${ys.map(y => `M${x0} ${y}H${x1}`).join("")}"/>`;
const range = (a, b, step) => { const out = []; for (let v = a; step > 0 ? v <= b : v >= b; v += step) out.push(+v.toFixed(2)); return out; };
const spoked = (cx, cy, r, n, rim = 2) => {
  let d = ""; for (let k = 0; k < n; k++) { const [x, y] = pt(r - 1, k * 360 / n, cx, cy); d += `M${cx} ${cy}L${x} ${y}`; }
  return `<circle class="p" cx="${cx}" cy="${cy}" r="${r}" stroke-width="${rim}"/><path class="s" stroke-width="${r > 8 ? 1.1 : .9}" d="${d}"/><circle class="k" cx="${cx}" cy="${cy}" r="${(r * .24).toFixed(1)}"/>`;
};
const sparkle = (cx, cy, r, cls = "w") => { const q = r * .1; return `<path class="${cls}" d="M${cx} ${cy - r}C${cx + q} ${cy - r * .32} ${cx + r * .32} ${cy - q} ${cx + r} ${cy}C${cx + r * .32} ${cy + q} ${cx + q} ${cy + r * .32} ${cx} ${cy + r}C${cx - q} ${cy + r * .32} ${cx - r * .32} ${cy + q} ${cx - r} ${cy}C${cx - r * .32} ${cy - q} ${cx - q} ${cy - r * .32} ${cx} ${cy - r}Z"/>`; };

/* 1637: Semper Augustus, the flamed tulip that cost as much as a house, growing from the bulb people actually traded */
const tulip = () => {
  const leaf = "M60 83C50 80 36 70 29 49C28 46 30 45 32 47C40 58 50 66 60 74Z", vein = "M59 79C50 73 41 65 33 51";
  const back = "M43 35C43 23 46 14 50.5 9.5C55 15 57 24 57 37Z";
  const side = "M60 58C47 59 35.5 51 34.5 36C34 28 35.5 20 39 14.5C44 19 50 28 54 38C56 45 58 52 60 58Z";
  const flames = "M48.5 54C42.5 48.5 39 40 39.5 26C43.5 33.5 48 42 51 51ZM42.5 49.5C38.5 45.5 36.5 39 37 32.5C39.5 37 42.5 42 44.5 47.5Z";
  return `${lines(range(90, 106, 3.2), 10, 110)}
  <path class="s" stroke-width="2" d="M11 87C28 84 44 88.5 60 86.5C76 84.5 92 88.5 109 86"/>
  <path class="s" stroke-width="1.1" d="M55.5 100C54.5 103 52 105 51 108M60 101V109M64.5 100C65.5 103 68 105 69 108"/>
  <path class="k" d="M60 80.5C55 83 48.5 88 49 94C49.5 99.5 55 101.5 60 101.5C65 101.5 70.5 99.5 71 94C71.5 88 65 83 60 80.5Z"/>
  <path class="v" d="M60 83.5C56 87.5 54.5 94 56.5 100M60 83.5C64 87.5 65.5 94 63.5 100M60 83.5V101"/>
  <path class="s" stroke-width="3.2" d="M60 56C60 65 59.4 73 60 83"/>
  <path class="p" stroke-width="1.6" d="${leaf}"/><path class="t" d="${vein}"/><path class="p" stroke-width="1.6" d="${flip(leaf)}"/><path class="t" d="${flip(vein)}"/>
  <g transform="translate(60 58) scale(.88) translate(-60 -58)"><path class="k" d="${back}"/><path class="k" d="${flip(back)}"/>
  <path class="p" stroke-width="1.8" d="${side}"/><path class="p" stroke-width="1.8" d="${flip(side)}"/>
  <path class="k" d="${flames}"/><path class="k" d="${flip(flames)}"/>
  <path class="p" stroke-width="1.8" d="M60 58C52 52 47 42 48 31C49 23 54 16 60 11.5C66 16 71 23 72 31C73 42 68 52 60 58Z"/>
  <path class="k" d="M60 55C56.3 46 55.3 36 60 19.5C64.7 36 63.7 46 60 55ZM54.3 48C51.3 41.5 50.8 33 53 25.5C54.6 33 56 41 54.3 48ZM65.7 48C68.7 41.5 69.2 33 67 25.5C65.4 33 64 41 65.7 48Z"/></g>`;
};

/* 1873: an American steam locomotive of the day, diamond stack and cowcatcher, on the Northern Pacific's rails */
const locomotive = () => `
  <path class="p" stroke-width="1.4" d="M35 35C27 31 28 22 36 21C36 13 47 11 51 17C55 10 67 11 69 19C77 16 86 22 83 30C80 34 72 33 68 30C62 33 54 32 50 29C46 32 41 34 35 35Z"/>
  <path class="t" d="M41 22C44 20 47 21 48 24M56 19C60 17 63 19 64 23M70 22C74 21 77 23 78 26"/>
  <path class="s" stroke-width="2.4" d="M5 87H115"/>
  <path class="s" stroke-width="1.8" d="${range(10, 110, 10).map(x => `M${x} 88V92`).join("")}"/>
  <path class="k" d="M30.5 35.5H43.5L40.5 44L39.5 53H34.5L33.5 44Z"/>
  <path class="k" d="M31 52.5H72V71H31C28 71 27 66.5 27 61.5C27 56.5 28 52.5 31 52.5Z"/>
  <path class="v" d="M39 52.5V71M47 52.5V71M64 52.5V71"/>
  <path class="u" stroke-width="1.3" d="M30 57C40 56 58 56 70 57"/>
  <path class="k" d="M49.5 53C49.5 44.5 58.5 44.5 58.5 53Z"/>
  <path class="k" d="M62.5 53V49.5H64V47.5A1.3 1.3 0 0 1 66.6 47.5V49.5H68V53Z"/>
  <path class="p" stroke-width="1.4" d="M23 45.5H32.5V52.5H23Z"/><path class="k" d="M23 47.2L19 45.5V52.5L23 50.8Z"/>
  <path class="p" stroke-width="1.6" d="M72 45H97V73H72Z"/>
  <path class="k" d="M76.5 50H92.5V62H76.5Z"/><path class="u" stroke-width="1.2" d="M84.5 50V62"/>
  <path class="k" d="M67.5 45.5C77 39.5 91 39.5 101 45.5V47.5H67.5Z"/>
  <path class="k" d="M26 72H100V75.5H26Z"/>
  <path class="p" stroke-width="1.6" d="M36.5 73V85.5H11.5Z"/><path class="t" stroke-width="1.1" d="M31.5 75.5V85.5M26.5 80V85.5M21 83V85.5"/>
  ${spoked(41, 80.5, 6, 6, 1.7)}${spoked(61, 74.5, 12, 8)}${spoked(87, 74.5, 12, 8)}
  <path class="s" stroke-width="3" d="M46 76.5L87 79"/><circle class="k" cx="61" cy="77.7" r="2.2"/><circle class="k" cx="87" cy="79" r="2.2"/>`;

/* 1907: a run on the bank, depositors at the steps, and the door locked. Morgan kept the bankers in his library until they paid */
const bank = () => {
  let cols = "";
  for (const x of [30, 41, 79, 90]) cols += `<path class="w" d="M${x - 4} 51H${x + 4}V84H${x - 4}Z"/><path class="t" d="M${x - 1.6} 53V83M${x + 1.6} 53V83"/><path class="p" stroke-width="1" d="M${x - 5} 49.5H${x + 5}V52H${x - 5}Z"/><path class="p" stroke-width="1" d="M${x - 5} 82.5H${x + 5}V85H${x - 5}Z"/>`;
  let crowd = "";
  for (const [x, y, h] of [[28, 98.5, 1], [37.5, 100, 0], [47, 99, 1], [56.5, 100.5, 0], [66, 99, 1], [75.5, 100.5, 0], [85, 98.5, 1], [93.5, 100, 0]])
    crowd += `<circle class="k" cx="${x}" cy="${y}" r="3.2"/><path class="k" d="M${x - 5} ${y + 11}C${x - 5} ${y + 4.5} ${x - 3} ${y + 3} ${x} ${y + 3}C${x + 3} ${y + 3} ${x + 5} ${y + 4.5} ${x + 5} ${y + 11}Z"/>` + (h ? `<path class="k" d="M${x - 4.6} ${y - 2}H${x + 4.6}V${y - 1}H${x - 4.6}ZM${x - 2.8} ${y - 2}V${y - 5.4}H${x + 2.8}V${y - 2}Z"/>` : `<path class="k" d="M${x - 3.6} ${y - 1.4}C${x - 3.6} ${y - 5.4} ${x + 3.6} ${y - 5.4} ${x + 3.6} ${y - 1.4}Z"/>`);
  return `
  <path class="k" d="M60 17L100 39.5H20Z"/>
  <path class="u" stroke-width="1.2" d="M60 22.5L88 37.5H32Z"/><circle class="w" cx="60" cy="32" r="3.1"/>
  <path class="k" d="M22 41H98V47.5H22Z"/>
  <path class="v" d="${range(26, 94, 4).map(x => `M${x} 42.5V46`).join("")}"/>
  <path class="k" d="M24 49H96V85H24Z"/>
  ${cols}
  <path class="w" d="M51 54C51 51 69 51 69 54V85H51Z"/><path class="s" stroke-width="1.4" d="M51 85V54.5C51 50.5 69 50.5 69 54.5V85"/>
  <circle class="k" cx="60" cy="64" r="4.6"/><path class="k" d="M58.2 66.5L55.8 79H64.2L61.8 66.5Z"/>
  <path class="p" stroke-width="1.2" d="M20 85H100V89H20Z"/><path class="p" stroke-width="1.2" d="M15 89H105V93H15Z"/>
  ${crowd}`;
};

/* 1929: the stock ticker under its glass dome, running hours behind while the tape piled up */
const ticker = () => {
  let teeth = ""; for (let k = 0; k < 18; k++) { const a = k * 20, [x0, y0] = pt(12, a - 5, 58, 53), [x1, y1] = pt(15, a - 3, 58, 53), [x2, y2] = pt(15, a + 3, 58, 53), [x3, y3] = pt(12, a + 5, 58, 53); teeth += `M${x0} ${y0}L${x1} ${y1}L${x2} ${y2}L${x3} ${y3}Z`; }
  let spokes = ""; for (let k = 0; k < 6; k++) { const [x, y] = pt(11, k * 60, 58, 53); spokes += `M58 53L${x} ${y}`; }
  const tape = "M70 45C80 37 98 38 101 50C103 60 91 62 90 70C89 79 101 79 102 88C102.6 94 96 99 90 102";
  return `<g transform="translate(0 3)">
  <path class="s" stroke-width="2.4" d="M31 89V49C31 30 44 16 58 16C72 16 85 30 85 49V89"/>
  <circle class="k" cx="58" cy="13.5" r="3.2"/>
  <path class="t" stroke-width="1.1" d="M37 53C37 40 43 29 51 24M41 56C41 47 44 40 48 35"/>
  <path class="k" d="M26 89H90L95 98H21Z"/><path class="v" stroke-width="1" d="M27.5 92.5H88.5"/>
  <path class="k" d="M40 82H76V89H40Z"/>
  <path class="s" stroke-width="2" d="M44 80V64M72 80V64M44 64H72"/>
  <path class="k" d="${teeth}"/><circle class="k" cx="58" cy="53" r="12.3"/>
  <circle class="w" cx="58" cy="53" r="9.4"/><path class="s" stroke-width="1.5" d="${spokes.replace(/L[\d.]+ [\d.]+/g, m => m)}"/><circle class="k" cx="58" cy="53" r="2.7"/>
  <path class="p" stroke-width="1.2" d="M41 70H47V80H41ZM69 70H75V80H69Z"/><path class="t" d="M41 72.5H47M41 75H47M41 77.5H47M69 72.5H75M69 75H75M69 77.5H75"/>
  <path class="s" stroke-width="6.2" stroke-linecap="butt" d="${tape}"/><path class="u" stroke-width="3.9" stroke-linecap="butt" d="${tape}"/>
  <path class="s" stroke-width="1.15" stroke-dasharray="2.4 1.2 1.2 1.2 3.2 2.6" stroke-linecap="butt" d="${tape}"/></g>`;
};

/* 1973: a filling station pump struck out of a drop of crude. No gas today */
const pump = () => `<g transform="translate(60 58) scale(.94) translate(-60 -58)">
  <path class="k" d="M60 8C60 8 97 49 97 72C97 93 80 106 60 106C40 106 23 93 23 72C23 49 60 8 60 8Z"/>
  <path class="v" d="M31 71C31 58 41 44 50 32"/>
  <circle class="w" cx="59" cy="39" r="9.5"/><circle class="s" stroke-width="1.2" cx="59" cy="39" r="6.6"/><path class="k" d="M57 35.5H61.5V36.9H58.7V38.3H61V39.7H58.7V41.2H61.5V42.6H57Z"/>
  <path class="w" d="M46.5 49.5H71.5C73.5 49.5 75 51 75 53V91H43V53C43 51 44.5 49.5 46.5 49.5Z"/>
  <path class="k" d="M47.5 54.5H70.5V67H47.5Z"/>
  <path class="w" d="M49.5 57.5H54.8V64H49.5ZM56.5 57.5H61.8V64H56.5ZM63.5 57.5H68.8V64H63.5Z"/>
  <path class="s" stroke-width="1.2" d="M52.1 59.2V62.3M59.1 59.2V62.3M66.1 59.2V62.3"/>
  <path class="s" stroke-width="1.6" d="M49 72.5H69V88H49Z"/><path class="s" stroke-width="2.4" d="M54 76.5L64 84.5M64 76.5L54 84.5"/>
  <path class="w" d="M38.5 91H79.5V96H38.5Z"/>
  <path class="u" stroke-width="2.5" d="M75 60C84 59 90 64 89 74C88.5 81 85 85 81 83"/>
  <path class="w" d="M74.5 54H79.5L81 59H74.5ZM78.5 80L84 79.5L84.5 87L78 88Z"/></g>`;

/* 1987: the terminal that sold into the fall. Program trading, one session, 22.6 percent */
const terminal = () => `<g transform="translate(60 60) scale(.87) translate(-60 -58)">
  <path class="p" stroke-width="2.2" d="M26 15H94C97.5 15 100 17.5 100 21V63C100 66.5 97.5 69 94 69H26C22.5 69 20 66.5 20 63V21C20 17.5 22.5 15 26 15Z"/>
  <path class="k" d="M31 21.5H89C91.5 21.5 93 23 93 25.5V58C93 60.5 91.5 62 89 62H31C28.5 62 27 60.5 27 58V25.5C27 23 28.5 21.5 31 21.5Z"/>
  <path class="v" stroke-width=".55" d="${range(25, 60, 3.5).map(y => `M28.5 ${y}H91.5`).join("")}"/>
  <path class="u" stroke-width="2.6" stroke-linejoin="miter" d="M31 45L37 41.5L42 43.5L48 36.5L53 39L59 30L64 33L69 27.5L73 29L79 56L82.5 52L88 58"/>
  <path class="k" d="M46 69H74L77 77H43Z"/><circle class="w" cx="88" cy="65.6" r="1.3"/>
  <path class="p" stroke-width="2" d="M27 80H93L103 102H17Z"/>
  <path class="s" stroke-width="1" d="M24.3 85.5H95.7M22 91H98M19.6 96.5H100.4"/>
  <path class="s" stroke-width="1" d="${[[36, 34.5], [46, 45], [56, 55.5], [66, 66], [76, 76.5], [86, 87.5]].map(([a, b]) => `M${a} 80.5L${a - (a - 60) * .28} 101.5`).join("")}"/>
  <path class="k" d="M43 96.8H77L77.6 101.4H42.4Z"/></g>`;

/* 2000: the dot-com bubble, popped by a single click */
const bubble = () => {
  const c = [54, 52], r = 37, [ax, ay] = pt(r, 122, ...c), [bx, by] = pt(r, 148, ...c), cA = pt(r - .5, 188, ...c), cB = pt(r - .5, 292, ...c);
  const drops = [[92, 72, 2], [99, 60, 1.5], [87, 84, 1.3], [62, 101, 2], [50, 99, 1.4], [103, 76, 1.2]].map(([x, y, q]) => `<circle class="k" cx="${x}" cy="${y}" r="${q}"/>`).join("");
  return `
  <path class="s" stroke-width="3" d="M${ax} ${ay}A${r} ${r} 0 1 0 ${bx} ${by}"/>
  <path class="k" d="M${cA[0]} ${cA[1]}A${r} ${r} 0 0 1 ${cB[0]} ${cB[1]}A${(r * 1.18).toFixed(1)} ${(r * 1.18).toFixed(1)} 0 0 0 ${cA[0]} ${cA[1]}Z"/>
  <path class="t" stroke-width="1.6" d="M30 41C33.5 33 40 27 48 24.5"/><path class="t" stroke-width="1.1" d="M27.5 49C28 47.5 28.3 46.3 29 45"/>
  <path class="t" stroke-width="1" d="M66 80C73 77 78 72 81 66M60 83C71 82 80 75 85 62"/>
  <text class="kt" x="54" y="59.5" text-anchor="middle" font-family="Courier Prime, Courier New, monospace" font-weight="700" font-size="24" letter-spacing="-1">.com</text>
  <path class="s" stroke-width="2" d="M88 66L95 60M94 72L103 70M79 84L83 92M72 90L72.5 98"/>
  ${drops}
  <path class="p" stroke-width="2.4" stroke-linejoin="round" d="M69 68V96.5L76 90L81.5 102L88 99L82.5 87.5H92Z"/>`;
};

/* 2008: the house that secured the loan, split down the middle and for sale at any price */
const house = () => {
  const left = "M43 20L10 49L14.5 54L19 50V91H44L40 81L46 72L40.5 62L46.5 52L41.5 42L45.5 32Z";
  const right = "M49 25L45 35L50 45L44 55L50 65L44.5 75L49 86L50 95H75V56L79 60L84 55Z";
  const crack = "M45.5 32L41.5 42L46.5 52L40.5 62L46 72L40 81L44 91L50 95L49 86L44.5 75L50 65L44 55L50 45L45 35L49 25L43 20Z";
  return `
  <path class="k" d="M18 25H25V38L18 44Z"/><path class="k" d="M16.5 22H26.5V25.5H16.5Z"/>
  <path class="p" stroke-width="2" d="${left}"/>
  <path class="p" stroke-width="2" d="${right}"/>
  <path class="k" d="${crack}"/>
  <path class="k" d="M43 20L10 49L14.5 54L42.3 29.5L45.5 32ZM49 25L84 55L79 60L47 31.8Z"/>
  <path class="v" stroke-width="1" d="M20 41.5L24.5 45.5M27 35.5L31.5 39.5M34 29.5L38 33.5M56 37L52.5 41M63 43L59.5 47M70 48.8L66.5 53"/>
  <path class="k" d="M24 58H35V71H24Z"/><path class="u" stroke-width="1.2" d="M29.5 58V71M24 64.5H35"/>
  <path class="k" d="M55 62H67V75H55Z"/><path class="u" stroke-width="1.2" d="M61 62V75M55 68.5H67"/>
  <path class="k" d="M25 78H35V91H25Z"/><circle class="w" cx="32.6" cy="85" r=".9"/>
  <path class="s" stroke-width="2.4" d="M9 92C20 91 32 91 44 91L50 97L56 96C68 96 88 97 112 96"/>
  <path class="t" d="M14 97H42M56 101H98M28 102H48M66 106H86"/>
  <path class="s" stroke-width="3" d="M95 58V96"/>
  <path class="p" stroke-width="1.8" d="M84 61H106V77H84Z"/>
  <path class="s" stroke-width="1.5" d="M87.5 65.5H102.5M87.5 69H102.5M87.5 72.5H97"/>`;
};

/* 2020: the virus, with its crown of spikes */
const virus = () => {
  const cx = 60, cy = 60, R = 27;
  let back = "", front = "";
  for (let k = 0; k < 14; k++) {
    const a = k * 360 / 14 + 8, [sx, sy] = pt(R - 1, a, cx, cy), [ex, ey] = pt(R + 11, a, cx, cy), [hx, hy] = pt(R + 14.5, a, cx, cy);
    back += `<path class="s" stroke-width="3" stroke-linecap="butt" d="M${sx} ${sy}L${ex} ${ey}"/><circle class="k" cx="${hx}" cy="${hy}" r="4.3"/><circle class="w" cx="${(hx - 1).toFixed(2)}" cy="${(hy - 1).toFixed(2)}" r="1.1"/>`;
  }
  for (const [x, y, q] of [[50, 46, 3.1], [67, 44, 2.6], [41, 62, 2.7], [59, 60, 3.4], [75, 56, 2.5], [49, 76, 2.6], [66, 75, 2.9]]) {
    const dx = (x - cx) / R, dy = (y - cy) / R;
    front += `<path class="s" stroke-width="1.4" d="M${x} ${y}L${(x + dx * 5).toFixed(1)} ${(y + dy * 5).toFixed(1)}"/><circle class="k" cx="${(x + dx * 5).toFixed(1)}" cy="${(y + dy * 5).toFixed(1)}" r="${q}"/><circle class="w" cx="${(x + dx * 5 - .9).toFixed(1)}" cy="${(y + dy * 5 - .9).toFixed(1)}" r=".8"/>`;
  }
  const shade = range(3, 21, 3).map((d, i) => `<circle class="t" stroke-width="${(.7 + i * .07).toFixed(2)}" cx="${(cx - 7 - d * .32).toFixed(1)}" cy="${(cy - 7 - d * .32).toFixed(1)}" r="${(R + 6 - d * .45).toFixed(1)}"/>`).join("");
  return `<defs><clipPath id="ou-virus"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs>${back}
  <circle class="p" stroke-width="2.2" cx="${cx}" cy="${cy}" r="${R}"/>
  <g clip-path="url(#ou-virus)">${shade}</g>${front}<circle class="s" stroke-width="2.2" cx="${cx}" cy="${cy}" r="${R}"/>`;
};

/* 2026: the chip the track is being laid for, with the sparkle everything now wears */
const chip = () => {
  const P = range(36, 84, 9.6);
  const pins = P.map(v => `<path class="k" d="M${v - 2} 17H${v + 2}V30H${v - 2}ZM${v - 2} 90H${v + 2}V103H${v - 2}ZM17 ${v - 2}H30V${v + 2}H17ZM90 ${v - 2}H103V${v + 2}H90Z"/>`).join("");
  return `<g transform="translate(60 60) scale(.9) translate(-60 -60)">${pins}
  <path class="k" d="M31 26H89C92 26 94 28 94 31V89C94 92 92 94 89 94H31C28 94 26 92 26 89V31C26 28 28 26 31 26Z"/>
  <path class="u" stroke-width="1" d="M31 31H89V89H31Z"/>
  <path class="v" stroke-width=".95" d="M36 40H44L48 44M36 49H42M84 40H76L72 44M84 49H78M36 80H44L48 76M36 71H42M84 80H76L72 76M84 71H78M45 36V42M75 36V42M45 84V78M75 84V78M54 36V44M66 36V44M54 84V76M66 84V76"/>
  <circle class="w" cx="36" cy="40" r="1.3"/><circle class="w" cx="84" cy="40" r="1.3"/><circle class="w" cx="36" cy="80" r="1.3"/><circle class="w" cx="84" cy="80" r="1.3"/><circle class="w" cx="36" cy="49" r="1"/><circle class="w" cx="84" cy="49" r="1"/><circle class="w" cx="36" cy="71" r="1"/><circle class="w" cx="84" cy="71" r="1"/>
  ${sparkle(60, 60, 21)}${sparkle(76, 45, 6)}${sparkle(45, 75, 4.6)}</g>`;
};

const ART = { 1637: tulip, 1873: locomotive, 1907: bank, 1929: ticker, 1973: pump, 1987: terminal, 2000: bubble, 2008: house, 2020: virus, 2026: chip };
const beads = Array.from({ length: 48 }, (_, k) => { const [x, y] = pt(53, k * 7.5); return `<circle class="k" cx="${x}" cy="${y}" r=".95"/>`; }).join("");

// The clip the medals share, once in the page.
export const medalDefs = `<svg class="ou-defs" width="0" height="0" aria-hidden="true"><defs><clipPath id="ou-field"><circle cx="60" cy="60" r="48.4"/></clipPath></defs></svg>`;
export const medal = (year) => `<svg viewBox="0 0 120 120" aria-hidden="true"><circle class="w" cx="60" cy="60" r="58.6"/><circle class="s" stroke-width="1.8" cx="60" cy="60" r="58.4"/>${beads}<circle class="s" stroke-width="1.1" cx="60" cy="60" r="49"/><g clip-path="url(#ou-field)">${ART[year]()}</g></svg>`;
