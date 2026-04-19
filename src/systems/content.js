/**
 * Content Service - Draconia Core 3.0
 * The central hub for all game data registries. Handles validation and lookup.
 */
export const createContentService = (registries) => ({
    registries,
    cache: {
        categories: {},
        npcActions: {}
    },

    /**
     * Finds an entry by ID across all registries or in a specific one.
     * Injects defaults to prevent UI crashes.
     */
    get(id, type = null) {
        let data = null;
        if (type && this.registries[type]) {
            data = this.registries[type][id];
        } else {
            const detectedType = this.detectType(id);
            if (detectedType && this.registries[detectedType]) {
                data = this.registries[detectedType][id];
            } else {
                for (const reg of Object.values(this.registries)) {
                    if (reg[id]) { data = reg[id]; break; }
                }
            }
        }

        if (!data) return null;

        // --- TYPE-SPECIFIC DEFAULTS (The Guard) ---
        const defaults = {
            npcs: { nameKey: 'ui_unknown', icon: '👤', color: 'var(--text-main)', maxProgress: 5 },
            items: { title: 'Unknown Item', desc: 'No description.', icon: '📦' },
            actions: { title: 'Action', desc: '...', icon: '⚡' }
        };

        const detectedType = type || this.detectType(id);
        if (defaults[detectedType]) {
            return { ...defaults[detectedType], ...data };
        }

        return data;
    },

    /**
     * Optimized lookup for resource categories.
     * Prevents large filter loops in template.
     */
    getCategorizedResources(category) {
        if (this.cache.categories[category]) return this.cache.categories[category];
        
        const list = Object.values(this.registries.resources).filter(r => r.category === category);
        this.cache.categories[category] = list;
        return list;
    },

    /**
     * Resolves all available actions for a specific NPC, 
     * including trade offers and specialty sub-menus.
     */
    getNPCActions(store, npcId) {
        const npc = this.registries.npcs[npcId];
        if (!npc || !npc.tradeActions) return [];

        return npc.tradeActions.filter(trade => {
            // Check if requirement exists (legacy minProgress support or new rule)
            if (trade.minProgress !== undefined) {
                const progKey = npc.progKey;
                return (store.npcProgress[progKey] || 0) >= trade.minProgress;
            }
            if (trade.requirements) {
                return Object.entries(trade.requirements).every(([path, rule]) => {
                    return store.actions.checkRequirement(store, path, rule);
                });
            }
            return true;
        }).map(trade => this.registries.actions[trade.id]).filter(Boolean);
    },

    detectType(id) {
        if (id.startsWith('npc-')) return 'npcs';
        if (id.startsWith('item-')) return 'items';
        if (id.startsWith('act-')) return 'actions';
        if (id.startsWith('build-')) return 'actions'; // Buildings are actions that set flags
        if (id.startsWith('buff-')) return 'buffs';
        return null;
    },

    /**
     * Validates all entries in all registries.
     * Checks for missing images, localizations, and structural consistency.
     */
    validate(store) {
        console.group('%c 🐲 Draconia Content Validation ', 'background: #2dd4bf; color: #000; font-weight: bold; padding: 2px 4px; border-radius: 4px;');
        let errors = 0;
        let warnings = 0;
        const languages = ['de', 'en'];

        Object.entries(this.registries).forEach(([regName, items]) => {
            Object.entries(items).forEach(([id, data]) => {
                // 1. ID Consistency
                if (id !== data.id) {
                    console.error(`[ID MISMATCH] Registry key "${id}" does not match object ID "${data.id}"`);
                    errors++;
                }

                // 2. Localization Check (Deep Validation)
                languages.forEach(lang => {
                    const checkKeys = [];
                    if (data.nameKey) checkKeys.push({ key: data.nameKey, context: 'ui' });
                    if (data.title) checkKeys.push({ key: data.title, context: regName }); // e.g. regName 'items' or 'actions'
                    if (data.desc) checkKeys.push({ key: data.desc, context: regName });

                    checkKeys.forEach(({ key, context }) => {
                        const translation = store.translations?.[lang]?.[context]?.[key];
                        if (!translation) {
                            console.warn(`[MISSING L10N] ${lang.toUpperCase()} is missing key "${key}" for ${id} in context "${context}"`);
                            warnings++;
                        }
                    });
                });

                // 3. Image Check
                if (data.image && !data.image.startsWith('img/')) {
                    console.warn(`[INVALID IMAGE] ${id} has suspicious path: ${data.image}`);
                    warnings++;
                }
            });
        });

        const statusStyle = errors > 0 ? 'color: #ef4444; font-weight: bold;' : 'color: #10b981; font-weight: bold;';
        console.log(`%cValidation complete: ${errors} Errors, ${warnings} Warnings.`, statusStyle);
        console.groupEnd();
        
        if (errors > 0) {
            console.error('CRITICAL: Content validation failed. Check the logs above.');
        }
        
        return errors === 0;
    }
});
