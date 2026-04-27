import de from './lang/de';
import en from './lang/en';

const translations: Record<string, any> = { de, en };

/**
 * CORE 3.5 STATE DEFINITION - TypeScript Edition
 * Minimal hardcoded state. Most properties are injected dynamically
 * from registries during boot.
 */
export const initialState: any = {
  playerName: '',
  language: 'de',
  view: 'menu',
  currentLocation: 'forest',
  hasSave: false,
  prologueStep: 1,
  settingsOpen: false,
  currentScale: 1,
  craftingSubView: 'all',
  showEllieIntro: false,
  ellieIntroSeen: false,
  selectedStoryNpc: 'world',
  activeHome: null,

  // Dynamic Containers
  resources: {},
  limits: {},
  stats: {},
  flags: {},
  npcProgress: {},
  activeBuffs: {},
  activeProducers: [], // NEW

  // Lists
  upgrades: [],
  discoveredResources: [],
  discoveredItems: [],
  placedItems: [], // NEW: Track which furniture is currently active
  unlockedRecipes: [],
  unlockedNPCs: [],

  // HUD & UI
  hoveredAction: null,
  selectedItem: null,
  confirmModal: { open: false, message: '', onConfirm: null },
  activeFocus: null,
  currentObjective: '',
  logs: [],
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
    return this.persistence.exportGameData(this);
  },

  quit() {
    if (window.electronAPI) {
      window.electronAPI.quitApp();
    } else {
      console.warn('Quit only works in Electron');
      this.returnToMenu();
      this.settingsOpen = false;
    }
  },
};

export const getTranslations = () => translations;
