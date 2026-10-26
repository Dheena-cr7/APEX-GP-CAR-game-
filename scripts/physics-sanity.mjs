// Headless physics checks (pure JS, no browser). Used by `npm run verify`
// and runnable alone: `node scripts/physics-sanity.mjs`.
import { Vehicle } from '../src/cars/VehiclePhysics.js';
import { SURFACES } from '../src/cars/PhysicsConfig.js';
import { CARS } from '../src/cars/CarData.js';

const DT = 1 / 120;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function run(car, seconds, control) {
  const n = Math.round(seconds / DT);
  for (let i = 0; i < n; i++) {
    const t = i * DT;
    const input = control(t, car);
    if (input === null) return t;
    car.step(DT, input, input.surface || SURFACES.asphalt);
  }
  return seconds;
}

export function physicsChecks(stats = CARS[0].stats, label = CARS[0].name) {
  const out = [];
  const add = (name, ok, detail) => out.push({ name: `${label}: ${name}`, ok, detail });

  // 1. acceleration
  {
    const car = new Vehicle(stats);
    let t100 = -1;
    let t200 = -1;
    run(car, 40, (t, c) => {
      if (t100 < 0 && c.u >= 27.78) t100 = t;
      if (t200 < 0 && c.u >= 55.56) t200 = t;
      return { throttle: 1 };
    });
    const top = car.u * 3.6;
    add('0-100 km/h', t100 > 1.6 && t100 < 4.5, `${t100.toFixed(2)} s`);
    add('0-200 km/h', t200 > 4 && t200 < 12, `${t200.toFixed(2)} s`);
    add('top speed', top > 240 && top < 340, `${top.toFixed(0)} km/h, gear ${car.gear}, rpm ${car.rpm.toFixed(0)}`);
    add('goes straight', Math.abs(car.x) < 0.01 && Math.abs(car.h) < 1e-6, `x drift ${car.x.toFixed(4)}`);
  }

  // 2. braking 250 -> 0
  {
    const car = new Vehicle(stats);
    car.u = 250 / 3.6;
    const z0 = car.z;
    const t = run(car, 15, (tt, c) => (c.u <= 0.9 ? null : { brake: 1 }));
    const dist = car.z - z0;
    add('braking 250-0', dist > 50 && dist < 200 && car.u >= 0, `${dist.toFixed(1)} m in ${t.toFixed(2)} s`);
  }

  // 3. reverse
  {
    const car = new Vehicle(stats);
    run(car, 3, () => ({ brake: 1 }));
    add('reverses', car.u < -5 && car.gear === 0, `u ${car.u.toFixed(2)}`);
    run(car, 2, () => ({ brake: 1, steer: 1 }));
    add('reverse steering turns', Math.abs(car.h) > 0.2, `h ${car.h.toFixed(2)}`);
  }

  // 4. steady cornering: follow a circle of radius R with a P controller
  for (const R of [40, 120]) {
    const car = new Vehicle(stats);
    // start at (-R, 0) heading +z: the circle centre (origin) is on the left
    let best = 0;
    for (let vt = 10; vt <= 90; vt += 2) {
      car.reset(-R, 0, 0);
      car.u = vt;
      let ok = true;
      run(car, 6, (t, c) => {
        const rr = Math.hypot(c.x, c.z);
        // desired heading: tangent of CCW circle (left turn) + correction
        const ang = Math.atan2(c.x, c.z);
        const tangent = ang + Math.PI / 2;
        const err = wrap(tangent + (rr - R) * 0.04 - c.h);
        if (Math.abs(rr - R) > 6) ok = false;
        const speedErr = vt - c.u;
        return { steer: Math.max(-1, Math.min(1, -err * 3)), throttle: speedErr > 0 ? Math.min(1, speedErr * 0.5) : 0, brake: speedErr < -2 ? 0.3 : 0 };
      });
      if (ok && !car.drifting && car.u > vt - 3) best = vt;
      else break;
    }
    const lat = (best * best) / R;
    add(`grip corner R${R}`, lat > 12 && lat < 45, `${best} m/s, ${(lat / 9.81).toFixed(2)} g`);
  }

  // 5. handbrake drift: initiate, hold with constant inputs, recover
  {
    const car = new Vehicle(stats);
    car.u = 32;
    let maxSlip = 0;
    let driftTime = 0;
    let spun = false;
    let heldSlip = 0;
    run(car, 4, (t, c) => {
      const deg = (c.slip * 180) / Math.PI;
      maxSlip = Math.max(maxSlip, Math.abs(deg));
      if (Math.abs(deg) > 100) spun = true;
      if (c.drifting) driftTime += DT;
      heldSlip = deg;
      if (t < 0.45) return { steer: 1, handbrake: true, throttle: 0.4 };
      return { steer: 0.35, throttle: 0.85 };
    });
    add('handbrake starts drift', maxSlip > 15, `max slip ${maxSlip.toFixed(1)}°`);
    add('drift can be held', driftTime > 3.2 && car.drifting, `${driftTime.toFixed(2)} s drifting, holding ${heldSlip.toFixed(1)}° at ${(car.u * 3.6).toFixed(0)} km/h`);
    add('no spin while held', !spun, '');
    // steering further into the slide widens the angle
    const before = Math.abs(car.slip);
    run(car, 0.8, () => ({ steer: 1, throttle: 0.85 }));
    add('steering into the slide widens it', Math.abs(car.slip) > before + 0.05, `${((before * 180) / Math.PI).toFixed(1)}° -> ${((Math.abs(car.slip) * 180) / Math.PI).toFixed(1)}°`);
    const meter = car.boostMeter;
    run(car, 2.5, () => ({ steer: -0.5, throttle: 0.6 }));
    run(car, 1.5, () => ({ steer: 0, throttle: 0.6 }));
    add('counter-steer recovers', !car.drifting && Math.abs(car.slip) < 0.1, `slip ${((car.slip * 180) / Math.PI).toFixed(1)}°`);
    add('drift fills boost meter', meter > 0.3, `meter ${meter.toFixed(2)}`);
    add('boost fires on release', car.events.boost > 0, `boosts ${car.events.boost}`);
  }

  // 5b. lifting off the throttle ends a drift
  {
    const car = new Vehicle(stats);
    car.u = 32;
    run(car, 1.5, (t) => (t < 0.45 ? { steer: 1, handbrake: true, throttle: 0.4 } : { steer: 0.35, throttle: 0.85 }));
    const was = car.drifting;
    run(car, 2.5, () => ({ steer: 0 }));
    add('lift ends drift', was && !car.drifting, `slip ${((car.slip * 180) / Math.PI).toFixed(1)}°`);
  }

  // 6. brake-tap / lift initiation at speed (no handbrake)
  {
    const car = new Vehicle(stats);
    car.u = 45;
    let maxSlip = 0;
    run(car, 2.5, (t, c) => {
      maxSlip = Math.max(maxSlip, Math.abs(c.slip));
      if (t < 0.25) return { brake: 1, steer: 0 };
      return { steer: 1, throttle: t > 0.6 ? 1 : 0 };
    });
    add('turn-in rotates the car', maxSlip > 0.06, `max slip ${((maxSlip * 180) / Math.PI).toFixed(1)}°`);
  }

  // 7. stability: random steering pulses at speed never leave the car spinning
  {
    const car = new Vehicle(stats);
    car.u = 60;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    let s = 0;
    run(car, 12, (t) => {
      if (Math.floor(t * 4) !== Math.floor((t - DT) * 4)) s = rnd() * 2 - 1;
      return { steer: s, throttle: 0.8 };
    });
    run(car, 4, () => ({ steer: 0, throttle: 0.3 }));
    add('self-recovers after random input', Math.abs(car.slip) < 0.2 && Math.abs(car.r) < 0.6, `slip ${((car.slip * 180) / Math.PI).toFixed(1)}° r ${car.r.toFixed(2)}`);
  }

  // 8. low grip surfaces slow the car
  {
    const a = new Vehicle(stats);
    const g = new Vehicle(stats);
    a.u = g.u = 50;
    run(a, 3, () => ({ throttle: 1 }));
    run(g, 3, () => ({ throttle: 1, surface: SURFACES.sand }));
    add('sand drags', g.u < a.u - 8, `asphalt ${a.u.toFixed(1)} vs sand ${g.u.toFixed(1)}`);
  }
  // 9. creeping away from rest at full lock goes forward (no tyre-force reverse)
  {
    const car = new Vehicle(stats);
    run(car, 2, () => ({ throttle: 0.15, steer: 1 }));
    add('full-lock creep moves forward', car.u > 0.8 && car.gear === 1, `u ${car.u.toFixed(2)}`);
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1].endsWith('physics-sanity.mjs')) {
  let fail = 0;
  for (const car of CARS) {
    for (const r of physicsChecks(car.stats, car.name)) {
      if (!r.ok) fail++;
      console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  ${r.detail || ''}`);
    }
  }
  process.exit(fail ? 1 : 0);
}
