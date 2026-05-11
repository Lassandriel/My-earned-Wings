import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCommandQueue, processCommand, Command } from './commands';
import { GameState } from '../types/game';
import { EngineServices } from './types';

const createMockState = (): GameState => ({} as GameState);

const createMockServices = (): EngineServices => ({
  actions: {
    attemptAction: vi.fn(),
    toggleFocus: vi.fn(),
    execute: vi.fn(() => true),
  } as any,
  pipeline: {} as any,
  resource: {} as any,
  content: {} as any,
  commands: {} as any,
  gameState: {} as any,
  addLog: vi.fn(),
  playSound: vi.fn(),
  saveGame: vi.fn(),
});

describe('Command Queue', () => {
  let services: EngineServices;
  let state: GameState;

  beforeEach(() => {
    state = createMockState();
    services = createMockServices();
  });

  describe('createCommandQueue()', () => {
    it('starts empty', () => {
      const q = createCommandQueue();
      expect(q.size()).toBe(0);
    });

    it('enqueue increases size, drain empties it', () => {
      const q = createCommandQueue();
      q.enqueue({ type: 'toggleFocus', actionId: 'study' as any });
      q.enqueue({ type: 'toggleFocus', actionId: 'craft' as any });
      expect(q.size()).toBe(2);

      q.drain(state, services);
      expect(q.size()).toBe(0);
    });

    it('processes commands in FIFO order', () => {
      const q = createCommandQueue();
      q.enqueue({ type: 'toggleFocus', actionId: 'first' as any });
      q.enqueue({ type: 'toggleFocus', actionId: 'second' as any });
      q.enqueue({ type: 'toggleFocus', actionId: 'third' as any });

      q.drain(state, services);

      const calls = (services.actions.toggleFocus as any).mock.calls;
      expect(calls.map((c: any[]) => c[1])).toEqual(['first', 'second', 'third']);
    });

    it('drain on an empty queue is a no-op', () => {
      const q = createCommandQueue();
      q.drain(state, services);
      expect(services.actions.toggleFocus).not.toHaveBeenCalled();
    });

    it('clear() empties without processing', () => {
      const q = createCommandQueue();
      q.enqueue({ type: 'toggleFocus', actionId: 'x' as any });
      q.clear();

      expect(q.size()).toBe(0);
      q.drain(state, services);
      expect(services.actions.toggleFocus).not.toHaveBeenCalled();
    });
  });

  describe('processCommand()', () => {
    it('attemptAction → services.actions.attemptAction(state, el, id)', () => {
      const el = { tagName: 'BUTTON' } as unknown as HTMLElement;
      const cmd: Command = { type: 'attemptAction', actionId: 'chop_wood' as any, element: el };

      processCommand(cmd, state, services);

      expect(services.actions.attemptAction).toHaveBeenCalledWith(state, el, 'chop_wood');
    });

    it('toggleFocus → services.actions.toggleFocus(state, id)', () => {
      processCommand({ type: 'toggleFocus', actionId: 'study' as any }, state, services);
      expect(services.actions.toggleFocus).toHaveBeenCalledWith(state, 'study');
    });

    it('executeAction → services.actions.execute(state, id)', () => {
      processCommand({ type: 'executeAction', actionId: 'cast_spell' as any }, state, services);
      expect(services.actions.execute).toHaveBeenCalledWith(state, 'cast_spell');
    });
  });
});
