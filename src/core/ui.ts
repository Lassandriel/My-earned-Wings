import { GameState, ResourceId, FlagId, ActionDefinition, ModifierDefinition } from '../types/game';

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

    const action = hAction.data as ActionDefinition;
    const hId = hAction.id as string;

    // Handle NPC steps
    const prog = hId.includes('npc-') ? store.npcProgress[action.progKey || ''] || 0 : null;
    const currentStep = prog !== null && action.steps ? action.steps[prog] : null;
    const sourceData = currentStep || action;

    const results: Array<{ type: string; label: string; value: string; affordable: boolean }> = [];

    // Multi-resource costs
    if (sourceData.costs) {
      Object.entries(sourceData.costs).forEach(([type, amt]) => {
        const resId = type as ResourceId;
        const finalAmt = Math.round(
          store.resource.getScaledCost(store, resId, amt as number)
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
      const type = sourceData.costType as ResourceId;
      const finalAmt = Math.round(
        store.resource.getScaledCost(store, type, sourceData.cost)
      );
      const current = store.resources[type] ?? (store as any).stats[type] ?? 0;
      results.push({
        type: type as string,
        label: store.t('ui_' + type) || type,
        value: `${Math.floor(current)} / ${finalAmt}`,
        affordable: current >= finalAmt,
      });
    }

    return results;
  };

  return {
    cleanupHover,
    getTooltipCosts,

    getGatheringActions(store: GameState) {
      const allActions = store.content.getAll<ActionDefinition>('actions');

      return Object.keys(allActions)
        .filter((id) => allActions[id].category === 'gathering')
        .map((id) => allActions[id]) as any;
    },

    getAvailableLocations(store: GameState) {
      const allActions = store.content.getAll<ActionDefinition>('actions');
      const locations = new Set<string>();

      Object.keys(allActions).forEach((id) => {
        const action = allActions[id];
        if (action.locationId && action.category === 'gathering') {
          // Check if action is visible/available
          const isVisible = !action.requirements || Object.entries(action.requirements).every(([p, r]) => 
            store.actions.checkRequirement(store, p, r)
          );
          if (isVisible) {
            locations.add(action.locationId);
          }
        }
      });

      // Default to forest if nothing found yet (safety)
      if (locations.size === 0) return ['forest'];
      return Array.from(locations);
    },

    getNPCProgressPercent(store: GameState, npcId: string): number {
      const npc = store.content.get(npcId);
      if (!npc) return 0;
      const current = store.npcProgress[npc.progKey || ''] || 0;
      const max = npc.maxProgress || 1;
      return (current / max) * 100;
    },

    calculateScale() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const baseWidth = 1920;
      const baseHeight = 1080;
      const scale = Math.min(width / baseWidth, height / baseHeight);
      document.documentElement.style.setProperty('--ui-scale', scale.toString());
    },

    handleMouseMove(e: MouseEvent) {
      if (!_tt) _tt = document.getElementById('tooltip-container');
      if (!_tt) return;

      const x = e.clientX;
      const y = e.clientY;
      const padding = 20;

      // Position tooltip with bounds checking
      let left = x + padding;
      let top = y + padding;

      const ttWidth = _tt.offsetWidth;
      const ttHeight = _tt.offsetHeight;

      if (left + ttWidth > window.innerWidth) left = x - ttWidth - padding;
      if (top + ttHeight > window.innerHeight) top = y - ttHeight - padding;

      _tt.style.left = `${left}px`;
      _tt.style.top = `${top}px`;
    },

    /**
     * Generates a descriptive string for an action's primary effect.
     */
    getActionEffect(store: GameState, hAction: any): string[] {
      const effects: string[] = [];
      if (!hAction || !hAction.data) return [];
      
      const hId = hAction.id as string;
      const action = hAction.data as ActionDefinition;

      // 1. NPC STEP REWARDS
      if (hId.startsWith('act-npc-')) {
        const progKey = action.progKey || '';
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
            step.onSuccess.forEach((eff) => {
              if (eff.type === 'unlockNPC') {
                const npcName = store.t('npc_' + eff.id.replace('npc-', '') + '_name', 'ui');
                effects.push(`${store.t('ui_bonus')} ${npcName} ${store.t('ui_unlocked')}`);
              } else if (eff.type === 'unlockRecipe') {
                const recipeAction = store.content.get(eff.id, 'actions');
                const recipeName = recipeAction ? store.t(eff.id, 'actions')?.title : eff.id;
                effects.push(`${store.t('ui_bonus')} ${store.t('ui_recipe')}: ${recipeName}`);
              } else if (eff.type === 'modifyResource') {
                const resName = store.t('ui_' + eff.resource) || eff.resource;
                effects.push(`${eff.amount > 0 ? '+' : ''}${eff.amount} ${resName}`);
              } else if (eff.type === 'modifyLimit') {
                const resName = store.t('ui_' + eff.resource) || eff.resource;
                const limitLabel = store.t('ui_limit') || 'Limit';
                effects.push(`${resName} ${limitLabel} +${eff.amount}`);
              }
            });
          }

          if (effects.length > 0) return effects;
        }
      }

      // 2. PRIMARY ACTION YIELD
      const lang = store.t(hId, 'actions') as any;
      if (lang && lang.effect) {
        let yieldVal: any = null;
        if (action.rewards) {
          const firstReward = Object.entries(action.rewards)[0];
          if (firstReward) {
            yieldVal = typeof firstReward[1] === 'string' 
              ? store.pipeline.calculate(store, firstReward[1], 1) 
              : firstReward[1];
          }
        } else if (action.yieldType) {
          yieldVal = store.pipeline.calculate(store, action.yieldType + '_yield', 1);
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
        action.onSuccess.forEach((eff) => {
          if (eff.type === 'modifyLimit') {
            const resName = store.t('ui_' + eff.resource) || eff.resource;
            const limitLabel = store.t('ui_limit') || 'Limit';
            effects.push(`${resName} ${limitLabel} +${eff.amount}`);
          } else if (eff.type === 'unlockNPC' && !hId.startsWith('act-npc-')) {
            const npcName = store.t('npc_' + eff.id.replace('npc-', '') + '_name', 'ui');
            effects.push(`${store.t('ui_bonus')} ${npcName} ${store.t('ui_unlocked')}`);
          } else if (eff.type === 'unlockRecipe') {
            const recipeAction = store.content.get(eff.id, 'actions');
            const recipeName = recipeAction ? (store.t(eff.id, 'actions') as any)?.title : eff.id;
            effects.push(`${store.t('ui_bonus')} ${store.t('ui_recipe')}: ${recipeName}`);
          }
        });
      }

      // 4. DYNAMIC MODIFIERS
      if (action.modifiers) {
        action.modifiers.forEach((mod) => {
          if (!mod.key) return;
          const isLimit = mod.key.endsWith('_limit');
          const cleanKey = isLimit ? mod.key.replace('_limit', '') : mod.key;
          const modDef = store.content.get<ModifierDefinition>(cleanKey, 'modifiers');
          const modLabel = modDef ? store.t(modDef.title, 'modifiers') : cleanKey;
          const limitSuffix = isLimit ? ` ${store.t('ui_limit') || 'Limit'}` : '';
          effects.push(`${store.t('ui_bonus')} ${modLabel}${limitSuffix} +${mod.add || mod.mult || ''}`);
        });
      }
      
      // 5. HOME / BUILDING BONUSES
      if (action.onSuccess) {
        action.onSuccess.forEach((eff) => {
          if (eff.type === 'setHome') {
            const home = store.content.get(eff.id, 'homes');
            if (home) {
              const capLabel = store.t('ui_capacity') || 'Kapazität';
              effects.push(`${capLabel}: ${home.capacity}`);
              if (home.modifiers) {
                home.modifiers.forEach((m: any) => {
                  const mLabel = store.t('ui_' + m.key) || m.key;
                  effects.push(`${store.t('ui_bonus')}: ${mLabel} ${m.mult ? 'x' + m.mult : '+' + m.add}`);
                });
              }
              if (home.baseLimits) {
                Object.entries(home.baseLimits).forEach(([k, v]) => {
                  const rLabel = store.t('ui_' + k) || k;
                  const limitLabel = store.t('ui_limit') || 'Limit';
                  effects.push(`${limitLabel}: ${rLabel} +${v}`);
                });
              }
            }
          }
        });
      }

      return effects;
    },

    /**
     * Renders the localized title for an action, handling alternative titles (e.g. tools).
     */
    renderActionTitle(store: GameState, actionId: string): string {
      const lang = store.t(actionId, 'actions') as any;
      if (!lang) return actionId;

      if (actionId === 'act-wood' && store.flags['item-axe' as FlagId]) return lang.title_alt || lang.title;
      if (actionId === 'act-stone' && store.flags['item-pickaxe' as FlagId]) return lang.title_alt || lang.title;

      return lang.title || actionId;
    },

    /**
     * Filters discovered items by category for the vault view.
     */
    getDiscoveredItemsByCategory(store: GameState, category: string): string[] {
      return store.discoveredItems.filter((id) => {
        const item = store.content.get(id, 'items');
        if (!item) return false;
        if (category === 'all') return true;
        return item.category === category;
      });
    },

    /**
     * Returns the data for the currently selected item in the vault.
     */
    getSelectedItemData(store: GameState): any {
      if (!store.selectedItem) return null;
      return store.content.get(store.selectedItem, 'items');
    },

    /**
     * Returns the data for a specific NPC.
     */
    getNPCData(store: GameState, npcId: string): any {
      return store.content.get(npcId, 'npcs');
    },

    /**
     * Checks if an NPC's progress is maximized.
     */
    isNPCMaxed(store: GameState, npcId: string): boolean {
      const npc = store.content.get(npcId, 'npcs');
      if (!npc) return false;
      const current = store.npcProgress[npc.progKey || ''] || 0;
      return current >= (npc.maxProgress || 1);
    },

    /**
     * Renders the localized title for the tooltip.
     */
    renderTooltipTitle(store: GameState, h: any): string {
      if (!h) return '';
      if (h.isHelp) return h.title || '';
      if (h.isBuff) return store.t(h.title, 'buffs') || h.title;

      let title = '';
      const lang = store.t(h.id, 'actions') as any;

      if (h.id.includes('npc-') && h.data) {
        const npc = store.content.get(h.data.npcId, 'npcs');
        title = npc ? store.t(npc.nameKey) : h.id;
        const progKey = h.data.progKey;
        const currentProg = store.npcProgress[progKey] || 0;
        const displayStep = Math.min(h.data.maxProgress, currentProg + 1);
        title += ' (' + displayStep + '/' + h.data.maxProgress + ')';
      } else {
        title = lang ? (lang.title || h.id) : h.id;
      }
      return title;
    },

    /**
     * Renders the localized story/dialogue/description for the tooltip.
     */
    renderTooltipStory(store: GameState, h: any): string {
      if (!h) return '';
      if (h.isHelp) return h.desc || '';
      if (h.isBuff) return store.t(h.desc, 'buffs') || h.desc;

      if (h.id.includes('npc-') && h.data) {
        const progKey = h.data.progKey;
        const currentProg = store.npcProgress[progKey] || 0;
        if (currentProg < h.data.maxProgress) {
          const dialogKey = `npc_${progKey}_${currentProg + 1}`;
          const dialogText = store.t(dialogKey, 'npcs');
          if (dialogText && dialogText !== dialogKey) return dialogText;
        }
      }

      const lang = store.t(h.id, 'actions') as any;
      return lang ? (lang.desc || '') : '';
    },

    /**
     * Checks if the hovered action has any costs to display.
     */
    hasTooltipCosts(store: GameState, h: any): boolean {
      if (!h || !h.data || h.isHelp) return false;
      const prog = h.id.includes('npc-') ? store.npcProgress[h.data.progKey] || 0 : null;
      const step = (prog !== null && h.data.steps) ? h.data.steps[prog] : null;
      return !!((step && (step.costs || step.cost)) || h.data.costs || h.data.cost);
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
