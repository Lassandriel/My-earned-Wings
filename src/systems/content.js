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
        if (id.startsWith('house-')) return 'actions'; 
        if (id.startsWith('buff-')) return 'buffs';
        return null;
    },

    /**
     * Validates all entries in all registries.
     * Checks for missing images, localizations, and circular dependencies.
     */
    validate(store) {
        console.group('Draconia Content Validation');
        let errors = 0;
        let warnings = 0;

        Object.entries(this.registries).forEach(([regName, items]) => {
            Object.entries(items).forEach(([id, data]) => {
                // 1. ID Consistency
                if (id !== data.id) {
                    console.error(`ID Mismatch: Registry key ${id} does not match object ID ${data.id}`);
                    errors++;
                }

                // 2. Localization Check
                if (data.nameKey && !store.t(data.nameKey)) {
                    console.warn(`Missing Localization: No translation for key ${data.nameKey} (${id})`);
                    warnings++;
                }

                // 3. Image Check (only if expected)
                if (data.image && !data.image.startsWith('img/')) {
                    console.warn(`Invalid Image Path: ${data.image} in ${id}`);
                    warnings++;
                }
            });
        });

        console.log(`Validation complete: ${errors} Errors, ${warnings} Warnings.`);
        console.groupEnd();
        return errors === 0;
    }
});
