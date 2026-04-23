import { 
  ResourceId, FlagId, ActionId, ItemId, HomeId, NPCId, ModifierId,
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

/**
 * CORE GAME STATE INTERFACE
 * Orchestrates all systems and data registries.
 */
export interface GameState {
  playerName: string;
  language: string;
  view: string;
  flags: Record<FlagId, any>;
  resources: Record<ResourceId, number>;
  limits: Record<ResourceId, number>;
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
  activeTasks: Record<string, any>;
  activeFocus: string | null;
  selectedItem: ItemId | null;
  hoveredAction: ActionDefinition | null;
  dialogueActive: boolean;
  showEllieIntro: boolean;
  ellieIntroSeen: boolean;
  prologueStep: number;
  hasSave: boolean;
  saveInfoText: string;
  saveCode: string;
  confirmModal: { open: boolean; message: string; onConfirm: (() => void) | null };
  demoCompleted: boolean;
  finalStats: any;
  dialogueNpcId: NPCId | null;
  dialogueText: string;
  dialogueTitle: string;
  dialogueChoices: Array<{ text: string; callback: () => void }>;
  dialogueWaiting: boolean;
  activeHome: HomeId | null;

  // Discovery & Progress
  discoveredResources: ResourceId[];
  discoveredItems: ItemId[];
  unlockedRecipes: string[];
  counters: Record<string, number>;
  currentObjective: string | null;

  // Systems & Content
  content: {
    get: <T = any>(id: string, type?: keyof Registries) => T;
    registries: Registries;
    getNPCActions: (store: GameState, npcId: NPCId) => ActionDefinition[];
    getCategorizedResources: (category: string) => ResourceDefinition[];
    getAll: <T = any>(type: keyof Registries) => Record<string, T>;
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
      amount?: number
    ) => boolean;
    add: (state: GameState, type: ResourceId | string, amountValue: number) => boolean;
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
      mode?: string
    ) => any;
    checkRequirement: (game: GameState, path: string, rule: any) => boolean;
    handleSuccess: (game: GameState, id: ActionId, action: ActionDefinition, result: any) => void;
    handleFailure: (game: GameState, id: ActionId, action: ActionDefinition) => void;
    effectHandlers: Record<string, (game: GameState, effect: any) => void>;
  };
  pipeline: {
    calculate: (state: GameState, key: string, baseValue: number) => number;
  };
  npc: {
    execute: (game: GameState, id: NPCId) => any;
    canAccessTreeOfLife: (game: GameState) => boolean;
  };
  item: {
    consumeItem: (store: GameState, id: ItemId) => void;
  };
  engine: {
    init: () => void;
    stop: () => void;
  };
  story: {
    recordStoryEntry: (
      game: GameState,
      id: string,
      action: ActionDefinition,
      dialogueText: string | null
    ) => void;
    getGroupedHistory: (game: GameState) => any;
  };
  persistence: {
    saveGame: (store: GameState, isManual?: boolean) => void;
    loadGame: (store: GameState) => boolean;
    saveSettings: (store: GameState) => void;
    loadSettings: (store: GameState) => boolean;
    exportGameData: () => string;
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
    init: (settings: any) => void;
    startMusic: () => void;
    playSFX: (id: string, volume?: number) => void;
  };
  background: {
    boot: (store: GameState) => void;
    updateBackground: (setName: string) => void;
  };
  ui: {
    calculateScale: (store: GameState) => void;
    handleMouseMove: (e: MouseEvent, store: GameState) => void;
    cleanupHover: (store: GameState) => void;
    getStatPercent: (store: GameState, stat: string) => number;
    getActionEffect: (store: GameState, action: ActionDefinition) => string;
    getTooltipCosts: (store: GameState, action: ActionDefinition) => any;
    showToast: (message: string, type: 'info' | 'error' | 'success') => void;
    getTaskProgress: (store: GameState, taskId: string) => number;
    getNPCProgressPercent: (store: GameState, npcId: NPCId) => number;
    getGatheringActions: (store: GameState) => ActionDefinition[];
    getAvailableLocations: (store: GameState) => string[];
    renderActionTitle: (store: GameState, actionId: string) => string;
  };
  viewManager: {
    startNewGame: (store: GameState, stateFactory: () => any) => void;
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
  i18n: {
    t: (store: GameState, key: string, context?: string, params?: any) => any;
  };

  // Infrastructure
  bus: {
    emit: (event: string, payload?: any) => void;
    on: (event: string, callback: (data: any) => void) => void;
  };
  EVENTS: Record<string, string>;

  // Helper Methods
  t: (key: string, context?: string, params?: any) => any;
  addLog: (id: string, context?: string, color?: string, params?: any) => void;
  playSound: (id: string) => void;
  saveGame: (isManual?: boolean) => void;
  executeAction: (id: string | ActionId) => boolean;
  isTaskActive: (id: string) => boolean;
  setHovered: (id: string | null, customData?: any) => void;

  // Viewport/Input
  lastMouseX: number;
  lastMouseY: number;
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
}
