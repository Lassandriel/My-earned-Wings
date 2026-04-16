export const npcActions = {
  'npc-baker': {
    isStory: true, chapter: 'Village Life',
    progKey: 'baker', maxProgress: 5,
    journalIcon: '🍞', journalColor: '#f59e0b',
    image: 'npcs/Baker Geron.png',
    steps: [
        { cost: 10, costType: 'energy' },
        { costs: { wood: 30 }, reward: 'Fresh Bread' },
        { cost: 20, costType: 'energy' },
        { costs: { wood: 15, stone: 15 }, reward: 'Massive Cookie' },
        { cost: 25, costType: 'energy' }
    ],
    execute: (state) => {
        return state.npcExecute('npc-baker');
    }
  },
  'npc-flowerGirl': {
    isStory: true, chapter: 'Village Life',
    progKey: 'flowerGirl', maxProgress: 5,
    journalIcon: '🌸', journalColor: '#ec4899',
    steps: [
        { cost: 10, costType: 'energy' },
        { cost: 15, costType: 'energy' },
        { costs: { wood: 20 } },
        { costs: { water: 1 } },
        { cost: 20, costType: 'energy' }
    ],
    companion: {
        salary: 1,
        yield: { magic: 2 }
    },
    execute: (state) => {
        return state.npcExecute('npc-flowerGirl');
    }
  },
  'npc-artisan': {
    isStory: true, chapter: 'Village Life',
    progKey: 'artisan', maxProgress: 3,
    journalIcon: '🏗️', journalColor: '#d97706',
    steps: [
        { costs: { wood: 20 } },
        { costs: { stone: 20 } },
        { costs: { wood: 10, stone: 10 }, reward: 'Gilded Chisel' }
    ],
    companion: {
        salary: 3,
        yield: { wood: 0.5 }
    },
    execute: (state) => {
        return state.npcExecute('npc-artisan');
    }
  },
  'npc-teacher': {
    isStory: true, chapter: 'Village Life',
    progKey: 'teacher', maxProgress: 5,
    journalIcon: '📖', journalColor: '#3b82f6',
    steps: [
        { cost: 12, costType: 'magic' },
        { cost: 15, costType: 'magic' },
        { cost: 20, costType: 'magic', reward: 'Ancient Scroll' },
        { cost: 25, costType: 'magic' },
        { cost: 30, costType: 'magic' }
    ],
    execute: (state) => {
        return state.npcExecute('npc-teacher');
    }
  },
  'npc-townHall': {
    isStory: true, chapter: 'Village Life',
    progKey: 'townHall', maxProgress: 5,
    journalIcon: '🏛️', journalColor: '#94a3b8',
    steps: [
        { cost: 20, costType: 'energy' },
        { cost: 25, costType: 'energy' },
        { costs: { shards: 100 } },
        { cost: 30, costType: 'energy' },
        { cost: 40, costType: 'energy', reward: 'Official Land Deed' }
    ],
    execute: (state) => {
        return state.npcExecute('npc-townHall');
    }
  },
  'npc-blacksmith': {
    isStory: true, chapter: 'Village Life',
    progKey: 'blacksmith', maxProgress: 5,
    journalIcon: '⚒️', journalColor: '#475569',
    steps: [
        { cost: 20, costType: 'energy' },
        { cost: 15, costType: 'magic' },
        { costs: { stone: 30 } },
        { cost: 15, costType: 'energy', reward: 'Whetstone' },
        { cost: 25, costType: 'energy' }
    ],
    execute: (state) => {
        return state.npcExecute('npc-blacksmith');
    }
  },
  'npc-sage': {
    isStory: true, chapter: 'Village Life',
    progKey: 'sage', maxProgress: 5,
    journalIcon: '🔮', journalColor: '#8b5cf6',
    steps: [
        { cost: 20, costType: 'magic', reward: 'Book of Knowledge' },
        { cost: 30, costType: 'magic' },
        { cost: 40, costType: 'magic' },
        { cost: 50, costType: 'magic' },
        { cost: 60, costType: 'magic' }
    ],
    execute: (state) => {
        return state.npcExecute('npc-sage');
    }
  },
  'npc-hunter': {
    isStory: true, chapter: 'Village Life',
    progKey: 'hunter', maxProgress: 5,
    journalIcon: '🏹', journalColor: '#10b981',
    steps: [
        { cost: 15, costType: 'energy' },
        { costs: { wood: 10 }, reward: 'Arrowhead' },
        { cost: 15, costType: 'energy', reward: 'Dried Meat' },
        { costs: { wood: 20 } },
        { cost: 20, costType: 'energy' }
    ],
    companion: {
        salary: 2,
        yield: { meat: 0.2 }
    },
    execute: (state) => {
        return state.npcExecute('npc-hunter');
    }
  },
  'npc-treeOfLife': {
    isStory: true, chapter: 'The Transformation',
    progKey: 'treeOfLife', maxProgress: 1,
    journalIcon: '🌳', journalColor: '#10b981',
    steps: [
        { cost: 0, costType: 'none' }
    ],
    execute: (state) => {
        const result = state.npcExecute('npc-treeOfLife');
        if (result && result.success) {
            state.completeDemo();
        }
        return result;
    }
  }
};
