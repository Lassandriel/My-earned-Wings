/**
 * NPC Registry - Core 3.0
 * Standardized IDs with 'npc-' prefix.
 */
export const NPC_REGISTRY = {
    'npc-baker': {
        id: 'npc-baker',
        nameKey: 'npc_baker_name',
        icon: '🍞',
        color: '#f59e0b',
        image: 'img/npcs/Baker Geron.webp',
        progKey: 'baker', // Key in store.npcProgress
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-flowerGirl': {
        id: 'npc-flowerGirl',
        nameKey: 'npc_flowergirl_name',
        icon: '🌸',
        color: '#ec4899',
        image: 'img/npcs/Flower Girl.webp',
        progKey: 'flowerGirl',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-artisan': {
        id: 'npc-artisan',
        nameKey: 'npc_artisan_name',
        icon: '🏗️',
        color: '#d97706',
        image: 'img/npcs/Artisan.webp',
        progKey: 'artisan',
        maxProgress: 3,
        chapter: 'Village Life'
    },
    'npc-teacher': {
        id: 'npc-teacher',
        nameKey: 'npc_teacher_name',
        icon: '📖',
        color: '#3b82f6',
        image: 'img/npcs/Teacher.webp',
        progKey: 'teacher',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-townHall': {
        id: 'npc-townHall',
        nameKey: 'npc_townhall_name',
        icon: '🏛️',
        color: '#94a3b8',
        image: 'img/npcs/Town Hall.webp',
        progKey: 'townHall',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-blacksmith': {
        id: 'npc-blacksmith',
        nameKey: 'npc_blacksmith_name',
        icon: '⚒️',
        color: '#475569',
        image: 'img/npcs/Blacksmith.webp',
        progKey: 'blacksmith',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-sage': {
        id: 'npc-sage',
        nameKey: 'npc_sage_name',
        icon: '🔮',
        color: '#8b5cf6',
        image: 'img/npcs/Sage.webp',
        progKey: 'sage',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-hunter': {
        id: 'npc-hunter',
        nameKey: 'npc_hunter_name',
        icon: '🏹',
        color: '#10b981',
        image: 'img/npcs/Hunter.webp',
        progKey: 'hunter',
        maxProgress: 5,
        chapter: 'Village Life'
    },
    'npc-treeOfLife': {
        id: 'npc-treeOfLife',
        nameKey: 'npc_treeoflife_name',
        icon: '🌳',
        color: '#10b981',
        image: 'img/npcs/Tree of Life.webp',
        progKey: 'treeOfLife',
        maxProgress: 1,
        chapter: 'The Transformation'
    },
    'npc-ellie': {
        id: 'npc-ellie',
        nameKey: 'npc_ellie_name',
        icon: '✨',
        color: '#a78bfa',
        image: 'img/npcs/Ellie.webp',
        progKey: 'ellie',
        maxProgress: 5,
        chapter: 'The Dream'
    },
    'npc-aris': {
        id: 'npc-aris',
        nameKey: 'npc_aris_name',
        icon: '🧙‍♂️',
        color: '#8b5cf6',
        image: 'img/npcs/Archmage.webp',
        progKey: 'aris',
        maxProgress: 5,
        chapter: 'The Dream'
    }
};

export const getNpcsByChapter = (chapter) => 
    Object.values(NPC_REGISTRY).filter(npc => npc.chapter === chapter);
