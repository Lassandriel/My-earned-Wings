import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { actionDb } from './data/actions/index.js';
import { createResourceSystem } from './systems/resource.js';
import { createAudioSystem } from './systems/audio.js';
import { createPersistenceSystem } from './systems/persistence.js';
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

        // Background Progression (Game Loop)
        setInterval(() => { this.gameLoop(); }, 5000);

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
    loadGame() { this.persistence.loadGame(this); },
    hardReset() { this.persistence.hardReset(this); },

    getTraitMultiplier(bonusType) {
        let multi = 1.0;
        this.unlockedTraits.forEach(traitId => {
            const trait = this.traitDb[traitId];
            if (trait && trait.bonusType === bonusType) {
                multi *= trait.bonusMultiplier;
            }
        });
        return multi;
    },

    // Getters for stat percentages
    get energyPercent() { return (this.stats.energy / this.stats.maxEnergy) * 100; },
    get magicPercent() { return (this.stats.magic / this.stats.maxMagic) * 100; },
    get satiationPercent() { return Math.max(0, Math.min(100, (this.stats.satiation / this.stats.maxSatiation) * 100)); },

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

            // Increment specific counters based on action metadata
            if (action.counter) {
                if (action.counter === 'shards' && result.logGain) {
                    const amount = parseInt(result.logGain.toString().replace(/[^0-9]/g, '')) || 0;
                    this.counters.shards += amount;
                } else {
                    this.counters[action.counter] += (result.yield || 1);
                }
            }

            // CHECK TRAITS IMMEDIATELY
            this.checkTraits();

            // Satiation reduction on success (except for recovery actions)
            if (!['action-essen', 'action-ausruhen', 'action-meditieren'].includes(id)) {
                this.resource.consume(this, 'satiation', 2);
            }

            // Record story history
            if (action.isStory) {
                this.recordStoryEntry(id, action);
            }

            // Success Feedback Logic
            this.handleActionSuccess(action);
            
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

    handleActionSuccess(action) {
        const x = this.lastMouseX;
        const y = this.lastMouseY;

        // Feedback from Action Metadata
        if (action.sfx) this.playSound(action.sfx);
        else this.playSound('click');

        if (action.particleText) {
            this.juice.spawnParticle(x, y, action.particleText, action.particleType || 'energy');
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
    get efficiency() {
        const perc = this.stats.satiation / this.stats.maxSatiation;
        return Math.max(0.2, perc);
    },

    toggleCompanion(npcId) {
        if (this.companions[npcId]) {
            delete this.companions[npcId];
            this.playSound('click');
        } else {
            const npc = this.actionDb[npcId];
            const currentProgress = this.npcProgress[npc.progKey];
            if (currentProgress >= npc.maxProgress) {
                this.companions[npcId] = true;
                this.playSound('success');
            }
        }
    },

    gameLoop() {
        const activeIds = Object.keys(this.companions);
        if (activeIds.length === 0) return;

        let totalSalary = 0;
        activeIds.forEach(id => {
            const npc = this.actionDb[id];
            if (npc && npc.companion) {
                totalSalary += npc.companion.salary;
            }
        });

        // Check if player can afford salary
        if (this.resource.consume(this, 'shards', totalSalary)) {
            activeIds.forEach(id => {
                const npc = this.actionDb[id];
                if (npc && npc.companion) {
                    // Apply yields
                    Object.entries(npc.companion.yield).forEach(([res, amount]) => {
                        this.resource.add(this, res, amount);
                    });
                }
            });
        } else {
            // Cannot afford salary - stop all work
            this.companions = {};
            this.addLog(this.t('fail_salary', 'logs'), 'rgba(239, 68, 68, 0.75)');
            this.playSound('fail');
        }
        this.saveGame();
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
