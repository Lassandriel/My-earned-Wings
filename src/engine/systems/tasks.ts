import { GameState, ActionDefinition, ActionId, ActionResult } from '../../types/game';
import { EngineServices } from '../types';

/**
 * Ticks active tasks: counts down `remaining`, finalises completed
 * tasks (deduct/award via processAction + handleSuccess), and triggers
 * the focus-loop auto-restart 300 ms after a focused looping action
 * completes.
 *
 * Reads & mutates `state.activeTasks` in place. The auto-restart
 * re-reads state via the Alpine reactive proxy at setTimeout fire time —
 * after Phase 2 finishes, this becomes a refresh through the UI sync layer.
 */
export function tickTasks(state: GameState, services: EngineServices, deltaMs: number): void {
  const taskIds = Object.keys(state.activeTasks || {});
  if (taskIds.length === 0) return;

  taskIds.forEach((id) => {
    const task = state.activeTasks[id];
    task.remaining -= deltaMs;

    if (task.remaining > 0) return;

    const actionId = task.actionId as ActionId;
    const action = services.content.get<ActionDefinition>(actionId, 'actions');

    const newTasks = { ...state.activeTasks };
    delete newTasks[id];
    state.activeTasks = newTasks;

    if (!action) return;

    const result = services.actions.processAction(state, actionId, action, 'finalize') as ActionResult;
    services.actions.handleSuccess(state, actionId, action, result);

    if (state.activeFocus === actionId && action.isLoopable) {
      setTimeout(() => {
        if (
          state.activeFocus === actionId &&
          state.view !== 'menu' &&
          !state.activeTasks[actionId] &&
          action.isLoopable
        ) {
          services.commands.enqueue({ type: 'executeAction', actionId });
        }
      }, 300);
    }
  });
}
