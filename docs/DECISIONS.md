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
