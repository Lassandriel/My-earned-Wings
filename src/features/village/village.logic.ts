import { GameState, ItemId, FlagId, ActionDefinition, NPCDefinition, NPCId, TranslationParams } from '../../types/game';
import { LOG_COLOR, makeServiceContainer } from '../../core/constants';

interface NPCDeps {
  bus: GameState['bus'];
  EVENTS: GameState['EVENTS'];
  content: GameState['content'];
  actions: GameState['actions'];
  resource: GameState['resource'];
  addLog: GameState['addLog'];
}

const ctx = makeServiceContainer<NPCDeps>('NPC');
const svc = ctx.get;

/**
 * NPC System - TypeScript Edition
 * Handles companion recruitment and NPC quest progress.
 */
export const createNPCSystem = () => {
  return {
    metadata: {
      id: 'npc',
      delegates: { npcExecute: 'execute' },
    },

    setServices: ctx.set,

    /**
     * Executes an NPC interaction step (Quest progress).
     */
    execute(
      game: GameState,
      id: string,
    ): { success: boolean; logKey?: string; logParams?: TranslationParams } | false {
      const action = svc().content.get<ActionDefinition>(id, 'actions');

      if (!action || !action.steps) return false;

      const progKey = action.progKey || id;
      const currentProg = game.npcProgress[progKey] || 0;
      const npcId = action.npcId;
      const npcDef = npcId ? svc().content.get<NPCDefinition>(npcId, 'npcs') : null;
      const maxProg = npcDef ? npcDef.maxProgress : (action.maxProgress || 0);

      if (currentProg >= maxProg || !action.steps[currentProg]) return false;
      const step = action.steps[currentProg];

      // 0. Requirements (Step-level)
      if (step.requirements) {
        const met = Object.entries(step.requirements).every(([path, rule]) => {
          return svc().actions.checkRequirement(game, path, rule as boolean | number | string | string[] | { op?: string; val: unknown });
        });
        if (!met) {
          if (npcId === 'npc-teacher' && !game.flags['build-house'] && currentProg === 1) {
            svc().addLog('npc_teacher_2_no_house', 'logs', LOG_COLOR.failure);
          }
          if (npcId === 'npc-teacher' && currentProg === 2 && (!game.flags['read_book_1_complete'] || !game.flags['read_book_2_complete'])) {
            svc().addLog('npc_teacher_4_not_read', 'logs', LOG_COLOR.failure);
          }
          return false;
        }
      }

      // 1. Costs
      const costs: Record<string, number> = { ...(step.costs || {}) };
      if (step.cost && step.costType) {
        costs[step.costType] = (costs[step.costType] || 0) + step.cost;
      }

      if (Object.keys(costs).length > 0 && !svc().resource.consume(game, costs)) {
        svc().bus.emit(svc().EVENTS.SOUND_TRIGGERED, { key: 'fail' });
        return false;
      }

      // 2. Progress Logic
      game.npcProgress[progKey] = currentProg + 1;

      // 3. Reward Handling (Modular)
      if (step.reward) {
        if (step.reward.startsWith('item-')) {
          svc().actions.effectHandlers.unlockItem?.(game, {
            type: 'unlockItem',
            id: step.reward as ItemId,
          });
        } else {
          const fid = step.reward as FlagId;
          game.flags[fid] = true;
        }
      }

      // 4. Side Effects (using ActionSystem's handlers for consistency)
      if (Array.isArray(step.onSuccess)) {
        step.onSuccess.forEach((effect) => {
          const handler = svc().actions.effectHandlers[effect.type];
          if (handler) handler(game, effect);
        });
      }

      svc().bus.emit(svc().EVENTS.SOUND_TRIGGERED, { key: 'success' });

      // Format Log: "Name: 'Satz'"
      if (step.dialogueKey) {
        if (npcDef) {
          return {
            success: true,
            logKey: 'npc_dialogue_log',
            logParams: {
              nameKey: npcDef.nameKey,
              textKey: step.dialogueKey,
              dialogContext: 'npcs',
            },
          };
        } else {
          return {
            success: true,
            logKey: 'lore_entry_log',
            logParams: {
              textKey: step.dialogueKey,
              dialogContext: 'npcs',
            },
          };
        }
      }

      return { success: true };
    },

    /**
     * Checks if the player has unlocked the final encounter.
     */
    canAccessTreeOfLife(game: GameState): boolean {
      return game.unlockedNPCs.includes('npc-treeOfLife' as NPCId) && !game.demoCompleted;
    },
  };
};
