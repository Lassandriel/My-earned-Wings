import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import { initialState, getTranslations } from './state.js';

Alpine.plugin(collapse);
import { registries } from './data/index.js';

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
import { createItemSystem } from './systems/item.js';
import { createPipelineSystem } from './systems/pipeline.js';
import { createEventBus, GAME_EVENTS } from './systems/bus.js';
import { createContentService } from './systems/content.js';

import './assets/styles/main.css';

window.Alpine = Alpine;

/**
 * CORE 3.0 STORE ASSEMBLY
 * Dynamically builds the game store based on registries.
 */
const buildInitialState = () => {
    const baseState = JSON.parse(JSON.stringify(initialState));
    
    // Auto-populate resources and stats from Registry
    Object.values(registries.resources).forEach(res => {
        if (res.type === 'resource') {
            baseState.resources[res.id] = res.initial || 0;
            baseState.limits[res.id] = res.initialLimit || 0;
        } else if (res.type === 'stat') {
            baseState.stats[res.id] = res.initial || 100;
            const maxKey = 'max' + res.id.charAt(0).toUpperCase() + res.id.slice(1);
            baseState.stats[maxKey] = res.initialMax || 100;
        }
    });

    // Auto-populate NPC data
    Object.values(registries.npcs).forEach(npc => {
        // Initial Progress
        if (npc.progKey && baseState.npcProgress[npc.progKey] === undefined) {
            baseState.npcProgress[npc.progKey] = 0;
        }
        // Initial Unlocks
        if (npc.unlockedAtStart && !baseState.unlockedNPCs.includes(npc.id)) {
            baseState.unlockedNPCs.push(npc.id);
        }
    });

    return baseState;
};

const dynamicInitialState = buildInitialState();

Alpine.store('game', {
    ...dynamicInitialState,
    translations: getTranslations(),
    RESOURCE_REGISTRY: registries.resources,
    saveInfoText: '',
    lastMouseX: 0,
    lastMouseY: 0,
    
    // Core Services
    content: createContentService(registries),
    
    // System Instances
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
    item: createItemSystem(),
    dialogue: createDialogueSystem(),
    pipeline: createPipelineSystem(),
    bus: createEventBus(),
    EVENTS: GAME_EVENTS,

    init() {
        const store = Alpine.store('game');
        
        // --- AUTO-LOAD SETTINGS (Global Preferences) ---
        store.persistence.loadSettings(store);
        
        // --- CONTENT VALIDATION (Delayed for better stability) ---
        setTimeout(() => {
            store.content.validate(store);
        }, 100);

        const hasSavedData = localStorage.getItem('wings_save');
        store.hasSave = !!hasSavedData;

        store.audio.init(store.settings);
        store.juice.init();
        
        // --- SYSTEM BOOT ---
        if (store.audio.boot) store.audio.boot(store);
        if (store.logger.boot) store.logger.boot(store);
        if (store.persistence.boot) store.persistence.boot(store);
        if (store.juice.boot) store.juice.boot(store);
        if (store.actions.boot) store.actions.boot(store);
        if (store.ui.boot) store.ui.boot(store);
        if (store.content.boot) store.content.boot(store);
        
        store.engine.init(store);
        
        store.ui.calculateScale(store);
        window.addEventListener('resize', () => store.ui.calculateScale(store));

        store.view = 'menu';

        const startMusicOnce = () => {
            store.audio.startMusic();
            document.removeEventListener('click', startMusicOnce);
        };
        document.addEventListener('click', startMusicOnce);
    },

    // --- PROXIES & DELEGATES ---
    startNewGame() { const store = Alpine.store('game'); store.ui.startNewGame(store, buildInitialState); },
    continueGame() { const store = Alpine.store('game'); store.ui.continueGame(store); },
    finishPrologue() { const store = Alpine.store('game'); store.ui.finishPrologue(store); },
    
    isTaskActive(id) { return !!this.activeTasks[id]; },
    
    executeAction(id) { const store = Alpine.store('game'); return store.actions.execute(store, id); },
    
    attemptAction(el, id) {
        if (this.isTaskActive(id)) return;
        const res = this.executeAction(id);
        if (res === false || (res && res.success === false)) {
            if (el) {
                el.classList.add('btn-shake');
                setTimeout(() => el.classList.remove('btn-shake'), 400);
            }
        }
        return res;
    },
    toggleFocus(id) {
        const store = Alpine.store('game');
        const action = store.content.get(id, 'actions');
        if (store.activeFocus === id) {
            store.activeFocus = null;
            store.playSound('click');
        } else {
            store.activeFocus = id;
            store.playSound('magic');
            if (action && action.isLoopable) {
                store.executeAction(id);
            }
        }
    },
    npcExecute(id) { const store = Alpine.store('game'); return store.npc.execute(store, id); },
    toggleCompanion(id) { const store = Alpine.store('game'); store.npc.toggleCompanion(store, id); },
    consumeItem(id) { const store = Alpine.store('game'); store.item.consumeItem(store, id); },
    
    saveGame(isManual = false) { this.bus.emit(this.EVENTS.SAVE_REQUESTED, { isManual }); },
    loadGame() { const store = Alpine.store('game'); return store.persistence.loadGame(store); },
    setLanguage(lang) { const store = Alpine.store('game'); store.language = lang; store.saveGame(); },
    hardReset() { const store = Alpine.store('game'); store.ui.hardReset(store); },
    
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

    playSound(key) { this.bus.emit(this.EVENTS.SOUND_TRIGGERED, { key }); },
    addLog(id, context = 'logs', color = null, params = {}) { 
        this.bus.emit(this.EVENTS.LOG_ADDED, { id, context, color, params }); 
    },

    completeDemo() {
        const store = Alpine.store('game');
        store.demoCompleted = true;
        store.view = 'gameplay'; // Return to gameplay but with modal on top
        store.addLog('milestone_tree_of_life', 'logs', 'var(--accent-teal)');
        store.playSound('success');
        store.saveGame();
    },

    // --- GETTERS ---
    getActionEffect(hAction) { return this.ui.getActionEffect(this, hAction); },
    getTooltipCosts(hAction) { return this.ui.getTooltipCosts(this, hAction); },
    setHovered(id, extra = null) {
        if (!id) { this.hoveredAction = null; return; }
        this.hoveredAction = extra ? { id, ...extra } : { id, data: this.content.get(id) };
    },
    get energyPercent() { return this.ui.getStatPercent(this, 'energy'); },
    get magicPercent() { return this.ui.getStatPercent(this, 'magic'); },
    get satiationPercent() { return this.ui.getStatPercent(this, 'satiation'); },
    
    get groupedHistory() { return this.story.getGroupedHistory(this); },
    getSatiationMultiplier() { return this.resource.getSatiationMultiplier(this); },
    get efficiency() { return this.resource.getEfficiency(this); }
});

Alpine.start();

// --- Event Listeners ---
document.addEventListener('keydown', (e) => {
    const store = Alpine.store('game');
    if (!store) return;

    if (e.key === 'Escape') {
        if (store.view === 'prologue') {
            store.prologue.skipPrologue(store);
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

    if (store.view !== 'menu' && store.view !== 'prologue' && !store.settingsOpen) {
        const SHORTCUTS = { '1': 'act-essen', '2': 'act-ausruhen', '3': 'act-meditieren' };
        if (SHORTCUTS[e.key]) store.executeAction(SHORTCUTS[e.key]);
    }
});

document.addEventListener('mousemove', (e) => {
    const store = Alpine.store('game');
    if (store && store.ui) store.ui.handleMouseMove(e, store);
});
