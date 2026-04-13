import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { actionDb } from './data/actions/index.js';
import { createAudioSystem } from './systems/audio.js';
import { createPersistenceSystem } from './systems/persistence.js';
import { createLoggerSystem } from './systems/logger.js';

window.Alpine = Alpine;

Alpine.store('game', {
    ...initialState,
    actionDb,
    translations: getTranslations(),
    saveInfoText: 'Nie',
    
    // Systems
    audio: createAudioSystem(),
    persistence: createPersistenceSystem(initialState),
    logger: createLoggerSystem(),

    init() {
        this.audio.init();
        const loaded = this.persistence.loadGame(this);
        
        if (!this.hasSeenIntro && this.logs.length === 0) {
            this.playIntro();
        }

        // Auto-save every 5 minutes
        setInterval(() => { this.persistence.saveGame(this); }, 5 * 60 * 1000);
    },

    // Proxies for UI convenience
    playSound(key) { this.audio.playSound(key); },
    t(key, context = 'ui') { return this.translations[this.language][context][key] || key; },
    addLog(text, color) { this.logger.addLog(this, text, color); },
    saveGame() { this.persistence.saveGame(this); },
    hardReset() { this.persistence.hardReset(this); },

    setLanguage(lang) {
        this.language = lang;
        this.saveGame();
    },

    executeAction(id) {
        const action = this.actionDb[id];
        if (!action) return;
        
        const result = action.execute(this);
        if (result === true || (result && result.success)) {
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

    handleActionSuccess(id) {
        if (id.startsWith('action-wood') || id.startsWith('action-stone') || id === 'action-hunt') {
            this.playSound('gather');
        } else if (id === 'action-essen') {
            this.playSound('eat');
        } else if (id.startsWith('craft-') || id.startsWith('house-')) {
            this.playSound('success');
        } else {
            this.playSound('click');
        }
    },

    handleActionFailure(id, action) {
        this.playSound('fail');
        const costType = action.costType;
        let current = 0;
        
        if (costType === 'energy') current = this.stats.energy;
        else if (costType === 'magic') current = this.stats.magic;
        else if (costType === 'wood') current = this.resources.wood;
        else if (costType === 'stone') current = this.resources.stone;
        else if (costType === 'shards') current = this.resources.shards;
        else if (costType === 'meat') current = this.resources.meat;

        if (costType === 'energy' && current < action.cost) {
            this.addLog(this.t('fail_energy', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (costType === 'magic' && current < action.cost) {
            this.addLog(this.t('fail_magic', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (['wood', 'stone', 'meat', 'shards'].includes(costType) && current < action.cost) {
            this.addLog(this.t('fail_resources', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (id === 'action-wood' && this.resources.wood >= this.limits.wood) {
            this.addLog(this.t('fail_full_wood', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (id === 'action-stone' && this.resources.stone >= this.limits.stone) {
            this.addLog(this.t('fail_full_stone', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if ((id === 'action-hunt' || id === 'action-buy-meat') && this.resources.meat >= this.limits.meat) {
            this.addLog(this.t('fail_full_meat', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (this.resources.shards >= this.limits.shards && (id.startsWith('action-sell') || id === 'action-work')) {
            this.addLog(this.t('fail_full_shards', 'logs'), 'rgba(239, 68, 68, 0.75)');
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
    get magicPercent() { return Math.max(0, Math.min(100, (this.stats.magic / this.stats.maxMagic) * 100)); }
});

Alpine.start();

document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
