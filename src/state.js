import de from './lang/de.js';
import en from './lang/en.js';

const translations = { de, en };

export const initialState = {
  playerName: 'Entdecker',
  language: 'de',
  view: 'story',
  resources: { wood: 0, stone: 0, shards: 0, meat: 0 },
  limits: { wood: 10, stone: 10, meat: 10, shards: 1000 },
  stats: { energy: 100, maxEnergy: 100, magic: 100, maxMagic: 100 },
  housing: {
    hasCampfire: false,
    hasTent: false,
    hasWoodStorage: false,
    hasStoneStorage: false,
    hasHouse: false,
    hasTable: false,
    hasBookshelf: false,
    laborCount: 0,
    hasLandDeed: false
  },
  inventory: [],
  unlockedRecipes: ['craft-wanderstock', 'craft-axe', 'craft-pickaxe', 'craft-bed', 'craft-chair', 'craft-stove', 'craft-bookshelf'],
  npcProgress: {
    baker: 0,
    flowerGirl: 0,
    teacher: 0,
    artisan: 0,
    townHall: 0,
    blacksmith: 0,
    sage: 0,
    hunter: 0
  },
  unlockedNPCs: ['npc-baker', 'npc-teacher', 'npc-hunter'],
  hoveredAction: null,
  hasSeenIntro: false,
  activeFeather: 1,
  logs: []
};

export const getTranslations = () => translations;
