/**
 * Content Service - Draconia Core 3.0
 * The central hub for all game data registries. Handles validation and lookup.
 */
export const createContentService = (registries) => ({
    registries,

    /**
     * Finds an entry by ID across all registries or in a specific one.
     */
    get(id, type = null) {
        if (type && this.registries[type]) {
            return this.registries[type][id];
        }

        // Auto-detect by prefix if type is unknown
        const detectedType = this.detectType(id);
        if (detectedType && this.registries[detectedType]) {
            return this.registries[detectedType][id];
        }

        // Brute force search
        for (const reg of Object.values(this.registries)) {
            if (reg[id]) return reg[id];
        }

        return null;
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
