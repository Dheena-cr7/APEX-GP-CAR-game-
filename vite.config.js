import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// `base` is relative so the same build works on Vercel (served at /) and on
// GitHub Pages (served at /<repo>/). Override with VITE_BASE if needed.
// Two pages: APEX GP at the root, GUST CREW under /gust/.
export default defineConfig({
  base: process.env.VITE_BASE || './',
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        gust: resolve(import.meta.dirname, 'gust/index.html'),
      },
      output: {
        // three.js is shared by both games: one cached file
        manualChunks: (id) => (id.includes('node_modules/three/') ? 'three' : undefined),
      },
    },
  },
});
