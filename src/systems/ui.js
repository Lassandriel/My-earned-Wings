export const createUISystem = () => ({
  calculateScale(store) {
    const setting = store.settings.uiScale;
    
    // In the new system, we default to 1:1 pixel mapping.
    // We can still allow manual UI scaling (Zoom), but we don't force-fit resolutions.
    if (setting === 'auto') {
        store.currentScale = 1;
    } else {
        store.currentScale = parseFloat(setting) || 1;
    }

    document.documentElement.style.setProperty('--app-scale', store.currentScale);
    
    // Legacy app-offsets removed. We rely on fluid CSS Grid since Phase 5.4.
  },

  handleMouseMove(e, store) {
    const wrapper = document.getElementById('game-wrapper');
    if (!wrapper || !store) return;

    const rect = wrapper.getBoundingClientRect();
    const relX = (e.clientX - rect.left);
    const relY = (e.clientY - rect.top);
    
    store.lastMouseX = relX;
    store.lastMouseY = relY;
    
    // Bounding Box Logic for Tooltip
    const tt = document.querySelector('.floating-tooltip');
    let offsetX = 20;
    let offsetY = 20;

    if (tt) {
        const ttRect = tt.getBoundingClientRect();
        // If tooltip would go off right side
        if (e.clientX + ttRect.width + 40 > window.innerWidth) {
            offsetX = -ttRect.width - 20;
        }
        // If tooltip would go off bottom
        if (e.clientY + ttRect.height + 40 > window.innerHeight) {
            offsetY = -ttRect.height - 20;
        }
    }

    document.documentElement.style.setProperty('--mx', relX + 'px');
    document.documentElement.style.setProperty('--my', relY + 'px');
    document.documentElement.style.setProperty('--tt-off-x', offsetX + 'px');
    document.documentElement.style.setProperty('--tt-off-y', offsetY + 'px');

    // Resource Highlighting Logic
    // Uses data-res attributes on .stat-bar-fill elements — language-independent
    if (store.hoveredAction) {
        const costs = store.getTooltipCosts(store.hoveredAction);
        const resourceTypes = costs.map(c => c.type).filter(Boolean);

        document.querySelectorAll('.stat-row').forEach(row => {
            const fill = row.querySelector('[data-res]');
            const matches = fill && resourceTypes.includes(fill.dataset.res);
            row.classList.toggle('highlight-needed', !!matches);
        });
    } else {
        document.querySelectorAll('.stat-row.highlight-needed').forEach(r => r.classList.remove('highlight-needed'));
    }
  },

  showToast(text, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = text;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
  },

  // --- Visual Percentages & Robustness ---
  getStatPercent(store, statId) {
    const current = store.stats[statId] || 0;
    const maxKey = 'max' + statId.charAt(0).toUpperCase() + statId.slice(1);
    const max = store.stats[maxKey] || 100;
    return Math.max(0, Math.min(100, (current / max) * 100));
  },

  getTaskProgress(store, taskId) {
    const task = store.activeTasks?.[taskId];
    if (!task || !task.total || task.total === 0) return 0;
    const remaining = task.remaining || 0;
    return (100 - (remaining / task.total * 100));
  },

  getNPCProgressPercent(store, npcId) {
    const npc = store.content.get(npcId);
    if (!npc) return 0;
    const current = store.npcProgress?.[npc.progKey] || 0;
    const max = npc.maxProgress || 5;
    return (current / max) * 100;
  },

  // --- Tooltip & Action Formatting ---
  getActionEffect(store, hAction) {
    if (!hAction || !hAction.data) return '';
    const hId = hAction.id;
    const action = hAction.data;

    // --- Dynamic NPC Quest Rewards ---
    if (hId.startsWith('act-npc-')) {
        const progKey = action.progKey;
        const currentProg = store.npcProgress[progKey] || 0;
        if (action.steps && action.steps[currentProg]) {
            const step = action.steps[currentProg];
            const rewards = [];

            // 1. Explicit Item Rewards
            if (step.reward) {
                const itemName = store.t(step.reward, 'ui') || step.reward;
                rewards.push(`+ ${itemName}`);
            }

            // 2. Success Effects (Unlocks)
            if (step.onSuccess) {
                step.onSuccess.forEach(eff => {
                    if (eff.type === 'unlockNPC') {
                        const npcName = store.t('npc_' + eff.id.replace('npc-', '') + '_name', 'ui');
                        rewards.push(`Freischaltung: ${npcName}`);
                    } else if (eff.type === 'unlockRecipe') {
                        const recipeName = store.t(eff.id, 'actions')?.title || eff.id;
                        rewards.push(`Rezept: ${recipeName}`);
                    }
                });
            }

            if (rewards.length > 0) return rewards.join(', ');
            
            // Fallback for steps without rewards
            const npcName = store.t('npc_' + action.npcId.replace('npc-', '') + '_name', 'ui');
            return `+ Bindung (${npcName})`;
        }
    }

    const lang = store.t(hId, 'actions');
    if (!lang || !lang.effect) return '';
    
    if (action.calculateYield) {
        const yieldVal = action.calculateYield(store);
        let effectText = lang.effect;
        if (typeof yieldVal === 'object') {
            Object.entries(yieldVal).forEach(([key, val]) => {
                const displayVal = typeof val === 'number' ? Math.round(val) : val;
                effectText = effectText.replace(`{${key}}`, displayVal);
            });
            return effectText;
        } else {
            const displayVal = typeof yieldVal === 'number' ? Math.round(yieldVal) : yieldVal;
            return effectText.replace('{val}', displayVal);
        }
    }
    return lang.effect;
  },

  getTooltipCosts(store, hAction) {
    if (!hAction || !hAction.data) return [];
    
    // Handle NPC steps
    const prog = hAction.id.includes('npc-') ? (store.npcProgress[hAction.data.progKey] || 0) : null;
    const currentStep = (prog !== null && hAction.data.steps) ? hAction.data.steps[prog] : null;
    const sourceData = currentStep || hAction.data;

    const results = [];
    
    // Multi-resource costs
    if (sourceData.costs) {
        Object.entries(sourceData.costs).forEach(([type, amt]) => {
            const finalAmt = Math.round(store.resource.getScaledCost(store, type, amt));
            const current = store.resources[type] ?? store.stats[type] ?? 0;
            results.push({
                type,  // Used for resource highlighting
                label: store.t('ui_' + type) || type,
                value: Math.floor(current) + ' / ' + finalAmt,
                affordable: current >= finalAmt
            });
        });
    } 
    // Single resource cost (Standardized)
    else if (sourceData.cost && sourceData.costType) {
        const type = sourceData.costType;
        const finalAmt = Math.round(store.resource.getScaledCost(store, type, sourceData.cost));
        const current = store.resources[type] ?? store.stats[type] ?? 0;
        results.push({
            type,  // Used for resource highlighting
            label: store.t('ui_' + type) || type,
            value: Math.floor(current) + ' / ' + finalAmt,
            affordable: current >= finalAmt
        });
    }
    
    return results;
  },

  boot(store) {
    // RESOURCE GAIN EFFECTS
    store.bus.on(store.EVENTS.RESOURCE_GAINED, (data) => {
        const el = document.querySelector(`[data-res="${data.type}"]`);
        if (el) {
            el.classList.remove('gain-pulse');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('gain-pulse');
            setTimeout(() => el.classList.remove('gain-pulse'), 600);
        }
    });

    // RESOURCE SPENT EFFECTS
    store.bus.on(store.EVENTS.RESOURCE_SPENT, (data) => {
        const el = document.querySelector(`[data-res="${data.type}"]`);
        if (el) {
            el.classList.remove('drain-flash');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('drain-flash');
            setTimeout(() => el.classList.remove('drain-flash'), 400);
        }
    });
  },

  // --- VIEW TRANSITIONS & FLOW ---

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

    try { store.audio?.startMusic(); } catch (e) { console.warn('Music failed to start'); }
    store.saveGame();
  },

  startNewGame(store, buildInitialState) {
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
    if (store.persistence.loadGame(store)) {
        store.view = 'gameplay'; 
        store.audio.startMusic();
    }
  },

  finishPrologue(store) {
    store.view = 'naming'; 
    store.saveGame();
  },

  confirmName(store, name) {
    if (!name || name.trim().length === 0) return;
    store.playerName = name.trim().substring(0, 16); // Safety limit
    store.view = 'gameplay';
    
    store.addLog('intro_welcome', 'logs', 'var(--accent-teal)');
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
        // Start atmospheric finale music if available
    } catch (e) {}
    
    store.saveGame();
  },

  returnToMenu(store) {
    store.saveGame();
    store.view = 'menu';
    // Optionally restart menu music if needed
    if (store.audio) store.audio.startMusic();
  }
});
