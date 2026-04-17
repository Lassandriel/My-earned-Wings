import de from './lang/de.js';
import en from './lang/en.js';

const translations = { de, en };

export const initialState = {
  playerName: 'Entdecker',
  language: 'de',
  view: 'menu',
  hasSave: false,
  prologueStep: 0,
  settingsOpen: false,
  currentScale: 1,
  resources: {},
  limits: {},
  stats: {},
  housing: {
    hasCampfire: false,
    hasTent: false,
    hasWoodStorage: false,
    hasStoneStorage: false,
    hasHouse: false,
    hasTable: false,
    hasBookshelf: false,
    hasLandDeed: false,
    hasGarden: false
  },
  upgrades: [],
  discoveredResources: [],
  discoveredItems: [],
  unlockedRecipes: ['craft-wanderstock'],
  npcProgress: {},
  unlockedNPCs: ['npc-baker', 'npc-teacher', 'npc-hunter'],
  hoveredAction: null,
  companions: {},
  currentObjective: '',
  lastTick: Date.now(),
  logs: [],
  storyHistory: [],
  saveCode: '',
  settings: {
    volumeGlobal: 0.5,
    volumeMusic: 0.7,
    volumeSfx: 1.0,
    mute: false,
    activeTab: 'general',
    uiScale: 'auto'
  },
  counters: {
    totalActions: 0,
    study: 0
  },
  demoCompleted: false,
  demoCompletedHintSeen: false
};

export const getTranslations = () => translations;
