import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { GameState, Translations, HoverActionData } from './types/game';
import { initialState, getTranslations } from './state';

// Core Systems
import { createBootSystem } from './core/systems/boot';
import { autoRegisterSystems } from './core/systems/loader';
import { createGameServices } from './engine/services';

// Stores
import { createLogStore } from './stores/log.store';
import { createSettingsStore } from './stores/settings.store';

import './assets/styles/main.css';
import { makeLogger } from './core/log';
import { GAME_VERSION } from './generated/content';

const log = makeLogger('MAIN');

// --- 1. TYPED STORE HELPERS ---
// Phase 2 Stage 2: getStore() returns services.gameState (the engine-owned
// state object) instead of Alpine.store('game'). In Stage 1 these are
// identity-equal so the change is invisible; at cutover services.gameState
// becomes a separate plain-data clone and every TS writer that flows
// through this helper transparently mutates engine state.
//
// Initial null check: services.gameState is assigned just below
// Alpine.store('game', ...) but if a caller somehow runs before that
// assignment, fall through to the Alpine store to avoid a null deref.
const getStore = (): GameState =>
  (services.gameState ?? (Alpine.store('game') as GameState));
const getSettings = (): GameState['settings'] => Alpine.store('settings') as GameState['settings'];

// --- 2. GLOBALS & PLUGINS ---
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

const gameStoreObject: Partial<GameState> & Record<string, unknown> = {
  ...dynamicInitialState,
  saveInfoText: '',

  // Build-time version label (read from package.json). HTML templates
  // bind `$store.game.version` directly — no i18n key, no risk of
  // forgetting to bump it when package.json moves.
  version: GAME_VERSION,

  // UI State
  view: 'menu',
  hoveredAction: null,
  confirmModal: { open: false, message: '', onConfirm: null },
  settingsOpen: false,
  lastMouseX: 0,
  lastMouseY: 0,
  currentScale: 1,
  isFullscreen: false,

  // All services (content, bus, EVENTS, bootstrapper, translations, +systems).
  // Cast to `any` because the concrete subsystem types are stricter than the
  // GameState slots they slot into (e.g. actions.effectHandlers uses GameEffect
  // discriminated unions, but the GameState alias widens to {type:string,...}).
  // The runtime objects are correct — only the structural typing diverges.
  ...(services as any),

  get settings() { return getSettings(); },

  bootstrap() {
    log.info('Unified Bootstrap Executing...');
    const store = getStore();

    store.bootstrapper.bootSystems(store);
    store.content.validate(store);
    store.persistence.loadSettings(store);
    if (store.audio) store.audio.init(store.settings);
    if (store.juice) store.juice.boot(store);

    // Alpine.effect tracks reads through Alpine's reactive proxy, not via
    // the engine state (which is a plain object after Phase 2 Stage 2).
    // Read from Alpine.store('game') inside the callback so the effect
    // re-fires when language / translations change.
    Alpine.effect(() => {
      const ui = Alpine.store('game') as GameState;
      document.documentElement.lang = ui.language || 'de';
      document.title = ui.t('menu_title');
    });

    if (store.settings?.calculateScale) {
      store.settings.calculateScale(store);
    }

    // Sync Fullscreen State
    document.addEventListener('fullscreenchange', () => {
      store.isFullscreen = !!document.fullscreenElement;
    });
  },

  // --- EXPLICIT DELEGATIONS ---
  startNewGame() { 
    const store = getStore();
    store.viewManager.startNewGame(store, () => bootSystem.buildInitialState(initialState)); 
  },
  continueGame() { getStore().viewManager.continueGame(getStore()); },
  returnToMenu() { getStore().viewManager.returnToMenu(getStore()); },
  quit() { if (window.electronAPI) window.electronAPI.quitApp(); else getStore().returnToMenu(); },
  saveGame(isManual = false) { 
    const store = getStore();
    store.bus.emit(store.EVENTS.SAVE_REQUESTED, { isManual }); 
  },
  setLanguage(lang: string) { getStore().settingsSystem.setLanguage(getStore(), lang); },
  playSound(k: string) { 
    const store = getStore();
    store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: k }); 
  },
  
  isTaskActive(id: string) { return !!getStore().activeTasks[id]; },
  addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
    const store = getStore();
    store.bus.emit(store.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
  },

  setHovered(id: string | null, extra: HoverActionData | null = null) {
    const store = getStore();
    if (id && store.hoveredAction?.id === id) return;
    if (!id) {
      store.hoveredAction = null;
    } else if (extra) {
      store.hoveredAction = { ...extra, id };
    } else {
      store.hoveredAction = { id, data: store.content.get(id) || undefined };
    }
    if (id && store.ui?.reposition) {
      store.ui.reposition(store.lastMouseX, store.lastMouseY, true);
    }
  },

  /**
   * Shortcut for the very common help-tooltip pattern. Call from a view as
   *   @mouseenter="$store.game.helpHover('cat_crafting', 'nav_crafting_desc')"
   *   @mouseleave="$store.game.setHovered(null)"
   * The two strings are translation keys (resolved via t()), not literal text.
   */
  helpHover(titleKey: string, descKey: string, hoverId: string = 'help') {
    const store = getStore();
    store.setHovered(hoverId, {
      id: hoverId,
      isHelp: true,
      title: store.t(titleKey),
      desc: store.t(descKey),
    } as HoverActionData);
  },

  getTooltipRequirements(hAction: HoverActionData) {
    const store = getStore();
    return store.ui.getRequirements(store, hAction);
  },

  // Resource & NPC Helpers
  getUsedFurnitureSpace() { return getStore().housing.getUsedFurnitureSpace(getStore()); },
  getHomeCapacity() { return getStore().housing.getHomeCapacity(getStore()); },
  // Defensive getters — these are called by Alpine while it sets up the
  // reactive store, including during property enumeration *before* the
  // subsystems (resource/story/housing/npc) have been attached. Without
  // the optional chaining, the very first enumeration crashes module
  // load and the renderer ends up stuck with x-show never evaluated.
  get energyPercent() { const s = getStore(); return s?.resource?.getStatPercent?.(s, 'energy') ?? 0; },
  get magicPercent() { const s = getStore(); return s?.resource?.getStatPercent?.(s, 'magic') ?? 0; },
  get satiationPercent() { const s = getStore(); return s?.resource?.getStatPercent?.(s, 'satiation') ?? 0; },
  get maxEnergy() { const s = getStore(); return s?.resource?.getMaxStat?.(s, 'energy') ?? 0; },
  get maxMagic() { const s = getStore(); return s?.resource?.getMaxStat?.(s, 'magic') ?? 0; },
  get maxSatiation() { const s = getStore(); return s?.resource?.getMaxStat?.(s, 'satiation') ?? 0; },
  getMaxStat(id: string) { const s = getStore(); return s?.resource?.getMaxStat?.(s, id as 'energy' | 'magic' | 'satiation') ?? 0; },
  getLimit(id: string) { const s = getStore(); return s?.resource?.getLimit?.(s, id as any) ?? 0; },
  get canAccessTreeOfLife() { const s = getStore(); return s?.npc?.canAccessTreeOfLife?.(s) ?? false; },
  get groupedHistory() { const s = getStore(); return s?.story?.getGroupedHistory?.(s) ?? []; },
  get availableFurniture() { const s = getStore(); return s?.housing?.getAvailableFurniture?.(s) ?? []; },
  get placedFurnitureList() { const s = getStore(); return s?.housing?.getPlacedFurnitureList?.(s) ?? []; },
  toggleSidebar() {
    const store = getStore();
    store.sidebarCollapsed = !store.sidebarCollapsed;
    store.playSound('click');
  },

  toggleFullscreen() {
    const store = getStore();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        log.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    store.playSound('click');
  },
};

// --- 4. REGISTRATION & BOOT ---
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

// --- 5. DOM READY START ---
// main.ts is loaded as a `<script type="module">` which is implicitly
// deferred. Per spec DOMContentLoaded fires after deferred scripts run, so
// the listener registered below normally catches it. But in some embedding
// contexts (notably Vite-dev in a plain browser tab vs. Electron) the
// listener can be attached after DOMContentLoaded has already fired,
// leaving the app stuck at view='menu' with Alpine never started. Run the
// boot inline if the document is already past 'loading'.
const startBoot = () => {
  if (window.ALPINE_STARTED) return;
  window.ALPINE_STARTED = true;

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

  // --- Phase 4: listen for cheat commands from the dev tools window ---
  if (typeof BroadcastChannel !== 'undefined') {
    const devChannel = new BroadcastChannel('mw-devtools');
    devChannel.addEventListener('message', (ev) => {
      const cmd = ev.data as { type: string; [k: string]: any };
      const store = getStore();
        if (!store || !cmd?.type) return;

        try {
          switch (cmd.type) {
            case 'applyCheats':
              store.applyCheats?.();
              break;
            case 'addResource':
              if (cmd.resource && typeof cmd.amount === 'number') {
                store.resource.add(store, cmd.resource, cmd.amount);
              }
              break;
            case 'addStat':
              if (cmd.stat && typeof cmd.amount === 'number') {
                store.stats[cmd.stat] = (store.stats[cmd.stat] || 0) + cmd.amount;
              }
              break;
            case 'setFlag':
              if (cmd.flag !== undefined) {
                (store.flags as Record<string, boolean>)[cmd.flag] = cmd.value;
                store.pipeline?.invalidateCache?.();
                store.resource?.invalidateCache?.();
              }
              break;
            case 'addBuff':
              if (cmd.buffId) {
                const handler = store.actions?.effectHandlers?.addBuff;
                if (handler) handler(store, { type: 'addBuff', buffId: cmd.buffId } as any);
              }
              break;
            case 'unlockNPC':
              if (cmd.npcId) {
                const handler = store.actions?.effectHandlers?.unlockNPC;
                if (handler) handler(store, { type: 'unlockNPC', id: cmd.npcId } as any);
              }
              break;
            case 'unlockAllNPCs': {
              const npcs = (store.content as any)?.registries?.npcs ?? {};
              const handler = store.actions?.effectHandlers?.unlockNPC;
              if (handler) {
                for (const npcId of Object.keys(npcs)) {
                  if (!store.unlockedNPCs.includes(npcId as any)) {
                    handler(store, { type: 'unlockNPC', id: npcId } as any);
                  }
                }
              }
              break;
            }
            case 'setView':
              if (cmd.view) store.view = cmd.view;
              break;
            case 'completeDemo':
              store.demoCompleted = true;
              (store.flags as Record<string, boolean>)['unlocked-library'] = true;
              store.pipeline?.invalidateCache?.();
              break;
            case 'resetSave':
              localStorage.removeItem('wings_save');
              localStorage.removeItem('hasSave');
              window.location.reload();
              return; // skip the save trigger
          }
          store.bus?.emit?.(store.EVENTS.SAVE_REQUESTED);
        } catch (err) {
          log.warn('cheat failed:', err);
        }
      });
    }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startBoot);
} else {
  startBoot();
}
