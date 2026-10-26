// Hard-coded real-world sizes in metres. Colliders are built from these,
// never measured from meshes.

export const CAR = Object.freeze({
  width: 1.8,
  length: 4.2,
  height: 0.95,
  wheelbase: 3.4,
  frontAxle: 1.75, // cg -> front axle
  rearAxle: 1.65, // cg -> rear axle
  track: 1.5, // wheel centre to wheel centre (front, inside body envelope)
  wheelRadius: 0.34,
  wheelWidth: 0.34,
});

/** Forgiving player hitbox: near misses read as near misses. */
export const CAR_HITBOX_SCALE = 0.8;
export const CAR_HALF_W = (CAR.width * CAR_HITBOX_SCALE) / 2;
export const CAR_HALF_L = (CAR.length * CAR_HITBOX_SCALE) / 2;
/** AI cars use the full box against each other so packs do not interpenetrate. */
export const CAR_RADIUS = Math.hypot(CAR.width / 2, CAR.length / 2);

export const OBSTACLE = Object.freeze({
  cone: { radius: 0.22, height: 0.6, mass: 3 },
  tyreStack: { radius: 0.45, height: 0.9 },
  block: { width: 1.2, length: 2.4, height: 0.9 }, // concrete block
  barrel: { radius: 0.4, height: 0.9 },
  gate: { width: 0.5, length: 6, height: 1.2 }, // sweeping gate arm
  truck: { width: 2.5, length: 8, height: 3.2 },
  oil: { radius: 3.2 },
  boostPad: { width: 3.6, length: 6 },
  token: { radius: 0.9 },
});

export const WALL = Object.freeze({
  height: 1.1,
  thickness: 1.0,
  segment: 4, // collider box length along the centreline
});

export const KERB = Object.freeze({
  width: 1.4,
  height: 0.06,
  block: 2,
});
