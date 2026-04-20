/**
 * View Manager System - Draconia Core 3.5
 * Handles scene transitions, state resets, and confirmation modals.
 * Decoupled from visual UI rendering.
 */
export const createViewManagerSystem = () => ({
    
    /** Keys excluded from state reset so player preferences are preserved. */
    RESET_EXCLUDES: new Set(['settings', 'language', 'prologueStep', 'logs', 'hasSave', 'view', 'confirmModal']),

    _doStartNewGame(store, buildInitialState) {
        console.log('[CORE] Starting new game, resetting state...');

        const cleanState = buildInitialState();
        localStorage.removeItem('wings_save');

        store.prologueStep = 1;
        store.logs = [];
        store.hasSave = false;

        Object.keys(cleanState).forEach(key => {
            if (!this.RESET_EXCLUDES.has(key)) {
                store[key] = JSON.parse(JSON.stringify(cleanState[key]));
            }
        });

        store.view = 'prologue';

        if (store.prologue && typeof store.prologue.playIntro === 'function') {
            store.prologue.playIntro(store);
        } else {
            store.addLog('intro_1', 'logs', 'var(--accent-teal)');
        }

        try { store.audio?.startMusic(); } catch { console.warn('Music failed to start'); }
        store.saveGame();
    },

    startNewGame(store, buildInitialState) {
        store.playSound('click');
        if (store.hasSave) {
            this.showConfirm(store, store.t('confirm_reset', 'ui'), () => {
                this._doStartNewGame(store, buildInitialState);
            });
        } else {
            this._doStartNewGame(store, buildInitialState);
        }
    },

    /** Shows a styled in-game confirm dialog. Callback is called only on confirmation. */
    showConfirm(store, message, onConfirm) {
        store.confirmModal = { open: true, message, onConfirm };
    },

    /** Resolves the confirm dialog. Called from the confirm.html template. */
    resolveConfirm(store, confirmed) {
        store.playSound('click');
        const cb = store.confirmModal.onConfirm;
        store.confirmModal = { open: false, message: '', onConfirm: null };
        if (confirmed && typeof cb === 'function') cb();
    },

    /** Triggers a styled confirm before performing a hard reset. */
    hardReset(store) {
        this.showConfirm(store, store.t('confirm_reset', 'ui'), () => {
            store.persistence.doHardReset(store);
        });
    },

    continueGame(store) {
        store.playSound('click');
        if (store.persistence.loadGame(store)) {
            store.view = 'gameplay'; 
            store.audio.startMusic();

            // --- AUTO-RESUME FOCUS: Start the automation loop if a focus was loaded ---
            if (store.activeFocus) {
                setTimeout(() => {
                    if (store.activeFocus && store.executeAction) {
                        store.executeAction(store.activeFocus);
                    }
                }, 500);
            }
        }
    },

    finishPrologue(store) {
        store.view = 'naming'; 
        store.saveGame();
    },

    confirmName(store, name) {
        store.playSound('click');
        if (!name || name.trim().length === 0) return;
        store.playerName = name.trim().substring(0, 16); // Safety limit
        store.view = 'gameplay';
        
        store.addLog('intro_welcome', 'logs', 'var(--accent-teal)');
        store.addLog('npc_dialogue_log', 'logs', 'var(--accent-teal)', {
            name: store.t('npc_ellie_name'),
            text: store.t('ellie_tutorial_1', 'logs')
        });
        store.addLog('npc_dialogue_log', 'logs', 'var(--accent-teal)', {
            name: store.t('npc_ellie_name'),
            text: store.t('ellie_tutorial_2', 'logs')
        });
        store.addLog('npc_dialogue_log', 'logs', 'var(--accent-teal)', {
            name: store.t('npc_ellie_name'),
            text: store.t('ellie_tutorial_3', 'logs')
        });
        store.saveGame();
    },

    completeDemo(store) {
        console.log('[FINALE] Demo completed! Preparing summary...');
        
        // 1. Calculate Stats
        store.finalStats = {
            shards: Math.floor(store.counters.shards || 0),
            actions: store.counters.totalActions || 0,
            energySpent: Math.floor(store.counters.totalEnergySpent || 0),
            npcs: store.unlockedNPCs.length,
            items: store.discoveredItems.length
        };

        // 2. Clear auto-loops and ongoing tasks
        store.isLooping = false;
        store.activeFocus = null;
        store.activeTasks = {};

        // 3. Set View
        store.view = 'finale';
        store.demoCompleted = true;
        
        try {
            store.audio?.playSound('success');
        } catch { // Ignore errors
        }
        
        store.saveGame();
    },

    returnToMenu(store) {
        store.playSound('click');
        store.saveGame();
        store.view = 'menu';
        if (store.ui && store.ui.cleanupHover) store.ui.cleanupHover(store);
        if (store.audio) store.audio.startMusic();
    }
});
