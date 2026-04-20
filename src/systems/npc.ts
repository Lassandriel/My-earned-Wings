import { GameState, ItemId, FlagId, ActionDefinition, NPCDefinition, NPCId } from '../types/game';

/**
 * NPC System - TypeScript Edition
 * Handles companion recruitment and NPC quest progress.
 */
export const createNPCSystem = () => {
    return {
        /**
         * Executes an NPC interaction step (Quest progress).
         */
        execute(game: GameState, id: string): { success: boolean; logKey?: string; logParams?: any } | false {
            const action = game.content.get<ActionDefinition>(id, 'actions');
            
            if (!action || !action.steps) return false;
            
            const progKey = (action as any).progKey || id; // Fallback to id if progKey is missing
            const currentProg = game.npcProgress[progKey] || 0;
            const npcId = (action as any).npcId as NPCId;
            const npcDef = game.content.get<NPCDefinition>(npcId || '', 'npcs');
            const maxProg = npcDef ? npcDef.maxProgress : (action.maxProgress || 0);

            if (currentProg >= maxProg || !action.steps[currentProg]) return false;
            const step = action.steps[currentProg];

            // 1. Costs
            const costs = step.costs || (step.cost && step.costType ? { [step.costType]: step.cost } : null);
            if (costs && !game.resource.consume(game, costs)) {
                game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'fail' });
                return false;
            }

            // 2. Progress Logic
            game.npcProgress[progKey]++;

            // 3. Reward Handling (Modular)
            if (step.reward) {
                if (step.reward.startsWith('item-')) {
                    game.actions.effectHandlers.unlockItem(game, { type: 'unlockItem', id: step.reward as ItemId });
                } else {
                    const fid = step.reward as FlagId;
                    game.flags[fid] = true;
                }
            }

            // 4. Side Effects (using ActionSystem's handlers for consistency)
            if (Array.isArray(step.onSuccess)) {
                step.onSuccess.forEach((effect: import('../types/game').GameEffect) => {
                    const handler = game.actions.effectHandlers[effect.type];
                    if (handler) handler(game, effect);
                });
            }

            game.bus.emit(game.EVENTS.SOUND_TRIGGERED, { key: 'success' });

            // Format Log: "Name: 'Satz'"
            if (step.dialogueKey && npcDef) {
                const npcName = game.t(npcDef.nameKey, 'ui');
                const dialogue = game.t(step.dialogueKey, 'npcs');
                return { 
                    success: true, 
                    logKey: 'npc_dialogue_log', 
                    logParams: { name: npcName, text: dialogue }
                };
            }

            return { success: true };
        }
    };
};
