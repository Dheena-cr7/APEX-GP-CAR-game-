// Scenery: instanced trees, boulders, reeds, flowers, lily pads and cacti,
// placed on the terrain by noise. Each kind is one merged, vertex-coloured
// geometry drawn with a single InstancedMesh.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { fbm } from './Terrain.js';
import { mulberry32 } from '../sim/Sim.js';

function paint(geo, hex, jitter = 0, rng = Math.random) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const n = g.getAttribute('position').count;
  const col = new Float32Array(n * 3);
  const c = new THREE.Color(hex);
  for (let i = 0; i < n; i += 3) {
    const k = 1 + (rng() - 0.5) * jitter;
    for (let v = 0; v < 3 && i + v < n; v++) {
      col[(i + v) * 3] = c.r * k;
      col[(i + v) * 3 + 1] = c.g * k;
      col[(i + v) * 3 + 2] = c.b * k;
    }
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.deleteAttribute('uv');
  return g;
}

function lumpy(geo, amt, seed) {
  const p = geo.getAttribute('position');
  const rng = mulberry32(seed);
  const map = new Map();
  for (let i = 0; i < p.count; i++) {
    const key = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`;
    let k = map.get(key);
    if (k === undefined) map.set(key, (k = 1 + (rng() - 0.5) * amt));
    p.setXYZ(i, p.getX(i) * k, p.getY(i) * k, p.getZ(i) * k);
  }
  geo.computeVertexNormals();
  return geo;
}

const rngG = mulberry32(99);

const MAKERS = {
  broadleaf() {
    const trunk = paint(new THREE.CylinderGeometry(0.16, 0.24, 2.4, 6).translate(0, 1.2, 0), 0x6b4a2f, 0.2, rngG);
    const a = paint(lumpy(new THREE.IcosahedronGeometry(1.5, 1), 0.3, 1).translate(0, 3.2, 0), 0x4f9d3a, 0.25, rngG);
    const b = paint(lumpy(new THREE.IcosahedronGeometry(1.1, 1), 0.3, 2).translate(0.7, 2.7, 0.4), 0x63b444, 0.25, rngG);
    const c = paint(lumpy(new THREE.IcosahedronGeometry(1.0, 1), 0.3, 3).translate(-0.6, 3.6, -0.3), 0x5aa83f, 0.25, rngG);
    return mergeGeometries([trunk, a, b, c]);
  },
  birch() {
    const trunk = paint(new THREE.CylinderGeometry(0.12, 0.17, 3.4, 6).translate(0, 1.7, 0), 0xe9e4d8, 0.15, rngG);
    const a = paint(lumpy(new THREE.IcosahedronGeometry(1.15, 1), 0.35, 4).translate(0, 3.9, 0), 0x8cc63f, 0.25, rngG);
    const b = paint(lumpy(new THREE.IcosahedronGeometry(0.8, 1), 0.35, 5).translate(0.4, 3.2, 0.3), 0x9fd14a, 0.25, rngG);
    return mergeGeometries([trunk, a, b]);
  },
  pine(snowy = false) {
    const parts = [paint(new THREE.CylinderGeometry(0.14, 0.22, 1.6, 6).translate(0, 0.8, 0), 0x5a3d26, 0.2, rngG)];
    const greens = [0x2f5d34, 0x356a3a, 0x3b7541];
    for (let i = 0; i < 4; i++) {
      const r = 1.6 - i * 0.33, h = 1.9 - i * 0.2;
      const y = 1.3 + i * 1.05;
      parts.push(paint(new THREE.ConeGeometry(r, h, 7).translate(0, y + h / 2, 0), greens[i % 3], 0.2, rngG));
      if (snowy) parts.push(paint(new THREE.ConeGeometry(r * 0.62, h * 0.42, 7).translate(0, y + h * 0.8, 0), 0xf3f8fc, 0.05, rngG));
    }
    return mergeGeometries(parts);
  },
  pineSnow() {
    return MAKERS.pine(true);
  },
  cactus() {
    const g = 0x5f8f3e;
    const parts = [
      paint(new THREE.CapsuleGeometry(0.32, 2.6, 4, 8).translate(0, 1.6, 0), g, 0.12, rngG),
      paint(new THREE.CapsuleGeometry(0.2, 0.8, 4, 8).rotateZ(Math.PI / 2).translate(0.5, 1.5, 0), g, 0.12, rngG),
      paint(new THREE.CapsuleGeometry(0.2, 0.9, 4, 8).translate(0.95, 2.0, 0), g, 0.12, rngG),
      paint(new THREE.CapsuleGeometry(0.18, 0.6, 4, 8).rotateZ(Math.PI / 2).translate(-0.42, 1.1, 0), g, 0.12, rngG),
      paint(new THREE.CapsuleGeometry(0.17, 0.7, 4, 8).translate(-0.75, 1.5, 0), g, 0.12, rngG),
    ];
    return mergeGeometries(parts);
  },
  shrub() {
    return mergeGeometries([
      paint(lumpy(new THREE.IcosahedronGeometry(0.8, 1), 0.4, 6).scale(1, 0.7, 1).translate(0, 0.45, 0), 0x8a8a3c, 0.3, rngG),
      paint(lumpy(new THREE.IcosahedronGeometry(0.55, 1), 0.4, 7).scale(1, 0.7, 1).translate(0.6, 0.35, 0.2), 0x9c8f43, 0.3, rngG),
    ]);
  },
  boulder() {
    return paint(lumpy(new THREE.DodecahedronGeometry(1, 1), 0.45, 8).scale(1, 0.7, 1), 0x8a877e, 0.25, rngG);
  },
  reeds() {
    const parts = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const r = 0.15 + (i % 3) * 0.12;
      const h = 1.0 + (i % 4) * 0.28;
      parts.push(paint(new THREE.ConeGeometry(0.05, h, 4).translate(Math.cos(a) * r, h / 2, Math.sin(a) * r), i % 2 ? 0x6e8f3a : 0x83a543, 0.2, rngG));
      if (i % 3 === 0) parts.push(paint(new THREE.CylinderGeometry(0.06, 0.06, 0.28, 5).translate(Math.cos(a) * r, h + 0.05, Math.sin(a) * r), 0x6b4a2a, 0.1, rngG));
    }
    return mergeGeometries(parts);
  },
  flowers() {
    const parts = [];
    const cols = [0xffd23f, 0xff6f91, 0xffffff, 0xb28dff, 0xff8c42];
    for (let i = 0; i < 6; i++) {
      const a = i * 2.4, r = 0.2 + (i % 3) * 0.25;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      parts.push(paint(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 3).translate(x, 0.2, z), 0x4f8f30, 0, rngG));
      parts.push(paint(new THREE.IcosahedronGeometry(0.09, 0).translate(x, 0.42, z), cols[i % cols.length], 0.1, rngG));
    }
    return mergeGeometries(parts);
  },
  ferns() {
    const parts = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      parts.push(paint(new THREE.PlaneGeometry(0.28, 1.1).translate(0, 0.55, 0).rotateX(-0.6).rotateY(a), 0x4a8a35, 0.2, rngG));
    }
    return mergeGeometries(parts);
  },
  lily() {
    const pad = new THREE.CircleGeometry(0.75, 12, 0.3, Math.PI * 2 - 0.6).rotateX(-Math.PI / 2);
    const parts = [paint(pad, 0x4e9a3a, 0.2, rngG)];
    return mergeGeometries(parts);
  },
  lilyFlower() {
    const parts = [paint(new THREE.CircleGeometry(0.6, 10, 0.3, Math.PI * 2 - 0.6).rotateX(-Math.PI / 2), 0x5aa843, 0.2, rngG)];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      parts.push(paint(new THREE.ConeGeometry(0.1, 0.32, 4).rotateZ(0.9).rotateY(a).translate(Math.cos(a) * 0.08 + 0.15, 0.12, Math.sin(a) * 0.08), 0xffa6c9, 0.15, rngG));
    }
    parts.push(paint(new THREE.IcosahedronGeometry(0.07, 0).translate(0.15, 0.16, 0), 0xffe066, 0, rngG));
    return mergeGeometries(parts);
  },
  iceChunk() {
    return paint(lumpy(new THREE.DodecahedronGeometry(1, 0), 0.5, 9).scale(1, 0.45, 1), 0xd4eef8, 0.15, rngG);
  },
};

const MAT_CACHE = new Map();
function mat(kind) {
  if (!MAT_CACHE.has(kind)) {
    const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: kind === 'iceChunk' ? 0.35 : 0.9, metalness: 0, flatShading: true, side: kind === 'ferns' ? THREE.DoubleSide : THREE.FrontSide });
    MAT_CACHE.set(kind, m);
  }
  return MAT_CACHE.get(kind);
}

/**
 * Place scenery around the river.
 * @returns {THREE.Group}
 */
export function buildScenery(terrain, river, theme, course, quality, hazardsAvoid) {
  const group = new THREE.Group();
  group.name = 'scenery';
  const rng = mulberry32(course.id.length * 1013 + 7);
  const density = quality === 'low' ? 0.45 : quality === 'medium' ? 0.75 : 1;
  const lists = new Map();
  const add = (kind, x, y, z, s, rot, sy = s) => {
    if (!lists.has(kind)) lists.set(kind, []);
    lists.get(kind).push([x, y, z, s, rot, sy]);
  };
  const { x0, z0, nx, nz, cell } = terrain;
  const step = 2;
  for (let j = 0; j < nz; j += step) {
    for (let i = 0; i < nx; i += step) {
      const x = x0 + i * cell + (rng() - 0.5) * cell * step;
      const z = z0 + j * cell + (rng() - 0.5) * cell * step;
      const d = terrain.distAt(x, z);
      if (d < -1 || d > 150) continue;
      const y = terrain.heightAt(x, z);
      const slope = terrain.slopeAt(x, z);
      const n = fbm(x * 0.03 + 5, z * 0.03 + 9, 3);
      const roll = rng();
      // trees: clumps by noise, thinner near the water, none on cliffs
      if (d > 6 && slope < 0.35) {
        const p = theme.treeDensity * density * Math.max(0, n * 1.8 - 0.55) * (d < 14 ? 0.5 : 1) * (d > 110 ? 0.4 : 1);
        if (roll < p * 0.5) {
          const kind = theme.trees[Math.floor(rng() * theme.trees.length)];
          const s = 0.75 + rng() * 0.75;
          add(kind, x, y - 0.1, z, s, rng() * Math.PI * 2, s * (0.9 + rng() * 0.3));
          continue;
        }
      }
      if (theme.extras.includes('boulders') && d > 2.5 && d < 60 && roll > 0.985 - 0.01 * density) {
        const s = 0.5 + rng() * 1.6;
        add('boulder', x, y - s * 0.25, z, s, rng() * 6.28, s * (0.7 + rng() * 0.4));
        continue;
      }
      if (theme.extras.includes('reeds') && d > -0.6 && d < 2.6 && roll < 0.35 * density) {
        add('reeds', x, y - 0.1, z, 0.8 + rng() * 0.6, rng() * 6.28);
        continue;
      }
      if (theme.extras.includes('flowers') && d > 4 && d < 45 && slope < 0.3 && roll > 1 - 0.09 * density * n * 2) {
        add('flowers', x, y, z, 0.8 + rng() * 0.6, rng() * 6.28);
        continue;
      }
      if (theme.extras.includes('ferns') && d > 3 && d < 40 && slope < 0.4 && roll > 1 - 0.07 * density) {
        add('ferns', x, y, z, 0.8 + rng() * 0.7, rng() * 6.28);
        continue;
      }
      if (theme.extras.includes('iceChunks') && d > 0.5 && d < 18 && roll > 1 - 0.03 * density) {
        const s = 0.5 + rng() * 1.2;
        add('iceChunk', x, y - s * 0.2, z, s, rng() * 6.28);
      }
    }
  }
  // lily pads on calm water away from the racing line and hazards
  if (course.lilies) {
    for (let s = 20; s < river.length - 25; s += 1.3) {
      for (const side of [-1, 1]) {
        if (rng() > 0.5) continue;
        const u = side * (0.6 + rng() * 0.33);
        const p = river.pointU(s, u);
        if (hazardsAvoid(p.x, p.z, 3)) continue;
        const y = river.at(river.h, s) + 0.03;
        add(rng() < 0.12 ? 'lilyFlower' : 'lily', p.x, y, p.z, 0.7 + rng() * 0.6, rng() * 6.28);
      }
    }
  }
  // build: one InstancedMesh per kind per 72 m tile, so tiles off screen
  // (and outside the shadow camera) are culled instead of drawn
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const TILE = 110;
  for (const [kind, items] of lists) {
    const maker = MAKERS[kind];
    if (!maker || !items.length) continue;
    const geo = maker();
    const tiles = new Map();
    for (const it of items) {
      const key = Math.floor(it[0] / TILE) * 4096 + Math.floor(it[2] / TILE);
      if (!tiles.has(key)) tiles.set(key, []);
      tiles.get(key).push(it);
    }
    const tall = kind === 'broadleaf' || kind === 'pine' || kind === 'pineSnow' || kind === 'birch' || kind === 'cactus' || kind === 'boulder';
    for (const list of tiles.values()) {
      const im = new THREE.InstancedMesh(geo, mat(kind), list.length);
      list.forEach(([x, y, z, s, rot, sy], k) => {
        ps.set(x, y, z);
        q.setFromAxisAngle(yAxis, rot);
        sc.set(s, sy, s);
        m4.compose(ps, q, sc);
        im.setMatrixAt(k, m4);
      });
      im.instanceMatrix.needsUpdate = true;
      im.computeBoundingSphere();
      im.castShadow = tall && quality === 'high';
      im.receiveShadow = kind !== 'lily' && kind !== 'lilyFlower';
      im.name = 'scenery-' + kind;
      group.add(im);
    }
  }
  return group;
}

export { paint, lumpy };
