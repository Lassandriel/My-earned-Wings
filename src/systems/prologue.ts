import { GameState } from '../types/game';

/** Total number of prologue slides. Update here only if new slides are added. */
const PROLOGUE_STEPS = 7;

export const createPrologueSystem = () => ({
  playIntro(state: GameState) {
    state.prologueStep = 1;
    state.view = 'prologue';

    // Log the very first sentence immediately
    state.addLog('intro_1', 'logs', 'var(--accent-teal)');
  },

  advancePrologue(state: GameState) {
    if (state.view !== 'prologue') return;
    state.playSound('click');

    if (state.prologueStep < PROLOGUE_STEPS) {
      state.prologueStep++;
      state.addLog(`intro_${state.prologueStep}`, 'logs', 'var(--accent-teal)');
    } else {
      // Directly call the store proxy — no empty delegation needed
      (state as any).finishPrologue();
    }
  },

  skipPrologue(state: GameState) {
    if (state.view !== 'prologue') return;

    state.playSound('click');

    // Log all intro sentences that haven't been shown yet
    for (let i = 1; i <= PROLOGUE_STEPS; i++) {
      const logKey = `intro_${i}`;
      const alreadyInLogs = (state as any).logs.some((log: any) => log.id === logKey);

      if (!alreadyInLogs) {
        state.addLog(logKey, 'logs', 'var(--accent-teal)');
      }
    }

    (state as any).finishPrologue();
  },
});
