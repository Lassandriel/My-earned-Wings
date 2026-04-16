/**
 * Trait and Title System Manager
 */
export const createTraitSystem = () => ({
    checkTraits(store) {
        Object.values(store.traitDb).forEach(trait => {
            if (store.unlockedTraits.includes(trait.id)) return;
            const currentVal = store.counters[trait.counter] || 0;
            if (currentVal >= trait.requirement) {
                store.unlockedTraits.push(trait.id);
                store.addLog('log_trait_unlocked', 'logs', '#fbbf24', { title: store.t(trait.id, 'traits').title });
                store.playSound('success');
                store.juice.spawnParticle(store.lastMouseX, store.lastMouseY, store.t('particle_new_trait', 'logs').replace('{title}', store.t(trait.id, 'traits').title), 'shards');
            }
        });
    },

    getTraitMultiplier(store, bonusType) {
        let multi = 1.0;
        store.unlockedTraits.forEach(traitId => {
            const trait = store.traitDb[traitId];
            if (trait && trait.bonusType === bonusType) multi *= trait.bonusMultiplier;
        });
        return multi;
    }
});
