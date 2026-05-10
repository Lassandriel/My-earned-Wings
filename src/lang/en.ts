import ui from './en/ui';
import logs from './en/logs';
import items from './en/items';
import actions from './en/actions';
import npcs from './en/npcs';
import buffs from './en/buffs';
import modifiers from './en/modifiers';
import resources from './en/resources';
import milestones from './en/milestones';
import titles from './en/titles';
import navigation from './en/navigation';
import { TranslationLanguage } from '../types/i18n';

/**
 * English Translations - MODULARIZED
 */
const lang: TranslationLanguage = {
  ui,
  logs,
  items,
  actions,
  npcs,
  buffs,
  modifiers,
  resources,
  milestones,
  titles,
  navigation,
};

export default lang;
