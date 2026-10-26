import * as THREE from 'three';
import { SEMANTIC, UI } from '../core/Palette.js';

// Pooled square particles (one THREE.Points draw call): tyre smoke, dust,
// sparks and boost flames. Hard-edged squares match the low-poly look.
// Fixed capacity, ring-buffer allocation, no garbage per frame.

const VERT = /* glsl */ `
attribute float size;
attribute float alpha;
attribute vec3 tint;
varying float vAlpha;
varying vec3 vTint;
uniform float scale;
void main() {
  vAlpha = alpha;
  vTint = tint;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = min(size * scale / max(0.1, -mv.z), 56.0);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
varying float vAlpha;
varying vec3 vTint;
void main() {
  if (vAlpha <= 0.003) discard;
  gl_FragColor = vec4(vTint, vAlpha);
  #include <colorspace_fragment>
}`;


export class Particles {
  constructor(capacity = 300) {
    this.cap = capacity;
    this.pos = new Float32Array(capacity * 3);
    this.vel = new Float32Array(capacity * 3);
    this.tint = new Float32Array(capacity * 3);
    this.size = new Float32Array(capacity);
    this.alpha = new Float32Array(capacity);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
    this.grow = new Float32Array(capacity);
    this.alpha0 = new Float32Array(capacity);
    this.gravity = new Float32Array(capacity);
    this.drag = new Float32Array(capacity);
    this.next = 0;
    this.live = 0;
    const g = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.sizeAttr = new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage);
    this.alphaAttr = new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage);
    this.tintAttr = new THREE.BufferAttribute(this.tint, 3).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('position', this.posAttr);
    g.setAttribute('size', this.sizeAttr);
    g.setAttribute('alpha', this.alphaAttr);
    g.setAttribute('tint', this.tintAttr);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { scale: { value: 600 } },
      transparent: true,
      depthWrite: false,
    });
    this.points = new THREE.Points(g, this.material);
    this.points.frustumCulled = false;
    this.points.name = 'particles';
    this.group = this.points;
    this.colors = {
      smoke: new THREE.Color(SEMANTIC.smoke),
      dust: new THREE.Color(SEMANTIC.concrete),
      sand: new THREE.Color(SEMANTIC.oilRim).lerp(new THREE.Color(UI.chalk), 0.55),
      spark: new THREE.Color(SEMANTIC.sparks),
      flame: new THREE.Color(SEMANTIC.cone),
      flameCore: new THREE.Color(SEMANTIC.boostBlue),
    };
  }

  _spawn(x, y, z, vx, vy, vz, size, grow, life, alpha, color, gravity, drag) {
    const i = this.next;
    this.next = (this.next + 1) % this.cap;
    const k = i * 3;
    this.pos[k] = x;
    this.pos[k + 1] = y;
    this.pos[k + 2] = z;
    this.vel[k] = vx;
    this.vel[k + 1] = vy;
    this.vel[k + 2] = vz;
    this.tint[k] = color.r;
    this.tint[k + 1] = color.g;
    this.tint[k + 2] = color.b;
    this.size[i] = size;
    this.grow[i] = grow;
    this.life[i] = life;
    this.maxLife[i] = life;
    this.alpha0[i] = alpha;
    this.alpha[i] = alpha;
    this.gravity[i] = gravity;
    this.drag[i] = drag;
  }

  smoke(x, y, z, vx, vz, intensity = 1) {
    const r = Math.random;
    this._spawn(x, y, z, vx + (r() - 0.5) * 1.5, 0.6 + r() * 0.8, vz + (r() - 0.5) * 1.5, 0.35 + r() * 0.25, 1.1, 0.9 + r() * 0.5, 0.26 * Math.min(1, intensity + 0.3), this.colors.smoke, -0.4, 1.2);
  }

  dust(x, y, z, vx, vz, count = 1, sand = false) {
    const r = Math.random;
    const col = sand ? this.colors.sand : this.colors.dust;
    for (let n = 0; n < count; n++) {
      this._spawn(x, y, z, vx + (r() - 0.5) * 3, 0.8 + r() * 1.5, vz + (r() - 0.5) * 3, 0.22 + r() * 0.18, 0.7, 0.6 + r() * 0.4, 0.3, col, 1.5, 1.5);
    }
  }

  sparks(x, y, z, nx, nz, count = 10) {
    const r = Math.random;
    for (let n = 0; n < count; n++) {
      const sp = 4 + r() * 8;
      this._spawn(x, y, z, nx * sp + (r() - 0.5) * 6, 1.5 + r() * 4, nz * sp + (r() - 0.5) * 6, 0.12 + r() * 0.08, -0.05, 0.35 + r() * 0.35, 1, this.colors.spark, 14, 0.5);
    }
  }

  flame(x, y, z, dx, dz) {
    const r = Math.random;
    const core = r() < 0.4;
    this._spawn(x, y, z, dx * 6 + (r() - 0.5), (r() - 0.3) * 0.6, dz * 6 + (r() - 0.5), core ? 0.1 : 0.16, -0.3, 0.12 + r() * 0.08, 0.85, core ? this.colors.flameCore : this.colors.flame, 0, 2);
  }

  update(dt, camera) {
    const n = this.cap;
    let live = 0;
    for (let i = 0; i < n; i++) {
      if (this.life[i] <= 0) {
        if (this.alpha[i] !== 0) this.alpha[i] = 0;
        continue;
      }
      live++;
      this.life[i] -= dt;
      const k = i * 3;
      const d = Math.exp(-this.drag[i] * dt);
      this.vel[k] *= d;
      this.vel[k + 1] = this.vel[k + 1] * d - this.gravity[i] * dt;
      this.vel[k + 2] *= d;
      this.pos[k] += this.vel[k] * dt;
      this.pos[k + 1] += this.vel[k + 1] * dt;
      this.pos[k + 2] += this.vel[k + 2] * dt;
      this.size[i] = Math.max(0.02, this.size[i] + this.grow[i] * dt);
      const f = Math.max(0, this.life[i] / this.maxLife[i]);
      this.alpha[i] = this.alpha0[i] * f;
    }
    this.live = live;
    if (camera) this.material.uniforms.scale.value = window.innerHeight / (2 * Math.tan((camera.fov * Math.PI) / 360));
    this.posAttr.needsUpdate = true;
    this.sizeAttr.needsUpdate = true;
    this.alphaAttr.needsUpdate = true;
    this.tintAttr.needsUpdate = true;
  }

  reset() {
    this.life.fill(0);
    this.alpha.fill(0);
    this.alphaAttr.needsUpdate = true;
    this.live = 0;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
    if (this.points.parent) this.points.parent.remove(this.points);
  }
}

