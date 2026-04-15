export const createPrologueSystem = () => ({
  playIntro(state) {
    state.prologueStep = 1;
    state.view = 'prologue';
    
    const nextStep = (step) => {
      if (state.view !== 'prologue') return;
      
      state.addLog(`intro_${step}`, 'logs', 'rgba(210, 180, 140, 0.85)');
      
      if (step < 7) {
        setTimeout(() => {
          if (state.view === 'prologue') {
            state.prologueStep = step + 1;
            nextStep(step + 1);
          }
        }, 6000);
      } else {
        setTimeout(() => {
          if (state.view === 'prologue') {
            state.view = 'gameplay';
            state.hasSeenIntro = true;
            state.saveGame();
          }
        }, 6000);
      }
    };
    
    nextStep(1);
  },

  skipPrologue(state) {
    if (state.view !== 'prologue') return;
    
    state.view = 'gameplay';
    state.playSound('click');
    state.hasSeenIntro = true;

    // Log all intro sentences that haven't been logged yet in the HUD
    // Process in order (1 up to 7) because we unshift to logs (latest top)
    for (let i = 1; i <= 7; i++) {
      const logKey = `intro_${i}`;
      const alreadyInLogs = state.logs.some(log => log.id === logKey);
      
      if (!alreadyInLogs) {
        state.addLog(logKey, 'logs', 'rgba(210, 180, 140, 0.85)');
      }
    }
    
    state.saveGame();
  }
});
