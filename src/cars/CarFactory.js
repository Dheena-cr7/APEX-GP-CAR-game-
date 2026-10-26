import * as THREE from 'three';
import { MeshBuilder, shadeHex } from '../tracks/MeshBuilder.js';
import { addBox, addCylinder, addCone } from '../tracks/PropFactory.js';
import { LIVERIES, SEMANTIC, HELMETS } from '../core/Palette.js';
import { CAR } from './Sizes.js';
import { PHYSICS } from './PhysicsConfig.js';

// Procedural low-poly formula car. The body is ONE merged mesh with vertex
// colours (livery baked in), plus four wheel meshes (shared geometry) and a
// brake-light mesh: ~6 draw calls per car. Local axes: +z forward, +x left.

const FRONT_AXLE_Z = CAR.frontAxle;
const REAR_AXLE_Z = -CAR.rearAxle;
const FRONT_WHEEL_X = 0.66; // kept inside the front-wing / body envelope
const REAR_WHEEL_X = 0.7;
const FRONT_R = 0.33;
const REAR_R = 0.36;

let sharedWheel = null; // geometries + material shared by every car, created once

function getWheelKit() {
  if (sharedWheel) return sharedWheel;
  const make = (r, w) => {
    const b = new MeshBuilder();
    // tyre: 10-sided prism along x, rim disc inset on both faces, one bright
    // stripe segment so spin is visible
    const segs = 10;
    for (let i = 0; i < segs; i++) {
      const a0 = (i / segs) * Math.PI * 2;
      const a1 = ((i + 1) / segs) * Math.PI * 2;
      const y0 = Math.cos(a0) * r;
      const z0 = Math.sin(a0) * r;
      const y1 = Math.cos(a1) * r;
      const z1 = Math.sin(a1) * r;
      const col = i === 0 ? SEMANTIC.rim : SEMANTIC.tyreRubber;
      const v0 = b.v(-w / 2, y0, z0, col);
      const v1 = b.v(w / 2, y0, z0, col);
      const v2 = b.v(w / 2, y1, z1, col);
      const v3 = b.v(-w / 2, y1, z1, col);
      b.quad(v0, v3, v2, v1);
      for (const side of [-1, 1]) {
        const x = (side * w) / 2;
        const rr = r * 0.62;
        const c = b.v(x + side * 0.005, 0, 0, SEMANTIC.rim);
        const e0 = b.v(x, Math.cos(a0) * rr, Math.sin(a0) * rr, SEMANTIC.rim);
        const e1 = b.v(x, Math.cos(a1) * rr, Math.sin(a1) * rr, SEMANTIC.rim);
        const o0 = b.v(x, y0, z0, SEMANTIC.tyreRubber);
        const o1 = b.v(x, y1, z1, SEMANTIC.tyreRubber);
        const i0 = b.v(x, Math.cos(a0) * rr, Math.sin(a0) * rr, SEMANTIC.tyreRubber);
        const i1 = b.v(x, Math.cos(a1) * rr, Math.sin(a1) * rr, SEMANTIC.tyreRubber);
        if (side > 0) {
          b.tri(c, e0, e1);
          b.quad(i0, o0, o1, i1);
        } else {
          b.tri(c, e1, e0);
          b.quad(i1, o1, o0, i0);
        }
      }
    }
    return b.build();
  };
  sharedWheel = {
    front: make(FRONT_R, 0.32),
    rear: make(REAR_R, 0.42),
    mat: new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }),
  };
  return sharedWheel;
}

/** Box whose cross-section changes linearly from z0 to z1. */
function taper(b, { z0, z1, w0, w1, yb0, yt0, yb1, yt1, color, x = 0 }) {
  const c = [
    [x - w0 / 2, yb0, z0],
    [x + w0 / 2, yb0, z0],
    [x + w0 / 2, yt0, z0],
    [x - w0 / 2, yt0, z0],
    [x - w1 / 2, yb1, z1],
    [x + w1 / 2, yb1, z1],
    [x + w1 / 2, yt1, z1],
    [x - w1 / 2, yt1, z1],
  ];
  const faces = [
    [1, 0, 3, 2], // back (z0) facing -z
    [4, 5, 6, 7], // front (z1) facing +z
    [0, 4, 7, 3], // -x side
    [5, 1, 2, 6], // +x side
    [3, 7, 6, 2], // top
    [0, 1, 5, 4], // bottom
  ];
  for (const f of faces) {
    const idx = f.map((k) => b.v(c[k][0], c[k][1], c[k][2], color));
    b.quad(idx[0], idx[1], idx[2], idx[3]);
  }
}

function buildBody(shape, livery, helmet) {
  const b = new MeshBuilder();
  const P = livery.primary;
  const S = livery.secondary;
  const A = livery.accent;
  const carbon = SEMANTIC.carbon;
  const bw = shape.bodyWidth;
  const noseTip = FRONT_AXLE_Z + 0.35 + shape.nose * 0.45;

  // floor / plank
  taper(b, { z0: REAR_AXLE_Z - 0.3, z1: FRONT_AXLE_Z - 0.35, w0: 1.2, w1: 1.0, yb0: 0.08, yt0: 0.14, yb1: 0.08, yt1: 0.14, color: carbon });
  // monocoque (cockpit section)
  taper(b, { z0: -0.6, z1: 0.9, w0: bw, w1: bw * 0.82, yb0: 0.14, yt0: 0.62, yb1: 0.14, yt1: 0.58, color: P });
  // nose: from the front of the tub to the tip, tapering and dropping
  taper(b, { z0: 0.9, z1: noseTip, w0: bw * 0.62, w1: 0.2, yb0: 0.2, yt0: 0.56, yb1: 0.18, yt1: 0.3, color: P });
  // accent stripe along the nose top
  taper(b, { z0: 0.9, z1: noseTip - 0.05, w0: 0.16, w1: 0.06, yb0: 0.56, yt0: 0.585, yb1: 0.3, yt1: 0.32, color: A });
  // sidepods
  for (const side of [-1, 1]) {
    const x = side * (bw / 2 + shape.podWidth / 2 - 0.02);
    taper(b, { x, z0: -0.2 - shape.podLength * 0.6, z1: 0.75, w0: shape.podWidth * 0.55, w1: shape.podWidth, yb0: 0.14, yt0: 0.38, yb1: 0.14, yt1: 0.5, color: P });
    // intake mouth
    taper(b, { x, z0: 0.74, z1: 0.78, w0: shape.podWidth * 0.8, w1: shape.podWidth * 0.8, yb0: 0.22, yt0: 0.44, yb1: 0.22, yt1: 0.44, color: SEMANTIC.hazardBlack });
    // secondary colour band on the pod
    taper(b, { x: x + side * 0.001, z0: -0.1, z1: 0.6, w0: shape.podWidth * 0.86, w1: shape.podWidth * 1.01, yb0: 0.3, yt0: 0.36, yb1: 0.38, yt1: 0.45, color: S });
  }
  // engine cover rising to the airbox, then tapering to the gearbox
  taper(b, { z0: REAR_AXLE_Z + 0.1, z1: -0.6, w0: 0.42, w1: bw * 0.9, yb0: 0.14, yt0: 0.42, yb1: 0.14, yt1: 0.62 + shape.engineCover * 0.5, color: P });
  taper(b, { z0: -0.62, z1: -0.25, w0: 0.34, w1: 0.3, yb0: 0.62, yt0: 0.62 + shape.engineCover * 0.6, yb1: 0.6, yt1: 0.95 + shape.engineCover * 0.3, color: S });
  if (shape.fin) taper(b, { z0: REAR_AXLE_Z + 0.2, z1: -0.5, w0: 0.04, w1: 0.04, yb0: 0.42, yt0: 0.72, yb1: 0.6, yt1: 0.9, color: A });
  // cockpit opening
  taper(b, { z0: -0.35, z1: 0.45, w0: bw * 0.56, w1: bw * 0.5, yb0: 0.6, yt0: 0.63, yb1: 0.57, yt1: 0.6, color: SEMANTIC.hazardBlack });
  // helmet: octagonal shell + visor band
  addCylinder(b, 0, 0.6, 0.0, 0.16, 0.18, 8, helmet, helmet);
  addCone(b, 0, 0.78, 0.0, 0.16, 0.08, 8, helmet, shadeHex(helmet, 0.15));
  addBox(b, 0, 0.71, 0.12, 0.26, 0.06, 0.1, SEMANTIC.helmetVisor);
  // halo: centre pillar + hoop
  addBox(b, 0, 0.74, 0.5, 0.06, 0.28, 0.06, carbon);
  addBox(b, 0, 0.88, 0.2, 0.06, 0.04, 0.62, carbon);
  for (const side of [-1, 1]) addBox(b, side * 0.22, 0.8, -0.08, 0.05, 0.05, 0.5, carbon, side * 0.35);
  // front wing: main plane + flap + endplates
  const fw = shape.frontWing;
  const fz = noseTip - 0.05;
  addBox(b, 0, 0.1, fz, fw, 0.04, 0.42, S);
  addBox(b, 0, 0.16, fz - 0.16, fw * 0.92, 0.035, 0.18, A);
  for (const side of [-1, 1]) addBox(b, side * (fw / 2 - 0.02), 0.16, fz - 0.02, 0.03, 0.18, 0.5, S);
  // nose pylons down to the wing
  taper(b, { z0: fz - 0.1, z1: fz + 0.1, w0: 0.14, w1: 0.12, yb0: 0.1, yt0: 0.26, yb1: 0.1, yt1: 0.22, color: P });
  // rear wing: endplates, main plane, DRS flap, pillar
  const rw = shape.rearWing;
  const rz = REAR_AXLE_Z - 0.38;
  const rh = shape.rearWingHeight;
  for (const side of [-1, 1]) addBox(b, side * (rw / 2), rh * 0.68, rz, 0.04, rh * 0.62, 0.62, S);
  addBox(b, 0, rh * 0.86, rz - 0.04, rw, 0.05, 0.42, S);
  addBox(b, 0, rh * 0.96, rz - 0.18, rw * 0.98, 0.04, 0.2, A);
  addBox(b, 0, rh * 0.45, rz + 0.12, 0.1, rh * 0.62, 0.12, carbon);
  // diffuser
  taper(b, { z0: REAR_AXLE_Z - 0.55, z1: REAR_AXLE_Z + 0.2, w0: 1.0, w1: 1.1, yb0: 0.12, yt0: 0.3, yb1: 0.08, yt1: 0.14, color: carbon });
  // suspension arms (thin carbon wishbones)
  for (const side of [-1, 1]) {
    addBox(b, side * 0.42, 0.34, FRONT_AXLE_Z, 0.52, 0.03, 0.06, carbon);
    addBox(b, side * 0.42, 0.24, FRONT_AXLE_Z, 0.52, 0.03, 0.06, carbon);
    addBox(b, side * 0.46, 0.34, REAR_AXLE_Z, 0.5, 0.03, 0.06, carbon);
    addBox(b, side * 0.46, 0.24, REAR_AXLE_Z, 0.5, 0.03, 0.06, carbon);
  }
  // rear rain light housing
  addBox(b, 0, 0.36, REAR_AXLE_Z - 0.58, 0.18, 0.08, 0.04, SEMANTIC.hazardBlack);
  return b.build();
}

export function liveryById(id) {
  return LIVERIES.find((l) => l.id === id) || LIVERIES[0];
}

/**
 * Visual car. `update(vehicle, alpha, ground)` places it from the physics
 * state with render interpolation.
 */
export class CarView {
  constructor(carDef, liveryId, { helmetIndex = 0, castShadow = true } = {}) {
    this.def = carDef;
    this.root = new THREE.Group();
    this.root.name = `car-${carDef.id}`;
    this.bodyGroup = new THREE.Group();
    this.root.add(this.bodyGroup);
    this.helmet = HELMETS[helmetIndex % HELMETS.length];
    this.bodyMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
    this.body = new THREE.Mesh(buildBody(carDef.shape, liveryById(liveryId), this.helmet), this.bodyMat);
    this.body.castShadow = castShadow;
    this.body.name = 'body';
    this.bodyGroup.add(this.body);
    this.liveryId = liveryId;

    const kit = getWheelKit();
    this.wheels = [];
    const ws = carDef.shape.wheelScale || 1;
    const defs = [
      [FRONT_WHEEL_X, FRONT_AXLE_Z, true, FRONT_R],
      [-FRONT_WHEEL_X, FRONT_AXLE_Z, true, FRONT_R],
      [REAR_WHEEL_X, REAR_AXLE_Z, false, REAR_R],
      [-REAR_WHEEL_X, REAR_AXLE_Z, false, REAR_R],
    ];
    for (const [x, z, front, r] of defs) {
      const pivot = new THREE.Group();
      pivot.position.set(x, r * ws, z);
      const mesh = new THREE.Mesh(front ? kit.front : kit.rear, kit.mat);
      mesh.scale.setScalar(ws);
      mesh.castShadow = castShadow;
      pivot.add(mesh);
      this.root.add(pivot);
      this.wheels.push({ pivot, mesh, front });
    }
    // brake / rain light
    this.brakeMat = new THREE.MeshLambertMaterial({ color: SEMANTIC.brakeOff, emissive: SEMANTIC.brakeOn, emissiveIntensity: 0 });
    this.brakeLight = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.03), this.brakeMat);
    this.brakeLight.position.set(0, 0.36, REAR_AXLE_Z - 0.61);
    this.bodyGroup.add(this.brakeLight);
    this.brakeGlow = 0;
    this.roll = 0;
    this.pitch = 0;
    this.visible = true;
  }

  setLivery(liveryId) {
    if (liveryId === this.liveryId) return;
    this.liveryId = liveryId;
    const old = this.body.geometry;
    this.body.geometry = buildBody(this.def.shape, liveryById(liveryId), this.helmet);
    old.dispose();
  }

  /**
   * vehicle: Vehicle; alpha: interpolation; ground: {y, pitch, roll} of the
   * road under the car (radians), or null for flat ground.
   */
  update(vehicle, alpha, ground, dt) {
    const x = vehicle.px + (vehicle.x - vehicle.px) * alpha;
    const z = vehicle.pz + (vehicle.z - vehicle.pz) * alpha;
    const h = vehicle.ph + (vehicle.h - vehicle.ph) * alpha;
    const y = ground ? ground.y : 0;
    this.root.position.set(x, y, z);
    this.root.rotation.set(ground ? ground.pitch : 0, h, ground ? ground.roll : 0, 'YXZ');
    // body roll / pitch from accelerations (smoothed)
    const k = Math.min(1, (dt || 0.016) * 8);
    this.roll += (Math.max(-0.07, Math.min(0.07, vehicle.latAccel * 0.0035)) - this.roll) * k;
    this.pitch += (Math.max(-0.05, Math.min(0.05, -vehicle.longAccel * 0.0025)) - this.pitch) * k;
    this.bodyGroup.rotation.set(this.pitch, 0, this.roll);
    this.bodyGroup.position.y = (ground && ground.bump ? ground.bump : 0);
    // wheels: spin + visual steering (clamped)
    const steer = Math.max(-PHYSICS.visualSteerClamp, Math.min(PHYSICS.visualSteerClamp, vehicle.steerAngle));
    for (const w of this.wheels) {
      w.mesh.rotation.x = vehicle.wheelAngle;
      if (w.front) w.pivot.rotation.y = steer;
    }
    const target = vehicle.braking ? 1 : vehicle.reversing ? 0.5 : 0;
    this.brakeGlow += (target - this.brakeGlow) * Math.min(1, (dt || 0.016) * 18);
    this.brakeMat.emissiveIntensity = this.brakeGlow * 3;
  }

  dispose() {
    this.body.geometry.dispose();
    this.bodyMat.dispose();
    this.brakeLight.geometry.dispose();
    this.brakeMat.dispose();
    if (this.root.parent) this.root.parent.remove(this.root);
  }
}

/** Turn a CarView into a translucent, shadowless ghost (own materials). */
export function makeGhost(view) {
  const mats = [view.bodyMat];
  view.bodyMat.transparent = true;
  view.bodyMat.opacity = 0.32;
  view.bodyMat.depthWrite = false;
  const wheelMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, transparent: true, opacity: 0.32, depthWrite: false });
  for (const w of view.wheels) {
    w.mesh.material = wheelMat;
    w.mesh.castShadow = false;
  }
  mats.push(wheelMat);
  view.body.castShadow = false;
  view.brakeLight.visible = false;
  view.ghostMats = mats;
  const dispose = view.dispose.bind(view);
  view.dispose = () => {
    wheelMat.dispose();
    dispose();
  };
  return view;
}
