import { MilestoneDefinition } from '../../types/game';

/**
 * Milestone Registry - TypeScript Edition
 * Defines major game goals and chapter transitions.
 */
export const MILESTONE_REGISTRY: Record<string, MilestoneDefinition> = {
  'milestone-treeOfLife': {
    id: 'milestone-treeOfLife',
    icon: '🌳',
    requirements: {
      'flags.build-house': true,
      'npcProgress.baker': { op: '>=', val: 5 },
      'npcProgress.teacher': { op: '>=', val: 5 },
      'npcProgress.sage': { op: '>=', val: 5 },
      'counters.study': { op: '>=', val: 3 },
    },
    onUnlock: [
      { type: 'unlockNPC', id: 'npc-treeOfLife' },
      { type: 'setObjective', id: 'obj_tree_of_life' },
      { type: 'playSound', id: 'success' },
      { type: 'log', logKey: 'tree_unlocked_log', color: 'var(--gold)' },
    ],
  },
};
