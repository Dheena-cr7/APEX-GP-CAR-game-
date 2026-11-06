// Builds a course into a three.js scene (sky, lights, terrain, water,
// scenery, hazards, gates, raft, crew, effects) and keeps the visuals in
// step with a Sim every frame.

import * as THREE from 'three';
import { THEMES, CREW_CSS } from './Themes.js';
import { makeWaterMaterial, buildWaterGeometry, waterNoise, makeWhirlMaterial } from './Water.js';
import { makeSky } from './Sky.js';
import { Terrain } from './Terrain.js';
import { buildScenery } from './Scenery.js';
import {
  buildRaft, animateFlag, buildCrew, nameTag, rockGeometry, buildLog, buildSpinner, buildFloe,
  shellGeometry, buildCheckpoint, buildFinish, buildDock, buildRainbow, vcMat,
} from './Models.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Puffs, Decals, Ambient, Debris } from './Effects.js';
import { RAFT_HALF } from '../sim/Sim.js';

const lin = (hex) => new THREE.Color(hex);
const lerp = (a, b, t) => a + (b - a) * t;
const lerpAngle = (a, b, t) => {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
};

export class World {
  /**
   * Build step by step (a generator) so the loading screen can show progress.
   * Usage: const w = new World(...); for (const p of w.build()) progress(p);
   */
  constructor(renderer, course, sim, quality = 'high') {
    this.renderer = renderer;
    this.course = course;
    this.sim = sim;
    this.quality = quality;
    this.theme = THEMES[course.theme];
    this.scene = new THREE.Scene();
    this.time = 0;
    this.crewViews = new Map();
    this.hazardViews = [];
    this.shellMesh = null;
    this.cpViews = [];
    this.camShake = 0;
    this.prev = null;
    this._v = new THREE.Vector3();
    this._w = { x: 0, z: 0 };
  }

  *build() {
    const th = this.theme;
    const scene = this.scene;
    const river = this.sim.river;
    const q = this.quality;
    // sky + light
    const el = (th.sunElev * Math.PI) / 180, az = (th.sunAzim * Math.PI) / 180;
    this.sunDir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az)).normalize();
    scene.background = lin(th.skyHorizon);
    scene.fog = new THREE.Fog(th.fog, th.fogNear, th.fogFar);
    this.sky = makeSky(th, this.sunDir);
    scene.add(this.sky);
    this.hemi = new THREE.HemisphereLight(th.hemiSky, th.hemiGround, th.hemiIntensity);
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(th.sunColor, th.sunIntensity);
    this.sun.position.copy(this.sunDir).multiplyScalar(80);
    if (q !== 'low') {
      this.sun.castShadow = true;
      const size = q === 'high' ? 2048 : 1024;
      this.sun.shadow.mapSize.set(size, size);
      const sc = this.sun.shadow.camera;
      sc.left = -34; sc.right = 34; sc.top = 34; sc.bottom = -34;
      sc.near = 1; sc.far = 220;
      this.sun.shadow.bias = -0.0006;
      this.sun.shadow.normalBias = 0.04;
    }
    scene.add(this.sun);
    scene.add(this.sun.target);
    yield 0.08;

    // terrain
    const cell = q === 'low' ? 3.2 : q === 'medium' ? 2.6 : 2.1;
    this.terrain = new Terrain(river, th, { cell, seed: this.course.difficulty });
    yield 0.35;
    this.terrainMesh = this.terrain.buildMesh();
    scene.add(this.terrainMesh);
    yield 0.48;

    // water
    const statics = [];
    for (const h of this.sim.hazards) {
      if (h.type === 'rock') statics.push({ x: h.baseX, z: h.baseZ, r: h.def.r });
      if (h.type === 'spinner') statics.push({ x: h.baseX, z: h.baseZ, r: 0.7 });
    }
    const foamAt = (x, z) => {
      let f = 0;
      for (const s of statics) {
        const d = Math.hypot(x - s.x, z - s.z);
        const v = 1 - (d - s.r) / 2.6;
        if (v > f) f = v;
      }
      return Math.max(0, Math.min(1, f));
    };
    this.waterMat = makeWaterMaterial(th, this.sunDir);
    this.waterMat.uniforms.uNoise.value = waterNoise();
    this.water = new THREE.Mesh(buildWaterGeometry(river, foamAt), this.waterMat);
    this.water.name = 'water';
    scene.add(this.water);
    yield 0.58;

    // scenery
    const avoid = (x, z, r) => {
      for (const h of this.sim.hazards) {
        if (Math.hypot(x - h.baseX, z - h.baseZ) < (h.reach || h.def.r || 2) + r) return true;
      }
      for (const sh of this.sim.shells) if (Math.hypot(x - sh.x, z - sh.z) < r) return true;
      return false;
    };
    this.scenery = buildScenery(this.terrain, river, th, this.course, q, avoid);
    if (q !== 'high') this.scenery.traverse((o) => { if (o.isInstancedMesh) o.castShadow = false; });
    scene.add(this.scenery);
    yield 0.74;

    this._buildHazards();
    this._buildGates();
    yield 0.84;

    // raft + crew
    this.raft = buildRaft();
    scene.add(this.raft);
    this.raftShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 6.4).rotateX(-Math.PI / 2),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: 'varying vec2 vUv; void main(){ vec2 p = abs(vUv*2.0-1.0); float d = max(p.x,p.y); float a = smoothstep(1.0,0.55,d)*0.35; gl_FragColor = vec4(0.0,0.03,0.05,a); }',
      }),
    );
    this.raftShadow.renderOrder = 1;
    scene.add(this.raftShadow);
    this.syncCrew();

    // effects
    this.puffs = new Puffs(q === 'low' ? 1200 : 2600);
    scene.add(this.puffs.points);
    this.decals = new Decals(q === 'low' ? 260 : 520, th.foam);
    scene.add(this.decals.mesh);
    this.debris = new Debris(24);
    scene.add(this.debris.group);
    this.ambient = null;
    if (this.course.snow) this.ambient = new Ambient('snow', q === 'low' ? 500 : 1200);
    else if (th.extras.includes('dust')) this.ambient = new Ambient('dust', q === 'low' ? 200 : 500);
    if (this.ambient) scene.add(this.ambient.points);
    this.mistSpots = [];
    for (let i = 1; i < river.n - 1; i++) {
      if (river.slope[i] < -0.25 && river.slope[i] <= river.slope[i - 1] && river.slope[i] <= river.slope[i + 1]) {
        this.mistSpots.push({ s: i + 4, drop: -river.slope[i] });
      }
    }
    yield 0.94;

    // camera
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.3, 1400);
    this.cam = { x: 0, y: 10, z: 0, heading: river.heading(this.sim.raft.s), dist: 1, tx: 0, ty: 0, tz: 0 };
    this.snapCamera();
    // warm up shaders so the first race frame does not hitch
    this.renderer.compile(this.scene, this.camera);
    yield 1;
  }

  _buildHazards() {
    const scene = this.scene;
    const th = this.theme;
    const river = this.sim.river;
    const rockParts = [];
    for (const h of this.sim.hazards) {
      const d = h.def;
      const y = river.at(river.h, h.s);
      if (h.type === 'rock') {
        const color = d.ice ? 0xbfe6f5 : d.red ? 0xa9573a : 0x7d7a72;
        const top = d.ice ? 0xffffff : d.red ? 0xd08a5a : th.land.grass2 || 0x5a8a3a;
        const g = rockGeometry(d.r, Math.round(h.s * 13), color, top);
        g.translate(h.baseX, y + d.r * 0.25, h.baseZ);
        rockParts.push(g);
      } else if (h.type === 'log') {
        const m = buildLog(d.len);
        scene.add(m);
        this.hazardViews.push({ h, m, y: y + 0.12, bob: Math.random() * 6 });
      } else if (h.type === 'spinner') {
        const m = buildSpinner(d);
        m.position.set(h.baseX, y, h.baseZ);
        scene.add(m);
        this.hazardViews.push({ h, m, y, spinner: true });
      } else if (h.type === 'floe') {
        const m = buildFloe(d.r, Math.round(h.s * 7));
        scene.add(m);
        this.hazardViews.push({ h, m, y: y + 0.05, bob: Math.random() * 6 });
      } else if (h.type === 'whirl') {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(d.r * 3.2, d.r * 3.2).rotateX(-Math.PI / 2), makeWhirlMaterial(th, d.spin || 1));
        m.position.set(h.baseX, y + 0.06, h.baseZ);
        m.renderOrder = 1;
        scene.add(m);
        this.hazardViews.push({ h, m, whirl: true });
      }
    }
    if (rockParts.length) {
      const rocks = new THREE.Mesh(mergeGeometries(rockParts), vcMat('rock', { roughness: 0.75 }));
      rocks.castShadow = true;
      rocks.receiveShadow = true;
      scene.add(rocks);
    }
    // shells
    const n = this.sim.shells.length;
    this.shellMesh = new THREE.InstancedMesh(shellGeometry(), vcMat('shell', { roughness: 0.25, metalness: 0.55, emissive: new THREE.Color(0x6b4a00), emissiveIntensity: 0.6 }), n);
    this.shellMesh.castShadow = true;
    this.shellMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.shellMesh.frustumCulled = false;
    scene.add(this.shellMesh);
    this.shellScale = new Float32Array(n).fill(1);
    // falls rainbow
    if (this.theme.extras.includes('rainbow')) {
      let best = 0, bi = -1;
      for (let i = 0; i < river.n; i++) if (-river.slope[i] > best) { best = -river.slope[i]; bi = i; }
      if (bi > 0) {
        const p = river.point(bi + 6, 0);
        this.rainbow = buildRainbow(p.x, river.at(river.h, bi + 6) - 2, p.z, river.heading(bi + 6), river.hw[bi] + 9);
        scene.add(this.rainbow);
      }
    }
  }

  _buildGates() {
    const river = this.sim.river;
    this.sim.checkpoints.forEach((s, i) => {
      const g = buildCheckpoint(river, s, i);
      this.scene.add(g);
      this.cpViews.push(g);
    });
    this.scene.add(buildFinish(river, this.sim.finishS));
    this.scene.add(buildDock(river, 9, 1, 14));
    this.scene.add(buildDock(river, river.length - 8, -1, 12));
  }

  /** Make sure every sim crew member has a view (call when the crew changes). */
  syncCrew() {
    const seen = new Set();
    for (const c of this.sim.crew) {
      seen.add(c.slot);
      let v = this.crewViews.get(c.slot);
      if (!v || v.color !== c.color || v.hat !== c.hat || v.name !== c.name) {
        if (v) this._dropCrewView(v);
        const g = buildCrew(c.color, c.hat);
        const tag = nameTag(c.name, CREW_CSS[c.color % 4]);
        this.scene.add(g);
        this.scene.add(g.userData.marks);
        this.scene.add(tag);
        v = { g, tag, color: c.color, hat: c.hat, name: c.name, squash: 0, wasSwim: false, lean: 0, puffSeen: c.puffSeq };
        this.crewViews.set(c.slot, v);
      }
    }
    for (const [slot, v] of this.crewViews) {
      if (!seen.has(slot)) {
        this._dropCrewView(v);
        this.crewViews.delete(slot);
      }
    }
  }

  _dropCrewView(v) {
    this.scene.remove(v.g, v.g.userData.marks, v.tag);
    v.tag.material.map.dispose();
    v.tag.material.dispose();
  }

  // ------------------------------------------------------------ per-frame

  /** Pose before the last sim step, for interpolation. Call before each step. */
  capturePrev() {
    const r = this.sim.raft;
    if (!this.prev) this.prev = { x: 0, z: 0, yaw: 0, y: 0, crew: new Map() };
    const p = this.prev;
    p.x = r.x; p.z = r.z; p.yaw = r.yaw; p.y = r.y;
    for (const c of this.sim.crew) {
      let q = p.crew.get(c.slot);
      if (!q) p.crew.set(c.slot, (q = {}));
      q.mode = c.mode; q.lx = c.lx; q.lz = c.lz; q.wx = c.wx; q.wz = c.wz; q.face = c.face; q.air = c.air;
    }
  }

  snapCamera() {
    const r = this.sim.raft;
    this.cam.heading = this.sim.river.heading(r.s + 6);
    this._placeCamera(1, r.x, r.y, r.z, true);
  }

  _placeCamera(dt, rx, ry, rz, snap = false, mode = 'follow') {
    const river = this.sim.river;
    const r = this.sim.raft;
    const c = this.cam;
    if (mode === 'orbit') {
      c.heading += dt * 0.25;
    } else {
      // look along the river a little ahead of the raft, blended with travel
      let h = 0, wx = 0, wz = 0;
      for (const o of [4, 10, 16]) {
        h = river.heading(r.s + o);
        wx += Math.cos(h);
        wz += Math.sin(h);
      }
      const sp = Math.hypot(r.vx, r.vz);
      if (sp > 1.5) {
        wx += (r.vx / sp) * 0.8;
        wz += (r.vz / sp) * 0.8;
      }
      const target = Math.atan2(wz, wx);
      c.heading = snap ? target : lerpAngle(c.heading, target, 1 - Math.exp(-dt * 1.6));
    }
    const dist = 11 * c.dist, height = 7.4 * c.dist;
    const hx = Math.cos(c.heading), hz = Math.sin(c.heading);
    let cx = rx - hx * dist, cz = rz - hz * dist;
    let cy = ry + height;
    // stay above the land
    const ground = this.terrain.heightAt(cx, cz);
    if (cy < ground + 2.5) cy = ground + 2.5;
    const k = snap ? 1 : 1 - Math.exp(-dt * 5);
    c.x = lerp(c.x, cx, k);
    c.y = lerp(c.y, cy, 1 - Math.exp(-dt * 4) || 1);
    if (snap) c.y = cy;
    c.z = lerp(c.z, cz, k);
    const lk = snap ? 1 : 1 - Math.exp(-dt * 8);
    c.tx = lerp(c.tx, rx + hx * 5.5, lk);
    c.ty = lerp(c.ty, ry + 0.6, lk);
    c.tz = lerp(c.tz, rz + hz * 4.5, lk);
    const cam = this.camera;
    let sx = 0, sy = 0;
    if (this.camShake > 0.001) {
      sx = (Math.random() - 0.5) * this.camShake;
      sy = (Math.random() - 0.5) * this.camShake;
      this.camShake *= Math.exp(-dt * 7);
    }
    cam.position.set(c.x + sx, c.y + sy, c.z);
    cam.lookAt(c.tx, c.ty, c.tz);
  }

  /**
   * @param {number} alpha interpolation factor between the last two sim steps
   * @param {number} dt real frame time
   */
  update(alpha, dt, { cameraMode = 'follow', localSlot = -1, showTags = true, helpers = true } = {}) {
    this.time += dt;
    const sim = this.sim;
    const r = sim.raft;
    const p = this.prev || { x: r.x, z: r.z, yaw: r.yaw, y: r.y, crew: new Map() };
    const rx = lerp(p.x, r.x, alpha), rz = lerp(p.z, r.z, alpha);
    const ry = lerp(p.y, r.y, alpha);
    const yaw = lerpAngle(p.yaw, r.yaw, alpha);
    const t = this.time;

    // water time follows the sim clock so rapids line up with physics
    this.waterMat.uniforms.uTime.value = sim.clock;
    this.sky.material.uniforms.uTime.value = t;

    // raft pose: bob, pitch along falls, roll from crew weight and thrust
    const river = sim.river;
    const slope = river.at(river.slope, r.s);
    const bob = Math.sin(t * 1.7) * 0.05 + Math.sin(t * 2.9 + 1) * 0.03 + river.at(river.rough, r.s) * Math.sin(t * 6.1) * 0.07;
    let wl = 0, wz = 0;
    for (const c of sim.crew) {
      if (c.mode !== 'deck') continue;
      wl += c.lz;
      wz += c.lx;
    }
    const n = Math.max(1, sim.crew.length);
    const raftG = this.raft;
    raftG.position.set(rx, ry + bob, rz);
    // falls tilt the raft about the river's cross axis (world), crew weight
    // tips it a little about its own axes
    const tiltT = -Math.atan(slope) * 0.9;
    const pitchT = -(wz / n) * 0.035 + Math.sin(t * 1.1) * 0.012;
    const rollT = (wl / n) * 0.04 + Math.sin(t * 1.3) * 0.02;
    const ud0 = raftG.userData;
    const kk = 1 - Math.exp(-dt * 6);
    ud0.tilt = lerp(ud0.tilt || 0, tiltT, kk);
    ud0.pitch = lerp(ud0.pitch || 0, pitchT, kk);
    ud0.roll = lerp(ud0.roll || 0, rollT, kk);
    const hi = r.hint;
    const qa = this._qa || (this._qa = new THREE.Quaternion());
    const qb = this._qb || (this._qb = new THREE.Quaternion());
    const ax = this._ax || (this._ax = new THREE.Vector3());
    ax.set(river.tz[hi], 0, -river.tx[hi]);
    qa.setFromAxisAngle(ax, ud0.tilt);
    ax.set(0, 1, 0);
    qb.setFromAxisAngle(ax, -yaw);
    raftG.quaternion.copy(qa).multiply(qb);
    raftG.rotateZ(ud0.pitch);
    raftG.rotateX(ud0.roll);
    // wrecked: the raft is in pieces; respawned: it pops in and blinks while safe
    const ud1 = raftG.userData;
    ud1.popT = Math.min(1, (ud1.popT ?? 1) + dt * 3.2);
    const pop = ud1.popT < 1 ? 1 + Math.sin(ud1.popT * Math.PI) * 0.25 - (1 - ud1.popT) * 0.4 : 1;
    raftG.scale.setScalar(pop);
    raftG.visible = sim.wreck <= 0 && !(sim.invuln > 0.25 && Math.floor(t * 9) % 2 === 1);
    raftG.updateMatrixWorld(true);
    animateFlag(raftG.userData.flag, t, 1 + Math.hypot(r.vx, r.vz) * 0.15);
    this.raftShadow.position.set(rx, river.at(river.h, r.s) + 0.02, rz);
    this.raftShadow.rotation.y = -yaw;
    this.raftShadow.visible = r.air || ry > river.at(river.h, r.s) + 0.3;

    // crew
    const deckY = raftG.userData.deck;
    const tmp = this._v;
    for (const c of sim.crew) {
      const v = this.crewViews.get(c.slot);
      if (!v) continue;
      const q = p.crew.get(c.slot);
      const g = v.g;
      const swim = c.mode === 'swim';
      let x, y, z, face;
      const air = q && q.mode === c.mode ? lerp(q.air || 0, c.air, alpha) : c.air;
      if (!swim) {
        const lx = q && q.mode === 'deck' ? lerp(q.lx, c.lx, alpha) : c.lx;
        const lz = q && q.mode === 'deck' ? lerp(q.lz, c.lz, alpha) : c.lz;
        // deck coords map straight onto the raft group (rotation.y = -yaw)
        tmp.set(lx, deckY + air, lz);
        raftG.localToWorld(tmp);
        x = tmp.x; y = tmp.y; z = tmp.z;
      } else {
        x = q && q.mode === 'swim' ? lerp(q.wx, c.wx, alpha) : c.wx;
        z = q && q.mode === 'swim' ? lerp(q.wz, c.wz, alpha) : c.wz;
        const pr = river.project(x, z, c.hint >= 0 ? c.hint : r.hint, { s: 0, t: 0, i: 0 });
        y = river.at(river.h, pr.s) - 0.32 + air + Math.sin(t * 3 + c.slot) * 0.05;
      }
      face = q ? lerpAngle(q.face, c.face, alpha) : c.face;
      g.position.set(x, y, z);
      // squash & stretch: blasting leans forward, puffs squash
      if (c.puffSeq !== v.puffSeen) {
        v.puffSeen = c.puffSeq;
        v.squash = 1;
      }
      v.squash *= Math.exp(-dt * 6);
      v.lean = lerp(v.lean, c.blast * 0.32 + (swim ? 0.5 : 0), 1 - Math.exp(-dt * 10));
      const walkAmp = swim ? 0 : Math.min(1, c.speed / 3);
      const stepPh = c.walk * 1.4;
      const hop = Math.abs(Math.sin(stepPh)) * 0.06 * walkAmp;
      g.position.y += hop;
      g.rotation.set(0, -face, 0);
      g.rotateZ(-v.lean - (c.blasting ? Math.sin(t * 40) * 0.02 : 0));
      const sq = v.squash;
      const blastWobble = c.blasting ? Math.sin(t * 30) * 0.04 : 0;
      const S = 1.22;
      g.scale.set(S * (1 + sq * 0.25 + blastWobble), S * (1 - sq * 0.28 - blastWobble), S * (1 + sq * 0.25 + blastWobble));
      const ud = g.userData;
      ud.feet[0].position.x = 0.04 + Math.sin(stepPh) * 0.09 * walkAmp;
      ud.feet[1].position.x = 0.04 - Math.sin(stepPh) * 0.09 * walkAmp;
      ud.feet[0].visible = ud.feet[1].visible = !swim;
      ud.horn.scale.setScalar(1 + c.blast * 0.18 + sq * 0.4);
      // deck marks follow the raft plane
      const marks = ud.marks;
      marks.visible = !swim && raftG.visible;
      if (!swim) {
        marks.position.set(x, raftG.position.y + deckY + 0.02 - hop, z);
        marks.rotation.set(0, -face, 0);
        const arrowA = helpers ? (c.blasting ? 0.85 : c.slot === localSlot ? 0.28 : 0.0) : (c.blasting ? 0.6 : 0);
        ud.arrow.material.opacity = lerp(ud.arrow.material.opacity, arrowA, 1 - Math.exp(-dt * 12));
        ud.ring.material.opacity = c.slot === localSlot ? 0.95 : 0.6;
      }
      v.tag.visible = showTags;
      v.tag.position.set(x, y + 1.45, z);
      // splash when entering the water
      if (swim && !v.wasSwim) this.splash(x, river.at(river.h, r.s), z, 1);
      v.wasSwim = swim;
      // gust particles from the horn
      if (c.blast > 0.05 && !swim) this._gust(c, x, y, z, face, dt);
    }

    this._updateHazards();
    this._updateShells(t);
    this._updateGates();
    this._wake(dt, rx, rz);
    this._mist(dt);

    const floor = (x, z) => this.terrain.heightAt(x, z) - 0.2;
    this.puffs.update(dt, floor);
    const waterLevel = (x, z) => this.terrain.waterAt(x, z);
    this.debris.update(dt, waterLevel, (x, y, z) => {
      if (Math.random() < 0.5) this.decals.add(x, y + 0.04, z, 0.4, 2, 0.9, 0, 0.7);
    });
    this.decals.update(dt);
    if (this.ambient) this.ambient.update(dt, this.camera.position);
    if (this.rainbow) this.rainbow.visible = true;

    // shadows follow the raft
    if (this.sun.castShadow) {
      this.sun.target.position.set(rx, ry, rz);
      this.sun.position.set(rx + this.sunDir.x * 90, ry + this.sunDir.y * 90, rz + this.sunDir.z * 90);
    }

    this._placeCamera(dt, rx, ry, rz, false, cameraMode);
    this.sky.position.copy(this.camera.position);
  }

  _gust(c, x, y, z, face, dt) {
    const rate = (this.quality === 'low' ? 30 : 60) * c.blast;
    c._gacc = (c._gacc || 0) + rate * dt;
    const bx = -Math.cos(face), bz = -Math.sin(face);
    while (c._gacc >= 1) {
      c._gacc -= 1;
      const sp = 6 + Math.random() * 4;
      const sx = (Math.random() - 0.5) * 1.6, sz = (Math.random() - 0.5) * 1.6;
      const tint = 0.92 + Math.random() * 0.08;
      this.puffs.spawn(
        x + bx * 0.45, y + 0.5, z + bz * 0.45,
        bx * sp + sx - bz * sz * 0.5, 0.6 + Math.random() * 1.2, bz * sp + sz + bx * sz * 0.5,
        0.55 + Math.random() * 0.35, 0.35, 1.7 + Math.random() * 0.8,
        tint, tint, tint * 1.02, 0.5, -0.4, 2.2,
      );
    }
    // the blast ruffles the water behind the raft
    c._racc = (c._racc || 0) + dt * 9 * c.blast;
    if (c._racc >= 1) {
      c._racc -= 1;
      const r = this.sim.raft;
      const wx = x + bx * 2.4, wz = z + bz * 2.4;
      const wy = this.sim.river.at(this.sim.river.h, r.s) + 0.05;
      this.decals.add(wx, wy, wz, 0.8, 2.8, 0.9, 1, 0.55, bx * 2, bz * 2);
    }
  }

  puffBurst(slot) {
    const sim = this.sim;
    const c = sim.crewBySlot(slot);
    const v = this.crewViews.get(slot);
    if (!c || !v) return;
    const g = v.g;
    const bx = -Math.cos(c.face), bz = -Math.sin(c.face);
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 7 + Math.random() * 6;
      this.puffs.spawn(
        g.position.x + bx * 0.5, g.position.y + 0.5, g.position.z + bz * 0.5,
        bx * sp + Math.cos(a) * 2.5, 1 + Math.random() * 2, bz * sp + Math.sin(a) * 2.5,
        0.7 + Math.random() * 0.4, 0.6, 2.6, 1, 1, 1, 0.75, -0.3, 2.8,
      );
    }
    const y = sim.river.at(sim.river.h, sim.raft.s) + 0.06;
    this.decals.add(g.position.x + bx * 2.2, y, g.position.z + bz * 2.2, 1, 6, 0.8, 0, 0.9);
  }

  splash(x, y, z, power = 1) {
    const n = Math.round(14 + power * 10);
    const col = lin(this.theme.foam);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1 + Math.random() * 3 * power;
      this.puffs.spawn(x, y + 0.1, z, Math.cos(a) * sp, 2.5 + Math.random() * 3.5 * Math.min(2, power), Math.sin(a) * sp,
        0.6 + Math.random() * 0.4, 0.25, 0.55, col.r, col.g, col.b, 0.9, 9.8, 0.4);
    }
    this.decals.add(x, y + 0.05, z, 0.6, 3.5 + power, 1.1, 0, 0.9);
    this.decals.add(x, y + 0.04, z, 0.5, 2.2 + power * 0.5, 1.5, 1, 0.7);
  }

  impact(x, z, power, kind) {
    const y = this.sim.river.at(this.sim.river.h, this.sim.raft.s) + 0.3;
    const n = Math.min(40, Math.round(6 + power * 5));
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1 + Math.random() * power;
      this.puffs.spawn(x, y, z, Math.cos(a) * sp, 2 + Math.random() * power, Math.sin(a) * sp,
        0.5 + Math.random() * 0.3, 0.2, 0.45, 0.95, 0.98, 1, 0.85, 9.8, 0.3);
    }
    if (kind === 'log' || kind === 'spinner') {
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2;
        this.puffs.spawn(x, y + 0.3, z, Math.cos(a) * 2.5, 3 + Math.random() * 2, Math.sin(a) * 2.5, 0.8, 0.12, 0.12, 0.45, 0.28, 0.14, 1, 9.8, 0.2);
      }
    }
    this.decals.add(x, y - 0.25, z, 0.5, 2 + power * 0.6, 0.8, 0, 0.8);
    this.camShake = Math.min(1.2, this.camShake + power * 0.12);
  }

  sparkle(x, z) {
    const y = this.sim.river.at(this.sim.river.h, this.sim.raft.s) + 0.8;
    for (let i = 0; i < 22; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.5 + Math.random() * 2.5;
      this.puffs.spawn(x, y, z, Math.cos(a) * sp, 2 + Math.random() * 3, Math.sin(a) * sp, 0.7, 0.25, 0.05, 1, 0.82, 0.3, 1, 3, 1.5);
    }
  }

  /** The raft is wrecked: planks fly, water explodes, the camera shakes. */
  crash(x, z) {
    const r = this.sim.raft;
    const y = this.sim.river.at(this.sim.river.h, r.s);
    this.debris.burst(r.x, y + 0.3, r.z, r.vx, r.vz, this.quality === 'low' ? 10 : 16);
    this.splash(r.x, y, r.z, 3);
    this.impact(x, z, 6, 'log');
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 5;
      this.puffs.spawn(r.x, y + 0.5, r.z, Math.cos(a) * sp, 4 + Math.random() * 6, Math.sin(a) * sp, 0.9, 0.3, 0.7, 0.96, 0.99, 1, 0.9, 9.8, 0.5);
    }
    this.camShake = 2;
  }

  /** The raft is back at a checkpoint. */
  respawned() {
    this.raft.userData.popT = 0;
    const r = this.sim.raft;
    const y = this.sim.river.at(this.sim.river.h, r.s);
    this.decals.add(r.x, y + 0.05, r.z, 1, 7, 0.9, 0, 0.9);
    for (let i = 0; i < 30; i++) {
      const a = Math.random() * Math.PI * 2;
      this.puffs.spawn(r.x + Math.cos(a) * 2.5, y + 0.6, r.z + Math.sin(a) * 2.5, Math.cos(a) * 2, 1.5 + Math.random() * 2, Math.sin(a) * 2, 0.8, 0.5, 1.4, 1, 0.95, 0.7, 0.8, 0, 2);
    }
  }

  confetti() {
    const r = this.sim.raft;
    const y = r.y + 3;
    const cols = [[1, 0.42, 0.35], [0.18, 0.77, 0.71], [1, 0.79, 0.24], [0.56, 0.42, 0.94], [1, 1, 1]];
    for (let i = 0; i < 160; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 2 + Math.random() * 6;
      const c = cols[i % cols.length];
      this.puffs.spawn(r.x, y, r.z, Math.cos(a) * sp, 5 + Math.random() * 7, Math.sin(a) * sp, 2.2 + Math.random(), 0.22, 0.18, c[0], c[1], c[2], 1, 4, 0.9);
    }
  }

  _wake(dt, rx, rz) {
    const r = this.sim.raft;
    const river = this.sim.river;
    const pr = { s: r.s, t: r.t, i: r.hint };
    const fl = river.flow(rx, rz, pr, this.sim.clock, { x: 0, z: 0 });
    const vx = r.vx - fl.x, vz = r.vz - fl.z;
    const rel = Math.hypot(vx, vz);
    this._wacc = (this._wacc || 0) + dt * Math.min(14, rel * 3.5);
    const y = river.at(river.h, r.s) + 0.04;
    while (this._wacc >= 1 && !r.air) {
      this._wacc -= 1;
      // a foam blob at the trailing corners, drifting with the current
      const ux = vx / (rel || 1), uz = vz / (rel || 1);
      const side = Math.random() < 0.5 ? -1 : 1;
      const px = rx - ux * RAFT_HALF * 1.1 + -uz * side * RAFT_HALF * 0.9;
      const pz = rz - uz * RAFT_HALF * 1.1 + ux * side * RAFT_HALF * 0.9;
      this.decals.add(px, y, pz, 0.8, 2.4 + rel * 0.2, 1.6 + Math.random() * 0.6, 1, Math.min(0.75, 0.25 + rel * 0.12), fl.x * 0.9, fl.z * 0.9);
    }
    // bow spray when moving fast
    if (rel > 3.2 && Math.random() < dt * rel * 3) {
      const ux = vx / rel, uz = vz / rel;
      const px = rx + ux * RAFT_HALF, pz = rz + uz * RAFT_HALF;
      for (let i = 0; i < 3; i++) {
        this.puffs.spawn(px, y + 0.3, pz, ux * 2 + (Math.random() - 0.5) * 3, 1.5 + Math.random() * 1.5, uz * 2 + (Math.random() - 0.5) * 3, 0.5, 0.2, 0.4, 0.95, 0.98, 1, 0.8, 9.8, 0.4);
      }
    }
  }

  _mist(dt) {
    if (!this.mistSpots.length) return;
    const river = this.sim.river;
    const r = this.sim.raft;
    for (const m of this.mistSpots) {
      if (Math.abs(m.s - r.s) > 120) continue;
      m.acc = (m.acc || 0) + dt * 18 * Math.min(2, m.drop);
      const hw = river.at(river.hw, m.s);
      const y = river.at(river.h, m.s);
      while (m.acc >= 1) {
        m.acc -= 1;
        const p = river.point(m.s + Math.random() * 3, (Math.random() * 2 - 1) * hw * 0.9);
        this.puffs.spawn(p.x, y + 0.2, p.z, (Math.random() - 0.5) * 1, 1 + Math.random() * 1.5, (Math.random() - 0.5) * 1, 1.6 + Math.random(), 0.8, 3.4, 1, 1, 1, 0.42, -0.2, 0.8);
      }
    }
  }

  _updateHazards() {
    const t = this.sim.clock;
    for (const v of this.hazardViews) {
      const h = v.h;
      if (v.whirl) {
        v.m.material.uniforms.uTime.value = t;
        continue;
      }
      const p = h.pose(t, { x: 0, z: 0, a: 0 });
      if (v.spinner) {
        v.m.userData.arm.rotation.y = -p.a;
        continue;
      }
      v.m.position.set(p.x, v.y + Math.sin(t * 1.6 + v.bob) * 0.06, p.z);
      v.m.rotation.set(0, -p.a, 0);
      if (h.type === 'log') v.m.rotateX(Math.sin(t * 1.1 + v.bob) * 0.08);
    }
  }

  _updateShells(t) {
    const m = this._m || (this._m = new THREE.Matrix4());
    const q = this._q || (this._q = new THREE.Quaternion());
    const s = this._s || (this._s = new THREE.Vector3());
    const p = this._p3 || (this._p3 = new THREE.Vector3());
    const e = this._e || (this._e = new THREE.Euler());
    const river = this.sim.river;
    this.sim.shells.forEach((sh, i) => {
      const target = sh.got ? 0 : 1;
      this.shellScale[i] += (target - this.shellScale[i]) * 0.2;
      const k = this.shellScale[i];
      const y = river.at(river.h, sh.s) + 0.55 + Math.sin(t * 2.2 + i) * 0.15 + (1 - k) * 1.5;
      p.set(sh.x, y, sh.z);
      e.set(0.3, t * 1.8 + i, 0);
      q.setFromEuler(e);
      s.setScalar(Math.max(0.0001, k * 1.25));
      m.compose(p, q, s);
      this.shellMesh.setMatrixAt(i, m);
    });
    this.shellMesh.instanceMatrix.needsUpdate = true;
  }

  _updateGates() {
    const passed = this.sim.cpIndex;
    this.cpViews.forEach((g, i) => {
      const ud = g.userData;
      const now = i < passed;
      if (now !== ud.passed) {
        ud.passed = now;
        ud.flagMats[0].color.set(now ? 0x3dff8f : 0xffd23f);
        ud.flagMats[1].color.set(now ? 0x22b864 : 0x2ec4d6);
      }
      for (let k = 0; k < ud.flags.length; k++) ud.flags[k].rotation.x = Math.sin(this.time * 4 + k) * 0.25;
    });
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    // a little wider on portrait screens so the raft and river fit
    this.camera.fov = w / h < 1 ? 66 : 52;
    this.camera.updateProjectionMatrix();
    this.puffs.setViewport(h * Math.min(2, this.renderer.getPixelRatio()));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of ms) {
          for (const k of Object.keys(m)) {
            const val = m[k];
            if (val && val.isTexture && val !== waterNoise()) val.dispose();
          }
          if (m.uniforms) for (const u of Object.values(m.uniforms)) if (u.value && u.value.isTexture && u.value !== waterNoise()) u.value.dispose();
          m.dispose();
        }
      }
    });
    if (this.sun && this.sun.shadow && this.sun.shadow.map) this.sun.shadow.map.dispose();
    this.scene.clear();
  }
}
