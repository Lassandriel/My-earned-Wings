export const gardenConstruction = {
  'build-garden': {
    id: 'build-garden',
    title: 'action_build_garden_title',
    desc: 'action_build_garden_desc',
    category: 'garden',
    chapter: 'Establishment',
    costs: { wood: 20, stone: 20 },
    image: 'img/addons/garden.webp',
    requirements: { 
      'flags.build-house': true, 
      'flags.build-garden': { op: '!=', val: true } 
    },
    sfx: 'success',
    onSuccess: [
      { type: 'setFlag', flag: 'build-garden', value: true }
    ],
    logKey: 'milestone_garden',
    logColor: 'var(--accent-teal)',
  },
  'build-garden-upgrade': {
    id: 'build-garden-upgrade',
    icon: '🏗️',
    category: 'garden',
    chapter: 'Refinement',
    costs: { wood: 50, stone: 50, water: 20 },
    requirements: {
      'flags.build-garden': true,
      'flags.blueprint-garden-upgrade': true,
      'flags.gardenLevel': { op: '<', val: 2 },
    },
    sfx: 'success',
    onSuccess: [
      { type: 'setFlag', flag: 'gardenLevel', value: 2 },
      { type: 'setFlag', flag: 'build-garden-upgrade', value: true }
    ],
    logKey: 'milestone_garden_upgrade',
    logColor: 'var(--accent-teal)',
    modifiers: [{ key: 'garden_yield', mult: 1.5 }],
  },
  'build-mana-basin': {
    id: 'build-mana-basin',
    title: 'action_build_mana_basin_title',
    desc: 'action_build_mana_basin_desc',
    category: 'garden',
    costs: { stone: 100, glowpollen: 20, clay: 20, resin: 5 },
    image: 'img/addons/mana_basin.webp',
    requirements: { 'flags.build-garden-upgrade': true, 'flags.build-mana-basin': { op: '!=', val: true } },
    sfx: 'magic',
    onSuccess: [
      { type: 'setFlag', flag: 'build-mana-basin', value: true },
      { type: 'unlockItem', id: 'item-mana-basin' },
    ],
  },
};
