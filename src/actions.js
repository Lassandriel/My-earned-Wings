export const actionDb = {
  'action-essen': {
    cost: 0, costType: 'energy',
    execute: (state) => {
      let gain = 5;
      if (state.inventory.includes('craft-stove')) gain += 5;
      state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + gain);
      return { success: true, logKey: 'eat_log', logGain: gain };
    }
  },
  'action-ausruhen': {
    cost: 0, costType: 'energy',
    execute: (state) => {
      let gain = 10;
      if (state.housing.hasCampfire) gain += 10;
      if (state.housing.hasTent) gain += 15;
      if (state.inventory.includes('craft-bed')) gain += 25;
      state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + gain);
      return { success: true, logKey: 'rest_log', logGain: gain };
    }
  },
  'action-meditieren': {
    cost: 0, costType: 'energy',
    execute: (state) => {
      state.stats.magic = Math.min(state.stats.maxMagic, state.stats.magic + 15);
      return { success: true, logKey: 'meditate_log' };
    }
  },
  'action-study': {
    cost: 20, costType: 'magic',
    execute: (state) => {
      if (state.stats.magic >= 20) {
        state.stats.magic -= 20;
        const gain = state.inventory.includes('craft-chair') ? 10 : 5;
        state.stats.maxMagic += gain;
        return { success: true, logKey: 'study_success', logGain: gain, logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-wood': {
    cost: 10, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 10 && state.resources.wood < state.limits.wood) {
        state.stats.energy -= 10;
        let gain = state.inventory.includes('craft-axe') ? 2 : 1;
        if (state.inventory.includes('craft-wanderstock')) gain += 0.5;
        state.resources.wood += gain;
        const hasAxe = state.inventory.includes('craft-axe');
        return { success: true, logKey: hasAxe ? 'wood_axe_log' : 'wood_log', logGain: gain };
      } return { success: false };
    }
  },
  'action-stone': {
    cost: 15, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 15 && state.resources.stone < state.limits.stone) {
        state.stats.energy -= 15;
        const hasPickaxe = state.inventory.includes('craft-pickaxe');
        const gain = hasPickaxe ? 2 : 1;
        state.resources.stone += gain;
        return { success: true, logKey: hasPickaxe ? 'stone_axe_log' : 'stone_log', logGain: gain };
      } return { success: false };
    }
  },
  'action-sell-wood': {
    cost: 1, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 1) {
        state.resources.wood--;
        state.resources.shards += 5;
        return { success: true, logKey: 'sell_wood_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-sell-stone': {
    cost: 1, costType: 'stone',
    execute: (state) => {
      if (state.resources.stone >= 1) {
        state.resources.stone--;
        state.resources.shards += 8;
        return { success: true, logKey: 'sell_stone_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-work': {
    cost: 30, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 30) {
        state.stats.energy -= 30;
        state.housing.laborCount++;
        state.resources.shards += 12;
        return { success: true, logKey: 'work_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },

  // NPCs
  'npc-baker': {
    progKey: 'baker', cost: 10, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 10) {
        state.stats.energy -= 10;
        state.npcProgress.baker++;
        return { success: true, logKey: 'npc_baker' };
      } return { success: false };
    }
  },
  'npc-flowerGirl': {
    progKey: 'flowerGirl', cost: 5, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.housing.hasCampfire && state.stats.energy >= 5) {
        state.stats.energy -= 5;
        state.npcProgress.flowerGirl++;
        if (state.npcProgress.flowerGirl >= 5 && !state.unlockedNPCs.includes('npc-blacksmith'))
          state.unlockedNPCs.push('npc-blacksmith');
        return { success: true, logKey: 'npc_flowerGirl' };
      } return { success: false };
    }
  },
  'npc-artisan': {
    progKey: 'artisan', cost: 15, costType: 'energy', maxProgress: 3,
    execute: (state) => {
      if (state.stats.energy >= 15) {
        state.stats.energy -= 15;
        state.npcProgress.artisan++;
        if (state.npcProgress.artisan >= 3) {
          if (!state.unlockedRecipes.includes('craft-axe')) state.unlockedRecipes.push('craft-axe');
          if (!state.unlockedRecipes.includes('craft-pickaxe')) state.unlockedRecipes.push('craft-pickaxe');
        }
        return { success: true, logKey: 'npc_artisan' };
      } return { success: false };
    }
  },
  'npc-teacher': {
    progKey: 'teacher', cost: 12, costType: 'energy', maxProgress: 3,
    execute: (state) => {
      if (state.stats.energy >= 12) {
        state.stats.energy -= 12;
        state.npcProgress.teacher++;
        return { success: true, logKey: 'npc_teacher' };
      } return { success: false };
    }
  },
  'npc-townHall': {
    progKey: 'townHall', cost: 20, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 20) {
        state.stats.energy -= 20;
        state.npcProgress.townHall++;
        return { success: true, logKey: 'npc_townHall' };
      } return { success: false };
    }
  },
  'npc-blacksmith': {
    progKey: 'blacksmith', cost: 25, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 25) {
        state.stats.energy -= 25;
        state.npcProgress.blacksmith++;
        return { success: true, logKey: 'npc_blacksmith' };
      } return { success: false };
    }
  },
  'npc-sage': {
    progKey: 'sage', cost: 20, costType: 'magic', maxProgress: 1,
    execute: (state) => {
      if (state.stats.magic >= 20) {
        state.stats.magic -= 20;
        state.npcProgress.sage++;
        if (state.npcProgress.sage === 1) {
          state.inventory.push('Book of Knowledge');
          return { success: true, logKey: 'sage_gift', logColor: 'rgba(251, 191, 36, 0.9)' };
        }
        return { success: true, logKey: 'npc_sage' };
      } return { success: false };
    }
  },
  'npc-hunter': {
    progKey: 'hunter', cost: 15, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 15) {
        state.stats.energy -= 15;
        state.npcProgress.hunter++;
        
        if (state.npcProgress.hunter === 2) {
          if (!state.unlockedRecipes.includes('craft-bow')) {
            state.unlockedRecipes.push('craft-bow');
            return { success: true, logKey: 'npc_hunter_bow', logColor: 'rgba(251, 191, 36, 0.9)' };
          }
        }
        
        if (state.npcProgress.hunter === 5) {
          return { success: true, logKey: 'npc_hunter_final', logColor: 'rgba(251, 191, 36, 0.9)' };
        }

        return { success: true, logKey: 'npc_hunter' };
      } return { success: false };
    }
  },

  // Crafting
  'craft-wanderstock': {
    cost: 5, costType: 'wood', image: 'img/Crafting_walkingstick.webp',
    execute: (state) => {
      if (state.resources.wood >= 5) {
        state.resources.wood -= 5;
        state.inventory.push('craft-wanderstock');
        return { success: true, logKey: 'craft_wanderstock' };
      } return { success: false };
    }
  },
  'craft-axe': {
    cost: 20, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 20) {
        state.resources.wood -= 20;
        state.inventory.push('craft-axe');
        return { success: true, logKey: 'craft_axe' };
      } return { success: false };
    }
  },
  'craft-pickaxe': {
    cost: 15, costType: 'stone',
    execute: (state) => {
      if (state.resources.stone >= 15 && state.resources.wood >= 10) {
        state.resources.stone -= 15;
        state.resources.wood -= 10;
        state.inventory.push('craft-pickaxe');
        return { success: true, logKey: 'craft_pickaxe' };
      } return { success: false };
    }
  },
  'craft-bed': {
    cost: 25, costType: 'wood', image: 'img/Crafting_bed.webp',
    execute: (state) => {
      if (state.resources.wood >= 25) {
        state.resources.wood -= 25;
        state.inventory.push('craft-bed');
        return { success: true, logKey: 'craft_bed' };
      } return { success: false };
    }
  },
  'craft-chair': {
    cost: 10, costType: 'wood', image: 'img/Crafting_chair.webp',
    execute: (state) => {
      if (state.resources.wood >= 10) {
        state.resources.wood -= 10;
        state.inventory.push('craft-chair');
        return { success: true, logKey: 'craft_chair' };
      } return { success: false };
    }
  },
  'craft-stove': {
    cost: 25, costType: 'stone', image: 'img/Crafting_stove.webp',
    execute: (state) => {
      if (state.resources.stone >= 25 && state.resources.wood >= 15) {
        state.resources.stone -= 25;
        state.resources.wood -= 15;
        state.inventory.push('craft-stove');
        return { success: true, logKey: 'craft_stove' };
      } return { success: false };
    }
  },
  'craft-bow': {
    cost: 30, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 30) {
        state.resources.wood -= 30;
        state.inventory.push('craft-bow');
        return { success: true, logKey: 'craft_bow' };
      } return { success: false };
    }
  },
  'action-hunt': {
    cost: 25, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 25 && state.inventory.includes('craft-bow')) {
        state.stats.energy -= 25;
        state.resources.meat += 2;
        return { success: true, logKey: 'hunt_log', logGain: 2 };
      } return { success: false };
    }
  },
  'action-sell-meat': {
    cost: 1, costType: 'meat',
    execute: (state) => {
      if (state.resources.meat >= 1) {
        state.resources.meat--;
        state.resources.shards += 15;
        return { success: true, logKey: 'sell_meat_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-buy-meat': {
    cost: 12, costType: 'shards',
    execute: (state) => {
      if (state.resources.shards >= 12) {
        state.resources.shards -= 12;
        state.resources.meat += 1;
        return { success: true, logKey: 'buy_meat_log' };
      } return { success: false };
    }
  },

  // Housing
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
