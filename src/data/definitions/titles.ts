import { TitleId, TitleDefinition } from '../../types/game';

/**
 * TITLE REGISTRY - Phase 12
 * Earnable titles that provide permanent, game-changing shifts.
 */
export const TITLE_REGISTRY: Record<TitleId, TitleDefinition> = {
  'title-wanderer': {
    id: 'title-wanderer',
    nameKey: 'title_wanderer_name',
    descKey: 'title_wanderer_desc',
    icon: '🚶',
    modifiers: [{ key: 'rest_energy_gain', add: 5 }]
  },
  'title-wise': {
    id: 'title-wise',
    nameKey: 'title_wise_name',
    descKey: 'title_wise_desc',
    icon: '📚',
    modifiers: [{ key: 'study_efficiency', mult: 1.15 }]
  },
  'title-master': {
    id: 'title-master',
    nameKey: 'title_master_name',
    descKey: 'title_master_desc',
    icon: '🔨',
    modifiers: [{ key: 'wood_yield', add: 2 }, { key: 'stone_yield', add: 2 }]
  },
  'title-keeper': {
    id: 'title-keeper',
    nameKey: 'title_keeper_name',
    descKey: 'title_keeper_desc',
    icon: '🌿',
    modifiers: [{ key: 'flowers_yield', mult: 1.25 }]
  },
  'title-arcane': {
    id: 'title-arcane',
    nameKey: 'title_arcane_name',
    descKey: 'title_arcane_desc',
    icon: '🔮',
    modifiers: [{ key: 'magic_regen_passive', add: 0.1 }]
  }
};
