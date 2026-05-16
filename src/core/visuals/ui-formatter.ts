import {
  GameState,
  ResourceId,
  ActionDefinition,
  NPCDefinition,
  ItemDefinition,
  HomeDefinition,
  GameModifier,
} from '../../types/game';

/**
 * Description-line formatters for action / NPC step / home tooltips.
 *
 * Each function returns an array of pre-translated effect strings ready to
 * render. Kept side-effect-free so it can be unit-tested without an Alpine
 * store.
 */

const getResLabel = (store: GameState, res: string) => store.t('ui_' + res) || res;
const formatValue = (val: string | number) => (typeof val === 'number' ? Math.round(val) : val);

export const Formatter = {
  getNpcStepEffects(store: GameState, action: ActionDefinition): string[] {
    const progKey = action.progKey || '';
    const currentProg = store.npcProgress[progKey] || 0;
    const step = action.steps?.[currentProg];
    if (!step) return [];

    const effects: string[] = [];

    if (action.category === 'lore') {
      const max = action.maxProgress || action.steps?.length || 10;
      let bookTitle = (store.t(action.id, 'actions') as { title?: string })?.title || action.id;

      // Strip prefixes for the effect line
      bookTitle = bookTitle
        .replace('Study: ', '')
        .replace('Read: ', '')
        .replace('Studium: ', '')
        .replace('Lesen: ', '');

      if (currentProg + 1 >= max) {
        effects.push(`${store.t('ui_finishes')} ${bookTitle}`);
      } else {
        effects.push(
          `${store.t('ui_unlocked')}${store.t('ui_divider_colon')}${bookTitle} ${
            currentProg + 1
          } / ${max}`,
        );
      }
    }

    if (step.reward) {
      const isItem = step.reward.startsWith('item-');
      const item = isItem ? store.content.get<ItemDefinition>(step.reward, 'items', true) : null;
      if (item) {
        effects.push(`+1 ${store.t(item.title, 'items')}`);
      } else {
        // It's a flag or special reward, translate it
        const label = store.t(step.reward) || store.t('ui_' + step.reward) || step.reward;
        effects.push(`${store.t('ui_unlocked')}${store.t('ui_divider_colon')}${label}`);
      }
    }

    step.onSuccess?.forEach((eff) => {
      if (eff.type === 'unlockNPC') {
        const npc = store.content.get<NPCDefinition>(eff.id, 'npcs');
        const name = npc
          ? store.t(npc.nameKey)
          : store.t('npc_' + eff.id.replace('npc-', '').toLowerCase() + '_name', 'ui');
        effects.push(`${store.t('ui_unlocked')}${store.t('ui_divider_colon')}${name}`);
      } else if (eff.type === 'unlockRecipe') {
        const recAction = store.content.get<ActionDefinition>(eff.id, 'actions');
        const recName = recAction
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
      } else if (eff.type === 'modifyResource') {
        effects.push(
          `${eff.amount > 0 ? '+' : ''}${eff.amount} ${getResLabel(store, eff.resource)}`,
        );
      } else if (eff.type === 'modifyLimit') {
        effects.push(
          store
            .t('ui_limit_increase')
            .replace('{res}', getResLabel(store, eff.resource))
            .replace('{val}', eff.amount.toString()),
        );
      }
    });

    return effects;
  },

  getPrimaryYield(store: GameState, actionId: string, action: ActionDefinition): string {
    const lang = store.t(actionId, 'actions') as Record<string, string>;
    if (!lang?.effect) return '';

    let yieldVal: number | Record<string, number> | string | null = null;
    if (action.rewards) {
      const first = Object.entries(action.rewards)[0];
      if (first) {
        yieldVal =
          typeof first[1] === 'string' ? store.pipeline.calculate(store, first[1], 1) : first[1];
      }
    } else if (action.yieldType) {
      yieldVal = store.pipeline.calculate(store, action.yieldType + '_yield', 1);
    }

    if (yieldVal === null) return lang.effect;

    let result = lang.effect;
    if (typeof yieldVal === 'object' && yieldVal !== null) {
      Object.entries(yieldVal).forEach(([k, v]) => {
        result = result.replace(`{${k}}`, formatValue(v as number).toString());
      });
    } else {
      result = result.replace('{val}', formatValue(yieldVal as number).toString());
    }

    // Ensure space after + or - if at start
    if (result.startsWith('+') && result[1] !== ' ') result = '+ ' + result.substring(1);
    if (result.startsWith('-') && result[1] !== ' ') result = '- ' + result.substring(1);

    // Append Current Stock for Resources
    const resKey = action.yieldType || (action.rewards ? Object.keys(action.rewards)[0] : null);
    if (resKey && store.resources[resKey as ResourceId] !== undefined) {
      const cur = Math.floor(store.resources[resKey as ResourceId]!);
      const lim = store.getLimit(resKey as ResourceId);
      result += ` (${cur}${lim ? '/' + lim : ''})`;
    }

    return result;
  },

  getHomeEffects(store: GameState, homeId: string): string[] {
    const home = store.content.get<HomeDefinition>(homeId, 'homes');
    if (!home) return [];

    const effects = [
      `${store.t('ui_furniture_space')}${store.t('ui_divider_colon')}${home.capacity}`,
    ];

    home.modifiers?.forEach((m: GameModifier) => {
      const lab = store.t('ui_' + m.key) || m.key;
      effects.push(`${lab} ${m.mult ? 'x' + m.mult : '+' + m.add}`);
    });

    if (home.baseLimits) {
      Object.entries(home.baseLimits).forEach(([k, v]) => {
        effects.push(
          `${store.t('ui_limit')}${store.t('ui_divider_colon')}${getResLabel(store, k)} +${v}`,
        );
      });
    }
    return effects;
  },
};
