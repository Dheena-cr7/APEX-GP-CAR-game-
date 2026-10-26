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
