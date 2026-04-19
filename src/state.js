import de from './lang/de.js';
import en from './lang/en.js';

const translations = { de, en };

/**
 * CORE 3.0 STATE DEFINITION
 * Minimal hardcoded state. Most properties are injected dynamically 
 * from registries during boot.
 */
export const initialState = {
  playerName: '',
  language: 'de',
  view: 'menu',
  hasSave: false,
  prologueStep: 1,
  settingsOpen: false,
  currentScale: 1,
  craftingSubView: 'all',
  
  // Dynamic Containers
  resources: {},
  limits: {},
  stats: {},
  flags: {},          // Replaces hardcoded housing state
  npcProgress: {},    // Tracks individual NPC story progress
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
  
  settings: {
    volumeGlobal: 0.5,
    volumeMusic: 0.7,
    volumeSfx: 1.0,
    mute: false,
    showParticles: true,
    showJuice: true
  },
  
  counters: {
    totalActions: 0,
    study: 0
  },
  
  activeTasks: {},
  demoCompleted: false,
  demoCompletedHintSeen: false,
  dialogueActive: false
};

export const getTranslations = () => translations;
