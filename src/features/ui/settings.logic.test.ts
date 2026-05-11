import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSettingsSystem } from './settings.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    language: 'de',
    settingsOpen: false,
    settings: { resolution: 'auto' },
    stats: { energy: 50, maxEnergy: 100, magic: 30, maxMagic: 100, satiation: 50, maxSatiation: 100 },
    resources: { wood: 5 },
    limits: { wood: 20 },
    ...overrides,
  } as any;
};

describe('Settings System', () => {
  let settings: ReturnType<typeof createSettingsSystem>;
  let mockUI: { cleanupHover: ReturnType<typeof vi.fn>; showToast: ReturnType<typeof vi.fn> };
  let mockPlaySound: ReturnType<typeof vi.fn>;
  let mockSaveGame: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    settings = createSettingsSystem();
    mockUI = { cleanupHover: vi.fn(), showToast: vi.fn() };
    mockPlaySound = vi.fn();
    mockSaveGame = vi.fn();
    (settings as any).setServices({
      ui: mockUI,
      playSound: mockPlaySound,
      t: (k: string) => k,
      saveGame: mockSaveGame,
    });
  });

  it('setLanguage updates state and triggers save', () => {
    const state = createMockState();
    settings.setLanguage(state, 'en');

    expect(state.language).toBe('en');
    expect(mockSaveGame).toHaveBeenCalled();
  });

  it('toggleSettings flips the modal and cleans up hover on close', () => {
    const state = createMockState({ settingsOpen: true });
    settings.toggleSettings(state);

    expect(state.settingsOpen).toBe(false);
    expect(mockUI.cleanupHover).toHaveBeenCalledWith(state);
    expect(mockPlaySound).toHaveBeenCalledWith('click');
  });

  it('toggleSettings does not clean up hover when opening', () => {
    const state = createMockState({ settingsOpen: false });
    settings.toggleSettings(state);

    expect(state.settingsOpen).toBe(true);
    expect(mockUI.cleanupHover).not.toHaveBeenCalled();
  });

  it('applyCheats maxes stats/resources and saves', () => {
    const state = createMockState();
    settings.applyCheats(state);

    expect(state.stats.energy).toBe(9999);
    expect(state.stats.magic).toBe(9999);
    expect(state.resources.wood).toBe(9999);
    expect(state.limits.wood).toBe(9999);
    expect(state.settingsOpen).toBe(false);
    expect(mockUI.showToast).toHaveBeenCalled();
    expect(mockSaveGame).toHaveBeenCalled();
  });
});
