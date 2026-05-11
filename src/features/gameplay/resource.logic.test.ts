import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createResourceSystem } from './resource.logic';
import { GameState } from '../../types/game';

/**
 * Builds a minimal mocked GameState for testing the resource system.
 * The system only touches: stats, resources, limits, discoveredResources,
 * activeHome, pipeline, content, bus, addLog, EVENTS.
 */
const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  const state: any = {
    stats: { satiation: 50, energy: 50, magic: 30, maxEnergy: 100, maxMagic: 100 },
    resources: { wood: 5, stone: 0 },
    limits: { wood: 20, stone: 10 },
    discoveredResources: [],
    activeHome: null,
    pipeline: {
      calculate: vi.fn((_s: any, _key: string, base: number) => base),
      invalidateCache: vi.fn(),
    },
    content: {
      get: vi.fn(() => null),
    },
    bus: {
      emit: vi.fn(),
    },
    EVENTS: {
      RESOURCE_SPENT: 'resource:spent',
      RESOURCE_GAINED: 'resource:gained',
    },
    addLog: vi.fn(),
    ...overrides,
  };
  return state as GameState;
};

describe('Resource System', () => {
  let resource: ReturnType<typeof createResourceSystem>;
  let mockBus: { emit: ReturnType<typeof vi.fn> };
  let mockPipeline: { calculate: ReturnType<typeof vi.fn>; invalidateCache: ReturnType<typeof vi.fn> };
  let mockContent: { get: ReturnType<typeof vi.fn> };
  let mockAddLog: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    resource = createResourceSystem();
    mockBus = { emit: vi.fn() };
    mockPipeline = {
      calculate: vi.fn((_s: any, _key: string, base: number) => base),
      invalidateCache: vi.fn(),
    };
    mockContent = { get: vi.fn(() => null) };
    mockAddLog = vi.fn();
    resource.setServices({
      bus: mockBus as any,
      EVENTS: { RESOURCE_SPENT: 'resource:spent', RESOURCE_GAINED: 'resource:gained' } as any,
      content: mockContent as any,
      pipeline: mockPipeline as any,
      addLog: mockAddLog as any,
    });
  });

  // ── ADD ───────────────────────────────────────────────────────────────────
  describe('add()', () => {
    it('adds to a resource and respects the limit cap', () => {
      const state = createMockState({ resources: { wood: 18 }, limits: { wood: 20 } });
      resource.add(state, 'wood', 5);
      expect(state.resources.wood).toBe(20);
    });

    it('adds to a stat and respects the max stat cap', () => {
      const state = createMockState({ stats: { energy: 95, maxEnergy: 100 } });
      resource.add(state, 'energy', 20);
      expect(state.stats.energy).toBe(100);
    });

    it('marks new resources as discovered on first add', () => {
      const state = createMockState({
        resources: { stone: 0 },
        discoveredResources: [],
      });
      resource.add(state, 'stone', 1);
      expect(state.discoveredResources).toContain('stone');
    });

    it('rejects negative amounts and warns', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const state = createMockState();
      const result = resource.add(state, 'wood', -5);
      expect(result).toBe(false);
      expect(warn).toHaveBeenCalled();
      warn.mockRestore();
    });

    it('ignores micro-amounts below 0.001', () => {
      const state = createMockState();
      const before = state.resources.wood;
      resource.add(state, 'wood', 0.0001);
      expect(state.resources.wood).toBe(before);
    });

    it('emits RESOURCE_GAINED event when not silent', () => {
      const state = createMockState();
      resource.add(state, 'wood', 1);
      expect(mockBus.emit).toHaveBeenCalledWith('resource:gained', { type: 'wood' });
    });

    it('does not emit when silent flag is set', () => {
      const state = createMockState();
      resource.add(state, 'wood', 1, true);
      expect(mockBus.emit).not.toHaveBeenCalled();
    });
  });

  // ── CONSUME ───────────────────────────────────────────────────────────────
  describe('consume()', () => {
    it('consumes from resources and clamps at zero', () => {
      const state = createMockState({ resources: { wood: 3 }, limits: { wood: 20 } });
      const ok = resource.consume(state, 'wood', 3);
      expect(ok).toBe(true);
      expect(state.resources.wood).toBe(0);
    });

    it('returns false and does not mutate if insufficient', () => {
      const state = createMockState({ resources: { wood: 2 }, limits: { wood: 20 } });
      const ok = resource.consume(state, 'wood', 5);
      expect(ok).toBe(false);
      expect(state.resources.wood).toBe(2);
    });

    it('consumes from stats (e.g. magic)', () => {
      const state = createMockState({ stats: { magic: 20, satiation: 50 } });
      const ok = resource.consume(state, 'magic', 5);
      expect(ok).toBe(true);
      expect(state.stats.magic).toBe(15);
    });

    it('consumes multi-resource cost via object form', () => {
      const state = createMockState({
        resources: { wood: 10, stone: 5 },
        limits: { wood: 20, stone: 10 },
      });
      const ok = resource.consume(state, { wood: 3, stone: 2 });
      expect(ok).toBe(true);
      expect(state.resources.wood).toBe(7);
      expect(state.resources.stone).toBe(3);
    });

    it('rejects multi-resource cost atomically if any cannot be afforded', () => {
      const state = createMockState({
        resources: { wood: 10, stone: 1 },
        limits: { wood: 20, stone: 10 },
      });
      const ok = resource.consume(state, { wood: 3, stone: 5 });
      expect(ok).toBe(false);
      expect(state.resources.wood).toBe(10);
      expect(state.resources.stone).toBe(1);
    });

    it('triggers satiation drain when a resource has satiationDrain set', () => {
      const state = createMockState({
        stats: { satiation: 50, energy: 20 },
        resources: { wood: 5 },
        limits: { wood: 20 },
      });
      mockContent.get.mockImplementation((id: string, type: string) =>
        id === 'wood' && type === 'resources' ? { satiationDrain: 1 } : null,
      );

      resource.consume(state, 'wood', 2);

      // satiation drains by amount * drain * multiplier (1) = 2
      expect(state.stats.satiation).toBe(48);
    });

    it('logs a warning when satiation drops below 20%', () => {
      const state = createMockState({
        stats: { satiation: 22, energy: 20 },
        resources: { wood: 10 },
        limits: { wood: 20 },
      });
      mockContent.get.mockImplementation((id: string) =>
        id === 'wood' ? { satiationDrain: 1 } : null,
      );

      resource.consume(state, 'wood', 5);

      expect(state.stats.satiation).toBeLessThan(20);
      expect(mockAddLog).toHaveBeenCalledWith('malus_satiation', 'logs', expect.any(String));
    });
  });

  // ── CAN AFFORD ────────────────────────────────────────────────────────────
  describe('canAfford()', () => {
    it('returns true when stat is sufficient', () => {
      const state = createMockState({ stats: { magic: 10, satiation: 50 } });
      expect(resource.canAfford(state, 'magic', 5)).toBe(true);
    });

    it('returns false when resource is insufficient', () => {
      const state = createMockState({ resources: { wood: 2 } });
      expect(resource.canAfford(state, 'wood', 5)).toBe(false);
    });

    it('handles multi-cost object form (all must pass)', () => {
      const state = createMockState({
        resources: { wood: 10, stone: 1 },
      });
      expect(resource.canAfford(state, { wood: 5, stone: 2 })).toBe(false);
      expect(resource.canAfford(state, { wood: 5, stone: 1 })).toBe(true);
    });

    it('applies satiation-scaled cost when resource scalesWithSatiation', () => {
      const state = createMockState({ resources: { wood: 10 } });
      mockContent.get.mockImplementation((id: string) =>
        id === 'wood' ? { scalesWithSatiation: true } : null,
      );
      // efficiency 0.5 → cost doubles → 5 base becomes 10 effective
      mockPipeline.calculate.mockReturnValue(0.5);

      expect(resource.canAfford(state, 'wood', 5)).toBe(true); // exactly 10
      expect(resource.canAfford(state, 'wood', 6)).toBe(false); // needs 12
    });
  });

  // ── LIMITS & CAPS ─────────────────────────────────────────────────────────
  describe('getLimit()', () => {
    it('returns base + pipeline bonus + home bonus', () => {
      const state = createMockState({
        limits: { wood: 20 },
        activeHome: 'shelter' as any,
      });
      mockPipeline.calculate.mockImplementation(
        (_s: any, key: string) => (key === 'wood_limit' ? 5 : 0),
      );
      mockContent.get.mockImplementation((id: string, type: string) =>
        id === 'shelter' && type === 'homes' ? { baseLimits: { wood: 10 } } : null,
      );

      expect(resource.getLimit(state, 'wood' as any)).toBe(35);
    });

    it('caches limit lookups until invalidation', () => {
      const state = createMockState({ limits: { wood: 20 } });
      resource.getLimit(state, 'wood' as any);
      resource.getLimit(state, 'wood' as any);
      // pipeline called only on first lookup
      expect(mockPipeline.calculate).toHaveBeenCalledTimes(1);

      resource.invalidateCache();
      resource.getLimit(state, 'wood' as any);
      expect(mockPipeline.calculate).toHaveBeenCalledTimes(2);
    });
  });

  describe('isFull()', () => {
    it('returns true when resource is at its limit', () => {
      const state = createMockState({ resources: { wood: 20 }, limits: { wood: 20 } });
      expect(resource.isFull(state, 'wood' as any)).toBe(true);
    });

    it('returns false when resource is below the limit', () => {
      const state = createMockState({ resources: { wood: 15 }, limits: { wood: 20 } });
      expect(resource.isFull(state, 'wood' as any)).toBe(false);
    });

    it('returns true when stat is at its max', () => {
      const state = createMockState({ stats: { energy: 100, maxEnergy: 100 } });
      expect(resource.isFull(state, 'energy' as any)).toBe(true);
    });
  });

  describe('getStatPercent()', () => {
    it('returns the stat as a percentage of its max', () => {
      const state = createMockState({ stats: { energy: 50, maxEnergy: 100 } });
      expect(resource.getStatPercent(state, 'energy')).toBe(50);
    });

    it('clamps to 0-100 range', () => {
      const state = createMockState({ stats: { energy: 150, maxEnergy: 100 } });
      expect(resource.getStatPercent(state, 'energy')).toBe(100);
    });
  });
});
