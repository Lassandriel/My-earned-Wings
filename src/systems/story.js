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
  },

  /**
   * Checks if the player meets all requirements to enter the finale (Tree of Life).
   */
  canAccessTreeOfLife(store) {
    // 1. Requirement: House built
    if (!store.flags['build-house']) return false;
    
    // 2. Requirement: Specific NPCs finished their story
    const requiredNpcs = ['npc-baker', 'npc-teacher', 'npc-sage'];
    const allNpcsDone = requiredNpcs.every(id => {
        const npc = store.content.get(id, 'npcs');
        if (!npc) return false;
        return (store.npcProgress[npc.progKey] || 0) >= npc.maxProgress;
    });

    // 3. Requirement: Academic progress
    const studyCount = store.counters.study || 0;

    return allNpcsDone && studyCount >= 3;
  }
});
