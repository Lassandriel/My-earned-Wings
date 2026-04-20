/**
 * Magic Actions - TypeScript Version
 */
export const magicActions: Record<string, any> = {
  'act-dream-bloom': {
    id: 'act-dream-bloom',
    cost: 15,
    costType: 'magic',
    satiationCost: 1,
    logKey: 'dream_bloom_log',
    execute: (game: any) => {
        const taskIds = Object.keys(game.activeTasks);
        if (taskIds.length === 0) return { success: false, logKey: 'fail_no_tasks' };
        
        taskIds.forEach(id => {
            // Accelerate: Skip 5 seconds of work
            game.activeTasks[id].remaining = Math.max(0, game.activeTasks[id].remaining - 5000);
        });
        
        return { success: true, logKey: 'dream_bloom_log' };
    }
  },
  'act-meditate': {
    id: 'act-meditate',
    duration: 10000,
    costType: 'magic', cost: 10,
    yieldType: 'astral_shards',
    requirements: { 'flags.build-arcane-sanctum': true },
    sfx: 'magic',
    particleText: 'Innere Ruhe...',
    particleType: 'shards',
    rewards: { astral_shards: 1 },
    logKey: 'meditation_log',
    logColor: 'var(--accent-purple)'
  },
  'act-spell-harvest': {
    id: 'act-spell-harvest',
    costType: 'mixed',
    costs: { astral_shards: 1, magic: 20 },
    requirements: { 'flags.build-arcane-sanctum': true, 'flags.item-book-knowledge': true },
    sfx: 'magic',
    particleText: 'Segen!',
    particleType: 'shards',
    onSuccess: [
        { 
            type: 'addBuff', 
            buffId: 'buff-harvest', 
            override: {
                title: 'Segen der Ahnen',
                desc: 'Die Natur antwortet auf deinen Ruf (+1 auf alle Sammelerträge).',
                duration: 60,
                type: 'yield_bonus',
                value: 1
            }
        }
    ],
    logKey: 'spell_harvest_log',
    logColor: 'var(--accent-purple)'
  }
};
