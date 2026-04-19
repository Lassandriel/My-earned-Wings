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
    image: 'img/npcs/Baker Geron.webp',
    steps: [
        { cost: 8, costType: 'energy', reward: 'item-bread' }, // Kennenlernen
        { costs: { wood: 30 }, reward: 'item-bread', onSuccess: [{ type: 'setFlag', flag: 'unlock-baker-bread', value: true }] }, // Holz für Ofen -> Brot
        { cost: 20, costType: 'energy', reward: 'item-cookie' }, // Ein Dankeschön
        { costs: { wood: 15, stone: 15 }, reward: 'item-cookie' },
        { cost: 25, costType: 'energy', reward: 'item-cookie' }
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
    image: 'img/npcs/flowergirl.webp',
    steps: [
        { cost: 5, costType: 'energy', onSuccess: [{ type: 'modifyResource', resource: 'herbs', amount: 5 }] }, // Begrüßung + Kräuter
        { costs: { water: 5 }, onSuccess: [{ type: 'modifyResource', resource: 'herbs', amount: 10 }] }, // Hilfe beim Gießen
        { cost: 10, costType: 'energy', reward: 'item-astral-shards' }, // Gespräch über den Garten
        { costs: { herbs: 10 }, reward: 'item-wyvern-scale' }, // Dankbarkeit
        { cost: 15, costType: 'energy', onSuccess: [{ type: 'unlockNPC', id: 'npc-blacksmith' }] } // Weg zum Schmied
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
        { costs: { wood: 20 }, onSuccess: [{ type: 'setFlag', flag: 'unlock-wanderstock', value: true }] },
        { costs: { stone: 20 } },
        { costs: { wood: 10, stone: 10 }, reward: 'item-chisel', onSuccess: [
            { type: 'setFlag', flag: 'unlock-artisan-tools', value: true },
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
        { cost: 25, costType: 'energy', onSuccess: [{ type: 'setFlag', flag: 'unlocked-work', value: true }] },
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
        { cost: 15, costType: 'energy', reward: 'item-arrowhead' }, // Begrüßung + Pfeilspitze
        { costs: { wood: 10 }, onSuccess: [{ type: 'setFlag', flag: 'unlock-bow', value: true }, { type: 'unlockRecipe', id: 'act-bow' }] }, // Holz für Bogen -> Rezept
        { cost: 15, costType: 'energy', reward: 'item-dried-meat' },
        { costs: { wood: 20 }, reward: 'item-dried-meat' },
        { cost: 20, costType: 'energy', reward: 'item-dried-meat' }
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
  },
  'act-npc-aris': {
    id: 'act-npc-aris',
    npcId: 'npc-aris',
    isStory: true, chapter: 'The Dream',
    progKey: 'aris', maxProgress: 5,
    journalIcon: '🧙‍♂️', journalColor: '#8b5cf6',
    steps: [
        { cost: 20, costType: 'magic', onSuccess: [{ type: 'setFlag', flag: 'ability-arcane-focus', value: true }] },
        { cost: 30, costType: 'magic', reward: 'item-arcane-dust' },
        { cost: 40, costType: 'magic' },
        { cost: 50, costType: 'magic', reward: 'item-crystal-mana' },
        { cost: 60, costType: 'magic', onSuccess: [
            { type: 'unlockRecipe', id: 'act-bed-2' },
            { type: 'unlockRecipe', id: 'act-stove-2' }
        ] }
    ],
    execute: (state) => {
        return state.npcExecute('act-npc-aris');
    }
  }
};
