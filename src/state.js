import de from './lang/de.js';
import en from './lang/en.js';

const translations = { de, en };

/**
 * CORE 3.0 STATE DEFINITION
 * Minimal hardcoded state. Most properties are injected dynamically 
 * from registries during boot.
 */
export const initialState = {
  playerName: 'Entdecker',
  language: 'de',
  view: 'menu',
  hasSave: false,
  prologueStep: 0,
  settingsOpen: false,
  currentScale: 1,
  craftingSubView: 'all',
  isLooping: false,
  
  // Dynamic Containers
  resources: {},
  limits: {},
  stats: {},
  flags: {},          // Replaces hardcoded housing state
  npcProgress: {},    // Bond levels
  npcTrust: {},       // Special trust points
  activeBuffs: {},
  
  // Lists
  upgrades: [],
  discoveredResources: [],
  discoveredItems: [],
  unlockedRecipes: ['act-wanderstock'], // Using new ID prefix
  unlockedNPCs: ['npc-baker', 'npc-teacher', 'npc-hunter'],
  
  // HUD & UI
  hoveredAction: null,
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
  demoCompletedHintSeen: false
};

export const getTranslations = () => translations;
