// Printed UI: 2D drawings used as textures on the 3D glass panels.
// Each printable is fn(canvas, state): it clears the canvas and draws the state. Layouts are proportional
// to the canvas height (u = h / 1000), so the same function prints any panel size crisply.
// Every name, number and office below is fictional.

export const C = {
  ink: "#F3F6FB", text: "#E5E7EB", text2: "#D1D5DB", head: "#9DB3E0", muted: "#8C97AD",
  blue: "#1C5FD4", blueL: "#4F86F0", blueXL: "#A9C6FF", orange: "#E8500A", green: "#10B981", red: "#EF4444",
};

export function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = Math.max(2, Math.round(w));
  c.height = Math.max(2, Math.round(h));
  return c;
}

function rr(ctx, X, Y, W, H, R) {
  R = Math.min(R, W / 2, H / 2);
  ctx.beginPath();
  ctx.moveTo(X + R, Y);
  ctx.arcTo(X + W, Y, X + W, Y + H, R);
  ctx.arcTo(X + W, Y + H, X, Y + H, R);
  ctx.arcTo(X, Y + H, X, Y, R);
  ctx.arcTo(X, Y, X + W, Y, R);
  ctx.closePath();
}
export function font(ctx, px, weight = 500) {
  ctx.font = `${weight} ${px}px Inter`;
}
function begin(c) {
  const ctx = c.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 1;
  return ctx;
}
export function sheen(ctx, w, h, a = 0.07) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, `rgba(215,228,255,${a})`);
  g.addColorStop(0.35, `rgba(215,228,255,${a * 0.35})`);
  g.addColorStop(1, "rgba(215,228,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}
// a smoky tint printed behind small cards so their text reads over bright glass
function backing(ctx, w, h, a = 0.5) {
  ctx.fillStyle = `rgba(8, 13, 30, ${a})`;
  ctx.fillRect(0, 0, w, h);
}
export function wrap(ctx, text, maxW) {
  const words = text.split(" "), lines = [];
  let line = "";
  for (const wd of words) {
    const t = line ? line + " " + wd : wd;
    if (ctx.measureText(t).width > maxW && line) {
      lines.push(line);
      line = wd;
    } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}
function pill(ctx, x, y, s, label, o = {}) {
  const { fill = "rgba(28,95,212,.34)", stroke = "rgba(120,165,255,.65)", color = "#CFE0FF", px = 26, weight = 600 } = o;
  font(ctx, px * s, weight);
  const w = ctx.measureText(label).width + 44 * s, h = 48 * s * (px / 26);
  rr(ctx, x, y, w, h, h / 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 2 * s;
  ctx.strokeStyle = stroke;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + 22 * s, y + h / 2 + 1 * s);
  return w;
}
function dot(ctx, x, y, r, kind, u) {
  ctx.save();
  if (kind === "red") {
    ctx.shadowColor = "rgba(239,68,68,.95)"; ctx.shadowBlur = r * 1.8;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = C.red; ctx.fill();
  } else if (kind === "green") {
    ctx.shadowColor = "rgba(16,185,129,.95)"; ctx.shadowBlur = r * 1.8;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = C.green; ctx.fill();
    ctx.shadowBlur = 0; ctx.strokeStyle = "#EAFBF4"; ctx.lineWidth = r * 0.28; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(x - r * 0.45, y + r * 0.02); ctx.lineTo(x - r * 0.1, y + r * 0.36); ctx.lineTo(x + r * 0.5, y - r * 0.32); ctx.stroke();
  } else {
    ctx.shadowColor = "rgba(79,134,240,.9)"; ctx.shadowBlur = r * 1.3;
    ctx.beginPath(); ctx.arc(x, y, r * 0.88, 0, Math.PI * 2); ctx.lineWidth = r * 0.4; ctx.strokeStyle = C.blueL; ctx.stroke();
  }
  ctx.restore();
}
// red → green, blended by k (0 red, 1 green)
function statusDot(ctx, x, y, r, k, u) {
  if (k <= 0) return dot(ctx, x, y, r, "red", u);
  if (k >= 1) return dot(ctx, x, y, r, "green", u);
  ctx.save(); ctx.globalAlpha = 1 - k; dot(ctx, x, y, r, "red", u); ctx.restore();
  ctx.save(); ctx.globalAlpha = k; dot(ctx, x, y, r * (0.8 + 0.2 * k), "green", u); ctx.restore();
}
function coreDot(ctx, x, y, r) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, 0, x, y, r);
  g.addColorStop(0, "#EAF1FF"); g.addColorStop(0.2, "#A9C6FF"); g.addColorStop(0.55, "#2F6BDB"); g.addColorStop(1, "#0E2F6E");
  ctx.save(); ctx.shadowColor = "rgba(79,134,240,.9)"; ctx.shadowBlur = r * 1.6;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.restore();
}
function sheetIcon(ctx, x, y, s) {
  // generic spreadsheet glyph: a sheet with a folded corner and a grid (no product logo)
  const w = 64 * s, h = 80 * s, f = 18 * s;
  ctx.save();
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w - f, y); ctx.lineTo(x + w, y + f); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath();
  ctx.fillStyle = "rgba(16,185,129,.22)"; ctx.fill(); ctx.lineWidth = 3 * s; ctx.strokeStyle = "rgba(110,231,183,.9)"; ctx.stroke();
  ctx.strokeStyle = "rgba(167,243,208,.85)"; ctx.lineWidth = 2.4 * s;
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x + 10 * s, y + 18 * s + i * 14 * s); ctx.lineTo(x + w - 10 * s, y + 18 * s + i * 14 * s); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(x + w * 0.42, y + 28 * s); ctx.lineTo(x + w * 0.42, y + h - 10 * s); ctx.stroke();
  ctx.restore();
}

/* ---------- chat window ---------- */
// state: { msgs, input, caret, send (0..1 press), ripple (-1 | 0..1), attach, dot }
export function chat(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  // a smoky backing behind the printed UI keeps the text crisp over bright glass
  rr(ctx, 0, 0, w, h, 64 * u);
  ctx.fillStyle = "rgba(8, 13, 30, 0.58)";
  ctx.fill();
  sheen(ctx, w, h, 0.05);
  const head = 150 * u;
  ctx.strokeStyle = "rgba(170,200,255,.18)"; ctx.lineWidth = 3 * u;
  ctx.beginPath(); ctx.moveTo(0, head); ctx.lineTo(w, head); ctx.stroke();
  if (s.dot) coreDot(ctx, 76 * u, head / 2, 28 * u);
  font(ctx, 54 * u, 700); ctx.fillStyle = C.ink;
  ctx.fillText("Agentic Payroll", 130 * u, head / 2 + 2 * u);
  pill(ctx, 130 * u + ctx.measureText("Agentic Payroll").width + 30 * u, head / 2 - 32 * u, u * 1.33, "AI Destekli");

  // input box
  const ih = 150 * u, iy = h - ih - 50 * u, ix = 50 * u;
  // messages, bottom-anchored above the input (older ones scroll off the top)
  const blocks = (s.msgs || []).map((m) => measureMsg(ctx, m, w, u));
  let y = iy - 44 * u;
  ctx.save();
  ctx.beginPath(); ctx.rect(0, head + 8 * u, w, iy - head - 16 * u); ctx.clip();
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    y -= b.h;
    if (y + b.h < head) break;
    drawMsg(ctx, b, w, y, u);
    y -= 34 * u;
  }
  ctx.restore();

  rr(ctx, ix, iy, w - 2 * ix, ih, 38 * u);
  ctx.fillStyle = "rgba(6,10,24,.62)"; ctx.fill(); ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(170,200,255,.30)"; ctx.stroke();
  let tx = ix + 48 * u;
  if (s.attach) {
    const a = s.attach;
    font(ctx, 36 * u, 600);
    const cw = ctx.measureText("puantaj_eylul.xlsx").width + 118 * u;
    ctx.save(); ctx.globalAlpha = Math.min(1, a);
    rr(ctx, tx - 14 * u, iy + 26 * u, cw, ih - 52 * u, 24 * u);
    ctx.fillStyle = "rgba(16,185,129,.16)"; ctx.fill(); ctx.strokeStyle = "rgba(110,231,183,.6)"; ctx.lineWidth = 3 * u; ctx.stroke();
    sheetIcon(ctx, tx + 4 * u, iy + 38 * u, 0.92 * u);
    ctx.fillStyle = C.ink; ctx.fillText("puantaj_eylul.xlsx", tx + 84 * u, iy + ih / 2 + 1 * u);
    ctx.restore();
    tx += cw + 18 * u;
  }
  font(ctx, 46 * u, 500); ctx.textBaseline = "middle";
  const input = s.input || "";
  const maxW = w - tx - ix - 160 * u;
  let shown = input;
  // long prompts scroll left inside the box, like a real input
  let offset = 0;
  const tw = ctx.measureText(shown).width;
  if (tw > maxW) offset = tw - maxW;
  ctx.save(); ctx.beginPath(); ctx.rect(tx - 4 * u, iy, maxW + 12 * u, ih); ctx.clip();
  ctx.fillStyle = input ? C.text : "rgba(209,213,219,.42)";
  ctx.fillText(input || (s.attach ? "" : "Bir şey sorun…"), tx - offset, iy + ih / 2 + 1 * u);
  if (s.caret && s.caretX == null) {
    ctx.fillStyle = C.blueL; ctx.fillRect(tx + Math.min(tw, maxW) + 6 * u, iy + ih / 2 - 30 * u, 4 * u, 60 * u);
  }
  ctx.restore();
  if (s.caret && s.caretX != null) {
    ctx.save(); ctx.shadowColor = "rgba(79,134,240,.9)"; ctx.shadowBlur = 24 * u;
    ctx.fillStyle = C.blueL; ctx.fillRect(s.caretX, iy + ih / 2 - 30 * u, 4 * u, 60 * u); ctx.restore();
  }
  // send button: pressing it sinks it and turns it orange (the first orange of the film)
  const r = 50 * u, bx = w - ix - 26 * u - 2 * r, by = iy + ih / 2 - r, press = s.send || 0;
  ctx.save();
  ctx.translate(bx + r, by + r); ctx.scale(1 - 0.06 * press, 1 - 0.06 * press);
  const bg = ctx.createLinearGradient(0, -r, 0, r);
  if (press > 0.02) { bg.addColorStop(0, "#F0671F"); bg.addColorStop(1, "#C24406"); } else { bg.addColorStop(0, "#2A6CE0"); bg.addColorStop(1, "#164BAA"); }
  if (press > 0.02) { ctx.shadowColor = "rgba(232,80,10,.9)"; ctx.shadowBlur = 40 * u * press; }
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();
  ctx.shadowBlur = 0;
  if (press > 0.02) { ctx.lineWidth = 6 * u * press; ctx.strokeStyle = "rgba(60,16,0,.35)"; ctx.beginPath(); ctx.arc(0, 2 * u, r - 4 * u, Math.PI * 0.1, Math.PI * 0.9, true); ctx.stroke(); }
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7 * u; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(0, 22 * u); ctx.lineTo(0, -22 * u); ctx.moveTo(-19 * u, -3 * u); ctx.lineTo(0, -22 * u); ctx.lineTo(19 * u, -3 * u); ctx.stroke();
  ctx.restore();
  // the orange wave: rings travelling through the glass from the button
  if (s.ripple != null && s.ripple >= 0) {
    ctx.save();
    rr(ctx, 0, 0, w, h, 60 * u); ctx.clip();
    const R = Math.hypot(w, h);
    for (let k = 0; k < 3; k++) {
      const p = s.ripple * 1.35 - k * 0.17;
      if (p <= 0 || p >= 1) continue;
      const rad = r + p * R, a = (1 - p) * (1 - p) * 0.9;
      ctx.beginPath(); ctx.arc(bx + r, by + r, rad, 0, Math.PI * 2);
      ctx.lineWidth = (26 - 12 * p) * u; ctx.strokeStyle = `rgba(255,120,40,${a})`;
      ctx.shadowColor = `rgba(232,80,10,${a})`; ctx.shadowBlur = 60 * u; ctx.stroke();
    }
    ctx.restore();
  }
}
function measureMsg(ctx, m, w, u) {
  if (m.who === "user" && m.kind === "file") return { m, h: 100 * u };
  if (m.who === "user") {
    font(ctx, 42 * u, 500);
    const lines = wrap(ctx, m.text, w * 0.62);
    const bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 80 * u;
    return { m, lines, bw, h: lines.length * 58 * u + 52 * u };
  }
  if (m.kind === "findings") return { m, h: 190 * u };
  if (m.kind === "rows") return { m, h: 70 * u + m.rows.length * 92 * u };
  if (m.kind === "done") return { m, h: 110 * u };
  if (m.kind === "report") return { m, h: 110 * u };
  font(ctx, 42 * u, 500);
  const lines = wrap(ctx, m.text, w * 0.7);
  return { m, lines, h: lines.length * 58 * u + 20 * u };
}
function drawMsg(ctx, b, w, y, u) {
  const m = b.m, a = m.a == null ? 1 : m.a;
  ctx.save();
  ctx.globalAlpha = a;
  if (m.who === "user" && m.kind === "file") {
    font(ctx, 38 * u, 600);
    const label = "puantaj_eylul.xlsx", cw = ctx.measureText(label).width + 150 * u, bx = w - cw - 56 * u;
    rr(ctx, bx, y, cw, 100 * u, 28 * u); ctx.fillStyle = "rgba(16,185,129,.16)"; ctx.fill();
    ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(110,231,183,.6)"; ctx.stroke();
    sheetIcon(ctx, bx + 26 * u, y + 14 * u, 0.9 * u);
    ctx.fillStyle = C.ink; ctx.textBaseline = "middle"; ctx.fillText(label, bx + 110 * u, y + 52 * u);
    ctx.restore();
    return;
  }
  if (m.who === "user") {
    const bx = w - b.bw - 56 * u;
    rr(ctx, bx, y, b.bw, b.h, 34 * u); ctx.fillStyle = "rgba(28,95,212,.42)"; ctx.fill();
    ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(120,165,255,.6)"; ctx.stroke();
    font(ctx, 42 * u, 500); ctx.fillStyle = C.ink; ctx.textBaseline = "top";
    b.lines.forEach((l, i) => ctx.fillText(l, bx + 40 * u, y + 28 * u + i * 58 * u));
    ctx.restore();
    return;
  }
  const x0 = 70 * u;
  coreDot(ctx, x0 + 16 * u, y + 30 * u, 16 * u);
  const x = x0 + 56 * u;
  ctx.textBaseline = "middle";
  if (m.kind === "findings") {
    rr(ctx, x, y, w * 0.62, 160 * u, 30 * u); ctx.fillStyle = "rgba(12,20,44,.72)"; ctx.fill();
    ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(120,165,255,.4)"; ctx.stroke();
    font(ctx, 44 * u, 700); ctx.fillStyle = C.ink; ctx.fillText("3 bulgu · Onayınıza hazır", x + 40 * u, y + 56 * u);
    dot(ctx, x + 56 * u, y + 116 * u, 14 * u, "red", u); dot(ctx, x + 100 * u, y + 116 * u, 14 * u, "blue", u); dot(ctx, x + 144 * u, y + 116 * u, 14 * u, "blue", u);
    font(ctx, 34 * u, 500); ctx.fillStyle = C.text2; ctx.fillText("Eksik puantaj, onay bekleyen mesai, mevzuat", x + 180 * u, y + 118 * u);
  } else if (m.kind === "rows") {
    font(ctx, 38 * u, 600); ctx.fillStyle = C.head; ctx.fillText(m.title || "Puantaj girişi", x, y + 26 * u);
    m.rows.forEach((r, i) => {
      const ry = y + 70 * u + i * 92 * u;
      rr(ctx, x, ry, w * 0.7, 78 * u, 22 * u); ctx.fillStyle = "rgba(12,20,44,.62)"; ctx.fill();
      ctx.lineWidth = 2 * u; ctx.strokeStyle = "rgba(120,165,255,.28)"; ctx.stroke();
      statusDot(ctx, x + 40 * u, ry + 39 * u, 15 * u, r.ok, u);
      font(ctx, 38 * u, 600); ctx.fillStyle = C.ink; ctx.fillText(r.name, x + 80 * u, ry + 40 * u);
      font(ctx, 34 * u, 500); ctx.textAlign = "right";
      ctx.fillStyle = r.ok >= 1 ? "#A7F3D0" : C.text2;
      ctx.fillText(r.ok >= 1 ? r.done : r.note, x + w * 0.7 - 34 * u, ry + 40 * u);
      ctx.textAlign = "left";
    });
  } else if (m.kind === "done") {
    font(ctx, 42 * u, 700);
    const label = "Puantaj tamamlandı · Bordro uzmanı onayına hazır";
    const pw = ctx.measureText(label).width + 110 * u;
    rr(ctx, x, y + 10 * u, pw, 86 * u, 43 * u); ctx.fillStyle = "rgba(16,185,129,.2)"; ctx.fill();
    ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(52,211,153,.85)"; ctx.stroke();
    dot(ctx, x + 44 * u, y + 53 * u, 17 * u, "green", u);
    ctx.fillStyle = "#D1FAE5"; ctx.fillText(label, x + 80 * u, y + 55 * u);
  } else if (m.kind === "report") {
    font(ctx, 40 * u, 600);
    const pw = ctx.measureText(m.text).width + 90 * u;
    rr(ctx, x, y + 14 * u, pw, 80 * u, 40 * u); ctx.fillStyle = "rgba(28,95,212,.28)"; ctx.fill();
    ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(120,165,255,.6)"; ctx.stroke();
    ctx.fillStyle = "#DCE7FF"; ctx.fillText(m.text, x + 44 * u, y + 55 * u);
  } else {
    font(ctx, 42 * u, 500); ctx.fillStyle = C.text;
    b.lines.forEach((l, i) => ctx.fillText(l, x, y + 30 * u + i * 58 * u));
  }
  ctx.restore();
}

/* ---------- findings ---------- */
export function finding(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = (h / 1000) * (s.f || 0.9);
  sheen(ctx, w, h);
  const px = 120 * u, dy = 300 * u;
  dot(ctx, px, dy, 34 * u, s.dot, u);
  font(ctx, 92 * u, 600); ctx.fillStyle = C.head; ctx.fillText(s.head, px + 86 * u, dy + 4 * u);
  font(ctx, 138 * u, 650); ctx.fillStyle = C.ink; ctx.fillText(s.body, px + 86 * u, dy + 280 * u);
  font(ctx, 78 * u, 600);
  const bw = ctx.measureText("İncele").width + 120 * u, bh = 170 * u, bx = w - bw - 110 * u, by = h - bh - 110 * u;
  rr(ctx, bx, by, bw, bh, 44 * u); ctx.fillStyle = "rgba(28,95,212,.32)"; ctx.fill();
  ctx.lineWidth = 5 * u; ctx.strokeStyle = "rgba(120,165,255,.62)"; ctx.stroke();
  ctx.fillStyle = "#DCE7FF"; ctx.fillText("İncele", bx + 60 * u, by + bh / 2 + 2 * u);
}
export function trayLip(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), k = h / 150;
  font(ctx, 40 * k, 700); ctx.fillStyle = "#E3ECFF"; ctx.fillText("Onayınıza hazır", 60 * k, h / 2 + 2 * k);
  font(ctx, 34 * k, 600); ctx.fillStyle = C.muted; ctx.fillText("Karar uzmanda", 420 * k, h / 2 + 2 * k);
  font(ctx, 40 * k, 700); ctx.fillStyle = C.blueXL; ctx.textAlign = "right"; ctx.fillText(String(s.count), w - 60 * k, h / 2 + 2 * k);
}

/* ---------- the thinking orbit ---------- */
export function person(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  backing(ctx, w, h);
  sheen(ctx, w, h, 0.08);
  const cx = 190 * u, cy = h / 2;
  ctx.beginPath(); ctx.arc(cx, cy, 120 * u, 0, Math.PI * 2); ctx.fillStyle = "rgba(28,95,212,.45)"; ctx.fill();
  ctx.lineWidth = 8 * u; ctx.strokeStyle = "rgba(169,198,255,.7)"; ctx.stroke();
  font(ctx, 110 * u, 700); ctx.fillStyle = C.ink; ctx.textAlign = "center"; ctx.fillText(s.initials, cx, cy + 6 * u); ctx.textAlign = "left";
  font(ctx, 150 * u, 650); ctx.fillStyle = C.ink; ctx.fillText(s.name, 380 * u, 380 * u);
  font(ctx, 118 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(s.dept, 380 * u, 640 * u);
  if (s.dot) dot(ctx, w - 110 * u, 150 * u, 44 * u, s.dot, u);
}
export function timesheet(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  backing(ctx, w, h);
  sheen(ctx, w, h, 0.08);
  font(ctx, 330 * u, 650); ctx.fillStyle = C.ink; ctx.fillText(s.name, 70 * u, h / 2 + 10 * u);
  const n = s.cells.length, cw = 210 * u, gap = 40 * u, x0 = w - n * (cw + gap) - 40 * u;
  s.cells.forEach((v, i) => {
    const x = x0 + i * (cw + gap), y = h * 0.2, ch = h * 0.6;
    rr(ctx, x, y, cw, ch, 50 * u);
    if (v) { ctx.fillStyle = "rgba(79,134,240,.55)"; ctx.fill(); }
    else { ctx.lineWidth = 22 * u; ctx.strokeStyle = "rgba(239,68,68,.9)"; ctx.stroke(); }
  });
}
export function doc(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  backing(ctx, w, h);
  sheen(ctx, w, h, 0.1);
  font(ctx, 150 * u, 800); ctx.fillStyle = C.blueXL; ctx.fillText("§", 70 * u, 150 * u);
  font(ctx, 70 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(s.title, 190 * u, 140 * u);
  font(ctx, 56 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(s.sub, 190 * u, 225 * u);
  ctx.fillStyle = "rgba(209,213,219,.35)";
  for (let i = 0; i < 7; i++) rr(ctx, 70 * u, 330 * u + i * 90 * u, (i % 3 === 2 ? 0.55 : 0.85) * (w - 140 * u), 34 * u, 17 * u), ctx.fill();
}

/* ---------- puantaj ---------- */
export function xlsxFace(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  sheen(ctx, w, h, 0.1);
  sheetIcon(ctx, 90 * u, 170 * u, 6.6 * u);
  font(ctx, 118 * u, 700); ctx.fillStyle = C.ink; ctx.fillText("puantaj_eylul", 560 * u, 360 * u);
  font(ctx, 118 * u, 700); ctx.fillStyle = "#A7F3D0"; ctx.fillText(".xlsx", 560 * u, 520 * u);
  font(ctx, 92 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(s.sub || "3 çalışan · 5 gün", 560 * u, 700 * u);
}
const ICONS = {
  fingerprint(ctx, x, y, s) {
    ctx.lineCap = "round";
    for (let i = 0; i < 5; i++) { const r = (18 + i * 16) * s; ctx.beginPath(); ctx.arc(x, y + 10 * s, r, Math.PI * (1.12 + i * 0.02), Math.PI * (1.88 - i * 0.03)); ctx.stroke(); }
    for (let i = 0; i < 3; i++) { const r = (26 + i * 18) * s; ctx.beginPath(); ctx.arc(x, y + 10 * s, r, Math.PI * 0.12, Math.PI * 0.72); ctx.stroke(); }
  },
  card(ctx, x, y, s) {
    rr(ctx, x - 70 * s, y - 46 * s, 140 * s, 92 * s, 14 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 70 * s, y - 16 * s); ctx.lineTo(x + 70 * s, y - 16 * s); ctx.stroke();
    rr(ctx, x - 50 * s, y + 8 * s, 40 * s, 22 * s, 5 * s); ctx.stroke();
  },
  face(ctx, x, y, s) {
    const k = 24 * s;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(x + a * 70 * s, y + b * (70 * s - k)); ctx.lineTo(x + a * 70 * s, y + b * 70 * s); ctx.lineTo(x + a * (70 * s - k), y + b * 70 * s); ctx.stroke(); });
    ctx.beginPath(); ctx.arc(x, y - 8 * s, 26 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y + 52 * s, 44 * s, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
  },
  mobile(ctx, x, y, s) {
    rr(ctx, x - 40 * s, y - 70 * s, 80 * s, 140 * s, 16 * s); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y + 50 * s, 6 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y - 12 * s, 18 * s, Math.PI * 0.9, Math.PI * 2.1); ctx.moveTo(x, y + 20 * s); ctx.lineTo(x, y - 10 * s); ctx.stroke();
  },
  turnstile(ctx, x, y, s) {
    rr(ctx, x - 64 * s, y - 60 * s, 44 * s, 130 * s, 10 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 20 * s, y - 20 * s); ctx.lineTo(x + 66 * s, y - 20 * s); ctx.moveTo(x - 20 * s, y + 4 * s); ctx.lineTo(x + 52 * s, y + 34 * s); ctx.stroke();
  },
  clock(ctx, x, y, s) {
    ctx.beginPath(); ctx.arc(x, y, 64 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 40 * s); ctx.moveTo(x, y); ctx.lineTo(x + 30 * s, y + 18 * s); ctx.stroke();
  },
};
export function icon(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  ctx.save();
  ctx.strokeStyle = "#CFE0FF"; ctx.lineWidth = 11 * u * 3.2; ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(79,134,240,.8)"; ctx.shadowBlur = 40 * u;
  ICONS[s.kind](ctx, w / 2, h * 0.4, 3.2 * u);
  ctx.restore();
  font(ctx, 120 * u, 650); ctx.fillStyle = C.ink; ctx.textAlign = "center"; ctx.fillText(s.label, w / 2, h * 0.84);
}

/* ---------- reports ---------- */
export function table(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  sheen(ctx, w, h);
  const pad = 95 * u;
  font(ctx, 78 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(s.title, pad, 140 * u);
  s.rows.forEach((r, i) => {
    const y = 260 * u + i * 175 * u;
    ctx.fillStyle = "rgba(170,200,255,.2)"; ctx.fillRect(pad, y, w - 2 * pad, 4 * u);
    font(ctx, 62 * u, 500); ctx.fillStyle = C.text2; ctx.textAlign = "left"; ctx.fillText(r[0], pad, y + 88 * u);
    font(ctx, 68 * u, 700); ctx.fillStyle = C.ink; ctx.textAlign = "right"; ctx.fillText(r[1], w - pad, y + 88 * u);
    ctx.textAlign = "left";
  });
}
export function dept(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = (h / 1000) * 0.9;
  sheen(ctx, w, h);
  const pad = 110 * u;
  font(ctx, 110 * u, 700); ctx.fillStyle = C.head; ctx.fillText("DEPARTMAN", pad, 250 * u);
  font(ctx, 170 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(s.title, pad, 500 * u);
  font(ctx, 120 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(s.sub, pad, 740 * u);
}
// horizontal bars: overtime cost per department (k reveals the bars)
export function hbars(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000, k = s.k == null ? 1 : s.k;
  sheen(ctx, w, h);
  const pad = 90 * u;
  font(ctx, 70 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(s.title, pad, 120 * u);
  const max = Math.max(...s.rows.map((r) => r[1]));
  s.rows.forEach((r, i) => {
    const y = 230 * u + i * 150 * u, lx = pad, bx = pad + 330 * u, bw = (w - bx - 300 * u) * (r[1] / max) * k;
    font(ctx, 54 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(r[0], lx, y + 40 * u);
    rr(ctx, bx, y, Math.max(8 * u, bw), 80 * u, 20 * u);
    const g = ctx.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, "rgba(28,95,212,.9)"); g.addColorStop(1, "rgba(79,134,240,.95)");
    ctx.fillStyle = g; ctx.fill();
    font(ctx, 56 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(r[2], bx + bw + 24 * u, y + 42 * u);
  });
}
// grouped columns: SGK premium, six months, two series
export function columns(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000, k = s.k == null ? 1 : s.k;
  sheen(ctx, w, h);
  const pad = 90 * u;
  font(ctx, 70 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(s.title, pad, 120 * u);
  font(ctx, 44 * u, 600);
  ctx.fillStyle = C.blueXL; ctx.fillRect(pad, 205 * u, 30 * u, 30 * u); ctx.fillStyle = C.text2; ctx.fillText(s.legend[0], pad + 46 * u, 222 * u);
  ctx.fillStyle = "rgba(169,198,255,.38)"; ctx.fillRect(pad + 330 * u, 205 * u, 30 * u, 30 * u); ctx.fillStyle = C.text2; ctx.fillText(s.legend[1], pad + 376 * u, 222 * u);
  const base = h - 150 * u, top = 300 * u, n = s.months.length, gw = (w - 2 * pad) / n, max = Math.max(...s.a, ...s.b);
  ctx.fillStyle = "rgba(170,200,255,.25)"; ctx.fillRect(pad, base, w - 2 * pad, 4 * u);
  s.months.forEach((m, i) => {
    const x = pad + i * gw + gw * 0.18, bw = gw * 0.3;
    const ha = (base - top) * (s.a[i] / max) * k, hb = (base - top) * (s.b[i] / max) * k;
    rr(ctx, x, base - hb, bw, hb, 12 * u); ctx.fillStyle = "rgba(169,198,255,.38)"; ctx.fill();
    rr(ctx, x + bw + 8 * u, base - ha, bw, ha, 12 * u); ctx.fillStyle = C.blueXL; ctx.fill();
    font(ctx, 44 * u, 600); ctx.fillStyle = C.text2; ctx.textAlign = "center"; ctx.fillText(m, x + bw, base + 60 * u); ctx.textAlign = "left";
  });
}
export function summary(c, s) {
  const w = c.width, h = c.height, ctx = begin(c), u = h / 1000;
  sheen(ctx, w, h);
  const pad = 90 * u;
  font(ctx, 70 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(s.title, pad, 120 * u);
  font(ctx, 54 * u, 500); ctx.fillStyle = C.head; ctx.fillText(s.kicker, pad, 250 * u);
  font(ctx, 190 * u, 800); ctx.fillStyle = C.ink; ctx.fillText(s.big, pad, 400 * u);
  s.rows.forEach((r, i) => {
    const y = 560 * u + i * 130 * u;
    ctx.fillStyle = "rgba(170,200,255,.2)"; ctx.fillRect(pad, y, w - 2 * pad, 4 * u);
    font(ctx, 54 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(r[0], pad, y + 66 * u);
    font(ctx, 58 * u, 700); ctx.fillStyle = C.ink; ctx.textAlign = "right"; ctx.fillText(r[1], w - pad, y + 66 * u); ctx.textAlign = "left";
  });
}

/* ---------- labels ---------- */
export function label(c, s) {
  const w = c.width, h = c.height, ctx = begin(c);
  const { text, px = 0.5, weight = 700, color = C.ink, align = "center" } = s;
  font(ctx, px * h, weight); ctx.fillStyle = color; ctx.textAlign = align;
  ctx.fillText(text, align === "center" ? w / 2 : align === "right" ? w : 0, h / 2 + h * 0.02);
}
// Big thin day number for the tunnel frames, with the month above it.
export function dayLabel(c, s) {
  const h = c.height, ctx = begin(c), k = h / 300;
  ctx.textBaseline = "alphabetic";
  font(ctx, 34 * k, 700); ctx.fillStyle = "rgba(169,198,255,.95)"; ctx.fillText(s.month, 10 * k, 44 * k);
  font(ctx, 250 * k, 200); ctx.fillStyle = "rgba(229,231,235,.85)"; ctx.fillText(s.day, 0, 280 * k);
}

/* ---------- static textures ---------- */
export function softDot() {
  const c = canvas(128, 128), ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,.55)"); g.addColorStop(0.62, "rgba(255,255,255,.42)"); g.addColorStop(0.78, "rgba(255,255,255,.6)"); g.addColorStop(0.9, "rgba(255,255,255,.12)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  return c;
}
export function glowDot() {
  const c = canvas(128, 128), ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,255,255,.55)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  return c;
}
export function contactShadow() {
  const c = canvas(256, 128), ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 64, 0, 128, 64, 128);
  g.addColorStop(0, "rgba(2,4,10,.85)"); g.addColorStop(0.5, "rgba(2,4,10,.45)"); g.addColorStop(1, "rgba(2,4,10,0)");
  ctx.setTransform(1, 0, 0, 0.5, 0, 32); ctx.fillStyle = g; ctx.fillRect(0, -64, 256, 256);
  return c;
}
// Floor overlay: the brand dot grid, fading out towards the edges.
export function floor(px, o = {}) {
  const { spacing = 26, r = 2.6, veilIn = 0.5, veilOut = 0.97, dots = 0.32 } = o;
  const c = canvas(px, px), ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  g.addColorStop(0, `rgba(9,13,26,${veilIn})`); g.addColorStop(0.55, `rgba(9,13,26,${(veilIn + veilOut) / 2})`); g.addColorStop(1, `rgba(9,13,26,${veilOut})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, px, px);
  ctx.fillStyle = `rgba(120,160,255,${dots})`;
  for (let y = spacing / 2; y < px; y += spacing)
    for (let x = spacing / 2; x < px; x += spacing) {
      const d = Math.hypot(x - px / 2, y - px / 2) / (px / 2);
      if (d > 0.95) continue;
      ctx.globalAlpha = Math.max(0, 1 - d * 1.05);
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  ctx.globalAlpha = 1;
  return c;
}
export function sky(o = {}) {
  const { glowY = 0.34, glowA = 0.16 } = o;
  const c = canvas(1024, 576), ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, 576);
  g.addColorStop(0, "#0B1122"); g.addColorStop(0.62, "#0A0E1A"); g.addColorStop(1, "#0A0E1A");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1024, 576);
  const r = ctx.createRadialGradient(512, 576 * glowY, 0, 512, 576 * glowY, 560);
  r.addColorStop(0, `rgba(28,95,212,${glowA})`); r.addColorStop(1, "rgba(28,95,212,0)");
  ctx.fillStyle = r; ctx.fillRect(0, 0, 1024, 576);
  return c;
}
