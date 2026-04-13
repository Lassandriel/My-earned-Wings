export const createAudioSystem = () => ({
  sfx: {
    click: new Audio('sfx/click.mp3'),
    gather: new Audio('sfx/gather.mp3'),
    success: new Audio('sfx/success.mp3'),
    eat: new Audio('sfx/eat.mp3'),
    fail: new Audio('sfx/fail.mp3')
  },
  bgm: new Audio('music/forest_ambient.mp3'),
  isMusicPlaying: false,

  init(settings) {
    this.bgm.loop = true;
    this.updateVolumes(settings);
  },

  updateVolumes(settings) {
    const { volumeGlobal, volumeMusic, volumeSfx, mute } = settings;
    const globalMult = mute ? 0 : volumeGlobal;

    // Update SFX
    Object.entries(this.sfx).forEach(([key, s]) => {
      let mult = volumeSfx;
      if (key === 'fail') mult *= 0.3; // Make fail sound much quieter
      s.volume = mult * globalMult;
    });

    // Update BGM
    this.bgm.volume = volumeMusic * globalMult;
  },

  playSound(key) {
    if (this.sfx[key]) {
      this.sfx[key].currentTime = 0;
      this.sfx[key].play().catch(e => console.warn("SFX playback blocked", e));
    }
  },

  startMusic() {
    if (!this.isMusicPlaying) {
      this.bgm.play()
        .then(() => { this.isMusicPlaying = true; })
        .catch(e => console.warn("BGM playback blocked. Waiting for interaction.", e));
    }
  },

  stopMusic() {
    this.bgm.pause();
    this.isMusicPlaying = false;
  }
});
