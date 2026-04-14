export const createStorySystem = () => ({
  recordStoryEntry(store, id, action) {
    const historyEntry = {
      id: id,
      timestamp: Date.now()
    };
    
    store.storyHistory.push(historyEntry);
  }
});
