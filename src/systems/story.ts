import { GameState } from '../types/game';

/**
 * Story System - TypeScript Edition
 * Handles long-term chronicle entries and milestones.
 */
export const createStorySystem = () => ({
  /**
   * Records a chronicle entry.
   */
  recordStoryEntry(store: GameState, id: string, action: any, text: string | null = null) {
    const historyEntry = {
      id: id,
      npcId: action.npcId || null,
      timestamp: Date.now(),
      chapter: action.chapter || 'Chronicles',
      text: text,
    };

    if (!(store as any).storyHistory) (store as any).storyHistory = [];
    (store as any).storyHistory.unshift(historyEntry);

    // Pruning: Keep only top 50 entries to prevent localStorage bloat
    if ((store as any).storyHistory.length > 50) {
      (store as any).storyHistory.pop();
    }

    // Milestones trigger success sound
    if (action.isStory || (action as any).isMilestone) {
      store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
    }
  },

  /**
   * Groups the history by NPC (Person).
   * Entries without an NPC go into a general "Chronicle" group.
   */
  getGroupedHistory(store: GameState) {
    const storyHistory = (store as any).storyHistory;
    if (!storyHistory) return [];

    const groups: Record<string, any> = {};

    storyHistory.forEach((entry: any) => {
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
          const npc = store.content.get(npcId, 'npcs');
          if (npc) {
            groups[npcId].name = store.t(npc.nameKey);
            groups[npcId].symbol = npc.icon || '👤';
            groups[npcId].color = npc.color || 'var(--gold)';
          }
        } else {
          groups[npcId].name = store.t('cat_chronicle_world');
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
