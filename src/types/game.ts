import { 
  ResourceId, FlagId, ActionId, ItemId, HomeId, NPCId, ModifierId, TitleId,
  GameModifier, MilestoneDefinition, NavigationDefinition
} from './core/base';
import { ResourceDefinition, BuffDefinition } from './features/resources';
import { ItemDefinition, ActionDefinition, ActionResult } from './features/actions';
import { NPCDefinition } from './features/npcs';
import { HomeDefinition } from './features/homes';
import { EventBus, GAME_EVENTS } from '../core/events/bus';
import { CommandQueue } from '../engine/commands';
import { Translations, TranslationParams } from './i18n';

export * from './core/base';
export * from './features/resources';
export * from './features/actions';
export * from './features/npcs';
export * from './features/homes';
export * from './stores';
export * from './i18n';

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
  upgrades: string[];
  discoveredResources: ResourceId[];
  discoveredItems: ItemId[];
  unlockedRecipes: string[];
  discoveredTitles: TitleId[];
  counters: Record<string, number>;
  currentObjective: string | null;
  activeProducers: ActionId[];
  collectionHistory: StoryHistoryEntry[];
  saveCode: string;
  settingsOpen: boolean;
  currentScale: number;
  lastMouseX: number;
  lastMouseY: number;
  isFullscreen: boolean;
  sidebarCollapsed: boolean;

  // Global State Extensions
  hasSave: boolean;
  prologueStep: number;
  saveInfoText: string;
  hoveredAction: HoverActionData | null;
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
  translations: Translations;

  // Systems & Content
  commands: CommandQueue;
  content: ContentService;
  currentLocation: string;
  /**
   * Active sub-tab for the Main view. 'general' = default (the
   * pre-existing Main content). 'herstellen' = kitchen + workshop
   * + future production stations. Mirrors the Orte view's
   * currentLocation pattern.
   */
  currentMainSubTab: string;
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
    invalidateCache: () => void;
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
    ) => ActionResult;
    checkRequirement: (game: GameState, path: string, rule: boolean | number | string | string[] | { op?: string; val: unknown }) => boolean;
    handleSuccess: (game: GameState, id: ActionId, action: ActionDefinition, result: ActionResult) => void;
    handleFailure: (game: GameState, id: ActionId, action: ActionDefinition) => void;
    effectHandlers: Record<string, (game: GameState, effect: { type: string; [key: string]: unknown }) => void>;
    rebuildProducers: (game: GameState) => void;
  };
  pipeline: {
    calculate: (state: GameState, key: string, baseValue: number) => number;
    invalidateCache: () => void;
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
    getGroupedHistory: (store: GameState) => Record<string, StoryHistoryEntry[]>;
  };
  collection: {
    recordCollectionEntry: (
      game: GameState,
      id: string,
      action: ActionDefinition | null,
      dialogueText: string | null,
      context?: string
    ) => void;
    getGroupedHistory: (game: GameState) => Record<string, StoryHistoryEntry[]>;
  };
  persistence: {
    saveGame: (store: GameState, isManual?: boolean) => void;
    loadGame: (store: GameState) => Promise<boolean>;
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
    preloadBackgroundSet: (setName: string, layers: number) => Promise<void>;
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
    reposition: (x: number, y: number, force?: boolean) => void;
    calculateScale: (store: GameState) => void;
    handleMouseMove: (e: MouseEvent, store: GameState) => void;
    cleanupHover: (store: GameState) => void;
    getStatPercent: (store: GameState, stat: string) => number;
    getActionEffect: (store: GameState, hAction: HoverActionData) => string[];
    getTooltipCosts: (store: GameState, hAction: HoverActionData) => TooltipCost[];
    getRequirements: (store: GameState, hAction: HoverActionData) => string[];
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
    t: (store: GameState, key: string, context?: string, params?: Record<string, any>) => any;
  };

  // Infrastructure
  bus: EventBus;
  EVENTS: typeof GAME_EVENTS;

  // Helper Methods
  t: (key: string, context?: string, params?: Record<string, any>) => any;
  addLog: (id: string, context?: string, color?: string | null, params?: TranslationParams) => void;
  playSound: (id: string) => void;
  saveGame: (isManual?: boolean) => void;
  exportGameData: () => string;
  quit: () => void;
  executeAction: (id: string | ActionId) => boolean;
  bootstrap: () => void;
  isTaskActive: (id: string) => boolean;
  setHovered: (id: string | null, customData?: HoverActionData) => void;
  helpHover: (titleKey: string, descKey: string, hoverId?: string) => void;
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
  loadGame: () => Promise<boolean>;
  setLanguage: (l: string) => void;
  hardReset: () => void;
  returnToMenu: () => void;
  applyCheats: () => void;
  completeDemo: () => void;
  getActionEffect: (h: HoverActionData) => string[];
  getTooltipCosts: (h: HoverActionData) => TooltipCost[];
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
  groupedHistory: Record<string, StoryHistoryEntry[]>;
  availableFurniture: string[];
  placedFurnitureList: string[];
  settingsSystemInstance: SettingsSystem | null; // Internal reference
}

/** Data structure for hovered action tooltip */
export interface HoverActionData {
  id: string;
  data?: ActionDefinition;
  [key: string]: unknown;
}

/** Cost entry for tooltips */
export interface TooltipCost {
  resource: string;
  label: string;
  value: string;
  amount: number;
  affordable: boolean;
  status?: string;
  display?: string;
}

/** Story history entry */
export interface StoryHistoryEntry {
  id: string;
  timestamp: number;
  text: string;
  context?: string;
  npcId?: string | null;
  chapter?: string;
}

/** Settings system reference interface */
export interface SettingsSystem {
  calculateScale: (store: GameState) => void;
  setResolution: (store: GameState, res: string) => void;
  setLanguage: (store: GameState, lang: string) => void;
  toggleSettings: (store: GameState) => void;
  applyCheats: (store: GameState) => void;
}


// Performance Store (Managed by Engine)
export interface PerfStore {
  lastTickMs: number;
  lastTaskMs: number;
  fps: number;
}

/** Content Service Interface */
export interface ContentService {
  registries: Registries;
  cache: {
    categories: Record<string, unknown[]>;
    npcActions: Record<string, unknown[]>;
  };
  getAll<T>(type: keyof Registries): Record<string, T>;
  get<T = any>(id: string, type?: keyof Registries | null, silent?: boolean): T | null;
  getCategorizedResources(category: string): ResourceDefinition[];
  getNPCActions(store: GameState, npcId: NPCId): ActionDefinition[];
  detectType(id: string): keyof Registries | null;
  validate(store: GameState): boolean;
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
  /**
   * UI layout primitive — see Main view. Each entry tells the Main
   * view to render a card-list for a given action-category, in a
   * given sub-tab, optionally gated by a flag. Lets addons add
   * production stations / lore corners / etc. without touching base
   * view markup. Schema:
   *   { id, subTab, headerLabel, actionCategory, requiresFlag? }
   */
  sections: Record<string, any>;
  /**
   * UI layout primitive — declares the sub-tab options available
   * for a parent view (e.g. Main). The Main view iterates this
   * registry to render its sub-tab strip, so addons can add new
   * sub-tabs ("Kampf", "Reisen", …) by shipping a YAML entry.
   * Schema:
   *   { id, parentView, labelKey,
   *     alwaysShown?, requiresFlag?, order? }
   * - `alwaysShown` overrides all other gating
   * - `requiresFlag` shows when that flag is true
   * - otherwise: shown iff at least one section pointing at this
   *   sub-tab (`section.subTab === this.id`) is currently active
   * - `order` defaults to 100 (display order, ascending)
   */
  subTabs: Record<string, any>;
  /**
   * UI layout primitive — declares the tabs in the Settings modal's
   * sidebar. Base ships its 5 tabs (general/controls/audio/graphics/
   * system) as YAML; addons add their own by dropping a YAML entry
   * and filling the `settings-content` slot with a wrapper
   * `<div x-show="settingsTab === '<id>'">…</div>`. Schema:
   *   { id, icon, labelKey, order, requiresFlag? }
   * - `requiresFlag` (optional) — only shown when that GameState
   *   flag is truthy. Lets addons gate their Settings tab on
   *   progression / opt-in.
   * - `order` (number, ascending) controls sidebar position.
   */
  settingsTabs: Record<string, any>;
}
