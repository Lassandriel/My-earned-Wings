import { GameState, Registries, NPCId } from '../../types/game';
import { LOG_COLOR } from '../constants';

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

  getAll<T = any>(type: keyof Registries): Record<string, T> {
    return (this.registries[type] as any) || {};
  },

  get<T = any>(id: string, type: keyof Registries | null = null, silent = false): T {
    let data: any = null;
    const detectedType = type || this.detectType(id);

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

    // --- CRASH PREVENTION (Null-Object Pattern) ---
    if (!data) {
      if (silent) return null as unknown as T;
      console.warn(`[CONTENT] Missing ID: "${id}" in registry. Returning fallback.`);
      return {
        id,
        title: id,
        nameKey: 'ui_unknown',
        desc: 'ui_missing_entry',
        icon: '⚠️',
        color: LOG_COLOR.failure,
        maxProgress: 1,
        capacity: 0,
      } as unknown as T;
    }

    // --- TYPE-SPECIFIC DEFAULTS (The Guard) ---
    const defaults: Partial<Record<keyof Registries, any>> = {
      npcs: { nameKey: 'ui_unknown', icon: '👤', color: 'var(--text-main)', maxProgress: 5 },
      items: { title: 'ui_unknown_item', desc: 'ui_no_description', icon: '📦', consumable: false },
      actions: { desc: '...', icon: '⚡' },
      homes: { nameKey: 'ui_unknown', descKey: 'ui_unknown', capacity: 0, image: '' },
    };

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

    const list = Object.values(this.registries.resources).filter(
      (r: any) => r.category === category && !r.hidden
    );
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
            return store.actions.checkRequirement(store, path, rule as any);
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
    if (id.startsWith('home-')) return 'homes';
    if ((this.registries.resources as Record<string, any>)[id]) return 'resources';
    return null;
  },

  /**
   * Validates all entries in all registries.
   * Ensures Golden Master quality: No missing rewards, no missing dialogues, no missing icons.
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
        // 1. ID Consistency
        if (id !== data.id) {
          console.error(`[ID MISMATCH] Registry "${regName}": Key "${id}" !== data.id "${data.id}"`);
          errors++;
        }

        // 2. Metadata Consistency (Title/Icon)
        const VISUAL_REQUIRED = ['items', 'npcs', 'homes'];
        const isActionRequiringVisual = regName === 'actions' && data.category !== 'lore' && !data.isPassive;
        
        if (VISUAL_REQUIRED.includes(regName) || isActionRequiringVisual) {
          // Explicitly allowing '' (empty string) as an intentional "no-icon" marker
          if (data.icon === '' || data.image === '') return;

          if (!data.icon && !data.image) {
            // Ignore virtual resources/modifiers for visual checks
            const isVirtual = id.endsWith('_yield') || id.endsWith('_limit') || id.endsWith('_cost') || id.includes('focus_');
            if (!isVirtual) {
              console.warn(`[MISSING VISUAL] ${id} has no icon or image!`);
              warnings++;
            }
          }
        }

        // 3. NPC STORY VALIDATION (Golden Master Rules)
        if (regName === 'actions' && data.isStory) {
          if (!data.steps || data.steps.length === 0) {
            console.error(`[INVALID STORY] NPC Action ${id} has no steps!`);
            errors++;
          } else {
            data.steps.forEach((step: any, index: number) => {
              const stepIdx = index + 1;
              // Every step needs dialogue
              if (!step.dialogueKey) {
                console.error(`[MISSING DIALOGUE] ${id} Step ${stepIdx} is missing dialogueKey!`);
                errors++;
              }
              const hasReward = step.reward || (step.onSuccess && step.onSuccess.length > 0);
              // Every step needs either a reward OR a dialogue (lore steps might only have dialogue)
              if (!hasReward && !step.dialogueKey) {
                console.error(`[MISSING REWARD] ${id} Step ${stepIdx} has no reward or dialogue!`);
                errors++;
              }
              // Every step needs cost (even if cost 0)
              const hasCost = step.cost !== undefined || step.costs;
              if (!hasCost) {
                console.warn(`[MISSING COST] ${id} Step ${stepIdx} has no cost defined!`);
                warnings++;
              }
            });
          }
        }

        // 4. ACTION CONSISTENCY
        if (regName === 'actions' && !data.isStory && !data.isPassive) {
          const hasResult = data.rewards || (data.onSuccess && data.onSuccess.length > 0) || data.calculateYield;
          if (!hasResult) {
            console.warn(`[USELESS ACTION] ${id} has no yield/reward/effect!`);
            warnings++;
          }
        }

        // 5. RESOURCE/ITEM EXISTENCE CHECK
        if (data.costs) {
          Object.keys(data.costs).forEach(cid => {
            if (!this.get(cid, null, true)) {
              console.error(`[INVALID COST] ${id} requires unknown ID: ${cid}`);
              errors++;
            }
          });
        }
        if (data.costType && data.costType !== 'mixed' && data.costType !== 'none' && !this.get(data.costType, null, true)) {
          console.error(`[INVALID COST] ${id} requires unknown costType: ${data.costType}`);
          errors++;
        }
        if (data.rewards) {
          Object.keys(data.rewards).forEach(rid => {
            if (!this.get(rid, null, true)) {
              console.error(`[INVALID REWARD] ${id} yields unknown ID: ${rid}`);
              errors++;
            }
          });
        }
        if (data.reward && !this.get(data.reward, null, true)) {
          console.error(`[INVALID REWARD] ${id} yields unknown reward ID: ${data.reward}`);
          errors++;
        }

        // 5. LOCALIZATION CHECK
        languages.forEach((lang) => {
          const checkKeys: Array<{ key: string; context: string }> = [];
          
          // Primary identifiers
          if (data.nameKey) checkKeys.push({ key: data.nameKey, context: 'ui' });
          if (data.descKey) checkKeys.push({ key: data.descKey, context: 'ui' });
          if (data.label) {
             const ctx = data.label.startsWith('nav_') || data.label.startsWith('ui_') ? 'ui' : regName;
             checkKeys.push({ key: data.label, context: ctx });
          }

          // Dynamic identifiers (Registry specific)
          if (data.title) {
             const ctx = data.title.startsWith('ui_') || data.title.startsWith('act_') || data.title.startsWith('action_') ? 'ui' : regName;
             checkKeys.push({ key: data.title, context: ctx });
          }
          if (data.desc) {
             const ctx = data.desc.startsWith('ui_') || data.desc.startsWith('act_') || data.desc.startsWith('action_') ? 'ui' : regName;
             checkKeys.push({ key: data.desc, context: ctx });
          }

          // Dialogue keys for NPC steps
          if (data.steps) {
            data.steps.forEach((s: any) => {
              if (s.dialogueKey) checkKeys.push({ key: s.dialogueKey, context: 'npcs' });
            });
          }

          // Fallback: Check ID if no title/nameKey/label is provided
          if (!data.title && !data.nameKey && !data.label) {
            checkKeys.push({ key: id, context: regName });
          }

          checkKeys.forEach(({ key, context }) => {
            let translation = store.translations?.[lang]?.[context]?.[key];
            
            // Context-Fallback to 'ui' if not found in specific context
            if (!translation && context !== 'ui') {
               translation = store.translations?.[lang]?.['ui']?.[key];
            }

            if (!translation) {
              console.warn(
                `[MISSING L10N] ${lang.toUpperCase()} is missing key "${key}" for ${id} in context "${context}"`
              );
              warnings++;
            } else if (typeof translation === 'object' && !translation.title) {
               console.warn(
                `[MISSING L10N] ${lang.toUpperCase()} is missing "title" in object for key "${key}" in context "${context}"`
              );
              warnings++;
            }
          });
        });
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
