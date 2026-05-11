import { GameState, LogStore } from '../../types/game';
import Alpine from 'alpinejs';

interface PrologueDeps {
  collection: GameState['collection'];
  addLog: GameState['addLog'];
  playSound: GameState['playSound'];
}

let _deps: PrologueDeps | null = null;
const svc = (): PrologueDeps => {
  if (!_deps) throw new Error('[PROLOGUE] services not bound — call setServices() during boot.');
  return _deps;
};

/** Total number of prologue slides. Update here only if new slides are added. */
const PROLOGUE_STEPS = 7;

export const createPrologueSystem = () => ({
  metadata: {
    id: 'prologue',
  },

  setServices(deps: PrologueDeps) {
    _deps = deps;
  },

  playIntro(state: GameState) {
    state.prologueStep = 1;
    state.view = 'prologue';

    svc().addLog('intro_1', 'logs', 'var(--accent-teal)');
    svc().collection.recordCollectionEntry(state, 'intro_1', null, 'intro_1', 'logs');
  },

  advancePrologue(state: GameState) {
    if (state.view !== 'prologue') return;
    svc().playSound('click');

    if (state.prologueStep < PROLOGUE_STEPS) {
      state.prologueStep++;
      const key = `intro_${state.prologueStep}`;
      svc().addLog(key, 'logs', 'var(--accent-teal)');
      svc().collection.recordCollectionEntry(state, key, null, key, 'logs');
    } else {
      state.finishPrologue();
    }
  },

  skipPrologue(state: GameState) {
    if (state.view !== 'prologue') return;

    svc().playSound('click');

    const logList = (Alpine.store('logs') as LogStore).list;
    for (let i = 1; i <= PROLOGUE_STEPS; i++) {
      const logKey = `intro_${i}`;
      const alreadyInLogs = logList.some((log) => log.id === logKey);

      if (!alreadyInLogs) {
        svc().addLog(logKey, 'logs', 'var(--accent-teal)');
      }
      svc().collection.recordCollectionEntry(state, logKey, null, logKey, 'logs');
    }

    state.finishPrologue();
  },
});
