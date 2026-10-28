import * as THREE from 'three';
import { ChaseCamera, CHASE_PRESETS } from './ChaseCamera.js';

export const CAMERA_MODES = Object.freeze(['chase', 'close', 'cockpit', 'tv']);
export const CAMERA_LABELS = Object.freeze({ chase: 'Chase', close: 'Close chase', cockpit: 'Cockpit', tv: 'TV' });

const _v = new THREE.Vector3();

/**
 * Owns the race camera and its modes. The camera is kept inside the
 * barriers and above the road surface via the track model.
 */
export class CameraRig {
  constructor(mode = 'chase') {
    this.camera = new THREE.PerspectiveCamera(62, 1, 0.15, 2600);
    this.chase = new ChaseCamera(CHASE_PRESETS.chase);
    this.mode = CAMERA_MODES.includes(mode) ? mode : 'chase';
    this.model = null;
    this.tvSpots = [];
    this.tvIndex = -1;
    this.carState = { x: 0, y: 0, z: 0, h: 0, speed: 0, slip: 0 };
    this._proj = { s: 0, t: 0, i: -1 };
    this._clampOut = { x: 0, y: 0, z: 0 };
    this._tmp = { x: 0, y: 0, z: 0, tx: 0, tz: 1, i: 0 };
    this._clamp = this._clamp.bind(this);
    this.shake = 0;
    this.shakeT = 0;
    this._applyPreset();
  }

  setTrack(model) {
    this.model = model;
    this._proj.i = -1;
    // trackside TV cameras every ~140 m, alternating sides, just behind the barrier
    this.tvSpots = [];
    const p = { x: 0, y: 0, z: 0 };
    const count = Math.max(6, Math.round(model.length / 140));
    for (let i = 0; i < count; i++) {
      const s = (model.length * (i + 0.5)) / count;
      if (model.isTunnel(s) || model.isTunnel(s + 40) || model.isTunnel(s - 40)) continue;
      const side = i % 2 ? 1 : -1;
      const t = side * (model.wallOffset(s) + 2.5);
      model.pointAt(s, t, p);
      this.tvSpots.push({ s, x: p.x, y: model.heightAt(s, side * model.wallOffset(s)) + 7.5, z: p.z });
    }
  }

  setMode(mode) {
    this.mode = mode;
    this._applyPreset();
    this.chase.initialized = false;
    this.tvIndex = -1;
  }

  cycle() {
    const i = CAMERA_MODES.indexOf(this.mode);
    this.setMode(CAMERA_MODES[(i + 1) % CAMERA_MODES.length]);
    return this.mode;
  }

  _applyPreset() {
    if (this.mode === 'close') this.chase.setPreset(CHASE_PRESETS.close);
    else this.chase.setPreset(CHASE_PRESETS.chase);
  }

  setAspect(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  addShake(amount) {
    this.shake = Math.min(1, this.shake + amount);
  }

  snap() {
    this.chase.initialized = false;
    this._proj.i = -1; // long jumps: the cached projection hint is stale
    this.tvIndex = -1;
  }

  /** Keep a camera point inside the barriers and above the road. */
  _clamp(x, y, z) {
    const out = this._clampOut;
    out.x = x;
    out.y = y;
    out.z = z;
    const m = this.model;
    if (!m) return out;
    const pr = m.project(x, z, this._proj.i, this._proj);
    const limit = m.wallOffset(pr.s) - 0.45;
    const p = this._tmp;
    if (Math.abs(pr.t) > limit) {
      m.pointAt(pr.s, Math.sign(pr.t) * limit, p);
      out.x = p.x;
      out.z = p.z;
    }
    const ground = m.heightAt(pr.s, Math.max(-limit, Math.min(limit, pr.t)));
    if (out.y < ground + 0.7) out.y = ground + 0.7;
    return out;
  }

  /**
   * car: interpolated pose {x, y, z, h, speed, slip}; view: CarView (for the
   * cockpit attachment).
   */
  update(car, dt) {
    const cam = this.camera;
    let fov = 62;
    if (this.mode === 'cockpit') {
      const fx = Math.sin(car.h);
      const fz = Math.cos(car.h);
      cam.position.set(car.x + fx * 0.15, car.y + 0.98, car.z + fz * 0.15);
      _v.set(car.x + fx * 30, car.y + 0.6, car.z + fz * 30);
      cam.up.set(0, 1, 0);
      cam.lookAt(_v);
      fov = 72 + Math.min(1, car.speed / 85) * 8;
    } else if (this.mode === 'tv' && this.tvSpots.length) {
      // pick the spot nearest the car along the track (slightly ahead)
      const m = this.model;
      const pr = m.project(car.x, car.z, this._proj.i, this._proj);
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < this.tvSpots.length; i++) {
        const d = Math.abs(m.deltaS(pr.s + 25, this.tvSpots[i].s));
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      this.tvIndex = best;
      const sp = this.tvSpots[best];
      cam.position.set(sp.x, sp.y, sp.z);
      cam.lookAt(car.x, car.y + 0.6, car.z);
      const dist = Math.hypot(sp.x - car.x, sp.z - car.z);
      fov = Math.max(10, Math.min(50, 1100 / Math.max(20, dist)));
    } else {
      const c = this.chase.update(car, dt, this._clamp);
      cam.position.set(c.pos.x, c.pos.y, c.pos.z);
      cam.lookAt(c.look.x, c.look.y, c.look.z);
      fov = c.fov;
    }
    // impact shake (decays fast)
    if (this.shake > 0.001) {
      this.shakeT += dt * 60;
      const a = this.shake * 0.12;
      cam.position.x += Math.sin(this.shakeT * 1.7) * a;
      cam.position.y += Math.sin(this.shakeT * 2.3) * a * 0.6;
      this.shake *= Math.exp(-dt * 7);
    }
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  }
}
