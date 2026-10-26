// Shared Playwright setup for verify / perf: launches Chromium, routes font
// requests (real fonts when online, empty CSS when offline so a missing
// network never shows up as a console error), installs a seeded Math.random,
// and records every console error / warning / page error.
import { chromium } from 'playwright';

export const GPU_ARGS = ['--ignore-gpu-blocklist', '--enable-gpu', '--use-angle=d3d11', '--enable-unsafe-swiftshader'];

export async function launchBrowser({ gpu = true } = {}) {
  const args = gpu ? GPU_ARGS : ['--enable-unsafe-swiftshader'];
  return chromium.launch({ headless: true, args });
}

const SEED_SCRIPT = `
(() => {
  let s = 0x9e3779b9;
  function mulberry32() {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  Math.random = mulberry32;
  window.__reseed = (n) => { s = n >>> 0; };
})();
`;

/**
 * Create a page with console capture. Returns { page, problems }.
 * problems: array of { type, text } collected for the whole session.
 */
export async function newPage(browser, { width = 1280, height = 720, fakeClock = true, seed = true } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const problems = [];
  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') problems.push({ type, text: msg.text(), where: page.url() });
  });
  page.on('pageerror', (err) => problems.push({ type: 'pageerror', text: String(err && err.stack ? err.stack : err), where: page.url() }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, async (route) => {
    try {
      const resp = await route.fetch({ timeout: 4000 });
      await route.fulfill({ response: resp });
    } catch {
      const isCss = route.request().url().includes('googleapis');
      await route.fulfill({ status: 200, contentType: isCss ? 'text/css' : 'font/woff2', body: '' });
    }
  });
  if (seed) await page.addInitScript(SEED_SCRIPT);
  if (fakeClock) await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  return { page, context, problems };
}

/** Advance the fake clock in exact 16 ms frames. */
export async function advanceFrames(page, frames) {
  await page.clock.runFor(16 * frames);
}

export function formatProblems(problems) {
  return problems.map((p) => `  [${p.type}] ${p.text.split('\n')[0]}`).join('\n');
}
