/**
 * Renderer entry. Wires Alpine + the game store + secondary stores +
 * boot orchestration. Pure glue — every concern of substance lives in
 * a sibling module:
 *   - createGameStoreObject (startup/game-store.ts)
 *   - readDisabledAddonsFromStorage + applyAddonPrune (startup/addon-prune.ts)
 *   - registerDevtoolsCheatChannel (startup/devtools-cheats.ts)
 *   - core/systems/boot.ts + engine/services.ts for actual game systems
 */

import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { GameState, Translations } from './types/game';
import { initialState, getTranslations } from './state';

import { createBootSystem } from './core/systems/boot';
import { autoRegisterSystems } from './core/systems/loader';
import { createGameServices } from './engine/services';

import { createLogStore } from './stores/log.store';
import { createSettingsStore } from './stores/settings.store';

import './assets/styles/main.css';
// Build-time addons can ship CSS at content/addons/<name>/styles/*.css.
// The build script concatenates them into the generated file below;
// importing it lets Vite bundle the styles with the rest of the app.
// Runtime addons inject their CSS at boot via runtime-addons.ts.
import './generated/addon-styles.css';

import { makeLogger } from './core/log';
import { loadRuntimeAddons } from './core/services/runtime-addons';
import { setDisabledAddons } from './core/addons/active';

import { createGameStoreObject, makeGetStore } from './startup/game-store';
import { readDisabledAddonsFromStorage, applyAddonPrune } from './startup/addon-prune';
import { registerDevtoolsCheatChannel } from './startup/devtools-cheats';

const log = makeLogger('MAIN');

// --- 1. GLOBALS & PLUGINS ---
const TRANSLATIONS = getTranslations();
window.TRANSLATIONS = TRANSLATIONS as Translations;

Alpine.plugin(collapse);
window.Alpine = Alpine;

// --- 2. PREPARE GAME LOGIC ---
const bootSystem = createBootSystem();
const dynamicInitialState = bootSystem.buildInitialState(initialState);
const { services, systems: systemInstances } = createGameServices({
  bootSystem,
  dynamicInitialState,
  translations: TRANSLATIONS,
});

const gameStoreObject = createGameStoreObject({ bootSystem, services, dynamicInitialState });
const getStore = makeGetStore(services);

// --- 3. REGISTRATION ---
autoRegisterSystems(gameStoreObject, systemInstances);

// Register both stores with the same INITIAL data but as separate proxies to be safe,
// OR just register 'game' and alias 'ui'.
// Given the previous issues, let's register 'game' and then use a Proxy for 'ui'.
const game = Alpine.store('game', gameStoreObject as GameState);
Alpine.store('ui', game);

// Phase 2 Stage 2 cutover REVERTED (May 2026, post-demo audit).
// The clone-based cutover broke several flows because HTML view templates
// call `$store.game.X(...)` directly — those writes land on Alpine, but
// engine state (the cutover clone) never sees them. confirmModal not
// closing, stale tooltips on view change, settings undefined during early
// boot, save-load round-trip false-corruption, etc.
//
// All supporting infrastructure stays: getStore() routes through
// services.gameState (which is identity-equal to Alpine here), the RAF
// UISync.sync loop still runs each frame, UI_WRITEBACK_KEYS is still
// honoured. So when we ARE ready to re-cut over (for replays / multiplayer
// where the separation actually pays off), it's a one-line change here
// plus a migration of UI-template writes through getStore-aware methods.
const liveStore = Alpine.store('game') as GameState;
services.gameState = liveStore;
(gameStoreObject as Record<string, unknown>).gameState = liveStore;

// --- 4. DOM-READY START ---
// main.ts is loaded as a `<script type="module">` which is implicitly
// deferred. Per spec DOMContentLoaded fires after deferred scripts run, so
// the listener registered below normally catches it. But in some embedding
// contexts (notably Vite-dev in a plain browser tab vs. Electron) the
// listener can be attached after DOMContentLoaded has already fired,
// leaving the app stuck at view='menu' with Alpine never started. Run the
// boot inline if the document is already past 'loading'.
const startBoot = async () => {
  if (window.ALPINE_STARTED) return;
  window.ALPINE_STARTED = true;

  // Apply disabled-addon prune BEFORE runtime addons load (so a disabled
  // addon can't accidentally re-appear via a runtime drop) and BEFORE
  // Alpine starts (so the UI never sees the about-to-be-removed entries).
  // Read straight from localStorage; the settings store will sync the
  // same value later in bootstrap().
  const disabledAddons = readDisabledAddonsFromStorage();
  // Tell the active-addons module so getActiveAddons() can stamp the
  // `disabled` flag on each entry, even when the registries have already
  // been pruned (no content left to detect from).
  setDisabledAddons(disabledAddons);
  applyAddonPrune(disabledAddons);

  // Phase 16: merge any user-installed runtime addons into the registries
  // + translations + DOM before Alpine starts. In the browser build this
  // resolves to a no-op summary immediately. We don't fail boot on errors
  // — runtime addons are advisory.
  try {
    await loadRuntimeAddons();
  } catch (err) {
    log.warn('runtime addon load failed:', err);
  }

  // Register secondary stores
  Alpine.store('logs', createLogStore());
  const sStore = createSettingsStore(dynamicInitialState.settings);
  sStore.boot(systemInstances.settingsSystem as any);
  Alpine.store('settings', sStore);

  Alpine.start();

  setTimeout(() => {
    const store = getStore();
    if (store && typeof store.bootstrap === 'function') {
      store.bootstrap();
    }
  }, 100);

  registerDevtoolsCheatChannel(getStore, log);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBoot);
} else {
  startBoot();
}
