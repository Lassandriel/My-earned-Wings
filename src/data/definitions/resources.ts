import { ResourceDefinition } from '../../types/game';

/**
 * Resource Registry - TypeScript Edition
 * Defines all resources and stats in the game.
 */
export const RESOURCE_REGISTRY: Record<string, ResourceDefinition> = {
  // --- CORE STATS ---
  energy: {
    id: 'energy',
    type: 'stat',
    category: 'vitality',
    color: 'var(--accent-teal)',
    initial: 50,
    initialMax: 50,
    isEssential: true,
    wingSlot: 'left',
    scalesWithSatiation: true,
  },
  magic: {
    id: 'magic',
    type: 'stat',
    category: 'vitality',
    color: 'var(--accent-purple)',
    initial: 50,
    initialMax: 50,
    isEssential: true,
    wingSlot: 'right',
    scalesWithSatiation: true,
  },
  satiation: {
    id: 'satiation',
    type: 'stat',
    category: 'vitality',
    color: 'var(--gold)',
    initial: 100,
    initialMax: 100,
    isEssential: true,
    wingSlot: 'head',
    scalesWithSatiation: false,
  },

  // --- BASE MATERIALS ---
  wood: {
    id: 'wood',
    type: 'resource',
    category: 'materials',
    color: 'var(--gold)',
    initial: 0,
    initialLimit: 25,
  },
  stone: {
    id: 'stone',
    type: 'resource',
    category: 'materials',
    color: 'var(--text-dim)',
    initial: 0,
    initialLimit: 25,
  },
  shards: {
    id: 'shards',
    type: 'resource',
    category: 'materials',
    color: 'var(--accent-teal)',
    initial: 0,
    initialLimit: 1000,
  },
  herbs: {
    id: 'herbs',
    type: 'resource',
    category: 'materials',
    color: 'var(--accent-teal)',
    initial: 0,
    initialLimit: 50,
  },
  astral_shards: {
    id: 'astral_shards',
    type: 'resource',
    category: 'materials',
    color: '#818cf8',
    initial: 0,
    initialLimit: 100,
  },
  flowers: {
    id: 'flowers',
    type: 'resource',
    category: 'materials',
    color: '#ec4899', // Pinkish color for flowers
    initial: 0,
    initialLimit: 25,
  },
  ghostwood: {
    id: 'ghostwood',
    type: 'resource',
    category: 'materials',
    color: '#94a3b8', // Slate/Ghostly grey
    initial: 0,
    initialLimit: 25,
  },
  glowpollen: {
    id: 'glowpollen',
    type: 'resource',
    category: 'materials',
    color: '#fbbf24', // Amber/Glowing
    initial: 0,
    initialLimit: 25,
  },
  fibers: {
    id: 'fibers',
    type: 'resource',
    category: 'materials',
    color: '#fde68a', // Light yellow for fibers
    initial: 0,
    initialLimit: 50,
  },
  resin: {
    id: 'resin',
    type: 'resource',
    category: 'materials',
    color: '#b45309', // Amber/Brown for resin
    initial: 0,
    initialLimit: 25,
  },
  iron_parts: {
    id: 'iron_parts',
    type: 'resource',
    category: 'materials',
    color: '#64748b', // Iron grey
    initial: 0,
    initialLimit: 25,
  },
  clay: {
    id: 'clay',
    type: 'resource',
    category: 'materials',
    color: '#a8a29e', // Clay/Earth
    initial: 0,
    initialLimit: 50,
  },
  rune_fragment: {
    id: 'rune_fragment',
    type: 'resource',
    category: 'materials',
    color: '#8b5cf6', // Purple for magic
    initial: 0,
    initialLimit: 50,
  },

  // --- PROVISIONS ---
  meat: {
    id: 'meat',
    type: 'resource',
    category: 'provisions',
    color: '#f87171',
    initial: 0,
    initialLimit: 10,
  },
  water: {
    id: 'water',
    type: 'resource',
    category: 'provisions',
    color: '#60a5fa',
    initial: 0,
    initialLimit: 10,
  },
  'gourmet-meal': {
    id: 'gourmet-meal',
    type: 'resource',
    category: 'provisions',
    color: '#fbbf24',
    initial: 0,
    initialLimit: 10,
  },

  // --- KNOWLEDGE ---
  books: {
    id: 'books',
    type: 'resource',
    category: 'knowledge',
    color: '#a78bfa',
    initial: 0,
    initialLimit: 0,
  },
  study_xp: {
    id: 'study_xp',
    type: 'resource',
    category: 'knowledge',
    color: '#3b82f6',
    initial: 0,
    initialLimit: 100,
  },
  // --- SPECIAL ---
  focus: {
    id: 'focus',
    type: 'resource',
    category: 'knowledge',
    color: 'var(--accent-purple)',
    initial: 0,
    initialLimit: 1,
  },
};

export const getEssentialStats = (): ResourceDefinition[] =>
  Object.values(RESOURCE_REGISTRY).filter((r) => r.type === 'stat');

export const getStandardResources = (): ResourceDefinition[] =>
  Object.values(RESOURCE_REGISTRY).filter((r) => r.type === 'resource');
