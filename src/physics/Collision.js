// 2D narrow phase. Boxes are oriented rectangles in the x/z plane:
// {x, z, h, hx, hz} with forward axis (sin h, cos h) carrying the half
// length hz and side axis (cos h, -sin h) carrying the half width hx.
// Height is not tested. Results give the minimum-translation axis as a unit
// normal pointing from the obstacle toward the first box, plus the depth.

/**
 * Separating-axis test on 4 axes: the two axes of A (side + nose) and the
 * two axes of B. Writes {nx, nz, depth} into `out`; returns true on overlap.
 */
export function boxBox(a, b, out) {
  const as = Math.sin(a.h);
  const ac = Math.cos(a.h);
  const bs = Math.sin(b.h);
  const bc = Math.cos(b.h);
  // axes: A side, A fwd, B side, B fwd
  const ax0 = ac, az0 = -as, ax1 = as, az1 = ac;
  const bx0 = bc, bz0 = -bs, bx1 = bs, bz1 = bc;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  let best = Infinity;
  let bnx = 0;
  let bnz = 0;
  for (let k = 0; k < 4; k++) {
    let nx, nz;
    if (k === 0) { nx = ax0; nz = az0; }
    else if (k === 1) { nx = ax1; nz = az1; }
    else if (k === 2) { nx = bx0; nz = bz0; }
    else { nx = bx1; nz = bz1; }
    const ra = a.hx * Math.abs(ax0 * nx + az0 * nz) + a.hz * Math.abs(ax1 * nx + az1 * nz);
    const rb = b.hx * Math.abs(bx0 * nx + bz0 * nz) + b.hz * Math.abs(bx1 * nx + bz1 * nz);
    const dist = dx * nx + dz * nz;
    const overlap = ra + rb - Math.abs(dist);
    if (overlap <= 0) return false;
    if (overlap < best) {
      best = overlap;
      // push A away from B
      const sgn = dist > 0 ? -1 : 1;
      bnx = nx * sgn;
      bnz = nz * sgn;
    }
  }
  out.nx = bnx;
  out.nz = bnz;
  out.depth = best;
  return true;
}

/**
 * Circle (cx, cz, r) vs box A. Normal points from the circle toward the box
 * (i.e. the direction to push the box).
 */
export function boxCircle(a, cx, cz, r, out) {
  const s = Math.sin(a.h);
  const c = Math.cos(a.h);
  const dx = cx - a.x;
  const dz = cz - a.z;
  // circle centre in box space
  const lx = dx * c - dz * s; // along side axis
  const lz = dx * s + dz * c; // along fwd axis
  const qx = Math.max(-a.hx, Math.min(a.hx, lx));
  const qz = Math.max(-a.hz, Math.min(a.hz, lz));
  let ex = lx - qx;
  let ez = lz - qz;
  let d2 = ex * ex + ez * ez;
  if (d2 > r * r) return false;
  let nlx;
  let nlz;
  let depth;
  if (d2 > 1e-10) {
    const d = Math.sqrt(d2);
    nlx = -ex / d;
    nlz = -ez / d;
    depth = r - d;
  } else {
    // centre inside the box: push along the shallowest face
    const px = a.hx - Math.abs(lx);
    const pz = a.hz - Math.abs(lz);
    if (px < pz) {
      nlx = lx > 0 ? -1 : 1;
      nlz = 0;
      depth = px + r;
    } else {
      nlx = 0;
      nlz = lz > 0 ? -1 : 1;
      depth = pz + r;
    }
  }
  // back to world
  out.nx = nlx * c + nlz * s;
  out.nz = -nlx * s + nlz * c;
  out.depth = depth;
  return true;
}

/** Does a point lie inside box A (2D)? */
export function pointInBox(a, x, z, pad = 0) {
  const s = Math.sin(a.h);
  const c = Math.cos(a.h);
  const dx = x - a.x;
  const dz = z - a.z;
  const lx = dx * c - dz * s;
  const lz = dx * s + dz * c;
  return Math.abs(lx) <= a.hx + pad && Math.abs(lz) <= a.hz + pad;
}
