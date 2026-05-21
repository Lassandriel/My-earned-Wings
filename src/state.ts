import { GameState, Translations, LanguageCode } from './types/game';
import { TRANSLATIONS_GENERATED } from './generated/content';

// Translations are now YAML-generated (Phase 1.5).
// Run `npm run build:content` after editing content/i18n/**/*.yaml.
const translations = TRANSLATIONS_GENERATED as unknown as Record<LanguageCode, Translations[LanguageCode]>;

/**
 * CORE 3.5 STATE DEFINITION - TypeScript Edition
 * Minimal hardcoded state. Most properties are injected dynamically
 * from registries during boot.
 */
export const initialState: Partial<GameState> = {
  playerName: '',
  language: 'de',
  view: 'menu',
  currentLocation: 'village',
  currentMainSubTab: 'general',
  hasSave: false,
  prologueStep: 1,
  currentScale: 1,
  craftingSubView: 'all',
  showEllieIntro: false,
  ellieIntroSeen: false,
  selectedStoryNpc: 'world',
  activeHome: null,
  activeTitle: null,
  sidebarCollapsed: false,

  // Dynamic Containers
  resources: {},
  limits: {},
  stats: {},
  flags: {
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
  collectionHistory: [],
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
  },

  academy_path: null, // dead in demo; reintroduced with the Vandara addon
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
};

export const getTranslations = () => translations;
