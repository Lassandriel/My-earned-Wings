import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { actionDb, itemDb, traitDb } from './data/index.js';

// Systems
import { createResourceSystem } from './systems/resource.js';
import { createAudioSystem } from './systems/audio.js';
import { createPersistenceSystem } from './systems/persistence.js';
import { createLoggerSystem } from './systems/logger.js';
import { createJuiceSystem } from './systems/juice.js';
import { createUISystem } from './systems/ui.js';
import { createStorySystem } from './systems/story.js';
import { createPrologueSystem } from './systems/prologue.js';
import { createNPCSystem } from './systems/npc.js';
import { createActionSystem } from './systems/actions.js';
import { createEngineSystem } from './systems/engine.js';

window.Alpine = Alpine;

Alpine.store('game', {
    ...initialState,
    actionDb,
    traitDb,
    itemDb,
    translations: getTranslations(),
    saveInfoText: '',
    lastMouseX: 0,
    lastMouseY: 0,
    selectedItem: null,
    
    // System Instances
    resource: createResourceSystem(),
    audio: createAudioSystem(),
    juice: createJuiceSystem(),
    persistence: createPersistenceSystem(initialState),
    logger: createLoggerSystem(),
    ui: createUISystem(),
    story: createStorySystem(),
    prologue: createPrologueSystem(),
    npc: createNPCSystem(),
    actions: createActionSystem(),
    engine: createEngineSystem(),

    init() {
        const hasSavedData = localStorage.getItem('wings_save');
        this.hasSave = !!hasSavedData;

        this.audio.init(this.settings);
        this.juice.init();
        this.engine.init(this);
        
        this.ui.calculateScale(this);
        window.addEventListener('resize', () => this.ui.calculateScale(this));

        // Start music on first interaction
        const startMusicOnce = () => {
            this.audio.startMusic();
            document.removeEventListener('click', startMusicOnce);
        };
        document.addEventListener('click', startMusicOnce);
    },

    // --- PROXIES & HELPERS ---
    t(key, context = 'ui', params = {}) { 
        let text = this.translations[this.language][context]?.[key] || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, v);
            });
        }
        return text; 
    },

    playSound(key) { this.audio.playSound(key); },
    addLog(id, context = 'logs', color = null, params = {}) { 
        this.logger.addLog(this, id, context, color, params); 
    },

    saveGame(isManual = false) { 
        this.checkTraits(); 
        this.persistence.saveGame(this, isManual); 
    },

    loadGame() {
        if (this.persistence.loadGame(this)) {
            this.ui.calculateScale(this);
            return true;
        }
        return false;
    },

    setLanguage(lang) {
        this.language = lang;
        this.saveGame();
    },

    calculateScale() {
        this.ui.calculateScale(this);
    },

    hardReset() {
        this.persistence.hardReset(this);
    },

    exportSave() {
        this.saveCode = this.persistence.exportGameData(this);
    },

    importSave() {
        this.persistence.importGameData(this, this.saveCode);
    },

    updateAudio() {
        this.audio.init(this.settings);
    },

    // --- VIEW LOGIC ---
    startNewGame() {
        if (this.hasSave) {
            if (!confirm(this.t('confirm_reset', 'ui'))) return;
        }
        localStorage.removeItem('wings_save');
        Object.keys(initialState).forEach(key => {
            if (key !== 'settings' && key !== 'language') {
                this[key] = JSON.parse(JSON.stringify(initialState[key]));
            }
        });
        this.view = 'prologue';
        this.prologue.playIntro(this);
        this.hasSave = false;
        this.audio.startMusic();
        this.saveGame();
    },

    continueGame() {
        if (this.persistence.loadGame(this)) {
            this.view = 'gameplay'; 
            this.audio.startMusic();
        }
    },

    // --- CORE GAMEPLAY ---
    executeAction(id) { return this.actions.execute(this, id); },
    npcExecute(id) { return this.npc.execute(this, id); },
    toggleCompanion(id) { this.npc.toggleCompanion(this, id); },

    completeDemo() {
        this.view = 'finale';
        this.addLog('milestone_tree_of_life', 'logs', 'var(--accent-teal)');
        this.playSound('success');
        this.saveGame();
    },

    consumeItem(id) {
        const item = this.itemDb[id];
        if (!item || !item.consumable) return;
        const index = this.inventory.indexOf(id);
        if (index === -1) return;

        if (item.effect) {
            Object.entries(item.effect).forEach(([key, val]) => {
                if (['energy', 'magic', 'satiation'].includes(key)) {
                    this.resource.add(this, key, val);
                }
            });
        }
        this.inventory.splice(index, 1);
        if (this.selectedItem === id) this.selectedItem = null;
        this.addLog('item_consumed', 'logs', 'rgba(16, 185, 129, 0.9)', { name: this.t(id, 'items') || item.title });
        this.playSound('eat');
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

    // --- UI & STATS ---
    getActionEffect(hAction) {
        if (!hAction || !hAction.data) return '';
        const lang = this.t(hAction.id, 'actions');
        if (!lang || !lang.effect) return '';
        const action = hAction.data;
        if (action.calculateYield) {
            const yieldVal = action.calculateYield(this);
            let effectText = lang.effect;
            if (typeof yieldVal === 'object') {
                Object.entries(yieldVal).forEach(([key, val]) => {
                    const displayVal = typeof val === 'number' ? val.toFixed(1).replace('.0', '') : val;
                    effectText = effectText.replace(`{${key}}`, displayVal);
                });
                return effectText;
            } else {
                const displayVal = typeof yieldVal === 'number' ? yieldVal.toFixed(1).replace('.0', '') : yieldVal;
                return effectText.replace('{val}', displayVal);
            }
        }
        return lang.effect;
    },

    getTraitMultiplier(bonusType) {
        let multi = 1.0;
        this.unlockedTraits.forEach(traitId => {
            const trait = this.traitDb[traitId];
            if (trait && trait.bonusType === bonusType) multi *= trait.bonusMultiplier;
        });
        return multi;
    },

    getTooltipCosts(hAction) {
        if (!hAction || !hAction.data) return [];
        
        // Handle NPC steps
        const prog = hAction.id.startsWith('npc-') ? (this.npcProgress[hAction.data.progKey] || 0) : null;
        const currentStep = (prog !== null && hAction.data.steps) ? hAction.data.steps[prog] : null;
        const sourceData = currentStep || hAction.data;

        const results = [];
        
        // Multi-resource costs
        if (sourceData.costs) {
            Object.entries(sourceData.costs).forEach(([type, amt]) => {
                let finalAmt = amt;
                if ((type === 'energy' || type === 'magic') && this.getSatiationMultiplier) {
                    finalAmt = Math.round(finalAmt * this.getSatiationMultiplier());
                }
                const current = this.resources[type] ?? this.stats[type] ?? 0;
                results.push({
                    label: this.t('ui_' + type) || type,
                    value: Math.floor(current) + ' / ' + finalAmt,
                    affordable: current >= finalAmt
                });
            });
        } 
        // Single resource cost (legacy/simple)
        else if (sourceData.cost && sourceData.costType) {
            const type = sourceData.costType;
            let finalAmt = sourceData.cost;
            if ((type === 'energy' || type === 'magic') && this.getSatiationMultiplier) {
                finalAmt = Math.round(finalAmt * this.getSatiationMultiplier());
            }
            const current = this.resources[type] ?? this.stats[type] ?? 0;
            results.push({
                label: this.t('ui_' + type) || type,
                value: Math.floor(current) + ' / ' + finalAmt,
                affordable: current >= finalAmt
            });
        }
        
        return results;
    },

    // Getters
    get energyPercent() { return (this.stats.energy / this.stats.maxEnergy) * 100; },
    get magicPercent() { return (this.stats.magic / this.stats.maxMagic) * 100; },
    get satiationPercent() { return Math.max(0, Math.min(100, (this.stats.satiation / this.stats.maxSatiation) * 100)); },
    get energyOffset() { return 251.32 - (this.stats.energy / this.stats.maxEnergy) * 251.32; },
    get magicOffset() { return 251.32 - (this.stats.magic / this.stats.maxMagic) * 251.32; },
    getSatiationMultiplier() {
        const sat = this.stats.satiation;
        if (sat >= 80) return 0.8;
        if (sat <= 20) return 1.5;
        // Linear interpolation between (20, 1.5) and (80, 0.8)
        return 1.5 - ((sat - 20) / 60) * 0.7;
    },
    get efficiency() { return 1 / this.getSatiationMultiplier(); },

    get groupedHistory() {
        const groups = [];
        this.storyHistory.forEach(entry => {
            const action = this.actionDb[entry.id] || {};
            let source = entry.id.startsWith('npc-') ? entry.id.split('-')[1] : 'world';
            let symbol = action.journalIcon || '🌍';
            let color = action.journalColor || 'var(--accent-purple)';
            let name = this.t(entry.id, 'actions').title || this.t('source_world', 'ui');

            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup.source === source) {
                lastGroup.entries.push(entry);
            } else {
                groups.push({ source, symbol, color, name, entries: [entry] });
            }
        });
        return groups;
    },

    get canAccessTreeOfLife() {
        if (!this.housing.hasHouse) return false;
        return (
            (this.npcProgress.baker || 0) >= this.actionDb['npc-baker'].maxProgress &&
            (this.npcProgress.teacher || 0) >= this.actionDb['npc-teacher'].maxProgress &&
            (this.npcProgress.sage || 0) >= this.actionDb['npc-sage'].maxProgress &&
            (this.counters.study || 0) >= 3
        );
    }
});

Alpine.start();

document.addEventListener('keydown', (e) => {
    const store = Alpine.store('game');
    if (e.key === 'Escape' && store) {
        store.settingsOpen = !store.settingsOpen;
        store.playSound('click');
    }
});

document.addEventListener('mousemove', (e) => {
    const store = Alpine.store('game');
    if (store && store.ui) store.ui.handleMouseMove(e, store);
});
