/**
 * Magic Actions - TypeScript Version
 */
export const magicActions: Record<string, any> = {
  'act-dream-bloom': {
    id: 'act-dream-bloom',
    icon: '🌀',
    cost: 15,
    costType: 'magic',
    satiationCost: 1,
    onSuccess: [{ type: 'modifyResource', resource: 'magic', amount: 5 }],
    logKey: 'dream_bloom_log',
    execute: (game: any) => {
      const taskIds = Object.keys(game.activeTasks);
      if (taskIds.length === 0) return { success: false, logKey: 'fail_no_tasks' };

      taskIds.forEach((id) => {
        // Accelerate: Skip 5 seconds of work
        game.activeTasks[id].remaining = Math.max(0, game.activeTasks[id].remaining - 5000);
      });

      return { success: true, logKey: 'dream_bloom_log' };
    },
  },
  'act-meditate': {
    id: 'act-meditate',
    icon: '🧘',
    duration: 10000,
    costType: 'magic',
    cost: 10,
    yieldType: 'astral_shards',
    requirements: { 'flags.build-arcane-sanctum': true },
    sfx: 'magic',
    particleText: 'particle_meditation',
    particleType: 'shards',
    rewards: { astral_shards: 1 },
    logKey: 'meditation_log',
    logColor: 'var(--accent-purple)',
  },
  'act-spell-harvest': {
    id: 'act-spell-harvest',
    icon: '🌿',
    costType: 'mixed',
    costs: { astral_shards: 1, magic: 20 },
    requirements: { 'flags.build-arcane-sanctum': true, 'flags.item-book-knowledge': true },
    sfx: 'magic',
    particleText: 'particle_blessing',
    particleType: 'shards',
    onSuccess: [
      {
        type: 'addBuff',
        buffId: 'buff-harvest',
      },
    ],
    logKey: 'spell_harvest_log',
    logColor: 'var(--accent-purple)',
  },
};
