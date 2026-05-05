import { GameState } from '../../types/game';

// Declare Alpine globally for TS
declare const Alpine: any;

export const createAudioSystem = () => {
  // SFX Source Registry
  const sfxSources: Record<string, string> = {
    click: 'sfx/click.mp3',
    gather: 'sfx/gather.mp3',
    success: 'sfx/success.mp3',
    eat: 'sfx/eat.mp3',
    fail: 'sfx/fail.mp3',
  };

  // SFX Instance Cache
  const sfx: Record<string, HTMLAudioElement> = {};

  // Logical Aliases (Maps action keys to physical files)
  const sfxAliases: Record<string, string> = {
    magic: 'click',
    water: 'gather',
    craft: 'success',
    discovery: 'success',
  };

  const bgm = new Audio('music/forest_ambient.mp3');
  let isMusicPlaying = false;

  const minMax = (val: number) => Math.max(0, Math.min(1, val));

  const updateVolumes = (settings: {
    volumeGlobal: number;
    volumeMusic: number;
    volumeSfx: number;
    mute: boolean;
  }) => {
    const { volumeGlobal, volumeMusic, volumeSfx, mute } = settings;
    const globalMult = mute ? 0 : volumeGlobal;

    // Apply to loaded instances
    Object.keys(sfx).forEach((key) => {
      let mult = volumeSfx;
      if (key === 'fail') mult *= 0.3;
      sfx[key].volume = minMax(mult * globalMult);
    });

    bgm.volume = minMax(volumeMusic * globalMult);
  };

  const safePlay = (audio: HTMLAudioElement) => {
    if (!audio) return;
    audio.currentTime = 0;
    return audio.play().catch((e) => {
      if (e.name !== 'NotAllowedError') console.warn('SFX failed', e);
    });
  };

  return {
    metadata: { id: 'audio' },
    init(settings: any) {
      bgm.loop = true;
      updateVolumes(settings);
    },

    updateVolumes,

    playSound(key: string) {
      // Resolve alias if needed
      const actualKey = sfxAliases[key] || key;
      let source = sfxSources[actualKey];
      
      if (!source) {
        console.warn(`[AUDIO] Missing source for: ${key}. Falling back to click.`);
        source = sfxSources['click'];
      }

      // Lazy initialize
      if (!sfx[actualKey]) {
        sfx[actualKey] = new Audio(source);
        const game = Alpine.store('game') as unknown as GameState;
        if ((game as any)?.settings) updateVolumes((game as any).settings);
      }

      safePlay(sfx[actualKey]);
    },

    startMusic() {
      if (!isMusicPlaying) {
        bgm
          .play()
          .then(() => {
            isMusicPlaying = true;
          })
          .catch(() => {
            // Log but don't crash if BGM is blocked
            console.log('BGM blocked by browser policy. Interaction required.');
          });
      }
    },

    stopMusic() {
      bgm.pause();
      isMusicPlaying = false;
    },

    boot(store: GameState) {
      store.bus.on(store.EVENTS.SOUND_TRIGGERED, (data: { key: string }) => {
        this.playSound(data.key);
      });

      // Listen for settings updates to refresh volumes live
      const getSettings = () => (store as any).settings;
      store.bus.on(store.EVENTS.SAVE_REQUESTED, () => this.updateVolumes(getSettings()));
      store.bus.on(store.EVENTS.SETTINGS_UPDATED, () => this.updateVolumes(getSettings()));
    },
  };
};
