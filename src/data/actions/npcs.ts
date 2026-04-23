/**
 * NPC Actions - TypeScript Version
 */
export const npcActions: Record<string, any> = {
  'act-npc-baker': {
    id: 'act-npc-baker',
    npcId: 'npc-baker',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'baker',
    maxProgress: 5,
    journalIcon: '🍞',
    icon: '🥖',
    journalColor: '#f59e0b',
    steps: [
      { cost: 8, costType: 'energy', reward: 'item-bread', dialogueKey: 'npc_baker_1' },
      {
        costs: { wood: 30 },
        reward: 'item-bread',
        onSuccess: [{ type: 'setFlag', flag: 'unlock-baker-bread', value: true }],
        dialogueKey: 'npc_baker_2',
      },
      { cost: 20, costType: 'energy', reward: 'item-cookie', dialogueKey: 'npc_baker_3' },
      { costs: { wood: 15, stone: 15 }, reward: 'item-cookie', dialogueKey: 'npc_baker_4' },
      { cost: 25, costType: 'energy', reward: 'item-cookie', dialogueKey: 'npc_baker_5' },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-baker');
    },
  },
  'act-npc-flowerGirl': {
    id: 'act-npc-flowerGirl',
    npcId: 'npc-flowerGirl',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'flowerGirl',
    maxProgress: 6,
    journalIcon: '🌸',
    icon: '🌸',
    journalColor: '#ec4899',
    steps: [
      {
        cost: 5,
        costType: 'energy',
        onSuccess: [{ type: 'modifyResource', resource: 'herbs', amount: 5 }],
        dialogueKey: 'npc_flowerGirl_1',
      },
      {
        costs: { water: 5 },
        onSuccess: [{ type: 'modifyResource', resource: 'herbs', amount: 10 }],
        dialogueKey: 'npc_flowerGirl_2',
      },
      {
        cost: 10,
        costType: 'energy',
        reward: 'item-astral-shards',
        dialogueKey: 'npc_flowerGirl_3',
      },
      { costs: { herbs: 10 }, reward: 'item-wyvern-scale', dialogueKey: 'npc_flowerGirl_4' },
      {
        cost: 15,
        costType: 'energy',
        onSuccess: [
          { type: 'unlockNPC', id: 'npc-blacksmith' },
          { type: 'setFlag', flag: 'blueprint-garden', value: true }
        ],
        dialogueKey: 'npc_flowerGirl_5',
      },
      {
        costs: { herbs: 50, water: 20 },
        onSuccess: [
          { type: 'setFlag', flag: 'blueprint-home-lake', value: true },
          { type: 'log', logKey: 'reward_blueprint_lake', color: 'var(--gold)' },
        ],
        dialogueKey: 'npc_flowerGirl_6',
      },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-flowerGirl');
    },
  },
  'act-npc-artisan': {
    id: 'act-npc-artisan',
    npcId: 'npc-artisan',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'artisan',
    maxProgress: 3,
    journalIcon: '🏗️',
    icon: '🔨',
    journalColor: '#d97706',
    steps: [
      {
        costs: { wood: 20 },
        onSuccess: [{ type: 'setFlag', flag: 'unlock-wanderstock', value: true }],
        dialogueKey: 'npc_artisan_1',
      },
      {
        costs: { stone: 20 },
        onSuccess: [{ type: 'modifyResource', resource: 'wood', amount: 10 }],
        dialogueKey: 'npc_artisan_2',
      },
      {
        costs: { wood: 10, stone: 10 },
        onSuccess: [
          { type: 'unlockRecipe', id: 'act-chisel' },
          { type: 'setFlag', flag: 'unlock-artisan-tools', value: true },
          { type: 'unlockRecipe', id: 'act-axe' },
          { type: 'unlockRecipe', id: 'act-pickaxe' },
        ],
        dialogueKey: 'npc_artisan_3',
      },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-artisan');
    },
  },
  'act-npc-teacher': {
    id: 'act-npc-teacher',
    npcId: 'npc-teacher',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'teacher',
    maxProgress: 5,
    journalIcon: '📖',
    icon: '🎓',
    journalColor: '#3b82f6',
    steps: [
      {
        cost: 12,
        costType: 'magic',
        onSuccess: [{ type: 'modifyResource', resource: 'shards', amount: 20 }],
        dialogueKey: 'npc_teacher_1',
      },
      {
        cost: 15,
        costType: 'magic',
        onSuccess: [{ type: 'modifyResource', resource: 'magic', amount: 10 }],
        dialogueKey: 'npc_teacher_2',
      },
      { cost: 20, costType: 'magic', reward: 'item-scroll', dialogueKey: 'npc_teacher_3' },
      {
        cost: 25,
        costType: 'magic',
        onSuccess: [{ type: 'modifyResource', resource: 'shards', amount: 50 }],
        dialogueKey: 'npc_teacher_4',
      },
      {
        cost: 30,
        costType: 'magic',
        reward: 'item-scroll',
        dialogueKey: 'npc_teacher_5',
      },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-teacher');
    },
  },
  'act-npc-townHall': {
    id: 'act-npc-townHall',
    npcId: 'npc-townHall',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'townHall',
    maxProgress: 5,
    journalIcon: '🏛️',
    icon: '🏛️',
    journalColor: '#94a3b8',
    steps: [
      {
        cost: 20,
        costType: 'energy',
        onSuccess: [{ type: 'modifyResource', resource: 'shards', amount: 30 }],
        dialogueKey: 'npc_townHall_1',
      },
      {
        cost: 25,
        costType: 'energy',
        onSuccess: [{ type: 'setFlag', flag: 'unlocked-work', value: true }],
        dialogueKey: 'npc_townHall_2',
      },
      {
        costs: { shards: 100 },
        onSuccess: [{ type: 'modifyResource', resource: 'energy', amount: 30 }],
        dialogueKey: 'npc_townHall_3',
      },
      {
        cost: 30,
        costType: 'energy',
        onSuccess: [{ type: 'modifyResource', resource: 'shards', amount: 150 }],
        dialogueKey: 'npc_townHall_4',
      },
      { cost: 40, costType: 'energy', reward: 'item-deed', dialogueKey: 'npc_townHall_5' },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-townHall');
    },
  },
  'act-npc-blacksmith': {
    id: 'act-npc-blacksmith',
    npcId: 'npc-blacksmith',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'blacksmith',
    maxProgress: 5,
    journalIcon: '⚒️',
    icon: '⚒️',
    journalColor: '#475569',
    steps: [
      {
        cost: 20,
        costType: 'energy',
        onSuccess: [{ type: 'modifyResource', resource: 'stone', amount: 15 }],
        dialogueKey: 'npc_blacksmith_1',
      },
      {
        cost: 15,
        costType: 'magic',
        onSuccess: [{ type: 'modifyResource', resource: 'stone', amount: 20 }],
        dialogueKey: 'npc_blacksmith_2',
      },
      {
        costs: { stone: 30 },
        reward: 'item-whetstone',
        dialogueKey: 'npc_blacksmith_3',
      },
      { cost: 15, costType: 'energy', reward: 'item-whetstone', dialogueKey: 'npc_blacksmith_4' },
      {
        cost: 25,
        costType: 'energy',
        reward: 'item-whetstone',
        dialogueKey: 'npc_blacksmith_5',
      },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-blacksmith');
    },
  },
  'act-npc-sage': {
    id: 'act-npc-sage',
    npcId: 'npc-sage',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'sage',
    maxProgress: 5,
    journalIcon: '🔮',
    icon: '🔮',
    journalColor: '#8b5cf6',
    steps: [
      { cost: 20, costType: 'magic', reward: 'item-book-knowledge', dialogueKey: 'npc_sage_1' },
      {
        cost: 30,
        costType: 'magic',
        reward: 'item-arcane-dust',
        dialogueKey: 'npc_sage_2',
      },
      {
        cost: 40,
        costType: 'magic',
        reward: 'item-arcane-dust',
        dialogueKey: 'npc_sage_3',
      },
      {
        cost: 50,
        costType: 'magic',
        reward: 'item-scroll',
        dialogueKey: 'npc_sage_4',
      },
      {
        cost: 60,
        costType: 'magic',
        reward: 'item-scroll',
        dialogueKey: 'npc_sage_5',
      },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-sage');
    },
  },
  'act-npc-hunter': {
    id: 'act-npc-hunter',
    npcId: 'npc-hunter',
    isStory: true,
    chapter: 'Village Life',
    progKey: 'hunter',
    maxProgress: 5,
    journalIcon: '🏹',
    icon: '🏹',
    journalColor: '#10b981',
    steps: [
      { cost: 15, costType: 'energy', reward: 'item-arrowhead', dialogueKey: 'npc_hunter_1' },
      {
        costs: { wood: 10 },
        onSuccess: [
          { type: 'setFlag', flag: 'unlock-bow', value: true },
          { type: 'unlockRecipe', id: 'act-bow' },
        ],
        dialogueKey: 'npc_hunter_2',
      },
      { cost: 15, costType: 'energy', reward: 'item-dried-meat', dialogueKey: 'npc_hunter_3' },
      { costs: { wood: 20 }, reward: 'item-dried-meat', dialogueKey: 'npc_hunter_4' },
      { cost: 20, costType: 'energy', reward: 'item-dried-meat', dialogueKey: 'npc_hunter_5' },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-hunter');
    },
  },
  'act-npc-treeOfLife': {
    id: 'act-npc-treeOfLife',
    npcId: 'npc-treeOfLife',
    isStory: true,
    chapter: 'The Transformation',
    progKey: 'treeOfLife',
    maxProgress: 1,
    journalIcon: '🌳',
    icon: '🌳',
    journalColor: '#10b981',
    steps: [{ cost: 0, costType: 'none', reward: 'item-astral-shards', dialogueKey: 'npc_aris_5' }],
    execute: (state: any) => {
      const result = state.npcExecute('act-npc-treeOfLife');
      if (result && result.success) {
        state.viewManager.completeDemo(state);
      }
      return result;
    },
  },
  'act-npc-ellie': {
    id: 'act-npc-ellie',
    npcId: 'npc-ellie',
    isStory: true,
    chapter: 'The Dream',
    progKey: 'ellie',
    maxProgress: 5,
    journalIcon: '✨',
    icon: '✨',
    journalColor: '#a78bfa',
    steps: [
      {
        cost: 10,
        costType: 'energy',
        onSuccess: [{ type: 'modifyResource', resource: 'magic', amount: 5 }],
        dialogueKey: 'npc_ellie_1',
      },
      { cost: 15, costType: 'magic', onSuccess: [{ type: 'unlockRecipe', id: 'act-dream-bloom' }], dialogueKey: 'npc_ellie_3' },
      { costs: { herbs: 5 }, reward: 'item-dream-dust', dialogueKey: 'npc_ellie_4' },
      {
        cost: 20,
        costType: 'magic',
        onSuccess: [{ type: 'modifyResource', resource: 'magic', amount: 15 }],
        dialogueKey: 'npc_ellie_3',
      },
      { cost: 25, costType: 'magic', reward: 'item-wyvern-scale', dialogueKey: 'npc_ellie_2' },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-ellie');
    },
  },
  'act-npc-aris': {
    id: 'act-npc-aris',
    npcId: 'npc-aris',
    isStory: true,
    chapter: 'The Dream',
    progKey: 'aris',
    maxProgress: 6,
    journalIcon: '🧙‍♂️',
    icon: '🧙‍♂️',
    journalColor: '#8b5cf6',
    steps: [
      {
        cost: 20,
        costType: 'magic',
        onSuccess: [{ type: 'setFlag', flag: 'ability-arcane-focus', value: true }],
        dialogueKey: 'npc_aris_1',
      },
      { cost: 30, costType: 'magic', reward: 'item-arcane-dust', dialogueKey: 'npc_aris_2' },
      {
        cost: 40,
        costType: 'magic',
        onSuccess: [{ type: 'modifyResource', resource: 'magic', amount: 20 }],
        dialogueKey: 'npc_aris_3',
      },
      { cost: 50, costType: 'magic', reward: 'item-crystal-mana', dialogueKey: 'npc_aris_4' },
      {
        cost: 60,
        costType: 'magic',
        onSuccess: [
          { type: 'unlockRecipe', id: 'act-bed-2' },
          { type: 'unlockRecipe', id: 'act-stove-2' },
        ],
        dialogueKey: 'npc_aris_5',
      },
      {
        cost: 100,
        costType: 'magic',
        costs: { 'item-astral-shards': 10, 'item-arcane-dust': 5 },
        onSuccess: [
          { type: 'setFlag', flag: 'blueprint-home-tower', value: true },
          { type: 'unlockNPC', id: 'npc-treeOfLife' },
          { type: 'log', logKey: 'reward_blueprint_tower', color: 'var(--gold)' },
        ],
        dialogueKey: 'npc_aris_6',
      },
    ],
    execute: (state: any) => {
      return state.npcExecute('act-npc-aris');
    },
  },
};
