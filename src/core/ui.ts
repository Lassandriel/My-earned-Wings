import { GameState, NPCId, ResourceId } from '../types/game';

/**
 * UI System - TypeScript Edition
 * Handles tooltips, status bars, scaling, and toasts.
 */
export const createUISystem = () => {
  let _tt: HTMLElement | null = null;

  const cleanupHover = (store: GameState) => {
    store.hoveredAction = null;
    document
      .querySelectorAll('.stat-row.highlight-needed')
      .forEach((r) => r.classList.remove('highlight-needed'));
  };

  const getTooltipCosts = (store: GameState, hAction: any) => {
    if (!hAction || !hAction.data) return [];

    // Handle NPC steps
    const prog = hAction.id.includes('npc-') ? store.npcProgress[hAction.data.progKey] || 0 : null;
    const currentStep = prog !== null && hAction.data.steps ? hAction.data.steps[prog] : null;
    const sourceData = currentStep || hAction.data;

    const results: Array<{ type: string; label: string; value: string; affordable: boolean }> = [];

    // Multi-resource costs
    if (sourceData.costs) {
      Object.entries(sourceData.costs).forEach(([type, amt]) => {
        const resId = type as ResourceId;
        const finalAmt = Math.round(
          (store as any).resource.getScaledCost(store, resId, amt as number)
        );
        const current = store.resources[resId] ?? (store as any).stats[type] ?? 0;
        results.push({
          type,
          label: store.t('ui_' + type) || type,
          value: `${Math.floor(current)} / ${finalAmt}`,
          affordable: current >= finalAmt,
        });
      });
    }
    // Single resource cost (Standardized)
    else if (sourceData.cost && sourceData.costType) {
      const type = sourceData.costType;
      const resId = type as ResourceId;
      const finalAmt = Math.round(
        (store as any).resource.getScaledCost(store, resId, sourceData.cost)
      );
      const current = store.resources[resId] ?? (store as any).stats[type] ?? 0;
      results.push({
        type,
        label: store.t('ui_' + type) || type,
        value: `${Math.floor(current)} / ${finalAmt}`,
        affordable: current >= finalAmt,
      });
    }

    return results;
  };

  return {
    getTooltipCosts,
    cleanupHover,

    handleMouseMove(e: MouseEvent, store: GameState) {
      const wrapper = document.getElementById('game-wrapper');
      if (!wrapper || !store) return;

      const rect = wrapper.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

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
      if (store.hoveredAction) {
        const costs = getTooltipCosts(store, store.hoveredAction);
        const resourceTypes = Array.isArray(costs) ? costs.map((c) => c.type).filter(Boolean) : [];

        document.querySelectorAll('.stat-row').forEach((row) => {
          const fill = row.querySelector('[data-res]') as HTMLElement;
          const matches = fill && resourceTypes.includes(fill.dataset.res || '');
          row.classList.toggle('highlight-needed', !!matches);
        });
      } else {
        document
          .querySelectorAll('.stat-row.highlight-needed')
          .forEach((r) => r.classList.remove('highlight-needed'));
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


    getTaskProgress(store: GameState, taskId: string) {
      const task = store.activeTasks?.[taskId];
      if (!task || !task.total || task.total === 0) return 0;
      const remaining = task.remaining || 0;
      return 100 - (remaining / task.total) * 100;
    },

    getNPCProgressPercent(store: GameState, npcId: NPCId) {
      const npc = store.content.get(npcId);
      if (!npc) return 0;
      const current = store.npcProgress?.[npc.progKey] || 0;
      const max = npc.maxProgress || 5;
      return (current / max) * 100;
    },

    getStatPercent(store: GameState, statId: string) {
      if (!store.stats) return 0;
      const current = store.stats[statId] || 0;
      const baseMap: Record<string, number> = { energy: 100, magic: 50, satiation: 100 };
      const max = store.pipeline.calculate(store, statId + '_limit', baseMap[statId] || 100);
      return Math.min(100, Math.max(0, (current / max) * 100));
    },

    getActionEffect(store: GameState, hAction: any): string[] {
      if (!hAction) return [];
      const effects: string[] = [];

      // 0. BUFF TOOLTIP (New)
      if (hAction.isBuff) {
        if (hAction.desc) effects.push(store.t(hAction.desc, 'buffs'));
        if (hAction.remaining) {
          effects.push(
            `${store.t('ui_remaining') || 'Noch'} ${Math.ceil(hAction.remaining)} Sekunden`
          );
        }
        return effects;
      }

      if (!hAction.data) return [];
      const hId = hAction.id;
      const action = hAction.data;

      // 1. NPC STEP REWARDS
      if (hId.startsWith('act-npc-')) {
        const progKey = action.progKey;
        const currentProg = store.npcProgress[progKey] || 0;
        const steps = action.steps || [];

        if (steps[currentProg]) {
          const step = steps[currentProg];

          if (step.reward) {
            const item = store.content.get(step.reward, 'items');
            const itemName = item ? store.t(item.title, 'items') : step.reward;
            effects.push(`1 ${itemName}`);
          }

          if (step.onSuccess) {
            step.onSuccess.forEach((eff: any) => {
              if (eff.type === 'unlockNPC') {
                const npcName = store.t('npc_' + eff.id.replace('npc-', '') + '_name', 'ui');
                effects.push(`${store.t('ui_bonus')} ${npcName} ${store.t('ui_unlocked')}`);
              } else if (eff.type === 'unlockRecipe') {
                const recipeAction = store.content.get(eff.id, 'actions');
                const recipeName = recipeAction ? store.t(eff.id, 'actions')?.title : eff.id;
                effects.push(
                  `${store.t('ui_bonus')} ${store.t('ui_recipe') || 'Rezept'}: ${recipeName}`
                );
              } else if (eff.type === 'modifyResource') {
                const resName = store.t('ui_' + eff.resource) || eff.resource;
                effects.push(`${eff.amount > 0 ? '+' : ''}${eff.amount} ${resName}`);
              } else if (eff.type === 'modifyLimit') {
                const resName = store.t('ui_' + eff.resource) || eff.resource;
                const propertyLabel = store.t('ui_property') || 'Eigenschaft:';
                const limitLabel = store.t('ui_limit') || 'Limit:';
                effects.push(`${propertyLabel} ${resName} ${limitLabel} +${eff.amount}`);
              }
            });
          }

          if (effects.length > 0) return effects;
          return [];
        }
      }

      // 2. PRIMARY ACTION YIELD
      const lang = store.t(hId, 'actions') as any;
      if (lang && lang.effect) {
        let yieldVal: any = null;
        if (action.calculateYield) {
          yieldVal = action.calculateYield(store);
        } else if (action.rewards) {
          const firstReward = Object.entries(action.rewards)[0];
          if (firstReward) {
            yieldVal =
              typeof firstReward[1] === 'string'
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
            effects.push(effectText);
          } else {
            const displayVal = typeof yieldVal === 'number' ? Math.round(yieldVal) : yieldVal;
            effects.push(effectText.replace('{val}', displayVal.toString()));
          }
        } else {
          effects.push(lang.effect);
        }
      }

      // 3. AUTOMATIC SUCCESS BONUSES
      if (action.onSuccess) {
        action.onSuccess.forEach((eff: any) => {
          if (eff.type === 'modifyLimit') {
            const resName = store.t('ui_' + eff.resource) || eff.resource;
            const propertyLabel = store.t('ui_property') || 'Eigenschaft:';
            const limitLabel = store.t('ui_limit') || 'Limit:';
            effects.push(`${propertyLabel} ${resName} ${limitLabel} +${eff.amount}`);
          } else if (eff.type === 'unlockNPC' && !hId.startsWith('act-npc-')) {
            const npcName = store.t('npc_' + eff.id.replace('npc-', '') + '_name', 'ui');
            effects.push(`${store.t('ui_bonus')} ${npcName} ${store.t('ui_unlocked')}`);
          } else if (eff.type === 'unlockRecipe') {
            const recipeAction = store.content.get(eff.id, 'actions');
            const recipeName = recipeAction ? store.t(eff.id, 'actions')?.title : eff.id;
            effects.push(`${store.t('ui_bonus')} ${store.t('ui_recipe')}: ${recipeName}`);
          }
        });
      }

      // 4. STATIC MODIFIERS (Yields, Regens)
      if (action.modifiers) {
        action.modifiers.forEach((mod: any) => {
          const isLimit = mod.key.endsWith('_limit');
          const labelPrefix = isLimit
            ? store.t('ui_property') || 'Eigenschaft:'
            : store.t('ui_bonus') || 'Bonus:';

          const modId = isLimit ? mod.key.replace('_limit', '') : mod.key;
          const modLabel =
            store.t('ui_' + modId) || (store.t(modId, 'actions') as any)?.title || mod.key;

          const limitSuffix = isLimit ? ` ${store.t('ui_limit') || 'Limit'}` : '';

          effects.push(`${labelPrefix} ${modLabel}${limitSuffix} +${mod.add || mod.mult || ''}`);
        });
      }

      // 5. SPACE COST
      if (action.spaceCost) {
        const spaceLabel = store.t('ui_space_cost') || 'Platz';
        effects.push(`${spaceLabel}: ${action.spaceCost}`);
      }

      return effects;
    },

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
    },
  };
};
