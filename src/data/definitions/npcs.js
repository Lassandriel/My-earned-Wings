/**
 * NPC Registry
 * Defines all characters and their base profiles.
 * Scalability: New characters are registered here with their visual data.
 */
export const NPC_REGISTRY = {
    'npc-baker': {
        id: 'npc-baker',
        nameKey: 'npc_baker_name',
        icon: '🍞',
        color: '#f59e0b',
        image: 'img/npcs/Baker Geron.png',
        progKey: 'baker',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-flowerGirl': {
        id: 'npc-flowerGirl',
        nameKey: 'npc_flowergirl_name',
        icon: '🌸',
        color: '#ec4899',
        image: 'img/npcs/Flower Girl.png',
        progKey: 'flowerGirl',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-artisan': {
        id: 'npc-artisan',
        nameKey: 'npc_artisan_name',
        icon: '🏗️',
        color: '#d97706',
        image: 'img/npcs/Artisan.png',
        progKey: 'artisan',
        maxProgress: 3,
        chapter: 'Village Life'
    },
    'npc-teacher': {
        id: 'npc-teacher',
        nameKey: 'npc_teacher_name',
        icon: '📖',
        color: '#3b82f6',
        image: 'img/npcs/Teacher.png',
        progKey: 'teacher',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-townHall': {
        id: 'npc-townHall',
        nameKey: 'npc_townhall_name',
        icon: '🏛️',
        color: '#94a3b8',
        image: 'img/npcs/Town Hall.png',
        progKey: 'townHall',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-blacksmith': {
        id: 'npc-blacksmith',
        nameKey: 'npc_blacksmith_name',
        icon: '⚒️',
        color: '#475569',
        image: 'img/npcs/Blacksmith.png',
        progKey: 'blacksmith',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-sage': {
        id: 'npc-sage',
        nameKey: 'npc_sage_name',
        icon: '🔮',
        color: '#8b5cf6',
        image: 'img/npcs/Sage.png',
        progKey: 'sage',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-hunter': {
        id: 'npc-hunter',
        nameKey: 'npc_hunter_name',
        icon: '🏹',
        color: '#10b981',
        image: 'img/npcs/Hunter.png',
        progKey: 'hunter',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-treeOfLife': {
        id: 'npc-treeOfLife',
        nameKey: 'npc_treeoflife_name',
        icon: '🌳',
        color: '#10b981',
        image: 'img/npcs/Tree of Life.png',
        progKey: 'treeOfLife',
        maxProgress: 1,
        chapter: 'The Transformation'
    }
};

/**
 * Get all NPCs in a specific chapter
 */
export const getNpcsByChapter = (chapter) => 
    Object.values(NPC_REGISTRY).filter(npc => npc.chapter === chapter);
