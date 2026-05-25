import { GameState, ActionDefinition, StoryHistoryEntry, NPCDefinition } from '../../types/game';
import { LOG_COLOR, makeServiceContainer } from '../../core/constants';

interface CollectionDeps {
  bus: GameState['bus'];
  EVENTS: GameState['EVENTS'];
  content: GameState['content'];
  t: GameState['t'];
}

const ctx = makeServiceContainer<CollectionDeps>('COLLECTION');
const svc = ctx.get;

/**
 * Collection System - TypeScript Edition
 * Handles long-term collection entries and milestones.
 */
export const createCollectionSystem = () => ({
  metadata: {
    id: 'collection',
    delegates: ['getGroupedHistory'],
  },

  setServices: ctx.set,

  /**
   * Records a collection entry.
   */
  recordCollectionEntry(
    store: GameState,
    id: string,
    action: ActionDefinition | null,
    textKey: string | null = null,
    context: string = 'npcs',
  ) {
    const historyEntry: StoryHistoryEntry = {
      id: id,
      npcId: action?.npcId || null,
      timestamp: Date.now(),
      chapter: action?.chapter || 'chapter_collection',
      text: textKey || '',
      context: context,
    };

    if (!store.collectionHistory) store.collectionHistory = [];
    store.collectionHistory.unshift(historyEntry);

    if (store.collectionHistory.length > 50) {
      store.collectionHistory.pop();
    }

    if (action?.isStory) {
      svc().bus.emit(svc().EVENTS.SOUND_TRIGGERED, { key: 'success' });
    }
  },

  /**
   * Groups the history by NPC (Person).
   * Entries without an NPC go into a general "Collection" group.
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
          color: LOG_COLOR.story,
          entries: [],
        };

        if (npcId !== 'world') {
          const npc = svc().content.get<NPCDefinition>(npcId, 'npcs');
          if (npc) {
            groups[npcId].name = svc().t(npc.nameKey);
            groups[npcId].symbol = npc.icon || '👤';
            groups[npcId].color = npc.color || LOG_COLOR.notable;
          }
        } else {
          groups[npcId].name = svc().t('cat_collection_world');
        }
      }
      groups[npcId].entries.push(entry);
    });

    return Object.values(groups).sort((a, b) => {
      if (a.id === 'world') return -1;
      if (b.id === 'world') return 1;
      return a.name.localeCompare(b.name);
    });
  },
});
