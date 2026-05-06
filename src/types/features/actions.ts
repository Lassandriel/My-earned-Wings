import { ActionId, ItemId, ResourceId, GameModifier, GameEffect, GameRequirement, NPCId } from '../core/base';

/**
 * Action & Item Definitions
 */

export interface ItemDefinition {
  id: ItemId;
  title: string;
  desc: string;
  image?: string;
  consumable: boolean;
  category: 'tools' | 'items' | 'furniture' | 'addon' | 'food' | 'lore';
  effect?: Partial<Record<ResourceId, number>> | string;
  onSuccess?: GameEffect[];
  modifiers?: GameModifier[];
  spaceCost?: number;
  cost?: number | Partial<Record<ResourceId, number>> | string;
  sfx?: string;
}

export interface NPCStep {
  cost?: number;
  costType?: ResourceId;
  costs?: Partial<Record<ResourceId, number>>;
  reward?: ItemId | string;
  dialogueKey?: string;
  onSuccess?: GameEffect[];
  requirements?: Record<string, any | GameRequirement>;
}

export interface ActionResult {
  success: boolean;
  yield?: number;
  logKey?: string;
  logColor?: string;
  logGain?: number | null;
  logParams?: Record<string, unknown>;
  processed?: boolean;
  effects?: GameEffect[];
}

export interface ActionDefinition {
  id: ActionId;
  category: string;
  title?: string;
  desc?: string;
  isStory?: boolean;
  chapter?: string;
  requirements?: Record<string, any | GameRequirement>;
  cost?: number;
  costType?: ResourceId | 'mixed' | 'none';
  costs?: Partial<Record<ResourceId, number>>;
  satiationCost?: number;
  image?: string;
  sfx?: string;
  particleText?: string;
  particleType?: string;
  onSuccess?: GameEffect[];
  onFailure?: GameEffect[];
  logKey?: string;
  logColor?: string;
  rewards?: Partial<Record<ResourceId, number | string>>;
  yieldType?: ResourceId;
  modifiers?: GameModifier[];
  steps?: NPCStep[];
  isLoopable?: boolean;
  locationId?: string;
  duration?: number;
  maxCount?: number;
  maxProgress?: number;
  progKey?: string;
  npcId?: NPCId;
  icon?: string;
  journalIcon?: string;
  journalColor?: string;
  counter?: string;
  execute?: (state: any) => any;
  passiveProduction?: {
    id: string;
    resource: ResourceId;
    interval: number;
    baseYield: number;
    magicCost?: number;
    requirements?: Record<string, any | GameRequirement>;
  };
}
