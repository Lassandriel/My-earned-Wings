import de from './lang/de';
import en from './lang/en';
import { GameState, Translations, LanguageCode } from './types/game';

const translations: Record<LanguageCode, Translations[LanguageCode]> = { de, en };

/**
 * CORE 3.5 STATE DEFINITION - TypeScript Edition
 * Minimal hardcoded state. Most properties are injected dynamically
 * from registries during boot.
 */
export const initialState: Partial<GameState> = {
  playerName: '',
  language: 'de',
  view: 'menu',
  currentLocation: 'forest',
  hasSave: false,
  prologueStep: 1,
  currentScale: 1,
  craftingSubView: 'all',
  showEllieIntro: false,
  ellieIntroSeen: false,
  selectedStoryNpc: 'world',
  activeHome: null,
  activeTitle: null,

  // Dynamic Containers
  resources: {},
  limits: {},
  stats: {},
  flags: {
    school_unlocked: false,
    school_graduate: false,
    vandara_unlocked: false,
    academy_phase_1: false,
    academy_phase_2: false,
    academy_graduate: false,
    'unlocked-library': false,
    'read_book_1_complete': false,
    'read_book_2_complete': false,
  },
  npcProgress: {},
  activeBuffs: {},
  activeProducers: [], // NEW

  // Lists
  upgrades: [],
  discoveredResources: [],
  discoveredItems: [],
  placedItems: [], // NEW: Track which furniture is currently active
  unlockedRecipes: [],
  discoveredTitles: [],
  unlockedNPCs: [],

  // HUD & UI
  selectedItem: null,
  activeFocus: null,
  currentObjective: '',
  storyHistory: [],
  saveCode: '',
  saveInfoText: '',

  settings: {
    volumeGlobal: 0.5,
    volumeMusic: 0.7,
    volumeSfx: 1.0,
    mute: false,
    showParticles: true,
    showJuice: true,
    uiScale: 'auto',
    resolution: 'auto',
  },

  counters: {
    totalActions: 0,
    study: 0,
  },

  academy_path: null, // 'solen' | 'bram' | 'lyra'
  activeTasks: {},
  demoCompleted: false,
  demoCompletedHintSeen: false,
  dialogueActive: false,
  dialogueNpcId: null,
  dialogueText: '',
  dialogueTitle: '',
  dialogueChoices: [],
  dialogueWaiting: false,

  finalStats: {
    shards: 0,
    actions: 0,
    npcs: 0,
    items: 0,
    energySpent: 0,
  },

  exportGameData() {
    return (this as GameState).persistence.exportGameData(this as GameState);
  },

  quit() {
    const store = this as unknown as GameState;
    if (window.electronAPI) {
      window.electronAPI.quitApp();
    } else {
      console.warn('Quit only works in Electron');
      store.returnToMenu();
      store.settingsOpen = false;
    }
  },
};

export const getTranslations = () => translations;
