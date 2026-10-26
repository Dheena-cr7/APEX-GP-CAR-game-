// npm run verify — deterministic scripted run with nobody involved.
// Phase 1: boots the styleguide and the game shell under a fake clock,
// screenshots both and fails on any console error / warning.
import fs from 'node:fs';
import path from 'node:path';
import { startDevServer, ROOT } from './devServer.mjs';
import { launchBrowser, newPage, advanceFrames, formatProblems } from './pageSetup.mjs';

const SHOTS = path.join(ROOT, 'verify-shots');
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

async function main() {
  const server = await startDevServer();
  const browser = await launchBrowser();
  let failed = false;
  try {
    // Styleguide
    {
      const { page, context, problems } = await newPage(browser);
      await page.goto(server.url + '?styleguide', { waitUntil: 'load' });
      await advanceFrames(page, 30);
      await page.screenshot({ path: path.join(SHOTS, '00-styleguide.png'), fullPage: true });
      const buttons = await page.locator('.btn').count();
      check('styleguide renders components', buttons >= 10, `${buttons} buttons`);
      check('styleguide console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }
    // Game shell
    {
      const { page, context, problems } = await newPage(browser);
      await page.goto(server.url + '?debug', { waitUntil: 'load' });
      await page.waitForFunction(() => !!window.__game && window.__game.store.phase === 'menu', null, { timeout: 20000 });
      await advanceFrames(page, 60);
      const frames = await page.evaluate(() => window.__game.loop.frameCount);
      check('loop advances under fake clock', frames >= 50, `${frames} frames`);
      const gl = await page.evaluate(() => {
        const r = window.__game.renderer;
        const dbg = r.getContext().getExtension('WEBGL_debug_renderer_info');
        return dbg ? r.getContext().getParameter(dbg.UNMASKED_RENDERER_WEBGL) : 'unknown';
      });
      console.log('      renderer:', gl);
      await page.screenshot({ path: path.join(SHOTS, '01-menu.png') });
      check('game shell console clean', problems.length === 0, formatProblems(problems));
      await context.close();
    }
  } catch (err) {
    check('verify run', false, String(err && err.stack ? err.stack : err));
  } finally {
    await browser.close();
    await server.close();
  }
  failed = results.some((r) => !r.ok);
  fs.writeFileSync(path.join(SHOTS, 'report.json'), JSON.stringify({ results }, null, 2));
  console.log(failed ? '\nVERIFY FAILED' : '\nVERIFY PASSED');
  process.exit(failed ? 1 : 0);
}

main();
