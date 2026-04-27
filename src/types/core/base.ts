/**
 * CORE TYPES - Draconia
 * Basic identifiers and shared utility types.
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
  | 'ghostwood'
  | 'glowpollen'
  | 'fibers'
  | 'resin'
  | 'iron_parts'
  | 'clay'
  | 'meat'
  | 'water'
  | 'flowers'
  | 'gourmet-meal'
  | 'books'
  | 'knowledge'
  | 'focus'
  | 'wood_yield'
  | 'stone_yield'
  | 'flowers_yield'
  | 'fibers_yield'
  | 'clay_yield'
  | 'ghostwood_yield'
  | 'glowpollen_yield'
  | 'rest_energy_gain'
  | 'eat_satiation_gain'
  | 'garden_magic_cost'
  | 'magic_regen_passive'
  | 'study_efficiency';

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
  | 'milestone-treeOfLife'
  | 'unlocked-mine'
  | 'unlocked-glade'
  | 'unlocked-whispering-grove'
  | 'ability-arcane-focus'
  | 'item-axe'
  | 'item-pickaxe'
  | 'item-bow'
  | 'build-loom'
  | 'build-bookshelf-large'
  | 'build-desk'
  | 'build-cart-reinforced'
  | 'build-mana-basin'
  | 'build-terrace'
  | 'blueprint-garden'
  | 'blueprint-home-lake'
  | 'blueprint-home-tower';

export type ActionId = string;
export type ItemId = string; 
export type HomeId = 'home-tent' | 'home-house' | 'home-lake' | 'home-tower';
export type NPCId = string;
export type ModifierId = string;

export interface ModifierDefinition {
  id: ModifierId;
  title: string;
  desc: string;
  baseValue?: number;
}

export type RequirementOperator = '>=' | '<=' | '>' | '<' | '!=' | 'includes' | 'not_includes';

export interface GameRequirement {
  op?: RequirementOperator;
  val: any;
}

export interface GameModifier {
  key?: string;
  add?: number;
  mult?: number;
}

export interface NavigationDefinition {
  id: string;
  icon: string;
  label: string;
  requiredFlag?: FlagId;
}

export type GameEffect =
  | { type: 'setFlag'; flag: FlagId; value: any }
  | { type: 'unlockNPC'; id: NPCId }
  | { type: 'unlockRecipe'; id: string }
  | { type: 'unlockItem'; id: ItemId }
  | { type: 'modifyLimit'; resource: ResourceId; amount: number }
  | { type: 'addBuff'; buffId: string; override?: any }
  | { type: 'setObjective'; id: string }
  | { type: 'playSound'; id: string }
  | { type: 'log'; logKey: string; color?: string; params?: any }
  | { type: 'modifyResource'; resource: ResourceId; amount: number }
  | { type: 'setHome'; id: HomeId };

export interface MilestoneDefinition {
  id: string;
  icon?: string;
  requirements: Record<string, any | GameRequirement>;
  onUnlock?: GameEffect[];
}

declare global {
  interface Window {
    electronAPI?: {
      saveGame: (data: string) => Promise<boolean>;
      loadGame: () => Promise<string | null>;
      quitApp: () => void;
      resizeWindow: (width: number, height: number) => void;
    };
  }
}
