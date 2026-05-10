// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/**/*.yaml  (the */ in the glob cannot be in a block comment)
// Regenerate: npm run build:content
// Generated: 10.5.2026 21:26:10

// === Resource Registry ===

export const RESOURCE_REGISTRY_GENERATED: Record<string, any> = {
  "study_xp": {
    "id": "study_xp",
    "type": "resource",
    "category": "knowledge",
    "color": "#3b82f6",
    "initial": 0,
    "initialLimit": 100,
    "scalesWithSatiation": false
  },
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
  "magic_regen_passive": {
    "id": "magic_regen_passive",
    "title": "modifier_magic_regen_passive_title",
    "desc": "modifier_magic_regen_passive_desc",
    "baseValue": 0
  },
  "study_efficiency": {
    "id": "study_efficiency",
    "title": "modifier_study_efficiency_title",
    "desc": "modifier_study_efficiency_desc",
    "baseValue": 1
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
  "study_xp_yield": {
    "id": "study_xp_yield",
    "title": "ui_study_xp",
    "desc": "study_xp_yield_desc",
    "baseValue": 5,
    "scalesWithSatiation": false
  },
  "rune_fragment_yield": {
    "id": "rune_fragment_yield",
    "title": "ui_rune_fragment",
    "desc": "rune_fragment_yield_desc",
    "baseValue": 2,
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
        "id": "act-meditate"
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
  "act-essen": {
    "id": "act-essen",
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
  "act-ausruhen": {
    "id": "act-ausruhen",
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
  "act-meditieren": {
    "id": "act-meditieren",
    "category": "primary",
    "icon": "🧘",
    "cost": 0,
    "costType": "none",
    "sfx": "magic",
    "particleType": "magic",
    "counter": "magic",
    "rewards": {
      "magic": 15
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
    "customExecute": "npc_execute",
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
    ]
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
    "customExecute": "npc_execute",
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
    ]
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
  "act-meditate": {
    "id": "act-meditate",
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
      "flags.item-book-knowledge": true
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
      "flags.item-book-knowledge": true
    },
    "sfx": "magic",
    "isLoopable": true,
    "rewards": {
      "arcane_dust": 1
    },
    "logKey": "grind_dust_log",
    "logColor": "var(--accent-purple)"
  },
  "act-school-read": {
    "id": "act-school-read",
    "category": "school",
    "chapter": "The New City Vandara",
    "cost": 5,
    "costType": "energy",
    "yieldType": "study_xp",
    "rewards": {
      "study_xp": "study_xp_yield"
    },
    "sfx": "craft",
    "particleType": "knowledge",
    "image": "img/school/school_reading.png"
  },
  "act-school-numbers": {
    "id": "act-school-numbers",
    "category": "school",
    "chapter": "The New City Vandara",
    "cost": 5,
    "costType": "energy",
    "yieldType": "study_xp",
    "rewards": {
      "study_xp": "study_xp_yield"
    },
    "sfx": "craft",
    "particleType": "knowledge",
    "image": "img/school/school_arithmetic.png"
  },
  "act-school-history": {
    "id": "act-school-history",
    "category": "school",
    "chapter": "The New City Vandara",
    "cost": 10,
    "costType": "energy",
    "requirements": {
      "npcProgress.teacher": {
        "op": ">=",
        "val": 2
      }
    },
    "yieldType": "study_xp",
    "rewards": {
      "study_xp": "study_xp_yield"
    },
    "sfx": "magic",
    "particleType": "knowledge",
    "image": "img/school/school_history.png"
  },
  "act-school-herbs": {
    "id": "act-school-herbs",
    "category": "school",
    "chapter": "The New City Vandara",
    "cost": 5,
    "costType": "energy",
    "requirements": {
      "npcProgress.flowerGirl": {
        "op": ">=",
        "val": 3
      }
    },
    "rewards": {
      "study_xp": "study_xp_yield",
      "herbs": 1
    },
    "sfx": "gather",
    "particleType": "knowledge",
    "image": "img/school/school_herbalism.png"
  },
  "act-school-runes": {
    "id": "act-school-runes",
    "category": "school",
    "chapter": "The New City Vandara",
    "cost": 10,
    "costType": "magic",
    "requirements": {
      "npcProgress.aris": {
        "op": ">=",
        "val": 2
      }
    },
    "rewards": {
      "study_xp": "study_xp_yield",
      "rune_fragment": "rune_fragment_yield"
    },
    "sfx": "magic",
    "particleType": "knowledge",
    "image": "img/school/school_runes.png"
  },
  "act-vandara-magic-runes": {
    "id": "act-vandara-magic-runes",
    "category": "vandara",
    "chapter": "Vandara: Magic Path",
    "cost": 15,
    "costType": "magic",
    "requirements": {
      "academy_path": "solen"
    },
    "rewards": {
      "study_xp": "study_xp_yield",
      "rune_fragment": "rune_fragment_yield"
    },
    "sfx": "magic",
    "particleType": "magic"
  },
  "act-vandara-magic-experiments": {
    "id": "act-vandara-magic-experiments",
    "category": "vandara",
    "chapter": "Vandara: Magic Path",
    "cost": 30,
    "costType": "magic",
    "requirements": {
      "academy_path": "solen"
    },
    "rewards": {
      "astral_shards": 2,
      "study_xp": "study_xp_yield"
    },
    "sfx": "magic",
    "particleType": "magic"
  },
  "act-vandara-craft-furniture": {
    "id": "act-vandara-craft-furniture",
    "category": "vandara",
    "chapter": "Vandara: Handwerk Path",
    "cost": 20,
    "costType": "energy",
    "requirements": {
      "academy_path": "bram"
    },
    "rewards": {
      "study_xp": "study_xp_yield"
    },
    "sfx": "craft"
  },
  "act-vandara-craft-masterpiece": {
    "id": "act-vandara-craft-masterpiece",
    "category": "vandara",
    "chapter": "Vandara: Handwerk Path",
    "cost": 50,
    "costType": "energy",
    "requirements": {
      "academy_path": "bram"
    },
    "rewards": {
      "study_xp": "study_xp_yield"
    },
    "sfx": "success"
  },
  "act-vandara-nature-gather": {
    "id": "act-vandara-nature-gather",
    "category": "vandara",
    "chapter": "Vandara: Natur Path",
    "cost": 15,
    "costType": "energy",
    "requirements": {
      "academy_path": "lyra"
    },
    "rewards": {
      "study_xp": "study_xp_yield",
      "herbs": 3,
      "flowers": 3
    },
    "sfx": "gather"
  },
  "act-vandara-nature-festival": {
    "id": "act-vandara-nature-festival",
    "category": "vandara",
    "chapter": "Vandara: Natur Path",
    "cost": 30,
    "costType": "satiation",
    "requirements": {
      "academy_path": "lyra"
    },
    "rewards": {
      "study_xp": "study_xp_yield"
    },
    "sfx": "magic"
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
