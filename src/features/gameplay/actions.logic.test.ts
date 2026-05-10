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

  beforeEach(() => {
    actions = createActionSystem();
    actions.boot(); // registers built-in effect handlers
    vi.clearAllMocks();
  });

  // ── EFFECT HANDLERS ────────────────────────────────────────────────────────
  describe('Effect Handlers', () => {
    it('setFlag sets the flag and invalidates caches', () => {
      const state = createMockState();
      actions.effectHandlers.setFlag(state, { type: 'setFlag', flag: 'school_unlocked' as any, value: true });

      expect(state.flags.school_unlocked).toBe(true);
      expect(state.pipeline.invalidateCache).toHaveBeenCalled();
      expect(state.resource.invalidateCache).toHaveBeenCalled();
    });

    it('setFlag adds to activeProducers when the action has passiveProduction', () => {
      const state = createMockState();
      (state.content.get as any).mockImplementation((id: string, type: string) =>
        id === 'lumber_mill' && type === 'actions'
          ? { passiveProduction: { resource: 'wood', baseYield: 1, interval: 1000 } }
          : null,
      );

      actions.effectHandlers.setFlag(state, { type: 'setFlag', flag: 'lumber_mill' as any, value: true });

      expect(state.activeProducers).toContain('lumber_mill');
    });

    it('setFlag removes producer when value becomes false', () => {
      const state = createMockState({ activeProducers: ['lumber_mill'] as any });
      (state.content.get as any).mockImplementation((_id: string) => ({
        passiveProduction: { resource: 'wood', baseYield: 1, interval: 1000 },
      }));

      actions.effectHandlers.setFlag(state, { type: 'setFlag', flag: 'lumber_mill' as any, value: false });

      expect(state.activeProducers).not.toContain('lumber_mill');
    });

    it('unlockNPC appends to unlockedNPCs without duplicating', () => {
      const state = createMockState({ unlockedNPCs: ['ellie'] as any });
      actions.effectHandlers.unlockNPC(state, { type: 'unlockNPC', id: 'ellie' as any });
      actions.effectHandlers.unlockNPC(state, { type: 'unlockNPC', id: 'bram' as any });

      expect(state.unlockedNPCs).toEqual(['ellie', 'bram']);
    });

    it('unlockItem sets the flag and adds to discoveredItems', () => {
      const state = createMockState();
      actions.effectHandlers.unlockItem(state, { type: 'unlockItem', id: 'iron_sword' as any });

      expect(state.discoveredItems).toContain('iron_sword');
      expect(state.flags.iron_sword).toBe(true);
    });

    it('modifyLimit updates maxStat for stats and limits for resources', () => {
      const state = createMockState();
      // 'magic' is a stat → uses maxKey 'maxMagic'
      actions.effectHandlers.modifyLimit(state, { type: 'modifyLimit', resource: 'magic' as any, amount: 25 });
      expect(state.stats.maxMagic).toBe(25);

      // 'wood' is a resource → uses limits
      actions.effectHandlers.modifyLimit(state, { type: 'modifyLimit', resource: 'wood' as any, amount: 10 });
      expect(state.limits.wood).toBe(30);
    });

    it('addBuff puts a buff in activeBuffs with duration as remaining/total', () => {
      const state = createMockState();
      (state.content.get as any).mockImplementation((id: string, type: string) =>
        id === 'haste' && type === 'buffs'
          ? { duration: 30, title: 'Haste', desc: 'Faster' }
          : null,
      );

      actions.effectHandlers.addBuff(state, { type: 'addBuff', buffId: 'haste' });

      expect(state.activeBuffs.haste).toMatchObject({
        id: 'haste',
        remaining: 30,
        total: 30,
      });
    });

    it('setObjective sets the current objective', () => {
      const state = createMockState();
      actions.effectHandlers.setObjective(state, { type: 'setObjective', id: 'find_ellie' });
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
      (state.resource.canAfford as any).mockReturnValue(false);
      const action: any = { id: 'chop_wood', costType: 'energy', cost: 10 };

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
      expect(state.resource.consume).not.toHaveBeenCalled();
    });

    it('returns failure and logs when reward storage is full', () => {
      const state = createMockState();
      (state.resource.isFull as any).mockReturnValue(true);
      const action: any = { id: 'chop_wood', rewards: { wood: 5 } };

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
      expect(state.addLog).toHaveBeenCalledWith(
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
      expect(state.resource.consume).toHaveBeenCalledWith(state, { energy: 5 });
      expect(state.resource.add).toHaveBeenCalledWith(state, 'wood', 3);
    });

    it('runs onSuccess effects in finalize mode', () => {
      const state = createMockState();
      const action: any = {
        id: 'unlock_school',
        onSuccess: [{ type: 'setFlag', flag: 'school_unlocked', value: true }],
      };

      actions.processAction(state, 'unlock_school' as any, action);
      expect(state.flags.school_unlocked).toBe(true);
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
      expect(state.resource.consume).toHaveBeenCalledWith(state, { wood: 1 });
    });

    it('stops a focused action when satiation falls below 5', () => {
      const state = createMockState({
        activeFocus: 'chop_wood' as any,
        stats: { satiation: 3, energy: 100, magic: 50 },
      });
      const action: any = { id: 'chop_wood' };

      const result = actions.processAction(state, 'chop_wood' as any, action);
      expect(result.success).toBe(false);
      expect(state.addLog).toHaveBeenCalledWith('fail_satiation_loop', 'logs', expect.any(String));
    });
  });

  // ── EXECUTE ────────────────────────────────────────────────────────────────
  describe('execute()', () => {
    it('queues a task for actions with a duration', () => {
      const state = createMockState();
      (state.content.get as any).mockReturnValue({
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
      (state.content.get as any).mockReturnValue({ id: 'build_hut', duration: 5000 });

      const ok = actions.execute(state, 'build_hut' as any);
      expect(ok).toBe(false);
    });

    it('returns false when action id is unknown', () => {
      const state = createMockState();
      (state.content.get as any).mockReturnValue(null);

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
      (state.content.get as any).mockImplementation((id: string, type: string) => {
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
