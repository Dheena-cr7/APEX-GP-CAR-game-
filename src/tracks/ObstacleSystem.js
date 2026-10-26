import * as THREE from 'three';
import { MeshBuilder, shadeHex } from './MeshBuilder.js';
import { addBox, addCone, addCylinder } from './PropFactory.js';
import { SEMANTIC, UI } from '../core/Palette.js';
import { OBSTACLE, CAR } from '../cars/Sizes.js';
import { boxBox, boxCircle } from '../physics/Collision.js';
import { createRng } from '../core/Random.js';

// Trackside obstacles and interactives. All placements come from TrackData
// (track space u/t) and are seeded. Repeated items are InstancedMeshes; the
// colliders are plain 2D circles / boxes filed in the ColliderWorld.
//
// Kinds: 'cone' (knockable hazard), 'soft' (tyres / barrel: bounce),
// 'solid' (blocks, gate, truck: hard stop + sparks), 'area' (oil, boost pad,
// token: no push).

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _axis = new THREE.Vector3();
const GRAVITY = 9.81;
const _carBox = { x: 0, z: 0, h: 0, hx: CAR.width / 2 + 0.15, hz: CAR.length / 2 + 0.15 };
const _hit = { nx: 0, nz: 0, depth: 0 };
const _save = { x: 0, z: 0, h: 0 };
const MAX_CONES = 48;

function coneKit() {
  const b = new MeshBuilder();
  addBox(b, 0, 0.02, 0, 0.42, 0.04, 0.42, SEMANTIC.cone);
  addCone(b, 0, 0.04, 0, 0.18, 0.56, 8, SEMANTIC.cone, SEMANTIC.cone);
  // white reflective band
  addCylinder(b, 0, 0.26, 0, 0.115, 0.08, 8, SEMANTIC.coneStripe, SEMANTIC.coneStripe);
  return b.build();
}

function tyreStackKit() {
  const b = new MeshBuilder();
  for (let i = 0; i < 3; i++) {
    addCylinder(b, 0, i * 0.3, 0, 0.45, 0.28, 10, SEMANTIC.tyre, SEMANTIC.tyre);
    addCylinder(b, 0, i * 0.3 + 0.1, 0, 0.455, 0.06, 10, SEMANTIC.tyreBand, SEMANTIC.tyre);
  }
  return b.build();
}

function blockKit() {
  // concrete block with amber / black hazard chevrons on both long faces
  const b = new MeshBuilder();
  const { width: w, length: l, height: hgt } = OBSTACLE.block;
  addBox(b, 0, hgt / 2, 0, w, hgt, l, SEMANTIC.concrete);
  const stripes = 6;
  for (const side of [-1, 1]) {
    for (let i = 0; i < stripes; i++) {
      const z = -l / 2 + (i + 0.5) * (l / stripes);
      addBox(b, side * (w / 2 + 0.005), hgt * 0.55, z, 0.01, hgt * 0.5, l / stripes, i % 2 ? SEMANTIC.hazardAmber : SEMANTIC.hazardBlack);
    }
  }
  return b.build();
}

function oilKit() {
  const b = new MeshBuilder();
  const segs = 14;
  const r = OBSTACLE.oil.radius;
  const c = b.v(0, 0.035, 0, SEMANTIC.oil);
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2;
    const a1 = ((i + 1) / segs) * Math.PI * 2;
    // irregular blob edge
    const r0 = r * (0.86 + 0.14 * Math.sin(i * 2.3));
    const r1 = r * (0.86 + 0.14 * Math.sin((i + 1) * 2.3));
    const p0 = b.v(Math.sin(a0) * r0, 0.035, Math.cos(a0) * r0, SEMANTIC.oil);
    const p1 = b.v(Math.sin(a1) * r1, 0.035, Math.cos(a1) * r1, SEMANTIC.oil);
    b.tri(c, p0, p1);
    // amber rim
    const o0 = b.v(Math.sin(a0) * (r0 + 0.25), 0.033, Math.cos(a0) * (r0 + 0.25), SEMANTIC.oilRim);
    const o1 = b.v(Math.sin(a1) * (r1 + 0.25), 0.033, Math.cos(a1) * (r1 + 0.25), SEMANTIC.oilRim);
    const i0 = b.v(Math.sin(a0) * r0, 0.033, Math.cos(a0) * r0, SEMANTIC.oilRim);
    const i1 = b.v(Math.sin(a1) * r1, 0.033, Math.cos(a1) * r1, SEMANTIC.oilRim);
    b.quad(i0, o0, o1, i1);
  }
  return b.build();
}

function padKit() {
  // blue base, green chevrons pointing along +z (direction of travel)
  const b = new MeshBuilder();
  const { width: w, length: l } = OBSTACLE.boostPad;
  addBox(b, 0, 0.02, 0, w, 0.04, l, SEMANTIC.boostBlue);
  for (let k = 0; k < 3; k++) {
    const z = -l / 2 + 1.2 + k * 1.7;
    for (const side of [-1, 1]) {
      const ang = side * 0.75;
      addBox(b, side * 0.62, 0.05, z, 1.5, 0.02, 0.38, SEMANTIC.boostGreen, ang);
    }
  }
  return b.build();
}

function zonePostKit() {
  const b = new MeshBuilder();
  addBox(b, 0, 1.4, 0, 0.2, 2.8, 0.2, SEMANTIC.carbon);
  addBox(b, 0, 2.6, 0, 1.4, 0.9, 0.12, SEMANTIC.boostGreen);
  addBox(b, 0, 2.6, 0.07, 0.9, 0.18, 0.01, UI.void);
  return b.build();
}

function zoneDashKit() {
  const b = new MeshBuilder();
  addBox(b, 0, 0.03, 0, 0.3, 0.02, 2.4, SEMANTIC.boostGreen);
  return b.build();
}

function tokenKit() {
  const g = new THREE.OctahedronGeometry(0.6, 0);
  return g;
}

function truckKit() {
  const b = new MeshBuilder();
  const { width: w, length: l, height: h } = OBSTACLE.truck;
  // trailer + cab (cab at +z), hazard stripe band, wheels
  addBox(b, 0, h * 0.58, -0.8, w, h * 0.78, l - 1.8, shadeHex(UI.chalk, -0.12));
  addBox(b, 0, h * 0.3, -0.8, w + 0.02, 0.4, l - 1.8, SEMANTIC.hazardAmber);
  addBox(b, 0, h * 0.42, l / 2 - 0.9, w, h * 0.7, 1.8, UI.red);
  addBox(b, 0, h * 0.62, l / 2 - 0.05, w * 0.8, h * 0.25, 0.1, SEMANTIC.helmetVisor);
  for (const z of [-l / 2 + 1, -l / 2 + 2.2, l / 2 - 1]) {
    for (const x of [-w / 2, w / 2]) {
      addBox(b, x, 0.45, z, 0.35, 0.9, 0.9, SEMANTIC.tyre);
    }
  }
  return b.build();
}

function gateKit() {
  const b = new MeshBuilder();
  const { length: l, width: w, height: h } = OBSTACLE.gate;
  // post at the pivot (origin), arm extends along +z
  addBox(b, 0, h / 2 + 0.2, 0, 0.6, h + 0.4, 0.6, SEMANTIC.carbon);
  const n = 8;
  for (let i = 0; i < n; i++) {
    addBox(b, 0, h * 0.7, 0.4 + (i + 0.5) * ((l - 0.4) / n), w, 0.45, (l - 0.4) / n, i % 2 ? SEMANTIC.hazardAmber : SEMANTIC.hazardBlack);
  }
  addBox(b, 0, h * 0.35, l - 0.2, 0.3, h * 0.7, 0.3, SEMANTIC.carbon);
  return b.build();
}

function barrelKit() {
  const b = new MeshBuilder();
  const r = OBSTACLE.barrel.radius;
  addCylinder(b, 0, -r, 0, r, r * 2, 10, SEMANTIC.hazardAmber, SEMANTIC.hazardBlack);
  addCylinder(b, 0, -0.12, 0, r + 0.01, 0.24, 10, SEMANTIC.hazardBlack, SEMANTIC.hazardAmber);
  const geo = b.build();
  // axis along the track tangent (local z) so it rolls sideways across the road
  geo.rotateX(Math.PI / 2);
  return geo;
}

function lampKit() {
  const b = new MeshBuilder();
  addBox(b, 0, 1.6, 0, 0.18, 3.2, 0.18, SEMANTIC.carbon);
  return b.build();
}

export class ObstacleSystem {
  constructor(track, world, def, { seed = 1, obstacles = true, moving = true, tokens = true } = {}) {
    this.track = track;
    this.model = track.model;
    this.world = world;
    this.def = def;
    this.group = new THREE.Group();
    this.group.name = 'obstacles';
    this.mat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
    this.cones = [];
    this.movers = [];
    this.tokensList = [];
    this.zones = (def.driftZones || []).map(([u0, u1]) => [u0 * this.model.length, u1 * this.model.length]);
    this.conesKnocked = 0;
    this.time = 0;
    this.rng = createRng(seed);
    this._pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1, i: 0 };
    this.propBoxes = [];
    if (obstacles) this._buildStatic();
    this._buildPads();
    this._buildZones();
    if (moving) this._buildMovers();
    if (tokens) this._buildTokens();
  }

  get tokenCount() {
    return this.tokensList.length;
  }

  _place(u, t, out = this._pt) {
    const m = this.model;
    const s = m.wrapS(u * m.length);
    m.pointAt(s, t, out);
    out.s = s;
    out.y = m.heightAt(s, t);
    out.h = Math.atan2(out.tx, out.tz);
    return out;
  }

  _buildStatic() {
    const coneList = [];
    const tyreList = [];
    const blockList = [];
    const oilList = [];
    const jitter = () => this.rng.range(-0.35, 0.35);
    for (const o of this.def.obstacles || []) {
      const count = o.count || 1;
      for (let k = 0; k < count; k++) {
        const along = o.axis === 'across' ? 0 : (k - (count - 1) / 2) * (o.spacing || 3);
        const across = o.axis === 'across' ? (k - (count - 1) / 2) * (o.spacing || 2) : 0;
        const u = o.u + along / this.model.length;
        const p = this._place(u, o.t + across + (o.type === 'cones' ? jitter() * 0.5 : 0));
        if (o.type === 'cones') {
          if (this.cones.length + coneList.length >= MAX_CONES) continue;
          coneList.push({ x: p.x, y: p.y, z: p.z, h: p.h + this.rng.range(0, 6) });
        } else if (o.type === 'tyres') tyreList.push({ x: p.x, y: p.y, z: p.z, h: p.h });
        else if (o.type === 'block') blockList.push({ x: p.x, y: p.y, z: p.z, h: p.h });
        else if (o.type === 'oil') oilList.push({ x: p.x, y: p.y, z: p.z, h: this.rng.range(0, 6) });
      }
    }
    // cones (dynamic)
    if (coneList.length) {
      this.coneMesh = new THREE.InstancedMesh(coneKit(), this.mat, coneList.length);
      this.coneMesh.name = 'cones';
      this.coneMesh.castShadow = true;
      for (let i = 0; i < coneList.length; i++) {
        const c = coneList[i];
        const col = {
          kind: 'cone',
          shape: 'circle',
          x: c.x,
          z: c.z,
          r: OBSTACLE.cone.radius + 0.08,
          height: OBSTACLE.cone.height,
          y: c.y,
          home: { x: c.x, y: c.y, z: c.z, h: c.h },
          pos: new THREE.Vector3(c.x, c.y, c.z),
          vel: new THREE.Vector3(),
          rot: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, c.h, 0)),
          spin: new THREE.Vector3(),
          knocked: false,
          resting: true,
          index: i,
        };
        this.world.add(col);
        this.cones.push(col);
        this._writeCone(col);
      }
      this.coneMesh.instanceMatrix.needsUpdate = true;
      this.group.add(this.coneMesh);
    }
    const inst = (geo, list, name, scale = 1, cast = false) => {
      if (!list.length) {
        geo.dispose();
        return null;
      }
      const mesh = new THREE.InstancedMesh(geo, this.mat, list.length);
      mesh.name = name;
      mesh.castShadow = cast;
      mesh.receiveShadow = true;
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        _q.setFromEuler(_e.set(0, it.h, 0));
        _m.compose(_p.set(it.x, it.y, it.z), _q, _s.set(scale, scale, scale));
        mesh.setMatrixAt(i, _m);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
      this.group.add(mesh);
      return mesh;
    };
    inst(tyreStackKit(), tyreList, 'tyre-stacks', 1, true);
    for (const t of tyreList) this.world.add({ kind: 'soft', shape: 'circle', x: t.x, z: t.z, r: OBSTACLE.tyreStack.radius, height: OBSTACLE.tyreStack.height, y: t.y });
    inst(blockKit(), blockList, 'blocks', 1, true);
    for (const b of blockList) {
      this.world.add({ kind: 'solid', shape: 'box', x: b.x, z: b.z, h: b.h, hx: OBSTACLE.block.width / 2, hz: OBSTACLE.block.length / 2, height: OBSTACLE.block.height, y: b.y });
    }
    inst(oilKit(), oilList, 'oil');
    for (const o of oilList) this.world.add({ kind: 'area', type: 'oil', shape: 'circle', x: o.x, z: o.z, r: OBSTACLE.oil.radius * 0.95, y: o.y });
    this.oilSpots = oilList;
  }

  _buildPads() {
    const list = [];
    for (const pad of this.def.boostPads || []) {
      const p = this._place(pad.u, pad.t);
      list.push({ x: p.x, y: p.y, z: p.z, h: p.h });
      this.world.add({ kind: 'area', type: 'boost', shape: 'box', x: p.x, z: p.z, h: p.h, hx: OBSTACLE.boostPad.width / 2, hz: OBSTACLE.boostPad.length / 2, y: p.y });
    }
    this.pads = list;
    if (!list.length) return;
    const mesh = new THREE.InstancedMesh(padKit(), new THREE.MeshBasicMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), list.length);
    mesh.name = 'boost-pads';
    for (let i = 0; i < list.length; i++) {
      const it = list[i];
      _q.setFromEuler(_e.set(0, it.h, 0));
      _m.compose(_p.set(it.x, it.y, it.z), _q, _s.set(1, 1, 1));
      mesh.setMatrixAt(i, _m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    this.group.add(mesh);
  }

  _buildZones() {
    if (!this.zones.length) return;
    const m = this.model;
    const posts = [];
    const dashes = [];
    for (const [s0, s1] of this.zones) {
      for (const s of [s0, s1]) {
        for (const side of [-1, 1]) {
          const t = side * (m.halfWidthAt(s) + 2.2);
          m.pointAt(s, t, this._pt);
          posts.push({ x: this._pt.x, y: m.heightAt(s, t), z: this._pt.z, h: Math.atan2(this._pt.tx, this._pt.tz) + Math.PI });
        }
      }
      const len = m.deltaS(s0, s1) > 0 ? m.deltaS(s0, s1) : m.length - s0 + s1;
      for (let d = 0; d < len; d += 6) {
        const s = m.wrapS(s0 + d);
        for (const side of [-1, 1]) {
          const t = side * (m.halfWidthAt(s) - 0.8);
          m.pointAt(s, t, this._pt);
          dashes.push({ x: this._pt.x, y: m.heightAt(s, t), z: this._pt.z, h: Math.atan2(this._pt.tx, this._pt.tz) });
        }
      }
    }
    const mk = (geo, list, name, mat) => {
      const mesh = new THREE.InstancedMesh(geo, mat, list.length);
      mesh.name = name;
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        _q.setFromEuler(_e.set(0, it.h, 0));
        _m.compose(_p.set(it.x, it.y, it.z), _q, _s.set(1, 1, 1));
        mesh.setMatrixAt(i, _m);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
      this.group.add(mesh);
    };
    mk(zonePostKit(), posts, 'drift-zone-posts', this.mat);
    mk(zoneDashKit(), dashes, 'drift-zone-lines', new THREE.MeshBasicMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  }

  _buildMovers() {
    const m = this.model;
    for (const mv of this.def.moving || []) {
      const s = m.wrapS(mv.u * m.length);
      const hw = m.halfWidthAt(s);
      const wallT = m.wallOffset(s);
      const mover = { type: mv.type, s, period: mv.period, phase: mv.phase || 0, hw, wallT, col: null, mesh: null, warn: null, time: 0 };
      if (mv.type === 'truck') {
        mover.mesh = new THREE.Mesh(truckKit(), this.mat);
        mover.mesh.castShadow = true;
        mover.col = { kind: 'solid', shape: 'box', x: 0, z: 0, h: 0, hx: OBSTACLE.truck.width / 2, hz: OBSTACLE.truck.length / 2, height: OBSTACLE.truck.height, y: 0 };
        this._buildJunction(mover);
      } else if (mv.type === 'gate') {
        mover.mesh = new THREE.Mesh(gateKit(), this.mat);
        mover.mesh.castShadow = true;
        mover.col = { kind: 'solid', shape: 'box', x: 0, z: 0, h: 0, hx: OBSTACLE.gate.width / 2 + 0.05, hz: OBSTACLE.gate.length / 2, height: OBSTACLE.gate.height, y: 0 };
        mover.side = -1;
        // fixed post collider at the pivot
        m.pointAt(s, mover.side * (hw + 0.6), this._pt);
        this.world.add({ kind: 'solid', shape: 'circle', x: this._pt.x, z: this._pt.z, r: 0.4, height: 1.6, y: m.heightAt(s, 0) });
      } else if (mv.type === 'barrel') {
        mover.mesh = new THREE.Mesh(barrelKit(), this.mat);
        mover.mesh.castShadow = true;
        mover.col = { kind: 'soft', shape: 'circle', x: 0, z: 0, r: OBSTACLE.barrel.radius + 0.1, height: 0.9, y: 0 };
      } else continue;
      mover.mesh.name = `mover-${mv.type}`;
      this.group.add(mover.mesh);
      this._positionMover(mover, 0);
      this.world.add(mover.col);
      this.movers.push(mover);
    }
  }

  _buildJunction(mover) {
    // side street (visual) on both sides of the gap + amber warning lamps
    const m = this.model;
    const b = new MeshBuilder();
    const road = shadeHex(this.track.theme.road, -0.05);
    const p = this._pt;
    for (const side of [-1, 1]) {
      const pts = [];
      for (const ds of [-6.5, 6.5]) {
        for (const t of [mover.wallT - 0.5, mover.wallT + 46]) {
          m.pointAt(mover.s + ds, side * t, p);
          pts.push([p.x, m.heightAt(mover.s, side * mover.wallT) - 0.01, p.z]);
        }
      }
      const idx = pts.map((v) => b.v(v[0], v[1], v[2], road));
      if (side > 0) b.quad(idx[0], idx[1], idx[3], idx[2]);
      else b.quad(idx[0], idx[2], idx[3], idx[1]);
      // side street walls (visual)
      for (const ds of [-6.9, 6.9]) {
        m.pointAt(mover.s + ds, side * (mover.wallT + 22), p);
        addBox(b, p.x, m.heightAt(mover.s, side * mover.wallT) + 0.55, p.z, 0.8, 1.1, 46, this.track.theme.wall, Math.atan2(p.tx, p.tz) + Math.PI / 2);
      }
    }
    const mesh = new THREE.Mesh(b.build(), this.mat);
    mesh.name = 'junction';
    mesh.receiveShadow = true;
    this.group.add(mesh);
    // warning lamps on posts before the junction
    const lampMat = new THREE.MeshBasicMaterial({ color: SEMANTIC.hazardAmber });
    const lamps = new THREE.Group();
    const postGeo = lampKit();
    const lampGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    for (const side of [-1, 1]) {
      for (const ds of [-22, 9]) {
        m.pointAt(mover.s + ds, side * (mover.hw + 2.2), p);
        const y = m.heightAt(mover.s + ds, side * mover.hw);
        const post = new THREE.Mesh(postGeo, this.mat);
        post.position.set(p.x, y, p.z);
        lamps.add(post);
        const lamp = new THREE.Mesh(lampGeo, lampMat);
        lamp.position.set(p.x, y + 3.4, p.z);
        lamps.add(lamp);
      }
    }
    lamps.name = 'junction-lamps';
    this.group.add(lamps);
    mover.warn = lampMat;
  }

  _positionMover(mv, time) {
    const m = this.model;
    const ph = ((time / mv.period + mv.phase) % 1 + 1) % 1;
    const p = this._pt;
    if (mv.type === 'truck') {
      // crosses in 25% of the period each way, waits in the side street between
      const travel = mv.wallT + 14;
      let t;
      let dir;
      if (ph < 0.25) {
        t = -travel + (ph / 0.25) * travel * 2;
        dir = 1;
      } else if (ph < 0.5) {
        t = travel;
        dir = 1;
      } else if (ph < 0.75) {
        t = travel - ((ph - 0.5) / 0.25) * travel * 2;
        dir = -1;
      } else {
        t = -travel;
        dir = -1;
      }
      m.pointAt(mv.s, t, p);
      const y = m.heightAt(mv.s, Math.max(-mv.wallT, Math.min(mv.wallT, t)));
      const across = Math.atan2(p.tx, p.tz) - (dir > 0 ? Math.PI / 2 : -Math.PI / 2);
      mv.mesh.position.set(p.x, y, p.z);
      mv.mesh.rotation.set(0, across, 0);
      mv.col.x = p.x;
      mv.col.z = p.z;
      mv.col.h = across;
      mv.col.y = y;
      // lamps flash while the truck is near the road
      const near = Math.abs(t) < mv.wallT + 12 || (ph > 0.4 && ph < 0.5) || ph > 0.9;
      mv.active = Math.abs(t) < travel - 0.5;
      if (mv.warn) mv.warn.color.setHex(near && Math.floor(time * 4) % 2 === 0 ? SEMANTIC.hazardAmber : SEMANTIC.hazardBlack);
    } else if (mv.type === 'gate') {
      // swings between open (along the edge) and closed (75° across half the road)
      const swing = 0.5 - 0.5 * Math.cos(ph * Math.PI * 2);
      const pivotT = mv.side * (mv.hw + 0.6);
      m.pointAt(mv.s, pivotT, p);
      const th = Math.atan2(p.tx, p.tz);
      const angle = th + Math.PI + swing * (Math.PI / 2) * 0.83 * -mv.side;
      const y = m.heightAt(mv.s, mv.side * mv.hw);
      mv.mesh.position.set(p.x, y, p.z);
      mv.mesh.rotation.set(0, angle, 0);
      const half = OBSTACLE.gate.length / 2;
      mv.col.x = p.x + Math.sin(angle) * half;
      mv.col.z = p.z + Math.cos(angle) * half;
      mv.col.h = angle;
      mv.col.y = y;
    } else if (mv.type === 'barrel') {
      const t = Math.sin(ph * Math.PI * 2) * (mv.hw - 1.2);
      m.pointAt(mv.s, t, p);
      const y = m.heightAt(mv.s, t);
      mv.mesh.position.set(p.x, y + OBSTACLE.barrel.radius, p.z);
      const th = Math.atan2(p.tx, p.tz);
      mv.mesh.rotation.set(0, th, 0);
      // rolling: angle follows the lateral position (arc length / radius)
      mv.mesh.rotateZ(-t / OBSTACLE.barrel.radius);
      mv.col.x = p.x;
      mv.col.z = p.z;
      mv.col.y = y;
    }
  }

  _buildTokens() {
    const m = this.model;
    const count = 5;
    const geo = tokenKit();
    const mat = new THREE.MeshLambertMaterial({ color: SEMANTIC.token, emissive: SEMANTIC.token, emissiveIntensity: 0.5, flatShading: true });
    this.tokenMesh = new THREE.InstancedMesh(geo, mat, count);
    this.tokenMesh.name = 'tokens';
    for (let i = 0; i < count; i++) {
      const u = (i + 0.5) / count + this.rng.range(-0.03, 0.03);
      const s = m.wrapS(u * m.length);
      const t = this.rng.range(-0.5, 0.5) * (m.halfWidthAt(s) - 2);
      m.pointAt(s, t, this._pt);
      const tok = { kind: 'area', type: 'token', shape: 'circle', x: this._pt.x, z: this._pt.z, r: OBSTACLE.token.radius, y: m.heightAt(s, t) + 1.3, collected: false, index: i };
      this.world.add(tok);
      this.tokensList.push(tok);
    }
    this.group.add(this.tokenMesh);
    this._writeTokens();
  }

  _writeTokens() {
    if (!this.tokenMesh) return;
    for (const tok of this.tokensList) {
      _q.setFromEuler(_e.set(0, this.time * 2 + tok.index, 0));
      const sc = tok.collected ? 0.0001 : 1;
      _m.compose(_p.set(tok.x, tok.y + Math.sin(this.time * 3 + tok.index) * 0.15, tok.z), _q, _s.set(sc, sc * 1.4, sc));
      this.tokenMesh.setMatrixAt(tok.index, _m);
    }
    this.tokenMesh.instanceMatrix.needsUpdate = true;
    this.tokenMesh.computeBoundingSphere();
  }

  collectToken(tok) {
    tok.collected = true;
    tok.disabled = true;
  }

  inDriftZone(s) {
    const m = this.model;
    for (const [s0, s1] of this.zones) {
      const len = m.deltaS(s0, s1) > 0 ? m.deltaS(s0, s1) : m.length - s0 + s1;
      const d = m.wrapS(s - s0);
      if (d <= len) return true;
    }
    return false;
  }

  /** Knock a cone with the car's world velocity. */
  knockCone(col, vx, vz) {
    col.knocked = true;
    col.resting = false;
    col.disabled = true;
    this.conesKnocked++;
    const speed = Math.hypot(vx, vz);
    const r = this.rng;
    col.vel.set(vx * r.range(0.7, 1.2) + r.range(-2, 2), Math.min(9, 2.5 + speed * 0.18), vz * r.range(0.7, 1.2) + r.range(-2, 2));
    col.spin.set(r.range(-12, 12), r.range(-6, 6), r.range(-12, 12));
  }

  /**
   * Fixed-step update: moving obstacles + flying cones. Runs before the cars
   * move. A moving obstacle never crushes a car: if its next pose would
   * overlap one, it holds still this step (gates pause, trucks wait).
   */
  step(dt, racers) {
    this.time += dt;
    for (const mv of this.movers) {
      const col = mv.col;
      _save.x = col.x;
      _save.z = col.z;
      _save.h = col.h;
      this._positionMover(mv, mv.time + dt);
      let blocked = false;
      if (racers) {
        for (let i = 0; i < racers.length && !blocked; i++) {
          const v = racers[i].vehicle;
          _carBox.x = v.x;
          _carBox.z = v.z;
          _carBox.h = v.h;
          blocked = col.shape === 'circle' ? boxCircle(_carBox, col.x, col.z, col.r, _hit) : boxBox(_carBox, col, _hit);
        }
      }
      if (blocked) {
        this._positionMover(mv, mv.time);
        mv.blocked = true;
      } else {
        mv.time += dt;
        mv.blocked = false;
      }
      this.world.move(col);
    }
    for (const c of this.cones) {
      if (c.resting) continue;
      c.vel.y -= GRAVITY * dt;
      c.pos.addScaledVector(c.vel, dt);
      const floor = this.model.heightAt(c.s, c.t);
      if (c.pos.y < floor) {
        c.pos.y = floor;
        if (Math.abs(c.vel.y) > 1.5) {
          c.vel.y *= -0.35;
          c.vel.x *= 0.6;
          c.vel.z *= 0.6;
          c.spin.multiplyScalar(0.6);
        } else {
          c.vel.y = 0;
          c.vel.x *= Math.exp(-4 * dt);
          c.vel.z *= Math.exp(-4 * dt);
          c.spin.multiplyScalar(Math.exp(-5 * dt));
          if (c.vel.lengthSq() < 0.05) c.resting = true;
        }
      }
      const w = c.spin.length();
      if (w > 1e-3) {
        _axis.copy(c.spin).multiplyScalar(1 / w);
        _q.setFromAxisAngle(_axis, w * dt);
        c.rot.premultiply(_q);
      }
      c.x = c.pos.x;
      c.z = c.pos.z;
      this._coneDirty = true;
    }
  }

  _writeCone(c) {
    _m.compose(c.pos, c.rot, _s.set(1, 1, 1));
    this.coneMesh.setMatrixAt(c.index, _m);
  }

  /** Per-frame visuals (instance matrices). */
  frame() {
    if (this._coneDirty && this.coneMesh) {
      for (const c of this.cones) if (c.knocked) this._writeCone(c);
      this.coneMesh.instanceMatrix.needsUpdate = true;
      this.coneMesh.computeBoundingSphere();
      this._coneDirty = false;
    }
    if (this.tokenMesh) this._writeTokens();
  }

  /** Full reset for a restart: cones home, tokens back, movers re-synced. */
  reset() {
    this.time = 0;
    this.conesKnocked = 0;
    for (const c of this.cones) {
      c.knocked = false;
      c.resting = true;
      c.disabled = false;
      c.pos.set(c.home.x, c.home.y, c.home.z);
      c.vel.set(0, 0, 0);
      c.spin.set(0, 0, 0);
      c.rot.setFromEuler(_e.set(0, c.home.h, 0));
      c.x = c.home.x;
      c.z = c.home.z;
      if (this.coneMesh) this._writeCone(c);
    }
    if (this.coneMesh) {
      this.coneMesh.instanceMatrix.needsUpdate = true;
      this.coneMesh.computeBoundingSphere();
    }
    for (const t of this.tokensList) {
      t.collected = false;
      t.disabled = false;
    }
    for (const mv of this.movers) {
      mv.time = 0;
      mv.blocked = false;
      this._positionMover(mv, 0);
      this.world.move(mv.col);
    }
    this._writeTokens();
  }

  /** Static + moving hazards (for AI avoidance), filled lazily. */
  get hazards() {
    if (!this._hazards) {
      this._hazards = [];
      for (const col of this.world.all) {
        if (col.kind === 'cone' || col.kind === 'solid' || col.kind === 'soft' || (col.kind === 'area' && col.type === 'oil')) this._hazards.push(col);
      }
    }
    return this._hazards;
  }

  /**
   * Nearest hazard ahead of s (within `ahead` m) that overlaps lateral band
   * [t - halfBand, t + halfBand]. Writes {d, t, r} into out, returns true.
   */
  hazardAhead(s, t, ahead, halfBand, out) {
    const m = this.model;
    let best = Infinity;
    const list = this.hazards;
    for (let i = 0; i < list.length; i++) {
      const col = list[i];
      if (col.disabled || col.kind === 'wall') continue;
      if (col.kind === 'solid' && col.shape === 'box' && col.hz > 3 && Math.abs(col.t) > m.halfWidthAt(col.s) + 2) continue;
      const d = m.deltaS(s, col.s);
      if (d <= 0 || d > ahead || d >= best) continue;
      const r = col.shape === 'circle' ? col.r : Math.max(col.hx, col.hz);
      if (Math.abs(col.t - t) > halfBand + r) continue;
      best = d;
      out.d = d;
      out.t = col.t;
      out.r = r;
    }
    return best < Infinity;
  }

  dispose() {
    this.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
    });
    this.mat.dispose();
    this.group.traverse((o) => {
      if (o.material && o.material !== this.mat) o.material.dispose();
    });
    if (this.group.parent) this.group.parent.remove(this.group);
  }
}
