export const housingActions = {
  'house-campfire': {
    isStory: true, chapter: 'The Beginning',
    cost: 5, costType: 'wood', image: 'img/Housing_Campfire.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasCampfire': true },
        unlocks: ['npc-flowerGirl']
    },
    logKey: 'milestone_campfire',
    logColor: 'var(--gold)'
  },
  'house-tent': {
    isStory: true, chapter: 'The Beginning',
    costType: 'mixed',
    costs: { wood: 15, stone: 5 },
    image: 'img/Housing_tent.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasTent': true },
        unlocks: ['npc-townHall']
    },
    logKey: 'milestone_tent',
    logColor: 'var(--gold)'
  },
  'house-wood-storage': {
    isStory: true, chapter: 'Establishment',
    cost: 20, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasWoodStorage': true },
        limits: { wood: 10 },
        unlocks: ['npc-artisan']
    },
    logKey: 'milestone_wood_storage',
    logColor: 'var(--gold)'
  },
  'house-stone-storage': {
    isStory: true, chapter: 'Establishment',
    cost: 20, costType: 'stone',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasStoneStorage': true },
        limits: { stone: 10 },
        unlocks: ['npc-artisan']
    },
    logKey: 'milestone_stone_storage',
    logColor: 'var(--gold)'
  },
  'house-table': {
    isStory: true, chapter: 'Establishment',
    cost: 40, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasTable': true },
        unlocks: ['npc-sage', 'craft-bookshelf']
    },
    logKey: 'milestone_table',
    logColor: 'var(--gold)'
  },
  'house-build': {
    isStory: true, chapter: 'Establishment',
    costType: 'mixed',
    costs: { wood: 30, stone: 30 },
    image: 'img/Housing_stove.webp', // Using existing if build not found
    requirements: { 'housing.hasLandDeed': true },
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasHouse': true },
        limits: { wood: 50, stone: 50 },
        unlocks: ['craft-bed', 'craft-chair', 'craft-stove']
    },
    logKey: 'milestone_house',
    logColor: 'var(--gold)'
  },
  'house-garden': {
    isStory: true, chapter: 'Establishment',
    costType: 'mixed',
    costs: { wood: 20, stone: 20 },
    requirements: { 'housing.hasHouse': true },
    sfx: 'success',
    particleText: 'Wunderschön!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasGarden': true },
        unlocks: ['npc-ellie']
    },
    logKey: 'milestone_garden',
    logColor: 'var(--accent-teal)'
  },
  'house-kitchen-station': {
    isStory: true, chapter: 'Refinement',
    costType: 'mixed',
    costs: { wood: 80, stone: 40 },
    requirements: { 'housing.hasHouse': true },
    sfx: 'craft',
    particleText: 'Mahlzeit!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasKitchen': true }
    },
    logKey: 'milestone_kitchen',
    logColor: 'var(--gold)'
  },
  'house-arcane-sanctum': {
    isStory: true, chapter: 'Refinement',
    costType: 'mixed',
    costs: { stone: 150, magic: 50 },
    requirements: { 'housing.hasHouse': true, 'housing.hasTable': true },
    sfx: 'magic',
    particleText: 'Arkane Macht!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.hasSanctum': true },
        unlocks: ['npc-aris', 'action-meditate']
    },
    logKey: 'milestone_sanctum',
    logColor: 'var(--accent-purple)'
  },
  'house-garden-upgrade': {
    isStory: true, chapter: 'Refinement',
    costType: 'mixed',
    costs: { wood: 50, stone: 50, water: 20 },
    requirements: { 'housing.hasGarden': true },
    sfx: 'success',
    particleText: 'Wuchernd!',
    particleType: 'shards',
    onSuccess: { 
        flags: { 'housing.gardenLevel': 2 }
    },
    logKey: 'milestone_garden_upgrade',
    logColor: 'var(--accent-teal)'
  },
  'garden-water': {
    cost: 15, costType: 'energy',
    yieldType: 'water',
    requirements: { 'housing.hasGarden': true },
    sfx: 'water',
    particleText: 'Frisch!',
    rewards: { water: 1 },
    logKey: 'water_gain'
  }
};
