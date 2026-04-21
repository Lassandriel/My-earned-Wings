import { actionDb } from './actions/index';
import { itemDb } from './definitions/items';
import { NPC_REGISTRY } from './definitions/npcs';
import { RESOURCE_REGISTRY } from './definitions/resources';
import { BUFF_REGISTRY } from './definitions/buffs';
import { MILESTONE_REGISTRY } from './definitions/milestones';
import { NAVIGATION_REGISTRY } from './definitions/navigation';
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
};

export { actionDb, itemDb, NPC_REGISTRY, RESOURCE_REGISTRY, BUFF_REGISTRY };
