import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { NPC_REGISTRY, RESOURCE_REGISTRY, actionDb, itemDb } from './data/index.js';

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
import { createItemSystem } from './systems/item.js';

import './assets/styles/main.css';

window.Alpine = Alpine;

/**
 * CORE 2.0 STORE ASSEMBLY
 * Dynamically builds the game store based on registries.
 */
const buildInitialState = () => {
    const baseState = JSON.parse(JSON.stringify(initialState));
    
    // Auto-populate resources and stats from Registry
    Object.values(RESOURCE_REGISTRY).forEach(res => {
        if (res.type === 'resource') {
            baseState.resources[res.id] = res.initial || 0;
            baseState.limits[res.id] = res.initialLimit || 0;
        } else if (res.type === 'stat') {
            baseState.stats[res.id] = res.initial || 100;
            const maxKey = 'max' + res.id.charAt(0).toUpperCase() + res.id.slice(1);
            baseState.stats[maxKey] = res.initialMax || 100;
        }
    });

    // Auto-populate NPC progress from Registry
    Object.values(NPC_REGISTRY).forEach(npc => {
        if (npc.progKey && baseState.npcProgress[npc.progKey] === undefined) {
            baseState.npcProgress[npc.progKey] = 0;
        }
    });

    return baseState;
};

const dynamicInitialState = buildInitialState();

Alpine.store('game', {
    ...dynamicInitialState,
    NPC_REGISTRY,
    RESOURCE_REGISTRY,
    actionDb,
    itemDb,
    translations: getTranslations(),
    saveInfoText: '',
    lastMouseX: 0,
    lastMouseY: 0,
    selectedItem: null,
    
    // System Instances (Modular Managers)
    resource: createResourceSystem(),
    audio: createAudioSystem(),
    juice: createJuiceSystem(),
    persistence: createPersistenceSystem(dynamicInitialState),
    logger: createLoggerSystem(),
    ui: createUISystem(),
    story: createStorySystem(),
    prologue: createPrologueSystem(),
    npc: createNPCSystem(),
    actions: createActionSystem(),
    engine: createEngineSystem(),
    tutorial: createTutorialSystem(),
    item: createItemSystem(),
    dialogue: createDialogueSystem(),

    init() {
        const store = Alpine.store('game');
        const hasSavedData = localStorage.getItem('wings_save');
        store.hasSave = !!hasSavedData;

        store.audio.init(store.settings);
        store.juice.init();
        store.engine.init(store);
        
        store.ui.calculateScale(store);
        window.addEventListener('resize', () => store.ui.calculateScale(store));

        // Hard reset on startup to prevent any early overlays
        console.log('[CORE 2.0] Initializing store, clearing flags...');
        store.dialogueActive = false;
        store.ellieActive = false;
        store.dialogueText = '';
        store.dialogueTitle = '';
        store.dialogueNpcId = null;

        // Music Trigger
        const startMusicOnce = () => {
            store.audio.startMusic();
            document.removeEventListener('click', startMusicOnce);
        };
        document.addEventListener('click', startMusicOnce);
    },

    // --- PROXIES & DELEGATES ---
    get isEllieVisible() {
        const store = Alpine.store('game');
        return store.dialogueActive && store.dialogueNpcId === 'Ellie';
    },

    finishPrologue() {
        const store = Alpine.store('game');
        store.view = 'gameplay';
        store.saveGame();
    },

    getDialogueText() {
        const store = Alpine.store('game');
        if (!store.dialogueActive) return '';
        if (store.dialogueText) return store.dialogueText;
        if (store.dialogueNpcId === 'Ellie') return store.tutorial.getStepText(store, store.tutorialStep);
        return '';
    },
    // These methods maintain compatibility with HTML templates while delegating logic to systems.

    t(key, context = 'ui', params = {}) { 
        const store = Alpine.store('game');
        let text = store.translations[store.language][context]?.[key] || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, v);
            });
        }
        return text; 
    },

    playSound(key) { Alpine.store('game').audio.playSound(key); },
    addLog(id, context = 'logs', color = null, params = {}) { 
        const store = Alpine.store('game');
        store.logger.addLog(store, id, context, color, params); 
    },

    saveGame(isManual = false) { 
        const store = Alpine.store('game');
        store.persistence.saveGame(store, isManual); 
    },

    loadGame() {
        const store = Alpine.store('game');
        if (store.persistence.loadGame(store)) {
            store.ui.calculateScale(store);
            return true;
        }
        return false;
    },

    setLanguage(lang) {
        const store = Alpine.store('game');
        store.language = lang;
        store.saveGame();
    },

    hardReset() { const store = Alpine.store('game'); store.persistence.hardReset(store); },
    exportSave() { const store = Alpine.store('game'); store.saveCode = store.persistence.exportGameData(store); },
    importSave() { const store = Alpine.store('game'); store.persistence.importGameData(store, store.saveCode); },
    updateAudio() { const store = Alpine.store('game'); store.audio.init(store.settings); },

    // --- VIEW LOGIC ---
    startNewGame() {
        const store = Alpine.store('game');
        if (store.hasSave) {
            if (!confirm(store.t('confirm_reset', 'ui'))) return;
        }
        store.resetStateToInitial();
        store.view = 'prologue';
        store.prologue.playIntro(store);
        store.hasSave = false;
        store.audio.startMusic();
        store.saveGame();
    },

    confirmName() {
        const store = Alpine.store('game');
        if (!store.playerName || store.playerName.trim() === '') return;
        store.showNamePrompt = false;
        const name = store.playerName;
        store.resetStateToInitial();
        store.playerName = name;
        store.view = 'prologue';
        store.prologue.playIntro(store);
        store.hasSave = false;
        store.audio.startMusic();
        store.saveGame();
    },

    continueGame() {
        const store = Alpine.store('game');
        if (store.persistence.loadGame(store)) {
            store.view = 'gameplay'; 
            store.audio.startMusic();
        }
    },

    resetStateToInitial() {
        const store = Alpine.store('game');
        localStorage.removeItem('wings_save');
        
        // Use the factory to get a clean state
        const cleanState = buildInitialState();
        
        Object.keys(cleanState).forEach(key => {
            if (key !== 'settings' && key !== 'language') {
                store[key] = JSON.parse(JSON.stringify(cleanState[key]));
            }
        });
    },

    // --- GAMEPLAY DELEGATES ---
    executeAction(id) { 
        const store = Alpine.store('game');
        const result = store.actions.execute(store, id); 
        if (result.success && store.ellieActive) {
            store.tutorial.handleAction(store, id);
        }
        return result;
    },
    npcExecute(id) { const store = Alpine.store('game'); return store.npc.execute(store, id); },
    toggleCompanion(id) { const store = Alpine.store('game'); store.npc.toggleCompanion(store, id); },
    consumeItem(id) { const store = Alpine.store('game'); store.item.consumeItem(store, id); },
    
    completeDemo() {
        const store = Alpine.store('game');
        store.view = 'finale';
        store.addLog('milestone_tree_of_life', 'logs', 'var(--accent-teal)');
        store.playSound('success');
        store.saveGame();
    },

    // --- UI HELPERS & GETTERS ---
    getActionEffect(hAction) { return this.ui.getActionEffect(this, hAction); },
    getTooltipCosts(hAction) { return this.ui.getTooltipCosts(this, hAction); },
    
    get energyPercent() { return this.ui.getEnergyPercent(this); },
    get magicPercent() { return this.ui.getMagicPercent(this); },
    get satiationPercent() { return this.ui.getSatiationPercent(this); },
    
    getSatiationMultiplier() { return this.resource.getSatiationMultiplier(this); },
    get efficiency() { return this.resource.getEfficiency(this); },

    get groupedHistory() { return this.story.getGroupedHistory ? this.story.getGroupedHistory(this) : []; },

    get canAccessTreeOfLife() {
        const store = Alpine.store('game');
        if (!store.housing.hasHouse) return false;
        
        // Requirements: Baker, Teacher, and Sage must be at max progress
        const requiredNpcs = ['npc-baker', 'npc-teacher', 'npc-sage'];
        const allNpcsDone = requiredNpcs.every(id => {
            const def = store.NPC_REGISTRY[id];
            return (store.npcProgress[def.progKey] || 0) >= def.maxProgress;
        });

        return allNpcsDone && (store.counters.study || 0) >= 3;
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
