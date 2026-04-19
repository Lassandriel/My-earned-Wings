/**
 * Story System - Handles long-term chronicle entries and milestones.
 * Core 3.0: Refactored for NPC-based grouping and ContentService integration.
 */
export const createStorySystem = () => ({
  /**
   * Records a chronicle entry.
   */
  recordStoryEntry(store, id, action) {
    const historyEntry = {
      id: id,
      npcId: action.npcId || null,
      timestamp: Date.now(),
      chapter: action.chapter || 'Chronicles'
    };
    
    store.storyHistory.unshift(historyEntry);
    
    // Pruning: Keep only top 50 entries to prevent localStorage bloat
    if (store.storyHistory.length > 50) {
        store.storyHistory.pop();
    }
    
    // Milestones trigger success sound
    if (action.isStory || action.isMilestone) {
        store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
    }
  },

  /**
   * Groups the history by NPC (Person).
   * Entries without an NPC go into a general "Chronicle" group.
   */
  getGroupedHistory(store) {
    if (!store.storyHistory) return [];
    
    const groups = {};
    
    store.storyHistory.forEach(entry => {
        const npcId = entry.npcId || 'world';
        if (!groups[npcId]) {
            groups[npcId] = {
                id: npcId,
                name: '',
                symbol: '📜',
                color: 'var(--accent-ivory)',
                entries: []
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
  }
});
