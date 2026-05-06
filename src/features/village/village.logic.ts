import { GameState, ItemId, FlagId, ActionDefinition, NPCDefinition, NPCId } from '../../types/game';

/**
 * NPC System - TypeScript Edition
 * Handles companion recruitment and NPC quest progress.
 */
export const createNPCSystem = () => {
  return {
    metadata: {
      id: 'npc',
      delegates: { npcExecute: 'execute' }
    },
    /**
     * Executes an NPC interaction step (Quest progress).
     */
    execute(
      game: GameState,
      id: string
    ): { success: boolean; logKey?: string; logParams?: any } | false {
      const action = game.content.get<ActionDefinition>(id, 'actions');

      if (!action || !action.steps) return false;

      // Use id as default progKey if not explicitly defined in action
      const progKey = action.progKey || id;
      const currentProg = game.npcProgress[progKey] || 0;
      const npcId = action.npcId;
      const npcDef = npcId ? game.content.get<NPCDefinition>(npcId, 'npcs') : null;
      const maxProg = npcDef ? npcDef.maxProgress : (action.maxProgress || 0);

      if (currentProg >= maxProg || !action.steps[currentProg]) return false;
      const step = action.steps[currentProg];

      // 0. Requirements (Step-level)
      if (step.requirements) {
        const met = Object.entries(step.requirements).every(([path, rule]) => {
          return game.actions.checkRequirement(game, path, rule);
        });
        if (!met) {
          // If it fails due to requirements, we might want to show a specific dialogue
          // like Teacher Aria's "come back when you have a house"
          if (npcId === 'npc-teacher' && !game.flags['build-house'] && currentProg === 1) {
             game.addLog('npc_teacher_2_no_house', 'logs', 'var(--accent-red)');
          }
          return false;
        }
      }

      // 1. Costs
      const costs: Record<string, number> = { ...(step.costs || {}) };
      if (step.cost && step.costType) {
        costs[step.costType] = (costs[step.costType] || 0) + step.cost;
      }

      if (Object.keys(costs).length > 0 && !game.resource.consume(game, costs)) {
        game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
        return false;
      }

      // 2. Progress Logic
      game.npcProgress[progKey] = currentProg + 1;

      // 3. Reward Handling (Modular)
      if (step.reward) {
        if (step.reward.startsWith('item-')) {
          game.actions.effectHandlers.unlockItem(game, {
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
          const handler = game.actions.effectHandlers[effect.type];
          if (handler) handler(game, effect);
        });
      }

      game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'success' });

      // Format Log: "Name: 'Satz'"
      if (step.dialogueKey) {
        if (npcDef) {
          return {
            success: true,
            logKey: 'npc_dialogue_log',
            logParams: {
              nameKey: npcDef.nameKey,
              textKey: step.dialogueKey,
              dialogContext: 'npcs'
            },
          };
        } else {
          // Lore/Book entry
          return {
            success: true,
            logKey: 'lore_entry_log',
            logParams: {
              textKey: step.dialogueKey,
              dialogContext: 'npcs'
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
