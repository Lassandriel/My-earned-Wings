import './index.css';
import de from './lang/de.js';
import en from './lang/en.js';

const translations = { de, en };

// Initial Game State
const state = {
  playerName: 'Entdecker',
  language: 'de', 
  view: 'story',
  resources: { wood: 0, stone: 0, shards: 0 },
  limits: { wood: 10, stone: 10 },
  stats: { energy: 30, maxEnergy: 100, magic: 60, maxMagic: 100 },
  housing: {
    hasCampfire: false,
    hasTent: false,
    hasWoodStorage: false,
    hasStoneStorage: false,
    hasHouse: false,
    hasTable: false,
    laborCount: 0,
    hasLandDeed: false
  },
  inventory: [],
  unlockedRecipes: ['craft-wanderstock', 'craft-bed', 'craft-chair'],
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
  hasSeenIntro: false
};

const els = {
  views: { 
    story: document.getElementById('view-story'), 
    housing: document.getElementById('view-housing'),
    crafting: document.getElementById('view-crafting'),
    inventory: document.getElementById('view-inventory'),
    village: document.getElementById('view-village')
  },
  rings: { energy: document.getElementById('ring-energy'), magic: document.getElementById('ring-magic') },
  vals: { 
    energy: document.getElementById('val-energy'), 
    magic: document.getElementById('val-magic'), 
    wood: document.getElementById('inv-wood'), 
    stone: document.getElementById('inv-stone'),
    shards: document.getElementById('inv-shards')
  },
  details: { 
    panel: document.getElementById('detail-panel'),
    title: document.getElementById('detail-title'), 
    cost: document.getElementById('detail-cost'), 
    effect: document.getElementById('detail-effect'),
    req: document.getElementById('detail-req'), 
    desc: document.getElementById('detail-desc') 
  },
  gameLog: document.getElementById('game-log'),
  housingActionsList: document.getElementById('housing-actions-list'),
  craftingList: document.getElementById('crafting-list'),
  inventoryList: document.getElementById('inventory-list'),
  villageNpcList: document.getElementById('village-npc-list'),
  tradeList: document.getElementById('story-trade-list'),
  saveInfo: document.getElementById('save-info'),
  displayName: document.getElementById('display-player-name')
};

const CIRCUMFERENCE = 251.32;

// --- LOCALIZATION HELPER ---

function t(key, context = 'ui') {
  return translations[state.language][context][key] || key;
}

globalThis.setLanguage = (lang) => {
  state.language = lang;
  document.querySelectorAll('[data-lang-key]').forEach(el => {
    el.textContent = t(el.getAttribute('data-lang-key'), 'ui');
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id.includes(lang));
  });
  updateUI();
};

// --- ACTION DATABASE ---

const actionDb = {
  'action-essen': { 
    cost: 0, costType: 'energy',
    execute: () => { state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + 5); return true; }
  },
  'action-ausruhen': { 
    cost: 0, costType: 'energy',
    execute: () => {
      let gain = 10;
      if (state.housing.hasCampfire) gain += 10;
      if (state.housing.hasTent) gain += 15;
      if (state.inventory.includes('craft-bed')) gain += 25;
      state.stats.energy = Math.min(state.stats.maxEnergy, state.stats.energy + gain);
      return true;
    }
  },
  'action-meditieren': { 
    cost: 0, costType: 'energy',
    execute: () => { state.stats.magic = Math.min(state.stats.maxMagic, state.stats.magic + 15); return true; }
  },
  'action-study': { 
    cost: 20, costType: 'magic',
    execute: () => {
      if (state.stats.magic >= 20) {
        state.stats.magic -= 20; 
        const gain = state.inventory.includes('craft-chair') ? 10 : 5;
        state.stats.maxMagic += gain;
        addLog(t('study_success', 'logs').replace('{gain}', gain));
        return true;
      } return false;
    }
  },
  'action-wood': { 
    cost: 10, costType: 'energy',
    execute: () => {
      if (state.stats.energy >= 10 && state.resources.wood < state.limits.wood) {
        state.stats.energy -= 10;
        let gain = state.inventory.includes('craft-axe') ? 2 : 1;
        if (state.inventory.includes('craft-wanderstock')) gain += 0.5;
        state.resources.wood += gain; return true;
      } return false;
    }
  },
  'action-stone': { 
    cost: 15, costType: 'energy',
    execute: () => {
      if (state.stats.energy >= 15 && state.resources.stone < state.limits.stone) {
        state.stats.energy -= 15;
        state.resources.stone += state.inventory.includes('craft-pickaxe') ? 2 : 1; return true;
      } return false;
    }
  },
  'action-sell-wood': { 
    cost: 1, costType: 'wood',
    execute: () => { if (state.resources.wood >= 1) { state.resources.wood--; state.resources.shards += 5; return true; } return false; }
  },
  'action-sell-stone': { 
    cost: 1, costType: 'stone',
    execute: () => { if (state.resources.stone >= 1) { state.resources.stone--; state.resources.shards += 8; return true; } return false; }
  },
  'action-work': { 
    cost: 30, costType: 'energy',
    execute: () => {
      if (state.stats.energy >= 30) {
        state.stats.energy -= 30; state.housing.laborCount++; state.resources.shards += 12; return true;
      } return false;
    }
  },

  // NPCs
  'npc-baker': { cost: 10, costType: 'energy', maxProgress: 5, execute: () => {
    if (state.stats.energy >= 10) { state.stats.energy -= 10; state.npcProgress.baker++; return true; } return false;
  }},
  'npc-flowerGirl': { cost: 5, costType: 'energy', maxProgress: 5, execute: () => {
    if (state.housing.hasCampfire && state.stats.energy >= 5) { state.stats.energy -= 5; state.npcProgress.flowerGirl++; 
      if (state.npcProgress.flowerGirl >= 5 && !state.unlockedNPCs.includes('npc-blacksmith')) state.unlockedNPCs.push('npc-blacksmith');
      return true; } return false;
  }},
  'npc-artisan': { cost: 15, costType: 'energy', maxProgress: 3, execute: () => {
    if (state.stats.energy >= 15) { state.stats.energy -= 15; state.npcProgress.artisan++;
      if (state.npcProgress.artisan >= 3) {
        if (!state.unlockedRecipes.includes('craft-axe')) state.unlockedRecipes.push('craft-axe');
        if (!state.unlockedRecipes.includes('craft-pickaxe')) state.unlockedRecipes.push('craft-pickaxe');
      } return true; } return false;
  }},
  'npc-teacher': { cost: 12, costType: 'energy', maxProgress: 3, execute: () => {
    if (state.stats.energy >= 12) { state.stats.energy -= 12; state.npcProgress.teacher++; return true; } return false;
  }},
  'npc-townHall': { cost: 20, costType: 'energy', maxProgress: 5, execute: () => {
    if (state.stats.energy >= 20) { state.stats.energy -= 20; state.npcProgress.townHall++; return true; } return false;
  }},
  'npc-blacksmith': { cost: 25, costType: 'energy', maxProgress: 5, execute: () => {
    if (state.stats.energy >= 25) { state.stats.energy -= 25; state.npcProgress.blacksmith++; return true; } return false;
  }},
  'npc-sage': { 
    cost: 20, costType: 'magic', maxProgress: 1,
    execute: () => {
      if (state.stats.magic >= 20) {
        state.stats.magic -= 20; state.npcProgress.sage++;
        if (state.npcProgress.sage === 1) {
           state.inventory.push('Book of Knowledge');
           addLog(t('sage_gift', 'logs'));
        } 
        return true;
      } return false;
    }
  },

  // Crafting
  'craft-wanderstock': { cost: 5, costType: 'wood', execute: () => {
    if (state.resources.wood >= 5) { state.resources.wood -= 5; state.inventory.push('craft-wanderstock'); return true; } return false;
  }},
  'craft-axe': { cost: 20, costType: 'wood', execute: () => {
    if (state.resources.wood >= 20) { state.resources.wood -= 20; state.inventory.push('craft-axe'); return true; } return false;
  }},
  'craft-pickaxe': { cost: 15, costType: 'stone', execute: () => {
    if (state.resources.stone >= 15 && state.resources.wood >= 10) { state.resources.stone -= 15; state.resources.wood -= 10; state.inventory.push('craft-pickaxe'); return true; } return false;
  }},
  'craft-bed': { cost: 25, costType: 'wood', execute: () => {
    if (state.resources.wood >= 25) { state.resources.wood -= 25; state.inventory.push('craft-bed'); return true; } return false;
  }},
  'craft-chair': { cost: 10, costType: 'wood', execute: () => {
    if (state.resources.wood >= 10) { state.resources.wood -= 10; state.inventory.push('craft-chair'); return true; } return false;
  }},

  // Housing
  'house-campfire': { cost: 5, costType: 'wood', execute: () => {
     if (state.resources.wood >= 5) { state.resources.wood -= 5; state.housing.hasCampfire = true; state.unlockedNPCs.push('npc-flowerGirl'); return true; } return false;
  }},
  'house-tent': { cost: 15, costType: 'wood', execute: () => {
     if (state.resources.wood >= 15 && state.resources.stone >= 5) { state.resources.wood -= 15; state.resources.stone -= 5; state.housing.hasTent = true; state.unlockedNPCs.push('npc-townHall'); return true; } return false;
  }},
  'house-wood-storage': { cost: 20, costType: 'wood', execute: () => {
     if (state.resources.wood >= 20) { state.resources.wood -= 20; state.housing.hasWoodStorage = true; state.limits.wood += 10; state.unlockedNPCs.push('npc-artisan'); return true; } return false;
  }},
  'house-stone-storage': { cost: 20, costType: 'stone', execute: () => {
     if (state.resources.stone >= 20) { state.resources.stone -= 20; state.housing.hasStoneStorage = true; state.limits.stone += 10; state.unlockedNPCs.push('npc-artisan'); return true; } return false;
  }},
  'house-table': { 
    cost: 40, costType: 'wood', 
    execute: () => {
      if (state.resources.wood >= 40) {
        state.resources.wood -= 40; state.housing.hasTable = true;
        if (!state.unlockedNPCs.includes('npc-sage')) state.unlockedNPCs.push('npc-sage');
        return true;
      } return false;
    }
  },
  'house-build': { cost: 50, costType: 'wood', execute: () => {
     if (state.inventory.includes('Official Land Deed') && state.resources.wood >= 50 && state.resources.stone >= 50) {
       state.resources.wood -= 50; state.resources.stone -= 50; state.housing.hasHouse = true;
       state.limits.wood += 50; state.limits.stone += 50; return true;
     } return false;
  }}
};

// --- CORE FUNCTIONS ---

function updateUI() {
  els.displayName.textContent = state.playerName;
  els.vals.energy.textContent = `${Math.floor(state.stats.energy)} / ${state.stats.maxEnergy}`;
  els.vals.magic.textContent = `${Math.floor(state.stats.magic)} / ${state.stats.maxMagic}`;
  els.rings.energy.style.strokeDashoffset = CIRCUMFERENCE - (state.stats.energy / state.stats.maxEnergy) * CIRCUMFERENCE;
  els.rings.magic.style.strokeDashoffset = CIRCUMFERENCE - (state.stats.magic / state.stats.maxMagic) * CIRCUMFERENCE;
  
  els.vals.shards.textContent = Math.floor(state.resources.shards);
  els.vals.wood.textContent = `${state.resources.wood} / ${state.limits.wood}`;
  els.vals.stone.textContent = `${state.resources.stone} / ${state.limits.stone}`;

  renderHousingActions();
  renderCraftingList();
  renderInventoryList();
  renderVillageNPCs();
  updateTradeView();
  updateGatheringActions();

  if (state.hoveredAction) updateDetailsPanel(state.hoveredAction.id, state.hoveredAction.data);
}

function addLog(text, color = 'var(--text-dim)') {
  const entry = document.createElement('div');
  entry.className = 'log-entry'; entry.textContent = text;
  entry.style.color = color; els.gameLog.prepend(entry);
  if (els.gameLog.children.length > 40) els.gameLog.removeChild(els.gameLog.lastChild);
}

function updateDetailsPanel(id, data) {
  const langData = translations[state.language].actions[id] || {};
  
  let finalTitle = langData.title;
  let finalDesc = langData.desc;
  
  if (id === 'action-wood' && state.inventory.includes('craft-axe')) {
    finalTitle = langData.title_alt; finalDesc = langData.desc_alt;
  } else if (id === 'action-stone' && state.inventory.includes('craft-pickaxe')) {
    finalTitle = langData.title_alt; finalDesc = langData.desc_alt;
  }

  els.details.title.textContent = finalTitle || id;
  els.details.cost.textContent = `Cost: ${data.cost} ${data.costType.toUpperCase()}`;
  els.details.cost.className = `detail-cost cost-${data.costType}`;
  els.details.effect.textContent = langData.effect || '-';
  els.details.desc.textContent = finalDesc || '';

  let current = 0;
  if (data.costType === 'energy') current = Math.floor(state.stats.energy);
  else if (data.costType === 'magic') current = Math.floor(state.stats.magic);
  else if (data.costType === 'wood') current = state.resources.wood;
  else if (data.costType === 'stone') current = state.resources.stone;
  else if (data.costType === 'shards') current = state.resources.shards;

  const hasEnough = current >= data.cost;
  els.details.req.textContent = `${t('ui_need')}: ${current}/${data.cost}`;
  els.details.req.className = hasEnough ? 'detail-req ready' : 'detail-req blocked';
  
  els.details.panel.style.animation = 'none';
  els.details.panel.offsetHeight; 
  els.details.panel.style.animation = 'slideIn 0.2s ease';
}

function renderHousingActions() {
  els.housingActionsList.innerHTML = '';
  if (!state.housing.hasCampfire) createBtn('house-campfire', els.housingActionsList);
  else if (!state.housing.hasTent) createBtn('house-tent', els.housingActionsList);
  else {
    if (!state.housing.hasWoodStorage) createBtn('house-wood-storage', els.housingActionsList);
    if (!state.housing.hasStoneStorage) createBtn('house-stone-storage', els.housingActionsList);
    if (state.housing.hasWoodStorage && state.housing.hasStoneStorage && !state.housing.hasHouse) createBtn('house-build', els.housingActionsList);
    if (state.housing.hasHouse && !state.housing.hasTable) createBtn('house-table', els.housingActionsList);
  }
}

function renderCraftingList() {
  els.craftingList.innerHTML = '';
  state.unlockedRecipes.forEach(id => { if (!state.inventory.includes(id)) createBtn(id, els.craftingList); });
  if (state.inventory.includes('Book of Knowledge')) createBtn('action-study', els.craftingList);
}

function renderInventoryList() {
  els.inventoryList.innerHTML = '';
  state.inventory.forEach(id => {
    const div = document.createElement('div');
    div.className = 'game-btn'; 
    const langData = translations[state.language].actions[id];
    div.textContent = (langData ? langData.title : id);
    els.inventoryList.appendChild(div);
  });
}

function renderVillageNPCs() {
  els.villageNpcList.innerHTML = '';
  state.unlockedNPCs.forEach(id => {
    const data = actionDb[id];
    const btn = document.createElement('button');
    btn.className = 'game-btn';
    const progKey = id.replace('npc-', '');
    const langData = translations[state.language].actions[id];
    const current = state.npcProgress[progKey] || 0;
    const target = data.maxProgress || 5;
    btn.textContent = `${langData ? langData.title : id} ${current}/${target}`;
    btn.onmouseover = () => { state.hoveredAction = { id, data }; updateDetailsPanel(id, data); };
    btn.onmouseout = () => state.hoveredAction = null;
    btn.onclick = () => { if (data.execute()) updateUI(); };
    els.villageNpcList.appendChild(btn);
  });
}

function updateGatheringActions() {
  const woodBtn = document.getElementById('action-wood');
  const stoneBtn = document.getElementById('action-stone');
  if (!woodBtn || !stoneBtn) return;
  const wData = translations[state.language].actions['action-wood'];
  const sData = translations[state.language].actions['action-stone'];
  
  woodBtn.textContent = state.inventory.includes('craft-axe') ? wData.title_alt : wData.title;
  stoneBtn.textContent = state.inventory.includes('craft-pickaxe') ? sData.title_alt : sData.title;
}

function updateTradeView() {
  ['action-sell-wood', 'action-sell-stone'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = translations[state.language].actions[id].title;
  });
}

function createBtn(id, target) {
  const data = actionDb[id];
  const btn = document.createElement('button');
  btn.className = 'game-btn'; 
  const langData = translations[state.language].actions[id];
  btn.textContent = langData ? langData.title : id;
  btn.onmouseover = () => { state.hoveredAction = { id, data }; updateDetailsPanel(id, data); };
  btn.onmouseout = () => state.hoveredAction = null;
  btn.onclick = () => { if (data.execute()) updateUI(); };
  target.appendChild(btn);
}

function switchView(view) {
  state.view = view;
  Object.keys(els.views).forEach(k => els.views[k].style.display = k === view ? 'flex' : 'none');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.id.includes(view)));
  updateUI();
}

function playIntro() {
  for (let i = 1; i <= 7; i++) {
    setTimeout(() => {
      addLog(t(`intro_${i}`, 'logs'), 'var(--accent-teal)');
      if (i === 7) state.hasSeenIntro = true;
    }, i * 2500);
  }
}

function setupEvents() {
  document.getElementById('nav-story').onclick = () => switchView('story');
  document.getElementById('nav-crafting').onclick = () => switchView('crafting');
  document.getElementById('nav-housing').onclick = () => switchView('housing');
  document.getElementById('nav-inventory').onclick = () => switchView('inventory');
  document.getElementById('nav-village').onclick = () => switchView('village');

  ['action-essen', 'action-ausruhen', 'action-meditieren', 'action-wood', 'action-stone', 'action-sell-wood', 'action-sell-stone', 'action-work'].forEach(id => {
    const btn = document.getElementById(id);
    const data = actionDb[id];
    if (btn) {
      btn.onmouseover = () => { state.hoveredAction = { id, data }; updateDetailsPanel(id, data); };
      btn.onmouseout = () => state.hoveredAction = null;
      btn.onclick = () => { if (data.execute()) updateUI(); };
    }
  });

  document.getElementById('btn-open-settings').onclick = () => document.getElementById('modal-settings').style.display = 'flex';
  document.getElementById('btn-close-settings').onclick = () => document.getElementById('modal-settings').style.display = 'none';
  document.getElementById('btn-save-game').onclick = () => { saveGame(); document.getElementById('modal-settings').style.display = 'none'; };
  document.getElementById('btn-load-game').onclick = () => { loadGame(); document.getElementById('modal-settings').style.display = 'none'; };
  document.getElementById('btn-quit-game').onclick = () => window.electronAPI?.quitApp();

  document.getElementById('input-player-name').oninput = (e) => {
    state.playerName = e.target.value || 'Entdecker';
    els.displayName.textContent = state.playerName;
  };
}

function saveGame() {
  localStorage.setItem('wings_save', JSON.stringify(state));
  els.saveInfo.textContent = `${t('save_at', 'ui')}${new Date().toLocaleTimeString()}`;
  addLog(t('save_success', 'logs'));
}

function loadGame() {
  const saved = localStorage.getItem('wings_save');
  if (saved) {
    Object.assign(state, JSON.parse(saved));
    setLanguage(state.language);
    addLog(t('load_success', 'logs'));
    return true;
  }
  return false;
}

// --- ATMOSPHERE ---
setInterval(() => {
  if (Math.random() < 0.05) {
    const list = translations[state.language].atmosphere;
    addLog(list[Math.floor(Math.random() * list.length)], 'rgba(255,255,255,0.15)');
  }
}, 5000);

setupEvents();
if (!loadGame()) {
  playIntro();
  updateUI();
}
