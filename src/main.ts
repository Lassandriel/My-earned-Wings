import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { GameState } from './types/game';
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
(window as any).TRANSLATIONS = TRANSLATIONS;

Alpine.plugin(collapse);
(window as any).Alpine = Alpine;

// --- 2. PREPARE GAME LOGIC ---
const bootSystem = createBootSystem();
const dynamicInitialState = bootSystem.buildInitialState(initialState);
const systemInstances = getSystems(dynamicInitialState);

const gameStoreObject: any = {
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

  get settings() { return Alpine.store('settings'); },

  bootstrap() {
    console.log('[BOOT] Unified Bootstrap Executing...');
    const store = Alpine.store('game') as any;

    store.bootstrapper.bootSystems(store);
    store.persistence.loadSettings(store);
    if (store.audio) store.audio.init(store.settings);
    if (store.juice) store.juice.boot(store);

    (Alpine as any).effect(() => {
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
    const store = Alpine.store('game') as any;
    this.viewManager.startNewGame(store, () => bootSystem.buildInitialState(initialState)); 
  },
  continueGame() { this.viewManager.continueGame(Alpine.store('game') as any); },
  returnToMenu() { this.viewManager.returnToMenu(Alpine.store('game') as any); },
  quit() { if ((window as any).electronAPI) (window as any).electronAPI.quitApp(); else this.returnToMenu(); },
  saveGame(isManual = false) { 
    const store = Alpine.store('game') as any;
    store.bus.emit(store.EVENTS.SAVE_REQUESTED, { isManual }); 
  },
  setLanguage(lang: string) { this.settingsSystem.setLanguage(Alpine.store('game') as any, lang); },
  playSound(k: string) { 
    const store = Alpine.store('game') as any;
    store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: k }); 
  },
  
  isTaskActive(id: string) { return !!(Alpine.store('game') as any).activeTasks[id]; },
  addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
    const store = Alpine.store('game') as any;
    store.bus.emit(store.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
  },

  setHovered(id: string | null, extra: any = null) {
    const store = Alpine.store('game') as any;
    if (id && store.hoveredAction?.id === id) return;
    store.hoveredAction = !id ? null : (extra ? { id, ...extra } : { id, data: store.content.get(id) });
    if (id && store.ui?.reposition) {
      store.ui.reposition(store.lastMouseX, store.lastMouseY);
    }
  },

  // Resource & NPC Helpers
  getUsedFurnitureSpace() { return this.housing.getUsedFurnitureSpace(Alpine.store('game') as any); },
  getHomeCapacity() { return this.housing.getHomeCapacity(Alpine.store('game') as any); },
  get energyPercent() { return this.resource.getStatPercent(Alpine.store('game') as any, 'energy'); },
  get magicPercent() { return this.resource.getStatPercent(Alpine.store('game') as any, 'magic'); },
  get satiationPercent() { return this.resource.getStatPercent(Alpine.store('game') as any, 'satiation'); },
  get maxEnergy() { return this.getMaxStat('energy'); },
  get maxMagic() { return this.getMaxStat('magic'); },
  get maxSatiation() { return this.getMaxStat('satiation'); },
  getMaxStat(id: string) { return this.resource.getMaxStat(Alpine.store('game') as any, id as any); },
  getLimit(id: string) { return this.resource.getLimit(Alpine.store('game') as any, id as any); },
  get canAccessTreeOfLife() { return this.npc.canAccessTreeOfLife(Alpine.store('game') as any); },
  get groupedHistory() { return this.story.getGroupedHistory(Alpine.store('game') as any); },
  get availableFurniture() { return this.housing.getAvailableFurniture(Alpine.store('game') as any); },
  get placedFurnitureList() { return this.housing.getPlacedFurnitureList(Alpine.store('game') as any); },
};

// --- 4. REGISTRATION & BOOT ---
autoRegisterSystems(gameStoreObject, systemInstances);

// Register both stores with the same INITIAL data but as separate proxies to be safe,
// OR just register 'game' and alias 'ui'.
// Given the previous issues, let's register 'game' and then use a Proxy for 'ui'.
const game = Alpine.store('game', gameStoreObject) as any;
Alpine.store('ui', game);

// --- 5. GLOBAL MOUSE TRACKING ---
document.addEventListener('mousemove', (e) => {
  const store = Alpine.store('game') as any;
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
  if (!(window as any).ALPINE_STARTED) {
    (window as any).ALPINE_STARTED = true;

    // Register secondary stores
    Alpine.store('logs', createLogStore());
    const sStore = createSettingsStore(dynamicInitialState.settings);
    sStore.boot(gameStoreObject.settingsSystem);
    Alpine.store('settings', sStore);

    Alpine.start();

    setTimeout(() => {
      const store = Alpine.store('game') as any;
      if (store && typeof store.bootstrap === 'function') {
        store.bootstrap();
      }
    }, 100);
  }
});
