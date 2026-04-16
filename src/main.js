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
import { createDialogueSystem } from './systems/dialogue.js';
import { createNPCSystem } from './systems/npc.js';
import { createActionSystem } from './systems/actions.js';
import { createEngineSystem } from './systems/engine.js';
import { createTutorialSystem } from './systems/tutorial.js';
import { createTraitSystem } from './systems/traits.js';
import { createItemSystem } from './systems/item.js';

// Styles
import './assets/styles/main.css';

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
    tutorial: createTutorialSystem(),
    trait: createTraitSystem(),
    item: createItemSystem(),
    dialogue: createDialogueSystem(),

    init() {
        const hasSavedData = localStorage.getItem('wings_save');
        this.hasSave = !!hasSavedData;

        this.audio.init(this.settings);
        this.juice.init();
        this.engine.init(this);
        
        this.ui.calculateScale(this);
        window.addEventListener('resize', () => this.ui.calculateScale(this));

        // Hard reset on startup to prevent any early overlays
        console.log('[SANITY CHECK] Initializing store, clearing flags...');
        this.dialogueActive = false;
        this.ellieActive = false;
        if (this.dialogue) this.dialogue.active = false;

        // Start music on first interaction
        const startMusicOnce = () => {
            this.audio.startMusic();
            document.removeEventListener('click', startMusicOnce);
        };
        document.addEventListener('click', startMusicOnce);
    },

    // --- PROXIES & DELEGATES ---
    get isEllieVisible() {
        return this.dialogueActive && this.dialogue.npcId === 'Ellie';
    },

    finishPrologue() {
        this.view = 'gameplay';
        this.saveGame();
    },

    // Dialogue Text Resolver
    getDialogueText() {
        return '';
    },
    // These methods maintain compatibility with HTML templates while delegating logic to systems.

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
        this.trait.checkTraits(this); 
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

    hardReset() { this.persistence.hardReset(this); },
    exportSave() { this.saveCode = this.persistence.exportGameData(this); },
    importSave() { this.persistence.importGameData(this, this.saveCode); },
    updateAudio() { this.audio.init(this.settings); },

    // --- VIEW LOGIC ---
    startNewGame() {
        if (this.hasSave) {
            if (!confirm(this.t('confirm_reset', 'ui'))) return;
        }
        this.resetStateToInitial();
        this.view = 'prologue';
        this.prologue.playIntro(this);
        this.hasSave = false;
        this.audio.startMusic();
        this.saveGame();
    },

    confirmName() {
        if (!this.playerName || this.playerName.trim() === '') return;
        this.showNamePrompt = false;
        const name = this.playerName;
        this.resetStateToInitial();
        this.playerName = name;
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

    resetStateToInitial() {
        localStorage.removeItem('wings_save');
        Object.keys(initialState).forEach(key => {
            if (key !== 'settings' && key !== 'language') {
                this[key] = JSON.parse(JSON.stringify(initialState[key]));
            }
        });
    },

    // --- GAMEPLAY DELEGATES ---
    executeAction(id) { 
        const result = this.actions.execute(this, id); 
        if (result.success && this.ellieActive) {
            this.tutorial.handleAction(this, id);
        }
        return result;
    },
    npcExecute(id) { return this.npc.execute(this, id); },
    toggleCompanion(id) { this.npc.toggleCompanion(this, id); },
    consumeItem(id) { this.item.consumeItem(this, id); },
    checkTraits() { this.trait.checkTraits(this); },
    
    completeDemo() {
        this.view = 'finale';
        this.addLog('milestone_tree_of_life', 'logs', 'var(--accent-teal)');
        this.playSound('success');
        this.saveGame();
    },

    // --- UI HELPERS & GETTERS ---
    getActionEffect(hAction) { return this.ui.getActionEffect(this, hAction); },
    getTooltipCosts(hAction) { return this.ui.getTooltipCosts(this, hAction); },
    getTraitMultiplier(bonusType) { return this.trait.getTraitMultiplier(this, bonusType); },
    
    get energyPercent() { return this.ui.getEnergyPercent(this); },
    get magicPercent() { return this.ui.getMagicPercent(this); },
    get satiationPercent() { return this.ui.getSatiationPercent(this); },
    
    getSatiationMultiplier() { return this.resource.getSatiationMultiplier(this); },
    get efficiency() { return this.resource.getEfficiency(this); },

    get groupedHistory() { return this.story.getGroupedHistory ? this.story.getGroupedHistory(this) : []; },

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

// --- Event Listeners ---
document.addEventListener('keydown', (e) => {
    const store = Alpine.store('game');
    if (!store) return;

    if (e.key === 'Escape') {
        if (store.view === 'prologue') {
            store.finishPrologue();
        } else {
            store.settingsOpen = !store.settingsOpen;
            store.playSound('click');
        }
    }
    
    if (e.key === 'Enter') {
        if (store.view === 'prologue') {
            store.prologue.advancePrologue(store);
        }
    }
});

document.addEventListener('mousemove', (e) => {
    const store = Alpine.store('game');
    if (store && store.ui) store.ui.handleMouseMove(e, store);
});
