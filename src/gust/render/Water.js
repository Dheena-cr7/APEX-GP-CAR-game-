// River water: a strip mesh that follows the river (uv = metres along /
// across), a flow-mapped normal texture that scrolls downstream at the local
// current speed, fresnel sky reflection, sun glints, depth tint and foam at
// banks, rocks, rapids and falls.

import * as THREE from 'three';

// ---------------------------------------------------------------- textures

function makeNoiseTexture(size = 256) {
  // tileable value noise, several octaves; RGB = normal, A = foam pattern
  const hash = (x, y, p) => {
    x = ((x % p) + p) % p;
    y = ((y % p) + p) % p;
    let h = x * 374761393 + y * 668265263;
    h = (h ^ (h >>> 13)) * 1274126177;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const vnoise = (x, y, p) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi, p), b = hash(xi + 1, yi, p), c = hash(xi, yi + 1, p), d = hash(xi + 1, yi + 1, p);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const H = new Float32Array(size * size);
  const F = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let h = 0, amp = 1, f = 4, sum = 0;
      for (let o = 0; o < 5; o++) {
        h += vnoise((x / size) * f, (y / size) * f, f) * amp;
        sum += amp;
        amp *= 0.5;
        f *= 2;
      }
      H[y * size + x] = h / sum;
      // foam: ridged noise, stretched along the flow (x)
      let fo = 0;
      amp = 1; sum = 0; f = 6;
      for (let o = 0; o < 4; o++) {
        const n = vnoise((x / size) * f, (y / size) * f * 2, f);
        fo += (1 - Math.abs(n * 2 - 1)) * amp;
        sum += amp;
        amp *= 0.55;
        f *= 2;
      }
      F[y * size + x] = fo / sum;
    }
  }
  const data = new Uint8Array(size * size * 4);
  const strength = 6;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = H[y * size + ((x - 1 + size) % size)], r = H[y * size + ((x + 1) % size)];
      const d = H[((y - 1 + size) % size) * size + x], u = H[((y + 1) % size) * size + x];
      let nx = (l - r) * strength, ny = (d - u) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len; ny /= len; nz /= len;
      const k = (y * size + x) * 4;
      data[k] = (nx * 0.5 + 0.5) * 255;
      data[k + 1] = (ny * 0.5 + 0.5) * 255;
      data[k + 2] = (nz * 0.5 + 0.5) * 255;
      data[k + 3] = Math.min(255, Math.max(0, F[y * size + x] * 255));
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

let sharedNoise = null;
export function waterNoise() {
  if (!sharedNoise) sharedNoise = makeNoiseTexture(256);
  return sharedNoise;
}

// ---------------------------------------------------------------- material

const VERT = /* glsl */ `
  attribute float aFlow;
  attribute float aEdge;
  attribute float aFoam;
  attribute float aRough;
  uniform float uTime;
  varying vec2 vUv;
  varying float vFlow;
  varying float vEdge;
  varying float vFoam;
  varying float vRough;
  varying vec3 vWorld;
  #include <fog_pars_vertex>
  void main() {
    vec3 p = position;
    float calm = 1.0 - smoothstep(0.75, 1.0, aEdge);
    float w = sin(p.x * 0.31 + uTime * 1.5) * cos(p.z * 0.27 - uTime * 1.2) * 0.07
            + sin((p.x + p.z) * 0.83 + uTime * 2.6) * 0.03;
    p.y += w * (1.0 + aRough * 3.5) * calm;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    vUv = uv;
    vFlow = aFlow;
    vEdge = aEdge;
    vFoam = aFoam;
    vRough = aRough;
    vec4 mvPosition = viewMatrix * world;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime;
  uniform sampler2D uNoise;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uFoamColor;
  uniform vec3 uSkyTop;
  uniform vec3 uSkyHorizon;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  varying vec2 vUv;
  varying float vFlow;
  varying float vEdge;
  varying float vFoam;
  varying float vRough;
  varying vec3 vWorld;
  #include <fog_pars_fragment>

  vec4 flowSample(vec2 uv, float scale, float speed, float period) {
    float t = uTime / period;
    float p0 = fract(t);
    float p1 = fract(t + 0.5);
    float wgt = abs(1.0 - 2.0 * p0);
    vec2 off0 = vec2(p0 * speed * period, 0.0);
    vec2 off1 = vec2(p1 * speed * period, 0.0);
    vec4 a = texture2D(uNoise, (uv - off0) * scale);
    vec4 b = texture2D(uNoise, (uv - off1) * scale + 0.5);
    return mix(b, a, wgt);
  }

  void main() {
    float speed = vFlow;
    vec4 n1 = flowSample(vUv, 0.085, speed, 2.5);
    vec4 n2 = flowSample(vUv * 1.0 + vec2(0.0, 17.0), 0.23, speed * 1.15, 1.7);
    vec2 slope = (n1.xy - 0.5) * 1.1 + (n2.xy - 0.5) * 0.7;
    float rough = 0.55 + vRough * 1.4;
    vec3 N = normalize(vec3(slope.x * rough, 1.0, slope.y * rough));
    vec3 V = normalize(cameraPosition - vWorld);
    float ndv = max(dot(N, V), 0.0);
    float fres = 0.025 + 0.975 * pow(1.0 - ndv, 5.0);
    vec3 R = reflect(-V, N);
    float up = clamp(R.y, 0.0, 1.0);
    vec3 sky = mix(uSkyHorizon, uSkyTop, pow(up, 0.55));

    float depth = smoothstep(0.98, 0.15, vEdge);
    vec3 body = mix(uShallow, uDeep, depth);
    // light scattering in wave crests
    float crest = clamp((n1.z - 0.5) * 2.0 + (slope.x + slope.y) * 0.3, 0.0, 1.0);
    body += uShallow * crest * 0.18;
    body *= 0.75 + 0.35 * max(dot(vec3(0.0, 1.0, 0.0), uSunDir), 0.0);

    vec3 col = mix(body, sky, clamp(fres * 0.85, 0.0, 1.0));
    vec3 H = normalize(uSunDir + V);
    float nh = max(dot(N, H), 0.0);
    col += uSunColor * (pow(nh, 320.0) * 3.5 + pow(nh, 48.0) * 0.12);

    // foam: banks, rocks, rapids and falls
    float bank = smoothstep(0.87, 1.03, vEdge);
    float f = max(max(bank * 0.7, vFoam), vRough * 0.7);
    float pattern = n1.w * 0.65 + n2.w * 0.5;
    float streak = flowSample(vUv * vec2(0.6, 2.2), 0.12, speed * 1.3, 2.0).w;
    pattern = max(pattern, streak * vRough * 1.2);
    float foam = smoothstep(1.05 - f, 1.25 - f * 0.8, pattern) * clamp(f * 1.6, 0.0, 1.0);
    col = mix(col, uFoamColor, foam * 0.92);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

export function makeWaterMaterial(theme, sunDir) {
  const c = (h) => new THREE.Color(h);
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uNoise: { value: null },
        uDeep: { value: c(theme.deep) },
        uShallow: { value: c(theme.shallow) },
        uFoamColor: { value: c(theme.foam) },
        uSkyTop: { value: c(theme.skyTop) },
        uSkyHorizon: { value: c(theme.skyHorizon) },
        uSunDir: { value: sunDir.clone() },
        uSunColor: { value: c(theme.sunColor) },
      },
    ]),
  });
}

// ---------------------------------------------------------------- geometry

/**
 * River strip mesh. `foamAt(x, z)` returns rock foam 0..1 for a point.
 */
export function buildWaterGeometry(river, foamAt) {
  const across = 22;
  const margin = 5;
  const rows = river.n;
  const vcount = rows * (across + 1);
  const pos = new Float32Array(vcount * 3);
  const uv = new Float32Array(vcount * 2);
  const flow = new Float32Array(vcount);
  const edge = new Float32Array(vcount);
  const foam = new Float32Array(vcount);
  const rough = new Float32Array(vcount);
  let k = 0;
  for (let i = 0; i < rows; i++) {
    const hw = river.hw[i];
    const W = hw + margin;
    const nx = river.tz[i], nz = -river.tx[i];
    const fall = river.fall[i];
    const slope = Math.min(1, Math.abs(river.slope[i]) * 2.2);
    const rr = Math.min(1, river.rough[i] * 0.55 + slope + fall * 0.4);
    for (let j = 0; j <= across; j++) {
      // denser columns near the banks
      const a = (j / across) * 2 - 1;
      const t = Math.sign(a) * Math.pow(Math.abs(a), 0.85) * W;
      const x = river.x[i] + nx * t, z = river.z[i] + nz * t;
      pos[k * 3] = x;
      pos[k * 3 + 1] = river.h[i];
      pos[k * 3 + 2] = z;
      uv[k * 2] = i;
      uv[k * 2 + 1] = t;
      const q = Math.abs(t) / hw;
      flow[k] = river.v[i] * Math.max(0.3, 1 - 0.55 * Math.min(1, q) * Math.min(1, q));
      edge[k] = q;
      foam[k] = foamAt ? foamAt(x, z) : 0;
      rough[k] = rr * (1 - Math.min(1, q) * 0.3);
      k++;
    }
  }
  const idx = [];
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < across; j++) {
      const a = i * (across + 1) + j, b = a + 1, c = a + across + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aFlow', new THREE.BufferAttribute(flow, 1));
  g.setAttribute('aEdge', new THREE.BufferAttribute(edge, 1));
  g.setAttribute('aFoam', new THREE.BufferAttribute(foam, 1));
  g.setAttribute('aRough', new THREE.BufferAttribute(rough, 1));
  g.setIndex(idx);
  g.computeBoundingSphere();
  return g;
}

// ---------------------------------------------------------------- whirlpool decal

const WHIRL_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uSpin;
  uniform vec3 uColor;
  uniform vec3 uFoamColor;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float a = atan(p.y, p.x);
    float bands = sin(a * 3.0 + log(r + 0.05) * 7.0 * uSpin - uTime * 3.2 * uSpin);
    float fade = smoothstep(1.0, 0.55, r);
    float foam = smoothstep(0.55, 0.95, bands) * fade * smoothstep(0.05, 0.3, r);
    float dark = smoothstep(0.55, 0.0, r) * 0.55;
    vec3 col = mix(uColor, uFoamColor, foam);
    float alpha = max(foam * 0.85, dark) * fade;
    gl_FragColor = vec4(col * (1.0 - dark * 0.6), alpha);
    #include <colorspace_fragment>
  }
`;

export function makeWhirlMaterial(theme, spin) {
  return new THREE.ShaderMaterial({
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: WHIRL_FRAG,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSpin: { value: spin },
      uColor: { value: new THREE.Color(theme.deep).multiplyScalar(0.6) },
      uFoamColor: { value: new THREE.Color(theme.foam) },
    },
  });
}
