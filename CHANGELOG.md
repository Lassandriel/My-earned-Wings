# Changelog

Notable changes per tagged version. See git history for the per-commit
detail. Format inspired by [Keep a Changelog](https://keepachangelog.com/);
versioning follows [semver](https://semver.org/) although the project is
pre-1.0 in spirit (the "1.x" line is bookkeeping from the original
prototype).

---

## [v1.5.0-demo] — May 2026

**First demo milestone after the engine-hardening + addon-infrastructure
sprint.** Snapshot-tagged for personal reference; not yet a public
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
