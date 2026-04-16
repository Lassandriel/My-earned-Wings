/**
 * Resource Registry
 * Defines all resources and stats in the game.
 * Scalability: Add a new entry here and the UI/Logic will auto-detect it.
 */
export const RESOURCE_REGISTRY = {
    // --- CORE STATS ---
    energy: {
        id: 'energy',
        type: 'stat',
        category: 'vitality',
        color: 'var(--accent-teal)',
        icon: '⚡',
        initial: 100,
        initialMax: 100,
        isEssential: true
    },
    magic: {
        id: 'magic',
        type: 'stat',
        category: 'vitality',
        color: '#a855f7', // Purple
        icon: '✨',
        initial: 100,
        initialMax: 100,
        isEssential: true
    },
    satiation: {
        id: 'satiation',
        type: 'stat',
        category: 'vitality',
        color: '#f97316', // Orange
        icon: '🍖',
        initial: 100,
        initialMax: 100,
        isEssential: true,
    },

    // --- BASE RESOURCES ---
    wood: {
        id: 'wood',
        type: 'resource',
        category: 'materials',
        color: '#d97706', // Amber
        icon: '🪵',
        initial: 0,
        initialLimit: 25,
    },
    stone: {
        id: 'stone',
        type: 'resource',
        category: 'materials',
        color: '#64748b', // Slate
        icon: '🪨',
        initial: 0,
        initialLimit: 25,
    },
    meat: {
        id: 'meat',
        type: 'resource',
        category: 'provisions',
        color: '#ef4444', // Red
        icon: '🥩',
        initial: 0,
        initialLimit: 10,
    },
    water: {
        id: 'water',
        type: 'resource',
        category: 'provisions',
        color: '#0ea5e9', // Sky Blue
        icon: '💧',
        initial: 0,
        initialLimit: 10
    },
    books: {
        id: 'books',
        type: 'resource',
        category: 'knowledge',
        color: '#6366f1', // Indigo
        icon: '📚',
        initial: 0,
        initialLimit: 0, 
    },
    shards: {
        id: 'shards',
        type: 'resource',
        category: 'materials',
        color: '#2dd4bf', // Teal
        icon: '💎',
        initial: 0,
        initialLimit: 1000,
    }
};

/**
 * Helper to get essential stats
 */
export const getEssentialStats = () => 
    Object.values(RESOURCE_REGISTRY).filter(r => r.type === 'stat');

/**
 * Helper to get standard resources
 */
export const getStandardResources = () => 
    Object.values(RESOURCE_REGISTRY).filter(r => r.type === 'resource');
