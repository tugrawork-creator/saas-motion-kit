// Agentic Payroll · styleframes (A + D hook): real 3D glass, light and reflections with three.js.
// index.html?f=1|2|3 — the viewport size is the render size. Everything is seeded, so frames re-render identically.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { Reflector } from "three/addons/objects/Reflector.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import * as UI from "./ui.js";

const q = new URLSearchParams(location.search);
const FRAME = q.get("f") || "1";
const W = innerWidth, H = innerHeight, K = W / 1920;   // K scales canvas UI and overlays with the render size
const PX = 420 * K * 2;                                  // canvas pixels per world unit for printed UI (2× supersampled)
const UI_LAYER = 1;                                      // printed UI lives on its own layer, so the floor mirror skips it

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/* ---------- renderer, scene ---------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.setSize(W, H);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.localClippingEnabled = true;
document.getElementById("stage").appendChild(renderer.domElement);

const scene = new THREE.Scene();
const tex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
scene.background = tex(UI.sky());
scene.fog = new THREE.FogExp2("#0A0E1A", 0.03);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.45;

/* ---------- materials & builders ---------- */
const hdr = (hex, k) => new THREE.Color(hex).multiplyScalar(k);
const glass = (o = {}) => new THREE.MeshPhysicalMaterial(Object.assign({
  color: "#e8efff", transmission: 1, roughness: 0.36, thickness: 0.3, ior: 1.42, metalness: 0,
  clearcoat: 1, clearcoatRoughness: 0.22, specularIntensity: 1, attenuationColor: new THREE.Color("#4a7ee6"), attenuationDistance: 6,
}, o));
const emissive = (hex, k = 2) => new THREE.MeshBasicMaterial({ color: hdr(hex, k), toneMapped: false });

function rrShape(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}
function rrRing(w, h, r, band) {
  const s = rrShape(w, h, r), hole = rrShape(w - 2 * band, h - 2 * band, Math.max(0.001, r - band));
  s.holes.push(new THREE.Path(hole.getPoints(48).reverse()));
  return s;
}
// thin emissive outline that sits on a panel face: the blue rim light
function rim(w, h, r, k = 2.0, hex = "#6f9cff", band = 0.011) {
  return new THREE.Mesh(new THREE.ShapeGeometry(rrRing(w, h, r, band), 32), emissive(hex, k));
}
function uiPlane(c, w, h) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex(c), transparent: true, toneMapped: false, depthWrite: false }));
  m.layers.set(UI_LAYER); m.renderOrder = 2;
  return m;
}
// printed UI for a w×h panel: fn draws on a canvas at PX pixels per unit; f tunes the type size
const ui = (fn, w, h, o = {}, f = 1) => fn(w * PX, h * PX, Object.assign({}, o, { f }));
// a glass panel with UI printed on its front face and a blue rim
function panel(o) {
  const { w, h, d = 0.09, r = 0.07, print = null, rimK = 1.9, mat = {} } = o;
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, r), glass(mat)));
  const front = rim(w - 0.004, h - 0.004, r, rimK); front.position.z = d / 2 + 0.002; g.add(front);
  if (print) { const p = uiPlane(print, w, h); p.position.z = d / 2 + 0.004; g.add(p); }
  return g;
}
function core(r = 0.3, ringK = 1.9) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r * 0.6, 48, 24), emissive("#5d93ff", 2.2)));
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r, 64, 32), glass({ roughness: 0.05, thickness: r * 1.6, color: "#eaf1ff", attenuationDistance: 1.5 })));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.6, r * 0.02, 12, 160), emissive("#a9c6ff", ringK));
  ring.rotation.x = Math.PI / 2.25; g.add(ring);
  g.add(new THREE.PointLight("#4F86F0", 5, 7, 2));
  return g;
}
function bokeh(seed, n, box, o = {}) {
  const { smin = 0.15, smax = 1.0, amin = 0.03, amax = 0.09, hex = "#4F86F0" } = o;
  const r = rng(seed), map = tex(UI.softDot()), g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, color: new THREE.Color(hex), transparent: true, opacity: amin + (amax - amin) * r(), blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false }));
    s.position.set(box[0] + (box[1] - box[0]) * r(), box[2] + (box[3] - box[2]) * r(), box[4] + (box[5] - box[4]) * r());
    s.scale.setScalar(smin + (smax - smin) * Math.pow(r(), 1.5));
    g.add(s);
  }
  return g;
}
// glossy navy floor: a planar mirror under a navy veil, with the brand dot grid on top
function floor(o = {}) {
  const { size = 26, veil = 0.52, dots = 0.28, spacing = 26, mirror = 0x76849e } = o;
  const refl = new Reflector(new THREE.PlaneGeometry(90, 90), { textureWidth: Math.round(W * 0.32), textureHeight: Math.round(H * 0.32), color: mirror, clipBias: 0.002 });
  refl.rotation.x = -Math.PI / 2; scene.add(refl);
  const base = refl.getReflectionCamera;
  refl.getReflectionCamera = function (cam) { const c = base.call(this, cam); c.layers.disable(UI_LAYER); return c; };
  const v = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshBasicMaterial({ color: "#080C18", transparent: true, opacity: veil, depthWrite: false }));
  v.rotation.x = -Math.PI / 2; v.position.y = 0.001; scene.add(v);
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: tex(UI.floor(2048, { veilIn: 0, veilOut: 0.0, spacing, dots })), transparent: true, depthWrite: false }));
  grid.rotation.x = -Math.PI / 2; grid.position.y = 0.002; scene.add(grid);
}
function shadowDecal(x, z, w, d, a = 0.8) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: tex(UI.contactShadow()), transparent: true, opacity: a, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.004, z); scene.add(m);
}
function tube(points, radius, mat) {
  return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), 96, radius, 8, false), mat);
}
function lights(o = {}) {
  const { key = 90, rimL = 24, rimR = 20, rimLpos = [-6, 3.5, -4] } = o;
  scene.add(new THREE.AmbientLight("#1e2b4d", 0.45));
  const k = new THREE.SpotLight("#e4ecff", key, 40, Math.PI / 6, 0.9, 1.6); k.position.set(-1.5, 11, 4); k.target.position.set(0, 1, 0); scene.add(k, k.target);
  const a = new THREE.PointLight("#1C5FD4", rimL, 16, 1.6); a.position.set(...rimLpos); scene.add(a);
  const b = new THREE.PointLight("#4F86F0", rimR, 16, 1.6); b.position.set(6, 3, -3); scene.add(b);
}
function camera(fov, pos, look) {
  const c = new THREE.PerspectiveCamera(fov, W / H, 0.1, 140);
  c.position.set(...pos); c.lookAt(...look); c.layers.enable(UI_LAYER);
  return c;
}
function overlay(html, css) {
  const d = document.createElement("div"); d.className = "ov"; d.innerHTML = html; d.style.cssText += css; document.getElementById("stage").appendChild(d);
}

/* ---------- 3D numeral: glass filled with light ---------- */
async function numeral(text, o = {}) {
  const { size = 1.6, depth = 0.42, fill = 0.58, y = 0 } = o;
  const json = await (await fetch("./assets/inter-800.typeface.json")).json();
  const font = new FontLoader().parse(json);
  const geo = new TextGeometry(text, { font, size, depth, curveSegments: 16, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.035, bevelSegments: 6 });
  geo.computeBoundingBox(); const bb = geo.boundingBox;
  geo.translate(-(bb.max.x + bb.min.x) / 2, -bb.min.y, -(bb.max.z + bb.min.z) / 2);
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, glass({ roughness: 0.05, thickness: 0.8, color: "#f2f6ff", attenuationDistance: 5, clearcoatRoughness: 0.04, envMapIntensity: 1.8 })));
  const hTop = bb.max.y - bb.min.y, level = y + hTop * fill;
  const inner = geo.clone(); inner.scale(0.965, 0.985, 0.6); inner.translate(0, hTop * 0.008, 0);
  g.add(new THREE.Mesh(inner, new THREE.MeshBasicMaterial({ color: hdr("#3a78ff", 1.2), toneMapped: false, clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), level)] })));
  g.add(new THREE.Mesh(inner, new THREE.MeshBasicMaterial({ color: hdr("#c4d9ff", 2.4), toneMapped: false, clippingPlanes: [new THREE.Plane(new THREE.Vector3(0, -1, 0), level), new THREE.Plane(new THREE.Vector3(0, 1, 0), -(level - 0.03))] })));
  g.position.y = y;
  return g;
}

/* ---------- SF1 · hook: the closing period as a tunnel of glass day-frames ---------- */
async function sf1() {
  lights({ key: 36, rimL: 18, rimR: 20, rimLpos: [-8, 5.5, -10] });
  floor({ veil: 0.78, dots: 0.22, mirror: 0x4a5670 });
  const cam = camera(30, [0, 1.62, 9.4], [0, 1.6, -8]);
  const days = [["EYL", "25"], ["EYL", "26"], ["EYL", "27"], ["EYL", "28"], ["EYL", "29"], ["EYL", "30"], ["EKİ", "1"], ["EKİ", "2"], ["EKİ", "3"], ["EKİ", "4"], ["EKİ", "5"], ["EKİ", "6"]];
  const FW = 6.8, FH = 3.8, lift = 0.22;
  // the gaps shrink after the fifth frame: the telescope is already nesting the later days into each other
  let z = 5.4;
  days.forEach(([m, d], i) => {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.ExtrudeGeometry(rrRing(FW, FH, 0.22, 0.085), { depth: 0.055, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 16 }), glass({ roughness: 0.2, thickness: 0.1 }));
    ring.position.z = -0.03; g.add(ring);
    const inner = rim(FW - 0.17, FH - 0.17, 0.14, Math.max(0.45, 1.2 - i * 0.07), "#5d8ff5", 0.009); inner.position.z = 0.035; g.add(inner);
    if (i === 2 || i === 4) { const lab = uiPlane(UI.dayLabel(300 * K * 2, 300 * K * 2, { day: d, month: m, s: K * 2 }), 0.66, 0.66); lab.position.set((i === 2 ? -1 : 1) * (FW / 2 - 0.62), FH / 2 - 0.52, 0.04); lab.material.opacity = i === 2 ? 0.7 : 0.5; g.add(lab); }
    g.position.set(0, FH / 2 + lift, z);
    scene.add(g);
    z -= i < 5 ? 2.25 : 0.62;
  });
  const num = await numeral("%45", { size: 1.95, depth: 0.5, fill: 0.62, y: 0.62 });
  num.position.z = -1.9; num.rotation.y = -0.1; scene.add(num);
  const under = new THREE.PointLight("#3f7cff", 7, 5, 1.6); under.position.set(0, 0.5, -1.2); scene.add(under);
  const catchLight = new THREE.PointLight("#dfe8ff", 10, 7, 1.8); catchLight.position.set(-1.6, 3.4, 0.8); scene.add(catchLight);
  // light trails on the floor, running into the tunnel
  const r = rng(5);
  [-3.0, -2.4, 2.4, 3.0].forEach((x) => {
    const len = 1.4 + r() * 3.0, zz = 3 - r() * 14;
    const st = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.005, len), emissive("#9cc0ff", 1.1 + r() * 0.5)); st.position.set(x, 0.008, zz); scene.add(st);
  });
  scene.add(bokeh(11, 12, [-7, 7, 0.8, 5.5, -20, -9], { smin: 0.2, smax: 1.1, amax: 0.07 }));
  overlay("", `bottom:0;height:${Math.round(260 * K)}px;background:radial-gradient(60% 90% at 50% 100%, rgba(6,9,20,.78), rgba(6,9,20,0));`);
  overlay("Bordro dönem kapanışınızı %45 hızlandıracak", `bottom:${Math.round(84 * K)}px;font-size:${Math.round(44 * K)}px;`);
  return { cam, bloom: [0.6, 0.55, 0.86] };
}

/* ---------- SF2 · proof moment: findings rise and glide into the approval tray ---------- */
async function sf2() {
  lights({ key: 100, rimL: 24, rimR: 20 });
  floor({ veil: 0.5, dots: 0.28 });
  const cam = camera(32, [0.25, 3.25, 11.6], [0.3, 1.75, 0]);
  const cards = [
    { dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", p: [1.8, 3.5, -1.8], ry: -0.16, w: 3.8 },
    { dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", p: [1.05, 2.5, -0.45], ry: -0.1, w: 4.15 },
    { dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", p: [-1.1, 1.5, 0.95], ry: 0.12, w: 4.2 },
  ];
  const h = 1.02;
  cards.forEach((c) => {
    const p = panel({ w: c.w, h, print: ui(UI.finding, c.w, h, { dot: c.dot, head: c.head, body: c.body }, 0.9), mat: { roughness: 0.42, color: "#eef4ff", attenuationDistance: 9, thickness: 0.2 } });
    p.position.set(...c.p); p.rotation.y = c.ry; scene.add(p);
    shadowDecal(c.p[0], c.p[2] + 0.25, c.w * 1.05, 1.3, 0.5);
  });
  // approval tray: a low glass tray at the viewer's edge, with a lip that says what it holds
  const tray = new THREE.Group();
  tray.add(new THREE.Mesh(new RoundedBoxGeometry(7.2, 0.1, 1.4, 4, 0.045), glass({ roughness: 0.3, thickness: 0.1 })));
  for (let i = 1; i < 5; i++) { const wall = new THREE.Mesh(new RoundedBoxGeometry(0.026, 0.14, 1.22, 2, 0.01), glass({ roughness: 0.2, thickness: 0.04 })); wall.position.set(-3.6 + i * 1.44, 0.1, 0); tray.add(wall); }
  const lip = new THREE.Mesh(new RoundedBoxGeometry(7.2, 0.36, 0.07, 4, 0.03), glass({ roughness: 0.3, thickness: 0.07, color: "#dfe9ff" }));
  lip.position.set(0, 0.1, 0.72); tray.add(lip);
  const lipUi = uiPlane(UI.trayLip(3000 * K, 150 * K, { s: K * 1.35 }), 7.2, 0.36); lipUi.position.set(0, 0.1, 0.76); tray.add(lipUi);
  const lipRim = rim(7.16, 0.33, 0.03, 1.3); lipRim.position.set(0, 0.1, 0.758); tray.add(lipRim);
  tray.position.set(0.15, 0.12, 2.6); scene.add(tray);
  shadowDecal(0.15, 2.7, 8, 2, 0.45);
  const ai = core(0.28); ai.position.set(0.25, 4.6, -2.8); scene.add(ai);
  // light threads from the core run to the top-left corner of each card, so they never cross the print
  const beam = emissive("#6f9cff", 1.3);
  const corner = (c) => [c.p[0] - (c.w / 2) * Math.cos(c.ry) + 0.06, c.p[1] + h / 2 - 0.02, c.p[2] + (c.w / 2) * Math.sin(c.ry)];
  cards.forEach((c, i) => {
    const e = corner(c), m = [(0.25 + e[0]) / 2, (4.35 + e[1]) / 2 + 0.32, (-2.8 + e[2]) / 2];
    scene.add(tube([[0.25, 4.35, -2.8], m, e], 0.006, beam));
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.026, 12, 12), emissive("#a9c6ff", 2)); knot.position.set(...e); scene.add(knot);
  });
  // the glide into the tray (motion guide)
  const dots = new THREE.Group();
  for (let i = 0; i <= 10; i++) { const t = i / 10; const m = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), emissive("#a9c6ff", 1.4)); m.position.set(-1.1 + 1.0 * t, 0.98 - 0.66 * t * t, 1.1 + 1.45 * t); dots.add(m); }
  scene.add(dots);
  scene.add(bokeh(21, 22, [-9, 9, 0.8, 7, -15, -5], { smin: 0.2, smax: 1.2 }));
  return { cam, bloom: [0.5, 0.5, 0.88] };
}

/* ---------- SF3 · report: the answer unfolds out of the window into space ---------- */
async function sf3() {
  lights({ key: 95, rimL: 22, rimR: 24 });
  floor({ veil: 0.66, dots: 0.26, mirror: 0x56627c });
  const cam = camera(34, [1.35, 2.15, 10.4], [1.25, 1.55, -0.5]);
  const win = panel({ w: 3.9, h: 2.35, d: 0.11, print: ui(UI.chat, 3.9, 2.35, { bubble: "Çanakkale ofisindeki ürün geliştirme ekibinin aylık maaş raporunu hazırla." }, 1.0), mat: { roughness: 0.4, color: "#eef4ff", attenuationDistance: 9 } });
  win.position.set(-2.55, 1.8, -1.9); win.rotation.y = 0.42; scene.add(win);
  shadowDecal(-2.55, -1.55, 4.2, 1.4, 0.45);
  const vals = [1.26, 0.74, 0.52, 0.33, 0.25], names = ["Backend", "Frontend", "Mobil", "QA", "Tasarım"];
  vals.forEach((v, i) => {
    const h = v * 2.35, x = -0.1 + i * 0.86, z = 0.15;
    const bar = new THREE.Mesh(new RoundedBoxGeometry(0.54, h, 0.54, 4, 0.05), glass({ roughness: 0.12, thickness: 0.35, color: "#f4f7ff", attenuationDistance: 10, clearcoatRoughness: 0.08 }));
    bar.position.set(x, h / 2, z); scene.add(bar);
    const lvl = h * 0.86;
    const fill = new THREE.Mesh(new THREE.BoxGeometry(0.4, lvl, 0.4), new THREE.MeshBasicMaterial({ color: hdr("#356fe6", 0.62 + 0.1 * (4 - i) / 4), toneMapped: false }));
    fill.position.set(x, lvl / 2 + 0.02, z); scene.add(fill);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.016, 0.4), emissive("#c4d9ff", 2.2)); top.position.set(x, lvl + 0.02, z); scene.add(top);
    const val = uiPlane(UI.label(560 * K, 120 * K, { text: "₺" + v.toFixed(2).replace(".", ",") + " mn", px: 52, s: K }), 0.98, 0.21); val.position.set(x, h + 0.22, z); scene.add(val);
    const nm = uiPlane(UI.label(560 * K, 120 * K, { text: names[i], px: 46, weight: 600, color: "#AFC3EA", s: K }), 0.95, 0.2); nm.position.set(x, 0.13, z + 0.36); scene.add(nm);
  });
  const baseline = new THREE.Mesh(new THREE.BoxGeometry(24, 0.01, 0.024), emissive("#10B981", 2.4)); baseline.position.set(0, 0.008, 0.62); scene.add(baseline);
  const glassy = { roughness: 0.4, color: "#eef4ff", attenuationDistance: 9 };
  const tb = panel({ w: 3.0, h: 2.2, print: ui(UI.table, 3.0, 2.2, { title: "Aylık maaş özeti · Eylül", rows: [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]] }, 1.0), mat: glassy });
  tb.position.set(5.15, 2.55, -1.35); tb.rotation.y = -0.34; scene.add(tb);
  const dp = panel({ w: 3.0, h: 1.0, print: ui(UI.dept, 3.0, 1.0, { title: "Ürün Geliştirme · Çanakkale", sub: "24 çalışan · Eylül 2026" }, 0.9), mat: glassy });
  dp.position.set(5.2, 0.9, -0.75); dp.rotation.y = -0.32; scene.add(dp);
  shadowDecal(5.1, -0.4, 3.2, 1.2, 0.45);
  scene.add(bokeh(31, 22, [-9, 9, 0.8, 7, -15, -5], { smin: 0.2, smax: 1.2 }));
  return { cam, bloom: [0.48, 0.5, 0.9] };
}

/* ---------- debug: the numeral geometry alone ---------- */
async function sfn() {
  scene.background = new THREE.Color("#1a2238"); scene.fog = null;
  const json = await (await fetch("./assets/inter-800.typeface.json")).json();
  const geo = new TextGeometry("%45", { font: new FontLoader().parse(json), size: 1.6, depth: 0.42, curveSegments: 14, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.035, bevelSegments: 5 });
  geo.center();
  const m = new THREE.Mesh(geo, new THREE.MeshNormalMaterial()); m.rotation.y = -0.35; scene.add(m);
  return { cam: camera(30, [0, 0.4, 8], [0, 0, 0]), bloom: [0.0, 0.1, 1.0] };
}

/* ---------- run ---------- */
async function main() {
  const faces = [
    new FontFace("Inter", "url(./assets/fonts/inter-latin-wght-normal.woff2)", { weight: "100 900", unicodeRange: "U+0000-00FF, U+0131, U+2000-206F, U+20AC" }),
    new FontFace("Inter", "url(./assets/fonts/inter-latin-ext-wght-normal.woff2)", { weight: "100 900", unicodeRange: "U+0100-02BA, U+20A0-20C0" }),
  ];
  for (const f of faces) document.fonts.add(await f.load());
  await document.fonts.ready;
  const { cam, bloom } = await ({ 1: sf1, 2: sf2, 3: sf3, n: sfn })[FRAME]();
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, cam));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), ...bloom));
  composer.addPass(new OutputPass());
  composer.render();
  composer.render();
  const gl = renderer.getContext(); gl.finish(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
  window.__ready = true;
}
setTimeout(() => main().catch((e) => { console.error(e); window.__error = String((e && e.stack) || e); }), 0);
