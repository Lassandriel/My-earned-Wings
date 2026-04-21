import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { initialState, getTranslations } from './state';
import { registries } from './data/index';

import { createResourceSystem } from './systems/resource';
import { createAudioSystem } from './systems/audio';
import { createPersistenceSystem } from './systems/persistence';
import { createLoggerSystem } from './systems/logger';
import { createJuiceSystem } from './systems/juice';
import { createUISystem } from './systems/ui';
import { createStorySystem } from './systems/story';
import { createPrologueSystem } from './systems/prologue';
import { createDialogueSystem } from './systems/dialogue';
import { createNPCSystem } from './systems/npc';
import { createActionSystem } from './systems/actions';
import { createEngineSystem } from './systems/engine';
import { createItemSystem } from './systems/item';
import { createPipelineSystem } from './systems/pipeline';
import { createViewManagerSystem } from './systems/viewManager';
import { createEllieSystem } from './systems/ellie';
import { createEventBus, GAME_EVENTS } from './systems/bus';
import { createContentService } from './systems/content';

import { GameState } from './types/game';

import './assets/styles/main.css';

Alpine.plugin(collapse);
(window as any).Alpine = Alpine;

/**
 * CORE 3.5 STORE ASSEMBLY - TypeScript Edition
 * Dynamically builds the game store based on registries.
 */
const buildInitialState = (): any => {
  const baseState = JSON.parse(JSON.stringify(initialState));

  // Auto-populate resources and stats from Registry
  Object.values(registries.resources).forEach((res: any) => {
    if (res.type === 'resource') {
      const limit = res.initialLimit || 0;
      baseState.limits[res.id] = limit;
      baseState.resources[res.id] = Math.min(limit, res.initial || 0);
    } else if (res.type === 'stat') {
      const max = res.initialMax || 100;
      const maxKey = 'max' + res.id.charAt(0).toUpperCase() + res.id.slice(1);
      baseState.stats[maxKey] = max;
      baseState.stats[res.id] = Math.min(max, res.initial || 100);
    }
  });

  // Auto-populate NPC data
  Object.values(registries.npcs).forEach((npc: any) => {
    if (npc.progKey && baseState.npcProgress[npc.progKey] === undefined) {
      baseState.npcProgress[npc.progKey] = 0;
    }
    if (npc.unlockedAtStart && !baseState.unlockedNPCs.includes(npc.id)) {
      baseState.unlockedNPCs.push(npc.id);
    }
  });

  return baseState;
};

const dynamicInitialState = buildInitialState();

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
  dialogue: createDialogueSystem(),
  pipeline: createPipelineSystem(),
  ellie: createEllieSystem(),
  viewManager: createViewManagerSystem(),
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

    store.ui.calculateScale(store);
    window.addEventListener('resize', () => store.ui.calculateScale(store));

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
    this.viewManager.startNewGame(this, buildInitialState);
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
    if (this.activeTasks[id]) return;
    const res = this.executeAction(id);
    if (res === false || (res && (res as any).success === false)) {
      if (el) {
        el.classList.add('btn-shake');
        setTimeout(() => el.classList.remove('btn-shake'), 400);
      }
    }
    return res;
  },
  toggleFocus(id: string) {
    const action = this.content.get(id, 'actions');
    if (this.activeFocus === id) {
      this.activeFocus = null;
      this.playSound('click');
    } else {
      this.activeFocus = id;
      this.playSound('magic');
      if (action && action.isLoopable) {
        this.executeAction(id);
      }
    }
  },
  npcExecute(id: string) {
    return this.npc.execute(this, id);
  },
  toggleFurniture(id: string) {
    const item = this.content.get(id, 'items');
    if (!item || item.category !== 'crafting') return;

    const isPlaced = this.placedItems.includes(id);

    if (isPlaced) {
      // Remove
      this.placedItems = this.placedItems.filter((i: string) => i !== id);
      this.playSound('click');
      this.addLog(this.t(item.title) + ' entfernt.', 'custom', 'var(--text-muted)');
    } else {
      // Place - Exclusive Rule: Only one bed at a time
      if (id.includes('bed')) {
        this.placedItems = this.placedItems.filter((i: string) => !i.includes('bed'));
      }

      const spaceRequired = item.spaceCost || 1;
      const currentSpace = this.ui.getUsedFurnitureSpace(this);
      const capacity = this.ui.getHomeCapacity(this);

      if (currentSpace + spaceRequired > capacity) {
        this.playSound('fail');
        this.ui.showToast(this.t('fail_furniture_space') || 'Nicht genug Platz!', 'error');
        return;
      }

      this.placedItems = [...this.placedItems, id];
      this.playSound('magic');
      this.addLog(this.t(item.title) + ' platziert.', 'custom', 'var(--accent-teal)');
    }
    this.saveGame();
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
    this.language = lang;
    this.saveGame();
  },
  hardReset() {
    this.viewManager.hardReset(this);
  },
  returnToMenu() {
    this.viewManager.returnToMenu(this);
  },

  applyCheats() {
    this.stats.energy = 9999;
    this.stats.maxEnergy = 9999;
    this.stats.magic = 9999;
    this.stats.maxMagic = 9999;
    this.stats.satiation = 9999;
    this.stats.maxSatiation = 9999;
    this.stats.shards = 99999;
    Object.keys(this.limits).forEach((k) => (this.limits[k] = 9999));
    Object.keys(this.resources).forEach((k) => (this.resources[k] = 9999));

    this.saveGame();
    this.ui.showToast('Resources & Stats maximized! (NPCs remain locked for testing)', 'success');
    this.settingsOpen = false;
  },

  t(key: string, context = 'ui', params = {}) {
    const data = this.translations[this.language][context]?.[key] || key;
    const finalParams: Record<string, any> = { player: this.playerName || 'Wandler', ...params };

    const replaceRecursive = (val: any): any => {
      if (typeof val === 'string') {
        let replaced = val;
        Object.entries(finalParams).forEach(([k, v]) => {
          replaced = replaced.replace(new RegExp(`{${k}}`, 'g'), v);
        });
        return replaced;
      } else if (typeof val === 'object' && val !== null) {
        const result: any = Array.isArray(val) ? [] : {};
        for (let k in val) {
          result[k] = replaceRecursive(val[k]);
        }
        return result;
      }
      return val;
    };

    return replaceRecursive(data);
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
  get energyPercent() {
    return this.ui.getStatPercent(this, 'energy');
  },
  get magicPercent() {
    return this.ui.getStatPercent(this, 'magic');
  },
  get satiationPercent() {
    return this.ui.getStatPercent(this, 'satiation');
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
    return this.unlockedNPCs.includes('npc-treeOfLife') && !this.demoCompleted;
  },

  get groupedHistory() {
    return this.story.getGroupedHistory(this);
  },
  get availableFurniture() {
    return this.discoveredItems.filter((id: string) => {
      const item = this.content.get(id, 'items');
      return item?.category === 'crafting' && !this.placedItems.includes(id);
    });
  },
  get placedFurnitureList() {
    return this.placedItems.filter((id: string) => {
      const item = this.content.get(id, 'items');
      return item?.category === 'crafting';
    });
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
      (store as any).settingsOpen = !(store as any).settingsOpen;
      if (!(store as any).settingsOpen && store.ui && store.ui.cleanupHover)
        store.ui.cleanupHover(store);
      store.playSound('click');
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
