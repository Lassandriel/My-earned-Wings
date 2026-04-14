export const gatheringActions = {
  'action-essen': {
    cost: 0, costType: 'energy',
    sfx: 'eat',
    particleText: '+ Sättigung',
    particleType: 'energy',
    yieldType: 'satiation',
    counter: 'food',
    execute: (state) => {
      let sGain = 20;
      let eGain = 2;
      if (state.inventory.includes('craft-stove')) {
        sGain += 15;
        eGain += 3;
      }
      state.resource.add(state, 'satiation', sGain);
      state.resource.add(state, 'energy', eGain);
      return { success: true, logKey: 'eat_log', logGain: sGain };
    }
  },
  'action-ausruhen': {
    cost: 0, costType: 'energy',
    sfx: 'click',
    particleText: '+ Energie',
    particleType: 'energy',
    execute: (state) => {
      let gain = 10;
      if (state.housing.hasCampfire) gain += 10;
      if (state.housing.hasTent) gain += 15;
      if (state.inventory.includes('craft-bed')) gain += 25;
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
    execute: (state) => {
      state.resource.add(state, 'magic', 15);
      return { success: true, logKey: 'meditate_log' };
    }
  },
  'action-study': {
    cost: 20, costType: 'magic',
    sfx: 'click',
    particleText: '+ Magie Max',
    particleType: 'magic',
    execute: (state) => {
      if (state.resource.consume(state, 'magic', 20)) {
        let gain = 5;
        if (state.inventory.includes('craft-chair')) gain += 5;
        if (state.housing.hasBookshelf) gain += 5;
        state.stats.maxMagic += gain;
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
    execute: (state) => {
      if (state.resource.isFull(state, 'wood')) return { success: false };
      const cost = Math.ceil(10 * (state.costMultiplier || 1));
      if (state.resource.consume(state, 'energy', cost)) {
        let gain = state.inventory.includes('craft-axe') ? 2 : 1;
        if (state.inventory.includes('craft-wanderstock')) gain += 1;
        
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
    execute: (state) => {
      if (state.resource.isFull(state, 'stone')) return { success: false };
      const cost = Math.ceil(15 * (state.costMultiplier || 1));
      if (state.resource.consume(state, 'energy', cost)) {
        const hasPickaxe = state.inventory.includes('craft-pickaxe');
        let gain = hasPickaxe ? 2 : 1;
        
        state.resource.add(state, 'stone', gain);
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
    execute: (state) => {
      if (state.resource.isFull(state, 'meat')) return { success: false };
      const cost = Math.ceil(25 * (state.costMultiplier || 1));
      if (state.resource.consume(state, 'energy', cost) && state.inventory.includes('craft-bow')) {
        let gain = 2;
        state.resource.add(state, 'meat', gain);
        return { success: true, logKey: 'hunt_log', logGain: gain };
      } return { success: false };
    }
  }
};
