import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTitleSystem } from './titles.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    discoveredTitles: [],
    activeTitle: null,
    ...overrides,
  } as any;
};

describe('Title System', () => {
  let titles: ReturnType<typeof createTitleSystem>;
  let mockContent: { get: ReturnType<typeof vi.fn> };
  let mockActions: { rebuildProducers: ReturnType<typeof vi.fn> };
  let mockAddLog: ReturnType<typeof vi.fn>;
  let mockPlaySound: ReturnType<typeof vi.fn>;
  let mockSaveGame: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    titles = createTitleSystem();
    mockContent = { get: vi.fn(() => ({ nameKey: 'title_wanderer' })) };
    mockActions = { rebuildProducers: vi.fn() };
    mockAddLog = vi.fn();
    mockPlaySound = vi.fn();
    mockSaveGame = vi.fn();
    (titles as any).setServices({
      content: mockContent,
      actions: mockActions,
      addLog: mockAddLog,
      playSound: mockPlaySound,
      t: (k: string) => k,
      saveGame: mockSaveGame,
    });
  });

  describe('unlockTitle()', () => {
    it('adds the title to discoveredTitles and logs the unlock', () => {
      const state = createMockState();
      titles.unlockTitle(state, 'title-wanderer' as any);

      expect(state.discoveredTitles).toContain('title-wanderer');
      expect(mockAddLog).toHaveBeenCalledWith(
        'title_unlocked',
        'logs',
        expect.stringContaining('gold'),
        expect.objectContaining({ title: 'title_wanderer' }),
      );
      expect(mockPlaySound).toHaveBeenCalledWith('milestone');
    });

    it('does nothing when the title is already discovered', () => {
      const state = createMockState({ discoveredTitles: ['title-wanderer'] as any });
      titles.unlockTitle(state, 'title-wanderer' as any);

      expect(state.discoveredTitles).toHaveLength(1);
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it('auto-activates the first unlocked title', () => {
      const state = createMockState();
      titles.unlockTitle(state, 'title-wanderer' as any);

      expect(state.activeTitle).toBe('title-wanderer');
    });

    it('does not auto-activate when a title is already active', () => {
      const state = createMockState({ activeTitle: 'title-first' as any });
      titles.unlockTitle(state, 'title-second' as any);

      expect(state.activeTitle).toBe('title-first');
    });
  });

  describe('setActiveTitle()', () => {
    it('rejects a title that has not been discovered', () => {
      const state = createMockState({ discoveredTitles: [] });
      titles.setActiveTitle(state, 'title-unknown' as any);

      expect(state.activeTitle).toBeNull();
    });

    it('sets, logs, and triggers rebuildProducers + saveGame', () => {
      const state = createMockState({ discoveredTitles: ['title-x'] as any });
      titles.setActiveTitle(state, 'title-x' as any);

      expect(state.activeTitle).toBe('title-x');
      expect(mockActions.rebuildProducers).toHaveBeenCalledWith(state);
      expect(mockSaveGame).toHaveBeenCalled();
    });

    it('clears active title when called with null', () => {
      const state = createMockState({ activeTitle: 'title-x' as any });
      titles.setActiveTitle(state, null);

      expect(state.activeTitle).toBeNull();
    });
  });
});
