# Changelog

Notable changes per tagged version. See git history for the per-commit
detail. Format inspired by [Keep a Changelog](https://keepachangelog.com/);
versioning follows [semver](https://semver.org/) although the project is
pre-1.0 in spirit (the "1.x" line is bookkeeping from the original
prototype).

---

## [v1.7.0-demo] — May 2026

**Runtime addon loading + .exe packaging fixes.** End users of the
packaged .exe can now drop YAML-only addons into an `addons/` folder
next to the executable — no rebuild required. Same trip also cleans
up several latent build-script bugs that the v1.6.0 packaging hid.

### Runtime addon system (NEW)

- `addons/<name>/` next to the .exe is scanned at boot via a new IPC
  channel (`ADDONS_DISCOVER_RUNTIME`). The main process validates each
  manifest, parses YAML for all 10 content categories, loads
  translations + view fragments, and returns the payload.
- Renderer (`src/core/services/runtime-addons.ts`) merges entries into
  the same `*_REGISTRY_GENERATED` objects the build pipeline writes,
  mutates `TRANSLATIONS_GENERATED` in place, and injects view sections
  into a `#addon-views-runtime` host before `Alpine.start()`.
- Conflict policy: runtime addons ALWAYS lose duplicate-id contests
  against base and build-time addons — runtime is advisory. Each
  collision logs a warning.
- Limitations (documented in `docs/ADDON_AUTHORING.md` §11):
  - No `handlers.ts` — TS handlers require the build-time addon path.
  - Brand-new resources/stats only appear in `initialState` from a
    "New Game" onward (existing items/actions/NPCs/translations/views
    work immediately in any save).
- Packaged builds now ship an `addons/` folder with a README + an
  `_example/` skeleton (underscore-prefixed = ignored by the loader,
  so it acts as a copy-me template).

### Packaging fixes (latent v1.6.0 bugs)

- `finalize-electron-build.cjs` now writes a complete
  `dist_electron/package.json` (`main: "main.js"`, `type: "commonjs"`,
  full `dependencies`). The old script wrote only `{type:'commonjs'}`,
  which the build-exe powershell step then overwrote with the root
  `package.json` — which had `main: "dist_electron/main.js"` and
  electron-packager dutifully looked for
  `dist_electron/dist_electron/main.js`. Now a single authoritative
  file and the Copy-Item-overwrite is gone.
- `build-exe` now copies `node_modules` into `dist_electron` before
  electron-packager runs. Without it the packaged main process
  crashed at first launch with `Cannot find module 'js-yaml'` — the
  runtime deps simply weren't in the asar.
- `loadFile()` in `src/electron/main.ts` had a `..` segment that
  assumed `main.js` lived at `app.asar/dist_electron/`. With the
  corrected layout `main.js` sits at the asar root, so the previous
  path resolved one level above `dist/`. Flat-layout path is tried
  first, legacy as fallback.

### Misc

- `--debug` renamed to `--devtools` (Electron 42 reserves `--debug`
  and emits a deprecation warning). `--debug` still accepted.
- Main-side `console.log` on every runtime-addon discovery so a
  packaged build reports what it scanned + what it loaded without
  needing DevTools open.

---

## [v1.6.0-demo] — May 2026

**First demo release with the addon system actually complete.** v1.5.x
shipped the content-merging side of addons; v1.6.0 closes the missing
piece: addons can now ship their own UI tabs.

### Addon system — view fragments (NEW)

Addons drop HTML files at `content/addons/<addon>/views/<name>.html`.
The build script wraps each in a `<section class="view-section"
x-show="...">` and emits `src/generated/addon-views.html` (one new EJS
include in index.html pulls everything in). Navigation YAML entries
with matching `id: <addon>/<name>` make the tab clickable. Optional
`image:` field overrides the base icon convention so addons can ship
their own sidebar icons.

What this unlocks: addons aren't just "drop data into existing
screens" — they can introduce brand-new top-level tabs with their own
layout, their own Alpine logic, their own customExecute handlers. See
`docs/ADDON_AUTHORING.md` §10 for the full walkthrough and the
skeleton at `content/addons/_example/views/main.html`.

### Tablet layout fixes

- Bottom-mounted sidebar's toggle button was eating the whole row in
  the 641-1200 px tablet layout, pushing all nav items off the right
  edge of the viewport. Toggle now sized at 48 px so nav items get
  the rest of the row.
- Bottom grid row (320 px) overlapped the fixed-position 60 px
  sidebar by ~47 px — sidebar physically sat on top of log/status
  panel content. Grid row shrunk to 260 px and #game-wrapper gets
  60 px bottom padding so the grid ends above the sidebar.
- `main` / `.global-log-container` / `.right-panel` now have
  `overflow-y: auto` + touch-scroll support in the tablet media query
  (the desktop rule was inside a `min-width: 1201 px` block and
  didn't reach tablets, so content longer than the cell was just
  clipped with no way to reach it).

### Other fixes

- Double-boot in `main.ts` registered the juice PARTICLE_TRIGGERED
  listener twice — every action emit fired both and produced two
  stacked particles. Removed the redundant explicit boot.
- `menu_version` no longer in i18n — derived from package.json at
  build time and exposed as `$store.game.version`. Bumping
  package.json now moves the footer label automatically.
- CI workflow declares least-privilege permissions
  (`contents: read`) — closes CodeQL alert #4.
- Test contract updated for the UISync null-propagation change that
  landed in v1.5.1's demo-fix sweep (was still encoding the old
  "skip and leave Alpine untouched" behavior).

---

## [v1.5.1-demo] — May 2026

**Bugfix pass on top of v1.5.0-demo, in response to runtime issues that
only showed up once the packaged .exe was actually launched.** This is
the first version that runs end-to-end cleanly.

### Phase 2 Stage 2 cutover REVERTED

The clone-based engineState/Alpine separation broke too many flows that
the single-getStore-touchpoint plan didn't cover — HTML view templates
call `$store.game.X(...)` directly, passing the Alpine proxy as the
`store` argument, so writes from view-handlers landed on Alpine but the
engine state never saw them. Symptoms: confirm modal not closing, stale
tooltips on view switch, settings undefined during early boot, save-load
false-corruption alarm.

services.gameState is now identity-equal to Alpine.store('game') again,
just like before the cutover. All the supporting infrastructure stays
in place (RAF UISync.sync, UI_WRITEBACK_KEYS pre-pass, defensive
getStore() fallback). Re-cutting over later is a one-line change plus
the bigger UI-template-writes migration the original plan
underestimated. Filed away for the day replays/multiplayer actually
need the separation.

### Packaged .exe fixes

- **electron-builder bundling**: dist_electron/package.json now correctly
  generated with `{"type": "commonjs"}` and listed in the build's files
  array. Without this, the packaged main process crashed on first
  launch with "exports is not defined in ES module scope" (the root
  package.json has type:module for Vite).
- **loadFile path**: production renderer path resolves
  `dist/index.html` one level UP from `__dirname` (which is
  `dist_electron/` in the packaged build). Pre-fix: window opened
  blank because file:// path was wrong.
- **--debug argv**: `My-earned-Wings 1.5.1.exe --debug` opens DevTools
  for diagnosing packaged-build issues without rebuilding.

### Other live-issue fixes

- ui.ts Alpine.effect view-cleanup now reads `Alpine.store('game')`
  instead of the `'ui'` alias. Alpine reactivity is per-store-name —
  aliasing two names to the same proxy doesn't dual-register, so the
  'ui' read never re-triggered and tooltips stayed stale on view
  change.
- UISync.sync now propagates null/undefined for OBJECT_KEYS too (was
  silently skipping). Engine clearing `hoveredAction = null` is now
  visible to the UI.
- audio.ts updateVolumes guards against undefined settings.
- main.ts defensive getters on gameStoreObject — Alpine's eager
  property enumeration during store registration no longer crashes
  if a subsystem hasn't been attached yet.
- Modifier `magic_regen_passive` actually added to YAML this time
  (the previous commit's edit silently dropped). regen.ts pipeline
  probe no longer spams `[CONTENT] Missing ID` every tick.
- Several `content.get()` and `store.t()` calls on hot
  probe-and-fallback paths now go silent (pipeline modifier lookup,
  flag-to-item/action lookup, applyCostModifiers `<resource>_cost`
  check, tooltip ui_<flag> lookup). Real misses still warn from
  non-hot call sites.

### Cleanup

- Removed accidentally-committed public/CREDIT.txt (local notes).

---

## [v1.5.0-demo] — May 2026

**First demo milestone after the engine-hardening + addon-infrastructure
sprint.** ⚠️ Superseded by v1.5.1-demo — runtime testing turned up
several Phase-2-Stage-2-related bugs not caught by tsc/tests/check-all.
Snapshot-tagged for personal reference; not yet a public
release (music/SFX attribution + Impressum need to land first — see
TODO.md "Should-do before sharing more widely").

### Engine hardening (Rounds 1+2+3 + Phase 2 Stage 2)

- GitHub Actions CI runs tsc + tests + check-all + build on every push.
- Save-corruption recovery: bad saves get quarantined instead of wiped.
- `makeLogger` module with `[PREFIX]` tags + production suppression (36
  call sites migrated).
- FPS overlay via `?perf` URL param.
- `noUncheckedIndexedAccess` enabled — 110 type errors fixed.
- Three big files split into focused modules:
  - `devtools.ts` (944 → 467 LOC) → 5 panel modules + shared state
  - `ui.ts` (743 → 433 LOC) → ui + ui-tooltip + ui-formatter
  - `actions.logic.ts` (546 → 448 LOC) → effect handlers extracted
- `services.ts` type cleanup (-15 `as any` casts).
- Phase 2 Stage 2: pure-data state separation. `engineState` is now a
  separate clone from the Alpine store; UISync batches updates via a
  60 Hz RAF loop so click→render latency stays imperceptible.
- New unit tests for UISync, boot, validator, save-migrations
  subsystems. Total: 17 test files / 153 tests.

### Addon system (compile-time infrastructure)

- Base content moved to `content/base/`; addons go under
  `content/addons/<name>/` with the same internal layout.
- Build script discovers addons via `manifest.yaml` (semver-validated)
  and merges all 10 content categories + i18n into the base registries.
- Origin-tracked duplicate-ID errors point at both source files.
- Addon handler loading via auto-generated
  `src/generated/addon-handlers.ts` (keys auto-namespaced to
  `<addon>/<name>` so addons cannot collide).
- Translation overrides allowed with dev-time warning per override.
- Skeleton at `content/addons/_example/` + authoring docs at
  `docs/ADDON_AUTHORING.md`.

### Demo polish

- Vandara/Academy code stripped from the demo build: removed the dead
  Vandara tab + path selection + mentor sub-view from
  `village.view.html` (-177 LOC), the standalone (never-rendered)
  School section, dead flags from `initialState` + `FlagId` union,
  9 unused asset files, 12 unused translation keys.
- Defensive audio: NaN volumes no longer crash the audio subsystem.
- Save-failure toast: storage-quota errors now surface to the player
  instead of silently dropping progress.
- Settings persistence wrapped in try/catch so a quota error doesn't
  kill gameplay.
- Deterministic `content.ts` header (no more timestamp noise in
  `git status`).

### Notable refactors / changes from earlier 1.4.x

(For context — many of these landed across the 1.4.x releases:)
- Full YAML content pipeline (Resources, Modifiers, Actions, Items,
  NPCs, Buffs, Homes, Milestones, Navigation, Titles, Translations all
  generated from `content/**/*.yaml`).
- Custom-execute handler pattern for YAML+TS story logic.
- Service-container DI helpers (`makeServiceContainer<T>`,
  `bindServices`).
- Vandara/Academy rollback (will return as the first real addon once
  Phase 13.5 design lands).
- Math refactor: engine is fully additive (no multiplicative modifiers
  in the pipeline).
- Logic strictness: all writers go through a single `getStore()`
  touchpoint, no direct Alpine mutations from feature logic.
