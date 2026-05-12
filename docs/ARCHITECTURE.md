# ARCHITECTURE — My-earned-Wings

> Decision Record & Migration Plan · May 2026

---

## Why We Are Changing Things

The current architecture has one critical problem that gets worse the bigger the game grows:

**Adding 1 new item requires touching 5–6 separate files:**

| Step | File | What you do there |
|---|---|---|
| 1 | `src/data/definitions/resources.ts` | Define the resource |
| 2 | `src/data/actions/core.ts` | Define the gather action |
| 3 | `src/lang/de/actions.ts` | German translation |
| 4 | `src/lang/en/actions.ts` | English translation |
| 5 | `src/core/systems/pipeline.ts` | Add to `efficiencyKeys[]` manually |
| 6 | `src/types/game.ts` | Possibly extend types |

This does not scale. Phase 14 ("Ancient Echoes") will require many new resources, actions, crafting chains, and automation producers. The current system will become unmanageable.

A second problem: The game engine (simulation loop, ECS) is tightly coupled to Alpine.js. Every resource change triggers Alpine reactivity, which is expensive and limits how many parallel processes are possible.

---

## The Decision: Option B — YAML Pipeline + ECS + SQLite

We keep Electron + Alpine.js + HTML/CSS (the UI stays, Glassmorphism stays).  
We replace the **content authoring workflow** and the **engine internals**.

### What changes, in plain language:

**Content (Items, Actions, Resources):** Written in YAML files instead of TypeScript. A build script auto-generates all TypeScript types and a SQLite database from those YAML files.

**Translations (i18n):** One YAML file per language. Adding a new language = adding exactly one file. Translations are completely decoupled from content definitions.

**Game Engine:** The simulation loop runs on a plain JavaScript object (no Alpine dependency). Alpine only reads a read-only snapshot for rendering. This is the ECS pattern.

**Saves:** Stored in SQLite (`saves.db`) instead of localStorage JSON blobs. Enables multiple save slots, achievement history, action history, and proper queries.

---

## Key Concepts

### YAML (Content Format)
A simple, human-readable data format. No TypeScript syntax noise.  
Instead of writing TypeScript with imports and type annotations, you write:

```yaml
# content/resources/iron_ore.yaml
id: iron_ore
type: resource
category: materials
color: "#94a3b8"
limit: 25
scales_with_satiation: true
```

A build script (`npm run build:content`) converts all YAML files into:
- `src/generated/content.ts` — typed runtime objects
- `src/generated/types.ts` — TypeScript types (auto-generated, never manually edited)
- `content.db` — SQLite database for the engine to query

### ECS (Entity Component System)
An architecture pattern used by Unity, Unreal, and Godot internally.

- **Entity:** A thing in the game (the player, an NPC, a building)
- **Component:** A data bag attached to an entity (Resources, Stats, Flags, Producer)
- **System:** Logic that runs on entities with specific components

The key rule: **Only the UISystem writes to Alpine.js.** Everything else runs on plain JavaScript objects.

```
Entity: "player"
  ├── Component: Resources  { wood: 10, stone: 5 }
  ├── Component: Stats      { energy: 40, magic: 50 }
  └── Component: Flags      { school_unlocked: true }

Systems (run in order each tick):
  ProductionSystem  → updates Resources of Producer entities
  StatSystem        → updates Stats (satiation drain, regen)
  MilestoneSystem   → checks Flags against milestone conditions
  UISystem          → syncs game state to Alpine.store (only this one!)
```

### SQLite (Local Database)
A single `.db` file on disk. Electron can use it natively via `better-sqlite3`.  
No server, no network, fully offline.

Two databases:

**`content.db`** (read-only, auto-generated from YAML):
```
TABLE resources    — all resources and stats
TABLE actions      — all actions and their properties
TABLE items        — all craftable/collectible items
TABLE modifiers    — all pipeline modifier definitions
TABLE i18n         — all translations (key, lang, field, value)
```

**`saves.db`** (read/write, player data):
```
TABLE saves        — save slots (id, player_name, data, version, timestamp)
TABLE achievements — unlocked achievements (save_id, achievement_id, unlocked_at)
TABLE history      — action log (save_id, action_id, timestamp)
```

---

## New Workflow: Adding a Resource

### Before (today):
1. Edit `resources.ts`
2. Edit `core.ts`
3. Edit `lang/de/actions.ts`
4. Edit `lang/en/actions.ts`
5. Edit `pipeline.ts`
6. Possibly edit `types/game.ts`

### After (Option B):
1. Create `content/resources/iron_ore.yaml`
2. Add one line to `lang/de.yaml`
3. Add one line to `lang/en.yaml`
4. Run `npm run build:content`

That is 3 files and one command.

### Adding a New Language (e.g. French):
1. Create `lang/fr.yaml` (copy from `en.yaml`, translate values)
2. Run `npm run build:content`

That is 1 file and one command. No content files are touched.

---

## Migration Plan (Phased, Game Runs Throughout)

The game must remain playable during the entire migration.  
Each phase is independently deployable.

---

### Phase 1 — Content Pipeline (YAML → SQLite)

**Goal:** Replace TypeScript content files with YAML files and a build step.

**What gets built:**
- `scripts/build-content.ts` — reads all YAML, validates, writes SQLite DB and generated TS
- `content/resources/*.yaml` — one file per resource category
- `content/actions/*.yaml` — one file per action category
- `content/items/*.yaml` — one file per item category
- `lang/de.yaml` — all German translations
- `lang/en.yaml` — all English translations
- `src/core/services/content-db.ts` — replaces current `content.ts` service, queries SQLite

**What gets removed (after migration):**
- `src/data/definitions/resources.ts`
- `src/data/actions/*.ts`
- `src/lang/de/*.ts` and `src/lang/en/*.ts`
- Manual `efficiencyKeys[]` in `pipeline.ts`

**Result:** 1 item = 1 YAML file + 2 translation lines.

---

### Phase 2 — ECS Engine (Detailed Implementation Plan)

**Goal:** Decouple the game simulation from Alpine.js reactivity.  
Currently, the engine directly mutates `Alpine.store('game')` on every tick.  
After Phase 2, the engine runs on plain JS objects; Alpine reads a snapshot.

#### Pre-Phase-2 Decisions (May 2026)

Before starting the refactor, three foundational decisions were made:

**1. Test Safety Net — DONE ✅**
- 13 engine tests added in `src/core/systems/engine.test.ts`
- Covers: Buffs, Arcane Focus, Passive Regen, Production, Tasks, Milestones
- Tests use mocked `GameState` — independent of YAML content
- These tests must remain green after every refactor step

**2. Click/Action Handling — Variant B: Command Queue**
- Player clicks do NOT mutate state directly
- Instead they push a `Command` into a queue: `{ type: 'startAction', actionId: 'chop_wood' }`
- The Engine drains the queue at the start of each tick, before running systems
- Reasoning: deterministic execution order, replay/undo possible, testable, future-proof for multiplayer/cloud sync
- Perceived input lag: ≤100ms (task tick rate) — imperceptible to the player

**3. State Shape — Way 1: Data and Logic Strictly Separated**
- `GameState` contains ONLY data (no methods)
- All logic lives in systems/functions that receive `GameState` as an argument
- Save = `JSON.stringify(gameState)`, Load = `JSON.parse(...)` — trivial
- Reasoning: aligns perfectly with ECS (Components = data, Systems = logic), eliminates serialize/deserialize complexity, simplifies tests
- Migration: existing `store.resource.add(store, ...)` becomes `ResourceSystem.add(state, ...)` — same shape, just moved

#### The Problem (Why This Matters)

Right now in `engine.ts`:
```
const store = Alpine.store('game');   // ← reactive proxy
store.stats.energy -= cost;           // ← triggers Alpine re-render
store.resource.add(store, 'wood', 5); // ← triggers Alpine re-render
store.activeBuffs = { ... };          // ← triggers Alpine re-render
```

Every mutation triggers Alpine's reactivity system. With 10+ simultaneous processes
(buffs ticking, focus draining, production accumulating, tasks progressing),
this creates dozens of re-renders per second. Phase 14 (Automation) would make this worse.

#### The Solution: Engine State + UI Sync

```
Engine State (plain JS object)    →    Alpine Store (read-only snapshot)
  ├── stats: { energy, magic }          synced every 100ms by UISystem
  ├── resources: { wood, stone }        only CHANGED fields are written
  ├── flags: { ... }                    Alpine never triggers engine logic
  ├── activeBuffs: { ... }
  ├── activeTasks: { ... }
  └── activeProducers: [ ... ]
```

#### Files Created (as of May 2026)

| File | Status |
|---|---|
| `src/engine/types.ts` | ✅ `EngineServices` type (Pick of GameState services) |
| `src/engine/services.ts` | ✅ `createGameServices()` — bundles all services + late-binds closure deps |
| `src/engine/commands.ts` | ✅ Command Queue infrastructure (Variant B) |
| `src/engine/systems/buffs.ts` | ✅ `tickBuffs(state, dt)` |
| `src/engine/systems/focus.ts` | ✅ `tickFocus(state, services, dt)` |
| `src/engine/systems/regen.ts` | ✅ `tickRegen(state, services, dt, acc) → acc` |
| `src/engine/systems/producers.ts` | ✅ `tickProducers(state, services, dt, acc)` |
| `src/engine/systems/tasks.ts` | ✅ `tickTasks(state, services, dt)` |
| `src/engine/systems/milestones.ts` | ✅ `tickMilestones(state, services)` |
| `src/engine/systems/ui.ts` | 🟡 Stub — diff/dirty-check pending plain-state extraction |

Note: chose lowercase function-export style (consistent with the rest of the
codebase) over the originally proposed `BuffSystem.ts` PascalCase. No
`GameState.ts` class or `World.ts` registry — the player is currently the
only entity with active state, so a class/world registry would be ceremony
without payoff. Subsystems are plain functions taking `(state, services, …)`.

#### Files to Modify

| File | Change |
|---|---|
| `src/core/systems/engine.ts` | Thin wrapper: creates `World`, calls `world.update(dt)` |
| `src/main.ts` | Boot creates `GameState` first, then passes it to Alpine |
| `src/state.ts` | Minimal: only UI-specific state (view, hoveredAction, etc.) |

#### Migration Strategy (Incremental, Not Big-Bang)

**Step 1: Pure data state.ts ✅ DONE**
- Removed dead methods (`exportGameData`, `quit`) from `initialState`
- `src/state.ts` now contains data only

**Step 2: Engine subsystems extracted ✅ DONE**
- All 6 subsystems live in `src/engine/systems/` as pure functions
- `engine.ts` shrunk from 280 → 147 lines, acts as orchestrator
- Tick methods take `(state, services, …)` instead of reading services off state

**Step 3: Services container + Command Queue ✅ DONE**
- `createGameServices()` is the single source of truth for what services exist
- Engine receives services via `init(services)` instead of `getStore()`
- Command queue drains every 100 ms inside `processTasks` before `tickTasks`

**Step 4: Feature-logic decoupling ✅ DONE**
- 7 of 9 feature-logics migrated to closure-injected services:
  resource, actions, titles, items, settings, prologue, collection, npc, housing
- `ellie` and `dialogue` skipped (zero service dependencies — pure data mutations)
- None of them read services off `state` anymore

**Step 5: HTML → Command Queue ✅ DONE**
- All `@click="$store.game.attemptAction(...)"` / `toggleFocus(...)` /
  `executeAction(...)` handlers in HTML templates now enqueue commands:
  `$store.game.commands.enqueue({ type: 'attemptAction', ... })`
- Verified end-to-end in a vite preview (Ausruhen, Fokussieren-fail-path,
  Zweige sammeln all clean, no console errors)
- Old delegate methods on the store (`executeAction`, `attemptAction`,
  `toggleFocus`) are unused by templates now and can be removed in a
  follow-up cleanup pass.

**Step 6: Test safety net ✅ DONE**
- 112 tests across 11 files. All 9 migrated feature-logics + engine +
  pipeline + command queue have at least basic coverage. Tests run in
  <600 ms on a clean run.

**Step 7: UISystem dirty-check 🟡 IMPL READY, NO-OP TODAY**
- `src/engine/systems/ui.ts` has the real reference-sharing clone-and-swap
  implementation in `createUISync()`. It detects when `engineState ===
  Alpine.store('game')` and short-circuits to a no-op (current Stage 1
  state). Once Step 8 lands, the same code will start firing each tick
  without further changes.

**Step 8: Plain GameState 🟡 STAGE 1 DONE, STAGE 2 PARKED**
- *Stage 1 ✅:* the engine no longer calls `Alpine.store('game')` directly.
  It reads its state slot through `services.gameState`, which `main.ts`
  wires to the live Alpine store after registration. Engine API is
  decoupled — flipping to a separate plain object only touches `main.ts`.
- *Stage 2 ❌ parked:* tried pointing `services.gameState` at a SEPARATE
  plain object (deep clone of `dynamicInitialState`) with UISync
  forwarding the diff each tick. Worked for engine reads but
  `viewManager.confirmName` and other feature-logics still write
  directly to the Alpine store, so engineState went stale and the
  engine's `view !== 'menu'` check kept early-returning. Real Stage 2
  needs every state-mutating code path migrated to engineState first
  — multi-day refactor, deferred. Reverted to Stage 1 wiring; the
  scaffolding (`services.gameState`, UISync impl, persistence-aware
  fallback) all stays in place.

#### Current Engine Coupling Points (Must Decouple)

These are the exact lines in `engine.ts` that directly mutate Alpine state:

```
Line 81:  store.counters.totalTime += fullSecs       // → CounterSystem
Line 87:  Alpine.store('perf').lastTickMs = ...       // → stays (perf is UI-only)
Line 127: buff.remaining -= deltaTime                 // → BuffSystem
Line 131: store.activeBuffs = newBuffs                // → BuffSystem
Line 139: store.pipeline.calculate(store, ...)         // → FocusSystem
Line 141: store.resource.consume(store, 'magic', ...)  // → FocusSystem
Line 143: store.activeFocus = null                     // → FocusSystem
Line 150: store.pipeline.calculate(store, ...)         // → RegenSystem
Line 156: store.resource.add(store, 'magic', ...)      // → RegenSystem
Line 174: task.remaining -= deltaMs                    // → TaskSystem
Line 182: store.activeTasks = newTasks                 // → TaskSystem
Line 185: store.actions.processAction(...)             // → TaskSystem
Line 196: refreshedStore.executeAction(actionId)       // → TaskSystem
Line 233: store.pipeline.calculate(...)                // → ProductionSystem
Line 242: store.resource.add(...)                      // → ProductionSystem
Line 259: store.flags[flagId] = true                   // → MilestoneSystem
```

#### System Execution Order Per Frame

```
1. BuffSystem          (tick timers, remove expired)
2. FocusSystem         (drain magic, break if empty)
3. RegenSystem         (passive magic regen)
4. ProductionSystem    (passive building yields)
5. TaskSystem          (progress bars, completions)
6. MilestoneSystem     (check unlock conditions) — runs every 5s, not every frame
7. UISystem            (sync dirty fields to Alpine) — ALWAYS LAST
```

#### What Does NOT Change in Phase 2

- `pipeline.ts` calculation logic — stays as-is
- HTML templates' **rendering** — unchanged (still read `$store.game.X` to
  display data; only the **click handlers** were rewritten to enqueue
  commands instead of calling action methods directly)
- All CSS — unchanged
- Save format — still localStorage JSON (Phase 3 will change this)

#### Estimated Scope

- ~8 new files (small, focused systems)
- ~3 modified files (engine.ts, main.ts, state.ts)
- 0 HTML/CSS changes
- Game remains playable after each step

**Result:** Engine can handle 50+ simultaneous processes without UI jank.  
Ready for Phase 14 Automation.


---

### Phase 3 — SQLite Saves

**Goal:** Replace localStorage JSON blob with a proper SQLite save system.

#### Built (May 2026)

- `src/electron/db.ts` ✅ — `sql.js` wrapper (WASM build of SQLite — no native
  rebuild needed, works on any Electron version). Three tables (`saves`,
  `achievements`, `history`), async upsert/load/list/delete API. The
  in-memory DB is serialized to `%APPDATA%/my-earned-wings/saves.db` after
  each write.

  *(History note: tried `better-sqlite3 12.x` first; its source uses a
  v8::External API that Electron 42's V8 headers no longer expose —
  electron-builder's auto-rebuild fails with C2660. sql.js sidesteps the
  whole native-rebuild problem.)*
- `src/electron/ipc.ts` ✅ — IPC channels `DB_SAVE / DB_LOAD / DB_LIST / DB_DELETE`
  plus typed payload interfaces.
- `src/electron/main.ts` ✅ — registers `ipcMain.handle` endpoints for the four
  channels, calls `closeDb()` on `window-all-closed`.
- `src/electron/preload.ts` ✅ — exposes `dbSave / dbLoad / dbList / dbDelete`
  on `window.electronAPI`.
- `src/core/services/persistence.ts` ✅ extended in place:
  - **Stage 1**: `saveGame` writes to localStorage (sync truth) AND fires SQLite
    upsert (fire-and-forget) when `electronAPI.dbSave` exists.
  - **Stage 2**: `loadGame` is now async and returns `Promise<boolean>`, prefers
    SQLite slot 0 in Electron, falls back to localStorage LZW. `viewManager.continueGame`
    awaits it; HTML callers were already async-friendly.

#### Still to do

- **Migration sweep:** dual-write covers the rollout passively (new saves
  populate SQLite). For users who upgrade and never save again, add an
  explicit "if SQLite is empty AND localStorage has a save, copy it once"
  on the first Electron boot.
- **Asar packaging check:** `db.ts` resolves `sql-wasm.wasm` via
  `require.resolve('sql.js')`. Should work transparently when packaged
  (Node fs reads through asar) but verify on the first `npm run dist`
  build that the WASM file ends up in `app.asar` and is readable.
- **Multiple save slots UI:** schema supports slot 1+, currently only slot
  0 is used. Future "save slots" screen.
- **Achievements + history tables:** schema is in place but untouched.
  Wire when achievements / replay are designed.
- **Drop localStorage path:** keep until Stage 3 (load truth = SQLite
  for at least one full version cycle).

**Result so far:** Saves persist to a real database file in Electron;
localStorage stays as the dev-browser fallback. Multiple-slots, history,
and achievements are reserved but not yet exposed.

---

### Phase 4 — Dev Tools

A second Electron window dedicated to content authoring & inspection.
**See [`docs/DEVTOOLS.md`](DEVTOOLS.md) for the user-facing guide.**

#### Built (May 2026)

**MVP (Iter 1):**
- `devtools.html` + `src/devtools/devtools.ts` — separate Vite entry,
  Alpine-free renderer.
- `src/electron/main.ts` — opens a second `BrowserWindow` on demand
  (1280×800, focuses if already open).
- IPC: `OPEN_DEVTOOLS` channel + `electronAPI.openDevtools()` shim.
- Header button 🛠️ in the main game (only when `electronAPI.openDevtools`
  exists, i.e. Electron only).

**Iter 2:**
- Tabs for every registry: Actions / Items / NPCs / Modifiers / Buffs /
  Cheats. Each tab lists its registry grouped by category, search
  filter, click → YAML preview + stat cards.
- **Cheats panel** — talks to the running game via the
  `mw-devtools` BroadcastChannel. Buttons for: max all stats,
  +energy/magic/satiation, common resources, common flag unlocks,
  custom-resource form. Listener in `src/main.ts` handles
  `applyCheats / addResource / addStat / setFlag` commands.

#### Still to do

- **Editing:** read-only today. Next iter: form-based editor for fields,
  write-back to `content/*.yaml`, trigger `npm run build:content`,
  vite hot-reloads main game.
- **Validation panel:** surface `npm run check-all` output inside the
  window instead of requiring a CLI run.
- **More cheats:** activate buffs, unlock NPCs, jump to story phases,
  "complete demo" shortcut.
- **Modifier visualisation:** which modifiers affect which calculation,
  rendered as a tree.

---

## What Does NOT Change

| Thing | Status |
|---|---|
| Electron shell | Stays |
| Alpine.js | Stays (UI layer only) |
| HTML/CSS, Glassmorphism | Stays completely |
| Vite build system | Stays |
| Game design, story, world | Unchanged |
| All existing save data | Migrated automatically in Phase 3 |

---

## Decisions Made (Phase 1)

- [x] **YAML library**: `js-yaml` — chosen for its maturity and wide adoption
- [x] **`content/` directory structure**: Created with `resources/`, `modifiers/`, `actions/` subdirectories
- [x] **Build script**: `scripts/build-content.ts` — generates `src/generated/content.ts`
- [x] **JSON Schema validation**: Implemented via Ajv in build script (Phase 2 prep complete)
- [x] **SQLite driver**: ~~`better-sqlite3` preferred~~ → switched to **`sql.js`** (WASM
  build of SQLite). Reason: better-sqlite3 12.x source uses a v8::External
  API that Electron 42's V8 headers no longer expose; electron-builder's
  auto-rebuild fails with C2660. sql.js needs no native rebuild and works
  on every Electron version. Trade-off: in-memory DB serialised to disk
  per write — fine for save files of a few KB.
- [ ] **Save migration strategy**: in flight — Phase 3 dual-writes
  localStorage + SQLite, async load prefers SQLite. Explicit one-time
  migration helper still TODO; passive dual-write covers most users.

## Decisions Made (Phase 2 Prep, May 2026)

- [x] **Test safety net first**: 13 engine tests in `engine.test.ts` — must stay green after each refactor step
- [x] **Click handling**: Command Queue (Variant B) — clicks enqueue commands, engine drains them per tick
- [x] **State shape**: Plain data, logic in systems (Way 1) — enables trivial JSON save/load
- [x] **ECS framing**: Kept as the conceptual model. Even though the player is currently the only entity with active state, future NPCs/Items/Producers with autonomous behavior justify the pattern.

---

## Status

| Phase | Status | Target Version | Notes |
|---|---|---|---|
| Phase 1 — YAML Pipeline | ✅ Complete | v2.0.0 | Resources, Modifiers, Actions migrated |
| Phase 2 — ECS Engine | 🟢 Architecturally complete | v2.1.0 | Subsystems, services container, command queue, feature-logic decoupling, HTML migration, 112 safety-net tests, UISync impl + engine `services.gameState` plumbing all done. Real plain-state separation (Step 8 Stage 2) deferred — needs every state-mutating call site migrated first. |
| Phase 3 — SQLite Saves | 🟢 Functional (sql.js) | v2.2.0 | DB layer (sql.js/WASM), IPC, dual-write save, async SQLite-first load — runnable in Electron without native rebuild. Save-slots UI + achievements/history tables deferred. |
| Phase 4 — Dev Tools | 🟢 Iter 3+4 shipped | v2.3.0+ | Tabs + Cheats + **action YAML editor with auto-rebuild and hot-reload**. User guide: [DEVTOOLS.md](DEVTOOLS.md). Remaining: nested-field editing, Items/NPCs edit, validation panel, modifier tree. |

### Known Pre-Existing Issues (not introduced by Phase 1)
✅ Alle bekannten TypeScript-Fehler in `main.ts`, `background.ts` und `state.ts` (die vor Phase 1 existierten) wurden erfolgreich behoben und die Typen für den `GameState` korrigiert.

---

*Created: 10 May 2026 · Author: Antigravity (architectural analysis session)*
*Last Updated: 11 May 2026 · All four phases now have something
shipped. Phase 1 ✅ complete. Phase 2 architecturally complete with
Step 8 Stage 1 wiring; Stage 2 parked. Phase 3 functional via
`sql.js`. Phase 4 MVP shipped — second Electron window listing all
78 actions with YAML preview, ready to grow into a full content
editor. 224 tests green; both build paths clean.*
*This document should be updated as each phase completes.*
