import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createItemSystem } from './items.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    stats: { energy: 50, maxEnergy: 100, satiation: 50, maxSatiation: 100 },
    discoveredItems: [],
    selectedItem: null,
    ...overrides,
  } as any;
};

describe('Item System', () => {
  let items: ReturnType<typeof createItemSystem>;
  let mockContent: { get: ReturnType<typeof vi.fn> };
  let mockActions: { effectHandlers: Record<string, any> };
  let mockAddLog: ReturnType<typeof vi.fn>;
  let mockPlaySound: ReturnType<typeof vi.fn>;
  let mockSaveGame: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    items = createItemSystem();
    mockContent = { get: vi.fn(() => null) };
    mockActions = { effectHandlers: {} };
    mockAddLog = vi.fn();
    mockPlaySound = vi.fn();
    mockSaveGame = vi.fn();
    (items as any).setServices({
      content: mockContent,
      actions: mockActions,
      addLog: mockAddLog,
      playSound: mockPlaySound,
      t: (k: string) => k,
      saveGame: mockSaveGame,
    });
  });

  it('does nothing when the item is not consumable', () => {
    mockContent.get.mockReturnValue({ consumable: false });
    const state = createMockState({ discoveredItems: ['item-rock'] as any });

    items.consumeItem(state, 'item-rock' as any);

    expect(state.discoveredItems).toContain('item-rock');
    expect(mockSaveGame).not.toHaveBeenCalled();
  });

  it('does nothing when the item is not in inventory', () => {
    mockContent.get.mockReturnValue({ consumable: true, effect: { energy: 10 } });
    const state = createMockState({ discoveredItems: [] });

    items.consumeItem(state, 'item-bread' as any);

    expect(mockSaveGame).not.toHaveBeenCalled();
  });

  it('refuses consumption when all benefited stats are already capped', () => {
    mockContent.get.mockReturnValue({
      consumable: true,
      effect: { energy: 10 },
    });
    const state = createMockState({
      stats: { energy: 100, maxEnergy: 100 },
      discoveredItems: ['item-bread'] as any,
    });

    items.consumeItem(state, 'item-bread' as any);

    expect(state.discoveredItems).toContain('item-bread');
    expect(mockAddLog).toHaveBeenCalledWith(
      'fail_full_energy',
      'logs',
      expect.any(String),
    );
    expect(mockPlaySound).toHaveBeenCalledWith('fail');
  });

  it('applies stat effects (clamped to max) and removes the item', () => {
    mockContent.get.mockReturnValue({
      consumable: true,
      effect: { energy: 30 },
      title: 'Bread',
    });
    const state = createMockState({
      stats: { energy: 80, maxEnergy: 100 },
      discoveredItems: ['item-bread'] as any,
    });

    items.consumeItem(state, 'item-bread' as any);

    expect(state.stats.energy).toBe(100); // clamped
    expect(state.discoveredItems).not.toContain('item-bread');
    expect(mockSaveGame).toHaveBeenCalled();
  });

  it('runs onSuccess effect handlers when the item has side-effects', () => {
    const sideEffectHandler = vi.fn();
    mockActions.effectHandlers.setFlag = sideEffectHandler;
    mockContent.get.mockReturnValue({
      consumable: true,
      effect: { energy: 5 },
      onSuccess: [{ type: 'setFlag', flag: 'ate_special_meal', value: true }],
      title: 'Gourmet',
    });
    const state = createMockState({
      stats: { energy: 50, maxEnergy: 100 },
      discoveredItems: ['item-gourmet'] as any,
    });

    items.consumeItem(state, 'item-gourmet' as any);

    expect(sideEffectHandler).toHaveBeenCalledWith(
      state,
      expect.objectContaining({ type: 'setFlag', flag: 'ate_special_meal' }),
    );
  });
});
