import { BuffDefinition } from '../../types/game';

/**
 * Buff Registry - TypeScript Edition
 * Defines all time-based status effects in the game.
 */
export const BUFF_REGISTRY: Record<string, BuffDefinition> = {
  'buff-gourmet': {
    id: 'buff-gourmet',
    title: 'item_gourmet_meal_title',
    desc: 'buff_gourmet_desc',
    duration: 300, // 5 minutes
    modifiers: [{ key: 'energy_reg_bonus', add: 0.1 }],
  },
  'buff-harvest': {
    id: 'buff-harvest',
    title: 'buff_harvest_title',
    desc: 'buff_harvest_desc',
    duration: 60,
    modifiers: [{ key: 'wood_yield', add: 1 }, { key: 'stone_yield', add: 1 }],
  },
};
