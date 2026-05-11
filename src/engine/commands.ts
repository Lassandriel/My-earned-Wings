import { GameState, ActionId } from '../types/game';
import { EngineServices } from './types';

/**
 * Player-initiated commands that mutate simulation state.
 *
 * Per Phase 2 decision "Variant B: Command Queue", clicks should
 * enqueue a Command rather than mutating state directly. The engine
 * drains the queue at the start of each task tick (every 100 ms), so
 * all simulation mutations happen at deterministic points in the loop.
 *
 * Today most call sites still mutate directly; this module is the
 * infrastructure that lets us migrate them incrementally.
 */
export type Command =
  | { type: 'attemptAction'; actionId: ActionId; element?: HTMLElement | null }
  | { type: 'toggleFocus'; actionId: ActionId }
  | { type: 'executeAction'; actionId: ActionId };

export interface CommandQueue {
  enqueue(cmd: Command): void;
  drain(state: GameState, services: EngineServices): void;
  size(): number;
  clear(): void;
}

export function createCommandQueue(): CommandQueue {
  const queue: Command[] = [];

  return {
    enqueue(cmd) {
      queue.push(cmd);
    },
    drain(state, services) {
      while (queue.length > 0) {
        const cmd = queue.shift()!;
        processCommand(cmd, state, services);
      }
    },
    size() {
      return queue.length;
    },
    clear() {
      queue.length = 0;
    },
  };
}

export function processCommand(cmd: Command, state: GameState, services: EngineServices): void {
  switch (cmd.type) {
    case 'attemptAction':
      services.actions.attemptAction(state, cmd.element as HTMLElement, cmd.actionId);
      return;
    case 'toggleFocus':
      services.actions.toggleFocus(state, cmd.actionId);
      return;
    case 'executeAction':
      services.actions.execute(state, cmd.actionId);
      return;
  }
}
