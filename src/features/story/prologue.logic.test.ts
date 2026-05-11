import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPrologueSystem } from './prologue.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    view: 'prologue',
    prologueStep: 1,
    finishPrologue: vi.fn(),
    ...overrides,
  } as any;
};

describe('Prologue System', () => {
  let prologue: ReturnType<typeof createPrologueSystem>;
  let mockCollection: { recordCollectionEntry: ReturnType<typeof vi.fn> };
  let mockAddLog: ReturnType<typeof vi.fn>;
  let mockPlaySound: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    prologue = createPrologueSystem();
    mockCollection = { recordCollectionEntry: vi.fn() };
    mockAddLog = vi.fn();
    mockPlaySound = vi.fn();
    (prologue as any).setServices({
      collection: mockCollection,
      addLog: mockAddLog,
      playSound: mockPlaySound,
      getLogStore: () => ({ list: [] }),
    });
  });

  it('playIntro sets step to 1, switches view, and logs the first line', () => {
    const state = createMockState({ view: 'menu', prologueStep: 0 });
    prologue.playIntro(state);

    expect(state.prologueStep).toBe(1);
    expect(state.view).toBe('prologue');
    expect(mockAddLog).toHaveBeenCalledWith('intro_1', 'logs', expect.any(String));
    expect(mockCollection.recordCollectionEntry).toHaveBeenCalled();
  });

  it('advancePrologue increments the step and logs the next line', () => {
    const state = createMockState({ prologueStep: 3 });
    prologue.advancePrologue(state);

    expect(state.prologueStep).toBe(4);
    expect(mockAddLog).toHaveBeenCalledWith('intro_4', 'logs', expect.any(String));
    expect(mockPlaySound).toHaveBeenCalledWith('click');
  });

  it('advancePrologue calls finishPrologue at the final step', () => {
    const state = createMockState({ prologueStep: 7 });
    prologue.advancePrologue(state);

    expect(state.finishPrologue).toHaveBeenCalled();
  });

  it('advancePrologue is a no-op when view is not prologue', () => {
    const state = createMockState({ view: 'main' });
    prologue.advancePrologue(state);

    expect(state.prologueStep).toBe(1);
    expect(mockAddLog).not.toHaveBeenCalled();
  });

  it('skipPrologue logs all remaining intro steps and finishes', () => {
    const state = createMockState({ prologueStep: 2 });
    prologue.skipPrologue(state);

    // 7 intro keys, addLog called for those not yet in logs (all in this mock)
    expect(mockAddLog).toHaveBeenCalledTimes(7);
    expect(state.finishPrologue).toHaveBeenCalled();
  });
});
