import { GameState, Registries, NPCId } from '../types/game';

/**
 * Content Service - TypeScript Edition
 * The central hub for all game data registries. Handles validation and lookup.
 */
export const createContentService = (registries: Registries) => ({
  registries,
  cache: {
    categories: {} as Record<string, any[]>,
    npcActions: {} as Record<string, any[]>,
  },

  /**
   * Finds an entry by ID across all registries or in a specific one.
   * Injects defaults to prevent UI crashes.
   */
  get<T = any>(id: string, type: keyof Registries | null = null): T | null {
    let data: any = null;
    if (type && this.registries[type]) {
      data = (this.registries[type] as any)[id];
    } else {
      const detectedType = this.detectType(id);
      if (detectedType && this.registries[detectedType]) {
        data = (this.registries[detectedType] as any)[id];
      } else {
        for (const reg of Object.values(this.registries)) {
          if ((reg as any)[id]) {
            data = (reg as any)[id];
            break;
          }
        }
      }
    }

    if (!data) return null;

    // --- TYPE-SPECIFIC DEFAULTS (The Guard) ---
    const defaults: Partial<Record<keyof Registries, any>> = {
      npcs: { nameKey: 'ui_unknown', icon: '👤', color: 'var(--text-main)', maxProgress: 5 },
      items: { title: 'Unknown Item', desc: 'No description.', icon: '📦' },
      actions: { title: 'Action', desc: '...', icon: '⚡' },
    };

    const detectedType = type || this.detectType(id);
    if (detectedType && defaults[detectedType]) {
      return { ...defaults[detectedType], ...data } as T;
    }

    return data as T;
  },

  /**
   * Optimized lookup for resource categories.
   */
  getCategorizedResources(category: string) {
    if (this.cache.categories[category]) return this.cache.categories[category];

    const list = Object.values(this.registries.resources).filter((r) => r.category === category);
    this.cache.categories[category] = list;
    return list;
  },

  /**
   * Resolves all available available available actions for a specific NPC.
   */
  getNPCActions(store: GameState, npcId: NPCId) {
    const npc = this.registries.npcs[npcId];
    if (!npc || !npc.tradeActions) return [];

    return npc.tradeActions
      .filter((trade) => {
        if (trade.minProgress !== undefined) {
          const progKey = npc.progKey;
          return (store.npcProgress[progKey] || 0) >= trade.minProgress;
        }
        if ((trade as any).requirements) {
          return Object.entries((trade as any).requirements).every(([path, rule]) => {
            return store.actions.checkRequirement(store, path, rule);
          });
        }
        return true;
      })
      .map((trade) => this.registries.actions[trade.id])
      .filter(Boolean);
  },

  detectType(id: string): keyof Registries | null {
    if (id.startsWith('npc-')) return 'npcs';
    if (id.startsWith('item-')) return 'items';
    if (id.startsWith('act-')) return 'actions';
    if (id.startsWith('build-')) return 'actions';
    if (id.startsWith('buff-')) return 'buffs';
    return null;
  },

  /**
   * Validates all entries in all registries.
   */
  validate(store: any): boolean {
    console.group(
      '%c 🐲 Draconia Content Validation ',
      'background: #2dd4bf; color: #000; font-weight: bold; padding: 2px 4px; border-radius: 4px;'
    );
    let errors = 0;
    let warnings = 0;
    const languages = ['de', 'en'];

    Object.entries(this.registries).forEach(([regName, items]) => {
      Object.entries(items).forEach(([id, data]: [string, any]) => {
        if (id !== data.id) {
          console.error(`[ID MISMATCH] Registry key "${id}" does not match object ID "${data.id}"`);
          errors++;
        }

        languages.forEach((lang) => {
          const checkKeys: Array<{ key: string; context: string }> = [];
          if (data.nameKey) checkKeys.push({ key: data.nameKey, context: 'ui' });
          if (data.title) checkKeys.push({ key: data.title, context: regName });
          if (data.desc) checkKeys.push({ key: data.desc, context: regName });

          checkKeys.forEach(({ key, context }) => {
            const translation = store.translations?.[lang]?.[context]?.[key];
            if (!translation) {
              console.warn(
                `[MISSING L10N] ${lang.toUpperCase()} is missing key "${key}" for ${id} in context "${context}"`
              );
              warnings++;
            }
          });
        });

        if (data.image && !data.image.startsWith('img/')) {
          console.warn(`[INVALID IMAGE] ${id} has suspicious path: ${data.image}`);
          warnings++;
        }
      });
    });

    const statusStyle =
      errors > 0 ? 'color: #ef4444; font-weight: bold;' : 'color: #10b981; font-weight: bold;';
    console.log(`%cValidation complete: ${errors} Errors, ${warnings} Warnings.`, statusStyle);
    console.groupEnd();

    if (errors > 0) {
      console.error('CRITICAL: Content validation failed. Check the logs above.');
    }

    return errors === 0;
  },
});
