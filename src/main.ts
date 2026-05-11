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

// --- 1. TYPED STORE HELPERS ---
const getStore = (): GameState => Alpine.store('game') as GameState;
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

  // All services (content, bus, EVENTS, bootstrapper, translations, +systems)
  ...services,

  get settings() { return getSettings(); },

  bootstrap() {
    console.log('[BOOT] Unified Bootstrap Executing...');
    const store = getStore();

    store.bootstrapper.bootSystems(store);
    store.content.validate(store);
    store.persistence.loadSettings(store);
    if (store.audio) store.audio.init(store.settings);
    if (store.juice) store.juice.boot(store);

    Alpine.effect(() => {
      document.documentElement.lang = store.language || 'de';
      document.title = store.t('menu_title');
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
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
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

// Phase 2 Step 8 (Stage 1): point services.gameState at the live store so
// engine code reads through services instead of calling Alpine.store('game')
// directly. Stage 2 will swap this for a separate plain-data object.
services.gameState = gameStoreObject as GameState;

// --- 5. DOM READY START ---
document.addEventListener('DOMContentLoaded', () => {
  if (!window.ALPINE_STARTED) {
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
  }
});
