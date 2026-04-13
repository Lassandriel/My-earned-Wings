export const actionDb = {
  'action-essen': {
    cost: 0, costType: 'energy',
<<<<<<< HEAD
    execute: (state) => {
      // Fills satiation; satiation in turn maintains efficient energy regeneration
      const gain = 15;
      state.stats.satiation = Math.min(state.stats.maxSatiation, state.stats.satiation + gain);
      return { success: true, logKey: 'eat_log', floatText: `+${gain} 🫐`, floatClass: 'float-energy' };
    }
  },
  'action-herbs': {
    cost: 5, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 5 && state.resources.herbs < state.limits.herbs) {
        state.stats.energy -= 5;
        state.resources.herbs++;
        return { success: true, logKey: 'herbs_log', floatText: '+1 🌿', floatClass: 'float-energy' };
      } return { success: false };
    }
  },
  'action-eat-meat': {
    cost: 0, costType: 'energy',
    execute: (state) => {
      if (state.resources.meat < 1) return { success: false };
      state.resources.meat--;
      state.stats.satiation = state.stats.maxSatiation; // Full satiation
      // Apply buff if stove is built
      if (state.housing.hasStove) {
        state.activeBuff = 'roasted_meat';
        state.buffActionsLeft = 5;
        return { success: true, logKey: 'eat_meat_buff_log', floatText: '+🔥 Buff', floatClass: 'float-xp' };
      }
      return { success: true, logKey: 'eat_meat_log', floatText: '+🥩 Sätt.', floatClass: 'float-energy' };
    }
=======
    execute: (state) => { state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + 5); return true; }
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
  },
  'action-ausruhen': {
    cost: 0, costType: 'energy',
    execute: (state) => {
      let gain = 10;
      if (state.housing.hasCampfire) gain += 10;
      if (state.housing.hasTent) gain += 15;
      if (state.inventory.includes('craft-bed')) gain += 25;
      state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + gain);
<<<<<<< HEAD
      return { success: true, logKey: 'rest_log', logGain: gain, floatText: `+${gain} ⚡`, floatClass: 'float-energy' };
=======
      return true;
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
    }
  },
  'action-meditieren': {
    cost: 0, costType: 'energy',
<<<<<<< HEAD
    execute: (state) => {
      state.stats.magic = Math.min(state.stats.maxMagic, state.stats.magic + 15);
      return { success: true, logKey: 'meditate_log', floatText: '+15 ✨', floatClass: 'float-magic' };
    }
=======
    execute: (state) => { state.stats.magic = Math.min(state.stats.maxMagic, state.stats.magic + 15); return true; }
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
  },
  'action-study': {
    cost: 20, costType: 'magic',
    execute: (state) => {
      let books = state.inventory.filter(i => i === 'book').length;
      if (state.stats.magic >= 20 && books > 0) {
        state.stats.magic -= 20;
        let gain = books * 2;
        if (state.housing.hasBookcase) gain += 5;
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
<<<<<<< HEAD
        // Buff: roasted_meat gives +1 extra yield
        if (state.activeBuff === 'roasted_meat') gain += 1;
        state.resources.wood += gain;
        state.stats.satiation = Math.max(0, state.stats.satiation - 5); // Satiation decay
        const hasAxe = state.inventory.includes('craft-axe');
        return { success: true, logKey: hasAxe ? 'wood_axe_log' : 'wood_log', logGain: gain, floatText: `+${gain} 🪵`, floatClass: 'float-wood' };
=======
        state.resources.wood += gain; return { success: true };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
      } return { success: false };
    }
  },
  'action-stone': {
    cost: 15, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 15 && state.resources.stone < state.limits.stone) {
        state.stats.energy -= 15;
<<<<<<< HEAD
        const hasPickaxe = state.inventory.includes('craft-pickaxe');
        const gain = hasPickaxe ? 2 : 1;
        state.resources.stone += gain;
        state.stats.satiation = Math.max(0, state.stats.satiation - 5); // Satiation decay
        return { success: true, logKey: hasPickaxe ? 'stone_axe_log' : 'stone_log', logGain: gain, floatText: `+${gain} 🪨`, floatClass: 'float-stone' };
=======
        state.resources.stone += state.inventory.includes('craft-pickaxe') ? 2 : 1; return { success: true };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
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
  'trade-buy-wood': {
    cost: 10, costType: 'shards',
    execute: (state) => {
      if (state.resources.shards >= 10 && state.resources.wood < state.limits.wood) {
        state.resources.shards -= 10;
        state.resources.wood++;
        return { success: true, logKey: 'buy_wood_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'trade-buy-book': {
    cost: 50, costType: 'shards',
    execute: (state) => {
      let books = state.inventory.filter(i => i === 'book').length;
      if (state.resources.shards >= 50 && books < 5) {
        state.resources.shards -= 50;
        state.inventory.push('book');
        return { success: true, logKey: 'buy_book_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
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
<<<<<<< HEAD
    progKey: 'baker', cost: 10, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 10) {
        state.stats.energy -= 10;
        const prog = state.npcProgress.baker || 0;
        state.npcProgress.baker = prog + 1;
        return { success: true, isNpc: true, npcId: 'npc-baker', logProgress: prog };
      } return { success: false };
=======
    progKey: 'baker', cost: 10, costType: 'energy', maxProgress: 5, execute: (state) => {
      if (state.stats.energy >= 10) { state.stats.energy -= 10; state.npcProgress.baker++; return { success: true }; } return { success: false };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
    }
  },
  'npc-flowerGirl': {
    progKey: 'flowerGirl', cost: 5, costType: 'energy', maxProgress: 5, execute: (state) => {
      if (state.housing.hasCampfire && state.stats.energy >= 5) {
<<<<<<< HEAD
        state.stats.energy -= 5;
        const prog = state.npcProgress.flowerGirl || 0;
        state.npcProgress.flowerGirl = prog + 1;
        if (state.npcProgress.flowerGirl >= 5 && !state.unlockedNPCs.includes('npc-blacksmith'))
          state.unlockedNPCs.push('npc-blacksmith');
        return { success: true, isNpc: true, npcId: 'npc-flowerGirl', logProgress: prog };
=======
        state.stats.energy -= 5; state.npcProgress.flowerGirl++;
        if (state.npcProgress.flowerGirl >= 5 && !state.unlockedNPCs.includes('npc-blacksmith')) state.unlockedNPCs.push('npc-blacksmith');
        return { success: true };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
      } return { success: false };
    }
  },
  'npc-artisan': {
    progKey: 'artisan', cost: 15, costType: 'energy', maxProgress: 3, execute: (state) => {
      if (state.stats.energy >= 15) {
<<<<<<< HEAD
        state.stats.energy -= 15;
        const prog = state.npcProgress.artisan || 0;
        state.npcProgress.artisan = prog + 1;
        if (state.npcProgress.artisan >= 3) {
          if (!state.unlockedRecipes.includes('craft-axe')) state.unlockedRecipes.push('craft-axe');
          if (!state.unlockedRecipes.includes('craft-pickaxe')) state.unlockedRecipes.push('craft-pickaxe');
        }
        return { success: true, isNpc: true, npcId: 'npc-artisan', logProgress: prog };
=======
        state.stats.energy -= 15; state.npcProgress.artisan++;
        if (state.npcProgress.artisan >= 3) {
          if (!state.unlockedRecipes.includes('craft-axe')) state.unlockedRecipes.push('craft-axe');
          if (!state.unlockedRecipes.includes('craft-pickaxe')) state.unlockedRecipes.push('craft-pickaxe');
        } return { success: true };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
      } return { success: false };
    }
  },
  'npc-teacher': {
<<<<<<< HEAD
    progKey: 'teacher', cost: 12, costType: 'energy', maxProgress: 3,
    execute: (state) => {
      if (state.stats.energy >= 12) {
        state.stats.energy -= 12;
        const prog = state.npcProgress.teacher || 0;
        state.npcProgress.teacher = prog + 1;
        if (state.npcProgress.teacher >= 3 && !state.unlockedNPCs.includes('npc-hunter')) {
          state.unlockedNPCs.push('npc-hunter');
        }
        return { success: true, isNpc: true, npcId: 'npc-teacher', logProgress: prog };
      } return { success: false };
    }
  },
  'npc-hunter': {
    progKey: 'hunter', cost: 15, costType: 'energy', maxProgress: 4,
    execute: (state) => {
      if (state.stats.energy >= 15) {
        state.stats.energy -= 15;
        const prog = state.npcProgress.hunter || 0;
        state.npcProgress.hunter = prog + 1;
        if (state.npcProgress.hunter >= 2 && !state.unlockedRecipes.includes('craft-bow')) {
          state.unlockedRecipes.push('craft-bow');
        }
        return { success: true, isNpc: true, npcId: 'npc-hunter', logProgress: prog };
      } return { success: false };
    }
  },
  'npc-townHall': {
    progKey: 'townHall', cost: 20, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 20) {
        state.stats.energy -= 20;
        const prog = state.npcProgress.townHall || 0;
        state.npcProgress.townHall = prog + 1;
        return { success: true, isNpc: true, npcId: 'npc-townHall', logProgress: prog };
      } return { success: false };
    }
  },
  'npc-blacksmith': {
    progKey: 'blacksmith', cost: 25, costType: 'energy', maxProgress: 5,
    execute: (state) => {
      if (state.stats.energy >= 25) {
        state.stats.energy -= 25;
        const prog = state.npcProgress.blacksmith || 0;
        state.npcProgress.blacksmith = prog + 1;
        return { success: true, isNpc: true, npcId: 'npc-blacksmith', logProgress: prog };
      } return { success: false };
=======
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
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
    }
  },
  'npc-sage': {
    progKey: 'sage', cost: 20, costType: 'magic', maxProgress: 1,
    execute: (state) => {
      if (state.stats.magic >= 20) {
<<<<<<< HEAD
        state.stats.magic -= 20;
        const prog = state.npcProgress.sage || 0;
        state.npcProgress.sage = prog + 1;
        if (state.npcProgress.sage === 1) {
          state.inventory.push('Amulet of Vitality');
          state.stats.maxEnergy += 50;
        }
        return { success: true, isNpc: true, npcId: 'npc-sage', logProgress: prog };
=======
        state.stats.magic -= 20; state.npcProgress.sage++;
        if (state.npcProgress.sage === 1) {
          state.inventory.push('Book of Knowledge');
          return { success: true, logKey: 'sage_gift' };
        }
        return { success: true };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
      } return { success: false };
    }
  },

  // Crafting
  'craft-wanderstock': {
<<<<<<< HEAD
    cost: 5, costType: 'wood', image: './img/Crafting_walkingstick.webp',
    execute: (state) => {
      if (state.resources.wood >= 5) {
        state.resources.wood -= 5;
        state.inventory.push('craft-wanderstock');
        return { success: true, logKey: 'craft_wanderstock' };
      } return { success: false };
    }
  },
  'craft-axe': {
    cost: 20, costType: 'wood', image: './img/Crafting_axe_1.webp',
    execute: (state) => {
      if (state.resources.wood >= 20) {
        state.resources.wood -= 20;
        state.inventory.push('craft-axe');
        return { success: true, logKey: 'craft_axe' };
      } return { success: false };
    }
  },
  'craft-pickaxe': {
    cost: 15, costType: 'stone', image: './img/Crafting_pickaxe_1.webp',
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
    cost: 25, costType: 'wood', image: './img/Crafting_bed.webp',
    execute: (state) => {
      if (state.resources.wood >= 25) {
        state.resources.wood -= 25;
        state.inventory.push('craft-bed');
        return { success: true, logKey: 'craft_bed' };
      } return { success: false };
    }
  },
  'craft-chair': {
    cost: 10, costType: 'wood', image: './img/Crafting_chair.webp',
    execute: (state) => {
      if (state.resources.wood >= 10) {
        state.resources.wood -= 10;
        state.inventory.push('craft-chair');
        return { success: true, logKey: 'craft_chair' };
      } return { success: false };
=======
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
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
    }
  },
  'craft-bow': {
    cost: 15, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 15) {
        state.resources.wood -= 15;
        state.inventory.push('craft-bow');
        return { success: true, logKey: 'craft_bow' };
      } return { success: false };
    }
  },

  // Housing
  'house-campfire': {
<<<<<<< HEAD
    cost: 5, costType: 'wood', image: './img/Housing_Campfire.webp',
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
    cost: 15, costType: 'wood', image: './img/Housing_tent.webp',
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
    cost: 10, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 10) {
        state.resources.wood -= 10;
        state.housing.hasWoodStorage = true;
        state.limits.wood += 5;
        if (!state.unlockedNPCs.includes('npc-artisan')) state.unlockedNPCs.push('npc-artisan');
        return { success: true, logKey: 'milestone_wood_storage', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-stone-storage': {
    cost: 10, costType: 'stone',
    execute: (state) => {
      if (state.resources.stone >= 10) {
        state.resources.stone -= 10;
        state.housing.hasStoneStorage = true;
        state.limits.stone += 5;
        if (!state.unlockedNPCs.includes('npc-artisan')) state.unlockedNPCs.push('npc-artisan');
        return { success: true, logKey: 'milestone_stone_storage', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
=======
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
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
    }
  },
  'house-table': {
    cost: 40, costType: 'wood', image: './img/Crafting_table.webp',
    execute: (state) => {
<<<<<<< HEAD
      if (state.resources.wood >= 40 && state.inventory.includes('craft-chair')) {
        state.resources.wood -= 40;
        state.housing.hasTable = true;
=======
      if (state.resources.wood >= 40) {
        state.resources.wood -= 40; state.housing.hasTable = true;
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
        if (!state.unlockedNPCs.includes('npc-sage')) state.unlockedNPCs.push('npc-sage');
        return { success: true };
      } return { success: false };
    }
  },
  'house-build': {
    cost: 50, costType: 'wood', execute: (state) => {
      if (state.inventory.includes('Official Land Deed') && state.resources.wood >= 50 && state.resources.stone >= 50) {
<<<<<<< HEAD
        state.resources.wood -= 50;
        state.resources.stone -= 50;
        state.housing.hasHouse = true;
        state.limits.wood += 50;
        state.limits.stone += 50;
        if (!state.unlockedRecipes.includes('craft-chair')) state.unlockedRecipes.push('craft-chair');
        if (!state.unlockedRecipes.includes('craft-bed')) state.unlockedRecipes.push('craft-bed');
        return { success: true, logKey: 'milestone_house', logColor: 'rgba(251, 191, 36, 0.9)' };
=======
        state.resources.wood -= 50; state.resources.stone -= 50; state.housing.hasHouse = true;
        state.limits.wood += 50; state.limits.stone += 50; return { success: true };
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
      } return { success: false };
    }
  },
  'house-bookcase': {
    cost: 30, costType: 'wood', image: './img/Crafting_bookcase.webp',
    execute: (state) => {
      if (state.resources.wood >= 30) {
        state.resources.wood -= 30;
        state.housing.hasBookcase = true;
        state.stats.maxMagic += 15;
        return { success: true, logKey: 'milestone_bookcase', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  },
  'house-stove': {
    cost: 20, costType: 'wood', image: './img/Crafting_stove.webp',
    execute: (state) => {
      if (!state.housing.hasHouse) return { success: false };
      if (state.resources.wood >= 15 && state.resources.stone >= 10) {
        state.resources.wood -= 15;
        state.resources.stone -= 10;
        state.housing.hasStove = true;
        return { success: true, logKey: 'milestone_stove', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  }
};
