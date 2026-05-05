import Alpine from 'alpinejs';
import { GameState, ResourceId, FlagId, ActionDefinition, ModifierDefinition, NPCDefinition } from '../../types/game';

/**
 * UI System - Refactored Edition
 * Handles tooltips, status bars, scaling, and toasts.
 * Optimized for performance and readability.
 */
export const createUISystem = () => {
  let _tt: HTMLElement | null = null;

  // --- Internal Helpers ---
  const getResLabel = (store: GameState, res: string) => store.t('ui_' + res) || res;
  
  const formatValue = (val: any) => (typeof val === 'number' ? Math.round(val) : val);

  /**
   * Tooltip Positioning & Logic
   */
  const TooltipManager = {
    handleMove(e: MouseEvent) {
      this.reposition(e.clientX, e.clientY);
    },

    _lastX: 0,
    _lastY: 0,
    
    reposition(x: number, y: number) {
      if (!_tt) _tt = document.getElementById('tooltip-container');
      if (!_tt) return;

      // Distance threshold to prevent micro-jitters
      if (Math.abs(this._lastX - x) < 2 && Math.abs(this._lastY - y) < 2) return;
      this._lastX = x;
      this._lastY = y;

      const padding = 20;
      let left = x + padding;
      let top = y + padding;

      // Use clientWidth (no border/scrollbar) for faster lookup
      const ttWidth = _tt.clientWidth || 360;
      const ttHeight = _tt.clientHeight || 150;

      if (left + ttWidth > window.innerWidth) left = x - ttWidth - padding;
      if (top + ttHeight > window.innerHeight) top = y - ttHeight - padding;

      left = Math.max(10, left);
      top = Math.max(10, top);

      _tt.style.left = `${left}px`;
      _tt.style.top = `${top}px`;
      _tt.style.transform = 'none'; 
    },

    cleanup(store: GameState) {
      store.hoveredAction = null;
      document
        .querySelectorAll('.stat-row.highlight-needed')
        .forEach((r) => r.classList.remove('highlight-needed'));
    },

    getCosts(store: GameState, hAction: any) {
      if (!hAction?.data) return [];
      
      const action = hAction.data as ActionDefinition;
      const hId = hAction.id as string;

      // Determine correct data source (NPC step vs standard action)
      const prog = hId.includes('npc-') ? store.npcProgress[action.progKey || ''] || 0 : null;
      const source = (prog !== null && action.steps) ? action.steps[prog] : action;

      const results: Array<{ type: string; label: string; value: string; affordable: boolean }> = [];

      const processCost = (type: ResourceId, amt: number) => {
        const finalAmt = Math.round(store.resource.getScaledCost(store, type, amt));
        const current = store.resources[type] ?? (store as any).stats[type] ?? 0;
        results.push({
          type,
          label: getResLabel(store, type),
          value: `${Math.floor(current)} / ${finalAmt}`,
          affordable: current >= finalAmt,
        });
      };

      if (source.costs) {
        Object.entries(source.costs).forEach(([k, v]) => processCost(k as ResourceId, v as number));
      } else if (source.cost && source.costType) {
        processCost(source.costType as ResourceId, source.cost);
      }

      return results;
    }
  };

  /**
   * Formatting & Description Logic
   */
  const Formatter = {
    getNpcStepEffects(store: GameState, action: ActionDefinition): string[] {
      const progKey = action.progKey || '';
      const currentProg = store.npcProgress[progKey] || 0;
      const step = action.steps?.[currentProg];
      if (!step) return [];

      const effects: string[] = [];

      if (step.reward) {
        const item = store.content.get(step.reward, 'items');
        effects.push(`1 ${item ? store.t(item.title, 'items') : step.reward}`);
      }

      step.onSuccess?.forEach((eff) => {
        const bonusLabel = store.t('ui_bonus') || 'Bonus';
        const bonusSep = bonusLabel.endsWith(':') ? ' ' : ': ';
        if (eff.type === 'unlockNPC') {
          const npc = store.content.get(eff.id, 'npcs');
          const name = npc ? store.t(npc.nameKey) : store.t('npc_' + eff.id.replace('npc-', '').toLowerCase() + '_name', 'ui');
          effects.push(`${bonusLabel}${bonusSep}${name} ${store.t('ui_unlocked')}`);
        } else if (eff.type === 'unlockRecipe') {
          const recAction = store.content.get(eff.id, 'actions');
          const recName = recAction ? (store.t(eff.id, 'actions') as any)?.title : eff.id;
          effects.push(`${bonusLabel}${bonusSep}${store.t('ui_recipe')}: ${recName}`);
        } else if (eff.type === 'modifyResource') {
          effects.push(`${eff.amount > 0 ? '+' : ''}${eff.amount} ${getResLabel(store, eff.resource)}`);
        } else if (eff.type === 'modifyLimit') {
          effects.push(`${getResLabel(store, eff.resource)} ${store.t('ui_limit') || 'Limit'} +${eff.amount}`);
        }
      });

      return effects;
    },

    getPrimaryYield(store: GameState, actionId: string, action: ActionDefinition): string {
      const lang = store.t(actionId, 'actions') as any;
      if (!lang?.effect) return '';

      let yieldVal: any = null;
      if (action.rewards) {
        const first = Object.entries(action.rewards)[0];
        if (first) {
          yieldVal = typeof first[1] === 'string' 
            ? store.pipeline.calculate(store, first[1], 1) 
            : first[1];
        }
      } else if (action.yieldType) {
        yieldVal = store.pipeline.calculate(store, action.yieldType + '_yield', 1);
      }

      if (yieldVal === null) return lang.effect;

      let text = lang.effect;
      if (typeof yieldVal === 'object') {
        Object.entries(yieldVal).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, formatValue(v).toString());
        });
        return text;
      }
      
      return text.replace('{val}', formatValue(yieldVal).toString());
    },

    getHomeEffects(store: GameState, homeId: string): string[] {
      const home = store.content.get(homeId, 'homes');
      if (!home) return [];

      const effects = [`${store.t('ui_capacity') || 'Kapazität'}: ${home.capacity}`];
      
      home.modifiers?.forEach((m: any) => {
        const lab = store.t('ui_' + m.key) || m.key;
        effects.push(`${store.t('ui_bonus')}: ${lab} ${m.mult ? 'x' + m.mult : '+' + m.add}`);
      });

      if (home.baseLimits) {
        Object.entries(home.baseLimits).forEach(([k, v]) => {
          effects.push(`${store.t('ui_limit') || 'Limit'}: ${getResLabel(store, k)} +${v}`);
        });
      }
      return effects;
    }
  };

  return {
    metadata: {
      id: 'ui',
      delegates: {
        getActionEffect: 'getActionEffect',
        getTooltipCosts: 'getTooltipCosts'
      }
    },
    cleanupHover: TooltipManager.cleanup,
    getTooltipCosts: TooltipManager.getCosts,
    handleMouseMove: TooltipManager.handleMove,
    reposition: TooltipManager.reposition.bind(TooltipManager),

    formatNumber(num: number): string {
      if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
      return Math.floor(num).toString();
    },

    getStatPercent(store: GameState, stat: string): number {
      return store.resource.getStatPercent(store, stat);
    },

    getGatheringActions(store: GameState) {
      const all = store.content.getAll<ActionDefinition>('actions');
      return Object.values(all).filter((a) => a.category === 'gathering');
    },

    getAvailableLocations(store: GameState) {
      const all = store.content.getAll<ActionDefinition>('actions');
      const locations = new Set<string>();

      Object.values(all).forEach((a) => {
        if (a.locationId && a.category === 'gathering') {
          const vis = !a.requirements || Object.entries(a.requirements).every(([p, r]) => 
            store.actions.checkRequirement(store, p, r)
          );
          if (vis) locations.add(a.locationId);
        }
      });

      return locations.size > 0 ? Array.from(locations) : ['forest'];
    },

    getNPCProgressPercent(store: GameState, npcId: string) {
      const npc = store.content.get<NPCDefinition>(npcId, 'npcs');
      if (!npc) return 0;
      return ((store.npcProgress[npc.progKey || ''] || 0) / (npc.maxProgress || 1)) * 100;
    },

    getNPCData(store: GameState, npcId: string): NPCDefinition | null {
      return store.content.get<NPCDefinition>(npcId, 'npcs');
    },

    isNPCMaxed(store: GameState, npcId: string): boolean {
      const npc = store.content.get<NPCDefinition>(npcId, 'npcs');
      if (!npc) return false;
      return (store.npcProgress[npc.progKey || ''] || 0) >= npc.maxProgress;
    },

    getTaskProgress(store: GameState, taskId: string) {
      const t = store.activeTasks[taskId];
      return t?.duration ? ((t.duration - t.remaining) / t.duration) * 100 : 0;
    },

    calculateScale() {
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      document.documentElement.style.setProperty('--ui-scale', scale.toString());
    },

    showToast(message: string, type: 'info' | 'error' | 'success' = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerText = message;
      container.appendChild(toast);

      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
      }, 3500);
    },

    getActionEffect(store: GameState, hAction: any): string[] {
      if (!hAction?.id) return [];
      
      const effects: string[] = [];
      const hId = hAction.id as string;

      // --- ITEM HANDLING ---
      if (hId.startsWith('item-')) {
        const item = store.content.get(hId, 'items');
        if (!item) return [];

        // 1. Modifiers (Passive)
        item.modifiers?.forEach((mod: any) => {
          const isLimit = mod.key.endsWith('_limit');
          const cleanKey = isLimit ? mod.key.replace('_limit', '') : mod.key;
          const modDef = store.content.get<ModifierDefinition>(mod.key, 'modifiers') || store.content.get<ModifierDefinition>(cleanKey, 'modifiers');
          
          let label = modDef ? store.t(modDef.title, modDef.title.startsWith('ui_') ? 'ui' : 'modifiers') : (store.t('ui_' + mod.key) || mod.key);
          const limitTxt = (isLimit && !label.toLowerCase().includes('limit')) ? ` ${store.t('ui_limit') || 'Limit'}` : '';
          
          effects.push(`${store.t('ui_bonus')} ${label}${limitTxt}: ${mod.mult ? '×' + mod.mult : '+' + mod.add}`);
        });

        // 2. Effects (Object-based, e.g. food)
        if (item.effect && typeof item.effect === 'object') {
          Object.entries(item.effect).forEach(([k, v]) => {
            effects.push(`${store.t('ui_' + k)}: +${v}`);
          });
        }

        // 3. Effects (String-based)
        if (item.effect && typeof item.effect === 'string') {
          effects.push(store.t(item.effect));
        }

        // 4. Space Cost
        if (item.spaceCost) {
          effects.push(`${store.t('ui_furniture_space')}: ${item.spaceCost}`);
        }

        return effects;
      }

      const action = hAction.data as ActionDefinition;
      if (!action) return [];

      // --- ACTION HANDLING ---
      // 1. NPC Rewards
      if (hId.startsWith('act-npc-')) {
        const npcEffs = Formatter.getNpcStepEffects(store, action);
        if (npcEffs.length > 0) return npcEffs;
      }

      // 2. Primary Yield
      const primary = Formatter.getPrimaryYield(store, hId, action);
      if (primary) effects.push(primary);

      // 3. Success Bonuses
      action.onSuccess?.forEach((eff) => {
        const bonusLabel = store.t('ui_bonus') || 'Bonus';
        const bonusSep = bonusLabel.endsWith(':') ? ' ' : ': ';
        if (eff.type === 'modifyLimit') {
          effects.push(`${bonusLabel}${bonusSep}${getResLabel(store, eff.resource)} ${store.t('ui_limit') || 'Limit'} +${eff.amount}`);
        } else if (eff.type === 'unlockNPC' && !hId.startsWith('act-npc-')) {
          const npc = store.content.get(eff.id, 'npcs');
          const name = npc ? store.t(npc.nameKey) : store.t('npc_' + eff.id.replace('npc-', '').toLowerCase() + '_name', 'ui');
          effects.push(`${bonusLabel}${bonusSep}${name} ${store.t('ui_unlocked')}`);
        } else if (eff.type === 'unlockRecipe') {
          const recName = store.content.get(eff.id, 'actions') ? (store.t(eff.id, 'actions') as any)?.title : eff.id;
          effects.push(`${bonusLabel}${bonusSep}${store.t('ui_recipe')}: ${recName}`);
        } else if (eff.type === 'setHome') {
          effects.push(...Formatter.getHomeEffects(store, eff.id));
        }
      });

      // 4. Dynamic Modifiers
      action.modifiers?.forEach((mod) => {
        if (!mod.key) return;
        const isLimit = mod.key.endsWith('_limit');
        const cleanKey = isLimit ? mod.key.replace('_limit', '') : mod.key;
        const modDef = store.content.get<ModifierDefinition>(cleanKey, 'modifiers');
        const label = modDef ? store.t(modDef.title, 'modifiers') : cleanKey;
        const limitTxt = isLimit ? ` ${store.t('ui_limit') || 'Limit'}` : '';
        effects.push(`${store.t('ui_bonus')} ${label}${limitTxt} +${mod.add || mod.mult || ''}`);
      });

      return effects;
    },

    renderActionTitle(store: GameState, id: string): string {
      const lang = store.t(id, 'actions') as any;
      if (!lang) return id;
      const useAlt = (id === 'act-wood' && store.flags['item-axe' as FlagId]) || 
                     (id === 'act-stone' && store.flags['item-pickaxe' as FlagId]);
      return (useAlt ? lang.title_alt : lang.title) || lang.title || id;
    },

    renderTooltipTitle(store: GameState, h: any): string {
      if (!h) return '';
      if (h.isHelp) return h.title || '';
      if (h.isBuff) return store.t(h.title, 'buffs') || h.title;

      if (h.id.startsWith('item-')) {
        const item = store.content.get(h.id, 'items');
        return item ? store.t(item.title, 'items') : h.id;
      }

      if (h.id.includes('npc-') && h.data) {
        const npc = h.data.npcId ? store.content.get(h.data.npcId, 'npcs') : h.data;
        const base = npc ? store.t(npc.nameKey) : h.id;
        const progKey = h.data.progKey;
        const maxProg = h.data.maxProgress;
        const cur = store.npcProgress[progKey] || 0;
        return `${base} (${Math.min(maxProg, cur + 1)}/${maxProg})`;
      }
      
      const lang = store.t(h.id, 'actions') as any;
      return lang?.title || h.id;
    },

    renderTooltipStory(store: GameState, h: any): string {
      if (!h) return '';
      if (h.isHelp) return h.desc || '';
      if (h.isBuff) return store.t(h.desc, 'buffs') || h.desc;

      if (h.id.startsWith('item-')) {
        const item = store.content.get(h.id, 'items');
        return item ? store.t(item.desc, 'items') : '';
      }

      if (h.id.includes('npc-') && h.data) {
        const progKey = h.data.progKey;
        const maxProg = h.data.maxProgress;
        const cur = store.npcProgress[progKey] || 0;
        if (cur < maxProg) {
          const key = `npc_${progKey}_${cur + 1}`;
          const txt = store.t(key, 'npcs');
          if (txt && txt !== key) return txt;
        }
      }

      return (store.t(h.id, 'actions') as any)?.desc || '';
    },

    hasTooltipCosts(store: GameState, h: any): boolean {
      if (!h?.data || h.isHelp) return false;
      const prog = h.id.includes('npc-') ? store.npcProgress[h.data.progKey] || 0 : null;
      const step = (prog !== null && h.data.steps) ? h.data.steps[prog] : null;
      return !!((step && (step.costs || step.cost)) || h.data.cost || h.data.costs);
    },

    getDiscoveredItemsByCategory(store: GameState, category: string): string[] {
      const uniqueIds = Array.from(new Set(store.discoveredItems));
      if (category === 'all') return uniqueIds;
      return uniqueIds.filter(id => {
        const item = store.content.get(id, 'items');
        return item && item.category === category;
      });
    },

    getItemData(store: GameState, id: string): any {
      return store.content.get(id, 'items') || null;
    },

    getSelectedItemData(store: GameState): any {
      if (!store.selectedItem) return null;
      return this.getItemData(store, store.selectedItem);
    },

    initMagneticHover() {
      // Magnetic hover deactivated as per user request to prevent clipping.
      // Replaced by clean CSS translateY + scale.
      return;
    },

    boot(store: GameState) {
      this.initMagneticHover();
      
      const triggerPulse = (type: string, cssClass: string) => {
        const el = document.querySelector(`[data-res="${type}"]`);
        if (!el) return;
        el.classList.remove(cssClass);
        void (el as HTMLElement).offsetWidth;
        el.classList.add(cssClass);
        setTimeout(() => el.classList.remove(cssClass), 600);
      };

      store.bus.on(store.EVENTS.RESOURCE_GAINED, (d: any) => triggerPulse(d.type, 'gain-pulse'));
      store.bus.on(store.EVENTS.RESOURCE_SPENT, (d: any) => triggerPulse(d.type, 'drain-flash'));

      // View Validation & Reactive Cleanups
      (Alpine as any).effect(() => {
        const ui = (Alpine as any).store('ui') as any;
        const VALID_VIEWS = ['menu','prologue','naming','gameplay','crafting','upgrades','village','housing','story','finale','demo_end'];
        if (!VALID_VIEWS.includes(ui.view)) {
          console.warn(`[UI] Invalid view: ${ui.view}. Resetting to menu.`);
          ui.view = 'menu';
        }
        this.cleanupHover(store);
      });
    },
  };
};
