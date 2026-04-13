export const housingActions = {
  'house-campfire': {
    cost: 5, costType: 'wood', image: 'img/Housing_Campfire.webp',
    execute: (state) => {
      if (state.resources.wood >= 5) {
        state.resources.wood -= 5;
        state.housing.hasCampfire = true;
        state.unlockedNPCs.push('npc-flowerGirl');
        return { success: true, logKey: 'milestone_campfire', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-tent': {
    cost: 15, costType: 'wood', image: 'img/Housing_tent.webp',
    execute: (state) => {
      if (state.resources.wood >= 15 && state.resources.stone >= 5) {
        state.resources.wood -= 15;
        state.resources.stone -= 5;
        state.housing.hasTent = true;
        state.unlockedNPCs.push('npc-townHall');
        return { success: true, logKey: 'milestone_tent', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-wood-storage': {
    cost: 20, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 20) {
        state.resources.wood -= 20;
        state.housing.hasWoodStorage = true;
        state.limits.wood += 10;
        state.unlockedNPCs.push('npc-artisan');
        return { success: true, logKey: 'milestone_wood_storage', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-stone-storage': {
    cost: 20, costType: 'stone',
    execute: (state) => {
      if (state.resources.stone >= 20) {
        state.resources.stone -= 20;
        state.housing.hasStoneStorage = true;
        state.limits.stone += 10;
        state.unlockedNPCs.push('npc-artisan');
        return { success: true, logKey: 'milestone_stone_storage', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-table': {
    cost: 40, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 40) {
        state.resources.wood -= 40;
        state.housing.hasTable = true;
        if (!state.unlockedNPCs.includes('npc-sage')) state.unlockedNPCs.push('npc-sage');
        return { success: true, logKey: 'milestone_table', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-build': {
    cost: 50, costType: 'wood',
    execute: (state) => {
      if (state.inventory.includes('Official Land Deed') && state.resources.wood >= 50 && state.resources.stone >= 50) {
        state.resources.wood -= 50;
        state.resources.stone -= 50;
        state.housing.hasHouse = true;
        state.limits.wood += 50;
        state.limits.stone += 50;
        return { success: true, logKey: 'milestone_house', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  }
};
