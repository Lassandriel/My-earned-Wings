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
    content: {
        get: (id: string, type?: string) => any;
        registries: Record<string, any>;
    };
}
