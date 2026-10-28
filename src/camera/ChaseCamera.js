// Chase camera: the gap between camera and car is split into an
// along-the-nose part, tracked rigidly (the camera sits exactly `dist`
// metres behind at any speed), and a sideways part that lags with
// frame-rate-independent damping 1 - exp(-k·dt). Heading lag ~3/s, lateral
// ~4/s. Drifting swings the camera toward the direction of travel and the FOV
// widens with speed.

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const damp = (k, dt) => 1 - Math.exp(-k * dt);

export const CHASE_PRESETS = Object.freeze({
  chase: { dist: 6.8, height: 2.45, lookAhead: 5.5, lookHeight: 0.9, fov: 62, headingK: 3, lateralK: 4, heightK: 7, swing: 0.55 },
  close: { dist: 5.0, height: 2.0, lookAhead: 6, lookHeight: 1.05, fov: 64, headingK: 3.6, lateralK: 5, heightK: 9, swing: 0.45 },
});

export class ChaseCamera {
  constructor(preset = CHASE_PRESETS.chase) {
    this.p = preset;
    this.yaw = 0;
    this.side = 0;
    this.y = 0;
    this.fov = preset.fov;
    this.pos = { x: 0, y: 0, z: 0 };
    this.look = { x: 0, y: 0, z: 0 };
    this.initialized = false;
  }

  setPreset(p) {
    this.p = p;
  }

  /** Snap to the ideal pose (after a reset / teleport / mode switch). */
  snap(car) {
    this.yaw = car.h;
    this.side = 0;
    this.y = car.y + this.p.height;
    this.fov = this.p.fov;
    this.initialized = true;
  }

  /**
   * car: {x, y, z, h, speed, slip} (interpolated). dt: frame seconds.
   * clamp(pos) may push the camera back inside the barriers.
   */
  update(car, dt, clamp) {
    const p = this.p;
    if (!this.initialized) this.snap(car);
    // heading lag + drift swing toward the velocity direction
    const targetYaw = car.h + car.slip * p.swing;
    this.yaw += wrap(targetYaw - this.yaw) * damp(p.headingK, dt);
    const fx = Math.sin(car.h);
    const fz = Math.cos(car.h);
    const rx = -fz;
    const rz = fx;
    // ideal camera direction from the lagged yaw, split in the car frame
    const cfx = Math.sin(this.yaw);
    const cfz = Math.cos(this.yaw);
    const sideTarget = -p.dist * (cfx * rx + cfz * rz);
    this.side += (sideTarget - this.side) * damp(p.lateralK, dt);
    // along-the-nose distance is rigid
    const along = -Math.sqrt(Math.max(0.01, p.dist * p.dist - this.side * this.side));
    let x = car.x + fx * along + rx * this.side;
    let z = car.z + fz * along + rz * this.side;
    const targetY = car.y + p.height;
    this.y += (targetY - this.y) * damp(p.heightK, dt);
    if (Math.abs(this.y - targetY) > 4) this.y = targetY;
    let y = this.y;
    if (clamp) {
      const c = clamp(x, y, z);
      x = c.x;
      y = c.y;
      z = c.z;
    }
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
    const lookYaw = car.h + car.slip * p.swing * 0.6;
    this.look.x = car.x + Math.sin(lookYaw) * p.lookAhead;
    this.look.z = car.z + Math.cos(lookYaw) * p.lookAhead;
    this.look.y = car.y + p.lookHeight;
    const speedFov = Math.min(1, car.speed / 85) * 13;
    const driftFov = Math.min(1, Math.abs(car.slip) / 0.6) * 6;
    const boostFov = car.boost ? 9 : 0; // nitro punch
    this.fov += (p.fov + speedFov + driftFov + boostFov - this.fov) * damp(car.boost ? 5 : 3, dt);
    return this;
  }
}
