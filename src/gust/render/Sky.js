// Sky dome: horizon-to-zenith gradient, sun disc with glow, and soft drifting
// fbm clouds. One draw, follows the camera.

import * as THREE from 'three';

const VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uGround;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uTime;
  uniform float uCloud;
  varying vec3 vDir;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.48));
    col = mix(col, uGround, smoothstep(0.0, -0.25, h));
    float sd = max(dot(d, uSunDir), 0.0);
    col += uSunColor * (pow(sd, 6.0) * 0.28 + pow(sd, 64.0) * 0.6);
    col += uSunColor * smoothstep(0.9993, 0.9997, sd) * 6.0;
    // clouds on a virtual plane
    if (h > 0.01) {
      vec2 uv = d.xz / (h + 0.12) * 1.4 + vec2(uTime * 0.006, uTime * 0.002);
      float c = fbm(uv);
      c = smoothstep(0.52 - uCloud * 0.2, 0.85, c) * smoothstep(0.0, 0.18, h);
      vec3 cc = mix(vec3(1.0), uSunColor, 0.25) * (0.9 + 0.25 * pow(sd, 3.0));
      vec3 shade = mix(uHorizon, vec3(1.0), 0.55) * 0.9;
      col = mix(col, mix(shade, cc, smoothstep(0.0, 1.0, c * 1.4)), c * 0.85);
    }
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function makeSky(theme, sunDir) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uTop: { value: new THREE.Color(theme.skyTop) },
      uHorizon: { value: new THREE.Color(theme.skyHorizon) },
      uGround: { value: new THREE.Color(theme.skyGround) },
      uSunDir: { value: sunDir.clone() },
      uSunColor: { value: new THREE.Color(theme.sunColor) },
      uTime: { value: 0 },
      uCloud: { value: theme === undefined ? 0.5 : theme.clouds ?? 0.5 },
    },
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(800, 32, 16), mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  return mesh;
}
