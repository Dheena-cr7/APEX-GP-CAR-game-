import { css, UI } from '../core/Palette.js';

/**
 * Top-down debug view (?debugview): a 2D canvas centred on the player with
 * the barriers, racing line, AI cars and their aim points, the player's
 * trail, the chase camera, and the collider-hash cells tested this step.
 */
export class DebugView {
  constructor(game) {
    this.game = game;
    this.size = 380;
    this.zoom = 3.2; // px per metre
    const c = document.createElement('canvas');
    c.className = 'debug-view';
    c.width = this.size;
    c.height = this.size;
    Object.assign(c.style, { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 70, border: '1px solid', pointerEvents: 'none' });
    c.style.borderColor = css(UI.edge);
    game.uiRoot.appendChild(c);
    this.canvas = c;
    this.ctx = c.getContext('2d');
    this.trail = new Float32Array(600);
    this.trailN = 0;
    this.trailI = 0;
    this.colors = { bg: css(UI.void), edge: css(UI.ash), wall: css(UI.chalk), line: css(UI.red), player: css(UI.infoBlue), ai: css(UI.chalk), cell: css(UI.warnAmber), cam: css(UI.goodGreen), trail: css(UI.infoBlue) };
  }

  draw() {
    const race = this.game.race;
    const g = this.ctx;
    const S = this.size;
    g.fillStyle = this.colors.bg;
    g.globalAlpha = 0.88;
    g.fillRect(0, 0, S, S);
    g.globalAlpha = 1;
    if (!race || !race.ready) return;
    race.world.debugCells = true;
    const m = race.model;
    const p = race.player.vehicle;
    // trail (ring buffer of x,z)
    this.trail[this.trailI * 2] = p.x;
    this.trail[this.trailI * 2 + 1] = p.z;
    this.trailI = (this.trailI + 1) % (this.trail.length / 2);
    this.trailN = Math.min(this.trail.length / 2, this.trailN + 1);
    // view rotated so the player's heading points up
    const ch = Math.cos(p.h);
    const sh = Math.sin(p.h);
    const z = this.zoom;
    const X = (x, zz) => {
      const dx = x - p.x;
      const dz = zz - p.z;
      // right vector (-cos h, sin h) → screen +x; forward → screen -y
      return S / 2 + (-dx * ch + dz * sh) * z;
    };
    const Y = (x, zz) => {
      const dx = x - p.x;
      const dz = zz - p.z;
      return S / 2 - (dx * sh + dz * ch) * z;
    };
    const span = S / z;
    const i0 = race.player.proj.i;
    const reach = Math.ceil(span / m.ds);
    const pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
    const strokeOffset = (tFn, color, width) => {
      g.strokeStyle = color;
      g.lineWidth = width;
      g.beginPath();
      for (let k = -reach; k <= reach; k += 2) {
        const s = (i0 + k) * m.ds;
        m.pointAt(s, tFn(s), pt);
        const sx = X(pt.x, pt.z);
        const sy = Y(pt.x, pt.z);
        if (k === -reach) g.moveTo(sx, sy);
        else g.lineTo(sx, sy);
      }
      g.stroke();
    };
    // collider cells tested by the last query
    g.strokeStyle = this.colors.cell;
    g.lineWidth = 1;
    for (const key of race.world.lastTested) {
      const b = race.world.cellBounds(key);
      g.beginPath();
      const corners = [
        [b.s0, b.t0],
        [b.s1, b.t0],
        [b.s1, b.t1],
        [b.s0, b.t1],
      ];
      corners.forEach(([s, t], idx) => {
        m.pointAt(s, t, pt);
        if (idx === 0) g.moveTo(X(pt.x, pt.z), Y(pt.x, pt.z));
        else g.lineTo(X(pt.x, pt.z), Y(pt.x, pt.z));
      });
      g.closePath();
      g.stroke();
    }
    strokeOffset((s) => m.halfWidthAt(s), this.colors.edge, 1);
    strokeOffset((s) => -m.halfWidthAt(s), this.colors.edge, 1);
    strokeOffset((s) => m.wallOffset(s), this.colors.wall, 2);
    strokeOffset((s) => -m.wallOffset(s), this.colors.wall, 2);
    strokeOffset((s) => race.line.offsetAt(s), this.colors.line, 1.5);
    // trail
    g.fillStyle = this.colors.trail;
    for (let k = 0; k < this.trailN; k += 3) {
      const tx = this.trail[k * 2];
      const tz = this.trail[k * 2 + 1];
      g.fillRect(X(tx, tz) - 1, Y(tx, tz) - 1, 2, 2);
    }
    // cars as oriented rectangles
    for (const r of race.racers) {
      const v = r.vehicle;
      const c = Math.cos(v.h);
      const s = Math.sin(v.h);
      g.fillStyle = r.isPlayer ? this.colors.player : this.colors.ai;
      g.beginPath();
      const hw = 0.9;
      const hl = 2.1;
      const pts = [
        [-hw, -hl],
        [hw, -hl],
        [hw, hl],
        [-hw, hl],
      ];
      pts.forEach(([lx, lz], idx) => {
        // local x = left (cos h, -sin h), local z = forward (sin h, cos h)
        const wx = v.x + lx * c + lz * s;
        const wz = v.z - lx * s + lz * c;
        if (idx === 0) g.moveTo(X(wx, wz), Y(wx, wz));
        else g.lineTo(X(wx, wz), Y(wx, wz));
      });
      g.closePath();
      g.fill();
      if (r.ai && r.ai._pt) {
        g.strokeStyle = this.colors.ai;
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(X(v.x, v.z), Y(v.x, v.z));
        g.lineTo(X(r.ai._pt.x, r.ai._pt.z), Y(r.ai._pt.x, r.ai._pt.z));
        g.stroke();
      }
    }
    // camera
    const cam = race.camera.position;
    g.fillStyle = this.colors.cam;
    g.fillRect(X(cam.x, cam.z) - 3, Y(cam.x, cam.z) - 3, 6, 6);
    g.strokeStyle = this.colors.cam;
    g.beginPath();
    g.moveTo(X(cam.x, cam.z), Y(cam.x, cam.z));
    g.lineTo(X(p.x, p.z), Y(p.x, p.z));
    g.stroke();
    g.fillStyle = this.colors.wall;
    g.font = '10px monospace';
    g.fillText(`cells ${race.world.lastTested.length}  pen ${(race.debug.lastPenetration * 100).toFixed(1)}cm  cam ${race.debug.cameraInside || 'clear'}`, 8, S - 8);
  }
}
