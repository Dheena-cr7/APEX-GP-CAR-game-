import * as THREE from 'three';
import { Loop } from './Loop.js';
import { GameStore } from './GameState.js';
import { Quality } from './Quality.js';
import { THEMES } from './Palette.js';
import { SaveManager } from '../storage/SaveManager.js';
import { createSky, createLights, applyFog } from '../scenes/SceneKit.js';
import { showError } from '../ui/ErrorScreen.js';
import { h } from '../ui/dom.js';
import { Panel } from '../ui/components/Panel.js';
import { HazardBand } from '../ui/components/HazardBand.js';

/** Top-level game object: renderer, loop, store, scenes and UI. */
export class Game {
  constructor({ canvas, uiRoot, params }) {
    this.canvas = canvas;
    this.uiRoot = uiRoot;
    this.params = params;
    this.save = new SaveManager();
    this.save.load();
    this.store = new GameStore();
    this.quality = new Quality(this.save.data.settings.quality, this.save.data.settings.adaptiveQuality);
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.time = 0;
    this.loop = new Loop({ step: (dt) => this.step(dt), frame: (a, dt, now) => this.frame(a, dt, now) });
    this._onResize = this._onResize.bind(this);
  }

  init() {
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: this.quality.preset.antialias, powerPreference: 'high-performance' });
    } catch (err) {
      this.fail('Graphics unavailable', 'APEX GP could not start WebGL on this device or browser.', err);
      return false;
    }
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this._buildBackdrop();
    window.addEventListener('resize', this._onResize);
    this._onResize();
    this.store.go('menu');
    this._buildFoundationCard();
    this.loop.start();
    return true;
  }

  _buildBackdrop() {
    const theme = THEMES.beginner;
    this.scene = new THREE.Scene();
    applyFog(this.scene, theme);
    this.scene.add(createSky(theme));
    const lights = createLights(theme, { shadows: false });
    this.scene.add(lights.group);
    const ground = new THREE.Mesh(new THREE.CircleGeometry(400, 48), new THREE.MeshLambertMaterial({ color: theme.ground, flatShading: true }));
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 2000);
    this.camera.position.set(0, 12, 40);
  }

  _buildFoundationCard() {
    const card = Panel({
      label: 'APEX GP',
      raised: true,
      children: [h('h1', { className: 't-display-2', text: 'Foundation' }), HazardBand({}), h('p', { className: 't-body', text: 'Renderer, loop and store are running.' })],
    });
    card.style.position = 'absolute';
    card.style.left = 'var(--hud-gutter)';
    card.style.top = 'var(--hud-gutter)';
    this.uiRoot.appendChild(card);
  }

  step(dt) {
    this.time += dt;
  }

  frame() {
    const t = this.time * 0.1;
    this.camera.position.set(Math.sin(t) * 40, 12, Math.cos(t) * 40);
    this.camera.lookAt(0, 0, 0);
    this.renderer.render(this.scene, this.camera);
  }

  _onResize() {
    const w = window.innerWidth;
    const hgt = window.innerHeight;
    this.renderer.setPixelRatio(this.quality.computePixelRatio());
    this.renderer.setSize(w, hgt, false);
    if (this.camera) {
      this.camera.aspect = w / hgt;
      this.camera.updateProjectionMatrix();
    }
  }

  fail(title, message, err) {
    this.loop.stop();
    showError(this.uiRoot, {
      title,
      message,
      detail: err ? String(err && err.message ? err.message : err) : undefined,
      actions: [{ label: 'Reload', onClick: () => window.location.reload() }],
    });
  }
}
