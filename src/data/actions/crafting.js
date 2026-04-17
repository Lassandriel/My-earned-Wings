export const craftingActions = {
  'craft-wanderstock': {
    cost: 5, costType: 'wood', image: 'img/Crafting_walkingstick.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-wanderstock'] },
    logKey: 'craft_wanderstock'
  },
  'craft-axe': {
    cost: 20, costType: 'wood', image: 'img/Crafting_axe_1.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-axe'] },
    logKey: 'craft_axe'
  },
  'craft-pickaxe': {
    costType: 'mixed',
    costs: { stone: 15, wood: 10 },
    image: 'img/Crafting_pickaxe_1.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-pickaxe'] },
    logKey: 'craft_pickaxe'
  },
  'craft-bed': {
    cost: 25, costType: 'wood', image: 'img/Crafting_bed.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-bed'] },
    logKey: 'craft_bed'
  },
  'craft-chair': {
    cost: 10, costType: 'wood', image: 'img/Crafting_chair.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-chair'] },
    logKey: 'craft_chair'
  },
  'craft-stove': {
    costType: 'mixed',
    costs: { stone: 25, wood: 15 },
    image: 'img/Crafting_stove.webp',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-stove'] },
    logKey: 'craft_stove'
  },
  'craft-bookshelf': {
    cost: 25, costType: 'wood', image: 'img/Crafting_bookshelf.webp',
    requirements: { 'housing.hasTable': true },
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { 
        upgrades: ['craft-bookshelf'],
        flags: { 'housing.hasBookshelf': true },
        limits: { books: 5 },
        unlocks: ['craft-book']
    },
    logKey: 'craft_bookshelf',
    logColor: 'rgba(20, 184, 166, 0.9)'
  },
  'craft-bow': {
    cost: 30, costType: 'wood',
    sfx: 'craft',
    particleText: 'Hervorragend!',
    particleType: 'shards',
    onSuccess: { upgrades: ['craft-bow'] },
    logKey: 'craft_bow'
  },
  'craft-book': {
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
  'craft-cabinet': {
    cost: 60, costType: 'wood', image: 'img/Crafting_cabinet.webp',
    requirements: { 'housing.hasHouse': true, 'housing.hasKitchen': true },
    sfx: 'craft',
    particleText: 'Stauraum!',
    particleType: 'shards',
    onSuccess: { 
        upgrades: ['craft-cabinet'],
        limits: { meat: 10, water: 10, herbs: 20 }
    },
    logKey: 'craft_cabinet'
  },
  'craft-spice-rack': {
    costType: 'mixed',
    costs: { wood: 30, herbs: 10 },
    requirements: { 'housing.hasKitchen': true },
    sfx: 'craft',
    particleText: 'Würzig!',
    onSuccess: { upgrades: ['craft-spice-rack'] },
    logKey: 'craft_spice_rack'
  },
  'craft-grand-table': {
    cost: 100, costType: 'wood', image: 'img/Crafting_table_massive.webp',
    requirements: { 'housing.hasTable': true, 'housing.hasKitchen': true },
    sfx: 'craft',
    particleText: 'Prachtvoll!',
    onSuccess: { 
        upgrades: ['craft-grand-table']
    },
    logKey: 'craft_grand_table'
  }
};
