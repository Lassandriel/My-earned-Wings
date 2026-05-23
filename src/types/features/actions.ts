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
  /**
   * Item bucket. Base ships 'tools' | 'items' | 'furniture' | 'addon' |
   * 'food' | 'lore' (used for inventory grouping + a couple of
   * `=== 'furniture'` placement checks). Loosened to `string` so
   * addons can declare their own categories (e.g. 'reagent',
   * 'scroll') without lying to the compiler. Renderers iterate by
   * specific value; unknown categories just don't match any base
   * grouping and quietly land in the inventory's default bucket.
   */
  category: string;
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
  /**
   * Optional keyboard binding. Matches against KeyboardEvent.key OR
   * KeyboardEvent.code so authors can pick whichever feels natural
   * — examples: "F4", "KeyB", "Digit5", "ArrowUp". The input handler
   * builds a single lookup table at first keydown so dispatch is
   * O(1) per keypress. Addons add hotkeys by just dropping this
   * field into their action YAML; base game's F1/F2/F3 stay on the
   * PRIMARY_ACTIONS constant so the top action bar can render them
   * from a known order.
   */
  hotkey?: string;
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
