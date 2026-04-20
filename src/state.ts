import de from './lang/de.js';
import en from './lang/en.js';

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
  hasSave: false,
  prologueStep: 1,
  settingsOpen: false,
  currentScale: 1,
  craftingSubView: 'all',
  showEllieIntro: false,
  
  // Dynamic Containers
  resources: {},
  limits: {},
  stats: {},
  flags: {},          
  npcProgress: {},    
  activeBuffs: {},
  
  // Lists
  upgrades: [],
  discoveredResources: [],
  discoveredItems: [],
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
    uiScale: 'auto'
  },
  
  counters: {
    totalActions: 0,
    study: 0
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
    energySpent: 0
  }
};

export const getTranslations = () => translations;
