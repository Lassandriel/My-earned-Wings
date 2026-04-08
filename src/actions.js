export const actionDb = {
  'action-essen': {
    cost: 0, costType: 'energy',
    execute: (state) => { state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + 5); return true; }
  },
  'action-ausruhen': {
    cost: 0, costType: 'energy',
    execute: (state) => {
      let gain = 10;
      if (state.housing.hasCampfire) gain += 10;
      if (state.housing.hasTent) gain += 15;
      if (state.inventory.includes('craft-bed')) gain += 25;
      state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + gain);
      return true;
    }
  },
  'action-meditieren': {
    cost: 0, costType: 'energy',
    execute: (state) => { state.stats.magic = Math.min(state.stats.maxMagic, state.stats.magic + 15); return true; }
  },
  'action-study': {
    cost: 20, costType: 'magic',
    execute: (state) => {
      if (state.stats.magic >= 20) {
        state.stats.magic -= 20;
        const gain = state.inventory.includes('craft-chair') ? 10 : 5;
        state.stats.maxMagic += gain;
        return { success: true, logKey: 'study_success', logGain: gain };
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
        state.resources.wood += gain; return { success: true };
      } return { success: false };
    }
  },
  'action-stone': {
    cost: 15, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 15 && state.resources.stone < state.limits.stone) {
        state.stats.energy -= 15;
        state.resources.stone += state.inventory.includes('craft-pickaxe') ? 2 : 1; return { success: true };
      } return { success: false };
    }
  },
  'action-sell-wood': {
    cost: 1, costType: 'wood',
    execute: (state) => { if (state.resources.wood >= 1) { state.resources.wood--; state.resources.shards += 5; return { success: true }; } return { success: false }; }
  },
  'action-sell-stone': {
    cost: 1, costType: 'stone',
    execute: (state) => { if (state.resources.stone >= 1) { state.resources.stone--; state.resources.shards += 8; return { success: true }; } return { success: false }; }
  },
  'action-work': {
    cost: 30, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 30) {
        state.stats.energy -= 30; state.housing.laborCount++; state.resources.shards += 12; return { success: true };
      } return { success: false };
    }
  },

  // NPCs
  'npc-baker': {
    progKey: 'baker', cost: 10, costType: 'energy', maxProgress: 5, execute: (state) => {
      if (state.stats.energy >= 10) { state.stats.energy -= 10; state.npcProgress.baker++; return { success: true }; } return { success: false };
    }
  },
  'npc-flowerGirl': {
    progKey: 'flowerGirl', cost: 5, costType: 'energy', maxProgress: 5, execute: (state) => {
      if (state.housing.hasCampfire && state.stats.energy >= 5) {
        state.stats.energy -= 5; state.npcProgress.flowerGirl++;
        if (state.npcProgress.flowerGirl >= 5 && !state.unlockedNPCs.includes('npc-blacksmith')) state.unlockedNPCs.push('npc-blacksmith');
        return { success: true };
      } return { success: false };
    }
  },
  'npc-artisan': {
    progKey: 'artisan', cost: 15, costType: 'energy', maxProgress: 3, execute: (state) => {
      if (state.stats.energy >= 15) {
        state.stats.energy -= 15; state.npcProgress.artisan++;
        if (state.npcProgress.artisan >= 3) {
          if (!state.unlockedRecipes.includes('craft-axe')) state.unlockedRecipes.push('craft-axe');
          if (!state.unlockedRecipes.includes('craft-pickaxe')) state.unlockedRecipes.push('craft-pickaxe');
        } return { success: true };
      } return { success: false };
    }
  },
  'npc-teacher': {
    progKey: 'teacher', cost: 12, costType: 'energy', maxProgress: 3, execute: (state) => {
      if (state.stats.energy >= 12) { state.stats.energy -= 12; state.npcProgress.teacher++; return { success: true }; } return { success: false };
    }
  },
  'npc-townHall': {
    progKey: 'townHall', cost: 20, costType: 'energy', maxProgress: 5, execute: (state) => {
      if (state.stats.energy >= 20) { state.stats.energy -= 20; state.npcProgress.townHall++; return { success: true }; } return { success: false };
    }
  },
  'npc-blacksmith': {
    progKey: 'blacksmith', cost: 25, costType: 'energy', maxProgress: 5, execute: (state) => {
      if (state.stats.energy >= 25) { state.stats.energy -= 25; state.npcProgress.blacksmith++; return { success: true }; } return { success: false };
    }
  },
  'npc-sage': {
    progKey: 'sage', cost: 20, costType: 'magic', maxProgress: 1,
    execute: (state) => {
      if (state.stats.magic >= 20) {
        state.stats.magic -= 20; state.npcProgress.sage++;
        if (state.npcProgress.sage === 1) {
          state.inventory.push('Book of Knowledge');
          return { success: true, logKey: 'sage_gift' };
        }
        return { success: true };
      } return { success: false };
    }
  },

  // Crafting
  'craft-wanderstock': {
    cost: 5, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 5) { state.resources.wood -= 5; state.inventory.push('craft-wanderstock'); return { success: true }; } return { success: false };
    }
  },
  'craft-axe': {
    cost: 20, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 20) { state.resources.wood -= 20; state.inventory.push('craft-axe'); return { success: true }; } return { success: false };
    }
  },
  'craft-pickaxe': {
    cost: 15, costType: 'stone', execute: (state) => {
      if (state.resources.stone >= 15 && state.resources.wood >= 10) { state.resources.stone -= 15; state.resources.wood -= 10; state.inventory.push('craft-pickaxe'); return { success: true }; } return { success: false };
    }
  },
  'craft-bed': {
    cost: 25, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 25) { state.resources.wood -= 25; state.inventory.push('craft-bed'); return { success: true }; } return { success: false };
    }
  },
  'craft-chair': {
    cost: 10, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 10) { state.resources.wood -= 10; state.inventory.push('craft-chair'); return { success: true }; } return { success: false };
    }
  },

  // Housing
  'house-campfire': {
    cost: 5, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 5) { state.resources.wood -= 5; state.housing.hasCampfire = true; state.unlockedNPCs.push('npc-flowerGirl'); return { success: true }; } return { success: false };
    }
  },
  'house-tent': {
    cost: 15, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 15 && state.resources.stone >= 5) { state.resources.wood -= 15; state.resources.stone -= 5; state.housing.hasTent = true; state.unlockedNPCs.push('npc-townHall'); return { success: true }; } return { success: false };
    }
  },
  'house-wood-storage': {
    cost: 20, costType: 'wood', execute: (state) => {
      if (state.resources.wood >= 20) { state.resources.wood -= 20; state.housing.hasWoodStorage = true; state.limits.wood += 10; state.unlockedNPCs.push('npc-artisan'); return { success: true }; } return { success: false };
    }
  },
  'house-stone-storage': {
    cost: 20, costType: 'stone', execute: (state) => {
      if (state.resources.stone >= 20) { state.resources.stone -= 20; state.housing.hasStoneStorage = true; state.limits.stone += 10; state.unlockedNPCs.push('npc-artisan'); return { success: true }; } return { success: false };
    }
  },
  'house-table': {
    cost: 40, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 40) {
        state.resources.wood -= 40; state.housing.hasTable = true;
        if (!state.unlockedNPCs.includes('npc-sage')) state.unlockedNPCs.push('npc-sage');
        return { success: true };
      } return { success: false };
    }
  },
  'house-build': {
    cost: 50, costType: 'wood', execute: (state) => {
      if (state.inventory.includes('Official Land Deed') && state.resources.wood >= 50 && state.resources.stone >= 50) {
        state.resources.wood -= 50; state.resources.stone -= 50; state.housing.hasHouse = true;
        state.limits.wood += 50; state.limits.stone += 50; return { success: true };
      } return { success: false };
    }
  }
};
