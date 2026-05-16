import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCollectionSystem } from './story.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    collectionHistory: [],
    ...overrides,
  } as any;
};

describe('Collection System (Story)', () => {
  let collection: ReturnType<typeof createCollectionSystem>;
  let mockBus: { emit: ReturnType<typeof vi.fn> };
  let mockContent: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    collection = createCollectionSystem();
    mockBus = { emit: vi.fn() };
    mockContent = { get: vi.fn(() => null) };
    (collection as any).setServices({
      bus: mockBus,
      EVENTS: { SOUND_TRIGGERED: 'sound:triggered' },
      content: mockContent,
      t: (k: string) => k,
    });
  });

  describe('recordCollectionEntry()', () => {
    it('prepends a new entry to collectionHistory', () => {
      const state = createMockState();
      collection.recordCollectionEntry(state, 'entry-1', null, 'text-1', 'logs');

      expect(state.collectionHistory).toHaveLength(1);
      expect(state.collectionHistory[0]).toMatchObject({
        id: 'entry-1',
        npcId: null,
        text: 'text-1',
        context: 'logs',
      });
    });

    it('triggers success sound when action.isStory is true', () => {
      const state = createMockState();
      const action: any = { id: 'story-action', isStory: true };
      collection.recordCollectionEntry(state, 'x', action, 'text');

      expect(mockBus.emit).toHaveBeenCalledWith('sound:triggered', { key: 'success' });
    });

    it('prunes history to the most recent 50 entries', () => {
      const state = createMockState();
      // Fill with 50 existing entries, then add a 51st
      for (let i = 0; i < 50; i++) {
        state.collectionHistory.push({
          id: `old-${i}`,
          timestamp: 0,
          chapter: 'c',
          text: '',
          context: 'npcs',
          npcId: null,
        });
      }
      collection.recordCollectionEntry(state, 'new', null, 'fresh');

      expect(state.collectionHistory).toHaveLength(50);
      expect(state.collectionHistory[0]!.id).toBe('new');
    });
  });

  describe('getGroupedHistory()', () => {
    it('groups entries by NPC and puts world entries first', () => {
      mockContent.get.mockImplementation((id: string) =>
        id === 'npc-aria' ? { nameKey: 'aria_name', icon: '👩' } : null,
      );
      const state = createMockState({
        collectionHistory: [
          { id: 'a', npcId: null, timestamp: 1, chapter: 'c', text: '', context: 'logs' },
          { id: 'b', npcId: 'npc-aria', timestamp: 2, chapter: 'c', text: '', context: 'npcs' },
          { id: 'c', npcId: 'npc-aria', timestamp: 3, chapter: 'c', text: '', context: 'npcs' },
        ] as any,
      });

      const groups = collection.getGroupedHistory(state);

      expect(groups[0]!.id).toBe('world');
      expect(groups[0]!.entries).toHaveLength(1);
      expect(groups[1]!.id).toBe('npc-aria');
      expect(groups[1]!.entries).toHaveLength(2);
    });
  });
});
