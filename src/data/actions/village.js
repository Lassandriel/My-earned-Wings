export const villageActions = {
  'action-sell-wood': {
    cost: 1, costType: 'wood', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    calculateYield: (state) => {
        return 5 * state.getTraitMultiplier('shards_bonus');
    },
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'wood', 1)) {
        const gain = villageActions['action-sell-wood'].calculateYield(state);
        state.resource.add(state, 'shards', 5);
        return { success: true, logKey: 'sell_wood_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-sell-stone': {
    cost: 1, costType: 'stone', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    calculateYield: (state) => {
        return 8 * state.getTraitMultiplier('shards_bonus');
    },
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'stone', 1)) {
        const gain = villageActions['action-sell-stone'].calculateYield(state);
        state.resource.add(state, 'shards', 8);
        return { success: true, logKey: 'sell_stone_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-sell-meat': {
    cost: 1, costType: 'meat', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    calculateYield: (state) => {
        return 15 * state.getTraitMultiplier('shards_bonus');
    },
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'meat', 1)) {
        const gain = villageActions['action-sell-meat'].calculateYield(state);
        state.resource.add(state, 'shards', 15);
        return { success: true, logKey: 'sell_meat_log', logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  },
  'action-buy-meat': {
    cost: 12, costType: 'shards', yieldType: 'meat',
    sfx: 'click',
    particleText: '+ Fleisch',
    particleType: 'energy',
    calculateYield: (state) => 1,
    execute: (state) => {
      if (state.resource.isFull(state, 'meat')) return { success: false };
      if (state.resource.consume(state, 'shards', 12)) {
        state.resource.add(state, 'meat', 1);
        return { success: true, logKey: 'buy_meat_log' };
      } return { success: false };
    }
  },
  'action-work': {
    cost: 30, costType: 'energy', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    calculateYield: (state) => {
        let sGain = Math.round(15 * (state.efficiency || 1));
        sGain = Math.max(2, sGain);
        return sGain * state.getTraitMultiplier('shards_bonus');
    },
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'energy', 30)) {
        const gain = villageActions['action-work'].calculateYield(state);
        let baseGain = Math.round(15 * (state.efficiency || 1));
        baseGain = Math.max(2, baseGain);
        state.resource.add(state, 'shards', baseGain);
        return { success: true, logKey: 'work_log', logGain: gain, logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  }
};
