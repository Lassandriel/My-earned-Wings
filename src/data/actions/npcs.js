/**
 * NPC Actions - Core 3.0
 * Standardized with 'act-npc-' prefix.
 */
export const npcActions = {
  'act-npc-baker': {
    id: 'act-npc-baker',
    npcId: 'npc-baker',
    isStory: true, chapter: 'Village Life',
    progKey: 'baker', maxProgress: 5,
    journalIcon: '🍞', journalColor: '#f59e0b',
    image: 'npcs/Baker Geron.png',
    steps: [
        { cost: 10, costType: 'energy' },
        { costs: { wood: 30 }, reward: 'item-bread' }, // Corrected reward ID
        { cost: 20, costType: 'energy' },
        { costs: { wood: 15, stone: 15 }, reward: 'item-cookie' }, // Corrected reward ID
        { cost: 25, costType: 'energy' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-baker');
    }
  },
  'act-npc-flowerGirl': {
    id: 'act-npc-flowerGirl',
    npcId: 'npc-flowerGirl',
    isStory: true, chapter: 'Village Life',
    progKey: 'flowerGirl', maxProgress: 5,
    journalIcon: '🌸', journalColor: '#ec4899',
    steps: [
        { cost: 10, costType: 'energy' },
        { cost: 15, costType: 'energy' },
        { costs: { wood: 20 } },
        { costs: { water: 1 } },
        { cost: 20, costType: 'energy', onSuccess: [{ type: 'unlockNPC', id: 'npc-blacksmith' }] }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-flowerGirl');
    }
  },
  'act-npc-artisan': {
    id: 'act-npc-artisan',
    npcId: 'npc-artisan',
    isStory: true, chapter: 'Village Life',
    progKey: 'artisan', maxProgress: 3,
    journalIcon: '🏗️', journalColor: '#d97706',
    steps: [
        { costs: { wood: 20 } },
        { costs: { stone: 20 } },
        { costs: { wood: 10, stone: 10 }, reward: 'item-chisel', onSuccess: [
            { type: 'unlockRecipe', id: 'act-axe' },
            { type: 'unlockRecipe', id: 'act-pickaxe' }
        ] }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-artisan');
    }
  },
  'act-npc-teacher': {
    id: 'act-npc-teacher',
    npcId: 'npc-teacher',
    isStory: true, chapter: 'Village Life',
    progKey: 'teacher', maxProgress: 5,
    journalIcon: '📖', journalColor: '#3b82f6',
    steps: [
        { cost: 12, costType: 'magic' },
        { cost: 15, costType: 'magic' },
        { cost: 20, costType: 'magic', reward: 'item-scroll' },
        { cost: 25, costType: 'magic' },
        { cost: 30, costType: 'magic' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-teacher');
    }
  },
  'act-npc-townHall': {
    id: 'act-npc-townHall',
    npcId: 'npc-townHall',
    isStory: true, chapter: 'Village Life',
    progKey: 'townHall', maxProgress: 5,
    journalIcon: '🏛️', journalColor: '#94a3b8',
    steps: [
        { cost: 20, costType: 'energy' },
        { cost: 25, costType: 'energy' },
        { costs: { shards: 100 } },
        { cost: 30, costType: 'energy' },
        { cost: 40, costType: 'energy', reward: 'item-deed' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-townHall');
    }
  },
  'act-npc-blacksmith': {
    id: 'act-npc-blacksmith',
    npcId: 'npc-blacksmith',
    isStory: true, chapter: 'Village Life',
    progKey: 'blacksmith', maxProgress: 5,
    journalIcon: '⚒️', journalColor: '#475569',
    steps: [
        { cost: 20, costType: 'energy' },
        { cost: 15, costType: 'magic' },
        { costs: { stone: 30 } },
        { cost: 15, costType: 'energy', reward: 'item-whetstone' },
        { cost: 25, costType: 'energy' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-blacksmith');
    }
  },
  'act-npc-sage': {
    id: 'act-npc-sage',
    npcId: 'npc-sage',
    isStory: true, chapter: 'Village Life',
    progKey: 'sage', maxProgress: 5,
    journalIcon: '🔮', journalColor: '#8b5cf6',
    steps: [
        { cost: 20, costType: 'magic', reward: 'item-book-knowledge' },
        { cost: 30, costType: 'magic' },
        { cost: 40, costType: 'magic' },
        { cost: 50, costType: 'magic' },
        { cost: 60, costType: 'magic' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-sage');
    }
  },
  'act-npc-hunter': {
    id: 'act-npc-hunter',
    npcId: 'npc-hunter',
    isStory: true, chapter: 'Village Life',
    progKey: 'hunter', maxProgress: 5,
    journalIcon: '🏹', journalColor: '#10b981',
    steps: [
        { cost: 15, costType: 'energy' },
        { costs: { wood: 10 }, reward: 'item-arrowhead' },
        { cost: 15, costType: 'energy', reward: 'item-dried-meat' },
        { costs: { wood: 20 } },
        { cost: 20, costType: 'energy' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-hunter');
    }
  },
  'act-npc-treeOfLife': {
    id: 'act-npc-treeOfLife',
    npcId: 'npc-treeOfLife',
    isStory: true, chapter: 'The Transformation',
    progKey: 'treeOfLife', maxProgress: 1,
    journalIcon: '🌳', journalColor: '#10b981',
    steps: [
        { cost: 0, costType: 'none' }
    ],
    execute: (state) => {
        const result = state.npcExecute('act-npc-treeOfLife');
        if (result && result.success) {
            state.completeDemo();
        }
        return result;
    }
  },
  'act-npc-ellie': {
    id: 'act-npc-ellie',
    npcId: 'npc-ellie',
    isStory: true, chapter: 'The Dream',
    progKey: 'ellie', maxProgress: 5,
    journalIcon: '✨', journalColor: '#a78bfa',
    steps: [
        { cost: 10, costType: 'energy' },
        { cost: 15, costType: 'magic', onSuccess: [{ type: 'unlockRecipe', id: 'act-dream-bloom' }] },
        { costs: { herbs: 5 }, reward: 'item-dream-dust' },
        { cost: 20, costType: 'magic' },
        { cost: 25, costType: 'magic', reward: 'item-wyvern-scale' }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-ellie');
    }
  }
};
