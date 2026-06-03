import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createEngineSystem } from './engine';
import { GameState } from '../../types/game';

// Alpine is referenced in engine.init() but NOT in the methods we test directly.
// We bypass init() and call processTick / processTasks / checkMilestones on a mock store.
(globalThis as any).Alpine = {
  store: vi.fn(() => ({ lastTickMs: 0, lastTaskMs: 0, fps: 60 })),
};

/**
 * Creates a minimal mock that satisfies both GameState (engine state slot)
 * and EngineServices (engine services slot). The engine treats them as the
 * same object in tests since services live on the store today.
 */
const createMockStore = (overrides: Partial<GameState> = {}): any => {
  const store: any = {
    // gameState self-reference: in production services.gameState IS the
    // engine state, so for engine tests where the mock acts as both state
    // and services, gameState points back at the mock.
    get gameState() { return store; },
    view: 'game',
    flags: {},
    resources: { magic: 100, wood: 0 },
    limits: {},
    stats: { magic: 100, satiation: 50 },
    activeBuffs: {},
    activeTasks: {},
    activeProducers: [],
    shadowSlots: 3,
    activeShadows: [],
    counters: { totalTime: 0 },
    placedItems: [],

    // System mocks
    pipeline: {
      calculate: vi.fn((_s: any, _key: string, base: number) => base),
      invalidateCache: vi.fn(),
    },
    resource: {
      add: vi.fn((s: any, key: string, amt: number) => {
        s.resources[key] = (s.resources[key] || 0) + amt;
      }),
      consume: vi.fn((s: any, key: string, amt: number) => {
        if (key === 'magic') s.stats.magic -= amt;
        else s.resources[key] = (s.resources[key] || 0) - amt;
      }),
      invalidateCache: vi.fn(),
    },
    content: {
      get: vi.fn(() => null),
      registries: { milestones: {} },
    },
    actions: {
      processAction: vi.fn(() => ({ success: true })),
      handleSuccess: vi.fn(),
      checkRequirement: vi.fn(() => true),
      effectHandlers: {},
    },
    commands: {
      enqueue: vi.fn(),
      drain: vi.fn(),
      size: vi.fn(() => 0),
      clear: vi.fn(),
    },
    addLog: vi.fn(),
    playSound: vi.fn(),
    saveGame: vi.fn(),

    ...overrides,
  };
  return store;
};

describe('Engine System', () => {
  let engine: ReturnType<typeof createEngineSystem>;

  beforeEach(() => {
    engine = createEngineSystem();
    vi.clearAllMocks();
  });

  // ── BUFFS ─────────────────────────────────────────────────────────────────
  describe('Buffs', () => {
    it('removes a buff when its remaining time reaches zero', () => {
      const store = createMockStore({
        activeBuffs: {
          haste: { id: 'haste', title: 't', desc: 'd', remaining: 10, total: 10 },
        },
      });

      engine.processTick(store, store, 10);

      expect(store.activeBuffs.haste).toBeUndefined();
    });

    it('counts down a buff timer without removing it when time remains', () => {
      const store = createMockStore({
        activeBuffs: {
          haste: { id: 'haste', title: 't', desc: 'd', remaining: 30, total: 30 },
        },
      });

      engine.processTick(store, store, 10);

      expect(store.activeBuffs.haste).toBeDefined();
      expect(store.activeBuffs.haste!.remaining).toBe(20);
    });
  });

  // ── SHADOW BIND ───────────────────────────────────────────────────────────
  describe('Shadow Bind', () => {
    it('consumes magic per second while one shadow is bound', () => {
      const store = createMockStore({
        activeShadows: ['study'],
        stats: { magic: 100, satiation: 50 },
      });
      // pipeline returns base cost (3) unchanged
      (store.pipeline.calculate as any).mockReturnValue(3);

      engine.processTick(store, store, 1); // 1 second tick

      expect(store.resource.consume).toHaveBeenCalledWith(store, 'magic', 3, true);
      expect(store.stats.magic).toBe(97);
      expect(store.activeShadows).toEqual(['study']);
    });

    it('drains magic per shadow — cost scales with the number bound', () => {
      const store = createMockStore({
        activeShadows: ['study', 'chop', 'mine'],
        stats: { magic: 100, satiation: 50 },
      });
      (store.pipeline.calculate as any).mockReturnValue(3);

      engine.processTick(store, store, 1);

      // 3 per shadow × 3 shadows = 9 per second
      expect(store.resource.consume).toHaveBeenCalledWith(store, 'magic', 9, true);
      expect(store.stats.magic).toBe(91);
      expect(store.activeShadows).toEqual(['study', 'chop', 'mine']);
    });

    it('releases ALL shadows and logs when magic is insufficient', () => {
      const store = createMockStore({
        activeShadows: ['study', 'chop'],
        stats: { magic: 1, satiation: 50 }, // less than 2× cost of 3
      });
      (store.pipeline.calculate as any).mockReturnValue(3);

      engine.processTick(store, store, 1);

      expect(store.activeShadows).toEqual([]);
      expect(store.addLog).toHaveBeenCalledWith(
        'shadow_broken_magic',
        'logs',
        expect.any(String),
      );
      expect(store.playSound).toHaveBeenCalledWith('fail');
    });
  });

  // ── PASSIVE REGEN ─────────────────────────────────────────────────────────
  describe('Passive Magic Regeneration', () => {
    it('accumulates and commits regen across multiple sub-1 ticks', () => {
      const store = createMockStore({ stats: { magic: 50, satiation: 50 } });
      // regen = 1.0/s, 10 ticks of 1s each → +10 magic total
      (store.pipeline.calculate as any).mockImplementation(
        (_s: any, key: string, base: number) => (key === 'magic_regen_passive' ? 1 : base),
      );

      for (let i = 0; i < 10; i++) {
        engine.processTick(store, store, 1);
      }

      // accumulator commits in 0.1-unit batches → all 10 should have been added
      const addedAmounts = (store.resource.add as any).mock.calls
        .filter((c: any[]) => c[1] === 'magic')
        .reduce((sum: number, c: any[]) => sum + c[2], 0);
      expect(addedAmounts).toBeCloseTo(10, 1);
    });

    it('does not regenerate when regen rate is zero', () => {
      const store = createMockStore();
      (store.pipeline.calculate as any).mockReturnValue(0);

      engine.processTick(store, store, 5);

      const magicAdds = (store.resource.add as any).mock.calls.filter(
        (c: any[]) => c[1] === 'magic',
      );
      expect(magicAdds).toHaveLength(0);
    });
  });

  // ── PASSIVE PRODUCTION ────────────────────────────────────────────────────
  describe('Passive Production', () => {
    it('produces exactly N units after N intervals', () => {
      const store = createMockStore({
        activeProducers: ['lumber_mill'] as any,
      });
      (store.content.get as any).mockImplementation((id: string) => {
        if (id === 'lumber_mill') {
          return {
            id: 'lumber_mill',
            passiveProduction: {
              resource: 'wood',
              baseYield: 1, // 1 wood per interval
              interval: 1000, // 1 second
            },
          };
        }
        return null;
      });
      (store.pipeline.calculate as any).mockImplementation(
        (_s: any, _key: string, base: number) => base,
      );

      // 5 ticks of 1 second each → 5 wood
      for (let i = 0; i < 5; i++) {
        engine.processPassiveProduction(store, store, 1);
      }

      expect(store.resources.wood).toBe(5);
    });

    it('skips production when magic maintenance cost cannot be paid', () => {
      const store = createMockStore({
        activeProducers: ['arcane_engine'] as any,
        stats: { magic: 0, satiation: 50 }, // no magic
      });
      (store.content.get as any).mockImplementation((id: string) => {
        if (id === 'arcane_engine') {
          return {
            id: 'arcane_engine',
            passiveProduction: {
              resource: 'wood',
              baseYield: 1,
              interval: 1000,
              magicCost: 5,
            },
          };
        }
        return null;
      });
      (store.pipeline.calculate as any).mockImplementation(
        (_s: any, _key: string, base: number) => base,
      );

      engine.processPassiveProduction(store, store, 1);

      expect(store.resource.add).not.toHaveBeenCalled();
      expect(store.resources.wood ?? 0).toBe(0);
    });
  });

  // ── TASKS ─────────────────────────────────────────────────────────────────
  describe('Tasks', () => {
    it('completes a task when its remaining time hits zero and calls handleSuccess', () => {
      const mockAction = { id: 'chop_wood', isLoopable: false };
      const store = createMockStore({
        activeTasks: {
          chop_wood: {
            id: 'chop_wood',
            actionId: 'chop_wood',
            remaining: 3000,
            total: 3000,
          },
        },
      });
      (store.content.get as any).mockImplementation((id: string, type: string) =>
        id === 'chop_wood' && type === 'actions' ? mockAction : null,
      );

      engine.processTasks(store, store, 3000);

      expect(store.activeTasks.chop_wood).toBeUndefined();
      expect(store.actions.processAction).toHaveBeenCalledWith(
        store,
        'chop_wood',
        mockAction,
        'finalize',
      );
      expect(store.actions.handleSuccess).toHaveBeenCalled();
    });

    it('leaves a task running and ticks down its remaining time when not yet done', () => {
      const store = createMockStore({
        activeTasks: {
          chop_wood: {
            id: 'chop_wood',
            actionId: 'chop_wood',
            remaining: 3000,
            total: 3000,
          },
        },
      });

      engine.processTasks(store, store, 1000);

      expect(store.activeTasks.chop_wood).toBeDefined();
      expect(store.activeTasks.chop_wood.remaining).toBe(2000);
      expect(store.actions.handleSuccess).not.toHaveBeenCalled();
    });
  });

  // ── MILESTONES ────────────────────────────────────────────────────────────
  describe('Milestones', () => {
    it('sets the flag and runs onUnlock effects when requirements are met', () => {
      const effectHandler = vi.fn();
      const store = createMockStore();
      (store.actions as any).effectHandlers = { setFlag: effectHandler };
      (store.content as any).registries.milestones = {
        first_wood: {
          id: 'first_wood',
          requirements: { wood: 1 },
          onUnlock: [{ type: 'setFlag', flag: 'has_wood' }],
        },
      };
      (store.actions.checkRequirement as any).mockReturnValue(true);

      engine.checkMilestones(store, store);

      expect((store.flags as any).first_wood).toBe(true);
      expect(effectHandler).toHaveBeenCalledWith(store, {
        type: 'setFlag',
        flag: 'has_wood',
      });
    });

    it('does not re-trigger a milestone that is already unlocked', () => {
      const effectHandler = vi.fn();
      const store = createMockStore({
        flags: { first_wood: true } as any,
      });
      (store.actions as any).effectHandlers = { setFlag: effectHandler };
      (store.content as any).registries.milestones = {
        first_wood: {
          id: 'first_wood',
          requirements: { wood: 1 },
          onUnlock: [{ type: 'setFlag', flag: 'has_wood' }],
        },
      };

      engine.checkMilestones(store, store);

      expect(effectHandler).not.toHaveBeenCalled();
    });

    it('does not unlock a milestone when requirements are not met', () => {
      const store = createMockStore();
      (store.content as any).registries.milestones = {
        first_wood: {
          id: 'first_wood',
          requirements: { wood: 1 },
          onUnlock: [],
        },
      };
      (store.actions.checkRequirement as any).mockReturnValue(false);

      engine.checkMilestones(store, store);

      expect((store.flags as any).first_wood).toBeFalsy();
    });
  });
});
