export const npcActions = {
  'npc-baker': {
    isStory: true, chapter: 'Village Life',
    progKey: 'baker', cost: 10, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.resource.consume(state, 'energy', 10)) {
        state.npcProgress.baker++;
        return { success: true, logKey: 'npc_baker' };
      } return { success: false };
    }
  },
  'npc-flowerGirl': {
    isStory: true, chapter: 'Village Life',
    progKey: 'flowerGirl', cost: 5, costType: 'energy', maxProgress: 5,
    companion: {
        salary: 1, // Shards per tick
        yield: { magic: 2 }
    },
    execute: (state) => {
      if (state.housing.hasCampfire && state.resource.consume(state, 'energy', 5)) {
        state.npcProgress.flowerGirl++;
        if (state.npcProgress.flowerGirl >= 5 && !state.unlockedNPCs.includes('npc-blacksmith'))
          state.unlockedNPCs.push('npc-blacksmith');
        return { success: true, logKey: 'npc_flowerGirl' };
      } return { success: false };
    }
  },
  'npc-artisan': {
    isStory: true, chapter: 'Village Life',
    progKey: 'artisan', cost: 15, costType: 'energy', maxProgress: 3,
    companion: {
        salary: 3,
        yield: { wood: 0.5 }
    },
    execute: (state) => {
      if (state.resource.consume(state, 'energy', 15)) {
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
    isStory: true, chapter: 'Village Life',
    progKey: 'teacher', cost: 12, costType: 'energy', maxProgress: 3,
    execute: (state) => {
      if (state.resource.consume(state, 'energy', 12)) {
        state.npcProgress.teacher++;
        return { success: true, logKey: 'npc_teacher' };
      } return { success: false };
    }
  },
  'npc-townHall': {
    isStory: true, chapter: 'Village Life',
    progKey: 'townHall', cost: 20, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.resource.consume(state, 'energy', 20)) {
        state.npcProgress.townHall++;
        return { success: true, logKey: 'npc_townHall' };
      } return { success: false };
    }
  },
  'npc-blacksmith': {
    isStory: true, chapter: 'Village Life',
    progKey: 'blacksmith', cost: 25, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.resource.consume(state, 'energy', 25)) {
        state.npcProgress.blacksmith++;
        return { success: true, logKey: 'npc_blacksmith' };
      } return { success: false };
    }
  },
  'npc-sage': {
    isStory: true, chapter: 'Village Life',
    progKey: 'sage', cost: 20, costType: 'magic', maxProgress: 1,
    execute: (state) => {
      if (state.resource.consume(state, 'magic', 20)) {
        state.npcProgress.sage++;
        if (state.npcProgress.sage === 1) {
          if (!state.inventory.includes('Book of Knowledge')) state.inventory.push('Book of Knowledge');
          return { success: true, logKey: 'sage_gift', logColor: 'rgba(251, 191, 36, 0.9)' };
        }
        return { success: true, logKey: 'npc_sage' };
      } return { success: false };
    }
  },
  'npc-hunter': {
    isStory: true, chapter: 'Village Life',
    progKey: 'hunter', cost: 15, costType: 'energy', maxProgress: 5,
    companion: {
        salary: 2,
        yield: { meat: 0.2 }
    },
    execute: (state) => {
      if (state.resource.consume(state, 'energy', 15)) {
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
