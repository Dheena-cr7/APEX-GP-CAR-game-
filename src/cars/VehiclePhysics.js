// Arcade vehicle model: a single-track ("bicycle") car with saturating tyres,
// load transfer and downforce, blended to a kinematic model at low speed.
// Drift comes from the rear axle losing grip (handbrake, braking load
// transfer, power oversteer) and is shaped by small assists: a self-
// stabilising torque, an anti-spin guard and a little thrust on throttle.
//
// Units: metres, seconds, radians. Heading h: forward = (sin h, cos h) in
// world x/z, increasing h turns left. Local velocity: u forward, v left.
// Pure JS (no three.js) so it can be tuned and tested in Node.

import { PHYSICS as P, SURFACES, G, deriveParams } from './PhysicsConfig.js';

const clamp = (x, lo, hi) => (x < lo ? lo : x > hi ? hi : x);
const sign = (x) => (x > 0 ? 1 : x < 0 ? -1 : 0);

function tyre(x, falloff) {
  const ax = x < 0 ? -x : x;
  const y = ax <= 1 ? ax : 1 - falloff * Math.min(1, (ax - 1) / 3);
  return x < 0 ? -y : y;
}

export class Vehicle {
  /**
   * handling: 'arcade' (NFS-style: drift is a controlled state steered by the
   * player, very forgiving) or 'sim' (tyre-balance drift with assists).
   */
  constructor(stats, { assist = 'medium', handling = 'arcade' } = {}) {
    this.stats = stats;
    this.params = deriveParams(stats);
    this.handling = handling;
    this.setAssist(assist);
    this.events = { driftStart: 0, driftEnd: 0, boost: 0, shift: 0 };
    this.reset(0, 0, 0);
  }

  setAssist(level) {
    this.assist = P.assist[level] || P.assist.medium;
  }

  reset(x, z, heading, y = 0) {
    this.x = x;
    this.z = z;
    this.y = y;
    this.h = heading;
    this.px = x;
    this.pz = z;
    this.py = y;
    this.ph = heading;
    this.u = 0;
    this.v = 0;
    this.r = 0;
    this.steer = 0;
    this.steerAngle = 0;
    this.throttle = 0;
    this.brakeInput = 0;
    this.handbrake = false;
    this.gear = 1;
    this.rpm = P.idleRpm;
    this.shiftTimer = 0;
    this.drifting = false;
    this.driftTime = 0;
    this.exitTimer = 0;
    this.slip = 0; // body slip angle (rad, signed, + = sliding left)
    this.driftSide = 1;
    this.pathRate = 0;
    this.prevPsi = heading;
    this.boostTime = 0;
    this.boostAccel = 0;
    this.nitro = P.nitroStart; // 0..1 tank
    this.nitroActive = false;
    this.speedbreak = false; // set by the race while speedbreaker runs
    this.recovering = false;
    this.brakeTapTimer = 9; // seconds since the brake was last pressed at speed
    this.surface = SURFACES.asphalt;
    this.longAccel = 0;
    this.latAccel = 0;
    this.skid = 0;
    this.wheelAngle = 0;
    this.braking = false;
    this.reversing = false;
    this.lastImpact = 0;
    this.slipstream = 0; // 0..1, set by the race when tucked behind another car
  }

  /** Snapshot positions for render interpolation (call before each step). */
  savePrev() {
    this.px = this.x;
    this.pz = this.z;
    this.py = this.y;
    this.ph = this.h;
  }

  get speed() {
    return Math.hypot(this.u, this.v);
  }

  /** World-space velocity. */
  get vx() {
    return Math.sin(this.h) * this.u + Math.cos(this.h) * this.v;
  }

  get vz() {
    return Math.cos(this.h) * this.u - Math.sin(this.h) * this.v;
  }

  setWorldVelocity(vx, vz) {
    const s = Math.sin(this.h);
    const c = Math.cos(this.h);
    this.u = vx * s + vz * c;
    this.v = vx * c - vz * s;
  }

  triggerBoost(duration, accel) {
    if (duration <= 0) return;
    this.boostTime = Math.max(this.boostTime, duration);
    this.boostAccel = Math.max(accel, this.boostTime > 0 ? this.boostAccel : 0);
    this.events.boost++;
  }

  /** HUD alias: the nitro tank. */
  get boostMeter() {
    return this.nitro;
  }

  /** Add nitro (near misses, tokens…), clamped to a full tank. */
  addNitro(amount) {
    this.nitro = Math.min(1, this.nitro + amount);
  }

  /** Start an arcade drift toward `side` (+1 = turning right). */
  startDrift(side) {
    if (this.drifting) return;
    this.drifting = true;
    this.driftSide = side;
    this.driftTime = 0;
    this.exitTimer = 0;
    this.recovering = false;
    this.events.driftStart++;
  }

  /**
   * Advance one fixed step.
   * input: {throttle 0..1, brake 0..1, steer -1..1 (+right), handbrake bool, boost bool}
   * surface: entry of SURFACES under the car.
   */
  step(dt, input, surface = SURFACES.asphalt) {
    const p = this.params;
    const a = P.cgToFront;
    const b = P.cgToRear;
    const L = a + b;
    this.surface = surface;

    // ---- steering (smoothed, speed sensitive) ----
    const target = clamp(input.steer || 0, -1, 1);
    const growing = Math.abs(target) > Math.abs(this.steer) && sign(target) === sign(this.steer || target);
    const rate = (growing ? P.steerRate * p.steerRateMul : P.steerReturn) * (this.speedbreak ? 1.3 : 1) * dt;
    this.steer += clamp(target - this.steer, -rate, rate);
    let lock = Math.max(P.steerLockMin, P.steerLockLow / (1 + Math.abs(this.u) / P.steerSpeedFalloff));
    if (this.drifting) lock = Math.max(lock, 0.3);
    const delta = -this.steer * lock;
    this.steerAngle = delta;

    // ---- longitudinal ----
    const throttle = clamp(input.throttle || 0, 0, 1);
    const brake = clamp(input.brake || 0, 0, 1);
    this.throttle = throttle;
    this.brakeInput = brake;
    this.handbrake = !!input.handbrake;
    const u = this.u;
    const vTopEff = p.vTop * (this.boostTime > 0 ? P.boostTopSpeedBonus : 1) * (this.nitroActive ? P.nitroTopSpeedBonus : 1);
    let fx = 0;
    this.braking = false;
    this.reversing = false;
    if (throttle > 0) {
      if (u < -0.5) {
        fx += p.brakeDecel * throttle;
        this.braking = true;
      } else {
        const ratio = Math.max(0, u) / vTopEff;
        let eng = p.maxAccel * Math.max(0, 1 - ratio * ratio * ratio) + P.rolling + P.aeroDrag * u * u;
        if (this.shiftTimer > 0) eng *= 0.35;
        fx += throttle * eng;
      }
    }
    if (brake > 0) {
      if (u > 0.8) {
        fx -= brake * p.brakeDecel;
        this.braking = true;
      } else if (throttle < 0.1 && u > -P.reverseMax) {
        fx -= P.reverseAccel * brake;
        this.reversing = true;
      }
    }
    const su = sign(u);
    if (Math.abs(u) > 0.05) {
      fx -= su * (P.rolling + P.aeroDrag * u * u);
      if (throttle < 0.05) fx -= su * P.engineBrake;
      fx -= su * surface.drag * clamp(Math.abs(u) / 15, 0, 1);
      if (this.handbrake) fx -= su * P.handbrakeDecel;
    }
    if (this.boostTime > 0) {
      fx += this.boostAccel * clamp(1 - Math.max(0, u) / (vTopEff * 1.05), 0, 1) + P.aeroDrag * u * u;
      this.boostTime -= dt;
      if (this.boostTime <= 0) {
        this.boostTime = 0;
        this.boostAccel = 0;
      }
    }
    // nitrous: hold boost to burn the tank
    this.nitroActive = !!input.boost && this.nitro > 0.01 && u > -0.5;
    if (this.nitroActive) {
      const vN = p.vTop * P.nitroTopSpeedBonus;
      fx += P.nitroAccel * clamp(1.08 - Math.max(0, u) / vN, 0, 1) + P.aeroDrag * u * u;
      this.nitro = Math.max(0, this.nitro - P.nitroBurn * dt);
    }
    if (this.drifting && throttle > 0) fx += throttle * P.driftThrottleThrust;
    // brake-to-drift timing (NFS: tap the brake, turn in, back on the gas)
    if (brake > 0.5 && u > 18) this.brakeTapTimer = 0;
    else this.brakeTapTimer += dt;
    // slipstream: less drag behind another car (also lifts the top speed a little)
    if (this.slipstream > 0 && throttle > 0) fx += this.slipstream * (P.slipstreamAccel + P.aeroDrag * u * u * 0.35);

    // ---- tyre loads (per unit mass) ----
    const load = G * (1 + p.downforce * u * u);
    const ax = this.longAccel;
    let nf = (load * b) / L - (ax * P.cgHeight) / L;
    let nr = (load * a) / L + (ax * P.cgHeight) / L;
    nf = Math.max(nf, load * 0.15);
    nr = Math.max(nr, load * 0.15);
    const arcade = this.handling === 'arcade';
    const mu = p.mu * surface.grip * (arcade ? P.arcadeGrip : 1) * (this.speedbreak ? P.speedbreakGrip : 1);
    const df = mu * nf;
    let dr = mu * nr;
    if (this.handbrake && u > 2) dr *= P.handbrakeRearGrip;
    else if (this.drifting) {
      // the slide only stays loose while the player keeps steering or on throttle
      const hold = Math.min(1, throttle * 1.25 + Math.abs(this.steer) * 0.6);
      dr *= 1 - (1 - p.driftRearGrip) * hold;
    }
    // power oversteer: drive force eats into rear lateral grip
    if (throttle > 0 && u > 2) dr *= 1 - p.powerOversteer * throttle * 0.3 * clamp(1 - u / 45, 0, 1);

    // ---- dynamic (single track) ----
    let nu = this.u;
    let nv = this.v;
    let nrYaw = this.r;
    const uAbs = Math.max(Math.abs(u), 1);
    const alphaF = delta - Math.atan2(this.v + a * this.r, uAbs);
    const alphaR = -Math.atan2(this.v - b * this.r, uAbs);
    const fyf = df * tyre(P.corneringFront * alphaF, P.tyreFalloff);
    const fyr = dr * tyre(P.corneringRear * alphaR, P.tyreFalloff);
    const cd = Math.cos(delta);
    const sd = Math.sin(delta);
    // low speed: tyre side forces fade in with the kinematic blend (below
    // ~5 m/s a fully locked front tyre must not brake the car backwards)
    const k = u < 0 ? 0 : clamp((Math.abs(u) - 1.5) / (P.lowSpeedBlend - 1.5), 0, 1);
    let du = fx + k * (-fyf * sd + this.v * this.r);
    let dv = fyf * cd + fyr - u * this.r;
    let dyaw = (a * fyf * cd - b * fyr) / (a * b);

    // handbrake flick: pulling the handbrake while steering swings the tail out
    if (this.handbrake && u > 8) dyaw += -this.steer * P.handbrakeYaw * clamp(u / 22, 0, 1.2);

    // anti-spin guard
    const beta = u > 0.5 ? Math.atan2(this.v, u) : 0;
    this.slip = beta;
    const absBeta = Math.abs(beta);
    if (u > 3 && absBeta > this.assist.maxAngle) dyaw += sign(beta) * this.assist.spin * (absBeta - this.assist.maxAngle);

    nu += du * dt;
    nv += dv * dt;
    nrYaw += dyaw * dt;

    // drift assist: steer the slip angle toward a target chosen by the
    // player. Steering into the slide widens it, counter-steer or lifting
    // narrows it (and ends the drift). beta' = pathRate - r, so the yaw rate
    // that moves beta toward the target is pathRate - side * k * error.
    if (!arcade && this.drifting && u > 3) {
      const side = this.driftSide;
      const into = this.steer * side;
      let target = (0.4 + 0.34 * into) * clamp((throttle - 0.15) / 0.65, 0, 1) * p.driftAngleMul;
      target = clamp(target, 0, this.assist.maxAngle - 0.06);
      const rTarget = this.pathRate - side * 3.2 * (target - absBeta);
      nrYaw += (rTarget - nrYaw) * (1 - Math.exp(-this.assist.hold * p.driftStab * dt));
    }

    // arcade drift: the slide is a controlled state. Steering sets the
    // path's turn rate and the slip angle, throttle holds it, letting go of
    // the steering (or counter-steering / lifting) straightens the car.
    let arcadeDrift = false;
    if (arcade && this.drifting && u > 3) {
      arcadeDrift = true;
      const side = this.driftSide;
      const V = Math.hypot(this.u, this.v);
      const into = this.steer * side;
      const beta0 = Math.atan2(this.v, Math.max(0.5, this.u));
      // exit logic: counter-steer, straight wheels with no handbrake, lift, too slow
      const wantExit = into < -0.45 || (Math.abs(this.steer) < 0.12 && !this.handbrake) || throttle < 0.12 || V < P.driftMinSpeed * 0.75;
      this.exitTimer = wantExit ? this.exitTimer + dt : 0;
      if (this.exitTimer > P.arcadeExitDelay) this.recovering = true;
      let betaT = 0;
      if (!this.recovering) {
        betaT = side * clamp((P.arcadeAngle + P.arcadeAngleSteer * into + (this.handbrake ? 0.14 : 0)) * p.driftAngleMul, 0.1, 0.8);
      }
      const betaRate = this.recovering ? P.arcadeRecover : P.arcadeAngleRate;
      const beta = beta0 + (betaT - beta0) * (1 - Math.exp(-betaRate * dt));
      // path curvature from lateral grip, tightened by steering into the slide
      const aLat = mu * G * (1 + p.downforce * V * V) * (0.72 + 0.32 * Math.max(-0.5, into) + (this.handbrake ? 0.2 : 0));
      const turn = this.recovering ? Math.abs(this.pathRate) * Math.exp(-3 * dt) : aLat / Math.max(8, V);
      const psi = this.h + beta0;
      const psiN = psi - side * turn * dt;
      // speed: longitudinal force projected on the path, minus slide scrub
      const Vn = Math.max(0, V + (fx * Math.cos(beta0) * P.arcadeDrive - P.arcadeScrub * Math.abs(Math.sin(beta0)) * clamp(V / 20, 0, 1.5)) * dt);
      const hN = psiN - beta;
      let dh = hN - this.h;
      if (dh > Math.PI) dh -= Math.PI * 2;
      else if (dh < -Math.PI) dh += Math.PI * 2;
      nrYaw = dh / dt;
      nu = Vn * Math.cos(beta);
      nv = Vn * Math.sin(beta);
      if (this.recovering && Math.abs(beta) < 0.05) this.endDrift(true);
    }

    // braking must not flip the direction of travel
    if (this.braking && u > 0 && nu < 0) nu = 0;
    if (this.braking && u < 0 && nu > 0) nu = 0;

    // ---- low speed / reverse: kinematic blend ----
    if (k < 1 && !arcadeDrift) {
      const kinR = (nu * Math.tan(delta)) / L;
      const kinV = this.v * Math.exp(-12 * dt);
      nrYaw = kinR + (nrYaw - kinR) * k;
      nv = kinV + (nv - kinV) * k;
    }
    if (nu < -P.reverseMax) nu = -P.reverseMax;

    // accelerations for load transfer / body motion (smoothed)
    const longA = (nu - this.u) / dt - this.v * this.r;
    const latA = (nv - this.v) / dt + this.u * this.r;
    this.longAccel += (clamp(longA, -40, 30) - this.longAccel) * Math.min(1, dt * 10);
    this.latAccel += (clamp(latA, -45, 45) - this.latAccel) * Math.min(1, dt * 8);

    this.u = nu;
    this.v = nv;
    this.r = nrYaw;

    // ---- integrate pose ----
    const sh = Math.sin(this.h);
    const ch = Math.cos(this.h);
    this.x += (sh * this.u + ch * this.v) * dt;
    this.z += (ch * this.u - sh * this.v) * dt;
    this.h += this.r * dt;
    if (this.h > Math.PI) this.h -= Math.PI * 2;
    else if (this.h < -Math.PI) this.h += Math.PI * 2;
    // keep the interpolation pair continuous across the wrap
    if (this.h - this.ph > Math.PI) this.ph += Math.PI * 2;
    else if (this.h - this.ph < -Math.PI) this.ph -= Math.PI * 2;

    // ---- path turn rate (direction of travel) ----
    const spd = Math.hypot(this.u, this.v);
    const psi = Math.atan2(sh * this.u + ch * this.v, ch * this.u - sh * this.v);
    if (spd > 3) {
      let d = psi - this.prevPsi;
      if (d > Math.PI) d -= Math.PI * 2;
      else if (d < -Math.PI) d += Math.PI * 2;
      this.pathRate += (d / dt - this.pathRate) * Math.min(1, dt * 30);
    } else this.pathRate = 0;
    this.prevPsi = psi;

    // ---- drift state ----
    const slipNow = this.u > 0.5 ? Math.atan2(this.v, this.u) : 0;
    const absSlip = Math.abs(slipNow);
    if (arcade) {
      if (!this.drifting && this.u > P.driftMinSpeed) {
        const st = this.steer;
        // handbrake + steering, or a brake tap then turn-in on the gas, or a big natural slide
        if (this.handbrake && Math.abs(st) > 0.25) this.startDrift(sign(st));
        else if (this.brakeTapTimer < P.brakeTapWindow && Math.abs(st) > 0.55 && throttle > 0.3 && this.u > 18) this.startDrift(sign(st));
        else if (absSlip > p.driftEnter * 1.3) this.startDrift(sign(slipNow));
      } else if (this.drifting) this.driftTime += dt;
    } else {
      if (this.drifting && sign(slipNow) !== this.driftSide && absSlip > p.driftEnter) {
        // flicked into the other direction: end and immediately restart
        this.endDrift(true);
      }
      if (!this.drifting) {
        if (this.u > P.driftMinSpeed && absSlip > p.driftEnter) {
          this.drifting = true;
          this.driftSide = sign(slipNow);
          this.driftTime = 0;
          this.exitTimer = 0;
          this.events.driftStart++;
        }
      } else {
        this.driftTime += dt;
        this.exitTimer = absSlip < P.driftExitAngle ? this.exitTimer + dt : 0;
        if (this.exitTimer > P.driftExitDelay || this.u < P.driftMinSpeed * 0.6) this.endDrift(true);
      }
    }
    // nitro refills: drifting, flat-out speed, slipstream
    if (this.drifting) this.nitro = Math.min(1, this.nitro + p.driftBoostGain * P.nitroDriftFill * (0.4 + Math.min(1.2, absSlip / 0.5)) * clamp(this.u / 30, 0, 1.4) * dt);
    if (this.u > p.vTop * 0.78 && !this.nitroActive) this.nitro = Math.min(1, this.nitro + P.nitroSpeedFill * dt);
    if (this.slipstream > 0) this.nitro = Math.min(1, this.nitro + P.nitroDraftFill * this.slipstream * dt);

    // ---- gears / rpm / wheels ----
    this.updateDrivetrain(dt, throttle);
    this.wheelAngle += (this.u / 0.34) * dt;
    if (this.wheelAngle > 1e4 || this.wheelAngle < -1e4) this.wheelAngle %= Math.PI * 2;
    this.skid = this.u > 5 && surface !== SURFACES.grass && surface !== SURFACES.sand ? clamp((absSlip - 0.09) * 4.5, 0, 1) + (this.handbrake && this.u > 6 ? 0.4 : 0) : 0;
    if (this.skid > 1) this.skid = 1;
  }

  /** End the current drift (clean = straightened out, else broken by a hit). */
  endDrift(clean) {
    if (!this.drifting) return;
    this.drifting = false;
    this.recovering = false;
    this.exitTimer = 0;
    this.events.driftEnd++;
    if (!clean) this.r *= 0.5;
  }

  updateDrivetrain(dt, throttle) {
    const p = this.params;
    const u = this.u;
    let gear;
    if (u < -0.5) gear = 0;
    else {
      gear = P.gearRatios.length;
      for (let i = 0; i < P.gearRatios.length; i++) {
        if (u < P.gearRatios[i] * p.vTop) {
          gear = i + 1;
          break;
        }
      }
    }
    // hysteresis: only drop a gear once clearly below the shift point
    if (gear > 0 && this.gear > 0 && gear < this.gear && u > P.gearRatios[gear - 1] * p.vTop * 0.93) gear = this.gear;
    if (gear > this.gear && this.gear > 0) {
      this.shiftTimer = P.shiftTime;
      this.events.shift++;
    }
    this.gear = gear;
    if (this.shiftTimer > 0) this.shiftTimer = Math.max(0, this.shiftTimer - dt);
    let target;
    if (gear === 0) target = P.idleRpm + (Math.abs(u) / P.reverseMax) * 5000;
    else {
      const top = P.gearRatios[gear - 1] * p.vTop;
      target = (P.maxRpm * Math.max(0, u)) / top;
      if (gear === 1) target = Math.max(target, P.idleRpm + throttle * 3000);
    }
    target = clamp(target, P.idleRpm, P.maxRpm);
    this.rpm += (target - this.rpm) * Math.min(1, dt * 14);
  }

  /**
   * Resolve a contact. (nx, nz) is the unit normal pointing out of the
   * obstacle toward the car, depth the penetration. Returns the impact speed.
   */
  applyContact(nx, nz, depth, restitution = P.wallRestitution, friction = P.wallFriction) {
    this.x += nx * depth;
    this.z += nz * depth;
    let vx = this.vx;
    let vz = this.vz;
    const vn = vx * nx + vz * nz;
    if (vn >= 0) return 0;
    const impact = -vn;
    // remove normal velocity (+ a little bounce), scrape tangential speed
    vx -= (1 + restitution) * vn * nx;
    vz -= (1 + restitution) * vn * nz;
    const tx = -nz;
    const tz = nx;
    const vt = vx * tx + vz * tz;
    const scrape = Math.min(Math.abs(vt), friction * impact + 0.5 * impact * P.wallSpeedLoss);
    vx -= sign(vt) * scrape * tx;
    vz -= sign(vt) * scrape * tz;
    this.setWorldVelocity(vx, vz);
    // hard hits kill rotation; glancing scrapes straighten the car a bit
    this.r *= impact > 8 ? 0.4 : 0.85;
    this.lastImpact = impact;
    return impact;
  }

  /** Simple push used for soft obstacles (cones, tyres): impulse along normal. */
  applyImpulse(ix, iz) {
    this.setWorldVelocity(this.vx + ix, this.vz + iz);
  }
}
