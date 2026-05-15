import { GameState, LogStore } from '../../types/game';
import { LOG_COLOR, makeServiceContainer } from '../../core/constants';

interface PrologueDeps {
  collection: GameState['collection'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
  getLogStore: () => LogStore;
}

const ctx = makeServiceContainer<PrologueDeps>('PROLOGUE');
const svc = ctx.get;

/** Total number of prologue slides. Update here only if new slides are added. */
const PROLOGUE_STEPS = 7;

export const createPrologueSystem = () => ({
  metadata: {
    id: 'prologue',
  },

  setServices: ctx.set,

  playIntro(state: GameState) {
    state.prologueStep = 1;
    state.view = 'prologue';

    svc().addLog('intro_1', 'logs', LOG_COLOR.success);
    svc().collection.recordCollectionEntry(state, 'intro_1', null, 'intro_1', 'logs');
  },

  advancePrologue(state: GameState) {
    if (state.view !== 'prologue') return;
    svc().playSound('click');

    if (state.prologueStep < PROLOGUE_STEPS) {
      state.prologueStep++;
      const key = `intro_${state.prologueStep}`;
      svc().addLog(key, 'logs', LOG_COLOR.success);
      svc().collection.recordCollectionEntry(state, key, null, key, 'logs');
    } else {
      state.finishPrologue();
    }
  },

  skipPrologue(state: GameState) {
    if (state.view !== 'prologue') return;

    svc().playSound('click');

    const logList = svc().getLogStore().list;
    for (let i = 1; i <= PROLOGUE_STEPS; i++) {
      const logKey = `intro_${i}`;
      const alreadyInLogs = logList.some((log) => log.id === logKey);

      if (!alreadyInLogs) {
        svc().addLog(logKey, 'logs', LOG_COLOR.success);
      }
      svc().collection.recordCollectionEntry(state, logKey, null, logKey, 'logs');
    }

    state.finishPrologue();
  },
});
