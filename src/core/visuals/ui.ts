import Alpine from 'alpinejs';
import { ANIM } from '../constants';
import { makeLogger } from '../log';
import {
  GameState,
  ResourceId,
  FlagId,
  ActionDefinition,
  ModifierDefinition,
  NPCDefinition,
  ItemDefinition,
  HoverActionData,
  BuffDefinition,
} from '../../types/game';
import { TooltipManager } from './ui-tooltip';
import { Formatter } from './ui-formatter';

const log = makeLogger('UI');

/**
 * UI System - Refactored Edition
 * Handles tooltips, status bars, scaling, and toasts.
 *
 * Tooltip positioning + cost/requirement extraction is split out into
 * ui-tooltip.ts. Effect-line formatting (NPC steps, yields, homes) lives in
 * ui-formatter.ts. This file keeps the system lifecycle (boot/destroy) and
 * the action-effect renderer that glues the helpers together.
 */
export const createUISystem = () => {
  const _timers: ReturnType<typeof setTimeout>[] = [];

  const addTimer = (id: ReturnType<typeof setTimeout>) => _timers.push(id);
  const clearAllTimers = () => {
    _timers.forEach((id) => clearTimeout(id));
    _timers.length = 0;
  };

  // --- Internal Helpers ---
  const getResLabel = (store: GameState, res: string) => store.t('ui_' + res) || res;

  return {
    metadata: {
      id: 'ui',
      delegates: {
        getActionEffect: 'getActionEffect',
        getTooltipCosts: 'getTooltipCosts',
      },
    },
    cleanupHover: TooltipManager.cleanup,
    getTooltipCosts: TooltipManager.getCosts,
    getRequirements: TooltipManager.getRequirements,
    handleMouseMove: TooltipManager.handleMove.bind(TooltipManager),
    reposition: TooltipManager.reposition.bind(TooltipManager),

    formatNumber(num: number, store?: GameState): string {
      if (num >= 1000000) return (num / 1000000).toFixed(2) + (store?.t('ui_num_m') || 'M');
      if (num >= 1000) return (num / 1000).toFixed(1) + (store?.t('ui_num_k') || 'k');
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
          const vis =
            !a.requirements ||
            Object.entries(a.requirements).every(([p, r]) =>
              store.actions.checkRequirement(store, p, r),
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
      const t1 = setTimeout(() => {
        toast.classList.remove('show');
        const t2 = setTimeout(() => toast.remove(), ANIM.toast);
        addTimer(t2);
      }, 3500);
      addTimer(t1);
    },

    getActionEffect(store: GameState, hAction: HoverActionData): string[] {
      if (!hAction?.id) return [];

      const effects: string[] = [];
      const hId = hAction.id as string;

      // --- ITEM HANDLING ---
      if (hId.startsWith('item-')) {
        const item = store.content.get<ItemDefinition>(hId, 'items');
        if (!item) return [];

        // 0. Placement Hint
        if (item.category === 'furniture') {
          effects.push(`${store.t('ui_symbol_sparkle')}${store.t('ui_can_be_placed')}`);
        }

        // 1. Modifiers (Passive)
        item.modifiers?.forEach((mod) => {
          if (!mod.key) return;
          const isLimit = mod.key.endsWith('_limit');
          const cleanKey = isLimit ? mod.key.replace('_limit', '') : mod.key;
          const modDef =
            store.content.get<ModifierDefinition>(mod.key, 'modifiers') ||
            store.content.get<ModifierDefinition>(cleanKey, 'modifiers');

          let label = '';
          if (isLimit) {
            label = getResLabel(store, cleanKey);
            effects.push(
              store
                .t('ui_limit_increase')
                .replace('{res}', label)
                .replace('{val}', (mod.add || mod.mult || '').toString()),
            );
          } else {
            label = modDef
              ? store.t(modDef.title, modDef.title.startsWith('ui_') ? 'ui' : 'modifiers')
              : store.t('ui_' + mod.key) || mod.key;
            effects.push(
              `${label}${store.t('ui_divider_colon')}${
                mod.mult ? '×' + mod.mult : '+' + mod.add
              }`,
            );
          }
        });

        // 2. Effects (Object-based, e.g. food)
        if (item.effect && typeof item.effect === 'object') {
          Object.entries(item.effect).forEach(([k, v]) => {
            effects.push(`${store.t('ui_' + k)}${store.t('ui_divider_colon')}+${v}`);
          });
        }

        // 3. Effects (String-based)
        if (item.effect && typeof item.effect === 'string') {
          effects.push(store.t(item.effect));
        }

        return effects;
      }

      const action = hAction.data as ActionDefinition;
      if (!action) return [];

      // --- ACTION HANDLING ---
      // 1. NPC/Lore Rewards
      if (hId.startsWith('act-npc-') || (action.steps && (action.progKey || hId))) {
        const npcEffs = Formatter.getNpcStepEffects(store, action);
        if (npcEffs.length > 0) return npcEffs;
      }

      // 2. Primary Yield
      const primary = Formatter.getPrimaryYield(store, hId, action);
      if (primary) effects.push(primary);

      // 3. Success Bonuses
      action.onSuccess?.forEach((eff) => {
        if (eff.type === 'modifyResource') {
          // Instant resource change (e.g. potions: "+20 Energie").
          // Sign prefix on the number so negative amounts read naturally.
          const sign = eff.amount > 0 ? '+' : '';
          effects.push(`${sign}${eff.amount} ${getResLabel(store, eff.resource)}`);
        } else if (eff.type === 'modifyLimit') {
          effects.push(
            store
              .t('ui_limit_increase')
              .replace('{res}', getResLabel(store, eff.resource))
              .replace('{val}', eff.amount.toString()),
          );
        } else if (eff.type === 'unlockNPC' && !hId.startsWith('act-npc-')) {
          const npc = store.content.get<NPCDefinition>(eff.id, 'npcs');
          const name = npc
            ? store.t(npc.nameKey)
            : store.t('npc_' + eff.id.replace('npc-', '').toLowerCase() + '_name', 'ui');
          effects.push(`${store.t('ui_unlocked')}${store.t('ui_divider_colon')}${name}`);
        } else if (eff.type === 'unlockRecipe') {
          const recName = store.content.get<ActionDefinition>(eff.id, 'actions')
            ? (store.t(eff.id, 'actions') as { title?: string })?.title
            : eff.id;
          effects.push(`${store.t('ui_new_recipe')}${store.t('ui_divider_colon')}${recName}`);
        } else if (eff.type === 'unlockItem') {
          const item = store.content.get<ItemDefinition>(eff.id, 'items');
          const itemName = item ? store.t(item.title, 'items') : eff.id;
          effects.push(`${store.t('ui_item')}${store.t('ui_divider_colon')}${itemName}`);
          if (item?.category === 'furniture') {
            effects.push(`${store.t('ui_symbol_sparkle')}${store.t('ui_can_be_placed')}`);
          }
        } else if (eff.type === 'setHome') {
          effects.push(...Formatter.getHomeEffects(store, eff.id));
        } else if (eff.type === 'addBuff') {
          const buff = store.content.get<BuffDefinition>(eff.buffId, 'buffs');
          const title = buff ? store.t(buff.title, 'buffs') : eff.buffId;
          effects.push(`${store.t('ui_symbol_sparkle')}${title}`);
        }
      });

      // 4. Dynamic Modifiers
      action.modifiers?.forEach((mod) => {
        if (!mod.key) return;
        const isLimit = mod.key.endsWith('_limit');
        const cleanKey = isLimit ? mod.key.replace('_limit', '') : mod.key;

        if (isLimit) {
          const label = getResLabel(store, cleanKey);
          effects.push(
            store
              .t('ui_limit_increase')
              .replace('{res}', label)
              .replace('{val}', (mod.add || mod.mult || '').toString()),
          );
        } else {
          const modDef = store.content.get<ModifierDefinition>(cleanKey, 'modifiers');
          const label = modDef ? store.t(modDef.title, 'modifiers') : getResLabel(store, cleanKey);
          effects.push(`${label} +${mod.add || mod.mult || ''}`);
        }
      });

      return effects;
    },

    renderActionTitle(store: GameState, id: string): string {
      const action = store.content.get<ActionDefinition>(id, 'actions');
      const lang = store.t(id, 'actions') as Record<string, string>;
      if (!lang) return id;
      const useAlt =
        (id === 'act-wood' && store.flags['item-axe' as FlagId]) ||
        (id === 'act-stone' && store.flags['item-pickaxe' as FlagId]);

      let title = (useAlt ? lang.title_alt : lang.title) || lang.title || id;

      // Add Progress (e.g. 1/10) for NPC-style actions/books
      if (action && action.steps) {
        const progKey = action.progKey || id;
        const cur = store.npcProgress[progKey] || 0;
        const max = action.maxProgress || action.steps.length;
        if (cur < max) {
          title += ` (${cur + 1}/${max})`;
        }
      }

      return title;
    },

    renderTooltipTitle(store: GameState, h: HoverActionData): string {
      if (!h) return '';
      if (h.isHelp) return (h.title as string) || '';
      if (h.isBuff) return store.t(h.title as string, 'buffs') || (h.title as string);

      if (h.id.startsWith('item-')) {
        const item = store.content.get<ItemDefinition>(h.id, 'items');
        return item ? store.t(item.title, 'items') : h.id;
      }

      const actionData = h.data as ActionDefinition;
      if (actionData && actionData.steps && h.data) {
        const npc = actionData.npcId
          ? store.content.get<NPCDefinition>(actionData.npcId, 'npcs')
          : null;
        const base = npc
          ? store.t(npc.nameKey)
          : (store.t(h.id, 'actions') as { title?: string })?.title || h.id;
        const progKey = actionData.progKey || h.id;
        const maxProg = actionData.maxProgress || actionData.steps?.length || 0;
        const cur = store.npcProgress[progKey] || 0;
        return `${base} (${Math.min(maxProg, cur + 1)}/${maxProg})`;
      }

      const lang = store.t(h.id, 'actions') as { title?: string };
      return lang?.title || h.id;
    },

    renderTooltipStory(store: GameState, h: HoverActionData): string {
      if (!h) return '';
      if (h.isHelp) return (h.desc as string) || '';
      if (h.isBuff) return store.t(h.desc as string, 'buffs') || (h.desc as string);

      if (h.id.startsWith('item-')) {
        const item = store.content.get<ItemDefinition>(h.id, 'items');
        return item ? store.t(item.desc, 'items') : '';
      }

      const action = h.data as ActionDefinition;
      const baseDesc = (store.t(h.id, 'actions') as Record<string, string>)?.desc || '';

      if (action && action.steps && action.progKey) {
        const progKey = action.progKey || '';
        const cur = store.npcProgress[progKey] || 0;

        let loreSnippet = '';
        const step = action.steps?.[cur];
        if (step?.dialogueKey) {
          const txt = store.t(step.dialogueKey, 'npcs');
          if (txt && txt !== step.dialogueKey) loreSnippet = txt;
        }

        if (loreSnippet) {
          return baseDesc ? `${baseDesc}<br><br>${loreSnippet}` : loreSnippet;
        }
      }

      return baseDesc;
    },

    hasTooltipCosts(store: GameState, h: HoverActionData): boolean {
      if (!h?.data || h.isHelp) return false;
      const hId = h.id as string;
      const isProgressive = hId.includes('npc-') || (h.data.steps && (h.data.progKey || hId));
      const prog = isProgressive ? store.npcProgress[h.data.progKey || hId] || 0 : null;
      const step = prog !== null && h.data.steps ? h.data.steps[prog] : null;
      const hasCosts = !!((step && (step.costs || step.cost)) || h.data.cost || h.data.costs);
      return hasCosts;
    },

    getDiscoveredItemsByCategory(store: GameState, category: string): string[] {
      const uniqueIds = Array.from(new Set(store.discoveredItems));
      if (category === 'all') return uniqueIds;
      return uniqueIds.filter((id) => {
        const item = store.content.get<ItemDefinition>(id, 'items');
        return item && item.category === category;
      });
    },

    getItemData(store: GameState, id: string): ItemDefinition | null {
      return store.content.get<ItemDefinition>(id, 'items') || null;
    },

    getSelectedItemData(store: GameState): ItemDefinition | null {
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
        const t = setTimeout(() => el.classList.remove(cssClass), ANIM.pulse);
        addTimer(t);
      };

      store.bus.on(store.EVENTS.RESOURCE_GAINED, (d: { type: ResourceId }) =>
        triggerPulse(d.type, 'gain-pulse'),
      );
      store.bus.on(store.EVENTS.RESOURCE_SPENT, (d: { type: ResourceId }) =>
        triggerPulse(d.type, 'drain-flash'),
      );

      // View Validation & Reactive Cleanups
      // Read through Alpine.store('game') — the 'ui' alias does NOT re-trigger
      // Alpine.effect when game.view changes (Alpine tracks per-store-name,
      // and aliasing two names to the same proxy doesn't dual-register).
      Alpine.effect(() => {
        const uiStore = Alpine.store('game') as { view?: string };
        if (!uiStore) return;
        const VALID_VIEWS = [
          'menu',
          'prologue',
          'naming',
          'main',
          'crafting',
          'upgrades',
          'village',
          'housing',
          'collection',
          'finale',
          'demo_end',
        ];
        if (uiStore.view && !VALID_VIEWS.includes(uiStore.view)) {
          log.warn(`Invalid view: ${uiStore.view}. Resetting to menu.`);
          uiStore.view = 'menu';
        }
        this.cleanupHover(store);
      });
    },

    destroy() {
      clearAllTimers();
    },
  };
};
