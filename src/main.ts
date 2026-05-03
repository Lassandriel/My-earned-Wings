import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { GameState } from './types/game';
import { initialState, getTranslations } from './state';
import { registries } from './data/index';

// System Factories
import { createResourceSystem } from './features/gameplay/resource.logic';
import { createAudioSystem } from './core/visuals/audio';
import { createPersistenceSystem } from './core/services/persistence';
import { createLoggerSystem } from './core/services/logger';
import { createJuiceSystem } from './core/visuals/juice';
import { createUISystem } from './core/visuals/ui';
import { createStorySystem } from './features/story/story.logic';
import { createPrologueSystem } from './features/story/prologue.logic';
import { createDialogueSystem } from './features/story/dialogue.logic';
import { createNPCSystem } from './features/village/village.logic';
import { createHousingSystem } from './features/housing/housing.logic';
import { createActionSystem } from './features/gameplay/actions.logic';
import { createEngineSystem } from './core/systems/engine';
import { createItemSystem } from './features/crafting/items.logic';
import { createPipelineSystem } from './core/systems/pipeline';
import { createViewManagerSystem } from './core/systems/viewManager';
import { createEllieSystem } from './features/village/ellie.logic';
import { createSettingsSystem } from './features/ui/settings.logic';
import { createI18nSystem } from './core/services/i18n';
import { createBackgroundSystem } from './core/visuals/background';
import { createEventBus, GAME_EVENTS } from './core/events/bus';
import { createContentService } from './core/services/content';
import { createPreloaderSystem } from './core/visuals/preloader';
import { createBootSystem } from './core/systems/boot';

import './assets/styles/main.css';

/**
 * Global Keyboard Controls
 */
const setupGlobalEvents = (store: GameState) => {
  window.addEventListener('resize', () => (store.settings as any).calculateScale(store));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (store.view === 'prologue') {
        (store.prologue as any).skipPrologue(store);
      } else {
        (store as any).settingsSystem.toggleSettings(store);
      }
    }

    if (e.key === 'Enter' && store.view === 'prologue') {
      (store.prologue as any).advancePrologue(store);
    }

    // Gameplay Shortcuts
    if (store.view !== 'menu' && store.view !== 'prologue' && !(store as any).settingsOpen) {
      const SHORTCUTS: Record<string, string> = { '1': 'act-ausruhen', '2': 'act-meditieren', '3': 'act-essen' };
      if (SHORTCUTS[e.key]) store.executeAction(SHORTCUTS[e.key]);
    }
  });

  document.addEventListener('mousemove', (e) => {
    store.lastMouseX = e.clientX;
    store.lastMouseY = e.clientY;
    store.ui?.handleMouseMove?.(e, store);
  });
  window.addEventListener('mouseleave', () => store.ui?.cleanupHover?.(store));

  const startMusicOnce = () => {
    store.audio.startMusic();
    document.removeEventListener('click', startMusicOnce);
  };
  document.addEventListener('click', startMusicOnce);
};

// --- BOOTSTRAP ---
Alpine.plugin(collapse);
(window as any).Alpine = Alpine;

const bootSystem = createBootSystem();
const dynamicInitialState = bootSystem.buildInitialState(initialState);

/**
 * The Main Game Store
 */
const gameStore: any = {
  ...dynamicInitialState,
  translations: getTranslations(),
  RESOURCE_REGISTRY: (registries as any).resources,
  saveInfoText: '',
  lastMouseX: 0,
  lastMouseY: 0,

  // --- CORE SERVICES ---
  content: createContentService(registries),
  bus: createEventBus(),
  EVENTS: GAME_EVENTS,

  // --- SYSTEM INSTANCES ---
  bootstrapper: bootSystem,
  resource: createResourceSystem(),
  audio: createAudioSystem(),
  juice: createJuiceSystem(),
  persistence: createPersistenceSystem(dynamicInitialState),
  logger: createLoggerSystem(),
  ui: createUISystem(),
  story: createStorySystem(),
  prologue: createPrologueSystem(),
  npc: createNPCSystem(),
  actions: createActionSystem(),
  engine: createEngineSystem(),
  item: createItemSystem(),
  housing: createHousingSystem(),
  dialogue: createDialogueSystem(),
  pipeline: createPipelineSystem(),
  ellie: createEllieSystem(),
  viewManager: createViewManagerSystem(),
  settingsSystem: createSettingsSystem(),
  i18n: createI18nSystem(),
  background: createBackgroundSystem(),
  preloader: createPreloaderSystem(),

  get settings() { return Alpine.store('settings'); },

  init() {
    const store = this as any as GameState;

    // 1. Boot Sequence
    store.bootstrapper.bootSystems(store);

    // 2. Load Persited Data
    store.persistence.loadSettings(store);
    store.audio.init((store as any).settings);
    store.juice.boot(store);

    // 3. UI & A11Y Watchers
    (Alpine as any).effect(() => {
      document.documentElement.lang = store.language || 'de';
    });

    (store.settings as any).calculateScale(store);
    
    (Alpine as any).effect(() => {
      const VALID_VIEWS = ['menu','prologue','naming','gameplay','crafting','upgrades','village','housing','story','finale','demo_end'];
      if (!VALID_VIEWS.includes(store.view)) {
        console.warn(`[UI] Invalid view: ${store.view}. Resetting to menu.`);
        store.view = 'menu';
      }
      store.ui?.cleanupHover?.(store);
    });

    // 4. Input Events
    setupGlobalEvents(store);
    store.view = 'menu';
  },

  // --- DELEGATES (Using explicit gameStore reference for stability) ---
  startNewGame() { gameStore.viewManager.startNewGame(gameStore, () => bootSystem.buildInitialState(initialState)); },
  continueGame() { gameStore.viewManager.continueGame(gameStore); },
  finishPrologue() { gameStore.viewManager.finishPrologue(gameStore); },
  confirmName(n: string) { gameStore.viewManager.confirmName(gameStore, n); },
  resolveConfirm(c: boolean) { gameStore.viewManager.resolveConfirm(gameStore, c); },

  executeAction(id: string) { return gameStore.actions.execute(gameStore, id); },
  isTaskActive(id: string) { return !!gameStore.activeTasks[id]; },
  attemptAction(el: HTMLElement, id: string) { return gameStore.actions.attemptAction(gameStore, el, id as any); },
  toggleFocus(id: string) { gameStore.actions.toggleFocus(gameStore, id as any); },
  npcExecute(id: string) { return gameStore.npc.execute(gameStore, id); },
  toggleFurniture(id: string) { gameStore.housing.toggleFurniture(gameStore, id); },
  consumeItem(id: string) { return gameStore.item.consumeItem(gameStore, id); },

  saveGame(isManual = false) { gameStore.bus.emit(gameStore.EVENTS.SAVE_REQUESTED, { isManual }); },
  loadGame() { return gameStore.persistence.loadGame(gameStore); },
  setLanguage(l: string) { gameStore.settingsSystem.setLanguage(gameStore, l); },
  hardReset() { gameStore.viewManager.hardReset(gameStore); },
  returnToMenu() { gameStore.viewManager.returnToMenu(gameStore); },
  applyCheats() { gameStore.settingsSystem.applyCheats(gameStore); },

  t(k: string, c = 'ui', p = {}) { return gameStore.i18n.t(gameStore, k, c, p); },
  playSound(k: string) { gameStore.bus.emit(gameStore.EVENTS.SOUND_TRIGGERED, { key: k }); },
  addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
    gameStore.bus.emit(gameStore.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
  },

  completeDemo() { gameStore.viewManager.completeDemo(gameStore); },

  // --- UI GETTERS ---
  getActionEffect(h: any) { return gameStore.ui.getActionEffect(gameStore, h); },
  getTooltipCosts(h: any) { return gameStore.ui.getTooltipCosts(gameStore, h); },
  setHovered(id: string | null, extra: any = null) {
    if (id && gameStore.hoveredAction?.id === id) return;
    gameStore.hoveredAction = !id ? null : (extra ? { id, ...extra } : { id, data: gameStore.content.get(id) });
    if (id) {
      gameStore.ui.reposition(gameStore.lastMouseX, gameStore.lastMouseY);
    }
  },
  
  getUsedFurnitureSpace() { return gameStore.housing.getUsedFurnitureSpace(gameStore); },
  getHomeCapacity() { return gameStore.housing.getHomeCapacity(gameStore); },
  get energyPercent() { return gameStore.resource.getStatPercent(gameStore, 'energy'); },
  get magicPercent() { return gameStore.resource.getStatPercent(gameStore, 'magic'); },
  get satiationPercent() { return gameStore.resource.getStatPercent(gameStore, 'satiation'); },
  get maxEnergy() { return gameStore.resource.getMaxStat(gameStore, 'energy'); },
  get maxMagic() { return gameStore.resource.getMaxStat(gameStore, 'magic'); },
  get maxSatiation() { return gameStore.resource.getMaxStat(gameStore, 'satiation'); },

  get canAccessTreeOfLife() { return gameStore.npc.canAccessTreeOfLife(gameStore); },
  get groupedHistory() { return gameStore.story.getGroupedHistory(gameStore); },
  get availableFurniture() { return gameStore.housing.getAvailableFurniture(gameStore); },
  get placedFurnitureList() { return gameStore.housing.getPlacedFurnitureList(gameStore); },
};

// --- ALPINE STORES ---
const settingsSystem = gameStore.settingsSystem;
Alpine.store('settings', {
  ...dynamicInitialState.settings,
  system: settingsSystem,
  toggleSettings(s: any) { settingsSystem.toggleSettings(s); },
  calculateScale(s: any) { settingsSystem.calculateScale(s); },
  setLanguage(s: any, l: string) { settingsSystem.setLanguage(s, l); },
  applyCheats(s: any) { settingsSystem.applyCheats(s); }
});

Alpine.store('game', gameStore);

document.addEventListener('DOMContentLoaded', () => {
  Alpine.start();
});
