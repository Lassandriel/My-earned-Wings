// Phase 1.5 — All content is YAML-generated.
// Actions that need bespoke logic declare `customExecute: <name>` in YAML and
// the handler lives in src/data/actions/custom-handlers.ts.
import { Registries } from '../types/game';

// --- Phase 1 + 1.5: Auto-generated from YAML content files ---
// Run `npm run build:content` to regenerate after editing content/*.yaml
import {
  RESOURCE_REGISTRY_GENERATED,
  MODIFIER_REGISTRY_GENERATED,
  ACTION_REGISTRY_GENERATED,
  ITEM_REGISTRY_GENERATED,
  NPC_REGISTRY_GENERATED,
  BUFF_REGISTRY_GENERATED,
  HOME_REGISTRY_GENERATED,
  MILESTONE_REGISTRY_GENERATED,
  NAVIGATION_REGISTRY_GENERATED,
  TITLE_REGISTRY_GENERATED,
  SECTION_REGISTRY_GENERATED,
  SUB_TAB_REGISTRY_GENERATED,
} from '../generated/content';

/**
 * Organized registries for the ContentService - YAML Edition
 * All content categories are now loaded from content/**\/*.yaml.
 * Only TS-side execute() handlers remain in TypeScript (lore/npc actions).
 */
export const registries: Registries = {
  // YAML-generated
  resources: RESOURCE_REGISTRY_GENERATED,
  modifiers: MODIFIER_REGISTRY_GENERATED,
  items: ITEM_REGISTRY_GENERATED,
  npcs: NPC_REGISTRY_GENERATED,
  buffs: BUFF_REGISTRY_GENERATED,
  milestones: MILESTONE_REGISTRY_GENERATED,
  navigation: NAVIGATION_REGISTRY_GENERATED,
  homes: HOME_REGISTRY_GENERATED,
  titles: TITLE_REGISTRY_GENERATED,
  actions: ACTION_REGISTRY_GENERATED,
  sections: SECTION_REGISTRY_GENERATED,
  subTabs: SUB_TAB_REGISTRY_GENERATED,
};

// Legacy re-exports — kept until callers stop reading from this module directly.
export {
  ITEM_REGISTRY_GENERATED as itemDb,
  NPC_REGISTRY_GENERATED as NPC_REGISTRY,
  RESOURCE_REGISTRY_GENERATED as RESOURCE_REGISTRY,
  BUFF_REGISTRY_GENERATED as BUFF_REGISTRY,
};
