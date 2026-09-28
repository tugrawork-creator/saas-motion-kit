// Agentic Payroll · the 3D world of the film (A + D hook, one take).
// createWorld(canvas) builds every set once; renderAt(t) poses the whole world for time t and draws it.
// Nothing reads a clock: the frame at t is a pure function of t, so HyperFrames can seek in any order.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import * as UI from "./ui.js";
import INTER_800 from "./inter-800.typeface.js";
import {
  UI_LAYER, clamp, lerp, seg, ease, ez, pulse, track, rng, hdr, glass, glow, setGlow, tex, Print,
  rrShape, rrRing, rim, uiPlane, panel, panelAlpha, core, softSprites, mirrorFloor, gridPatch, shadowDecal, thread,
} from "./kit.js";

const W = 1920, H = 1080;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const at = (o, x, y, z) => (o.position.set(x, y, z), o);

// Shot boundaries, straight from the STORYBOARD.md ledger.
export const T = {
  land: 3.0, portal: 5.9, send: 11.5, click: 11.8, glassIn: 13.8, think: 14.0, findings: 20.0, iris: 27.95,
  xlsx: 28.0, pdks: 33.0, report: 38.0, quick: 43.0, gallery: 47.5, close: 50.0, cta: 54.0, end: 58.0,
};

// Fictional copy (brief: every name, number and office is invented).
const GREETING = "Eylül dönemi açık. Size nasıl yardımcı olabilirim?";
// The prompts and their typing live in schedule.js, shared with the HTML layers.
const { prompts: TYPED } = window.APSchedule;
const PROMPT1 = TYPED.ask.text, PROMPT2 = TYPED.enter.text, PROMPT3 = TYPED.report.text;
const { quick: quickTyping } = window.APSchedule;
const ROWS = [
  { name: "Ahmet Yılmaz · Marketing", note: "3 gün eksik", done: "Tamamlandı" },
  { name: "Elif Demir · Finans", note: "1 gün eksik", done: "Tamamlandı" },
  { name: "Mert Arslan · Satış", note: "2 gün eksik", done: "Tamamlandı" },
];


export async function createWorld(canvas, opts = {}) {
  const glScale = opts.glScale || 1;
  const dpr = Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)));
  const PR = dpr * glScale;
  const PX = Math.round(840 * Math.min(1, PR)); // canvas pixels per world unit for printed UI

  /* ---------- renderer & post ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(PR);
  renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.localClippingEnabled = true;
  renderer.transmissionResolutionScale = 0.5;

  const scene = new THREE.Scene();
  scene.background = tex(UI.sky());
  scene.fog = new THREE.FogExp2("#0A0E1A", 0.03);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;

  const camera = new THREE.PerspectiveCamera(32, W / H, 0.05, 160);
  camera.layers.enable(UI_LAYER);

  const rt = new THREE.WebGLRenderTarget(W * PR, H * PR, { type: THREE.HalfFloatType, samples: PR >= 1 ? 4 : 0 });
  const composer = new EffectComposer(renderer, rt);
  composer.setPixelRatio(PR);
  composer.setSize(W, H);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(W * PR, H * PR), 0.55, 0.55, 0.86);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  const grade = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null }, uRes: { value: new THREE.Vector2(W * PR, H * PR) },
      uFlash: { value: 0 }, uFlashColor: { value: new THREE.Color("#cfe0ff") },
      uIrisC: { value: new THREE.Vector2() }, uIrisR: { value: 1e6 }, uIrisSoft: { value: 40 * PR }, uBg: { value: new THREE.Vector3(10 / 255, 14 / 255, 26 / 255) },
      uWipe: { value: -1 }, uWipeW: { value: 380 * PR }, uFade: { value: 0 }, uVig: { value: 0.45 },
    },
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: `
      uniform sampler2D tDiffuse; uniform vec2 uRes; uniform float uFlash; uniform vec3 uFlashColor;
      uniform vec2 uIrisC; uniform float uIrisR; uniform float uIrisSoft; uniform vec3 uBg;
      uniform float uWipe; uniform float uWipeW; uniform float uFade; uniform float uVig;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv; float band = 0.0;
        if (uWipe > 0.0 && uWipe < 1.0) {
          float x = uv.x * uRes.x;
          float bx = mix(-uWipeW, uRes.x + uWipeW, uWipe);
          float d = (x - bx) / uWipeW;
          if (abs(d) < 1.0) { band = cos(d * 1.5708); uv.x -= sin(d * 3.14159) * 0.045 * band; uv.y += (uv.y - 0.5) * 0.03 * band; }
        }
        vec3 c = texture2D(tDiffuse, uv).rgb;
        c += vec3(0.18, 0.3, 0.6) * band * band * 0.55;
        vec2 q = vUv - 0.5; c *= 1.0 - uVig * dot(q, q) * 1.4;
        c = mix(c, uFlashColor, clamp(uFlash, 0.0, 1.0));
        float r = length(vUv * uRes - uIrisC);
        c = mix(c, uBg, smoothstep(uIrisR, uIrisR + uIrisSoft, r));
        c = mix(c, uBg, clamp(uFade, 0.0, 1.0));
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  composer.addPass(grade);

  /* ---------- shared stage ---------- */
  const stageFloor = mirrorFloor(scene, W * PR, H * PR, { veil: 0.62, mirror: 0x56627c });
  const ambient = new THREE.AmbientLight("#1e2b4d", 0.45);
  const key = new THREE.SpotLight("#e4ecff", 90, 60, Math.PI / 5, 0.9, 1.6);
  const rimA = new THREE.PointLight("#1C5FD4", 22, 18, 1.6);
  const rimB = new THREE.PointLight("#4F86F0", 20, 18, 1.6);
  scene.add(ambient, key, key.target, rimA, rimB);
  function stageLights(x, z, o = {}) {
    // move the studio lights with the set that is on camera
    key.intensity = o.key ?? 90;
    key.position.set(x - 1.5, 11, z + 4);
    key.target.position.set(x, 1, z);
    rimA.intensity = o.rimA ?? 22; rimA.position.set(x - 6, 3.5, z - 4);
    rimB.intensity = o.rimB ?? 20; rimB.position.set(x + 6, 3, z - 3);
  }

  const sets = {};
  const addSet = (name) => { const g = new THREE.Group(); g.name = name; g.visible = false; scene.add(g); sets[name] = g; return g; };
  const printP = (fn, w, h, state) => new Print(w, h, PX, fn, state);

  /* =====================================================================
     SET 1 · tunnel of glass day-frames → the glass "%45" (0 – 5.9 s)
     ===================================================================== */
  const tunnel = addSet("tunnel");
  tunnel.add(at(gridPatch(40, { dots: 0.22 }), 0, 0.002, 8));
  const FW = 6.8, FH = 3.8, LIFT = 0.22, NFRONT = 9;
  // the closing period: September days the camera flies through, October days that run on behind the numeral
  const DAYS = [22, 23, 24, 25, 26, 27, 28, 29, 30].map((d) => ["EYL", String(d)]).concat([1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => ["EKİ", String(d)]));
  const ringGeo = new THREE.ExtrudeGeometry(rrRing(FW, FH, 0.22, 0.085), { depth: 0.055, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2, curveSegments: 16 });
  const frames = DAYS.map(([m, d], i) => {
    const g = new THREE.Group();
    const ring = new THREE.Mesh(ringGeo, glass({ roughness: 0.2, thickness: 0.1 }));
    ring.position.z = -0.03;
    const inner = rim(FW - 0.17, FH - 0.17, 0.14, 1.1, "#5d8ff5", 0.009);
    inner.position.z = 0.035;
    const lab = uiPlane(printP(UI.dayLabel, 0.66, 0.66, { day: d, month: m }).texture, 0.66, 0.66);
    lab.position.set((i % 2 ? 1 : -1) * (FW / 2 - 0.62), FH / 2 - 0.52, 0.04);
    g.add(ring, inner, lab);
    const rear = i >= NFRONT, j = i - NFRONT;
    g.userData = { inner, lab, rear, j, z0: rear ? -1.3 - j * 2.1 : 21.9 - i * 1.55 };
    tunnel.add(g);
    return g;
  });
  // the "%45": thick glass that fills with blue light from below
  const tfont = new FontLoader().parse(INTER_800);
  const NUM = { size: 1.95, depth: 0.5, y: 0.62 };
  const numGeo = new TextGeometry("%45", { font: tfont, size: NUM.size, depth: NUM.depth, curveSegments: 16, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.035, bevelSegments: 6 });
  numGeo.computeBoundingBox();
  const nbb = numGeo.boundingBox.clone();
  const ncx = (nbb.max.x + nbb.min.x) / 2, ncz = (nbb.max.z + nbb.min.z) / 2;
  numGeo.translate(-ncx, -nbb.min.y, -ncz);
  const numH = nbb.max.y - nbb.min.y;
  const numeral = new THREE.Group();
  numeral.position.set(0, NUM.y, 0);
  numeral.add(new THREE.Mesh(numGeo, glass({ roughness: 0.05, thickness: 0.8, color: "#f2f6ff", attenuationDistance: 5, clearcoatRoughness: 0.04, envMapIntensity: 1.8 })));
  const inner = numGeo.clone();
  inner.scale(0.965, 0.985, 0.6);
  inner.translate(0, numH * 0.008, 0);
  const fillPlane = new THREE.Plane(V3(0, -1, 0), 0);
  const menA = new THREE.Plane(V3(0, -1, 0), 0), menB = new THREE.Plane(V3(0, 1, 0), 0);
  numeral.add(new THREE.Mesh(inner, new THREE.MeshBasicMaterial({ color: hdr("#3a78ff", 1.2), toneMapped: false, clippingPlanes: [fillPlane] })));
  numeral.add(new THREE.Mesh(inner, new THREE.MeshBasicMaterial({ color: hdr("#c4d9ff", 2.4), toneMapped: false, clippingPlanes: [menA, menB] })));
  tunnel.add(numeral);
  // the lower ring of "%" is the portal: find its hole in the glyph outline
  const pct = tfont.generateShapes("%", NUM.size).map((s) => {
    const pts = s.getPoints(24), hole = s.holes[0] ? s.holes[0].getPoints(24) : null;
    const c = pts.reduce((a, p) => a.add(p), new THREE.Vector2()).divideScalar(pts.length);
    const hc = hole ? hole.reduce((a, p) => a.add(p), new THREE.Vector2()).divideScalar(hole.length) : null;
    return { c, hc };
  }).filter((s) => s.hc).sort((a, b) => a.c.y - b.c.y)[0];
  const PORTAL = V3(pct.hc.x - ncx, pct.hc.y - nbb.min.y + NUM.y, 0);
  const underLight = new THREE.PointLight("#3f7cff", 7, 5, 1.6);
  underLight.position.set(0, 0.5, 0.7);
  const catchLight = new THREE.PointLight("#dfe8ff", 10, 7, 1.8);
  catchLight.position.set(-1.6, 3.4, 2.6);
  tunnel.add(underLight, catchLight);
  // long-exposure light trails on the floor, streaking in towards the numeral
  const trails = [];
  {
    const r = rng(5);
    for (let i = 0; i < 12; i++) {
      const x = (i % 2 ? 1 : -1) * (2.3 + r() * 1.1), len = 1.6 + r() * 3.8, z = 26 - r() * 22;
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.005, 1), glow("#9cc0ff", 1.2 + r() * 0.6));
      m.position.set(x, 0.008, z);
      m.userData = { len, z, d: r() * 0.6 };
      tunnel.add(m);
      trails.push(m);
    }
  }
  tunnel.add(softSprites(11, 14, [-8, 8, 0.8, 5.5, -18, -4], { smin: 0.2, smax: 1.1, amax: 0.07 }));

  /* =====================================================================
     SET 2 · the chat window (5.9 – 13.9 s, again 27.95 – 50 s)
     ===================================================================== */
  const studio = addSet("studio");
  studio.add(at(gridPatch(34, { dots: 0.26 }), 0, 0.002, -8));
  const WIN = { w: 3.9, h: 2.35, d: 0.11, pos: V3(0, 1.95, -10) };
  const chatPrint = printP(UI.chat, WIN.w, WIN.h, { msgs: [], input: "" });
  const win = panel({ w: WIN.w, h: WIN.h, d: WIN.d, r: 0.08, print: chatPrint, mat: { roughness: 0.5, color: "#b8c6e6", attenuationDistance: 9, envMapIntensity: 0.22, clearcoat: 0.3, specularIntensity: 0.6 } });
  win.position.copy(WIN.pos);
  studio.add(win);
  const winShadow = shadowDecal(4.4, 1.5, 0.45);
  studio.add(winShadow);
  // the small core in the header: the AI motif is born as a breath
  const headCore = core(0.06, 1.6);
  headCore.userData.light.intensity = 0.6;
  headCore.userData.light.distance = 1.5;
  headCore.position.set(-WIN.w / 2 + 0.179, WIN.h / 2 - 0.176, WIN.d / 2 + 0.06);
  win.add(headCore);
  // the portal ring the camera leaves the numeral through
  const portalRing = new THREE.Group();
  portalRing.add(new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.2, 32, 120), glass({ roughness: 0.12, thickness: 0.4, color: "#eef4ff" })));
  const portalRim = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.012, 8, 160), glow("#a9c6ff", 2.2));
  portalRim.position.z = 0.19;
  portalRing.add(portalRim);
  portalRing.position.set(0, 1.9, -0.6);
  studio.add(portalRing);
  // condensation: soft motes that gather into the window
  const motes = softSprites(71, 46, [-5, 5, -0.6, 4.6, -13, -7], { smin: 0.08, smax: 0.34, amin: 0.12, amax: 0.3, hex: "#8fb2ff" });
  studio.add(motes);
  // the send button's orange light spill
  const sendLight = new THREE.PointLight("#E8500A", 0, 4, 1.8);
  sendLight.position.set(WIN.w / 2 - 0.28, -WIN.h / 2 + 0.3, 0.4);
  win.add(sendLight);
  // the heavy glass .xlsx block (5A) and the light rows it sends into the window
  const xlsxPrint = printP(UI.xlsxFace, 1.2, 0.76, { sub: "3 çalışan · 6 gün" });
  const xlsx = panel({ w: 1.2, h: 0.76, d: 0.3, r: 0.09, print: xlsxPrint, rimK: 1.6, mat: { roughness: 0.18, thickness: 0.6, color: "#eafff6", attenuationColor: new THREE.Color("#2bbf8a"), attenuationDistance: 2.2 } });
  xlsx.userData.rim.material.userData.base = new THREE.Color("#7ff0c0");
  studio.add(xlsx);
  const rowBars = [0, 1, 2].map(() => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.07, 0.07, 2, 0.03), glow("#6ee7b7", 2.2));
    studio.add(m);
    return m;
  });
  // PDKS devices: generic glass tiles, no brand marks (brief: logos only with written permission)
  const PDKS = [
    { kind: "fingerprint", label: "Parmak izi", a: 3.45 },
    { kind: "card", label: "Kartlı geçiş", a: 2.75 },
    { kind: "face", label: "Yüz tanıma", a: 2.05 },
    { kind: "turnstile", label: "Turnike", a: 1.1 },
    { kind: "mobile", label: "Mobil", a: 0.4 },
    { kind: "clock", label: "Vardiya", a: -0.3 },
  ];
  const pdks = PDKS.map((p, i) => {
    const t = panel({ w: 0.86, h: 0.86, d: 0.12, r: 0.12, print: printP(UI.icon, 0.86, 0.86, p), rimK: 1.6, mat: { roughness: 0.3, color: "#eef4ff" } });
    const rad = 3.25;
    t.userData.home = V3(WIN.pos.x + Math.cos(p.a) * rad * 1.28, WIN.pos.y + 0.1 + Math.sin(p.a) * rad * 0.5, WIN.pos.z - 0.9);
    void i;
    studio.add(t);
    const th = thread(
      [[t.userData.home.x, t.userData.home.y, t.userData.home.z], [lerp(t.userData.home.x, WIN.pos.x, 0.55), lerp(t.userData.home.y, WIN.pos.y, 0.55) + 0.25, WIN.pos.z - 0.5], [WIN.pos.x + (t.userData.home.x > 0 ? 1.5 : -1.5), WIN.pos.y + 0.1, WIN.pos.z + 0.02]],
      0.007, glow("#6ee7b7", 1.6),
    );
    studio.add(th);
    t.userData.thread = th;
    return t;
  });
  const packetMap = tex(UI.glowDot());
  const packets = pdks.map(() => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: packetMap, color: new THREE.Color("#a7f3d0"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    s.scale.setScalar(0.16);
    studio.add(s);
    return s;
  });
  // the green completion line that becomes the chart's horizon (line-to-horizon)
  const baseline = new THREE.Mesh(new THREE.BoxGeometry(1, 0.012, 0.028), glow("#10B981", 2.6));
  baseline.position.set(4, 0.009, -8.35);
  studio.add(baseline);
  studio.add(softSprites(21, 22, [-9, 12, 0.8, 7, -24, -12], { smin: 0.2, smax: 1.2 }));

  /* =====================================================================
     SET 3 · inside: the AI core thinks (13.3 – 20.4 s)
     ===================================================================== */
  const mind = addSet("mind");
  const CORE = V3(0, 2.1, -20);
  mind.add(at(gridPatch(30, { dots: 0.24 }), 0, 0.002, -19));
  const bigCore = core(0.85, 2.2);
  bigCore.position.copy(CORE);
  bigCore.userData.light.intensity = 9;
  bigCore.userData.light.distance = 12;
  mind.add(bigCore);
  const PEOPLE = [
    { initials: "AY", name: "Ahmet Yılmaz", dept: "Marketing · İstanbul" },
    { initials: "ED", name: "Elif Demir", dept: "Finans · Ankara" },
    { initials: "MA", name: "Mert Arslan", dept: "Satış · İzmir" },
    { initials: "ZK", name: "Zeynep Kaya", dept: "Ar-Ge · Çanakkale" },
    { initials: "BÖ", name: "Burak Öztürk", dept: "Finans · Ankara" },
    { initials: "SÇ", name: "Selin Çelik", dept: "İK · İstanbul" },
  ];
  const ORBIT_GLASS = { roughness: 0.4, color: "#b8c6e6", envMapIntensity: 0.25, clearcoat: 0.3, specularIntensity: 0.5 };
  const orbits = [
    { n: 6, r: 2.55, tiltX: 0.32, tiltZ: 0.18, w: 1.0, sp: 0.34, make: (i) => panel({ w: 1.12, h: 0.52, d: 0.06, r: 0.06, print: printP(UI.person, 1.12, 0.52, PEOPLE[i]), rimK: 1.3, mat: ORBIT_GLASS }) },
    { n: 6, r: 1.95, tiltX: -0.5, tiltZ: -0.1, w: 1.0, sp: -0.46, make: (i) => panel({ w: 1.3, h: 0.21, d: 0.05, r: 0.05, print: printP(UI.timesheet, 1.3, 0.21, { name: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"][i], cells: [1, 1, i % 3 ? 1 : 0, 1, 1, i === 1 ? 0 : 1, 1] }), rimK: 1.1, mat: ORBIT_GLASS }) },
    { n: 4, r: 3.05, tiltX: 0.95, tiltZ: 0.4, w: 1.0, sp: 0.24, make: (i) => panel({ w: 0.56, h: 0.74, d: 0.04, r: 0.04, print: printP(UI.doc, 0.56, 0.74, { title: "Mevzuat", sub: ["Eylül 2026", "SGK", "Asgari ücret", "Fazla mesai"][i] }), rimK: 1.1, mat: ORBIT_GLASS }) },
  ];
  const orbiters = [];
  orbits.forEach((o, oi) => {
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(o.tiltX, 0, o.tiltZ));
    for (let i = 0; i < o.n; i++) {
      const p = o.make(i);
      p.userData.orbit = { o, q, a0: (i / o.n) * Math.PI * 2 + oi * 0.7, oi, i, delay: oi * 0.25 + i * 0.07 };
      mind.add(p);
      orbiters.push(p);
    }
  });
  // the scan light: rings of light that leave the core and read everything they pass
  const pings = [0, 1, 2].map(() => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(1, 0.006, 6, 220), glow("#a9c6ff", 2.2, { depthWrite: false }));
    m.rotation.x = Math.PI / 2 - 0.32;
    mind.add(m);
    return m;
  });
  const PING = { t0: 15.3, every: 1.3, n: 3 };
  const pingAt = (t, k) => { const ph = (t - PING.t0 - k * PING.every) / 1.6; return ph > 0 && ph < 1 ? ph : -1; };
  mind.add(softSprites(31, 26, [-10, 10, 0.5, 7.5, -32, -13], { smin: 0.2, smax: 1.2 }));

  /* =====================================================================
     SET 4 · findings rise and glide into the approval tray (19.4 – 27.95 s)
     ===================================================================== */
  const proof = addSet("proof");
  proof.add(at(gridPatch(30, { dots: 0.28 }), 0, 0.002, -16));
  const FC = [
    { dot: "blue", head: "Eylül mevzuat güncellemesi", body: "Etkilenen 14 çalışan tespit edildi", p: V3(1.8, 3.55, -18.9), ry: -0.16, w: 3.8 },
    { dot: "blue", head: "Ankara ofisi · Finans", body: "2 çalışanın fazla mesai kaydı onay bekliyor", p: V3(1.05, 2.55, -17.6), ry: -0.1, w: 4.15 },
    { dot: "red", head: "İstanbul ofisi · Marketing", body: "Ahmet Yılmaz: 3 günlük puantaj kaydı eksik", p: V3(-1.1, 1.55, -16.2), ry: 0.12, w: 4.2 },
  ];
  const CARD_H = 1.02;
  const cards = FC.map((c) => {
    const p = panel({ w: c.w, h: CARD_H, print: printP(UI.finding, c.w, CARD_H, { dot: c.dot, head: c.head, body: c.body }), mat: { roughness: 0.42, color: "#eef4ff", attenuationDistance: 9, thickness: 0.2 } });
    const sh = shadowDecal(c.w * 1.05, 1.3, 0.5);
    proof.add(p, sh);
    p.userData.shadow = sh;
    p.userData.c = c;
    return p;
  });
  const smallCore = core(0.28);
  proof.add(smallCore);
  const CORE_HI = V3(0.25, 4.65, -19.8);
  const beamMat = glow("#6f9cff", 1.3);
  const corner = (c) => [c.p.x - (c.w / 2) * Math.cos(c.ry) + 0.06, c.p.y + CARD_H / 2 - 0.02, c.p.z + (c.w / 2) * Math.sin(c.ry)];
  const beams = FC.map((c) => {
    const e = corner(c), s = [CORE_HI.x, CORE_HI.y - 0.25, CORE_HI.z], m = [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2 + 0.32, (s[2] + e[2]) / 2];
    const b = thread([s, m, e], 0.006, beamMat);
    proof.add(b);
    return b;
  });
  // the approval tray: a low glass in-tray at the viewer's edge. It never sends anything on its own.
  const tray = new THREE.Group();
  tray.add(new THREE.Mesh(new RoundedBoxGeometry(7.2, 0.1, 1.5, 4, 0.045), glass({ roughness: 0.3, thickness: 0.1 })));
  const lip = new THREE.Mesh(new RoundedBoxGeometry(7.2, 0.36, 0.07, 4, 0.03), glass({ roughness: 0.3, thickness: 0.07, color: "#dfe9ff" }));
  lip.position.set(0, 0.1, 0.76);
  const lipPrint = printP(UI.trayLip, 7.2, 0.36, { count: 0 });
  const lipUi = uiPlane(lipPrint.texture, 7.2, 0.36);
  lipUi.position.set(0, 0.1, 0.8);
  const lipRim = rim(7.16, 0.33, 0.03, 1.3);
  lipRim.position.set(0, 0.1, 0.798);
  tray.add(lip, lipUi, lipRim);
  const TRAY = V3(0.15, 0.12, -13.7);
  tray.position.copy(TRAY);
  proof.add(tray);
  const trayShadow = shadowDecal(8, 2, 0.45);
  trayShadow.position.set(TRAY.x, 0.004, TRAY.z + 0.1);
  proof.add(trayShadow);
  proof.add(softSprites(41, 22, [-9, 9, 0.8, 7, -30, -20], { smin: 0.2, smax: 1.2 }));

  /* =====================================================================
     SET 6 · reports unfold out of the window (38 – 50 s)
     ===================================================================== */
  const report = addSet("report");
  report.add(at(gridPatch(44, { dots: 0.26 }), 8, 0.002, -9));
  const BARS = [
    { v: 1.26, n: "Backend" }, { v: 0.74, n: "Frontend" }, { v: 0.52, n: "Mobil" }, { v: 0.33, n: "QA" }, { v: 0.25, n: "Tasarım" },
  ];
  const bars = BARS.map((b, i) => {
    const h = b.v * 2.35, x = 0.05 + i * 0.86, z = -8.75;
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const shell = new THREE.Mesh(new RoundedBoxGeometry(0.54, h, 0.54, 4, 0.05), glass({ roughness: 0.12, thickness: 0.35, color: "#f4f7ff", attenuationDistance: 10, clearcoatRoughness: 0.08 }));
    shell.position.y = h / 2;
    const fill = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1, 0.4), glow("#356fe6", 0.62 + 0.1 * (4 - i) / 4));
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.016, 0.4), glow("#c4d9ff", 2.2));
    const valP = printP(UI.label, 1.0, 0.22, { text: "₺0,00 mn", px: 0.62 });
    const val = uiPlane(valP.texture, 1.0, 0.22);
    val.position.y = h + 0.22;
    const nm = uiPlane(printP(UI.label, 0.95, 0.2, { text: b.n, px: 0.58, weight: 600, color: "#AFC3EA" }).texture, 0.95, 0.2);
    nm.position.set(0, 0.13, 0.36);
    g.add(shell, fill, top, val, nm);
    g.userData = { h, shell, fill, top, val, valP, nm, v: b.v };
    report.add(g);
    return g;
  });
  const glassy = { roughness: 0.4, color: "#eef4ff", attenuationDistance: 9 };
  const OUT = [
    { key: "table", w: 3.0, h: 2.2, p: V3(5.15, 2.5, -9.7), ry: -0.34, fn: UI.table, s: { title: "Aylık maaş özeti · Eylül", rows: [["Brüt toplam", "₺3.104.800"], ["Net ödenecek", "₺2.204.400"], ["SGK işveren payı", "₺574.390"], ["Çalışan", "24"]] } },
    { key: "dept", w: 3.0, h: 1.0, p: V3(5.2, 0.86, -9.1), ry: -0.32, fn: UI.dept, s: { title: "Ürün Geliştirme · Çanakkale", sub: "24 çalışan · Eylül 2026" } },
    { key: "hbars", w: 3.3, h: 2.1, p: V3(9.4, 1.95, -9.5), ry: -0.22, fn: UI.hbars, s: { title: "Fazla mesai maliyeti · Eylül", rows: [["Satış", 184, "₺184 bin"], ["Operasyon", 142, "₺142 bin"], ["Ar-Ge", 96, "₺96 bin"], ["Finans", 41, "₺41 bin"], ["İK", 18, "₺18 bin"]], k: 0 } },
    { key: "cols", w: 3.3, h: 2.1, p: V3(13.2, 1.95, -9.6), ry: -0.16, fn: UI.columns, s: { title: "SGK prim karşılaştırması", legend: ["İşveren payı", "Çalışan payı"], months: ["Nis", "May", "Haz", "Tem", "Ağu", "Eyl"], a: [5.1, 5.2, 5.2, 5.9, 6.0, 6.1], b: [3.6, 3.6, 3.7, 4.2, 4.2, 4.3], k: 0 } },
    { key: "sum", w: 3.1, h: 2.1, p: V3(17.0, 1.95, -9.7), ry: -0.1, fn: UI.summary, s: { title: "Kıdem tazminatı yükümlülüğü", kicker: "Şirket geneli · Eylül 2026", big: "₺18,6 mn", rows: [["Çalışan", "312"], ["Ortalama kıdem", "4,8 yıl"], ["Geçen aya göre", "+%1,2"]] } },
  ];
  const outs = OUT.map((o) => {
    const pr = printP(o.fn, o.w, o.h, o.s);
    const p = panel({ w: o.w, h: o.h, print: pr, mat: glassy });
    p.userData.o = o;
    p.userData.pr = pr;
    report.add(p);
    return p;
  });
  // the gallery ring the reports collapse into (and the close set's portal back to the core)
  const galleryRim = rim(3.3, 2.1, 0.08, 2.4, "#8fb2ff", 0.02);
  report.add(galleryRim);
  report.add(softSprites(51, 30, [-6, 22, 0.8, 7, -24, -12], { smin: 0.2, smax: 1.2 }));

  /* =====================================================================
     SET 7 · close: ring → core → logo (50 – 58 s)
     ===================================================================== */
  const finale = addSet("finale");
  const K = V3(9.6, 1.95, -9.86);
  finale.add(at(gridPatch(34, { dots: 0.22 }), 9, 0.002, -9));
  const endRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.012, 8, 200), glow("#a9c6ff", 2.4));
  endRing.position.copy(K);
  const endCore = core(0.34, 2.0);
  endCore.position.copy(K);
  endCore.userData.light.intensity = 6;
  const endGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(UI.glowDot()), color: new THREE.Color("#1C5FD4"), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  endGlow.position.copy(K).add(V3(0, 0.2, -1.5));
  endGlow.scale.set(14, 8, 1);
  finale.add(endRing, endCore, endGlow);
  finale.add(softSprites(61, 26, [-2, 20, 0.6, 7, -26, -12], { smin: 0.2, smax: 1.2, amax: 0.08 }));

  /* =====================================================================
     camera: one take, keyed per shot
     ===================================================================== */
  const P = PORTAL;
  const camKeys = [
    // t, position, look-at, fov, ease into this key
    [0.0, [0, 1.62, 30.5], [0, 1.6, 0], 44],
    [T.land, [0, 1.52, 8.4], [0, 1.42, 0], 32, "power2.out"],
    [4.85, [0.05, 1.55, 8.9], [0, 1.45, 0], 32, "sine.inOut"],
    [T.portal, [P.x, P.y, 0.42], [P.x, P.y, -6], 30, "power3.in"],
    // → studio (jump under the portal flash)
    [T.portal + 0.0001, [0, 1.9, 3.2], [0, 1.9, -10], 30],
    [7.1, [0, 1.86, -3.55], [0, 1.9, -10], 30, "power3.out"],
    [T.send, [0, 1.84, -3.95], [0, 1.88, -10], 30, "sine.inOut"],
    [T.click, [0, 1.84, -3.95], [0, 1.88, -10], 30],
    [12.6, [0, 1.84, -4.12], [0, 1.88, -10], 30, "power2.out"],
    [T.glassIn, [0, 2.4, -10.3], [0, 2.3, -20], 34, "power2.in"],
    [15.3, [0.4, 3.0, -11.5], [0, 2.05, -20], 34, "power2.out"],
    [17.4, [-2.6, 3.1, -11.9], [0, 2.05, -20], 34, "sine.inOut"],
    [19.5, [-4.6, 3.15, -12.8], [0, 2.1, -20], 34, "sine.inOut"],
    [21.4, [0.25, 3.3, -5.4], [0.3, 1.75, -17.0], 32, "power3.inOut"],
    [27.5, [0.25, 3.45, -4.7], [0.3, 1.65, -17.0], 32, "sine.inOut"],
    [T.iris, [0.25, 3.46, -4.66], [0.3, 1.65, -17.0], 32, "none"],
    // → chat window again, at the input box (under the closed iris)
    [T.iris + 0.0001, [0.72, 1.68, -3.75], [0.68, 1.42, -10], 32],
    [T.pdks, [0.68, 1.48, -3.9], [0.68, 1.36, -10], 32, "sine.inOut"],
    [35.6, [1.2, 2.25, -1.4], [0.1, 1.95, -10.2], 32, "power2.inOut"],
    [T.report, [1.6, 2.35, -0.9], [0.0, 1.9, -10.2], 32, "sine.inOut"],
    [40.2, [1.1, 2.3, 1.6], [1.1, 1.6, -9.0], 34, "power3.inOut"],
    [T.quick, [1.25, 2.25, 1.3], [1.25, 1.6, -9.0], 34, "sine.inOut"],
    [44.2, [8.3, 2.1, -2.2], [9.3, 1.85, -9.5], 34, "power3.inOut"],
    [45.55, [12.1, 2.1, -2.3], [13.1, 1.85, -9.6], 34, "power2.inOut"],
    [47.1, [15.9, 2.1, -2.4], [16.9, 1.85, -9.7], 34, "power2.inOut"],
    [48.6, [13.8, 2.4, -2.6], [9.6, 1.95, -11.8], 34, "power2.inOut"],
    [49.7, [11.4, 2.2, -3.4], [9.6, 1.95, -10.4], 34, "power2.inOut"],
    [T.close + 0.4, [9.6, 1.95, -2.8], [9.6, 1.95, -9.86], 32, "power3.inOut"],
    [T.cta, [9.6, 1.95, -3.9], [9.6, 1.95, -9.86], 32, "power2.inOut"],
    [T.end, [9.6, 1.95, -4.0], [9.6, 1.95, -9.86], 32, "sine.inOut"],
  ];
  const camPos = track(camKeys.map(([t, p, , , e]) => [t, p, e])),
    camLook = track(camKeys.map(([t, , l, , e]) => [t, l, e])),
    camFov = track(camKeys.map(([t, , , f, e]) => [t, f, e]));
  // slow living drift, switched off for the one full stop (11.5 s) and the last still second
  const driftAmt = (t) => (t < T.send ? 1 : t < T.click ? 0 : t < T.click + 0.6 ? seg(t, T.click, T.click + 0.6) : 1) * (1 - seg(t, 56.8, 57.2)) * (t < T.land ? seg(t, 1.5, 3) : 1);

  /* =====================================================================
     schedules
     ===================================================================== */
  const type1 = TYPED.ask, type2 = TYPED.enter, type3 = TYPED.report;
  const caretOn = (t) => (Math.floor(t * 2.2) % 2 === 0 ? 1 : 0);
  const nestAt = (j) => 3.1 + j * 0.12; // telescope: October day j starts nesting, nearest first
  const NEST_D = 0.8;

  const tmpV = V3(0, 0, 0), tmpQ = new THREE.Quaternion();
  const project = (v) => {
    tmpV.copy(v).project(camera);
    return new THREE.Vector2((tmpV.x * 0.5 + 0.5) * W * PR, (tmpV.y * 0.5 + 0.5) * H * PR);
  };

  /* =====================================================================
     pose everything for time t
     ===================================================================== */
  function apply(t) {
    // ----- camera -----
    const p = camPos(t), l = camLook(t), d = driftAmt(t);
    camera.position.set(p[0] + Math.sin(t * 0.37) * 0.035 * d, p[1] + Math.sin(t * 0.29 + 1) * 0.022 * d, p[2]);
    camera.lookAt(l[0] + Math.sin(t * 0.23 + 2) * 0.02 * d, l[1], l[2]);
    camera.fov = camFov(t);
    camera.updateProjectionMatrix();

    // ----- which sets are on stage -----
    sets.tunnel.visible = t < T.portal;
    sets.studio.visible = (t >= T.portal && t < 14.05) || (t >= T.iris && t < T.close + 0.3);
    sets.mind.visible = t >= 12.9 && t < 20.6;
    sets.proof.visible = t >= 19.3 && t < T.iris;
    sets.report.visible = t >= 37.4 && t < T.close + 0.5;
    sets.finale.visible = t >= T.close - 0.2;
    scene.fog.density = t < T.portal ? 0.03 : t < T.iris ? 0.026 : 0.022;
    stageFloor.veil.material.opacity = t < T.portal ? 0.86 : t < 37.5 ? 0.62 : 0.78;

    // ----- post: flash, wipe, iris -----
    grade.uniforms.uFlash.value = 0.9 * pulse(t, 5.74, T.portal, T.portal, 6.25, "power2.in", "power2.out") + 0.35 * pulse(t, 13.62, 13.8, 13.8, 14.1);
    grade.uniforms.uWipe.value = t > 13.35 && t < 14.15 ? ez("power2.inOut", t, 13.35, 14.15) : -1;
    grade.uniforms.uFade.value = 1 - seg(t, 0, 0.35);

    if (sets.tunnel.visible) poseTunnel(t);
    if (sets.studio.visible) poseStudio(t);
    if (sets.mind.visible) poseMind(t);
    if (sets.proof.visible) poseProof(t);
    if (sets.report.visible) poseReport(t);
    if (sets.finale.visible) poseFinale(t);

    // focal iris: closes on the red dot (27.3 – 27.9), opens on the input box (28.0 – 28.7)
    let irisR = 1e6;
    if (t > 27.2 && t < 28.8) {
      const R0 = Math.hypot(W, H) * PR * 0.6, R1 = 60 * PR;
      irisR = t < 27.75 ? lerp(R0, R1, ez("power3.inOut", t, 27.2, 27.75)) : t < 27.85 ? R1 : t < T.iris ? lerp(R1, -60 * PR, seg(t, 27.85, T.iris)) : lerp(-60 * PR, R0, ez("power3.out", t, 28.0, 28.75));
      if (t >= T.iris) grade.uniforms.uIrisC.value.copy(project(V3(0.2, 1.08, -9.9)));
    }
    grade.uniforms.uIrisR.value = irisR;
    grade.uniforms.uVig.value = 0.45;
  }

  function poseTunnel(t) {
    stageLights(0, 0, { key: 36, rimA: 18, rimB: 20 });
    rimA.position.set(-8, 5.5, -10);
    // frames: the camera flies through September; then October, running on behind the numeral,
    // telescopes into a short nested stack (the closing period gets shorter)
    frames.forEach((g) => {
      const { rear, j, z0 } = g.userData;
      const n = rear ? ez("power3.inOut", t, nestAt(j), nestAt(j) + NEST_D) : 0;
      const zN = -0.75 - j * 0.2, sN = 1 - j * 0.035;
      const sc = lerp(1, sN, n);
      g.position.set(0, (FH / 2 + LIFT) * sc, lerp(z0, zN, n));
      g.scale.setScalar(sc);
      const land = nestAt(j) + NEST_D;
      const tick = rear && t > land ? Math.exp(-(t - land) * 9) : 0; // a 2-frame glint as each frame locks in
      const pass = rear ? 0 : Math.exp(-Math.pow((camera.position.z - z0) * 0.6, 2)); // glint as the camera passes
      setGlow(g.userData.inner.material, 0.7 + 1.4 * tick + 1.2 * pass + 0.2 * n, 1);
      g.userData.lab.material.opacity = (rear ? 0.45 : 0.75) * (1 - n);
    });
    // numeral: fills with light from below, turns square-on before the dive
    const fill = 0.62 * ez("power2.inOut", t, 1.25, 3.05) + 0.04 * pulse(t, 3.05, 3.9, 4.4, 5.2);
    const level = NUM.y + numH * fill;
    fillPlane.constant = level;
    menA.constant = level;
    menB.constant = -(level - 0.03);
    numeral.rotation.y = lerp(-0.12, 0, ez("sine.inOut", t, 2.2, 4.8));
    underLight.intensity = 7 * (0.4 + 0.6 * ez("power2.inOut", t, 1.2, 3.0));
    // trails streak in from the far end, then stretch as the camera rushes
    trails.forEach((m) => {
      const k = ez("expo.out", t, m.userData.d * 0.5, 1.4 + m.userData.d);
      m.scale.z = Math.max(0.001, m.userData.len * k);
      m.position.z = m.userData.z - (m.userData.len * (1 - k)) / 2;
      setGlow(m.material, 1.4 * (1 - 0.55 * seg(t, 3, 5.5)), 1);
    });
  }

  function chatState(t) {
    const s = { msgs: [], input: "", caret: 0, send: 0, ripple: -1, attach: 0, dot: 0 };
    const hello = { who: "ai", text: GREETING, a: seg(t, 7.35, 7.7) };
    if (t < T.iris) {
      if (t >= 7.35) s.msgs.push(hello);
      // 6 – 14 s: first question
      const n = type1.count(t);
      s.input = PROMPT1.slice(0, n);
      s.caret = t < type1.at[0] ? caretOn(t) : t < type1.end + 0.1 ? 1 : t < 11.0 ? caretOn(t) : t < T.send ? 1 : 0;
      s.send = t < T.click ? 0 : t < T.click + 0.12 ? seg(t, T.click, T.click + 0.12) : t < 12.35 ? 1 : 1 - seg(t, 12.35, 12.6);
      s.ripple = t >= T.click ? seg(t, T.click + 0.05, 13.3) : -1;
      if (t >= 12.15) {
        s.input = "";
        s.caret = 0;
        s.msgs.push({ who: "user", text: PROMPT1, a: seg(t, 12.15, 12.4) });
      }
      return s;
    }
    // 28 – 50 s: the conversation continues
    s.msgs = [Object.assign(hello, { a: 1 }), { who: "user", text: PROMPT1 }, { who: "ai", kind: "findings" }];
    const n2 = type2.count(t);
    s.input = PROMPT2.slice(0, n2);
    s.caret = t < type2.at[0] ? caretOn(t) : t < type2.end + 0.1 ? 1 : t < 31.05 ? caretOn(t) : 0;
    s.attach = t < 29.35 ? 0 : seg(t, 29.35, 29.55);
    s.send = pulse(t, 31.0, 31.1, 31.2, 31.4);
    if (t >= 31.2) {
      s.input = "";
      s.attach = 0;
      s.caret = 0;
      s.msgs.push({ who: "user", kind: "file" });
      s.msgs.push({ who: "user", text: PROMPT2 });
      s.msgs.push({ who: "ai", kind: "rows", title: "Puantaj girişi · 3 çalışan", rows: ROWS.map((r, i) => Object.assign({ ok: seg(t, 31.9 + i * 0.42, 32.15 + i * 0.42) }, r)), a: seg(t, 31.3, 31.6) });
    }
    if (t >= 35.7) s.msgs.push({ who: "ai", kind: "done", a: seg(t, 35.7, 36.0) });
    if (t >= type3.at[0] - 0.2) {
      const n3 = type3.count(t);
      s.input = n3 < PROMPT3.length || t < type3.end + 0.15 ? PROMPT3.slice(0, n3) : "";
      s.caret = t < type3.end + 0.15 ? 1 : 0;
      if (t >= type3.end + 0.2) {
        s.input = "";
        s.msgs.push({ who: "user", text: PROMPT3 });
        s.msgs.push({ who: "ai", kind: "report", text: "Rapor hazır · Aylık maaş özeti", a: seg(t, type3.end + 0.5, type3.end + 0.8) });
      }
      quickTyping.forEach((q, i) => {
        if (t < q.at[0]) return;
        const done = t >= q.end + 0.12;
        if (!done) { s.input = q.text.slice(0, q.count(t)); s.caret = 1; }
        else { s.msgs.push({ who: "user", text: q.text }); s.input = ""; s.caret = 0; }
      });
    }
    return s;
  }

  function poseStudio(t) {
    stageLights(WIN.pos.x, WIN.pos.z, { key: 95, rimA: 22, rimB: 24 });
    const first = t < T.iris;
    // window pose: centered (chat), then slides left and turns as the report opens
    const toReport = ez("power3.inOut", t, 38.2, 40.2);
    win.position.set(lerp(0, -2.55, toReport), lerp(1.95, 1.8, toReport), lerp(-10, -10.4, toReport));
    win.rotation.y = lerp(0, 0.42, toReport);
    winShadow.position.set(win.position.x, 0.004, win.position.z + 0.35);
    // glass-condense: the window gathers out of light motes after the portal
    const cond = first ? ez("power2.out", t, 6.0, 7.3) : 1;
    const ud = win.userData;
    win.scale.setScalar(lerp(0.9, 1, cond));
    ud.body.material.roughness = lerp(0.95, 0.4, cond);
    ud.body.material.transparent = cond < 0.999;
    ud.body.material.opacity = clamp(cond * 1.4);
    setGlow(ud.rim.material, 1.9 * ez("power2.inOut", t, 6.5, 7.4), 1);
    ud.face.material.opacity = first ? ez("power2.out", t, 6.9, 7.5) * (1 - seg(t, 13.1, 13.55)) : 1;
    winShadow.material.opacity = 0.45 * cond;
    motes.visible = first && t < 7.6;
    motes.children.forEach((s, i) => {
      const k = ez("power3.in", t, 5.9 + (i % 7) * 0.05, 7.1 + (i % 5) * 0.06);
      const target = V3(WIN.pos.x + (((i * 37) % 17) / 17 - 0.5) * WIN.w, WIN.pos.y + (((i * 53) % 13) / 13 - 0.5) * WIN.h, WIN.pos.z);
      s.position.lerpVectors(s.userData.p, target, k);
      s.material.opacity = s.userData.a * (1 - Math.pow(k, 4)) * seg(t, 5.9, 6.2);
    });
    portalRing.visible = first && t < 7.2;
    setGlow(portalRim.material, 2.2 * (1 - seg(t, 6.3, 7.0)), 1);
    // header core breathes
    const breathe = 1 + 0.12 * Math.sin(t * 2.6);
    headCore.scale.setScalar(breathe * (first ? ez("power2.out", t, 7.2, 7.8) : 1));
    setGlow(headCore.userData.seed.material, 2.2 * (0.8 + 0.2 * Math.sin(t * 2.6)), 1);
    // printed UI
    const st = chatState(t);
    if (st.caret && t >= 11.0 && t < T.send && first) {
      // cursor carry: x in canvas pixels, from the end of the text to the send button
      const u = (WIN.h * PX) / 1000, ix = 50 * u, tx = ix + 48 * u;
      const ctx = chatPrint.canvas.getContext("2d");
      ctx.font = `500 ${46 * u}px Inter`;
      const x0 = tx + Math.min(ctx.measureText(PROMPT1).width, WIN.w * PX - tx - ix - 160 * u) + 6 * u;
      const x1 = WIN.w * PX - ix - 26 * u - 50 * u;
      st.caretX = Math.round(lerp(x0, x1, ez("power2.inOut", t, 11.0, 11.45)));
    }
    chatPrint.set(st);
    sendLight.intensity = 6 * pulse(t, T.click, T.click + 0.15, 12.4, 13.4) * (first ? 1 : 0) + 3 * pulse(t, 31.0, 31.1, 31.25, 31.7);
    // 5A · the surprise: one heavy glass .xlsx block swings in from outside the frame and lands on the window
    const xin = ez("power2.inOut", t, 28.55, 29.4);
    const xarc = Math.sin(xin * Math.PI) * 0.9;
    xlsx.visible = t > 28.45 && t < 33.4;
    xlsx.position.set(lerp(5.2, 2.65, xin), lerp(0.3, 1.55, xin) + xarc, lerp(-7.6, -9.4, xin));
    xlsx.rotation.set(lerp(-0.5, -0.08, xin), lerp(-0.9, -0.12, xin), lerp(0.35, 0.02, xin));
    const settle = -0.035 * Math.sin(Math.PI * seg(t, 29.4, 29.75)); // one soft sink under its weight, no bounce
    xlsx.position.y += settle;
    panelAlpha(xlsx, xin > 0 ? 1 - seg(t, 32.85, 33.3) : 0);
    // rows of light leave the block and fly into the window's list
    rowBars.forEach((m, i) => {
      const k = ez("power2.inOut", t, 31.5 + i * 0.42, 31.9 + i * 0.42);
      m.visible = t > 31.5 + i * 0.42 && k < 0.999;
      m.position.set(lerp(2.3, -0.35, k), lerp(1.6, 1.62 - i * 0.2, k) + Math.sin(k * Math.PI) * 0.3, lerp(-9.3, -9.93, k));
      m.scale.set(lerp(1, 1.9, k), 1, 1);
      setGlow(m.material, 2.2, 1 - Math.pow(k, 3));
    });
    // 5B · PDKS devices materialise in a ring and stream into the window
    pdks.forEach((d, i) => {
      const a = ez("power3.out", t, 33.35 + i * 0.16, 34.1 + i * 0.16);
      d.visible = a > 0.001 && t < 38.6;
      const out = seg(t, 37.6, 38.4);
      d.position.copy(d.userData.home).add(V3(0, 0, 0.6 * (1 - a)));
      d.scale.setScalar(lerp(0.6, 1, a));
      d.rotation.y = -Math.atan2(d.position.x - WIN.pos.x, 6) * 0.5;
      panelAlpha(d, a * (1 - out));
      const th = d.userData.thread;
      th.userData.draw(ez("power2.inOut", t, 34.0 + i * 0.12, 34.9 + i * 0.12));
      th.visible = th.visible && t < 38.6;
      setGlow(th.material, 1.6 * (1 - out), 1);
      const pk = packets[i];
      const f = ((t - 34.6 - i * 0.21) / 0.9) % 1;
      pk.visible = t > 34.6 + i * 0.21 && t < 37.8;
      if (pk.visible) pk.position.copy(th.userData.curve.getPointAt(clamp(f)));
      pk.material.opacity = 0.9 * Math.sin(clamp(f) * Math.PI);
    });
    // line-to-horizon: the green line runs out along the floor and becomes the chart's baseline
    const bl = ez("power3.inOut", t, 37.75, 38.9);
    baseline.visible = t > 37.7;
    baseline.scale.x = Math.max(0.001, 30 * bl);
    baseline.position.set(lerp(0.2, 5, bl), 0.009, -8.35);
  }

  function poseMind(t) {
    stageLights(CORE.x, CORE.z, { key: 55, rimA: 18, rimB: 20 });
    // the core grows while it thinks; it is visible through the glass before the camera crosses it
    const on = ez("power2.out", t, 12.9, 14.2);
    const grow = lerp(0.35, 1, ez("power3.inOut", t, 13.6, 15.4));
    const leave = ez("power3.inOut", t, 19.35, 20.5);
    bigCore.scale.setScalar(grow * lerp(1, 0.33, leave));
    bigCore.position.lerpVectors(CORE, CORE_HI, leave);
    bigCore.userData.light.intensity = 9 * on;
    setGlow(bigCore.userData.seed.material, 2.2 * on * (1 + 0.12 * Math.sin(t * 3.1)), 1);
    bigCore.rotation.y = t * 0.3;
    bigCore.userData.ring.rotation.z = t * 0.5;
    // three tilted orbits of what it reads: people, timesheet rows, regulation docs
    const radii = [0, 1, 2].map((k) => { const ph = pingAt(t, k); return ph < 0 ? -9 : lerp(0.9, 4.4, ease("power2.out")(ph)); });
    orbiters.forEach((p) => {
      const { o, q, a0, oi, i, delay } = p.userData.orbit;
      const inK = ez("power3.out", t, 14.15 + delay, 15.35 + delay); // orbit-in
      const a = a0 + t * o.sp;
      const r = lerp(o.r * 2.6, o.r, inK);
      tmpV.set(Math.cos(a) * r, 0, Math.sin(a) * r).applyQuaternion(q).add(CORE);
      let alpha = inK * (t < 19.3 ? 1 : 1 - ez("power2.in", t, 19.3, 20.2));
      // object carry: Ahmet Yılmaz leaves the orbit and becomes the first finding
      const carry = oi === 0 && i === 0 ? ez("power3.inOut", t, 19.2, 20.4) : 0;
      if (oi === 0 && i === 0) {
        tmpV.lerp(FC[2].p, carry);
        alpha = inK * (1 - seg(t, 20.25, 20.45));
      }
      p.position.copy(tmpV);
      tmpQ.setFromRotationMatrix(new THREE.Matrix4().lookAt(camera.position, p.position, V3(0, 1, 0)));
      p.quaternion.copy(tmpQ);
      p.scale.setScalar(lerp(1, 2.2, carry));
      panelAlpha(p, alpha);
      // a scan ring lights whatever it passes
      const dist = p.position.distanceTo(CORE);
      const lit = radii.reduce((a, rr) => a + Math.exp(-Math.pow(dist - rr, 2) / 0.12), 0);
      setGlow(p.userData.rim.material, 1.1 + 2.8 * lit, alpha);
    });
    pings.forEach((m, k) => {
      const ph = pingAt(t, k);
      m.visible = ph >= 0;
      if (!m.visible) return;
      m.position.copy(CORE);
      m.scale.setScalar(lerp(0.9, 4.4, ease("power2.out")(ph)));
      setGlow(m.material, 2.2, Math.pow(1 - ph, 1.5));
    });
  }

  function poseProof(t) {
    stageLights(0.2, -17, { key: 100, rimA: 24, rimB: 20 });
    smallCore.position.copy(CORE_HI);
    smallCore.visible = t > 20.35;
    smallCore.rotation.y = t * 0.4;
    setGlow(smallCore.userData.seed.material, 2.2 * (1 + 0.1 * Math.sin(t * 3)), 1);
    let inTray = 0;
    cards.forEach((p, i) => {
      const c = p.userData.c, red = i === 2;
      // layer-rise-shadow: the red card arrives by the carry, the other two rise from below
      const rise = red ? ez("power2.out", t, 20.3, 20.7) : ez("power3.out", t, 20.7 + (1 - i) * 0.55, 21.9 + (1 - i) * 0.55);
      const home = c.p.clone();
      home.y = lerp(red ? c.p.y : -1.3, c.p.y, rise);
      // glide into the tray, one by one; the red card last, on top
      const gi = [1, 0, 2][i];
      const g = ez("power3.inOut", t, 24.9 + gi * 0.6, 25.9 + gi * 0.6);
      const slot = V3(TRAY.x - 1.2 + gi * 1.2, TRAY.y + 0.42 + gi * 0.05, TRAY.z - 0.18 + gi * 0.08);
      p.position.lerpVectors(home, slot, g);
      p.position.y += Math.sin(g * Math.PI) * 0.5;
      p.rotation.set(lerp(0, -1.05, g), lerp(c.ry, 0, g), 0);
      p.scale.setScalar(lerp(1, 0.56, g) * (red ? lerp(0.6, 1, ez("power2.out", t, 20.25, 20.75)) : 1));
      panelAlpha(p, red ? seg(t, 20.25, 20.45) : seg(t, 20.7 + (1 - i) * 0.55, 21.0 + (1 - i) * 0.55));
      const sh = p.userData.shadow;
      sh.position.set(p.position.x, 0.004, p.position.z + 0.25);
      sh.material.opacity = 0.5 * rise * (1 - g) * clamp(1 - (p.position.y - 1.2) / 5);
      if (g >= 0.999) inTray++;
      beams[i].userData.draw(ez("power2.out", t, 21.2 + i * 0.35, 22.0 + i * 0.35) * (1 - seg(t, 24.8 + gi * 0.6, 25.1 + gi * 0.6)));
    });
    lipPrint.set({ count: inTray });
    const trayIn = ez("power3.out", t, 21.9, 22.8);
    tray.position.set(TRAY.x, lerp(-0.12, TRAY.y, trayIn), TRAY.z);
    tray.visible = trayIn > 0.002;
    tray.traverse((o) => { if (o.material) { o.material.transparent = trayIn < 0.999; o.material.opacity = trayIn; } });
    trayShadow.material.opacity = 0.45 * trayIn;
    setGlow(lipRim.material, 1.3 + 1.6 * pulse(t, 26.9, 27.05, 27.1, 27.5), 1);
    // focal iris target: the red dot on the top card
    const red = cards[2];
    const dotLocal = V3(-red.userData.w / 2 + (120 / 1000) * CARD_H * 0.9, CARD_H / 2 - (300 / 1000) * CARD_H * 0.9, 0.06);
    red.updateMatrixWorld();
    grade.uniforms.uIrisC.value.copy(project(dotLocal.applyMatrix4(red.matrixWorld)));
  }

  function poseReport(t) {
    stageLights(4, -9.5, { key: 95, rimA: 22, rimB: 24 });
    // the answer unfolds out of the window: bars rise on the green baseline and fill with light
    bars.forEach((g, i) => {
      const u = g.userData;
      const up = ez("power3.out", t, 40.6 + i * 0.12, 41.5 + i * 0.12);
      g.scale.set(1, Math.max(0.001, up * (1 - ez("power2.in", t, 47.6, 48.3))), 1);
      const lvl = u.h * 0.86 * ez("power2.inOut", t, 41.1 + i * 0.12, 42.2 + i * 0.12);
      u.fill.scale.y = Math.max(0.001, lvl);
      u.fill.position.y = lvl / 2 + 0.02;
      u.top.position.y = lvl + 0.02;
      u.val.position.y = u.h + 0.22;
      const v = u.v * ez("power2.out", t, 41.1 + i * 0.12, 42.2 + i * 0.12);
      u.valP.set({ text: "₺" + v.toFixed(2).replace(".", ",") + " mn", px: 0.62 });
      u.val.material.opacity = seg(t, 41.0 + i * 0.12, 41.3 + i * 0.12);
      u.nm.material.opacity = up;
      // the bars exist only while they stand; the gallery gathers them away before the telescope
      g.visible = up > 0.002 && t < 48.35;
    });
    const winP = V3(-2.55, 1.8, -10.4);
    outs.forEach((p, i) => {
      const o = p.userData.o;
      const quickOut = i >= 2;
      const born = quickOut ? quickTyping[i - 2].end + 0.05 : 40.75 + i * 0.3;
      // the first answer unfolds out of the window; the quick answers stack in place on the beat
      const k = quickOut ? 1 : ez("power3.inOut", t, born, born + 0.9);
      const pop = quickOut ? ez("power3.out", t, born, born + 0.55) : 1;
      // gallery: every report lines up in a row that recedes like the hook's tunnel, then nests
      const gal = ez("power2.inOut", t, T.gallery, 48.6);
      const rowPos = V3(9.6, 1.95, -9.9 - i * 1.25);
      const nest = ez("power3.inOut", t, 48.7 + (4 - i) * 0.12, 49.35 + (4 - i) * 0.12);
      const nestPos = V3(9.6, 1.95, -9.9 - i * 0.07);
      const pos = V3(0, 0, 0).lerpVectors(winP, o.p, k);
      pos.lerp(rowPos, gal).lerp(nestPos, nest);
      p.position.copy(pos);
      p.position.y -= (1 - pop) * 0.45;
      p.rotation.y = lerp(lerp(0.42, o.ry, k), 0, gal);
      p.scale.setScalar(lerp(0.25, 1, k) * lerp(0.62, 1, pop) * lerp(1, [1, 1, 0.98, 0.96, 0.94][i] * (3.3 / o.w), gal) * lerp(1, 1 - i * 0.03, nest));
      if (o.key === "hbars" || o.key === "cols") p.userData.pr.set(Object.assign({}, o.s, { k: ez("power2.out", t, born + 0.4, born + 1.1) }));
      panelAlpha(p, (t > born ? 1 : 0) * clamp(pop * 2) * (1 - seg(t, 49.3, 49.8)));
      p.userData.face.material.opacity = (t > born ? 1 : 0) * (1 - seg(t, 48.9, 49.4));
    });
    // the nested stack leaves one ring behind
    const rimA = seg(t, 49.2, 49.5) * (1 - seg(t, T.close - 0.1, T.close + 0.3));
    galleryRim.visible = rimA > 0.002;
    galleryRim.position.set(9.6, 1.95, -9.86);
    setGlow(galleryRim.material, 2.4, rimA);
  }

  function poseFinale(t) {
    stageLights(K.x, K.z, { key: 40, rimA: 18, rimB: 18 });
    // converge-to-core: the ring closes into a seed of light that becomes the core
    const shrink = ez("power4.inOut", t, T.close, 51.8);
    const ringA = seg(t, T.close - 0.1, T.close + 0.3) * (1 - seg(t, 51.5, 51.9));
    endRing.visible = ringA > 0.002;
    endRing.scale.setScalar(lerp(1.62, 0.36, shrink));
    setGlow(endRing.material, 2.4, ringA);
    const born = ez("power3.out", t, 51.2, 52.2);
    // match-morph: the core flares and hands over to the logo (DOM), then fades
    const hand = ez("power2.inOut", t, 52.6, 53.6);
    endCore.visible = born > 0.001 && hand < 0.995;
    endCore.scale.setScalar(born * (1 - hand));
    endCore.rotation.y = t * 0.4;
    setGlow(endCore.userData.seed.material, 2.2 * born * (1 + 1.6 * pulse(t, 52.3, 52.8, 52.8, 53.6)), 1);
    endCore.userData.halo.material.opacity = 0.55 * born * (1 + pulse(t, 52.3, 52.8, 52.8, 53.6));
    setGlow(endCore.userData.ring.material, 1.9 * born, 1 - hand);
    endCore.userData.light.intensity = 6 * born * (1 - hand * 0.7);
    grade.uniforms.uFlash.value += 0.18 * pulse(t, 52.5, 52.9, 52.9, 53.5);
    endGlow.material.opacity = 0.22 * ez("power2.inOut", t, 52.6, 54.2) + 0.04 * Math.sin(t * 1.3) * seg(t, 54.2, 55);
  }

  /* ---------- run ---------- */
  function renderAt(t) {
    apply(Math.max(0, Math.min(T.end, t)));
    composer.render();
  }
  return { renderAt, T, camera, project, renderer };
}
