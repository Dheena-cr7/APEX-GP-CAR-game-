import * as THREE from 'three';
import { TrackModel } from './TrackModel.js';
import { MeshBuilder, shadeHex, mixHex } from './MeshBuilder.js';
import { buildProps } from './PropFactory.js';
import { THEMES, SEMANTIC, css } from '../core/Palette.js';
import { createRng } from '../core/Random.js';
import { KERB, WALL } from '../cars/Sizes.js';
import { disposeObject } from '../scenes/SceneKit.js';

const ROW_STEP = 2; // samples per road row (~2 m)
const LINE_W = 0.35;
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Runtime track: model + meshes + start lights. */
export class Track {
  constructor(def) {
    this.def = def;
    this.theme = THEMES[def.theme];
    this.model = null;
    this.group = new THREE.Group();
    this.group.name = `track-${def.id}`;
    this.startLightMats = [];
    this.lightsOn = -1;
    this.propInfo = null;
    this.stats = { triangles: 0 };
  }

  /** Grid slot k (0 = pole) in track space. */
  gridSlot(k) {
    const m = this.model;
    const hw = m.halfWidthAt(0);
    return { s: m.wrapS(-14 - k * 9), t: (k % 2 === 0 ? -1 : 1) * hw * 0.28 };
  }

  /** Light n of 5 start lights (0 = all off, 5 = all on). */
  setStartLights(n) {
    if (n === this.lightsOn) return;
    this.lightsOn = n;
    for (let i = 0; i < this.startLightMats.length; i++) {
      const on = i < n;
      const m = this.startLightMats[i];
      m.color.setHex(on ? SEMANTIC.startLight : SEMANTIC.startLightOff);
      m.emissive.setHex(on ? SEMANTIC.startLight : SEMANTIC.startLightOff);
      m.emissiveIntensity = on ? 2.2 : 0.2;
    }
  }

  dispose() {
    disposeObject(this.group);
    if (this.group.parent) this.group.parent.remove(this.group);
  }
}

/**
 * Build a track as a sequence of steps (a generator) so the loading screen
 * can show real progress: each `yield` reports {progress, label}.
 */
export function* buildTrackSteps(def, { quality, propDensity = 1 } = {}) {
  const track = new Track(def);
  const theme = track.theme;
  const rng = createRng(def.seed);

  yield { progress: 0.05, label: 'Tracing centreline' };
  const model = new TrackModel(def);
  track.model = model;

  yield { progress: 0.15, label: 'Laying asphalt' };
  const vertexMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
  const road = new THREE.Mesh(buildRoad(model, theme), vertexMat);
  road.name = 'road';
  road.receiveShadow = true;
  track.group.add(road);

  yield { progress: 0.3, label: 'Kerbs and runoff' };
  const runoff = new THREE.Mesh(buildRunoff(model, theme), vertexMat);
  runoff.name = 'runoff';
  runoff.receiveShadow = true;
  track.group.add(runoff);
  const kerbMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide });
  const kerbs = new THREE.Mesh(buildKerbs(model), kerbMat);
  kerbs.name = 'kerbs';
  kerbs.receiveShadow = true;
  track.group.add(kerbs);

  yield { progress: 0.45, label: 'Barriers' };
  const wallMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide });
  const walls = new THREE.Mesh(buildWalls(model, theme), wallMat);
  walls.name = 'walls';
  walls.receiveShadow = true;
  walls.castShadow = false;
  track.group.add(walls);

  yield { progress: 0.58, label: 'Terrain' };
  const terrain = new THREE.Mesh(buildTerrain(model, def, theme, rng), vertexMat);
  terrain.name = 'terrain';
  terrain.receiveShadow = true;
  track.group.add(terrain);
  const far = new THREE.Mesh(new THREE.CircleGeometry(4000, 32), new THREE.MeshLambertMaterial({ color: theme.groundAlt }));
  far.rotation.x = -Math.PI / 2;
  far.position.set((model.bounds.minX + model.bounds.maxX) / 2, model.bounds.minY - 1.5, (model.bounds.minZ + model.bounds.maxZ) / 2);
  far.name = 'far-ground';
  track.group.add(far);

  yield { progress: 0.7, label: 'Start line' };
  buildStartArea(track, model, theme);

  yield { progress: 0.8, label: 'Scenery' };
  track.propInfo = buildProps(track, model, def, theme, rng, propDensity * (quality ? quality.propDensity : 1));

  yield { progress: 0.92, label: 'Finishing' };
  let tris = 0;
  track.group.traverse((o) => {
    if (o.isMesh && o.geometry.index) tris += (o.geometry.index.count / 3) * (o.isInstancedMesh ? o.count : 1);
    o.matrixAutoUpdate = false;
    o.updateMatrix();
  });
  track.stats.triangles = tris;
  track.setStartLights(0);
  return track;
}

/** Synchronous build (tests, menu backdrop). */
export function buildTrack(def, opts) {
  const it = buildTrackSteps(def, opts);
  let r = it.next();
  while (!r.done) r = it.next();
  return r.value;
}

// ---------------------------------------------------------------- road

function rowIndices(model, step) {
  const rows = [];
  for (let i = 0; i < model.n; i += step) rows.push(i);
  return rows;
}

function buildRoad(model, theme) {
  const b = new MeshBuilder();
  const rows = rowIndices(model, ROW_STEP);
  const p = { x: 0, y: 0, z: 0 };
  const q = { x: 0, y: 0, z: 0 };
  for (let r = 0; r < rows.length; r++) {
    const i0 = rows[r];
    const i1 = rows[(r + 1) % rows.length];
    const s0 = i0 * model.ds;
    const s1 = r + 1 < rows.length ? i1 * model.ds : model.length;
    const hw0 = model.width[i0] / 2;
    const hw1 = model.width[i1] / 2;
    // subtle patching every ~8 m
    const patch = Math.floor(s0 / 8);
    const shade = ((patch * 2654435761) >>> 0) % 7;
    const roadCol = shadeHex(theme.road, (shade - 3) * 0.012);
    const bands = [
      [-hw0, -hw0 + LINE_W, -hw1, -hw1 + LINE_W, theme.roadLine],
      [-hw0 + LINE_W, hw0 - LINE_W, -hw1 + LINE_W, hw1 - LINE_W, roadCol],
      [hw0 - LINE_W, hw0, hw1 - LINE_W, hw1, theme.roadLine],
    ];
    for (const [a0, b0, a1, b1, col] of bands) {
      model.pointAt(s0, a0, p);
      const va = b.v(p.x, p.y, p.z, col);
      model.pointAt(s0, b0, q);
      const vb = b.v(q.x, q.y, q.z, col);
      model.pointAt(s1, b1, p);
      const vc = b.v(p.x, p.y, p.z, col);
      model.pointAt(s1, a1, q);
      const vd = b.v(q.x, q.y, q.z, col);
      b.quad(va, vb, vc, vd);
    }
  }
  return b.build();
}

function buildKerbs(model) {
  const b = new MeshBuilder();
  const p = { x: 0, y: 0, z: 0 };
  for (const side of [-1, 1]) {
    const flags = side > 0 ? model.kerbR : model.kerbL;
    for (let i = 0; i < model.n; i++) {
      const j = (i + 1) % model.n;
      if (!flags[i] || !flags[j]) continue;
      const s0 = i * model.ds;
      const s1 = j === 0 ? model.length : j * model.ds;
      const block = Math.floor(s0 / KERB.block) % 2;
      const col = block ? SEMANTIC.kerbRed : SEMANTIC.kerbWhite;
      const in0 = side * (model.width[i] / 2 - 0.05);
      const in1 = side * (model.width[j] / 2 - 0.05);
      const out0 = in0 + side * KERB.width;
      const out1 = in1 + side * KERB.width;
      const lift = 0.012;
      model.pointAt(s0, in0, p);
      const a = b.v(p.x, p.y + lift, p.z, col);
      model.pointAt(s0, out0, p);
      const c0 = b.v(p.x, p.y + KERB.height, p.z, col);
      model.pointAt(s1, out1, p);
      const c1 = b.v(p.x, p.y + KERB.height, p.z, col);
      model.pointAt(s1, in1, p);
      const d = b.v(p.x, p.y + lift, p.z, col);
      if (side > 0) b.quad(a, c0, c1, d);
      else b.quad(c0, a, d, c1);
    }
  }
  return b.build();
}

function buildRunoff(model, theme) {
  const b = new MeshBuilder();
  const rows = rowIndices(model, ROW_STEP);
  const p = { x: 0, y: 0, z: 0 };
  for (const side of [-1, 1]) {
    const sand = side > 0 ? model.sandR : model.sandL;
    for (let r = 0; r < rows.length; r++) {
      const i0 = rows[r];
      const i1 = rows[(r + 1) % rows.length];
      const s0 = i0 * model.ds;
      const s1 = r + 1 < rows.length ? i1 * model.ds : model.length;
      const stripe = Math.floor(s0 / 12) % 2;
      const col = sand[i0] ? shadeHex(theme.runoff, stripe ? 0.02 : -0.02) : stripe ? theme.ground : theme.groundAlt;
      const a0 = side * (model.width[i0] / 2 - 0.02);
      const a1 = side * (model.width[i1] / 2 - 0.02);
      const o0 = side * (model.width[i0] / 2 + model.runoff + 0.2);
      const o1 = side * (model.width[i1] / 2 + model.runoff + 0.2);
      const dy = -0.03;
      model.pointAt(s0, a0, p);
      const va = b.v(p.x, p.y + dy, p.z, col);
      model.pointAt(s0, o0, p);
      const vb = b.v(p.x, p.y + dy, p.z, col);
      model.pointAt(s1, o1, p);
      const vc = b.v(p.x, p.y + dy, p.z, col);
      model.pointAt(s1, a1, p);
      const vd = b.v(p.x, p.y + dy, p.z, col);
      if (side > 0) b.quad(va, vb, vc, vd);
      else b.quad(vb, va, vd, vc);
    }
  }
  return b.build();
}

function buildWalls(model, theme) {
  const b = new MeshBuilder();
  const rows = rowIndices(model, ROW_STEP);
  const p = { x: 0, y: 0, z: 0 };
  const H = WALL.height;
  const T = WALL.thickness;
  const base = shadeHex(theme.wall, -0.35);
  const top = shadeHex(theme.wall, 0.08);
  for (const side of [-1, 1]) {
    for (let r = 0; r < rows.length; r++) {
      const i0 = rows[r];
      const i1 = rows[(r + 1) % rows.length];
      const s0 = i0 * model.ds;
      const s1 = r + 1 < rows.length ? i1 * model.ds : model.length;
      if (model.isGap(s0) || model.isGap(s1)) continue;
      const w0 = side * (model.width[i0] / 2 + model.runoff);
      const w1 = side * (model.width[i1] / 2 + model.runoff);
      const stripe = Math.floor(s0 / 6) % 2 === 0;
      const face = stripe ? theme.wall : shadeHex(theme.wall, -0.08);
      // inner face: base band + upper band
      const bands = [
        [0, 0.28, base],
        [0.28, H, face],
      ];
      for (const [y0, y1, col] of bands) {
        model.pointAt(s0, w0, p);
        const a = b.v(p.x, p.y + y0 - 0.3 * (y0 === 0 ? 1 : 0), p.z, col);
        const c = b.v(p.x, p.y + y1, p.z, col);
        model.pointAt(s1, w1, p);
        const d = b.v(p.x, p.y + y1, p.z, col);
        const e = b.v(p.x, p.y + y0 - 0.3 * (y0 === 0 ? 1 : 0), p.z, col);
        b.quad(a, c, d, e);
      }
      // top cap
      model.pointAt(s0, w0, p);
      const t0 = b.v(p.x, p.y + H, p.z, top);
      model.pointAt(s0, w0 + side * T, p);
      const t1 = b.v(p.x, p.y + H, p.z, top);
      model.pointAt(s1, w1 + side * T, p);
      const t2 = b.v(p.x, p.y + H, p.z, top);
      model.pointAt(s1, w1, p);
      const t3 = b.v(p.x, p.y + H, p.z, top);
      b.quad(t0, t1, t2, t3);
      // outer face
      model.pointAt(s0, w0 + side * T, p);
      const o0 = b.v(p.x, p.y - 0.4, p.z, base);
      const o1 = b.v(p.x, p.y + H, p.z, base);
      model.pointAt(s1, w1 + side * T, p);
      const o2 = b.v(p.x, p.y + H, p.z, base);
      const o3 = b.v(p.x, p.y - 0.4, p.z, base);
      b.quad(o0, o1, o2, o3);
    }
  }
  return b.build();
}

// ---------------------------------------------------------------- terrain

const HILLS = { beginner: 6, street: 0, speed: 0.6, technical: 16, garage: 0 };

function buildTerrain(model, def, theme, rng) {
  const bnd = model.bounds;
  const wallT = model.halfWidthMax + model.runoff;
  const margin = wallT + 240;
  const step = 10;
  const x0 = Math.floor((bnd.minX - margin) / step) * step;
  const z0 = Math.floor((bnd.minZ - margin) / step) * step;
  const nx = Math.ceil((bnd.maxX + margin - x0) / step) + 1;
  const nz = Math.ceil((bnd.maxZ + margin - z0) / step) + 1;

  // bin centreline samples for nearest lookup
  const BIN = 40;
  const bins = new Map();
  const key = (bx, bz) => bx * 100003 + bz;
  for (let i = 0; i < model.n; i += 2) {
    const k = key(Math.floor(model.px[i] / BIN), Math.floor(model.pz[i] / BIN));
    let arr = bins.get(k);
    if (!arr) bins.set(k, (arr = []));
    arr.push(i);
  }
  const amp = HILLS[def.theme] ?? 4;
  const ph = [rng.range(0, 6.28), rng.range(0, 6.28), rng.range(0, 6.28), rng.range(0, 6.28)];
  const meanY = (bnd.minY + bnd.maxY) / 2;
  const hill = (x, z) =>
    amp *
    (0.55 * Math.sin(x * 0.011 + ph[0]) * Math.sin(z * 0.013 + ph[1]) +
      0.3 * Math.sin(x * 0.027 + ph[2]) * Math.cos(z * 0.023 + ph[3]) +
      0.15 * Math.sin((x + z) * 0.05 + ph[0]));

  const heights = new Float32Array(nx * nz);
  const colors = [];
  const p = { s: 0, t: 0, i: 0 };
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      const x = x0 + i * step;
      const z = z0 + j * step;
      const bx = Math.floor(x / BIN);
      const bz = Math.floor(z / BIN);
      let best = -1;
      let bestD = Infinity;
      for (let dz = -2; dz <= 2; dz++) {
        for (let dx = -2; dx <= 2; dx++) {
          const arr = bins.get(key(bx + dx, bz + dz));
          if (!arr) continue;
          for (const idx of arr) {
            const ddx = x - model.px[idx];
            const ddz = z - model.pz[idx];
            const d = ddx * ddx + ddz * ddz;
            if (d < bestD) {
              bestD = d;
              best = idx;
            }
          }
        }
      }
      let y;
      if (best < 0) {
        y = meanY + hill(x, z) * 1.6;
      } else {
        model.project(x, z, best, p);
        const d = Math.abs(p.t);
        const near = model.heightAt(p.s, Math.max(-wallT, Math.min(wallT, p.t))) - 0.35;
        const w = smooth(wallT + 16, wallT + 75, d);
        const far = meanY + hill(x, z) * (1 + smooth(150, 400, d) * 0.6);
        y = near + (far - near) * w;
        if (d < wallT + 16) y = Math.min(y, near);
      }
      heights[j * nx + i] = y;
      const n = ((i * 73856093) ^ (j * 19349663)) >>> 0;
      colors.push(mixHex(theme.ground, theme.groundAlt, (n % 100) / 100));
    }
  }
  const b = new MeshBuilder();
  for (let j = 0; j < nz; j++) {
    for (let i = 0; i < nx; i++) {
      b.v(x0 + i * step, heights[j * nx + i], z0 + j * step, colors[j * nx + i]);
    }
  }
  for (let j = 0; j < nz - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const a = j * nx + i;
      const bb = (j + 1) * nx + i;
      const c = (j + 1) * nx + i + 1;
      const d = j * nx + i + 1;
      b.quad(a, bb, c, d);
    }
  }
  return b.build();
}

// ---------------------------------------------------------------- start area

function checkerTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 16;
  const g = c.getContext('2d');
  const white = css(SEMANTIC.gridLine);
  const black = css(SEMANTIC.hazardBlack);
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 8; x++) {
      g.fillStyle = (x + y) % 2 ? white : black;
      g.fillRect(x * 8, y * 8, 8, 8);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}

function buildStartArea(track, model, theme) {
  const group = new THREE.Group();
  group.name = 'start-area';
  const p = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
  const hw = model.halfWidthAt(0);
  // checkered line across the road at s = 0
  {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const uv = [];
    const corners = [
      [-1.2, -hw, 0, 0],
      [-1.2, hw, 1, 0],
      [1.2, hw, 1, 1],
      [1.2, -hw, 0, 1],
    ];
    for (const [ds, t, u, v] of corners) {
      model.pointAt(ds, t, p);
      pos.push(p.x, p.y + 0.02, p.z);
      uv.push(u * Math.round(hw / 2), v);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    geo.computeVertexNormals();
    const tex = checkerTexture();
    tex.wrapS = THREE.RepeatWrapping;
    const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    mesh.receiveShadow = true;
    mesh.name = 'finish-line';
    group.add(mesh);
  }
  // grid boxes
  {
    const b = new MeshBuilder();
    const col = SEMANTIC.gridLine;
    for (let k = 0; k < 8; k++) {
      const slot = track.gridSlot(k);
      const sFront = slot.s + 2.6;
      const t0 = slot.t - 1.3;
      const t1 = slot.t + 1.3;
      const bar = (sa, sb, ta, tb) => {
        model.pointAt(sa, ta, p);
        const a = b.v(p.x, p.y + 0.025, p.z, col);
        model.pointAt(sa, tb, p);
        const c = b.v(p.x, p.y + 0.025, p.z, col);
        model.pointAt(sb, tb, p);
        const d = b.v(p.x, p.y + 0.025, p.z, col);
        model.pointAt(sb, ta, p);
        const e = b.v(p.x, p.y + 0.025, p.z, col);
        b.quad(a, c, d, e);
      };
      bar(sFront - 0.3, sFront, t0, t1);
      bar(sFront - 2.2, sFront, t0, t0 + 0.25);
      bar(sFront - 2.2, sFront, t1 - 0.25, t1);
    }
    const mesh = new THREE.Mesh(b.build(), new THREE.MeshLambertMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    mesh.name = 'grid-boxes';
    group.add(mesh);
  }
  // gantry with five start lights
  {
    const gantryMat = new THREE.MeshLambertMaterial({ color: SEMANTIC.carbon, flatShading: true });
    // pillars stand outside the barriers so neither cars nor the camera can reach them
    const span = model.wallOffset(0.5) + WALL.thickness + 1.0;
    const height = 6.2;
    const pillarGeo = new THREE.BoxGeometry(0.6, height, 0.6);
    for (const side of [-1, 1]) {
      model.pointAt(0.5, side * span, p);
      const pillar = new THREE.Mesh(pillarGeo, gantryMat);
      pillar.position.set(p.x, model.heightAt(0.5, side * model.wallOffset(0.5)) + height / 2 - 0.4, p.z);
      pillar.castShadow = true;
      group.add(pillar);
      (track.propBoxes || (track.propBoxes = [])).push({ minX: p.x - 0.45, maxX: p.x + 0.45, minY: pillar.position.y - height / 2, maxY: pillar.position.y + height / 2, minZ: p.z - 0.45, maxZ: p.z + 0.45 });
    }
    model.pointAt(0.5, 0, p);
    const heading = Math.atan2(p.tx, p.tz);
    const beam = new THREE.Mesh(new THREE.BoxGeometry(span * 2 + 0.6, 0.9, 0.7), gantryMat);
    beam.position.set(p.x, p.y + height, p.z);
    beam.rotation.y = heading;
    beam.castShadow = true;
    group.add(beam);
    const podGeo = new THREE.BoxGeometry(0.9, 0.9, 0.3);
    const lampGeo = new THREE.CircleGeometry(0.3, 12);
    for (let i = 0; i < 5; i++) {
      const tOff = (i - 2) * 1.3;
      model.pointAt(0.5, tOff, p);
      const pod = new THREE.Mesh(podGeo, gantryMat);
      pod.position.set(p.x, p.y + height - 0.9, p.z);
      pod.rotation.y = heading;
      group.add(pod);
      const mat = new THREE.MeshLambertMaterial({ color: SEMANTIC.startLightOff, emissive: SEMANTIC.startLightOff, emissiveIntensity: 0.2 });
      const lamp = new THREE.Mesh(lampGeo, mat);
      // face the approaching cars (they look along +tangent, so the lamp faces -tangent)
      model.pointAt(0.5 - 0.17, tOff, p);
      lamp.position.set(p.x, p.y + height - 0.9, p.z);
      lamp.rotation.y = heading + Math.PI;
      group.add(lamp);
      track.startLightMats.push(mat);
    }
    // accent banner on the beam
    const banner = new THREE.Mesh(new THREE.BoxGeometry(span * 2 - 2, 0.5, 0.75), new THREE.MeshLambertMaterial({ color: theme.accent }));
    model.pointAt(0.5, 0, p);
    banner.position.set(p.x, p.y + height + 0.7, p.z);
    banner.rotation.y = heading;
    group.add(banner);
  }
  track.group.add(group);
}
