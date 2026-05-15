# PROJECT ROADMAP - MY-EARNED-WINGS

## 🏛️ Current Update

* [x] **Core Dependency Modernization (v1.4.6)**: Update to Electron 42 (Chromium 148), Vite 8.0.11 and Alpine.js 3.15.12.
* [x] **Herb Gathering Rebalance (v1.4.7)**: Increased garden herb yield to 15 (Base) / 25 (Upgraded) to compensate for 10s duration.
* [x] **Tablet & Landscape Optimization (v1.4.8)**: Implemented collapsible sidebar and 4-column layout for tablets (1133px+).

* [x] **Quality of Life: Full-screen Mode (v1.4.9)**: Added a dedicated toggle for full-screen mode in the game header for better immersion.
* [x] **I18N & Build Integrity Fix (v1.4.10)**: Fixed CSS syntax errors in `layout.css` and optimized the i18n validator to ignore Alpine.js shorthands.
* [x] **Magic Expansion & Resource Fix (v1.4.11)**: Balanced storage capacities and costs for Arcane Sanctum; added resin acquisition from wood gathering.
* [x] **Tablet Portrait Optimization (v1.4.12)**: Optimized layout for 744x1133 (iPad Mini) with a collapsible bottom-navigation and improved grid distribution.
* [x] **iPad Mini 6 Optimization (v1.4.13)**: Extended tablet layout thresholds to 1200px to cover iPad Mini 6 in both orientations (Portrait & Landscape).
* [x] **Stability & Fallback Polish (v1.4.14)**: Optimized icon validation (whitelist-based), corrected i18n fallbacks (EN-first), and cleared console warnings.
* [x] **Architecture Phase 1 — YAML Content Pipeline (v2.0.0)**: Migrated all Resources, Modifiers, and Actions to structured YAML. A build script auto-generates typed TypeScript. Adding a new resource now requires 1 YAML file instead of 5+ TypeScript edits.
* [x] **Architecture Phase 1.5 — Full Content YAML-isation**: Migrated the remaining content categories (Items, NPCs, Buffs, Homes, Milestones, Navigation, Titles, Translations) to YAML. Story actions with bespoke logic now declare `customExecute: <handler>` and resolve through a small TS handler registry (`src/data/actions/custom-handlers.ts`). All registries, including i18n, are auto-generated from `content/`.
* [x] **Dev Tools Iter 7b — Generic write-back**: Replaced the action-only writer with a generic `CONTENT_WRITE` IPC channel that patches array- and record-style YAMLs across all 10 entity types. Editor exposes a structured form plus a raw-YAML patch textarea for arbitrary fields.
* [x] **Vandara/Academy Rollback**: Removed the entire Vandara/Schule/Studienerfahrung subsystem from the playable demo (the system was half-built and `study_xp` clashed with the no-XP-no-levels design pillar). Engine code, GameState fields, and asset files for titles + magic regen are kept dormant so the system can be re-introduced cleanly later.

***

## 🗺️ Future Horizons

### Phase 13.5: Verzweigte Schicksale & Endings

* [ ] **Akademie Vandara (re-introduction)**: Bring the academy back from the rollback as a real system — three paths (Solen / Bram / Lyra), exclusive late-game recipes, and proper integration with the new additive-modifier engine. Existing assets (`img/npcs/{magistra_solen,meister_bram,lyra}.webp`, `img/school/*`) and dormant code (`activeTitle`, `magic_regen_passive` modifier slot, `regen.ts`) are still in the repo.
* [ ] **Pfad-spezifisches Gameplay**: Die gewählte Akademie-Fachrichtung beeinflusst das Late-Game (exklusive Rezepte & Mechaniken).
* [ ] **Erweiterte Story**: Neue NPCs in Vandara, Schwarzmarkt-Interaktionen und individuelle Endsequenzen.

### Phase 14: Der Zyklus der Inkarnation

* [ ] **Zauberwerkstatt**: Lerne magische Zauber, um die physischen Grenzen deines Lagers zu erweitern.
* [ ] **Automation (Ancient Echoes)**: Nutzung von Schatten früherer Leben zur Automatisierung von Produktionsketten.
* [ ] **Tree of Life Finale**: Die finale spirituelle Erweckung und das Erreichen des Palastes über den Wolken.

### Phase 15+: Engine-Hardening & Addon System

The engine has to feel rock-solid before bolting an addon system on top of
it. The order matters — finish the existing tech-debt first, then turn
content into modules.

* [ ] **Engine Hardening (prerequisite)**:
  * Phase 2 Stage 2 — pure-data state separation, so the engine has no
    Alpine dependency.
  * Split the three large files (`src/devtools/devtools.ts` ~940 LOC,
    `src/core/visuals/ui.ts` ~740 LOC, `src/features/gameplay/actions.logic.ts`
    ~540 LOC) into focused modules.
  * Reduce the ~200 `as any` casts (especially the `(services as any).x`
    pattern) by widening the GameServices type.
  * Add tests for engine subsystems that currently lack them
    (`producers.ts`, `regen.ts`, `tasks.ts`, boot sequence).
* [ ] **Addon System (compile-time)**:
  * Restructure `content/` into `content/base/` + `content/addons/<name>/`.
  * Build script auto-discovers addon folders, merges into registries.
  * Per-addon `manifest.yaml` (name, version, requires).
  * ID-conflict detection during build.
  * Decisions to make at that point: ID-namespacing (strict `vandara:npc-x`
    vs lax warn-on-collision), custom-execute handlers from addons (TS code
    or YAML-only), translation overrides, asset path conventions.
  * First real addon: Vandara/Academy as `content/addons/vandara/` once
    Phase 13.5 design is clear.
  * Documentation: `docs/ADDONS.md` with the structure + a `_example/`
    skeleton for contributors.
* [ ] **Runtime Addon Toggling (only if community grows)**: settings UI to
  enable/disable addons without rebuild, save format tracks active addons,
  conflict resolution UI. Day(s) of work — defer until 3rd-party modders
  show real interest.

***

10. Mai 2026 · v2.0.0 (Architecture Phase 1 - YAML Content Pipeline)
14. Mai 2026 · Architecture Phase 1.5 (Full Content YAML-isation) + Dev Tools Iter 7b (generic write-back) + Vandara rollback to roadmap