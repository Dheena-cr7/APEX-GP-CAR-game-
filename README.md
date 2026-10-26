# APEX-GP-CAR-game-

**APEX GP** is a low-poly 3D formula racing and drift game for the browser: 6 original cars, 4 circuits, 12 campaign levels, 7 AI opponents per race, saved progress. It is built with vanilla JavaScript and Three.js, and every car, track and prop is generated in code, so there are no model files to load.

- Desktop Chrome / Edge / Firefox with WebGL. Touch phones and tablets are a secondary target, with on-screen controls.
- 60 FPS at 1920×1080 on an Intel UHD integrated GPU, 117 draw calls max with a full grid (see [Performance](#performance)).
- Every phase was gated by an automated, deterministic test run (`npm run verify`). See [Testing](#testing).

## Quick start

```bash
nvm use            # Node 22 (any Node ≥ 22 works)
npm ci
npm run dev        # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the production build |
| `npm run lint` | oxlint, warnings fail the run |
| `npm run verify` | Full deterministic test run (headless Chromium, fake clock, autopilot). Screenshots and `report.json` go to `verify-shots/` |
| `npm run perf` | Builds, serves the build, and drives every circuit on the High and Low presets for 600 real frames each. Results go to `perf-results/perf.json` |

`npm run verify` and `npm run perf` need Playwright's Chromium once: `npx playwright install chromium`.

URL flags: `?styleguide` (every token and component), `?debug` (test hook `window.__apex`), `?debugview` (top-down debug view), `?quality=low|medium|high` (fixed preset), `?nowebgl` (simulates missing WebGL).

## Controls

| Action | Keyboard | Gamepad (standard) |
|---|---|---|
| Throttle | W / ↑ | RT |
| Brake / reverse | S / ↓ | LT |
| Steer | A D / ← → | Left stick (dead zone + smoothing) |
| Handbrake / drift | Space | A |
| Drift boost | Shift | X / RB |
| Camera (chase → close → cockpit → TV) | C | B |
| Reset to track (hold 1 s: restart) | R / Backspace | Y |
| Pause | Esc / P | Start |
| Mute | M | Back |
| Debug overlay (FPS, frame ms, draw calls, triangles) | F3 | |

Menus: arrow keys move focus, **Enter** runs the focused button or the screen's main action (Drive, Start, Race again), Esc goes back. Gamepad: d-pad or stick, A to confirm, B to go back. Keyboard keys can be rebound in Settings. On touch screens the race shows steering, gas, brake, drift, boost and pause buttons.

### How to drift

Turn in and tap the handbrake (or brake hard on turn-in) to break the rear loose. Keep the throttle on to hold the slide. Steering into the slide widens the angle, counter-steering straightens it, and lifting ends it. Points score per second × angle × speed. A combo multiplier grows while the drift lasts and the points bank when you straighten up. Hitting a wall or leaving the track loses the points you haven't banked yet. A long drift fills the boost meter, which fires when you straighten up, or press Shift to fire it early. Drift zones (green posts and dashed lines) double the score.

## Features

- **Cars:** Falcon F1-R, Viper V6, Comet C3 (unlocked), Titan T9 (8★), Raven R7 (16★), Nova N1 (26★). Stats 1–10 for Acceleration, Top speed, Braking, Handling, Downforce and Drift, each mapped to physics. 8 two-tone liveries, 4 of which unlock with stars. Visuals include wheel spin, steering (clamped to 25°), body roll and pitch, and a brake light.
- **Circuits** (each built from a closed spline, with its own theme):
  - Beginner GP / Meadow Park: wide, gentle, daytime
  - Street GP / Neon Harbour: narrow, square corners, dusk city, crossing truck
  - Speed GP / Salt Flat Speedway: long straights, banked sweepers, grandstands
  - Technical GP / Alpine Ring: corner sequences, elevation, banking, sweeping gate
- **Obstacles and interactives:** cones (scatter, small slowdown, +0.5 s in timed modes), tyre stacks (soft bounce), concrete blocks (hard stop and sparks), oil (very low grip), sand and grass (drag), moving gate, rolling barrel, crossing truck, boost pads, drift zones, slipstream and tokens. Hazards are amber and black, boosts are blue and green, kerbs are red and white.
- **Modes:** Campaign (12 levels: Grand Prix, Time Attack and Drift Challenge on each circuit), Grand Prix (3–7 AI, Easy / Medium / Hard, 1–5 laps), Time Trial (with a ghost of your best flying lap), Drift Challenge, Practice.
- **Race system:** 5-light start, 16 ordered checkpoints plus sector splits (reversing or skipping can't count a lap), wrong-way warning, lap / last / best times, 3 sectors, live delta against your saved personal best, track limits (+1 s), auto-recovery after 3 s stuck, instant restart, results table.
- **AI:** follows a racing line computed for each circuit with a speed profile, look-ahead steering, personal lane offsets, overtaking, hazard avoidance and mild rubber-banding. It waits for the crossing truck, and its anti-spin assist means it can never spin out.
- **Cameras:** chase (fixed distance behind the car, sideways lag and heading lag, drift swing, wider field of view at speed), close chase, cockpit, and auto-switching TV. The camera is held inside the barriers and above the road.
- **Audio:** fully procedural Web Audio: engine following RPM and throttle, tyre squeal from slip, road noise, impacts, cone hits, boost, countdown beeps, UI clicks and a quiet menu loop.
- **Saves:** LocalStorage with schema versioning and validation of every field. A corrupt save falls back to defaults, and blocked storage still runs (with an in-memory save and a notice).
- **Quality:** Low / Medium / High presets plus adaptive quality, which lowers the pixel ratio first, then the preset and shadows.

## Architecture

```
index.html → src/main.js → core/Game.js (renderer, single rAF Loop, GameStore, scenes, UI)
core/      Loop (120 Hz fixed step + interpolation), GameState (phase store with legal transitions),
           Palette (all colours), Quality, Random (seeded)
cars/      VehiclePhysics (single-track model + drift assist, pure JS), PhysicsConfig, CarData,
           DriftSystem (scoring), CarFactory (procedural mesh), Sizes
tracks/    TrackData (data contract), TrackModel (spline, profiles, projection, pure JS),
           TrackFactory (road/kerbs/runoff/walls/terrain/start), PropFactory (instanced scenery),
           ColliderWorld (track-space hash), ObstacleSystem, CheckpointSystem, RacingLine, TrackPreview
physics/   Collision (oriented-box SAT, box–circle)
race/      RaceManager (lights, clock, ranking, results), LapTimer, Campaign, Scoring, Ghost
ai/        OpponentAI          camera/  ChaseCamera, CameraRig       fx/  Particles, SkidMarks
scenes/    RaceScene, MenuScene, GarageScene, DebugView, SceneKit
ui/        components (Button, Badge, Panel, Stat, StatBar, StarRating, HazardBand, KeyHint, Toast,
           Cards, ConfirmDialog), MenuUI, RaceHUD, ResultsUI, MiniMap, Styleguide, ErrorScreen
audio/     AudioManager        storage/  SaveManager        styles/  tokens/* + components/hud/menu/screens
scripts/   verify.mjs, verify-autopilot.js, physics-sanity.mjs, perf.mjs, devServer.mjs, pageSetup.mjs
```

- **Phases:** `boot → menu → garage → select → loading → countdown → racing → paused → results`. All screens read one store, and `go()` throws on any transition not in the table.
- **One frame:** fixed physics steps (moving obstacles → cars → collisions → barrier clamp → race rules → drift scoring), then render-time work (interpolated car poses, camera, FX, HUD diff, audio), then one `renderer.render`.
- **Loading:** the race is built by a generator. Each loading-screen frame advances one real step (centreline → asphalt → kerbs → barriers → terrain → start → scenery → colliders → obstacles → cars → effects), so the progress bar shows real progress.
- **Collisions:** colliders are 2D boxes and circles filed once in an 8 m track-space hash (s along × t across). A query only visits cells overlapping the car; the narrow phase is a 4-axis SAT returning the minimum translation. Walls are solid; cones, tyres and oil are hazards; cars collide with each other by mass.
- **Design system:** every colour, size, motion and surface value is a CSS token in `src/styles/tokens/`, mirrored in JS by `core/Palette.js`. No hex codes appear anywhere else. Radii are 0 or 2 px, depth comes from hairlines or one hard 4 px shadow, motion is linear only.

## Tuning guide

All vehicle constants are in `src/cars/PhysicsConfig.js`. The node script `node scripts/physics-sanity.mjs` checks every car after a change: 0–100 / 0–200 times, top speed, braking distance, reverse, grip cornering, handbrake entry, a held drift, recovery, lift-off exit, no spin, sand drag and creep at full lock.

| Want | Change |
|---|---|
| More / less grip everywhere | `muBase` (and the per-car `handling` stat) |
| More grip at speed | `downforce` mapping in `deriveParams` |
| Snappier / lazier steering | `steerRate`, `steerReturn`, `steerLockLow`, `steerSpeedFalloff` |
| Easier drift entry | lower `handbrakeRearGrip`, raise `handbrakeYaw`, lower `driftEnterAngle` |
| Wider / narrower held drifts | the `target` formula in `VehiclePhysics.step` (drift assist) and `driftAngleMul` |
| Stronger / weaker drift assist | `assist.easy / medium / hard` (`hold`, `maxAngle`, `spin`) |
| Drift keeps more speed | `driftThrottleThrust`, `driftRearGrip` |
| Faster boost / longer boost | `boostAccel`, `driftBoostDuration`, `padBoostAccel` |
| Drift score pace | `DRIFT_SCORE` in `src/cars/DriftSystem.js` |
| AI pace by difficulty | `SKILL` in `src/ai/OpponentAI.js` |
| Campaign targets | `levelTarget()` multipliers in `src/race/Campaign.js` |

## Testing

`npm run verify` is a deterministic scripted run: it starts its own Vite server, opens the game headless at 1280×720 on the real GPU, pauses Playwright's fake clock so time only moves in exact 16 ms frames, and re-seeds `Math.random` before every run. An injected autopilot drives with real key events and checks invariants on every frame.

The run fails on any console error or warning, the camera inside geometry, the car overlapping a solid by more than 1 cm, a skipped or double-counted lap, or a route that isn't finished. Gate-by-gate results and the screenshot review are in [docs/VERIFY.md](docs/VERIFY.md). Decisions are in [docs/DECISIONS.md](docs/DECISIONS.md), and the phase log is in [docs/PROMPT_LOG.md](docs/PROMPT_LOG.md).

## Performance

`npm run perf` builds and serves the production bundle, then drives each circuit with a full 8-car grid for 600 real frames at 1920×1080. Measured on an Intel UHD Graphics iGPU (headless Chromium, ANGLE / D3D11):

| Preset | Circuit | Frame cost avg / p95 (CPU, ms) | FPS | Draw calls (max) | Triangles (max) |
|---|---|---|---|---|---|
| High | Beginner | 0.72 / 1.00 | 60 | 113 | 82k |
| High | Street | 0.80 / 1.00 | 60 | 117 | 93k |
| High | Speed | 0.71 / 0.90 | 60 | 112 | 114k |
| High | Technical | 0.72 / 0.90 | 60 | 115 | 92k |
| Low | Beginner | 0.59 / 0.80 | 60 | 70 | 71k |
| Low | Street | 0.68 / 0.90 | 60 | 76 | 73k |
| Low | Speed | 0.63 / 0.90 | 60 | 69 | 98k |
| Low | Technical | 0.60 / 0.80 | 60 | 71 | 78k |

Budget: fewer than 150 draw calls and 300k triangles in a race. Entering and leaving a race 10× leaves `renderer.info.memory` flat with exactly one rAF loop (checked by `verify`).

## Deployment

The build uses relative asset paths (`base: './'`), so the same `dist/` works at a domain root and under a sub-path.

**Vercel:** import the repository. `vercel.json` sets `npm ci` / `npm run build` / `dist`. Or, from a terminal:

```bash
npx vercel --prod
```

**GitHub Pages:** `.github/workflows/deploy-pages.yml` lints, builds and publishes `dist/` on every push to `main`. One-time setup: repository **Settings → Pages → Source: GitHub Actions**. The game is then served at `https://<user>.github.io/<repo>/`. For an absolute base instead, build with `VITE_BASE=/<repo>/ npm run build`.

## Known limitations

- Driving feel was tuned with numeric physics checks and the scripted autopilot. Nobody has played it by hand on a physical keyboard, wheel or gamepad during development, so expect to fine-tune `PhysicsConfig.js` to taste.
- The audio graph is verified (the context starts after a gesture, suspends on pause, and engine nodes are created and disconnected), but the mix has not been listened to.
- Gamepad and touch are verified with a faked Gamepad API and Playwright touch emulation, not real hardware. Gamepad buttons can't be rebound, only keys.
- Only Chromium was tested automatically. Firefox and Safari were not run.
- Frame cost in the perf table is CPU time inside the game frame; GPU time is not measured separately. FPS is capped at 60 by vsync.
- The AI drives clean lines (no stylised slides). Seven AI share five car models, so models repeat on the grid.
- Rival cars that come within 2.6 m of the camera are hidden rather than clipped.
- The Time Trial ghost replays flying laps only (lap 2 onwards), and one ghost is stored per circuit.
- There is no in-game fullscreen button; use the browser's (F11).
