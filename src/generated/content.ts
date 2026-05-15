// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/**/*.yaml  (the */ in the glob cannot be in a block comment)
// Regenerate: npm run build:content
// Generated: 15.5.2026 15:04:39

// === Resource Registry ===

export const RESOURCE_REGISTRY_GENERATED: Record<string, any> = {
  "focus": {
    "id": "focus",
    "type": "resource",
    "category": "knowledge",
    "color": "var(--accent-purple)",
    "initial": 0,
    "initialLimit": 1,
    "scalesWithSatiation": false
  },
  "wood": {
    "id": "wood",
    "type": "resource",
    "category": "materials",
    "color": "var(--gold)",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": true
  },
  "stone": {
    "id": "stone",
    "type": "resource",
    "category": "materials",
    "color": "var(--text-dim)",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": true
  },
  "shards": {
    "id": "shards",
    "type": "resource",
    "category": "materials",
    "color": "var(--accent-teal)",
    "initial": 0,
    "initialLimit": 1000,
    "scalesWithSatiation": false
  },
  "herbs": {
    "id": "herbs",
    "type": "resource",
    "category": "materials",
    "color": "var(--accent-teal)",
    "initial": 0,
    "initialLimit": 50,
    "scalesWithSatiation": true
  },
  "astral_shards": {
    "id": "astral_shards",
    "type": "resource",
    "category": "materials",
    "color": "#818cf8",
    "initial": 0,
    "initialLimit": 100,
    "scalesWithSatiation": false
  },
  "flowers": {
    "id": "flowers",
    "type": "resource",
    "category": "materials",
    "color": "#ec4899",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": true
  },
  "ghostwood": {
    "id": "ghostwood",
    "type": "resource",
    "category": "materials",
    "color": "#94a3b8",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": true
  },
  "glowpollen": {
    "id": "glowpollen",
    "type": "resource",
    "category": "materials",
    "color": "#fbbf24",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": false
  },
  "fibers": {
    "id": "fibers",
    "type": "resource",
    "category": "materials",
    "color": "#fde68a",
    "initial": 0,
    "initialLimit": 50,
    "scalesWithSatiation": true
  },
  "resin": {
    "id": "resin",
    "type": "resource",
    "category": "materials",
    "color": "#b45309",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": false
  },
  "iron_parts": {
    "id": "iron_parts",
    "type": "resource",
    "category": "materials",
    "color": "#64748b",
    "initial": 0,
    "initialLimit": 25,
    "scalesWithSatiation": false
  },
  "clay": {
    "id": "clay",
    "type": "resource",
    "category": "materials",
    "color": "#a8a29e",
    "initial": 0,
    "initialLimit": 50,
    "scalesWithSatiation": true
  },
  "rune_fragment": {
    "id": "rune_fragment",
    "type": "resource",
    "category": "materials",
    "color": "#8b5cf6",
    "initial": 0,
    "initialLimit": 50,
    "scalesWithSatiation": false
  },
  "arcane_dust": {
    "id": "arcane_dust",
    "type": "resource",
    "category": "materials",
    "color": "#a78bfa",
    "initial": 0,
    "initialLimit": 50,
    "scalesWithSatiation": false
  },
  "meat": {
    "id": "meat",
    "type": "resource",
    "category": "provisions",
    "color": "#f87171",
    "initial": 0,
    "initialLimit": 10,
    "scalesWithSatiation": false
  },
  "water": {
    "id": "water",
    "type": "resource",
    "category": "provisions",
    "color": "#60a5fa",
    "initial": 0,
    "initialLimit": 10,
    "scalesWithSatiation": false
  },
  "gourmet-meal": {
    "id": "gourmet-meal",
    "type": "resource",
    "category": "provisions",
    "color": "#fbbf24",
    "initial": 0,
    "initialLimit": 10,
    "scalesWithSatiation": false
  },
  "energy": {
    "id": "energy",
    "type": "stat",
    "category": "vitality",
    "color": "var(--accent-teal)",
    "initial": 50,
    "initialMax": 50,
    "isEssential": true,
    "wingSlot": "left",
    "scalesWithSatiation": false,
    "satiationDrain": 0.1
  },
  "magic": {
    "id": "magic",
    "type": "stat",
    "category": "vitality",
    "color": "var(--accent-purple)",
    "initial": 50,
    "initialMax": 50,
    "isEssential": true,
    "wingSlot": "right",
    "scalesWithSatiation": false,
    "satiationDrain": 0.1
  },
  "satiation": {
    "id": "satiation",
    "type": "stat",
    "category": "vitality",
    "color": "var(--gold)",
    "initial": 50,
    "initialMax": 50,
    "isEssential": true,
    "wingSlot": "head",
    "scalesWithSatiation": false
  }
};

// === Modifier Registry ===

export const MODIFIER_REGISTRY_GENERATED: Record<string, any> = {
  "shards_limit": {
    "id": "shards_limit",
    "title": "ui_shards",
    "desc": "shards_limit_desc",
    "baseValue": 1000
  },
  "wood_limit": {
    "id": "wood_limit",
    "title": "ui_wood",
    "desc": "wood_limit_desc",
    "baseValue": 0
  },
  "stone_limit": {
    "id": "stone_limit",
    "title": "ui_stone",
    "desc": "stone_limit_desc",
    "baseValue": 0
  },
  "herbs_limit": {
    "id": "herbs_limit",
    "title": "ui_herbs",
    "desc": "herbs_limit_desc",
    "baseValue": 0
  },
  "meat_limit": {
    "id": "meat_limit",
    "title": "ui_meat",
    "desc": "meat_limit_desc",
    "baseValue": 0
  },
  "water_limit": {
    "id": "water_limit",
    "title": "ui_water",
    "desc": "water_limit_desc",
    "baseValue": 0
  },
  "energy_limit": {
    "id": "energy_limit",
    "title": "ui_energy",
    "desc": "energy_limit_desc",
    "baseValue": 0
  },
  "magic_limit": {
    "id": "magic_limit",
    "title": "ui_magic",
    "desc": "magic_limit_desc",
    "baseValue": 0
  },
  "resin_limit": {
    "id": "resin_limit",
    "title": "resin_limit_title",
    "desc": "resin_limit_desc",
    "baseValue": 0
  },
  "clay_limit": {
    "id": "clay_limit",
    "title": "clay_limit_title",
    "desc": "clay_limit_desc",
    "baseValue": 0
  },
  "iron_parts_limit": {
    "id": "iron_parts_limit",
    "title": "iron_parts_limit_title",
    "desc": "iron_parts_limit_desc",
    "baseValue": 0
  },
  "satiation_limit": {
    "id": "satiation_limit",
    "title": "ui_satiation",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "astral_shards_limit": {
    "id": "astral_shards_limit",
    "title": "ui_astral_shards",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "flowers_limit": {
    "id": "flowers_limit",
    "title": "ui_flowers",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "ghostwood_limit": {
    "id": "ghostwood_limit",
    "title": "ui_ghostwood",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "glowpollen_limit": {
    "id": "glowpollen_limit",
    "title": "ui_glowpollen",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "fibers_limit": {
    "id": "fibers_limit",
    "title": "ui_fibers",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "rune_fragment_limit": {
    "id": "rune_fragment_limit",
    "title": "ui_rune_fragment",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "arcane_dust_limit": {
    "id": "arcane_dust_limit",
    "title": "ui_arcane_dust",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "gourmet-meal_limit": {
    "id": "gourmet-meal_limit",
    "title": "ui_gourmet-meal",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "study_xp_limit": {
    "id": "study_xp_limit",
    "title": "ui_study_xp",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "focus_limit": {
    "id": "focus_limit",
    "title": "ui_focus",
    "desc": "limit_desc_generic",
    "baseValue": 0
  },
  "garden_magic_cost": {
    "id": "garden_magic_cost",
    "title": "modifier_garden_magic_cost_title",
    "desc": "modifier_garden_magic_cost_desc",
    "baseValue": 1
  },
  "magic_cost": {
    "id": "magic_cost",
    "title": "modifier_magic_cost_title",
    "desc": "modifier_magic_cost_desc",
    "baseValue": 0
  },
  "meditate_magic_gain": {
    "id": "meditate_magic_gain",
    "title": "modifier_meditate_magic_gain_title",
    "desc": "modifier_meditate_magic_gain_desc",
    "baseValue": 15
  },
  "energy_reg_bonus": {
    "id": "energy_reg_bonus",
    "title": "energy_reg_bonus_title",
    "desc": "energy_reg_bonus_desc",
    "baseValue": 0
  },
  "magic_limit_gain": {
    "id": "magic_limit_gain",
    "title": "magic_limit_gain_title",
    "desc": "magic_limit_gain_desc",
    "baseValue": 2
  },
  "resource_efficiency": {
    "id": "resource_efficiency",
    "title": "resource_efficiency_title",
    "desc": "resource_efficiency_desc",
    "baseValue": 1
  },
  "arcane_focus_cost": {
    "id": "arcane_focus_cost",
    "title": "arcane_focus_cost_title",
    "desc": "arcane_focus_cost_desc",
    "baseValue": 3
  },
  "satiation_drain_multiplier": {
    "id": "satiation_drain_multiplier",
    "title": "ui_satiation",
    "desc": "satiation_drain_desc",
    "baseValue": 1
  },
  "wood_yield": {
    "id": "wood_yield",
    "title": "wood_yield_title",
    "desc": "wood_yield_desc",
    "baseValue": 3,
    "scalesWithSatiation": true
  },
  "stone_yield": {
    "id": "stone_yield",
    "title": "stone_yield_title",
    "desc": "stone_yield_desc",
    "baseValue": 2,
    "scalesWithSatiation": true
  },
  "meat_yield": {
    "id": "meat_yield",
    "title": "meat_yield_title",
    "desc": "meat_yield_desc",
    "baseValue": 2,
    "scalesWithSatiation": true
  },
  "flowers_yield": {
    "id": "flowers_yield",
    "title": "flowers_yield_title",
    "desc": "flowers_yield_desc",
    "baseValue": 4,
    "scalesWithSatiation": true
  },
  "shards_yield": {
    "id": "shards_yield",
    "title": "shards_yield_title",
    "desc": "shards_yield_desc",
    "baseValue": 25,
    "scalesWithSatiation": true
  },
  "magic_yield": {
    "id": "magic_yield",
    "title": "magic_yield_title",
    "desc": "magic_yield_desc",
    "baseValue": 15,
    "scalesWithSatiation": false
  },
  "rest_energy_gain": {
    "id": "rest_energy_gain",
    "title": "rest_energy_gain_title",
    "desc": "rest_energy_gain_desc",
    "baseValue": 10,
    "scalesWithSatiation": false
  },
  "eat_satiation_gain": {
    "id": "eat_satiation_gain",
    "title": "eat_satiation_gain_title",
    "desc": "eat_satiation_gain_desc",
    "baseValue": 10,
    "scalesWithSatiation": false
  },
  "garden_yield": {
    "id": "garden_yield",
    "title": "garden_yield_title",
    "desc": "garden_yield_desc",
    "baseValue": 15,
    "scalesWithSatiation": true
  },
  "ghostwood_yield": {
    "id": "ghostwood_yield",
    "title": "modifier_ghostwood_yield_title",
    "desc": "modifier_ghostwood_yield_desc",
    "baseValue": 1,
    "scalesWithSatiation": true
  },
  "glowpollen_yield": {
    "id": "glowpollen_yield",
    "title": "modifier_glowpollen_yield_title",
    "desc": "modifier_glowpollen_yield_desc",
    "baseValue": 1,
    "scalesWithSatiation": false
  },
  "fibers_yield": {
    "id": "fibers_yield",
    "title": "modifier_fibers_yield_title",
    "desc": "modifier_fibers_yield_desc",
    "baseValue": 3,
    "scalesWithSatiation": true
  },
  "clay_yield": {
    "id": "clay_yield",
    "title": "modifier_clay_yield_title",
    "desc": "modifier_clay_yield_desc",
    "baseValue": 2,
    "scalesWithSatiation": true
  },
  "resin_yield": {
    "id": "resin_yield",
    "title": "resin_limit_title",
    "desc": "resin_limit_desc",
    "baseValue": 0.5,
    "scalesWithSatiation": false
  },
  "knowledge_yield": {
    "id": "knowledge_yield",
    "title": "ui_knowledge",
    "desc": "knowledge_yield_desc",
    "baseValue": 5,
    "scalesWithSatiation": false
  }
};

// === Action Registry ===

export const ACTION_REGISTRY_GENERATED: Record<string, any> = {
  "build-campfire": {
    "id": "build-campfire",
    "category": "housing",
    "cost": 5,
    "costType": "wood",
    "image": "img/housing/campfire.webp",
    "sfx": "success",
    "requirements": {
      "flags.build-campfire": {
        "op": "!=",
        "val": true
      }
    },
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-campfire",
        "value": true
      },
      {
        "type": "unlockNPC",
        "id": "npc-flowerGirl"
      }
    ],
    "logKey": "milestone_campfire",
    "logColor": "var(--gold)",
    "modifiers": [
      {
        "key": "eat_satiation_gain",
        "add": 5
      }
    ]
  },
  "build-tent": {
    "id": "build-tent",
    "category": "housing",
    "requirements": {
      "flags.build-campfire": true,
      "flags.build-tent": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 15,
      "stone": 5
    },
    "image": "img/housing/tent.webp",
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-tent",
        "value": true
      },
      {
        "type": "unlockNPC",
        "id": "npc-townHall"
      },
      {
        "type": "setHome",
        "id": "home-tent"
      }
    ],
    "logKey": "milestone_tent",
    "logColor": "var(--gold)",
    "modifiers": [
      {
        "key": "rest_energy_gain",
        "add": 15
      },
      {
        "key": "energy_limit",
        "add": 25
      }
    ]
  },
  "build-wood-storage": {
    "id": "build-wood-storage",
    "chapter": "Establishment",
    "category": "camp",
    "requirements": {
      "flags.build-tent": true,
      "flags.build-wood-storage": {
        "op": "!=",
        "val": true
      }
    },
    "cost": 20,
    "costType": "wood",
    "image": "img/addons/wood_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-wood-storage",
        "value": true
      },
      {
        "type": "unlockNPC",
        "id": "npc-artisan"
      }
    ],
    "logKey": "milestone_wood_storage",
    "logColor": "var(--gold)",
    "maxCount": 1,
    "modifiers": [
      {
        "key": "wood_limit",
        "add": 25
      }
    ]
  },
  "build-stone-storage": {
    "id": "build-stone-storage",
    "chapter": "Establishment",
    "category": "camp",
    "requirements": {
      "flags.build-tent": true,
      "flags.build-stone-storage": {
        "op": "!=",
        "val": true
      }
    },
    "cost": 20,
    "costType": "stone",
    "image": "img/addons/stone_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-stone-storage",
        "value": true
      },
      {
        "type": "unlockNPC",
        "id": "npc-artisan"
      }
    ],
    "logKey": "milestone_stone_storage",
    "logColor": "var(--gold)",
    "maxCount": 1,
    "modifiers": [
      {
        "key": "stone_limit",
        "add": 25
      }
    ]
  },
  "build-water-barrel": {
    "id": "build-water-barrel",
    "chapter": "Village Life",
    "category": "camp",
    "costs": {
      "wood": 15,
      "shards": 50
    },
    "image": "img/addons/water_barrel.png",
    "requirements": {
      "flags.build-garden": true
    },
    "maxCount": 5,
    "sfx": "water",
    "onSuccess": [
      {
        "type": "modifyLimit",
        "resource": "water",
        "amount": 25
      }
    ]
  },
  "build-wood-storage-2": {
    "id": "build-wood-storage-2",
    "category": "camp",
    "requirements": {
      "flags.build-wood-storage": true,
      "flags.build-house": true,
      "flags.build-wood-storage-2": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 40,
      "stone": 10
    },
    "image": "img/addons/wood_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-wood-storage-2",
        "value": true
      }
    ],
    "maxCount": 1,
    "modifiers": [
      {
        "key": "wood_limit",
        "add": 25
      }
    ]
  },
  "build-stone-storage-2": {
    "id": "build-stone-storage-2",
    "category": "camp",
    "requirements": {
      "flags.build-stone-storage": true,
      "flags.build-house": true,
      "flags.build-stone-storage-2": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 10,
      "stone": 40
    },
    "image": "img/addons/stone_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-stone-storage-2",
        "value": true
      }
    ],
    "maxCount": 1,
    "modifiers": [
      {
        "key": "stone_limit",
        "add": 25
      }
    ]
  },
  "build-wood-storage-3": {
    "id": "build-wood-storage-3",
    "category": "camp",
    "requirements": {
      "flags.build-wood-storage-2": true,
      "flags.build-house": true,
      "flags.build-wood-storage-3": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 50,
      "stone": 20
    },
    "image": "img/addons/wood_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-wood-storage-3",
        "value": true
      }
    ],
    "maxCount": 1,
    "modifiers": [
      {
        "key": "wood_limit",
        "add": 35
      }
    ]
  },
  "build-stone-storage-3": {
    "id": "build-stone-storage-3",
    "category": "camp",
    "requirements": {
      "flags.build-stone-storage-2": true,
      "flags.build-house": true,
      "flags.build-stone-storage-3": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 20,
      "stone": 50
    },
    "image": "img/addons/stone_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-stone-storage-3",
        "value": true
      }
    ],
    "maxCount": 1,
    "modifiers": [
      {
        "key": "stone_limit",
        "add": 35
      }
    ]
  },
  "build-wood-storage-4": {
    "id": "build-wood-storage-4",
    "category": "camp",
    "requirements": {
      "flags.build-wood-storage-3": true,
      "flags.npc-blacksmith": true,
      "flags.build-wood-storage-4": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 80,
      "stone": 40
    },
    "image": "img/addons/wood_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-wood-storage-4",
        "value": true
      }
    ],
    "maxCount": 1,
    "modifiers": [
      {
        "key": "wood_limit",
        "add": 35
      }
    ]
  },
  "build-stone-storage-4": {
    "id": "build-stone-storage-4",
    "category": "camp",
    "requirements": {
      "flags.build-stone-storage-3": true,
      "flags.npc-blacksmith": true,
      "flags.build-stone-storage-4": {
        "op": "!=",
        "val": true
      }
    },
    "costs": {
      "wood": 40,
      "stone": 80
    },
    "image": "img/addons/stone_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-stone-storage-4",
        "value": true
      }
    ],
    "maxCount": 1,
    "modifiers": [
      {
        "key": "stone_limit",
        "add": 35
      }
    ]
  },
  "act-bed": {
    "id": "act-bed",
    "category": "furniture",
    "requirements": {
      "flags.build-house": true
    },
    "cost": 25,
    "costType": "wood",
    "image": "img/furniture/bed.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-bed"
      }
    ],
    "logKey": "craft_bed"
  },
  "act-chair": {
    "id": "act-chair",
    "category": "furniture",
    "requirements": {
      "flags.build-house": true
    },
    "cost": 10,
    "costType": "wood",
    "image": "img/furniture/chair.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-chair"
      }
    ],
    "logKey": "craft_chair"
  },
  "act-stove": {
    "id": "act-stove",
    "category": "furniture",
    "requirements": {
      "flags.build-house": true
    },
    "costs": {
      "stone": 25,
      "wood": 15
    },
    "image": "img/furniture/stove.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-stove"
      }
    ],
    "logKey": "craft_stove"
  },
  "act-bookshelf": {
    "id": "act-bookshelf",
    "category": "furniture",
    "cost": 25,
    "costType": "wood",
    "image": "img/furniture/bookshelf.webp",
    "requirements": {
      "flags.build-table": true,
      "flags.build-bookshelf": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-bookshelf"
      },
      {
        "type": "setFlag",
        "flag": "build-bookshelf",
        "value": true
      }
    ],
    "logKey": "craft_bookshelf",
    "modifiers": [
      {
        "key": "magic_limit",
        "add": 5
      }
    ]
  },
  "act-cabinet": {
    "id": "act-cabinet",
    "category": "furniture",
    "cost": 60,
    "costType": "wood",
    "image": "img/furniture/cabinet.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-kitchen": true,
      "flags.item-cabinet": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-cabinet"
      }
    ],
    "logKey": "craft_cabinet"
  },
  "act-grand-table": {
    "id": "act-grand-table",
    "category": "furniture",
    "cost": 85,
    "costType": "wood",
    "image": "img/furniture/table_massive.webp",
    "requirements": {
      "flags.build-table": true,
      "flags.build-kitchen": true,
      "flags.item-grand-table": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-grand-table"
      }
    ],
    "logKey": "craft_grand_table"
  },
  "act-bed-2": {
    "id": "act-bed-2",
    "category": "furniture",
    "costs": {
      "shards": 150,
      "magic": 40
    },
    "requirements": {
      "flags.item-bed": true,
      "flags.item-crystal-mana": true,
      "flags.item-bed-2": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "magic",
    "image": "img/furniture/bed_2.webp",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-bed-2"
      }
    ],
    "logKey": "craft_bed_2"
  },
  "act-stove-2": {
    "id": "act-stove-2",
    "category": "furniture",
    "costs": {
      "shards": 200,
      "stone": 50
    },
    "requirements": {
      "flags.item-stove": true,
      "flags.item-crystal-mana": true,
      "flags.item-stove-2": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "magic",
    "image": "img/furniture/stove_2.webp",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-stove-2"
      }
    ],
    "logKey": "craft_stove_2"
  },
  "build-loom": {
    "id": "build-loom",
    "category": "furniture",
    "costs": {
      "wood": 50,
      "ghostwood": 10,
      "fibers": 15
    },
    "image": "img/furniture/loom.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-loom": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-loom",
        "value": true
      },
      {
        "type": "unlockItem",
        "id": "item-loom"
      }
    ]
  },
  "build-bookshelf-large": {
    "id": "build-bookshelf-large",
    "category": "furniture",
    "costs": {
      "wood": 75,
      "shards": 100
    },
    "image": "img/furniture/bookshelf_large.webp",
    "requirements": {
      "flags.build-bookshelf": true,
      "flags.build-bookshelf-large": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-bookshelf-large",
        "value": true
      },
      {
        "type": "unlockItem",
        "id": "item-bookshelf-large"
      }
    ]
  },
  "build-desk": {
    "id": "build-desk",
    "category": "furniture",
    "costs": {
      "wood": 60,
      "shards": 50
    },
    "image": "img/furniture/desk.webp",
    "requirements": {
      "flags.build-table": true,
      "flags.build-desk": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-desk",
        "value": true
      },
      {
        "type": "unlockItem",
        "id": "item-desk"
      }
    ]
  },
  "build-garden": {
    "id": "build-garden",
    "category": "garden",
    "chapter": "Establishment",
    "costs": {
      "wood": 20,
      "stone": 20
    },
    "image": "img/addons/garden.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.blueprint-garden": true,
      "flags.build-garden": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-garden",
        "value": true
      }
    ],
    "logKey": "milestone_garden",
    "logColor": "var(--accent-teal)"
  },
  "build-garden-upgrade": {
    "id": "build-garden-upgrade",
    "icon": "🏗️",
    "category": "garden",
    "chapter": "Refinement",
    "costs": {
      "wood": 50,
      "stone": 50,
      "water": 20
    },
    "requirements": {
      "flags.build-garden": true,
      "flags.gardenLevel": {
        "op": "<",
        "val": 2
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "gardenLevel",
        "value": 2
      },
      {
        "type": "setFlag",
        "flag": "build-garden-upgrade",
        "value": true
      }
    ],
    "logKey": "milestone_garden_upgrade",
    "logColor": "var(--accent-teal)",
    "modifiers": [
      {
        "key": "garden_yield",
        "add": 10
      }
    ]
  },
  "build-mana-basin": {
    "id": "build-mana-basin",
    "category": "garden",
    "costs": {
      "stone": 95,
      "glowpollen": 20,
      "clay": 20,
      "resin": 5
    },
    "image": "img/addons/mana_basin.webp",
    "requirements": {
      "flags.build-garden-upgrade": true,
      "flags.build-mana-basin": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "magic",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-mana-basin",
        "value": true
      },
      {
        "type": "unlockItem",
        "id": "item-mana-basin"
      }
    ]
  },
  "build-house": {
    "id": "build-house",
    "chapter": "Establishment",
    "category": "housing",
    "costs": {
      "wood": 40,
      "stone": 40
    },
    "image": "img/housing/house.webp",
    "requirements": {
      "flags.item-deed": true,
      "flags.build-house": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-house",
        "value": true
      },
      {
        "type": "unlockRecipe",
        "id": "act-bed"
      },
      {
        "type": "unlockRecipe",
        "id": "act-chair"
      },
      {
        "type": "unlockRecipe",
        "id": "act-stove"
      },
      {
        "type": "setHome",
        "id": "home-house"
      }
    ],
    "logKey": "milestone_house",
    "logColor": "var(--gold)"
  },
  "build-table": {
    "id": "build-table",
    "chapter": "Establishment",
    "category": "housing",
    "requirements": {
      "flags.build-house": true,
      "flags.build-table": {
        "op": "!=",
        "val": true
      }
    },
    "cost": 40,
    "costType": "wood",
    "image": "img/furniture/table.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-table",
        "value": true
      },
      {
        "type": "unlockNPC",
        "id": "npc-sage"
      },
      {
        "type": "unlockRecipe",
        "id": "act-bookshelf"
      }
    ],
    "logKey": "milestone_table",
    "logColor": "var(--gold)"
  },
  "build-kitchen": {
    "id": "build-kitchen",
    "chapter": "Refinement",
    "category": "housing",
    "costs": {
      "wood": 70,
      "stone": 40
    },
    "image": "img/addons/kitchen.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-kitchen": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-kitchen",
        "value": true
      }
    ],
    "logKey": "milestone_kitchen",
    "logColor": "var(--gold)"
  },
  "build-arcane-sanctum": {
    "id": "build-arcane-sanctum",
    "chapter": "Refinement",
    "category": "housing",
    "costs": {
      "stone": 100,
      "magic": 50
    },
    "image": "img/addons/sanctum.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-table": true,
      "flags.build-arcane-sanctum": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "magic",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-arcane-sanctum",
        "value": true
      },
      {
        "type": "unlockNPC",
        "id": "npc-ellie"
      },
      {
        "type": "unlockNPC",
        "id": "npc-aris"
      },
      {
        "type": "unlockRecipe",
        "id": "act-meditate-sanctum"
      }
    ],
    "modifiers": [
      {
        "key": "magic_limit",
        "add": 50
      }
    ],
    "logKey": "milestone_sanctum",
    "logColor": "var(--accent-purple)"
  },
  "build-home-lake": {
    "id": "build-home-lake",
    "chapter": "Refinement",
    "category": "housing",
    "costs": {
      "wood": 125,
      "shards": 300
    },
    "image": "img/housing/lake_house.webp",
    "requirements": {
      "flags.blueprint-home-lake": true,
      "flags.build-house": true,
      "flags.build-home-lake": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-home-lake",
        "value": true
      },
      {
        "type": "setHome",
        "id": "home-lake"
      }
    ],
    "logKey": "milestone_lake_house",
    "logColor": "var(--gold)"
  },
  "build-home-tower": {
    "id": "build-home-tower",
    "chapter": "Refinement",
    "category": "housing",
    "costs": {
      "stone": 135,
      "shards": 500
    },
    "image": "img/housing/island_tower.webp",
    "requirements": {
      "flags.blueprint-home-tower": true,
      "flags.build-house": true,
      "flags.build-home-tower": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "magic",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-home-tower",
        "value": true
      },
      {
        "type": "setHome",
        "id": "home-tower"
      }
    ],
    "logKey": "milestone_aura_tower",
    "logColor": "var(--accent-purple)"
  },
  "build-terrace": {
    "id": "build-terrace",
    "category": "housing",
    "costs": {
      "wood": 130,
      "shards": 500
    },
    "image": "img/housing/terrace.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-terrace": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-terrace",
        "value": true
      },
      {
        "type": "unlockItem",
        "id": "item-terrace"
      }
    ]
  },
  "act-chisel": {
    "id": "act-chisel",
    "category": "tools",
    "requirements": {
      "flags.unlock-artisan-tools": true
    },
    "costs": {
      "wood": 5,
      "stone": 5
    },
    "image": "img/tools/chisel.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-chisel"
      }
    ],
    "logKey": "craft_chisel"
  },
  "act-wanderstock": {
    "id": "act-wanderstock",
    "category": "tools",
    "requirements": {
      "flags.unlock-wanderstock": true
    },
    "cost": 5,
    "costType": "wood",
    "image": "img/tools/walkingstick.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-walking-stick"
      }
    ],
    "logKey": "craft_wanderstock"
  },
  "act-axe": {
    "id": "act-axe",
    "category": "tools",
    "requirements": {
      "flags.unlock-artisan-tools": true
    },
    "cost": 20,
    "costType": "wood",
    "image": "img/tools/axe_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-axe"
      }
    ],
    "logKey": "craft_axe"
  },
  "act-pickaxe": {
    "id": "act-pickaxe",
    "category": "tools",
    "requirements": {
      "flags.unlock-artisan-tools": true
    },
    "costs": {
      "stone": 15,
      "wood": 10
    },
    "image": "img/tools/pickaxe_1.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-pickaxe"
      }
    ],
    "logKey": "craft_pickaxe"
  },
  "act-bow": {
    "id": "act-bow",
    "category": "tools",
    "requirements": {
      "flags.unlock-bow": true
    },
    "cost": 30,
    "costType": "wood",
    "image": "img/tools/bow.webp",
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-bow"
      }
    ],
    "logKey": "craft_bow"
  },
  "act-spice-rack": {
    "id": "act-spice-rack",
    "category": "tools",
    "costs": {
      "wood": 30,
      "herbs": 10
    },
    "image": "img/tools/spice-rack.webp",
    "requirements": {
      "flags.build-kitchen": true,
      "flags.item-spice-rack": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "unlockItem",
        "id": "item-spice-rack"
      }
    ],
    "logKey": "craft_spice_rack"
  },
  "build-cart-reinforced": {
    "id": "build-cart-reinforced",
    "category": "tools",
    "costs": {
      "wood": 90,
      "stone": 50,
      "iron_parts": 5
    },
    "image": "img/tools/cart_reinforced.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-cart-reinforced": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-cart-reinforced",
        "value": true
      },
      {
        "type": "unlockItem",
        "id": "item-cart-reinforced"
      }
    ]
  },
  "act-eat": {
    "id": "act-eat",
    "category": "primary",
    "icon": "🍱",
    "cost": 0,
    "costType": "none",
    "sfx": "eat",
    "particleType": "energy",
    "counter": "food",
    "rewards": {
      "satiation": "eat_satiation_gain"
    },
    "satiationCost": 0,
    "logKey": "eat_log"
  },
  "act-rest": {
    "id": "act-rest",
    "category": "primary",
    "icon": "💤",
    "cost": 0,
    "costType": "none",
    "sfx": "click",
    "particleType": "energy",
    "counter": "rest",
    "rewards": {
      "energy": "rest_energy_gain"
    },
    "satiationCost": 0,
    "logKey": "rest_log"
  },
  "act-meditate": {
    "id": "act-meditate",
    "category": "primary",
    "icon": "🧘",
    "cost": 0,
    "costType": "none",
    "sfx": "magic",
    "particleType": "magic",
    "counter": "magic",
    "rewards": {
      "magic": "meditate_magic_gain"
    },
    "satiationCost": 0,
    "logKey": "meditate_log"
  },
  "act-wood": {
    "id": "act-wood",
    "category": "gathering",
    "locationId": "forest",
    "icon": "🪓",
    "cost": 8,
    "costType": "energy",
    "yieldType": "wood",
    "sfx": "gather",
    "counter": "wood",
    "isLoopable": true,
    "rewards": {
      "wood": "wood_yield",
      "resin": "resin_yield"
    },
    "particleText": "ui_wood",
    "particleType": "wood",
    "logKey": "wood_log"
  },
  "act-stone": {
    "id": "act-stone",
    "category": "gathering",
    "locationId": "forest",
    "icon": "⛏️",
    "cost": 12,
    "costType": "energy",
    "yieldType": "stone",
    "sfx": "gather",
    "counter": "stone",
    "isLoopable": true,
    "rewards": {
      "stone": "stone_yield"
    },
    "particleText": "ui_stone",
    "particleType": "stone",
    "logKey": "stone_log"
  },
  "act-hunt": {
    "id": "act-hunt",
    "category": "gathering",
    "locationId": "forest",
    "icon": "🏹",
    "cost": 25,
    "costType": "energy",
    "yieldType": "meat",
    "requirements": {
      "flags.item-bow": true
    },
    "sfx": "gather",
    "particleType": "shards",
    "counter": "food",
    "isLoopable": true,
    "rewards": {
      "meat": "meat_yield"
    },
    "logKey": "hunt_log"
  },
  "act-mine-quartz": {
    "id": "act-mine-quartz",
    "category": "gathering",
    "locationId": "mine",
    "icon": "💎",
    "cost": 20,
    "costType": "energy",
    "sfx": "gather",
    "requirements": {
      "flags.item-pickaxe": true
    },
    "counter": "stone",
    "isLoopable": true,
    "rewards": {
      "stone": 10,
      "shards": 5
    },
    "particleText": "ui_shards",
    "particleType": "shards",
    "logKey": "mine_quartz_log"
  },
  "act-collect-water": {
    "id": "act-collect-water",
    "category": "gathering",
    "locationId": "forest",
    "icon": "💧",
    "cost": 5,
    "costType": "energy",
    "yieldType": "water",
    "sfx": "water",
    "counter": "food",
    "isLoopable": true,
    "rewards": {
      "water": 1
    },
    "particleText": "ui_water",
    "particleType": "energy",
    "logKey": "collect_water_log"
  },
  "act-pick-flowers": {
    "id": "act-pick-flowers",
    "category": "gathering",
    "locationId": "meadow",
    "icon": "🌸",
    "cost": 5,
    "costType": "energy",
    "yieldType": "flowers",
    "requirements": {
      "flags.npc-flowerGirl-introduced": true
    },
    "sfx": "gather",
    "counter": "flowers",
    "isLoopable": true,
    "rewards": {
      "flowers": "flowers_yield",
      "fibers": "fibers_yield"
    },
    "particleText": "ui_flowers",
    "particleType": "energy",
    "logKey": "pick_flowers_log"
  },
  "act-whisper-wood": {
    "id": "act-whisper-wood",
    "category": "gathering",
    "locationId": "whisper_grove",
    "icon": "👻",
    "cost": 15,
    "costType": "energy",
    "yieldType": "ghostwood",
    "requirements": {
      "flags.unlocked-whispering-grove": true
    },
    "sfx": "gather",
    "counter": "wood",
    "isLoopable": true,
    "rewards": {
      "ghostwood": "ghostwood_yield"
    },
    "particleText": "item_ghostwood_title",
    "particleType": "wood",
    "logKey": "whisper_wood_log"
  },
  "act-whisper-pollen": {
    "id": "act-whisper-pollen",
    "category": "gathering",
    "locationId": "whisper_grove",
    "icon": "✨",
    "cost": 20,
    "costType": "magic",
    "yieldType": "glowpollen",
    "requirements": {
      "flags.unlocked-whispering-grove": true
    },
    "sfx": "magic",
    "counter": "flowers",
    "isLoopable": true,
    "rewards": {
      "glowpollen": "glowpollen_yield"
    },
    "particleText": "item_glowpollen_title",
    "particleType": "magic",
    "logKey": "whisper_pollen_log"
  },
  "act-dig-clay": {
    "id": "act-dig-clay",
    "category": "gathering",
    "locationId": "forest",
    "icon": "🥣",
    "cost": 15,
    "costType": "energy",
    "yieldType": "clay",
    "sfx": "gather",
    "requirements": {
      "flags.item-pickaxe": true
    },
    "counter": "clay",
    "isLoopable": true,
    "rewards": {
      "clay": "clay_yield"
    },
    "particleText": "item_clay_title",
    "particleType": "stone",
    "logKey": "clay_log"
  },
  "act-garden-plant": {
    "id": "act-garden-plant",
    "category": "garden_task",
    "icon": "🌿",
    "cost": 10,
    "costType": "energy",
    "duration": 10000,
    "requirements": {
      "flags.build-garden": true
    },
    "sfx": "gather",
    "isLoopable": true,
    "rewards": {
      "herbs": "garden_yield"
    },
    "particleText": "ui_herbs",
    "particleType": "energy",
    "logKey": "garden_harvest_log"
  },
  "act-garden-plant-2": {
    "id": "act-garden-plant-2",
    "category": "garden_task",
    "icon": "🌻",
    "cost": 10,
    "costType": "energy",
    "duration": 10000,
    "requirements": {
      "flags.gardenLevel": 2
    },
    "sfx": "gather",
    "particleType": "herbs",
    "yieldType": "herbs",
    "isLoopable": true,
    "rewards": {
      "herbs": "garden_yield"
    },
    "logKey": "garden_harvest_log"
  },
  "act-garden-water": {
    "id": "act-garden-water",
    "category": "garden_task",
    "icon": "💧",
    "cost": 5,
    "costType": "energy",
    "requirements": {
      "flags.build-garden": true
    },
    "sfx": "gather",
    "rewards": {
      "water": 2
    },
    "particleText": "ui_water",
    "particleType": "energy",
    "logKey": "garden_water_log"
  },
  "act-cook-gourmet": {
    "id": "act-cook-gourmet",
    "category": "kitchen",
    "icon": "🍳",
    "costType": "mixed",
    "costs": {
      "water": 2,
      "meat": 2,
      "herbs": 1
    },
    "duration": 5000,
    "requirements": {
      "flags.build-kitchen": true
    },
    "sfx": "eat",
    "onSuccess": [
      {
        "type": "addBuff",
        "buffId": "buff-gourmet"
      }
    ],
    "particleText": "item_gourmet_meal_title",
    "logKey": "cook_gourmet_success"
  },
  "act-read-lore-1": {
    "id": "act-read-lore-1",
    "category": "lore",
    "locationId": "library",
    "isStory": true,
    "progKey": "read_book_1",
    "maxProgress": 10,
    "title": "act_read_lore_1_title",
    "desc": "act_read_lore_1_desc",
    "icon": "📖",
    "steps": [
      {
        "costs": {
          "energy": 5
        },
        "dialogueKey": "lore_1_step_1"
      },
      {
        "costs": {
          "energy": 8,
          "magic": 2
        },
        "dialogueKey": "lore_1_step_2"
      },
      {
        "costs": {
          "energy": 10,
          "magic": 5
        },
        "dialogueKey": "lore_1_step_3"
      },
      {
        "costs": {
          "energy": 12,
          "magic": 8
        },
        "dialogueKey": "lore_1_step_4"
      },
      {
        "costs": {
          "energy": 15,
          "magic": 10
        },
        "dialogueKey": "lore_1_step_5"
      },
      {
        "costs": {
          "energy": 18,
          "magic": 12,
          "shards": 50
        },
        "dialogueKey": "lore_1_step_6"
      },
      {
        "costs": {
          "energy": 20,
          "magic": 15,
          "shards": 100
        },
        "dialogueKey": "lore_1_step_7"
      },
      {
        "costs": {
          "energy": 25,
          "magic": 20
        },
        "dialogueKey": "lore_1_step_8"
      },
      {
        "costs": {
          "energy": 30,
          "magic": 25,
          "shards": 200
        },
        "dialogueKey": "lore_1_step_9"
      },
      {
        "costs": {
          "energy": 40,
          "magic": 30,
          "shards": 500
        },
        "dialogueKey": "lore_1_step_10",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "read_book_1_complete",
            "value": true
          }
        ]
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-read-lore-2": {
    "id": "act-read-lore-2",
    "category": "lore",
    "locationId": "library",
    "isStory": true,
    "progKey": "read_book_2",
    "maxProgress": 10,
    "title": "act_read_lore_2_title",
    "desc": "act_read_lore_2_desc",
    "icon": "🗺️",
    "steps": [
      {
        "costs": {
          "energy": 5
        },
        "dialogueKey": "lore_2_step_1"
      },
      {
        "costs": {
          "energy": 8,
          "magic": 2
        },
        "dialogueKey": "lore_2_step_2"
      },
      {
        "costs": {
          "energy": 10,
          "magic": 5
        },
        "dialogueKey": "lore_2_step_3"
      },
      {
        "costs": {
          "energy": 12,
          "magic": 8
        },
        "dialogueKey": "lore_2_step_4"
      },
      {
        "costs": {
          "energy": 15,
          "magic": 10
        },
        "dialogueKey": "lore_2_step_5"
      },
      {
        "costs": {
          "energy": 18,
          "magic": 12,
          "shards": 50
        },
        "dialogueKey": "lore_2_step_6"
      },
      {
        "costs": {
          "energy": 20,
          "magic": 15,
          "shards": 100
        },
        "dialogueKey": "lore_2_step_7"
      },
      {
        "costs": {
          "energy": 25,
          "magic": 20
        },
        "dialogueKey": "lore_2_step_8"
      },
      {
        "costs": {
          "energy": 30,
          "magic": 25,
          "shards": 200
        },
        "dialogueKey": "lore_2_step_9"
      },
      {
        "costs": {
          "energy": 40,
          "magic": 30,
          "shards": 500
        },
        "dialogueKey": "lore_2_step_10",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "read_book_2_complete",
            "value": true
          }
        ]
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-dream-bloom": {
    "id": "act-dream-bloom",
    "category": "magic",
    "icon": "🌀",
    "cost": 15,
    "costType": "magic",
    "satiationCost": 1,
    "customExecute": "dream_bloom",
    "onSuccess": [
      {
        "type": "modifyResource",
        "resource": "magic",
        "amount": 5
      }
    ],
    "logKey": "dream_bloom_log"
  },
  "act-meditate-sanctum": {
    "id": "act-meditate-sanctum",
    "category": "magic",
    "icon": "🧘",
    "duration": 10000,
    "costType": "magic",
    "cost": 10,
    "yieldType": "astral_shards",
    "requirements": {
      "flags.build-arcane-sanctum": true
    },
    "sfx": "magic",
    "particleText": "particle_meditation",
    "particleType": "shards",
    "rewards": {
      "astral_shards": 1
    },
    "logKey": "meditation_log",
    "logColor": "var(--accent-purple)"
  },
  "act-spell-harvest": {
    "id": "act-spell-harvest",
    "category": "magic",
    "icon": "🌿",
    "costType": "mixed",
    "costs": {
      "astral_shards": 1,
      "magic": 20
    },
    "requirements": {
      "flags.build-arcane-sanctum": true,
      "flags.school_graduate": true
    },
    "sfx": "magic",
    "particleText": "particle_blessing",
    "particleType": "shards",
    "onSuccess": [
      {
        "type": "addBuff",
        "buffId": "buff-harvest"
      }
    ],
    "logKey": "spell_harvest_log",
    "logColor": "var(--accent-purple)"
  },
  "act-grind-dust": {
    "id": "act-grind-dust",
    "category": "magic",
    "icon": "🔮",
    "costType": "mixed",
    "costs": {
      "herbs": 5,
      "magic": 10
    },
    "requirements": {
      "flags.school_graduate": true
    },
    "sfx": "magic",
    "isLoopable": true,
    "rewards": {
      "arcane_dust": 1
    },
    "logKey": "grind_dust_log",
    "logColor": "var(--accent-purple)"
  },
  "act-npc-baker": {
    "id": "act-npc-baker",
    "npcId": "npc-baker",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "baker",
    "maxProgress": 5,
    "journalIcon": "🍞",
    "icon": "🥖",
    "journalColor": "#f59e0b",
    "steps": [
      {
        "cost": 8,
        "costType": "energy",
        "reward": "item-bread",
        "dialogueKey": "npc_baker_1"
      },
      {
        "costs": {
          "wood": 30
        },
        "reward": "item-bread",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "unlock-baker-bread",
            "value": true
          }
        ],
        "dialogueKey": "npc_baker_2"
      },
      {
        "cost": 20,
        "costType": "energy",
        "reward": "item-cookie",
        "dialogueKey": "npc_baker_3"
      },
      {
        "costs": {
          "wood": 15,
          "stone": 15
        },
        "reward": "item-cookie",
        "dialogueKey": "npc_baker_4"
      },
      {
        "cost": 25,
        "costType": "energy",
        "reward": "item-cookie",
        "dialogueKey": "npc_baker_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-flowerGirl": {
    "id": "act-npc-flowerGirl",
    "npcId": "npc-flowerGirl",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "flowerGirl",
    "maxProgress": 7,
    "journalIcon": "🌸",
    "icon": "🌸",
    "journalColor": "#ec4899",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "herbs",
            "amount": 5
          },
          {
            "type": "setFlag",
            "flag": "npc-flowerGirl-introduced",
            "value": true
          }
        ],
        "dialogueKey": "npc_flowerGirl_1"
      },
      {
        "costs": {
          "water": 5
        },
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "herbs",
            "amount": 10
          }
        ],
        "dialogueKey": "npc_flowerGirl_2"
      },
      {
        "cost": 10,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "astral_shards",
            "amount": 5
          }
        ],
        "dialogueKey": "npc_flowerGirl_3"
      },
      {
        "costs": {
          "herbs": 10
        },
        "reward": "item-wyvern-scale",
        "dialogueKey": "npc_flowerGirl_4"
      },
      {
        "cost": 15,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "unlockNPC",
            "id": "npc-blacksmith"
          },
          {
            "type": "setFlag",
            "flag": "blueprint-garden",
            "value": true
          }
        ],
        "dialogueKey": "npc_flowerGirl_5"
      },
      {
        "costs": {
          "herbs": 50,
          "water": 20
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "blueprint-home-lake",
            "value": true
          },
          {
            "type": "log",
            "logKey": "reward_blueprint_lake",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_flowerGirl_6"
      },
      {
        "costs": {
          "herbs": 50
        },
        "requirements": {
          "flags.build-garden-upgrade": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "unlocked-whispering-grove",
            "value": true
          },
          {
            "type": "log",
            "logKey": "unlock_whisper_grove",
            "color": "var(--accent-teal)"
          }
        ],
        "dialogueKey": "npc_flowerGirl_7"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-artisan": {
    "id": "act-npc-artisan",
    "npcId": "npc-artisan",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "artisan",
    "maxProgress": 3,
    "journalIcon": "🏗️",
    "icon": "🔨",
    "journalColor": "#d97706",
    "steps": [
      {
        "costs": {
          "wood": 20
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "unlock-wanderstock",
            "value": true
          },
          {
            "type": "unlockRecipe",
            "id": "act-wanderstock"
          }
        ],
        "dialogueKey": "npc_artisan_1"
      },
      {
        "costs": {
          "stone": 20
        },
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "wood",
            "amount": 10
          }
        ],
        "dialogueKey": "npc_artisan_2"
      },
      {
        "costs": {
          "wood": 10,
          "stone": 10
        },
        "onSuccess": [
          {
            "type": "unlockRecipe",
            "id": "act-chisel"
          },
          {
            "type": "setFlag",
            "flag": "unlock-artisan-tools",
            "value": true
          },
          {
            "type": "unlockRecipe",
            "id": "act-axe"
          },
          {
            "type": "unlockRecipe",
            "id": "act-pickaxe"
          }
        ],
        "dialogueKey": "npc_artisan_3"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-teacher": {
    "id": "act-npc-teacher",
    "npcId": "npc-teacher",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "teacher",
    "maxProgress": 3,
    "journalIcon": "📖",
    "icon": "🎓",
    "journalColor": "#3b82f6",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "unlockItem",
            "id": "item-crystal_apple"
          },
          {
            "type": "log",
            "logKey": "receive_apple",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_teacher_1"
      },
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.build-house": true
        },
        "onSuccess": [
          {
            "type": "unlockItem",
            "id": "item-book_lore_1"
          },
          {
            "type": "unlockItem",
            "id": "item-book_lore_2"
          },
          {
            "type": "unlockRecipe",
            "id": "act-read-lore-1"
          },
          {
            "type": "unlockRecipe",
            "id": "act-read-lore-2"
          },
          {
            "type": "setFlag",
            "flag": "unlocked-library",
            "value": true
          },
          {
            "type": "log",
            "logKey": "receive_books",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_teacher_3"
      },
      {
        "cost": 15,
        "costType": "energy",
        "requirements": {
          "flags.read_book_1_complete": true,
          "flags.read_book_2_complete": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "school_graduate",
            "value": true
          },
          {
            "type": "log",
            "logKey": "school_graduate_log",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_teacher_6"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-townHall": {
    "id": "act-npc-townHall",
    "npcId": "npc-townHall",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "townHall",
    "maxProgress": 5,
    "journalIcon": "🏛️",
    "icon": "🏛️",
    "journalColor": "#94a3b8",
    "steps": [
      {
        "cost": 20,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "registered-resident",
            "value": true
          },
          {
            "type": "log",
            "logKey": "townhall_registered",
            "color": "var(--accent-teal)"
          }
        ],
        "dialogueKey": "npc_townHall_1"
      },
      {
        "cost": 25,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "unlocked-work",
            "value": true
          }
        ],
        "dialogueKey": "npc_townHall_2"
      },
      {
        "costs": {
          "shards": 100
        },
        "reward": "ui_tax_receipt",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "townhall_tax_paid",
            "value": true
          },
          {
            "type": "log",
            "logKey": "townhall_tax_paid",
            "color": "var(--accent-teal)"
          }
        ],
        "dialogueKey": "npc_townHall_3"
      },
      {
        "costs": {
          "shards": 250
        },
        "reward": "ui_land_prep",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "townhall_land_prepped",
            "value": true
          },
          {
            "type": "log",
            "logKey": "townhall_land_prepped",
            "color": "var(--accent-teal)"
          }
        ],
        "dialogueKey": "npc_townHall_4"
      },
      {
        "cost": 40,
        "costType": "energy",
        "costs": {
          "shards": 500
        },
        "reward": "item-deed",
        "dialogueKey": "npc_townHall_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-blacksmith": {
    "id": "act-npc-blacksmith",
    "npcId": "npc-blacksmith",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "blacksmith",
    "maxProgress": 5,
    "journalIcon": "⚒️",
    "icon": "⚒️",
    "journalColor": "#475569",
    "steps": [
      {
        "cost": 20,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "stone",
            "amount": 15
          }
        ],
        "dialogueKey": "npc_blacksmith_1"
      },
      {
        "cost": 15,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "stone",
            "amount": 20
          }
        ],
        "dialogueKey": "npc_blacksmith_2"
      },
      {
        "costs": {
          "stone": 30
        },
        "reward": "item-whetstone",
        "dialogueKey": "npc_blacksmith_3"
      },
      {
        "cost": 15,
        "costType": "energy",
        "reward": "item-whetstone",
        "dialogueKey": "npc_blacksmith_4"
      },
      {
        "cost": 25,
        "costType": "energy",
        "reward": "item-whetstone",
        "dialogueKey": "npc_blacksmith_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-sage": {
    "id": "act-npc-sage",
    "npcId": "npc-sage",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "sage",
    "maxProgress": 5,
    "journalIcon": "🔮",
    "icon": "🔮",
    "journalColor": "#8b5cf6",
    "steps": [
      {
        "cost": 20,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "study_xp",
            "amount": 25
          }
        ],
        "dialogueKey": "npc_sage_1"
      },
      {
        "cost": 30,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "arcane_dust",
            "amount": 2
          }
        ],
        "dialogueKey": "npc_sage_2"
      },
      {
        "cost": 40,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "arcane_dust",
            "amount": 3
          }
        ],
        "dialogueKey": "npc_sage_3"
      },
      {
        "cost": 50,
        "costType": "magic",
        "reward": "item-scroll",
        "dialogueKey": "npc_sage_4"
      },
      {
        "cost": 60,
        "costType": "magic",
        "reward": "item-scroll",
        "dialogueKey": "npc_sage_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-hunter": {
    "id": "act-npc-hunter",
    "npcId": "npc-hunter",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_village_life",
    "progKey": "hunter",
    "maxProgress": 5,
    "journalIcon": "🏹",
    "icon": "🏹",
    "journalColor": "#10b981",
    "steps": [
      {
        "cost": 15,
        "costType": "energy",
        "reward": "item-arrowhead",
        "dialogueKey": "npc_hunter_1"
      },
      {
        "costs": {
          "wood": 10
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "unlock-bow",
            "value": true
          },
          {
            "type": "unlockRecipe",
            "id": "act-bow"
          }
        ],
        "dialogueKey": "npc_hunter_2"
      },
      {
        "cost": 15,
        "costType": "energy",
        "reward": "item-dried-meat",
        "dialogueKey": "npc_hunter_3"
      },
      {
        "costs": {
          "wood": 20
        },
        "reward": "item-dried-meat",
        "dialogueKey": "npc_hunter_4"
      },
      {
        "cost": 20,
        "costType": "energy",
        "reward": "item-dried-meat",
        "dialogueKey": "npc_hunter_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-treeOfLife": {
    "id": "act-npc-treeOfLife",
    "npcId": "npc-treeOfLife",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_the_transformation",
    "progKey": "treeOfLife",
    "maxProgress": 1,
    "journalIcon": "🌳",
    "icon": "🌳",
    "journalColor": "#10b981",
    "steps": [
      {
        "cost": 0,
        "costType": "none",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "astral_shards",
            "amount": 10
          }
        ],
        "dialogueKey": "npc_treeOfLife_1"
      }
    ],
    "customExecute": "tree_of_life"
  },
  "act-npc-ellie": {
    "id": "act-npc-ellie",
    "npcId": "npc-ellie",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_the_dream",
    "progKey": "ellie",
    "maxProgress": 5,
    "journalIcon": "✨",
    "icon": "✨",
    "journalColor": "#a78bfa",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "magic",
            "amount": 5
          }
        ],
        "dialogueKey": "npc_ellie_1"
      },
      {
        "cost": 15,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "unlockRecipe",
            "id": "act-dream-bloom"
          }
        ],
        "dialogueKey": "npc_ellie_2"
      },
      {
        "costs": {
          "herbs": 5
        },
        "reward": "item-dream-dust",
        "dialogueKey": "npc_ellie_3"
      },
      {
        "cost": 20,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "magic",
            "amount": 15
          }
        ],
        "dialogueKey": "npc_ellie_4"
      },
      {
        "cost": 25,
        "costType": "magic",
        "reward": "item-wyvern-scale",
        "dialogueKey": "npc_ellie_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-aris": {
    "id": "act-npc-aris",
    "npcId": "npc-aris",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_the_dream",
    "progKey": "aris",
    "maxProgress": 6,
    "journalIcon": "🧙‍♂️",
    "icon": "🧙‍♂️",
    "journalColor": "#8b5cf6",
    "steps": [
      {
        "cost": 20,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "ability-arcane-focus",
            "value": true
          }
        ],
        "dialogueKey": "npc_aris_1"
      },
      {
        "cost": 30,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "arcane_dust",
            "amount": 2
          }
        ],
        "dialogueKey": "npc_aris_2"
      },
      {
        "cost": 40,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "modifyResource",
            "resource": "magic",
            "amount": 20
          }
        ],
        "dialogueKey": "npc_aris_3"
      },
      {
        "cost": 50,
        "costType": "magic",
        "reward": "item-crystal-mana",
        "dialogueKey": "npc_aris_4"
      },
      {
        "cost": 60,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "unlockRecipe",
            "id": "act-bed-2"
          },
          {
            "type": "unlockRecipe",
            "id": "act-stove-2"
          }
        ],
        "dialogueKey": "npc_aris_5"
      },
      {
        "cost": 100,
        "costType": "magic",
        "costs": {
          "astral_shards": 10,
          "arcane_dust": 5
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "blueprint-home-tower",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-treeOfLife"
          },
          {
            "type": "log",
            "logKey": "reward_blueprint_tower",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_aris_6"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-sell-wood": {
    "id": "act-sell-wood",
    "category": "village",
    "icon": "🪵",
    "cost": 1,
    "costType": "wood",
    "yieldType": "shards",
    "sfx": "click",
    "particleType": "shards",
    "counter": "shards",
    "rewards": {
      "shards": 2
    },
    "logKey": "sell_wood_log",
    "logColor": "var(--accent-teal)"
  },
  "act-sell-stone": {
    "id": "act-sell-stone",
    "category": "village",
    "icon": "🪨",
    "cost": 1,
    "costType": "stone",
    "yieldType": "shards",
    "sfx": "click",
    "particleType": "shards",
    "counter": "shards",
    "rewards": {
      "shards": 4
    },
    "logKey": "sell_stone_log",
    "logColor": "var(--accent-teal)"
  },
  "act-sell-meat": {
    "id": "act-sell-meat",
    "category": "village",
    "icon": "🥩",
    "cost": 1,
    "costType": "meat",
    "yieldType": "shards",
    "sfx": "click",
    "particleType": "shards",
    "counter": "shards",
    "rewards": {
      "shards": 10
    },
    "logKey": "sell_meat_log",
    "logColor": "var(--accent-teal)"
  },
  "act-buy-meat": {
    "id": "act-buy-meat",
    "category": "village",
    "icon": "🛒",
    "cost": 20,
    "costType": "shards",
    "yieldType": "meat",
    "sfx": "click",
    "particleType": "shards",
    "rewards": {
      "meat": 1
    },
    "logKey": "buy_meat_log"
  },
  "act-work": {
    "id": "act-work",
    "category": "village",
    "locationId": "village",
    "icon": "👷",
    "cost": 30,
    "costType": "energy",
    "yieldType": "shards",
    "requirements": {
      "flags.unlocked-work": true
    },
    "sfx": "click",
    "particleType": "shards",
    "isLoopable": true,
    "rewards": {
      "shards": "shards_yield"
    },
    "logKey": "work_log",
    "logColor": "var(--accent-teal)"
  },
  "act-buy-iron-parts": {
    "id": "act-buy-iron-parts",
    "category": "village",
    "icon": "⚙️",
    "cost": 50,
    "costType": "shards",
    "yieldType": "iron_parts",
    "sfx": "click",
    "particleType": "shards",
    "rewards": {
      "iron_parts": 1
    },
    "logKey": "buy_iron_parts_log"
  }
};

// === Item Registry ===

export const ITEM_REGISTRY_GENERATED: Record<string, any> = {
  "item-deed": {
    "id": "item-deed",
    "title": "item_deed_title",
    "desc": "item_deed_desc",
    "image": "img/items/deed.webp",
    "consumable": false,
    "category": "items"
  },
  "item-book_lore_1": {
    "id": "item-book_lore_1",
    "title": "item_book_lore_1_title",
    "desc": "item_book_lore_1_desc",
    "image": "img/items/book_lore_1.webp",
    "consumable": false,
    "category": "lore"
  },
  "item-book_lore_2": {
    "id": "item-book_lore_2",
    "title": "item_book_lore_2_title",
    "desc": "item_book_lore_2_desc",
    "image": "img/items/book_lore_2.webp",
    "consumable": false,
    "category": "lore"
  },
  "item-scroll": {
    "id": "item-scroll",
    "title": "item_scroll_title",
    "desc": "item_scroll_desc",
    "image": "img/items/scroll.webp",
    "consumable": false,
    "category": "items"
  },
  "item-whetstone": {
    "id": "item-whetstone",
    "title": "item_whetstone_title",
    "desc": "item_whetstone_desc",
    "image": "img/items/whetstone.webp",
    "consumable": false,
    "category": "items"
  },
  "item-arrowhead": {
    "id": "item-arrowhead",
    "title": "item_arrowhead_title",
    "desc": "item_arrowhead_desc",
    "image": "img/items/arrowhead.webp",
    "consumable": false,
    "category": "items"
  },
  "item-astral-shards": {
    "id": "item-astral-shards",
    "title": "item_astral_shards_title",
    "desc": "item_astral_shards_desc",
    "image": "img/items/astralshard.webp",
    "consumable": false,
    "category": "items"
  },
  "item-dream-dust": {
    "id": "item-dream-dust",
    "title": "item_dream_dust_title",
    "desc": "item_dream_dust_desc",
    "image": "img/items/dreamdust.webp",
    "consumable": false,
    "category": "items"
  },
  "item-wyvern-scale": {
    "id": "item-wyvern-scale",
    "title": "item_wyvern_scale_title",
    "desc": "item_wyvern_scale_desc",
    "image": "img/items/wyvernshard.webp",
    "consumable": false,
    "category": "items"
  },
  "item-arcane-dust": {
    "id": "item-arcane-dust",
    "title": "item_arcane_dust_title",
    "desc": "item_arcane_dust_desc",
    "image": "img/items/arcane_dust.webp",
    "consumable": false,
    "category": "items"
  },
  "item-crystal-mana": {
    "id": "item-crystal-mana",
    "title": "item_crystal_mana_title",
    "desc": "item_crystal_mana_desc",
    "image": "img/items/mana_crystal.webp",
    "consumable": false,
    "category": "items",
    "modifiers": [
      {
        "key": "garden_magic_cost",
        "add": -1
      }
    ]
  },
  "item-bed": {
    "id": "item-bed",
    "title": "item_bed_title",
    "desc": "item_bed_desc",
    "image": "img/furniture/bed.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "rest_energy_gain",
        "add": 30
      },
      {
        "key": "energy_limit",
        "add": 50
      }
    ]
  },
  "item-chair": {
    "id": "item-chair",
    "title": "item_chair_title",
    "desc": "item_chair_desc",
    "image": "img/furniture/chair.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 1,
    "effect": "ui_decorative"
  },
  "item-stove": {
    "id": "item-stove",
    "title": "item_stove_title",
    "desc": "item_stove_desc",
    "image": "img/furniture/stove.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "eat_satiation_gain",
        "add": 20
      }
    ]
  },
  "item-bookshelf": {
    "id": "item-bookshelf",
    "title": "item_bookshelf_title",
    "desc": "item_bookshelf_desc",
    "image": "img/furniture/bookshelf.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 1,
    "modifiers": [
      {
        "key": "books_limit",
        "add": 5
      }
    ]
  },
  "item-cabinet": {
    "id": "item-cabinet",
    "title": "item_cabinet_title",
    "desc": "item_cabinet_desc",
    "image": "img/furniture/cabinet.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "meat_limit",
        "add": 10
      },
      {
        "key": "water_limit",
        "add": 10
      },
      {
        "key": "herbs_limit",
        "add": 20
      }
    ]
  },
  "item-grand-table": {
    "id": "item-grand-table",
    "title": "item_grand_table_title",
    "desc": "item_grand_table_desc",
    "image": "img/furniture/table_massive.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 3,
    "effect": "ui_decorative"
  },
  "item-bed-2": {
    "id": "item-bed-2",
    "title": "item_bed_2_title",
    "desc": "item_bed_2_desc",
    "image": "img/furniture/bed_2.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "rest_energy_gain",
        "add": 50
      },
      {
        "key": "energy_limit",
        "add": 100
      }
    ]
  },
  "item-stove-2": {
    "id": "item-stove-2",
    "title": "item_stove_2_title",
    "desc": "item_stove_2_desc",
    "image": "img/furniture/stove_2.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "eat_satiation_gain",
        "add": 50
      },
      {
        "key": "energy_limit",
        "add": 25
      }
    ]
  },
  "item-loom": {
    "id": "item-loom",
    "title": "item_loom_title",
    "desc": "item_loom_desc",
    "image": "img/furniture/loom.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "effect": "ui_decorative"
  },
  "item-bookshelf-large": {
    "id": "item-bookshelf-large",
    "title": "item_bookshelf_large_title",
    "desc": "item_bookshelf_large_desc",
    "image": "img/furniture/bookshelf_large.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "books_limit",
        "add": 15
      }
    ]
  },
  "item-desk": {
    "id": "item-desk",
    "title": "item_desk_title",
    "desc": "item_desk_desc",
    "image": "img/furniture/desk.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 2,
    "modifiers": [
      {
        "key": "meditate_magic_gain",
        "add": 5
      }
    ]
  },
  "item-mana-basin": {
    "id": "item-mana-basin",
    "title": "item_mana_basin_title",
    "desc": "item_mana_basin_desc",
    "image": "img/addons/mana_basin.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 1,
    "modifiers": [
      {
        "key": "meditate_magic_gain",
        "add": 3
      }
    ]
  },
  "item-terrace": {
    "id": "item-terrace",
    "title": "item_terrace_title",
    "desc": "item_terrace_desc",
    "image": "img/housing/terrace.webp",
    "consumable": false,
    "category": "furniture",
    "spaceCost": 3,
    "modifiers": [
      {
        "key": "rest_energy_gain",
        "add": 2
      }
    ]
  },
  "item-bread": {
    "id": "item-bread",
    "title": "item_bread_title",
    "desc": "item_bread_desc",
    "image": "img/items/bread.webp",
    "consumable": true,
    "category": "items",
    "effect": {
      "satiation": 25
    }
  },
  "item-cookie": {
    "id": "item-cookie",
    "title": "item_cookie_title",
    "desc": "item_cookie_desc",
    "image": "img/items/cookie.webp",
    "consumable": true,
    "category": "items",
    "effect": {
      "satiation": 40,
      "energy": 5
    }
  },
  "item-dried-meat": {
    "id": "item-dried-meat",
    "title": "item_dried_meat_title",
    "desc": "item_dried_meat_desc",
    "image": "img/items/driedmeat.webp",
    "consumable": true,
    "category": "items",
    "effect": {
      "satiation": 15,
      "energy": 15
    }
  },
  "item-gourmet-meal": {
    "id": "item-gourmet-meal",
    "title": "item_gourmet_meal_title",
    "desc": "item_gourmet_meal_desc",
    "image": "img/items/gourmetmeal.webp",
    "consumable": true,
    "category": "items",
    "effect": {
      "satiation": 50,
      "energy": 30
    }
  },
  "item-crystal_apple": {
    "id": "item-crystal_apple",
    "title": "item_crystal_apple_title",
    "desc": "item_crystal_apple_desc",
    "image": "img/items/crystal_apple.webp",
    "consumable": true,
    "category": "food",
    "effect": {
      "satiation": 30,
      "energy": 20
    }
  },
  "item-walking-stick": {
    "id": "item-walking-stick",
    "title": "item_wanderstock_title",
    "desc": "item_wanderstock_desc",
    "image": "img/tools/walkingstick.webp",
    "consumable": false,
    "category": "tools",
    "modifiers": [
      {
        "key": "wood_yield",
        "add": 1
      },
      {
        "key": "stone_yield",
        "add": 1
      }
    ]
  },
  "item-axe": {
    "id": "item-axe",
    "title": "item_axe_title",
    "desc": "item_axe_desc",
    "image": "img/tools/axe_1.webp",
    "consumable": false,
    "category": "tools",
    "modifiers": [
      {
        "key": "wood_yield",
        "add": 3
      }
    ]
  },
  "item-pickaxe": {
    "id": "item-pickaxe",
    "title": "item_pickaxe_title",
    "desc": "item_pickaxe_desc",
    "image": "img/tools/pickaxe_1.webp",
    "consumable": false,
    "category": "tools",
    "modifiers": [
      {
        "key": "stone_yield",
        "add": 2
      }
    ]
  },
  "item-bow": {
    "id": "item-bow",
    "title": "item_bow_title",
    "desc": "item_bow_desc",
    "image": "img/tools/bow.webp",
    "consumable": false,
    "category": "tools"
  },
  "item-spice-rack": {
    "id": "item-spice-rack",
    "title": "item_spice_rack_title",
    "desc": "item_spice_rack_desc",
    "image": "img/tools/spice-rack.webp",
    "consumable": false,
    "category": "tools",
    "modifiers": [
      {
        "key": "herbs_limit",
        "add": 10
      }
    ]
  },
  "item-chisel": {
    "id": "item-chisel",
    "title": "item_chisel_title",
    "desc": "item_chisel_desc",
    "image": "img/tools/chisel.webp",
    "consumable": false,
    "category": "tools"
  },
  "item-cart-reinforced": {
    "id": "item-cart-reinforced",
    "title": "item_cart_reinforced_title",
    "desc": "item_cart_reinforced_desc",
    "image": "img/tools/cart_reinforced.webp",
    "consumable": false,
    "category": "tools",
    "modifiers": [
      {
        "key": "wood_yield",
        "add": 1
      },
      {
        "key": "stone_yield",
        "add": 1
      }
    ]
  }
};

// === NPC Registry ===

export const NPC_REGISTRY_GENERATED: Record<string, any> = {
  "npc-baker": {
    "id": "npc-baker",
    "nameKey": "npc_baker_name",
    "icon": "🍞",
    "color": "#f59e0b",
    "image": "img/npcs/baker_gara.webp",
    "progKey": "baker",
    "maxProgress": 5,
    "chapter": "Village Life",
    "unlockedAtStart": true,
    "tradeActions": [
      {
        "id": "act-sell-wood",
        "minProgress": 1
      }
    ]
  },
  "npc-flowerGirl": {
    "id": "npc-flowerGirl",
    "nameKey": "npc_flowergirl_name",
    "icon": "🌸",
    "color": "#ec4899",
    "image": "img/npcs/flowergirl.webp",
    "progKey": "flowerGirl",
    "maxProgress": 7,
    "chapter": "Village Life"
  },
  "npc-artisan": {
    "id": "npc-artisan",
    "nameKey": "npc_artisan_name",
    "icon": "🏗️",
    "color": "#d97706",
    "image": "img/npcs/artisan_geron.webp",
    "progKey": "artisan",
    "maxProgress": 3,
    "chapter": "Village Life",
    "tradeActions": [
      {
        "id": "act-sell-stone",
        "minProgress": 1
      }
    ]
  },
  "npc-teacher": {
    "id": "npc-teacher",
    "nameKey": "npc_teacher_name",
    "icon": "📖",
    "color": "#3b82f6",
    "image": "img/npcs/teacher_aria.webp",
    "progKey": "teacher",
    "maxProgress": 4,
    "chapter": "Village Life",
    "unlockedAtStart": true
  },
  "npc-townHall": {
    "id": "npc-townHall",
    "nameKey": "npc_townhall_name",
    "icon": "🏛️",
    "color": "#94a3b8",
    "image": "img/npcs/official_hall.webp",
    "progKey": "townHall",
    "maxProgress": 5,
    "chapter": "Village Life"
  },
  "npc-blacksmith": {
    "id": "npc-blacksmith",
    "nameKey": "npc_blacksmith_name",
    "icon": "⚒️",
    "color": "#475569",
    "image": "img/npcs/blacksmith.webp",
    "progKey": "blacksmith",
    "maxProgress": 5,
    "chapter": "Village Life",
    "tradeActions": [
      {
        "id": "act-buy-iron-parts",
        "minProgress": 1
      }
    ]
  },
  "npc-sage": {
    "id": "npc-sage",
    "nameKey": "npc_sage_name",
    "icon": "🔮",
    "color": "#8b5cf6",
    "image": "img/npcs/sage.webp",
    "progKey": "sage",
    "maxProgress": 5,
    "chapter": "Village Life"
  },
  "npc-hunter": {
    "id": "npc-hunter",
    "nameKey": "npc_hunter_name",
    "icon": "🏹",
    "color": "#10b981",
    "image": "img/npcs/hunter_nyx.webp",
    "progKey": "hunter",
    "maxProgress": 5,
    "chapter": "Village Life",
    "unlockedAtStart": true,
    "tradeActions": [
      {
        "id": "act-sell-meat",
        "minProgress": 2
      },
      {
        "id": "act-buy-meat",
        "minProgress": 2
      }
    ]
  },
  "npc-treeOfLife": {
    "id": "npc-treeOfLife",
    "nameKey": "npc_treeoflife_name",
    "icon": "🌳",
    "color": "#10b981",
    "image": "img/npcs/NPC_TreeofLife.webp",
    "progKey": "treeOfLife",
    "maxProgress": 1,
    "chapter": "The Transformation"
  },
  "npc-ellie": {
    "id": "npc-ellie",
    "nameKey": "npc_ellie_name",
    "icon": "✨",
    "color": "#a78bfa",
    "image": "img/npcs/Ellie.webp",
    "progKey": "ellie",
    "maxProgress": 5,
    "chapter": "The Dream"
  },
  "npc-aris": {
    "id": "npc-aris",
    "nameKey": "npc_aris_name",
    "icon": "🧙‍♂️",
    "color": "#8b5cf6",
    "image": "img/npcs/Aris.webp",
    "progKey": "aris",
    "maxProgress": 6,
    "chapter": "The Dream"
  }
};

// === Buff Registry ===

export const BUFF_REGISTRY_GENERATED: Record<string, any> = {
  "buff-gourmet": {
    "id": "buff-gourmet",
    "title": "item_gourmet_meal_title",
    "desc": "buff_gourmet_desc",
    "duration": 300,
    "modifiers": [
      {
        "key": "energy_reg_bonus",
        "add": 1
      }
    ]
  },
  "buff-harvest": {
    "id": "buff-harvest",
    "title": "buff_harvest_title",
    "desc": "buff_harvest_desc",
    "duration": 60,
    "modifiers": [
      {
        "key": "wood_yield",
        "add": 1
      },
      {
        "key": "stone_yield",
        "add": 1
      }
    ]
  }
};

// === Home Registry ===

export const HOME_REGISTRY_GENERATED: Record<string, any> = {
  "home-tent": {
    "id": "home-tent",
    "nameKey": "home_tent_title",
    "descKey": "home_tent_desc",
    "image": "img/housing/tent.webp",
    "capacity": 4
  },
  "home-house": {
    "id": "home-house",
    "nameKey": "home_house_title",
    "descKey": "home_house_desc",
    "image": "img/housing/house.webp",
    "capacity": 12
  },
  "home-lake": {
    "id": "home-lake",
    "nameKey": "home_lake_title",
    "descKey": "home_lake_desc",
    "image": "img/housing/lake_house.webp",
    "capacity": 8,
    "baseLimits": {
      "water": 50
    },
    "modifiers": [
      {
        "key": "garden_yield",
        "add": 3
      }
    ]
  },
  "home-tower": {
    "id": "home-tower",
    "nameKey": "home_tower_title",
    "descKey": "home_tower_desc",
    "image": "img/housing/island_tower.webp",
    "capacity": 8,
    "baseLimits": {
      "magic": 100
    },
    "modifiers": [
      {
        "key": "magic_cost",
        "add": -2
      }
    ]
  }
};

// === Milestone Registry ===

export const MILESTONE_REGISTRY_GENERATED: Record<string, any> = {
  "milestone-treeOfLife": {
    "id": "milestone-treeOfLife",
    "icon": "🌳",
    "requirements": {
      "flags.build-house": true,
      "npcProgress.baker": {
        "op": ">=",
        "val": 5
      },
      "npcProgress.teacher": {
        "op": ">=",
        "val": 3
      },
      "npcProgress.sage": {
        "op": ">=",
        "val": 5
      }
    },
    "onUnlock": [
      {
        "type": "unlockNPC",
        "id": "npc-treeOfLife"
      },
      {
        "type": "setObjective",
        "id": "obj_tree_of_life"
      },
      {
        "type": "playSound",
        "id": "success"
      },
      {
        "type": "log",
        "logKey": "tree_unlocked_log",
        "color": "var(--gold)"
      }
    ]
  }
};

// === Navigation Registry ===

export const NAVIGATION_REGISTRY_GENERATED: Record<string, any> = {
  "main": {
    "id": "main",
    "icon": "story",
    "label": "nav_main"
  },
  "crafting": {
    "id": "crafting",
    "icon": "crafting",
    "label": "nav_crafting"
  },
  "village": {
    "id": "village",
    "icon": "village",
    "label": "nav_locations"
  },
  "upgrades": {
    "id": "upgrades",
    "icon": "upgrades",
    "label": "nav_upgrades"
  },
  "housing": {
    "id": "housing",
    "icon": "housing",
    "label": "nav_housing",
    "requiredFlag": "build-house"
  },
  "collection": {
    "id": "collection",
    "icon": "chronic",
    "label": "nav_collection"
  }
};

// === Title Registry ===

export const TITLE_REGISTRY_GENERATED: Record<string, any> = {};

// === Translations (lang -> context -> key -> string) ===

// Translation values can be flat strings or nested objects ({title, desc, ...}).
export const TRANSLATIONS_GENERATED: Record<string, Record<string, Record<string, any>>> = {
  "de": {
    "actions": {
      "help": {
        "title": "Hilfe"
      },
      "new_game": {
        "title": "menu_new_game",
        "desc": "ui_new_game_desc"
      },
      "build-campfire": {
        "title": "Lagerfeuer entzünden",
        "desc": "Wärme in der Dunkelheit. Erhöht die Sättigung beim Essen."
      },
      "build-tent": {
        "title": "Zelt aufstellen",
        "desc": "Erster bescheidener Schutz. Verbessert die Regeneration beim Ausruhen."
      },
      "build-house": {
        "title": "Hütte bauen",
        "desc": "Dein festes Fundament am Boden."
      },
      "build-home-lake": {
        "title": "Haus am See bauen",
        "desc": "Ein friedliches Heim direkt am Wasser."
      },
      "build-home-tower": {
        "title": "Aura-Turm errichten",
        "desc": "Ein Leuchtfeuer für magische Energien."
      },
      "build-wood-storage": {
        "title": "Holzlager I",
        "desc": "Schafft Platz für mehr Vorräte (+25)."
      },
      "build-stone-storage": {
        "title": "Steinlager I",
        "desc": "Mehr Gestein lagerbar (+25)."
      },
      "build-wood-storage-2": {
        "title": "Holzlager II",
        "desc": "Zusätzliche Lagerkapazität (+25)."
      },
      "build-stone-storage-2": {
        "title": "Steinlager II",
        "desc": "Zusätzliche Lagerkapazität (+25)."
      },
      "build-wood-storage-3": {
        "title": "Holz-Schuppen",
        "desc": "Ein stabiler Schuppen für mehr Holz (+30)."
      },
      "build-stone-storage-3": {
        "title": "Stein-Schuppen",
        "desc": "Ein Platz für schwere Brocken (+30)."
      },
      "build-wood-storage-4": {
        "title": "Holz-Lagerhaus",
        "desc": "Großzügiger Speicherplatz für Holz-Vorräte (+35)."
      },
      "build-stone-storage-4": {
        "title": "Stein-Lagerhaus",
        "desc": "Massives Lager für Stein-Ressourcen (+35)."
      },
      "build-water-barrel": {
        "title": "Wasserfass",
        "desc": "Sammelt Regenwasser. Erhöht das Wasser-Limit (+25)."
      },
      "build-table": {
        "title": "Massiver Tisch",
        "desc": "Ort für Studium und Strategie."
      },
      "build-kitchen": {
        "title": "Küchen-Station",
        "desc": "Ermöglicht Kochen komplexer Rezepte."
      },
      "build-arcane-sanctum": {
        "title": "Arkane Zuflucht",
        "desc": "Erforsche die Magie des Aethers."
      },
      "build-garden": {
        "title": "Garten anlegen",
        "desc": "Säe Kräuter und Blumen.",
        "effect": "Ermöglicht den Kräuteranbau."
      },
      "build-garden-upgrade": {
        "title": "Gartenerweiterung",
        "desc": "Zweiter Beet-Slot.",
        "effect": "Schaltet den zweiten Garten-Slot frei."
      },
      "act-study": {
        "title": "Studieren",
        "desc": "Erweitere dein geistiges Magie-Limit.",
        "effect": "+{val} Magie-Limit"
      },
      "act-meditate-sanctum": {
        "title": "Meditieren",
        "desc": "Ziehe Astral-Splitter aus der Luft.",
        "effect": "+1 Astralsplitter"
      },
      "act-cook-gourmet": {
        "title": "Gourmet-Kochen",
        "desc": "Bereite ein Festmahl zu.",
        "effect": "+1 Gourmet-Mahlzeit"
      },
      "act-garden-plant": {
        "title": "Anpflanzen (Slot 1)",
        "desc": "Kräuter aussäen.",
        "effect": "+{val} Kräuter"
      },
      "act-garden-plant-2": {
        "title": "Anpflanzen (Slot 2)",
        "desc": "Nutze das parallele Beet.",
        "effect": "+ {val} Kräuter"
      },
      "act-garden-water": {
        "title": "Wasser holen",
        "desc": "Schöpfe frisches Wasser aus dem Brunnen für deinen Garten.",
        "effect": "+ 2 Wasser"
      },
      "act-sell-wood": {
        "title": "Holz verkaufen",
        "desc": "Tausche Holz gegen Splitter.",
        "effect": "+ 5 Splitter"
      },
      "act-sell-meat": {
        "title": "Fleisch verkaufen",
        "desc": "Verkaufe Fleisch für Seelensplitter.",
        "effect": "+ 10 Splitter"
      },
      "act-sell-stone": {
        "title": "Steine verkaufen",
        "desc": "Tausche Stein gegen Splitter.",
        "effect": "+ 8 Splitter"
      },
      "act-buy-meat": {
        "title": "Fleisch kaufen",
        "desc": "Kaufe Fleisch für deine Vorräte.",
        "effect": "+ 1 Fleisch"
      },
      "act-hunt": {
        "title": "Jagen",
        "desc": "Nutze den Bogen im Wald.",
        "effect": "+{val} Fleisch"
      },
      "act-wood": {
        "title": "Zweige sammeln",
        "title_alt": "Holz schlagen",
        "effect": "+{val} Holz"
      },
      "act-stone": {
        "title": "Steine sammeln",
        "title_alt": "Felsen brechen",
        "effect": "+{val} Stein"
      },
      "act-mine-quartz": {
        "title": "Quarz schürfen",
        "desc": "Baue seltene Kristalle in der dunklen Mine ab.",
        "effect": "+{val} Splitter & Stein"
      },
      "act-collect-water": {
        "title": "Wasser schöpfen",
        "desc": "Hole frisches Wasser aus dem Waldsee.",
        "effect": "+1 Wasser"
      },
      "act-pick-flowers": {
        "title": "Blumen pflücken",
        "desc": "Sammle bunte Wiesenblumen für dein Heim.",
        "effect": "+{val} Blumen"
      },
      "act-eat": {
        "title": "Beeren essen",
        "desc": "Nähr dich von den Gaben des Bodens.",
        "effect": "+{val} Sättigung"
      },
      "act-rest": {
        "title": "Ausruhen",
        "desc": "Hör auf das Schwingenschlagen in der Ferne.",
        "effect": "+{val} Energie"
      },
      "act-meditate": {
        "title": "Fokussieren",
        "desc": "Blick nach oben, doch Wurzeln am Boden.",
        "effect": "+{val} Magie"
      },
      "act-npc-baker": {
        "title": "Bäcker Gara"
      },
      "act-npc-flowerGirl": {
        "title": "Blumenmädchen Mina"
      },
      "act-npc-artisan": {
        "title": "Handwerker Geron"
      },
      "act-npc-teacher": {
        "title": "Lehrerin Aria"
      },
      "act-npc-townHall": {
        "title": "Rathaus-Beamter"
      },
      "act-npc-blacksmith": {
        "title": "Schmied Thorin"
      },
      "act-npc-sage": {
        "title": "Alter Seher"
      },
      "act-npc-hunter": {
        "title": "Jäger Nyx"
      },
      "act-npc-ellie": {
        "title": "Ellie"
      },
      "act-npc-aris": {
        "title": "Aris"
      },
      "act-npc-treeOfLife": {
        "title": "Baum des Lebens"
      },
      "act-work": {
        "title": "Tagelohn",
        "desc": "Verrichte einfache Handlangerdienste im Dorf für Seelensplitter.",
        "effect": "+{val} Splitter"
      },
      "act-dream-bloom": {
        "title": "Traum-Blüte",
        "desc": "Lasse Magie in Form einer ätherischen Blume manifestieren.",
        "effect": "+1 Traum-Blüte"
      },
      "act-spell-harvest": {
        "title": "Magie-Ernte",
        "desc": "Gewinne reine Energie aus deinen arkanen Studien.",
        "effect": "+{val} Magie"
      },
      "act-wanderstock": {
        "title": "Wanderstock schnitzen",
        "desc": "Ein treuer Begleiter für deine Wege."
      },
      "act-axe": {
        "title": "Steinaxt herstellen",
        "desc": "Ermöglicht das Fällen von Bäumen.",
        "effect": "Ermöglicht das Fällen von Bäumen."
      },
      "act-pickaxe": {
        "title": "Spitzhacke herstellen",
        "desc": "Ermöglicht den Abbau von Felsen.",
        "effect": "Ermöglicht den Abbau von Felsen."
      },
      "act-bow": {
        "title": "Jagdbogen bauen",
        "desc": "Unverzichtbar für die Jagd im Wald.",
        "effect": "Unverzichtbar für die Jagd im Wald."
      },
      "act-bed": {
        "title": "Einfaches Bett",
        "desc": "Verbessert deine Erholung beim Schlafen."
      },
      "act-chair": {
        "title": "Holzstuhl",
        "desc": "Ein einfacher Sitzplatz für dein Zuhause."
      },
      "act-stove": {
        "title": "Steinofen",
        "desc": "Ermöglicht das Backen und Kochen."
      },
      "act-bookshelf": {
        "title": "Bücherregal",
        "desc": "Platz für gesammeltes Wissen."
      },
      "act-book": {
        "title": "Buch binden",
        "desc": "Halte deine Erkenntnisse fest."
      },
      "act-cabinet": {
        "title": "Vorratskammer",
        "desc": "Erhöht deine Lagerkapazität für Proviant."
      },
      "act-spice-rack": {
        "title": "Gewürzregal",
        "desc": "Platz für mehr Kräuter."
      },
      "act-grand-table": {
        "title": "Massiver Esstisch",
        "desc": "Ein prachtvolles Möbelstück."
      },
      "act-bed-2": {
        "title": "Seidenbett weben",
        "desc": "Maximaler Komfort durch magische Seide."
      },
      "act-stove-2": {
        "title": "Ewiger Herd",
        "desc": "Ein Herd mit unendlicher arkaner Hitze."
      },
      "act-chisel": {
        "title": "Meißel herstellen",
        "effect": "Ermöglicht feinere Handwerkskunst."
      },
      "build-loom": {
        "title": "Webstuhl bauen",
        "desc": "Ermöglicht die Herstellung feiner Stoffe."
      },
      "build-bookshelf-large": {
        "title": "Großes Bücherregal bauen",
        "desc": "Ein massives Regal für eine riesige Bibliothek."
      },
      "build-desk": {
        "title": "Schreibpult bauen",
        "desc": "Ein dedizierter Platz zum Studieren."
      },
      "act-grind-dust": {
        "title": "Arkanstaub mahlen",
        "desc": "Nutze magische Energie, um Kräuter zu feinem Arkanstaub zu verarbeiten."
      },
      "build-cart-reinforced": {
        "title": "Verstärkten Karren bauen",
        "desc": "Ein verbesserter Karren für schwere Lasten."
      },
      "build-mana-basin": {
        "title": "Mana-Bassin bauen",
        "desc": "Ein Becken, das die Magie der Natur bündelt."
      },
      "build-terrace": {
        "title": "Sonnenterrasse anlegen",
        "desc": "Ein herrlicher Außenbereich für dein Haus."
      },
      "act-whisper-wood": {
        "title": "Geisterholz sammeln",
        "desc": "Suche nach dem silbrigen Leuchten im Hain.",
        "effect": "+{val} Geisterholz"
      },
      "act-whisper-pollen": {
        "title": "Leuchtpollen fangen",
        "desc": "Sammle die tanzenden Lichter ein.",
        "effect": "+{val} Leuchtpollen"
      },
      "act-dig-clay": {
        "title": "Ton graben",
        "desc": "Suche im feuchten Waldboden nach brauchbarem Ton.",
        "effect": "+{val} Ton"
      },
      "act-buy-iron-parts": {
        "title": "Beschläge kaufen",
        "desc": "Erhalte hochwertige Eisenbeschläge direkt vom Schmied.",
        "effect": "+1 Eisenbeschläge"
      },
      "act-read-lore-1": {
        "title": "Lesen: Kaiserliche Blutlinie",
        "desc": "Vertiefe dein Wissen über die Herrscherfamilie."
      },
      "act-read-lore-2": {
        "title": "Lesen: Die schwebenden Lande",
        "desc": "Studiere die Geographie von Draconia."
      }
    },
    "buffs": {
      "item_gourmet_meal_title": "Gourmet-Mahlzeit",
      "buff_gourmet_desc": "Nährt den Körper nachhaltig.",
      "buff_harvest_title": "Segen der Ahnen",
      "buff_harvest_desc": "Die Natur antwortet auf deinen Ruf (+1 auf alle Sammelerträge)."
    },
    "items": {
      "item_wanderstock_title": "Wanderstock",
      "item_wanderstock_desc": "Ein massiver Eschenholzstock.",
      "item_axe_title": "Steinaxt",
      "item_axe_desc": "Ein robustes Werkzeug für gesundes Holz.",
      "item_pickaxe_title": "Spitzhacke",
      "item_pickaxe_desc": "Zertrümmert das Gestein mit einem Singen.",
      "item_bow_title": "Jagdbogen",
      "item_bow_desc": "Ein handgefertigter Bogen für die Jagd.",
      "item_bread_title": "Frisches Brot",
      "item_bread_desc": "Vom Bäcker mit Liebe gebacken (+25 Sättigung).",
      "item_cookie_title": "Heimeliger Keks",
      "item_cookie_desc": "Ein süßer Snack mit belebenden Kräutern (+40 Sättigung).",
      "item_dried_meat_title": "Trockenfleisch",
      "item_dried_meat_desc": "Zäher, aber nahrhafter Proviant (+15 Energie).",
      "item_gourmet_meal_title": "Gourmet-Mahlzeit",
      "item_gourmet_meal_desc": "Ein exquisites Mahl (+50 Sättigung, +30 Energie).",
      "item_deed_title": "Landurkunde",
      "item_deed_desc": "Ein offizielles Dokument über den Landbesitz.",
      "item_scroll_title": "Alte Schriftrolle",
      "item_scroll_desc": "Flüstert von der geheimnisvollen Geschichte Draconias.",
      "item_whetstone_title": "Wetzstein",
      "item_whetstone_desc": "Hält deine Klingen scharf und einsatzbereit.",
      "item_arrowhead_title": "Pfeilspitze",
      "item_arrowhead_desc": "Aus scharfem Feuerstein für den Jagderfolg.",
      "item_chisel_title": "Meißel",
      "item_chisel_desc": "Präzisionswerkzeug für die feinere Steinbearbeitung.",
      "item_astral_shards_title": "Astralsplitter",
      "item_astral_shards_desc": "Binden die Magie an die Materie.",
      "item_dream_dust_title": "Traumsand",
      "item_dream_dust_desc": "Verschwimmt die Grenzen der Realität.",
      "item_wyvern_scale_title": "Wyvern-Schuppe",
      "item_wyvern_scale_desc": "Eine Drachenschuppe für magische Artefakte.",
      "item_arcane_dust_title": "Arkaner Staub",
      "item_arcane_dust_desc": "Feinste Partikel purer Magie.",
      "item_crystal_mana_title": "Manakristall",
      "item_crystal_mana_desc": "Ein Gefäß für konzentrierte magische Kraft.",
      "item_bed_2_title": "Seidenbett",
      "item_bed_2_desc": "Maximale Regeneration im Schlaf (+100).",
      "item_stove_2_title": "Ewiger Herd",
      "item_stove_2_desc": "Ein Herd, dessen Flamme niemals erlischt.",
      "item_bed_title": "Einfaches Bett",
      "item_bed_desc": "Verbessert deine Erholung beim Schlafen.",
      "item_chair_title": "Holzstuhl",
      "item_chair_desc": "Ein einfacher Sitzplatz für dein Zuhause.",
      "item_stove_title": "Steinofen",
      "item_stove_desc": "Ein rustikaler Ofen zum Kochen.",
      "item_bookshelf_title": "Bücherregal",
      "item_bookshelf_desc": "Bietet Platz zur Aufbewahrung von Wissen.",
      "item_cabinet_title": "Vorratskammer",
      "item_cabinet_desc": "Erhöht die Lagerkapazität für Proviant.",
      "item_spice_rack_title": "Gewürzregal",
      "item_spice_rack_desc": "Ein Platz für seltene Kräuter.",
      "item_grand_table_title": "Massiver Esstisch",
      "item_grand_table_desc": "Ein prachtvoller Tisch für dein Heim.",
      "item_ghostwood_title": "Geisterholz",
      "item_glowpollen_title": "Leuchtpollen",
      "item_loom_title": "Webstuhl",
      "item_loom_desc": "Ein Gerät zur Verarbeitung feiner Fasern.",
      "item_bookshelf_large_title": "Großes Bücherregal",
      "item_bookshelf_large_desc": "Viel Platz für gesammeltes Wissen.",
      "item_desk_title": "Schreibpult",
      "item_desk_desc": "Ein Ort der Konzentration und des Lernens.",
      "item_cart_reinforced_title": "Verstärkter Karren",
      "item_cart_reinforced_desc": "Hält schwersten Lasten stand.",
      "item_mana_basin_title": "Mana-Bassin",
      "item_mana_basin_desc": "Sammelt die Magie der Umgebung.",
      "item_terrace_title": "Sonnenterrasse",
      "item_terrace_desc": "Ein Ort der Ruhe und Regeneration.",
      "item_clay_title": "Feuchter Ton",
      "item_book_lore_1_title": "Buch: Die kaiserliche Blutlinie",
      "item_book_lore_1_desc": "Ein verstaubter, aber edler Band über die Herrscher Draconias.",
      "item_book_lore_2_title": "Buch: Die schwebenden Lande",
      "item_book_lore_2_desc": "Eine detaillierte Abhandlung über die Geographie und Wunder der Welt.",
      "item_crystal_apple_title": "Kristallapfel",
      "item_crystal_apple_desc": "Ein gläsern glänzender Apfel, der magisch nährt (+30 Sättigung, +20 Energie)."
    },
    "logs": {
      "save_success": "Spiel erfolgreich gespeichert.",
      "intro_welcome": "Willkommen zurück am festen Boden, {player}.",
      "reward_unlock_npc": "Neue Bekanntschaft: {name}",
      "reward_unlock_recipe": "Neues Rezept freigeschaltet: {title}",
      "reward_unlock_item": "Gegenstand entdeckt: {title}",
      "reward_blueprint_lake": "Bauplan für das Haus am See erhalten.",
      "reward_blueprint_tower": "Bauplan für den Aura-Turm erhalten.",
      "unlock_whisper_grove": "Mina führt dich zu einem geheimen Pfad: Der Flüsterhain ist nun zugänglich.",
      "receive_books": "Bücher erhalten! Du kannst sie jetzt in deiner Chronik lesen.",
      "receive_apple": "Du hast einen Kristallapfel erhalten! Eine süße Stärkung für deine Reise.",
      "townhall_registered": "Offizielle Registrierung",
      "townhall_tax_paid": "Steuern & Gebühren",
      "townhall_land_prepped": "Landurkunde (Vorstufe)",
      "npc_dialogue_log": "<strong>{name}:</strong> {text}",
      "lore_entry_log": "📖 Lore: {text}",
      "ellie_tutorial_1": "Willkommen in Draconia! Ich bin Ellie, deine Begleiterin am Boden.",
      "ellie_tutorial_2": "Hier unten sammelst du Ressourcen und baust eine neue Heimat auf, um eines Tages wieder aufsteigen zu können.",
      "ellie_tutorial_3": "Beginne damit, Zweige zu sammeln. Nutze den \"Fokus\", wenn du dich auf eine Sache spezialisieren willst!",
      "ellie_tutorial_4": "Achte auf deine Sättigung! Sie sinkt, wenn du Energie oder Magie verbrauchst. Wenn du hungrig bist, wird jede Arbeit viel anstrengender und teurer. Iss regelmäßig Beeren oder Mahlzeiten, um effizient zu bleiben.",
      "intro_1": "Über dir gleitet ein prächtiger Winddrache mühelos von Dach zu Dach. In seiner humanoiden Form wirken seine zusammengeklappten Schwingen wie ein edler Mantel.",
      "intro_2": "Du gehst den langen Weg zu Fuß. Du bist ebenfalls ein Drache - doch du kannst dich nicht verwandeln oder Flügel manifestieren.",
      "intro_3": "Ein Händler-Wyvern landet vor dem Dorftor. Er bemerkt dich nicht. Du hast dich daran gewöhnt, das andere mächtiger sind als du.",
      "intro_4": "Regen setzt ein. Die anderen schütteln ihre Schwingen – Leder, Federn, Schuppen – und fliegen nach Hause. Du bleibst am Boden.",
      "intro_5": "Du bleibst unten, wie immer. Du vermisst eine Verbindung, die du nie hattest...",
      "intro_6": "Doch hier, am Rande des Dorfes, möchtest du dir ein Leben aufbauen. Mit deinen eigenen Händen.",
      "intro_7": "Willkommen in deinem neuen Zuhause. Du Drachenwandler ohne Drachenform... ein Rätsel in Draconia.",
      "fail_resources": "Mangelnde Ressourcen für diese Aktion.",
      "fail_buff_active": "Wirkung ist noch aktiv.",
      "fail_furniture_space": "Nicht genügend Platz für weitere Möbel!",
      "fail_satiation_loop": "Zu hungrig für konzentrierte Arbeit!",
      "fail_low_efficiency": "Du bist zu erschöpft! Die Anstrengung ist gerade zu groß (niedrige Sättigung).",
      "fail_energy": "Nicht genügend Energie.",
      "fail_magic": "Nicht genügend Magie.",
      "fail_satiation": "Du bist zu hungrig.",
      "fail_focus": "Nicht genügend Fokus.",
      "fail_wood": "Nicht genügend Holz.",
      "fail_stone": "Nicht genügend Stein.",
      "fail_meat": "Nicht genügend Fleisch.",
      "fail_water": "Nicht genügend Wasser.",
      "fail_flowers": "Nicht genügend Blumen.",
      "fail_herbs": "Nicht genügend Kräuter.",
      "fail_shards": "Nicht genügend Splitter.",
      "fail_astral_shards": "Nicht genügend Astralsplitter.",
      "fail_arcane_dust": "Nicht genügend Arkanstaub.",
      "fail_gourmet-meal": "Nicht genügend Gourmet-Mahlzeiten.",
      "fail_books": "Nicht genügend Bücher.",
      "fail_ghostwood": "Nicht genügend Geisterholz.",
      "fail_glowpollen": "Nicht genügend Leuchtpollen.",
      "fail_fibers": "Nicht genügend Fasern.",
      "fail_resin": "Nicht genügend Harz.",
      "fail_iron_parts": "Nicht genügend Eisenbeschläge.",
      "fail_clay": "Nicht genügend Ton.",
      "fail_rune_fragment": "Nicht genügend Runenfragmente.",
      "fail_study_xp": "Nicht genügend Studien-Erfahrung.",
      "fail_wood_yield": "Nicht genügend Holzertrag-Kapazität.",
      "fail_stone_yield": "Nicht genügend Steinertrag-Kapazität.",
      "fail_rest_energy_gain": "Nicht genügend Energie-Regeneration.",
      "fail_eat_satiation_gain": "Nicht genügend Sättigungs-Bonus.",
      "fail_garden_magic_cost": "Nicht genügend Garten-Magie-Effizienz.",
      "fail_full_energy": "Deine Energie ist bereits voll.",
      "fail_full_magic": "Deine Magie ist bereits voll.",
      "fail_full_satiation": "Du bist vollkommen gesättigt.",
      "fail_full_focus": "Fokus-Limit erreicht.",
      "fail_full_wood": "Das Holzlager ist voll.",
      "fail_full_stone": "Das Steinlager ist voll.",
      "fail_full_meat": "Das Fleischlager ist voll.",
      "fail_full_shards": "Der Splitterbehälter ist voll.",
      "fail_full_astral_shards": "Der Astralsplitterbehälter ist voll.",
      "fail_full_arcane_dust": "Das Arkanstaublager ist voll.",
      "fail_full_books": "Das Bücherregal ist voll.",
      "fail_full_gourmet-meal": "Das Gourmet-Lager ist voll.",
      "fail_full_herbs": "Das Kräuterlager ist voll.",
      "fail_full_water": "Der Wasserbehälter ist voll.",
      "fail_full_flowers": "Deine Tasche für Blumen ist voll.",
      "fail_full_wood_yield": "Limit für Holzertrag erreicht.",
      "fail_full_stone_yield": "Limit für Steinertrag erreicht.",
      "fail_full_rest_energy_gain": "Limit für Energiegewinn erreicht.",
      "fail_full_eat_satiation_gain": "Limit für Sättigungsbonus erreicht.",
      "fail_full_garden_magic_cost": "Limit für Garten-Effizienz erreicht.",
      "fail_full_ghostwood": "Das Geisterholzlager ist voll.",
      "fail_full_glowpollen": "Der Leuchtpollenbehälter ist voll.",
      "fail_full_fibers": "Das Faserlager ist voll.",
      "fail_full_resin": "Das Harzlager ist voll.",
      "fail_full_iron_parts": "Das Lager für Eisenbeschläge ist voll.",
      "fail_full_clay": "Das Tonlager ist voll.",
      "fail_full_rune_fragment": "Das Runenfragmentlager ist voll.",
      "fail_full_study_xp": "Das Limit für Studien-Erfahrung wurde erreicht.",
      "ui_focus_stopped": "Fokus aufgehoben (Bedingungen nicht mehr erfüllt).",
      "item_used": "{item} benutzt.",
      "wood_log": "+{val} Holz gesammelt.",
      "stone_log": "+{val} Stein abgebaut.",
      "clay_log": "Ton abgebaut.",
      "eat_log": "+{val} Sättigung.",
      "rest_log": "+{val} Energie.",
      "meditate_log": "+{val} Magie.",
      "pick_flowers_log": "Du pflückst {val} bunte Wiesenblumen.",
      "whisper_wood_log": "Du sammelst silbrig glänzendes Geisterholz.",
      "whisper_pollen_log": "Du fängst leuchtenden Pollen in der Luft ein.",
      "garden_water_log": "Frisches Quellwasser für den Garten geschöpft.",
      "collect_water_log": "Du schöpfst klares Wasser aus einem Bach im Wald.",
      "garden_harvest_log": "Frische Kräuter geerntet. +{gain}",
      "cook_gourmet_success": "Das Festmahl ist bereit! Du fühlst dich gestärkt.",
      "tree_unlocked_log": "Ein uraltes Zittern geht durch die Erde. Der Baum des Lebens ist erwacht!",
      "obj_tree_of_life": "Suche den Baum des Lebens im Dorf auf.",
      "sell_wood_log": "Holz gegen Splitter getauscht.",
      "sell_stone_log": "Stein gegen Splitter getauscht.",
      "sell_meat_log": "Fleisch gegen Splitter getauscht.",
      "buy_meat_log": "Frisches Fleisch beim Händler gekauft.",
      "buy_iron_parts_log": "Stabile Eisenbeschläge beim Schmied Thorin erworben.",
      "work_log": "Tagesarbeit abgeschlossen. Splitter erhalten.",
      "hunt_log": "Erfolgreiche Jagd! Fleisch erbeutet.",
      "dream_bloom_log": "Eine ätherische Blüte ist erblüht.",
      "spell_harvest_log": "Magische Energie aus dem Aether gezogen.",
      "grind_dust_log": "Du hast magische Kräuter zu feinem Arkanstaub gemahlen.",
      "mine_quartz_log": "Kostbare Kristalle und Erze in der Tiefe gefunden. +{gain}",
      "meditation_log": "Tiefe Konzentration... ein Astralsplitter manifestiert sich.",
      "nav_crafting_desc": "Forme Werkzeuge aus den Gaben der Natur.",
      "nav_collection_desc": "Die Aufzeichnungen deines Lebens am Boden.",
      "craft_chisel": "Du hast einen scharfen Meißel geformt.",
      "craft_wanderstock": "Du hast einen Wanderstock geschnitzt.",
      "craft_axe": "Eine neue Steinaxt wurde hergestellt.",
      "craft_pickaxe": "Deine erste Spitzhacke ist bereit.",
      "craft_bow": "Du hast einen robusten Bogen gespannt.",
      "craft_bed": "Ein einfaches Bett wurde gebaut – für bessere Träume.",
      "craft_chair": "Ein bequemer Holzstuhl wurde gezimmert.",
      "craft_stove": "Ein Steinofen steht bereit für warme Mahlzeiten.",
      "craft_bookshelf": "Ein Regal für all dein gesammeltes Wissen.",
      "craft_cabinet": "Deine Vorratskammer bietet nun mehr Platz für Essen.",
      "craft_spice_rack": "Ein Gewürzregal für Kräuter und Alchemie.",
      "craft_grand_table": "Ein massiver Tisch, Symbol für eine wachsende Gemeinschaft.",
      "craft_bed_2": "Du hast ein luxuriöses Seidenbett gewebt.",
      "craft_stove_2": "Der Ewige Herd gewährt dir grenzenlose arkane Hitze.",
      "milestone_campfire": "Ein wärmendes Lagerfeuer wurde entzündet.",
      "milestone_tent": "Dein erster Unterschlupf ist bereit.",
      "milestone_wood_storage": "Das Holzlager wurde fertiggestellt.",
      "milestone_stone_storage": "Das Steinlager wurde fertiggestellt.",
      "milestone_table": "Ein massiver Tisch für dein Studium.",
      "milestone_kitchen": "Die Küche ist bereit für kulinarische Experimente.",
      "milestone_sanctum": "Das Arkane Heiligtum wurde errichtet.",
      "milestone_garden": "Der Garten ist angelegt und bereit zur Aussaat.",
      "milestone_garden_upgrade": "Der Garten wurde um ein zweites Beet erweitert.",
      "milestone_treeOfLife": "Der Baum des Lebens erblüht.",
      "milestone_house": "Das Haus steht fest – ein Monument deines Willens.",
      "milestone_lake_house": "Das Haus am See glitzert im Licht der Morgensonne.",
      "milestone_aura_tower": "Der Aura-Turm durchstößt die Wolkendecke von Draconia.",
      "milestone_school": "Die Dorfschule wurde gegründet.",
      "milestone_school-graduate": "Du hast deinen Schulabschluss erhalten. Aria lächelt stolz.",
      "school_graduate_log": "Du hast deinen Schulabschluss erhalten. Aria lächelt stolz.",
      "npc_teacher_2_no_house": "\"Es ist schön dich zu sehen, {player}. Aber ohne ein festes Dach über dem Kopf wird das mit dem Lernen schwierig. Komm doch wieder, wenn du ein eigenes Haus hast.\"",
      "npc_teacher_2_with_house": "\"Ah, ich sehe du hast dir ein schönes Heim geschaffen. Jetzt können wir uns dem Studium widmen!\"",
      "focus_broken_magic": "Deine magische Energie ist erschöpft. Der arkane Fokus wurde unterbrochen."
    },
    "milestones": {
      "milestone-treeOfLife": {
        "title": "Der Baum des Lebens",
        "desc": "Du hast die Aufmerksamkeit des uralten Baumes geweckt."
      },
      "milestone-school": {
        "title": "Die Dorfschule",
        "desc": "Ein Ort des Lernens und der Gemeinschaft."
      },
      "milestone-school-graduate": {
        "title": "Schulabschluss",
        "desc": "Du hast dein Grundstudium erfolgreich beendet."
      }
    },
    "modifiers": {
      "wood_yield_title": "Holz-Ertrag",
      "wood_yield_desc": "Erhöht die Ausbeute beim Holzsammeln.",
      "stone_yield_title": "Stein-Ertrag",
      "stone_yield_desc": "Erhöht die Ausbeute beim Steinsammeln.",
      "meat_yield_title": "Fleisch-Ertrag",
      "meat_yield_desc": "Erhöht die Ausbeute bei der Jagd.",
      "flowers_yield_title": "Blumen-Ertrag",
      "flowers_yield_desc": "Erhöht die Auswahl beim Blumenpflücken.",
      "shards_yield_title": "Splitter-Ertrag",
      "shards_yield_desc": "Erhöht die Ausbeute an Seelensplittern.",
      "magic_yield_title": "Magie-Ertrag",
      "magic_yield_desc": "Erhöht die Ausbeute an magischer Energie.",
      "rest_energy_gain_title": "Energie-Regeneration",
      "rest_energy_gain_desc": "Beschleunigt die Erholung beim Ausruhen.",
      "eat_satiation_gain_title": "Sättigungs-Bonus",
      "eat_satiation_gain_desc": "Erhöht die Sättigung durch Mahlzeiten.",
      "modifier_garden_magic_cost_title": "Garten-Magie",
      "modifier_garden_magic_cost_desc": "Verringert die Magiekosten im Garten.",
      "modifier_magic_cost_title": "Magie-Effizienz",
      "modifier_magic_cost_desc": "Verringert die Magiekosten aller Aktionen.",
      "modifier_ghostwood_yield_title": "Geisterholz-Ertrag",
      "modifier_ghostwood_yield_desc": "Erhöht die Ausbeute beim Sammeln im Hain.",
      "modifier_glowpollen_yield_title": "Pollen-Ertrag",
      "modifier_glowpollen_yield_desc": "Erhöht die Menge des gefangenen Pollens.",
      "modifier_fibers_yield_title": "Faser-Ertrag",
      "modifier_fibers_yield_desc": "Erhöht die Ausbeute an Fasern.",
      "modifier_clay_yield_title": "Ton-Ertrag",
      "modifier_clay_yield_desc": "Erhöht die Ausbeute beim Ton-Graben.",
      "energy_reg_bonus_title": "Energie-Resonanz",
      "energy_reg_bonus_desc": "Boni durch Energierosen-Energie.",
      "garden_yield_title": "Garten-Ertrag",
      "garden_yield_desc": "Erhöht die Ernte im Garten.",
      "magic_limit_gain_title": "Magische Kapazität",
      "magic_limit_gain_desc": "Erweitert dein Magie-Potenzial.",
      "knowledge_yield_desc": "Erhöht den Zuwachs an allgemeinem Wissen.",
      "resource_efficiency_desc": "Beeinflusst die Geschwindigkeit und Ausbeute deiner Arbeit.",
      "satiation_drain_desc": "Beeinflusst wie schnell dein Hunger steigt.",
      "limit_desc_generic": "Erhöht das maximale Limit für {res}.",
      "modifier_meditate_magic_gain_title": "Meditations-Gewinn",
      "modifier_meditate_magic_gain_desc": "Erhöht die Magie pro Meditation."
    },
    "navigation": {},
    "npcs": {
      "npc_baker_1": "\"Willkommen! Ich bin Gara. Ich bin der Bäcker hier im Ort. Und wie heißt du, Fremder?\"",
      "npc_baker_2": "\"Der Ofen brennt heiß. Danke für das Holz, {player}. Wenn du mehr hast lass sie bei mir. Ich gebe dir dafür Geld!\"",
      "npc_baker_3": "\"Ein Keks gefällig, {player}? Sie halten dich auf Trab.\"",
      "npc_baker_4": "\"Immer mehr Leute kommen wegen meines Gebäcks. Du bist ein Segen, {player}.\"",
      "npc_baker_5": "\"{player}, nimm diesen letzten Vorrat. Du hast viel für uns getan.\"",
      "npc_flowerGirl_1": "\"Hallo... uhm, ich bin Mina. Ich, äh... {player}? Das ist ein schöner Name.\"",
      "npc_flowerGirl_2": "\"Schönheit gedeiht auch im Schatten, {player}... spüre den Rhythmus.\"",
      "npc_flowerGirl_3": "\"Die Farben der Welt verändern sich, {player}, wenn man genau hinsieht.\"",
      "npc_flowerGirl_4": "\"Diese Schuppe... nimm sie, {player}. Sie gehört zum Äther.\"",
      "npc_flowerGirl_5": "\"Thorin braucht jemanden wie dich, {player}. Sag ihm, ich schicke dich.\"",
      "npc_flowerGirl_6": "\"Wunderbar, {player}! Diese Kräuter werden dem Dorf im Winter helfen. Hier ist der Bauplan für das Haus am See, den ich versprochen habe.\"",
      "npc_flowerGirl_7": "\"Du hast mir so viel geholfen... Ich kenne einen Ort, tief im Wald, den nur wenige sehen können. Es ist der Flüsterhain. Hier, nimm diesen Pfad. Aber sei vorsichtig mit den Geistern dort.\"",
      "npc_artisan_1": "\"Ich bin Geron. Holz ist der Anfang von alles. Ein Wanderstock gibt dir Halt.\"",
      "npc_artisan_2": "\"Stein ist geduldig, {player}. Er formt die Welt, Schritt für Schritt.\"",
      "npc_artisan_3": "\"Präzision ist alles. Nimm diesen Meißel, {player}, und forme dein Schicksal.\"",
      "npc_teacher_1": "\"Hallo dort! Du musst {player} sein, nicht wahr? Ich bin Aria, die Lehrerin hier im Dorf.\"",
      "npc_teacher_2_no_house": "\"Es ist schön dich zu sehen, {player}. Aber ohne ein festes Dach über dem Kopf wird das mit dem Lernen schwierig. Komm doch wieder, wenn du ein eigenes Haus hast.\"",
      "npc_teacher_2_with_house": "\"Ah, ich sehe du hast dich bereits häuslich eingerichtet! Sehr gut. Wie wäre es, wenn du deinen Schulabschluss nachholst? Es gibt viel über Draconia zu lernen.\"",
      "npc_teacher_3": "\"Wunderbar! Hier sind zwei grundlegende Werke über unsere Welt. Das eine handelt von der kaiserlichen Blutlinie, das andere von der Geographie unserer schwebenden Inseln. Lies sie dir unter \"Deine Reise\" aufmerksam durch. Wir sprechen uns danach wieder!\"",
      "npc_teacher_4_not_read": "\"Hast du die Bücher schon gelesen, die ich dir gegeben habe? Studiere sie bitte erst gründlich.\"",
      "npc_teacher_6": "\"Herzlichen Glückwunsch, {player}. Du hast die Bücher studiert und damit deinen Abschluss verdient!\"",
      "npc_aris_6": "\"Der Äther ist hier besonders dicht. Ein Turm würde als Kanal für deine Seelenform dienen. Dieser Entwurf wird deinen Bau leiten.\"",
      "npc_townHall_1": "\"Willkommen im Rathaus. Ich bin der Verwalter. Alle Ankömmlinge müssen registriert werden, wenn sie hier sesshaft werden wollen.\"",
      "npc_townHall_2": "\"Deine Papiere sind nun in Ordnung, {player}. Du darfst nun im Dorf arbeiten.\"",
      "npc_townHall_3": "\"Steuern und Abgaben... nur so kann unser Dorf wachsen, {player}.\"",
      "npc_townHall_4": "\"Du bist hier jetzt bekannt, {player}. Ein wertvolles Mitglied unserer Gemeinschaft. Wenn du noch ein wenig mehr gibst, kann ich dir, den Platz wo du wohnst, verkaufen.\"",
      "npc_townHall_5": "\"Diese Urkunde besiegelt deinen Platz in Draconia, {player}. Du darfst nun ein Haus bauen. Wenn du Hilfe brauchst, bin ich mir sicher das die anderen Dorfbewohner dir gerne helfen.\"",
      "npc_blacksmith_1": "\"Wer stört in der Schmiede? Ah... ich bin Thorin. und du?\"",
      "npc_blacksmith_2": "\"Magie im Feuer, {player}. Du verstehst das Handwerk.\"",
      "npc_blacksmith_3": "\"Ein Felsen ist nur ein Hindernis, {player}, bis man ihn bricht.\"",
      "npc_blacksmith_4": "\"Ein guter Wetzstein ist Gold wert, {player}. Er hält deine Ziele scharf.\"",
      "npc_blacksmith_5": "\"{player}, kein Flug, aber ein fester Stand. Das ist deine wahre Stärke.\"",
      "npc_hunter_1": "\"Halt! Wer schleicht da? ... Ach, ein neues Gesicht. Ich bin Nyx.\"",
      "npc_hunter_2": "\"Ein Bogen braucht Geduld, {player}. Und gutes Eschenholz.\"",
      "npc_hunter_3": "\"Hier, {player}, nimm diesen Bogen. Er wird deine Stimme im Dickicht sein.\"",
      "npc_hunter_4": "\"Der Wald gibt uns, was wir brauchen, {player}. Wenn wir ihn respektieren.\"",
      "npc_hunter_5": "\"Die Schatten gehören uns beiden nun. Ich jage an deiner Seite, {player}.\"",
      "npc_sage_1": "\"Wissen ist eine Bürde. Ich bin der Seher. Lies dieses book, Wandler.\"",
      "npc_sage_2": "\"Die Sterne flüstern von vergangenen Zeitaltern, {player}.\"",
      "npc_sage_3": "\"Dein Geist dehnt sich aus, {player}... siehst du die Muster?\"",
      "npc_sage_4": "\"Die Geschichte wiederholt sich nicht, {player}, aber es reimt sich.\"",
      "npc_sage_5": "\"{player}, du bist kein Rätsel mehr, sondern ein Teil von Draconia.\"",
      "npc_ellie_1": "\"Spürst du das Zittern der Erde?\"",
      "npc_ellie_2": "\"Die Träume weisen uns den Weg.\"",
      "npc_ellie_3": "\"Das Licht des Aethers wird immer heller.\"",
      "npc_ellie_4": "\"Geduld, kleiner Drache. Dein Weg ist fast bereit.\"",
      "npc_ellie_5": "\"Das Herz des Bodens schlägt für dich, {player}.\"",
      "npc_aris_1": "\"Jeder Zauber beginnt mit einem einzelnen Gedanken.\"",
      "npc_aris_2": "\"Spüre, wie die Energie in deine Fingerspitzen fließt.\"",
      "npc_aris_3": "\"Magie ist nicht nur Macht, sie ist Verantwortung.\"",
      "npc_aris_4": "\"Deine Verbindung zum Aether wird stärker.\"",
      "npc_aris_5": "\"Du hast das Herz von Draconia berührt.\"",
      "npc_treeOfLife_1": "\"Ich bin der Puls dieser Welt. Deine Reise hat gerade erst begonnen, Kleiner.\"",
      "lore_1_step_1": "<i>Die kaiserliche Familie herrscht vom Sonnenpalast aus, der im Herzen der Caldera thront, einem gewaltigen, üppig bewachsenen Vulkankrater.</i>",
      "lore_1_step_2": "<i>Kaiser Ignis Aurum führt Draconia mit eiserner Disziplin. Seine Magie ist so heiß wie die Sonne selbst.</i>",
      "lore_1_step_3": "<i>Kaiserin Amaterasu stammt aus dem Kristallreich im Westen. Ihre sanfte Lichtmagie wärmt das Gemüt des gesamten Volkes.</i>",
      "lore_1_step_4": "<i>Kronprinzessin Lunara ist die Erstgeborene. Sie befehligt nicht nur die Gezeiten, sondern wandelt auch sicher durch die Welt der Träume.</i>",
      "lore_1_step_5": "<i>Prinz Valerius, der General des Reiches, nutzt seine Erdmagie, um selbst härtestes Gestein wie weiches Wachs zu formen.</i>",
      "lore_1_step_6": "<i>Zephyrion, der Winddrache, ist für seine Schnelligkeit berühmt – doch nur wenige wissen von seiner Leidenschaft für die Alchemie.</i>",
      "lore_1_step_7": "<i>Der junge Ryuga ist der Jüngste der Familie. Noch ein kleiner Funke, doch sein Potenzial wird eines Tages die Welt erschüttern.</i>",
      "lore_1_step_8": "<i>Drachenwandler besitzen zwei Formen. Es gilt als unhöflich, die Schwingen in der humanoiden Form ohne Grund offen zu tragen.</i>",
      "lore_1_step_9": "<i>Die Dual-Monarchie stellt sicher, dass Frieden zwischen den verschiedenen Spezies herrscht, da Draconia zu groß für einen einzelnen Herrscher ist.</i>",
      "lore_1_step_10": "<i>Unter der Herrschaft der Kaiser stehen die Vasallen-Könige, welche die entlegeneren Inselgruppen verwalten und die Treue zum Sonnenpalast schwören.</i>",
      "lore_2_step_1": "<i>Draconia besteht aus zahllosen Inseln, die über einem endlosen Meer aus kochender Lava schweben.</i>",
      "lore_2_step_2": "<i>Luxana, die prachtvolle Hauptstadt, liegt direkt neben der majestätischen Caldera des Sonnenpalastes und bildet das pulsierende Herz des Reiches.</i>",
      "lore_2_step_3": "<i>Im fernen Westen liegt das Kristallreich, eine Welt aus leuchtenden Edelsteinen, die jegliche Magie reflektieren.</i>",
      "lore_2_step_4": "<i>Luxana, die Stadt des Lichts, glüht selbst bei Nacht in warmen Goldtönen. In ihren Straßen treffen sich Drachen aus allen Reichen — Händler, Künstler und Reisende.</i>",
      "lore_2_step_5": "<i>Der Smaragd-Wald ist ein gigantischer Dschungel, dessen Flora schneller wächst als man zusehen kann.</i>",
      "lore_2_step_6": "<i>Der Flüsterhain ist ein mystischer Ort, an dem die Geister der Ahnen in den Bäumen wohnen.</i>",
      "lore_2_step_7": "<i>Vandara ist die Stadt der Gelehrten. In der berühmten Roségold-Akademie studieren Drachen aus dem ganzen Reich die Geheimnisse des Äthers.</i>",
      "lore_2_step_8": "<i>Es regnet fast täglich in Draconia, was die schwebenden Inseln extrem fruchtbar und grün macht.</i>",
      "lore_2_step_9": "<i>Legenden besagen, dass der Planet einst eine ganze Kugel war, bis ein unbekanntes Ereignis ihn in tausend Stücke zerschmetterte.</i>",
      "lore_2_step_10": "<i>Der Pakt von Luxana wird alle hundert Jahre erneuert, um den Bund zwischen den Drachenspezies zu festigen.</i>"
    },
    "resources": {
      "energy": "Energie",
      "magic": "Magie",
      "satiation": "Sättigung",
      "wood": "Holz",
      "stone": "Stein",
      "shards": "Seelensplitter",
      "herbs": "Kräuter",
      "astral_shards": "Astralsplitter",
      "flowers": "Blumen",
      "ghostwood": "Geisterholz",
      "glowpollen": "Leuchtpollen",
      "fibers": "Fasern",
      "resin": "Baumharz",
      "iron_parts": "Eisenbeschläge",
      "clay": "Ton",
      "rune_fragment": "Runenfragment",
      "arcane_dust": "Arkanstaub",
      "meat": "Fleisch",
      "water": "Wasser",
      "gourmet-meal": "Gourmet-Mahlzeit",
      "focus": "Arkaner Fokus",
      "knowledge": "Wissen"
    },
    "titles": {},
    "ui": {
      "nav_main": "Haupt",
      "nav_collection": "Sammlung",
      "nav_story_tab_header": "Deine Geschichte",
      "nav_crafting": "Werkstatt",
      "nav_upgrades": "Besitztümer",
      "nav_locations": "Orte",
      "nav_village": "Dorf",
      "nav_vandara": "Vandara",
      "nav_housing": "Zuhause",
      "cat_gather": "Sammeln",
      "cat_work": "Arbeit",
      "cat_crafting": "Handwerk",
      "cat_upgrades": "Besitztümer & Artefakte",
      "cat_furniture": "Möbel",
      "cat_locations": "Orte & Reise",
      "cat_village": "Das Dorf",
      "cat_school": "Dorfschule",
      "cat_vandara": "Akademie Vandara",
      "cat_magic": "Magie",
      "cat_log": "Ereignis-Log",
      "cat_collection_world": "Die Welt der Sammlung",
      "cat_provisions": "Proviant",
      "cat_artifacts": "Artefakte",
      "ui_artifacts": "Artefakte",
      "ui_furniture": "Möbel",
      "ui_vitality": "Lebenskraft",
      "ui_energy": "Energie",
      "ui_magic": "Magie",
      "ui_satiation": "Sättigung",
      "ui_shards": "Seelensplitter",
      "ui_wood": "Holz",
      "ui_stone": "Stein",
      "ui_meat": "Fleisch",
      "ui_water": "Wasser",
      "ui_flowers": "Blumen",
      "ui_herbs": "Kräuter",
      "ui_astral_shards": "Astralsplitter",
      "ui_ghostwood": "Geisterholz",
      "ui_glowpollen": "Leuchtpollen",
      "ui_fibers": "Fasern",
      "ui_resin": "Baumharz",
      "ui_iron_parts": "Eisenbeschläge",
      "ui_clay": "Ton",
      "ui_rune_fragment": "Runenfragment",
      "ui_arcane_dust": "Arkanstaub",
      "ui_study_xp": "Studienerfahrung",
      "ui_materials": "Materialien",
      "ui_provisions": "Proviant",
      "ui_knowledge": "Wissen",
      "ui_base": "Heimatbasis",
      "ui_no_shelter": "Kein Unterschlupf",
      "ui_require": "Benötigt",
      "ui_effect": "Effekt",
      "ui_unlocked": "Freigeschaltet",
      "ui_item": "Gegenstand",
      "ui_bonus": "Bonus:",
      "ui_decorative": "Dekorativ",
      "ui_gourmet-meal": "Gourmet-Mahlzeit",
      "ui_focus": "Fokus",
      "ui_naming_title": "Dein Name",
      "ui_naming_desc": "Wie soll die Welt von Draconia dich nennen?",
      "ui_naming_placeholder": "Wandler-Name...",
      "ui_naming_confirm": "Reise beginnen",
      "ui_naming_too_short": "Name ist zu kurz...",
      "ui_naming_invalid_chars": "Ungültige Zeichen...",
      "ui_btn_thanks": "Vielen Dank, Ellie!",
      "ui_recipe": "Rezept",
      "ui_new_recipe": "Neues Rezept",
      "ui_active": "Aktiv",
      "ui_capacity": "Kapazität",
      "settings_title": "Einstellungen",
      "settings_lang": "Sprache",
      "settings_system": "System",
      "confirm_reset": "Bist du sicher? Alle Fortschritte gehen verloren.",
      "btn_save": "Speichern",
      "btn_load": "Laden",
      "btn_main_menu": "Hauptmenü",
      "btn_quit": "Beenden",
      "btn_save_back": "Speichern & Zurück",
      "btn_confirm_yes": "Ja, fortfahren",
      "btn_confirm_no": "Abbrechen",
      "menu_title": "My earned Wings",
      "nav_to_prefix": "Gehe zu",
      "menu_new_game": "Neues Spiel",
      "ui_new_game_desc": "Beginne eine neue Reise in Draconia.",
      "menu_continue": "Fortsetzen",
      "ui_continue_desc": "Setze dein Abenteuer fort.",
      "ui_settings_desc": "Passe das Spielerlebnis an deine Wünsche an.",
      "ui_quit_desc": "Verlasse die Welt von Draconia.",
      "menu_subtitle": "Der Boden ist nur der Anfang",
      "menu_version": "v1.4.10",
      "menu_report_bug": "Fehler oder Wunsch melden →",
      "prologue_alt_islands": "Schwebende Inseln über dem Lavameer",
      "prologue_alt_luxana": "Die Stadt Luxana am Fuß des Vulkans",
      "prologue_alt_village": "Ein kleines Dorf am Rande der Steppe",
      "ui_demo_badge": "DEMO",
      "ui_use": "Nutzen",
      "ui_unknown": "Unbekannt",
      "loc_forest": "Wald",
      "loc_mine": "Mine",
      "loc_meadow": "Wiese",
      "loc_village": "Dorf",
      "loc_library": "Bibliothek",
      "loc_whisper_grove": "Flüsterhain",
      "ui_stat_fraction": "{val} / {max}",
      "finale_stats_title": "Deine Reise in Draconia",
      "finale_stat_shards": "Seelensplitter gesammelt",
      "finale_stat_actions": "Aktionen ausgeführt",
      "finale_stat_npcs": "Bindungen geknüpft",
      "finale_stat_items": "Gegenstände entdeckt",
      "finale_sandbox_title": "Demo abgeschlossen!",
      "finale_sandbox_desc": "Du hast das Herz des Grundes berührt. In der Vollversion erwartet dich der Aufstieg zum Himmelspalast.",
      "finale_sandbox_btn": "Sandbox-Modus fortsetzen",
      "npc_baker_name": "Bäcker Gara",
      "npc_flowergirl_name": "Blumenmädchen Mina",
      "npc_artisan_name": "Handwerker Geron",
      "npc_teacher_name": "Lehrerin Aria",
      "npc_townhall_name": "Beamter Hall",
      "npc_blacksmith_name": "Schmied Thorin",
      "npc_sage_name": "Alter Seher",
      "npc_hunter_name": "Jäger Nyx",
      "npc_treeoflife_name": "Baum des Lebens",
      "npc_ellie_name": "Ellie",
      "npc_aris_name": "Aris",
      "collection_desc": "Die Aufzeichnungen deines Lebens am Boden.",
      "buff_gourmet_desc": "Deine Gourmet-Mahlzeit nährt deinen Körper nachhaltig.",
      "cat_upgrades_desc": "Hier verwaltest du deine Werkzeuge, magischen Artefakte und deinen Proviant.<br><br><b>Farbenlehre:</b><br><span style=\"color:var(--accent-teal)\">● Türkis:</span> Werkzeuge<br><span style=\"color:var(--accent-purple)\">● Violett:</span> Besondere Gegenstände & Artefakte",
      "ui_all": "Alle",
      "ui_tools": "Werkzeuge",
      "ui_upgrades_empty": "Dein Tresor ist noch leer. Entdecke oder stelle Gegenstände her!",
      "ui_collection_empty_title": "Deine Sammlung beginnt...",
      "ui_empty_collection": "Bisher wurden keine Geschichten gesammelt. Verrichte Taten, um sie hier niederzuschreiben.",
      "ui_tab_all": "Alle",
      "ui_tab_camp": "Lagerleben",
      "ui_tab_housing": "Gebäude",
      "ui_tab_crafting": "Handwerk",
      "ui_tab_tools": "Werkzeuge",
      "ui_tab_garden": "Garten",
      "ui_tab_kitchen": "Küche",
      "ui_tab_furniture": "Möbel",
      "ui_tab_lore": "Bibliothek",
      "ui_read": "Weiterlesen",
      "ui_continue_hint": "Klicke zum Fortfahren...",
      "ui_skip_hint": "[ESC] zum Überspringen | [ENTER] zum Fortfahren",
      "ui_skip_btn": "Intro überspringen",
      "ui_limit": "Limit",
      "ui_focus_stopped": "Fokus aufgehoben (Bedingungen nicht mehr erfüllt).",
      "fail_satiation_loop": "Zu hungrig für konzentrierte Arbeit!",
      "malus_satiation": "Sättigung kritisch! Dein Ertrag ist stark verringert.",
      "fail_low_efficiency": "Deine Effizienz ist niedrig (Sättigung prüfen).",
      "ui_house": "Eigenes Haus",
      "ui_library": "Bibliothek",
      "school_graduate": "Schulabschluss",
      "ui_graduated": "Abschluss",
      "townhall_registered": "Offizielle Registrierung",
      "townhall_tax_paid": "Steuern & Gebühren",
      "townhall_land_prepped": "Landurkunde (Vorstufe)",
      "blueprint-garden": "Bauplan: Garten",
      "blueprint-home-lake": "Bauplan: Haus am See",
      "blueprint-home-tower": "Bauplan: Aura-Turm",
      "unlocked-whispering-grove": "Zugang zum Flüsterhain",
      "unlocked-tree-of-life": "Zugang zum Baum des Lebens",
      "ui_registered-resident": "Offizielle Registrierung",
      "ui_tax_receipt": "Steuerquittung",
      "ui_land_prep": "Land-Vorbereitungsdokument",
      "ui_unlocked-work": "Arbeitserlaubnis",
      "ui_unlocked-library": "Bibliotheks-Zugang",
      "ui_unlocked-whispering-grove": "Zugang Flüsterhain",
      "ui_garden-upgrade": "Garten-Erweiterung",
      "ui_no_house": "Kein eigenes Haus",
      "ui_magic_limit": "Magie-Limit",
      "ui_energy_limit": "Energie-Limit",
      "ui_satiation_limit": "Sättigungs-Limit",
      "ui_shards_limit": "Splitter-Kapazität",
      "ui_wood_limit": "Holz-Kapazität",
      "ui_stone_limit": "Stein-Kapazität",
      "limit_desc_generic": "Erhöht das maximale Limit für {res}.",
      "ui_progress": "Fortschritt",
      "ui_placed_furniture": "Platzierte Möbel",
      "ui_stored_furniture": "Lagerhaus (Möbel)",
      "ui_place": "Platzieren",
      "ui_remove": "Entfernen",
      "ui_space_cost": "Platz",
      "ui_current": "Bestand",
      "ui_can_be_placed": "Kann in deinem Haus platziert werden.",
      "fail_furniture_space": "Nicht genug Platz im Haus!",
      "ui_home": "Dein Zuhause",
      "ui_furniture_space": "Platz für Möbel",
      "home_tent_title": "Einfaches Zelt",
      "home_tent_desc": "Ein bescheidener Unterschlupf für den Anfang deiner Reise.",
      "home_house_title": "Solides Haus",
      "home_house_desc": "Das Standard-Zuhause in Draconia. Viel Platz für all deinen Besitz.",
      "home_lake_title": "Haus am See",
      "home_lake_desc": "Ein idyllischer Ort für Wasser-Liebhaber. Perfekt für den Garten.",
      "home_tower_title": "Aura-Turm",
      "home_tower_desc": "Hoch über den Wolken. Verstärkt deine magische Energie und Fokus.",
      "nav_gather_desc": "Sammle Rohstoffe aus der unmittelbaren Umgebung von Draconia.",
      "nav_work_desc": "Verrichte einfache Arbeiten im Dorf, um Splitter zu verdienen.",
      "nav_village_desc": "Triff die Bewohner der Dorfgemeinschaft.",
      "nav_crafting_desc": "Verschönere dein Zuhause mit Möbeln und Dekorationen.",
      "nav_housing_desc": "Verwalte dein Zuhause und deine Einrichtung.",
      "nav_collection_desc": "Die Aufzeichnungen deines Lebens am Boden.",
      "help_kitchen_desc": "Bereite komplexe Nahrungsmittel zu, die stärkere Boni gewähren.",
      "help_garden_desc": "Säe seltene Kräuter, die für Alchemie und Verpflegung wichtig sind.",
      "help_library_desc": "Studiere deine gesammelten Bücher, um mehr über die Welt zu erfahren.",
      "help_magic_desc": "Erforsche die arkanen Energien deiner Seelenform.",
      "settings_tab_general": "Generell",
      "settings_name": "Name des Wandlers",
      "settings_tab_audio": "Audio & Klang",
      "settings_vol_global": "Gesamtlautstärke",
      "settings_vol_music": "Hintergrundmusik",
      "settings_vol_sfx": "Effekte",
      "settings_mute": "Stummschalten",
      "settings_graphics": "Grafik & Effekte",
      "settings_show_particles": "Partikeleffekte (Magie)",
      "settings_show_juice": "Fließende Texte (VFX)",
      "settings_ui_scale": "UI Skalierung",
      "settings_ui_scale_auto": "Automatisch anpassen",
      "settings_ui_scale_manual": "Manuelle Größe",
      "settings_resolution": "Bildschirm-Auflösung",
      "ui_cheats_unlock_all": "Alles freischalten (Dev Cheats)",
      "settings_reset": "Spielstand löschen (Hard Reset)",
      "settings_import_placeholder": "Hier den Speicher-Code einfügen...",
      "btn_export": "Exportieren",
      "btn_import": "Importieren",
      "save_at": "Gespeichert um",
      "save_never": "Noch nicht gespeichert",
      "ui_load_at": "Geladen um",
      "ui_unlocks": "Schaltet frei",
      "ui_finishes": "Vervollständigt",
      "ui_empty_category": "Noch keine Baupläne in dieser Kategorie freigeschaltet.",
      "ui_no_furniture_placed": "Keine Möbel platziert.",
      "ui_no_more_furniture": "Keine weiteren Möbel verfügbar.",
      "objective_label": "Aktuelles Ziel",
      "ui_vandara_path_hint": "Wähle weise, denn diese Entscheidung ist endgültig.",
      "ui_vandara_path_confirm": "Diesen Pfad endgültig wählen?",
      "ui_teacher_label": "Lehrkraft",
      "ui_mentor_label": "Mentor",
      "ui_titles": "Titel",
      "ui_none": "Keiner",
      "title_unlocked": "Titel freigeschaltet: {title}",
      "title_set": "Aktiver Titel: {title}",
      "particle_meditation": "Innere Ruhe...",
      "particle_blessing": "Segen!",
      "ui_duration": "Laufzeit",
      "ui_remaining_prefix": "Noch",
      "ui_seconds": "Sekunden",
      "ui_focus_toggle": "Fokus-Modus umschalten",
      "nav_inventory": "Inventar und Ressourcen",
      "receive_books": "Bücher erhalten! Du kannst sie jetzt in deiner Chronik lesen.",
      "receive_apple": "Du hast einen Kristallapfel erhalten! Eine süße Stärkung für deine Reise.",
      "item_crystal_apple_title": "Kristallapfel",
      "item_crystal_apple_desc": "Ein glasartig schimmernder Apfel, der auf magische Weise nährt (+30 Sättigung, +20 Energie).",
      "item_book_lore_1_title": "Geschichte: Blutlinie",
      "item_book_lore_1_desc": "Ein altes Buch über die kaiserliche Blutlinie von Draconia.",
      "item_book_lore_2_title": "Geografie: Schwebende Lande",
      "item_book_lore_2_desc": "Detaillierte Karten und Beschreibungen der Welt über den Wolken.",
      "item_astral_shards_title": "Astralsplitter",
      "item_astral_shards_desc": "Ein physisches Manifest reiner Astralenergie.",
      "item_arcane_dust_title": "Arkanstaub",
      "item_arcane_dust_desc": "Glitzerndes Pulver, das für höchste magische Konstruktionen benötigt wird.",
      "item_wyvern_scale_title": "Wyvern-Schuppe",
      "item_wyvern_scale_desc": "Eine extrem harte und magieresistente Schuppe.",
      "item_whetstone_title": "Wetzstein",
      "item_whetstone_desc": "Unverzichtbar zum Schärfen von Werkzeugen.",
      "reward_blueprint_lake": "Bauplan erhalten: Haus am See!",
      "reward_blueprint_tower": "Bauplan erhalten: Aura-Turm!",
      "unlock_whisper_grove": "Der Pfad zum Flüsterhain ist nun frei!",
      "act_read_lore_1_title": "Studium: Kaiserliche Blutlinie",
      "act_read_lore_1_desc": "Vertiefe dein Wissen über die Herrscherfamilie.",
      "ui_maxed": "Maximiert",
      "ui_required": "Erfordert",
      "ui_current_home": "Momentanes Zuhause",
      "ui_cheat_toast": "Ressourcen & Stats maximiert!",
      "ui_num_k": "k",
      "ui_num_m": "M",
      "ui_percent": "{val}%",
      "ui_divider_colon": ": ",
      "ui_list_bullet": "• ",
      "ui_symbol_sparkle": "✨ ",
      "ui_duration_wrap": "[ {val} ]",
      "ui_lang_de": "Deutsch",
      "ui_lang_en": "Englisch",
      "ui_wings_logo_alt": "Wings Logo",
      "ui_fullscreen_title": "Vollbild umschalten",
      "ui_placed_log": " platziert.",
      "ui_removed_log": " entfernt.",
      "ui_missing_entry": "Eintrag fehlt im Register",
      "ui_no_description": "Keine Beschreibung vorhanden.",
      "ui_action": "Aktion",
      "ui_limit_increase": "{res}-Limit +{val}",
      "chapter_village_life": "Dorfleben",
      "chapter_the_transformation": "Die Verwandlung",
      "chapter_the_dream": "Der Traum",
      "chapter_chronicles": "Chroniken",
      "act_read_lore_2_title": "Studium: Die Schwebenden Lande",
      "act_read_lore_2_desc": "Studiere die Geografie von Draconia.",
      "shards_limit_desc": "Erhöht die Kapazität für Seelensplitter.",
      "wood_limit_desc": "Erhöht die Kapazität für Holz.",
      "stone_limit_desc": "Erhöht die Kapazität für Stein.",
      "herbs_limit_desc": "Erhöht die Kapazität für Kräuter.",
      "meat_limit_desc": "Erhöht die Kapazität für Fleisch.",
      "water_limit_desc": "Erhöht die Kapazität für Wasser.",
      "energy_limit_desc": "Erhöht dein maximales Energie-Limit.",
      "magic_limit_desc": "Erhöht dein maximales Magie-Limit.",
      "resin_limit_title": "Harz-Kapazität",
      "resin_limit_desc": "Erhöht die Kapazität für Baumharz.",
      "clay_limit_title": "Ton-Kapazität",
      "clay_limit_desc": "Erhöht die Kapazität für Ton.",
      "iron_parts_limit_title": "Eisen-Kapazität",
      "iron_parts_limit_desc": "Erhöht die Kapazität für Eisenbeschläge.",
      "resource_efficiency_title": "Ressourcen-Effizienz",
      "arcane_focus_cost_title": "Arkaner Fokus-Kosten",
      "arcane_focus_cost_desc": "Verringert die Kosten für den arkanen Fokus."
    }
  },
  "en": {
    "actions": {
      "help": {
        "title": "Help"
      },
      "new_game": {
        "title": "menu_new_game",
        "desc": "ui_new_game_desc"
      },
      "build-campfire": {
        "title": "Light Campfire",
        "desc": "Warmth in the dark. Increases satiation gain when eating."
      },
      "build-tent": {
        "title": "Pitch Tent",
        "desc": "First modest protection. Improves energy regeneration during rest."
      },
      "build-house": {
        "title": "Build House",
        "desc": "Your firm foundation on the ground."
      },
      "build-home-lake": {
        "title": "Build Lake House",
        "desc": "A serene dwelling by the water."
      },
      "build-home-tower": {
        "title": "Build Aura Tower",
        "desc": "A beacon for magical energies."
      },
      "build-wood-storage": {
        "title": "Wood Storage I",
        "desc": "Space for more supplies (+25)."
      },
      "build-stone-storage": {
        "title": "Stone Storage I",
        "desc": "More stone capacity (+25)."
      },
      "build-wood-storage-2": {
        "title": "Wood Storage II",
        "desc": "Additional storage capacity (+25)."
      },
      "build-stone-storage-2": {
        "title": "Stone Storage II",
        "desc": "Additional storage capacity (+25)."
      },
      "build-wood-storage-3": {
        "title": "Wood Shed",
        "desc": "A sturdy shed for more wood (+30)."
      },
      "build-stone-storage-3": {
        "title": "Stone Shed",
        "desc": "A place for heavy boulders (+30)."
      },
      "build-wood-storage-4": {
        "title": "Wood Warehouse",
        "desc": "Ample storage space for wood supplies (+35)."
      },
      "build-stone-storage-4": {
        "title": "Stone Warehouse",
        "desc": "Massive storage for stone resources (+35)."
      },
      "build-water-barrel": {
        "title": "Water Barrel",
        "desc": "Collects rainwater. Increases water capacity (+25)."
      },
      "build-table": {
        "title": "Massive Table",
        "desc": "Place for study and strategy."
      },
      "build-kitchen": {
        "title": "Kitchen Station",
        "desc": "Enables cooking complex recipes."
      },
      "build-arcane-sanctum": {
        "title": "Arcane Sanctum",
        "desc": "Research the magic of the aether."
      },
      "build-garden": {
        "title": "Create Garden",
        "desc": "Sow herbs and flowers.",
        "effect": "Enables herb gardening."
      },
      "build-garden-upgrade": {
        "title": "Garden Expansion",
        "desc": "Second garden slot.",
        "effect": "Unlocks second garden slot."
      },
      "act-study": {
        "title": "Study",
        "desc": "Expand your mental magic limit.",
        "effect": "+{val} Magic Limit"
      },
      "act-meditate-sanctum": {
        "title": "Meditate",
        "desc": "Draw astral shards from the air.",
        "effect": "+1 Astral Shard"
      },
      "act-cook-gourmet": {
        "title": "Gourmet Cooking",
        "desc": "Prepare a feast.",
        "effect": "+1 Gourmet Meal"
      },
      "act-garden-plant": {
        "title": "Plant (Slot 1)",
        "desc": "Sow herbs.",
        "effect": "+{val} Herbs"
      },
      "act-garden-plant-2": {
        "title": "Plant (Slot 2)",
        "desc": "Use the parallel bed.",
        "effect": "+{val} Herbs"
      },
      "act-garden-water": {
        "title": "Water",
        "desc": "Accelerates plant growth.",
        "effect": "Garden growth accelerated"
      },
      "act-sell-wood": {
        "title": "Sell Wood",
        "desc": "Trade wood for shards.",
        "effect": "+5 Shards"
      },
      "act-sell-meat": {
        "title": "Sell Meat",
        "desc": "Give away prey for shards.",
        "effect": "+12 Shards"
      },
      "act-sell-stone": {
        "title": "Sell Stone",
        "desc": "Sell boulders for shards.",
        "effect": "+8 Shards"
      },
      "act-buy-meat": {
        "title": "Buy Meat",
        "desc": "Fresh hunting provisions from the merchant.",
        "effect": "+1 Meat"
      },
      "act-hunt": {
        "title": "Hunt",
        "desc": "Use the bow in the forest.",
        "effect": "+{val} Meat"
      },
      "act-wood": {
        "title": "Gather Twigs",
        "title_alt": "Quarry Stones",
        "effect": "+{val} Wood"
      },
      "act-stone": {
        "title": "Gather Pebbles",
        "title_alt": "Quarry Stones",
        "effect": "+{val} Stone"
      },
      "act-mine-quartz": {
        "title": "Mine Quartz",
        "desc": "Extract rare crystals in the dark mine.",
        "effect": "+{val} Shards & Stone"
      },
      "act-collect-water": {
        "title": "Collect Water",
        "desc": "Fetch fresh water from the forest lake.",
        "effect": "+1 Water"
      },
      "act-pick-flowers": {
        "title": "Pick Flowers",
        "desc": "Gather colorful wild flowers for your home.",
        "effect": "+{val} Flowers"
      },
      "act-eat": {
        "title": "Eat Berries",
        "desc": "Nourish yourself from the gifts of the earth.",
        "effect": "+{val} Satiation"
      },
      "act-rest": {
        "title": "Rest",
        "desc": "Listen to the beating of wings in the distance.",
        "effect": "+{val} Energy"
      },
      "act-meditate": {
        "title": "Focus",
        "desc": "Look up, but roots on the ground.",
        "effect": "+{val} Magic"
      },
      "act-npc-baker": {
        "title": "Baker Gara"
      },
      "act-npc-flowerGirl": {
        "title": "Flower Girl Mina"
      },
      "act-npc-artisan": {
        "title": "Artisan Geron"
      },
      "act-npc-teacher": {
        "title": "Teacher Aria"
      },
      "act-npc-townHall": {
        "title": "Town Hall Official"
      },
      "act-npc-blacksmith": {
        "title": "Blacksmith Thorin"
      },
      "act-npc-sage": {
        "title": "Old Sage"
      },
      "act-npc-hunter": {
        "title": "Hunter Nyx"
      },
      "act-npc-ellie": {
        "title": "Ellie"
      },
      "act-npc-aris": {
        "title": "Aris"
      },
      "act-npc-treeOfLife": {
        "title": "Tree of Life"
      },
      "act-work": {
        "title": "Day Labor",
        "desc": "Perform simple tasks in the village for soul shards.",
        "effect": "+{val} Shards"
      },
      "act-dream-bloom": {
        "title": "Dream Bloom",
        "desc": "Manifest magic in the form of an ethereal flower.",
        "effect": "+1 Dream Bloom"
      },
      "act-spell-harvest": {
        "title": "Magic Harvest",
        "desc": "Gain pure energy from your arcane studies.",
        "effect": "+{val} Magic"
      },
      "act-wanderstock": {
        "title": "Carve Walking Stick",
        "desc": "A faithful companion for your travels."
      },
      "act-axe": {
        "title": "Craft Stone Axe",
        "desc": "Enables felling trees.",
        "effect": "Enables felling trees."
      },
      "act-pickaxe": {
        "title": "Craft Pickaxe",
        "desc": "Enables mining rocks.",
        "effect": "Enables mining rocks."
      },
      "act-bow": {
        "title": "Build Hunting Bow",
        "desc": "Essential for hunting in the forest.",
        "effect": "Essential for hunting in the forest."
      },
      "act-bed": {
        "title": "Simple Bed",
        "desc": "Improves your recovery while sleeping."
      },
      "act-chair": {
        "title": "Wooden Chair",
        "desc": "A simple seat for your home."
      },
      "act-stove": {
        "title": "Stone Stove",
        "desc": "Enables baking and cooking."
      },
      "act-bookshelf": {
        "title": "Bookshelf",
        "desc": "Space for gathered knowledge."
      },
      "act-book": {
        "title": "Bind Book",
        "desc": "Record your insights."
      },
      "act-cabinet": {
        "title": "Provisions Cabinet",
        "desc": "Increases storage capacity for provisions."
      },
      "act-spice-rack": {
        "title": "Spice Rack",
        "desc": "Space for more herbs."
      },
      "act-grand-table": {
        "title": "Massive Dining Table",
        "desc": "A magnificent piece of furniture."
      },
      "act-bed-2": {
        "title": "Weave Silk Bed",
        "desc": "Maximum comfort through magical silk."
      },
      "act-stove-2": {
        "title": "Eternal Stove",
        "desc": "A stove with infinite arcane heat."
      },
      "act-chisel": {
        "title": "Craft Chisel",
        "effect": "Enables finer craftsmanship."
      },
      "build-loom": {
        "title": "Build Loom",
        "desc": "Allows the production of fine fabrics."
      },
      "build-bookshelf-large": {
        "title": "Build Large Bookshelf",
        "desc": "A massive shelf for a vast library."
      },
      "build-desk": {
        "title": "Build Writing Desk",
        "desc": "A dedicated space for studying."
      },
      "act-grind-dust": {
        "title": "Grind Arcane Dust",
        "desc": "Use magical energy to grind herbs into fine arcane dust."
      },
      "build-cart-reinforced": {
        "title": "Build Reinforced Cart",
        "desc": "An improved cart for heavy loads."
      },
      "build-mana-basin": {
        "title": "Build Mana Basin",
        "desc": "A basin that channels the magic of nature."
      },
      "build-terrace": {
        "title": "Add Sun Terrace",
        "desc": "A wonderful outdoor area for your house."
      },
      "act-whisper-wood": {
        "title": "Gather Ghostwood",
        "desc": "Search for the silvery glow in the grove.",
        "effect": "+{val} Ghostwood"
      },
      "act-whisper-pollen": {
        "title": "Catch Glowpollen",
        "desc": "Collect the dancing lights.",
        "effect": "+{val} Glowpollen"
      },
      "act-dig-clay": {
        "title": "Dig for Clay",
        "desc": "Search the moist forest floor for usable clay.",
        "effect": "+{val} Clay"
      },
      "act-buy-iron-parts": {
        "title": "Buy Iron Parts",
        "desc": "Acquire high-quality iron fittings directly from the blacksmith.",
        "effect": "+1 Iron Fittings"
      },
      "act-read-lore-1": {
        "title": "Read: Imperial Bloodline",
        "desc": "Deepen your knowledge about the ruling family."
      },
      "act-read-lore-2": {
        "title": "Read: The Floating Lands",
        "desc": "Study the geography of Draconia."
      }
    },
    "buffs": {
      "item_gourmet_meal_title": "Gourmet Meal",
      "buff_gourmet_desc": "Nourishes the body sustainably.",
      "buff_harvest_title": "Ancestral Blessing",
      "buff_harvest_desc": "Nature responds to your call (+1 to all gathering yields)."
    },
    "items": {
      "item_wanderstock_title": "Walking Stick",
      "item_wanderstock_desc": "A matching ash wood staff.",
      "item_axe_title": "Stone Axe",
      "item_axe_desc": "A robust tool for healthy wood.",
      "item_pickaxe_title": "Pickaxe",
      "item_pickaxe_desc": "Shatters the stone with a singing sound.",
      "item_bow_title": "Hunting Bow",
      "item_bow_desc": "A hand-crafted bow for hunting.",
      "item_bread_title": "Fresh Bread",
      "item_bread_desc": "Baked with love by the baker (+25 Satiation).",
      "item_cookie_title": "Homely Cookie",
      "item_cookie_desc": "A sweet snack with revitalizing herbs (+40 Satiation).",
      "item_dried_meat_title": "Dried Meat",
      "item_dried_meat_desc": "Tough but nourishing provisions (+15 Energy).",
      "item_gourmet_meal_title": "Gourmet Meal",
      "item_gourmet_meal_desc": "An exquisite meal (+50 Satiation, +30 Energy).",
      "item_deed_title": "Land Deed",
      "item_deed_desc": "Official document of land ownership.",
      "item_scroll_title": "Ancient Scroll",
      "item_scroll_desc": "Whispers of Draconia's mysterious history.",
      "item_whetstone_title": "Whetstone",
      "item_whetstone_desc": "Keeps your blades sharp and ready.",
      "item_arrowhead_title": "Arrowhead",
      "item_arrowhead_desc": "Made of sharp flint for hunting success.",
      "item_chisel_title": "Chisel",
      "item_chisel_desc": "Precision tool for finer stoneworking.",
      "item_astral_shards_title": "Astral Shards",
      "item_astral_shards_desc": "Bind magic to matter.",
      "item_dream_dust_title": "Dream Dust",
      "item_dream_dust_desc": "Blurs the boundaries of reality.",
      "item_wyvern_scale_title": "Wyvern Scale",
      "item_wyvern_scale_desc": "A dragon scale for magical artifacts.",
      "item_arcane_dust_title": "Arcane Dust",
      "item_arcane_dust_desc": "Fine particles of pure magic.",
      "item_crystal_mana_title": "Mana Crystal",
      "item_crystal_mana_desc": "A vessel for concentrated magic power.",
      "item_bed_2_title": "Silk Bed",
      "item_bed_2_desc": "Maximum relaxation while sleeping (+100).",
      "item_stove_2_title": "Eternal Stove",
      "item_stove_2_desc": "A stove whose flame never fades.",
      "item_bed_title": "Simple Bed",
      "item_bed_desc": "Improves your recovery while sleeping.",
      "item_chair_title": "Wooden Chair",
      "item_chair_desc": "A simple seat for your home.",
      "item_stove_title": "Stone Stove",
      "item_stove_desc": "A rustic stove for cooking.",
      "item_bookshelf_title": "Bookshelf",
      "item_bookshelf_desc": "Provides space for storing knowledge.",
      "item_cabinet_title": "Provisions Cabinet",
      "item_cabinet_desc": "Increases storage capacity for provisions.",
      "item_spice_rack_title": "Spice Rack",
      "item_spice_rack_desc": "A place for rare herbs.",
      "item_grand_table_title": "Massive Dining Table",
      "item_grand_table_desc": "A magnificent table for your home.",
      "item_ghostwood_title": "Ghostwood",
      "item_glowpollen_title": "Glowpollen",
      "item_loom_title": "Loom",
      "item_loom_desc": "A device for processing fine fibers.",
      "item_bookshelf_large_title": "Large Bookshelf",
      "item_bookshelf_large_desc": "Plenty of space for collected knowledge.",
      "item_desk_title": "Writing Desk",
      "item_desk_desc": "A place for concentration and learning.",
      "item_cart_reinforced_title": "Reinforced Cart",
      "item_cart_reinforced_desc": "Withstands the heaviest loads.",
      "item_mana_basin_title": "Mana Basin",
      "item_mana_basin_desc": "Collects magic from the surrounding area.",
      "item_terrace_title": "Sun Terrace",
      "item_terrace_desc": "A place of rest and regeneration.",
      "item_clay_title": "Wet Clay",
      "item_book_lore_1_title": "Book: The Imperial Bloodline",
      "item_book_lore_1_desc": "A dusty but noble volume about the rulers of Draconia.",
      "item_book_lore_2_title": "Book: The Floating Lands",
      "item_book_lore_2_desc": "A detailed treatise on the geography and wonders of the world.",
      "item_crystal_apple_title": "Crystal Apple",
      "item_crystal_apple_desc": "A glass-like shimmering apple that nourishes magically (+30 Satiation, +20 Energy)."
    },
    "logs": {
      "save_success": "Game saved successfully.",
      "intro_welcome": "Welcome back to solid ground, {player}.",
      "reward_unlock_npc": "New acquaintance: {name}",
      "reward_unlock_recipe": "New recipe unlocked: {title}",
      "reward_unlock_item": "Item discovered: {title}",
      "reward_blueprint_lake": "Blueprint for the Lake House received.",
      "reward_blueprint_tower": "Received blueprint for the Aura Tower.",
      "unlock_whisper_grove": "Mina leads you to a secret path: The Whisper Grove is now accessible.",
      "receive_books": "Books received! You can now read them in your Chronicle.",
      "receive_apple": "You received a Crystal Apple! A sweet refreshment for your journey.",
      "townhall_registered": "Official Registration",
      "townhall_tax_paid": "Taxes & Fees",
      "townhall_land_prepped": "Land Title (Preliminary)",
      "npc_dialogue_log": "<strong>{name}:</strong> {text}",
      "lore_entry_log": "📖 Lore: {text}",
      "ellie_tutorial_1": "Welcome to Draconia! I am Ellie, your companion on the ground.",
      "ellie_tutorial_2": "Down here, you will gather resources and build a new home to one day ascend again.",
      "ellie_tutorial_3": "Start by gathering twigs. Use \"Focus\" if you want to specialize in one task!",
      "ellie_tutorial_4": "Pay attention to your Satiation! It decreases whenever you spend Energy or Magic. If you are hungry, every task becomes much more exhausting and expensive. Eat berries or meals regularly to stay efficient.",
      "intro_1": "Above you slides a magnificent Wind Dragon effortlessly from roof to roof. In its humanoid form, its folded wings look like a noble cloak.",
      "intro_2": "You take the long way on foot. You are also a dragon - but you cannot transform or manifest wings.",
      "intro_3": "A merchant wyvern lands in front of the village gate. It doesn't notice you. You've grown used to others being more powerful.",
      "intro_4": "Rain sets in. The others shake their wings and fly home. You stay on the ground.",
      "intro_5": "You stay below, as always. You miss a connection you never had...",
      "intro_6": "But here, at the edge of the village, you want to build a life. With your own hands.",
      "intro_7": "Welcome to your new home. You wingless mystery shifter... a riddle in Draconia.",
      "fail_resources": "Missing resources for this action.",
      "fail_buff_active": "Effect is still active.",
      "fail_furniture_space": "Not enough furniture space in your home!",
      "fail_satiation_loop": "Too hungry for focused work!",
      "fail_low_efficiency": "You are too exhausted! The effort is currently too great (low satiation).",
      "fail_energy": "Not enough energy.",
      "fail_magic": "Not enough magic.",
      "fail_satiation": "You are too hungry.",
      "fail_focus": "Not enough focus.",
      "fail_wood": "Not enough wood.",
      "fail_stone": "Not enough stone.",
      "fail_meat": "Not enough meat.",
      "fail_water": "Not enough water.",
      "fail_flowers": "Not enough flowers.",
      "fail_herbs": "Not enough herbs.",
      "fail_shards": "Not enough shards.",
      "fail_astral_shards": "Not enough astral shards.",
      "fail_arcane_dust": "Not enough arcane dust.",
      "fail_gourmet-meal": "Not enough gourmet meals.",
      "fail_books": "Not enough books.",
      "fail_ghostwood": "Not enough ghostwood.",
      "fail_glowpollen": "Not enough glow pollen.",
      "fail_fibers": "Not enough fibers.",
      "fail_resin": "Not enough resin.",
      "fail_iron_parts": "Not enough iron parts.",
      "fail_clay": "Not enough clay.",
      "fail_rune_fragment": "Not enough rune fragments.",
      "fail_study_xp": "Not enough study experience.",
      "fail_wood_yield": "Not enough wood yield.",
      "fail_stone_yield": "Not enough stone yield.",
      "fail_rest_energy_gain": "Not enough energy recovery bonus.",
      "fail_eat_satiation_gain": "Not enough satiation bonus.",
      "fail_garden_magic_cost": "Not enough garden magic efficiency.",
      "fail_full_energy": "Energy is already at maximum.",
      "fail_full_magic": "Magic is already at maximum.",
      "fail_full_satiation": "You are full.",
      "fail_full_focus": "Focus limit reached.",
      "fail_full_wood": "Wood storage is full.",
      "fail_full_stone": "Stone storage is full.",
      "fail_full_meat": "Meat storage is full.",
      "fail_full_shards": "Shard container is full.",
      "fail_full_astral_shards": "Astral shard container is full.",
      "fail_full_arcane_dust": "Arcane dust storage is full.",
      "fail_full_books": "Bookshelf is full.",
      "fail_full_gourmet-meal": "Gourmet meal storage is full.",
      "fail_full_herbs": "Herb storage is full.",
      "fail_full_water": "Water container is full.",
      "fail_full_flowers": "Your flower bag is full.",
      "fail_full_wood_yield": "Wood yield limit reached.",
      "fail_full_stone_yield": "Stone yield limit reached.",
      "fail_full_rest_energy_gain": "Energy recovery limit reached.",
      "fail_full_eat_satiation_gain": "Satiation gain limit reached.",
      "fail_full_garden_magic_cost": "Garden magic efficiency limit reached.",
      "fail_full_ghostwood": "Ghostwood storage is full.",
      "fail_full_glowpollen": "Glow pollen container is full.",
      "fail_full_fibers": "Fibers storage is full.",
      "fail_full_resin": "Resin storage is full.",
      "fail_full_iron_parts": "Iron parts storage is full.",
      "fail_full_clay": "Clay storage is full.",
      "fail_full_rune_fragment": "Rune fragment storage is full.",
      "fail_full_study_xp": "Study experience reached its limit.",
      "ui_focus_stopped": "Focus cleared (Conditions no longer met).",
      "item_used": "Used {item}.",
      "wood_log": "+{val} Wood gathered.",
      "stone_log": "+{val} Stone quarried.",
      "clay_log": "Clay gathered.",
      "eat_log": "+{val} Satiation.",
      "rest_log": "+{val} Energy.",
      "meditate_log": "+{val} Magic.",
      "pick_flowers_log": "Picked {val} flowers.",
      "whisper_wood_log": "You gather silvery shimmering ghostwood.",
      "whisper_pollen_log": "You catch glowing pollen in the air.",
      "garden_water_log": "Fetched fresh spring water for the garden.",
      "collect_water_log": "You scoop clear water from a stream in the forest.",
      "garden_harvest_log": "Harvested fresh herbs. +{gain}",
      "cook_gourmet_success": "The feast is ready! You feel strengthened.",
      "tree_unlocked_log": "An ancient shudder runs through the earth. The Tree of Life has awakened!",
      "obj_tree_of_life": "Visit the Tree of Life in the village.",
      "sell_wood_log": "Exchanged wood for shards.",
      "sell_stone_log": "Exchanged stone for shards.",
      "sell_meat_log": "Exchanged meat for shards.",
      "buy_meat_log": "Bought fresh meat from the merchant.",
      "buy_iron_parts_log": "Acquired stable iron parts from Thorin the Blacksmith.",
      "work_log": "Day labor completed. Shards received.",
      "hunt_log": "Successful hunt! Meat obtained.",
      "dream_bloom_log": "An ethereal flower has bloomed.",
      "spell_harvest_log": "Drew magic energy from the aether.",
      "grind_dust_log": "You ground magical herbs into fine arcane dust.",
      "mine_quartz_log": "Found precious crystals and ores in the deep. +{gain}",
      "meditation_log": "Deep concentration... an astral shard manifests.",
      "nav_crafting_desc": "Shape tools from the gifts of nature.",
      "nav_collection_desc": "Records of your life on the ground.",
      "craft_chisel": "You have shaped a sharp chisel.",
      "craft_wanderstock": "You carved a sturdy walking stick.",
      "craft_axe": "A new stone axe has been crafted.",
      "craft_pickaxe": "Your first pickaxe is ready.",
      "craft_bow": "You strung a robust hunting bow.",
      "craft_bed": "A simple bed was built – for better dreams.",
      "craft_chair": "A comfortable wooden chair was assembled.",
      "craft_stove": "A stone stove is ready for warm meals.",
      "craft_bookshelf": "A shelf for all your gathered knowledge.",
      "craft_cabinet": "Your pantry now offers more space for provisions.",
      "craft_spice_rack": "A spice rack for herbs and alchemy.",
      "craft_grand_table": "A massive table, symbol of a growing community.",
      "craft_bed_2": "You wove a luxurious silk bed.",
      "craft_stove_2": "The Eternal Stove grants you boundless arcane heat.",
      "milestone_campfire": "A warming campfire has been lit.",
      "milestone_tent": "Your first shelter is ready.",
      "milestone_wood_storage": "The wood storage has been completed.",
      "milestone_stone_storage": "The stone storage has been completed.",
      "milestone_table": "A massive table for your studies.",
      "milestone_kitchen": "The kitchen is ready for culinary experiments.",
      "milestone_sanctum": "The Arcane Sanctum has been erected.",
      "milestone_garden": "The garden has been laid out and is ready for sowing.",
      "milestone_garden_upgrade": "The garden has been expanded with a second bed.",
      "milestone_treeOfLife": "The Tree of Life flourishes.",
      "milestone_house": "The house stands firm – a monument to your will.",
      "milestone_lake_house": "The Lake House sparkles in the morning sun.",
      "milestone_aura_tower": "The Aura Tower pierces the cloud cover of Draconia.",
      "milestone_school": "The village school has been founded.",
      "milestone_school-graduate": "You have received your school diploma. Aria smiles proudly.",
      "school_graduate_log": "You have received your school diploma. Aria smiles proudly.",
      "npc_teacher_2_no_house": "\"It is nice to see you, {player}. But without a solid roof over your head, learning will be difficult. Come back once you have a house of your own.\"",
      "npc_teacher_2_with_house": "\"Ah, I see you have created a beautiful home. Now we can dedicate ourselves to the study!\"",
      "focus_broken_magic": "Your magic energy is depleted. The arcane focus has been interrupted."
    },
    "milestones": {
      "milestone-treeOfLife": {
        "title": "The Tree of Life",
        "desc": "You have caught the attention of the ancient tree."
      },
      "milestone-school": {
        "title": "The Village School",
        "desc": "A place of learning and community."
      },
      "milestone-school-graduate": {
        "title": "School Graduation",
        "desc": "You have successfully completed your basic studies."
      }
    },
    "modifiers": {
      "wood_yield_title": "Wood Yield",
      "wood_yield_desc": "Increases the amount of wood gathered.",
      "stone_yield_title": "Stone Yield",
      "stone_yield_desc": "Increases the amount of stone gathered.",
      "meat_yield_title": "Meat Yield",
      "meat_yield_desc": "Increases the amount of meat from hunting.",
      "flowers_yield_title": "Flower Yield",
      "flowers_yield_desc": "Increases the yield when picking flowers.",
      "shards_yield_title": "Shard Yield",
      "shards_yield_desc": "Increases the amount of soul shards collected.",
      "magic_yield_title": "Magic Yield",
      "magic_yield_desc": "Increases the amount of magical energy gathered.",
      "rest_energy_gain_title": "Energy Regeneration",
      "rest_energy_gain_desc": "Accelerates energy recovery during rest.",
      "eat_satiation_gain_title": "Satiation Bonus",
      "eat_satiation_gain_desc": "Increases satiation gain from meals.",
      "modifier_garden_magic_cost_title": "Garden Magic",
      "modifier_garden_magic_cost_desc": "Reduces magic costs in the garden.",
      "modifier_magic_cost_title": "Magic Efficiency",
      "modifier_magic_cost_desc": "Reduces the magic cost of every action.",
      "modifier_ghostwood_yield_title": "Ghostwood Yield",
      "modifier_ghostwood_yield_desc": "Increases yield when gathering in the grove.",
      "modifier_glowpollen_yield_title": "Pollen Yield",
      "modifier_glowpollen_yield_desc": "Increases the amount of pollen caught.",
      "modifier_fibers_yield_title": "Fibers Yield",
      "modifier_fibers_yield_desc": "Increases the amount of fibers gathered.",
      "modifier_clay_yield_title": "Clay Yield",
      "modifier_clay_yield_desc": "Increases the amount of clay obtained.",
      "energy_reg_bonus_title": "Energy Resonance",
      "energy_reg_bonus_desc": "Bonuses from energy roses.",
      "garden_yield_title": "Garden Yield",
      "garden_yield_desc": "Increases the harvest in the garden.",
      "magic_limit_gain_title": "Magic Capacity",
      "magic_limit_gain_desc": "Expands your magic potential.",
      "knowledge_yield_desc": "Increases the gain of general knowledge.",
      "resource_efficiency_desc": "Affects the speed and yield of your work.",
      "satiation_drain_desc": "Affects how quickly your hunger increases.",
      "limit_desc_generic": "Increases the maximum storage limit for {res}.",
      "modifier_meditate_magic_gain_title": "Meditation Gain",
      "modifier_meditate_magic_gain_desc": "Increases magic gained per meditation."
    },
    "navigation": {},
    "npcs": {
      "npc_baker_1": "\"Welcome! I am Gara. And what is your name, stranger?\"",
      "npc_baker_2": "\"The furnace is burning hot. Thanks for the wood, {player}.\"",
      "npc_baker_3": "\"A cookie, perhaps, {player}? They keep you on your toes.\"",
      "npc_baker_4": "\"More and more people come for my pastries. You are a blessing, {player}.\"",
      "npc_baker_5": "\"{player}, take this last supply. You've done much for us.\"",
      "npc_flowerGirl_1": "\"Hello... uhm, I am Mina. I, uh... {player}? That is a beautiful name.\"",
      "npc_flowerGirl_2": "\"The soil was so dry... the water you brought will help these herbs thrive, {player}.\"",
      "npc_flowerGirl_3": "\"The world's colors change, {player}, if you look closely.\"",
      "npc_flowerGirl_4": "\"This scale... take it, {player}. It belongs to the aether.\"",
      "npc_flowerGirl_5": "\"Thorin needs someone like you, {player}. Tell him I sent you.\"",
      "npc_flowerGirl_6": "\"The shore is calling, {player}. I've found a spot where the water-herbs grow best. Here, take this blueprint for a home by the lake.\"",
      "npc_flowerGirl_7": "\"You have helped me so much... I know a place, deep in the forest, that only a few can see. It is the Whispering Grove. Here, take this path. But be careful with the spirits there.\"",
      "npc_artisan_1": "\"I am Geron. Wood is the beginning of everything. A walking stick gives you support.\"",
      "npc_artisan_2": "\"Stone is patient, {player}. It shapes the world, step by step.\"",
      "npc_artisan_3": "\"Precision is everything. Take this chisel, {player}, and shape your destiny.\"",
      "npc_teacher_1": "\"Hello there! You must be {player}, right? I am Aria, the teacher here in the village.\"",
      "npc_teacher_2_no_house": "\"It is nice to see you, {player}. But without a solid roof over your head, learning will be difficult. Come back once you have a house of your own.\"",
      "npc_teacher_2_with_house": "\"Ah, I see you have already settled in! Very good. How about you catch up on your school diploma? There is much to learn about Draconia.\"",
      "npc_teacher_3": "\"Ah, I see you have already settled in! Very good. Here are two foundational works about our world. One covers the Imperial Bloodline, the other the geography of our floating islands. Read them carefully under \"Your Journey\". We will speak again after!\"",
      "npc_teacher_6": "\"Congratulations, {player}. You have studied the books and earned your diploma!\"",
      "npc_aris_6": "\"The aether is dense here. A tower would act as a conduit for your soul form. This design will guide your construction.\"",
      "npc_townHall_1": "\"Welcome to the Town Hall. I am the official. All Shifters must be properly registered.\"",
      "npc_townHall_2": "\"Your papers are in order, {player}. You may now work in the village.\"",
      "npc_townHall_3": "\"Taxes and duties... only then can our village grow, {player}.\"",
      "npc_townHall_4": "\"You are well-known here now, {player}. A valued member of our community.\"",
      "npc_townHall_5": "\"This deed seals your place in Draconia, {player}.\"",
      "npc_blacksmith_1": "\"Who disturbs the forge? Ah... I am Thorin. And you?\"",
      "npc_blacksmith_2": "\"Magic in the fire, {player}. You understand the craft.\"",
      "npc_blacksmith_3": "\"A rock is just an obstacle, {player}, until you break it.\"",
      "npc_blacksmith_4": "\"A good whetstone is worth gold, {player}. It keeps your goals sharp.\"",
      "npc_blacksmith_5": "\"{player}, no flight, but a firm stand. That's your true strength.\"",
      "npc_hunter_1": "\"Halt! Who stalks there? ... Ah, a new face. I am Nyx.\"",
      "npc_hunter_2": "\"A bow takes patience, {player}. And good ash wood.\"",
      "npc_hunter_3": "\"With that bow, you're a real hunter now, {player}. Here is some dried meat for your next trek through the thicket.\"",
      "npc_hunter_4": "\"The forest gives what we need, {player}. If we respect it.\"",
      "npc_hunter_5": "\"shadows belong to us both now. I hunt at your side, {player}.\"",
      "npc_sage_1": "\"Knowledge is a burden. I am the Sage. Read this book, Shifter.\"",
      "npc_sage_2": "\"The stars whisper of past ages, {player}.\"",
      "npc_sage_3": "\"Your mind expands, {player}... do you see the patterns?\"",
      "npc_sage_4": "\"History doesn't repeat itself, {player}, but it does rhyme.\"",
      "npc_sage_5": "\"{player}, you're no longer a mystery, but a part of Draconia.\"",
      "npc_ellie_1": "\"Do you feel the tremor of the earth?\"",
      "npc_ellie_2": "\"The dreams show us the way.\"",
      "npc_ellie_3": "\"The light of the aether grows brighter.\"",
      "npc_ellie_4": "\"Patience, little dragon. Your path is almost ready.\"",
      "npc_ellie_5": "\"The heart of the ground beats for you, {player}.\"",
      "npc_aris_1": "\"Every spell begins with a single thought.\"",
      "npc_aris_2": "\"Feel the energy flowing into your fingertips.\"",
      "npc_aris_3": "\"Magic is not just power, it is responsibility.\"",
      "npc_aris_4": "\"Your connection to the aether is growing stronger.\"",
      "npc_aris_5": "\"You have touched the heart of Draconia.\"",
      "npc_treeOfLife_1": "\"I am the pulse of this world. Your journey has only just begun, little one.\"",
      "lore_1_step_1": "<i>The Imperial family rules from the Sun Palace, located in the heart of the Caldera, a massive, lush volcanic crater.</i>",
      "lore_1_step_2": "<i>Emperor Ignis Aurum leads Draconia with iron discipline. His magic is as hot as the sun itself.</i>",
      "lore_1_step_3": "<i>Empress Amaterasu hails from the Crystal Realm in the west. Her gentle light magic warms the spirits of all the people.</i>",
      "lore_1_step_4": "<i>Crown Princess Lunara is the firstborn. She commands not only the tides but also walks safely through the world of dreams.</i>",
      "lore_1_step_5": "<i>Prince Valerius, the General of the Empire, uses his earth magic to shape even the hardest stone like soft wax.</i>",
      "lore_1_step_6": "<i>Zephyrion, the Wind Dragon, is famous for his speed – but few know of his passion for alchemy.</i>",
      "lore_1_step_7": "<i>Young Ryuga is the youngest of the family. Still a small spark, but his potential will one day shake the world.</i>",
      "lore_1_step_8": "<i>Dragonshifters possess two forms. It is considered impolite to wear wings openly in humanoid form without reason.</i>",
      "lore_1_step_9": "<i>The Dual Monarchy ensures peace between the various species, as Draconia is too large for a single ruler.</i>",
      "lore_1_step_10": "<i>Under the rule of the Emperors stand the Vassal Kings, who manage the more distant island groups and swear loyalty to the Sun Palace.</i>",
      "lore_2_step_1": "<i>Draconia consists of countless islands floating above an endless sea of boiling lava.</i>",
      "lore_2_step_2": "<i>Luxana, the magnificent capital, lies directly next to the majestic Caldera of the Sun Palace and forms the pulsating heart of the empire.</i>",
      "lore_2_step_3": "<i>Far in the west lies the Crystal Realm, a world of glowing gemstones that reflect all magic.</i>",
      "lore_2_step_4": "<i>Luxana, the City of Light, glows in warm gold even at night. Dragons from every realm gather in its streets — merchants, artists, and travelers.</i>",
      "lore_2_step_5": "<i>The Emerald Forest is a gigantic jungle whose flora grows faster than one can watch.</i>",
      "lore_2_step_6": "<i>The Whispering Grove is a mystical place where the spirits of ancestors dwell in the trees.</i>",
      "lore_2_step_7": "<i>Vandara is the City of Scholars. In the famous Rose Gold Academy, dragons from all over the empire study the secrets of the ether.</i>",
      "lore_2_step_8": "<i>It rains almost daily in Draconia, making the floating islands extremely fertile and green.</i>",
      "lore_2_step_9": "<i>Legends say the planet was once a whole sphere until an unknown event shattered it into a thousand pieces.</i>",
      "npc_teacher_4_not_read": "\"Have you read the books I gave you? Please study them thoroughly first.\"",
      "lore_2_step_10": "<i>The Accord of Luxana is renewed every hundred years to strengthen the bond between dragon species.</i>"
    },
    "resources": {
      "energy": "Energy",
      "magic": "Magic",
      "satiation": "Satiation",
      "wood": "Wood",
      "stone": "Stone",
      "shards": "Soul Shards",
      "herbs": "Herbs",
      "astral_shards": "Astral Shards",
      "flowers": "Flowers",
      "ghostwood": "Ghostwood",
      "glowpollen": "Glowpollen",
      "fibers": "Fibers",
      "resin": "Resin",
      "iron_parts": "Iron Parts",
      "clay": "Clay",
      "rune_fragment": "Rune Fragment",
      "arcane_dust": "Arcane Dust",
      "meat": "Meat",
      "water": "Water",
      "gourmet-meal": "Gourmet Meal",
      "focus": "Arcane Focus",
      "knowledge": "Knowledge"
    },
    "titles": {},
    "ui": {
      "nav_main": "Main",
      "nav_collection": "Collection",
      "nav_story_tab_header": "Your Story",
      "nav_crafting": "Workshop",
      "nav_upgrades": "Possessions",
      "nav_locations": "Locations",
      "nav_village": "Village",
      "nav_vandara": "Vandara",
      "nav_housing": "Home",
      "cat_gather": "Gather",
      "cat_work": "Work",
      "cat_crafting": "Crafting",
      "cat_upgrades": "Possessions & Artifacts",
      "cat_furniture": "Furniture",
      "cat_locations": "Locations & Travel",
      "cat_village": "The Village",
      "cat_school": "Village School",
      "cat_vandara": "Academy Vandara",
      "cat_magic": "Magic",
      "cat_log": "Event Log",
      "cat_collection_world": "The World of Collection",
      "cat_provisions": "Provisions",
      "cat_artifacts": "Artifacts",
      "ui_artifacts": "Artifacts",
      "ui_furniture": "Furniture",
      "ui_vitality": "Vitality",
      "ui_energy": "Energy",
      "ui_magic": "Magic",
      "ui_satiation": "Satiation",
      "ui_shards": "Soul Shards",
      "ui_wood": "Wood",
      "ui_stone": "Stone",
      "ui_meat": "Meat",
      "ui_water": "Water",
      "ui_flowers": "Flowers",
      "ui_herbs": "Herbs",
      "ui_astral_shards": "Astral Shards",
      "ui_ghostwood": "Ghostwood",
      "ui_glowpollen": "Glowpollen",
      "ui_fibers": "Fibers",
      "ui_resin": "Resin",
      "ui_iron_parts": "Iron Fittings",
      "ui_clay": "Clay",
      "ui_rune_fragment": "Rune Fragment",
      "ui_arcane_dust": "Arcane Dust",
      "ui_study_xp": "Study Experience",
      "ui_materials": "Materials",
      "ui_provisions": "Provisions",
      "ui_knowledge": "Knowledge",
      "ui_base": "Home Base",
      "ui_no_shelter": "No Shelter",
      "ui_require": "Requires",
      "ui_effect": "Effect",
      "ui_unlocked": "Unlocked",
      "ui_item": "Item",
      "ui_bonus": "Bonus:",
      "ui_decorative": "Decorative",
      "ui_gourmet-meal": "Gourmet Meal",
      "ui_focus": "Focus",
      "ui_naming_title": "Your Name",
      "ui_naming_desc": "How shall the world of Draconia call you?",
      "ui_naming_placeholder": "Shifter name...",
      "ui_naming_confirm": "Start Journey",
      "ui_naming_too_short": "Name is too short...",
      "ui_naming_invalid_chars": "Invalid characters...",
      "ui_btn_thanks": "Thank you, Ellie!",
      "ui_recipe": "Recipe",
      "ui_new_recipe": "New Recipe",
      "ui_active": "Active",
      "ui_capacity": "Capacity",
      "settings_title": "Settings",
      "settings_lang": "Language",
      "settings_system": "System",
      "confirm_reset": "Are you sure? All progress will be lost.",
      "btn_save": "Save",
      "btn_load": "Load",
      "btn_main_menu": "Menu",
      "btn_quit": "Quit",
      "btn_save_back": "Save & Back",
      "btn_confirm_yes": "Yes, proceed",
      "btn_confirm_no": "Cancel",
      "menu_title": "My earned Wings",
      "nav_to_prefix": "Go to",
      "menu_new_game": "New Game",
      "ui_new_game_desc": "Begin a new journey in Draconia.",
      "menu_continue": "Continue",
      "ui_continue_desc": "Continue your adventure.",
      "ui_settings_desc": "Customize your gaming experience.",
      "ui_quit_desc": "Exit the world of Draconia.",
      "menu_subtitle": "The ground is just the beginning",
      "menu_version": "v1.4.10",
      "menu_report_bug": "Report a bug or wish →",
      "prologue_alt_islands": "Floating islands above a sea of lava",
      "prologue_alt_luxana": "The city of Luxana at the foot of the volcano",
      "prologue_alt_village": "A small village at the edge of the steppe",
      "ui_demo_badge": "DEMO",
      "ui_use": "Use",
      "ui_unknown": "Unknown",
      "loc_forest": "Forest",
      "loc_mine": "Mine",
      "loc_meadow": "Meadow",
      "loc_village": "Village",
      "loc_library": "Library",
      "loc_whisper_grove": "Whispering Grove",
      "ui_stat_fraction": "{val} / {max}",
      "finale_stats_title": "Your Journey in Draconia",
      "finale_stat_shards": "Soul Shards collected",
      "finale_stat_actions": "Actions performed",
      "finale_stat_npcs": "Bonds forged",
      "finale_stat_items": "Items discovered",
      "finale_sandbox_title": "Demo Completed!",
      "finale_sandbox_desc": "You have touched the heart of the ground. In the full version, your ascent to the Sky Palace awaits.",
      "finale_sandbox_btn": "Continue in Sandbox Mode",
      "npc_baker_name": "Baker Gara",
      "npc_flowergirl_name": "Flower Girl Mina",
      "npc_artisan_name": "Artisan Geron",
      "npc_teacher_name": "Teacher Aria",
      "npc_townhall_name": "Official Hall",
      "npc_blacksmith_name": "Blacksmith Thorin",
      "npc_sage_name": "Old Sage",
      "npc_hunter_name": "Hunter Nyx",
      "npc_treeoflife_name": "Tree of Life",
      "npc_ellie_name": "Ellie",
      "npc_aris_name": "Aris",
      "collection_desc": "Records of your life on the ground.",
      "buff_gourmet_desc": "Your gourmet meal nourishes your body sustainably.",
      "cat_upgrades_desc": "Manage your tools, magical artifacts, and provisions here.<br><br><b>Color Legend:</b><br><span style=\"color:var(--accent-teal)\">● Teal:</span> Tools<br><span style=\"color:var(--accent-purple)\">● Purple:</span> Special Items & Artifacts",
      "ui_all": "All",
      "ui_tools": "Tools",
      "ui_upgrades_empty": "Your vault is empty. Discover or craft items to fill it!",
      "ui_collection_empty_title": "Your collection begins...",
      "ui_empty_collection": "Your story on the ground is just beginning. Perform deeds to collect them here.",
      "ui_tab_all": "All",
      "objective_label": "Current Objective",
      "ui_vandara_path_hint": "Choose wisely, for this decision is final.",
      "ui_vandara_path_confirm": "Choose this path permanently?",
      "ui_teacher_label": "Instructor",
      "ui_mentor_label": "Mentor",
      "ui_titles": "Titles",
      "ui_none": "None",
      "title_unlocked": "Title Unlocked: {title}",
      "title_set": "Active Title: {title}",
      "ui_tab_camp": "Camp Life",
      "ui_tab_housing": "Buildings",
      "ui_tab_crafting": "Crafting",
      "ui_tab_tools": "Tools",
      "ui_tab_garden": "Gardening",
      "ui_tab_kitchen": "Kitchen",
      "ui_tab_furniture": "Furniture",
      "ui_tab_lore": "Library",
      "ui_house": "Own House",
      "malus_satiation": "Satiation critical! Your yield is significantly reduced.",
      "fail_low_efficiency": "Your efficiency is low (check satiation).",
      "fail_satiation_loop": "Too hungry for focused work!",
      "ui_library": "Library",
      "school_graduate": "School Graduation",
      "ui_graduated": "Graduated",
      "townhall_registered": "Official Registration",
      "townhall_tax_paid": "Taxes & Fees",
      "townhall_land_prepped": "Land Title (Preliminary)",
      "blueprint-garden": "Blueprint: Garden",
      "blueprint-home-lake": "Blueprint: Lake House",
      "blueprint-home-tower": "Blueprint: Aura Tower",
      "unlocked-whispering-grove": "Access to Whispering Grove",
      "unlocked-tree-of-life": "Access to Tree of Life",
      "ui_registered-resident": "Official Registration",
      "ui_tax_receipt": "Tax Receipt",
      "ui_land_prep": "Land Prep Document",
      "ui_unlocked-work": "Work Permit",
      "ui_unlocked-library": "Library Access",
      "ui_unlocked-whispering-grove": "Grove Access",
      "ui_garden-upgrade": "Garden Expansion",
      "ui_no_house": "No House yet",
      "ui_magic_limit": "Magic Limit",
      "ui_energy_limit": "Energy Limit",
      "ui_satiation_limit": "Satiation Limit",
      "ui_shards_limit": "Shard Capacity",
      "ui_wood_limit": "Wood Capacity",
      "ui_stone_limit": "Stone Capacity",
      "limit_desc_generic": "Increases the maximum storage limit for {res}.",
      "ui_progress": "Progress",
      "ui_read": "Read on",
      "ui_continue_hint": "Click to continue...",
      "ui_skip_hint": "[ESC] to skip | [ENTER] to continue",
      "ui_skip_btn": "Skip Intro",
      "ui_limit": "Limit",
      "ui_current": "Stock",
      "ui_can_be_placed": "Can be placed in your home.",
      "ui_focus_stopped": "Focus cleared (Conditions no longer met).",
      "ui_placed_furniture": "Placed Furniture",
      "ui_stored_furniture": "Warehouse (Furniture)",
      "ui_place": "Place",
      "ui_remove": "Remove",
      "ui_space_cost": "Space",
      "fail_furniture_space": "Not enough space in your home!",
      "ui_home": "Your Home",
      "ui_furniture_space": "Furniture Space",
      "home_tent_title": "Simple Tent",
      "home_tent_desc": "A humble shelter for the beginning of your journey.",
      "home_house_title": "Solid House",
      "home_house_desc": "The standard home in Draconia. Plenty of space for your belongings.",
      "home_lake_title": "Lake House",
      "home_lake_desc": "An idyllic place for water lovers. Perfect for your garden.",
      "home_tower_title": "Aura Tower",
      "home_tower_desc": "High above the clouds. Enhances your magical energy and focus.",
      "nav_gather_desc": "Gather resources from the immediate surroundings of Draconia.",
      "nav_work_desc": "Perform simple tasks in the village to earn shards.",
      "nav_village_desc": "Meet the inhabitants of the village.",
      "nav_crafting_desc": "Improve your home with furniture and decorations.",
      "nav_housing_desc": "Manage your home and your furnishings.",
      "nav_collection_desc": "Records of your life on the ground.",
      "help_kitchen_desc": "Prepare complex foods that grant stronger bonuses.",
      "help_library_desc": "Study your collected books to learn more about the world.",
      "help_magic_desc": "Explore the arcane energies of your soul form.",
      "help_garden_desc": "Sow rare herbs important for alchemy and provisions.",
      "settings_tab_general": "General",
      "settings_name": "Shifter Name",
      "settings_tab_audio": "Audio & Sounds",
      "settings_vol_global": "Global Volume",
      "settings_vol_music": "Background Music",
      "settings_vol_sfx": "Effects",
      "settings_mute": "Mute",
      "settings_graphics": "Graphics & Effects",
      "settings_show_particles": "Particle Effects (Magic)",
      "settings_show_juice": "Floating Text (VFX)",
      "settings_ui_scale": "UI Scaling",
      "settings_ui_scale_auto": "Auto Adjust",
      "settings_ui_scale_manual": "Manual Scale",
      "settings_resolution": "Screen Resolution",
      "ui_cheats_unlock_all": "Unlock All (Dev Cheats)",
      "settings_reset": "Hard Reset",
      "settings_import_placeholder": "Paste save code here...",
      "btn_export": "Export",
      "btn_import": "Import",
      "save_at": "Saved at",
      "save_never": "Never saved",
      "ui_load_at": "Loaded at",
      "ui_unlocks": "Unlocks",
      "ui_finishes": "Finishes",
      "ui_empty_category": "No blueprints unlocked in this category yet.",
      "ui_no_furniture_placed": "No furniture placed.",
      "ui_no_more_furniture": "No more furniture available.",
      "particle_meditation": "Inner Peace...",
      "particle_blessing": "Blessing!",
      "ui_duration": "Duration",
      "ui_remaining_prefix": "Left",
      "ui_seconds": "Seconds",
      "ui_focus_toggle": "Toggle focus mode",
      "nav_inventory": "Inventory and resources",
      "receive_books": "Books received! You can now read them in your Chronicle.",
      "receive_apple": "You received a Crystal Apple! A sweet refreshment for your journey.",
      "item_crystal_apple_title": "Crystal Apple",
      "item_crystal_apple_desc": "A glass-like shimmering apple that nourishes magically (+30 Satiation, +20 Energy).",
      "item_book_lore_1_title": "History: Bloodline",
      "item_book_lore_1_desc": "An old book about the imperial bloodline of Draconia.",
      "item_book_lore_2_title": "Geography: Floating Lands",
      "item_book_lore_2_desc": "Detailed maps and descriptions of the world above the clouds.",
      "item_astral_shards_title": "Astral Shards",
      "item_astral_shards_desc": "A physical manifestation of pure astral energy.",
      "item_arcane_dust_title": "Arcane Dust",
      "item_arcane_dust_desc": "Shimmering powder required for advanced magical constructions.",
      "item_wyvern_scale_title": "Wyvern Scale",
      "item_wyvern_scale_desc": "An extremely hard and magic-resistant scale.",
      "item_whetstone_title": "Wetzstone",
      "item_whetstone_desc": "Essential for sharpening tools.",
      "reward_blueprint_lake": "Blueprint received: Lake House!",
      "reward_blueprint_tower": "Blueprint received: Aura Tower!",
      "unlock_whisper_grove": "The path to the Whispering Grove is now open!",
      "act_read_lore_1_title": "Study: Imperial Bloodline",
      "act_read_lore_1_desc": "Deepen your knowledge about the ruling family.",
      "ui_maxed": "Maxed",
      "ui_required": "Required",
      "ui_current_home": "Current Home",
      "ui_cheat_toast": "Resources & Stats maximized!",
      "ui_num_k": "k",
      "ui_num_m": "M",
      "ui_percent": "{val}%",
      "ui_divider_colon": ": ",
      "ui_list_bullet": "• ",
      "ui_symbol_sparkle": "✨ ",
      "ui_duration_wrap": "[ {val} ]",
      "ui_lang_de": "German",
      "ui_lang_en": "English",
      "ui_wings_logo_alt": "Wings Logo",
      "ui_fullscreen_title": "Toggle Fullscreen",
      "ui_placed_log": " placed.",
      "ui_removed_log": " removed.",
      "ui_missing_entry": "Missing entry in registry",
      "ui_no_description": "No description.",
      "ui_action": "Action",
      "ui_limit_increase": "{res} Limit +{val}",
      "chapter_village_life": "Village Life",
      "chapter_the_transformation": "The Transformation",
      "chapter_the_dream": "The Dream",
      "chapter_chronicles": "Chronicles",
      "act_read_lore_2_title": "Study: The Floating Lands",
      "act_read_lore_2_desc": "Study the geography of Draconia.",
      "shards_limit_desc": "Increases soul shard capacity.",
      "wood_limit_desc": "Increases wood capacity.",
      "stone_limit_desc": "Increases stone capacity.",
      "herbs_limit_desc": "Increases herb capacity.",
      "meat_limit_desc": "Increases meat capacity.",
      "water_limit_desc": "Increases water capacity.",
      "energy_limit_desc": "Increases your maximum energy limit.",
      "magic_limit_desc": "Increases your maximum magic limit.",
      "resin_limit_title": "Resin Capacity",
      "resin_limit_desc": "Increases resin capacity.",
      "clay_limit_title": "Clay Capacity",
      "clay_limit_desc": "Increases clay capacity.",
      "iron_parts_limit_title": "Iron Capacity",
      "iron_parts_limit_desc": "Increases iron parts capacity.",
      "resource_efficiency_title": "Resource Efficiency",
      "arcane_focus_cost_title": "Arcane Focus Cost",
      "arcane_focus_cost_desc": "Reduces the cost of arcane focus."
    }
  }
};

// === Pipeline Config ===
// Auto-derived from YAML: resources/modifiers with scalesWithSatiation: true

export const PIPELINE_EFFICIENCY_KEYS: readonly string[] = [
  "wood_yield",
  "stone_yield",
  "herbs_yield",
  "flowers_yield",
  "ghostwood_yield",
  "fibers_yield",
  "clay_yield",
  "meat_yield",
  "shards_yield",
  "garden_yield"
] as const;
