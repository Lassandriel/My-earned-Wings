import { GameState } from '../types/game';

/**
 * View Manager System - Draconia Core 3.5 - TypeScript Edition
 * Handles scene transitions, state resets, and confirmation modals.
 */
export const createViewManagerSystem = () => ({
    
    /** Keys excluded from state reset so player preferences are preserved. */
    RESET_EXCLUDES: new Set(['settings', 'language', 'prologueStep', 'logs', 'hasSave', 'view', 'confirmModal']),

    _doStartNewGame(store: GameState, buildInitialState: () => any) {
        console.log('[CORE] Starting new game, resetting state...');

        const cleanState = buildInitialState();
        localStorage.removeItem('wings_save');

        store.prologueStep = 1;
        (store as any).logs = [];
        store.hasSave = false;

        Object.keys(cleanState).forEach(key => {
            if (!this.RESET_EXCLUDES.has(key)) {
                (store as any)[key] = JSON.parse(JSON.stringify(cleanState[key]));
            }
        });

        store.view = 'prologue';

        if ((store as any).prologue && typeof (store as any).prologue.playIntro === 'function') {
            (store as any).prologue.playIntro(store);
        } else {
            store.addLog('intro_1', 'logs', 'var(--accent-teal)');
        }

        try { store.audio?.startMusic(); } catch { console.warn('Music failed to start'); }
        store.saveGame();
    },

    startNewGame(store: GameState, buildInitialState: () => any) {
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
    showConfirm(store: GameState, message: string, onConfirm: () => void) {
        store.confirmModal = { open: true, message, onConfirm };
    },

    /** Resolves the confirm dialog. Called from the confirm.html template. */
    resolveConfirm(store: GameState, confirmed: boolean) {
        store.playSound('click');
        const cb = store.confirmModal.onConfirm;
        store.confirmModal = { open: false, message: '', onConfirm: null };
        if (confirmed && typeof cb === 'function') cb();
    },

    /** Triggers a styled confirm before performing a hard reset. */
    hardReset(store: GameState) {
        this.showConfirm(store, store.t('confirm_reset', 'ui'), () => {
            store.persistence.doHardReset(store);
        });
    },

    continueGame(store: GameState) {
        store.playSound('click');
        if (store.persistence.loadGame(store)) {
            store.view = 'gameplay'; 
            if (store.audio) store.audio.startMusic();

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

    finishPrologue(store: GameState) {
        store.view = 'naming'; 
        store.saveGame();
    },

    confirmName(store: GameState, name: string) {
        store.playSound('click');
        if (!name || name.trim().length === 0) return;
        store.playerName = name.trim().substring(0, 16); // Safety limit
        store.view = 'gameplay';
        
        // Show Ellie intro modal
        if ((store as any).ellie) (store as any).ellie.showIntro(store);
        
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

    completeDemo(store: GameState) {
        console.log('[FINALE] Demo completed! Preparing summary...');
        
        // 1. Calculate Stats
        const counters = (store as any).counters || {};
        const totalItemsAvailable = Object.keys(store.content.registries.items || {}).length;
        const totalNpcsAvailable = Object.keys(store.content.registries.npcs || {}).length;

        store.finalStats = {
            shards: Math.floor(counters.shards || 0),
            actions: counters.totalActions || 0,
            energySpent: Math.floor(counters.totalEnergySpent || 0),
            npcs: `${store.unlockedNPCs.length} / ${totalNpcsAvailable}`,
            items: `${store.discoveredItems.length} / ${totalItemsAvailable}`
        };

        // 2. Clear auto-loops and ongoing tasks
        (store as any).isLooping = false;
        store.activeFocus = null;
        store.activeTasks = {};

        // 3. Set View
        store.view = 'finale';
        store.demoCompleted = true;
        
        store.playSound('success');
        
        store.saveGame();
    },

    returnToMenu(store: GameState) {
        store.playSound('click');
        store.saveGame();
        store.view = 'menu';
        if (store.ui && store.ui.cleanupHover) store.ui.cleanupHover(store);
        if (store.audio) store.audio.startMusic();
    }
});
