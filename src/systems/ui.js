export const createUISystem = () => ({
  calculateScale(store) {
    const setting = store.settings.uiScale || 'auto';
    
    if (setting === 'auto') {
        /**
         * HYBRID AUTO-SCALE (Core 3.5)
         * Keeps 1:1 scale for typical laptops (>= 1260px width).
         * Soft-scaling only kicks in for small windows or tablets.
         */
        const thresholdW = 1260;
        const thresholdH = 800;
        
        const scaleW = window.innerWidth < thresholdW ? window.innerWidth / thresholdW : 1;
        const scaleH = window.innerHeight < thresholdH ? window.innerHeight / thresholdH : 1;
        
        let scale = Math.min(scaleW, scaleH);
        
        // Cap at 0.65 to ensure basic readability even on phones/small tablets
        store.currentScale = Math.max(0.65, Math.min(1, scale));
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
    if (!this._tt) this._tt = document.querySelector('.floating-tooltip');
    let offsetX = 20;
    let offsetY = 20;

    if (this._tt) {
        const ttRect = this._tt.getBoundingClientRect();
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
    if (store.hoveredAction && store.hoveredAction.data) {
        const costs = store.getTooltipCosts(store.hoveredAction);
        const resourceTypes = Array.isArray(costs) ? costs.map(c => c.type).filter(Boolean) : [];

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
        const steps = action.steps || [];
        
        if (steps[currentProg]) {
            const step = steps[currentProg];
            const rewards = [];

            // 1. Explicit Item Rewards
            if (step.reward) {
                const item = store.content.get(step.reward, 'items');
                const itemName = item ? store.t(item.title, 'items') : step.reward;
                rewards.push(`1 ${itemName}`); // e.g. "1 Brot"
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
                    } else if (eff.type === 'modifyResource') {
                        const resName = store.t('ui_' + eff.resource) || eff.resource;
                        rewards.push(`${eff.amount > 0 ? '+' : ''}${eff.amount} ${resName}`);
                    }
                });
            }

            if (rewards.length > 0) return rewards.join(', ');
            
            // Fallback for steps without rewards
            return store.t('ui_ready'); // "Bereit"
        }
    }

    const lang = store.t(hId, 'actions');
    if (!lang || !lang.effect) return '';
    
    let yieldVal = null;
    if (action.calculateYield) {
        yieldVal = action.calculateYield(store);
    } else if (action.rewards) {
        // Fallback for actions defined with static rewards or pipeline keys
        const firstReward = Object.entries(action.rewards)[0];
        if (firstReward) {
            yieldVal = typeof firstReward[1] === 'string' 
                ? store.pipeline.calculate(store, firstReward[1]) 
                : firstReward[1];
        }
    }

    if (yieldVal !== null) {
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
                type,
                label: store.t('ui_' + type) || type,
                value: finalAmt, // Only the number, label handles the name
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
            type,
            label: store.t('ui_' + type) || type,
            value: finalAmt, 
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
  },  returnToMenu(store) {
    store.saveGame();
    store.view = 'menu';
    this.cleanupHover(store);
    if (store.audio) store.audio.startMusic();
  },

  cleanupHover(store) {
    store.hoveredAction = null;
    document.querySelectorAll('.stat-row.highlight-needed').forEach(r => r.classList.remove('highlight-needed'));
  }
});
