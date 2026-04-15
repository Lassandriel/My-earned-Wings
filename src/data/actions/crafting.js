export const craftingActions = {
  'craft-wanderstock': {
    cost: 5, costType: 'wood', image: 'img/Crafting_walkingstick.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 5)) {
        state.inventory.push('craft-wanderstock');
        return { success: true, logKey: 'craft_wanderstock' };
      } return { success: false };
    }
  },
  'craft-axe': {
    cost: 20, costType: 'wood', image: 'img/Crafting_axe_1.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 20)) {
        state.inventory.push('craft-axe');
        return { success: true, logKey: 'craft_axe' };
      } return { success: false };
    }
  },
  'craft-pickaxe': {
    cost: 25, costType: 'mixed', image: 'img/Crafting_pickaxe_1.webp',
    costs: { stone: 15, wood: 10 },
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      const costs = { stone: 15, wood: 10 };
      if (state.resource.consume(state, costs)) {
        state.inventory.push('craft-pickaxe');
        return { success: true, logKey: 'craft_pickaxe' };
      } return { success: false };
    }
  },
  'craft-bed': {
    cost: 25, costType: 'wood', image: 'img/Crafting_bed.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 25)) {
        state.inventory.push('craft-bed');
        return { success: true, logKey: 'craft_bed' };
      } return { success: false };
    }
  },
  'craft-chair': {
    cost: 10, costType: 'wood', image: 'img/Crafting_chair.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 10)) {
        state.inventory.push('craft-chair');
        return { success: true, logKey: 'craft_chair' };
      } return { success: false };
    }
  },
  'craft-stove': {
    cost: 40, costType: 'mixed', image: 'img/Crafting_stove.webp',
    costs: { stone: 25, wood: 15 },
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      const costs = { stone: 25, wood: 15 };
      if (state.resource.consume(state, costs)) {
        state.inventory.push('craft-stove');
        return { success: true, logKey: 'craft_stove' };
      } return { success: false };
    }
  },
  'craft-bookshelf': {
    cost: 25, costType: 'wood', image: 'img/Crafting_bookshelf.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.housing.hasTable && state.resource.consume(state, 'wood', 25)) {
        state.housing.hasBookshelf = true;
        state.inventory.push('craft-bookshelf');
        state.limits.books += 5; // Start capacitor
        if (!state.unlockedRecipes.includes('craft-book')) state.unlockedRecipes.push('craft-book');
        return { success: true, logKey: 'craft_bookshelf', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'craft-bow': {
    cost: 30, costType: 'wood',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.consume(state, 'wood', 30)) {
        state.inventory.push('craft-bow');
        return { success: true, logKey: 'craft_bow' };
      } return { success: false };
    }
  },
  'craft-book': {
    cost: 10, costType: 'mixed', costs: { shards: 10, wood: 5 },
    sfx: 'success',
    particleText: 'Wissen!',
    particleType: 'shards',
    execute: (state) => {
      if (state.resource.isFull(state, 'books')) return { success: false };
      const costs = { shards: 10, wood: 5 };
      if (state.resource.consume(state, costs)) {
        state.resource.add(state, 'books', 1);
        return { success: true, logKey: 'craft_book', logColor: 'rgba(251, 191, 36, 0.9)' };
      } return { success: false };
    }
  }
};
