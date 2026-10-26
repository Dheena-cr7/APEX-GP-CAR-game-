import * as THREE from 'three';
import { SEMANTIC } from '../core/Palette.js';

// Pooled skid marks: a ring buffer of quads in one geometry (one draw call).
// When the pool is full the oldest marks are overwritten.

const _c = new THREE.Color();

export class SkidMarks {
  constructor(capacity = 800) {
    this.cap = capacity;
    this.next = 0;
    this.count = 0;
    this.pos = new Float32Array(capacity * 4 * 3);
    this.col = new Float32Array(capacity * 4 * 4);
    const idx = new Uint32Array(capacity * 6);
    for (let i = 0; i < capacity; i++) {
      const v = i * 4;
      idx.set([v, v + 1, v + 2, v, v + 2, v + 3], i * 6);
    }
    const g = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.colAttr = new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('position', this.posAttr);
    g.setAttribute('color', this.colAttr);
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.name = 'skidmarks';
    this.dirty = false;
    _c.setHex(SEMANTIC.skid);
    this.r = _c.r;
    this.g = _c.g;
    this.b = _c.b;
  }

  /** Add one segment from (x0,y0,z0) to (x1,y1,z1). */
  add(x0, y0, z0, x1, y1, z1, intensity) {
    const dx = x1 - x0;
    const dz = z1 - z0;
    const len = Math.hypot(dx, dz);
    if (len < 0.05 || len > 4) return;
    const w = 0.16;
    const nx = (-dz / len) * w;
    const nz = (dx / len) * w;
    const i = this.next;
    this.next = (this.next + 1) % this.cap;
    this.count = Math.min(this.cap, this.count + 1);
    const p = i * 12;
    const P = this.pos;
    P[p] = x0 - nx;
    P[p + 1] = y0;
    P[p + 2] = z0 - nz;
    P[p + 3] = x0 + nx;
    P[p + 4] = y0;
    P[p + 5] = z0 + nz;
    P[p + 6] = x1 + nx;
    P[p + 7] = y1;
    P[p + 8] = z1 + nz;
    P[p + 9] = x1 - nx;
    P[p + 10] = y1;
    P[p + 11] = z1 - nz;
    const a = 0.2 + 0.4 * intensity;
    const c = i * 16;
    for (let k = 0; k < 4; k++) {
      this.col[c + k * 4] = this.r;
      this.col[c + k * 4 + 1] = this.g;
      this.col[c + k * 4 + 2] = this.b;
      this.col[c + k * 4 + 3] = a;
    }
    this.dirty = true;
  }

  update() {
    if (!this.dirty) return;
    this.posAttr.needsUpdate = true;
    this.colAttr.needsUpdate = true;
    this.dirty = false;
  }

  reset() {
    this.pos.fill(0);
    this.col.fill(0);
    this.next = 0;
    this.count = 0;
    this.dirty = true;
    this.update();
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.material.dispose();
    if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
  }
}
