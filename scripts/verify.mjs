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
