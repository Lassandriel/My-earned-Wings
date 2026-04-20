/**
 * Village Actions - TypeScript Version
 */
export const villageActions: Record<string, any> = {
  'act-sell-wood': {
    id: 'act-sell-wood',
    cost: 1, costType: 'wood', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 5 },
    logKey: 'sell_wood_log',
    logColor: 'var(--accent-teal)'
  },
  'act-sell-stone': {
    id: 'act-sell-stone',
    cost: 1, costType: 'stone', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 8 },
    logKey: 'sell_stone_log',
    logColor: 'var(--accent-teal)'
  },
  'act-sell-meat': {
    id: 'act-sell-meat',
    cost: 1, costType: 'meat', yieldType: 'shards',
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    counter: 'shards',
    rewards: { shards: 12 },
    logKey: 'sell_meat_log',
    logColor: 'var(--accent-teal)'
  },
  'act-buy-meat': {
    id: 'act-buy-meat',
    cost: 20, costType: 'shards', yieldType: 'meat',
    sfx: 'click',
    particleText: '+ Fleisch',
    particleType: 'energy',
    rewards: { meat: 1 },
    logKey: 'buy_meat_log'
  },
  'act-work': {
    id: 'act-work',
    cost: 30, costType: 'energy', yieldType: 'shards',
    requirements: { 'flags.unlocked-work': true },
    sfx: 'click',
    particleText: '+ Splitter',
    particleType: 'shards',
    isLoopable: true,
    rewards: { shards: 'shards_yield' },
    logKey: 'work_log',
    logColor: 'var(--accent-teal)'
  }
};
