export const craftingActions = {
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
    cost: 20, costType: 'wood', image: 'img/Crafting_axe_1.webp',
    execute: (state) => {
      if (state.resources.wood >= 20) {
        state.resources.wood -= 20;
        state.inventory.push('craft-axe');
        return { success: true, logKey: 'craft_axe' };
      } return { success: false };
    }
  },
  'craft-pickaxe': {
    cost: 15, costType: 'stone', image: 'img/Crafting_pickaxe_1.webp',
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
  'craft-bookshelf': {
    cost: 25, costType: 'wood', image: 'img/Crafting_bookshelf.webp',
    execute: (state) => {
      if (state.resources.wood >= 25 && state.housing.hasTable) {
        state.resources.wood -= 25;
        state.housing.hasBookshelf = true;
        state.inventory.push('craft-bookshelf');
        return { success: true, logKey: 'craft_bookshelf', logColor: 'rgba(20, 184, 166, 0.9)' };
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
  }
};
