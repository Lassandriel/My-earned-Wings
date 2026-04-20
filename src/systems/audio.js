export const createAudioSystem = () => {
  // SFX Source Registry
  const sfxSources = {
    click: 'sfx/click.mp3',
    gather: 'sfx/gather.mp3',
    success: 'sfx/success.mp3',
    eat: 'sfx/eat.mp3',
    fail: 'sfx/fail.mp3'
  };

  // SFX Instance Cache
  const sfx = {};
  
  // Logical Aliases (Maps action keys to physical files)
  const sfxAliases = {
    magic: 'click',
    water: 'gather',
    craft: 'success',
    discovery: 'success'
  };

  const bgm = new Audio('music/forest_ambient.mp3');
  let isMusicPlaying = false;

  const updateVolumes = (settings) => {
    const { volumeGlobal, volumeMusic, volumeSfx, mute } = settings;
    const globalMult = mute ? 0 : volumeGlobal;

    // Apply to loaded instances
    Object.keys(sfx).forEach(key => {
      let mult = volumeSfx;
      if (key === 'fail') mult *= 0.3;
      sfx[key].volume = minMax(mult * globalMult);
    });

    bgm.volume = minMax(volumeMusic * globalMult);
  };

  const minMax = (val) => Math.max(0, Math.min(1, val));

    const safePlay = (audio) => {
      if (!audio) return;
      audio.currentTime = 0;
      return audio.play().catch(e => {
        if (e.name !== 'NotAllowedError') console.warn("SFX failed", e);
      });
    };

    return {
      init(settings) {
        bgm.loop = true;
        updateVolumes(settings);
      },

      updateVolumes,

      playSound(key) {
        // Resolve alias if needed
        const actualKey = sfxAliases[key] || key;
        const source = sfxSources[actualKey];
        if (!source) return;

        // Lazy initialize
        if (!sfx[actualKey]) {
            sfx[actualKey] = new Audio(source);
            // Volume update logic would go here, but we can just use store settings
            const game = Alpine.store('game');
            if (game?.settings) updateVolumes(game.settings);
        }

        safePlay(sfx[actualKey]);
      },

      startMusic() {
        if (!isMusicPlaying) {
          bgm.play()
            .then(() => { isMusicPlaying = true; })
            .catch(() => {
               // Log but don't crash if BGM is blocked
               console.log("BGM blocked by browser policy. Interaction required.");
            });
        }
      },

    stopMusic() {
      bgm.pause();
      isMusicPlaying = false;
    },

    boot(store) {
      store.bus.on(store.EVENTS.SOUND_TRIGGERED, (data) => {
        this.playSound(data.key);
      });

      // Listen for settings updates to refresh volumes live
      store.bus.on(store.EVENTS.SAVE_REQUESTED, () => this.updateVolumes(store.settings));
      store.bus.on(store.EVENTS.SETTINGS_UPDATED, () => this.updateVolumes(store.settings));
    }
  };
};
