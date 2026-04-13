export const villageActions = {
  'action-sell-wood': {
    cost: 1, costType: 'wood',
    execute: (state) => {
      if (state.resources.wood >= 1 && state.resources.shards < state.limits.shards) {
        state.resources.wood--;
        state.resources.shards += 5;
        return { success: true, logKey: 'sell_wood_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-sell-stone': {
    cost: 1, costType: 'stone',
    execute: (state) => {
      if (state.resources.stone >= 1 && state.resources.shards < state.limits.shards) {
        state.resources.stone--;
        state.resources.shards += 8;
        return { success: true, logKey: 'sell_stone_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-sell-meat': {
    cost: 1, costType: 'meat',
    execute: (state) => {
      if (state.resources.meat >= 1 && state.resources.shards < state.limits.shards) {
        state.resources.meat--;
        state.resources.shards += 15;
        return { success: true, logKey: 'sell_meat_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-buy-meat': {
    cost: 12, costType: 'shards',
    execute: (state) => {
      if (state.resources.shards >= 12 && state.resources.meat < state.limits.meat) {
        state.resources.shards -= 12;
        state.resources.meat += 1;
        return { success: true, logKey: 'buy_meat_log' };
      } return { success: false };
    }
  },
  'action-work': {
    cost: 30, costType: 'energy',
    execute: (state) => {
      if (state.stats.energy >= 30 && state.resources.shards < state.limits.shards) {
        state.stats.energy -= 30;
        state.housing.laborCount++;
        state.resources.shards += 12;
        return { success: true, logKey: 'work_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  }
};
