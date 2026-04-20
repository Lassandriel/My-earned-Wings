export const gatheringActions = {
  'act-essen': {
    id: 'act-essen',
    cost: 0, costType: 'none',
    sfx: 'eat',
    particleText: '+ Sättigung',
    particleType: 'energy',
    counter: 'food',
    rewards: { satiation: 'eat_satiation_gain' },
    satiationCost: 0,
    logKey: 'eat_log'
  },
  'act-ausruhen': {
    id: 'act-ausruhen',
    cost: 0, costType: 'none',
    sfx: 'click',
    particleText: '+ Energie',
    particleType: 'energy',
    counter: 'rest',
    rewards: { energy: 'rest_energy_gain' },
    satiationCost: 0,
    logKey: 'rest_log'
  },
  'act-meditieren': {
    id: 'act-meditieren',
    cost: 0, costType: 'none',
    sfx: 'magic',
    particleText: '+ Magie',
    particleType: 'magic',
    counter: 'magic',
    rewards: { magic: 15 },
    satiationCost: 0,
    logKey: 'meditate_log'
  },
  'act-study': {
    id: 'act-study',
    cost: 20, costType: 'magic',
    sfx: 'click',
    particleText: '+ Magie Max',
    particleType: 'magic',
    counter: 'study',
    rewards: { maxMagic: 'magic_limit_gain' },
    logKey: 'study_success',
    logColor: 'var(--accent-teal)'
  },
  'act-wood': {
    id: 'act-wood',
    cost: 8, costType: 'energy', yieldType: 'wood',
    sfx: 'gather',
    counter: 'wood',
    isLoopable: true,
    rewards: { wood: 'wood_yield' },
    particleText: 'ui_wood',
    particleType: 'wood',
    logKey: 'wood_log'
  },
  'act-stone': {
    id: 'act-stone',
    cost: 12, costType: 'energy', yieldType: 'stone',
    sfx: 'gather',
    counter: 'stone',
    isLoopable: true,
    rewards: { stone: 'stone_yield' },
    particleText: 'ui_stone',
    particleType: 'stone',
    logKey: 'stone_log'
  },
  'act-hunt': {
    id: 'act-hunt',
    cost: 25, costType: 'energy', yieldType: 'meat',
    requirements: { 'flags.item-bow': true }, // Corrected path to item flag
    sfx: 'gather',
    particleText: '+ Fleisch',
    particleType: 'energy',
    counter: 'food',
    isLoopable: true,
    rewards: { meat: 'meat_yield' },
    logKey: 'hunt_log'
  },
  'act-garden-plant': {
    id: 'act-garden-plant',
    cost: 10, costType: 'energy',
    duration: 10000,
    requirements: { 'flags.build-garden': true },
    sfx: 'gather',
    isLoopable: true,
    rewards: { herbs: 'garden_yield' },
    particleText: 'ui_herbs',
    particleType: 'energy',
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
    logKey: 'garden_harvest_log'
  },
  'act-cook-gourmet': {
    id: 'act-cook-gourmet',
    costType: 'mixed',
    costs: { water: 2, meat: 2, herbs: 1 },
    duration: 5000,
    requirements: { 'flags.build-kitchen': true },
    sfx: 'eat',
    onSuccess: [
        { type: 'addBuff', buffId: 'buff-gourmet' }
    ],
    particleText: 'item_gourmet_meal_title',
    logKey: 'cook_gourmet_success'
  }
};
