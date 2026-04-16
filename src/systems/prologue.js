export const createPrologueSystem = () => ({
  playIntro(state) {
    state.prologueStep = 1;
    state.view = 'prologue';
    
    // Log the very first sentence immediately
    state.addLog('intro_1', 'logs', 'rgba(210, 180, 140, 0.85)');
  },

  advancePrologue(state) {
    if (state.view !== 'prologue') return;
    state.playSound('click');

    if (state.prologueStep < 7) {
      state.prologueStep++;
      state.addLog(`intro_${state.prologueStep}`, 'logs', 'rgba(210, 180, 140, 0.85)');
    } else {
      state.prologue.finishPrologue(state);
    }
  },

  finishPrologue(state) {
    state.finishPrologue();
  },

  skipPrologue(state) {
    if (state.view !== 'prologue') return;
    
    state.playSound('click');

    // Log all intro sentences that haven't been logged yet
    for (let i = 1; i <= 7; i++) {
      const logKey = `intro_${i}`;
      const alreadyInLogs = state.logs.some(log => log.id === logKey);
      
      if (!alreadyInLogs) {
        state.addLog(logKey, 'logs', 'rgba(210, 180, 140, 0.85)');
      }
    }
    
    // Call the centralized store method directly
    state.finishPrologue();
  }
});
