import * as THREE from 'three';
import { buildTrack } from '../tracks/TrackFactory.js';
import { CIRCUITS } from '../tracks/TrackData.js';
import { RacingLine } from '../tracks/RacingLine.js';
import { Vehicle } from '../cars/VehiclePhysics.js';
import { CarView } from '../cars/CarFactory.js';
import { CARS } from '../cars/CarData.js';
import { THEMES } from '../core/Palette.js';
import { createSky, createLights, applyFog, followLight, disposeObject } from './SceneKit.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

/**
 * Animated menu backdrop: the Beginner circuit with three demo cars lapping
 * on the racing line, filmed by a slow orbiting camera framed to the right
 * of the left-aligned hero card.
 */
export class MenuScene {
  constructor(game) {
    this.game = game;
    this.scene = new THREE.Scene();
    const def = CIRCUITS.beginner;
    const theme = THEMES[def.theme];
    applyFog(this.scene, theme);
    this.sky = createSky(theme);
    this.scene.add(this.sky);
    const q = game.quality.preset;
    this.lights = createLights(theme, { shadows: q.shadows, shadowSize: Math.min(1024, q.shadowSize), shadowExtent: 30 });
    this.scene.add(this.lights.group);
    this.track = buildTrack(def, { quality: q, propDensity: 0.7 });
    this.scene.add(this.track.group);
    this.model = this.track.model;
    this.line = new RacingLine(this.model, { aLat: 13, vMax: 60 });
    this.camera = new THREE.PerspectiveCamera(42, game.aspect || 16 / 9, 0.2, 2400);
    this.cars = [];
    const picks = [CARS[0], CARS[1], CARS[2]];
    picks.forEach((carDef, i) => {
      const v = new Vehicle(carDef.stats, { assist: 'easy' });
      const view = new CarView(carDef, carDef.defaultLivery, { helmetIndex: i + 2 });
      const s = this.model.wrapS(120 - i * 22);
      const p = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
      this.model.pointAt(s, this.line.offsetAt(s) + (i - 1) * 1.6, p);
      v.reset(p.x, p.z, Math.atan2(p.tx, p.tz));
      v.u = 25;
      this.scene.add(view.root);
      this.cars.push({ v, view, proj: { s, t: 0, i: -1 }, lane: (i - 1) * 1.6, pace: 0.8 - i * 0.03 });
    });
    this.time = 0;
    this.orbit = 0;
    this._ground = { y: 0, pitch: 0, roll: 0, bump: 0 };
    this._pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1 };
    this._look = new THREE.Vector3();
  }

  setAspect(a) {
    this.camera.aspect = a;
    this.camera.updateProjectionMatrix();
  }

  step(dt) {
    this.time += dt;
    const m = this.model;
    for (const c of this.cars) {
      const v = c.v;
      v.savePrev();
      m.project(v.x, v.z, c.proj.i, c.proj);
      const look = 9 + v.u * 0.45;
      m.pointAt(c.proj.s + look, this.line.offsetAt(c.proj.s + look) + c.lane, this._pt);
      const err = wrap(Math.atan2(this._pt.x - v.x, this._pt.z - v.z) - v.h);
      const target = this.line.minSpeedAhead(c.proj.s, v.u * 0.5 + 8) * c.pace;
      const dv = target - v.u;
      v.step(dt, { steer: Math.max(-1, Math.min(1, -err * 2.2)), throttle: dv > 0 ? Math.min(1, dv * 0.4 + 0.1) : 0, brake: dv < -2 ? Math.min(1, -dv * 0.2) : 0, handbrake: false, boost: false }, m.surfaceAt(c.proj.s, c.proj.t));
      v.y = m.heightAt(c.proj.s, c.proj.t);
    }
  }

  frame(alpha, dt) {
    for (const c of this.cars) {
      this._ground.y = c.v.y;
      c.view.update(c.v, alpha, this._ground, dt);
    }
    // orbit the lead car; aim a little to its left so it sits right of the hero card
    const lead = this.cars[0].v;
    const x = lead.px + (lead.x - lead.px) * alpha;
    const z = lead.pz + (lead.z - lead.pz) * alpha;
    this.orbit += dt * 0.12;
    const a = lead.h + Math.PI * 0.75 + Math.sin(this.orbit) * 0.9;
    const r = 13 + Math.sin(this.orbit * 0.7) * 3;
    this.camera.position.set(x + Math.sin(a) * r, lead.y + 3.2 + Math.sin(this.orbit * 0.5) * 0.8, z + Math.cos(a) * r);
    // shift the aim point toward camera-left so the car frames on the right
    const cx = Math.cos(a);
    const cz = -Math.sin(a);
    const shift = this.camera.aspect > 1.2 ? 3.4 : 0;
    this._look.set(x - cx * shift, lead.y + 0.8, z - cz * shift);
    this.camera.lookAt(this._look);
    this.sky.position.copy(this.camera.position);
    followLight(this.lights.sun, x, lead.y, z);
  }

  dispose() {
    for (const c of this.cars) c.view.dispose();
    this.track.dispose();
    disposeObject(this.scene);
    this.scene.clear();
  }
}
