// Procedural models: the raft, the crew ("Puffs"), hazards, gates, docks and
// shells. Static parts are merged into vertex-coloured geometries so each
// model costs only a few draw calls.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { paint, lumpy } from './Scenery.js';
import { mulberry32 } from '../sim/Sim.js';
import { CREW_COLORS } from './Themes.js';

const rng = mulberry32(4242);
const P = (geo, hex, j = 0.08) => paint(geo, hex, j, rng);

const MATS = {};

// Cartoon outline: the same mesh drawn slightly inflated, back faces only,
// in a dark ink colour. Works on smooth geometry (spheres, cylinders).
const OUTLINE_MAT = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  uniforms: { uColor: { value: new THREE.Color(0x1d2433) }, uThick: { value: 0.03 } },
  vertexShader: `
    uniform float uThick;
    void main() {
      vec3 p = position + normal * uThick;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`,
  fragmentShader: `
    uniform vec3 uColor;
    void main() { gl_FragColor = vec4(uColor, 1.0); }`,
});
const OUTLINES = new Map();
function outlineMat(thick) {
  if (!OUTLINES.has(thick)) {
    const m = OUTLINE_MAT.clone();
    m.uniforms.uThick.value = thick;
    OUTLINES.set(thick, m);
  }
  return OUTLINES.get(thick);
}
/** Add an ink outline as a child of `mesh`. */
export function addOutline(mesh, thick = 0.03) {
  const o = new THREE.Mesh(mesh.geometry, outlineMat(thick));
  o.name = 'outline';
  o.renderOrder = mesh.renderOrder;
  mesh.add(o);
  return o;
}
export function vcMat(key = 'wood', opts = {}) {
  if (!MATS[key]) MATS[key] = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0, ...opts });
  return MATS[key];
}

// ---------------------------------------------------------------- raft

export function buildRaft() {
  const group = new THREE.Group();
  group.name = 'raft';
  const parts = [];
  // seven logs along the local x axis
  const logs = 7;
  const r = 0.29;
  for (let i = 0; i < logs; i++) {
    const z = -1.74 + (i * 3.48) / (logs - 1);
    const len = 4.15 + (rng() - 0.5) * 0.35;
    const bark = [0x8a5a33, 0x7a4f2c, 0x94643a][i % 3];
    const log = new THREE.CylinderGeometry(r, r * 1.04, len, 10, 1, true).rotateZ(Math.PI / 2).translate((rng() - 0.5) * 0.15, 0, z);
    parts.push(P(log, bark, 0.18));
    for (const sx of [-1, 1]) {
      const cap = new THREE.CircleGeometry(r, 10).rotateY((sx * Math.PI) / 2).translate((sx * len) / 2, 0, z);
      parts.push(P(cap, 0xd9b382, 0.06));
      const ring = new THREE.RingGeometry(r * 0.35, r * 0.45, 10).rotateY((sx * Math.PI) / 2).translate((sx * len) / 2 + sx * 0.002, 0, z);
      parts.push(P(ring, 0xa87d50, 0.04));
    }
  }
  // cross beams and rope lashings
  for (const x of [-1.45, 1.45]) {
    parts.push(P(new THREE.BoxGeometry(0.34, 0.16, 4.1).translate(x, r + 0.05, 0), 0x6a4426, 0.1));
    for (let i = 0; i < logs; i += 2) {
      const z = -1.74 + (i * 3.48) / (logs - 1);
      parts.push(P(new THREE.TorusGeometry(0.3, 0.035, 5, 10).rotateY(Math.PI / 2).translate(x, 0.06, z), 0xd8c39a, 0.05));
    }
  }
  // the central crate and mast
  parts.push(P(new THREE.BoxGeometry(0.9, 0.55, 0.9).translate(0, r + 0.3, 0), 0xb07a45, 0.06));
  for (const a of [-0.3, 0, 0.3]) parts.push(P(new THREE.BoxGeometry(0.92, 0.04, 0.12).translate(0, r + 0.12 + (a + 0.3) * 0.55, 0.455), 0x8a5a33, 0));
  parts.push(P(new THREE.CylinderGeometry(0.08, 0.1, 3.4, 8).translate(0, r + 0.55 + 1.7, 0), 0x6a4426, 0.05));
  parts.push(P(new THREE.SphereGeometry(0.13, 8, 6).translate(0, r + 0.55 + 3.45, 0), 0xffc93c, 0));
  // little lantern
  parts.push(P(new THREE.BoxGeometry(0.18, 0.24, 0.18).translate(0.12, r + 1.7, 0.12), 0xffe08a, 0));
  // a barrel and a coil of rope for character
  parts.push(P(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 10).translate(1.62, r + 0.27, 1.62), 0x8b5e34, 0.08));
  parts.push(P(new THREE.TorusGeometry(0.2, 0.06, 6, 12).rotateX(Math.PI / 2).translate(-1.6, r + 0.08, -1.6), 0xd8c39a, 0.05));
  const geo = mergeGeometries(parts);
  const mesh = new THREE.Mesh(geo, vcMat('wood'));
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  addOutline(mesh, 0.035);

  // flag: a cloth strip animated in update()
  const flagGeo = new THREE.PlaneGeometry(1.2, 0.7, 10, 4).translate(0.6, 0, 0);
  const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: 0xff6f59, roughness: 0.7, side: THREE.DoubleSide }));
  flag.position.set(0.05, r + 0.55 + 3.0, 0);
  flag.castShadow = true;
  flag.userData.base = Float32Array.from(flagGeo.getAttribute('position').array);
  group.add(flag);
  group.userData.flag = flag;
  group.userData.deck = r + 0.06;
  return group;
}

export function animateFlag(flag, time, wind = 1) {
  const pos = flag.geometry.getAttribute('position');
  const base = flag.userData.base;
  for (let i = 0; i < pos.count; i++) {
    const x = base[i * 3];
    const w = Math.sin(x * 4.2 - time * 7 * wind) * 0.12 * x + Math.sin(x * 9 - time * 11) * 0.03 * x;
    pos.setZ(i, w);
    pos.setY(i, base[i * 3 + 1] - x * 0.06);
  }
  pos.needsUpdate = true;
  flag.geometry.computeVertexNormals();
}

// ---------------------------------------------------------------- crew

function hatParts(hat) {
  const parts = [];
  const top = 0.66;
  if (hat === 0) {
    // sailor cap
    parts.push(P(new THREE.CylinderGeometry(0.2, 0.22, 0.13, 14).translate(0, top, 0), 0xffffff, 0.02));
    parts.push(P(new THREE.CylinderGeometry(0.21, 0.21, 0.035, 14).translate(0, top - 0.06, 0), 0x22344f, 0.02));
    parts.push(P(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 12, 1, false, -0.9, 1.8).translate(0.07, top - 0.07, 0), 0x22344f, 0.02));
  } else if (hat === 1) {
    // beanie with a pom
    parts.push(P(new THREE.SphereGeometry(0.22, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, top - 0.08, 0), 0xe63946, 0.04));
    parts.push(P(new THREE.CylinderGeometry(0.225, 0.225, 0.07, 14).translate(0, top - 0.08, 0), 0xf1faee, 0.02));
    parts.push(P(new THREE.SphereGeometry(0.07, 8, 6).translate(0, top + 0.16, 0), 0xf1faee, 0.04));
  } else if (hat === 2) {
    // tricorn
    const tri = new THREE.CylinderGeometry(0.3, 0.32, 0.1, 3).rotateY(Math.PI / 6).translate(0, top - 0.04, 0);
    parts.push(P(tri, 0x1d1d28, 0.04));
    parts.push(P(new THREE.CylinderGeometry(0.15, 0.19, 0.16, 12).translate(0, top + 0.05, 0), 0x1d1d28, 0.04));
    parts.push(P(new THREE.SphereGeometry(0.04, 6, 5).translate(0.24, top + 0.0, 0), 0xffd23f, 0));
  } else {
    // straw hat
    parts.push(P(new THREE.CylinderGeometry(0.36, 0.38, 0.03, 16).translate(0, top - 0.05, 0), 0xe9c46a, 0.08));
    parts.push(P(new THREE.CylinderGeometry(0.17, 0.2, 0.15, 14).translate(0, top + 0.03, 0), 0xe9c46a, 0.08));
    parts.push(P(new THREE.CylinderGeometry(0.205, 0.205, 0.05, 14).translate(0, top - 0.01, 0), 0xd62828, 0.02));
  }
  return parts;
}

/** A crew member. Forward is local +x. */
export function buildCrew(colorIndex, hat) {
  const col = CREW_COLORS[colorIndex % CREW_COLORS.length];
  const group = new THREE.Group();
  const bodyParts = [
    P(new THREE.SphereGeometry(0.32, 22, 16).scale(1, 0.95, 1).translate(0, 0.36, 0), col.body, 0.03),
    P(new THREE.SphereGeometry(0.22, 16, 12).scale(0.55, 0.95, 0.95).translate(0.2, 0.31, 0), col.belly, 0.02),
  ];
  for (const sz of [-1, 1]) {
    bodyParts.push(P(new THREE.SphereGeometry(0.09, 12, 10).translate(0.24, 0.47, sz * 0.115), 0xffffff, 0));
    bodyParts.push(P(new THREE.SphereGeometry(0.05, 10, 8).translate(0.315, 0.475, sz * 0.115), 0x141414, 0));
    bodyParts.push(P(new THREE.SphereGeometry(0.017, 6, 5).translate(0.355, 0.495, sz * 0.105), 0xffffff, 0));
    bodyParts.push(P(new THREE.SphereGeometry(0.05, 8, 6).scale(0.4, 0.7, 1).translate(0.29, 0.37, sz * 0.19), 0xff9eae, 0));
    // little wings / arms
    bodyParts.push(P(new THREE.SphereGeometry(0.09, 10, 8).scale(0.6, 1, 0.45).translate(0.02, 0.33, sz * 0.31), col.body, 0.05));
  }
  // smile
  bodyParts.push(P(new THREE.TorusGeometry(0.05, 0.012, 5, 10, Math.PI).rotateY(Math.PI / 2).rotateX(Math.PI).translate(0.31, 0.405, 0), 0x3b1f1f, 0));
  bodyParts.push(...hatParts(hat % 4));
  const body = new THREE.Mesh(mergeGeometries(bodyParts), vcMat('crew', { roughness: 0.5 }));
  body.castShadow = true;
  group.add(body);
  addOutline(body, 0.022);

  const footGeo = P(new THREE.SphereGeometry(0.085, 10, 8).scale(1.4, 0.6, 1), 0xff9f1c, 0.03);
  const feet = [];
  for (const sz of [-1, 1]) {
    const f = new THREE.Mesh(footGeo, vcMat('crew'));
    f.position.set(0.04, 0.05, sz * 0.13);
    f.castShadow = true;
    group.add(f);
    addOutline(f, 0.018);
    feet.push(f);
  }

  // the gust horn on the back, its bell facing backward (local -x)
  const prof = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    prof.push(new THREE.Vector2(0.05 + Math.pow(t, 3.2) * 0.17, t * 0.42));
  }
  const bell = new THREE.LatheGeometry(prof, 16);
  bell.rotateZ(Math.PI / 2);
  bell.translate(-0.08, 0, 0);
  const tube = new THREE.TorusGeometry(0.1, 0.03, 6, 12, Math.PI * 1.2).rotateY(Math.PI / 2).translate(-0.02, 0.06, 0);
  const hornGeo = mergeGeometries([
    P(bell, 0xe0a83a, 0.02),
    P(tube, 0xc58f2a, 0.02),
    P(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 6).rotateX(Math.PI / 2).translate(0.12, 0.08, 0), 0x6b4226, 0),
  ]);
  const horn = new THREE.Mesh(hornGeo, vcMat('brass', { roughness: 0.28, metalness: 0.75 }));
  horn.position.set(-0.22, 0.42, 0);
  horn.rotation.z = 0.35;
  horn.castShadow = true;
  group.add(horn);
  addOutline(horn, 0.018);

  // coloured ring + push arrow on the deck
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.33, 0.42, 24).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: col.body, transparent: true, opacity: 0.85, depthWrite: false }),
  );
  ring.position.y = 0.012;
  ring.renderOrder = 2;
  const arrowShape = new THREE.Shape();
  arrowShape.moveTo(0.45, -0.1);
  arrowShape.lineTo(1.05, -0.1);
  arrowShape.lineTo(1.05, -0.24);
  arrowShape.lineTo(1.4, 0);
  arrowShape.lineTo(1.05, 0.24);
  arrowShape.lineTo(1.05, 0.1);
  arrowShape.lineTo(0.45, 0.1);
  arrowShape.lineTo(0.45, -0.1);
  const arrow = new THREE.Mesh(
    new THREE.ShapeGeometry(arrowShape).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: col.body, transparent: true, opacity: 0.0, depthWrite: false }),
  );
  arrow.position.y = 0.015;
  arrow.renderOrder = 2;
  const marks = new THREE.Group();
  marks.add(ring, arrow);

  group.userData = { body, feet, horn, ring, arrow, marks, color: col.body };
  return group;
}

/** Name tag sprite. */
export function nameTag(text, colorCss) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const g = c.getContext('2d');
  g.font = '700 34px Fredoka, Nunito, "Segoe UI", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  const w = Math.min(240, g.measureText(text).width + 34);
  g.fillStyle = 'rgba(20,28,44,0.72)';
  const x = (256 - w) / 2;
  g.beginPath();
  g.roundRect(x, 10, w, 44, 22);
  g.fill();
  g.fillStyle = colorCss;
  g.beginPath();
  g.arc(x + 20, 32, 7, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#ffffff';
  g.fillText(text, 128 + 8, 33);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, transparent: true }));
  s.scale.set(2.3, 0.575, 1);
  s.renderOrder = 5;
  return s;
}

// ---------------------------------------------------------------- hazards

export function rockGeometry(r, seed, colorHex, mossHex) {
  const g = lumpy(new THREE.IcosahedronGeometry(r, 2), 0.32, seed).scale(1, 0.85, 1);
  const ng = g.index ? g.toNonIndexed() : g;
  const pos = ng.getAttribute('position');
  const col = new Float32Array(pos.count * 3);
  const c1 = new THREE.Color(colorHex), c2 = new THREE.Color(mossHex), t = new THREE.Color();
  const lr = mulberry32(seed + 1);
  for (let i = 0; i < pos.count; i += 3) {
    const y = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3 / r;
    t.copy(c1).lerp(c2, Math.max(0, Math.min(1, (y - 0.25) * 2.2))).multiplyScalar(0.85 + lr() * 0.3);
    for (let v = 0; v < 3; v++) {
      col[(i + v) * 3] = t.r;
      col[(i + v) * 3 + 1] = t.g;
      col[(i + v) * 3 + 2] = t.b;
    }
  }
  ng.setAttribute('color', new THREE.BufferAttribute(col, 3));
  ng.deleteAttribute('uv');
  ng.computeVertexNormals();
  return ng;
}

export function buildLog(len) {
  const r = 0.42;
  const parts = [
    P(new THREE.CylinderGeometry(r, r * 0.95, len, 12, 1, true).rotateZ(Math.PI / 2), 0x6e4a2b, 0.2),
    P(new THREE.CircleGeometry(r, 12).rotateY(Math.PI / 2).translate(len / 2, 0, 0), 0xd2a874, 0.05),
    P(new THREE.CircleGeometry(r * 0.95, 12).rotateY(-Math.PI / 2).translate(-len / 2, 0, 0), 0xd2a874, 0.05),
    P(new THREE.RingGeometry(r * 0.3, r * 0.4, 12).rotateY(Math.PI / 2).translate(len / 2 + 0.003, 0, 0), 0x9b7046, 0),
    P(new THREE.CylinderGeometry(0.08, 0.05, 0.6, 5).rotateX(0.5).translate(len * 0.2, 0.3, 0.2), 0x5a3b22, 0.1),
    P(new THREE.ConeGeometry(0.22, 0.4, 5).translate(len * 0.2 + 0.05, 0.6, 0.38), 0x4f9a3a, 0.2),
  ];
  const m = new THREE.Mesh(mergeGeometries(parts), vcMat('wood'));
  m.castShadow = true;
  addOutline(m, 0.04);
  return m;
}

export function buildSpinner(def) {
  const group = new THREE.Group();
  const post = mergeGeometries([
    P(new THREE.CylinderGeometry(0.62, 0.72, 3.6, 12).translate(0, 0.6, 0), 0x7d7a72, 0.2),
    P(new THREE.CylinderGeometry(0.7, 0.7, 0.25, 12).translate(0, 2.35, 0), 0x5a3b22, 0.1),
    P(new THREE.ConeGeometry(0.85, 0.9, 12).translate(0, 2.9, 0), 0xc0392b, 0.08),
  ]);
  const pm = new THREE.Mesh(post, vcMat('wood'));
  pm.castShadow = true;
  group.add(pm);
  const arm = new THREE.Group();
  const arms = def.arms || 2;
  const parts = [];
  for (let a = 0; a < arms; a++) {
    const ang = (a / arms) * Math.PI * 2;
    const beam = new THREE.BoxGeometry(def.len, 0.32, 0.36).translate(def.len / 2 + 0.3, 0.55, 0).rotateY(-ang);
    parts.push(P(beam, 0x8b5a2b, 0.12));
    for (let k = 1; k <= 3; k++) {
      const d = (def.len * k) / 3.2 + 0.3;
      const paddle = new THREE.BoxGeometry(0.16, 0.95, 0.9).translate(d, 0.35, 0).rotateY(-ang);
      parts.push(P(paddle, k % 2 ? 0xe9c46a : 0xd94f30, 0.08));
    }
  }
  const am = new THREE.Mesh(mergeGeometries(parts), vcMat('wood'));
  am.castShadow = true;
  arm.add(am);
  group.add(arm);
  group.userData.arm = arm;
  return group;
}

export function buildFloe(r, seed) {
  const g = new THREE.CylinderGeometry(r, r * 0.9, 0.7, 11, 1);
  lumpy(g, 0.22, seed);
  const ng = g.index ? g.toNonIndexed() : g;
  const pos = ng.getAttribute('position');
  const col = new Float32Array(pos.count * 3);
  const top = new THREE.Color(0xf5fbff), side = new THREE.Color(0x9fd3ea);
  for (let i = 0; i < pos.count; i++) {
    const c = pos.getY(i) > 0.2 ? top : side;
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  ng.setAttribute('color', new THREE.BufferAttribute(col, 3));
  ng.deleteAttribute('uv');
  ng.computeVertexNormals();
  // a snow cap
  const cap = P(lumpy(new THREE.IcosahedronGeometry(r * 0.55, 1), 0.3, seed + 3).scale(1, 0.35, 1).translate(r * 0.15, 0.4, 0), 0xffffff, 0.05);
  const m = new THREE.Mesh(mergeGeometries([ng, cap]), vcMat('ice', { roughness: 0.3 }));
  m.castShadow = true;
  return m;
}

// ---------------------------------------------------------------- shells

export function shellGeometry() {
  // a scallop: a fan of ridged wedges, gold
  const parts = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = -1.1 + (i / (n - 1)) * 2.2;
    const wedge = new THREE.ConeGeometry(0.11, 0.62, 4, 1).rotateZ(-Math.PI / 2).translate(0.31, 0, 0).rotateY(a);
    parts.push(P(wedge, i % 2 ? 0xffd166 : 0xffc23d, 0));
  }
  parts.push(P(new THREE.BoxGeometry(0.2, 0.12, 0.2).translate(0, 0, 0), 0xf4a81d, 0));
  const g = mergeGeometries(parts);
  g.rotateZ(Math.PI / 2);
  g.translate(0, 0.25, 0);
  return g;
}

// ---------------------------------------------------------------- gates & docks

function bannerTexture(text, a, b) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 96;
  const g = c.getContext('2d');
  const sq = 24;
  for (let y = 0; y < 96; y += sq) for (let x = 0; x < 512; x += sq) {
    g.fillStyle = ((x + y) / sq) % 2 ? a : b;
    g.fillRect(x, y, sq, sq);
  }
  g.fillStyle = 'rgba(20,30,50,0.85)';
  g.beginPath();
  g.roundRect(120, 12, 272, 72, 36);
  g.fill();
  g.font = '700 50px Fredoka, Nunito, "Segoe UI", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = '#ffffff';
  g.fillText(text, 256, 50);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Checkpoint: two striped buoys and a rope of pennants across the river. */
export function buildCheckpoint(river, s, index) {
  const group = new THREE.Group();
  const hw = river.at(river.hw, s);
  const y = river.at(river.h, s);
  const L = river.point(s, hw * 0.98), R = river.point(s, -hw * 0.98);
  const posts = [];
  for (const p of [L, R]) {
    const parts = [];
    for (let k = 0; k < 6; k++) parts.push(P(new THREE.CylinderGeometry(0.22, 0.24, 0.8, 10).translate(0, 0.4 + k * 0.8, 0), k % 2 ? 0xffffff : 0xe63946, 0.02));
    parts.push(P(new THREE.SphereGeometry(0.55, 14, 10).scale(1, 0.6, 1).translate(0, 0, 0), 0xffd23f, 0.03));
    parts.push(P(new THREE.SphereGeometry(0.25, 10, 8).translate(0, 4.95, 0), 0xffd23f, 0.02));
    const m = new THREE.Mesh(mergeGeometries(parts), vcMat('buoy', { roughness: 0.45 }));
    m.position.set(p.x, y - 0.1, p.z);
    m.castShadow = true;
    group.add(m);
    posts.push(m);
  }
  // pennant rope
  const n = Math.max(8, Math.round((hw * 2) / 1.3));
  const flags = [];
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const x = L.x + (R.x - L.x) * f, z = L.z + (R.z - L.z) * f;
    const sag = Math.sin(f * Math.PI) * 0.9;
    pts.push(new THREE.Vector3(x, y + 4.8 - sag, z));
  }
  const rope = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n * 3, 0.03, 4), new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.9 }));
  group.add(rope);
  const dirx = R.x - L.x, dirz = R.z - L.z;
  const ang = Math.atan2(dirz, dirx);
  const tri = new THREE.BufferGeometry();
  tri.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-0.32, 0, 0, 0.32, 0, 0, 0, -0.75, 0]), 3));
  tri.computeVertexNormals();
  const flagMats = [new THREE.MeshStandardMaterial({ color: 0xffd23f, side: THREE.DoubleSide, roughness: 0.7 }), new THREE.MeshStandardMaterial({ color: 0x2ec4d6, side: THREE.DoubleSide, roughness: 0.7 })];
  for (let i = 1; i < n; i++) {
    const m = new THREE.Mesh(tri, flagMats[i % 2]);
    m.position.copy(pts[i]);
    m.rotation.y = -ang;
    group.add(m);
    flags.push(m);
  }
  // number board in the middle
  const board = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.8), new THREE.MeshBasicMaterial({ map: bannerTexture('CHECKPOINT ' + (index + 1), '#ffd23f', '#2ec4d6'), side: THREE.DoubleSide, transparent: true }));
  const mid = pts[Math.floor(n / 2)];
  board.position.set(mid.x, mid.y + 0.75, mid.z);
  board.rotation.y = -ang;
  group.add(board);
  group.userData = { flags, flagMats, passed: false };
  return group;
}

/** Finish: a timber arch with a chequered banner, and a dock in the bay. */
export function buildFinish(river, s) {
  const group = new THREE.Group();
  const hw = river.at(river.hw, s);
  const y = river.at(river.h, s);
  const L = river.point(s, hw + 1.2), R = river.point(s, -hw - 1.2);
  const parts = [];
  for (const p of [L, R]) {
    parts.push(P(new THREE.BoxGeometry(0.7, 9, 0.7).translate(p.x, y + 3.6, p.z), 0x7a4f2c, 0.1));
    parts.push(P(new THREE.ConeGeometry(0.75, 1.1, 4).rotateY(Math.PI / 4).translate(p.x, y + 8.6, p.z), 0xd94f30, 0.05));
  }
  const towers = new THREE.Mesh(mergeGeometries(parts), vcMat('wood'));
  towers.castShadow = true;
  group.add(towers);
  const w = Math.hypot(R.x - L.x, R.z - L.z);
  const ang = Math.atan2(R.z - L.z, R.x - L.x);
  const banner = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.6), new THREE.MeshStandardMaterial({ map: bannerTexture('FINISH', '#1b1f2a', '#ffffff'), side: THREE.DoubleSide, roughness: 0.8 }));
  banner.position.set((L.x + R.x) / 2, y + 6.6, (L.z + R.z) / 2);
  banner.rotation.y = -ang;
  banner.castShadow = true;
  group.add(banner);
  return group;
}

/** Wooden pier along the bank. */
export function buildDock(river, s, side, length = 10) {
  const parts = [];
  const hw = river.at(river.hw, s);
  const y = river.at(river.h, s) + 0.55;
  for (let k = 0; k < length; k++) {
    const p = river.point(s - length / 2 + k, side * (hw - 0.6));
    const ang = river.heading(s - length / 2 + k);
    const plank = new THREE.BoxGeometry(0.9, 0.12, 3.2).rotateY(-ang).translate(p.x, y, p.z);
    parts.push(P(plank, k % 2 ? 0xa0703f : 0x8f6234, 0.1));
    if (k % 3 === 0) {
      for (const o of [-1.4, 1.4]) {
        const q = river.point(s - length / 2 + k, side * (hw - 0.6) + o);
        parts.push(P(new THREE.CylinderGeometry(0.14, 0.14, 2.4, 6).translate(q.x, y - 0.7, q.z), 0x5a3b22, 0.1));
      }
    }
  }
  const m = new THREE.Mesh(mergeGeometries(parts), vcMat('wood'));
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Rainbow arch over a waterfall. */
export function buildRainbow(x, y, z, heading, radius) {
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      vec3 hsv(float h){ vec3 k = vec3(1.0, 2.0/3.0, 1.0/3.0); vec3 p = abs(fract(vec3(h) + k) * 6.0 - 3.0); return clamp(p - 1.0, 0.0, 1.0); }
      void main(){
        float t = vUv.y;
        vec3 c = hsv(0.83 * (1.0 - t));
        float a = smoothstep(0.0, 0.2, t) * smoothstep(1.0, 0.8, t) * 0.38;
        a *= smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
        gl_FragColor = vec4(c, a);
      }`,
  });
  const g = new THREE.RingGeometry(radius * 0.86, radius, 48, 1, 0, Math.PI);
  // uv: x around the arc, y across the band
  const uv = g.getAttribute('uv');
  const pos = g.getAttribute('position');
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i), py = pos.getY(i);
    const r = Math.hypot(px, py);
    const a = Math.atan2(py, px);
    uv.setXY(i, a / Math.PI, (r - radius * 0.86) / (radius * 0.14));
  }
  const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z);
  m.rotation.y = -heading + Math.PI / 2;
  m.renderOrder = 3;
  return m;
}
