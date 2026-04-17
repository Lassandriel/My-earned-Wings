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
      title: action.title || action.id, // Fallback if no title helper used
      isMilestone: action.isMilestone || false,
      timestamp: Date.now(),
      step: store.npcProgress[action.progKey] || 0
    };
    
    store.storyHistory.unshift(historyEntry); // Newest first for quick access
    
    if (action.isMilestone) {
        store.bus.emit(store.EVENTS.SOUND_TRIGGERED, { key: 'success' });
    }
  }
});
