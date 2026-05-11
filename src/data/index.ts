import { itemDb } from '../features/crafting/items.data';
import { NPC_REGISTRY } from '../features/village/village.data';
import { vandaraNPCs, vandaraActions } from '../features/vandara/vandara.data';
import { BUFF_REGISTRY } from './definitions/buffs';
import { MILESTONE_REGISTRY } from '../features/story/story.data';
import { NAVIGATION_REGISTRY } from './definitions/navigation';
import { HOME_REGISTRY } from '../features/housing/housing.data';
import { TITLE_REGISTRY } from './definitions/titles';
import { schoolActions } from '../features/school/school.data';
import { loreActions } from './actions/lore';
import { npcActions } from './actions/npcs';
import { Registries } from '../types/game';

// --- Phase 1: Auto-generated from YAML content files ---
// Run `npm run build:content` to regenerate after editing content/*.yaml
import {
  RESOURCE_REGISTRY_GENERATED,
  MODIFIER_REGISTRY_GENERATED,
  ACTION_REGISTRY_GENERATED,
} from '../generated/content';

/**
 * Organized registries for the ContentService - TypeScript Edition
 * Resources, Modifiers and most Actions are now loaded from YAML (see content/).
 * NPCs, Items, Homes, Buffs, Milestones, Navigation, Titles remain in TypeScript
 * until they are migrated in subsequent phases.
 */
export const registries: Registries = {
  // YAML-generated (Phase 1)
  resources: RESOURCE_REGISTRY_GENERATED,
  modifiers: MODIFIER_REGISTRY_GENERATED,
  actions: {
    ...ACTION_REGISTRY_GENERATED,
    // TypeScript-only: custom execute handlers & complex story actions
    ...vandaraActions,
    ...schoolActions,
    ...loreActions,
    ...npcActions,
  },
  // Still TypeScript (to be migrated in later phases)
  items: itemDb,
  npcs: { ...NPC_REGISTRY, ...vandaraNPCs },
  buffs: BUFF_REGISTRY,
  milestones: MILESTONE_REGISTRY,
  navigation: NAVIGATION_REGISTRY,
  homes: HOME_REGISTRY,
  titles: TITLE_REGISTRY,
};

export { itemDb, NPC_REGISTRY, RESOURCE_REGISTRY_GENERATED as RESOURCE_REGISTRY, BUFF_REGISTRY };

