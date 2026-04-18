export const gatheringActions = {
  'act-essen': {
    id: 'act-essen',
    cost: 0, costType: 'none',
    sfx: 'eat',
    particleText: '+ Sättigung',
    particleType: 'energy',
    yieldType: 'satiation',
    counter: 'food',
    rewards: { satiation: 'eat_satiation_gain' },
    satiationCost: 0,
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'eat_satiation_gain', 10) };
    },
    logKey: 'eat_log'
  },
  'act-ausruhen': {
    id: 'act-ausruhen',
    cost: 0, costType: 'none',
    rewards: { energy: 'rest_energy_gain' },
    satiationCost: 0,
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'rest_energy_gain', 1) };
    },
    logKey: 'rest_log'
  },
  'act-meditieren': {
    id: 'act-meditieren',
    cost: 0, costType: 'none',
    sfx: 'click',
    particleText: '+ Magie',
    particleType: 'magic',
    yieldType: 'magic',
    counter: 'magic',
    rewards: { magic: 15 },
    satiationCost: 0,
    calculateYield(store) {
      return { val: 15 };
    },
    logKey: 'meditate_log'
  },
  'act-study': {
    id: 'act-study',
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
  'act-wood': {
    id: 'act-wood',
    cost: 8, costType: 'energy', yieldType: 'wood',
    sfx: 'gather',
    particleText: '+ Holz',
    particleType: 'wood',
    counter: 'wood',
    isLoopable: true,
    rewards: { wood: 'wood_yield' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'wood_yield', 1) };
    },
    logKey: 'wood_log'
  },
  'act-stone': {
    id: 'act-stone',
    cost: 12, costType: 'energy', yieldType: 'stone',
    sfx: 'gather',
    particleText: '+ Stein',
    particleType: 'stone',
    counter: 'stone',
    isLoopable: true,
    rewards: { stone: 'stone_yield' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'stone_yield', 1) };
    },
    logKey: 'stone_log'
  },
  'act-hunt': {
    id: 'act-hunt',
    cost: 25, costType: 'energy', yieldType: 'meat',
    requirements: { 'item-bow': 1 }, // Changed to check for item ID in upgrades list logic
    sfx: 'gather',
    particleText: '+ Fleisch',
    particleType: 'energy',
    counter: 'food',
    isLoopable: true,
    rewards: { meat: 2 },
    calculateYield(store) {
      return { val: 2 };
    },
    logKey: 'hunt_log'
  },
  'act-garden-plant': {
    id: 'act-garden-plant',
    cost: 10, costType: 'energy',
    duration: 10000,
    requirements: { 'flags.build-garden': true },
    sfx: 'gather',
    particleText: '+ herbs',
    particleType: 'energy',
    yieldType: 'herbs',
    isLoopable: true,
    rewards: { herbs: 'garden_yield' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'garden_yield', 3) };
    },
    logKey: 'garden_harvest_log'
  },
  'act-garden-plant-2': {
    id: 'act-garden-plant-2',
    cost: 10, costType: 'energy',
    duration: 10000,
    requirements: { 'flags.gardenLevel': 2 },
    sfx: 'gather',
    particleText: '+ herbs',
    particleType: 'energy',
    yieldType: 'herbs',
    isLoopable: true,
    rewards: { herbs: 'garden_yield' },
    calculateYield(store) {
      return { val: store.pipeline.calculate(store, 'garden_yield', 3) };
    },
    logKey: 'garden_harvest_log'
  },
  'act-cook-gourmet': {
    id: 'act-cook-gourmet',
    costType: 'mixed',
    costs: { water: 2, meat: 2, herbs: 1 },
    duration: 5000,
    requirements: { 'flags.build-kitchen': true },
    sfx: 'eat',
    particleText: 'vfx_gourmet',
    yieldType: 'item-gourmet-meal',
    rewards: { 'item-gourmet-meal': 1 },
    onSuccess: [
        { type: 'addBuff', buffId: 'buff-gourmet' }
    ],
    logKey: 'cook_gourmet_success'
  }
};
