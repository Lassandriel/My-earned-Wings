import {
  GameState,
  ResourceId,
  ActionDefinition,
  ItemDefinition,
  HoverActionData,
  TooltipCost,
} from '../../types/game';

/**
 * Tooltip positioning & cost/requirement extraction.
 *
 * Lives in its own module so the main UISystem stays focused on lifecycle +
 * action-effect rendering. Nothing here mutates engine state — pure read-only
 * helpers operating on the current store snapshot.
 */

let _tt: HTMLElement | null = null;

const getResLabel = (store: GameState, res: string) => store.t('ui_' + res) || res;

export const TooltipManager = {
  _lastX: -1,
  _lastY: -1,

  handleMove(e: MouseEvent) {
    this.reposition(e.clientX, e.clientY);
  },

  reposition(x: number, y: number, force = false) {
    if (!_tt) _tt = document.getElementById('tooltip-container');
    if (!_tt) return;

    // Distance threshold to prevent micro-jitters (unless forced)
    if (!force && Math.abs(this._lastX - x) < 2 && Math.abs(this._lastY - y) < 2) return;
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

  getCosts(store: GameState, hAction: HoverActionData): TooltipCost[] {
    if (!hAction?.data) return [];

    const action = hAction.data as ActionDefinition;
    const hId = hAction.id as string;

    // Determine correct data source (NPC step vs standard action)
    const isProgressive = hId.includes('npc-') || (action.steps && (action.progKey || hId));
    const prog = isProgressive ? store.npcProgress[action.progKey || hId] || 0 : null;
    const source = prog !== null && action.steps ? action.steps[prog] : action;

    const results: TooltipCost[] = [];

    const processCost = (type: ResourceId, amt: number) => {
      const finalAmt = Math.round(store.resource.getScaledCost(store, type, amt));
      const current = Math.floor(store.resources[type] ?? store.stats[type] ?? 0);
      const limit =
        store.resources[type] !== undefined
          ? store.getLimit(type)
          : store.getMaxStat(type);
      const status = limit ? ` (${current}/${limit})` : ` (${current})`;

      const label = getResLabel(store, type);
      results.push({
        resource: type,
        label,
        value: finalAmt.toString(),
        affordable: current >= finalAmt,
        amount: finalAmt,
        status,
        display: `${finalAmt} ${label}${status}`,
      });
    };

    if (source.costs) {
      Object.entries(source.costs).forEach(([k, v]) => processCost(k as ResourceId, v as number));
    } else if (source.cost && source.costType) {
      processCost(source.costType as ResourceId, source.cost);
    }

    // Add Space Cost for items
    if (hId.startsWith('item-')) {
      const item = store.content.get<ItemDefinition>(hId, 'items');
      if (item?.spaceCost) {
        results.push({
          resource: 'space',
          amount: item.spaceCost,
          affordable: true,
          label: '',
          value: '',
        });
      }
    }

    return results;
  },

  getRequirements(store: GameState, hAction: HoverActionData) {
    if (!hAction?.data) return [];
    const action = hAction.data as ActionDefinition;
    const hId = hAction.id as string;
    const isProgressive = hId.includes('npc-') || (action.steps && (action.progKey || hId));
    const prog = isProgressive ? store.npcProgress[action.progKey || hId] || 0 : null;
    const source = prog !== null && action.steps ? action.steps[prog] : action;

    if (!source.requirements) return [];

    return Object.entries(source.requirements)
      .filter(([_, rule]) => {
        // Filter out internal "not yet built" requirements (e.g. { op: '!=', val: true })
        if (
          typeof rule === 'object' &&
          rule !== null &&
          (rule as any).op === '!=' &&
          (rule as any).val === true
        ) {
          return false;
        }
        return true;
      })
      .map(([path, rule]) => {
        let label = path;
        let value = rule === true ? '✓' : rule.toString();

        if (path === 'flags.build-house') label = store.t('ui_house');
        else if (path === 'flags.unlocked-library') label = store.t('ui_library');
        else if (path === 'flags.read_book_1_complete')
          label = store.t('item_book_lore_1_title', 'items');
        else if (path === 'flags.read_book_2_complete')
          label = store.t('item_book_lore_2_title', 'items');
        else if (path === 'flags.school_graduate')
          label = store.t('school_graduate') || store.t('ui_graduated');
        else if (path.startsWith('flags.')) {
          const flagKey = path.split('.')[1];
          // Only check registry if it's likely a content ID (has prefix or known as action/item)
          const isContentId = flagKey.includes('-') || flagKey.includes('_');

          // Try better translation fallback
          const uiTrans = store.t('ui_' + flagKey);
          if (uiTrans && uiTrans !== `[ui_${flagKey}]`) {
            label = uiTrans;
          } else {
            const type = store.content.detectType(flagKey) || 'actions';
            const def = isContentId ? store.content.get(flagKey, type as any, true) : null;

            if (def) {
              // If the definition has a title key, check if it's a valid translation key or the text itself
              const transKey = (def as any).title || (def as any).nameKey || flagKey;
              const trans = store.t(transKey, type);

              if (typeof trans === 'object' && trans?.title) {
                label = trans.title;
              } else if (trans && trans !== `[${transKey}]`) {
                label = trans;
              } else {
                // If transKey failed, try the flagKey itself
                const altTrans = store.t(flagKey, type);
                label =
                  typeof altTrans === 'object' && altTrans?.title
                    ? altTrans.title
                    : altTrans || flagKey;
              }
            } else {
              label = flagKey;
            }
          }
        }

        const met = store.actions.checkRequirement(store, path, rule);
        const display = (value === '✓' ? '✓ ' : value + ' ') + label;

        return { label, value, met, display };
      });
  },
};
