import Alpine from 'alpinejs';
import { initialState, getTranslations } from './state.js';
import { actionDb } from './actions.js';
import { audio } from './audio.js';

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
<<<<<<< HEAD
        // Auto-save every 5 minutes
        setInterval(() => { this.autoSave(); }, 5 * 60 * 1000);

        // Global audio trigger for buttons
        document.addEventListener('mousedown', (e) => {
          if (e.target.closest('.game-btn')) {
            audio.init(); // Init on first interaction
            audio.play('click', 0.05);
          }
        });
=======
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
    },

    t(key, context = 'ui') {
        return this.translations[this.language][context][key] || key;
    },

    setLanguage(lang) {
        this.language = lang;
        this.saveGame();
    },

    executeAction(id, sourceEl) {
        const action = this.actionDb[id];
        if (!action) return;
        const result = action.execute(this);
        if (result === true || (result && result.success)) {
<<<<<<< HEAD
            if (result && result.isNpc) {
                const dialogues = this.t(result.npcId, 'actions').dialogues;
                if (dialogues && dialogues[result.logProgress]) {
                    this.addLog(dialogues[result.logProgress], 'rgba(210, 180, 140, 0.85)');
                }
                audio.play('success');
            } else if (result && result.logKey) {
                const text = this.t(result.logKey, 'logs').replace('{gain}', result.logGain ?? '');
                this.addLog(text, result.logColor);
                if (result.logColor && (result.logColor.includes('251, 191') || result.logColor.includes('184, 166'))) {
                    audio.play('success');
                }
            }

            // SFX triggers
            if (id.includes('wood') || id.includes('stone') || id.includes('herbs')) {
                audio.play('gather', 0.1);
            } else if (id.includes('essen') || id.includes('eat')) {
                audio.play('eat', 0.08);
            }

            // Juice: floating number
            if (result.floatText && sourceEl) {
                const r = sourceEl.getBoundingClientRect();
                window.spawnFloat(result.floatText, result.floatClass || 'float-xp', r.left + r.width / 2, r.top);
            }
            // Juice: button success pulse
            if (sourceEl) window.pulseBtn(sourceEl, true);
            // Buff countdown
            if (this.activeBuff && this.buffActionsLeft > 0) {
                this.buffActionsLeft--;
                if (this.buffActionsLeft === 0) this.activeBuff = null;
=======
            if (result.logKey) {
                this.addLog(this.t(result.logKey, 'logs').replace('{gain}', result.logGain || ''));
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
            }
            this.saveGame();
            return true;
        }
<<<<<<< HEAD
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
        audio.play('error');
=======
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
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
<<<<<<< HEAD
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.saveInfoText = `${this.t('save_at', 'ui')}${time}`;
        window.showSaveToast?.('✦  ' + this.t('save_at', 'ui') + time);
    },

    autoSave() {
        this.saveGame();
    },

    hardReset() {
        const confirmed = window.confirm(
            this.language === 'de'
              ? '⚠️ Wirklich alles zurücksetzen? Dein gesamter Fortschritt wird gelöscht!'
              : '⚠️ Really reset everything? All your progress will be lost!'
        );
        if (!confirmed) return;
        localStorage.removeItem('wings_save');
        document.getElementById('modal-settings').style.display = 'none';
        window.location.reload();
=======
        this.saveInfoText = `${this.t('save_at', 'ui')}${new Date().toLocaleTimeString()}`;
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
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
<<<<<<< HEAD
    get magicOffset() { return this.CIRCUMFERENCE - (this.stats.magic / this.stats.maxMagic) * this.CIRCUMFERENCE; },
    get energyPercent() { return Math.max(0, Math.min(100, (this.stats.energy / this.stats.maxEnergy) * 100)); },
    get magicPercent() { return Math.max(0, Math.min(100, (this.stats.magic / this.stats.maxMagic) * 100)); },

    get inventoryDisplay() {
        const counts = {};
        for (const id of this.inventory) {
            counts[id] = (counts[id] || 0) + 1;
        }
        return Object.entries(counts).map(([id, count]) => ({ id, count }));
    }
});

Alpine.start();

// ─── Track cursor for tooltip CSS vars ───────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

// ─── Juice: Floating resource numbers ────────────────────────────────────────
window.spawnFloat = function(text, colorClass, x, y) {
  const el = document.createElement('div');
  el.className = `float-number ${colorClass}`;
  el.textContent = text;
  el.style.left = `${x - 20}px`;
  el.style.top  = `${y - 10}px`;
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
};

// ─── Juice: Button success / fail pulse ──────────────────────────────────────
window.pulseBtn = function(el, success) {
  const cls = success ? 'btn-success' : 'btn-fail';
  el.classList.remove('btn-success', 'btn-fail', 'btn-shake');
  void el.offsetWidth; // reflow to restart
  el.classList.add(cls);
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true });
};

// ─── UX: Save toast ──────────────────────────────────────────────────────────
window.showSaveToast = function(text = '✦ Saved') {
  const toast = document.getElementById('save-toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  toast.addEventListener('animationend', () => toast.classList.remove('show'), { once: true });
};
=======
    get magicOffset() { return this.CIRCUMFERENCE - (this.stats.magic / this.stats.maxMagic) * this.CIRCUMFERENCE; }
});

Alpine.start();
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
