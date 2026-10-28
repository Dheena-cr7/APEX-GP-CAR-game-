import * as THREE from 'three';
import { MeshBuilder, shadeHex } from './MeshBuilder.js';
import { SEMANTIC, UI } from '../core/Palette.js';
import { WALL } from '../cars/Sizes.js';

// Procedural scenery. Every repeated prop is one InstancedMesh; props are
// always placed outside the barriers with clearance, so neither cars nor the
// camera (clamped inside the walls) can reach them.

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _e = new THREE.Euler();
const _c = new THREE.Color();

// ---- primitive helpers writing into a MeshBuilder ----
export function addBox(b, cx, cy, cz, sx, sy, sz, color, rotY = 0) {
  const hx = sx / 2;
  const hy = sy / 2;
  const hz = sz / 2;
  const c = Math.cos(rotY);
  const s = Math.sin(rotY);
  const P = (x, y, z) => [cx + x * c + z * s, cy + y, cz - x * s + z * c];
  const faces = [
    [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]],
    [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]],
    [[hx, -hy, hz], [hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz]],
    [[-hx, -hy, -hz], [-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz]],
    [[-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz], [-hx, hy, -hz]],
    [[-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz], [-hx, -hy, hz]],
  ];
  for (const f of faces) {
    const idx = f.map((v) => b.v(...P(...v), color));
    b.quad(idx[0], idx[1], idx[2], idx[3]);
  }
}

export function addCone(b, cx, cy, cz, r, h, segs, color, topColor = color) {
  const apex = [cx, cy + h, cz];
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const p0 = [cx + Math.sin(a0) * r, cy, cz + Math.cos(a0) * r];
    const p1 = [cx + Math.sin(a1) * r, cy, cz + Math.cos(a1) * r];
    const i0 = b.v(...p0, color);
    const i1 = b.v(...p1, color);
    const i2 = b.v(...apex, topColor);
    b.tri(i0, i1, i2);
  }
}

export function addCylinder(b, cx, cy, cz, r, h, segs, color, capColor = color) {
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    const x0 = Math.sin(a0) * r;
    const z0 = Math.cos(a0) * r;
    const x1 = Math.sin(a1) * r;
    const z1 = Math.cos(a1) * r;
    const v0 = b.v(cx + x0, cy, cz + z0, color);
    const v1 = b.v(cx + x1, cy, cz + z1, color);
    const v2 = b.v(cx + x1, cy + h, cz + z1, color);
    const v3 = b.v(cx + x0, cy + h, cz + z0, color);
    b.quad(v0, v1, v2, v3);
    const c0 = b.v(cx, cy + h, cz, capColor);
    const c1 = b.v(cx + x0, cy + h, cz + z0, capColor);
    const c2 = b.v(cx + x1, cy + h, cz + z1, capColor);
    b.tri(c0, c1, c2);
  }
}

// ---- prop kits (unit-ish size, scaled per instance) ----
function kitTree(theme) {
  const b = new MeshBuilder();
  addCylinder(b, 0, 0, 0, 0.35, 2.2, 5, theme.propsAlt);
  addCone(b, 0, 1.6, 0, 2.4, 3.6, 6, theme.props, shadeHex(theme.props, 0.15));
  addCone(b, 0, 3.6, 0, 1.8, 3.0, 6, shadeHex(theme.props, 0.08), shadeHex(theme.props, 0.22));
  return b.build();
}

function kitPine(theme) {
  const b = new MeshBuilder();
  addCylinder(b, 0, 0, 0, 0.3, 1.6, 5, shadeHex(theme.props, -0.45));
  addCone(b, 0, 1.2, 0, 2.0, 4.2, 6, theme.props, shadeHex(theme.props, 0.12));
  addCone(b, 0, 3.8, 0, 1.4, 3.6, 6, shadeHex(theme.props, 0.06), shadeHex(theme.props, 0.2));
  addCone(b, 0, 6.2, 0, 0.8, 2.6, 6, shadeHex(theme.props, 0.1), theme.propsAlt);
  return b.build();
}

function kitHill(color, cap) {
  const b = new MeshBuilder();
  addCone(b, 0, 0, 0, 1, 1, 7, color, cap);
  return b.build();
}

function kitGrandstand(theme) {
  const b = new MeshBuilder();
  const len = 40;
  const seat = shadeHex(theme.props, -0.05);
  for (let r = 0; r < 6; r++) addBox(b, 0, 0.6 + r * 1.1, -r * 1.4, len, 1.2 + r * 2.2, 1.4, r % 2 ? seat : shadeHex(seat, -0.08));
  addBox(b, 0, 0.4, 3, len, 0.8, 4, shadeHex(theme.props, -0.2));
  // roof on posts
  addBox(b, 0, 10.5, -3.5, len + 2, 0.4, 10, theme.accent);
  for (let i = -2; i <= 2; i++) addBox(b, i * (len / 4.4), 5.2, -8, 0.4, 10.4, 0.4, shadeHex(theme.props, -0.3));
  // crowd dots
  for (let r = 0; r < 6; r++) {
    for (let k = 0; k < 18; k++) {
      const x = -len / 2 + 1.2 + k * (len - 2.4) / 17 + ((r * 7 + k * 3) % 5) * 0.12;
      const crowd = [UI.red, UI.chalk, UI.infoBlue, UI.warnAmber, UI.goodGreen, UI.ash][(r * 5 + k * 7) % 6];
      addBox(b, x, 1.6 + r * 2.2, -r * 1.4 + 0.1, 0.6, 0.7, 0.5, crowd);
    }
  }
  return b.build();
}

function kitBuilding(theme) {
  const b = new MeshBuilder();
  addBox(b, 0, 0.5, 0, 1, 1, 1, theme.props);
  addBox(b, 0, 1.01, 0, 0.8, 0.04, 0.8, shadeHex(theme.props, 0.1));
  return b.build();
}

function kitWindows() {
  // lit window bands on two faces of a unit building (emissive, unlit)
  const b = new MeshBuilder();
  for (let r = 0; r < 6; r++) {
    const y = 0.12 + r * 0.15;
    addBox(b, 0, y, 0.505, 0.8, 0.05, 0.01, UI.warnAmber);
    addBox(b, 0.505, y, 0, 0.01, 0.05, 0.8, UI.warnAmber);
    addBox(b, 0, y, -0.505, 0.8, 0.05, 0.01, UI.warnAmber);
    addBox(b, -0.505, y, 0, 0.01, 0.05, 0.8, UI.warnAmber);
  }
  return b.build();
}

function kitSign(theme) {
  const b = new MeshBuilder();
  addBox(b, -2.2, 2, 0, 0.25, 4, 0.25, SEMANTIC.carbon);
  addBox(b, 2.2, 2, 0, 0.25, 4, 0.25, SEMANTIC.carbon);
  addBox(b, 0, 4.2, 0, 6, 2.2, 0.3, theme.accent);
  addBox(b, 0, 4.2, 0.17, 5, 0.4, 0.02, UI.chalk);
  return b.build();
}

function kitLamp() {
  const b = new MeshBuilder();
  addCylinder(b, 0, 0, 0, 0.14, 7, 5, SEMANTIC.carbon);
  addBox(b, 0.7, 7, 0, 1.6, 0.18, 0.3, SEMANTIC.carbon);
  return b.build();
}

function kitFlag() {
  const b = new MeshBuilder();
  addCylinder(b, 0, 0, 0, 0.08, 6, 4, UI.ash);
  const i0 = b.v(0, 6, 0, UI.chalk);
  const i1 = b.v(0, 4.6, 0, UI.chalk);
  const i2 = b.v(0, 5.3, 2, UI.chalk);
  b.tri(i0, i1, i2);
  b.tri(i0, i2, i1);
  return b.build();
}

function kitChalet(theme) {
  const p = new MeshBuilder();
  addBox(p, 0, 2, 0, 8, 4, 6, shadeHex(theme.propsAlt, -0.1));
  // gable roof prism
  const L = 4.6;
  const r0 = [-L, 4, 3.4];
  const r1 = [L, 4, 3.4];
  const r2 = [L, 6.6, 0];
  const r3 = [-L, 6.6, 0];
  const r4 = [-L, 4, -3.4];
  const r5 = [L, 4, -3.4];
  const add = (pts) => pts.map((v) => p.v(v[0], v[1], v[2], theme.accent));
  let q = add([r0, r1, r2, r3]);
  p.quad(q[0], q[1], q[2], q[3]);
  q = add([r5, r4, r3, r2]);
  p.quad(q[0], q[1], q[2], q[3]);
  q = add([r1, r5, r2]);
  p.tri(q[0], q[1], q[2]);
  q = add([r4, r0, r3]);
  p.tri(q[0], q[1], q[2]);
  return p.build();
}

/** Find a spot outside every part of the track. Returns null if none found. */
function placeOutside(model, rng, minD, maxD, tries = 12) {
  const proj = { s: 0, t: 0, i: 0 };
  const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
  for (let k = 0; k < tries; k++) {
    const s = rng.range(0, model.length);
    const side = rng.sign();
    const wallT = model.wallOffset(s);
    const d = wallT + rng.range(minD, maxD);
    model.pointAt(s, side * d, pt);
    model.project(pt.x, pt.z, -1, proj);
    if (Math.abs(proj.t) < model.wallOffset(proj.s) + minD * 0.8) continue;
    return { x: pt.x, z: pt.z, y: model.heightAt(proj.s, Math.sign(proj.t) * model.wallOffset(proj.s)), s, side, heading: Math.atan2(pt.tx, pt.tz), d };
  }
  return null;
}

/** Ground height lookup on the terrain mesh by raycast (props sit on it). */
function terrainHeight(track, x, z, fallback) {
  const terrain = track.group.getObjectByName('terrain');
  if (!terrain) return fallback;
  _ray.set(_p.set(x, 500, z), _down);
  const hit = _ray.intersectObject(terrain, false);
  return hit.length ? hit[0].point.y : fallback;
}
const _ray = new THREE.Raycaster();
const _down = new THREE.Vector3(0, -1, 0);

function instanced(geo, mat, list, name, { castShadow = false, colors = null } = {}) {
  if (!list.length) {
    geo.dispose();
    return null;
  }
  const mesh = new THREE.InstancedMesh(geo, mat, list.length);
  mesh.name = name;
  for (let i = 0; i < list.length; i++) {
    const it = list[i];
    _q.setFromEuler(_e.set(0, it.rot || 0, 0));
    _s.set(it.sx ?? it.scale ?? 1, it.sy ?? it.scale ?? 1, it.sz ?? it.scale ?? 1);
    _m.compose(_p.set(it.x, it.y, it.z), _q, _s);
    mesh.setMatrixAt(i, _m);
    if (colors) mesh.setColorAt(i, _c.setHex(colors[i % colors.length]));
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.castShadow = castShadow;
  mesh.receiveShadow = false;
  mesh.computeBoundingSphere();
  return mesh;
}

/**
 * Build all scenery for a track. Returns {count, drawCalls} for the
 * performance overlay.
 */
export function buildProps(track, model, def, theme, rng, density = 1) {
  const group = new THREE.Group();
  group.name = 'props';
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
  const want = def.props || {};
  const n = (k) => Math.round((want[k] || 0) * density);
  const cx = (model.bounds.minX + model.bounds.maxX) / 2;
  const cz = (model.bounds.minZ + model.bounds.maxZ) / 2;
  const radius = Math.max(model.bounds.maxX - model.bounds.minX, model.bounds.maxZ - model.bounds.minZ) / 2;
  const add = (m) => m && group.add(m);
  let count = 0;
  // oriented boxes of the big props, in each kit's local frame (camera check)
  const boxes = track.propBoxes || (track.propBoxes = []);
  const box = (x, y, z, rot, x0, x1, z0, z1, h) => boxes.push({ x, z, rot, x0, x1, z0, z1, minY: y - 0.5, maxY: y + h });

  const scatter = (num, minD, maxD, fn) => {
    const list = [];
    for (let i = 0; i < num; i++) {
      const spot = placeOutside(model, rng, minD, maxD);
      if (!spot) continue;
      spot.y = terrainHeight(track, spot.x, spot.z, spot.y);
      const item = fn(spot, i);
      if (item) list.push(item);
    }
    count += list.length;
    return list;
  };

  if (n('trees')) {
    add(instanced(kitTree(theme), mat, scatter(n('trees'), 8, 160, (p) => ({ x: p.x, y: p.y - 0.2, z: p.z, rot: rng.range(0, 6.28), scale: rng.range(0.8, 1.5) })), 'trees', { castShadow: false }));
  }
  if (n('pines')) {
    add(instanced(kitPine(theme), mat, scatter(n('pines'), 7, 170, (p) => ({ x: p.x, y: p.y - 0.2, z: p.z, rot: rng.range(0, 6.28), scale: rng.range(0.9, 1.9) })), 'pines'));
  }
  if (n('hills')) {
    const list = [];
    for (let i = 0; i < n('hills'); i++) {
      const a = (i / n('hills')) * Math.PI * 2 + rng.range(-0.2, 0.2);
      const d = radius + rng.range(420, 900);
      const h = def.theme === 'technical' ? rng.range(140, 320) : rng.range(40, 110);
      const r = def.theme === 'technical' ? h * rng.range(1.1, 1.6) : h * rng.range(2.4, 3.6);
      list.push({ x: cx + Math.sin(a) * d, y: model.bounds.minY - 4, z: cz + Math.cos(a) * d, rot: rng.range(0, 6), sx: r, sy: h, sz: r });
    }
    const cap = def.theme === 'technical' ? UI.chalk : shadeHex(theme.groundAlt, 0.1);
    add(instanced(kitHill(shadeHex(theme.groundAlt, -0.15), cap), mat, list, 'hills'));
    count += list.length;
  }
  if (n('grandstands')) {
    // grandstands line the first and last straights, facing the track
    const list = [];
    const num = n('grandstands');
    for (let i = 0; i < num; i++) {
      const s = model.wrapS(-160 + i * (want.pits ? 50 : 320 / Math.max(1, num - 1)) + rng.range(-6, 6));
      const side = want.pits ? -1 : i % 2 === 0 ? -1 : 1;
      const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
      const off = model.wallOffset(s) + 12;
      model.pointAt(s, side * off, pt);
      const heading = Math.atan2(pt.tx, pt.tz);
      // kit faces +z with seats rising toward -z; rotate so the front faces the road
      list.push({ x: pt.x, y: model.heightAt(s, side * off) - 0.3, z: pt.z, rot: heading + (side > 0 ? Math.PI / 2 : -Math.PI / 2) });
    }
    add(instanced(kitGrandstand(theme), mat, list, 'grandstands', { castShadow: false }));
    for (const it of list) box(it.x, it.y, it.z, it.rot, -21, 21, -8.7, 5, 11);
    count += list.length;
  }
  if (n('signs')) {
    const list = [];
    const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
    for (let i = 0; i < n('signs'); i++) {
      const s = (model.length * (i + rng.range(0.1, 0.9))) / n('signs');
      const side = rng.sign();
      const off = model.wallOffset(s) + 4;
      model.pointAt(s, side * off, pt);
      list.push({ x: pt.x, y: model.heightAt(s, side * off) - 0.2, z: pt.z, rot: Math.atan2(pt.tx, pt.tz) + Math.PI / 2 });
    }
    add(instanced(kitSign(theme), mat, list, 'signs'));
    count += list.length;
  }
  if (n('flags')) {
    const list = [];
    const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
    for (let i = 0; i < n('flags'); i++) {
      const s = (model.length * i) / n('flags');
      const side = i % 2 ? 1 : -1;
      const off = model.wallOffset(s) + 3;
      model.pointAt(s, side * off, pt);
      list.push({ x: pt.x, y: model.heightAt(s, side * off), z: pt.z, rot: rng.range(0, 6.28) });
    }
    add(instanced(kitFlag(), mat, list, 'flags', { colors: [UI.red, UI.infoBlue, UI.chalk, UI.goodGreen] }));
    count += list.length;
  }
  if (n('chalets')) {
    const chalets = scatter(n('chalets'), 20, 120, (p) => ({ x: p.x, y: p.y - 0.3, z: p.z, rot: rng.range(0, 6.28), scale: rng.range(0.9, 1.3) }));
    add(instanced(kitChalet(theme), mat, chalets, 'chalets'));
    for (const it of chalets) box(it.x, it.y, it.z, it.rot, -4.6 * it.scale, 4.6 * it.scale, -3.4 * it.scale, 3.4 * it.scale, 6.6 * it.scale);
  }
  if (n('buildings')) {
    const list = scatter(n('buildings'), 9, 90, (p) => {
      const w = rng.range(14, 28);
      return { x: p.x, y: p.y - 0.5, z: p.z, rot: p.heading + rng.range(-0.15, 0.15), sx: w, sy: rng.range(14, 46), sz: rng.range(14, 26) };
    });
    // keep the footprint clear of the barrier: shrink any building whose corner reaches it
    for (const it of list) {
      const proj = { s: 0, t: 0, i: 0 };
      model.project(it.x, it.z, -1, proj);
      const room = Math.abs(proj.t) - model.wallOffset(proj.s) - 4;
      const half = Math.hypot(it.sx, it.sz) / 2;
      if (half > room) {
        const k = Math.max(0.3, room / half);
        it.sx *= k;
        it.sz *= k;
      }
    }
    add(instanced(kitBuilding(theme), mat, list, 'buildings', { castShadow: false, colors: [UI.chalk, shadeHex(UI.chalk, -0.1), shadeHex(UI.chalk, -0.2)] }));
    for (const it of list) box(it.x, it.y, it.z, it.rot, -it.sx / 2, it.sx / 2, -it.sz / 2, it.sz / 2, it.sy);
    const windows = new THREE.MeshBasicMaterial({ vertexColors: true });
    add(instanced(kitWindows(), windows, list, 'windows', { colors: theme.neon ? [UI.chalk, theme.neon[3], shadeHex(UI.chalk, -0.3)] : [UI.chalk] }));
  }
  if (n('neon')) {
    const list = [];
    const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
    for (let i = 0; i < n('neon'); i++) {
      const s = (model.length * (i + rng.range(0.2, 0.8))) / n('neon');
      const side = rng.sign();
      const off = model.wallOffset(s) + 5.5;
      model.pointAt(s, side * off, pt);
      const ground = model.heightAt(s, side * off);
      list.push({ x: pt.x, y: ground + rng.range(5, 9), z: pt.z, ground, rot: Math.atan2(pt.tx, pt.tz) + Math.PI / 2, sx: rng.range(5, 9), sy: rng.range(0.8, 1.6), sz: 0.3 });
    }
    const neonGeo = new THREE.BoxGeometry(1, 1, 1);
    const neonMat = new THREE.MeshBasicMaterial({ color: UI.chalk });
    add(instanced(neonGeo, neonMat, list, 'neon', { colors: theme.neon || [theme.accent] }));
    // posts for the signs
    const posts = list.map((it) => ({ x: it.x, y: it.ground, z: it.z, rot: it.rot, sx: 0.3, sy: it.y - it.ground, sz: 0.3 }));
    add(instanced(kitBuilding({ props: SEMANTIC.carbon }), mat, posts, 'neon-posts'));
    count += list.length;
  }
  if (n('lamps')) {
    const list = [];
    const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
    for (let i = 0; i < n('lamps'); i++) {
      const s = (model.length * i) / n('lamps');
      const side = i % 2 ? 1 : -1;
      const off = model.wallOffset(s) + 1.6;
      model.pointAt(s, side * off, pt);
      list.push({ x: pt.x, y: model.heightAt(s, side * off), z: pt.z, rot: Math.atan2(pt.tx, pt.tz) + (side > 0 ? Math.PI / 2 : -Math.PI / 2) });
    }
    add(instanced(kitLamp(), mat, list, 'lamps'));
    const heads = list.map((it) => ({ x: it.x + Math.cos(it.rot) * 1.3, y: it.y + 6.82, z: it.z - Math.sin(it.rot) * 1.3, rot: it.rot, sx: 1.2, sy: 0.12, sz: 0.25 }));
    add(instanced(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: UI.chalk }), heads, 'lamp-heads', { colors: [UI.warnAmber] }));
    // pools of light on the road under each lamp
    const pools = list.map((it, i) => {
      const s = (model.length * i) / n('lamps');
      const side = i % 2 ? 1 : -1;
      const p2 = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
      const t = side * (model.halfWidthAt(s) - 2.5);
      model.pointAt(s, t, p2);
      return { x: p2.x, y: model.heightAt(s, t) + 0.04, z: p2.z, rot: 0, sx: 1, sy: 1, sz: 1 };
    });
    const poolGeo = new THREE.CircleGeometry(5.5, 12);
    poolGeo.rotateX(-Math.PI / 2);
    add(instanced(poolGeo, new THREE.MeshBasicMaterial({ color: UI.warnAmber, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }), pools, 'light-pools'));
    count += list.length;
  }
  // ---------------------------------------------------------------- trackside detail
  const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
  const L = model.length;
  const blocked = (s) => model.isGap(s) || model.isTunnel(s);
  const curv = (s) => Math.abs(model.kappa[model.index(s)]);

  // clouds: flat low-poly puffs high above the circuit (day themes)
  if (n('clouds') && !theme.night) {
    const b = new MeshBuilder();
    addCone(b, 0, 0, 0, 1, 0.35, 7, UI.chalk, UI.chalk);
    addCone(b, 0.6, 0.05, 0.3, 0.7, 0.3, 6, UI.chalk, UI.chalk);
    addCone(b, -0.55, 0.02, -0.2, 0.65, 0.28, 6, UI.chalk, UI.chalk);
    const geo = b.build();
    const list = [];
    for (let i = 0; i < n('clouds'); i++) {
      const a = rng.range(0, Math.PI * 2);
      const d = rng.range(0, radius + 500);
      const sc = rng.range(40, 90);
      list.push({ x: cx + Math.sin(a) * d, y: model.bounds.maxY + rng.range(160, 260), z: cz + Math.cos(a) * d, rot: rng.range(0, 6.28), sx: sc, sy: sc * 0.8, sz: sc * rng.range(0.5, 0.8) });
    }
    add(instanced(geo, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, transparent: true, opacity: 0.85 }), list, 'clouds'));
  }

  // catch fences: posts on the barriers + two rails (not in junctions / tunnels)
  if (want.fences) {
    const posts = [];
    const rails = new MeshBuilder();
    const railCol = shadeHex(theme.wall, -0.25);
    for (const side of [-1, 1]) {
      for (let s = 0; s < L; s += 9) {
        if (blocked(s) || blocked(s + 9)) continue;
        const off = side * (model.wallOffset(s) + WALL.thickness * 0.5);
        model.pointAt(s, off, pt);
        const top = model.heightAt(s, side * model.wallOffset(s)) + WALL.height;
        posts.push({ x: pt.x, y: top, z: pt.z, rot: 0, sx: 0.09, sy: 3.2, sz: 0.09 });
        const off1 = side * (model.wallOffset(s + 9) + WALL.thickness * 0.5);
        for (const hgt of [1.5, 3.1]) {
          model.pointAt(s, off, pt);
          const a = rails.v(pt.x, top + hgt, pt.z, railCol);
          const a2 = rails.v(pt.x, top + hgt + 0.08, pt.z, railCol);
          model.pointAt(s + 9, off1, pt);
          const top1 = model.heightAt(s + 9, side * model.wallOffset(s + 9)) + WALL.height;
          const c = rails.v(pt.x, top1 + hgt + 0.08, pt.z, railCol);
          const d = rails.v(pt.x, top1 + hgt, pt.z, railCol);
          rails.quad(a, a2, c, d);
        }
      }
    }
    add(instanced(kitBuilding({ props: shadeHex(theme.wall, -0.3) }), mat, posts, 'fence-posts'));
    const railMesh = new THREE.Mesh(rails.build(), new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }));
    railMesh.name = 'fence-rails';
    group.add(railMesh);
  }

  // wall banners along the straights (on the inner face of the barrier)
  if (n('banners')) {
    const list = [];
    const colors = [theme.accent, UI.chalk, UI.infoBlue, UI.red, UI.goodGreen];
    let placed = 0;
    for (let k = 0; k < 400 && placed < n('banners'); k++) {
      const s = rng.range(0, L);
      if (blocked(s) || curv(s) > 1 / 300 || curv(s + 12) > 1 / 300) continue;
      const side = rng.sign();
      const off = side * (model.wallOffset(s) - 0.03);
      model.pointAt(s, off, pt);
      const top = model.heightAt(s, off) + WALL.height;
      list.push({ x: pt.x, y: top - 0.62, z: pt.z, rot: Math.atan2(pt.tx, pt.tz), sx: 0.04, sy: 0.6, sz: 9 });
      placed++;
    }
    add(instanced(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: UI.chalk }), list, 'banners', { colors }));
    count += list.length;
  }

  // pit building behind the barrier along the start straight
  if (want.pits) {
    const b = new MeshBuilder();
    const side = 1;
    for (let s = -100; s < 40; s += 10) {
      const ss = model.wrapS(s);
      const off = side * (model.wallOffset(ss) + 16);
      model.pointAt(ss, off, pt);
      const y = model.heightAt(ss, side * model.wallOffset(ss)) - 0.3;
      const hd = Math.atan2(pt.tx, pt.tz);
      addBox(b, pt.x, y + 3, pt.z, 14, 6, 10.2, shadeHex(UI.chalk, -0.12), hd);
      // garage door facing the track
      model.pointAt(ss, side * (model.wallOffset(ss) + 8.95), pt);
      addBox(b, pt.x, y + 2, pt.z, 0.1, 3.6, 6.5, UI.void, hd);
      model.pointAt(ss, side * (model.wallOffset(ss) + 16), pt);
      addBox(b, pt.x, y + 6.3, pt.z, 14.4, 0.6, 10.4, theme.accent, hd);
    }
    const mesh = new THREE.Mesh(b.build(), mat);
    mesh.name = 'pits';
    group.add(mesh);
    for (let s = -100; s < 40; s += 10) {
      const ss = model.wrapS(s);
      model.pointAt(ss, side * (model.wallOffset(ss) + 16), pt);
      box(pt.x, model.heightAt(ss, side * model.wallOffset(ss)) - 0.3, pt.z, Math.atan2(pt.tx, pt.tz), -7.2, 7.2, -5.2, 5.2, 6.6);
    }
  }

  // braking boards (3 / 2 / 1 stripes at 150 / 100 / 50 m) before big corners
  if (want.boards) {
    const sets = [[], [], []];
    let straight = 0;
    for (let s = 0; s < L; s += 2) {
      const k = curv(s);
      if (k < 1 / 200) straight += 2;
      else {
        if (straight > 160 && k > 1 / 90) {
          const side = model.kappa[model.index(s)] > 0 ? 1 : -1; // outside of the corner
          [150, 100, 50].forEach((dist, j) => {
            const sb = model.wrapS(s - dist);
            if (blocked(sb)) return;
            const off = side * (model.wallOffset(sb) + 2.4);
            model.pointAt(sb, off, pt);
            sets[j].push({ x: pt.x, y: model.heightAt(sb, side * model.wallOffset(sb)) - 0.2, z: pt.z, rot: Math.atan2(pt.tx, pt.tz) + Math.PI / 2 });
          });
        }
        straight = 0;
      }
    }
    sets.forEach((list, j) => {
      const b = new MeshBuilder();
      addBox(b, 0, 1.5, 0, 0.2, 3, 0.2, SEMANTIC.carbon);
      addBox(b, 0, 3.4, 0, 2.2, 1.4, 0.14, UI.chalk);
      for (let k = 0; k < 3 - j; k++) addBox(b, -0.6 + k * 0.6, 3.4, 0.08, 0.32, 1.2, 0.02, SEMANTIC.kerbRed, 0);
      add(instanced(b.build(), mat, list, `brake-boards-${3 - j}`));
      count += list.length;
    });
  }

  // city billboards: big glowing panels on poles
  if (n('billboards')) {
    const list = [];
    for (let i = 0; i < n('billboards'); i++) {
      const s = (L * (i + rng.range(0.15, 0.85))) / n('billboards');
      if (blocked(s)) continue;
      const side = rng.sign();
      const off = side * (model.wallOffset(s) + 9);
      model.pointAt(s, off, pt);
      const ground = model.heightAt(s, side * model.wallOffset(s));
      list.push({ x: pt.x, y: ground + rng.range(9, 13), z: pt.z, ground, rot: Math.atan2(pt.tx, pt.tz) + Math.PI / 2 + rng.range(-0.3, 0.3), sx: rng.range(10, 16), sy: rng.range(4, 6), sz: 0.4 });
    }
    add(instanced(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: UI.chalk }), list, 'billboards', { colors: theme.neon || [theme.accent] }));
    const poles = list.map((it) => ({ x: it.x, y: it.ground, z: it.z, rot: it.rot, sx: 0.5, sy: it.y - it.ground - it.sy / 2, sz: 0.5 }));
    add(instanced(kitBuilding({ props: SEMANTIC.carbon }), mat, poles, 'billboard-poles'));
    for (const it of list) box(it.x, it.ground, it.z, it.rot, -it.sx / 2, it.sx / 2, -0.4, 0.4, it.y - it.ground + it.sy / 2);
    count += list.length;
  }
  track.group.add(group);
  return { count, meshes: group.children.length };
}
