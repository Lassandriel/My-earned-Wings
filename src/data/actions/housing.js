export const housingActions = {
  'house-campfire': {
    isStory: true, chapter: 'The Beginning',
    cost: 5, costType: 'wood', image: 'img/Housing_Campfire.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 5)) {
        state.housing.hasCampfire = true;
        if (!state.unlockedNPCs.includes('npc-flowerGirl')) state.unlockedNPCs.push('npc-flowerGirl');
        return { success: true, logKey: 'milestone_campfire', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-tent': {
    isStory: true, chapter: 'The Beginning',
    cost: 20, costType: 'mixed', image: 'img/Housing_tent.webp',
    costs: { wood: 15, stone: 5 },
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      const costs = { wood: 15, stone: 5 };
      if (state.resource.consume(state, costs)) {
        state.housing.hasTent = true;
        if (!state.unlockedNPCs.includes('npc-townHall')) state.unlockedNPCs.push('npc-townHall');
        return { success: true, logKey: 'milestone_tent', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-wood-storage': {
    isStory: true, chapter: 'Establishment',
    cost: 20, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 20)) {
        state.housing.hasWoodStorage = true;
        state.limits.wood += 10;
        if (!state.unlockedNPCs.includes('npc-artisan')) state.unlockedNPCs.push('npc-artisan');
        return { success: true, logKey: 'milestone_wood_storage', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-stone-storage': {
    isStory: true, chapter: 'Establishment',
    cost: 20, costType: 'stone',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'stone', 20)) {
        state.housing.hasStoneStorage = true;
        state.limits.stone += 10;
        if (!state.unlockedNPCs.includes('npc-artisan')) state.unlockedNPCs.push('npc-artisan');
        return { success: true, logKey: 'milestone_stone_storage', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-table': {
    isStory: true, chapter: 'Establishment',
    cost: 40, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 40)) {
        state.housing.hasTable = true;
        if (!state.unlockedNPCs.includes('npc-sage')) state.unlockedNPCs.push('npc-sage');
        if (!state.unlockedRecipes.includes('craft-bookshelf')) state.unlockedRecipes.push('craft-bookshelf');
        return { success: true, logKey: 'milestone_table', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-build': {
    isStory: true, chapter: 'Establishment',
    cost: 60, costType: 'mixed',
    costs: { wood: 30, stone: 30 },
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      const costs = { wood: 30, stone: 30 };
      if ((state.inventory.includes('Official Land Deed') || state.housing.hasLandDeed) && state.resource.consume(state, costs)) {
        state.housing.hasHouse = true;
        state.limits.wood += 50;
        state.limits.stone += 50;
        if (!state.unlockedRecipes.includes('craft-bed')) state.unlockedRecipes.push('craft-bed');
        if (!state.unlockedRecipes.includes('craft-chair')) state.unlockedRecipes.push('craft-chair');
        if (!state.unlockedRecipes.includes('craft-stove')) state.unlockedRecipes.push('craft-stove');
        return { success: true, logKey: 'milestone_house', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-garden': {
    isStory: true, chapter: 'Establishment',
    cost: 40, costType: 'mixed',
    costs: { wood: 20, stone: 20 },
    sfx: 'success',
    particleText: 'Wunderschön!',
    particleType: 'shards',
    execute: (state) => {
      const costs = { wood: 20, stone: 20 };
      if (state.housing.hasHouse && state.resource.consume(state, costs)) {
        state.housing.hasGarden = true;
        return { success: true, logKey: 'milestone_garden', logColor: 'rgba(16, 185, 129, 0.9)' };
      } return { success: false };
    }
  },
  'garden-water': {
    cost: 15, costType: 'energy',
    sfx: 'water',
    particleText: 'Frisch!',
    execute: (state) => {
      if (state.housing.hasGarden && state.resource.consume(state, 'energy', 15)) {
        if (state.resource.isFull(state, 'water')) return { success: false };
        state.resource.add(state, 'water', 1);
        return { success: true, logKey: 'water_gain' };
      } return { success: false };
    }
  }
};
