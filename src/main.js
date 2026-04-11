import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { actionDb } from './actions.js';

window.Alpine = Alpine;

Alpine.store('game', {
    ...initialState,
    actionDb,
    translations: getTranslations(),
    saveInfoText: 'Nie',

    init() {
        const loaded = this.loadGame();
        if (!this.hasSeenIntro && this.logs.length === 0) {
            this.playIntro();
        }
        // Auto-save every 5 minutes
        setInterval(() => { this.autoSave(); }, 5 * 60 * 1000);
    },

    t(key, context = 'ui') {
        return this.translations[this.language][context][key] || key;
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
            if (result && result.logKey) {
                const text = this.t(result.logKey, 'logs').replace('{gain}', result.logGain ?? '');
                this.addLog(text, result.logColor);
            }
            this.saveGame();
            return true;
        }
        // Log a helpful failure reason
        const costType = action.costType;
        let current = 0;
        if (costType === 'energy') current = this.stats.energy;
        else if (costType === 'magic') current = this.stats.magic;
        else if (costType === 'wood') current = this.resources.wood;
        else if (costType === 'stone') current = this.resources.stone;
        else if (costType === 'shards') current = this.resources.shards;

        if (costType === 'energy' && current < action.cost) {
            this.addLog(this.t('fail_energy', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (costType === 'magic' && current < action.cost) {
            this.addLog(this.t('fail_magic', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if ((costType === 'wood' || costType === 'stone') && current < action.cost) {
            this.addLog(this.t('fail_resources', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (id === 'action-wood' && this.resources.wood >= this.limits.wood) {
            this.addLog(this.t('fail_full_wood', 'logs'), 'rgba(239, 68, 68, 0.75)');
        } else if (id === 'action-stone' && this.resources.stone >= this.limits.stone) {
            this.addLog(this.t('fail_full_stone', 'logs'), 'rgba(239, 68, 68, 0.75)');
        }
        return false;
    },

    addLog(text, color) {
        let type = 'normal';
        if (color && color.includes('184, 166')) type = 'success';
        else if (color && color.includes('251, 191')) type = 'milestone';
        else if (color && color.includes('210, 180')) type = 'story';
        else if (color && color.includes('239, 68')) type = 'failure';
        this.logs.unshift({ text, color: color || 'rgba(226, 232, 240, 0.7)', type, id: Date.now() + Math.random() });
        if (this.logs.length > 40) this.logs.pop();
    },

    playIntro() {
        for (let i = 1; i <= 7; i++) {
            setTimeout(() => {
                // Story entries get a warm sepia color + italic via CSS
                this.addLog(this.t(`intro_${i}`, 'logs'), 'rgba(210, 180, 140, 0.85)');
                if (i === 7) this.hasSeenIntro = true;
            }, i * 2500);
        }
    },

    saveGame() {
        const saveObj = {};
        Object.keys(initialState).forEach(key => {
            saveObj[key] = this[key];
        });
        localStorage.setItem('wings_save', JSON.stringify(saveObj));
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.saveInfoText = `${this.t('save_at', 'ui')}${time}`;
    },

    autoSave() {
        this.saveGame();
        // Subtle auto-save indicator — update text only, no log noise
    },

    loadGame() {
        const saved = localStorage.getItem('wings_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.assign(this, data);
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                this.saveInfoText = `Geladen um ${time}`;
                return true;
            } catch (e) {
                console.warn('Save data corrupted, starting fresh.', e);
            }
        }
        return false;
    },

    get CIRCUMFERENCE() { return 251.32; },
    get energyOffset() { return this.CIRCUMFERENCE - (this.stats.energy / this.stats.maxEnergy) * this.CIRCUMFERENCE; },
    get magicOffset() { return this.CIRCUMFERENCE - (this.stats.magic / this.stats.maxMagic) * this.CIRCUMFERENCE; },
    get energyPercent() { return Math.max(0, Math.min(100, (this.stats.energy / this.stats.maxEnergy) * 100)); },
    get magicPercent() { return Math.max(0, Math.min(100, (this.stats.magic / this.stats.maxMagic) * 100)); }
});

Alpine.start();

// Track cursor position via CSS custom properties (bypasses Alpine for performance)
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
