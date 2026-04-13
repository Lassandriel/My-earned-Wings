import de from './lang/de.js';
import en from './lang/en.js';

const translations = { de, en };

export const initialState = {
  playerName: 'Entdecker',
  language: 'de',
  view: 'story',
<<<<<<< HEAD
  resources: { wood: 0, stone: 0, shards: 0, herbs: 0, meat: 0 },
  limits: { wood: 10, stone: 10, herbs: 5, meat: 5 },
  stats: { energy: 100, maxEnergy: 100, magic: 100, maxMagic: 100, satiation: 80, maxSatiation: 100 },
=======
  resources: { wood: 0, stone: 0, shards: 0 },
  limits: { wood: 10, stone: 10 },
  stats: { energy: 30, maxEnergy: 100, magic: 60, maxMagic: 100 },
>>>>>>> parent of 47ec199 (feat: initialize game project structure with core mechanics, state management, and documentation)
  housing: {
    hasCampfire: false,
    hasTent: false,
    hasWoodStorage: false,
    hasStoneStorage: false,
    hasHouse: false,
    hasTable: false,
    hasStove: false,
    laborCount: 0,
    hasLandDeed: false
  },
  inventory: [],
  unlockedRecipes: ['craft-wanderstock'],
  npcProgress: {
    baker: 0,
    flowerGirl: 0,
    teacher: 0,
    artisan: 0,
    townHall: 0,
    blacksmith: 0,
    sage: 0
  },
  unlockedNPCs: ['npc-baker', 'npc-teacher'],
  hoveredAction: null,
  hasSeenIntro: false,
  activeFeather: 1,
  activeBuff: null,
  buffActionsLeft: 0,
  logs: []
};

export const getTranslations = () => translations;
