/**
 * Internationalization Types - TypeScript Edition
 * Strict types for translation system.
 */

/** Flat translation dictionary (ui, logs, items, buffs, modifiers, npcs) */
export type FlatTranslations = Record<string, string>;

/** Action translations with nested title/desc */
export interface ActionTranslations {
  [key: string]: {
    title: string;
    desc?: string;
  };
}

/** Complete translation language structure */
export interface TranslationLanguage {
  ui: FlatTranslations;
  logs: FlatTranslations;
  items: FlatTranslations;
  buffs: FlatTranslations;
  modifiers: FlatTranslations;
  npcs: FlatTranslations;
  resources: FlatTranslations;
  milestones: ActionTranslations;
  titles: FlatTranslations;
  navigation: FlatTranslations;
  actions: ActionTranslations;
}

/** Available language codes */
export type LanguageCode = 'de' | 'en';

/** Translation dictionary for all languages */
export type Translations = Record<LanguageCode, TranslationLanguage>;

/** Parameters for translation interpolation */
export type TranslationParams = Record<string, string | number | boolean | undefined>;

/** Translation function signature */
export type TranslationFunction = (key: string, context?: string, params?: TranslationParams) => string;
