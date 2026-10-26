// npm run verify — deterministic scripted run with nobody involved.
//
// 1. Starts its own Vite dev server on a private port.
// 2. Opens the game headless at 1280×720 (Playwright, real GPU via ANGLE).
// 3. Fake clock (exact 16 ms frames) + seeded Math.random, re-seeded right
//    before each run; waits for the scene to mount before advancing.
// 4. Injects scripts/verify-autopilot.js, which drives with real key events
//    and checks invariants on every frame.
// 5. Saves screenshots to verify-shots/ and a report.json.
// 6. Fails on: camera inside geometry, car overlapping a solid by > 1 cm, any
//    console error / warning, skipped or double-counted laps, unfinished route.
//
// Usage: node scripts/verify.mjs [--quick] [--only=a,b]
import fs from 'node:fs';
import path from 'node:path';
import { startDevServer, ROOT } from './devServer.mjs';
import { launchBrowser, newPage, formatProblems, waitFor } from './pageSetup.mjs';
import { physicsChecks } from './physics-sanity.mjs';
import { CARS } from '../src/cars/CarData.js';
import { CIRCUITS, CIRCUIT_ORDER } from '../src/tracks/TrackData.js';
import { TrackModel } from '../src/tracks/TrackModel.js';

const args = process.argv.slice(2);
const QUICK = args.includes('--quick');
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const want = (name) => !ONLY.length || ONLY.includes(name);
const SHOTS = path.join(ROOT, 'verify-shots');
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const report = { startedAt: new Date().toISOString(), checks: results, runs: {}, shots: [] };
function check(name, ok, detail = '') {
  results.push({ name, ok: !!ok, detail: String(detail) });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + String(detail).split('\n')[0].slice(0, 220) : ''}`);
  return ok;
}

async function shot(page, name, { render = true, fullPage = false } = {}) {
  if (render) {
    await page.evaluate(() => window.__apex && window.__apex.render());
    await page.clock.runFor(16);
  }
  const file = path.join(SHOTS, `${name}.png`);
  await page.screenshot({ path: file, fullPage });
  report.shots.push(`${name}.png`);
}

async function openGame(browser, server, query = '') {
  const ctx = await newPage(browser, { fakeClock: true });
  await ctx.page.goto(`${server.url}?debug&render=manual${query}`, { waitUntil: 'load' });
  if (!(await waitFor(ctx.page, () => !!window.__apex && window.__apex.ready() === 'menu'))) throw new Error('game never reached the menu');
  await ctx.page.addScriptTag({ path: path.join(ROOT, 'scripts', 'verify-autopilot.js') });
  return ctx;
}

async function waitPhase(page, phase, maxFrames = 2000) {
  for (let i = 0; i < maxFrames / 5; i++) {
    const p = await page.evaluate(() => window.__apex.ready());
    if (p === phase) return true;
    await page.clock.runFor(16 * 5);
  }
  return false;
}

/** Plan of scripted deviations for a circuit: a wall hit, the first cone row, a drift. */
function planFor(cid) {
  const def = CIRCUITS[cid];
  const m = new TrackModel(def);
  const L = m.length;
  const plan = [];
  // wall hit on the first longish straight after the start
  const sw = L * 0.1;
  plan.push({ action: 'wall', s0: sw, s1: sw + 160, offset: m.wallOffset(sw) + 3, speed: 24, look: 9 });
  // drift: the first drift zone
  const dz = def.driftZones && def.driftZones[0];
  if (dz) plan.push({ action: 'drift', s0: dz[0] * L, s1: dz[0] * L + 70, speed: 32 });
  // cones: first cone row, aimed straight at it
  const cones = (def.obstacles || []).find((o) => o.type === 'cones');
  if (cones) {
    const sc = cones.u * L;
    plan.push({ action: 'cones', s0: sc - 45, s1: sc + 12, offset: cones.t, speed: 26 });
  }
  return plan.sort((a, b) => a.s0 - b.s0);
}

/**
 * Drive `laps` laps on a circuit with the autopilot. Returns the autopilot
 * status (samples, events, failures). Screenshots at start / mid / drift /
 * impact when `shots` is set.
 */
async function lapRun(page, cid, { laps = 1, mode = 'timetrial', opponents = 0, difficulty = 'medium', shots = null, plan = null, maxSeconds = 260, speedScale = 0.92 } = {}) {
  await page.evaluate(() => window.__reseed(20260101));
  await page.evaluate((cfg) => window.__apex.startRace(cfg), { circuitId: cid, mode, laps: Math.max(laps, mode === 'grandprix' ? laps : 3), opponents, difficulty });
  if (!(await waitPhase(page, 'countdown', 3000))) throw new Error(`${cid}: never reached countdown`);
  await page.evaluate(({ l, p, sc }) => window.__autopilot.start({ laps: l, plan: p, speedScale: sc }), { l: laps, p: plan || [], sc: speedScale });
  let started = false;
  let mid = false;
  const L = new TrackModel(CIRCUITS[cid]).length;
  const frames = Math.round((maxSeconds + 8) * 62.5);
  for (let f = 0; f < frames; f += 10) {
    await page.clock.runFor(160);
    const st = await page.evaluate(() => {
      const s = window.__autopilot.status;
      const c = window.__apex.getCar();
      const out = { done: s.done, shot: s.shot, laps: s.laps, state: s.raceState, time: c ? c.raceTime : 0, s: c ? c.s : 0, lap: c ? c.lap : -1 };
      s.shot = null;
      return out;
    });
    if (shots) {
      if (!started && st.state === 'running' && st.time > 1.2) {
        started = true;
        await shot(page, `${shots}-start`);
      }
      if (!mid && st.lap === 0 && st.s > L * 0.5 && st.s < L * 0.6) {
        mid = true;
        await shot(page, `${shots}-mid`);
      }
      if (st.shot) await shot(page, `${shots}-${st.shot}`);
    }
    if (st.done) break;
  }
  const status = await page.evaluate(() => window.__autopilot.status);
  return status;
}

async function main() {
  const t0 = Date.now();
  // ---------------------------------------------------------------- physics (node)
  if (want('physics')) {
    let fails = 0;
    for (const car of CARS) for (const r of physicsChecks(car.stats, car.name)) if (!r.ok) {
      fails++;
      check(`physics ${r.name}`, false, r.detail);
    }
    check('physics: 6 cars × 20 handling checks (accel, brake, reverse, grip, drift hold/recover, no spin, surfaces)', fails === 0, `${fails} failures`);
    // track geometry
    for (const cid of CIRCUIT_ORDER) {
      const v = new TrackModel(CIRCUITS[cid]).validate();
      check(`geometry ${cid}: no overlapping sections, radius > wall offset`, v.ok, `len ${v.length.toFixed(0)} m, min radius ${v.minRadius.toFixed(1)}, min separation ${v.minSep.toFixed(1)} (need ${v.needSep.toFixed(1)})`);
    }
  }

  const server = await startDevServer();
  const browser = await launchBrowser();
  try {
    // ---------------------------------------------------------------- styleguide
    if (want('styleguide')) {
      const { page, context, problems } = await newPage(browser);
      await page.goto(server.url + '?styleguide', { waitUntil: 'load' });
      await page.clock.runFor(500);
      await page.screenshot({ path: path.join(SHOTS, '00-styleguide.png'), fullPage: true });
      report.shots.push('00-styleguide.png');
      const n = await page.locator('.btn').count();
      check('styleguide renders every component', n >= 10, `${n} buttons`);
      check('styleguide console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }

    // ---------------------------------------------------------------- menus
    if (want('menus')) {
      const { page, context, problems } = await openGame(browser, server);
      await page.clock.runFor(1500);
      await shot(page, '01-menu');
      const gl = await page.evaluate(() => {
        const g = window.__apex.game.renderer.getContext();
        const d = g.getExtension('WEBGL_debug_renderer_info');
        return d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'unknown';
      });
      report.renderer = gl;
      // keyboard: Enter on the main menu = Drive
      await page.keyboard.press('Enter');
      await page.clock.runFor(300);
      check('Enter on main menu opens mode select', (await page.evaluate(() => window.__apex.getState())).phase === 'select');
      await shot(page, '02-mode-select');
      await page.locator('.mode-card', { hasText: 'Campaign' }).click();
      await page.clock.runFor(300);
      await shot(page, '03-campaign');
      await page.keyboard.press('Escape');
      await page.clock.runFor(200);
      await page.keyboard.press('Escape');
      await page.clock.runFor(200);
      check('Esc walks back to the main menu', (await page.evaluate(() => window.__apex.getState())).phase === 'menu');
      await page.locator('button', { hasText: 'Garage' }).first().click();
      await page.clock.runFor(1200);
      await shot(page, '04-garage');
      check('garage opens', (await page.evaluate(() => window.__apex.getState())).phase === 'garage');
      check('menus console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }

    // ---------------------------------------------------------------- determinism + full lap
    if (want('lap')) {
      const runs = [];
      const n = QUICK ? 1 : 3;
      for (let k = 0; k < n; k++) {
        const { page, context, problems } = await openGame(browser, server);
        const status = await lapRun(page, 'beginner', { laps: 1, plan: planFor('beginner'), shots: k === 0 ? '10-beginner' : null });
        if (k === 0) {
          // results screen after the lap (time trial of 3 laps: end the session instead)
          await page.evaluate(() => window.__apex.game.requestPause());
          await page.clock.runFor(450);
          await shot(page, '11-pause');
          await page.evaluate(() => window.__apex.game.endSession());
          await page.clock.runFor(600);
          await shot(page, '12-results');
          check('results screen after session', (await page.evaluate(() => window.__apex.getState())).phase === 'results');
        }
        runs.push({ status, problems: problems.slice() });
        await context.close();
      }
      const a = runs[0].status;
      report.runs.beginner = { samples: a.samples, events: a.events, maxPen: a.maxPen };
      check('autopilot completes a full lap of Beginner GP', a.done && a.laps >= 1, `lap ${a.events.filter((e) => e.type === 'lap').map((e) => e.lapTimes[0]?.toFixed(3)).join(', ')} s`);
      check('every frame: camera never inside geometry', a.camInside === 0, a.failures.filter((f) => f.startsWith('camera')).slice(0, 3).join('; '));
      check('every frame: car never overlaps a solid by > 1 cm', a.maxPen <= 0.01, `max ${(a.maxPen * 100).toFixed(2)} cm`);
      check('laps counted once, none skipped', a.failures.filter((f) => f.startsWith('lap')).length === 0 && a.events.filter((e) => e.type === 'lap').length === a.laps, `${a.events.filter((e) => e.type === 'lap').length} lap events for ${a.laps} laps`);
      check('scripted wall hit / drift / cone row executed', a.events.filter((e) => e.type === 'plan').length >= 3 && a.drifts > 0, a.events.filter((e) => e.type === 'plan').map((e) => e.action).join(', ') + `; drifts ${a.drifts}`);
      check('autopilot run: no failures', a.failures.length === 0, a.failures.slice(0, 4).join('; '));
      for (let k = 0; k < runs.length; k++) check(`run ${k + 1}: console clean`, runs[k].problems.length === 0, formatProblems(runs[k].problems));
      report.runs.beginnerAll = runs.map((r) => r.status.samples);
      if (runs.length === 3) {
        const same = (x, y) => x.length === y.length && x.every((s, i) => s.time === y[i].time && s.x === y[i].x && s.z === y[i].z && s.speed === y[i].speed);
        check('3 runs produce identical positions & speeds at every sample', same(runs[0].status.samples, runs[1].status.samples) && same(runs[0].status.samples, runs[2].status.samples), `${runs[0].status.samples.length} samples each`);
      }
    }

    // ---------------------------------------------------------------- race rules (phase 3)
    if (want('rules')) {
      const { page, context, problems } = await openGame(browser, server);
      await page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'timetrial', laps: 3, opponents: 0 }));
      await waitPhase(page, 'countdown', 3000);
      await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 600);
      const R = await page.evaluate(() => {
        const api = window.__apex;
        const race = api.game.race;
        const m = race.model;
        const L = m.length;
        const out = {};
        const drive = (n, inp) => {
          api.setInput(inp);
          api.step(n);
          api.setInput(null);
          return api.getCar();
        };
        const placeAt = (s, t, heading) => {
          api.teleport(s, t);
          if (heading !== undefined) {
            race.player.vehicle.h = heading;
            race.player.vehicle.ph = heading;
          }
        };
        // 1. start: cross the line from the grid
        let c = drive(240, { throttle: 1 });
        out.afterStart = { lap: c.lap, next: c.next };
        // 2. reverse back over the line and forward again, 3 times: no lap may count
        for (let k = 0; k < 3; k++) {
          drive(30, { brake: 0 });
          placeAt(25, 0);
          drive(1, {});
          race.player.vehicle.u = 0;
          for (let i = 0; i < 400 && race.player.proj.s < L - 15 && race.player.proj.s > 1; i++) drive(1, { brake: 1 });
          drive(60, { brake: 1 });
          drive(1, {});
          for (let i = 0; i < 400 && (race.player.proj.s > L / 2 || race.player.proj.s < 20); i++) drive(1, { throttle: 1 });
        }
        c = api.getCar();
        out.afterReverse = { lap: c.lap, lapTimes: c.lapTimes.length, wrongWaySeen: false };
        // 3. skip: teleport to just before the line (jump > 60 m resyncs without crossings) and cross it
        placeAt(L - 30, 0);
        drive(1, {});
        race.player.vehicle.u = 30;
        drive(240, { throttle: 1 });
        c = api.getCar();
        out.afterSkip = { lap: c.lap, lapTimes: c.lapTimes.length, next: c.next };
        // 4. wrong way warning
        placeAt(L * 0.3, 0, race.model.heading(L * 0.3) + Math.PI);
        race.player.vehicle.u = 0;
        drive(240, { throttle: 1 });
        out.wrongWay = api.getCar().wrongWay;
        // 5. walls stop the car: aim straight at the right-hand barrier at speed
        const sW = L * 0.12;
        placeAt(sW, 0, race.model.heading(sW) - Math.PI / 2);
        race.player.vehicle.u = 40;
        let maxT = 0;
        let minSpeedAfter = 99;
        for (let i = 0; i < 240; i++) {
          c = drive(1, { throttle: 1 });
          maxT = Math.max(maxT, Math.abs(c.t));
          if (Math.abs(c.t) > m.wallOffset(sW) - 3) minSpeedAfter = Math.min(minSpeedAfter, c.speed);
        }
        out.wall = { maxT, wallOffset: m.wallOffset(sW), minSpeedAfter, maxPen: race.debug.maxPenetration };
        // 6. auto-recovery after ~3 s stuck against the wall
        const before = { x: c.x, z: c.z };
        c = drive(120 * 4, { throttle: 1 });
        out.recovered = Math.hypot(c.x - before.x, c.z - before.z) > 3 && Math.abs(c.t) < m.halfWidthAt(c.s);
        // 7. cones scatter
        const def = race.def;
        const cone = def.obstacles.find((o) => o.type === 'cones');
        const sc = cone.u * L;
        // aim straight at the middle of the row from 14 m out
        placeAt(sc - 14, cone.t, race.model.heading(sc - 7));
        race.player.vehicle.u = 22;
        drive(120, { throttle: 0.6 });
        out.cones = race.obstacles.conesKnocked;
        // 8. oil lowers grip
        const oil = def.obstacles.find((o) => o.type === 'oil');
        placeAt(oil.u * L - 1, oil.t, race.model.heading(oil.u * L));
        race.player.vehicle.u = 15;
        drive(12, { throttle: 0.5 });
        out.oilSurface = api.getCar().surface;
        // 9. boost pad boosts
        const pad = def.boostPads[0];
        placeAt(pad.u * L - 8, pad.t, race.model.heading(pad.u * L));
        race.player.vehicle.u = 30;
        drive(60, { throttle: 1 });
        out.boost = race.player.vehicle.events.boost > 0;
        // 10. track limits penalty (timed modes): sit on the grass > 1.6 s
        const pen0 = race.player.penalty;
        placeAt(L * 0.2, m.halfWidthAt(L * 0.2) + 5, race.model.heading(L * 0.2));
        race.player.vehicle.u = 12;
        drive(120 * 2.2, { throttle: 0.3 });
        out.penalty = race.player.penalty - pen0;
        // 11. drift: handbrake flick on the start straight, hold, then a simple
        //     heading controller straightens the car → the points bank
        const v = race.player.vehicle;
        const follow = (thr) => {
          const p = race.player.proj;
          let e = m.heading(p.s + 12) - v.h;
          e = Math.atan2(Math.sin(e), Math.cos(e));
          return { throttle: thr, steer: Math.max(-1, Math.min(1, -e * 2.5 - p.t * 0.05)) };
        };
        const sD = L * 0.93;
        placeAt(sD, -6, race.model.heading(sD));
        v.u = 30;
        race.drift.reset();
        drive(40, { throttle: 0.4, steer: 1, handbrake: true });
        drive(50, { throttle: 0.85, steer: 0.2 });
        const during = { drifting: api.getCar().drifting, current: race.drift.current };
        for (let i = 0; i < 360; i++) drive(1, follow(0.45));
        out.driftBank = { drifted: during.drifting, currentWhileDrifting: Math.round(during.current), banked: race.drift.banked };
        return out;
      });
      check('start: crossing the line from the grid starts lap 1 (no lap counted)', R.afterStart.lap === 0 && R.afterStart.next === 1, JSON.stringify(R.afterStart));
      check('reversing over the line 3× never counts a lap', R.afterReverse.lap === 0 && R.afterReverse.lapTimes === 0, JSON.stringify(R.afterReverse));
      check('skipping checkpoints then crossing the line does not count', R.afterSkip.lap === 0 && R.afterSkip.lapTimes === 0, JSON.stringify(R.afterSkip));
      check('wrong-way warning when driving backwards', R.wrongWay === true);
      check('walls stop the car (never past the barrier, speed killed)', R.wall.maxT < R.wall.wallOffset && R.wall.minSpeedAfter < 15 && R.wall.maxPen <= 0.01, JSON.stringify(R.wall));
      check('auto-recovery to the track after ~3 s stuck', R.recovered === true);
      check('cones scatter when hit', R.cones > 0, `${R.cones} cones knocked`);
      check('oil switches the surface to low grip', R.oilSurface === 'oil', R.oilSurface);
      check('boost pads boost', R.boost === true);
      check('drift: handbrake flick starts a drift, straightening banks the points', R.driftBank.drifted && R.driftBank.banked > 0, JSON.stringify(R.driftBank));
      check('track limits: > 1.6 s off the road costs +1 s', Math.abs(R.penalty - 1) < 1e-9, `penalty ${R.penalty}`);
      // restart fully resets cars, timers, particles, skid marks, obstacles
      await page.evaluate(() => window.__apex.game.restartRace());
      await page.clock.runFor(48);
      const reset = await page.evaluate(() => {
        const r = window.__apex.game.race;
        const c = window.__apex.getCar();
        return { lap: c.lap, time: c.raceTime, state: c.raceState, cones: r.obstacles.conesKnocked, particles: r.particles.live, skids: r.skids.count, drift: c.drift.total, penalty: c.penalty, speed: c.speed, phase: window.__apex.ready(), loops: window.__apex.info().loops };
      });
      check('restart fully resets (laps, clock, cones, particles, skid marks, drift, penalties)', reset.lap === -1 && reset.time === 0 && reset.cones === 0 && reset.particles === 0 && reset.skids === 0 && reset.drift === 0 && reset.penalty === 0 && reset.speed === 0 && reset.phase === 'countdown', JSON.stringify(reset));
      check('restart keeps exactly one rAF loop', reset.loops === 1, `${reset.loops} loops`);
      // drift combo breaks on a solid hit: drift on Street GP's start straight, then slide into a concrete block
      await page.evaluate(() => window.__apex.go('menu'));
      await page.clock.runFor(48);
      await page.evaluate(() => window.__apex.startRace({ circuitId: 'street', mode: 'timetrial', laps: 3, opponents: 0 }));
      await waitPhase(page, 'countdown', 3000);
      await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 600);
      const B = await page.evaluate(() => {
        const api = window.__apex;
        const race = api.game.race;
        const L = race.model.length;
        const drive = (n, inp) => {
          api.setInput(inp);
          api.step(n);
          api.setInput(null);
          return api.getCar();
        };
        api.teleport(L - 110, -3);
        race.player.vehicle.u = 28;
        race.drift.reset();
        drive(40, { throttle: 0.4, steer: 1, handbrake: true });
        drive(30, { throttle: 0.85, steer: 0.2 });
        const current = race.drift.current;
        const drifting = race.player.vehicle.drifting;
        // move the sliding car (velocity and drift state untouched) 3 m short of a concrete block
        const block = race.world.all.find((c) => c.kind === 'solid' && c.shape === 'box' && c.hz < 2);
        const v = race.player.vehicle;
        const sp = Math.hypot(v.vx, v.vz);
        const dx = v.vx / sp;
        const dz = v.vz / sp;
        v.x = v.px = block.x - dx * 3.4;
        v.z = v.pz = block.z - dz * 3.4;
        race.player.proj.i = -1;
        race.model.project(v.x, v.z, -1, race.player.proj);
        const banked = race.drift.banked;
        let impact = 0;
        for (let i = 0; i < 60; i++) {
          drive(1, { throttle: 0.85, steer: 0.2 });
          impact = Math.max(impact, v.lastImpact);
        }
        return { drifting, current: Math.round(current), after: race.drift.current, bankedGain: race.drift.banked - banked, impact };
      });
      check('drift combo breaks on a solid hit (unbanked points lost)', B.drifting && B.current > 0 && B.impact > 2.5 && B.after === 0 && B.bankedGain === 0, JSON.stringify(B));
      check('rules: console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }

    // ---------------------------------------------------------------- garage + cars (phase 4)
    if (want('garage')) {
      const { page, context, problems } = await openGame(browser, server);
      await page.evaluate(() => window.__apex.go('garage', { returnTo: 'menu' }));
      await page.clock.runFor(400);
      const names = [];
      for (let i = 0; i < 6; i++) {
        await page.clock.runFor(1200);
        const info = await page.evaluate(() => ({ name: document.querySelector('.garage__panel h1').textContent, locked: !!document.querySelector('.garage__lock .hazard-band'), selectDisabled: document.querySelector('.garage__actions .btn--primary').disabled }));
        names.push(info);
        await shot(page, `20-garage-${i + 1}`);
        await page.keyboard.press('ArrowRight');
      }
      check('garage shows all 6 cars', new Set(names.map((n) => n.name)).size === 6, names.map((n) => n.name).join(', '));
      check('3 cars unlocked at start, 3 locked with a hazard band', names.filter((n) => !n.locked).length === 3 && names.filter((n) => n.locked).every((n) => n.selectDisabled), names.map((n) => `${n.name}:${n.locked ? 'locked' : 'open'}`).join(' '));
      // pick Viper (index 1) with the Glacier livery, then Enter = select
      await page.keyboard.press('ArrowRight'); // the loop wrapped back to Falcon; one more → Viper
      await page.clock.runFor(200);
      await page.locator('.livery[aria-label^="Glacier"]').click();
      await page.clock.runFor(200);
      await shot(page, '21-garage-livery');
      await page.locator('.garage__actions .btn--primary').click();
      await page.clock.runFor(300);
      const sv = await page.evaluate(() => ({ car: window.__apex.save().carId, livery: window.__apex.save().livery.viper, phase: window.__apex.ready() }));
      check('select car + livery persists to the save and returns to the menu', sv.car === 'viper' && sv.livery === 'glacier' && sv.phase === 'menu', JSON.stringify(sv));
      // locked car cannot be equipped
      await page.evaluate(() => window.__apex.go('garage', { returnTo: 'menu' }));
      await page.clock.runFor(300);
      for (let i = 0; i < 2; i++) await page.keyboard.press('ArrowRight'); // viper → comet → titan (locked)
      await page.clock.runFor(200);
      await page.keyboard.press('Enter');
      await page.clock.runFor(200);
      const locked = await page.evaluate(() => ({ car: window.__apex.save().carId, phase: window.__apex.ready() }));
      check('Enter on a locked car does nothing', locked.car === 'viper' && locked.phase === 'garage', JSON.stringify(locked));
      // steering lock check: full lock at rest, chase + close cameras
      await page.evaluate(() => window.__apex.go('menu'));
      await page.clock.runFor(100);
      await page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'practice', laps: 0 }));
      await waitPhase(page, 'countdown', 3000);
      await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 600);
      await page.evaluate(() => {
        window.__apex.setInput({ steer: 1, throttle: 0.15 });
        window.__apex.step(90);
      });
      await shot(page, '22-steer-lock-chase');
      await page.evaluate(() => window.__apex.game.race.rig.setMode('close'));
      await page.clock.runFor(16 * 40);
      await shot(page, '23-steer-lock-close');
      const lock = await page.evaluate(() => {
        const r = window.__apex.game.race;
        const view = r.player.view;
        return { steerAngle: r.player.vehicle.steerAngle, wheelYaw: view.wheels[0].pivot.rotation.y };
      });
      check('visual steering clamped to 25°', Math.abs(lock.wheelYaw) <= (25 * Math.PI) / 180 + 1e-6, `physics ${((lock.steerAngle * 180) / Math.PI).toFixed(1)}°, wheels ${((lock.wheelYaw * 180) / Math.PI).toFixed(1)}°`);
      await page.evaluate(() => window.__apex.setInput(null));
      check('garage: console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }

    // ---------------------------------------------------------------- every circuit (phase 5)
    if (want('circuits')) {
      for (const cid of CIRCUIT_ORDER) {
        if (cid === 'beginner' && want('lap') && !ONLY.length) continue; // already driven above
        const { page, context, problems } = await openGame(browser, server);
        const status = await lapRun(page, cid, { laps: 1, plan: planFor(cid), shots: `30-${cid}` });
        const lap = status.events.filter((e) => e.type === 'lap').map((e) => e.lapTimes[0]);
        report.runs[cid] = { lap, maxPen: status.maxPen, samples: status.samples.length };
        check(`${cid}: autopilot completes a full lap`, status.done && status.laps >= 1, `lap ${lap.map((x) => x.toFixed(3)).join(', ')} s`);
        check(`${cid}: camera never inside geometry, no overlap > 1 cm, no lap errors`, status.failures.length === 0, status.failures.slice(0, 3).join('; ') || `max overlap ${(status.maxPen * 100).toFixed(2)} cm`);
        check(`${cid}: console clean`, problems.length === 0, formatProblems(problems));
        await context.close();
      }
    }

    // ---------------------------------------------------------------- AI + campaign (phase 6)
    if (want('ai')) {
      for (const cid of CIRCUIT_ORDER) {
        const { page, context, problems } = await openGame(browser, server);
        await page.evaluate(() => window.__reseed(20260101));
        await page.evaluate((c) => window.__apex.startRace({ circuitId: c, mode: 'grandprix', laps: 1, opponents: 7, difficulty: c === 'technical' ? 'hard' : 'medium' }), cid);
        await waitPhase(page, 'countdown', 3000);
        // the player drives slowly so every AI finishes before the race closes
        await page.evaluate(() => window.__autopilot.start({ laps: 9, plan: [], speedScale: 0.7 }));
        let race = null;
        let maxStuck = 0;
        let shotDone = false;
        for (let i = 0; i < 1400; i++) {
          await page.clock.runFor(320);
          const phase = await page.evaluate(() => window.__apex.ready());
          if (phase === 'results') break;
          race = await page.evaluate(() => window.__apex.getRace());
          if (!race) break;
          for (const r of race.racers) if (!r.player) maxStuck = Math.max(maxStuck, r.stuck);
          if (!shotDone && race.time > 8) {
            shotDone = true;
            await shot(page, `40-ai-${cid}`);
          }
        }
        await waitPhase(page, 'results', 2000);
        await page.clock.runFor(400);
        await shot(page, `41-results-${cid}`);
        const res = await page.evaluate(() => window.__apex.game.lastResults);
        const ai = race.racers.filter((r) => !r.player);
        const recov = ai.reduce((a, r) => a + r.recoveries, 0);
        check(`${cid}: all 7 AI finish the race`, ai.every((r) => r.finished), ai.map((r) => `${r.name} ${r.finished ? r.finishTime.toFixed(1) : 'DNF'}`).join(', '));
        check(`${cid}: AI never permanently stuck (≤ 1 auto-recovery each)`, ai.every((r) => r.recoveries <= 1), `${recov} recoveries total, longest stall ${maxStuck.toFixed(1)} s`);
        const rows = res.rows;
        const sorted = rows.every((r, i) => i === 0 || r.time >= rows[i - 1].time);
        const me = rows.findIndex((r) => r.isPlayer) + 1;
        check(`${cid}: results ranked by time, player position correct`, sorted && me === res.position && rows.length === 8, `player P${res.position} of ${rows.length}`);
        check(`${cid}: AI race console clean`, problems.length === 0, formatProblems(problems));
        await context.close();
      }
      // every campaign level loads with its own rules
      {
        const { page, context, problems } = await openGame(browser, server);
        const levels = await page.evaluate(() => window.__apex.levels());
        const loaded = [];
        for (const lvl of levels) {
          await page.evaluate((id) => window.__apex.startLevel(id), lvl.id);
          const ok = await waitPhase(page, 'countdown', 3000);
          const info = await page.evaluate(() => {
            const r = window.__apex.game.race;
            return { mode: r.config.mode, laps: r.config.laps, opponents: r.racers.length - 1, target: r.config.target && r.config.target.type, tokens: r.obstacles.tokenCount };
          });
          loaded.push({ id: lvl.id, ok, ...info });
          if (lvl.index === 5) await shot(page, '42-level-street-drift');
          await page.evaluate(() => window.__apex.game.requestPause());
          await page.evaluate(() => window.__apex.game.quitToMenu());
          await page.clock.runFor(48);
        }
        check('all 12 campaign levels load', loaded.length === 12 && loaded.every((l) => l.ok), loaded.filter((l) => !l.ok).map((l) => l.id).join(', ') || '12/12');
        check(
          'levels carry their rules (GP vs AI, time attack, drift targets)',
          loaded.every((l) => (l.mode === 'grandprix' ? l.opponents >= 5 && l.target === 'position' : l.opponents === 0 && (l.mode === 'timeattack' ? l.target === 'lap' : l.target === 'drift'))),
          loaded.map((l) => `${l.id}:${l.laps}L/${l.opponents}AI/${l.target}`).join(' '),
        );
        const S = await page.evaluate(() => window.__apex.campaignSelfTest());
        check('stars: GP P1 = 3, P2 = 2, P3 = 1, P4 = 0', S.gp.join(',') === '3,2,1,0', S.gp.join(','));
        check('stars: time attack thresholds, time-up = 0', S.ta.join(',') === '3,2,1,0,0', S.ta.join(','));
        check('stars: drift thresholds', S.drift.join(',') === '3,2,1,0', S.drift.join(','));
        check('stars unlock the next circuit, cars and liveries; a worse result keeps the best', S.unlocks.street && S.unlocks.titan && S.unlocks.newUnlocks > 0 && S.unlocks.keepsBest, JSON.stringify(S.unlocks));
        check('campaign: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
      }
    }

    // ---------------------------------------------------------------- systems (phase 7)
    if (want('systems')) {
      // --- every button on every screen does something (no dead ends) ---
      {
        const { page, context, problems } = await openGame(browser, server);
        const sig = () =>
          page.evaluate(() => {
            const g = window.__apex.game;
            const st = g.store.state;
            const html = document.querySelector('.menu-layer').innerHTML;
            let hsh = 0;
            for (let i = 0; i < html.length; i++) hsh = (hsh * 31 + html.charCodeAt(i)) | 0;
            return JSON.stringify([st.phase, st.screen, !!g.ui.overlay, g.ui.toasts.items.length, hsh, JSON.stringify(g.save.data), g.ui.garageIndex, g.ui.garageLivery, JSON.stringify(g.ui.setup)]);
          });
        const screens = [
          ['main', () => window.__apex.go('menu', { screen: 'main' })],
          ['mode', () => window.__apex.go('select', { screen: 'mode', mode: 'grandprix' })],
          ['track', () => window.__apex.go('select', { screen: 'track', mode: 'grandprix' })],
          ['campaign', () => window.__apex.go('select', { screen: 'track', mode: 'campaign' })],
          ['setup', () => window.__apex.go('select', { screen: 'setup', mode: 'grandprix' })],
          ['garage', () => window.__apex.go('garage', { returnTo: 'menu' })],
        ];
        const dead = [];
        let total = 0;
        for (const [name, goFn] of screens) {
          await page.evaluate(() => {
            const g = window.__apex.game;
            g.ui.closeOverlay(false);
            if (g.store.phase !== 'menu') g.store.go('menu', { screen: 'main' });
          });
          await page.evaluate(goFn);
          await page.clock.runFor(100);
          const count = await page.locator('.menu-layer button').count();
          for (let i = 0; i < count; i++) {
            await page.evaluate(() => {
              const g = window.__apex.game;
              g.ui.closeOverlay(false);
              if (g.store.phase !== 'menu') g.store.go('menu', { screen: 'main' });
            });
            await page.evaluate(goFn);
            await page.clock.runFor(60);
            const btn = page.locator('.menu-layer button').nth(i);
            if (!(await btn.isVisible())) continue;
            const label = ((await btn.textContent()) || '').trim().slice(0, 30);
            // an already-selected radio option is not a dead button
            const disabled = await btn.evaluate((b) => b.disabled || b.getAttribute('aria-disabled') === 'true' || (b.getAttribute('role') === 'radio' && b.getAttribute('aria-checked') === 'true'));
            const before = await sig();
            await btn.click({ force: true });
            await page.clock.runFor(120);
            const after = await sig();
            total++;
            // a locked card / disabled button must at least explain itself (toast) — counted by the signature too
            if (before === after && !disabled) dead.push(`${name}:${label}`);
            // starting a race: back out
            const ph = await page.evaluate(() => window.__apex.ready());
            if (ph === 'loading' || ph === 'countdown') {
              await waitPhase(page, 'countdown', 3000);
              await page.evaluate(() => window.__apex.game.quitToMenu());
              await page.clock.runFor(48);
            }
          }
        }
        check('every menu button does something (no dead buttons)', dead.length === 0, dead.length ? dead.join(', ') : `${total} buttons clicked`);
        // keyboard: arrows move focus, Enter activates, Esc goes back
        await page.evaluate(() => window.__apex.go('menu', { screen: 'main', mode: 'campaign' }));
        await page.clock.runFor(60);
        await page.keyboard.press('ArrowDown');
        const focused = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await page.clock.runFor(60);
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Enter');
        await page.clock.runFor(100);
        const st1 = await page.evaluate(() => window.__apex.getState());
        await page.keyboard.press('Enter');
        await page.clock.runFor(100);
        const st2 = await page.evaluate(() => window.__apex.getState());
        check('keyboard menu flow: arrows move focus, Enter selects (main → mode → Grand Prix → circuit)', /Garage|Quick|Settings|Controls/i.test(focused || '') && st1.screen === 'track' && st1.mode === 'grandprix' && st2.screen === 'setup', `${(focused || '').trim()} → ${st1.screen}/${st1.mode} → ${st2.screen}`);
        await page.keyboard.press('Enter');
        const raced = await waitPhase(page, 'countdown', 3000);
        check('Enter on setup starts the race', raced);
        // pause menu by keyboard
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        const paused = (await page.evaluate(() => window.__apex.ready())) === 'paused';
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        const resumed = await page.evaluate(() => window.__apex.ready());
        check('Esc pauses and Esc resumes', paused && (resumed === 'countdown' || resumed === 'racing'), resumed);
        // pause screen buttons
        await waitFor(page, () => window.__apex.ready() === 'racing', null, 800);
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        const pauseButtons = await page.locator('.pause .btn').allTextContents();
        await page.locator('.pause .btn', { hasText: 'Settings' }).click();
        await page.clock.runFor(60);
        const settingsOpen = await page.evaluate(() => !!window.__apex.game.ui.overlay);
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        const backToPause = await page.evaluate(() => window.__apex.ready() === 'paused' && !window.__apex.game.ui.overlay);
        await page.locator('.pause .btn', { hasText: 'Controls' }).click();
        await page.clock.runFor(60);
        const controlsOpen = await page.evaluate(() => !!document.querySelector('.controls-guide'));
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        await page.locator('.pause .btn', { hasText: 'Quit' }).click();
        await page.clock.runFor(60);
        const confirm = await page.evaluate(() => !!document.querySelector('.confirm'));
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        const stillPaused = await page.evaluate(() => window.__apex.ready() === 'paused');
        await page.locator('.pause .btn', { hasText: 'Restart' }).click();
        await page.clock.runFor(60);
        const restarted = await page.evaluate(() => window.__apex.ready() === 'countdown');
        check('pause menu: settings, controls, quit-confirm (Esc cancels), restart all work', settingsOpen && backToPause && controlsOpen && confirm && stillPaused && restarted, `${pauseButtons.length} buttons; settings ${settingsOpen}, back ${backToPause}, controls ${controlsOpen}, confirm ${confirm}, cancel ${stillPaused}, restart ${restarted}`);
        await page.keyboard.press('Escape');
        await page.clock.runFor(60);
        await page.locator('.pause .btn', { hasText: 'Quit' }).click();
        await page.clock.runFor(60);
        await page.locator('.confirm .btn--primary').click();
        await page.clock.runFor(100);
        check('quit to menu (confirmed) returns to the main menu and disposes the race', await page.evaluate(() => window.__apex.ready() === 'menu' && !window.__apex.game.race));
        check('menus: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
      }

      // --- pause freezes sim + audio, camera modes, resize, blur / hidden tab ---
      {
        const { page, context, problems } = await openGame(browser, server);
        await page.keyboard.press('KeyN'); // a trusted gesture unlocks audio (N is unbound)
        await page.evaluate(() => window.__apex.startRace({ circuitId: 'speed', mode: 'practice', laps: 0 }));
        await waitPhase(page, 'countdown', 3000);
        await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 800);
        await page.keyboard.down('KeyW');
        await page.clock.runFor(16 * 120);
        const a0 = await page.evaluate(() => ({ car: window.__apex.getCar(), audio: window.__apex.game.audio.ctx ? window.__apex.game.audio.ctx.state : 'none', engine: !!window.__apex.game.audio.engine }));
        await page.keyboard.up('KeyW');
        await page.evaluate(() => window.__apex.game.requestPause());
        await page.clock.runFor(16 * 5);
        const p0 = await page.evaluate(() => window.__apex.getCar());
        await page.clock.runFor(2000);
        const p1 = await page.evaluate(() => ({ car: window.__apex.getCar(), audio: window.__apex.game.audio.ctx ? window.__apex.game.audio.ctx.state : 'none' }));
        check('pause freezes the simulation (2 s paused: no time, no movement)', p0.raceTime === p1.car.raceTime && p0.x === p1.car.x && p0.z === p1.car.z, `t ${p0.raceTime.toFixed(3)} → ${p1.car.raceTime.toFixed(3)}`);
        check('audio runs in the race and pause silences it', a0.engine && a0.audio === 'running' && (p1.audio === 'suspended' || p1.audio === 'suspending'), `race ${a0.audio}/engine ${a0.engine}, paused ${p1.audio}`);
        await page.evaluate(() => window.__apex.game.resume());
        await page.clock.runFor(16 * 30);
        const r1 = await page.evaluate(() => ({ car: window.__apex.getCar(), audio: window.__apex.game.audio.ctx.state }));
        check('resume continues the race and the audio', r1.car.raceTime > p1.car.raceTime && r1.car.raceTime - p1.car.raceTime < 0.6 && r1.audio === 'running', `+${(r1.car.raceTime - p1.car.raceTime).toFixed(3)} s`);
        // camera modes
        const modes = [];
        for (let i = 0; i < 4; i++) {
          await page.keyboard.press('KeyC');
          await page.evaluate(() => {
            window.__apex.setInput({ throttle: 0.7, steer: 0.2 });
          });
          let inside = false;
          for (let f = 0; f < 60; f++) {
            await page.clock.runFor(16);
            if (f % 6 === 0) inside = inside || !!(await page.evaluate(() => window.__apex.getCar().camera.inside));
          }
          const m = await page.evaluate(() => window.__apex.getCar().camera.mode);
          modes.push({ m, inside });
          await shot(page, `50-camera-${m}`);
        }
        await page.evaluate(() => window.__apex.setInput(null));
        check('C cycles all 4 camera modes, none inside geometry', new Set(modes.map((x) => x.m)).size === 4 && modes.every((x) => !x.inside), modes.map((x) => `${x.m}${x.inside ? '(inside!)' : ''}`).join(' → '));
        // resize keeps the aspect
        await page.setViewportSize({ width: 800, height: 600 });
        await page.waitForTimeout(150); // resize events fire on a real rendering frame
        await page.clock.runFor(48);
        const s1 = await page.evaluate(() => ({ aspect: window.__apex.game.race.camera.aspect, w: window.__apex.game.canvas.width, h: window.__apex.game.canvas.height }));
        await shot(page, '51-resize-800x600');
        await page.setViewportSize({ width: 1600, height: 900 });
        await page.waitForTimeout(150);
        await page.clock.runFor(48);
        const s2 = await page.evaluate(() => ({ aspect: window.__apex.game.race.camera.aspect }));
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.waitForTimeout(150);
        await page.clock.runFor(48);
        check('resize keeps the camera aspect and canvas size in step', Math.abs(s1.aspect - 800 / 600) < 1e-6 && Math.abs(s2.aspect - 16 / 9) < 1e-6 && Math.abs(s1.w / s1.h - 4 / 3) < 0.01, JSON.stringify([s1, s2]));
        // blur releases held keys
        await page.keyboard.down('KeyW');
        await page.clock.runFor(48);
        const held = await page.evaluate(() => window.__apex.game.input.state.throttle);
        await page.evaluate(() => window.dispatchEvent(new Event('blur')));
        await page.clock.runFor(48);
        const afterBlur = await page.evaluate(() => window.__apex.game.input.state.throttle);
        await page.keyboard.up('KeyW');
        check('window blur releases held inputs', held === 1 && afterBlur === 0, `${held} → ${afterBlur}`);
        // hidden tab stops the loop; showing it again resumes without a time jump
        const h0 = await page.evaluate(() => ({ f: window.__apex.game.loop.frameCount, t: window.__apex.getCar().raceTime }));
        await page.evaluate(() => {
          Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
          document.dispatchEvent(new Event('visibilitychange'));
        });
        await page.clock.runFor(3000);
        const h1 = await page.evaluate(() => ({ f: window.__apex.game.loop.frameCount, t: window.__apex.getCar().raceTime, phase: window.__apex.ready() }));
        await page.evaluate(() => {
          Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
          document.dispatchEvent(new Event('visibilitychange'));
        });
        await page.clock.runFor(16 * 10);
        const h2 = await page.evaluate(() => ({ f: window.__apex.game.loop.frameCount, t: window.__apex.getCar().raceTime, loops: window.__apex.info().loops }));
        check('hidden tab: loop stops, timers do not run; visible again: resumes without a time jump, one loop', h1.f === h0.f && h1.t === h0.t && h2.f > h1.f && h2.t - h1.t < 0.3 && h2.loops === 1, `frames ${h0.f}→${h1.f}→${h2.f}, race t ${h0.t.toFixed(2)}→${h1.t.toFixed(2)}→${h2.t.toFixed(2)}, ${h1.phase}`);
        // leaving the race stops and disconnects the engine sound
        await page.evaluate(() => window.__apex.game.quitToMenu());
        await page.clock.runFor(48);
        check('leaving a race stops the engine audio', await page.evaluate(() => window.__apex.game.audio.engine === null));
        check('pause/camera/resize/visibility: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
      }

      // --- saves: restore, corrupt, wrong types, blocked storage ---
      {
        const { page, context, problems } = await openGame(browser, server);
        await page.evaluate(() => {
          const g = window.__apex.game;
          g.save.update((d) => {
            d.settings.units = 'mph';
            d.stars['beginner-grandprix'] = 2;
            d.bestLaps['beginner:timetrial'] = 55.5;
            d.carId = 'comet';
          });
        });
        await page.reload();
        await waitFor(page, () => !!window.__apex && window.__apex.ready() === 'menu');
        const restored = await page.evaluate(() => window.__apex.save());
        check('save/restore across a reload (settings, stars, best laps, car)', restored.settings.units === 'mph' && restored.stars['beginner-grandprix'] === 2 && restored.bestLaps['beginner:timetrial'] === 55.5 && restored.carId === 'comet');
        await page.evaluate(() => localStorage.setItem('apexgp.save', '{"version":2,"settings":{"quality":'));
        await page.reload();
        const okCorrupt = await waitFor(page, () => !!window.__apex && window.__apex.ready() === 'menu');
        const afterCorrupt = await page.evaluate(() => ({ s: window.__apex.save(), err: window.__apex.game.save.loadError }));
        check('corrupt save JSON → defaults, game boots', okCorrupt && afterCorrupt.err === 'corrupt' && afterCorrupt.s.carId === 'falcon', `loadError ${afterCorrupt.err}`);
        await page.evaluate(() => localStorage.setItem('apexgp.save', JSON.stringify({ version: 1, carId: 7, settings: { quality: 'ultra', master: 'loud', camera: 'drone' }, stars: { a: 'x', b: 9, c: 2 }, unlockedCars: 'all', records: null })));
        await page.reload();
        await waitFor(page, () => !!window.__apex && window.__apex.ready() === 'menu');
        const typed = await page.evaluate(() => window.__apex.save());
        check('wrong-typed save fields are validated field by field', typed.carId === 'falcon' && typed.settings.quality === 'high' && typed.settings.camera === 'chase' && typed.stars.c === 2 && !('a' in typed.stars) && !('b' in typed.stars) && Array.isArray(typed.unlockedCars), JSON.stringify({ q: typed.settings.quality, stars: typed.stars }));
        check('saves: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
        // blocked storage
        const blocked = await newPage(browser, { fakeClock: true });
        await blocked.page.addInitScript(() => {
          Object.defineProperty(window, 'localStorage', {
            configurable: true,
            get() {
              throw new DOMException('blocked', 'SecurityError');
            },
          });
        });
        await blocked.page.goto(`${server.url}?debug&render=manual`);
        const bootOk = await waitFor(blocked.page, () => !!window.__apex && window.__apex.ready() === 'menu');
        await blocked.page.addScriptTag({ path: path.join(ROOT, 'scripts', 'verify-autopilot.js') });
        const badge = await blocked.page.evaluate(() => /storage blocked/i.test(document.body.textContent));
        await blocked.page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'practice', laps: 0 }));
        const raceOk = await waitPhase(blocked.page, 'countdown', 3000);
        await blocked.page.evaluate(() => window.__apex.game.save.update((d) => (d.settings.units = 'mph')));
        check('blocked localStorage: game boots, races, shows a notice, keeps settings in memory', bootOk && raceOk && badge && (await blocked.page.evaluate(() => window.__apex.save().settings.units === 'mph')));
        check('blocked storage: console clean', blocked.problems.length === 0, formatProblems(blocked.problems));
        await blocked.context.close();
      }

      // --- WebGL failure + context loss ---
      {
        const { page, context, problems } = await newPage(browser, { fakeClock: true });
        await page.goto(`${server.url}?debug&nowebgl`);
        await page.clock.runFor(100);
        const msg = await page.evaluate(() => document.body.textContent);
        await page.screenshot({ path: path.join(SHOTS, '52-no-webgl.png') });
        report.shots.push('52-no-webgl.png');
        check('simulated WebGL failure shows the friendly error', /WebGL not available/i.test(msg) && /Try again/i.test(msg));
        check('no-WebGL page: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
      }
      {
        const { page, context, problems } = await openGame(browser, server);
        await page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'practice', laps: 0 }));
        await waitPhase(page, 'countdown', 3000);
        await page.evaluate(() => {
          window.__lose = window.__apex.game.renderer.getContext().getExtension('WEBGL_lose_context');
          window.__lose.loseContext();
        });
        await page.clock.runFor(200);
        const lost = await page.evaluate(() => ({ text: document.body.textContent, running: window.__apex.game.loop.running }));
        await shot(page, '53-context-lost', { render: false });
        await page.evaluate(() => window.__lose.restoreContext());
        await page.clock.runFor(400);
        const back = await page.evaluate(() => ({ text: document.body.textContent, running: window.__apex.game.loop.running, lost: window.__apex.game.contextLost }));
        check('WebGL context loss shows a notice and pauses; restore resumes', /Graphics reset/i.test(lost.text) && !lost.running && back.running && !back.lost && !/Graphics reset/i.test(back.text));
        // Chrome itself logs a CONTEXT_LOST_WEBGL warning when the context is deliberately lost; nothing else may appear
        const other = problems.filter((p) => !/CONTEXT_LOST_WEBGL|context lost|WebGL context was lost/i.test(p.text));
        check('context loss: no errors besides the browser’s own context-lost notice', other.length === 0, formatProblems(other));
        await context.close();
      }

      // --- gamepad (Standard Gamepad API, faked) ---
      {
        const ctx = await newPage(browser, { fakeClock: true });
        await ctx.page.addInitScript(() => {
          const pad = { id: 'Fake Standard Gamepad', index: 0, connected: true, mapping: 'standard', axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })) };
          window.__pad = pad;
          window.__padPress = (i, v = 1) => {
            pad.buttons[i].pressed = v > 0.5;
            pad.buttons[i].value = v;
          };
          navigator.getGamepads = () => [pad];
        });
        const { page, context, problems } = ctx;
        await page.goto(`${server.url}?debug&render=manual`);
        await waitFor(page, () => !!window.__apex && window.__apex.ready() === 'menu');
        // A on the main menu = focused / primary (Drive)
        await page.evaluate(() => window.__padPress(0, 1));
        await page.clock.runFor(48);
        await page.evaluate(() => window.__padPress(0, 0));
        await page.clock.runFor(48);
        const afterA = await page.evaluate(() => window.__apex.getState().phase);
        // B = back
        await page.evaluate(() => window.__padPress(1, 1));
        await page.clock.runFor(48);
        await page.evaluate(() => window.__padPress(1, 0));
        await page.clock.runFor(48);
        const afterB = await page.evaluate(() => window.__apex.getState().phase);
        check('gamepad A confirms and B goes back in menus', afterA === 'select' && afterB === 'menu', `${afterA} → ${afterB}`);
        await page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'practice', laps: 0 }));
        await waitPhase(page, 'countdown', 3000);
        await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 800);
        await page.evaluate(() => {
          window.__padPress(7, 1); // RT
          window.__pad.axes[0] = 0.6;
        });
        await page.clock.runFor(16 * 90);
        const drive = await page.evaluate(() => ({ speed: window.__apex.getCar().speed, steer: window.__apex.game.input.state.steer }));
        await page.evaluate(() => {
          window.__padPress(7, 0);
          window.__pad.axes[0] = 0;
          window.__padPress(9, 1); // Start
        });
        await page.clock.runFor(48);
        await page.evaluate(() => window.__padPress(9, 0));
        await page.clock.runFor(48);
        const pausedPad = await page.evaluate(() => window.__apex.ready());
        check('gamepad RT accelerates, left stick steers (dead zone applied), Start pauses', drive.speed > 10 && drive.steer > 0.3 && drive.steer < 0.6 && pausedPad === 'paused', `speed ${drive.speed.toFixed(1)}, steer ${drive.steer.toFixed(2)}, ${pausedPad}`);
        check('gamepad: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
      }

      // --- touch device: on-screen controls, phone-width layout ---
      {
        const context = await browser.newContext({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        const problems = [];
        page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && problems.push({ type: m.type(), text: m.text() }));
        page.on('pageerror', (e) => problems.push({ type: 'pageerror', text: String(e) }));
        await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.fulfill({ status: 200, contentType: 'text/css', body: '' }));
        await page.clock.install({ time: Date.parse('2026-01-01T00:00:00Z') });
        await page.clock.pauseAt(Date.parse('2026-01-01T00:00:01Z'));
        await page.goto(`${server.url}?debug&render=manual`);
        await waitFor(page, () => !!window.__apex && window.__apex.ready() === 'menu');
        await shot(page, '54-phone-menu');
        await page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'practice', laps: 0 }));
        await waitPhase(page, 'countdown', 3000);
        await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 800);
        const hasTouchUi = await page.evaluate(() => !!document.querySelector('.touch .touch-btn'));
        const gas = page.locator('.touch-btn[aria-label="throttle"]');
        const box = await gas.boundingBox();
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await gas.dispatchEvent('pointerdown', { pointerId: 1, pointerType: 'touch', isPrimary: true });
        await page.clock.runFor(16 * 90);
        const speed = await page.evaluate(() => window.__apex.getCar().speed);
        await shot(page, '55-phone-race');
        await gas.dispatchEvent('pointerup', { pointerId: 1, pointerType: 'touch', isPrimary: true });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        check('touch device: on-screen controls appear and drive the car', hasTouchUi && speed > 8, `speed ${speed.toFixed(1)}`);
        check('phone width: no horizontal page scroll', !overflow);
        check('touch: console clean', problems.length === 0, formatProblems(problems));
        await context.close();
      }
    }

    // ---------------------------------------------------------------- memory + loop (phase 8)
    if (want('memory')) {
      const { page, context, problems } = await openGame(browser, server);
      const snap = async () => {
        await page.evaluate(() => window.__apex.render());
        await page.clock.runFor(32);
        return page.evaluate(() => {
          const i = window.__apex.info();
          return { geometries: i.geometries, textures: i.textures, programs: i.programs, loops: i.loops, uiNodes: document.querySelectorAll('#ui-root *').length };
        });
      };
      const cycle = async (cid) => {
        await page.evaluate((c) => window.__apex.startRace({ circuitId: c, mode: 'grandprix', laps: 3, opponents: 7 }), cid);
        await waitPhase(page, 'countdown', 3000);
        await page.evaluate(() => window.__apex.render());
        await page.clock.runFor(16 * 30);
        await page.evaluate(() => window.__apex.game.quitToMenu());
        await page.clock.runFor(48);
      };
      // warm up once per circuit so every shader program exists, then measure
      for (const cid of CIRCUIT_ORDER) await cycle(cid);
      const base = await snap();
      const seq = [];
      for (let k = 0; k < 10; k++) {
        await cycle(CIRCUIT_ORDER[k % 4]);
        seq.push(await snap());
      }
      const last = seq[seq.length - 1];
      report.memory = { base, seq };
      check('10× enter/leave a race: renderer memory flat (geometries, textures, programs)', last.geometries === base.geometries && last.textures === base.textures && last.programs === base.programs, `base ${JSON.stringify(base)} → after 10 ${JSON.stringify(last)}`);
      check('10× enter/leave: still exactly one rAF loop, UI nodes flat', seq.every((s) => s.loops === 1) && last.uiNodes === base.uiNodes, `loops ${seq.map((s) => s.loops).join('')}, ui nodes ${base.uiNodes} → ${last.uiNodes}`);
      // draw-call / triangle budget with a full grid, High preset
      const budget = [];
      for (const cid of CIRCUIT_ORDER) {
        await page.evaluate((c) => window.__apex.startRace({ circuitId: c, mode: 'grandprix', laps: 3, opponents: 7 }), cid);
        await waitPhase(page, 'countdown', 3000);
        await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 800);
        await page.evaluate(() => window.__autopilot.start({ laps: 9, plan: [], speedScale: 0.9 }));
        let calls = 0;
        let tris = 0;
        for (let f = 0; f < 40; f++) {
          await page.evaluate(() => window.__apex.render());
          await page.clock.runFor(16 * 15);
          const i = await page.evaluate(() => window.__apex.info());
          calls = Math.max(calls, i.calls);
          tris = Math.max(tris, i.triangles);
        }
        await page.evaluate(() => window.__autopilot.stop());
        budget.push({ cid, calls, tris });
        await page.evaluate(() => window.__apex.game.quitToMenu());
        await page.clock.runFor(48);
      }
      check('race budget: < 150 draw calls and < 300k triangles (8 cars, High)', budget.every((b) => b.calls < 150 && b.tris < 300000), budget.map((b) => `${b.cid} ${b.calls} calls / ${Math.round(b.tris / 1000)}k tris`).join(', '));
      // adaptive quality: sustained slow frames step the pixel ratio down, then the preset
      await page.evaluate(() => window.__apex.startRace({ circuitId: 'beginner', mode: 'practice', laps: 0 }));
      await waitPhase(page, 'countdown', 3000);
      const q0 = await page.evaluate(() => window.__apex.info());
      const q1 = await page.evaluate(() => window.__apex.slowFrames(400, 40));
      const q2 = await page.evaluate(() => window.__apex.slowFrames(2400, 40));
      check('adaptive quality steps down under sustained slow frames (pixel ratio, then preset + shadows)', q1.pixelRatio < q0.pixelRatio && q2.quality === 'low' && q2.shadows === false, `${q0.quality}@${q0.pixelRatio} → ${q1.quality}@${q1.pixelRatio} → ${q2.quality}@${q2.pixelRatio}, shadows ${q2.shadows}`);
      check('memory: console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }

    // ---------------------------------------------------------------- debug view (?debugview)
    if (want('debugview')) {
      const { page, context, problems } = await openGame(browser, server, '&debugview');
      await page.evaluate(() => window.__apex.startRace({ circuitId: 'street', mode: 'grandprix', laps: 3, opponents: 5 }));
      await waitPhase(page, 'countdown', 3000);
      await waitFor(page, () => window.__apex.getCar().raceState === 'running', null, 800);
      await page.evaluate(() => window.__autopilot.start({ laps: 9, plan: [], speedScale: 0.9 }));
      await page.clock.runFor(16 * 300);
      await page.keyboard.press('F3');
      await page.clock.runFor(16 * 30);
      await shot(page, '56-debug-view');
      const dv = await page.evaluate(() => ({ canvas: !!document.querySelector('.debug-view'), cells: window.__apex.game.race.world.lastTested.length, overlay: !!document.querySelector('.debug-overlay') && /draw calls/.test(document.querySelector('.debug-overlay').textContent) }));
      check('?debugview draws the top-down view (collider cells tested, AI lines, camera) and F3 shows FPS / draw calls', dv.canvas && dv.cells > 0 && dv.overlay, JSON.stringify(dv));
      check('debug view: console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }
  } catch (err) {
    check('verify run', false, String(err && err.stack ? err.stack : err));
  } finally {
    await browser.close();
    await server.close();
  }
  const failed = results.some((r) => !r.ok);
  report.finishedAt = new Date().toISOString();
  report.seconds = Math.round((Date.now() - t0) / 1000);
  fs.writeFileSync(path.join(SHOTS, 'report.json'), JSON.stringify(report, null, 1));
  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed in ${report.seconds}s`);
  console.log(failed ? 'VERIFY FAILED' : 'VERIFY PASSED');
  process.exit(failed ? 1 : 0);
}

main();
