export const createAudioSystem = () => ({
  sfx: {
    click: new Audio('sfx/click.mp3'),
    gather: new Audio('sfx/gather.mp3'),
    success: new Audio('sfx/success.mp3'),
    eat: new Audio('sfx/eat.mp3'),
    fail: new Audio('sfx/fail.mp3')
  },

  init() {
    Object.values(this.sfx).forEach(s => s.volume = 0.4);
  },

  playSound(key) {
    if (this.sfx[key]) {
      this.sfx[key].currentTime = 0;
      this.sfx[key].play().catch(e => console.warn("Audio playback blocked", e));
    }
  }
});
