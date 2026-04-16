export const gatheringActions = {
  'action-essen': {
    cost: 0, costType: 'energy',
    sfx: 'eat',
    particleText: '+ Sättigung',
    particleType: 'energy',
    yieldType: 'satiation',
    counter: 'food',
    calculateYield: (state) => {
      let sGain = 20;
      if (state.inventory.includes('craft-stove')) {
        sGain += 15;
      }
      return { sGain, eGain: 0 };
    },
    execute: (state) => {
      const { sGain, eGain } = gatheringActions['action-essen'].calculateYield(state);
      state.resource.add(state, 'satiation', sGain);
      state.resource.add(state, 'energy', eGain);
      return { success: true, logKey: 'eat_log', logGain: sGain };
    }
  },
  'action-ausruhen': {
    cost: 0, costType: 'energy',
    satiationCost: 10,
    sfx: 'click',
    particleText: '+ Energie',
    particleType: 'energy',
    calculateYield: (state) => {
      let gain = 10;
      if (state.housing.hasCampfire) gain += 10;
      if (state.housing.hasTent) gain += 15;
      if (state.inventory.includes('craft-bed')) gain += 25;
      return gain;
    },
    execute: (state) => {
      const gain = gatheringActions['action-ausruhen'].calculateYield(state);
      state.resource.add(state, 'energy', gain);
      return { success: true, logKey: 'rest_log', logGain: gain };
    }
  },
  'action-meditieren': {
    cost: 0, costType: 'energy',
    sfx: 'click',
    particleText: '+ Magie',
    particleType: 'magic',
    yieldType: 'magic',
    counter: 'magic',
    calculateYield: (state) => {
        return 15;
    },
    execute: (state) => {
      const gain = gatheringActions['action-meditieren'].calculateYield(state);
      state.resource.add(state, 'magic', 15); // Note: add() computes multiplier again
      return { success: true, logKey: 'meditate_log' };
    }
  },
  'action-study': {
    cost: 20, costType: 'magic',
    sfx: 'click',
    particleText: '+ Magie Max',
    particleType: 'magic',
    calculateYield: (state) => {
        let gain = 8;
        if (state.inventory.includes('craft-chair')) gain += 7;
        const bookCount = state.resources.books || 0;
        gain += (bookCount * 2);
        return gain;
    },
    execute: (state) => {
      if (state.resource.consume(state, 'magic', 20)) {
        const gain = gatheringActions['action-study'].calculateYield(state);
        state.stats.maxMagic += gain;
        state.counters.study = (state.counters.study || 0) + 1;
        return { success: true, logKey: 'study_success', logGain: gain, logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-wood': {
    cost: 10, costType: 'energy', yieldType: 'wood',
    sfx: 'gather',
    particleText: '+ Holz',
    particleType: 'wood',
    counter: 'wood',
    calculateYield: (state) => {
      let base = state.inventory.includes('craft-axe') ? 2 : 1;
      if (state.inventory.includes('craft-wanderstock')) base += 1;
      return base;
    },
    execute: (state) => {
      if (state.resource.isFull(state, 'wood')) return { success: false };
      if (state.resource.consume(state, 'energy', 10)) {
        const gain = gatheringActions['action-wood'].calculateYield(state);
        state.resource.add(state, 'wood', gain);
        const hasAxe = state.inventory.includes('craft-axe');
        return { success: true, logKey: hasAxe ? 'wood_axe_log' : 'wood_log', logGain: gain };
      } return { success: false };
    }
  },
  'action-stone': {
    cost: 15, costType: 'energy', yieldType: 'stone',
    sfx: 'gather',
    particleText: '+ Stein',
    particleType: 'stone',
    counter: 'stone',
    calculateYield: (state) => {
        let base = state.inventory.includes('craft-pickaxe') ? 2 : 1;
        return base;
    },
    execute: (state) => {
      if (state.resource.isFull(state, 'stone')) return { success: false };
      if (state.resource.consume(state, 'energy', 15)) {
        const gain = gatheringActions['action-stone'].calculateYield(state);
        state.resource.add(state, 'stone', gain);
        const hasPickaxe = state.inventory.includes('craft-pickaxe');
        return { success: true, logKey: hasPickaxe ? 'stone_axe_log' : 'stone_log', logGain: gain };
      } return { success: false };
    }
  },
  'action-hunt': {
    cost: 25, costType: 'energy', yieldType: 'meat',
    sfx: 'gather',
    particleText: '+ Fleisch',
    particleType: 'energy',
    counter: 'food',
    calculateYield: (state) => 2,
    execute: (state) => {
      if (state.resource.isFull(state, 'meat')) return { success: false };
      const gain = gatheringActions['action-hunt'].calculateYield(state);
      if (state.resource.consume(state, 'energy', 25) && state.inventory.includes('craft-bow')) {
        state.resource.add(state, 'meat', gain);
        return { success: true, logKey: 'hunt_log', logGain: gain };
      } return { success: false };
    }
  }
};
