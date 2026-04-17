export const gatheringActions = {
  'action-essen': {
    cost: 0, costType: 'none',
    sfx: 'eat',
    particleText: '+ Sättigung',
    particleType: 'energy',
    yieldType: 'satiation',
    counter: 'food',
    rewards: { satiation: 'eat_satiation_gain' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'eat_satiation_gain', 1) };
    },
    logKey: 'eat_log'
  },
  'action-ausruhen': {
    cost: 0, costType: 'none',
    rewards: { energy: 'rest_energy_gain' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'rest_energy_gain', 1) };
    },
    logKey: 'rest_log'
  },
  'action-meditieren': {
    cost: 0, costType: 'none',
    sfx: 'click',
    particleText: '+ Magie',
    particleType: 'magic',
    yieldType: 'magic',
    counter: 'magic',
    rewards: { magic: 15 },
    calculateYield(store) {
      return { val: 15 };
    },
    logKey: 'meditate_log'
  },
  'action-study': {
    cost: 20, costType: 'magic',
    sfx: 'click',
    particleText: '+ Magie Max',
    particleType: 'magic',
    rewards: { maxMagic: 'magic_limit_gain' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'magic_limit_gain', 1) };
    },
    logKey: 'study_success',
    logColor: 'var(--accent-teal)'
  },
  'action-wood': {
    cost: 10, costType: 'energy', yieldType: 'wood',
    sfx: 'gather',
    particleText: '+ Holz',
    particleType: 'wood',
    counter: 'wood',
    rewards: { wood: 'wood_yield' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'wood_yield', 1) };
    },
    logKey: 'wood_log'
  },
  'action-stone': {
    cost: 15, costType: 'energy', yieldType: 'stone',
    sfx: 'gather',
    particleText: '+ Stein',
    particleType: 'stone',
    counter: 'stone',
    rewards: { stone: 'stone_yield' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'stone_yield', 1) };
    },
    logKey: 'stone_log'
  },
  'action-hunt': {
    cost: 25, costType: 'energy', yieldType: 'meat',
    requirements: { upgrades: 'craft-bow' },
    sfx: 'gather',
    particleText: '+ Fleisch',
    particleType: 'energy',
    counter: 'food',
    rewards: { meat: 2 },
    calculateYield(store) {
      return { val: 2 };
    },
    logKey: 'hunt_log'
  }
};
