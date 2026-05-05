import { ModifierDefinition } from '../../types/game';

/**
 * Global Modifiers Registry
 * Internal stats and multipliers that affect gameplay logic.
 */
export const MODIFIER_REGISTRY: Record<string, ModifierDefinition> = {
  wood_yield: { 
    id: 'wood_yield', 
    title: 'wood_yield_title', 
    desc: 'wood_yield_desc',
    baseValue: 3
  },
  stone_yield: { 
    id: 'stone_yield', 
    title: 'stone_yield_title', 
    desc: 'stone_yield_desc',
    baseValue: 2
  },
  meat_yield: {
    id: 'meat_yield',
    title: 'meat_yield_title',
    desc: 'meat_yield_desc',
    baseValue: 2
  },
  flowers_yield: {
    id: 'flowers_yield',
    title: 'flowers_yield_title',
    desc: 'flowers_yield_desc',
    baseValue: 4
  },
  shards_yield: {
    id: 'shards_yield',
    title: 'shards_yield_title',
    desc: 'shards_yield_desc',
    baseValue: 25
  },
  magic_yield: {
    id: 'magic_yield',
    title: 'magic_yield_title',
    desc: 'magic_yield_desc',
    baseValue: 15
  },
  rest_energy_gain: { 
    id: 'rest_energy_gain', 
    title: 'rest_energy_gain_title', 
    desc: 'rest_energy_gain_desc',
    baseValue: 10
  },
  eat_satiation_gain: { 
    id: 'eat_satiation_gain', 
    title: 'eat_satiation_gain_title', 
    desc: 'eat_satiation_gain_desc',
    baseValue: 10
  },
  garden_magic_cost: { 
    id: 'garden_magic_cost', 
    title: 'modifier_garden_magic_cost_title',
    desc: 'modifier_garden_magic_cost_desc',
    baseValue: 1,
  },
  ghostwood_yield: {
    id: 'ghostwood_yield',
    title: 'modifier_ghostwood_yield_title',
    desc: 'modifier_ghostwood_yield_desc',
    baseValue: 1,
  },
  glowpollen_yield: {
    id: 'glowpollen_yield',
    title: 'modifier_glowpollen_yield_title',
    desc: 'modifier_glowpollen_yield_desc',
    baseValue: 1,
  },
  magic_regen_passive: {
    id: 'magic_regen_passive',
    title: 'modifier_magic_regen_passive_title',
    desc: 'modifier_magic_regen_passive_desc',
    baseValue: 0,
  },
  study_efficiency: {
    id: 'study_efficiency',
    title: 'modifier_study_efficiency_title',
    desc: 'modifier_study_efficiency_desc',
    baseValue: 1,
  },
  energy_reg_bonus: {
    id: 'energy_reg_bonus',
    title: 'energy_reg_bonus_title',
    desc: 'energy_reg_bonus_desc',
    baseValue: 0
  },
  garden_yield: {
    id: 'garden_yield',
    title: 'garden_yield_title',
    desc: 'garden_yield_desc',
    baseValue: 3
  },
  magic_limit_gain: {
    id: 'magic_limit_gain',
    title: 'magic_limit_gain_title',
    desc: 'magic_limit_gain_desc',
    baseValue: 2
  },
  shards_limit: { id: 'shards_limit', title: 'ui_shards', desc: 'shards_limit_desc', baseValue: 1000 },
  wood_limit: { id: 'wood_limit', title: 'ui_wood', desc: 'wood_limit_desc', baseValue: 0 },
  stone_limit: { id: 'stone_limit', title: 'ui_stone', desc: 'stone_limit_desc', baseValue: 0 },
  herbs_limit: { id: 'herbs_limit', title: 'ui_herbs', desc: 'herbs_limit_desc', baseValue: 0 },
  meat_limit: { id: 'meat_limit', title: 'ui_meat', desc: 'meat_limit_desc', baseValue: 0 },
  water_limit: { id: 'water_limit', title: 'ui_water', desc: 'water_limit_desc', baseValue: 0 },
  books_limit: { id: 'books_limit', title: 'ui_books', desc: 'books_limit_desc', baseValue: 0 },
  energy_limit: { id: 'energy_limit', title: 'ui_energy', desc: 'energy_limit_desc', baseValue: 0 },
  magic_limit: { id: 'magic_limit', title: 'ui_magic', desc: 'magic_limit_desc', baseValue: 0 },
  resin_limit: { id: 'resin_limit', title: 'resin_limit_title', desc: 'resin_limit_desc', baseValue: 0 },
  clay_limit: { id: 'clay_limit', title: 'clay_limit_title', desc: 'clay_limit_desc', baseValue: 0 },
  iron_parts_limit: { id: 'iron_parts_limit', title: 'iron_parts_limit_title', desc: 'iron_parts_limit_desc', baseValue: 0 },
  resource_efficiency: { id: 'resource_efficiency', title: 'resource_efficiency_title', desc: 'resource_efficiency_desc', baseValue: 1 },
  arcane_focus_cost: {
    id: 'arcane_focus_cost',
    title: 'arcane_focus_cost_title',
    desc: 'arcane_focus_cost_desc',
    baseValue: 3
  },
  fibers_yield: {
    id: 'fibers_yield',
    title: 'modifier_fibers_yield_title',
    desc: 'modifier_fibers_yield_desc',
    baseValue: 3
  },
  clay_yield: {
    id: 'clay_yield',
    title: 'modifier_clay_yield_title',
    desc: 'modifier_clay_yield_desc',
    baseValue: 2
  },
  satiation_limit: { id: 'satiation_limit', title: 'ui_satiation', desc: 'limit_desc_generic', baseValue: 100 },
  astral_shards_limit: { id: 'astral_shards_limit', title: 'ui_astral_shards', desc: 'limit_desc_generic', baseValue: 0 },
  flowers_limit: { id: 'flowers_limit', title: 'ui_flowers', desc: 'limit_desc_generic', baseValue: 0 },
  ghostwood_limit: { id: 'ghostwood_limit', title: 'ui_ghostwood', desc: 'limit_desc_generic', baseValue: 0 },
  glowpollen_limit: { id: 'glowpollen_limit', title: 'ui_glowpollen', desc: 'limit_desc_generic', baseValue: 0 },
  fibers_limit: { id: 'fibers_limit', title: 'ui_fibers', desc: 'limit_desc_generic', baseValue: 0 },
  rune_fragment_limit: { id: 'rune_fragment_limit', title: 'ui_rune_fragment', desc: 'limit_desc_generic', baseValue: 0 },
  arcane_dust_limit: { id: 'arcane_dust_limit', title: 'ui_arcane_dust', desc: 'limit_desc_generic', baseValue: 0 },
  'gourmet-meal_limit': { id: 'gourmet-meal_limit', title: 'ui_gourmet-meal', desc: 'limit_desc_generic', baseValue: 0 },
  study_xp_limit: { id: 'study_xp_limit', title: 'ui_study_xp', desc: 'limit_desc_generic', baseValue: 0 },
  focus_limit: { id: 'focus_limit', title: 'ui_focus', desc: 'limit_desc_generic', baseValue: 0 },
};
