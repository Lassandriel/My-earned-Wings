import { GameState, ActionDefinition, StoryHistoryEntry, NPCDefinition } from '../../types/game';

interface CollectionDeps {
  bus: GameState['bus'];
  EVENTS: GameState['EVENTS'];
  content: GameState['content'];
  t: GameState['t'];
}

let _deps: CollectionDeps | null = null;
const svc = (): CollectionDeps => {
  if (!_deps) throw new Error('[COLLECTION] services not bound — call setServices() during boot.');
  return _deps;
};

/**
 * Collection System - TypeScript Edition
 * Handles long-term chronicle entries and milestones.
 */
export const createCollectionSystem = () => ({
  metadata: {
    id: 'collection',
    delegates: ['getGroupedHistory'],
  },

  setServices(deps: CollectionDeps) {
    _deps = deps;
  },

  /**
   * Records a chronicle entry.
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
      chapter: action?.chapter || 'chapter_chronicles',
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
          const npc = svc().content.get<NPCDefinition>(npcId, 'npcs');
          if (npc) {
            groups[npcId].name = svc().t(npc.nameKey);
            groups[npcId].symbol = npc.icon || '👤';
            groups[npcId].color = npc.color || 'var(--gold)';
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
