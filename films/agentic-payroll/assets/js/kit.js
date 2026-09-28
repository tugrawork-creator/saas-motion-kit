// Shared 3D building blocks for the Agentic Payroll world: time helpers, glass and light materials,
// panels with printed UI, the AI core, the mirrored floor. Everything is a pure function of its inputs
// (seeded randomness only), so any frame can be rendered in any order.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { Reflector } from "three/addons/objects/Reflector.js";
import * as UI from "./ui.js";

export const UI_LAYER = 1; // printed UI lives on its own layer, so the floor mirror never shows mirrored text

/* ---------- time ---------- */
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const seg = (t, t0, t1) => clamp((t - t0) / (t1 - t0));
const EASES = {};
// GSAP's own ease curves, so the 3D world uses the same eases the ledger names
export const ease = (name) => EASES[name] || (EASES[name] = name === "none" ? (x) => x : window.gsap.parseEase(name));
export const ez = (name, t, t0, t1) => ease(name)(seg(t, t0, t1));
// 0 → 1 → 0 window with eased edges
export const pulse = (t, a, b, c, d, e1 = "power2.out", e2 = "power2.in") => (t < b ? ez(e1, t, a, b) : 1 - ez(e2, t, c, d));

// Piecewise keyframes. keys = [[time, value, easeIntoThisKey], ...]; value is a number or an array.
export function track(keys) {
  return (t) => {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      const [t1, v1, e = "power2.inOut"] = keys[i];
      if (t <= t1) {
        const [t0, v0] = keys[i - 1];
        const k = ease(e)(seg(t, t0, t1));
        return Array.isArray(v0) ? v0.map((a, j) => lerp(a, v1[j], k)) : lerp(v0, v1, k);
      }
    }
    return keys[keys.length - 1][1];
  };
}

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- materials ---------- */
export const hdr = (hex, k) => new THREE.Color(hex).multiplyScalar(k);
export const glass = (o = {}) =>
  new THREE.MeshPhysicalMaterial(
    Object.assign(
      {
        color: "#e8efff", transmission: 1, roughness: 0.36, thickness: 0.3, ior: 1.42, metalness: 0,
        clearcoat: 1, clearcoatRoughness: 0.22, specularIntensity: 1,
        attenuationColor: new THREE.Color("#4a7ee6"), attenuationDistance: 6,
      },
      o,
    ),
  );
export const emissive = (hex, k = 2, o = {}) => new THREE.MeshBasicMaterial(Object.assign({ color: hdr(hex, k), toneMapped: false }, o));
// an emissive material whose brightness is animated: keep the base colour and scale it per frame
export function glow(hex, k = 2, o = {}) {
  const m = emissive(hex, k, o);
  m.userData.base = new THREE.Color(hex);
  m.userData.k = k;
  return m;
}
export function setGlow(m, k, opacity = 1) {
  m.color.copy(m.userData.base).multiplyScalar(Math.max(0, k));
  m.transparent = opacity < 0.999;
  m.opacity = opacity;
}

/* ---------- canvas textures ---------- */
export const tex = (c) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};
// A printed surface that is redrawn only when its state key changes.
export class Print {
  constructor(w, h, px, fn, state) {
    this.w = w; this.h = h; this.px = px; this.fn = fn; this.key = null;
    this.canvas = UI.canvas(w * px, h * px);
    this.texture = tex(this.canvas);
    if (state) this.set(state);
  }
  set(state) {
    const key = JSON.stringify(state);
    if (key === this.key) return;
    this.key = key;
    this.fn(this.canvas, state);
    this.texture.needsUpdate = true;
  }
}

/* ---------- geometry ---------- */
export function rrShape(w, h, r) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}
export function rrRing(w, h, r, band) {
  const s = rrShape(w, h, r), hole = rrShape(w - 2 * band, h - 2 * band, Math.max(0.001, r - band));
  s.holes.push(new THREE.Path(hole.getPoints(48).reverse()));
  return s;
}
// thin emissive outline on a panel face: the blue rim light
export function rim(w, h, r, k = 2.0, hex = "#6f9cff", band = 0.011) {
  return new THREE.Mesh(new THREE.ShapeGeometry(rrRing(w, h, r, band), 32), glow(hex, k));
}
export function uiPlane(texture, w, h) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false, depthWrite: false }),
  );
  m.layers.set(UI_LAYER);
  m.renderOrder = 2;
  return m;
}
// A glass panel with UI printed on its front face and a blue rim.
export function panel(o) {
  const { w, h, d = 0.09, r = 0.07, print = null, rimK = 1.9, mat = {} } = o;
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, r), glass(mat));
  g.add(body);
  const front = rim(w - 0.004, h - 0.004, r, rimK);
  front.position.z = d / 2 + 0.002;
  g.add(front);
  let face = null;
  if (print) {
    face = uiPlane(print.texture, w, h);
    face.position.z = d / 2 + 0.004;
    g.add(face);
  }
  g.userData = { body, rim: front, face, print, w, h, d };
  return g;
}
// Fade a panel in or out as a whole (glass, rim, print).
export function panelAlpha(p, a) {
  const u = p.userData;
  p.visible = a > 0.002;
  u.body.material.transparent = a < 0.999;
  u.body.material.opacity = a;
  u.rim.material.opacity = a;
  if (u.face) u.face.material.opacity = a;
}

// The AI core: a hot seed of light in a clear blue glass marble, a soft halo, one thin orbit ring, its own light.
let HALO = null;
export function core(r = 0.3, ringK = 1.9) {
  const g = new THREE.Group();
  const seed = new THREE.Mesh(new THREE.SphereGeometry(r * 0.3, 48, 24), glow("#d7e5ff", 2.4));
  HALO = HALO || tex(UI.glowDot());
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: HALO, color: new THREE.Color("#3f7cff"), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  halo.scale.setScalar(r * 2.6);
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(r, 64, 32),
    glass({ roughness: 0.03, thickness: r * 0.5, color: "#f4f8ff", attenuationColor: new THREE.Color("#2f63d6"), attenuationDistance: r * 1.4, clearcoatRoughness: 0.03, envMapIntensity: 1.4 }),
  );
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.6, r * 0.018, 12, 160), glow("#a9c6ff", ringK));
  ring.rotation.x = Math.PI / 2.25;
  const light = new THREE.PointLight("#4F86F0", 5, 7, 2);
  g.add(seed, halo, shell, ring, light);
  g.userData = { seed, halo, shell, ring, light, r };
  return g;
}

export function softSprites(seed, n, box, o = {}) {
  const { smin = 0.15, smax = 1.0, amin = 0.03, amax = 0.09, hex = "#4F86F0" } = o;
  const r = rng(seed), map = tex(UI.softDot()), g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({ map, color: new THREE.Color(hex), transparent: true, opacity: amin + (amax - amin) * r(), blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false }),
    );
    s.position.set(box[0] + (box[1] - box[0]) * r(), box[2] + (box[3] - box[2]) * r(), box[4] + (box[5] - box[4]) * r());
    s.scale.setScalar(smin + (smax - smin) * Math.pow(r(), 1.5));
    s.userData.a = s.material.opacity;
    s.userData.p = s.position.clone();
    s.userData.ph = r() * Math.PI * 2;
    g.add(s);
  }
  return g;
}

// Glossy navy floor: a planar mirror under a navy veil. The dot grid is added per set (gridPatch).
export function mirrorFloor(scene, W, H, o = {}) {
  const { veil = 0.6, mirror = 0x5a6680 } = o;
  const refl = new Reflector(new THREE.PlaneGeometry(260, 260), { textureWidth: Math.round(W * 0.3), textureHeight: Math.round(H * 0.3), color: mirror, clipBias: 0.002 });
  refl.rotation.x = -Math.PI / 2;
  const base = refl.getReflectionCamera;
  refl.getReflectionCamera = function (cam) {
    const c = base.call(this, cam);
    c.layers.disable(UI_LAYER);
    return c;
  };
  const v = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), new THREE.MeshBasicMaterial({ color: "#080C18", transparent: true, opacity: veil, depthWrite: false }));
  v.rotation.x = -Math.PI / 2;
  v.position.y = 0.001;
  scene.add(refl, v);
  return { refl, veil: v };
}
export function gridPatch(size = 26, o = {}) {
  const { dots = 0.26, spacing = 26 } = o;
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: tex(UI.floor(2048, { veilIn: 0, veilOut: 0, spacing, dots })), transparent: true, depthWrite: false }),
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.002;
  return m;
}
export function shadowDecal(w, d, a = 0.6) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map: tex(UI.contactShadow()), transparent: true, opacity: a, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.004;
  m.userData.a = a;
  return m;
}
// A light thread along a curve; draw(k) reveals it from the start (k 0 → 1).
export function thread(points, radius, mat, segs = 96) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const geo = new THREE.TubeGeometry(curve, segs, radius, 8, false);
  const m = new THREE.Mesh(geo, mat);
  const total = geo.index.count, perSeg = total / segs;
  m.userData.draw = (k) => {
    const n = Math.round(clamp(k) * segs) * perSeg;
    geo.setDrawRange(0, n);
    m.visible = n > 0;
  };
  m.userData.curve = curve;
  return m;
}
