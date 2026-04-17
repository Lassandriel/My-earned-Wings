export const createAudioSystem = () => {
  const sfx = {
    click: new Audio('sfx/click.mp3'),
    gather: new Audio('sfx/gather.mp3'),
    success: new Audio('sfx/success.mp3'),
    eat: new Audio('sfx/eat.mp3'),
    fail: new Audio('sfx/fail.mp3'),
    water: new Audio('sfx/water.mp3'),
    craft: new Audio('sfx/craft.mp3'),
    discovery: new Audio('sfx/success.mp3')
  };
  const bgm = new Audio('music/forest_ambient.mp3');
  let isMusicPlaying = false;

  const updateVolumes = (settings) => {
    const { volumeGlobal, volumeMusic, volumeSfx, mute } = settings;
    const globalMult = mute ? 0 : volumeGlobal;

    Object.entries(sfx).forEach(([key, s]) => {
      let mult = volumeSfx;
      if (key === 'fail') mult *= 0.3;
      s.volume = minMax(mult * globalMult);
    });

    bgm.volume = minMax(volumeMusic * globalMult);
  };

  const minMax = (val) => Math.max(0, Math.min(1, val));

  return {
    init(settings) {
      bgm.loop = true;
      updateVolumes(settings);
    },

    updateVolumes,

    playSound(key) {
      if (sfx[key]) {
        sfx[key].currentTime = 0;
        sfx[key].play().catch(e => console.warn("SFX playback blocked", e));
      }
    },

    startMusic() {
      if (!isMusicPlaying) {
        bgm.play()
          .then(() => { isMusicPlaying = true; })
          .catch(e => console.warn("BGM playback blocked. Waiting for interaction.", e));
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
    }
  };
};
