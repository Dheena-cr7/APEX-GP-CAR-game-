// Particles and water decals.
//  - Puffs: one THREE.Points cloud (gust clouds, spray, splash, sparkles,
//    confetti, mist). CPU-simulated, fixed pool, one draw.
//  - Decals: flat instanced quads on the water (wake foam, ripple rings,
//    shockwaves). One draw.
//  - Ambient: falling snow / floating dust around the camera.

import * as THREE from 'three';

function softTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.45, 'rgba(255,255,255,0.75)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  return t;
}

const PTS_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec4 aColor;
  uniform float uScale;
  varying vec4 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / max(0.5, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const PTS_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  varying vec4 vColor;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor.rgb, vColor.a * t.a);
    if (gl_FragColor.a < 0.01) discard;
    #include <colorspace_fragment>
  }
`;

export class Puffs {
  constructor(max = 2400) {
    this.max = max;
    this.n = 0;
    const g = new THREE.BufferGeometry();
    this.pos = new Float32Array(max * 3);
    this.size = new Float32Array(max);
    this.col = new Float32Array(max * 4);
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aColor', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    this.geo = g;
    this.mat = new THREE.ShaderMaterial({
      vertexShader: PTS_VERT,
      fragmentShader: PTS_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: { uMap: { value: softTexture() }, uScale: { value: 600 } },
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = 4;
    // particle state
    this.p = new Float32Array(max * 16);
  }

  setViewport(h) {
    this.mat.uniforms.uScale.value = h * 0.9;
  }

  /**
   * Spawn one particle.
   * kind: size growth, gravity, drag, colour, life.
   */
  spawn(x, y, z, vx, vy, vz, life, size0, size1, r, g, b, a, grav = 0, drag = 1.5) {
    if (this.n >= this.max) return;
    const k = this.n++ * 16;
    const P = this.p;
    P[k] = x; P[k + 1] = y; P[k + 2] = z;
    P[k + 3] = vx; P[k + 4] = vy; P[k + 5] = vz;
    P[k + 6] = 0; P[k + 7] = life;
    P[k + 8] = size0; P[k + 9] = size1;
    P[k + 10] = r; P[k + 11] = g; P[k + 12] = b; P[k + 13] = a;
    P[k + 14] = grav; P[k + 15] = drag;
  }

  update(dt, floorAt) {
    const P = this.p;
    let w = 0;
    for (let i = 0; i < this.n; i++) {
      const k = i * 16;
      P[k + 6] += dt;
      if (P[k + 6] >= P[k + 7]) continue;
      const dr = Math.exp(-P[k + 15] * dt);
      P[k + 3] *= dr; P[k + 4] *= dr; P[k + 5] *= dr;
      P[k + 4] -= P[k + 14] * dt;
      P[k] += P[k + 3] * dt; P[k + 1] += P[k + 4] * dt; P[k + 2] += P[k + 5] * dt;
      if (floorAt && P[k + 14] > 0) {
        const fy = floorAt(P[k], P[k + 2]);
        if (P[k + 1] < fy) { P[k + 6] = P[k + 7]; continue; }
      }
      if (w !== i) P.copyWithin(w * 16, k, k + 16);
      w++;
    }
    this.n = w;
    for (let i = 0; i < w; i++) {
      const k = i * 16;
      const t = P[k + 6] / P[k + 7];
      this.pos[i * 3] = P[k]; this.pos[i * 3 + 1] = P[k + 1]; this.pos[i * 3 + 2] = P[k + 2];
      this.size[i] = P[k + 8] + (P[k + 9] - P[k + 8]) * Math.sqrt(t);
      this.col[i * 4] = P[k + 10]; this.col[i * 4 + 1] = P[k + 11]; this.col[i * 4 + 2] = P[k + 12];
      const fadeIn = Math.min(1, t * 8);
      this.col[i * 4 + 3] = P[k + 13] * fadeIn * (1 - t) * (1 - t * 0.3);
    }
    this.geo.setDrawRange(0, w);
    for (const n of ['position', 'aSize', 'aColor']) this.geo.getAttribute(n).needsUpdate = true;
  }

  clear() {
    this.n = 0;
    this.geo.setDrawRange(0, 0);
  }
}

// ---------------------------------------------------------------- decals

const DEC_VERT = /* glsl */ `
  attribute vec4 aData; // age 0..1, kind, alpha, unused
  varying vec2 vUv;
  varying vec4 vData;
  void main() {
    vUv = uv;
    vData = aData;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;
const DEC_FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec4 vData;
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float age = vData.x;
    float a;
    if (vData.y < 0.5) {
      // ring
      float w = 0.12 + age * 0.1;
      a = smoothstep(1.0, 1.0 - w, r) * smoothstep(1.0 - w * 2.2, 1.0 - w, r);
    } else {
      // soft foam blob with a broken edge
      float n = sin(p.x * 13.0 + age * 3.0) * sin(p.y * 11.0) * 0.12;
      a = smoothstep(1.0, 0.45, r + n) * 0.8;
    }
    a *= vData.z * (1.0 - age);
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
  }
`;

export class Decals {
  constructor(max = 500, color = 0xffffff) {
    this.max = max;
    const g = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    this.data = new Float32Array(max * 4);
    g.setAttribute('aData', new THREE.InstancedBufferAttribute(this.data, 4).setUsage(THREE.DynamicDrawUsage));
    this.mat = new THREE.ShaderMaterial({
      vertexShader: DEC_VERT,
      fragmentShader: DEC_FRAG,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      uniforms: { uColor: { value: new THREE.Color(color) } },
    });
    this.mesh = new THREE.InstancedMesh(g, this.mat, max);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    this.items = [];
    this._m = new THREE.Matrix4();
    this._q = new THREE.Quaternion();
    this._s = new THREE.Vector3();
    this._p = new THREE.Vector3();
    this._y = new THREE.Vector3(0, 1, 0);
  }

  /** kind 0 = ring, 1 = foam blob. Size grows from s0 to s1. */
  add(x, y, z, s0, s1, life, kind = 0, alpha = 1, vx = 0, vz = 0) {
    if (this.items.length >= this.max) this.items.shift();
    this.items.push({ x, y, z, s0, s1, life, age: 0, kind, alpha, vx, vz, rot: Math.random() * 6.28 });
  }

  update(dt) {
    const it = this.items;
    let w = 0;
    for (let i = 0; i < it.length; i++) {
      const d = it[i];
      d.age += dt;
      if (d.age >= d.life) continue;
      d.x += d.vx * dt;
      d.z += d.vz * dt;
      it[w++] = d;
    }
    it.length = w;
    for (let i = 0; i < w; i++) {
      const d = it[i];
      const t = d.age / d.life;
      const s = d.s0 + (d.s1 - d.s0) * (1 - (1 - t) * (1 - t));
      this._p.set(d.x, d.y, d.z);
      this._q.setFromAxisAngle(this._y, d.rot);
      this._s.set(s, 1, s);
      this._m.compose(this._p, this._q, this._s);
      this.mesh.setMatrixAt(i, this._m);
      this.data[i * 4] = t;
      this.data[i * 4 + 1] = d.kind;
      this.data[i * 4 + 2] = d.alpha;
    }
    this.mesh.count = w;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.geometry.getAttribute('aData').needsUpdate = true;
  }

  clear() {
    this.items.length = 0;
    this.mesh.count = 0;
  }
}

// ---------------------------------------------------------------- ambient

export class Ambient {
  /** kind: 'snow' | 'dust' */
  constructor(kind, count = 900) {
    this.kind = kind;
    this.count = count;
    this.box = kind === 'snow' ? 46 : 36;
    const pos = new Float32Array(count * 3);
    this.vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * this.box;
      pos[i * 3 + 1] = Math.random() * (kind === 'snow' ? 24 : 10);
      pos[i * 3 + 2] = (Math.random() - 0.5) * this.box;
      this.vel[i * 3] = (Math.random() - 0.5) * 0.6;
      this.vel[i * 3 + 1] = kind === 'snow' ? -(1.2 + Math.random() * 1.2) : (Math.random() - 0.5) * 0.15;
      this.vel[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo = g;
    this.mat = new THREE.PointsMaterial({
      size: kind === 'snow' ? 0.16 : 0.09,
      color: kind === 'snow' ? 0xffffff : 0xffe2a8,
      map: softTexture(),
      transparent: true,
      opacity: kind === 'snow' ? 0.9 : 0.6,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(g, this.mat);
    this.points.frustumCulled = false;
    this.t = 0;
  }

  update(dt, center) {
    this.t += dt;
    const p = this.geo.getAttribute('position');
    const a = p.array, v = this.vel, B = this.box, hb = B / 2;
    const top = this.kind === 'snow' ? 24 : 10;
    for (let i = 0; i < this.count; i++) {
      const k = i * 3;
      a[k] += (v[k] + Math.sin(this.t * 0.7 + i) * 0.25) * dt;
      a[k + 1] += v[k + 1] * dt;
      a[k + 2] += (v[k + 2] + Math.cos(this.t * 0.6 + i * 1.3) * 0.25) * dt;
      // wrap inside a box that follows the camera target
      let rx = a[k] - center.x, rz = a[k + 2] - center.z;
      if (rx > hb) a[k] -= B; else if (rx < -hb) a[k] += B;
      if (rz > hb) a[k + 2] -= B; else if (rz < -hb) a[k + 2] += B;
      const ry = a[k + 1] - center.y;
      if (ry < -2) a[k + 1] += top;
      else if (ry > top) a[k + 1] -= top;
    }
    p.needsUpdate = true;
  }
}
