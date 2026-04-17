/**
 * Buff Registry
 * Defines all time-based status effects in the game.
 */
export const BUFF_REGISTRY = {
    'buff-gourmet': {
        id: 'buff-gourmet',
        title: 'item_gourmet_meal_title', // Will be used if title key exists, or fallback
        desc: 'buff_gourmet_desc',
        duration: 300, // 5 minutes
        type: 'energy_reg_bonus',
        value: 0.1
    }
};
