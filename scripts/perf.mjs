// npm run perf — builds the production bundle, serves it with `vite preview`,
// and drives every circuit (full 8-car grid, autopilot) for a fixed number of
// frames on the High and Low presets in real time. Prints average / p95 frame
// cost (CPU ms inside the game frame), average frame interval, draw calls and
// triangles per circuit. Results also go to perf-results/perf.json.
import fs from 'node:fs';
import path from 'node:path';
import { startPreviewServer, ROOT } from './devServer.mjs';
import { launchBrowser } from './pageSetup.mjs';
import { CIRCUIT_ORDER } from '../src/tracks/TrackData.js';

const FRAMES = Number(process.env.PERF_FRAMES || 600);
const WARMUP_MS = 2500;
const OUT = path.join(ROOT, 'perf-results');
fs.mkdirSync(OUT, { recursive: true });

const SAMPLER = `
window.__perf = { samples: [], on: false };
(function tick(now) {
  requestAnimationFrame(tick);
  const p = window.__perf;
  if (!p.on || !window.__apex) return;
  const i = window.__apex.info();
  p.samples.push([now, i.frameMs, i.calls, i.triangles]);
})(0);
`;

function stats(arr) {
  const s = arr.slice().sort((a, b) => a - b);
  const avg = s.reduce((a, b) => a + b, 0) / Math.max(1, s.length);
  return { avg, p95: s[Math.floor(s.length * 0.95)] || 0, max: s[s.length - 1] || 0 };
}

async function run() {
  const server = await startPreviewServer({ rebuild: true });
  const browser = await launchBrowser();
  const rows = [];
  try {
    for (const preset of ['high', 'low']) {
      for (const cid of CIRCUIT_ORDER) {
        const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
        const page = await context.newPage();
        const errors = [];
        page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(m.text()));
        await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
        await page.addInitScript(SAMPLER);
        await page.goto(`${server.url}?debug&quality=${preset}`);
        await page.waitForFunction(() => window.__apex && window.__apex.ready() === 'menu', null, { timeout: 30000 });
        await page.addScriptTag({ path: path.join(ROOT, 'scripts', 'verify-autopilot.js') });
        await page.evaluate((c) => window.__apex.startRace({ circuitId: c, mode: 'grandprix', laps: 3, opponents: 7, difficulty: 'medium' }), cid);
        await page.waitForFunction(() => window.__apex.ready() === 'racing', null, { timeout: 60000 });
        await page.evaluate(() => window.__autopilot.start({ laps: 9, plan: [], speedScale: 0.9 }));
        await page.waitForTimeout(WARMUP_MS);
        await page.evaluate(() => {
          window.__perf.samples = [];
          window.__perf.on = true;
        });
        await page.waitForFunction((n) => window.__perf.samples.length >= n, FRAMES, { timeout: 120000 });
        const samples = await page.evaluate(() => {
          window.__perf.on = false;
          return window.__perf.samples;
        });
        const dts = [];
        for (let i = 1; i < samples.length; i++) dts.push(samples[i][0] - samples[i - 1][0]);
        const cost = stats(samples.map((s) => s[1]));
        const interval = stats(dts);
        const calls = stats(samples.map((s) => s[2]));
        const tris = stats(samples.map((s) => s[3]));
        const gpu = await page.evaluate(() => {
          const g = window.__apex.game.renderer.getContext();
          const d = g.getExtension('WEBGL_debug_renderer_info');
          return d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'unknown';
        });
        const row = { preset, circuit: cid, frames: samples.length, costAvg: cost.avg, costP95: cost.p95, intervalAvg: interval.avg, fps: 1000 / interval.avg, intervalP95: interval.p95, callsMax: calls.max, callsAvg: calls.avg, trisMax: tris.max, trisAvg: tris.avg, errors: errors.length, gpu };
        rows.push(row);
        console.log(
          `${preset.padEnd(5)} ${cid.padEnd(10)} frame cost avg ${cost.avg.toFixed(2)} ms  p95 ${cost.p95.toFixed(2)} ms | interval avg ${interval.avg.toFixed(2)} ms (${row.fps.toFixed(0)} fps) p95 ${interval.p95.toFixed(2)} | draw calls max ${calls.max} | triangles max ${tris.max}${errors.length ? ` | ${errors.length} console problems` : ''}`,
        );
        await context.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }
  fs.writeFileSync(path.join(OUT, 'perf.json'), JSON.stringify({ when: new Date().toISOString(), frames: FRAMES, viewport: '1920x1080', rows }, null, 1));
  const over = rows.filter((r) => r.callsMax >= 150 || r.trisMax >= 300000);
  console.log(`\nGPU: ${rows[0] ? rows[0].gpu : 'n/a'}`);
  console.log(over.length ? `BUDGET EXCEEDED: ${over.map((r) => `${r.preset}/${r.circuit}`).join(', ')}` : 'Budget OK: < 150 draw calls and < 300k triangles on every circuit / preset.');
  process.exit(over.length || rows.some((r) => r.errors) ? 1 : 0);
}

run();
