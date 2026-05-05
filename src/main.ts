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

// --- 2. EARLY STORE REGISTRATION (Prevents template crashes) ---
// We register basic stores immediately so Alpine doesn't crash during DOM scan
Alpine.store('ui', { view: 'menu', t: (k: string) => `[${k}]` });
Alpine.store('game', { view: 'menu', t: (k: string) => `[${k}]` });

// --- 3. PREPARE GAME LOGIC ---
const bootSystem = createBootSystem();
const dynamicInitialState = bootSystem.buildInitialState(initialState);
const systemInstances = getSystems(dynamicInitialState);

/**
 * The Unified Game Store
 */
const gameStoreObject: any = {
  ...dynamicInitialState,
  
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

  /**
   * Final Boot Sequence
   */
  bootstrap() {
    console.log('[BOOT] Unified Bootstrap Executing...');
    const store = this as unknown as GameState;

    // Run sub-system boots
    store.bootstrapper.bootSystems(store);
    
    // Logic initialization
    store.persistence.loadSettings(store);
    if (store.audio) store.audio.init(store.settings);
    if (store.juice) store.juice.boot(store);

    // Lang sync
    (Alpine as any).effect(() => {
      document.documentElement.lang = store.language || 'de';
    });

    // Scale
    if (store.settings?.calculateScale) {
      store.settings.calculateScale(store);
    }
    
    // Final check
    setTimeout(() => {
      if (store.view !== 'menu') {
        console.log('[BOOT] Normalizing view to menu. Current:', store.view);
        store.view = 'menu';
      }
    }, 150);
  },

  // Manual Delegation Proxies
  startNewGame() { this.viewManager.startNewGame(this, () => bootSystem.buildInitialState(initialState)); },
  isTaskActive(id: string) { return !!this.activeTasks[id]; },
  saveGame(isManual = false) { this.bus.emit(this.EVENTS.SAVE_REQUESTED, { isManual }); },
  playSound(k: string) { this.bus.emit(this.EVENTS.SOUND_TRIGGERED, { key: k }); },
  addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
    this.bus.emit(this.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
  },

  setHovered(id: string | null, extra: any = null) {
    if (id && this.hoveredAction?.id === id) return;
    this.hoveredAction = !id ? null : (extra ? { id, ...extra } : { id, data: this.content.get(id) });
    if (id && this.ui?.reposition) {
      this.ui.reposition(this.lastMouseX, this.lastMouseY);
    }
  },

  // Resource & NPC Helpers
  getUsedFurnitureSpace() { return this.housing.getUsedFurnitureSpace(this); },
  getHomeCapacity() { return this.housing.getHomeCapacity(this); },
  get energyPercent() { return this.resource.getStatPercent(this, 'energy'); },
  get magicPercent() { return this.resource.getStatPercent(this, 'magic'); },
  get satiationPercent() { return this.resource.getStatPercent(this, 'satiation'); },
  get maxEnergy() { return this.getMaxStat('energy'); },
  get maxMagic() { return this.getMaxStat('magic'); },
  get maxSatiation() { return this.getMaxStat('satiation'); },
  getMaxStat(id: string) { return this.resource.getMaxStat(this, id as any); },
  getLimit(id: string) { return this.resource.getLimit(this, id as any); },
  get canAccessTreeOfLife() { return this.npc.canAccessTreeOfLife(this); },
  get groupedHistory() { return this.story.getGroupedHistory(this); },
  get availableFurniture() { return this.housing.getAvailableFurniture(this); },
  get placedFurnitureList() { return this.housing.getPlacedFurnitureList(this); },
};

// --- 4. REGISTRATION & BOOT ---
autoRegisterSystems(gameStoreObject, systemInstances);

// Update logs and settings
Alpine.store('logs', createLogStore());
const sStore = createSettingsStore(dynamicInitialState.settings);
sStore.boot(gameStoreObject.settingsSystem);
Alpine.store('settings', sStore);

// Finalizing Unified Store
// We overwrite the early stores with the full reactive object
Alpine.store('game', gameStoreObject);
Alpine.store('ui', Alpine.store('game'));

// --- 5. DOM READY START ---
document.addEventListener('DOMContentLoaded', () => {
  if (!(window as any).ALPINE_STARTED) {
    (window as any).ALPINE_STARTED = true;
    
    // Start Alpine
    Alpine.start();
    
    // Execute bootstrap after a tiny delay to ensure proxies are settled
    setTimeout(() => {
      const store = Alpine.store('game');
      if (store && typeof store.bootstrap === 'function') {
        store.bootstrap();
      }
    }, 100);
  }
});
