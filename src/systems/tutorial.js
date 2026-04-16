export const createTutorialSystem = () => ({
  steps: {
    0: {
      text: 'tutorial_ellie_1'
    },
    1: {
      text: 'tutorial_ellie_2',
      input: 'name'
    },
    2: {
      text: 'tutorial_ellie_3'
    },
    3: {
      text: 'tutorial_ellie_4'
    },
    4: {
      text: 'tutorial_ellie_5',
      waitFor: 'wood_gain'
    },
    5: {
      text: 'tutorial_ellie_6'
    },
    6: {
      text: 'tutorial_ellie_7'
    },
    7: {
      text: 'tutorial_ellie_8'
    },
    8: {
      text: 'tutorial_ellie_9',
      action: (store) => {
        store.hideDialogue();
        store.tutorialCompleted = true;
        store.currentObjective = 'objective_find_answers';
        store.saveGame();
      }
    }
  },

  next(store) {
    const step = this.steps[store.tutorialStep];
    if (!step) return;

    // Prevent skip if waiting for something specific
    if (step.waitFor && !step.completed) return;

    // If step 8 (final), do the action and close
    if (store.tutorialStep === 8) {
      if (step.action) step.action(store);
      return;
    }

    // Step 1: Just validation, playerName is handled by x-model
    if (store.tutorialStep === 1) {
        if (!store.playerName || store.playerName.trim() === '') return;
    }

    // Progress to next step
    store.tutorialStep++;
    store.playSound('click');
  },

  handleAction(store, actionId) {
    const step = this.steps[store.tutorialStep];
    if (step && step.waitFor === 'wood_gain' && actionId === 'action-wood') {
      store.tutorialStep++;
      store.playSound('success');
    }
  }
});
