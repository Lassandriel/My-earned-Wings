import { createLoggerSystem } from './systems/logger.js';
import { createJuiceSystem } from './systems/juice.js';
import { traitDb } from './data/traits.js';

window.Alpine = Alpine;

Alpine.store('game', {
    ...initialState,
    actionDb,
    traitDb,
    translations: getTranslations(),
    saveInfoText: 'Nie',
    lastMouseX: 0,
    lastMouseY: 0,
    
    // Systems
    resource: createResourceSystem(),
    audio: createAudioSystem(),
    juice: createJuiceSystem(),
    persistence: createPersistenceSystem(initialState),
    logger: createLoggerSystem(),

    init() {
        const loaded = this.persistence.loadGame(this);
        this.audio.init(this.settings);
        this.juice.init();
        
        if (!this.hasSeenIntro && this.logs.length === 0) {
            this.playIntro();
        }

        // Auto-save every 5 minutes
        setInterval(() => { this.persistence.saveGame(this); }, 5 * 60 * 1000);

        // Music activation on first interaction
        const startMusicOnce = () => {
            this.audio.startMusic();
            document.removeEventListener('click', startMusicOnce);
        };
        document.addEventListener('click', startMusicOnce);
    },

    // Proxies for UI convenience
    playSound(key) { this.audio.playSound(key); },
    updateAudio() { this.audio.updateVolumes(this.settings); this.saveGame(); },
    t(key, context = 'ui') { return this.translations[this.language][context][key] || key; },
    addLog(text, color) { this.logger.addLog(this, text, color); },
    saveGame() { this.checkTraits(); this.persistence.saveGame(this); },
    hardReset() { this.persistence.hardReset(this); },

    getTraitMultiplier(bonusType) {
        let multi = 1.0;
        this.unlockedTraits.forEach(traitId => {
            const trait = this.traitDb[traitId];
            if (trait && trait.bonusType === bonusType) {
                // For yield we multiply, for decay we multiply (lower is better)
                multi *= trait.bonusMultiplier;
            }
        });
        return multi;
    },

    checkTraits() {
        Object.values(this.traitDb).forEach(trait => {
            if (this.unlockedTraits.includes(trait.id)) return;

            const currentVal = this.counters[trait.counter] || 0;
            if (currentVal >= trait.requirement) {
                this.unlockedTraits.push(trait.id);
                this.addLog(`TITEL FREIGESCHALTET: ${trait.title}!`, '#fbbf24');
                this.playSound('success');
                this.juice.spawnParticle(this.lastMouseX, this.lastMouseY, `NEUER TITEL: ${trait.title}`, 'shards');
            }
        });
    },

    setLanguage(lang) {
        this.language = lang;
        this.saveGame();
    },

    executeAction(id) {
        const action = this.actionDb[id];
        if (!action) return;
        
        const result = action.execute(this);
        if (result === true || (result && result.success)) {
            // Increment total actions
            this.counters.totalActions++;

            // Increment specific counters based on action ID
            if (id.startsWith('action-wood')) this.counters.wood += (result.yield || 1);
            if (id.startsWith('action-stone')) this.counters.stone += (result.yield || 1);
            if (id === 'action-meditieren') this.counters.magic++;
            if (id === 'action-essen') this.counters.food++;
            if (result.logGain && result.logKey?.includes('sell')) {
                this.counters.shards += parseInt(result.logGain) || 0;
            }

            // Satiation reduction on success (except for recovery actions)
            if (!['action-essen', 'action-ausruhen', 'action-meditieren'].includes(id)) {
                this.resource.consume(this, 'satiation', 2);
            }

            // Record story history
            if (action.isStory) {
                this.recordStoryEntry(id, action);
            }

            // Success Feedback Logic
            this.handleActionSuccess(id);
            
            if (result && result.logKey) {
                const text = this.t(result.logKey, 'logs').replace('{gain}', result.logGain ?? '');
                this.addLog(text, result.logColor);
            }
            this.saveGame();
            return true;
        }
        
        this.handleActionFailure(id, action);
        return false;
    },

    recordStoryEntry(id, action) {
        const existingIndex = this.storyHistory.findIndex(h => h.id === id);
        const historyEntry = {
            id: id,
            chapter: action.chapter || 'The Beginning',
            title: action.title,
            text: action.desc,
            effect: action.effect,
            timestamp: Date.now()
        };
        
        if (existingIndex !== -1) {
            this.storyHistory[existingIndex] = historyEntry;
        } else {
            this.storyHistory.push(historyEntry);
        }
    },

    handleActionSuccess(id) {
        const x = this.lastMouseX;
        const y = this.lastMouseY;

        if (id.startsWith('action-wood')) {
            this.playSound('gather');
            this.juice.spawnParticle(x, y, '+ Holz', 'wood');
        } else if (id.startsWith('action-stone')) {
            this.playSound('gather');
            this.juice.spawnParticle(x, y, '+ Stein', 'stone');
        } else if (id === 'action-hunt') {
            this.playSound('gather');
            this.juice.spawnParticle(x, y, '+ Fleisch', 'energy');
        } else if (id === 'action-essen') {
            this.playSound('eat');
            this.juice.spawnParticle(x, y, '+ Sättigung', 'energy');
        } else if (id === 'action-ausruhen') {
            this.playSound('click');
            this.juice.spawnParticle(x, y, '+ Energie', 'energy');
        } else if (id === 'action-meditieren') {
            this.playSound('click');
            this.juice.spawnParticle(x, y, '+ Magie', 'magic');
        } else if (id.startsWith('action-sell-')) {
            this.playSound('click');
            this.juice.spawnParticle(x, y, '+ Splitter', 'shards');
        } else if (id.startsWith('craft-') || id.startsWith('house-')) {
            this.playSound('success');
            this.juice.spawnParticle(x, y, 'Hervorragend!', 'shards');
        } else {
            this.playSound('click');
        }
    },

    handleActionFailure(id, action) {
        this.playSound('fail');
        const costType = action.costType;
        
        if (!costType) return;

        if (!this.resource.canAfford(this, costType, action.cost)) {
            if (costType === 'energy') {
                this.addLog(this.t('fail_energy', 'logs'), 'rgba(239, 68, 68, 0.75)');
            } else if (costType === 'magic') {
                this.addLog(this.t('fail_magic', 'logs'), 'rgba(239, 68, 68, 0.75)');
            } else {
                this.addLog(this.t('fail_resources', 'logs'), 'rgba(239, 68, 68, 0.75)');
            }
        } else if (this.resource.isFull(this, action.yieldType || costType)) {
            // Specialized full messages
            const yieldType = action.yieldType || costType;
            this.addLog(this.t('fail_full_' + yieldType, 'logs'), 'rgba(239, 68, 68, 0.75)');
        }
    },

    playIntro() {
        for (let i = 1; i <= 7; i++) {
            setTimeout(() => {
                this.addLog(this.t(`intro_${i}`, 'logs'), 'rgba(210, 180, 140, 0.85)');
                if (i === 7) this.hasSeenIntro = true;
            }, i * 2500);
        }
    },

    // Getters
    get CIRCUMFERENCE() { return 251.32; },
    get energyOffset() { return this.CIRCUMFERENCE - (this.stats.energy / this.stats.maxEnergy) * this.CIRCUMFERENCE; },
    get magicOffset() { return this.CIRCUMFERENCE - (this.stats.magic / this.stats.maxMagic) * this.CIRCUMFERENCE; },
    get energyPercent() { return Math.max(0, Math.min(100, (this.stats.energy / this.stats.maxEnergy) * 100)); },
    get magicPercent() { return Math.max(0, Math.min(100, (this.stats.magic / this.stats.maxMagic) * 100)); },
    get satiationPercent() { return Math.max(0, Math.min(100, (this.stats.satiation / this.stats.maxSatiation) * 100)); },
    get efficiency() {
        const perc = this.stats.satiation / this.stats.maxSatiation;
        return Math.max(0.2, perc);
    }
});

Alpine.start();

document.addEventListener('mousemove', (e) => {
    const store = Alpine.store('game');
    if (store) {
        store.lastMouseX = e.clientX;
        store.lastMouseY = e.clientY;
    }
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
