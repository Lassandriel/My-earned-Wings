import { describe, it, expect, vi } from 'vitest';
import { createPipelineSystem } from './pipeline';
import { GameState } from '../../types/game';

describe('Pipeline System', () => {
  const pipeline = createPipelineSystem();

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

  it('should calculate base value modified by default satiation (0.85)', () => {
    const store = createMockStore();
    const result = pipeline.calculate(store, 'wood_yield', 10);
    // 10 * 0.85 = 8.5 => rounded to 9
    expect(result).toBe(9);
  });

  it('should apply additive modifiers from items', () => {
    const store = createMockStore({
      flags: { 'item-axe': true } as any,
    });
    
    // Mock item with modifier
    vi.mocked(store.content.get).mockImplementation((id: string, type?: string) => {
      if (id === 'item-axe' && type === 'items') {
        return { id: 'item-axe', modifiers: [{ key: 'wood_yield', add: 5 }] };
      }
      return null;
    });

    const result = pipeline.calculate(store, 'wood_yield', 10);
    // (10 + 5) * 0.85 (at 50 satiation efficiency)
    // Satiation 50 => efficiency = 0.4 + ((50-15)/70)*0.9 = 0.4 + 0.45 = 0.85
    // 15 * 0.85 = 12.75 => round to 13
    expect(result).toBe(13);
  });

  it('should respect satiated efficiency bonus', () => {
    const store = createMockStore({
      stats: { satiation: 100 },
    });
    
    const result = pipeline.calculate(store, 'wood_yield', 10);
    // 10 * 1.3 = 13
    expect(result).toBe(13);
  });

  it('should apply book knowledge scaling for magic gain', () => {
    const store = createMockStore({
      resources: { books: 5 } as any,
      stats: { satiation: 50 } as any
    });

    const result = pipeline.calculate(store, 'magic_limit_gain', 10);
    // Base 10 + (5 * 2) = 20
    // Multiplied by study_efficiency (default 1)
    expect(result).toBe(20);
  });
});
