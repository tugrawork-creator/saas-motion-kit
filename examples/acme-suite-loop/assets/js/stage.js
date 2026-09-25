// Acme Suite — 3D turntable for a seamless 40 s loop.
// Every pose is a pure function of time t, so any frame can be rendered in any order (seek-safe, deterministic).
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const LOOP = 40;
export const INTRO = 4, SLOT = 6, COUNT = 5;            // product k is in front during [INTRO + k*SLOT, INTRO + (k+1)*SLOT)
const TAU = Math.PI * 2, STEP = TAU / COUNT;

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (k) => { k = clamp(k); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const per = (t, n) => (t * TAU * n) / LOOP;               // n whole cycles per loop → identical at t = 0 and t = LOOP

// ---------- stage ----------
export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(1920, 1080, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.5;

  const camera = new THREE.PerspectiveCamera(32, 1920 / 1080, 0.1, 100);
  camera.position.set(0, 1.4, 14);
  camera.lookAt(0, -0.2, 0);

  const key = new THREE.DirectionalLight(0xffffff, 2.3);
  key.position.set(-5, 8, 7); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 6;
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 6, bottom: -6, near: 1, far: 30 });
  scene.add(key);
  const warm = new THREE.DirectionalLight(0xffe0d0, 0.8); warm.position.set(7, 2, -3); scene.add(warm);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe6e2da, 0.55));
  return { renderer, scene, camera };
}

// ---------- materials ----------
const clay = (color, extra) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.34, clearcoat: 0.9, clearcoatRoughness: 0.15, ...extra });
const MAT = {
  teal: () => clay(0x0fa3a3), deep: () => clay(0x0b6e6e), coral: () => clay(0xff5a4e),
  cream: () => clay(0xf6f5f1, { clearcoat: 0.5 }), ink: () => clay(0x0e1726, { roughness: 0.5 }), line: () => clay(0xc9d4e2),
  glow: (c) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false }),
};
function mesh(geo, mat) { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; return m; }
const box = (w, h, d, mat, r = 0.06) => mesh(new RoundedBoxGeometry(w, h, d, 4, r), mat);
function extrudeShape(shape, depth, bevel = 0.06) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 5, curveSegments: 32 });
  g.center(); return g;
}
function check() {
  const s = new THREE.Shape(); s.moveTo(-0.42, 0.02); s.lineTo(-0.1, -0.3); s.lineTo(0.46, 0.34); s.lineTo(0.34, 0.46); s.lineTo(-0.1, -0.06); s.lineTo(-0.3, 0.14); s.closePath(); return s;
}

// ---------- the five products (each ≈ 2.2 units tall, base near y = -1) ----------
function pulseMonitor() {
  const g = new THREE.Group();
  const body = box(2.1, 1.45, 0.24, MAT.cream(), 0.12); body.position.y = 0.25; g.add(body);
  const screen = box(1.84, 1.18, 0.06, MAT.ink(), 0.05); screen.position.set(0, 0.25, 0.12); g.add(screen);
  const pts = [[-0.8, 0], [-0.38, 0], [-0.24, 0.32], [-0.04, -0.36], [0.12, 0.18], [0.28, 0], [0.8, 0]].map(([x, y]) => new THREE.Vector3(x, y + 0.25, 0.17));
  const path = new THREE.CurvePath(); for (let i = 1; i < pts.length; i++) path.add(new THREE.LineCurve3(pts[i - 1], pts[i]));
  const line = new THREE.Mesh(new THREE.TubeGeometry(path, 120, 0.035, 8), MAT.glow(0xff5a4e)); g.add(line);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 14), MAT.glow(0xffb3a8)); g.add(dot);
  const neck = mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.45, 24), MAT.deep()); neck.position.y = -0.68; g.add(neck);
  const foot = mesh(new THREE.CylinderGeometry(0.5, 0.56, 0.1, 40), MAT.teal()); foot.position.y = -0.92; g.add(foot);
  g.userData = { line, dot, pts };
  return g;
}
function ledgerStack() {
  const g = new THREE.Group(), cards = [];
  [0xdff3f1, 0xeef8f7, 0xffffff].forEach((c, i) => {
    const card = box(1.35, 1.75, 0.06, clay(c, { clearcoat: 0.6 }), 0.08);
    card.position.set(0.18 * (2 - i), 0.05 * (2 - i) - 0.05, -0.16 * (2 - i)); card.rotation.z = 0.1 * (2 - i); g.add(card); cards.push(card);
  });
  const top = cards[2];
  const bar = box(1.05, 0.2, 0.03, MAT.teal(), 0.03); bar.position.set(0, 0.6, 0.05); top.add(bar);
  [0.25, 0.02, -0.21, -0.44].forEach((y, k) => {
    const a = box(0.5 - (k % 2) * 0.1, 0.07, 0.02, MAT.line(), 0.03); a.position.set(-0.22, y, 0.04); top.add(a);
    const b = box(0.24, 0.07, 0.02, MAT.deep(), 0.03); b.position.set(0.34, y, 0.04); top.add(b);
  });
  const stamp = new THREE.Group();
  const disc = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 48); disc.rotateX(Math.PI / 2);
  stamp.add(mesh(disc, MAT.coral()));
  const ck = mesh(extrudeShape(check(), 0.04, 0.02), MAT.cream()); ck.scale.setScalar(0.42); ck.position.z = 0.07; stamp.add(ck);
  stamp.position.set(0.5, -0.72, 0.16); top.add(stamp);
  g.userData = { cards, stamp };
  return g;
}
function syncCloud() {
  const g = new THREE.Group(), cloud = new THREE.Group(), m = MAT.teal();
  [[-0.55, -0.05, 0.48], [0.05, 0.25, 0.64], [0.62, -0.02, 0.46], [0.0, -0.18, 0.52]].forEach(([x, y, r]) => { const s = mesh(new THREE.SphereGeometry(r, 48, 32), m); s.position.set(x, y, 0); cloud.add(s); });
  const base = mesh(new THREE.CapsuleGeometry(0.4, 1.3, 12, 48), m); base.rotation.z = Math.PI / 2; base.position.y = -0.28; cloud.add(base);
  cloud.scale.set(1, 1, 0.7); cloud.position.y = 0.15; g.add(cloud);
  const ring = new THREE.Group();
  ring.add(new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.02, 10, 160), MAT.glow(0x8fd9d4)));
  const beads = [0, 1, 2].map((k) => { const b = mesh(new THREE.SphereGeometry(0.11, 24, 16), k ? MAT.cream() : MAT.coral()); ring.add(b); return b; });
  ring.rotation.set(1.25, 0, 0.35); ring.position.y = 0.05; g.add(ring);
  g.userData = { beads };
  return g;
}
function forecastBars() {
  const g = new THREE.Group();
  const plate = box(2.1, 0.14, 1.0, MAT.cream(), 0.06); plate.position.y = -0.95; g.add(plate);
  const bars = [0.55, 0.9, 1.25, 1.7].map((h, i) => {
    const b = mesh(new RoundedBoxGeometry(0.36, h, 0.36, 4, 0.07), i === 3 ? MAT.coral() : MAT.teal());
    b.geometry.translate(0, h / 2, 0); b.position.set(-0.72 + i * 0.48, -0.88, 0); g.add(b); return b;
  });
  g.userData = { bars };
  return g;
}
function shieldCheck() {
  const g = new THREE.Group();
  const shape = (k) => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.1 * k); s.bezierCurveTo(0.45 * k, 0.92 * k, 0.8 * k, 0.95 * k, 0.95 * k, 0.9 * k);
    s.bezierCurveTo(0.98 * k, 0.1 * k, 0.8 * k, -0.6 * k, 0, -1.12 * k); s.bezierCurveTo(-0.8 * k, -0.6 * k, -0.98 * k, 0.1 * k, -0.95 * k, 0.9 * k);
    s.bezierCurveTo(-0.8 * k, 0.95 * k, -0.45 * k, 0.92 * k, 0, 1.1 * k); return s;
  };
  g.add(mesh(extrudeShape(shape(1), 0.3), MAT.teal()));
  const face = mesh(extrudeShape(shape(0.78), 0.05, 0.03), MAT.cream()); face.position.z = 0.22; g.add(face);
  const ck = mesh(extrudeShape(check(), 0.08, 0.03), MAT.coral()); ck.position.z = 0.32; g.add(ck);
  g.userData = { check: ck };
  return g;
}

export function buildSuite(scene) {
  const products = [pulseMonitor, ledgerStack, syncCloud, forecastBars, shieldCheck].map((make) => { const o = make(); scene.add(o); return o; });
  const table = new THREE.Group();
  const top = mesh(new THREE.CylinderGeometry(3.35, 3.35, 0.22, 96), MAT.cream()); table.add(top);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(3.36, 0.05, 12, 160), MAT.deep()); rim.rotation.x = Math.PI / 2; rim.position.y = 0.11; table.add(rim);
  const under = mesh(new THREE.CylinderGeometry(3.1, 2.9, 0.3, 96), MAT.teal()); under.position.y = -0.26; table.add(under);
  table.position.copy(CENTER).add(new THREE.Vector3(0, -1.12, 0)); scene.add(table);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.14 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = CENTER.y - 1.55; ground.receiveShadow = true; scene.add(ground);
  return { products, table };
}

// ---------- choreography ----------
const CENTER = new THREE.Vector3(3.3, -1.0, -1.6), RADIUS = 2.55;
// turntable angle: product k faces the camera when angle = -k * STEP
function angleAt(t) {
  t = ((t % LOOP) + LOOP) % LOOP;
  const END = INTRO + COUNT * SLOT;                                                               // 34 s
  if (t < INTRO) return STEP / 2 * (1 - ease(t / INTRO));
  if (t < END) { const k = Math.floor((t - INTRO) / SLOT), u = t - INTRO - k * SLOT; return -(k - 1 + (k === 0 ? 1 : ease(u / 0.9))) * STEP; }
  // outro: drift from product 4 to half a step past it (≡ +STEP/2 after a full turn) → seamless with t = 0
  return -((COUNT - 1) + 0.5 * ease((t - END) / (LOOP - END))) * STEP;
}

export function apply(products, table, t) {
  const a = angleAt(t);
  table.rotation.y = a;
  products.forEach((o, k) => {
    const phi = k * STEP + a;                                                                     // 0 → front
    const front = Math.pow(Math.max(0, Math.cos(phi)), 6);
    o.position.set(CENTER.x + Math.sin(phi) * RADIUS, CENTER.y + 0.55 * front + Math.sin(per(t, 10) + k) * 0.04, CENTER.z + Math.cos(phi) * RADIUS);
    o.scale.setScalar(0.62 + 0.58 * front);
    o.rotation.set(0.06, 0.4 * Math.sin(phi) + Math.sin(per(t, 5) + k * 1.7) * 0.18 - 0.2 * front, 0);   // periodic in phi → same pose after a full turn
  });

  // small living details (all periodic over the loop)
  const P = products[0].userData, draw = (((t / 2 + 0.5) % 1) + 1) % 1;                          // heartbeat redraws every 2 s (its reset is kept off the loop seam)
  P.line.geometry.setDrawRange(0, Math.max(6, Math.floor(draw * P.line.geometry.index.count / 6) * 6));
  const idx = Math.min(P.pts.length - 2, Math.floor(draw * (P.pts.length - 1))), f = draw * (P.pts.length - 1) - idx;
  P.dot.position.lerpVectors(P.pts[idx], P.pts[idx + 1], f);
  const L = products[1].userData; L.stamp.rotation.z = Math.sin(per(t, 8)) * 0.25;
  const C = products[2].userData; C.beads.forEach((b, k) => { const q = per(t, 8) + (k * TAU) / 3; b.position.set(Math.cos(q) * 1.3, Math.sin(q) * 1.3, 0); });
  const F = products[3].userData, fFront = Math.pow(Math.max(0, Math.cos(3 * STEP + a)), 3);
  F.bars.forEach((b, i) => { b.scale.y = 0.45 + 0.55 * clamp(fFront * 1.6 - i * 0.15); });
  const S = products[4].userData; S.check.scale.setScalar(1 + 0.06 * Math.sin(per(t, 20)));
}
