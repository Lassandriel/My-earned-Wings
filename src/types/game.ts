/**
 * CORE 3.5 TYPES - Draconia
 * Unified interfaces for the data-driven architecture.
 */

export type ResourceId = string;
export type FlagId = string;
export type ActionId = string;
export type ItemId = string;
export type NPCId = string;

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
    effect?: Record<ResourceId, number>;
    modifiers?: GameModifier[];
}

export type RequirementOperator = '>=' | '<=' | '>' | '<' | '!=' | 'includes' | 'not_includes';

export interface GameRequirement {
    op?: RequirementOperator;
    val: any;
}

export interface GameEffect {
    type: 'setFlag' | 'unlockNPC' | 'unlockRecipe' | 'unlockItem' | 'modifyLimit' | 'addBuff' | 'setObjective' | 'playSound' | 'log' | 'modifyResource';
    flag?: FlagId;
    value?: any;
    id?: string;
    resource?: ResourceId;
    amount?: number;
    buffId?: string;
    override?: any;
    color?: string;
}

export interface NPCStep {
    cost?: number;
    costType?: ResourceId;
    costs?: Record<ResourceId, number>;
    reward?: ItemId | string;
    dialogueKey?: string;
    onSuccess?: GameEffect[];
}

export interface ActionDefinition {
    id: ActionId;
    category: string;
    isStory?: boolean;
    chapter?: string;
    requirements?: Record<string, any | GameRequirement>;
    cost?: number;
    costType?: ResourceId | 'mixed' | 'none';
    costs?: Record<ResourceId, number>;
    image?: string;
    sfx?: string;
    particleText?: string;
    particleType?: string;
    onSuccess?: GameEffect[];
    logKey?: string;
    logColor?: string;
    rewards?: Record<ResourceId, number | string>;
    modifiers?: GameModifier[];
    steps?: NPCStep[];
    isLoopable?: boolean;
    duration?: number;
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
    activeBuffs: Record<string, any>;
    unlockedNPCs: NPCId[];
    activeTasks: Record<string, any>;
    activeFocus: string | null;
    selectedItem: ItemId | null;
    hoveredAction: any | null;
    dialogueActive: boolean;
    showEllieIntro: boolean;
    prologueStep: number;
    hasSave: boolean;
    saveInfoText: string;
    saveCode: string;
    confirmModal: { open: boolean; message: string; onConfirm: (() => void) | null };
    demoCompleted: boolean;
    finalStats: any;
    dialogueNpcId: string | null;
    dialogueText: string;
    dialogueTitle: string;
    dialogueChoices: Array<{ text: string, callback: () => void }>;
    dialogueWaiting: boolean;
    
    // Discovery & Progress
    discoveredResources: ResourceId[];
    discoveredItems: ItemId[];
    unlockedRecipes: string[];
    counters: Record<string, number>;
    currentObjective: string | null;
    
    // Systems & Content
    content: {
        get: (id: string, type?: string) => any;
        registries: Record<string, any>;
    };
    RESOURCE_REGISTRY: Record<ResourceId, ResourceDefinition>;
    resource: {
        canAfford: (state: GameState, typeOrCosts: string | Record<string, number>, amount?: number) => boolean;
        consume: (state: GameState, typeOrCosts: string | Record<string, number>, amount?: number) => boolean;
        add: (state: GameState, type: string, amountValue: number) => boolean;
        isFull: (state: GameState, type: string) => boolean;
    };
    actions: {
        execute: (game: GameState, id: string) => boolean;
        processAction: (game: GameState, id: string, actionValue: any, mode?: string) => any;
        checkRequirement: (game: GameState, path: string, rule: any) => boolean;
        handleSuccess: (game: GameState, id: string, action: any, result: any) => void;
        handleFailure: (game: GameState, id: string, action: any) => void;
        effectHandlers: Record<string, (game: GameState, effect: any) => void>;
    };
    pipeline: {
        calculate: (state: GameState, key: string, baseValue: number) => number;
    };
    npc: {
        execute: (game: GameState, id: string) => boolean;
    };
    item: {
        consumeItem: (store: GameState, id: ItemId) => void;
    };
    engine: {
        init: () => void;
        stop: () => void;
    };
    story: {
        recordStoryEntry: (game: GameState, id: string, action: any, dialogueText: string | null) => void;
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
        queueDialogue: (game: GameState, npcId: string, dialogueId: string) => void;
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
        getActionEffect: (store: GameState, action: any) => string;
        getTooltipCosts: (store: GameState, action: any) => any;
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
    executeAction: (id: string) => boolean;

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
