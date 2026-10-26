# Decisions

One line per non-obvious choice.

- Project lives in a sibling folder of Inboxion (`Projects/apex-gp`) because the session started inside an unrelated repo with uncommitted work.
- Versions pinned exactly: three 0.186.1, vite 8.3.4, playwright 1.64.1, oxlint 1.88.0. The newest Vite/oxlint releases were under a week old, so the previous stable release was taken.
- Node 24 is installed locally; `.nvmrc` says 22 as required and `engines` allows >=22.
- Routes are query flags (`?styleguide`, `?debug`, `?debugview`, `?nowebgl`), not paths, so they work unchanged on GitHub Pages and Vercel without rewrites.
- `base: './'` in Vite so one build serves from `/` (Vercel) and `/<repo>/` (GitHub Pages).
- Google Fonts `@import` sits first in `styles.css` (CSS requires @import before other rules); `tokens/fonts.css` holds the family stacks with local fallbacks.
- The hazard stripe uses a hard-stop `repeating-linear-gradient`; it is a stripe, not a soft gradient, so it does not break the "no gradients" rule.
- Verify routes Google Fonts through Playwright: real fonts when online, empty CSS when offline, so offline runs never log a network error.
- Headless Chromium runs on the real GPU via ANGLE/D3D11 (`--use-angle=d3d11`), not SwiftShader, so verify and perf numbers reflect hardware.
- Vehicle model: single-track ("bicycle") car with saturating tyres, load transfer and downforce, blended to a kinematic model below 5 m/s. Pure JS so it is tuned and tested in Node (`scripts/physics-sanity.mjs`).
- Drift: physics decides when the rear lets go (handbrake, brake load transfer, power oversteer); once drifting, an assist steers the slip angle toward a target set by steering (into = wider, counter = narrower) and throttle (lift = exit). Pure tyre balance was too knife-edge to hold by keyboard in testing.
- Drift assist setting (Easy/Normal/Light) changes how firmly the target angle is held and where anti-spin starts (50°/60°/75°).
- Racing line = minimum-curvature relaxation (points pulled toward their neighbours' midpoint, clamped to the road), speed profile from line curvature with braking/acceleration passes.
- Collision hash is in track space (s × t, 8 m cells) as specified. Colliders are oriented boxes, so SAT uses the car's two axes plus the collider's two axes (the reference used axis-aligned town boxes). Track geometry is validated so separate sections never come within wall range of each other, which keeps track-space filing unambiguous.
- Wall collider segments shorten on tight curves (sagitta ≤ 5 cm) so the collider face matches the visible wall.
- A last-resort track-space clamp keeps every car inside its barrier even if a collision were missed; it doubles as the invisible boundary at the Street GP junction gap.
- Playwright's fake clock keeps flowing in real time after `install()`; verify calls `pauseAt()` so time only moves through `runFor()` — otherwise screenshots added frames and broke determinism.
- Verify renders only on demand (`?render=manual`) except for screenshots; the simulation, camera and all per-frame checks still run every frame.
- AI drives clean (no scripted slides): more reliable than stylised slides; the anti-spin assist means it can never spin out.
- Results live in `ui/ResultsUI.js`; menus, pause and overlays in `ui/MenuUI.js`.
- Start-gantry pillars stand outside the barriers (the gantry spans the runoff) so nothing can clip them.
- Lap 1 is a standing start timed from lights out; the first crossing of the line (from the grid behind it) only arms lap counting.
- Checkpoints: 16 evenly spaced + the 2 sector splits. Crossing one backward un-passes it; a "high-water" lap counter means a re-crossing never fires a second lap event.
- A jump of more than 60 m between steps (teleport / reset) re-syncs a racer's checkpoint position without registering crossings.
- Track limits: car centre beyond the kerb for more than 1.6 s = +1 s in timed modes (warning only in practice and drift).
- Handbrake with steering adds a yaw kick (3.2 rad/s²) so a flick breaks the rear loose in about 0.35 s; without it, drifts took close to a second to start.
