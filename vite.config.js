import { defineConfig } from 'vite';

// `base` is relative so the same build works on Vercel (served at /) and on
// GitHub Pages (served at /<repo>/). Override with VITE_BASE if needed.
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
  },
});
