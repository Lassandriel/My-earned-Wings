import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { GameState, Translations, HoverActionData } from './types/game';
import { initialState, getTranslations } from './state';
import { registries } from './data/index';

// Core Systems
import { createEventBus, GAME_EVENTS } from './core/events/bus';
import { createContentService } from './core/services/content';
import { createBootSystem } from './core/systems/boot';
import { autoRegisterSystems } from './core/systems/loader';
import { getSystems } from './core/systems/registry';

// Stores
import { createLogStore } from './stores/log.store';
import { createSettingsStore } from './stores/settings.store';

import './assets/styles/main.css';

// --- 1. GLOBALS & PLUGINS ---
const TRANSLATIONS = getTranslations();
window.TRANSLATIONS = TRANSLATIONS as Translations;

Alpine.plugin(collapse);
window.Alpine = Alpine;

// --- 2. PREPARE GAME LOGIC ---
const bootSystem = createBootSystem();
const dynamicInitialState = bootSystem.buildInitialState(initialState);
const systemInstances = getSystems(dynamicInitialState);

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

  // Services
  content: createContentService(registries),
  bus: createEventBus(),
  EVENTS: GAME_EVENTS,
  bootstrapper: bootSystem,

  get settings() { return Alpine.store('settings') as GameState['settings']; },

  bootstrap() {
    console.log('[BOOT] Unified Bootstrap Executing...');
    const store = Alpine.store('game') as GameState;

    store.bootstrapper.bootSystems(store);
    store.persistence.loadSettings(store);
    if (store.audio) store.audio.init(store.settings);
    if (store.juice) store.juice.boot(store);

    Alpine.effect(() => {
      document.documentElement.lang = store.language || 'de';
    });

    if (store.settings?.calculateScale) {
      store.settings.calculateScale(store);
    }
    
    // Safety check for view
    setTimeout(() => {
      if (store.view !== 'menu') {
        console.log('[BOOT] Normalizing view to menu. Current:', store.view);
        store.view = 'menu';
      }
    }, 150);
  },

  // --- EXPLICIT DELEGATIONS ---
  startNewGame() { 
    const store = Alpine.store('game') as GameState;
    (this as unknown as GameState).viewManager.startNewGame(store, () => bootSystem.buildInitialState(initialState)); 
  },
  continueGame() { (this as unknown as GameState).viewManager.continueGame(Alpine.store('game') as GameState); },
  returnToMenu() { (this as unknown as GameState).viewManager.returnToMenu(Alpine.store('game') as GameState); },
  quit() { if (window.electronAPI) window.electronAPI.quitApp(); else (this as GameState).returnToMenu(); },
  saveGame(isManual = false) { 
    const store = Alpine.store('game') as GameState;
    store.bus.emit(store.EVENTS.SAVE_REQUESTED, { isManual }); 
  },
  setLanguage(lang: string) { (this as unknown as GameState).settingsSystem.setLanguage(Alpine.store('game') as GameState, lang); },
  playSound(k: string) { 
    const store = Alpine.store('game') as GameState;
    store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: k }); 
  },
  
  isTaskActive(id: string) { return !!(Alpine.store('game') as GameState).activeTasks[id]; },
  addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
    const store = Alpine.store('game') as GameState;
    store.bus.emit(store.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
  },

  setHovered(id: string | null, extra: HoverActionData | null = null) {
    const store = Alpine.store('game') as GameState;
    if (id && store.hoveredAction?.id === id) return;
    if (!id) {
      store.hoveredAction = null;
    } else if (extra) {
      store.hoveredAction = { ...extra, id };
    } else {
      store.hoveredAction = { id, data: store.content.get(id) };
    }
    if (id && store.ui?.reposition) {
      store.ui.reposition(store.lastMouseX, store.lastMouseY);
    }
  },

  getTooltipRequirements(hAction: HoverActionData) {
    const store = Alpine.store('game') as GameState;
    return store.ui.getRequirements(store, hAction);
  },

  // Resource & NPC Helpers
  getUsedFurnitureSpace() { return (this as unknown as GameState).housing.getUsedFurnitureSpace(Alpine.store('game') as GameState); },
  getHomeCapacity() { return (this as unknown as GameState).housing.getHomeCapacity(Alpine.store('game') as GameState); },
  get energyPercent() { return (this as unknown as GameState).resource.getStatPercent(Alpine.store('game') as GameState, 'energy'); },
  get magicPercent() { return (this as unknown as GameState).resource.getStatPercent(Alpine.store('game') as GameState, 'magic'); },
  get satiationPercent() { return (this as unknown as GameState).resource.getStatPercent(Alpine.store('game') as GameState, 'satiation'); },
  get maxEnergy() { return (this as GameState).getMaxStat('energy'); },
  get maxMagic() { return (this as GameState).getMaxStat('magic'); },
  get maxSatiation() { return (this as GameState).getMaxStat('satiation'); },
  getMaxStat(id: string) { return (this as unknown as GameState).resource.getMaxStat(Alpine.store('game') as GameState, id as 'energy' | 'magic' | 'satiation'); },
  getLimit(id: string) { return (this as unknown as GameState).resource.getLimit(Alpine.store('game') as GameState, id as 'energy' | 'magic' | 'satiation' | 'shards' | 'wood' | 'stone' | 'herbs' | 'astral_shards' | 'ghostwood' | 'glowpollen' | 'fibers' | 'resin' | 'iron_parts' | 'clay' | 'meat' | 'water' | 'flowers'); },
  get canAccessTreeOfLife() { return (this as unknown as GameState).npc.canAccessTreeOfLife(Alpine.store('game') as GameState); },
  get groupedHistory() { return (this as unknown as GameState).story.getGroupedHistory(Alpine.store('game') as GameState); },
  get availableFurniture() { return (this as unknown as GameState).housing.getAvailableFurniture(Alpine.store('game') as GameState); },
  get placedFurnitureList() { return (this as unknown as GameState).housing.getPlacedFurnitureList(Alpine.store('game') as GameState); },
};

// --- 4. REGISTRATION & BOOT ---
autoRegisterSystems(gameStoreObject, systemInstances);

// Register both stores with the same INITIAL data but as separate proxies to be safe,
// OR just register 'game' and alias 'ui'.
// Given the previous issues, let's register 'game' and then use a Proxy for 'ui'.
const game = Alpine.store('game', gameStoreObject as GameState);
Alpine.store('ui', game);

// --- 5. GLOBAL MOUSE TRACKING ---
document.addEventListener('mousemove', (e) => {
  const store = Alpine.store('game') as GameState;
  if (store) {
    store.lastMouseX = e.clientX;
    store.lastMouseY = e.clientY;
    if (store.hoveredAction && store.ui?.reposition) {
      store.ui.reposition(e.clientX, e.clientY);
    }
  }
});

// --- 6. DOM READY START ---
document.addEventListener('DOMContentLoaded', () => {
  if (!window.ALPINE_STARTED) {
    window.ALPINE_STARTED = true;

    // Register secondary stores
    Alpine.store('logs', createLogStore());
    const sStore = createSettingsStore(dynamicInitialState.settings);
    sStore.boot((gameStoreObject as unknown as GameState).settingsSystem);
    Alpine.store('settings', sStore);

    Alpine.start();

    setTimeout(() => {
      const store = Alpine.store('game') as GameState;
      if (store && typeof store.bootstrap === 'function') {
        store.bootstrap();
      }
    }, 100);
  }
});
