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
- Moving obstacles update before the cars each step and never crush a car: if a gate, truck or barrel's next pose would overlap a car it holds still that step (a gate pauses, a truck waits). Without this a car could be squeezed between the gate and the barrier.
- Street GP's crossing truck uses a gap in the barrier and a visual side street; the last-resort track-space clamp is the invisible boundary there, so cars cannot leave through the gap.
- AI wait for Street GP's crossing truck: they predict whether the truck will be on the road at their arrival time and stop short of the junction; waiting does not count as "stuck". Without this the AI queued into the truck (103 auto-recoveries in one race).
- AI never press the brake at a standstill (in this car model brake at rest = reverse); they coast to a stop instead.
- Rival cars within 2.6 m of the camera are hidden for that frame so the camera never films through a car body.
- Campaign gating: Street 5★, Speed 11★, Technical 17★; Titan 8★, Raven 16★, Nova 26★; extra liveries at 3/9/15/22★; a "cup" is 6+★ on one circuit. Free Play unlocks everything.
- Time Attack targets come from the racing line's ideal lap (gold ×1.07, silver ×1.15, bronze ×1.27) with a whole-run time limit; Drift targets scale with lap length.
- Adaptive quality: sustained slow frames lower the pixel ratio (down to 0.6×), then step the preset down and switch shadows off on Low.
- Lights' shadow maps are render targets and must be disposed explicitly; without it every race leaked 4 textures.
- Deployment: `vercel.json` (Vite, `dist/`) and a GitHub Actions Pages workflow; relative `base` serves both.

## Update: NFS-style handling, multiplayer, tracks

- Arcade handling (the default) replaces tyre-limited drifting with a drift *state*: steering sets the path turn rate and the slip angle (0.1–0.8 rad), throttle holds the slide, and releasing or counter-steering straightens. Entry is by handbrake + steer, brake-tap + turn-in (0.45 s window) or a large natural slip. Speed loss in a slide comes from `arcadeScrub` and the drive factor, so drifting is never faster than gripping (the first attempt gained 32 → 55 m/s). The Sim model stays one setting away.
- The old auto-firing drift boost confused players. It is now a nitro tank you hold to burn, refilled by drifting, speed, slipstream, near misses and tokens.
- Speedbreaker scales the race time step (0.45×), adds grip and lowers the audio pitch. Single player only, because it would desync other players' clocks.
- Split-screen renders each human's camera into a scissored viewport (layouts for 1–6) with one HUD each. Shadows switch off with more than one view to keep draw calls in budget. Keyboard schemes are WASD and the arrows, then gamepads.
- Online uses a star topology through the host: each client simulates its own car and sends a compact state array at 15 Hz, and the host also simulates the AI and relays everything. Remote cars are extrapolated and smoothed. No server is needed beyond the free PeerJS broker. A BroadcastChannel transport with the same protocol makes it testable in one browser.
- Night City GP: asphalt run-off (no gravel in a city), plus a tunnel and an overpass built from track-space data (`tunnels`, `overpasses`). TV cameras are skipped inside the tunnel.
- The chase camera's clamp projection keeps a hint index. `snap()` now resets it; before, a long jump clamped the camera near the old position.

