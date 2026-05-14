import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPipelineSystem } from './pipeline';
import { GameState } from '../../types/game';

describe('Pipeline System', () => {
  const pipeline = createPipelineSystem();

  beforeEach(() => {
    pipeline.invalidateCache();
  });

  const createMockStore = (overrides: Partial<GameState> = {}): GameState => {
    return {
      flags: {} as any,
      placedItems: [],
      activeBuffs: {},
      activeHome: null,
      stats: { satiation: 50 } as any,
      resources: { books: 0 } as any,
      content: {
        get: vi.fn((_id: string, _type?: string) => null),
      },
      ...overrides,
    } as unknown as GameState;
  };

  it('returns base when satiation is neutral (50%) and no other modifiers', () => {
    const store = createMockStore();
    const result = pipeline.calculate(store, 'wood_yield', 10);
    // satiation 50 → bonus 0; base 10 + 0 = 10
    expect(result).toBe(10);
  });

  it('stacks additive modifiers from items on top of the base', () => {
    const store = createMockStore({
      flags: { 'item-axe': true } as any,
    });

    vi.mocked(store.content.get).mockImplementation((id: string, type: any) => {
      if (id === 'item-axe' && type === 'items') {
        return { id: 'item-axe', modifiers: [{ key: 'wood_yield', add: 5 }] };
      }
      return null;
    });

    const result = pipeline.calculate(store, 'wood_yield', 10);
    // base 10 + axe 5 + satiation 0 = 15
    expect(result).toBe(15);
  });

  it('adds +5 satiation bonus when well-fed (100%)', () => {
    const store = createMockStore({
      stats: { satiation: 100 },
    });
    const result = pipeline.calculate(store, 'wood_yield', 10);
    // base 10 + satiation bonus +5 = 15
    expect(result).toBe(15);
  });

  it('subtracts up to -5 when starving (0%) and floors at 0', () => {
    const store = createMockStore({ stats: { satiation: 0 } });
    // base 3 + satiation -5 = -2 → clamped to 0
    expect(pipeline.calculate(store, 'wood_yield', 3)).toBe(0);
    // base 10 + satiation -5 = 5
    expect(pipeline.calculate(store, 'wood_yield', 10)).toBe(5);
  });

  it('should apply book knowledge scaling for magic gain', () => {
    const store = createMockStore({
      resources: { books: 5 } as any,
      stats: { satiation: 50 } as any
    });

    const result = pipeline.calculate(store, 'magic_limit_gain', 10);
    // Base 10 + (books 5 × 2) = 20
    expect(result).toBe(20);
  });
});
