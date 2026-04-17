/**
 * Resource Registry
 * Defines all resources and stats in the game.
 * Centralized for Core 2.0.
 */
export const RESOURCE_REGISTRY = {
    // --- CORE STATS ---
    energy: {
        id: 'energy',
        type: 'stat',
        category: 'vitality',
        color: 'var(--accent-teal)',
        initial: 50,
        initialMax: 50,
        isEssential: true
    },
    magic: {
        id: 'magic',
        type: 'stat',
        category: 'vitality',
        color: 'var(--accent-purple)',
        initial: 50,
        initialMax: 50,
        isEssential: true
    },
    satiation: {
        id: 'satiation',
        type: 'stat',
        category: 'vitality',
        color: 'var(--gold)',
        initial: 100,
        initialMax: 100,
        isEssential: true,
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
        initialLimit: 10
    },
    'gourmet-meal': {
        id: 'gourmet-meal',
        type: 'resource',
        category: 'provisions',
        color: '#fbbf24',
        initial: 0,
        initialLimit: 10
    },

    // --- KNOWLEDGE ---
    books: {
        id: 'books',
        type: 'resource',
        category: 'knowledge',
        color: '#a78bfa',
        initial: 0,
        initialLimit: 0, 
    // --- SPECIAL ---
    focus: {
        id: 'focus',
        type: 'resource',
        category: 'knowledge',
        color: 'var(--accent-purple)',
        initial: 0,
        initialLimit: 1,
    }
};

export const getEssentialStats = () => 
    Object.values(RESOURCE_REGISTRY).filter(r => r.type === 'stat');

export const getStandardResources = () => 
    Object.values(RESOURCE_REGISTRY).filter(r => r.type === 'resource');
