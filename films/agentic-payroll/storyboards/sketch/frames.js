/* Agentic Payroll · storyboard frames.
   Every frame is 1600×900 and deterministic (seeded values only), so the stills re-render identically.
   frames.html?f=A4 renders one frame (used by render.cjs); frames.html renders all of them. */
(function () {
  "use strict";
  const W = 1600, H = 900;

  /* ---------- helpers ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const A = (x, y, w, h) => `position:absolute;left:${x}px;top:${y}px;` + (w != null ? `width:${w}px;` : "") + (h != null ? `height:${h}px;` : "");
  const div = (style, inner = "", cls = "") => `<div${cls ? ` class="${cls}"` : ""} style="${style}">${inner}</div>`;
  const txt = (x, y, s, style = "", cls = "sub") => div(`position:absolute;left:${x}px;top:${y}px;${style}`, s, cls);
  const centerText = (y, s, style = "", cls = "sub") => div(`position:absolute;left:0;right:0;top:${y}px;text-align:center;${style}`, s, cls);

  const ICON = {
    arrowR: (c = "currentColor", s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" style="display:inline-block;vertical-align:-5px;margin-left:10px"><path d="M4 12h15M13 6l6 6-6 6" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    arrowUp: (c = "#F3F6FB") => `<svg width="52" height="52" viewBox="0 0 52 52" style="position:absolute;left:0;top:0"><path d="M26 36V16M17 25l9-9 9 9" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    cursor: () => `<svg width="34" height="44" viewBox="0 0 34 44"><path d="M3 2l26 22-12 2 7 14-6 3-7-14-8 8z" fill="#F3F6FB" stroke="#0A0E1A" stroke-width="2" stroke-linejoin="round"/></svg>`,
    turnstile: (c) => `<svg viewBox="0 0 64 64" width="100%" height="100%"><g stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="14" width="14" height="40" rx="3"/><path d="M28 26h24M28 26l14-9M28 26l12 12"/><path d="M8 54h48"/><circle cx="21" cy="20" r="2"/></g></svg>`,
    cardReader: (c) => `<svg viewBox="0 0 64 64" width="100%" height="100%"><g stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="8" width="32" height="48" rx="6"/><rect x="22" y="15" width="20" height="12" rx="2"/><path d="M24 36h16M24 42h10"/><path d="M40 44l12-6v14l-12 6z"/></g></svg>`,
    finger: (c) => `<svg viewBox="0 0 64 64" width="100%" height="100%"><g stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"><rect x="12" y="6" width="40" height="52" rx="8"/><path d="M24 44c0-10 2-20 8-20s8 8 8 14"/><path d="M28 46c0-8 1-15 4-15s4 5 4 9"/><path d="M20 38c0-12 4-20 12-20s12 7 12 16"/></g></svg>`,
    cloud: (c) => `<svg viewBox="0 0 64 64" width="100%" height="100%"><g stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 44h30a10 10 0 0 0 0-20 14 14 0 0 0-27-3A11 11 0 0 0 18 44z"/><path d="M28 50l4 4 4-4M32 54V40"/></g></svg>`,
    sheet: (c) => `<svg viewBox="0 0 64 64" width="100%" height="100%"><g stroke="${c}" stroke-width="2.4" fill="none"><rect x="10" y="8" width="44" height="48" rx="5"/><path d="M10 20h44M10 32h44M10 44h44M25 8v48M40 8v48"/></g></svg>`,
    doc: (c) => `<svg viewBox="0 0 40 50" width="100%" height="100%"><g stroke="${c}" stroke-width="2" fill="none" stroke-linejoin="round"><path d="M4 2h22l10 10v36H4z"/><path d="M26 2v10h10M10 22h20M10 29h20M10 36h13"/></g></svg>`,
  };

  function bokeh(seed, n, o = {}) {
    const { x0 = 0, y0 = 0, x1 = W, y1 = H, rmin = 8, rmax = 90, color = "79,134,240", amin = 0.05, amax = 0.24, bmin = 0, bmax = 5 } = o;
    const r = rng(seed); let s = "";
    for (let i = 0; i < n; i++) {
      const d = rmin + (rmax - rmin) * Math.pow(r(), 1.7), x = x0 + (x1 - x0) * r(), y = y0 + (y1 - y0) * r();
      const a = amin + (amax - amin) * r(), b = bmin + (bmax - bmin) * r();
      s += div(A(x - d / 2, y - d / 2, d, d) + `border-radius:50%;background:radial-gradient(circle, rgba(${color},${a.toFixed(3)}) 0%, rgba(${color},${(a * 0.55).toFixed(3)}) 48%, rgba(${color},0) 70%);filter:blur(${b.toFixed(1)}px)`);
    }
    return s;
  }

  function floorGrid(o = {}) {
    const { top = 600, color = "120,160,255", alpha = 0.34, size = 32, persp = 620, rot = 78, h = 620 } = o;
    return div(`position:absolute;left:-700px;width:3000px;top:${top}px;height:${h}px;transform-origin:50% 0;transform:perspective(${persp}px) rotateX(${rot}deg);` +
      `background-image:radial-gradient(circle, rgba(${color},${alpha}) 1.7px, transparent 2.2px);background-size:${size}px ${size}px;background-position:center 0;` +
      `-webkit-mask-image:linear-gradient(to bottom, transparent 0%, #000 18%, #000 55%, transparent 95%);mask-image:linear-gradient(to bottom, transparent 0%, #000 18%, #000 55%, transparent 95%);`);
  }

  function beam(o = {}) {
    const { x = W / 2, top = -80, w0 = 150, w1 = 1000, h = 860, a = 0.22 } = o;
    const l = 50 - (w0 / w1) * 50, r = 50 + (w0 / w1) * 50;
    return div(`position:absolute;left:${x - w1 / 2}px;top:${top}px;width:${w1}px;height:${h}px;filter:blur(16px);`,
      div(`position:absolute;inset:0;clip-path:polygon(${l}% 0, ${r}% 0, 100% 100%, 0 100%);background:linear-gradient(180deg, rgba(196,216,255,${a}) 0%, rgba(120,160,255,${a * 0.42}) 48%, rgba(28,95,212,0) 100%);`));
  }

  function glow(x, y, rx, ry, color = "28,95,212", a = 0.35) {
    return div(A(x - rx, y - ry, rx * 2, ry * 2) + `border-radius:50%;background:radial-gradient(closest-side, rgba(${color},${a}), rgba(${color},${a * 0.35}) 55%, rgba(${color},0));`);
  }

  function core(o) {
    const { x, y, d, ring = true, halo = 1, style = "" } = o;
    const posi = x == null ? `position:relative;flex:none;width:${d}px;height:${d}px;` : A(x - d / 2, y - d / 2, d, d);
    return div(posi + style,
      div(`opacity:${halo}`, "", "halo") + div("", "", "ball") + (ring ? div("", "", "ring") : ""), "core");
  }

  function glassBox(o, inner = "") {
    const { x, y, w, h, r = 22, tilt = "", depth = 0, cls = "glass", style = "", faceStyle = "" } = o;
    const edge = depth ? div(`position:absolute;inset:0;border-radius:${r}px;transform:translateZ(-${depth}px) translate(0,${Math.round(depth * 0.35)}px);`, "", "edge") : "";
    return div(A(x, y, w, h) + `transform-style:preserve-3d;transform:${tilt};${style}`,
      edge + div(`position:absolute;inset:0;border-radius:${r}px;overflow:hidden;${faceStyle}`, inner, cls));
  }

  function chatWindow(o) {
    const { x, y, w, h, tilt = "", depth = 18, prompt = "", caret = true, send = "", inner = "", titleSize = 25, promptSize = 23, style = "", faceStyle = "" } = o;
    const head = div(`position:absolute;left:0;right:0;top:0;height:74px;display:flex;align-items:center;gap:14px;padding:0 24px;border-bottom:1px solid rgba(170,200,255,.16);`,
      core({ d: 30, ring: false, halo: 0.7 }) +
      `<span style="font-size:${titleSize}px;font-weight:700;letter-spacing:-0.01em;color:var(--ink);white-space:nowrap">Agentic Payroll</span>` +
      `<span class="pill">AI Destekli</span>`);
    const input = div(`position:absolute;left:24px;right:24px;bottom:22px;height:74px;border-radius:18px;background:rgba(8,13,28,.55);border:1px solid rgba(170,200,255,.26);box-shadow:inset 0 2px 10px rgba(0,0,0,.35);`,
      div(`position:absolute;left:24px;right:84px;top:0;height:74px;display:flex;align-items:center;font-size:${promptSize}px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden`,
        prompt + (caret ? `<span style="display:inline-block;width:2px;height:28px;margin-left:4px;background:var(--blue-l);box-shadow:0 0 8px var(--blue-l)"></span>` : "")) +
      div("", ICON.arrowUp(), "send " + send));
    return glassBox({ x, y, w, h, tilt, depth, style, faceStyle }, head + inner + input);
  }

  function card(o) {
    const { x, y, w = 620, h = 150, dot = "red", head, body, btn = "İncele", tilt = "", style = "", bodySize = 24, depth = 10 } = o;
    const inner =
      div(A(28, 32, 16, 16), "", "dot " + dot) +
      div(A(60, 26) + "font-size:17px;font-weight:600;color:#9DB3E0;white-space:nowrap", head) +
      div(A(60, 58) + `font-size:${bodySize}px;font-weight:650;color:var(--ink);white-space:nowrap;letter-spacing:-0.01em`, body) +
      (btn ? div(`position:absolute;right:22px;bottom:20px;`, btn, "btn") : "");
    return glassBox({ x, y, w, h, r: 20, tilt, depth, style }, inner);
  }

  function statusPill(x, y, s, color = "green", style = "") {
    return div(`position:absolute;left:${x}px;top:${y}px;${style}`, s, "status");
  }

  function logoPH(x, y, w, h, label, style = "") {
    return div(A(x, y, w, h) + style, label, "logo-ph");
  }

  function cta(x, y, style = "") {
    return div(`position:absolute;left:${x}px;top:${y}px;${style}`, "Ücretsiz Demo Talep Edin" + ICON.arrowR("#FFF7F2", 26), "cta");
  }

  function iconTile(x, y, s, icon, o = {}) {
    const { color = "#A9C6FF", tilt = "", cls = "glass soft", r = 26 } = o;
    return glassBox({ x, y, w: s, h: s, r, tilt, cls }, div(A(s * 0.2, s * 0.2, s * 0.6, s * 0.6), ICON[icon](color)));
  }

  function bars3d(o) {
    const { x, base, values, labels, bw = 70, gap = 30, scale = 200, t = 16, color = "28,95,212", valueFmt = null, labelColor = "#AFC3EA" } = o;
    let s = "";
    values.forEach((v, i) => {
      const h = v * scale, bx = x + i * (bw + gap), by = base - h;
      s += div(A(bx, by, bw, h) + `background:linear-gradient(180deg, rgba(120,165,255,.55), rgba(${color},.42) 40%, rgba(${color},.22));border:1px solid rgba(169,198,255,.55);box-shadow:inset 0 1px 0 rgba(235,242,255,.5), 0 0 26px rgba(${color},.35);`);
      s += div(A(bx + t / 2, by - t, bw, t) + `background:rgba(169,198,255,.45);border:1px solid rgba(200,220,255,.6);transform:skewX(-45deg);transform-origin:0 100%;`);
      s += div(A(bx + bw, by - t / 2, t, h) + `background:rgba(20,50,120,.55);border:1px solid rgba(120,165,255,.35);transform:skewY(-45deg);transform-origin:0 0;`);
      if (labels) s += div(A(bx - 20, base + 14, bw + 40) + `text-align:center;font-size:16px;font-weight:600;color:${labelColor};white-space:nowrap`, labels[i]);
      if (valueFmt) s += div(A(bx - 30, by - t - 34, bw + 60) + "text-align:center;font-size:17px;font-weight:700;color:var(--ink);white-space:nowrap", valueFmt(v, i));
    });
    return s;
  }

  function table(o) {
    const { x, y, w, rows, title, tilt = "", rowH = 46, cls = "glass" } = o;
    const h = 70 + rows.length * rowH + 14;
    let inner = div(A(24, 22) + "font-size:19px;font-weight:700;color:var(--ink);white-space:nowrap", title);
    rows.forEach((r, i) => {
      const ry = 66 + i * rowH;
      inner += div(A(24, ry, w - 48, rowH) + "border-top:1px solid rgba(170,200,255,.14);");
      inner += div(A(24, ry + 12) + "font-size:17px;font-weight:500;color:var(--text2);white-space:nowrap", r[0]);
      inner += div(`position:absolute;right:24px;top:${ry + 11}px;font-size:18px;font-weight:700;color:var(--ink);white-space:nowrap;font-variant-numeric:tabular-nums`, r[1]);
    });
    return glassBox({ x, y, w, h, r: 20, tilt, cls }, inner);
  }

  function xlsx(x, y, s = 150, o = {}) {
    const { tilt = "", label = "Puantaj_Eylül.xlsx" } = o;
    const inner = div(A(s * 0.18, s * 0.12, s * 0.64, s * 0.52), ICON.sheet("#CFE0FF")) +
      div(A(0, s * 0.72, s) + `text-align:center;font-size:${Math.round(s * 0.1)}px;font-weight:600;color:var(--text);white-space:nowrap`, label);
    return glassBox({ x, y, w: s, h: s * 1.02, r: 18, tilt, depth: 14 }, inner);
  }

  function svg(inner, style = "") {
    return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0;overflow:visible;${style}">${inner}</svg>`;
  }

  const bgBase = (extra = "") => div(`position:absolute;inset:0;background:${extra}radial-gradient(1200px 640px at 50% 32%, rgba(28,95,212,.20), transparent 62%), linear-gradient(180deg,#0B1122 0%,#0A0E1A 58%,#0B1020 100%);`);

  /* =====================================================================
     A · Cam Stüdyo
     ===================================================================== */
  function glassNumeral(t, o) {
    const { x, y, size, fill = 0.62 } = o;
    const base = `font-size:${size}px;font-weight:800;letter-spacing:-0.045em;line-height:1;white-space:nowrap;`;
    let ext = [];
    for (let i = 1; i <= 14; i++) ext.push(`${(i * 1.4).toFixed(1)}px ${(i * 1.9).toFixed(1)}px 0 rgba(${18 + i * 2},${44 + i * 2},${104 + i * 3},${(0.62 - i * 0.02).toFixed(2)})`);
    const top = (1 - fill) * 100;
    const L = (st, cl = "") => div(`position:absolute;left:0;top:0;${base}${st}`, t, cl);
    return div(`position:absolute;left:${x}px;top:${y}px;transform:translate(-50%,-50%);`,
      div(`position:relative;${base}color:rgba(30,72,170,.40);text-shadow:${ext.join(",")}`, t) +
      L(`color:rgba(150,188,255,.13);filter:drop-shadow(0 0 1.2px rgba(220,233,255,.95)) drop-shadow(0 0 12px rgba(79,134,240,.55))`) +
      L(`color:rgba(58,118,236,.80);clip-path:inset(${top.toFixed(1)}% 0 0 0);text-shadow:0 0 36px rgba(28,95,212,.95)`) +
      L(`color:rgba(128,172,255,.85);clip-path:inset(${top.toFixed(1)}% 0 ${(100 - top - 9).toFixed(1)}% 0)`) +
      L(`color:rgba(226,236,255,.98);clip-path:inset(${top.toFixed(1)}% 0 ${(100 - top - 1.1).toFixed(1)}% 0)`) +
      L(`color:rgba(243,246,251,.24);clip-path:polygon(9% 0,15% 0,7% 100%,1% 100%)`));
  }

  function accordion(cx, cy, o = {}) {
    // calendar pages of the closing period; spacing shrinks left → right, i.e. the period compresses
    const { n = 14, w = 118, h = 168, g0 = 150, g1 = 34, angle = 58, alpha = 0.5 } = o;
    const days = ["22", "23", "24", "25", "26", "27", "28", "29", "30", "1", "2", "3", "4", "5"];
    let s = "", x = 0;
    const xs = [];
    for (let i = 0; i < n; i++) { xs.push(x); x += g0 + (g1 - g0) * (i / (n - 1)); }
    const off = xs[n - 1] / 2;
    for (let i = 0; i < n; i++) {
      const a = (i % 2 ? 1 : -1) * (angle + i * 1.5);
      s += div(A(xs[i] - off - w / 2, -h / 2, w, h) + `border-radius:12px;transform:rotateY(${a}deg);opacity:${alpha};filter:blur(0.8px)`,
        div(A(12, 9) + "font-size:13px;font-weight:700;letter-spacing:.06em;color:rgba(169,198,255,.85)", i < 9 ? "EYL" : "EKİ") +
        div(A(10, 74) + "font-size:78px;font-weight:200;letter-spacing:-0.05em;color:rgba(229,231,235,.8);line-height:1", days[i]), "glass soft");
    }
    return div(`position:absolute;left:${cx}px;top:${cy}px;transform-style:preserve-3d;perspective:1100px;`, div("position:absolute;left:0;top:0;transform-style:preserve-3d;", s));
  }

  const F = {};
  const AFTER = [];

  F.A1 = () =>
    bgBase() + floorGrid({ top: 640 }) +
    glow(800, 700, 520, 70, "28,95,212", 0.45) +
    beam({ x: 800, w0: 170, w1: 1100, a: 0.24 }) +
    accordion(800, 292, { alpha: 0.55 }) +
    glassNumeral("%45", { x: 800, y: 405, size: 400, fill: 0.6 }) +
    bokeh(11, 16, { y0: 60, y1: 620, rmin: 10, rmax: 120, amin: 0.04, amax: 0.16, bmax: 6 }) +
    centerText(752, "Bordro dönem kapanışınızı %45 hızlandıracak", "font-size:42px;");

  F.A2 = () => {
    const wave = div(A(0, 0, 1000, 560) + "overflow:hidden;border-radius:22px;",
      [90, 190, 310, 450].map((r, i) => div(A(1000 - 60 - r, 560 - 58 - r, r * 2, r * 2) + `border-radius:50%;border:${3 - i * 0.5}px solid rgba(232,80,10,${(0.75 - i * 0.16).toFixed(2)});box-shadow:0 0 ${24 - i * 4}px rgba(232,80,10,${(0.5 - i * 0.1).toFixed(2)}), inset 0 0 ${20 - i * 3}px rgba(232,80,10,${(0.3 - i * 0.06).toFixed(2)})`)).join(""));
    const cur = div(A(1000 - 70, 560 - 44), ICON.cursor());
    return bgBase() + floorGrid({ top: 690 }) +
      div(A(250, -60, 1100, 1100) + "border-radius:50%;border:3px solid rgba(120,165,255,.22);box-shadow:0 0 70px rgba(28,95,212,.22), inset 0 0 70px rgba(28,95,212,.18)") +
      bokeh(21, 18, { rmin: 10, rmax: 130, amin: 0.04, amax: 0.18, bmax: 7 }) +
      glow(800, 745, 560, 60, "28,95,212", 0.35) +
      div("position:absolute;inset:0;perspective:1800px;perspective-origin:50% 42%;",
        chatWindow({ x: 300, y: 150, w: 1000, h: 560, tilt: "rotateY(-9deg) rotateX(5deg)", prompt: "Eylül ayı döneminde eksik puantaj bilgisi var mı?", send: "pressed", inner: wave + cur, caret: false }));
  };

  F.A3 = () => {
    const cx = 800, cy = 420;
    const orbits = [
      { rx: 600, ry: 150, rot: -10, kind: "emp", n: 6, ph: 0.3 },
      { rx: 480, ry: 190, rot: 16, kind: "row", n: 5, ph: 1.4 },
      { rx: 380, ry: 120, rot: 3, kind: "doc", n: 4, ph: 2.2 },
    ];
    let back = "", front = "", lines = "";
    orbits.forEach((o, k) => {
      lines += `<ellipse cx="${cx}" cy="${cy}" rx="${o.rx}" ry="${o.ry}" transform="rotate(${o.rot} ${cx} ${cy})" fill="none" stroke="rgba(140,180,255,${0.34 - k * 0.05})" stroke-width="1.6" stroke-dasharray="${k === 1 ? "6 8" : "0"}"/>`;
      for (let i = 0; i < o.n; i++) {
        const th = o.ph + (i / o.n) * Math.PI * 2, ex = o.rx * Math.cos(th), ey = o.ry * Math.sin(th);
        const rr = (o.rot * Math.PI) / 180, px = cx + ex * Math.cos(rr) - ey * Math.sin(rr), py = cy + ex * Math.sin(rr) + ey * Math.cos(rr);
        const depth = Math.sin(th), sc = 0.72 + 0.32 * (depth + 1) / 2, bl = depth < 0 ? 1.6 : 0, op = depth < 0 ? 0.55 : 0.95;
        let el = "";
        if (o.kind === "emp") el = glassBox({ x: -60, y: -36, w: 120, h: 72, r: 14, cls: "glass soft" },
          div(A(12, 16, 40, 40) + "border-radius:50%;background:rgba(28,95,212,.45);border:1px solid rgba(169,198,255,.6);font-size:15px;font-weight:700;color:var(--ink);display:flex;align-items:center;justify-content:center", ["AY", "EK", "MD", "SÇ", "BT", "ZÖ"][i]) +
          div(A(62, 22, 44, 7) + "border-radius:4px;background:rgba(200,215,255,.5)") + div(A(62, 38, 32, 7) + "border-radius:4px;background:rgba(200,215,255,.28)"));
        if (o.kind === "row") el = glassBox({ x: -84, y: -18, w: 168, h: 36, r: 10, cls: "glass soft" },
          Array.from({ length: 7 }, (_, j) => div(A(10 + j * 22, 11, 16, 14) + `border-radius:3px;background:rgba(${j === 4 && i === 2 ? "239,68,68,.75" : "120,165,255,.45"})`)).join(""));
        if (o.kind === "doc") el = glassBox({ x: -30, y: -38, w: 60, h: 76, r: 8, cls: "glass soft" }, div(A(10, 10, 40, 56), ICON.doc("#CFE0FF")));
        const node = div(`position:absolute;left:${px}px;top:${py}px;transform:scale(${sc.toFixed(2)});filter:blur(${bl}px);opacity:${op}`, el);
        if (depth < 0) back += node; else front += node;
      }
    });
    const scan = div(A(-200, 190, 2000, 300) + "transform:rotate(-14deg);background:linear-gradient(180deg, rgba(120,165,255,0), rgba(150,190,255,.10) 35%, rgba(190,215,255,.20) 50%, rgba(150,190,255,.10) 65%, rgba(120,165,255,0));mix-blend-mode:screen;filter:blur(6px)");
    const labels = ["312 çalışan taranıyor…", "Puantaj kayıtları kontrol ediliyor…", "Eylül mevzuat değişiklikleri eşleştiriliyor…"];
    const stack = div(A(0, 700, W) + "display:flex;flex-direction:column;align-items:center;gap:10px",
      labels.map((l, i) => `<div style="position:relative;border-radius:999px;padding:12px 26px 12px 56px;font-size:${i ? 18 : 23}px;font-weight:600;white-space:nowrap;color:${i ? "rgba(209,213,219,.42)" : "var(--ink)"};${i ? "" : "background:rgba(28,95,212,.26);border:1px solid rgba(120,165,255,.55);box-shadow:0 0 26px rgba(28,95,212,.35);"}">` +
        (i ? "" : `<span style="position:absolute;left:22px;top:50%;margin-top:-11px;width:22px;height:22px;border-radius:50%;border:3px solid rgba(169,198,255,.25);border-top-color:#A9C6FF"></span>`) + l + `</div>`).join(""));
    return div("position:absolute;inset:0;background:radial-gradient(900px 600px at 50% 46%, rgba(28,95,212,.28), transparent 65%), linear-gradient(180deg,#090D19,#0A0E1A 60%,#0B1020)") +
      bokeh(31, 26, { rmin: 4, rmax: 40, amin: 0.08, amax: 0.3, bmax: 3 }) +
      svg(lines) + back + core({ x: cx, y: cy, d: 230, ring: true }) + front + scan + stack;
  };

  F.A4 = () => {
    let slots = "";
    for (let k = 1; k < 5; k++) slots += `<line x1="${330 + k * 188}" y1="742" x2="${220 + k * 232}" y2="826" stroke="rgba(169,198,255,.28)" stroke-width="1.5"/>`;
    const tray = svg(`<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(120,160,255,.10)"/><stop offset="1" stop-color="rgba(40,90,200,.34)"/></linearGradient>
      <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(40,90,200,.62)"/><stop offset="1" stop-color="rgba(14,30,70,.85)"/></linearGradient></defs>
      <polygon points="330,742 1270,742 1380,826 220,826" fill="url(#tg)" stroke="rgba(169,198,255,.6)" stroke-width="1.5"/>${slots}
      <rect x="220" y="826" width="1160" height="40" rx="6" fill="url(#lg)" stroke="rgba(169,198,255,.7)" stroke-width="1.2"/>`, "filter:drop-shadow(0 0 22px rgba(28,95,212,.45))");
    const lip = div(A(246, 834) + "font-size:18px;font-weight:700;color:#DCE7FF;white-space:nowrap", "Onayınıza hazır") +
      div(A(1330, 834) + "font-size:18px;font-weight:700;color:#A9C6FF", "3");
    const arc = svg(`<path d="M 690 612 C 700 690, 760 740, 820 780" fill="none" stroke="rgba(169,198,255,.55)" stroke-width="2" stroke-dasharray="4 8"/><circle cx="820" cy="780" r="5" fill="#A9C6FF"/>`);
    return bgBase() + floorGrid({ top: 620 }) +
      bokeh(41, 14, { y0: 0, y1: 560, rmin: 12, rmax: 120, amin: 0.03, amax: 0.14, bmax: 8 }) +
      core({ x: 800, y: 92, d: 64, ring: true, halo: 0.8 }) +
      svg(`<path d="M800 128 C 790 200, 1000 180, 1080 236" stroke="rgba(120,165,255,.3)" stroke-width="2" fill="none"/><path d="M800 128 C 800 260, 900 300, 960 360" stroke="rgba(120,165,255,.3)" stroke-width="2" fill="none"/><path d="M800 128 C 760 300, 700 360, 640 452" stroke="rgba(120,165,255,.35)" stroke-width="2" fill="none"/>`) +
      glow(1090, 612, 280, 34, "2,5,14", 0.8) + glow(980, 700, 300, 34, "2,5,14", 0.75) + glow(640, 748, 330, 36, "2,5,14", 0.9) +
      div("position:absolute;inset:0;perspective:1600px;",
        card({ x: 830, y: 176, w: 560, h: 138, dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", bodySize: 22, tilt: "rotateY(-12deg) translateZ(-160px)", style: "filter:blur(1.2px);opacity:.82" }) +
        card({ x: 700, y: 318, w: 590, h: 146, dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", bodySize: 22, tilt: "rotateY(-10deg) translateZ(-70px)", style: "opacity:.95" }) +
        card({ x: 270, y: 452, w: 700, h: 160, dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", bodySize: 26, tilt: "rotateY(8deg) translateZ(40px)" })) +
      arc + tray + lip;
  };

  F.A5 = () => {
    const win = chatWindow({
      x: 430, y: 150, w: 740, h: 440, tilt: "rotateX(4deg)", prompt: "", caret: true, promptSize: 20, titleSize: 22,
      inner: div(`position:absolute;right:28px;top:98px;`, "Çalışanların puantaj bilgilerini gir.", "bubble me") +
        div(A(430, 168, 282, 58) + "border-radius:14px;background:rgba(200,215,255,.08);border:1px solid rgba(170,200,255,.25);display:flex;align-items:center;gap:12px;padding:0 14px;font-size:17px;font-weight:600;color:var(--text);white-space:nowrap",
          `<span style="display:inline-block;width:28px;height:28px">${ICON.sheet("#A9C6FF")}</span>Puantaj_Eylül.xlsx`) +
        div(A(28, 246) + "display:flex;gap:10px;flex-wrap:nowrap",
          ["AY", "EK", "MD", "SÇ", "BT"].map((n) => `<span style="position:relative;display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:12px;background:rgba(16,185,129,.10);border:1px solid rgba(16,185,129,.45);font-size:16px;font-weight:600;color:#C9F5E4"><span style="width:10px;height:10px;border-radius:50%;background:#10B981;box-shadow:0 0 8px #10B981"></span>${n}</span>`).join("")),
    });
    const tiles = [
      [118, 300, "turnstile"], [300, 70, "cardReader"], [1182, 70, "cloud"], [1334, 300, "finger"],
    ];
    let paths = "";
    const ends = [[430, 400], [520, 150], [1080, 150], [1170, 400]];
    tiles.forEach(([x, y], i) => {
      const sx = x + 75, sy = y + 75, [ex, ey] = ends[i];
      const mx = (sx + ex) / 2, my = Math.min(sy, ey) - 40;
      paths += `<path d="M${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}" fill="none" stroke="rgba(79,134,240,.35)" stroke-width="10" filter="url(#bl)"/><path d="M${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}" fill="none" stroke="#A9C6FF" stroke-width="2.4" stroke-dasharray="2 10" stroke-linecap="round"/>`;
    });
    return bgBase() + floorGrid({ top: 660 }) + bokeh(51, 14, { rmin: 10, rmax: 110, amin: 0.03, amax: 0.14, bmax: 7 }) +
      svg(`<defs><filter id="bl"><feGaussianBlur stdDeviation="6"/></filter></defs>${paths}`) +
      tiles.map(([x, y, ic]) => iconTile(x, y, 150, ic)).join("") +
      div("position:absolute;inset:0;perspective:1800px;", win + xlsx(300, 470, 128, { tilt: "rotateY(18deg) rotateZ(-6deg)" })) +
      statusPill(0, 640, "Puantaj tamamlandı · Bordro uzmanı onayına hazır", "green", "left:50%;transform:translateX(-50%)") +
      centerText(760, "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin.", "font-size:34px;");
  };

  F.A6 = () => {
    const win = chatWindow({
      x: 70, y: 150, w: 560, h: 380, tilt: "rotateY(16deg)", prompt: "", caret: false, titleSize: 21,
      inner: div(A(22, 96, 516) + "border-radius:16px;padding:16px 18px;font-size:19px;font-weight:500;line-height:1.4;background:rgba(28,95,212,.28);border:1px solid rgba(120,165,255,.4);color:var(--ink)", "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla."),
    });
    const vals = [1.26, 0.74, 0.52, 0.33, 0.25];
    const fmt = (v) => "₺" + v.toFixed(2).replace(".", ",") + " mn";
    return bgBase() + floorGrid({ top: 690 }) + bokeh(61, 12, { rmin: 10, rmax: 110, amin: 0.03, amax: 0.13, bmax: 7 }) +
      div("position:absolute;inset:0;perspective:1800px;", win) +
      div(A(-100, 668, 1900, 3) + "background:linear-gradient(90deg, rgba(16,185,129,0), rgba(16,185,129,.9) 20%, rgba(16,185,129,.9) 80%, rgba(16,185,129,0));box-shadow:0 0 18px rgba(16,185,129,.8)") +
      bars3d({ x: 690, base: 666, values: vals, labels: ["Backend", "Frontend", "Mobil", "QA", "Tasarım"], bw: 72, gap: 30, scale: 330, valueFmt: fmt }) +
      table({ x: 1230, y: 150, w: 330, title: "Aylık maaş özeti · Eylül", rows: [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]] }) +
      glassBox({ x: 1230, y: 470, w: 330, h: 130, r: 20 },
        div(A(24, 22) + "font-size:15px;font-weight:700;letter-spacing:.06em;color:#9DB3E0", "DEPARTMAN") +
        div(A(24, 48) + "font-size:23px;font-weight:700;color:var(--ink);white-space:nowrap", "Ürün Geliştirme") +
        div(A(24, 84) + "font-size:17px;font-weight:500;color:var(--text2);white-space:nowrap", "Çanakkale ofisi · 24 çalışan")) +
      Array.from({ length: 7 }, (_, i) => div(A(1480 + (i % 2) * 30, 90 + i * 110, 260, 2) + `background:linear-gradient(90deg, rgba(169,198,255,0), rgba(169,198,255,.5));opacity:${0.25 + (i % 3) * 0.2}`)).join("");
  };

  F.A7 = () =>
    bgBase("radial-gradient(700px 420px at 50% 26%, rgba(28,95,212,.32), transparent 70%),") + floorGrid({ top: 700 }) +
    bokeh(71, 14, { rmin: 10, rmax: 110, amin: 0.03, amax: 0.13, bmax: 7 }) +
    glow(800, 220, 330, 190, "28,95,212", 0.55) +
    logoPH(590, 160, 420, 120, "Agentic Payroll logosu<br>(orijinal PNG)", "border-color:rgba(169,198,255,.7);background:rgba(10,20,50,.45);box-shadow:0 0 50px rgba(28,95,212,.5)") +
    centerText(356, "Bordronun kontrolü sizde, hız Agentic Payroll'da.", "font-size:56px;", "hl") +
    div(A(0, 470, W) + "display:flex;justify-content:center;align-items:center;gap:22px",
      `<div class="logo-ph" style="position:relative;width:220px;height:62px;font-size:14px">Datassist logosu (beyaz PNG)</div><span style="font-size:22px;font-weight:500;color:var(--text2);white-space:nowrap">Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri</span>`) +
    cta(0, 598, "left:50%;transform:translateX(-50%)") +
    centerText(714, "datassist.com.tr", "", "url");

  /* =====================================================================
     B · Şirket Maketi
     ===================================================================== */
  // world(): a table plane in perspective; children use table coordinates (px), z = up.
  function world(o, inner) {
    const { rx = 58, rz = -30, persp = 1700, ox = "50%", oy = "22%", cx = 800, cy = 540, scale = 1 } = o;
    return div(`position:absolute;inset:0;perspective:${persp}px;perspective-origin:${ox} ${oy};`,
      div(`position:absolute;left:${cx}px;top:${cy}px;width:0;height:0;transform-style:preserve-3d;transform:scale(${scale}) rotateX(${rx}deg) rotateZ(${rz}deg);`, inner));
  }
  function tableTop(o = {}) {
    const { w = 2400, d = 1800, grid = 60, alpha = 0.16 } = o;
    return div(A(-w / 2, -d / 2, w, d) + `background:
      linear-gradient(rgba(120,160,255,${alpha}) 1px, transparent 1px) 0 0/${grid}px ${grid}px,
      linear-gradient(90deg, rgba(120,160,255,${alpha}) 1px, transparent 1px) 0 0/${grid}px ${grid}px,
      radial-gradient(closest-side, #16213A, #0D1426 70%, #0A0E1A);
      -webkit-mask-image:radial-gradient(closest-side, #000 55%, transparent);mask-image:radial-gradient(closest-side, #000 55%, transparent);`);
  }
  // windows as CSS patterns: floor height fh, window width ww
  function winFace(lit, fh = 22, ww = 16, extra = "") {
    return `background:
      repeating-linear-gradient(180deg, rgba(196,218,255,.34) 0 2px, transparent 2px ${fh}px),
      repeating-linear-gradient(90deg, rgba(196,218,255,.26) 0 2px, transparent 2px ${ww}px),
      linear-gradient(180deg, rgba(169,198,255,.10), rgba(28,95,212,.06)),
      ${lit};border:1px solid rgba(190,215,255,.62);box-shadow:inset 0 0 22px rgba(79,134,240,.22);${extra}`;
  }
  function cuboid(o) {
    const { x, y, w, d, h, lit = "rgba(120,160,240,.30)", top = "rgba(150,185,255,.22)", fh = 22, ww = 16, extra = "", faceInner = "" } = o;
    const face = winFace(lit, fh, ww, extra);
    return (
      div(A(x, y, w, d) + `transform:translateZ(${h}px);background:${top};border:1px solid rgba(190,212,255,.65);box-shadow:0 0 22px rgba(79,134,240,.35);`) +
      div(A(x, y + d - h, w, h) + `transform-origin:50% 100%;transform:rotateX(-90deg);${face}`, faceInner) +
      div(A(x, y, w, h) + `transform-origin:50% 0;transform:rotateX(90deg);${face}`) +
      div(A(x, y, h, d) + `transform-origin:0 50%;transform:rotateY(-90deg);${face}`) +
      div(A(x + w - h, y, h, d) + `transform-origin:100% 50%;transform:rotateY(90deg);${face}`)
    );
  }
  function campus(state = "dim", scanZ = 0) {
    const band = (h) => scanZ && h > scanZ ? div(`position:absolute;left:-2px;right:-2px;top:${h - scanZ - 5}px;height:10px;` + "background:rgba(214,230,255,.85);box-shadow:0 0 18px 4px rgba(120,170,255,.9)") : "";
    const lit = state === "lit" ? "rgba(214,230,255,.55)" : state === "scan" ? "rgba(110,150,235,.30)" : "rgba(80,110,190,.16)";
    return (
      // İstanbul tower
      cuboid({ x: -330, y: -160, w: 150, d: 150, h: 430, lit, faceInner: band(430) }) +
      // Ankara mid-rise
      cuboid({ x: -60, y: -40, w: 240, d: 150, h: 210, lit, ww: 20, faceInner: band(210) }) +
      // Çanakkale campus
      cuboid({ x: 250, y: 60, w: 180, d: 110, h: 96, lit, ww: 22 }) +
      cuboid({ x: 450, y: 40, w: 120, d: 130, h: 74, lit, ww: 22 }) +
      cuboid({ x: 300, y: 200, w: 110, d: 90, h: 120, lit, ww: 22 })
    );
  }
  function tiltShift(topPct = 30, botPct = 72, blur = 7) {
    return div(`position:absolute;inset:0;backdrop-filter:blur(${blur}px);-webkit-backdrop-filter:blur(${blur}px);-webkit-mask-image:linear-gradient(180deg,#000 0%, transparent ${topPct}%, transparent ${botPct}%, #000 100%);mask-image:linear-gradient(180deg,#000 0%, transparent ${topPct}%, transparent ${botPct}%, #000 100%);`);
  }
  const bgB = () => div("position:absolute;inset:0;background:radial-gradient(1100px 700px at 50% 40%, rgba(28,95,212,.16), transparent 65%), linear-gradient(180deg,#0A0F1E,#0A0E1A 55%,#090D18);");
  function labelTag(x, y, s, o = {}) {
    const { lx = x, ly = y + 60, dot = "#A9C6FF" } = o;
    return svg(`<line x1="${x}" y1="${y}" x2="${lx}" y2="${ly}" stroke="rgba(169,198,255,.55)" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="4" fill="${dot}"/>`) +
      div(A(lx - 6, ly) + "padding:8px 14px;border-radius:10px;background:rgba(10,16,34,.72);border:1px solid rgba(169,198,255,.4);font-size:17px;font-weight:600;color:var(--text);white-space:nowrap", s);
  }

  F.B1 = () => {
    // "%45" as a monument of stacked acrylic plates standing on the table
    let plates = "";
    for (let i = 13; i >= 0; i--) {
      const a = i === 0 ? 0.32 : 0.10 + (13 - i) * 0.004;
      plates += div(`position:absolute;left:0;top:0;transform:translateZ(${-i * 9}px);font-size:330px;font-weight:800;letter-spacing:-0.045em;line-height:1;white-space:nowrap;color:rgba(150,188,255,${a.toFixed(3)});` +
        (i === 0 ? "filter:drop-shadow(0 0 1.2px rgba(220,233,255,.95)) drop-shadow(0 0 14px rgba(79,134,240,.55));" : "filter:drop-shadow(0 0 1px rgba(169,198,255,.5));"), "%45");
    }
    const monument = div("position:absolute;inset:0;perspective:1400px;perspective-origin:50% 30%;",
      div("position:absolute;left:800px;top:392px;transform-style:preserve-3d;transform:translate(-50%,-50%) rotateY(-24deg) rotateX(6deg);",
        div("position:relative;font-size:330px;font-weight:800;letter-spacing:-0.045em;line-height:1;white-space:nowrap;color:transparent", "%45") + plates));
    let tiles = "", x = -640;
    for (let i = 0; i < 12; i++) { tiles += div(A(x, -120, 64, 64) + "border-radius:8px;background:rgba(150,185,255,.12);border:1px solid rgba(169,198,255,.45);transform:translateZ(2px);", div(A(8, 20) + "font-size:22px;font-weight:600;color:rgba(229,231,235,.8)", String(20 + i > 30 ? i - 10 : 20 + i))); x += 118 - i * 8; }
    return bgB() +
      world({ rx: 62, rz: -8, cy: 560 }, tableTop() + tiles) +
      glow(800, 610, 420, 60, "2,5,14", 0.85) +
      monument + tiltShift(14, 82, 5) +
      centerText(770, "Bordro dönem kapanışınızı %45 hızlandıracak", "font-size:42px;");
  };

  F.B2 = () => {
    const ripples = [140, 300, 480, 680].map((r, i) => div(A(-420 - r, 260 - r, r * 2, r * 2) + `border-radius:50%;border:${3 - i * 0.5}px solid rgba(232,80,10,${(0.8 - i * 0.18).toFixed(2)});box-shadow:0 0 18px rgba(232,80,10,${(0.45 - i * 0.1).toFixed(2)});transform:translateZ(1px)`)).join("");
    return bgB() +
      world({ rx: 64, rz: -24, cy: 470, scale: 0.95 }, tableTop() + ripples + campus("dim")) +
      tiltShift(18, 55, 8) +
      div("position:absolute;inset:0;perspective:1800px;",
        chatWindow({ x: 150, y: 380, w: 900, h: 470, tilt: "rotateX(10deg) rotateY(8deg)", prompt: "Eylül ayı döneminde eksik puantaj bilgisi var mı?", send: "pressed", caret: false }));
  };

  F.B3 = () => {
    const scan = div(A(-900, -700, 1800, 1400) + "transform:translateZ(250px);background:linear-gradient(90deg, rgba(79,134,240,.0), rgba(120,165,255,.13) 30%, rgba(120,165,255,.13) 70%, rgba(79,134,240,0));border-top:2px solid rgba(190,215,255,.55);border-bottom:2px solid rgba(190,215,255,.55);box-shadow:0 0 40px rgba(79,134,240,.35);-webkit-mask-image:radial-gradient(closest-side,#000 60%,transparent);mask-image:radial-gradient(closest-side,#000 60%,transparent);");
    return bgB() +
      world({ rx: 55, rz: -30, cy: 560 }, tableTop() + campus("scan", 150)) +
      core({ x: 790, y: 110, d: 110, ring: true }) +
      beam({ x: 790, top: 120, w0: 90, w1: 1100, h: 700, a: 0.12 }) +
      labelTag(500, 470, "312 çalışan taranıyor…", { lx: 110, ly: 380 }) +
      div(A(0, 790, W) + "display:flex;justify-content:center;gap:22px;font-size:18px;font-weight:600;color:rgba(209,213,219,.45);white-space:nowrap", "<span>Puantaj kayıtları kontrol ediliyor…</span><span>·</span><span>Eylül mevzuat değişiklikleri eşleştiriliyor…</span>") +
      tiltShift(12, 80, 5);
  };

  F.B4 = () => {
    const red = div(A(40, 150, 18, 16) + "background:rgba(10,14,26,.95);border:1px solid rgba(239,68,68,.9);box-shadow:0 0 14px rgba(239,68,68,.9);");
    const t = campus("scan").replace('transform:rotateX(-90deg);', 'transform:rotateX(-90deg);'); // front face of tower receives the red window below
    const tower = cuboid({ x: -330, y: -160, w: 150, d: 150, h: 430, lit: "rgba(120,160,240,.36)", faceInner: red });
    return bgB() +
      world({ rx: 57, rz: -26, cy: 600, scale: 1.18 }, tableTop() + tower +
        cuboid({ x: -60, y: -40, w: 240, d: 150, h: 210, lit: "rgba(120,160,240,.36)", ww: 20, faceInner: div(A(84, 60, 16, 16) + "border-radius:50%;border:3px solid #4F86F0;box-shadow:0 0 12px #4F86F0") + div(A(144, 104, 16, 16) + "border-radius:50%;border:3px solid #4F86F0;box-shadow:0 0 12px #4F86F0") }) +
        cuboid({ x: 250, y: 60, w: 180, d: 110, h: 96, lit: "rgba(120,160,240,.36)", ww: 22 }) + cuboid({ x: 450, y: 40, w: 120, d: 130, h: 74, lit: "rgba(120,160,240,.36)", ww: 22 })) +
      svg(`<line x1="453" y1="438" x2="453" y2="258" stroke="rgba(239,68,68,.85)" stroke-width="2.5"/><circle cx="453" cy="438" r="6" fill="#EF4444"/>
           <line x1="822" y1="520" x2="822" y2="392" stroke="rgba(79,134,240,.85)" stroke-width="2.5"/><circle cx="822" cy="520" r="6" fill="#4F86F0"/>
           <line x1="1080" y1="560" x2="1080" y2="176" stroke="rgba(79,134,240,.7)" stroke-width="2.5"/><circle cx="1080" cy="560" r="6" fill="#4F86F0"/>`) +
      card({ x: 110, y: 142, w: 720, h: 132, dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", bodySize: 23 }) +
      card({ x: 700, y: 290, w: 650, h: 120, dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", bodySize: 20 }) +
      card({ x: 900, y: 60, w: 590, h: 120, dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", bodySize: 20 }) +
      tiltShift(8, 84, 5);
  };

  F.B5 = () => {
    const streets = [
      [-900, 330, 1800, 6], [-900, -200, 1800, 6], [200, -700, 6, 1400], [-420, -700, 6, 1400],
    ].map(([x, y, w, h]) => div(A(x, y, w, h) + "background:linear-gradient(90deg, rgba(79,134,240,0), rgba(120,170,255,.9), rgba(79,134,240,0));box-shadow:0 0 16px rgba(79,134,240,.9);transform:translateZ(1px)")).join("");
    const term = (x, y) => cuboid({ x, y, w: 30, d: 22, h: 44, lit: "rgba(79,134,240,.6)", top: "rgba(169,198,255,.6)", fh: 44, ww: 30 });
    return bgB() +
      world({ rx: 50, rz: -34, cy: 470, scale: 0.9 }, tableTop() + streets + campus("lit") + term(-290, 20) + term(40, 140) + term(300, 180)) +
      [[380, 520, "turnstile"], [770, 600, "cardReader"], [1080, 560, "finger"]].map(([x, y, ic]) => iconTile(x, y, 76, ic, { r: 16 })).join("") +
      tiltShift(10, 70, 5) +
      statusPill(0, 690, "Puantaj tamamlandı · Bordro uzmanı onayına hazır", "green", "left:50%;transform:translateX(-50%)") +
      centerText(790, "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin.", "font-size:32px;");
  };

  F.B6 = () => {
    const vals = [1.26, 0.74, 0.52, 0.33, 0.25];
    const bars = vals.map((v, i) => cuboid({ x: -40 + i * 110, y: -260, w: 70, d: 70, h: v * 330, lit: "rgba(120,165,255,.42)", top: "rgba(190,215,255,.55)", fh: 400, ww: 400 })).join("");
    const lifted = div(A(250, 60, 180, 110) + "transform:translateZ(190px);background:rgba(150,185,255,.18);border:1px solid rgba(190,215,255,.75);box-shadow:0 0 30px rgba(79,134,240,.6)");
    return bgB() +
      world({ rx: 56, rz: -28, cy: 560 }, tableTop() + campus("lit") + lifted + bars) +
      table({ x: 1130, y: 90, w: 360, title: "Aylık maaş özeti · Eylül", rows: [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]] }) +
      glassBox({ x: 1130, y: 700, w: 400, h: 120, r: 20 },
        div(A(24, 22) + "font-size:15px;font-weight:700;letter-spacing:.06em;color:#9DB3E0", "DEPARTMAN") +
        div(A(24, 48) + "font-size:23px;font-weight:700;color:var(--ink);white-space:nowrap", "Ürün Geliştirme · Çanakkale") +
        div(A(24, 82) + "font-size:16px;font-weight:500;color:var(--text2);white-space:nowrap", "24 çalışan · Eylül 2026")) +
      tiltShift(6, 86, 4) +
      div("position:absolute;inset:0;perspective:1800px;",
        chatWindow({ x: 60, y: 690, w: 1010, h: 190, tilt: "rotateX(12deg)", prompt: "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla.", caret: false, promptSize: 21 }));
  };

  F.B7 = () => {
    const fp = [[120, 110, 150, 150], [300, 250, 240, 150], [1170, 110, 180, 110], [1370, 90, 120, 130], [1220, 250, 110, 90]]
      .map(([x, y, w, d]) => div(A(x, y, w, d) + "border:1.5px solid rgba(169,198,255,.32);background:repeating-linear-gradient(45deg, rgba(169,198,255,.07) 0 2px, transparent 2px 10px)")).join("");
    const tb = div(A(250, 548, 1100, 300) + "border:1.5px solid rgba(169,198,255,.6);background:rgba(10,16,34,.72);box-shadow:0 0 40px rgba(28,95,212,.25)",
      div(A(0, 0, 1100, 118) + "border-bottom:1.5px solid rgba(169,198,255,.45);display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;letter-spacing:-0.02em;color:var(--ink);white-space:nowrap", "Bordronun kontrolü sizde, hız Agentic Payroll'da.") +
      div(A(0, 118, 550, 182) + "border-right:1.5px solid rgba(169,198,255,.45)",
        div(A(30, 26, 220, 58) + "font-size:13px", "Datassist logosu (beyaz PNG)", "logo-ph") +
        div(A(30, 100, 500) + "font-size:18px;font-weight:500;color:var(--text2);line-height:1.4;white-space:normal", "Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri")) +
      div(A(550, 118, 550, 182),
        cta(90, 30) + div(A(90, 124) + "font-size:21px;font-weight:600;color:var(--text2)", "datassist.com.tr")) +
      div(A(1100 - 150, -26) + "font-size:13px;font-weight:700;letter-spacing:.1em;color:rgba(169,198,255,.7)", "PAFTA A-01"));
    return div("position:absolute;inset:0;background:radial-gradient(900px 520px at 50% 34%, rgba(28,95,212,.22), transparent 70%), linear-gradient(180deg,#0B1122,#0A0E1A);") +
      div("position:absolute;inset:0;background:linear-gradient(rgba(120,160,255,.08) 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, rgba(120,160,255,.08) 1px, transparent 1px) 0 0/40px 40px;") +
      fp + glow(800, 290, 360, 200, "28,95,212", 0.5) +
      logoPH(590, 220, 420, 130, "Agentic Payroll logosu<br>(orijinal PNG)", "border-color:rgba(169,198,255,.75);background:rgba(10,20,50,.5);box-shadow:0 0 60px rgba(28,95,212,.55)") + tb;
  };

  /* =====================================================================
     C · Nokta Evreni (canvas points; 1 dot = 1 employee record)
     ===================================================================== */
  const SPR = {};
  function sprite(key, rgb) {
    if (SPR[key]) return SPR[key];
    const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d");
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, `rgba(${rgb},1)`); g.addColorStop(0.22, `rgba(${rgb},.55)`); g.addColorStop(0.5, `rgba(${rgb},.14)`); g.addColorStop(1, `rgba(${rgb},0)`);
    x.fillStyle = g; x.fillRect(0, 0, 64, 64); return (SPR[key] = c);
  }
  function cam(o) { return Object.assign({ yaw: 0, pitch: 0, f: 1000, dist: 1000, cx: 800, cy: 450 }, o); }
  function proj(p, c) {
    const [x, y, z] = p, cy = Math.cos(c.yaw), sy = Math.sin(c.yaw), cp = Math.cos(c.pitch), sp = Math.sin(c.pitch);
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    const s = c.f / (z2 + c.dist);
    return [c.cx + x1 * s, c.cy + y1 * s, z2, s];
  }
  function dot(ctx, x, y, r, rgb, a, glowK = 5) {
    ctx.globalAlpha = a * 0.9; ctx.drawImage(sprite(rgb, rgb), x - r * glowK, y - r * glowK, r * glowK * 2, r * glowK * 2);
    ctx.globalAlpha = Math.min(1, a * 1.1); ctx.fillStyle = `rgb(${rgb})`; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  function canvasEl(id) { return `<canvas id="cv-${id}" width="${W}" height="${H}" style="position:absolute;left:0;top:0;width:${W}px;height:${H}px"></canvas>`; }
  function ctxOf(id) { const c = document.getElementById("cv-" + id); const x = c.getContext("2d"); x.globalCompositeOperation = "lighter"; return x; }
  function textPoints(t, font, w, h, step) {
    const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
    x.fillStyle = "#fff"; x.font = font; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(t, w / 2, h / 2);
    const d = x.getImageData(0, 0, w, h).data, pts = [];
    for (let yy = 0; yy < h; yy += step) for (let xx = 0; xx < w; xx += step) if (d[(yy * w + xx) * 4 + 3] > 140) pts.push([xx - w / 2, yy - h / 2]);
    return pts;
  }
  function floorDots(ctx, c, o = {}) {
    const { y = 330, x0 = -1600, x1 = 1600, z0 = -300, z1 = 2600, step = 70, rgb = "120,160,255", a = 0.5 } = o;
    for (let z = z0; z <= z1; z += step) for (let x = x0; x <= x1; x += step) {
      const [sx, sy, zz, s] = proj([x, y, z], c); if (s <= 0 || sx < -20 || sx > W + 20 || sy > H + 20) continue;
      dot(ctx, sx, sy, Math.max(0.6, 2.2 * s), rgb, a * Math.max(0, Math.min(1, 1.3 - (z - z0) / (z1 - z0))), 3);
    }
  }
  const bgC = () => div("position:absolute;inset:0;background:radial-gradient(1000px 640px at 50% 44%, rgba(28,95,212,.16), transparent 66%), linear-gradient(180deg,#080C18,#0A0E1A 60%,#090D17);");
  function starfield(ctx, seed, n) {
    const r = rng(seed);
    for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H, s = r(); dot(ctx, x, y, 0.6 + s * 1.4, "150,185,255", 0.15 + s * 0.35, 3); }
  }

  F.C1 = () => {
    AFTER.push(() => {
      const ctx = ctxOf("C1"), c = cam({ yaw: -0.32, pitch: 0.06, cy: 400 }), r = rng(7);
      starfield(ctx, 3, 90);
      floorDots(ctx, c, { y: 300, a: 0.45 });
      // month grids behind: the left one relaxed, the right one compressed
      [[-980, -120, 34], [760, -150, 17]].forEach(([gx, gy, sp]) => {
        for (let i = 0; i < 7; i++) for (let j = 0; j < 5; j++) { const [sx, sy, , s] = proj([gx + i * sp, gy + j * sp, 900], c); dot(ctx, sx, sy, 2.2 * s, "169,198,255", 0.55, 3); }
      });
      const pts = textPoints("%45", "800 440px Inter", 1300, 520, 10);
      pts.forEach(([x, y]) => {
        const z = (r() - 0.5) * 70 + Math.sin(x / 180) * 30;
        const [sx, sy, zz, s] = proj([x, y, z], c);
        dot(ctx, sx, sy, 2.4 * s, zz < -20 ? "196,218,255" : "90,140,245", 0.85, 4);
      });
      // near-camera bokeh
      for (let i = 0; i < 26; i++) { const [sx, sy, , s] = proj([(r() - 0.5) * 2600, (r() - 0.5) * 1100, -700 + r() * 250], c); ctx.globalAlpha = 0.10 + r() * 0.1; const d = 26 * s + 10; ctx.drawImage(sprite("79,134,240", "79,134,240"), sx - d, sy - d, d * 2, d * 2); }
    });
    return bgC() + canvasEl("C1") + centerText(770, "Bordro dönem kapanışınızı %45 hızlandıracak", "font-size:42px;");
  };

  F.C2 = () => {
    let ring = "";
    [120, 230, 360].forEach((rr, i) => { ring += `<circle cx="1206" cy="672" r="${rr}" fill="none" stroke="rgba(232,80,10,${0.95 - i * 0.25})" stroke-width="${7 - i}" stroke-linecap="round" stroke-dasharray="0 ${18 + i * 6}"/>`; });
    const dotsTex = "background-image:radial-gradient(circle, rgba(169,198,255,.16) 1.4px, transparent 1.8px);background-size:22px 22px;";
    return bgC() +
      div(A(150, -330, 1300, 1300) + "border-radius:50%;background:radial-gradient(closest-side, rgba(79,134,240,.30), rgba(28,95,212,.16) 62%, rgba(28,95,212,.05) 88%, transparent);box-shadow:0 0 120px rgba(28,95,212,.25)") +
      div(A(150, -330, 1300, 1300) + "border-radius:50%;border:2px solid rgba(169,198,255,.22)") +
      div("position:absolute;inset:0;background-image:radial-gradient(circle, rgba(120,160,255,.22) 1.5px, transparent 2px);background-size:30px 30px;-webkit-mask-image:radial-gradient(circle at 50% 50%, transparent 40%, #000 75%);mask-image:radial-gradient(circle at 50% 50%, transparent 40%, #000 75%);") +
      chatWindow({ x: 330, y: 170, w: 940, h: 560, prompt: "Eylül ayı döneminde eksik puantaj bilgisi var mı?", send: "pressed", caret: false, faceStyle: dotsTex }) +
      svg(ring, "") + div(A(1224, 690), ICON.cursor());
  };

  function orbitPoints(seed) {
    // three gyroscope rings around the core: employees, timesheet rows, legislation (312 dots in total)
    const r = rng(seed), rings = [
      { n: 130, R: 440, tilt: 0.10, roll: 0.0, rgb: "120,165,255" },
      { n: 110, R: 350, tilt: 1.12, roll: 0.62, rgb: "150,190,255" },
      { n: 72, R: 262, tilt: 1.18, roll: -0.72, rgb: "196,218,255" },
    ], out = [];
    rings.forEach((g, k) => {
      for (let i = 0; i < g.n; i++) {
        const th = (i / g.n) * Math.PI * 2 + r() * 0.02, R = g.R + (r() - 0.5) * 20;
        let x = R * Math.cos(th), z = R * Math.sin(th), y = (r() - 0.5) * 12;
        const ct = Math.cos(g.tilt), st = Math.sin(g.tilt), y2 = y * ct - z * st, z2 = y * st + z * ct;
        const cr = Math.cos(g.roll), sr = Math.sin(g.roll), x3 = x * cr - y2 * sr, y3 = x * sr + y2 * cr;
        out.push({ p: [x3, y3, z2], rgb: g.rgb, k, i, th });
      }
    });
    return out;
  }
  function coreStar(ctx, x, y, R) {
    ctx.globalAlpha = 1;
    const g = ctx.createRadialGradient(x, y, 0, x, y, R * 4);
    g.addColorStop(0, "rgba(234,241,255,.95)"); g.addColorStop(0.1, "rgba(169,198,255,.8)"); g.addColorStop(0.28, "rgba(79,134,240,.45)"); g.addColorStop(0.6, "rgba(28,95,212,.14)"); g.addColorStop(1, "rgba(28,95,212,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * 4, 0, Math.PI * 2); ctx.fill();
  }

  F.C3 = () => {
    AFTER.push(() => {
      const ctx = ctxOf("C3"), c = cam({ yaw: 0.25, pitch: 0.30, cy: 370, f: 900 });
      starfield(ctx, 5, 70);
      coreStar(ctx, 800, 370, 72);
      // sonar ring in the plane of the employee ring
      const ring = [];
      for (let a = 0; a <= 96; a++) { const th = (a / 96) * Math.PI * 2, R = 400; const x = R * Math.cos(th), z = R * Math.sin(th); ring.push(proj([x, -z * Math.sin(0.10), z * Math.cos(0.10)], c)); }
      [[10, 0.10], [4, 0.25], [1.6, 0.9]].forEach(([lw, a]) => { ctx.globalAlpha = a; ctx.strokeStyle = "rgba(169,198,255,1)"; ctx.lineWidth = lw; ctx.beginPath(); ring.forEach(([sx, sy], i) => i ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy)); ctx.stroke(); });
      orbitPoints(11).forEach((o) => {
        const [sx, sy, zz, s] = proj(o.p, c);
        const near = o.k === 0 && o.th > 0.6 && o.th < 1.5;
        dot(ctx, sx, sy, 2.7 * s * (near ? 1.35 : 1), near ? "214,230,255" : o.rgb, near ? 1 : 0.45 + 0.35 * (zz < 0 ? 1 : 0.4), 4);
      });
    });
    const labels = ["312 çalışan taranıyor…", "Puantaj kayıtları kontrol ediliyor…", "Eylül mevzuat değişiklikleri eşleştiriliyor…"];
    return bgC() + canvasEl("C3") +
      div(A(0, 800, W) + "display:flex;justify-content:center;align-items:center;gap:26px",
        labels.map((l, i) => `<span style="position:relative;border-radius:999px;padding:12px 24px;font-size:${i ? 17 : 22}px;font-weight:600;white-space:nowrap;color:${i ? "rgba(209,213,219,.4)" : "var(--ink)"};${i ? "" : "background:rgba(28,95,212,.26);border:1px solid rgba(120,165,255,.55);box-shadow:0 0 26px rgba(28,95,212,.35);"}">${l}</span>`).join(""));
  };

  F.C4 = () => {
    const cards = [
      { x: 170, y: 90, w: 700, dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", bs: 24 },
      { x: 900, y: 150, w: 620, dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", bs: 21 },
      { x: 830, y: 330, w: 620, dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", bs: 21 },
    ];
    AFTER.push(() => {
      const ctx = ctxOf("C4"), c = cam({ yaw: 0.25, pitch: 0.30, cy: 560, f: 900 });
      starfield(ctx, 9, 60);
      coreStar(ctx, 800, 520, 48);
      const pts = orbitPoints(11);
      pts.forEach((o) => { const [sx, sy, , s] = proj(o.p, c); dot(ctx, sx, sy, 2.2 * s, o.rgb, 0.18, 3); });
      const pick = [pts[12], pts[150], pts[262]];
      pick.forEach((o, i) => {
        const [sx, sy] = proj(o.p, c), cd = cards[i], tx = cd.x + 36, ty = cd.y + 40;
        const col = i ? "79,134,240" : "239,68,68";
        ctx.globalAlpha = 1; const g = ctx.createLinearGradient(sx, sy, tx, ty); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},.9)`);
        ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(sx, (sy + ty) / 2, tx, ty); ctx.stroke();
        dot(ctx, sx, sy, 5, col, 1, 6);
        for (let k = 0; k < 10; k++) { const t = k / 10; const qx = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * sx + t * t * tx, qy = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * ((sy + ty) / 2) + t * t * ty; dot(ctx, qx, qy, 1.6 + t * 2, col, 0.25 + t * 0.6, 3); }
      });
    });
    return bgC() + canvasEl("C4") +
      cards.map((cd) => card({ x: cd.x, y: cd.y, w: cd.w, h: 140, dot: cd.dot, head: cd.head, body: cd.body, bodySize: cd.bs })).join("") +
      centerText(820, "", "");
  };

  F.C5 = () => {
    const icons = [[150, 120, "turnstile"], [150, 520, "cardReader"], [1330, 110, "cloud"], [1330, 520, "finger"]];
    let trails = "";
    icons.forEach(([x, y], i) => {
      const sx = x + 60, sy = y + 60, ex = i < 2 ? 520 : 1080, ey = i % 2 ? 470 : 330;
      trails += `<path d="M${sx} ${sy} C ${(sx + ex) / 2} ${sy}, ${(sx + ex) / 2} ${ey}, ${ex} ${ey}" fill="none" stroke="rgba(169,198,255,.85)" stroke-width="5" stroke-linecap="round" stroke-dasharray="0 16"/>`;
    });
    const dotIcon = (x, y, ic) => div(A(x, y, 120, 120) + "filter:drop-shadow(0 0 6px rgba(79,134,240,.9))",
      ICON[ic]("#A9C6FF").replace(/stroke-width="2.6"/g, 'stroke-width="3.4" stroke-dasharray="0 5.2"'));
    return bgC() +
      div("position:absolute;inset:0;background-image:radial-gradient(circle, rgba(150,185,255,.28) 1.2px, transparent 1.6px);background-size:46px 46px;-webkit-mask-image:radial-gradient(circle at 50% 45%, #000, transparent 75%);mask-image:radial-gradient(circle at 50% 45%, #000, transparent 75%);") +
      glow(800, 400, 380, 280, "28,95,212", 0.45) +
      svg(trails) + icons.map(([x, y, ic]) => dotIcon(x, y, ic)).join("") +
      chatWindow({ x: 520, y: 220, w: 560, h: 330, prompt: "", caret: true, titleSize: 20, promptSize: 18,
        inner: div(`position:absolute;right:22px;top:92px;font-size:17px;padding:12px 16px`, "Çalışanların puantaj bilgilerini gir.", "bubble me") +
          div(A(22, 160, 250, 46) + "border-radius:12px;background:rgba(200,215,255,.08);border:1px solid rgba(170,200,255,.25);display:flex;align-items:center;gap:10px;padding:0 12px;font-size:15px;font-weight:600;white-space:nowrap", `<span style="display:inline-block;width:22px;height:22px">${ICON.sheet("#A9C6FF")}</span>Puantaj_Eylül.xlsx`) }) +
      statusPill(0, 640, "Puantaj tamamlandı · Bordro uzmanı onayına hazır", "green", "left:50%;transform:translateX(-50%)") +
      centerText(760, "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin.", "font-size:32px;");
  };

  F.C6 = () => {
    AFTER.push(() => {
      const ctx = ctxOf("C6"), c = cam({ yaw: -0.5, pitch: 0.32, cx: 610, cy: 520, f: 1100 });
      starfield(ctx, 13, 50);
      const vals = [1.26, 0.74, 0.52, 0.33, 0.25];
      // axes
      ctx.globalAlpha = 0.8; ctx.strokeStyle = "rgba(169,198,255,.6)"; ctx.lineWidth = 2;
      const a0 = proj([-360, 120, -60], c), a1 = proj([420, 120, -60], c), a2 = proj([-360, -300, -60], c);
      ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(a0[0], a0[1]); ctx.lineTo(a1[0], a1[1]); ctx.stroke();
      vals.forEach((v, i) => {
        const layers = Math.round(v * 16), bx = -300 + i * 150;
        for (let l = 0; l < layers; l++) for (let u = 0; u < 3; u++) for (let w = 0; w < 3; w++) {
          const [sx, sy, zz, s] = proj([bx + u * 26, 110 - l * 22, w * 26], c);
          dot(ctx, sx, sy, 3.2 * s, l === layers - 1 ? "196,218,255" : "90,140,245", 0.9, 3);
        }
        const [lx, ly] = proj([bx + 26, 150, 26], c);
        ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 0.9; ctx.fillStyle = "#AFC3EA"; ctx.font = "600 16px Inter"; ctx.textAlign = "center";
        ctx.fillText(["Backend", "Frontend", "Mobil", "QA", "Tasarım"][i], lx, ly + 18); ctx.globalCompositeOperation = "lighter";
      });
    });
    return bgC() + canvasEl("C6") +
      div(A(80, 60, 800) + "border-radius:16px;padding:16px 20px;font-size:20px;font-weight:500;line-height:1.4;background:rgba(28,95,212,.28);border:1px solid rgba(120,165,255,.45);color:var(--ink)", "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla.") +
      table({ x: 1150, y: 170, w: 370, title: "Aylık maaş özeti · Eylül", rows: [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]] }) +
      glassBox({ x: 1150, y: 500, w: 370, h: 120, r: 20 },
        div(A(24, 22) + "font-size:15px;font-weight:700;letter-spacing:.06em;color:#9DB3E0", "DEPARTMAN") +
        div(A(24, 48) + "font-size:23px;font-weight:700;color:var(--ink);white-space:nowrap", "Ürün Geliştirme · Çanakkale") +
        div(A(24, 82) + "font-size:16px;font-weight:500;color:var(--text2);white-space:nowrap", "24 çalışan · Eylül 2026"));
  };

  F.C7 = () =>
    bgC() +
    div("position:absolute;inset:0;background-image:radial-gradient(circle, rgba(120,160,255,.30) 3px, transparent 3.4px);background-size:30px 30px;background-position:15px 15px;-webkit-mask-image:radial-gradient(ellipse at 50% 45%, rgba(0,0,0,.25), #000 70%);mask-image:radial-gradient(ellipse at 50% 45%, rgba(0,0,0,.25), #000 70%);") +
    glow(800, 230, 330, 190, "28,95,212", 0.6) +
    logoPH(590, 170, 420, 120, "Agentic Payroll logosu<br>(orijinal PNG)", "border-color:rgba(169,198,255,.7);background:rgba(10,20,50,.55);box-shadow:0 0 50px rgba(28,95,212,.5)") +
    centerText(356, "Bordronun kontrolü sizde, hız Agentic Payroll'da.", "font-size:56px;", "hl") +
    div(A(0, 470, W) + "display:flex;justify-content:center;align-items:center;gap:22px",
      `<div class="logo-ph" style="position:relative;width:220px;height:62px;font-size:14px">Datassist logosu (beyaz PNG)</div><span style="font-size:22px;font-weight:500;color:var(--text2);white-space:nowrap">Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri</span>`) +
    svg(`<circle cx="1185" cy="645" r="7" fill="#E8500A"/><circle cx="1215" cy="645" r="5" fill="rgba(232,80,10,.75)"/><circle cx="1245" cy="645" r="4" fill="rgba(232,80,10,.5)"/><circle cx="1275" cy="645" r="3" fill="rgba(232,80,10,.3)"/>`) +
    cta(0, 608, "left:50%;transform:translateX(-50%)") +
    centerText(724, "datassist.com.tr", "", "url");

  /* =====================================================================
     D · Kapanış Tüneli
     ===================================================================== */
  const DAYS = ["25", "26", "27", "28", "29", "30", "1", "2", "3", "4", "5", "6"];
  function dayFrame(i, o = {}) {
    const { w = 1320, h = 780, color = "169,198,255", a = 0.55, label = true, fill = "rgba(40,80,180,.05)" } = o;
    return div(A(-w / 2, -h / 2, w, h) + `border-radius:18px;border:3px solid rgba(${color},${a});background:${fill};box-shadow:0 0 34px rgba(${color === "169,198,255" ? "79,134,240" : color},.35), inset 0 0 34px rgba(${color === "169,198,255" ? "79,134,240" : color},.18);`,
      label ? div(A(34, 22) + `font-size:22px;font-weight:700;letter-spacing:.08em;color:rgba(${color},.85)`, i < 6 ? "EYL" : "EKİ") +
        div(A(30, 52) + "font-size:170px;font-weight:200;letter-spacing:-0.05em;line-height:1;color:rgba(229,231,235,.55)", DAYS[i % 12]) : "");
  }
  function tunnel(o = {}) {
    const { n = 11, step = 460, z0 = -80, persp = 900, oy = "44%", special = {}, fade = 0.07 } = o;
    let s = "";
    for (let i = n - 1; i >= 0; i--) {
      const sp = special[i] || {};
      s += div(`position:absolute;left:800px;top:430px;transform:translateZ(${z0 - i * step}px);opacity:${Math.max(0.18, 1 - i * fade)}`, dayFrame(i, Object.assign({ label: i < 4 }, sp)));
    }
    return div(`position:absolute;inset:0;perspective:${persp}px;perspective-origin:50% ${oy};`, div("position:absolute;inset:0;transform-style:preserve-3d;", s));
  }
  function floorTrails(o = {}) {
    const { vx = 800, vy = 420, color = "120,170,255", n = 14, seed = 5, streak = true } = o;
    const r = rng(seed); let s = `<defs><filter id="tb${seed}"><feGaussianBlur stdDeviation="5"/></filter></defs>`;
    for (let i = 0; i < n; i++) {
      const bx = -300 + (i / (n - 1)) * 2200, by = 900;
      s += `<line x1="${bx}" y1="${by}" x2="${vx + (bx - vx) * 0.02}" y2="${vy + 30}" stroke="rgba(${color},.16)" stroke-width="1.5"/>`;
      if (streak && r() > 0.35) {
        const t0 = 0.15 + r() * 0.5, t1 = t0 + 0.08 + r() * 0.2;
        const x0 = bx + (vx - bx) * t0, y0 = by + (vy + 30 - by) * t0, x1 = bx + (vx - bx) * t1, y1 = by + (vy + 30 - by) * t1;
        s += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="rgba(${color},.55)" stroke-width="7" filter="url(#tb${seed})"/><line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="rgba(214,230,255,.9)" stroke-width="2.2" stroke-linecap="round"/>`;
      }
    }
    return svg(s);
  }
  const bgD = () => div("position:absolute;inset:0;background:radial-gradient(700px 420px at 50% 44%, rgba(28,95,212,.24), transparent 70%), linear-gradient(180deg,#090D19,#0A0E1A 55%,#0B1222);");

  F.D1 = () =>
    bgD() + floorTrails({ seed: 3, n: 16 }) + tunnel({ n: 11, step: 470, z0: -60 }) +
    glow(800, 415, 330, 150, "79,134,240", 0.35) +
    div(A(0, 305, W) + "text-align:center;font-size:230px;font-weight:300;letter-spacing:-0.04em;line-height:1;color:rgba(214,230,255,.92);text-shadow:0 0 18px rgba(120,170,255,.9), 0 0 60px rgba(28,95,212,.9)", "%45") +
    svg(Array.from({ length: 10 }, (_, i) => { const y = 120 + i * 70, x = i % 2 ? 60 : 1440; return `<line x1="${x}" y1="${y}" x2="${x + (i % 2 ? 120 : -120)}" y2="${y + (i % 2 ? 8 : -8)}" stroke="rgba(214,230,255,.35)" stroke-width="2" stroke-linecap="round"/>`; }).join("")) +
    centerText(770, "Bordro dönem kapanışınızı %45 hızlandıracak", "font-size:42px;");

  F.D2 = () => {
    const trail = `<defs><filter id="ob"><feGaussianBlur stdDeviation="7"/></filter></defs>
      <path d="M 1010 812 C 820 740, 520 560, 330 470" fill="none" stroke="rgba(232,80,10,.55)" stroke-width="16" filter="url(#ob)"/>
      <path d="M 1010 812 C 820 740, 520 560, 330 470" fill="none" stroke="rgba(255,190,150,.95)" stroke-width="3.5" stroke-linecap="round"/>`;
    const mono = glassBox({ x: 760, y: 70, w: 560, h: 740, r: 26, depth: 26, tilt: "rotateY(-14deg)" },
      div(A(0, 0, 560, 84) + "display:flex;align-items:center;gap:14px;padding:0 26px;border-bottom:1px solid rgba(170,200,255,.16)",
        div("position:relative;flex:none;width:34px;height:34px;border-radius:50%;border:4px solid #A9C6FF;box-shadow:0 0 14px #4F86F0, inset 0 0 10px #4F86F0") +
        `<span style="font-size:24px;font-weight:700;color:var(--ink);white-space:nowrap">Agentic Payroll</span><span class="pill">AI Destekli</span>`) +
      div(A(24, 560, 512, 150) + "border-radius:18px;background:rgba(8,13,28,.6);border:1px solid rgba(170,200,255,.28);box-shadow:inset 0 2px 10px rgba(0,0,0,.35)",
        div(A(22, 22, 380) + "font-size:22px;font-weight:500;line-height:1.35;color:var(--text)", "Eylül ayı döneminde eksik puantaj bilgisi var mı?") +
        div("position:absolute;right:16px;bottom:16px;", ICON.arrowUp(), "send pressed")));
    return bgD() + floorTrails({ seed: 8, n: 12, vx: 330, vy: 400, streak: false }) +
      div("position:absolute;inset:0;perspective:900px;perspective-origin:20% 46%;", div("position:absolute;left:-470px;top:0;width:1600px;height:900px;transform-style:preserve-3d;transform:scale(.62) translate(-120px,-40px);", tunnel({ n: 8, step: 520, z0: -700, persp: 900 }))) +
      svg(trail) + div("position:absolute;inset:0;perspective:1600px;", mono) + glow(1030, 830, 330, 40, "2,5,14", 0.8);
  };

  F.D3 = () => {
    let dial = "";
    for (let k = 0; k < 12; k++) {
      const hit = k >= 1 && k <= 4;
      dial += div(`position:absolute;left:0;top:0;transform:rotateZ(${k * 30}deg) translateY(-380px);`,
        div(A(-80, -58, 160, 116) + `border-radius:12px;border:2px solid rgba(169,198,255,${hit ? 0.95 : 0.45});background:rgba(40,80,180,${hit ? 0.2 : 0.06});box-shadow:0 0 ${hit ? 30 : 12}px rgba(79,134,240,${hit ? 0.7 : 0.25});`,
          div(A(12, 8) + "font-size:13px;font-weight:700;letter-spacing:.06em;color:rgba(169,198,255,.8)", k < 6 ? "EYL" : "EKİ") +
          div(A(12, 30) + "font-size:64px;font-weight:200;line-height:1;color:rgba(229,231,235,.75)", DAYS[k])));
    }
    const sweep = div(A(-520, -520, 1040, 1040) + "border-radius:50%;background:conic-gradient(from 0deg, rgba(120,170,255,0) 0deg, rgba(120,170,255,0) 20deg, rgba(150,195,255,.20) 140deg, rgba(120,170,255,0) 142deg);");
    const labels = ["312 çalışan taranıyor…", "Puantaj kayıtları kontrol ediliyor…", "Eylül mevzuat değişiklikleri eşleştiriliyor…"];
    return bgD() +
      div("position:absolute;inset:0;perspective:1300px;perspective-origin:50% 30%;",
        div("position:absolute;left:800px;top:410px;transform-style:preserve-3d;transform:rotateX(60deg);", sweep + dial)) +
      glow(800, 400, 260, 200, "28,95,212", 0.45) +
      div(A(800 - 80, 385 - 80, 160, 160) + "border-radius:50%;border:11px solid rgba(169,198,255,.9);box-shadow:0 0 40px #4F86F0, 0 0 90px rgba(28,95,212,.8), inset 0 0 30px rgba(79,134,240,.9);transform:rotateX(18deg)") +
      div(A(0, 760, W) + "display:flex;justify-content:center;align-items:center;gap:26px",
        labels.map((l, i) => `<span style="position:relative;border-radius:999px;padding:12px 24px;font-size:${i ? 17 : 22}px;font-weight:600;white-space:nowrap;color:${i ? "rgba(209,213,219,.4)" : "var(--ink)"};${i ? "" : "background:rgba(28,95,212,.26);border:1px solid rgba(120,165,255,.55);box-shadow:0 0 26px rgba(28,95,212,.35);"}">${l}</span>`).join(""));
  };

  F.D4 = () =>
    bgD() + floorTrails({ seed: 4, n: 14, streak: false }) +
    tunnel({ n: 9, step: 420, z0: -380, special: { 1: { color: "239,68,68", a: 0.9 }, 3: { color: "79,134,240", a: 0.95 }, 5: { color: "79,134,240", a: 0.95 } } }) +
    card({ x: 90, y: 470, w: 720, h: 150, dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", bodySize: 25 }) +
    card({ x: 860, y: 560, w: 650, h: 130, dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", bodySize: 21 }) +
    card({ x: 930, y: 150, w: 560, h: 124, dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", bodySize: 21, style: "opacity:.9" });

  F.D5 = () => {
    let row = "";
    for (let i = 0; i < 12; i++) {
      row += div(`position:absolute;left:0;top:0;transform:translateX(${i * 150}px) rotateY(-62deg);`,
        div(A(-130, -170, 260, 340) + "border-radius:14px;border:3px solid rgba(16,185,129,.9);background:rgba(16,185,129,.07);box-shadow:0 0 30px rgba(16,185,129,.55), inset 0 0 24px rgba(16,185,129,.25)",
          div(A(18, 12) + "font-size:44px;font-weight:200;color:rgba(229,231,235,.75)", DAYS[i])));
    }
    const lines = [[300, 690, 470, 420], [700, 690, 760, 400], [1100, 690, 1050, 380]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} C ${x1} ${y1 - 120}, ${x2} ${y2 + 120}, ${x2} ${y2}" fill="none" stroke="rgba(79,134,240,.45)" stroke-width="10" filter="url(#lb)"/><path d="M${x1} ${y1} C ${x1} ${y1 - 120}, ${x2} ${y2 + 120}, ${x2} ${y2}" fill="none" stroke="#A9C6FF" stroke-width="2.4" stroke-dasharray="2 9" stroke-linecap="round"/>`).join("");
    return bgD() +
      div("position:absolute;inset:0;perspective:1500px;perspective-origin:40% 40%;", div("position:absolute;left:250px;top:330px;transform-style:preserve-3d;transform:rotateY(18deg) rotateX(-6deg);", row)) +
      svg(`<defs><filter id="lb"><feGaussianBlur stdDeviation="6"/></filter></defs>${lines}`) +
      [[240, 610, "turnstile"], [640, 610, "cardReader"], [1040, 610, "finger"]].map(([x, y, ic]) => iconTile(x, y, 110, ic, { r: 20 })).join("") +
      statusPill(0, 760, "Puantaj tamamlandı · Bordro uzmanı onayına hazır", "green", "left:50%;transform:translateX(-50%)") +
      centerText(40, "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin.", "font-size:32px;");
  };

  F.D6 = () => {
    const wall = (side) => {
      let s = "";
      for (let i = 0; i < 6; i++) s += div(A(i * 330, 0, 300, 380) + `border-radius:12px;border:2px solid rgba(169,198,255,${0.6 - i * 0.07});background:rgba(40,80,180,.08);box-shadow:0 0 24px rgba(79,134,240,.3)`,
        div(A(24, 24, 252, 12) + "border-radius:6px;background:rgba(169,198,255,.35)") + div(A(24, 50, 180, 10) + "border-radius:6px;background:rgba(169,198,255,.2)") +
        Array.from({ length: 5 }, (_, j) => div(A(30 + j * 48, 330 - (40 + ((i * 7 + j * 13) % 9) * 25), 32, 40 + ((i * 7 + j * 13) % 9) * 25) + "background:rgba(120,165,255,.45);border:1px solid rgba(169,198,255,.5)")).join(""));
      return div(`position:absolute;left:${side < 0 ? 0 : 1600}px;top:250px;width:2000px;height:380px;transform-origin:${side < 0 ? "0 50%" : "0 50%"};transform:rotateY(${side < 0 ? 72 : 108}deg);transform-style:preserve-3d`, s);
    };
    const vals = [1.26, 0.74, 0.52, 0.33, 0.25];
    return bgD() + floorTrails({ seed: 9, n: 14, vy: 430 }) +
      div("position:absolute;inset:0;perspective:900px;perspective-origin:50% 48%;", div("position:absolute;inset:0;transform-style:preserve-3d;", wall(-1) + wall(1))) +
      glassBox({ x: 300, y: 200, w: 560, h: 480, r: 22, depth: 16, tilt: "rotateY(8deg)" },
        div(A(26, 22) + "font-size:20px;font-weight:700;color:var(--ink)", "Ürün Geliştirme · Çanakkale · Eylül") +
        bars3d({ x: 50, base: 400, values: vals, labels: ["Backend", "Frontend", "Mobil", "QA", "Tasarım"], bw: 64, gap: 34, scale: 230, valueFmt: (v) => "₺" + v.toFixed(2).replace(".", ",") + " mn" })) +
      table({ x: 900, y: 230, w: 380, title: "Aylık maaş özeti · Eylül", rows: [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]] }) +
      div(A(250, 50, 1100) + "border-radius:16px;padding:14px 20px;text-align:center;font-size:21px;font-weight:500;background:rgba(28,95,212,.28);border:1px solid rgba(120,165,255,.45);color:var(--ink);white-space:nowrap", "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla.");
  };

  F.D7 = () => {
    let rings = "";
    for (let i = 6; i >= 0; i--) rings += div(A(800 - 230 + i * 6, 250 - 230 + i * 4, 460 - i * 12, 460 - i * 12) + `border-radius:50%;border:${i ? 2 : 10}px solid rgba(169,198,255,${i ? 0.18 + (6 - i) * 0.04 : 0.95});box-shadow:0 0 ${i ? 10 : 40}px rgba(79,134,240,${i ? 0.3 : 0.9})${i ? "" : ", inset 0 0 40px rgba(79,134,240,.7)"}`);
    return bgD() + glow(800, 250, 380, 300, "28,95,212", 0.45) + rings +
      logoPH(620, 190, 360, 120, "Agentic Payroll logosu<br>(orijinal PNG)", "border-color:rgba(169,198,255,.7);background:rgba(10,20,50,.55)") +
      centerText(520, "Bordronun kontrolü sizde, hız Agentic Payroll'da.", "font-size:52px;", "hl") +
      div(A(0, 610, W) + "display:flex;justify-content:center;align-items:center;gap:22px",
        `<div class="logo-ph" style="position:relative;width:220px;height:58px;font-size:14px">Datassist logosu (beyaz PNG)</div><span style="font-size:21px;font-weight:500;color:var(--text2);white-space:nowrap">Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri</span>`) +
      cta(0, 712, "left:50%;transform:translateX(-50%)") +
      centerText(820, "datassist.com.tr", "", "url");
  };

  /* =====================================================================
     E · Seramik Atölye (matte navy ceramic; the only light source is the pearl)
     ===================================================================== */
  const CER = (r = 28) => `border-radius:${r}px;background:linear-gradient(180deg,#24335A 0%,#1B2746 16%,#152039 58%,#111A31 100%);box-shadow:inset 0 2px 0 rgba(190,210,255,.13), inset 0 -8px 16px rgba(3,6,14,.55), inset 0 0 0 1px rgba(150,180,240,.07), 0 34px 60px rgba(3,6,14,.75), 0 12px 18px rgba(3,6,14,.55);`;
  const SOCKET = "border-radius:9px;background:linear-gradient(180deg,#080D1B,#10182D);box-shadow:inset 0 5px 9px rgba(0,0,0,.75), inset 0 -1px 0 rgba(170,195,255,.10);";
  const TILE = "border-radius:9px;background:linear-gradient(180deg,#2C3C64,#1F2C4D);box-shadow:inset 0 1px 0 rgba(200,215,255,.22), inset 0 -2px 3px rgba(0,0,0,.35), 0 3px 5px rgba(0,0,0,.55);";
  const bgE = () => div("position:absolute;inset:0;background:radial-gradient(1000px 520px at 50% 14%, rgba(92,122,190,.30), transparent 70%), linear-gradient(180deg,#19223E 0%,#131B32 48%,#0E1528 76%,#0B1121 100%);");
  function pearl(x, y, d, a = 0.65) {
    return glow(x, y, d * 1.9, d * 1.9, "28,95,212", a * 0.55) +
      div(A(x - d / 2, y - d / 2, d, d) + `border-radius:50%;background:radial-gradient(circle at 34% 30%, #F3F6FB 0%, #CFE0FF 9%, #85AAF6 25%, #2F6BDB 52%, #173F92 78%, #0D2A66 100%);box-shadow:0 0 ${d * 0.45}px rgba(79,134,240,${a}), 0 0 ${d * 1.2}px rgba(28,95,212,${a * 0.6}), inset 0 -${d * 0.12}px ${d * 0.2}px rgba(5,15,40,.55);`) +
      div(A(x - d * 0.24, y - d * 0.32, d * 0.2, d * 0.12) + "border-radius:50%;background:rgba(243,246,251,.75);filter:blur(1px);transform:rotate(-25deg)");
  }
  function orangeKey(x, y, w, h, label = "", pressed = false, fs = 26) {
    return div(A(x, y + (pressed ? 6 : 0), w, h) + `border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:${fs}px;font-weight:700;color:#FFF3EA;white-space:nowrap;background:linear-gradient(180deg,#F7803F 0%,#E8500A 46%,#C74406 100%);box-shadow:inset 0 2px 0 rgba(255,222,200,.6), inset 0 -4px 8px rgba(120,30,0,.45), 0 ${pressed ? 2 : 9}px 0 #8C3104, 0 ${pressed ? 8 : 20}px 30px rgba(232,80,10,.42);`, label);
  }
  function ceramicCard(o) {
    const { x, y, w = 640, h = 140, dot = "red", head, body, bodySize = 23 } = o;
    const enamel = dot === "red"
      ? "background:radial-gradient(circle at 35% 30%, #FF9A9A, #EF4444 45%, #A11E1E);box-shadow:0 0 12px rgba(239,68,68,.6), inset 0 -2px 3px rgba(0,0,0,.35);"
      : "border:4px solid #4F86F0;box-shadow:0 0 10px rgba(79,134,240,.6), inset 0 1px 2px rgba(0,0,0,.4);";
    return div(A(x, y, w, h) + CER(22),
      div(A(28, 32, 18, 18) + "border-radius:50%;" + enamel) +
      div(A(62, 26) + "font-size:17px;font-weight:600;color:#8FA4CF;white-space:nowrap", head) +
      div(A(62, 58) + `font-size:${bodySize}px;font-weight:650;color:#E5E7EB;white-space:nowrap;text-shadow:0 1px 0 rgba(0,0,0,.5)`, body) +
      div(`position:absolute;right:22px;bottom:20px;border-radius:12px;padding:9px 18px;font-size:16px;font-weight:600;color:#DCE7FF;${CER(12)}box-shadow:inset 0 1px 0 rgba(190,210,255,.18), 0 4px 8px rgba(0,0,0,.5);`, "İncele"));
  }
  function shadowE(x, y, rx, ry, a = 0.75) { return glow(x, y, rx, ry, "2,4,10", a); }

  F.E1 = () => {
    const xs = [520, 815, 1085];
    const glyphs = ["%", "4", "5"];
    let heavy = "", groove = "", fillL = "";
    const ext = Array.from({ length: 16 }, (_, i) => `0 ${i + 1}px 0 rgb(${22 - i * 0.5},${31 - i * 0.6},${56 - i})`).join(",") + ",0 44px 60px rgba(0,0,0,.6)";
    glyphs.forEach((g, i) => {
      const base = `position:absolute;left:${xs[i]}px;top:170px;transform:translateX(-50%);font-size:370px;line-height:1;white-space:nowrap;`;
      heavy += div(base + `font-weight:800;color:#26365F;text-shadow:${ext}`, g) + div(base + "font-weight:800;color:transparent;text-shadow:0 -2px 0 rgba(200,215,255,.18)", g);
      groove += div(base + "font-weight:230;color:rgba(8,12,24,.55)", g);
      fillL += div(base + "font-weight:230;color:#86ADFF;clip-path:inset(36% 0 0 0);text-shadow:0 0 10px rgba(79,134,240,.95), 0 0 28px rgba(28,95,212,.9)", g);
    });
    let tiles = "", x = 170, r = rng(4);
    for (let i = 0; i < 13; i++) {
      tiles += div(A(x, 598 - i * 1.5, 84, 84) + CER(16) + `transform:rotate(${(r() - 0.5) * 6}deg)`, div(A(12, 22) + "font-size:30px;font-weight:600;color:#0F1629;text-shadow:0 1px 0 rgba(170,195,255,.15)", ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "1", "2"][i]));
      x += 128 - i * 7;
    }
    return bgE() + shadowE(800, 580, 520, 60) + tiles + heavy + groove + fillL +
      centerText(770, "Bordro dönem kapanışınızı %45 hızlandıracak", "font-size:42px;");
  };

  F.E2 = () => {
    const screen = div(A(34, 34, 932, 470) + "border-radius:22px;background:linear-gradient(160deg, rgba(34,52,96,.55), rgba(6,10,22,.92) 40%);box-shadow:inset 0 0 0 2px rgba(6,10,22,.9), inset 0 6px 16px rgba(0,0,0,.6);overflow:hidden",
      div(A(0, 0, 932, 80) + "border-bottom:1px solid rgba(170,200,255,.14)") +
      div(A(26, 18, 44, 44) + "border-radius:50%;" + SOCKET) + pearl(48, 40, 34, 0.8) +
      div(A(86, 24) + "font-size:25px;font-weight:700;color:var(--ink);white-space:nowrap", "Agentic Payroll") +
      div(A(300, 22), "AI Destekli", "pill") +
      div(A(28, 370, 876, 72) + "border-radius:16px;background:rgba(10,16,34,.8);border:1px solid rgba(170,200,255,.22);display:flex;align-items:center;padding:0 22px;font-size:23px;font-weight:500;color:var(--text);white-space:nowrap", "Eylül ayı döneminde eksik puantaj bilgisi var mı?") +
      div(A(-100, -60, 500, 900) + "background:linear-gradient(90deg, rgba(255,255,255,0), rgba(200,220,255,.06), rgba(255,255,255,0));transform:rotate(24deg)"));
    const tab = div(A(0, 0, 1000, 640) + CER(46), screen +
      div(A(806, 532, 160, 78) + SOCKET + "border-radius:20px;box-shadow:inset 0 5px 9px rgba(0,0,0,.75), 0 0 22px rgba(232,80,10,.55), inset 0 0 12px rgba(232,80,10,.5)") +
      orangeKey(812, 530, 148, 70, ICON.arrowR("#FFF3EA", 30).replace("margin-left:10px", "margin-left:0"), true) +
      div(A(40, 556) + "font-size:15px;font-weight:700;letter-spacing:.1em;color:rgba(143,164,207,.55)", "AGENTIC PAYROLL"));
    return bgE() + shadowE(760, 800, 560, 60, 0.85) +
      div("position:absolute;inset:0;perspective:1700px;perspective-origin:50% 20%;", div("position:absolute;left:260px;top:150px;width:1000px;height:640px;transform:rotateX(18deg) rotateY(-8deg);transform-style:preserve-3d;", tab));
  };

  F.E3 = () => {
    let tokens = "", r = rng(9);
    for (let i = 0; i < 16; i++) {
      const th = (i / 16) * Math.PI * 2 + 0.2, cx = 800 + 470 * Math.cos(th), cy = 560 + 120 * Math.sin(th), sc = 0.78 + 0.3 * (Math.sin(th) + 1) / 2;
      const kind = i % 3, st = `transform:translate(-50%,-50%) scale(${sc.toFixed(2)});`;
      if (kind === 0) tokens += div(A(cx, cy, 90, 56) + CER(28) + st);
      if (kind === 1) tokens += div(A(cx, cy, 64, 64) + TILE + "border-radius:14px;" + st);
      if (kind === 2) tokens += div(A(cx, cy, 110, 34) + CER(10) + st, div(A(12, 12, 70, 8) + "border-radius:4px;background:rgba(6,10,20,.8)"));
    }
    const labels = ["312 çalışan taranıyor…", "Puantaj kayıtları kontrol ediliyor…", "Eylül mevzuat değişiklikleri eşleştiriliyor…"];
    return bgE() + shadowE(800, 640, 640, 80, 0.8) +
      div(A(250, 470, 1100, 250) + "border-radius:50%;background:linear-gradient(180deg,#131C33,#0B1122);box-shadow:0 30px 60px rgba(0,0,0,.7)") +
      div(A(250, 440, 1100, 250) + "border-radius:50%;background:radial-gradient(ellipse at 50% 35%, #26355C, #19243F 60%, #131C33);box-shadow:inset 0 2px 0 rgba(200,215,255,.12)") +
      div(A(520, 500, 560, 130) + "border-radius:50%;box-shadow:inset 0 4px 10px rgba(0,0,0,.5);background:radial-gradient(ellipse, rgba(79,134,240,.20), transparent 70%)") +
      tokens +
      div(A(0, 360, W, 260) + "background:linear-gradient(90deg, rgba(120,165,255,0) 20%, rgba(150,190,255,.14) 48%, rgba(190,215,255,.22) 50%, rgba(150,190,255,.14) 52%, rgba(120,165,255,0) 80%);transform:skewX(-20deg);mix-blend-mode:screen") +
      beam({ x: 800, top: 250, w0: 120, w1: 900, h: 420, a: 0.10 }) +
      pearl(800, 300, 150, 0.8) +
      div(A(0, 790, W) + "display:flex;justify-content:center;align-items:center;gap:26px",
        labels.map((l, i) => `<span style="position:relative;border-radius:999px;padding:12px 24px;font-size:${i ? 17 : 22}px;font-weight:600;white-space:nowrap;color:${i ? "rgba(209,213,219,.4)" : "var(--ink)"};${i ? "" : CER(999) + "box-shadow:inset 0 1px 0 rgba(190,210,255,.15), 0 8px 18px rgba(0,0,0,.5);"}">${l}</span>`).join(""));
  };

  F.E4 = () => {
    let tray = "";
    for (let row = 0; row < 4; row++) for (let c = 0; c < 14; c++) {
      const empty = row === 0 && c >= 8 && c <= 10;
      tray += div(A(90 + c * 70, 70 + row * 78, 58, 58) + (empty ? SOCKET : TILE) + "display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:650;" +
        (empty ? "color:rgba(120,150,210,.45)" : "color:rgba(8,12,24,.78);text-shadow:0 1px 0 rgba(170,195,255,.16)"), String(c + 1));
    }
    tray += div(A(34, 86, 26, 26) + "border-radius:50%;background:radial-gradient(circle at 35% 30%, #FF9A9A, #EF4444 45%, #A11E1E);box-shadow:0 0 14px rgba(239,68,68,.7)");
    ["AY", "EK", "MD", "SÇ"].forEach((n, i) => { if (i) tray += div(A(26, 86 + i * 78) + "font-size:18px;font-weight:700;color:#8FA4CF", n); });
    const trayEl = div(A(0, 0, 1100, 400) + CER(34), tray);
    return bgE() + shadowE(800, 800, 620, 70, 0.85) +
      div("position:absolute;inset:0;perspective:1500px;perspective-origin:50% 0%;", div("position:absolute;left:250px;top:430px;width:1100px;height:400px;transform:rotateX(50deg);transform-style:preserve-3d;", trayEl)) +
      ceramicCard({ x: 140, y: 250, w: 720, h: 140, dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", bodySize: 25 }) +
      ceramicCard({ x: 830, y: 150, w: 650, h: 124, dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", bodySize: 21 }) +
      ceramicCard({ x: 900, y: 30, w: 580, h: 110, dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", bodySize: 20 }) +
      pearl(120, 110, 70, 0.75);
  };

  F.E5 = () => {
    let tray = "";
    for (let row = 0; row < 4; row++) for (let c = 0; c < 12; c++) {
      const fresh = row === 0 && c >= 7 && c <= 9;
      tray += div(A(70 + c * 62, 40 + row * 64, 52, 52) + TILE + (fresh ? "box-shadow:inset 0 1px 0 rgba(200,215,255,.22), 0 0 0 2px rgba(16,185,129,.9), 0 0 16px rgba(16,185,129,.7);" : "") +
        "display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:650;color:rgba(8,12,24,.78);text-shadow:0 1px 0 rgba(170,195,255,.16)", String(c + 1));
    }
    const trayEl = div(A(480, 150, 880, 310) + CER(30), tray);
    const block = div(A(160, 190, 190, 150) + CER(18),
      div(A(55, 18, 80, 80), ICON.sheet("#9FB2D8")) + div(A(0, 108, 190) + "text-align:center;font-size:15px;font-weight:700;color:#9FB2D8", "Puantaj_Eylül.xlsx"));
    const loose = [[372, 210], [412, 256], [372, 300]].map(([x, y]) => div(A(x, y, 44, 44) + TILE)).join("");
    const minis = [[200, 520, "turnstile"], [640, 560, "cardReader"], [1080, 540, "finger"], [1320, 520, "cloud"]];
    const chans = minis.map(([x, y]) => `<path d="M${x + 55} ${y} C ${x + 55} ${y - 60}, 900 ${480}, 920 ${462}" fill="none" stroke="rgba(79,134,240,.5)" stroke-width="8" filter="url(#eb)"/><path d="M${x + 55} ${y} C ${x + 55} ${y - 60}, 900 ${480}, 920 ${462}" fill="none" stroke="#9CC0FF" stroke-width="2.4"/>`).join("");
    return bgE() + svg(`<defs><filter id="eb"><feGaussianBlur stdDeviation="5"/></filter></defs>${chans}`) +
      shadowE(920, 470, 470, 40, 0.6) + trayEl + block + loose +
      minis.map(([x, y, ic]) => div(A(x, y, 110, 110) + CER(28), div(A(24, 24, 62, 62), ICON[ic]("#9FB2D8")))).join("") +
      statusPill(0, 700, "Puantaj tamamlandı · Bordro uzmanı onayına hazır", "green", "left:50%;transform:translateX(-50%)") +
      centerText(790, "Zengin PDKS entegrasyonlarımızla puantaj bilgileriniz otomatik gelsin.", "font-size:32px;");
  };

  F.E6 = () => {
    const vals = [1.26, 0.74, 0.52, 0.33, 0.25];
    let cols = "";
    vals.forEach((v, i) => {
      const w = 96, h = v * 380, x = 170 + i * 150, base = 640;
      cols += shadowE(x + w / 2 + 20, base + 6, 80, 16, 0.8);
      cols += div(A(x, base - h, w, h) + "border-radius:0 0 12px 12px;background:linear-gradient(90deg,#121B32 0%,#24345B 32%,#2F4270 50%,#1E2B4C 74%,#10182E 100%);");
      cols += div(A(x, base - h - 14, w, 28) + `border-radius:50%;background:radial-gradient(ellipse at 42% 40%, #3F5790, #23335A);box-shadow:inset 0 1px 0 rgba(200,215,255,.3)${i === 0 ? ", 0 0 26px rgba(79,134,240,.55)" : ""}`);
      cols += div(A(x - 20, base + 16, w + 40) + "text-align:center;font-size:16px;font-weight:600;color:#8FA4CF", ["Backend", "Frontend", "Mobil", "QA", "Tasarım"][i]);
      cols += div(A(x - 30, base - h - 52, w + 60) + "text-align:center;font-size:17px;font-weight:700;color:var(--ink)", "₺" + v.toFixed(2).replace(".", ",") + " mn");
    });
    const plate = div(A(1000, 160, 470, 300) + CER(26),
      div(A(28, 24) + "font-size:20px;font-weight:700;color:#E5E7EB", "Aylık maaş özeti · Eylül") +
      [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]].map((r, i) =>
        div(A(28, 76 + i * 52, 414, 1) + "background:rgba(6,10,20,.8);box-shadow:0 1px 0 rgba(170,195,255,.1)") +
        div(A(28, 88 + i * 52) + "font-size:17px;font-weight:500;color:#AEB9D3", r[0]) +
        div(`position:absolute;right:28px;top:${87 + i * 52}px;font-size:18px;font-weight:700;color:#E5E7EB;font-variant-numeric:tabular-nums`, r[1])).join(""));
    const dept = div(A(1000, 490, 470, 120) + CER(22),
      div(A(26, 22) + "font-size:15px;font-weight:700;letter-spacing:.06em;color:#8FA4CF", "DEPARTMAN") +
      div(A(26, 48) + "font-size:23px;font-weight:700;color:#E5E7EB;white-space:nowrap", "Ürün Geliştirme · Çanakkale"));
    return bgE() +
      div(A(80, 648, 820, 4) + "border-radius:2px;background:#8FB5FF;box-shadow:0 0 16px #4F86F0, 0 0 40px rgba(28,95,212,.7)") +
      cols + plate + dept +
      div(A(80, 740, 1390, 92) + CER(24) + "display:flex;align-items:center;padding:0 30px;font-size:22px;font-weight:500;color:var(--text);white-space:nowrap",
        `<span style="position:relative;display:inline-block;width:40px;height:40px;margin-right:18px;border-radius:50%;background:radial-gradient(circle at 34% 30%, #F3F6FB 0%, #85AAF6 25%, #2F6BDB 52%, #0D2A66 100%);box-shadow:0 0 18px rgba(79,134,240,.8)"></span>Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla.`);
  };

  F.E7 = () =>
    bgE() +
    div(A(560, 150, 480, 150) + "border-radius:30px;" + SOCKET + "box-shadow:inset 0 6px 14px rgba(0,0,0,.8), 0 0 60px rgba(28,95,212,.35)",
      div(A(12, 12, 456, 126) + "border-radius:22px;box-shadow:0 0 40px rgba(79,134,240,.6), inset 0 0 30px rgba(79,134,240,.45)")) +
    logoPH(590, 165, 420, 120, "Agentic Payroll logosu<br>(orijinal PNG, seramiğe gömülü)", "border-color:rgba(169,198,255,.7);background:rgba(10,20,50,.35)") +
    pearl(1080, 226, 58, 0.8) +
    centerText(360, "Bordronun kontrolü sizde, hız Agentic Payroll'da.", "font-size:54px;", "hl") +
    div(A(0, 470, W) + "display:flex;justify-content:center;align-items:center;gap:22px",
      `<div class="logo-ph" style="position:relative;width:220px;height:62px;font-size:14px">Datassist logosu (beyaz PNG)</div><span style="font-size:22px;font-weight:500;color:var(--text2);white-space:nowrap">Tek yerden, tüm dünyada yapay zekâ destekli bordro ve İK çözümleri</span>`) +
    shadowE(800, 700, 280, 30, 0.8) +
    orangeKey(530, 590, 540, 96, "Ücretsiz Demo Talep Edin" + ICON.arrowR("#FFF3EA", 28), false, 28) +
    centerText(746, "datassist.com.tr", "", "url");

  /* =====================================================================
     registry + render
     ===================================================================== */
  window.FRAMES = F;
  const AFTER_RUN = () => { AFTER.splice(0).forEach((fn) => fn()); };
  function build(id) {
    const f = document.createElement("div");
    f.className = "frame"; f.id = "frame-" + id;
    f.innerHTML = F[id] ? F[id]() : `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:40px;color:#556">${id}</div>`;
    return f;
  }
  const q = new URLSearchParams(location.search).get("f");
  const stage = document.getElementById("stage");
  if (q) {
    stage.appendChild(build(q));
  } else {
    stage.className = "dev";
    Object.keys(F).forEach((id) => {
      const wrap = document.createElement("div");
      wrap.innerHTML = `<div class="name">${id}</div>`;
      const hold = document.createElement("div"); hold.className = "hold";
      hold.appendChild(build(id)); wrap.appendChild(hold); stage.appendChild(wrap);
    });
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { AFTER_RUN(); requestAnimationFrame(() => { window.__ready = true; }); });
})();
