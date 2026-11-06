// Land around the river: a height field whose shape comes from the distance
// to the water's edge (beach -> bank -> cliffs / hills -> mountains), with
// vertex colours by height, slope and noise. Also answers height queries for
// the camera and scenery.

import * as THREE from 'three';

// ---------------------------------------------------------------- noise

function hash2(x, y) {
  let h = (x | 0) * 374761393 + (y | 0) * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fbm(x, y, oct = 4) {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) {
    v += vnoise(x * f, y * f) * a;
    f *= 2.02;
    a *= 0.5;
  }
  return v;
}

const smooth = (e0, e1, x) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

// ---------------------------------------------------------------- terrain

export class Terrain {
  constructor(river, theme, { cell = 2.2, margin = 150, seed = 1 } = {}) {
    this.river = river;
    this.theme = theme;
    this.seed = seed;
    const bb = river.bbox;
    this.x0 = bb.minX - margin;
    this.z0 = bb.minZ - margin;
    this.cell = cell;
    this.nx = Math.ceil((bb.maxX - bb.minX + margin * 2) / cell) + 1;
    this.nz = Math.ceil((bb.maxZ - bb.minZ + margin * 2) / cell) + 1;
    const N = this.nx * this.nz;
    this.hgt = new Float32Array(N);
    this.dist = new Float32Array(N); // distance from the water edge (m, + = land)
    this.wl = new Float32Array(N); // water level of the nearest stretch
    this._build();
  }

  /** Edge distance + nearest water level for a world point. */
  _measure(x, z, hint) {
    const r = this.river;
    const pr = r.project(x, z, hint, this._pr || (this._pr = { s: 0, t: 0, i: 0 }));
    const i = pr.i;
    let d = Math.abs(pr.t) - r.hw[i];
    // behind the start dock and beyond the finish bay is land
    const dx = x - r.x[i], dz = z - r.z[i];
    const along = dx * r.tx[i] + dz * r.tz[i];
    if (i === 0 && along < 0) d = Math.max(d, -along - 1);
    if (i === r.n - 1 && along > 0) d = Math.max(d, along - 1);
    return { d, wl: r.h[i], i, s: pr.s };
  }

  _profile(d, x, z, wl) {
    const th = this.theme;
    const n1 = fbm(x * 0.018 + this.seed * 7.1, z * 0.018 - this.seed * 3.3, 4);
    const n2 = fbm(x * 0.06 + 11, z * 0.06 - 5, 3);
    if (d < 0) {
      // riverbed (hidden under the opaque water, keeps the shoreline clean)
      return wl - 0.35 + Math.max(-3, d * 0.55);
    }
    let y = wl - 0.35;
    y += smooth(0, 2.5, d) * 0.85; // beach lip
    y += smooth(1.5, 6, d) * 0.6 * n2;
    if (th.cliff) {
      // cliffs: a steep wall a few metres back, its height broken by noise
      const start = 4 + n2 * 4;
      const wall = smooth(start, start + 7 + n1 * 5, d);
      y += wall * (th.cliff * (0.65 + n1 * 0.8));
      if (th.strata) {
        // canyon terraces
        const t2 = smooth(start + 18, start + 24, d);
        y += t2 * th.cliff * 0.75;
      }
    }
    // rolling hills further back
    y += smooth(6, 40, d) * th.hills * (n1 * 1.3 - 0.15);
    // mountains in the distance
    y += smooth(45, 140, d) * th.mountains * (0.4 + n1 * 1.2);
    return y;
  }

  _build() {
    const { nx, nz, cell, x0, z0 } = this;
    let hint = -1;
    for (let j = 0; j < nz; j++) {
      for (let i = 0; i < nx; i++) {
        const x = x0 + i * cell, z = z0 + j * cell;
        const m = this._measure(x, z, hint);
        // hints only help inside the sample window of the projector
        hint = m.d < 60 ? m.i : -1;
        const k = j * nx + i;
        this.dist[k] = m.d;
        this.wl[k] = m.wl;
        this.hgt[k] = this._profile(m.d, x, z, m.wl);
      }
      hint = -1;
    }
  }

  /** Bilinear height at a world point. */
  heightAt(x, z) {
    const fx = (x - this.x0) / this.cell, fz = (z - this.z0) / this.cell;
    const i = Math.max(0, Math.min(this.nx - 2, Math.floor(fx)));
    const j = Math.max(0, Math.min(this.nz - 2, Math.floor(fz)));
    const u = Math.max(0, Math.min(1, fx - i)), v = Math.max(0, Math.min(1, fz - j));
    const k = j * this.nx + i;
    const a = this.hgt[k], b = this.hgt[k + 1], c = this.hgt[k + this.nx], d = this.hgt[k + this.nx + 1];
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }

  distAt(x, z) {
    const i = Math.max(0, Math.min(this.nx - 1, Math.round((x - this.x0) / this.cell)));
    const j = Math.max(0, Math.min(this.nz - 1, Math.round((z - this.z0) / this.cell)));
    return this.dist[j * this.nx + i];
  }

  waterAt(x, z) {
    const i = Math.max(0, Math.min(this.nx - 1, Math.round((x - this.x0) / this.cell)));
    const j = Math.max(0, Math.min(this.nz - 1, Math.round((z - this.z0) / this.cell)));
    return this.wl[j * this.nx + i];
  }

  /** Normal-ish slope (0 flat .. 1 vertical) from the grid. */
  slopeAt(x, z) {
    const e = this.cell;
    const hx = this.heightAt(x + e, z) - this.heightAt(x - e, z);
    const hz = this.heightAt(x, z + e) - this.heightAt(x, z - e);
    const n = 1 / Math.hypot(hx / (2 * e), 1, hz / (2 * e));
    return 1 - n;
  }

  buildMesh({ maxDist = 175 } = {}) {
    const { nx, nz, cell, x0, z0, theme } = this;
    const N = nx * nz;
    const pos = new Float32Array(N * 3);
    for (let j = 0; j < nz; j++) {
      for (let i = 0; i < nx; i++) {
        const k = j * nx + i;
        pos[k * 3] = x0 + i * cell;
        pos[k * 3 + 1] = this.hgt[k];
        pos[k * 3 + 2] = z0 + j * cell;
      }
    }
    // triangles, filed into square tiles for frustum culling
    const T = 56; // cells per tile side
    const tiles = new Map();
    const all = [];
    for (let j = 0; j < nz - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1;
        // skip triangles far from the river (hidden by fog anyway)
        if (Math.min(this.dist[a], this.dist[b], this.dist[c], this.dist[d]) > maxDist) continue;
        // skip triangles fully under the water
        if (Math.max(this.dist[a], this.dist[b], this.dist[c], this.dist[d]) < -4) continue;
        const key = Math.floor(i / T) * 4096 + Math.floor(j / T);
        let t = tiles.get(key);
        if (!t) tiles.set(key, (t = { idx: [], minY: Infinity, maxY: -Infinity, i0: Math.floor(i / T) * T, j0: Math.floor(j / T) * T }));
        t.idx.push(a, c, b, b, c, d);
        for (const v of [a, b, c, d]) {
          const y = this.hgt[v];
          if (y < t.minY) t.minY = y;
          if (y > t.maxY) t.maxY = y;
        }
        all.push(a, c, b, b, c, d);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setIndex(all);
    g.computeVertexNormals();
    // colours
    const nrm = g.getAttribute('normal');
    const col = new Float32Array(N * 3);
    const L = theme.land;
    const C = (h) => new THREE.Color(h);
    const wet = C(L.wet), sand = C(L.sand), grass = C(L.grass), grass2 = C(L.grass2), rock = C(L.rock), cliff = C(L.cliff);
    const snow = L.snow ? C(L.snow) : null;
    const tmp = new THREE.Color(), tmp2 = new THREE.Color();
    for (let k = 0; k < N; k++) {
      const x = pos[k * 3], y = pos[k * 3 + 1], z = pos[k * 3 + 2];
      const d = this.dist[k];
      const up = nrm.getY(k);
      const above = y - this.wl[k];
      const n = fbm(x * 0.08, z * 0.08, 3);
      const n2 = fbm(x * 0.012 + 40, z * 0.012, 2);
      // base: wet edge -> sand -> grass mix
      if (d < 1.2) tmp.copy(wet);
      else if (d < 3.5) tmp.copy(wet).lerp(sand, smooth(1.2, 3.5, d));
      else tmp.copy(sand).lerp(grass, smooth(3.5, 7, d));
      if (d >= 3.5) {
        tmp2.copy(grass).lerp(grass2, smooth(0.35, 0.65, n2));
        tmp.lerp(tmp2, smooth(5, 9, d));
      }
      // steep = rock
      const steep = smooth(0.82, 0.6, up);
      tmp2.copy(rock).lerp(cliff, n);
      if (theme.strata) {
        // canyon bands
        const band = Math.sin(above * 1.15 + n * 2.0) * 0.5 + 0.5;
        tmp2.lerp(sand, band * 0.35);
        tmp2.multiplyScalar(0.85 + 0.25 * Math.sin(above * 0.45));
      }
      tmp.lerp(tmp2, steep);
      // snow on high / flat ground
      if (snow) {
        const sn = smooth(1.5, 4, above + n * 3) * smooth(0.55, 0.8, up);
        tmp.lerp(snow, Math.max(sn, smooth(4, 10, above) * 0.85));
      }
      // subtle variation
      tmp.multiplyScalar(0.9 + n * 0.2);
      col[k * 3] = tmp.r;
      col[k * 3 + 1] = tmp.g;
      col[k * 3 + 2] = tmp.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, metalness: 0, flatShading: false });
    // world-space detail noise so the ground never looks like flat paint
    mat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vWorldPos;')
        .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', `#include <common>
          varying vec3 vWorldPos;
          float gHash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
          float gNoise(vec2 p) { vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(gHash(i), gHash(i + vec2(1, 0)), u.x), mix(gHash(i + vec2(0, 1)), gHash(i + vec2(1, 1)), u.x), u.y); }`)
        .replace('#include <color_fragment>', `#include <color_fragment>
          float gn = gNoise(vWorldPos.xz * 0.9) * 0.5 + gNoise(vWorldPos.xz * 3.7) * 0.3 + gNoise(vWorldPos.xz * 0.15) * 0.4;
          diffuseColor.rgb *= 0.82 + gn * 0.3;`);
    };
    const group = new THREE.Group();
    group.name = 'terrain';
    // tiles share the vertex buffers; each has its own index and bounds
    for (const t of tiles.values()) {
      const tg = new THREE.BufferGeometry();
      tg.setAttribute('position', g.getAttribute('position'));
      tg.setAttribute('normal', g.getAttribute('normal'));
      tg.setAttribute('color', g.getAttribute('color'));
      tg.setIndex(t.idx);
      const cx = x0 + (t.i0 + T / 2) * cell, cz = z0 + (t.j0 + T / 2) * cell;
      const half = (T / 2) * cell;
      const cy = (t.minY + t.maxY) / 2;
      tg.boundingSphere = new THREE.Sphere(new THREE.Vector3(cx, cy, cz), Math.hypot(half, half, (t.maxY - t.minY) / 2) + 1);
      tg.boundingBox = new THREE.Box3(new THREE.Vector3(cx - half, t.minY, cz - half), new THREE.Vector3(cx + half, t.maxY, cz + half));
      const mesh = new THREE.Mesh(tg, mat);
      mesh.receiveShadow = true;
      mesh.name = 'terrain-tile';
      group.add(mesh);
    }
    g.setIndex(null);
    this._shared = g;
    return group;
  }
}
