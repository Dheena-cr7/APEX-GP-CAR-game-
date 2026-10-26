import * as THREE from 'three';
import { CarView } from '../cars/CarFactory.js';
import { getCar } from '../cars/CarData.js';
import { THEMES, UI } from '../core/Palette.js';
import { createLights, disposeObject } from './SceneKit.js';
import { MeshBuilder } from '../tracks/MeshBuilder.js';

const _ground = { y: 0, pitch: 0, roll: 0, bump: 0 };

/** Studio showcase: rotating turntable, orbit drag, hard-edged floor grid. */
export class GarageScene {
  constructor(game) {
    this.game = game;
    const theme = THEMES.garage;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(theme.skyTop);
    this.scene.fog = new THREE.Fog(theme.fog, theme.fogNear, theme.fogFar);
    const lights = createLights(theme, { shadows: game.quality.preset.shadows, shadowSize: 1024, shadowExtent: 6 });
    this.lights = lights;
    lights.sun.position.set(6, 10, 6);
    this.scene.add(lights.group);
    const rim = new THREE.DirectionalLight(UI.infoBlue, 0.8);
    rim.position.set(-6, 4, -6);
    this.scene.add(rim);
    // floor + grid lines
    const floor = new THREE.Mesh(new THREE.CircleGeometry(60, 48), new THREE.MeshLambertMaterial({ color: theme.ground }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    const b = new MeshBuilder();
    for (let i = -10; i <= 10; i++) {
      for (const [x0, z0, x1, z1] of [
        [i * 3, -30, i * 3, 30],
        [-30, i * 3, 30, i * 3],
      ]) {
        const w = 0.03;
        const horizontal = z0 === z1;
        const a = b.v(x0 - (horizontal ? 0 : w), 0.005, z0 - (horizontal ? w : 0), theme.runoff);
        const c = b.v(x0 + (horizontal ? 0 : w), 0.005, z0 + (horizontal ? w : 0), theme.runoff);
        const d = b.v(x1 + (horizontal ? 0 : w), 0.005, z1 + (horizontal ? w : 0), theme.runoff);
        const e = b.v(x1 - (horizontal ? 0 : w), 0.005, z1 - (horizontal ? w : 0), theme.runoff);
        b.quad(a, c, d, e);
        b.quad(a, e, d, c);
      }
    }
    this.scene.add(new THREE.Mesh(b.build(), new THREE.MeshBasicMaterial({ vertexColors: true })));
    // turntable
    this.table = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.7, 0.18, 32), new THREE.MeshLambertMaterial({ color: theme.props, flatShading: true }));
    disc.position.y = 0.09;
    disc.receiveShadow = true;
    this.table.add(disc);
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.62, 3.72, 48), new THREE.MeshBasicMaterial({ color: UI.red }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.185;
    this.table.add(ring);
    this.scene.add(this.table);
    this.camera = new THREE.PerspectiveCamera(36, game.aspect || 16 / 9, 0.1, 200);
    this.view = null;
    this.fake = { px: 0, pz: 0, x: 0, z: 0, ph: 0, h: 0, latAccel: 0, longAccel: 0, steerAngle: 0.2, wheelAngle: 0, braking: false, reversing: false };
    this.yaw = 0.6;
    this.yawVel = 0;
    this.pitch = 0.22;
    this.dist = 9.5;
    this.dragging = false;
    this.auto = true;
    this.idle = 0;
    this._down = this._down.bind(this);
    this._move = this._move.bind(this);
    this._up = this._up.bind(this);
    this._wheel = this._wheel.bind(this);
    const el = game.canvas;
    el.addEventListener('pointerdown', this._down);
    window.addEventListener('pointermove', this._move);
    window.addEventListener('pointerup', this._up);
    el.addEventListener('wheel', this._wheel, { passive: true });
  }

  setCar(carId, liveryId, locked) {
    const def = getCar(carId);
    if (!this.view || this.view.def.id !== def.id) {
      if (this.view) this.view.dispose();
      this.view = new CarView(def, liveryId, { helmetIndex: 0 });
      this.table.add(this.view.root);
      this.view.root.position.y = 0.18;
      this.view.update(this.fake, 1, _ground, 0);
      this.view.root.position.y = 0.18;
    } else this.view.setLivery(liveryId);
    this.view.bodyMat.color.setScalar(locked ? 0.35 : 1);
  }

  setAspect(a) {
    this.camera.aspect = a;
    this.camera.updateProjectionMatrix();
  }

  _down(e) {
    if (e.button !== 0) return;
    this.dragging = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.auto = false;
    this.idle = 0;
  }

  _move(e) {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.yawVel = -dx * 0.008;
    this.yaw += this.yawVel;
    this.pitch = Math.max(0.05, Math.min(0.75, this.pitch + dy * 0.004));
  }

  _up() {
    this.dragging = false;
  }

  _wheel(e) {
    this.dist = Math.max(6.5, Math.min(14, this.dist + Math.sign(e.deltaY) * 0.6));
  }

  /** Keyboard / gamepad orbit (from the garage UI). */
  nudge(dir) {
    this.auto = false;
    this.idle = 0;
    this.yawVel = dir * 0.05;
  }

  step(dt) {
    if (!this.dragging) {
      this.idle += dt;
      if (this.idle > 4) this.auto = true;
      if (this.auto) this.yaw += dt * 0.25;
      else {
        this.yaw += this.yawVel;
        this.yawVel *= Math.exp(-dt * 4);
      }
    }
  }

  frame() {
    const d = this.dist;
    // frame the car slightly right of centre (UI panel on the left)
    const tx = this.camera.aspect > 1.2 ? -1.6 : 0;
    const cy = Math.sin(this.pitch) * d + 0.6;
    const cr = Math.cos(this.pitch) * d;
    const cx = Math.sin(this.yaw) * cr;
    const cz = Math.cos(this.yaw) * cr;
    const rx = Math.cos(this.yaw);
    const rz = -Math.sin(this.yaw);
    this.camera.position.set(cx + rx * tx, cy, cz + rz * tx);
    this.camera.lookAt(rx * tx, 0.55, rz * tx);
  }

  dispose() {
    const el = this.game.canvas;
    el.removeEventListener('pointerdown', this._down);
    window.removeEventListener('pointermove', this._move);
    window.removeEventListener('pointerup', this._up);
    el.removeEventListener('wheel', this._wheel);
    if (this.view) this.view.dispose();
    disposeObject(this.scene);
    this.scene.clear();
  }
}
