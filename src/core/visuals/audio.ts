import { GameState } from '../../types/game';
import { makeLogger } from '../log';
import { ADDON_SFX_GENERATED } from '../../generated/addon-sfx';

const log = makeLogger('AUDIO');

// Declare Alpine globally for TS
declare const Alpine: {
  store: <T = any>(name: string, value?: T) => T;
};

export const createAudioSystem = () => {
  // SFX Source Registry. Keys are either bare names (base sfx) or
  // `<addon>/<file>` (addon sfx, namespaced to prevent collisions).
  // YAML refers to sfx by key; the audio engine resolves the URL here.
  const sfxSources: Record<string, string> = {
    click: 'sfx/click.mp3',
    gather: 'sfx/gather.mp3',
    success: 'sfx/success.mp3',
    eat: 'sfx/eat.mp3',
    fail: 'sfx/fail.mp3',
  };

  // Build-time addon SFX. Scanned out of content/addons/<name>/sfx/
  // by build-content.ts and copied into public/sfx/addons/<name>/.
  // Each entry exposes { key, addonName, fileName, url } — we only
  // need the key/url pair here. Runtime-addon SFX are added later via
  // registerAddonSfx() once the IPC payload arrives.
  for (const entry of Object.values(ADDON_SFX_GENERATED)) {
    sfxSources[entry.key] = entry.url;
  }

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

  // Clamp to [0, 1] and treat NaN/Infinity as silent. Without the Number.isFinite
  // guard, a corrupted-settings save would propagate NaN into audio.volume,
  // which the HTMLMediaElement spec rejects with a TypeError that crashes
  // the whole audio init. Defensive: better silent than dead audio system.
  const minMax = (val: number) => (Number.isFinite(val) ? Math.max(0, Math.min(1, val)) : 0);

  const updateVolumes = (settings: {
    volumeGlobal: number;
    volumeMusic: number;
    volumeSfx: number;
    mute: boolean;
  } | undefined | null) => {
    // Guard: settings can be undefined during early boot if init() races
    // with the Alpine settings-store registration. Defaults are safe and
    // the next SETTINGS_UPDATED event will sync the real values in.
    if (!settings) return;
    const { volumeGlobal, volumeMusic, volumeSfx, mute } = settings;
    const globalMult = mute ? 0 : volumeGlobal;

    // Apply to loaded instances
    Object.keys(sfx).forEach((key) => {
      const audio = sfx[key];
      if (!audio) return;
      let mult = volumeSfx;
      if (key === 'fail') mult *= 0.3;
      audio.volume = minMax(mult * globalMult);
    });

    bgm.volume = minMax(volumeMusic * globalMult);
  };

  const safePlay = (audio: HTMLAudioElement) => {
    if (!audio) return;
    audio.currentTime = 0;
    return audio.play().catch((e) => {
      if (e.name !== 'NotAllowedError') log.warn('SFX failed', e);
    });
  };

  return {
    metadata: { id: 'audio' },
    init(settings: any) {
      bgm.loop = true;
      updateVolumes(settings);
    },

    updateVolumes,

    /**
     * Register addon SFX dynamically. Used by runtime-addons.ts after
     * the IPC payload arrives. `entries` is keyed by full sfx key
     * (`<addon>/<file>` minus extension) → resolvable URL (file path
     * for build-time, data: URL for runtime). Existing keys are
     * preserved with a warning so base + build-time addons always win.
     */
    registerAddonSfx(entries: Record<string, string>) {
      for (const [key, url] of Object.entries(entries)) {
        if (key in sfxSources) {
          log.warn(`SFX key "${key}" already registered — skipping addon entry`);
          continue;
        }
        sfxSources[key] = url;
      }
    },

    playSound(key: string) {
      // Resolve alias if needed
      const actualKey = sfxAliases[key] || key;
      let source = sfxSources[actualKey];
      
      if (!source) {
        log.warn(`Missing source for: ${key}. Falling back to click.`);
        source = sfxSources['click'];
      }

      // Lazy initialize
      if (!sfx[actualKey]) {
        sfx[actualKey] = new Audio(source);
        const game = Alpine.store<GameState>('game');
        if (game?.settings) updateVolumes(game.settings);
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
            log.info('BGM blocked by browser policy. Interaction required.');
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
      const getSettings = () => store.settings;
      store.bus.on(store.EVENTS.SAVE_REQUESTED, () => this.updateVolumes(getSettings()));
      store.bus.on(store.EVENTS.SETTINGS_UPDATED, () => this.updateVolumes(getSettings()));
    },
  };
};
