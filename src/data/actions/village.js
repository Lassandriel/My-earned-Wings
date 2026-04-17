export const villageActions = {
  'action-sell-wood': {
    cost: 1, costType: 'wood', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 5 },
    logKey: 'sell_wood_log',
    logColor: 'var(--accent-teal)'
  },
  'action-sell-stone': {
    cost: 1, costType: 'stone', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 8 },
    logKey: 'sell_stone_log',
    logColor: 'var(--accent-teal)'
  },
  'action-sell-meat': {
    cost: 1, costType: 'meat', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 15 },
    logKey: 'sell_meat_log',
    logColor: 'var(--accent-teal)'
  },
  'action-buy-meat': {
    cost: 12, costType: 'shards', yieldType: 'meat',
    sfx: 'click',
    particleText: '+ Fleisch',
    particleType: 'energy',
    rewards: { meat: 1 },
    logKey: 'buy_meat_log'
  },
  'action-work': {
    cost: 30, costType: 'energy', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 'shards_yield' },
    logKey: 'work_log',
    logColor: 'var(--accent-teal)'
  }
};
