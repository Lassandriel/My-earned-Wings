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
        this.loadGame();
        if (!this.hasSeenIntro && this.logs.length === 0) {
            this.playIntro();
        }
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
            if (result.logKey) {
                this.addLog(this.t(result.logKey, 'logs').replace('{gain}', result.logGain || ''));
            }
            this.saveGame();
            return true;
        }
        return false;
    },

    addLog(text, color = 'rgba(226, 232, 240, 0.9)') {
        this.logs.unshift({ text, color, id: Date.now() + Math.random() });
        if (this.logs.length > 40) this.logs.pop();
    },

    playIntro() {
        for (let i = 1; i <= 7; i++) {
            setTimeout(() => {
                this.addLog(this.t(`intro_${i}`, 'logs'));
                if (i === 7) this.hasSeenIntro = true;
            }, i * 2500);
        }
    },

    saveGame() {
        // We save the plain state without functions
        const saveObj = {};
        Object.keys(initialState).forEach(key => {
            saveObj[key] = this[key];
        });
        localStorage.setItem('wings_save', JSON.stringify(saveObj));
        this.saveInfoText = `${this.t('save_at', 'ui')}${new Date().toLocaleTimeString()}`;
    },

    loadGame() {
        const saved = localStorage.getItem('wings_save');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(this, data);
            this.saveInfoText = `Geladen`;
            return true;
        }
        return false;
    },

    get CIRCUMFERENCE() { return 251.32; },
    get energyOffset() { return this.CIRCUMFERENCE - (this.stats.energy / this.stats.maxEnergy) * this.CIRCUMFERENCE; },
    get magicOffset() { return this.CIRCUMFERENCE - (this.stats.magic / this.stats.maxMagic) * this.CIRCUMFERENCE; }
});

Alpine.start();
