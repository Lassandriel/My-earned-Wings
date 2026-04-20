import { GameState, NPCId } from '../types/game';

/**
 * UI System - TypeScript Edition
 * Handles tooltips, status bars, scaling, and toasts.
 */
export const createUISystem = () => {
    let _tt: HTMLElement | null = null;

    const cleanupHover = (store: GameState) => {
        store.hoveredAction = null;
        document.querySelectorAll('.stat-row.highlight-needed').forEach(r => r.classList.remove('highlight-needed'));
    };

    const getTooltipCosts = (store: GameState, hAction: any) => {
        if (!hAction || !hAction.data) return [];
        
        // Handle NPC steps
        const prog = hAction.id.includes('npc-') ? (store.npcProgress[hAction.data.progKey] || 0) : null;
        const currentStep = (prog !== null && hAction.data.steps) ? hAction.data.steps[prog] : null;
        const sourceData = currentStep || hAction.data;

        const results: Array<{ type: string, label: string, value: string, affordable: boolean }> = [];
        
        // Multi-resource costs
        if (sourceData.costs) {
            Object.entries(sourceData.costs).forEach(([type, amt]) => {
                const finalAmt = Math.round((store as any).resource.getScaledCost(store, type, amt));
                const current = (store.resources[type] ?? (store as any).stats[type]) ?? 0;
                results.push({
                    type,
                    label: store.t('ui_' + type) || type,
                    value: `${Math.floor(current)} / ${finalAmt}`,
                    affordable: current >= finalAmt
                });
            });
        } 
        // Single resource cost (Standardized)
        else if (sourceData.cost && sourceData.costType) {
            const type = sourceData.costType;
            const finalAmt = Math.round((store as any).resource.getScaledCost(store, type, sourceData.cost));
            const current = (store.resources[type] ?? (store as any).stats[type]) ?? 0;
            results.push({
                type,
                label: store.t('ui_' + type) || type,
                value: `${Math.floor(current)} / ${finalAmt}`,
                affordable: current >= finalAmt
            });
        }
        
        return results;
    };

    return {
        calculateScale(store: GameState) {
            const setting = (store as any).settings.uiScale || 'auto';
            
            if (setting === 'auto') {
                const thresholdW = 1260;
                const thresholdH = 800;
                
                const scaleW = window.innerWidth < thresholdW ? window.innerWidth / thresholdW : 1;
                const scaleH = window.innerHeight < thresholdH ? window.innerHeight / thresholdH : 1;
                
                let scale = Math.min(scaleW, scaleH);
                (store as any).currentScale = Math.max(0.65, Math.min(1, scale));
            } else {
                (store as any).currentScale = parseFloat(setting) || 1;
            }

            document.documentElement.style.setProperty('--app-scale', (store as any).currentScale.toString());
        },

        handleMouseMove(e: MouseEvent, store: GameState) {
            const wrapper = document.getElementById('game-wrapper');
            if (!wrapper || !store) return;

            const rect = wrapper.getBoundingClientRect();
            const relX = (e.clientX - rect.left);
            const relY = (e.clientY - rect.top);
            
            store.lastMouseX = relX;
            store.lastMouseY = relY;
            
            // Bounding Box Logic for Tooltip
            if (!_tt) _tt = document.querySelector('.floating-tooltip');
            let offsetX = 20;
            let offsetY = 20;

            if (_tt) {
                const ttRect = _tt.getBoundingClientRect();
                if (e.clientX + ttRect.width + 40 > window.innerWidth) {
                    offsetX = -ttRect.width - 20;
                }
                if (e.clientY + ttRect.height + 40 > window.innerHeight) {
                    offsetY = -ttRect.height - 20;
                }
            }

            document.documentElement.style.setProperty('--mx', relX + 'px');
            document.documentElement.style.setProperty('--my', relY + 'px');
            document.documentElement.style.setProperty('--tt-off-x', offsetX + 'px');
            document.documentElement.style.setProperty('--tt-off-y', offsetY + 'px');

            // Resource Highlighting Logic
            if (store.hoveredAction && store.hoveredAction.data) {
                const costs = getTooltipCosts(store, store.hoveredAction);
                const resourceTypes = Array.isArray(costs) ? costs.map(c => c.type).filter(Boolean) : [];

                document.querySelectorAll('.stat-row').forEach(row => {
                    const fill = row.querySelector('[data-res]') as HTMLElement;
                    const matches = fill && resourceTypes.includes(fill.dataset.res || '');
                    row.classList.toggle('highlight-needed', !!matches);
                });
            } else {
                document.querySelectorAll('.stat-row.highlight-needed').forEach(r => r.classList.remove('highlight-needed'));
            }
        },

        showToast(text: string, type: string = 'info') {
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

        getStatPercent(store: GameState, statId: string) {
            const current = store.stats[statId] || 0;
            const maxKey = 'max' + statId.charAt(0).toUpperCase() + statId.slice(1);
            const max = store.stats[maxKey] || 100;
            return Math.max(0, Math.min(100, (current / max) * 100));
        },

        getTaskProgress(store: GameState, taskId: string) {
            const task = store.activeTasks?.[taskId];
            if (!task || !task.total || task.total === 0) return 0;
            const remaining = task.remaining || 0;
            return (100 - (remaining / task.total * 100));
        },

        getNPCProgressPercent(store: GameState, npcId: NPCId) {
            const npc = store.content.get(npcId);
            if (!npc) return 0;
            const current = store.npcProgress?.[npc.progKey] || 0;
            const max = npc.maxProgress || 5;
            return (current / max) * 100;
        },

        getActionEffect(store: GameState, hAction: any) {
            if (!hAction || !hAction.data) return '';
            const hId = hAction.id;
            const action = hAction.data;

            if (hId.startsWith('act-npc-')) {
                const progKey = action.progKey;
                const currentProg = store.npcProgress[progKey] || 0;
                const steps = action.steps || [];
                
                if (steps[currentProg]) {
                    const step = steps[currentProg];
                    const rewards: string[] = [];

                    if (step.reward) {
                        const item = store.content.get(step.reward, 'items');
                        const itemName = item ? store.t(item.title, 'items') : step.reward;
                        rewards.push(`1 ${itemName}`);
                    }

                    if (step.onSuccess) {
                        step.onSuccess.forEach((eff: any) => {
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
                    return store.t('ui_ready');
                }
            }

            const lang = store.t(hId, 'actions') as any;
            if (!lang || !lang.effect) return '';
            
            let yieldVal: any = null;
            if (action.calculateYield) {
                yieldVal = action.calculateYield(store);
            } else if (action.rewards) {
                const firstReward = Object.entries(action.rewards)[0];
                if (firstReward) {
                    yieldVal = typeof firstReward[1] === 'string' 
                        ? store.pipeline.calculate(store, firstReward[1], 1) 
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
                    return effectText.replace('{val}', displayVal.toString());
                }
            }
            
            return lang.effect;
        },

        getTooltipCosts,
        cleanupHover,

        boot(store: GameState) {
            store.bus.on(store.EVENTS.RESOURCE_GAINED, (data: { type: string }) => {
                const el = document.querySelector(`[data-res="${data.type}"]`);
                if (el) {
                    el.classList.remove('gain-pulse');
                    void (el as HTMLElement).offsetWidth; 
                    el.classList.add('gain-pulse');
                    setTimeout(() => el.classList.remove('gain-pulse'), 600);
                }
            });

            store.bus.on(store.EVENTS.RESOURCE_SPENT, (data: { type: string }) => {
                const el = document.querySelector(`[data-res="${data.type}"]`);
                if (el) {
                    el.classList.remove('drain-flash');
                    void (el as HTMLElement).offsetWidth; 
                    el.classList.add('drain-flash');
                    setTimeout(() => el.classList.remove('drain-flash'), 400);
                }
            });
        }
    };
};
