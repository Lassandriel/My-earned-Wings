import { 
  ResourceId, FlagId, ActionId, ItemId, HomeId, NPCId, ModifierId, TitleId,
  GameModifier, MilestoneDefinition, NavigationDefinition 
} from './core/base';
import { ResourceDefinition, BuffDefinition } from './features/resources';
import { ItemDefinition, ActionDefinition } from './features/actions';
import { NPCDefinition } from './features/npcs';
import { HomeDefinition } from './features/homes';

export * from './core/base';
export * from './features/resources';
export * from './features/actions';
export * from './features/npcs';
export * from './features/homes';
export * from './stores';

/**
 * CORE GAME STATE INTERFACE
 * Orchestrates all systems and data registries.
 */
export interface GameState {
  init?: () => void;
  playerName: string;
  language: string;
  view: string;
  flags: Partial<Record<FlagId, boolean>>;
  resources: Partial<Record<ResourceId, number>>;
  limits: Partial<Record<ResourceId, number>>;
  stats: Record<string, number>;
  placedItems: ItemId[];
  npcProgress: Record<string, number>;
  activeBuffs: Record<
    string,
    {
      id: string;
      title: string;
      desc: string;
      remaining: number;
      total: number;
      modifiers?: GameModifier[];
    }
  >;
  unlockedNPCs: NPCId[];
  activeTasks: Record<string, {
    id?: string;
    actionId: string;
    remaining: number;
    total: number;
    duration?: number;
  }>;
  activeFocus: string | null;
  selectedItem: ItemId | null;
  dialogueActive: boolean;
  demoCompleted: boolean;
  finalStats: {
    shards: number;
    actions: number;
    npcs: number | string;
    items: number | string;
    energySpent: number;
  };
  dialogueNpcId: NPCId | null;
  dialogueText: string;
  dialogueTitle: string;
  dialogueChoices: Array<{ text: string; callback: () => void }>;
  dialogueWaiting: boolean;
  activeHome: HomeId | null;
  activeTitle: TitleId | null;

  // Discovery & Progress
  discoveredResources: ResourceId[];
  discoveredItems: ItemId[];
  unlockedRecipes: string[];
  discoveredTitles: TitleId[];
  counters: Record<string, number>;
  currentObjective: string | null;
  activeProducers: ActionId[];
  settingsOpen: boolean;
  currentScale: number;
  lastMouseX: number;
  lastMouseY: number;

  // Global State Extensions
  hasSave: boolean;
  prologueStep: number;
  saveInfoText: string;
  hoveredAction: any;
  craftingSubView: string;
  selectedStoryNpc: string;
  confirmModal: {
    open: boolean;
    message: string;
    onConfirm: (() => void) | null;
  };
  ellieIntroSeen: boolean;
  showEllieIntro: boolean;
  demoCompletedHintSeen: boolean;
  academy_path: string | null;
  translations: any;

  // Systems & Content
  content: {
    get: <T = any>(id: string, type?: any) => T;
    registries: Registries;
    getNPCActions: (store: GameState, npcId: NPCId) => ActionDefinition[];
    getCategorizedResources: (category: string) => ResourceDefinition[];
    getAll: <T = any>(type: any) => Record<string, T>;
  };
  currentLocation: string;
  RESOURCE_REGISTRY: Record<ResourceId, ResourceDefinition>;
  resource: {
    canAfford: (
      state: GameState,
      typeOrCosts: ResourceId | Record<string, number>,
      amount?: number
    ) => boolean;
    consume: (
      state: GameState,
      typeOrCosts: ResourceId | Record<string, number>,
      amount?: number,
      silent?: boolean
    ) => boolean;
    add: (state: GameState, type: ResourceId | string, amountValue: number, silent?: boolean) => boolean;
    isFull: (state: GameState, type: ResourceId) => boolean;
    getLimit: (state: GameState, type: ResourceId) => number;
    getMaxStat: (state: GameState, type: ResourceId) => number;
    getStatPercent: (state: GameState, stat: string) => number;
    getScaledCost: (state: GameState, type: ResourceId, baseAmount: number) => number;
  };
  actions: {
    execute: (game: GameState, id: ActionId) => boolean;
    attemptAction: (game: GameState, el: HTMLElement, id: ActionId) => boolean;
    toggleFocus: (game: GameState, id: ActionId) => void;
    processAction: (
      game: GameState,
      id: ActionId,
      actionValue: ActionDefinition,
      mode?: 'finalize' | 'start' | 'prepare' | 'full'
    ) => any;
    checkRequirement: (game: GameState, path: string, rule: any) => boolean;
    handleSuccess: (game: GameState, id: ActionId, action: ActionDefinition, result: any) => void;
    handleFailure: (game: GameState, id: ActionId, action: ActionDefinition) => void;
    effectHandlers: Record<string, (game: GameState, effect: any) => void>;
    rebuildProducers: (game: GameState) => void;
  };
  pipeline: {
    calculate: (state: GameState, key: string, baseValue: number) => number;
  };
  npc: {
    execute: (game: GameState, id: NPCId) => void;
    canAccessTreeOfLife: (game: GameState) => boolean;
  };
  item: {
    consumeItem: (store: GameState, id: ItemId) => void;
  };
  engine: {
    init: (store?: GameState) => void;
    stop: () => void;
  };
  bootstrapper: {
    buildInitialState: (baseState: Partial<GameState>) => GameState;
    bootSystems: (store: GameState) => void;
  };
  story: {
    recordStoryEntry: (
      game: GameState,
      id: string,
      action: any,
      dialogueText: string | null,
      context?: string
    ) => void;
    getGroupedHistory: (game: GameState) => Record<string, any[]>;
  };
  persistence: {
    saveGame: (store: GameState, isManual?: boolean) => void;
    loadGame: (store: GameState) => boolean;
    saveSettings: (store: GameState) => void;
    loadSettings: (store: GameState) => boolean;
    exportGameData: (store: GameState) => string;
    importGameData: (store: GameState, code: string) => boolean;
    doHardReset: (store: GameState) => void;
    boot: (store: GameState) => void;
  };
  logger: {
    boot: (store: GameState) => void;
  };
  juice: {
    boot: (store: GameState) => void;
  };
  prologue: {
    playIntro: (store: GameState) => void;
    advancePrologue: (store: GameState) => void;
    skipPrologue: (store: GameState) => void;
    boot: (store: GameState) => void;
  };
  ellie: {
    showIntro: (store: GameState) => void;
    boot: (store: GameState) => void;
  };
  dialogue: {
    queueDialogue: (game: GameState, npcId: NPCId, dialogueId: string) => void;
    clearDialogue: (game: GameState) => void;
  };
  audio: {
    init: (settings: GameState['settings']) => void;
    startMusic: () => void;
    playSFX: (id: string, volume?: number) => void;
  };
  background: {
    boot: (store: GameState) => void;
    updateBackground: (setName: string) => void;
  };
  preloader: {
    boot: (store: GameState) => void;
  };
  settings: {
    volumeGlobal: number;
    volumeMusic: number;
    volumeSfx: number;
    mute: boolean;
    showParticles: boolean;
    showJuice: boolean;
    uiScale: 'auto' | string;
    resolution: 'auto' | string;
    calculateScale?: (store: GameState) => void;
  };
  ui: {
    reposition: (x: number, y: number) => void;
    calculateScale: (store: GameState) => void;
    handleMouseMove: (e: MouseEvent, store: GameState) => void;
    cleanupHover: (store: GameState) => void;
    getStatPercent: (store: GameState, stat: string) => number;
    getActionEffect: (store: GameState, hAction: any) => string[];
    getTooltipCosts: (store: GameState, hAction: any) => any[];
    showToast: (message: string, type: 'info' | 'error' | 'success') => void;
    getTaskProgress: (store: GameState, taskId: string) => number;
    getNPCProgressPercent: (store: GameState, npcId: NPCId) => number;
    getGatheringActions: (store: GameState) => ActionDefinition[];
    getAvailableLocations: (store: GameState) => string[];
    renderActionTitle: (store: GameState, actionId: string) => string;
  };
  viewManager: {
    startNewGame: (store: GameState, stateFactory: () => GameState) => void;
    continueGame: (store: GameState) => void;
    finishPrologue: (store: GameState) => void;
    confirmName: (store: GameState, name: string) => void;
    resolveConfirm: (store: GameState, confirmed: boolean) => void;
    hardReset: (store: GameState) => void;
    returnToMenu: (store: GameState) => void;
    completeDemo: (store: GameState) => void;
    showConfirm: (store: GameState, message: string, onConfirm: () => void) => void;
  };
  settingsSystem: {
    calculateScale: (store: GameState) => void;
    setResolution: (store: GameState, res: string) => void;
    setLanguage: (store: GameState, lang: string) => void;
    toggleSettings: (store: GameState) => void;
    applyCheats: (store: GameState) => void;
  };
  housing: {
    toggleFurniture: (store: GameState, id: string) => void;
    getUsedFurnitureSpace: (store: GameState) => number;
    getHomeCapacity: (store: GameState) => number;
    getAvailableFurniture: (store: GameState) => string[];
    getPlacedFurnitureList: (store: GameState) => string[];
  };
  titles: {
    unlockTitle: (store: GameState, id: TitleId) => void;
    setActiveTitle: (store: GameState, id: TitleId | null) => void;
  };
  i18n: {
    t: (store: GameState, key: string, context?: string, params?: Record<string, any>) => string;
  };

  // Infrastructure
  bus: {
    emit: (event: string, payload?: any) => void;
    on: (event: string, callback: (data: any) => void) => void;
  };
  EVENTS: Record<string, string>;

  // Helper Methods
  t: (key: string, context?: string, params?: Record<string, any>) => string;
  addLog: (id: string, context?: string, color?: string | null, params?: Record<string, any>) => void;
  playSound: (id: string) => void;
  saveGame: (isManual?: boolean) => void;
  executeAction: (id: string | ActionId) => boolean;
  isTaskActive: (id: string) => boolean;
  setHovered: (id: string | null, customData?: any) => void;
  startNewGame: () => void;
  continueGame: () => void;
  finishPrologue: () => void;
  confirmName: (n: string) => void;
  resolveConfirm: (c: boolean) => void;
  attemptAction: (el: HTMLElement, id: string) => boolean;
  toggleFocus: (id: string) => void;
  npcExecute: (id: string) => void;
  toggleFurniture: (id: string) => void;
  consumeItem: (id: string) => void;
  setActiveTitle: (id: string | null) => void;
  loadGame: () => boolean;
  setLanguage: (l: string) => void;
  hardReset: () => void;
  returnToMenu: () => void;
  applyCheats: () => void;
  completeDemo: () => void;
  getActionEffect: (h: any) => string[];
  getTooltipCosts: (h: any) => any[];
  getUsedFurnitureSpace: () => number;
  getHomeCapacity: () => number;
  energyPercent: number;
  magicPercent: number;
  satiationPercent: number;
  maxEnergy: number;
  maxMagic: number;
  maxSatiation: number;
  getMaxStat: (id: string) => number;
  getLimit: (id: string) => number;
  canAccessTreeOfLife: boolean;
  groupedHistory: Record<string, any[]>;
  availableFurniture: string[];
  placedFurnitureList: string[];
  settingsSystemInstance: any; // Internal reference
}


// Performance Store (Managed by Engine)
export interface PerfStore {
  lastTickMs: number;
  lastTaskMs: number;
  fps: number;
}

export interface Registries {
  actions: Record<ActionId, ActionDefinition>;
  items: Record<ItemId, ItemDefinition>;
  npcs: Record<NPCId, NPCDefinition>;
  resources: Record<ResourceId, ResourceDefinition>;
  buffs: Record<string, BuffDefinition>;
  milestones: Record<string, MilestoneDefinition>;
  navigation: Record<string, NavigationDefinition>;
  homes: Record<HomeId, HomeDefinition>;
  modifiers: Record<ModifierId, import('./core/base').ModifierDefinition>;
  titles: Record<TitleId, import('./core/base').TitleDefinition>;
}
