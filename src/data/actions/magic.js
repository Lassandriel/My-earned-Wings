export const magicActions = {
  'action-dream-bloom': {
    id: 'action-dream-bloom',
    cost: 15,
    costType: 'magic',
    satiationCost: 1,
    logKey: 'dream_bloom_log',
    execute: (game) => {
        const taskIds = Object.keys(game.activeTasks);
        if (taskIds.length === 0) return { success: false, logKey: 'fail_no_tasks' };
        
        taskIds.forEach(id => {
            // Accelerate: Skip 5 seconds of work
            game.activeTasks[id].remaining = Math.max(0, game.activeTasks[id].remaining - 5000);
        });
        
        return { success: true, logKey: 'dream_bloom_log' };
    }
  },
  'action-meditate': {
    id: 'action-meditate',
    duration: 10000,
    costType: 'magic', cost: 10,
    yieldType: 'astral_shards',
    requirements: { 'housing.hasSanctum': true },
    sfx: 'magic',
    particleText: 'Innere Ruhe...',
    particleType: 'shards',
    rewards: { astral_shards: 1 },
    logKey: 'meditation_log',
    logColor: 'var(--accent-purple)'
  },
  'action-spell-harvest': {
    id: 'action-spell-harvest',
    costType: 'mixed',
    costs: { astral_shards: 1, magic: 20 },
    requirements: { 'housing.hasSanctum': true, 'upgrades': 'Book of Knowledge' },
    sfx: 'magic',
    particleText: 'Segen!',
    particleType: 'shards',
    onSuccess: {
        buffs: {
            'buff-harvest': {
                title: 'Segen der Ahnen',
                desc: 'Die Natur antwortet auf deinen Ruf (+1 auf alle Sammelerträge).',
                duration: 60, // 60 seconds
                type: 'yield_bonus',
                value: 1
            }
        }
    },
    logKey: 'spell_harvest_log',
    logColor: 'var(--accent-purple)'
  }
};
