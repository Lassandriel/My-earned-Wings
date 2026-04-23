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
  category: 'tools' | 'items' | 'crafting' | 'furniture';
  effect?: Partial<Record<ResourceId, number>>;
  modifiers?: GameModifier[];
  spaceCost?: number;
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
  title?: string;
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
  locationId?: string;
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
