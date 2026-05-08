import { ActionDefinition, GameState } from '../../types/game';

/**
 * Lore Reading Actions - Studying the world of Draconia
 * Each book has 10 steps with increasing costs and lore snippets.
 */
export const loreActions: Record<string, ActionDefinition> = {
  'act-read-lore-1': {
    id: 'act-read-lore-1',
    category: 'lore',
    isStory: true,
    progKey: 'read_book_1',
    maxProgress: 10,
    title: 'act_read_lore_1_title',
    desc: 'act_read_lore_1_desc',
    icon: '📖',
    steps: [
      { cost: 10, costType: 'energy', dialogueKey: 'lore_1_step_1' },
      { cost: 12, costType: 'energy', dialogueKey: 'lore_1_step_2' },
      { cost: 15, costType: 'energy', dialogueKey: 'lore_1_step_3' },
      { cost: 18, costType: 'energy', dialogueKey: 'lore_1_step_4' },
      { cost: 22, costType: 'energy', dialogueKey: 'lore_1_step_5' },
      { cost: 26, costType: 'energy', dialogueKey: 'lore_1_step_6' },
      { cost: 30, costType: 'energy', dialogueKey: 'lore_1_step_7' },
      { cost: 35, costType: 'energy', dialogueKey: 'lore_1_step_8' },
      { cost: 40, costType: 'energy', dialogueKey: 'lore_1_step_9' },
      { cost: 50, costType: 'energy', dialogueKey: 'lore_1_step_10', onSuccess: [{ type: 'setFlag', flag: 'read_book_1_complete', value: true }] },
    ],
    execute: (state: GameState) => {
      return state.npcExecute('act-read-lore-1');
    }
  },
  'act-read-lore-2': {
    id: 'act-read-lore-2',
    category: 'lore',
    isStory: true,
    progKey: 'read_book_2',
    maxProgress: 10,
    title: 'act_read_lore_2_title',
    desc: 'act_read_lore_2_desc',
    icon: '🗺️',
    steps: [
      { cost: 10, costType: 'energy', dialogueKey: 'lore_2_step_1' },
      { cost: 12, costType: 'energy', dialogueKey: 'lore_2_step_2' },
      { cost: 15, costType: 'energy', dialogueKey: 'lore_2_step_3' },
      { cost: 18, costType: 'energy', dialogueKey: 'lore_2_step_4' },
      { cost: 22, costType: 'energy', dialogueKey: 'lore_2_step_5' },
      { cost: 26, costType: 'energy', dialogueKey: 'lore_2_step_6' },
      { cost: 30, costType: 'energy', dialogueKey: 'lore_2_step_7' },
      { cost: 35, costType: 'energy', dialogueKey: 'lore_2_step_8' },
      { cost: 40, costType: 'energy', dialogueKey: 'lore_2_step_9' },
      { cost: 50, costType: 'energy', dialogueKey: 'lore_2_step_10', onSuccess: [{ type: 'setFlag', flag: 'read_book_2_complete', value: true }] },
    ],
    execute: (state: GameState) => {
      return state.npcExecute('act-read-lore-2');
    }
  }
};
