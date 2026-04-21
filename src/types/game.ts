/**
 * CORE 3.5 TYPES - Draconia
 * Unified interfaces for the data-driven architecture.
 */

export type ResourceId =
  | 'energy'
  | 'magic'
  | 'satiation'
  | 'wood'
  | 'stone'
  | 'shards'
  | 'herbs'
  | 'astral_shards'
  | 'meat'
  | 'water'
  | 'gourmet-meal'
  | 'books'
  | 'focus'
  | 'knowledge';
export type FlagId =
  | 'build-campfire'
  | 'build-tent'
  | 'build-house'
  | 'build-wood-storage'
  | 'build-stone-storage'
  | 'build-table'
  | 'build-kitchen'
  | 'build-arcane-sanctum'
  | 'build-garden'
  | 'build-garden-upgrade'
  | 'milestone-treeOfLife';
export type ActionId = string; // Too many to list, kept as string/alias for now
export type ItemId =
  | 'item-walking-stick'
  | 'item-axe'
  | 'item-pickaxe'
  | 'item-bow'
  | 'item-bed'
  | 'item-chair'
  | 'item-stove'
  | 'item-bookshelf'
  | 'item-cabinet'
  | 'item-spice-rack'
  | 'item-grand-table'
  | 'item-bread'
  | 'item-cookie'
  | 'item-dried-meat'
  | 'item-gourmet-meal'
  | 'item-deed'
  | 'item-book-knowledge'
  | 'item-scroll'
  | 'item-whetstone'
  | 'item-arrowhead'
  | 'item-chisel'
  | 'item-astral-shards'
  | 'item-dream-dust'
  | 'item-wyvern-scale'
  | 'item-arcane-dust'
  | 'item-crystal-mana'
  | 'item-bed-2'
  | 'item-stove-2';
export type NPCId =
  | 'npc-baker'
  | 'npc-flowerGirl'
  | 'npc-artisan'
  | 'npc-teacher'
  | 'npc-townHall'
  | 'npc-blacksmith'
  | 'npc-sage'
  | 'npc-hunter'
  | 'npc-treeOfLife'
  | 'npc-ellie'
  | 'npc-aris';

export interface ResourceDefinition {
  id: ResourceId;
  type: 'resource' | 'stat';
  category: string;
  color: string;
  initial?: number;
  initialMax?: number;
  initialLimit?: number;
  isEssential?: boolean;
  wingSlot?: string;
  scalesWithSatiation?: boolean;
}

export interface GameModifier {
  key?: string;
  add?: number;
  mult?: number;
}

export interface ItemDefinition {
  id: ItemId;
  title: string;
  desc: string;
  image?: string;
  consumable: boolean;
  category: 'tools' | 'provisions' | 'artifacts';
  effect?: Partial<Record<ResourceId, number>>;
  modifiers?: GameModifier[];
}

export type RequirementOperator = '>=' | '<=' | '>' | '<' | '!=' | 'includes' | 'not_includes';

export interface GameRequirement {
  op?: RequirementOperator;
  val: any;
}

export interface NPCStep {
  cost?: number;
  costType?: ResourceId;
  costs?: Record<ResourceId, number>;
  reward?: ItemId | string;
  dialogueKey?: string;
  onSuccess?: GameEffect[];
}

export type GameEffect =
  | { type: 'setFlag'; flag: FlagId; value: any }
  | { type: 'unlockNPC'; id: NPCId }
  | { type: 'unlockRecipe'; id: string }
  | { type: 'unlockItem'; id: ItemId }
  | { type: 'modifyLimit'; resource: ResourceId; amount: number }
  | { type: 'addBuff'; buffId: string; override?: Partial<BuffDefinition> }
  | { type: 'setObjective'; id: string }
  | { type: 'playSound'; id: string }
  | { type: 'log'; logKey: string; color?: string; params?: any }
  | { type: 'modifyResource'; resource: ResourceId; amount: number };

export interface ActionDefinition {
  id: ActionId;
  category: string;
  title?: string; // Optional if handled via i18n keys
  desc?: string;
  isStory?: boolean;
  chapter?: string;
  requirements?: Record<string, any | GameRequirement>;
  cost?: number;
  costType?: ResourceId | 'mixed' | 'none';
  costs?: Record<ResourceId, number>;
  satiationCost?: number;
  image?: string;
  sfx?: string;
  particleText?: string;
  particleType?: string;
  onSuccess?: GameEffect[];
  onFailure?: GameEffect[];
  logKey?: string;
  logColor?: string;
  rewards?: Record<ResourceId, number | string>;
  yieldType?: ResourceId;
  modifiers?: GameModifier[];
  steps?: NPCStep[];
  isLoopable?: boolean;
  duration?: number;
  maxCount?: number;
  maxProgress?: number;
  progKey?: string;
  npcId?: NPCId;
  counter?: string;
  passiveProduction?: {
    id: string;
    resource: ResourceId;
    interval: number;
    baseYield: number;
    magicCost?: number;
    requirements?: Record<string, any | GameRequirement>;
  };
}

export interface GameState {
  playerName: string;
  language: string;
  view: string;
  flags: Record<FlagId, any>;
  resources: Record<ResourceId, number>;
  limits: Record<ResourceId, number>;
  stats: Record<string, number>;
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
  };
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
  };
  actions: {
    execute: (game: GameState, id: ActionId) => boolean;
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
    execute: (game: GameState, id: NPCId) => boolean;
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
  ui: {
    calculateScale: (store: GameState) => void;
    handleMouseMove: (e: MouseEvent, store: GameState) => void;
    cleanupHover: (store: GameState) => void;
    getStatPercent: (store: GameState, stat: string) => number;
    getActionEffect: (store: GameState, action: ActionDefinition) => string;
    getTooltipCosts: (store: GameState, action: ActionDefinition) => any;
    showToast: (message: string, type: 'info' | 'error' | 'success') => void;
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

  // Viewport/Input
  lastMouseX: number;
  lastMouseY: number;
}

export interface BuffDefinition {
  id: string;
  title: string;
  desc: string;
  duration: number; // in seconds
  modifiers?: GameModifier[];
}

export interface NPCDefinition {
  id: NPCId;
  nameKey: string;
  icon: string;
  color: string;
  image?: string;
  progKey: string;
  maxProgress: number;
  chapter: string;
  unlockedAtStart?: boolean;
  tradeActions?: Array<{
    id: ActionId;
    minProgress: number;
  }>;
}

export interface MilestoneDefinition {
  id: string;
  requirements: Record<string, any | GameRequirement>;
  onUnlock?: GameEffect[];
}

export interface NavigationDefinition {
  id: string;
  icon: string;
  label: string;
}

export interface Registries {
  actions: Record<ActionId, ActionDefinition>;
  items: Record<ItemId, ItemDefinition>;
  npcs: Record<NPCId, NPCDefinition>;
  resources: Record<ResourceId, ResourceDefinition>;
  buffs: Record<string, BuffDefinition>;
  milestones: Record<string, MilestoneDefinition>;
  navigation: Record<string, NavigationDefinition>;
}
