import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { actionDb } from './data/actions/index.js';
import { createResourceSystem } from './systems/resource.js';
import { createAudioSystem } from './systems/audio.js';
import { createPersistenceSystem } from './systems/persistence.js';
import { createLoggerSystem } from './systems/logger.js';
import { createJuiceSystem } from './systems/juice.js';
import { createUISystem } from './systems/ui.js';
import { createStorySystem } from './systems/story.js';
import { traitDb } from './data/traits.js';

window.Alpine = Alpine;

Alpine.store('game', {
    ...initialState,
    actionDb,
    traitDb,
    translations: getTranslations(),
    saveInfoText: '', // Will be set by t('save_never') or loaded data
    lastMouseX: 0,
    lastMouseY: 0,
    
    // Systems
    resource: createResourceSystem(),
    audio: createAudioSystem(),
    juice: createJuiceSystem(),
    persistence: createPersistenceSystem(initialState),
    logger: createLoggerSystem(),
    ui: createUISystem(),
    story: createStorySystem(),

    init() {
        const hasSavedData = localStorage.getItem('wings_save');
        this.hasSave = !!hasSavedData;

        // Note: We don't auto-load here anymore if we want to stay in menu
        // But we might want to load settings at least?
        // Let's just set the flag and wait for the user to click "Continue"
        
        this.audio.init(this.settings);
        this.juice.init();
        
        this.ui.calculateScale(this);
        window.addEventListener('resize', () => this.ui.calculateScale(this));

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
    
    t(key, context = 'ui', params = {}) { 
        let text = this.translations[this.language][context]?.[key] || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, v);
            });
        }
        return text; 
    },

    addLog(id, context = 'logs', color = null, params = {}) { 
        this.logger.addLog(this, id, context, color, params); 
    },

    saveGame(isManual = false) { this.checkTraits(); this.persistence.saveGame(this, isManual); },
    loadGame() { this.persistence.loadGame(this); },
    hardReset() { this.persistence.hardReset(this); },
    calculateScale() { this.ui.calculateScale(this); },

    startNewGame() {
        if (this.hasSave) {
            if (!confirm(this.t('confirm_reset', 'ui'))) return;
        }
        localStorage.removeItem('wings_save');
        // Reset state to initial (except maybe settings?)
        Object.keys(initialState).forEach(key => {
            if (key !== 'settings' && key !== 'language') {
                this[key] = JSON.parse(JSON.stringify(initialState[key]));
            }
        });
        this.view = 'prologue';
        this.prologueStep = 0;
        this.hasSave = false;
        this.audio.startMusic();
        this.playIntro(); // Start the sequence
        this.saveGame();
    },

    skipPrologue() {
        this.view = 'gameplay';
        this.hasSeenIntro = true;
        // Also add logic to ensure all log entries are present if skipped?
        // Let's just catch up the logs.
        for (let i = 1; i <= 7; i++) {
            this.addLog(`intro_${i}`, 'logs', 'rgba(210, 180, 140, 0.85)');
        }
        this.saveGame();
    },

    continueGame() {
        if (this.persistence.loadGame(this)) {
            this.view = 'gameplay';
            this.audio.startMusic();
        }
    },

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

    get groupedHistory() {
        const groups = [];
        this.storyHistory.forEach(entry => {
            const action = this.actionDb[entry.id] || {};
            // Dynamic Metadata from Action DB
            let source = 'world';
            let symbol = action.journalIcon || '🌍';
            let color = action.journalColor || 'var(--accent-purple)';
            let name = this.t(entry.id, 'actions').title || this.t('source_world', 'ui');

            if (entry.id.startsWith('npc-')) {
                source = entry.id.split('-')[1];
            }

            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup.source === source) {
                lastGroup.entries.push(entry);
            } else {
                groups.push({
                    source,
                    symbol,
                    color,
                    name,
                    entries: [entry]
                });
            }
        });
        return groups;
    },

    checkTraits() {
        Object.values(this.traitDb).forEach(trait => {
            if (this.unlockedTraits.includes(trait.id)) return;

            const currentVal = this.counters[trait.counter] || 0;
            if (currentVal >= trait.requirement) {
                this.unlockedTraits.push(trait.id);
                this.addLog('log_trait_unlocked', 'logs', '#fbbf24', { title: this.t(trait.id, 'traits').title });
                this.playSound('success');
                this.juice.spawnParticle(this.lastMouseX, this.lastMouseY, this.t('particle_new_trait', 'logs').replace('{title}', this.t(trait.id, 'traits').title), 'shards');
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
                this.story.recordStoryEntry(this, id, action);
            }

            // Success Feedback Logic
            this.handleActionSuccess(action);
            
            if (result && result.logKey) {
                this.addLog(result.logKey, 'logs', result.logColor, { gain: result.logGain ?? '' });
            }
            this.saveGame();
            return true;
        }
        
        this.handleActionFailure(id, action);
        return false;
    },

    handleActionSuccess(action) {
        const x = this.lastMouseX;
        const y = this.lastMouseY;

        // Feedback from Action Metadata
        if (action.sfx) this.playSound(action.sfx);
        else this.playSound('click');

        if (action.particleText) {
            let pText = action.particleText;
            // Best effort translation for simple '+ Resource' particles
            if (pText.startsWith('+ ')) {
                const resName = pText.slice(2);
                const resKey = action.yieldType || action.costType || action.counter;
                if (resKey) {
                    const translated = this.t('ui_' + resKey);
                    if (translated && translated !== 'ui_' + resKey) {
                        pText = `+ ${translated}`;
                    }
                }
            }
            this.juice.spawnParticle(x, y, pText, action.particleType || 'energy');
        }
    },

    handleActionFailure(id, action) {
        this.playSound('fail');
        const costType = action.costType;
        
        if (!costType) return;

        const effectiveCosts = costType === 'mixed' ? action.costs : costType;

        if (!this.resource.canAfford(this, effectiveCosts, action.cost)) {
            if (costType === 'energy') {
                this.addLog('fail_energy', 'logs', 'rgba(239, 68, 68, 0.75)');
            } else if (costType === 'magic') {
                this.addLog('fail_magic', 'logs', 'rgba(239, 68, 68, 0.75)');
            } else {
                this.addLog('fail_resources', 'logs', 'rgba(239, 68, 68, 0.75)');
            }
        } else if (costType !== 'mixed' && this.resource.isFull(this, action.yieldType || costType)) {
            // Specialized full messages
            const yieldType = action.yieldType || costType;
            this.addLog('fail_full_' + yieldType, 'logs', 'rgba(239, 68, 68, 0.75)');
        }
    },

    playIntro() {
        this.prologueStep = 1;
        this.view = 'prologue';
        
        const nextStep = (step) => {
            if (this.view !== 'prologue') return; // User skipped
            
            this.addLog(`intro_${step}`, 'logs', 'rgba(210, 180, 140, 0.85)');
            
            if (step < 7) {
                setTimeout(() => {
                    this.prologueStep = step + 1;
                    nextStep(step + 1);
                }, 4500); // 4.5 seconds per sentence
            } else {
                setTimeout(() => {
                    if (this.view === 'prologue') {
                        this.view = 'gameplay';
                        this.hasSeenIntro = true;
                        this.saveGame();
                    }
                }, 4500);
            }
        };

        nextStep(1);
    },

    // Getters for animation/UI
    get CIRCUMFERENCE() { return 251.32; },
    get energyOffset() { return this.CIRCUMFERENCE - (this.stats.energy / this.stats.maxEnergy) * this.CIRCUMFERENCE; },
    get magicOffset() { return this.CIRCUMFERENCE - (this.stats.magic / this.stats.maxMagic) * this.CIRCUMFERENCE; },
    get costMultiplier() {
        const perc = this.stats.satiation / this.stats.maxSatiation;
        if (perc > 0.8) return 0.8;
        if (perc < 0.2) return 1.5;
        return 1.0;
    },

    get efficiency() {
        const perc = this.stats.satiation / this.stats.maxSatiation;
        // Floor at 0.1 to prevent absolute zero progress
        return Math.max(0.1, perc);
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
            this.addLog('fail_salary', 'logs', 'rgba(239, 68, 68, 0.75)');
            this.playSound('fail');
        }
        this.saveGame();
    }
});

Alpine.start();

document.addEventListener('mousemove', (e) => {
    const store = Alpine.store('game');
    if (store && store.ui) {
        store.ui.handleMouseMove(e, store);
    }
});
