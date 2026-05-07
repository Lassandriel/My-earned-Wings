import { GameState, ActionDefinition, StoryHistoryEntry, NPCDefinition } from '../../types/game';

/**
 * Collection System - TypeScript Edition
 * Handles long-term chronicle entries and milestones.
 */
export const createCollectionSystem = () => ({
  metadata: {
    id: 'collection',
    delegates: ['getGroupedHistory']
  },
  /**
   * Records a chronicle entry.
   */
  recordCollectionEntry(store: GameState, id: string, action: ActionDefinition | null, textKey: string | null = null, context: string = 'npcs') {
    const historyEntry: StoryHistoryEntry = {
      id: id,
      npcId: action?.npcId || null,
      timestamp: Date.now(),
      chapter: action?.chapter || 'chapter_chronicles',
      text: textKey || '',
      context: context,
    };

    if (!store.collectionHistory) store.collectionHistory = [];
    store.collectionHistory.unshift(historyEntry);

    // Pruning: Keep only top 50 entries to prevent localStorage bloat
    if (store.collectionHistory.length > 50) {
      store.collectionHistory.pop();
    }

    // Milestones trigger success sound
    if (action?.isStory) {
      store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
    }
  },

  /**
   * Groups the history by NPC (Person).
   * Entries without an NPC go into a general "Chronicle" group.
   */
  getGroupedHistory(store: GameState): Array<{ id: string; name: string; symbol: string; color: string; entries: StoryHistoryEntry[] }> {
    const collectionHistory = store.collectionHistory;
    if (!collectionHistory) return [];

    const groups: Record<string, { id: string; name: string; symbol: string; color: string; entries: StoryHistoryEntry[] }> = {};

    collectionHistory.forEach((entry: StoryHistoryEntry) => {
      const npcId = entry.npcId || 'world';
      if (!groups[npcId]) {
        groups[npcId] = {
          id: npcId,
          name: '',
          symbol: '📜',
          color: 'var(--accent-ivory)',
          entries: [],
        };

        if (npcId !== 'world') {
          const npc = store.content.get<NPCDefinition>(npcId, 'npcs');
          if (npc) {
            groups[npcId].name = store.t(npc.nameKey);
            groups[npcId].symbol = npc.icon || '👤';
            groups[npcId].color = npc.color || 'var(--gold)';
          }
        } else {
          groups[npcId].name = store.t('cat_collection_world');
        }
      }
      groups[npcId].entries.push(entry);
    });

    // Sort: World first, then others by name
    return Object.values(groups).sort((a, b) => {
      if (a.id === 'world') return -1;
      if (b.id === 'world') return 1;
      return a.name.localeCompare(b.name);
    });
  },
});
