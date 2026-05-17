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
  get energyPercent() { return getStore().resource.getStatPercent(getStore(), 'energy'); },
  get magicPercent() { return getStore().resource.getStatPercent(getStore(), 'magic'); },
  get satiationPercent() { return getStore().resource.getStatPercent(getStore(), 'satiation'); },
  get maxEnergy() { return getStore().resource.getMaxStat(getStore(), 'energy'); },
  get maxMagic() { return getStore().resource.getMaxStat(getStore(), 'magic'); },
  get maxSatiation() { return getStore().resource.getMaxStat(getStore(), 'satiation'); },
  getMaxStat(id: string) { return getStore().resource.getMaxStat(getStore(), id as 'energy' | 'magic' | 'satiation'); },
  getLimit(id: string) { return getStore().resource.getLimit(getStore(), id as 'energy' | 'magic' | 'satiation' | 'shards' | 'wood' | 'stone' | 'herbs' | 'astral_shards' | 'ghostwood' | 'glowpollen' | 'fibers' | 'resin' | 'iron_parts' | 'clay' | 'meat' | 'water' | 'flowers'); },
  get canAccessTreeOfLife() { return getStore().npc.canAccessTreeOfLife(getStore()); },
  get groupedHistory() { return getStore().story.getGroupedHistory(getStore()); },
  get availableFurniture() { return getStore().housing.getAvailableFurniture(getStore()); },
  get placedFurnitureList() { return getStore().housing.getPlacedFurnitureList(getStore()); },
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

// Phase 2 Stage 2 cutover (May 2026): services.gameState is now a SEPARATE
// shallow-clone of the Alpine store. Primitive fields (view, playerName, …)
// are independent — engine writes don't fire Alpine reactivity. Object/array
// fields (resources, flags, …) start as shared references; UISync.sync()
// re-clones them every tick (engine→Alpine pass) so reactivity fires once
// per tick instead of per-mutation.
//
// Writers that get `store` via getStore() (main.ts:21) automatically mutate
// the engine clone. HTML templates still write directly to Alpine for a few
// UI-owned fields (settingsOpen, sidebarCollapsed, selectedStoryNpc, saveCode);
// UISync's UI_WRITEBACK_KEYS pre-pass copies those Alpine→engine each tick.
//
// Service/system method references (audio, persistence, t, addLog, …) are
// copied by reference into the clone so `store.X()` keeps working regardless
// of which side you came from.
const liveStore = Alpine.store('game') as GameState;
const engineState = Object.assign({}, liveStore) as GameState;
// Self-reference: engine.init() is called via execBoot with the engine
// state as its argument, then names that argument `services` and reads
// `services.gameState`. So engineState.gameState must point back at
// engineState itself for the tick loop to find any state to operate on.
// Pre-cutover this worked accidentally because liveStore was Alpine's
// self-referencing proxy; after the cutover we have to re-establish the
// self-ref on the plain-data clone.
(engineState as unknown as Record<string, unknown>).gameState = engineState;
services.gameState = engineState;
(gameStoreObject as Record<string, unknown>).gameState = engineState;

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
