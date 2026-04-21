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
};
