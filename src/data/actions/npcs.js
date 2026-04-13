export const npcActions = {
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
  }
};
