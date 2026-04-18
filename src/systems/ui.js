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
    
    // These offsets are no longer needed for centering a fixed box, 
    // but we reset them to 0 to avoid breaking any legacy absolute positioning.
    document.documentElement.style.setProperty('--app-offset-x', '0px');
    document.documentElement.style.setProperty('--app-offset-y', '0px');
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
    if (store.hoveredAction) {
        const costs = store.getTooltipCosts(store.hoveredAction);
        const resourceTypes = costs.map(c => {
            // Map labels back to UI classes/types if possible
            if (c.label.includes('Holz') || c.label.includes('Wood')) return 'wood';
            if (c.label.includes('Stein') || c.label.includes('Stone')) return 'stone';
            if (c.label.includes('Splitter') || c.label.includes('Shards')) return 'shards';
            if (c.label.includes('Fleisch') || c.label.includes('Meat')) return 'meat';
            if (c.label.includes('Energie') || c.label.includes('Energy')) return 'energy';
            if (c.label.includes('Magie') || c.label.includes('Magic')) return 'magic';
            if (c.label.includes('Sättigung') || c.label.includes('Satiation')) return 'satiation';
            return null;
        }).filter(Boolean);

        document.querySelectorAll('.stat-row').forEach(row => {
            const label = row.querySelector('.stat-name');
            if (!label) return;
            const text = label.innerText;
            const matches = resourceTypes.some(type => {
                const trans = store.t('ui_' + type);
                return text.includes(trans);
            });
            if (matches) row.classList.add('highlight-needed');
            else row.classList.remove('highlight-needed');
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
  getEnergyPercent(store) { return (store.stats.energy / (store.stats.maxEnergy || 100)) * 100; },
  getMagicPercent(store) { return (store.stats.magic / (store.stats.maxMagic || 100)) * 100; },
  getSatiationPercent(store) { return Math.max(0, Math.min(100, (store.stats.satiation / (store.stats.maxSatiation || 100)) * 100)); },

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
            let finalAmt = amt;
            if ((type === 'energy' || type === 'magic')) {
                finalAmt = Math.round(finalAmt * store.resource.getSatiationMultiplier(store));
            }
            const current = store.resources[type] ?? store.stats[type] ?? 0;
            results.push({
                label: store.t('ui_' + type) || type,
                value: Math.floor(current) + ' / ' + finalAmt,
                affordable: current >= finalAmt
            });
        });
    } 
    // Single resource cost (legacy/simple)
    else if (sourceData.cost && sourceData.costType) {
        const type = sourceData.costType;
        let finalAmt = sourceData.cost;
        if ((type === 'energy' || type === 'magic')) {
            finalAmt = Math.round(finalAmt * store.resource.getSatiationMultiplier(store));
        }
        const current = store.resources[type] ?? store.stats[type] ?? 0;
        results.push({
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
  startNewGame(store, buildInitialState) {
    if (store.hasSave) {
        if (!confirm(store.t('confirm_reset', 'ui'))) return;
    }
    
    console.log('[CORE] Starting new game, resetting state...');
    
    // Reset state but keep settings/language
    const cleanState = buildInitialState();
    localStorage.removeItem('wings_save');
    
    // Critical state reset
    store.prologueStep = 1;
    store.logs = []; // Clear old logs
    store.hasSave = false;

    Object.keys(cleanState).forEach(key => {
        if (key !== 'settings' && key !== 'language' && key !== 'prologueStep' && key !== 'logs') {
            store[key] = JSON.parse(JSON.stringify(cleanState[key]));
        }
    });
    
    // Explicitly switch view BEFORE playing intro
    store.view = 'prologue';
    
    // Trigger Intro System
    if (store.prologue && typeof store.prologue.playIntro === 'function') {
        store.prologue.playIntro(store);
    } else {
        // Fallback if system not yet ready
        store.addLog('intro_1', 'logs', 'var(--accent-teal)');
    }
    
    try { store.audio?.startMusic(); } catch (e) { console.warn('Music failed to start'); }
    store.saveGame();
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
