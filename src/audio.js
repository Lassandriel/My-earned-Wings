/**
 * AudioManager.js
 * Handles preloading and playing game sound effects with pitch randomization.
 */

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.buffers = {};
    this.isMuted = false;
    this.masterVolume = 0.45;

    // Map of internal keys to asset paths
    this.sounds = {
      click: './audio/click.wav',
      success: './audio/success.ogg',
      error: './audio/error.ogg',
      gather: './audio/gather.wav',
      eat: './audio/eat.ogg'
    };
  }

  /**
   * Initialize the AudioContext (requires user interaction)
   */
  async init() {
    if (this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      await this.preloadAll();
      console.log('Audio system initialized.');
    } catch (e) {
      console.warn('Audio system failed to initialize:', e);
    }
  }

  /**
   * Preload all defined sounds
   */
  async preloadAll() {
    const promises = Object.entries(this.sounds).map(([key, url]) => this.loadSound(key, url));
    await Promise.all(promises);
  }

  async loadSound(key, url) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.buffers[key] = audioBuffer;
    } catch (e) {
      console.error(`Failed to load sound: ${key} (${url})`, e);
    }
  }

  /**
   * Play a sound with optional pitch randomization
   * @param {string} key - Sound key
   * @param {number} pitchVar - Amount of pitch variance (0 to 1)
   */
  play(key, pitchVar = 0) {
    if (this.isMuted || !this.audioContext || !this.buffers[key]) return;

    // Resume context if suspended (browser policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffers[key];

    // Gain node for volume control
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = this.masterVolume;

    // Pitch randomization
    if (pitchVar > 0) {
      // Random value between 1-pitchVar and 1+pitchVar
      const randomPitch = 1 + (Math.random() * 2 - 1) * pitchVar;
      source.playbackRate.value = randomPitch;
    }

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    source.start(0);
  }

  setVolume(val) {
    this.masterVolume = Math.max(0, Math.min(1, val));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const audio = new AudioManager();
