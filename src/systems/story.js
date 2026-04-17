/**
 * Story System - Handles long-term chronicle entries and milestones.
 */
export const createStorySystem = () => ({
  /**
   * Records a chronicle entry.
   * If action.isMilestone is true, it's flagged for special display.
   */
  recordStoryEntry(store, id, action) {
    const historyEntry = {
      id: id,
      title: action.title || action.id, 
      isMilestone: action.isMilestone || false,
      timestamp: Date.now(),
      step: store.npcProgress[action.progKey] || 0,
      chapter: action.chapter || 'Chronicles'
    };
    
    store.storyHistory.unshift(historyEntry);
    
    if (action.isMilestone) {
        store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
    }
  },

  getGroupedHistory(store) {
    if (!store.storyHistory) return [];
    
    const groups = {};
    store.storyHistory.forEach(entry => {
        const chapter = entry.chapter || 'Chronicles';
        if (!groups[chapter]) groups[chapter] = [];
        groups[chapter].push(entry);
    });

        return Object.entries(groups).map(([title, entries]) => ({
        title: title,
        entries: entries.sort((a,b) => b.timestamp - a.timestamp)
    }));
  },

  /**
   * Checks if the player meets all requirements to enter the finale (Tree of Life).
   */
  canAccessTreeOfLife(store) {
    if (!store.housing.hasHouse) return false;
    
    const requiredNpcs = ['npc-baker', 'npc-teacher', 'npc-sage'];
    const allNpcsDone = requiredNpcs.every(id => {
        const def = store.NPC_REGISTRY[id];
        return (store.npcProgress[def.progKey] || 0) >= def.maxProgress;
    });

    return allNpcsDone && (store.counters.study || 0) >= 3;
  }
});
