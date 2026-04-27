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
  wood: { id: 'wood', title: 'wood_title', desc: 'wood_limit_desc', baseValue: 50 },
  stone: { id: 'stone', title: 'stone_title', desc: 'stone_limit_desc', baseValue: 50 },
  herbs: { id: 'herbs', title: 'herbs_title', desc: 'herbs_limit_desc', baseValue: 20 },
  meat: { id: 'meat', title: 'meat_title', desc: 'meat_limit_desc', baseValue: 10 },
  water: { id: 'water', title: 'water_title', desc: 'water_limit_desc', baseValue: 10 },
  books: { id: 'books', title: 'books_title', desc: 'books_limit_desc', baseValue: 99 },
  energy: { id: 'energy', title: 'energy_title', desc: 'energy_limit_desc', baseValue: 100 },
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
};
