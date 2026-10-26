// Starts a private Vite server (dev or preview of a production build) for the
// verification and perf scripts. Returns { url, close }.
import { createServer, preview, build } from 'vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import net from 'node:net';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

export async function startDevServer() {
  const port = await freePort();
  const server = await createServer({
    root: ROOT,
    logLevel: 'error',
    clearScreen: false,
    server: { port, strictPort: true, host: '127.0.0.1', hmr: false },
  });
  await server.listen();
  return {
    url: `http://127.0.0.1:${port}/`,
    close: () => server.close(),
  };
}

export async function startPreviewServer({ rebuild = true } = {}) {
  if (rebuild) await build({ root: ROOT, logLevel: 'error' });
  const port = await freePort();
  const server = await preview({
    root: ROOT,
    logLevel: 'error',
    preview: { port, strictPort: true, host: '127.0.0.1' },
  });
  return {
    url: `http://127.0.0.1:${port}/`,
    close: () => new Promise((res) => server.httpServer.close(() => res())),
  };
}
