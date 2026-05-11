import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createNPCSystem } from './village.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    npcProgress: {},
    unlockedNPCs: [],
    demoCompleted: false,
    flags: {},
    ...overrides,
  } as any;
};

describe('NPC System', () => {
  let npc: ReturnType<typeof createNPCSystem>;
  let mockBus: { emit: ReturnType<typeof vi.fn> };
  let mockContent: { get: ReturnType<typeof vi.fn> };
  let mockActions: {
    checkRequirement: ReturnType<typeof vi.fn>;
    effectHandlers: Record<string, ReturnType<typeof vi.fn>>;
  };
  let mockResource: { consume: ReturnType<typeof vi.fn> };
  let mockAddLog: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    npc = createNPCSystem();
    mockBus = { emit: vi.fn() };
    mockContent = { get: vi.fn(() => null) };
    mockActions = {
      checkRequirement: vi.fn(() => true),
      effectHandlers: { unlockItem: vi.fn() },
    };
    mockResource = { consume: vi.fn(() => true) };
    mockAddLog = vi.fn();
    (npc as any).setServices({
      bus: mockBus,
      EVENTS: { SOUND_TRIGGERED: 'sound:triggered' },
      content: mockContent,
      actions: mockActions,
      resource: mockResource,
      addLog: mockAddLog,
    });
  });

  it('returns false when the action does not exist', () => {
    mockContent.get.mockReturnValue(null);
    const state = createMockState();

    expect(npc.execute(state, 'unknown-action')).toBe(false);
  });

  it('returns false when there are no remaining steps', () => {
    mockContent.get.mockImplementation((id: string) => {
      if (id === 'act-npc-baker') return { steps: [{ dialogueKey: 'k' }], maxProgress: 1 };
      if (id === 'npc-baker') return { maxProgress: 1 };
      return null;
    });
    const state = createMockState({ npcProgress: { 'act-npc-baker': 1 } });

    expect(npc.execute(state, 'act-npc-baker')).toBe(false);
  });

  it('increments progress and emits success sound on completed step', () => {
    mockContent.get.mockImplementation((id: string) => {
      if (id === 'act-npc-baker') {
        return {
          steps: [{ dialogueKey: 'greeting' }, { dialogueKey: 'next' }],
          npcId: 'npc-baker',
          maxProgress: 2,
        };
      }
      if (id === 'npc-baker') return { maxProgress: 2, nameKey: 'baker_name' };
      return null;
    });
    const state = createMockState();

    const result = npc.execute(state, 'act-npc-baker');

    expect(state.npcProgress['act-npc-baker']).toBe(1);
    expect(mockBus.emit).toHaveBeenCalledWith('sound:triggered', { key: 'success' });
    expect(result).toMatchObject({
      success: true,
      logKey: 'npc_dialogue_log',
    });
  });

  it('does not progress when step requirements fail', () => {
    mockContent.get.mockImplementation((id: string) => {
      if (id === 'act-npc-x') {
        return {
          steps: [{ requirements: { something: true }, dialogueKey: 'k' }],
          maxProgress: 1,
          npcId: 'npc-x',
        };
      }
      if (id === 'npc-x') return { maxProgress: 1 };
      return null;
    });
    mockActions.checkRequirement.mockReturnValue(false);
    const state = createMockState();

    const result = npc.execute(state, 'act-npc-x');

    expect(result).toBe(false);
    expect(state.npcProgress['act-npc-x']).toBeUndefined();
  });

  it('does not progress when costs cannot be afforded', () => {
    mockContent.get.mockImplementation((id: string) => {
      if (id === 'act-npc-y') {
        return {
          steps: [{ cost: 5, costType: 'energy', dialogueKey: 'k' }],
          maxProgress: 1,
          npcId: 'npc-y',
        };
      }
      if (id === 'npc-y') return { maxProgress: 1 };
      return null;
    });
    mockResource.consume.mockReturnValue(false);
    const state = createMockState();

    const result = npc.execute(state, 'act-npc-y');

    expect(result).toBe(false);
    expect(mockBus.emit).toHaveBeenCalledWith('sound:triggered', { key: 'fail' });
  });

  it('grants a flag reward when step.reward is a non-item id', () => {
    mockContent.get.mockImplementation((id: string) => {
      if (id === 'act-quest') {
        return {
          steps: [{ reward: 'quest-completed', dialogueKey: 'k' }],
          maxProgress: 1,
          npcId: 'npc-z',
        };
      }
      if (id === 'npc-z') return { maxProgress: 1 };
      return null;
    });
    const state = createMockState();

    npc.execute(state, 'act-quest');

    expect((state.flags as any)['quest-completed']).toBe(true);
  });

  describe('canAccessTreeOfLife()', () => {
    it('returns true when tree NPC is unlocked and demo not completed', () => {
      const state = createMockState({ unlockedNPCs: ['npc-treeOfLife'] as any });
      expect(npc.canAccessTreeOfLife(state)).toBe(true);
    });

    it('returns false when demo is completed', () => {
      const state = createMockState({
        unlockedNPCs: ['npc-treeOfLife'] as any,
        demoCompleted: true,
      });
      expect(npc.canAccessTreeOfLife(state)).toBe(false);
    });
  });
});
