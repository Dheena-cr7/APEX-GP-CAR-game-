import { TrackModel } from './TrackModel.js';
import { CIRCUITS } from './TrackData.js';
import { THEMES, UI, css } from '../core/Palette.js';
import { shadeHex } from './MeshBuilder.js';

const models = new Map();

/** Cached centreline model per circuit (pure data, cheap to keep). */
export function circuitModel(id) {
  if (!models.has(id)) models.set(id, new TrackModel(CIRCUITS[id]));
  return models.get(id);
}

/**
 * Draw a real top-down preview of a circuit from its centreline into a new
 * canvas (themed background, road, start line, drift zones, boost pads).
 */
export function trackPreview(id, width = 320, height = 200, { mono = false } = {}) {
  const c = document.createElement('canvas');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = Math.round(width * dpr);
  c.height = Math.round(height * dpr);
  const g = c.getContext('2d');
  const m = circuitModel(id);
  const def = CIRCUITS[id];
  const theme = THEMES[def.theme];
  const W = c.width;
  const H = c.height;
  g.fillStyle = mono ? css(UI.void) : css(shadeHex(theme.ground, -0.35));
  g.fillRect(0, 0, W, H);
  const b = m.bounds;
  const pad = 14 * dpr;
  const sc = Math.min((W - pad * 2) / (b.maxX - b.minX), (H - pad * 2) / (b.maxZ - b.minZ));
  const ox = W / 2 + ((b.minX + b.maxX) / 2) * sc;
  const oz = H / 2 + ((b.minZ + b.maxZ) / 2) * sc;
  // mirrored x so the preview matches the in-game orientation (as the minimap)
  const X = (x) => ox - x * sc;
  const Z = (z) => oz - z * sc;
  const path = () => {
    g.beginPath();
    for (let i = 0; i <= m.n; i += 2) {
      const k = i % m.n;
      if (i === 0) g.moveTo(X(m.px[k]), Z(m.pz[k]));
      else g.lineTo(X(m.px[k]), Z(m.pz[k]));
    }
    g.closePath();
  };
  g.lineJoin = 'round';
  g.lineCap = 'round';
  path();
  g.strokeStyle = mono ? css(UI.edge) : css(shadeHex(theme.runoff, -0.1));
  g.lineWidth = Math.max(5 * dpr, (m.halfWidthMax * 2 + m.runoff * 2) * sc);
  g.stroke();
  path();
  g.strokeStyle = css(UI.chalk);
  g.lineWidth = Math.max(2.5 * dpr, m.halfWidthMax * 2 * sc);
  g.stroke();
  // drift zones
  for (const [u0, u1] of def.driftZones || []) {
    g.beginPath();
    const i0 = Math.floor(u0 * m.n);
    const i1 = Math.floor(u1 * m.n);
    for (let i = i0; i <= i1; i++) {
      const k = i % m.n;
      if (i === i0) g.moveTo(X(m.px[k]), Z(m.pz[k]));
      else g.lineTo(X(m.px[k]), Z(m.pz[k]));
    }
    g.strokeStyle = css(UI.goodGreen);
    g.lineWidth = 2 * dpr;
    g.stroke();
  }
  // boost pads
  g.fillStyle = css(UI.infoBlue);
  for (const p of def.boostPads || []) {
    const k = Math.floor(p.u * m.n) % m.n;
    g.fillRect(X(m.px[k]) - 3 * dpr, Z(m.pz[k]) - 3 * dpr, 6 * dpr, 6 * dpr);
  }
  // start line
  const tx = m.tx[0];
  const tz = m.tz[0];
  const sx = X(m.px[0]);
  const sz = Z(m.pz[0]);
  g.strokeStyle = css(UI.red);
  g.lineWidth = 3 * dpr;
  g.beginPath();
  const len = 9 * dpr;
  g.moveTo(sx - tz * len, sz - tx * len);
  g.lineTo(sx + tz * len, sz + tx * len);
  g.stroke();
  c.style.width = '100%';
  c.style.height = 'auto';
  c.setAttribute('role', 'img');
  c.setAttribute('aria-label', `${def.name} layout`);
  return c;
}
