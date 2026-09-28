// 2D UI drawn into canvases, used as textures on the 3D glass panels.
// All sizes are in canvas pixels; callers pick the canvas size from the panel size.

export const C = {
  ink: "#F3F6FB", text: "#E5E7EB", text2: "#D1D5DB", head: "#9DB3E0", muted: "#8C97AD",
  blue: "#1C5FD4", blueL: "#4F86F0", blueXL: "#A9C6FF", orange: "#E8500A", green: "#10B981", red: "#EF4444",
};

export function canvas(w, h) {
  const c = document.createElement("canvas");
  c.width = Math.round(w); c.height = Math.round(h);
  return c;
}

function path(ctx, X, Y, W, H, R) {
  ctx.beginPath();
  ctx.moveTo(X + R, Y);
  ctx.arcTo(X + W, Y, X + W, Y + H, R);
  ctx.arcTo(X + W, Y + H, X, Y + H, R);
  ctx.arcTo(X, Y + H, X, Y, R);
  ctx.arcTo(X, Y, X + W, Y, R);
  ctx.closePath();
}

export function font(ctx, px, weight = 500) { ctx.font = `${weight} ${px}px Inter`; }

function pill(ctx, x, y, s, label) {
  font(ctx, 26 * s, 600);
  const w = ctx.measureText(label).width + 44 * s, h = 48 * s;
  path(ctx, x, y, w, h, h / 2);
  ctx.fillStyle = "rgba(28,95,212,.34)"; ctx.fill();
  ctx.lineWidth = 2 * s; ctx.strokeStyle = "rgba(120,165,255,.65)"; ctx.stroke();
  ctx.fillStyle = "#CFE0FF"; ctx.textBaseline = "middle"; ctx.fillText(label, x + 22 * s, y + h / 2 + 1 * s);
  return w;
}

function coreDot(ctx, x, y, r) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, 0, x, y, r);
  g.addColorStop(0, "#EAF1FF"); g.addColorStop(0.2, "#A9C6FF"); g.addColorStop(0.55, "#2F6BDB"); g.addColorStop(1, "#0E2F6E");
  ctx.save(); ctx.shadowColor = "rgba(79,134,240,.9)"; ctx.shadowBlur = r * 1.6;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.restore();
}

// Layouts are proportional to the canvas height, so the same function prints any panel size crisply.

// Chat window: header, optional prompt bubble, input with prompt and send button.
export function chat(w, h, o = {}) {
  const { prompt = "", bubble = "", caret = false, send = "idle", f = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d"), u = (h / 1000) * f;
  sheen(ctx, w, h, 0.06);
  const head = 150 * u;
  ctx.strokeStyle = "rgba(170,200,255,.18)"; ctx.lineWidth = 3 * u;
  ctx.beginPath(); ctx.moveTo(0, head); ctx.lineTo(w, head); ctx.stroke();
  coreDot(ctx, 76 * u, head / 2, 28 * u);
  font(ctx, 54 * u, 700); ctx.fillStyle = C.ink; ctx.textBaseline = "middle";
  ctx.fillText("Agentic Payroll", 130 * u, head / 2 + 2 * u);
  pill(ctx, 130 * u + ctx.measureText("Agentic Payroll").width + 30 * u, head / 2 - 32 * u, u * 1.33, "AI Destekli");
  if (bubble) {
    font(ctx, 44 * u, 500);
    const lines = wrap(ctx, bubble, w * 0.66);
    const bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 80 * u, bh = lines.length * 62 * u + 56 * u;
    const bx = w - bw - 56 * u, by = head + 64 * u;
    path(ctx, bx, by, bw, bh, 34 * u); ctx.fillStyle = "rgba(28,95,212,.42)"; ctx.fill();
    ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(120,165,255,.6)"; ctx.stroke();
    ctx.fillStyle = C.ink; ctx.textBaseline = "top";
    lines.forEach((l, i) => ctx.fillText(l, bx + 40 * u, by + 30 * u + i * 62 * u));
  }
  const ih = 150 * u, iy = h - ih - 50 * u, ix = 50 * u;
  path(ctx, ix, iy, w - 2 * ix, ih, 38 * u);
  ctx.fillStyle = "rgba(6,10,24,.62)"; ctx.fill(); ctx.lineWidth = 3 * u; ctx.strokeStyle = "rgba(170,200,255,.30)"; ctx.stroke();
  font(ctx, 46 * u, 500); ctx.fillStyle = prompt ? C.text : "rgba(209,213,219,.42)"; ctx.textBaseline = "middle";
  ctx.fillText(prompt || "Bir şey sorun…", ix + 48 * u, iy + ih / 2 + 1 * u);
  if (caret) { const tw = ctx.measureText(prompt).width; ctx.fillStyle = C.blueL; ctx.fillRect(ix + 54 * u + tw, iy + ih / 2 - 30 * u, 4 * u, 60 * u); }
  const r = 50 * u, bx = w - ix - 26 * u - 2 * r, by = iy + ih / 2 - r;
  const bg = ctx.createLinearGradient(0, by, 0, by + 2 * r);
  if (send === "pressed") { bg.addColorStop(0, "#F0671F"); bg.addColorStop(1, "#C24406"); } else { bg.addColorStop(0, "#2A6CE0"); bg.addColorStop(1, "#164BAA"); }
  ctx.beginPath(); ctx.arc(bx + r, by + r, r, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7 * u; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(bx + r, by + r + 22 * u); ctx.lineTo(bx + r, by + r - 22 * u); ctx.moveTo(bx + r - 19 * u, by + r - 3 * u); ctx.lineTo(bx + r, by + r - 22 * u); ctx.lineTo(bx + r + 19 * u, by + r - 3 * u); ctx.stroke();
  return c;
}

export function wrap(ctx, text, maxW) {
  const words = text.split(" "), lines = [];
  let line = "";
  for (const wd of words) {
    const t = line ? line + " " + wd : wd;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = wd; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

export function sheen(ctx, w, h, a = 0.07) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, `rgba(215,228,255,${a})`); g.addColorStop(0.35, `rgba(215,228,255,${a * 0.35})`); g.addColorStop(1, "rgba(215,228,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
}

// Finding card: status dot, head line, body line and an "İncele" button.
export function finding(w, h, o) {
  const { dot = "red", head, body, f = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d"), u = (h / 1000) * f;
  sheen(ctx, w, h);
  const px = 120 * u, dy = 300 * u;
  ctx.save();
  if (dot === "red") { ctx.shadowColor = "rgba(239,68,68,.95)"; ctx.shadowBlur = 60 * u; ctx.beginPath(); ctx.arc(px, dy, 34 * u, 0, Math.PI * 2); ctx.fillStyle = C.red; ctx.fill(); }
  else { ctx.shadowColor = "rgba(79,134,240,.9)"; ctx.shadowBlur = 40 * u; ctx.beginPath(); ctx.arc(px, dy, 30 * u, 0, Math.PI * 2); ctx.lineWidth = 13 * u; ctx.strokeStyle = C.blueL; ctx.stroke(); }
  ctx.restore();
  ctx.textBaseline = "middle";
  font(ctx, 92 * u, 600); ctx.fillStyle = C.head; ctx.fillText(head, px + 86 * u, dy + 4 * u);
  font(ctx, 138 * u, 650); ctx.fillStyle = C.ink; ctx.fillText(body, px + 86 * u, dy + 280 * u);
  font(ctx, 78 * u, 600);
  const bw = ctx.measureText("İncele").width + 120 * u, bh = 170 * u, bx = w - bw - 110 * u, by = h - bh - 110 * u;
  path(ctx, bx, by, bw, bh, 44 * u); ctx.fillStyle = "rgba(28,95,212,.32)"; ctx.fill();
  ctx.lineWidth = 5 * u; ctx.strokeStyle = "rgba(120,165,255,.62)"; ctx.stroke();
  ctx.fillStyle = "#DCE7FF"; ctx.fillText("İncele", bx + 60 * u, by + bh / 2 + 2 * u);
  return c;
}

export function table(w, h, o) {
  const { title, rows, f = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d"), u = (h / 1000) * f;
  sheen(ctx, w, h);
  const pad = 95 * u;
  ctx.textBaseline = "middle";
  font(ctx, 78 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(title, pad, 140 * u);
  rows.forEach((r, i) => {
    const y = 260 * u + i * 175 * u;
    ctx.fillStyle = "rgba(170,200,255,.2)"; ctx.fillRect(pad, y, w - 2 * pad, 4 * u);
    font(ctx, 62 * u, 500); ctx.fillStyle = C.text2; ctx.textAlign = "left"; ctx.fillText(r[0], pad, y + 88 * u);
    font(ctx, 68 * u, 700); ctx.fillStyle = C.ink; ctx.textAlign = "right"; ctx.fillText(r[1], w - pad, y + 88 * u);
    ctx.textAlign = "left";
  });
  return c;
}

export function dept(w, h, o) {
  const { f = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d"), u = (h / 1000) * f;
  sheen(ctx, w, h);
  const pad = 110 * u;
  ctx.textBaseline = "middle";
  font(ctx, 110 * u, 700); ctx.fillStyle = C.head; ctx.fillText("DEPARTMAN", pad, 250 * u);
  font(ctx, 170 * u, 700); ctx.fillStyle = C.ink; ctx.fillText(o.title, pad, 500 * u);
  font(ctx, 120 * u, 500); ctx.fillStyle = C.text2; ctx.fillText(o.sub, pad, 740 * u);
  return c;
}

// Big thin day number for the tunnel frames ("EYL" label above it).
export function dayLabel(w, h, o) {
  const { day, month, s = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d");
  ctx.textBaseline = "alphabetic";
  font(ctx, 34 * s, 700); ctx.fillStyle = "rgba(169,198,255,.95)"; ctx.fillText(month, 10 * s, 44 * s);
  font(ctx, 250 * s, 200); ctx.fillStyle = "rgba(229,231,235,.85)"; ctx.fillText(day, 0, 280 * s);
  return c;
}

export function label(w, h, o) {
  const { text, px = 40, weight = 700, color = C.ink, align = "center", s = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d");
  font(ctx, px * s, weight); ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = "middle";
  ctx.fillText(text, align === "center" ? w / 2 : align === "right" ? w : 0, h / 2);
  return c;
}

export function trayLip(w, h, o = {}) {
  const { s = 1 } = o;
  const c = canvas(w, h), ctx = c.getContext("2d");
  ctx.textBaseline = "middle";
  font(ctx, 40 * s, 700); ctx.fillStyle = "#E3ECFF"; ctx.fillText("Onayınıza hazır", 60 * s, h / 2 + 2 * s);
  font(ctx, 40 * s, 700); ctx.fillStyle = C.blueXL; ctx.textAlign = "right"; ctx.fillText("3", w - 60 * s, h / 2 + 2 * s);
  return c;
}

export function softDot() {
  const c = canvas(128, 128), ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,.55)"); g.addColorStop(0.62, "rgba(255,255,255,.42)"); g.addColorStop(0.78, "rgba(255,255,255,.6)"); g.addColorStop(0.9, "rgba(255,255,255,.12)"); g.addColorStop(1, "rgba(255,255,255,0)");
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

// Floor overlay: brand dot grid over a navy veil that fades out towards the edges.
export function floor(px, o = {}) {
  const { spacing = 26, r = 2.6, veilIn = 0.5, veilOut = 0.97, dots = 0.32 } = o;
  const c = canvas(px, px), ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  g.addColorStop(0, `rgba(9,13,26,${veilIn})`); g.addColorStop(0.55, `rgba(9,13,26,${(veilIn + veilOut) / 2})`); g.addColorStop(1, `rgba(9,13,26,${veilOut})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, px, px);
  ctx.fillStyle = `rgba(120,160,255,${dots})`;
  for (let y = spacing / 2; y < px; y += spacing) for (let x = spacing / 2; x < px; x += spacing) {
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
