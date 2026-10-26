// Injected into the page by scripts/verify.mjs. Reads the car through the
// window.__apex debug hook and drives by pressing real key events (the same
// path a player's keyboard takes). Runs on its own requestAnimationFrame and
// checks invariants on EVERY frame, not only at screenshots.
(() => {
  const KEYS = { throttle: 'KeyW', brake: 'KeyS', left: 'KeyA', right: 'KeyD', handbrake: 'Space', boost: 'ShiftLeft' };
  const down = new Set();
  function key(code, on) {
    if (on === down.has(code)) return;
    if (on) down.add(code);
    else down.delete(code);
    window.dispatchEvent(new KeyboardEvent(on ? 'keydown' : 'keyup', { code, key: code, bubbles: true }));
  }
  function releaseAll() {
    for (const c of Array.from(down)) key(c, false);
  }
  const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  const AP = {
    active: false,
    track: null,
    plan: [], // [{s0, s1, offset?, action}] scripted deviations (wall hit, cones, drift)
    status: { frames: 0, failures: [], events: [], samples: [], laps: 0, done: false, shot: null, maxPen: 0, camInside: 0, wallHits: 0, conesHit: 0, drifts: 0 },
    acc: { steer: 0, thr: 0 },
    targetLaps: 1,
    lastSample: -1,
    prevLap: -1,
    lapEvents: 0,
    shotsTaken: {},

    start({ laps = 1, plan = [], speedScale = 0.92 } = {}) {
      this.track = window.__apex.getTrack();
      this.plan = plan;
      this.targetLaps = laps;
      this.speedScale = speedScale;
      this.active = true;
      this.status = { frames: 0, failures: [], events: [], samples: [], laps: 0, done: false, shot: null, maxPen: 0, camInside: 0, wallHits: 0, conesHit: 0, drifts: 0 };
      this.prevLap = -1;
      this.lapEvents = 0;
      this.shotsTaken = {};
      this.lastSample = -1;
      this.acc = { steer: 0, thr: 0 };
      this.inPlan = null;
      requestAnimationFrame(() => this.tick());
    },

    stop() {
      this.active = false;
      releaseAll();
    },

    fail(msg) {
      if (this.status.failures.length < 40) this.status.failures.push(msg);
    },

    idx(s) {
      const tr = this.track;
      const i = Math.floor((((s % tr.length) + tr.length) % tr.length) / tr.ds);
      return Math.min(tr.n - 1, Math.max(0, i));
    },

    point(s, t) {
      const tr = this.track;
      const i = this.idx(s);
      return { x: tr.px[i] - tr.tz[i] * t, z: tr.pz[i] + tr.tx[i] * t };
    },

    minSpeed(s, ahead) {
      let v = Infinity;
      for (let d = 0; d <= ahead; d += 4) v = Math.min(v, this.track.speed[this.idx(s + d)]);
      return v;
    },

    activePlan(s) {
      for (const p of this.plan) {
        const a = p.s0;
        const b = p.s1;
        const inside = a <= b ? s >= a && s < b : s >= a || s < b;
        if (inside && !p.done) return p;
      }
      return null;
    },

    tick() {
      if (!this.active) return;
      requestAnimationFrame(() => this.tick());
      const api = window.__apex;
      const car = api.getCar();
      const race = api.getRace();
      if (!car || !race) return;
      const st = this.status;
      st.frames++;

      // ---------- invariants, every frame ----------
      if (car.camera.inside) {
        st.camInside++;
        this.fail(`camera inside ${car.camera.inside} at s=${car.s.toFixed(1)} frame ${st.frames}`);
      }
      if (car.penetration > 0.01) this.fail(`car overlaps a solid by ${(car.penetration * 100).toFixed(1)} cm at s=${car.s.toFixed(1)}`);
      st.maxPen = Math.max(st.maxPen, car.penetration);
      if (car.lap !== this.prevLap) {
        if (this.prevLap >= 0 && car.lap > this.prevLap + 1) this.fail(`lap skipped: ${this.prevLap} -> ${car.lap}`);
        if (car.lap > this.prevLap && this.prevLap >= 0) {
          this.lapEvents++;
          st.events.push({ type: 'lap', lap: car.lap, time: race.time, lapTimes: car.lapTimes });
        }
        this.prevLap = car.lap;
      }
      if (car.lapTimes.length !== Math.max(0, car.lap) && race.state !== 'grid') {
        this.fail(`lap times (${car.lapTimes.length}) do not match laps (${car.lap})`);
      }
      // samples every 0.5 s of race time
      const tick = Math.floor(race.time * 2);
      if (race.state !== 'countdown' && tick !== this.lastSample) {
        this.lastSample = tick;
        st.samples.push({ time: Math.round(race.time * 1000) / 1000, x: car.x, z: car.z, h: car.h, speed: car.speed, s: car.s, t: car.t, cam: [car.camera.x, car.camera.y, car.camera.z], fov: car.camera.fov });
      }
      st.laps = car.lap;
      st.drift = car.drift;
      st.raceState = race.state;
      if (race.state === 'countdown' || race.state === 'grid') {
        releaseAll();
        return;
      }
      if (car.lap >= this.targetLaps || car.finished) {
        st.done = true;
        this.stop();
        return;
      }

      // ---------- driving ----------
      const tr = this.track;
      const speed = car.speed;
      const plan = this.activePlan(car.s);
      if (plan !== this.inPlan) {
        if (this.inPlan) this.inPlan.done = true;
        this.inPlan = plan;
        if (plan) st.events.push({ type: 'plan', action: plan.action, s: car.s, time: race.time });
      }
      const look = plan && plan.look ? plan.look : 8 + speed * 0.42;
      const sT = car.s + look;
      let off = tr.line[this.idx(sT)];
      let vTarget = this.minSpeed(car.s, speed * 0.6 + 12) * this.speedScale;
      let handbrake = false;
      if (plan) {
        if (plan.action === 'wall') {
          off = plan.offset;
          vTarget = Math.min(vTarget, plan.speed || 22);
        } else if (plan.action === 'cones') {
          off = plan.offset;
          vTarget = Math.min(vTarget, plan.speed || 30);
        } else if (plan.action === 'drift') {
          vTarget = Math.max(vTarget, plan.speed || 30);
          handbrake = car.s - plan.s0 < 6 && car.s - plan.s0 >= 0;
        }
        if (plan.action === 'wall' && car.lastImpactAge < 0.05) plan.hit = true;
        if (plan.action === 'wall' && plan.hit && car.lastImpactAge > 0.6) plan.done = true;
      }
      const p = this.point(sT, off);
      const err = wrap(Math.atan2(p.x - car.x, p.z - car.z) - car.h);
      let steer = Math.max(-1, Math.min(1, -err * 2.6));
      const wide = Math.abs(car.t) > car.halfWidth - 2.5;
      if (plan && plan.action === 'drift' && car.drifting) {
        // hold the slide on the line; lift if it runs wide
        steer = Math.max(-1, Math.min(1, steer * 0.7));
        vTarget = wide ? 0 : 60;
      }
      // digital keys via error diffusion (the car smooths steering anyway)
      this.acc.steer += steer;
      let s = 0;
      if (this.acc.steer > 0.5) {
        s = 1;
        this.acc.steer -= 1;
      } else if (this.acc.steer < -0.5) {
        s = -1;
        this.acc.steer += 1;
      }
      key(KEYS.right, s > 0);
      key(KEYS.left, s < 0);
      const dv = vTarget - speed;
      let thr = dv > 0 ? Math.min(1, dv * 0.35 + 0.2) : 0;
      if (plan && plan.action === 'drift' && car.drifting) thr = wide ? 0.1 : 0.85;
      this.acc.thr += thr;
      let t = false;
      if (this.acc.thr >= 0.5) {
        t = true;
        this.acc.thr -= 1;
      }
      key(KEYS.throttle, t);
      key(KEYS.brake, dv < -2.5 && speed > 6);
      key(KEYS.handbrake, handbrake);
      if (car.drifting && !this.wasDrifting) st.drifts++;
      this.wasDrifting = car.drifting;
      if (plan && plan.action === 'drift' && car.drifting && Math.abs(car.slip) > 0.3 && !this.shotsTaken.drift) {
        this.shotsTaken.drift = true;
        st.shot = 'drift';
      }
      if (plan && plan.action === 'wall' && car.lastImpactAge < 0.12 && !this.shotsTaken.impact) {
        this.shotsTaken.impact = true;
        st.shot = 'impact';
      }
    },
  };
  window.__autopilot = AP;
})();
