import * as THREE from 'three';

// Shared scene-building helpers: gradient sky dome, light rig, fog.

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w; // keep the dome on the far plane
}`;

const SKY_FRAG = /* glsl */ `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform vec3 horizonColor;
varying vec3 vDir;
void main() {
  float h = clamp(vDir.y, -1.0, 1.0);
  vec3 col = h > 0.0
    ? mix(horizonColor, topColor, pow(h, 0.55))
    : mix(horizonColor, bottomColor, clamp(-h * 4.0, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

/** Large inverted sphere with a vertical gradient. Follows the camera. */
export function createSky(theme) {
  const geo = new THREE.SphereGeometry(1, 24, 12);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(theme.skyTop) },
      horizonColor: { value: new THREE.Color(theme.skyBottom) },
      bottomColor: { value: new THREE.Color(theme.fog) },
    },
    vertexShader: SKY_VERT,
    fragmentShader: SKY_FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.setScalar(1500);
  mesh.renderOrder = -1;
  mesh.frustumCulled = false;
  mesh.name = 'sky';
  return mesh;
}

/**
 * Hemisphere fill + one directional sun. The sun's shadow camera is small and
 * meant to follow a target (the player's car) via `followLight`.
 */
export function createLights(theme, { shadows = true, shadowSize = 1024, shadowExtent = 40 } = {}) {
  const group = new THREE.Group();
  group.name = 'lights';
  const hemi = new THREE.HemisphereLight(theme.hemiSky, theme.hemiGround, theme.hemiIntensity);
  group.add(hemi);
  const sun = new THREE.DirectionalLight(theme.sun, theme.sunIntensity);
  sun.position.set(60, 120, 40);
  sun.castShadow = shadows;
  if (shadows) {
    sun.shadow.mapSize.set(shadowSize, shadowSize);
    const c = sun.shadow.camera;
    c.left = -shadowExtent;
    c.right = shadowExtent;
    c.top = shadowExtent;
    c.bottom = -shadowExtent;
    c.near = 1;
    c.far = 400;
    sun.shadow.bias = -0.0008;
    sun.shadow.normalBias = 0.02;
  }
  group.add(sun);
  group.add(sun.target);
  return { group, hemi, sun };
}

const _sunOffset = new THREE.Vector3(60, 120, 40);
/** Keep the shadow frustum centred on a point (snapped to texels to avoid swimming). */
export function followLight(sun, x, y, z) {
  const snap = 0.5;
  const sx = Math.round(x / snap) * snap;
  const sz = Math.round(z / snap) * snap;
  sun.target.position.set(sx, y, sz);
  sun.position.set(sx + _sunOffset.x, y + _sunOffset.y, sz + _sunOffset.z);
}

export function applyFog(scene, theme, scale = 1) {
  scene.fog = new THREE.Fog(theme.fog, theme.fogNear * scale, theme.fogFar * scale);
  scene.background = new THREE.Color(theme.fog);
}

/** Dispose every geometry / material / texture under an object. */
export function disposeObject(root) {
  const geos = new Set();
  const mats = new Set();
  root.traverse((o) => {
    if (o.geometry) geos.add(o.geometry);
    if (o.material) {
      if (Array.isArray(o.material)) o.material.forEach((m) => mats.add(m));
      else mats.add(o.material);
    }
  });
  for (const g of geos) g.dispose();
  for (const m of mats) {
    for (const key in m) {
      const v = m[key];
      if (v && v.isTexture) v.dispose();
    }
    if (m.uniforms) {
      for (const k in m.uniforms) {
        const u = m.uniforms[k].value;
        if (u && u.isTexture) u.dispose();
      }
    }
    m.dispose();
  }
}
