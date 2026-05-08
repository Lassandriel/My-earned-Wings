import { ActionDefinition, GameState } from '../../types/game';

/**
 * Lore Reading Actions - Studying the world of Draconia
 * Each book has 10 steps with increasing costs and lore snippets.
 */
export const loreActions: Record<string, ActionDefinition> = {
  'act-read-lore-1': {
    id: 'act-read-lore-1',
    category: 'lore',
    locationId: 'library',
    isStory: true,
    progKey: 'read_book_1',
    maxProgress: 10,
    title: 'act_read_lore_1_title',
    desc: 'act_read_lore_1_desc',
    icon: '📖',
    steps: [
      { costs: { energy: 5 }, dialogueKey: 'lore_1_step_1' },
      { costs: { energy: 8, magic: 2 }, dialogueKey: 'lore_1_step_2' },
      { costs: { energy: 10, magic: 5 }, dialogueKey: 'lore_1_step_3' },
      { costs: { energy: 12, magic: 8 }, dialogueKey: 'lore_1_step_4' },
      { costs: { energy: 15, magic: 10 }, dialogueKey: 'lore_1_step_5' },
      { costs: { energy: 18, magic: 12, shards: 50 }, dialogueKey: 'lore_1_step_6' },
      { costs: { energy: 20, magic: 15, shards: 100 }, dialogueKey: 'lore_1_step_7' },
      { costs: { energy: 25, magic: 20 }, dialogueKey: 'lore_1_step_8' },
      { costs: { energy: 30, magic: 25, shards: 200 }, dialogueKey: 'lore_1_step_9' },
      { costs: { energy: 40, magic: 30, shards: 500 }, dialogueKey: 'lore_1_step_10', onSuccess: [{ type: 'setFlag', flag: 'read_book_1_complete', value: true }] },
    ],
    execute: (state: GameState) => {
      return state.npcExecute('act-read-lore-1');
    }
  },
  'act-read-lore-2': {
    id: 'act-read-lore-2',
    category: 'lore',
    locationId: 'library',
    isStory: true,
    progKey: 'read_book_2',
    maxProgress: 10,
    title: 'act_read_lore_2_title',
    desc: 'act_read_lore_2_desc',
    icon: '🗺️',
    steps: [
      { costs: { energy: 5 }, dialogueKey: 'lore_2_step_1' },
      { costs: { energy: 8, magic: 2 }, dialogueKey: 'lore_2_step_2' },
      { costs: { energy: 10, magic: 5 }, dialogueKey: 'lore_2_step_3' },
      { costs: { energy: 12, magic: 8 }, dialogueKey: 'lore_2_step_4' },
      { costs: { energy: 15, magic: 10 }, dialogueKey: 'lore_2_step_5' },
      { costs: { energy: 18, magic: 12, shards: 50 }, dialogueKey: 'lore_2_step_6' },
      { costs: { energy: 20, magic: 15, shards: 100 }, dialogueKey: 'lore_2_step_7' },
      { costs: { energy: 25, magic: 20 }, dialogueKey: 'lore_2_step_8' },
      { costs: { energy: 30, magic: 25, shards: 200 }, dialogueKey: 'lore_2_step_9' },
      { costs: { energy: 40, magic: 30, shards: 500 }, dialogueKey: 'lore_2_step_10', onSuccess: [{ type: 'setFlag', flag: 'read_book_2_complete', value: true }] },
    ],
    execute: (state: GameState) => {
      return state.npcExecute('act-read-lore-2');
    }
  }
};
