import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { initialState, getTranslations } from './state';
import { registries } from './data/index';

import { createResourceSystem } from './features/gameplay/resource.logic';
import { createAudioSystem } from './core/audio';
import { createPersistenceSystem } from './core/persistence';
import { createLoggerSystem } from './core/logger';
import { createJuiceSystem } from './core/juice';
import { createUISystem } from './core/ui';
import { createStorySystem } from './features/story/story.logic';
import { createPrologueSystem } from './features/story/prologue.logic';
import { createDialogueSystem } from './features/story/dialogue.logic';
import { createNPCSystem } from './features/village/village.logic';
import { createHousingSystem } from './features/housing/housing.logic';
import { createActionSystem } from './features/gameplay/actions.logic';
import { createEngineSystem } from './core/engine';
import { createItemSystem } from './features/crafting/items.logic';
import { createPipelineSystem } from './core/pipeline';
import { createViewManagerSystem } from './core/viewManager';
import { createEllieSystem } from './features/village/ellie.logic';
import { createSettingsSystem } from './features/ui/settings.logic';
import { createI18nSystem } from './core/i18n';
import { createEventBus, GAME_EVENTS } from './core/bus';
import { createContentService } from './core/content';

import { GameState } from './types/game';

import { createBootSystem } from './core/boot';

import './assets/styles/main.css';

Alpine.plugin(collapse);
(window as any).Alpine = Alpine;

const bootSystem = createBootSystem();
const dynamicInitialState = bootSystem.buildInitialState(initialState);

const gameStore: any = {
  ...dynamicInitialState,
  translations: getTranslations(),
  RESOURCE_REGISTRY: (registries as any).resources,
  saveInfoText: '',
  lastMouseX: 0,
  lastMouseY: 0,

  // Core Services
  content: createContentService(registries),

  // System Instances
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
  bus: createEventBus(),
  EVENTS: GAME_EVENTS,

  init() {
    const store = Alpine.store('game') as unknown as GameState;

    // --- AUTO-LOAD SETTINGS ---
    store.persistence.loadSettings(store);

    // --- CONTENT VALIDATION ---
    setTimeout(() => {
      (store.content as any).validate(store);
    }, 100);

    const hasSavedData = localStorage.getItem('wings_save');
    store.hasSave = !!hasSavedData;

    store.audio.init((store as any).settings);
    store.juice.boot(store);

    // --- SYSTEM BOOT ---
    const systemsToBoot = ['audio', 'logger', 'persistence', 'actions', 'ui'];
    systemsToBoot.forEach((sys) => {
      if ((store as any)[sys]?.boot) (store as any)[sys].boot(store);
    });

    store.engine.init();

    store.settingsSystem.calculateScale(store);
    window.addEventListener('resize', () => store.settingsSystem.calculateScale(store));

    // --- GLOBAL UI WATCHER ---
    (Alpine as any).effect(() => {
      const view = store.view;
      const VALID_VIEWS = [
        'menu',
        'prologue',
        'naming',
        'gameplay',
        'crafting',
        'upgrades',
        'village',
        'housing',
        'story',
        'finale',
      ];
      if (!VALID_VIEWS.includes(view)) {
        console.warn(`[UI] Invalid view detected: ${view}. Falling back to menu.`);
        store.view = 'menu';
      }
      if (store.ui && store.ui.cleanupHover) store.ui.cleanupHover(store);
    });

    store.view = 'menu';

    const startMusicOnce = () => {
      store.audio.startMusic();
      document.removeEventListener('click', startMusicOnce);
    };
    document.addEventListener('click', startMusicOnce);
  },

  // --- PROXIES & DELEGATES ---
  startNewGame() {
    this.viewManager.startNewGame(this, () => bootSystem.buildInitialState(initialState));
  },
  continueGame() {
    this.viewManager.continueGame(this);
  },
  finishPrologue() {
    this.viewManager.finishPrologue(this);
  },
  confirmName(name: string) {
    this.viewManager.confirmName(this, name);
  },
  resolveConfirm(conf: boolean) {
    this.viewManager.resolveConfirm(this, conf);
  },

  executeAction(id: string) {
    return this.actions.execute(this, id);
  },
  isTaskActive(id: string) {
    return !!this.activeTasks[id];
  },

  attemptAction(el: HTMLElement, id: string) {
    return this.actions.attemptAction(this, el, id as import('./types/game').ActionId);
  },
  toggleFocus(id: string) {
    this.actions.toggleFocus(this, id as import('./types/game').ActionId);
  },
  npcExecute(id: string) {
    return this.npc.execute(this, id);
  },
  toggleFurniture(id: string) {
    this.housing.toggleFurniture(this, id);
  },
  consumeItem(id: string) {
    return this.item.consumeItem(this, id);
  },

  saveGame(isManual = false) {
    this.bus.emit(this.EVENTS.SAVE_REQUESTED, { isManual });
  },
  loadGame() {
    return this.persistence.loadGame(this);
  },
  setLanguage(lang: string) {
    this.settingsSystem.setLanguage(this, lang);
  },
  hardReset() {
    this.viewManager.hardReset(this);
  },
  returnToMenu() {
    this.viewManager.returnToMenu(this);
  },

  applyCheats() {
    this.settingsSystem.applyCheats(this);
  },

  t(key: string, context = 'ui', params = {}) {
    return this.i18n.t(this, key, context, params);
  },

  playSound(key: string) {
    this.bus.emit(this.EVENTS.SOUND_TRIGGERED, { key });
  },
  addLog(id: string, context = 'logs', color: string | null = null, params = {}) {
    this.bus.emit(this.EVENTS.LOG_ADDED, { id, context, color, params });
  },

  completeDemo() {
    this.viewManager.completeDemo(this);
  },

  // --- GETTERS ---
  getActionEffect(hAction: any) {
    return this.ui.getActionEffect(this, hAction);
  },
  getTooltipCosts(hAction: any) {
    return this.ui.getTooltipCosts(this, hAction);
  },
  setHovered(id: string | null, extra: any = null) {
    if (!id) {
      this.hoveredAction = null;
      return;
    }
    this.hoveredAction = extra ? { id, ...extra } : { id, data: this.content.get(id) };
  },
  getUsedFurnitureSpace() {
    return this.housing.getUsedFurnitureSpace(this);
  },
  getHomeCapacity() {
    return this.housing.getHomeCapacity(this);
  },
  get energyPercent() {
    return this.resource.getStatPercent(this, 'energy');
  },
  get magicPercent() {
    return this.resource.getStatPercent(this, 'magic');
  },
  get satiationPercent() {
    return this.resource.getStatPercent(this, 'satiation');
  },
  get maxEnergy() {
    return this.resource.getMaxStat(this, 'energy');
  },
  get maxMagic() {
    return this.resource.getMaxStat(this, 'magic');
  },
  get maxSatiation() {
    return this.resource.getMaxStat(this, 'satiation');
  },

  get canAccessTreeOfLife() {
    return this.npc.canAccessTreeOfLife(this);
  },

  get groupedHistory() {
    return this.story.getGroupedHistory(this);
  },
  get availableFurniture() {
    return this.housing.getAvailableFurniture(this);
  },
  get placedFurnitureList() {
    return this.housing.getPlacedFurnitureList(this);
  },
};

Alpine.store('game', gameStore);

Alpine.start();

// --- Event Listeners ---
document.addEventListener('keydown', (e) => {
  const store = Alpine.store('game') as unknown as GameState;
  if (!store) return;

  if (e.key === 'Escape') {
    if (store.view === 'prologue') {
      (store.prologue as any).skipPrologue(store);
    } else {
      (store as any).settingsSystem.toggleSettings(store);
    }
  }

  if (e.key === 'Enter') {
    if (store.view === 'prologue') {
      (store.prologue as any).advancePrologue(store);
    }
  }

  if (store.view !== 'menu' && store.view !== 'prologue' && !(store as any).settingsOpen) {
    const SHORTCUTS: Record<string, string> = {
      '1': 'act-essen',
      '2': 'act-ausruhen',
      '3': 'act-meditieren',
    };
    if (SHORTCUTS[e.key]) store.executeAction(SHORTCUTS[e.key]);
  }
});

document.addEventListener('mousemove', (e) => {
  const store = Alpine.store('game') as unknown as GameState;
  if (store && store.ui) store.ui.handleMouseMove(e, store);
});

window.addEventListener('mouseleave', () => {
  const store = Alpine.store('game') as unknown as GameState;
  if (store && store.ui) store.ui.cleanupHover(store);
});
