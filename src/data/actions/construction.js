/**
 * Construction Actions - Core 3.0
 * Unified registry for Crafting and Housing actions.
 * Categories: camp, housing, workshop, garden.
 */
export const constructionActions = {
  // === CAMP & STORAGE (Chapter: The Beginning) ===
  'build-campfire': {
    id: 'build-campfire',
    isStory: true, chapter: 'The Beginning',
    category: 'camp',
    cost: 5, costType: 'wood', image: 'img/items/Housing_Campfire.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-campfire', value: true },
        { type: 'unlockNPC', id: 'npc-flowerGirl' }
    ],
    logKey: 'milestone_campfire',
    logColor: 'var(--gold)'
  },
  'build-tent': {
    id: 'build-tent',
    isStory: true, chapter: 'The Beginning',
    category: 'camp',
    requirements: { 'flags.build-campfire': true },
    costType: 'mixed',
    costs: { wood: 15, stone: 5 },
    image: 'img/items/Housing_tent.webp',
    sfx: 'success',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-tent', value: true },
        { type: 'unlockNPC', id: 'npc-townHall' }
    ],
    logKey: 'milestone_tent',
    logColor: 'var(--gold)'
  },
  'build-wood-storage': {
    id: 'build-wood-storage',
    isStory: true, chapter: 'Establishment',
    category: 'camp',
    requirements: { 'flags.build-campfire': true },
    cost: 20, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-wood-storage', value: true },
        { type: 'modifyLimit', resource: 'wood', amount: 25 },
        { type: 'unlockNPC', id: 'npc-artisan' }
    ],
    logKey: 'milestone_wood_storage',
    logColor: 'var(--gold)'
  },
  'build-stone-storage': {
    id: 'build-stone-storage',
    isStory: true, chapter: 'Establishment',
    category: 'camp',
    requirements: { 'flags.build-campfire': true },
    cost: 20, costType: 'stone',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-stone-storage', value: true },
        { type: 'modifyLimit', resource: 'stone', amount: 25 },
        { type: 'unlockNPC', id: 'npc-artisan' }
    ],
    logKey: 'milestone_stone_storage',
    logColor: 'var(--gold)'
  },

  // === HOUSING (Chapter: Establishment) ===
  'build-house': {
    id: 'build-house',
    isStory: true, chapter: 'Establishment',
    category: 'housing',
    costType: 'mixed',
    costs: { wood: 40, stone: 40 },
    image: 'img/items/Housing_stove.webp', 
    requirements: { 'flags.item-deed': true },
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-house', value: true },
        { type: 'modifyLimit', resource: 'wood', amount: 75 },
        { type: 'modifyLimit', resource: 'stone', amount: 125 },
        { type: 'unlockRecipe', id: 'act-bed' },
        { type: 'unlockRecipe', id: 'act-chair' },
        { type: 'unlockRecipe', id: 'act-stove' }
    ],
    logKey: 'milestone_house',
    logColor: 'var(--gold)'
  },
  'build-table': {
    id: 'build-table',
    isStory: true, chapter: 'Establishment',
    category: 'housing',
    requirements: { 'flags.build-house': true },
    cost: 40, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-table', value: true },
        { type: 'unlockNPC', id: 'npc-sage' },
        { type: 'unlockRecipe', id: 'act-bookshelf' }
    ],
    logKey: 'milestone_table',
    logColor: 'var(--gold)'
  },
  'build-kitchen': {
    id: 'build-kitchen',
    isStory: true, chapter: 'Refinement',
    category: 'housing',
    costType: 'mixed',
    costs: { wood: 80, stone: 40 },
    requirements: { 'flags.build-house': true },
    sfx: 'craft',
    particleText: 'Mahlzeit!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-kitchen', value: true }
    ],
    logKey: 'milestone_kitchen',
    logColor: 'var(--gold)'
  },
  'build-arcane-sanctum': {
    id: 'build-arcane-sanctum',
    isStory: true, chapter: 'Refinement',
    category: 'housing',
    costType: 'mixed',
    costs: { stone: 150, magic: 50 },
    requirements: { 'flags.build-house': true, 'flags.build-table': true },
    sfx: 'magic',
    particleText: 'Arkane Macht!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-arcane-sanctum', value: true },
        { type: 'unlockNPC', id: 'npc-aris' },
        { type: 'unlockRecipe', id: 'act-meditate' }
    ],
    logKey: 'milestone_sanctum',
    logColor: 'var(--accent-purple)'
  },

  // === WORKSHOP & TOOLS (Chapter: Various) ===
  'act-wanderstock': {
    id: 'act-wanderstock',
    category: 'workshop',
    requirements: { 'flags.unlock-wanderstock': true },
    cost: 5, costType: 'wood', image: 'img/items/Crafting_walkingstick.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-walking-stick' }],
    logKey: 'craft_wanderstock'
  },
  'act-axe': {
    id: 'act-axe',
    category: 'workshop',
    requirements: { 'flags.unlock-artisan-tools': true },
    cost: 20, costType: 'wood', image: 'img/items/Crafting_axe_1.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-axe' }],
    logKey: 'craft_axe'
  },
  'act-pickaxe': {
    id: 'act-pickaxe',
    category: 'workshop',
    requirements: { 'flags.unlock-artisan-tools': true },
    costType: 'mixed',
    costs: { stone: 15, wood: 10 },
    image: 'img/items/Crafting_pickaxe_1.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-pickaxe' }],
    logKey: 'craft_pickaxe'
  },
  'act-bow': {
    id: 'act-bow',
    category: 'workshop',
    requirements: { 'flags.unlock-bow': true },
    cost: 30, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-bow' }],
    logKey: 'craft_bow'
  },
  'act-bed': {
    id: 'act-bed',
    category: 'workshop',
    requirements: { 'flags.build-house': true },
    cost: 25, costType: 'wood', image: 'img/items/Crafting_bed.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-bed' }],
    logKey: 'craft_bed'
  },
  'act-chair': {
    id: 'act-chair',
    category: 'workshop',
    requirements: { 'flags.build-house': true },
    cost: 10, costType: 'wood', image: 'img/items/Crafting_chair.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-chair' }],
    logKey: 'craft_chair'
  },
  'act-stove': {
    id: 'act-stove',
    category: 'workshop',
    requirements: { 'flags.build-house': true },
    costType: 'mixed',
    costs: { stone: 25, wood: 15 },
    image: 'img/items/Crafting_stove.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [{ type: 'unlockItem', id: 'item-stove' }],
    logKey: 'craft_stove'
  },
  'act-bookshelf': {
    id: 'act-bookshelf',
    category: 'workshop',
    cost: 25, costType: 'wood', image: 'img/items/Crafting_bookshelf.webp',
    requirements: { 'flags.build-table': true },
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: [
        { type: 'unlockItem', id: 'item-bookshelf' },
        { type: 'setFlag', flag: 'build-bookshelf', value: true },
        { type: 'modifyLimit', resource: 'books', amount: 5 },
        { type: 'unlockRecipe', id: 'act-book' }
    ],
    logKey: 'craft_bookshelf',
    logColor: 'rgba(20, 184, 166, 0.9)'
  },
  'act-book': {
    id: 'act-book',
    category: 'workshop',
    requirements: { 'flags.build-bookshelf': true },
    costType: 'mixed',
    costs: { shards: 10, wood: 5 },
    yieldType: 'books',
    sfx: 'craft',
    particleText: 'Wissen!',
    particleType: 'shards',
    rewards: { books: 1 },
    logKey: 'craft_book',
    logColor: 'rgba(251, 191, 36, 0.9)'
  },
  'act-cabinet': {
    id: 'act-cabinet',
    category: 'workshop',
    cost: 60, costType: 'wood', image: 'img/items/Crafting_cabinet.webp',
    requirements: { 'flags.build-house': true, 'flags.build-kitchen': true },
    sfx: 'craft',
    particleText: 'Stauraum!',
    particleType: 'shards',
    onSuccess: [
        { type: 'unlockItem', id: 'item-cabinet' },
        { type: 'modifyLimit', resource: 'meat', amount: 10 },
        { type: 'modifyLimit', resource: 'water', amount: 10 },
        { type: 'modifyLimit', resource: 'herbs', amount: 20 }
    ],
    logKey: 'craft_cabinet'
  },
  'act-spice-rack': {
    id: 'act-spice-rack',
    category: 'workshop',
    costType: 'mixed',
    costs: { wood: 30, herbs: 10 },
    requirements: { 'flags.build-kitchen': true },
    sfx: 'craft',
    particleText: 'Würzig!',
    onSuccess: [{ type: 'unlockItem', id: 'item-spice-rack' }],
    logKey: 'act-spice-rack'
  },
  'act-grand-table': {
    id: 'act-grand-table',
    category: 'workshop',
    cost: 100, costType: 'wood', image: 'img/items/Crafting_table_massive.webp',
    requirements: { 'flags.build-table': true, 'flags.build-kitchen': true },
    sfx: 'craft',
    particleText: 'Prachtvoll!',
    onSuccess: [{ type: 'unlockItem', id: 'item-grand-table' }],
    logKey: 'act-grand-table'
  },

  // === GARDEN & NATURE ===
  'build-garden': {
    id: 'build-garden',
    category: 'garden',
    isStory: true, chapter: 'Establishment',
    costType: 'mixed',
    costs: { wood: 20, stone: 20 },
    requirements: { 'flags.build-house': true },
    sfx: 'success',
    particleText: 'Wunderschön!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'build-garden', value: true },
        { type: 'unlockNPC', id: 'npc-ellie' }
    ],
    logKey: 'milestone_garden',
    logColor: 'var(--accent-teal)'
  },
  'build-garden-upgrade': {
    id: 'build-garden-upgrade',
    category: 'garden',
    isStory: true, chapter: 'Refinement',
    costType: 'mixed',
    costs: { wood: 50, stone: 50, water: 20 },
    requirements: { 'flags.build-garden': true },
    sfx: 'success',
    particleText: 'Wuchernd!',
    particleType: 'shards',
    onSuccess: [ 
        { type: 'setFlag', flag: 'gardenLevel', value: 2 }
    ],
    logKey: 'milestone_garden_upgrade',
    logColor: 'var(--accent-teal)'
  },
  'act-bed-2': {
    id: 'act-bed-2',
    category: 'workshop',
    costType: 'mixed',
    costs: { shards: 150, magic: 40 },
    requirements: { 'flags.item-bed': true, 'flags.item-crystal-mana': true },
    sfx: 'magic',
    particleText: 'Unfassbar bequem!',
    onSuccess: [{ type: 'unlockItem', id: 'item-bed-2' }],
    logKey: 'craft_bed_2'
  },
  'act-stove-2': {
    id: 'act-stove-2',
    category: 'workshop',
    costType: 'mixed',
    costs: { shards: 200, stone: 50 },
    requirements: { 'flags.item-stove': true, 'flags.item-crystal-mana': true },
    sfx: 'magic',
    particleText: 'Arkaner Genuss!',
    onSuccess: [{ type: 'unlockItem', id: 'item-stove-2' }],
    logKey: 'craft_stove_2'
  }
};
