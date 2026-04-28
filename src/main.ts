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

  // --- DELEGATES ---
  startNewGame() { this.viewManager.startNewGame(this, () => bootSystem.buildInitialState(initialState)); },
  continueGame() { this.viewManager.continueGame(this); },
  finishPrologue() { this.viewManager.finishPrologue(this); },
  confirmName(n: string) { this.viewManager.confirmName(this, n); },
  resolveConfirm(c: boolean) { this.viewManager.resolveConfirm(this, c); },

  executeAction(id: string) { return this.actions.execute(this, id); },
  isTaskActive(id: string) { return !!this.activeTasks[id]; },
  attemptAction(el: HTMLElement, id: string) { return this.actions.attemptAction(this, el, id as any); },
  toggleFocus(id: string) { this.actions.toggleFocus(this, id as any); },
  npcExecute(id: string) { return this.npc.execute(this, id); },
  toggleFurniture(id: string) { this.housing.toggleFurniture(this, id); },
  consumeItem(id: string) { return this.item.consumeItem(this, id); },

  saveGame(isManual = false) { this.bus.emit(this.EVENTS.SAVE_REQUESTED, { isManual }); },
  loadGame() { return this.persistence.loadGame(this); },
  setLanguage(l: string) { this.settingsSystem.setLanguage(this, l); },
  hardReset() { this.viewManager.hardReset(this); },
  returnToMenu() { this.viewManager.returnToMenu(this); },
  applyCheats() { this.settingsSystem.applyCheats(this); },

  t(k: string, c = 'ui', p = {}) { return this.i18n.t(this, k, c, p); },
  playSound(k: string) { this.bus.emit(this.EVENTS.SOUND_TRIGGERED, { key: k }); },
  addLog(id: string, c = 'logs', col: string | null = null, p = {}) {
    this.bus.emit(this.EVENTS.LOG_ADDED, { id, context: c, color: col, params: p });
  },

  completeDemo() { this.viewManager.completeDemo(this); },

  // --- UI GETTERS ---
  getActionEffect(h: any) { return this.ui.getActionEffect(this, h); },
  getTooltipCosts(h: any) { return this.ui.getTooltipCosts(this, h); },
  setHovered(id: string | null, extra: any = null) {
    // 1. Double-hover guard: Don't re-trigger if it's the same ID
    if (id && this.hoveredAction?.id === id) return;
    
    // 2. Set the data
    this.hoveredAction = !id ? null : (extra ? { id, ...extra } : { id, data: this.content.get(id) });
    
    // 3. Immediate positioning
    if (id) {
      this.ui.reposition(this.lastMouseX, this.lastMouseY);
    }
  },
  
  getUsedFurnitureSpace() { return this.housing.getUsedFurnitureSpace(this); },
  getHomeCapacity() { return this.housing.getHomeCapacity(this); },
  get energyPercent() { return this.resource.getStatPercent(this, 'energy'); },
  get magicPercent() { return this.resource.getStatPercent(this, 'magic'); },
  get satiationPercent() { return this.resource.getStatPercent(this, 'satiation'); },
  get maxEnergy() { return this.resource.getMaxStat(this, 'energy'); },
  get maxMagic() { return this.resource.getMaxStat(this, 'magic'); },
  get maxSatiation() { return this.resource.getMaxStat(this, 'satiation'); },

  get canAccessTreeOfLife() { return this.npc.canAccessTreeOfLife(this); },
  get groupedHistory() { return this.story.getGroupedHistory(this); },
  get availableFurniture() { return this.housing.getAvailableFurniture(this); },
  get placedFurnitureList() { return this.housing.getPlacedFurnitureList(this); },
};

// --- ALPINE STORES ---
const settingsSystem = gameStore.settingsSystem;
Alpine.store('settings', {
  ...dynamicInitialState.settings,
  system: settingsSystem,
  toggleSettings(s: any) { (this as any).system.toggleSettings(s); },
  calculateScale(s: any) { (this as any).system.calculateScale(s); },
  setLanguage(s: any, l: string) { (this as any).system.setLanguage(s, l); },
  applyCheats(s: any) { (this as any).system.applyCheats(s); }
});

Alpine.store('game', gameStore);

document.addEventListener('DOMContentLoaded', () => {
  Alpine.start();
});
