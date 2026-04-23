import { actionDb } from './actions/index';
import { itemDb } from '../features/crafting/items.data';
import { NPC_REGISTRY } from '../features/village/village.data';
import { RESOURCE_REGISTRY } from './definitions/resources';
import { BUFF_REGISTRY } from './definitions/buffs';
import { MILESTONE_REGISTRY } from '../features/story/story.data';
import { NAVIGATION_REGISTRY } from './definitions/navigation';
import { HOME_REGISTRY } from '../features/housing/housing.data';
import { MODIFIER_REGISTRY } from './definitions/modifiers';
import { Registries } from '../types/game';

/**
 * Organized registries for the ContentService - TypeScript Edition
 */
export const registries: Registries = {
  actions: actionDb,
  items: itemDb,
  npcs: NPC_REGISTRY,
  resources: RESOURCE_REGISTRY,
  buffs: BUFF_REGISTRY,
  milestones: MILESTONE_REGISTRY,
  navigation: NAVIGATION_REGISTRY,
  homes: HOME_REGISTRY,
  modifiers: MODIFIER_REGISTRY,
};

export { actionDb, itemDb, NPC_REGISTRY, RESOURCE_REGISTRY, BUFF_REGISTRY };
