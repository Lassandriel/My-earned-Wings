# Phase 2 Stage 2 — Audit: State Writers

**Goal:** make `services.gameState` a separate plain-data object instead of
identity-equal to `Alpine.store('game')`, and route every write through it
so engine and UI state can diverge cleanly (with UISync.sync() copying
engine→UI each tick).

This audit lists everywhere TS code mutates an Alpine-store field today.
Each entry is a candidate for migration. The strategy is one focused
commit per logical block — no behavior change while engine state and
Alpine store are still identity-equal, then a single cutover commit at the
end that breaks the identity and activates the real UISync path.

---

## Counts

- **Primitive-field writes:** 52 across 13 files
- **Compound-field writes (`store.stats.x = …` etc):** ~7 (mostly cheats)
- **Read-only access in UI templates (`$store.game.x`):** stays as-is —
  templates read from Alpine, that's the whole point of the split.

## Migration order (smallest to biggest, easiest to verify)

### 1. `src/core/visuals/ui-tooltip.ts` (1 write)
- `store.hoveredAction = null` in `TooltipManager.cleanup`
- Trivial. Migrate first to prove the pattern.

### 2. `src/core/visuals/background.ts` (1 read in view check, no write — skip)

### 3. `src/core/systems/boot.ts` (1 write)
- `store.view = 'menu'` (boot normalisation)

### 4. `src/core/visuals/input.logic.ts` (2 writes)
- Both `store.view = target.id` (keyboard view-switch)

### 5. `src/features/village/ellie.logic.ts` (2 writes)
- `store.showEllieIntro = true/false`

### 6. `src/features/crafting/items.logic.ts` (2 writes)
- `store.selectedItem = …` (auto-select after consume)

### 7. `src/features/ui/titles.logic.ts` (1 write)
- `store.activeTitle = id`

### 8. `src/features/ui/settings.logic.ts` (3 writes + 7 cheat-stats)
- `store.language`, `store.settingsOpen` (×2)
- Cheats block: `store.stats.{energy,maxEnergy,magic,maxMagic,satiation,maxSatiation,shards}` — 7 lines, candidate for a `resource.set()` helper if we want to keep them as cheats

### 9. `src/stores/settings.store.ts` (2 writes)
- `store.currentScale = …` (twice in calculateScale)

### 10. `src/features/story/dialogue.logic.ts` (9 writes)
- Whole dialogue open/close flow: `dialogueNpcId`, `dialogueText`,
  `dialogueTitle`, `dialogueWaiting`, `dialogueActive`. Clean self-contained
  set of fields — good batch.

### 11. `src/core/services/persistence.ts` (6 writes)
- `store.hasSave` (×3), `store.saveInfoText` (×2), `store.language`
- Touches save load + autosave wording.

### 12. `src/core/systems/viewManager.ts` (15 writes — largest)
- view transitions: `view` (×6), `playerName`, `prologueStep`, `hasSave`,
  `confirmModal` (×2), `ellieIntroSeen`, `finalStats`, `activeFocus`,
  `demoCompleted`
- The view-change flows are the most observable in-game, so migrate this
  with a manual smoke test (Continue/New Game/Finale).

### 13. `src/main.ts` (7 writes)
- `store.isFullscreen`, `store.hoveredAction` (×3), `store.sidebarCollapsed`,
  cheat dispatcher `store.view = cmd.view`, `store.demoCompleted = true`
- Inside the cheat BroadcastChannel handler — these are debug paths but
  still need migration.

---

## After all writers migrated

### Cutover commit
In `src/engine/services.ts`, change:
```ts
services.gameState = liveStore; // identity-equal to Alpine
```
to a separate plain-data copy + activate UISync.sync() (it currently
no-ops because `alpineStore === state`).

### Smoke test
1. New game → name → main view → all 4 primary actions
2. Open ellie dialogue → choose option → close
3. Open settings → change language → reload → settings preserved
4. Continue from save → resources / NPC progress intact
5. Demo finale → stats card matches counters
6. Fullscreen toggle, sidebar collapse

### Risk
The only risk is field drift: any write the audit missed will silently
land on Alpine without the engine seeing it (or vice versa after the
cutover). The grep used here covered the 30+ named primitive fields plus
the compound containers — if a new field is added later and only written
from one side, drift returns.

## What this does NOT cover

- View templates (`<button @click="$store.game.x = …">`) — those keep
  writing to Alpine. Stage 2 doesn't unify the UI input path; it just
  ensures the engine has its own owned state.
- Direct mutations to `state.x = …` inside engine subsystems
  (engine/systems/*.ts) — already correct; those mutate the engine
  state object via the `state` parameter, which after cutover IS the
  separate plain-data object.
