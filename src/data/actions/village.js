export const villageActions = {
  'action-sell-wood': {
    cost: 1, costType: 'wood', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'wood', 1)) {
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
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'stone', 1)) {
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
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'meat', 1)) {
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
    execute: (state) => {
      if (state.resource.isFull(state, 'shards')) return { success: false };
      if (state.resource.consume(state, 'energy', 30)) {
        state.housing.laborCount++;
        let sGain = Math.floor(12 * state.efficiency);
        sGain = Math.max(2, sGain);
        state.resource.add(state, 'shards', sGain);
        return { success: true, logKey: 'work_log', logGain: sGain, logColor: 'rgba(20, 184, 166, 0.9)' };
      } return { success: false };
    }
  }
};
