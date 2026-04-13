export const gatheringActions = {
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
        let gain = 5;
        if (state.inventory.includes('craft-chair')) gain += 5;
        if (state.housing.hasBookshelf) gain += 5;
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
  'action-hunt': {
    cost: 25, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 25 && state.inventory.includes('craft-bow') && state.resources.meat < state.limits.meat) {
        state.stats.energy -= 25;
        state.resources.meat += 2;
        return { success: true, logKey: 'hunt_log', logGain: 2 };
      } return { success: false };
    }
  }
};
