import { css, UI } from '../core/Palette.js';

/**
 * Mini-map drawn from the real centreline. The track outline is rendered
 * once to an offscreen canvas; each frame only the dots are redrawn.
 */
export class MiniMap {
  constructor(model, size = 168) {
    this.model = model;
    this.size = size;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'minimap__canvas';
    this.canvas.width = Math.round(size * dpr);
    this.canvas.height = Math.round(size * dpr);
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    this.ctx = this.canvas.getContext('2d');
    this.dpr = dpr;
    const b = model.bounds;
    const span = Math.max(b.maxX - b.minX, b.maxZ - b.minZ);
    this.scale = ((size - 20) * dpr) / span;
    this.ox = (size * dpr) / 2 - ((b.minX + b.maxX) / 2) * this.scale;
    this.oz = (size * dpr) / 2 - ((b.minZ + b.maxZ) / 2) * this.scale;
    this.base = document.createElement('canvas');
    this.base.width = this.canvas.width;
    this.base.height = this.canvas.height;
    this._drawBase();
    this.colors = { player: css(UI.infoBlue), ai: css(UI.chalk), leader: css(UI.red), ring: css(UI.void) };
  }

  _x(x) {
    // mirror x so the map reads like the view from above with +z up-screen
    return this.canvas.width - (x * this.scale + this.ox);
  }

  _z(z) {
    return this.canvas.height - (z * this.scale + this.oz);
  }

  _drawBase() {
    const g = this.base.getContext('2d');
    const m = this.model;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    const path = () => {
      g.beginPath();
      for (let i = 0; i <= m.n; i += 3) {
        const k = i % m.n;
        const x = this._x(m.px[k]);
        const z = this._z(m.pz[k]);
        if (i === 0) g.moveTo(x, z);
        else g.lineTo(x, z);
      }
      g.closePath();
    };
    path();
    g.strokeStyle = css(UI.void);
    g.lineWidth = 9 * this.dpr;
    g.stroke();
    path();
    g.strokeStyle = css(UI.chalk);
    g.lineWidth = 3.5 * this.dpr;
    g.stroke();
    // start / finish tick
    const x0 = this._x(m.px[0]);
    const z0 = this._z(m.pz[0]);
    const tx = -m.tx[0];
    const tz = -m.tz[0];
    g.strokeStyle = css(UI.red);
    g.lineWidth = 3 * this.dpr;
    g.beginPath();
    g.moveTo(x0 - tz * 7 * this.dpr, z0 + tx * 7 * this.dpr);
    g.lineTo(x0 + tz * 7 * this.dpr, z0 - tx * 7 * this.dpr);
    g.stroke();
  }

  /** dots: array of {x, z, player, leader} */
  draw(dots) {
    const g = this.ctx;
    g.clearRect(0, 0, this.canvas.width, this.canvas.height);
    g.drawImage(this.base, 0, 0);
    const r = 3.6 * this.dpr;
    // AI first so the player dot is always on top
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if ((pass === 1) !== !!d.player) continue;
        const x = this._x(d.x);
        const z = this._z(d.z);
        g.fillStyle = this.colors.ring;
        g.fillRect(x - r - this.dpr, z - r - this.dpr, (r + this.dpr) * 2, (r + this.dpr) * 2);
        g.fillStyle = d.player ? this.colors.player : d.leader ? this.colors.leader : this.colors.ai;
        g.fillRect(x - r, z - r, r * 2, r * 2);
      }
    }
  }
}
