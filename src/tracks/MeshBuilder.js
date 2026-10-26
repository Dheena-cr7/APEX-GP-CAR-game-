import * as THREE from 'three';
import { WHITE, BLACK } from '../core/Palette.js';

const _c = new THREE.Color();

/** Accumulates positions / colours / indices and emits one BufferGeometry. */
export class MeshBuilder {
  constructor() {
    this.pos = [];
    this.col = [];
    this.idx = [];
    this.uv = null;
  }

  get count() {
    return this.pos.length / 3;
  }

  /** Add a vertex with a palette colour (sRGB hex) or a THREE.Color. */
  v(x, y, z, color) {
    if (typeof color === 'number') _c.setHex(color);
    else _c.copy(color);
    this.pos.push(x, y, z);
    this.col.push(_c.r, _c.g, _c.b);
    return this.count - 1;
  }

  tri(a, b, c) {
    this.idx.push(a, b, c);
  }

  quad(a, b, c, d) {
    // a-b-c-d counter-clockwise when seen from the front
    this.idx.push(a, b, c, a, c, d);
  }

  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    if (this.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    const n = this.count;
    g.setIndex(n > 65535 ? new THREE.Uint32BufferAttribute(this.idx, 1) : new THREE.Uint16BufferAttribute(this.idx, 1));
    g.computeVertexNormals();
    g.computeBoundingSphere();
    g.computeBoundingBox();
    return g;
  }
}

/** Colour helper: blend a palette hex toward another by f, returns hex. */
export function mixHex(a, b, f) {
  const ar = (a >> 16) & 255;
  const ag = (a >> 8) & 255;
  const ab = a & 255;
  const br = (b >> 16) & 255;
  const bg = (b >> 8) & 255;
  const bb = b & 255;
  const r = Math.round(ar + (br - ar) * f);
  const g = Math.round(ag + (bg - ag) * f);
  const bl = Math.round(ab + (bb - ab) * f);
  return (r << 16) | (g << 8) | bl;
}

export function shadeHex(a, f) {
  return f >= 0 ? mixHex(a, WHITE, f) : mixHex(a, BLACK, -f);
}
