/**
 * Item Database - Core 3.0
 * Standardized IDs with 'item-' prefix for robustness.
 */
export const itemDb = {
  // --- TOOLS ---
  'item-walking-stick': {
    id: 'item-walking-stick',
    title: 'item_wanderstock_title',
    desc: 'item_wanderstock_desc',
    image: 'img/Crafting_walkingstick.webp',
    consumable: false,
    category: 'tools'
  },
  'item-axe': {
    id: 'item-axe',
    title: 'item_axe_title',
    desc: 'item_axe_desc',
    image: 'img/Crafting_axe_1.webp',
    consumable: false,
    category: 'tools'
  },
  'item-pickaxe': {
    id: 'item-pickaxe',
    title: 'item_pickaxe_title',
    desc: 'item_pickaxe_desc',
    image: 'img/Crafting_pickaxe_1.webp',
    consumable: false,
    category: 'tools'
  },
  'item-bow': {
    id: 'item-bow',
    title: 'item_bow_title',
    desc: 'item_bow_desc',
    image: 'img/Crafting_bow.webp',
    consumable: false,
    category: 'tools'
  },
  
  // --- PROVISIONS ---
  'item-bread': {
    id: 'item-bread',
    title: 'item_bread_title',
    desc: 'item_bread_desc',
    image: 'img/Item_Bread.webp',
    consumable: true,
    effect: { satiation: 25 },
    category: 'provisions'
  },
  'item-cookie': {
    id: 'item-cookie',
    title: 'item_cookie_title',
    desc: 'item_cookie_desc',
    image: 'img/Item_Cookie.webp',
    consumable: true,
    effect: { satiation: 40, energy: 5 },
    category: 'provisions'
  },
  'item-dried-meat': {
    id: 'item-dried-meat',
    title: 'item_dried_meat_title',
    desc: 'item_dried_meat_desc',
    image: 'img/Item_DriedMeat.webp',
    consumable: true,
    effect: { satiation: 15, energy: 15 },
    category: 'provisions'
  },
  'item-gourmet-meal': {
    id: 'item-gourmet-meal',
    title: 'item_gourmet_meal_title',
    desc: 'item_gourmet_meal_desc',
    image: 'img/Item_GourmetMeal.webp',
    consumable: true,
    effect: { satiation: 50, energy: 30 },
    category: 'provisions'
  },
  
  // --- ARTIFACTS ---
  'item-deed': {
    id: 'item-deed',
    title: 'item_deed_title',
    desc: 'item_deed_desc',
    image: 'img/Item_Deed.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-book-knowledge': {
    id: 'item-book-knowledge',
    title: 'item_book_knowledge_title',
    desc: 'item_book_knowledge_desc',
    image: 'img/Item_BookKnowledge.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-scroll': {
    id: 'item-scroll',
    title: 'item_scroll_title',
    desc: 'item_scroll_desc',
    image: 'img/Item_Scroll.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-whetstone': {
    id: 'item-whetstone',
    title: 'item_whetstone_title',
    desc: 'item_whetstone_desc',
    image: 'img/Item_Whetstone.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-arrowhead': {
    id: 'item-arrowhead',
    title: 'item_arrowhead_title',
    desc: 'item_arrowhead_desc',
    image: 'img/Item_Arrowhead.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-chisel': {
    id: 'item-chisel',
    title: 'item_chisel_title',
    desc: 'item_chisel_desc',
    image: 'img/Item_Chisel.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-astral-shards': {
    id: 'item-astral-shards',
    title: 'item_astral_shards_title',
    desc: 'item_astral_shards_desc',
    image: 'img/Item_AstralShard.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-dream-dust': {
    id: 'item-dream-dust',
    title: 'item_dream_dust_title',
    desc: 'item_dream_dust_desc',
    image: 'img/Item_DreamDust.webp',
    consumable: false,
    category: 'artifacts'
  },
  'item-wyvern-scale': {
    id: 'item-wyvern-scale',
    title: 'item_wyvern_scale_title',
    desc: 'item_wyvern_scale_desc',
    image: 'img/Item_WyvernScale.webp',
    consumable: false,
    category: 'artifacts'
  }
};
