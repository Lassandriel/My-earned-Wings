import { GameState, TitleId, TitleDefinition } from '../../types/game';
import { LOG_COLOR, makeServiceContainer } from '../../core/constants';

interface TitleDeps {
  content: GameState['content'];
  actions: GameState['actions'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
  t: GameState['t'];
  saveGame: GameState['saveGame'];
}

const ctx = makeServiceContainer<TitleDeps>('TITLES');
const svc = ctx.get;

/**
 * Title System Logic - Phase 12
 * Handles unlocking and switching titles.
 */
export const createTitleSystem = () => ({
  metadata: {
    id: 'titles',
    delegates: { setActiveTitle: 'setActiveTitle' },
  },

  setServices: ctx.set,

  unlockTitle(store: GameState, id: TitleId) {
    if (store.discoveredTitles.includes(id)) return;

    const title = svc().content.get<TitleDefinition>(id, 'titles');
    if (!title) return;

    store.discoveredTitles.push(id);
    svc().addLog('title_unlocked', 'logs', LOG_COLOR.notable, { title: svc().t(title.nameKey) });
    svc().playSound('milestone');

    if (!store.activeTitle) {
      this.setActiveTitle(store, id);
    }
  },

  setActiveTitle(store: GameState, id: TitleId | null) {
    if (id && !store.discoveredTitles.includes(id)) return;

    store.activeTitle = id;
    svc().playSound('click');
    svc().addLog('title_set', 'logs', LOG_COLOR.success, {
      title: id
        ? svc().t(svc().content.get<TitleDefinition>(id, 'titles')?.nameKey || '')
        : svc().t('ui_none'),
    });

    svc().actions.rebuildProducers(store);
    svc().saveGame();
  },
});
