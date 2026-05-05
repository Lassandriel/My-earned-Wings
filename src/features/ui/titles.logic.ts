import { GameState, TitleId } from '../../types/game';

/**
 * Title System Logic - Phase 12
 * Handles unlocking and switching titles.
 */
export const createTitleSystem = () => ({
  metadata: {
    id: 'titles',
    delegates: { setActiveTitle: 'setActiveTitle' }
  },
  unlockTitle(store: GameState, id: TitleId) {
    if (store.discoveredTitles.includes(id)) return;

    const title = store.content.get(id, 'titles');
    if (!title) return;

    store.discoveredTitles.push(id);
    store.addLog('title_unlocked', 'logs', 'var(--gold)', { title: store.t(title.nameKey) });
    store.playSound('milestone');
    
    // Auto-set if first title
    if (!store.activeTitle) {
      this.setActiveTitle(store, id);
    }
  },

  setActiveTitle(store: GameState, id: TitleId | null) {
    if (id && !store.discoveredTitles.includes(id)) return;
    
    store.activeTitle = id;
    store.playSound('click');
    store.addLog('title_set', 'logs', 'var(--accent-teal)', { 
      title: id ? store.t(store.content.get(id, 'titles').nameKey) : store.t('ui_none') 
    });
    
    // Rebuild producers/pipeline if titles provide modifiers
    store.actions.rebuildProducers(store);
    store.saveGame();
  }
});
