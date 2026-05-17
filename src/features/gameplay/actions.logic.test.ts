import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createActionSystem } from './actions.logic';
import { GameState } from '../../types/game';

/**
 * Minimal mock for testing the action system.
 * Covers all fields the system reads/writes plus the helper services it calls.
 */
const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  const state: any = {
    flags: {},
    stats: { satiation: 50, energy: 100, magic: 50 },
    resources: { wood: 10, stone: 5 },
    limits: { wood: 20, stone: 20 },
    counters: { totalActions: 0 },
    activeTasks: {},
    activeBuffs: {},
    activeProducers: [],
    activeHome: null,
    activeFocus: null,
    unlockedNPCs: [],
    unlockedRecipes: [],
    discoveredItems: [],
    currentObjective: null,
    lastMouseX: 0,
    lastMouseY: 0,

    pipeline: {
      calculate: vi.fn((_s: any, _key: string, base: number) => base),
      invalidateCache: vi.fn(),
    },
    resource: {
      canAfford: vi.fn(() => true),
      consume: vi.fn(() => true),
      add: vi.fn(),
      isFull: vi.fn(() => false),
      invalidateCache: vi.fn(),
    },
    content: {
      get: vi.fn(() => null),
    },
    bus: {
      emit: vi.fn(),
    },
    EVENTS: {
      SOUND_TRIGGERED: 'sound:triggered',
      PARTICLE_TRIGGERED: 'particle:triggered',
      LOG_ADDED: 'log:added',
      SAVE_REQUESTED: 'save:requested',
    },
    titles: { unlockTitle: vi.fn() },
    addLog: vi.fn(),
    playSound: vi.fn(),
    t: vi.fn((key: string) => key),

    ...overrides,
  };
  return state as GameState;
};

describe('Action System', () => {
  let actions: ReturnType<typeof createActionSystem>;
  let mockBus: { emit: ReturnType<typeof vi.fn> };
  let mockPipeline: { calculate: ReturnType<typeof vi.fn>; invalidateCache: ReturnType<typeof vi.fn> };
  let mockResource: {
    canAfford: ReturnType<typeof vi.fn>;
    consume: ReturnType<typeof vi.fn>;
    add: ReturnType<typeof vi.fn>;
    isFull: ReturnType<typeof vi.fn>;
    invalidateCache: ReturnType<typeof vi.fn>;
  };
  let mockContent: { get: ReturnType<typeof vi.fn> };
  let mockTitles: { unlockTitle: ReturnType<typeof vi.fn> };
  let mockCollection: { recordCollectionEntry: ReturnType<typeof vi.fn> };
  let mockAddLog: ReturnType<typeof vi.fn>;
  let mockPlaySound: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    actions = createActionSystem();
    mockBus = { emit: vi.fn() };
    mockPipeline = {
      calculate: vi.fn((_s: any, _key: string, base: number) => base),
      invalidateCache: vi.fn(),
    };
    mockResource = {
      canAfford: vi.fn(() => true),
      consume: vi.fn(() => true),
      add: vi.fn(),
      isFull: vi.fn(() => false),
      invalidateCache: vi.fn(),
    };
    mockContent = { get: vi.fn(() => null) };
    mockTitles = { unlockTitle: vi.fn() };
    mockCollection = { recordCollectionEntry: vi.fn() };
    mockAddLog = vi.fn();
    mockPlaySound = vi.fn();
    (actions as any).setServices({
      bus: mockBus,
      EVENTS: {
        SOUND_TRIGGERED: 'sound:triggered',
        PARTICLE_TRIGGERED: 'particle:triggered',
        LOG_ADDED: 'log:added',
        SAVE_REQUESTED: 'save:requested',
      },
      content: mockContent,
      pipeline: mockPipeline,
      resource: mockResource,
      titles: mockTitles,
      collection: mockCollection,
      addLog: mockAddLog,
      playSound: mockPlaySound,
      t: (key: string) => key,
    });
    actions.boot(); // registers built-in effect handlers
  });

  // ── EFFECT HANDLERS ────────────────────────────────────────────────────────
  describe('Effect Handlers', () => {
    it('setFlag sets the flag and invalidates caches', () => {
      const state = createMockState();
      actions.effectHandlers.setFlag!(state, { type: 'setFlag', flag: 'school_graduate' as any, value: true });

      expect(state.flags.school_graduate).toBe(true);
      expect(mockPipeline.invalidateCache).toHaveBeenCalled();
      expect(mockResource.invalidateCache).toHaveBeenCalled();
    });

    it('setFlag adds to activeProducers when the action has passiveProduction', () => {
      const state = createMockState();
      mockContent.get.mockImplementation((id: string, type: string) =>
        id === 'lumber_mill' && type === 'actions'
          ? { passiveProduction: { resource: 'wood', baseYield: 1, interval: 1000 } }
          : null,
      );

      actions.effectHandlers.setFlag!(state, { type: 'setFlag', flag: 'lumber_mill' as any, value: true });

      expect(state.activeProducers).toContain('lumber_mill');
    });

    it('setFlag removes producer when value becomes false', () => {
      const state = createMockState({ activeProducers: ['lumber_mill'] as any });
      mockContent.get.mockImplementation((_id: string) => ({
        passiveProduction: { resource: 'wood', baseYield: 1, interval: 1000 },
      }));

      actions.effectHandlers.setFlag!(state, { type: 'setFlag', flag: 'lumber_mill' as any, value: false });

      expect(state.activeProducers).not.toContain('lumber_mill');
    });

    it('unlockNPC appends to unlockedNPCs without duplicating', () => {
      const state = createMockState({ unlockedNPCs: ['ellie'] as any });
      actions.effectHandlers.unlockNPC!(state, { type: 'unlockNPC', id: 'ellie' as any });
      actions.effectHandlers.unlockNPC!(state, { type: 'unlockNPC', id: 'bram' as any });

      expect(state.unlockedNPCs).toEqual(['ellie', 'bram']);
    });

    it('unlockItem sets the flag and adds to discoveredItems', () => {
      const state = createMockState();
      actions.effectHandlers.unlockItem!(state, { type: 'unlockItem', id: 'iron_sword' as any });

      expect(state.discoveredItems).toContain('iron_sword');
      expect((state.flags as any).iron_sword).toBe(true);
    });

    it('modifyLimit updates maxStat for stats and limits for resources', () => {
      const state = createMockState();
      // 'magic' is a stat → uses maxKey 'maxMagic'
      actions.effectHandlers.modifyLimit!(state, { type: 'modifyLimit', resource: 'magic' as any, amount: 25 });
      expect(state.stats.maxMagic).toBe(25);

      // 'wood' is a resource → uses limits
      actions.effectHandlers.modifyLimit!(state, { type: 'modifyLimit', resource: 'wood' as any, amount: 10 });
      expect(state.limits.wood).toBe(30);
    });

    it('addBuff puts a buff in activeBuffs with duration as remaining/total', () => {
      const state = createMockState();
      mockContent.get.mockImplementation((id: string, type: string) =>
        id === 'haste' && type === 'buffs'
          ? { duration: 30, title: 'Haste', desc: 'Faster' }
          : null,
      );

      actions.effectHandlers.addBuff!(state, { type: 'addBuff', buffId: 'haste' });

      expect(state.activeBuffs.haste).toMatchObject({
        id: 'haste',
        remaining: 30,
        total: 30,
      });
    });

    it('setObjective sets the current objective', () => {
      const state = createMockState();
      actions.effectHandlers.setObjective!(state, { type: 'setObjective', id: 'find_ellie' });
      expect(state.currentObjective).toBe('find_ellie');
    });
  });

  // ── PROCESS ACTION ─────────────────────────────────────────────────────────
  describe('processAction()', () => {
    it('returns failure when requirements are not met', () => {
      const state = createMockState();
      const action: any = {
        id: 'chop_wood',
        requirements: { 'flags.school_unlocked': true },
      };
      // checkRequirement uses the real logicUtils — flag is false so it fails

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
    });

    it('returns failure when costs cannot be afforded', () => {
      const state = createMockState();
      mockResource.canAfford.mockReturnValue(false);
      const action: any = { id: 'chop_wood', costType: 'energy', cost: 10 };

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
      expect(mockResource.consume).not.toHaveBeenCalled();
    });

    it('returns failure and logs when reward storage is full', () => {
      const state = createMockState();
      mockResource.isFull.mockReturnValue(true);
      const action: any = { id: 'chop_wood', rewards: { wood: 5 } };

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
      expect(mockAddLog).toHaveBeenCalledWith(
        expect.stringContaining('fail_full_'),
        'logs',
        expect.any(String),
      );
    });

    it('consumes costs in prepare mode and adds rewards in finalize', () => {
      const state = createMockState();
      const action: any = {
        id: 'chop_wood',
        costType: 'energy',
        cost: 5,
        rewards: { wood: 3 },
      };

      const result = actions.processAction(state, 'chop_wood' as any, action);

      expect(result.success).toBe(true);
      expect(mockResource.consume).toHaveBeenCalledWith(state, { energy: 5 });
      expect(mockResource.add).toHaveBeenCalledWith(state, 'wood', 3);
    });

    it('runs onSuccess effects in finalize mode', () => {
      const state = createMockState();
      const action: any = {
        id: 'unlock_library',
        onSuccess: [{ type: 'setFlag', flag: 'unlocked-library', value: true }],
      };

      actions.processAction(state, 'unlock_library' as any, action);
      expect(state.flags['unlocked-library']).toBe(true);
    });

    it('blocks an action at its maxCount', () => {
      const state = createMockState({
        counters: { totalActions: 0, special_quest: 1 },
      });
      const action: any = { id: 'special_quest', maxCount: 1 };

      const result = actions.processAction(state, 'special_quest' as any, action);
      expect(result.success).toBe(false);
    });

    it('skips energy cost when activeFocus matches the action id', () => {
      const state = createMockState({ activeFocus: 'chop_wood' as any });
      const action: any = { id: 'chop_wood', costs: { energy: 5, wood: 1 } };

      actions.processAction(state, 'chop_wood' as any, action);

      // energy should have been removed from the costs passed to consume
      expect(mockResource.consume).toHaveBeenCalledWith(state, { wood: 1 });
    });

    it('stops a focused action when satiation falls below 5', () => {
      const state = createMockState({
        activeFocus: 'chop_wood' as any,
        stats: { satiation: 3, energy: 100, magic: 50 },
      });
      const action: any = { id: 'chop_wood' };

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
      expect(mockAddLog).toHaveBeenCalledWith('fail_satiation_loop', 'logs', expect.any(String));
    });
  });

  // ── EXECUTE ────────────────────────────────────────────────────────────────
  describe('execute()', () => {
    it('queues a task for actions with a duration', () => {
      const state = createMockState();
      mockContent.get.mockReturnValue({
        id: 'build_hut',
        duration: 5000,
        costType: 'wood',
        cost: 5,
      });

      const ok = actions.execute(state, 'build_hut' as any);

      expect(ok).toBe(true);
      expect(state.activeTasks['build_hut']).toMatchObject({
        actionId: 'build_hut',
        remaining: 5000,
        total: 5000,
      });
    });

    it('does not queue a duplicate task while one is active', () => {
      const state = createMockState({
        activeTasks: {
          build_hut: { actionId: 'build_hut', remaining: 1000, total: 5000 },
        },
      });
      mockContent.get.mockReturnValue({ id: 'build_hut', duration: 5000 });

      const ok = actions.execute(state, 'build_hut' as any);
      expect(ok).toBe(false);
    });

    it('returns false when action id is unknown', () => {
      const state = createMockState();
      mockContent.get.mockReturnValue(null);

      const ok = actions.execute(state, 'nonexistent' as any);
      expect(ok).toBe(false);
    });
  });

  // ── REBUILD PRODUCERS ──────────────────────────────────────────────────────
  describe('rebuildProducers()', () => {
    it('rebuilds activeProducers from currently true flags with passiveProduction', () => {
      const state = createMockState({
        flags: { lumber_mill: true, stone_quarry: true, school_unlocked: true } as any,
        activeProducers: [], // start empty
      });
      mockContent.get.mockImplementation((id: string, type: string) => {
        if (type !== 'actions') return null;
        if (id === 'lumber_mill') return { passiveProduction: { resource: 'wood', baseYield: 1, interval: 1000 } };
        if (id === 'stone_quarry') return { passiveProduction: { resource: 'stone', baseYield: 1, interval: 1000 } };
        if (id === 'school_unlocked') return { /* no passiveProduction */ };
        return null;
      });

      actions.rebuildProducers(state);

      expect(state.activeProducers).toContain('lumber_mill');
      expect(state.activeProducers).toContain('stone_quarry');
      expect(state.activeProducers).not.toContain('school_unlocked');
    });

    it('clears producers whose flags are now false', () => {
      const state = createMockState({
        flags: { lumber_mill: false } as any,
        activeProducers: ['lumber_mill'] as any,
      });

      actions.rebuildProducers(state);
      expect(state.activeProducers).toEqual([]);
    });
  });
});
