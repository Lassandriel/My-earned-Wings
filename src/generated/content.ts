// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/**/*.yaml  (the */ in the glob cannot be in a block comment)
// Regenerate: npm run build:content

// === Game Version (from package.json at build time) ===

export const GAME_VERSION = "1.7.0";

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
  },
  "ash_flower": {
    "id": "ash_flower",
    "type": "resource",
    "category": "materials",
    "color": "var(--accent-teal)",
    "initial": 0,
    "initialLimit": 30,
    "scalesWithSatiation": false
  },
  "glitter_dust": {
    "id": "glitter_dust",
    "type": "resource",
    "category": "materials",
    "color": "var(--accent-teal)",
    "initial": 0,
    "initialLimit": 30,
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
  "magic_regen_passive": {
    "id": "magic_regen_passive",
    "title": "modifier_magic_regen_passive_title",
    "desc": "modifier_magic_regen_passive_desc",
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
  "shadow_bind_cost": {
    "id": "shadow_bind_cost",
    "title": "shadow_bind_cost_title",
    "desc": "shadow_bind_cost_desc",
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
    "maxProgress": 4,
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
        "failLogKey": "npc_teacher_2_no_house",
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
        "failLogKey": "npc_teacher_4_not_read",
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
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-teacher"
          }
        ],
        "dialogueKey": "npc_teacher_6"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.school_graduate": true
        },
        "onSuccess": [
          {
            "type": "unlockItem",
            "id": "item-vandara-letter"
          },
          {
            "type": "setFlag",
            "flag": "vandara-invited",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-gate-guard"
          },
          {
            "type": "log",
            "logKey": "receive_vandara_letter",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_teacher_vandara_letter"
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
  },
  "act-npc-luxana-elian": {
    "id": "act-npc-luxana-elian",
    "npcId": "npc-luxana-elian",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaElian",
    "maxProgress": 2,
    "journalIcon": "🔮",
    "icon": "🔮",
    "journalColor": "#8b5cf6",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-elian-met",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-caldwen"
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-pell"
          },
          {
            "type": "log",
            "logKey": "luxana_elian_met",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_elian_1"
      },
      {
        "cost": 25,
        "costType": "magic",
        "requirements": {
          "flags.luxana-exp-vault": true,
          "flags.luxana-exp-cradle": true,
          "flags.luxana-exp-stage": true,
          "flags.luxana-exp-bloom": true,
          "flags.luxana-archive-revealed": true,
          "flags.luxana-captain-confronted": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-complete",
            "value": true
          },
          {
            "type": "grantShadowSlot",
            "by": 1
          },
          {
            "type": "log",
            "logKey": "luxana_elian_finale",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_elian_2"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-caldwen": {
    "id": "act-npc-luxana-caldwen",
    "npcId": "npc-luxana-caldwen",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaCaldwen",
    "maxProgress": 1,
    "journalIcon": "🗝️",
    "icon": "🗝️",
    "journalColor": "#b8860b",
    "steps": [
      {
        "cost": 15,
        "costType": "magic",
        "rewards": {
          "shards": 25
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-exp-vault",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-mirelle"
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-aurel"
          },
          {
            "type": "setFlag",
            "flag": "luxana-vault-relic",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-brannoc"
          },
          {
            "type": "log",
            "logKey": "luxana_caldwen_done",
            "color": "var(--gold)"
          },
          {
            "type": "log",
            "logKey": "luxana_vault_relic",
            "color": "var(--accent-purple)"
          }
        ],
        "dialogueKey": "npc_luxana_caldwen_1"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-mirelle": {
    "id": "act-npc-luxana-mirelle",
    "npcId": "npc-luxana-mirelle",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaMirelle",
    "maxProgress": 1,
    "journalIcon": "🍼",
    "icon": "🍼",
    "journalColor": "#c98ab0",
    "steps": [
      {
        "cost": 15,
        "costType": "magic",
        "rewards": {
          "shards": 25
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-exp-cradle",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-sylvaine"
          },
          {
            "type": "log",
            "logKey": "luxana_mirelle_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_mirelle_1"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-aurel": {
    "id": "act-npc-luxana-aurel",
    "npcId": "npc-luxana-aurel",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaAurel",
    "maxProgress": 1,
    "journalIcon": "🎭",
    "icon": "🎭",
    "journalColor": "#7c5cbf",
    "steps": [
      {
        "cost": 15,
        "costType": "magic",
        "rewards": {
          "shards": 25
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-exp-stage",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-sylvaine"
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-voss"
          },
          {
            "type": "log",
            "logKey": "luxana_aurel_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_aurel_1"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-sylvaine": {
    "id": "act-npc-luxana-sylvaine",
    "npcId": "npc-luxana-sylvaine",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaSylvaine",
    "maxProgress": 1,
    "journalIcon": "🌙",
    "icon": "🌙",
    "journalColor": "#5c8a6b",
    "steps": [
      {
        "cost": 15,
        "costType": "magic",
        "rewards": {
          "shards": 25
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-exp-bloom",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_sylvaine_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_sylvaine_1"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-brannoc": {
    "id": "act-npc-luxana-brannoc",
    "npcId": "npc-luxana-brannoc",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaBrannoc",
    "maxProgress": 2,
    "journalIcon": "📜",
    "icon": "📜",
    "journalColor": "#9ca3af",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-brannoc-met",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_brannoc_met",
            "color": "var(--accent-purple)"
          }
        ],
        "dialogueKey": "npc_luxana_brannoc_1"
      },
      {
        "cost": 10,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-archive-revealed",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-veyl"
          },
          {
            "type": "log",
            "logKey": "luxana_archive_revealed",
            "color": "var(--accent-purple)"
          }
        ],
        "dialogueKey": "npc_luxana_brannoc_2"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-veyl": {
    "id": "act-npc-luxana-veyl",
    "npcId": "npc-luxana-veyl",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaVeyl",
    "maxProgress": 1,
    "journalIcon": "🛡️",
    "icon": "🛡️",
    "journalColor": "#b45309",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-captain-confronted",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_veyl_confronted",
            "color": "var(--accent-purple)"
          }
        ],
        "dialogueKey": "npc_luxana_veyl_1"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-pell": {
    "id": "act-npc-luxana-pell",
    "npcId": "npc-luxana-pell",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaPell",
    "maxProgress": 2,
    "journalIcon": "🕯️",
    "icon": "🕯️",
    "journalColor": "#94a3b8",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-pell-met",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_pell_met",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_luxana_pell_1"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.luxana-archive-revealed": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-pell-warned",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_pell_warned",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_luxana_pell_2"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-luxana-voss": {
    "id": "act-npc-luxana-voss",
    "npcId": "npc-luxana-voss",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_luxana",
    "progKey": "luxanaVoss",
    "maxProgress": 2,
    "journalIcon": "💰",
    "icon": "💰",
    "journalColor": "#d4af37",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "rewards": {
          "shards": 20
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-voss-met",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_voss_met",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_voss_1"
      },
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "luxana-voss-resolved",
            "value": true
          },
          {
            "type": "log",
            "logKey": "luxana_voss_resolved",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_luxana_voss_2"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-smoke-ping": {
    "id": "act-smoke-ping",
    "category": "addon-smoke",
    "icon": "📡",
    "hotkey": "F8",
    "costType": "energy",
    "cost": 1,
    "onSuccess": [
      {
        "type": "log",
        "logKey": "smoke_ping_log",
        "color": "#22d3ee"
      },
      {
        "type": "smokeFlash",
        "intensity": 3
      }
    ]
  },
  "act-vandara-brew-energy-potion-small": {
    "id": "act-vandara-brew-energy-potion-small",
    "category": "vandara_workshop",
    "icon": "🧪",
    "requirements": {
      "flags.build-vandara-alchemy-laboratory": true
    },
    "costs": {
      "herbs": 2,
      "water": 1
    },
    "onSuccess": [
      {
        "type": "modifyResource",
        "resource": "energy",
        "amount": 20
      }
    ],
    "maxCount": 99,
    "sfx": "craft",
    "particleType": "knowledge"
  },
  "act-vandara-brew-magic-potion-small": {
    "id": "act-vandara-brew-magic-potion-small",
    "category": "vandara_workshop",
    "icon": "🧪",
    "requirements": {
      "flags.build-vandara-alchemy-laboratory": true
    },
    "costs": {
      "flowers": 1,
      "water": 2
    },
    "onSuccess": [
      {
        "type": "modifyResource",
        "resource": "magic",
        "amount": 10
      }
    ],
    "maxCount": 99,
    "sfx": "craft",
    "particleType": "knowledge"
  },
  "act-vandara-brew-pollen-tea": {
    "id": "act-vandara-brew-pollen-tea",
    "category": "vandara_workshop",
    "icon": "🍵",
    "requirements": {
      "flags.build-vandara-alchemy-laboratory": true
    },
    "costs": {
      "glowpollen": 2,
      "flowers": 1
    },
    "onSuccess": [
      {
        "type": "addBuff",
        "buffId": "buff-vandara-wakeful-pollen"
      }
    ],
    "maxCount": 99,
    "sfx": "craft",
    "particleType": "knowledge"
  },
  "act-vandara-brew-spark-vial": {
    "id": "act-vandara-brew-spark-vial",
    "category": "vandara_workshop",
    "icon": "✨",
    "requirements": {
      "flags.build-vandara-alchemy-laboratory": true
    },
    "costs": {
      "ash_flower": 1,
      "glitter_dust": 2
    },
    "onSuccess": [
      {
        "type": "addBuff",
        "buffId": "buff-vandara-spark-light"
      }
    ],
    "maxCount": 99,
    "sfx": "craft",
    "particleType": "shards"
  },
  "act-vandara-brew-arcane-water": {
    "id": "act-vandara-brew-arcane-water",
    "category": "vandara_workshop",
    "icon": "💧",
    "requirements": {
      "flags.build-vandara-alchemy-laboratory": true
    },
    "costs": {
      "arcane_dust": 1,
      "water": 2,
      "glitter_dust": 1
    },
    "onSuccess": [
      {
        "type": "modifyResource",
        "resource": "magic",
        "amount": 30
      }
    ],
    "maxCount": 99,
    "sfx": "craft",
    "particleType": "shards"
  },
  "act-vandara-brew-ash-tincture": {
    "id": "act-vandara-brew-ash-tincture",
    "category": "vandara_workshop",
    "icon": "🔥",
    "requirements": {
      "flags.build-vandara-alchemy-laboratory": true
    },
    "costs": {
      "ash_flower": 3,
      "resin": 1
    },
    "onSuccess": [
      {
        "type": "addBuff",
        "buffId": "buff-vandara-ash-burn"
      }
    ],
    "maxCount": 99,
    "sfx": "craft",
    "particleType": "shards"
  },
  "act-npc-vandara-korren": {
    "id": "act-npc-vandara-korren",
    "npcId": "npc-vandara-korren",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraKorren",
    "maxProgress": 3,
    "journalIcon": "🪨",
    "icon": "🪨",
    "journalColor": "#65a30d",
    "steps": [
      {
        "cost": 5,
        "costType": "magic",
        "requirements": {
          "flags.vandara-katakomben-unlocked": true
        },
        "onSuccess": [
          {
            "type": "addBuff",
            "buffId": "buff-vandara-echo-clarity-1"
          },
          {
            "type": "setFlag",
            "flag": "vandara-korren-1-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_korren_1_done",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_korren_1"
      },
      {
        "cost": 10,
        "costType": "magic",
        "requirements": {
          "flags.vandara-korren-1-done": true,
          "flags.vandara-iska-1-done": true
        },
        "onSuccess": [
          {
            "type": "addBuff",
            "buffId": "buff-vandara-echo-clarity-2"
          },
          {
            "type": "setFlag",
            "flag": "vandara-korren-2-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_korren_2_done",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_korren_2"
      },
      {
        "cost": 20,
        "costType": "magic",
        "requirements": {
          "flags.vandara-korren-2-done": true,
          "flags.vandara-iska-2-done": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-korren-arc-done",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-daven"
          },
          {
            "type": "log",
            "logKey": "vandara_korren_arc_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_korren_3"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-iska": {
    "id": "act-npc-vandara-iska",
    "npcId": "npc-vandara-iska",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraIska",
    "maxProgress": 3,
    "journalIcon": "⚙️",
    "icon": "⚙️",
    "journalColor": "#0891b2",
    "steps": [
      {
        "cost": 5,
        "costType": "magic",
        "requirements": {
          "flags.vandara-katakomben-unlocked": true
        },
        "onSuccess": [
          {
            "type": "addBuff",
            "buffId": "buff-vandara-animated-tools-1"
          },
          {
            "type": "setFlag",
            "flag": "vandara-iska-1-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_iska_1_done",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_iska_1"
      },
      {
        "cost": 10,
        "costType": "magic",
        "requirements": {
          "flags.vandara-korren-1-done": true,
          "flags.vandara-iska-1-done": true
        },
        "onSuccess": [
          {
            "type": "addBuff",
            "buffId": "buff-vandara-animated-tools-2"
          },
          {
            "type": "setFlag",
            "flag": "vandara-iska-2-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_iska_2_done",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_iska_2"
      },
      {
        "cost": 20,
        "costType": "magic",
        "requirements": {
          "flags.vandara-korren-2-done": true,
          "flags.vandara-iska-2-done": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-iska-arc-done",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-daven"
          },
          {
            "type": "log",
            "logKey": "vandara_iska_arc_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_iska_3"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-daven": {
    "id": "act-npc-vandara-daven",
    "npcId": "npc-vandara-daven",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraDaven",
    "maxProgress": 3,
    "journalIcon": "🛡️",
    "icon": "🛡️",
    "journalColor": "#475569",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-korren-arc-done": true,
          "flags.vandara-iska-arc-done": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-daven-tip-1",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_daven_tip_1",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_daven_1"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-daven-tip-1": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-daven-tip-2",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_daven_tip_2",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_daven_2"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-daven-tip-2": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-catacomb-students-busted",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_catacomb_students_busted",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_daven_3"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-olie": {
    "id": "act-npc-vandara-olie",
    "npcId": "npc-vandara-olie",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraOlie",
    "maxProgress": 7,
    "journalIcon": "📋",
    "icon": "📋",
    "journalColor": "#0ea5e9",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-admitted": true
        },
        "dialogueKey": "npc_vandara_olie_1"
      },
      {
        "cost": 25,
        "costType": "shards",
        "dialogueKey": "npc_vandara_olie_2"
      },
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "unlockItem",
            "id": "item-vandara-student-id"
          },
          {
            "type": "setFlag",
            "flag": "vandara-enrolled",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-veyra"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-ormias"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-quinell"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-pamle"
          },
          {
            "type": "log",
            "logKey": "vandara_enrolled",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_olie_3"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "onSuccess": [
          {
            "type": "log",
            "logKey": "vandara_olie_reveal_reaction",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_olie_4"
      },
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.ability-shadow-bind": true,
          "flags.vandara-ormias-intro-done": true,
          "flags.vandara-quinell-intro-done": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-exam-scheduled",
            "value": true
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-veyra"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-ormias"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-quinell"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-olie"
          },
          {
            "type": "log",
            "logKey": "vandara_exam_scheduled",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_olie_5"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-exam-veyra-done": true,
          "flags.vandara-exam-ormias-done": true,
          "flags.vandara-exam-quinell-done": true
        },
        "onSuccess": [
          {
            "type": "unlockItem",
            "id": "item-vandara-diploma"
          },
          {
            "type": "setFlag",
            "flag": "vandara-graduated",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_graduated",
            "color": "var(--gold)"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-olie"
          }
        ],
        "dialogueKey": "npc_vandara_olie_6"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-graduated": true
        },
        "onSuccess": [
          {
            "type": "unlockItem",
            "id": "item-luxana-summons"
          },
          {
            "type": "setFlag",
            "flag": "luxana-summoned",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-luxana-elian"
          },
          {
            "type": "log",
            "logKey": "receive_luxana_summons",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_olie_luxana_summons"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-kalre": {
    "id": "act-npc-vandara-kalre",
    "npcId": "npc-vandara-kalre",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraKalre",
    "maxProgress": 5,
    "journalIcon": "🌬️",
    "icon": "🌬️",
    "journalColor": "#a5b4fc",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-admitted": true
        },
        "dialogueKey": "npc_vandara_kalre_1"
      },
      {
        "cost": 5,
        "costType": "energy",
        "dialogueKey": "npc_vandara_kalre_2"
      },
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "unlockRecipe",
            "id": "build-vandara-alchemy-laboratory"
          }
        ],
        "dialogueKey": "npc_vandara_kalre_3"
      },
      {
        "cost": 5,
        "costType": "energy",
        "dialogueKey": "npc_vandara_kalre_4"
      },
      {
        "cost": 5,
        "costType": "energy",
        "dialogueKey": "npc_vandara_kalre_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-vandara-buy-ash-flower": {
    "id": "act-vandara-buy-ash-flower",
    "category": "village",
    "icon": "🌸",
    "cost": 5,
    "costType": "shards",
    "yieldType": "ash_flower",
    "rewards": {
      "ash_flower": 1
    },
    "sfx": "click",
    "particleType": "shards"
  },
  "act-vandara-buy-glitter-dust": {
    "id": "act-vandara-buy-glitter-dust",
    "category": "village",
    "icon": "✨",
    "cost": 10,
    "costType": "shards",
    "yieldType": "glitter_dust",
    "rewards": {
      "glitter_dust": 1
    },
    "sfx": "click",
    "particleType": "shards"
  },
  "act-vandara-buy-glowpollen": {
    "id": "act-vandara-buy-glowpollen",
    "category": "village",
    "icon": "🌼",
    "cost": 15,
    "costType": "shards",
    "yieldType": "glowpollen",
    "rewards": {
      "glowpollen": 1
    },
    "sfx": "click",
    "particleType": "shards"
  },
  "act-vandara-buy-resin": {
    "id": "act-vandara-buy-resin",
    "category": "village",
    "icon": "🟤",
    "cost": 20,
    "costType": "shards",
    "yieldType": "resin",
    "rewards": {
      "resin": 1
    },
    "sfx": "click",
    "particleType": "shards"
  },
  "act-vandara-buy-arcane-dust": {
    "id": "act-vandara-buy-arcane-dust",
    "category": "village",
    "icon": "🔮",
    "cost": 25,
    "costType": "shards",
    "yieldType": "arcane_dust",
    "rewards": {
      "arcane_dust": 1
    },
    "sfx": "click",
    "particleType": "shards"
  },
  "act-npc-vandara-fafa": {
    "id": "act-npc-vandara-fafa",
    "npcId": "npc-vandara-fafa",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraFafa",
    "maxProgress": 4,
    "journalIcon": "🪨",
    "icon": "🪙",
    "journalColor": "#a8a29e",
    "steps": [
      {
        "cost": 10,
        "costType": "shards",
        "requirements": {
          "flags.vandara-admitted": true
        },
        "dialogueKey": "npc_vandara_fafa_1"
      },
      {
        "cost": 10,
        "costType": "shards",
        "dialogueKey": "npc_vandara_fafa_2"
      },
      {
        "cost": 10,
        "costType": "shards",
        "dialogueKey": "npc_vandara_fafa_3"
      },
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-katakomben-unlocked",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-sariel"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-korren"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-iska"
          },
          {
            "type": "log",
            "logKey": "vandara_katakomben_unlocked",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_fafa_4"
      }
    ],
    "customExecute": "npc_execute"
  },
  "build-vandara-alchemy-laboratory": {
    "id": "build-vandara-alchemy-laboratory",
    "chapter": "Refinement",
    "category": "housing",
    "costs": {
      "wood": 60,
      "stone": 40
    },
    "image": "img/addons/kitchen.webp",
    "requirements": {
      "flags.build-house": true,
      "flags.build-vandara-alchemy-laboratory": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "craft",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-vandara-alchemy-laboratory",
        "value": true
      },
      {
        "type": "log",
        "logKey": "vandara_alchemy_laboratory_built",
        "color": "var(--gold)"
      }
    ]
  },
  "build-vandara-dorm": {
    "id": "build-vandara-dorm",
    "chapter": "Vandara",
    "category": "housing",
    "costs": {
      "shards": 40
    },
    "image": "img/housing/tent.webp",
    "requirements": {
      "flags.vandara-enrolled": true,
      "flags.build-vandara-dorm": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-vandara-dorm",
        "value": true
      },
      {
        "type": "setHome",
        "id": "home-vandara-dorm"
      },
      {
        "type": "log",
        "logKey": "vandara_dorm_built",
        "color": "var(--gold)"
      }
    ]
  },
  "build-vandara-loft": {
    "id": "build-vandara-loft",
    "chapter": "Vandara",
    "category": "housing",
    "costs": {
      "wood": 80,
      "shards": 150
    },
    "image": "img/housing/house.webp",
    "requirements": {
      "flags.vandara-graduated": true,
      "flags.build-vandara-loft": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-vandara-loft",
        "value": true
      },
      {
        "type": "setHome",
        "id": "home-vandara-loft"
      },
      {
        "type": "log",
        "logKey": "vandara_loft_built",
        "color": "var(--gold)"
      }
    ]
  },
  "build-vandara-catacomb": {
    "id": "build-vandara-catacomb",
    "chapter": "Vandara",
    "category": "housing",
    "costs": {
      "shards": 20
    },
    "image": "img/housing/island_tower.webp",
    "requirements": {
      "flags.vandara-katakomben-unlocked": true,
      "flags.build-vandara-catacomb": {
        "op": "!=",
        "val": true
      }
    },
    "sfx": "success",
    "onSuccess": [
      {
        "type": "setFlag",
        "flag": "build-vandara-catacomb",
        "value": true
      },
      {
        "type": "setHome",
        "id": "home-vandara-catacomb"
      },
      {
        "type": "log",
        "logKey": "vandara_catacomb_built",
        "color": "var(--gold)"
      }
    ]
  },
  "act-vandara-try-fire": {
    "id": "act-vandara-try-fire",
    "category": "vandara_trial",
    "icon": "🔥",
    "cost": 5,
    "costType": "energy",
    "requirements": {
      "flags.vandara-veyra-intro-done": true
    },
    "progKey": "vandaraTrialFire",
    "maxProgress": 1,
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-tested-fire",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_trial_fire",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "vandara_trial_fire_dialog"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-vandara-try-earth": {
    "id": "act-vandara-try-earth",
    "category": "vandara_trial",
    "icon": "🪨",
    "cost": 5,
    "costType": "energy",
    "requirements": {
      "flags.vandara-veyra-intro-done": true
    },
    "progKey": "vandaraTrialEarth",
    "maxProgress": 1,
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-tested-earth",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_trial_earth",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "vandara_trial_earth_dialog"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-vandara-try-wind": {
    "id": "act-vandara-try-wind",
    "category": "vandara_trial",
    "icon": "🌬️",
    "cost": 5,
    "costType": "energy",
    "requirements": {
      "flags.vandara-veyra-intro-done": true
    },
    "progKey": "vandaraTrialWind",
    "maxProgress": 1,
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-tested-wind",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_trial_wind",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "vandara_trial_wind_dialog"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-vandara-try-tide": {
    "id": "act-vandara-try-tide",
    "category": "vandara_trial",
    "icon": "🌊",
    "cost": 5,
    "costType": "energy",
    "requirements": {
      "flags.vandara-veyra-intro-done": true
    },
    "progKey": "vandaraTrialTide",
    "maxProgress": 1,
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-tested-tide",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_trial_tide",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "vandara_trial_tide_dialog"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-vandara-try-light": {
    "id": "act-vandara-try-light",
    "category": "vandara_trial",
    "icon": "☀️",
    "cost": 5,
    "costType": "magic",
    "requirements": {
      "flags.vandara-veyra-intro-done": true
    },
    "progKey": "vandaraTrialLight",
    "maxProgress": 1,
    "steps": [
      {
        "cost": 5,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-tested-light",
            "value": true
          },
          {
            "type": "setFlag",
            "flag": "vandara-light-resonance-found",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_trial_light",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "vandara_trial_light_dialog"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-gate-guard": {
    "id": "act-npc-vandara-gate-guard",
    "npcId": "npc-vandara-gate-guard",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraGateGuard",
    "maxProgress": 2,
    "journalIcon": "🛡️",
    "icon": "✉️",
    "journalColor": "#a8a29e",
    "steps": [
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-invited": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-admitted",
            "value": true
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-olie"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-kalre"
          },
          {
            "type": "unlockNPC",
            "id": "npc-vandara-fafa"
          },
          {
            "type": "log",
            "logKey": "vandara_admitted",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_gate_guard_admit"
      },
      {
        "cost": 1,
        "costType": "energy",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-gate-guard-respected",
            "value": true
          }
        ],
        "dialogueKey": "npc_vandara_gate_guard_respect"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-veyra": {
    "id": "act-npc-vandara-veyra",
    "npcId": "npc-vandara-veyra",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraVeyra",
    "maxProgress": 7,
    "journalIcon": "☀️",
    "icon": "☀️",
    "journalColor": "#fbbf24",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.vandara-enrolled": true
        },
        "dialogueKey": "npc_vandara_veyra_1"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_veyra_2"
      },
      {
        "cost": 15,
        "costType": "magic",
        "dialogueKey": "npc_vandara_veyra_3"
      },
      {
        "cost": 15,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-veyra-intro-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_veyra_intro_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_veyra_4"
      },
      {
        "cost": 20,
        "costType": "magic",
        "requirements": {
          "flags.vandara-light-resonance-found": true,
          "flags.vandara-ormias-intro-done": true,
          "flags.vandara-quinell-intro-done": true
        },
        "dialogueKey": "npc_vandara_veyra_5"
      },
      {
        "cost": 10,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-shadow-revealed",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_shadow_revealed",
            "color": "var(--gold)"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-gate-guard"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-sariel",
            "by": 4
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-ormias"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-quinell"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-olie"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-pamle"
          }
        ],
        "dialogueKey": "npc_vandara_veyra_6"
      },
      {
        "cost": 15,
        "costType": "magic",
        "requirements": {
          "flags.vandara-exam-scheduled": true,
          "flags.ability-shadow-bind": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-exam-veyra-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_exam_veyra_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_veyra_7"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-ormias": {
    "id": "act-npc-vandara-ormias",
    "npcId": "npc-vandara-ormias",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraOrmias",
    "maxProgress": 11,
    "journalIcon": "🐲",
    "icon": "🐲",
    "journalColor": "#7c2d12",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.vandara-enrolled": true
        },
        "dialogueKey": "npc_vandara_ormias_1"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_2"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_3"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_4"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_5"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_6"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_7"
      },
      {
        "cost": 10,
        "costType": "energy",
        "dialogueKey": "npc_vandara_ormias_8"
      },
      {
        "cost": 10,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-ormias-intro-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_ormias_intro_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_ormias_9"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "onSuccess": [
          {
            "type": "log",
            "logKey": "vandara_ormias_reveal_reaction",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_ormias_10"
      },
      {
        "cost": 15,
        "costType": "energy",
        "requirements": {
          "flags.vandara-exam-scheduled": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-exam-ormias-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_exam_ormias_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_ormias_11"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-quinell": {
    "id": "act-npc-vandara-quinell",
    "npcId": "npc-vandara-quinell",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraQuinell",
    "maxProgress": 9,
    "journalIcon": "💎",
    "icon": "💎",
    "journalColor": "#c084fc",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.vandara-enrolled": true
        },
        "dialogueKey": "npc_vandara_quinell_1"
      },
      {
        "cost": 10,
        "costType": "magic",
        "dialogueKey": "npc_vandara_quinell_2"
      },
      {
        "cost": 10,
        "costType": "magic",
        "dialogueKey": "npc_vandara_quinell_3"
      },
      {
        "cost": 10,
        "costType": "magic",
        "dialogueKey": "npc_vandara_quinell_4"
      },
      {
        "cost": 10,
        "costType": "magic",
        "dialogueKey": "npc_vandara_quinell_5"
      },
      {
        "cost": 10,
        "costType": "magic",
        "dialogueKey": "npc_vandara_quinell_6"
      },
      {
        "cost": 10,
        "costType": "magic",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-quinell-intro-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_quinell_intro_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_quinell_7"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "onSuccess": [
          {
            "type": "log",
            "logKey": "vandara_quinell_reveal_reaction",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_quinell_8"
      },
      {
        "cost": 20,
        "costType": "magic",
        "requirements": {
          "flags.vandara-exam-scheduled": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-exam-quinell-done",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_exam_quinell_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_quinell_9"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-pamle": {
    "id": "act-npc-vandara-pamle",
    "npcId": "npc-vandara-pamle",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraPamle",
    "maxProgress": 5,
    "journalIcon": "🌋",
    "icon": "🌋",
    "journalColor": "#dc2626",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.vandara-enrolled": true,
          "flags.build-vandara-alchemy-laboratory": true
        },
        "onSuccess": [
          {
            "type": "unlockRecipe",
            "id": "act-vandara-brew-energy-potion-small"
          },
          {
            "type": "unlockRecipe",
            "id": "act-vandara-brew-magic-potion-small"
          },
          {
            "type": "log",
            "logKey": "vandara_pamle_intro_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_pamle_1"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "counters.act-vandara-brew-energy-potion-small": {
            "op": ">=",
            "val": 3
          }
        },
        "onSuccess": [
          {
            "type": "modifyCounter",
            "counter": "act-vandara-brew-energy-potion-small",
            "amount": -3
          },
          {
            "type": "unlockRecipe",
            "id": "act-vandara-brew-pollen-tea"
          },
          {
            "type": "unlockRecipe",
            "id": "act-vandara-brew-spark-vial"
          },
          {
            "type": "log",
            "logKey": "vandara_pamle_tier2_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_pamle_2"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "counters.act-vandara-brew-spark-vial": {
            "op": ">=",
            "val": 3
          }
        },
        "onSuccess": [
          {
            "type": "modifyCounter",
            "counter": "act-vandara-brew-spark-vial",
            "amount": -3
          },
          {
            "type": "unlockRecipe",
            "id": "act-vandara-brew-arcane-water"
          },
          {
            "type": "unlockRecipe",
            "id": "act-vandara-brew-ash-tincture"
          },
          {
            "type": "log",
            "logKey": "vandara_pamle_tier3_done",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_pamle_3"
      },
      {
        "cost": 5,
        "costType": "energy",
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-alchemy-mastered",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_alchemy_mastered",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_pamle_4"
      },
      {
        "cost": 5,
        "costType": "energy",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "onSuccess": [
          {
            "type": "log",
            "logKey": "vandara_pamle_reveal_reaction",
            "color": "var(--text-dim)"
          }
        ],
        "dialogueKey": "npc_vandara_pamle_5"
      }
    ],
    "customExecute": "npc_execute"
  },
  "act-npc-vandara-sariel": {
    "id": "act-npc-vandara-sariel",
    "npcId": "npc-vandara-sariel",
    "category": "npc",
    "isStory": true,
    "chapter": "chapter_vandara",
    "progKey": "vandaraSariel",
    "maxProgress": 5,
    "journalIcon": "🕯️",
    "icon": "🕯️",
    "journalColor": "#1e1b4b",
    "steps": [
      {
        "cost": 10,
        "costType": "energy",
        "requirements": {
          "flags.vandara-katakomben-unlocked": true
        },
        "dialogueKey": "npc_vandara_sariel_1"
      },
      {
        "cost": 10,
        "costType": "magic",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "dialogueKey": "npc_vandara_sariel_2"
      },
      {
        "cost": 15,
        "costType": "magic",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "dialogueKey": "npc_vandara_sariel_3"
      },
      {
        "cost": 15,
        "costType": "magic",
        "requirements": {
          "flags.vandara-shadow-revealed": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "vandara-shadow-trained",
            "value": true
          },
          {
            "type": "log",
            "logKey": "vandara_shadow_trained",
            "color": "var(--gold)"
          }
        ],
        "dialogueKey": "npc_vandara_sariel_4"
      },
      {
        "cost": 20,
        "costType": "magic",
        "requirements": {
          "flags.vandara-shadow-trained": true
        },
        "onSuccess": [
          {
            "type": "setFlag",
            "flag": "ability-shadow-bind",
            "value": true
          },
          {
            "type": "grantShadowSlot",
            "by": 1
          },
          {
            "type": "log",
            "logKey": "vandara_shadow_bind_learned",
            "color": "var(--gold)"
          },
          {
            "type": "extendNPCArc",
            "npcId": "npc-vandara-olie"
          }
        ],
        "dialogueKey": "npc_vandara_sariel_5"
      }
    ],
    "customExecute": "npc_execute"
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
  },
  "item-luxana-summons": {
    "id": "item-luxana-summons",
    "title": "item_luxana_summons_title",
    "desc": "item_luxana_summons_desc",
    "image": "img/items/scroll.webp",
    "consumable": false,
    "category": "lore"
  },
  "item-vandara-diploma": {
    "id": "item-vandara-diploma",
    "title": "item_vandara_diploma_title",
    "desc": "item_vandara_diploma_desc",
    "image": "img/items/scroll.webp",
    "consumable": false,
    "category": "lore"
  },
  "item-vandara-letter": {
    "id": "item-vandara-letter",
    "title": "item_vandara_letter_title",
    "desc": "item_vandara_letter_desc",
    "image": "img/items/scroll.webp",
    "consumable": false,
    "category": "lore"
  },
  "item-vandara-student-id": {
    "id": "item-vandara-student-id",
    "title": "item_vandara_student_id_title",
    "desc": "item_vandara_student_id_desc",
    "image": "img/items/scroll.webp",
    "consumable": false,
    "category": "lore"
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
    "maxProgress": 3,
    "chapter": "chapter_smoke_test",
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
  },
  "npc-luxana-elian": {
    "id": "npc-luxana-elian",
    "nameKey": "npc_luxana_elian_name",
    "icon": "🔮",
    "image": "img/addons/luxana/elian.webp",
    "color": "#8b5cf6",
    "progKey": "luxanaElian",
    "maxProgress": 2,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-caldwen": {
    "id": "npc-luxana-caldwen",
    "nameKey": "npc_luxana_caldwen_name",
    "icon": "🗝️",
    "image": "img/addons/luxana/caldwen.webp",
    "color": "#b8860b",
    "progKey": "luxanaCaldwen",
    "maxProgress": 1,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-mirelle": {
    "id": "npc-luxana-mirelle",
    "nameKey": "npc_luxana_mirelle_name",
    "icon": "🍼",
    "image": "img/addons/luxana/mirelle.webp",
    "color": "#c98ab0",
    "progKey": "luxanaMirelle",
    "maxProgress": 1,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-aurel": {
    "id": "npc-luxana-aurel",
    "nameKey": "npc_luxana_aurel_name",
    "icon": "🎭",
    "image": "img/addons/luxana/aurel.webp",
    "color": "#7c5cbf",
    "progKey": "luxanaAurel",
    "maxProgress": 1,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-sylvaine": {
    "id": "npc-luxana-sylvaine",
    "nameKey": "npc_luxana_sylvaine_name",
    "icon": "🌙",
    "image": "img/addons/luxana/sylvaine.webp",
    "color": "#5c8a6b",
    "progKey": "luxanaSylvaine",
    "maxProgress": 1,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-brannoc": {
    "id": "npc-luxana-brannoc",
    "nameKey": "npc_luxana_brannoc_name",
    "icon": "📜",
    "image": "img/addons/luxana/brannoc.webp",
    "color": "#9ca3af",
    "progKey": "luxanaBrannoc",
    "maxProgress": 2,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-veyl": {
    "id": "npc-luxana-veyl",
    "nameKey": "npc_luxana_veyl_name",
    "icon": "🛡️",
    "image": "img/addons/luxana/veyl.webp",
    "color": "#b45309",
    "progKey": "luxanaVeyl",
    "maxProgress": 1,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-pell": {
    "id": "npc-luxana-pell",
    "nameKey": "npc_luxana_pell_name",
    "icon": "🕯️",
    "image": "img/addons/luxana/pell.webp",
    "color": "#94a3b8",
    "progKey": "luxanaPell",
    "maxProgress": 2,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-luxana-voss": {
    "id": "npc-luxana-voss",
    "nameKey": "npc_luxana_voss_name",
    "icon": "💰",
    "image": "img/addons/luxana/voss.webp",
    "color": "#d4af37",
    "progKey": "luxanaVoss",
    "maxProgress": 2,
    "chapter": "Luxana",
    "location": "luxana"
  },
  "npc-smoke-witness": {
    "id": "npc-smoke-witness",
    "nameKey": "smoke_witness_name",
    "icon": "🧪",
    "color": "#22d3ee",
    "progKey": "smokeWitness",
    "maxProgress": 1,
    "chapter": "SmokeTest",
    "smokeAffinity": "shadow"
  },
  "npc-vandara-korren": {
    "id": "npc-vandara-korren",
    "nameKey": "npc_vandara_korren_name",
    "icon": "🪨",
    "image": "img/addons/vandara/korren.webp",
    "color": "#65a30d",
    "progKey": "vandaraKorren",
    "maxProgress": 3,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-iska": {
    "id": "npc-vandara-iska",
    "nameKey": "npc_vandara_iska_name",
    "icon": "⚙️",
    "image": "img/addons/vandara/iska.webp",
    "color": "#0891b2",
    "progKey": "vandaraIska",
    "maxProgress": 3,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-daven": {
    "id": "npc-vandara-daven",
    "nameKey": "npc_vandara_daven_name",
    "icon": "🛡️",
    "image": "img/addons/vandara/daven.webp",
    "color": "#475569",
    "progKey": "vandaraDaven",
    "maxProgress": 3,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-olie": {
    "id": "npc-vandara-olie",
    "nameKey": "npc_vandara_olie_name",
    "icon": "📋",
    "image": "img/addons/vandara/olie.webp",
    "color": "#0ea5e9",
    "progKey": "vandaraOlie",
    "maxProgress": 3,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-kalre": {
    "id": "npc-vandara-kalre",
    "nameKey": "npc_vandara_kalre_name",
    "icon": "🌬️",
    "image": "img/addons/vandara/kalre.webp",
    "color": "#a5b4fc",
    "progKey": "vandaraKalre",
    "maxProgress": 5,
    "chapter": "Vandara",
    "location": "vandara",
    "tradeActions": [
      {
        "id": "act-vandara-buy-ash-flower",
        "minProgress": 1
      },
      {
        "id": "act-vandara-buy-glitter-dust",
        "minProgress": 1
      },
      {
        "id": "act-vandara-buy-glowpollen",
        "minProgress": 5
      },
      {
        "id": "act-vandara-buy-resin",
        "minProgress": 5
      },
      {
        "id": "act-vandara-buy-arcane-dust",
        "minProgress": 5
      }
    ]
  },
  "npc-vandara-fafa": {
    "id": "npc-vandara-fafa",
    "nameKey": "npc_vandara_fafa_name",
    "icon": "🪨",
    "image": "img/addons/vandara/fafa.webp",
    "color": "#a8a29e",
    "progKey": "vandaraFafa",
    "maxProgress": 4,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-gate-guard": {
    "id": "npc-vandara-gate-guard",
    "nameKey": "npc_vandara_gate_guard_name",
    "icon": "🛡️",
    "image": "img/addons/vandara/gate_guard.webp",
    "color": "#a8a29e",
    "progKey": "vandaraGateGuard",
    "maxProgress": 1,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-veyra": {
    "id": "npc-vandara-veyra",
    "nameKey": "npc_vandara_veyra_name",
    "icon": "☀️",
    "image": "img/addons/vandara/veyra.webp",
    "color": "#fbbf24",
    "progKey": "vandaraVeyra",
    "maxProgress": 6,
    "chapter": "Vandara",
    "location": "vandara",
    "tradeActions": [
      {
        "id": "act-vandara-try-fire",
        "minProgress": 4
      },
      {
        "id": "act-vandara-try-earth",
        "minProgress": 4
      },
      {
        "id": "act-vandara-try-wind",
        "minProgress": 4
      },
      {
        "id": "act-vandara-try-tide",
        "minProgress": 4
      },
      {
        "id": "act-vandara-try-light",
        "minProgress": 4
      }
    ]
  },
  "npc-vandara-ormias": {
    "id": "npc-vandara-ormias",
    "nameKey": "npc_vandara_ormias_name",
    "icon": "🐲",
    "image": "img/addons/vandara/ormias.webp",
    "color": "#7c2d12",
    "progKey": "vandaraOrmias",
    "maxProgress": 9,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-quinell": {
    "id": "npc-vandara-quinell",
    "nameKey": "npc_vandara_quinell_name",
    "icon": "💎",
    "image": "img/addons/vandara/quinell.webp",
    "color": "#c084fc",
    "progKey": "vandaraQuinell",
    "maxProgress": 7,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-pamle": {
    "id": "npc-vandara-pamle",
    "nameKey": "npc_vandara_pamle_name",
    "icon": "🌋",
    "image": "img/addons/vandara/pamle.webp",
    "color": "#dc2626",
    "progKey": "vandaraPamle",
    "maxProgress": 4,
    "chapter": "Vandara",
    "location": "vandara"
  },
  "npc-vandara-sariel": {
    "id": "npc-vandara-sariel",
    "nameKey": "npc_vandara_sariel_name",
    "icon": "🕯️",
    "image": "img/addons/vandara/sariel.webp",
    "color": "#1e1b4b",
    "progKey": "vandaraSariel",
    "maxProgress": 1,
    "chapter": "Vandara",
    "location": "vandara"
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
  },
  "buff-vandara-wakeful-pollen": {
    "id": "buff-vandara-wakeful-pollen",
    "title": "buff_vandara_wakeful_pollen_title",
    "desc": "buff_vandara_wakeful_pollen_desc",
    "duration": 60,
    "modifiers": [
      {
        "key": "energy_reg_bonus",
        "add": 1
      }
    ]
  },
  "buff-vandara-spark-light": {
    "id": "buff-vandara-spark-light",
    "title": "buff_vandara_spark_light_title",
    "desc": "buff_vandara_spark_light_desc",
    "duration": 90,
    "modifiers": [
      {
        "key": "shadow_bind_cost",
        "add": -1
      }
    ]
  },
  "buff-vandara-ash-burn": {
    "id": "buff-vandara-ash-burn",
    "title": "buff_vandara_ash_burn_title",
    "desc": "buff_vandara_ash_burn_desc",
    "duration": 120,
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
  "buff-vandara-echo-clarity-1": {
    "id": "buff-vandara-echo-clarity-1",
    "title": "buff_vandara_echo_clarity_1_title",
    "desc": "buff_vandara_echo_clarity_1_desc",
    "duration": 60,
    "modifiers": [
      {
        "key": "magic_regen_passive",
        "add": 1
      }
    ]
  },
  "buff-vandara-echo-clarity-2": {
    "id": "buff-vandara-echo-clarity-2",
    "title": "buff_vandara_echo_clarity_2_title",
    "desc": "buff_vandara_echo_clarity_2_desc",
    "duration": 90,
    "modifiers": [
      {
        "key": "magic_regen_passive",
        "add": 2
      }
    ]
  },
  "buff-vandara-animated-tools-1": {
    "id": "buff-vandara-animated-tools-1",
    "title": "buff_vandara_animated_tools_1_title",
    "desc": "buff_vandara_animated_tools_1_desc",
    "duration": 60,
    "modifiers": [
      {
        "key": "wood_yield",
        "add": 1
      }
    ]
  },
  "buff-vandara-animated-tools-2": {
    "id": "buff-vandara-animated-tools-2",
    "title": "buff_vandara_animated_tools_2_title",
    "desc": "buff_vandara_animated_tools_2_desc",
    "duration": 90,
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
  },
  "home-vandara-dorm": {
    "id": "home-vandara-dorm",
    "nameKey": "home_vandara_dorm_title",
    "descKey": "home_vandara_dorm_desc",
    "image": "img/housing/tent.webp",
    "capacity": 6
  },
  "home-vandara-loft": {
    "id": "home-vandara-loft",
    "nameKey": "home_vandara_loft_title",
    "descKey": "home_vandara_loft_desc",
    "image": "img/housing/house.webp",
    "capacity": 12,
    "modifiers": [
      {
        "key": "shadow_bind_cost",
        "add": -1
      }
    ]
  },
  "home-vandara-catacomb": {
    "id": "home-vandara-catacomb",
    "nameKey": "home_vandara_catacomb_title",
    "descKey": "home_vandara_catacomb_desc",
    "image": "img/housing/island_tower.webp",
    "capacity": 8
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
    "icon": "collection",
    "label": "nav_collection"
  }
};

// === Title Registry ===

export const TITLE_REGISTRY_GENERATED: Record<string, any> = {};

// === Section Registry (UI layout primitive — see Main view) ===

export const SECTION_REGISTRY_GENERATED: Record<string, any> = {
  "section-kitchen": {
    "id": "section-kitchen",
    "subTab": "herstellen",
    "headerLabel": "ui_tab_kitchen",
    "actionCategory": "kitchen",
    "requiresFlag": "build-kitchen",
    "helpTitleKey": "ui_tab_kitchen",
    "helpDescKey": "help_kitchen_desc"
  },
  "section-vandara-alchemy": {
    "id": "section-vandara-alchemy",
    "subTab": "herstellen",
    "headerLabel": "ui_tab_vandara_alchemy",
    "actionCategory": "vandara_workshop",
    "requiresFlag": "build-vandara-alchemy-laboratory"
  }
};

// === Sub-Tab Registry (UI layout primitive — see Main view) ===

export const SUB_TAB_REGISTRY_GENERATED: Record<string, any> = {
  "general": {
    "id": "general",
    "parentView": "main",
    "labelKey": "main_subtab_general_name",
    "alwaysShown": true,
    "order": 10
  },
  "herstellen": {
    "id": "herstellen",
    "parentView": "main",
    "labelKey": "main_subtab_herstellen_name",
    "order": 20
  }
};

// === Settings-Tab Registry (UI layout primitive — see Settings modal) ===

export const SETTINGS_TAB_REGISTRY_GENERATED: Record<string, any> = {
  "general": {
    "id": "general",
    "icon": "👤",
    "labelKey": "settings_tab_general",
    "order": 10
  },
  "controls": {
    "id": "controls",
    "icon": "⌨️",
    "labelKey": "settings_tab_controls",
    "order": 20
  },
  "audio": {
    "id": "audio",
    "icon": "🔊",
    "labelKey": "settings_tab_audio",
    "order": 30
  },
  "graphics": {
    "id": "graphics",
    "icon": "✨",
    "labelKey": "settings_graphics",
    "order": 40
  },
  "system": {
    "id": "system",
    "icon": "⚙️",
    "labelKey": "settings_system",
    "order": 50
  },
  "addons": {
    "id": "addons",
    "icon": "🧩",
    "labelKey": "settings_tab_addons",
    "order": 60
  },
  "smoke": {
    "id": "smoke",
    "icon": "🧪",
    "labelKey": "smoke_settings_tab",
    "order": 90
  }
};

// === Loaded Addons (build-time) ===
// List of every build-time addon that contributed to this bundle.
// Used by the save system to track which addons were active when a
// save was written, so the load path can warn when a save needs an
// addon that isn't compiled in. Runtime addons (drop-in folders)
// are tracked separately at boot — the save's full activeAddons
// list is the union of both.

export const BUILD_TIME_ADDONS: Array<{
  name: string;
  version: string;
  description?: string;
  author?: string;
  /** Manifest's "required: true" flag — locks the Disable toggle. */
  required?: boolean;
  /** YAML entries per category — used by the Addons settings UI. */
  entries?: Record<string, number>;
}> = [
  {
    "name": "core",
    "version": "1.7.0",
    "description": "Base game content (resources, NPCs, actions, translations). Required by every other addon — uninstalling would remove the demo, the village, the production loop, everything.",
    "author": "My earned Wings team",
    "required": true,
    "entries": {
      "resources": 21,
      "modifiers": 46,
      "actions": 78,
      "items": 36,
      "npcs": 11,
      "buffs": 2,
      "homes": 4,
      "milestones": 1,
      "navigation": 6,
      "sections": 1,
      "subTabs": 2,
      "settingsTabs": 6
    }
  },
  {
    "name": "luxana",
    "version": "0.1.0",
    "description": "Luxana — die Hauptstadt am Fuß des Vulkans. Zweites großes Story-Addon, erreicht nach dem Vandara-Abschluss: Tenebre wird an den Hof gerufen, um unter Anleitung von Meister Elian und dem Hofmagier-Kollegium betreute Schatten-Experimente durchzuführen — und mit Stadt + Adel klarzukommen. Vier Adelige geben Aufgaben, die nur ein Schatten lösen kann; Elians Abschluss schaltet den zweiten Schatten-Slot frei.",
    "author": "Lassandriel",
    "entries": {
      "actions": 9,
      "items": 1,
      "npcs": 9
    }
  },
  {
    "name": "smoke_test",
    "version": "0.1.0",
    "description": "Worked example that uses every addon capability the system ships: YAML content, patches, handlers.ts, effects.ts, ticks.ts, migrations.ts, schema.yaml, settingsTabs, slots, styles, inter-addon helpers. Lives in the repo as a self-check + author onboarding template; rename it to `_smoke_test` (underscore prefix) to disable without deleting.",
    "author": "addon-system audit",
    "entries": {
      "actions": 1,
      "npcs": 1,
      "settingsTabs": 1
    }
  },
  {
    "name": "vandara",
    "version": "0.1.0",
    "description": "Vandara — die Roségold-Akademie. Erstes großes Story-Addon nach dem Dorf-Demo. Beginnt mit dem Einladungsbrief, den Aria der Lehrerin nach dem Schulabschluss überreicht.",
    "author": "Lassandriel",
    "entries": {
      "resources": 2,
      "actions": 32,
      "items": 3,
      "npcs": 12,
      "buffs": 7,
      "homes": 3,
      "sections": 1
    }
  }
];

// === Addon Entry IDs (per category) ===
// Build emits the IDs of every entry each addon contributed. The
// Disable-toggle path uses this list at boot to remove an addon's
// contributions from the merged registries when the user turned it
// off in Settings → Addons. We don't ship this in BUILD_TIME_ADDONS
// itself because it's a lot of data the Addons UI doesn't need —
// it's purely the prune-step's input.

export const ADDON_ENTRY_IDS: Record<string, Record<string, string[]>> = {
  "core": {
    "resources": [
      "focus",
      "wood",
      "stone",
      "shards",
      "herbs",
      "astral_shards",
      "flowers",
      "ghostwood",
      "glowpollen",
      "fibers",
      "resin",
      "iron_parts",
      "clay",
      "rune_fragment",
      "arcane_dust",
      "meat",
      "water",
      "gourmet-meal",
      "energy",
      "magic",
      "satiation"
    ],
    "modifiers": [
      "shards_limit",
      "wood_limit",
      "stone_limit",
      "herbs_limit",
      "meat_limit",
      "water_limit",
      "energy_limit",
      "magic_limit",
      "resin_limit",
      "clay_limit",
      "iron_parts_limit",
      "satiation_limit",
      "astral_shards_limit",
      "flowers_limit",
      "ghostwood_limit",
      "glowpollen_limit",
      "fibers_limit",
      "rune_fragment_limit",
      "arcane_dust_limit",
      "gourmet-meal_limit",
      "study_xp_limit",
      "focus_limit",
      "magic_regen_passive",
      "garden_magic_cost",
      "magic_cost",
      "meditate_magic_gain",
      "energy_reg_bonus",
      "magic_limit_gain",
      "resource_efficiency",
      "shadow_bind_cost",
      "satiation_drain_multiplier",
      "wood_yield",
      "stone_yield",
      "meat_yield",
      "flowers_yield",
      "shards_yield",
      "magic_yield",
      "rest_energy_gain",
      "eat_satiation_gain",
      "garden_yield",
      "ghostwood_yield",
      "glowpollen_yield",
      "fibers_yield",
      "clay_yield",
      "resin_yield",
      "knowledge_yield"
    ],
    "actions": [
      "build-campfire",
      "build-tent",
      "build-wood-storage",
      "build-stone-storage",
      "build-water-barrel",
      "build-wood-storage-2",
      "build-stone-storage-2",
      "build-wood-storage-3",
      "build-stone-storage-3",
      "build-wood-storage-4",
      "build-stone-storage-4",
      "act-bed",
      "act-chair",
      "act-stove",
      "act-bookshelf",
      "act-cabinet",
      "act-grand-table",
      "act-bed-2",
      "act-stove-2",
      "build-loom",
      "build-bookshelf-large",
      "build-desk",
      "build-garden",
      "build-garden-upgrade",
      "build-mana-basin",
      "build-house",
      "build-table",
      "build-kitchen",
      "build-arcane-sanctum",
      "build-home-lake",
      "build-home-tower",
      "build-terrace",
      "act-chisel",
      "act-wanderstock",
      "act-axe",
      "act-pickaxe",
      "act-bow",
      "act-spice-rack",
      "build-cart-reinforced",
      "act-eat",
      "act-rest",
      "act-meditate",
      "act-wood",
      "act-stone",
      "act-hunt",
      "act-mine-quartz",
      "act-collect-water",
      "act-pick-flowers",
      "act-whisper-wood",
      "act-whisper-pollen",
      "act-dig-clay",
      "act-garden-plant",
      "act-garden-plant-2",
      "act-garden-water",
      "act-cook-gourmet",
      "act-read-lore-1",
      "act-read-lore-2",
      "act-dream-bloom",
      "act-meditate-sanctum",
      "act-spell-harvest",
      "act-grind-dust",
      "act-npc-baker",
      "act-npc-flowerGirl",
      "act-npc-artisan",
      "act-npc-teacher",
      "act-npc-townHall",
      "act-npc-blacksmith",
      "act-npc-sage",
      "act-npc-hunter",
      "act-npc-treeOfLife",
      "act-npc-ellie",
      "act-npc-aris",
      "act-sell-wood",
      "act-sell-stone",
      "act-sell-meat",
      "act-buy-meat",
      "act-work",
      "act-buy-iron-parts"
    ],
    "items": [
      "item-deed",
      "item-book_lore_1",
      "item-book_lore_2",
      "item-scroll",
      "item-whetstone",
      "item-arrowhead",
      "item-astral-shards",
      "item-dream-dust",
      "item-wyvern-scale",
      "item-arcane-dust",
      "item-crystal-mana",
      "item-bed",
      "item-chair",
      "item-stove",
      "item-bookshelf",
      "item-cabinet",
      "item-grand-table",
      "item-bed-2",
      "item-stove-2",
      "item-loom",
      "item-bookshelf-large",
      "item-desk",
      "item-mana-basin",
      "item-terrace",
      "item-bread",
      "item-cookie",
      "item-dried-meat",
      "item-gourmet-meal",
      "item-crystal_apple",
      "item-walking-stick",
      "item-axe",
      "item-pickaxe",
      "item-bow",
      "item-spice-rack",
      "item-chisel",
      "item-cart-reinforced"
    ],
    "npcs": [
      "npc-baker",
      "npc-flowerGirl",
      "npc-artisan",
      "npc-teacher",
      "npc-townHall",
      "npc-blacksmith",
      "npc-sage",
      "npc-hunter",
      "npc-treeOfLife",
      "npc-ellie",
      "npc-aris"
    ],
    "buffs": [
      "buff-gourmet",
      "buff-harvest"
    ],
    "homes": [
      "home-tent",
      "home-house",
      "home-lake",
      "home-tower"
    ],
    "milestones": [
      "milestone-treeOfLife"
    ],
    "navigation": [
      "main",
      "crafting",
      "village",
      "upgrades",
      "housing",
      "collection"
    ],
    "sections": [
      "section-kitchen"
    ],
    "subTabs": [
      "general",
      "herstellen"
    ],
    "settingsTabs": [
      "general",
      "controls",
      "audio",
      "graphics",
      "system",
      "addons"
    ]
  },
  "vandara": {
    "resources": [
      "ash_flower",
      "glitter_dust"
    ],
    "actions": [
      "act-vandara-brew-energy-potion-small",
      "act-vandara-brew-magic-potion-small",
      "act-vandara-brew-pollen-tea",
      "act-vandara-brew-spark-vial",
      "act-vandara-brew-arcane-water",
      "act-vandara-brew-ash-tincture",
      "act-npc-vandara-korren",
      "act-npc-vandara-iska",
      "act-npc-vandara-daven",
      "act-npc-vandara-olie",
      "act-npc-vandara-kalre",
      "act-vandara-buy-ash-flower",
      "act-vandara-buy-glitter-dust",
      "act-vandara-buy-glowpollen",
      "act-vandara-buy-resin",
      "act-vandara-buy-arcane-dust",
      "act-npc-vandara-fafa",
      "build-vandara-alchemy-laboratory",
      "build-vandara-dorm",
      "build-vandara-loft",
      "build-vandara-catacomb",
      "act-vandara-try-fire",
      "act-vandara-try-earth",
      "act-vandara-try-wind",
      "act-vandara-try-tide",
      "act-vandara-try-light",
      "act-npc-vandara-gate-guard",
      "act-npc-vandara-veyra",
      "act-npc-vandara-ormias",
      "act-npc-vandara-quinell",
      "act-npc-vandara-pamle",
      "act-npc-vandara-sariel"
    ],
    "items": [
      "item-vandara-diploma",
      "item-vandara-letter",
      "item-vandara-student-id"
    ],
    "npcs": [
      "npc-vandara-korren",
      "npc-vandara-iska",
      "npc-vandara-daven",
      "npc-vandara-olie",
      "npc-vandara-kalre",
      "npc-vandara-fafa",
      "npc-vandara-gate-guard",
      "npc-vandara-veyra",
      "npc-vandara-ormias",
      "npc-vandara-quinell",
      "npc-vandara-pamle",
      "npc-vandara-sariel"
    ],
    "buffs": [
      "buff-vandara-wakeful-pollen",
      "buff-vandara-spark-light",
      "buff-vandara-ash-burn",
      "buff-vandara-echo-clarity-1",
      "buff-vandara-echo-clarity-2",
      "buff-vandara-animated-tools-1",
      "buff-vandara-animated-tools-2"
    ],
    "homes": [
      "home-vandara-dorm",
      "home-vandara-loft",
      "home-vandara-catacomb"
    ],
    "sections": [
      "section-vandara-alchemy"
    ]
  },
  "luxana": {
    "actions": [
      "act-npc-luxana-elian",
      "act-npc-luxana-caldwen",
      "act-npc-luxana-mirelle",
      "act-npc-luxana-aurel",
      "act-npc-luxana-sylvaine",
      "act-npc-luxana-brannoc",
      "act-npc-luxana-veyl",
      "act-npc-luxana-pell",
      "act-npc-luxana-voss"
    ],
    "items": [
      "item-luxana-summons"
    ],
    "npcs": [
      "npc-luxana-elian",
      "npc-luxana-caldwen",
      "npc-luxana-mirelle",
      "npc-luxana-aurel",
      "npc-luxana-sylvaine",
      "npc-luxana-brannoc",
      "npc-luxana-veyl",
      "npc-luxana-pell",
      "npc-luxana-voss"
    ]
  },
  "smoke_test": {
    "actions": [
      "act-smoke-ping"
    ],
    "npcs": [
      "npc-smoke-witness"
    ],
    "settingsTabs": [
      "smoke"
    ]
  }
};

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
      },
      "act-npc-luxana-elian": {
        "title": "Meister Elian"
      },
      "act-npc-luxana-caldwen": {
        "title": "Lord Caldwen — Der geflutete Tresor"
      },
      "act-npc-luxana-mirelle": {
        "title": "Lady Mirelle — Die zerbrechliche Wiege"
      },
      "act-npc-luxana-aurel": {
        "title": "Vicomte Aurel — Das Schattentheater"
      },
      "act-npc-luxana-sylvaine": {
        "title": "Dame Sylvaine — Die Mondblume beschatten"
      },
      "act-npc-luxana-brannoc": {
        "title": "Brannoc — Das Hof-Archiv"
      },
      "act-npc-luxana-veyl": {
        "title": "Hauptmann Veyl — Eine Frage der Sicherheit"
      },
      "act-npc-luxana-pell": {
        "title": "Pell — Hofgeflüster"
      },
      "act-npc-luxana-voss": {
        "title": "Ondra Voss — Ein nützlicher Schatten"
      },
      "act-smoke-ping": {
        "title": "Smoke-Ping senden",
        "desc": "Schickt einen leisen Puls aus. Hebt die smoke_test-State-Zähler und löst den smokeFlash-Effekt aus."
      },
      "act-npc-vandara-gate-guard": {
        "title": "Torwächter",
        "unlocks": "Zugang zu Vandara"
      },
      "act-npc-vandara-olie": {
        "title": "Sekretär Olié"
      },
      "act-npc-vandara-kalre": {
        "title": "Händlerin Kal're"
      },
      "act-npc-vandara-fafa": {
        "title": "Bettlerin Fafa",
        "unlocks": "Zugang zu den Katakomben"
      },
      "act-vandara-buy-ash-flower": {
        "title": "Ascheblume kaufen",
        "effect": "ash_flower"
      },
      "act-vandara-buy-glitter-dust": {
        "title": "Glitzerstaub kaufen",
        "effect": "glitter_dust"
      },
      "act-vandara-buy-glowpollen": {
        "title": "Leuchtpollen kaufen",
        "effect": "glowpollen"
      },
      "act-vandara-buy-resin": {
        "title": "Harz kaufen",
        "effect": "resin"
      },
      "act-vandara-buy-arcane-dust": {
        "title": "Arkanstaub kaufen",
        "effect": "arcane_dust"
      },
      "build-vandara-alchemy-laboratory": {
        "title": "Alchemielabor bauen",
        "unlocks": "Pamles Braurezepte (nach Lehrstunden)"
      },
      "build-vandara-dorm": {
        "title": "Studentenbude mieten"
      },
      "build-vandara-loft": {
        "title": "Gelehrten-Loft einrichten"
      },
      "build-vandara-catacomb": {
        "title": "Katakomben-Kammer beziehen"
      },
      "act-npc-vandara-veyra": {
        "title": "Magistra Veyra"
      },
      "act-npc-vandara-ormias": {
        "title": "Lektor Ormias"
      },
      "act-npc-vandara-quinell": {
        "title": "Doktor Quinell"
      },
      "act-npc-vandara-korren": {
        "title": "Student Korren"
      },
      "act-npc-vandara-iska": {
        "title": "Studentin Iska"
      },
      "act-npc-vandara-daven": {
        "title": "Marschall Daven"
      },
      "act-vandara-try-fire": {
        "title": "Feuerprobe"
      },
      "act-vandara-try-earth": {
        "title": "Erdprobe"
      },
      "act-vandara-try-wind": {
        "title": "Windprobe"
      },
      "act-vandara-try-tide": {
        "title": "Gezeitenprobe"
      },
      "act-vandara-try-light": {
        "title": "Lichtprobe"
      },
      "act-npc-vandara-sariel": {
        "title": "Sariel"
      },
      "act-npc-vandara-pamle": {
        "title": "Magistra Pamle"
      },
      "act-vandara-brew-energy-potion-small": {
        "title": "Kleinen Energietrank brauen",
        "desc": "Pamles erstes Rezept. Kräuter im Mörser zerstampft, mit lauwarmem Wasser aufgegossen, einmal kräftig umgerührt. Schmeckt nach Wiese und schlechtem Tee — wirkt aber sofort."
      },
      "act-vandara-brew-magic-potion-small": {
        "title": "Kleinen Magietrank brauen",
        "desc": "Blüten in Wasser destilliert. Färbt sich blass-lila wenn er fertig ist. Hilft beim Konzentrieren, schmeckt wie der erste Schluck von etwas Verbotenem."
      },
      "act-vandara-brew-pollen-tea": {
        "title": "Wachpollen-Tee brauen",
        "desc": "Leuchtpollen über Blüten gepudert, eine Minute ziehen lassen. Heller Aufguss, der dich für eine Weile durchgehend regeneriert statt einmal kurz aufzuwecken."
      },
      "act-vandara-brew-spark-vial": {
        "title": "Funkenlicht-Phiole brauen",
        "desc": "Glitzerstaub in einer Ascheblume gebunden. Die Phiole leuchtet von selbst — ein tragbares Licht, das du an deinen Gürtel hängen kannst. Senkt die Magiekosten eines gebundenen Schattens."
      },
      "act-vandara-brew-arcane-water": {
        "title": "Arkanwasser brauen",
        "desc": "Studentenstandard: Arkanstaub in Wasser gelöst, mit einer Prise Glitzerstaub stabilisiert. Knackiger Magieschub jetzt, sanfte Nachwirkung danach."
      },
      "act-vandara-brew-ash-tincture": {
        "title": "Aschebrand-Tinktur brauen",
        "desc": "Pamles eigene Erfindung. Ascheblumen-Pollen mit Harz konzentriert. Macht für zwei Minuten zu einer Holzfäll-Maschine — mehr Ausbeute aus jedem Schlag."
      }
    },
    "buffs": {
      "item_gourmet_meal_title": "Gourmet-Mahlzeit",
      "buff_gourmet_desc": "Nährt den Körper nachhaltig.",
      "buff_harvest_title": "Segen der Ahnen",
      "buff_harvest_desc": "Die Natur antwortet auf deinen Ruf (+1 auf alle Sammelerträge).",
      "buff_vandara_wakeful_pollen_title": "Wachpollen-Tee",
      "buff_vandara_wakeful_pollen_desc": "Sanfter Energieschub. +1 Energie-Regen pro Tick, 60 Sekunden.",
      "buff_vandara_spark_light_title": "Funkenlicht",
      "buff_vandara_spark_light_desc": "Tragbare Lichtquelle. Senkt den Magie-Verbrauch eines gebundenen Schattens spürbar. 90 Sekunden.",
      "buff_vandara_ash_burn_title": "Aschebrand",
      "buff_vandara_ash_burn_desc": "Heißer, durchpulsender Energierausch. Holz- und Stein-Ausbeute +1 pro Aktion, 2 Minuten.",
      "buff_vandara_echo_clarity_1_title": "Echo-Klarheit",
      "buff_vandara_echo_clarity_1_desc": "Nach Korrens Experiment hängt eine schwache Resonanz um dich. +1 Magie-Regeneration, 60 Sekunden.",
      "buff_vandara_echo_clarity_2_title": "Tiefe Echo-Klarheit",
      "buff_vandara_echo_clarity_2_desc": "Eine stärkere nachklingende Resonanz. +2 Magie-Regeneration, 90 Sekunden.",
      "buff_vandara_animated_tools_1_title": "Animierte Werkzeuge",
      "buff_vandara_animated_tools_1_desc": "Deine Werkzeuge zucken hilfsbereit von alleine. +1 Holz-Ausbeute, 60 Sekunden.",
      "buff_vandara_animated_tools_2_title": "Laufende Werkzeuge",
      "buff_vandara_animated_tools_2_desc": "Werkzeuge, die du berührst, fangen an mitzulaufen. +1 Holz- und +1 Stein-Ausbeute, 90 Sekunden."
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
      "item_crystal_apple_desc": "Ein gläsern glänzender Apfel, der magisch nährt (+30 Sättigung, +20 Energie).",
      "item_luxana_summons_title": "Hof-Vorladung",
      "item_luxana_summons_desc": "Ein schweres Dokument, versiegelt in tiefem Kaiserrot, das dich namentlich und nach Element anfordert. Der Hof von Luxana wünscht, dass die seltene Schatten-Gabe ordentlich studiert wird — unter Meister Elian vom Hofmagier-Kollegium. Absolventen werden selten direkt in die Hauptstadt gerufen. Du bist offenbar nicht die meisten Absolventen.",
      "item_vandara_letter_title": "Einladung der Roségold-Akademie",
      "item_vandara_letter_desc": "Ein gefalteter, dicker Brief auf cremefarbenem Papier, versiegelt mit roségoldenem Wachs. Innen, in eleganter Handschrift, lädt dich die Akademie nach Vandara ein. \"Wir laden Drachenwandler aller Herkünfte ein, ihren eigenen Weg zu finden.\" Eine Karte zur Stadt liegt bei.",
      "item_vandara_student_id_title": "Studentenausweis der Roségold-Akademie",
      "item_vandara_student_id_desc": "Ein kleines, gewichtiges Plättchen aus poliertem Roségold mit deinem Namen, einer Seriennummer und dem Akademie-Wappen. Vom Sekretariat ausgestellt — Sekretär Olié hat dich extra zweimal buchstabieren lassen, \"um nichts zu verschmutzen.\"",
      "item_vandara_diploma_title": "Diplom der Roségold-Akademie",
      "item_vandara_diploma_desc": "Ein gefaltetes Dokument auf schwerem cremefarbenen Papier, versiegelt mit roségoldenem Wachs. Innen, in feiner Kalligrafie, bestätigt die Akademie, dass du den Grundkurs abgeschlossen hast — Drachenkunde, Arkane Grundlagen, Element-Diagnostik — und praktische Schatten-Kontrolle nachgewiesen hast. Drei Prüfer:innen haben unterschrieben. Olié hat es mit der Würde einer Person beglaubigt, die seit dreißig Jahren diese Akten archiviert."
    },
    "logs": {
      "save_success": "Spiel erfolgreich gespeichert.",
      "save_corrupted_msg": "Spielstand war beschädigt und wurde zur Sicherheit beiseitegelegt. Wir starten neu.",
      "save_failed_msg": "Speichern fehlgeschlagen — vielleicht ist der Speicher voll? Fortschritt seit dem letzten Save ist nicht gesichert.",
      "addon_compat_title": "Addon-Kompatibilität",
      "addon_compat_missing_heading": "Fehlende Addons",
      "addon_compat_missing_hint": "Inhalte aus diesen Addons sind im Spielstand referenziert, aber jetzt nicht geladen. Quests könnten festhängen, Gegenstände im Inventar unbenutzbar werden.",
      "addon_compat_version_heading": "Versionsänderungen",
      "addon_compat_added_heading": "Neu aktiv (waren im Spielstand nicht dabei)",
      "addon_compat_load_anyway": "Trotzdem laden",
      "addon_compat_cancel": "Abbrechen",
      "intro_welcome": "Willkommen zurück am festen Boden, {player}.",
      "reward_unlock_npc": "Neue Bekanntschaft: {name}",
      "reward_unlock_recipe": "Neues Rezept freigeschaltet: {title}",
      "reward_unlock_item": "Gegenstand entdeckt: {title}",
      "reward_blueprint_lake": "Bauplan für das Haus am See erhalten.",
      "reward_blueprint_tower": "Bauplan für den Aura-Turm erhalten.",
      "unlock_whisper_grove": "Mina führt dich zu einem geheimen Pfad: Der Flüsterhain ist nun zugänglich.",
      "receive_books": "Bücher erhalten! Du kannst sie im Haupt-Bereich lesen — danach findest du sie archiviert in deiner Sammlung.",
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
      "ui_shadow_released": "Schatten gelöst (Bedingungen nicht mehr erfüllt).",
      "ui_shadow_no_slots": "Kein freier Schatten zum Binden. Löse einen oder verdiene einen neuen.",
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
      "shadow_broken_magic": "Deine magische Energie ist erschöpft. Der gebundene Schatten löst sich auf.",
      "receive_luxana_summons": "Olié überreicht dir eine Hof-Vorladung. Luxana will deinen Schatten studieren — Meister Elian wartet im Hofmagier-Kollegium.",
      "luxana_elian_met": "Du hast Meister Elian kennengelernt — den Lehrer, der jedes Element außer Schatten unterrichtet hat. Er reicht dich direkt an den Adel weiter.",
      "luxana_caldwen_done": "Das Siegel steigt tropfend durch das Gitter. Caldwen lässt durchblicken, dass der Hof nun zusieht. Bis zum Abend fragen zwei weitere Adelige nach dir.",
      "luxana_vault_relic": "Noch etwas kam mit dem Siegel herauf — eine schuppendunkle Scherbe, die in keine Akte passt, älter als der Tresor. Der Hof-Archivar weiß vielleicht Rat.",
      "luxana_mirelle_done": "Der Talisman löst sich; die Wiege knarzt nicht, das Kind regt sich nicht. Lady Mirelle weint vor Erleichterung.",
      "luxana_aurel_done": "Schatten tanzen über die Ballsaalwände, heller noch durch die Kronleuchter. Aurels Soirée — und du — sind das Gespräch von Luxana.",
      "luxana_sylvaine_done": "Steter Schatten wandert mit der Mondblume über den sonnigen Hof; kein Blütenblatt welkt. Dame Sylvaine nickt — bei ihr höchstes Lob.",
      "luxana_brannoc_met": "Brannoc dreht die Scherbe um und um, murmelnd. \"Älter als das Archiv.\" Er schickt dich fort, während er die tiefen Rollen durchsucht.",
      "luxana_archive_revealed": "Brannoc rollt ein jahrhundertealtes Bild aus: ein Schattendrache mit deinem Gesicht. Keiner spricht es aus — und der Fund bleibt nicht geheim.",
      "luxana_veyl_confronted": "Hauptmann Veyl versperrt dir den Weg. Ein Ding, das durch Gitter schlüpft, sei ein Loch in jeder Mauer — sie bringt den Schatten vor den Hof.",
      "luxana_pell_met": "Pell, die Hofpage, kennt jede Fehde und welche Türen klemmen. Eine gute Bekanntschaft dort, wo alle lächeln.",
      "luxana_pell_warned": "Pell findet dich zuerst: \"Die Hauptmann hat nach dir gefragt. Ganz leise.\" Dey verschwindet, ehe du dey danken kannst.",
      "luxana_voss_met": "Ondra Voss kaufte ihren Salon und die Hälfte der Gäste; was sie nicht kaufen kann, ist ein Titel. Gern ließe sie sich mit dem Schatten sehen.",
      "luxana_voss_resolved": "Du weist Voss sanft ab — du bist niemandes Schmuckstück. Sie lacht, und meint es. Eine seltsame Verbündete, aber eine echte.",
      "luxana_elian_finale": "Der Hof hört Veyl an — und stellt sich auf Elians Seite und die der Adeligen, denen du gedient hast. Keine Leine, keine Zelle. Du verlässt Luxana frei, ein zweiter Schatten auf deinen Ruf, und ein altes gemaltes Gesicht, das du nicht mehr loswirst.",
      "smoke_ping_log": "Ein leiser Pulsschlag rollt durch das Tal.",
      "smoke_panel_title": "Smoke-Test Diagnose",
      "smoke_panel_hint": "Diese Werte aktualisieren sich live aus dem `smoke_test` addonState-Slot. Wenn die Tick-Zahl steigt, läuft der Hook; wenn Vandara hier ✔ zeigt, hat isAddonLoaded angeschlagen.",
      "smoke_stat_ticks": "Ticks",
      "smoke_stat_flashes": "Smoke-Flashes ausgelöst",
      "smoke_stat_vandara": "Vandara geladen",
      "receive_vandara_letter": "Aria überreicht dir einen Brief mit roségoldenem Siegel. Eine Einladung zur Akademie in Vandara.",
      "vandara_admitted": "Du wurdest in Vandara aufgenommen. Die Akademie liegt vor dir.",
      "vandara_enrolled": "Olié reicht dir den Studentenausweis. Du bist offiziell Studentin/Student der Roségold-Akademie.",
      "vandara_alchemy_laboratory_built": "Dein Alchemielabor steht. Jetzt fehlt nur noch jemand, der dir zeigt, was du damit anfangen kannst.",
      "vandara_dorm_built": "Du hast ein Studentenzimmer in Vandara gemietet. Klein, aber deins.",
      "vandara_loft_built": "Du bist in ein sonniges Gelehrten-Loft gezogen. Überall Licht — Schatten fallen hier leicht.",
      "vandara_catacomb_built": "Du hast dir eine verborgene Kammer in den Katakomben gesichert. Still, dunkel, und völlig abseits der Akten.",
      "vandara_katakomben_unlocked": "Fafa zeigt dir den verborgenen Zugang zu den Katakomben unter Vandara. Eine andere Stadt liegt unten.",
      "vandara_veyra_intro_done": "Du hast Veyras Element-Diagnostik-Sprechstunde abgeschlossen.",
      "vandara_ormias_intro_done": "Du hast Ormias' Grundkurs Drachenkunde abgeschlossen.",
      "vandara_quinell_intro_done": "Du hast Quinells Grundkurs Arkane Grundlagen abgeschlossen.",
      "vandara_trial_fire": "Feuerprobe — keine Resonanz.",
      "vandara_trial_earth": "Erdprobe — keine Resonanz.",
      "vandara_trial_wind": "Windprobe — keine Resonanz.",
      "vandara_trial_tide": "Gezeitenprobe — keine Resonanz.",
      "vandara_trial_light": "Lichtprobe — etwas zuckt. Aber kein klares Licht. Veyra ist beunruhigt-fasziniert.",
      "vandara_shadow_revealed": "Veyra hat es bestätigt: du bist ein Schattenwandler. Eine Sub-Variante des Lichts, extrem selten. Sie gibt dir einen Namen mit — Sariel, eine alte Kollegin, die vor vierzig Jahren die Akademie verließ.",
      "vandara_shadow_trained": "Sariel hat dich durch die Grundlagen geführt. Du bist aufgewacht — der Rest kommt mit der Übung.",
      "vandara_shadow_bind_learned": "Sariel hat dir beigebracht, einen Schatten an eine Aufgabe zu binden. Magie läuft die ganze Zeit ab; vorerst nur ein Schatten gleichzeitig.",
      "vandara_ormias_reveal_reaction": "Ormias frisst graziös seine \"Spätzünder-Großdrache\"-Prognose und lädt dich zum Wiederkommen ein.",
      "vandara_quinell_reveal_reaction": "Quinell bestätigt leise, dass Sariel von Anfang an Recht hatte.",
      "vandara_olie_reveal_reaction": "Olié aktualisiert deine Studierenden-Akte. Element: Schatten, Sub-Variante Licht, Vermerk: selten.",
      "vandara_pamle_reveal_reaction": "Pamle hat es gehört. Sagt, sie überlegt sich passende Schatten-Reagenzien.",
      "vandara_exam_scheduled": "Olié hat deine Abschluss-Prüfung angesetzt. Drei Stationen: Veyra für die Praxis, Ormias für die Mündliche, Quinell für die Schriftliche.",
      "vandara_exam_veyra_done": "Praxis-Prüfung bestanden. Veyras Notiz: \"beispielhafte Kontrolle für eine:n Erstjährige:n Schattenwandler:in.\"",
      "vandara_exam_ormias_done": "Mündliche Prüfung bestanden. Ormias' Notiz: \"kannte alle sieben und benannte die achte unaufgefordert.\"",
      "vandara_exam_quinell_done": "Schriftliche Prüfung bestanden. Quinells Notiz: \"zufriedenstellend\" — sein höchstes Lob in vierzig Jahren.",
      "vandara_graduated": "Du hast die Roségold-Akademie von Vandara abgeschlossen.",
      "vandara_pamle_intro_done": "Pamle hat dir die beiden Basis-Rezepte gezeigt — Energietrank und Magietrank.",
      "vandara_pamle_tier2_done": "Pamle nimmt deine drei Energietränke und lehrt dich Tier-2 — Wachpollen-Tee und Funkenlicht-Phiole.",
      "vandara_pamle_tier3_done": "Pamle nimmt drei Funkenlicht-Phiolen und unterrichtet dich in Arkanwasser und Aschebrand-Tinktur.",
      "vandara_alchemy_mastered": "Du beherrschst Pamles komplettes Grundkurs-Repertoire. Komplexere Rezepte kommen später.",
      "vandara_korren_1_done": "Korren hat ein schwaches Echo aus einem Schmiede-Ring geweckt. Er ist zufrieden.",
      "vandara_korren_2_done": "Korren hat ein deutlicheres Echo aus einer alten Militärmünze gezogen. Er läuft auf und ab.",
      "vandara_korren_arc_done": "Korren hat eine kaiserliche Archiv-Scherbe aufgebrochen. Die Kerze ist eine Sekunde lang erloschen. Er sieht nicht gut aus.",
      "vandara_iska_1_done": "Iskas Löffel ist zehn Sekunden lang von alleine gestanden. Sie ist begeistert und leicht blutend.",
      "vandara_iska_2_done": "Iskas Uhrwerksfigur ist drei Schritte gelaufen. Der Hof wird davon erfahren.",
      "vandara_iska_arc_done": "Iskas Knochen-Puppe ist im Kreis gelaufen und hat sich zu dir umgedreht. Iska lacht. Du nicht.",
      "vandara_daven_tip_1": "Marschall Daven ist eingetroffen und bittet dich um einen allgemeinen Bericht.",
      "vandara_daven_tip_2": "Du hast beide Experimente im Detail beschrieben. Daven macht Notizen.",
      "vandara_catacomb_students_busted": "Du hast Marschall Daven zu beiden Werkbänken geführt. Korren und Iska sind verhaftet. Deine Rolle: kooperierende Zeug:in."
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
      "modifier_magic_regen_passive_title": "Passive Magie-Regeneration",
      "modifier_magic_regen_passive_desc": "Magie regeneriert sich passiv über die Zeit.",
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
      "lore_2_step_10": "<i>Der Pakt von Luxana wird alle hundert Jahre erneuert, um den Bund zwischen den Drachenspezies zu festigen.</i>",
      "npc_olie_luxana_summons": "Olié schiebt ein letztes versiegeltes Dokument über den Tisch. \"Der Hof von Luxana hat nach Ihnen verlangt — namentlich, und nach Element. Eine Vorladung ans Hofmagier-Kollegium, unter Meister Elian persönlich.\" Eine seltene Pause. \"Wir schicken selten eine frische Absolventin direkt an den Hof. Glückwunsch — gleich doppelt, wie es scheint.\"",
      "npc_luxana_elian_1": "Ein vollgestopftes Studierzimmer, Kristallstäbe treiben in der Luft, ein uralter Lehrer blinzelt über eine rutschende Brille. \"Ah — Sie sind es. Meister Elian. Vierzig Jahre lehre ich an diesem Hof — jedes Element außer Schatten. Und nun drückt man mir den ersten Schattenwandler in die Hand.\" Er beugt sich vor. \"Ehrlich gesagt habe ich keine Ahnung, wo ich anfangen soll. Wir finden es gemeinsam heraus. Der alte Lord Caldwen liegt mir seit einer Woche in den Ohren — gehen Sie, zeigen Sie, was ein Schatten kann, was ein Drache nicht vermag.\"",
      "npc_luxana_elian_2": "Der Saal ist voll. Hauptmann Veyl legt ihren Fall dar: Ein Ding, das durch Gitter schlüpft und nichts wiegt, dürfe man nicht unbeobachtet umherwandern lassen. Auf dem Tisch — Brannocs jahrhundertealtes Bild eines Schattendrachen mit deinem Gesicht. Elian erhebt sich. \"Hauptmann, Sie wollen einsperren, was Sie sich nicht die Mühe gemacht haben zu verstehen.\" Einer nach dem anderen treten die Adeligen für Sie ein. Veyl neigt den Kopf — ein Waffenstillstand, keine Niederlage. Später, leise: \"Sie können nun einen zweiten Schatten halten. Binden Sie ihn, wie Sariel es lehrte.\" Er zögert. \"Dieses Bild... gehen Sie behutsam. Luxana hat keine Antwort darauf, was Sie sind. Vielleicht hat irgendwo eine.\"",
      "npc_luxana_caldwen_1": "Caldwen erhebt sich nicht, als Sie eintreten. \"Der Hof-Schatten zum Vorzeigen.\" Eine Schatzkammer unter seinem Anwesen ist vollgelaufen; das drei Jahrhunderte alte Familiensiegel liegt hinter einem Eisengitter, zu eng für jede Klaue, in Wasser, in das kein Diener taucht. \"Man sagt, ein Schatten braucht weder Atem noch Breite. Greifen Sie durch. Holen Sie es herauf. Gelingt es, hört der Hof es von mir — mehr wert, als Sie ahnen.\"",
      "npc_luxana_mirelle_1": "Lady Mirelle empfängt Sie mit dem Finger auf den Lippen. \"Leise — bitte.\" Ein Kind schläft in einer Wiege aus gesponnenem Kernholz. \"Ein Schutztalisman ist unter die Matratze gerutscht und summt nun, wo er schweigen sollte — doch das Holz trägt keine Hand, und Klauen würden sie wecken.\" Ihre Fassung bebt. \"Man sagt, Ihr Schatten wiegt nichts. Heben Sie ihn heraus. Wecken Sie meine Tochter nicht.\"",
      "npc_luxana_aurel_1": "Vicomte Aurel ist schon mitten in einer Geste, als Sie eintreffen. \"Meine Soirée braucht etwas, das sie nie gesehen haben und nicht kaufen können.\" Er stößt die Ballsaaltüren auf, hin zu einem Lodern von Kronleuchtern. \"Man sagt, Schatten ist am stärksten, wo das Licht am hellsten brennt. Ein lebendiges Schattenspiel über diese Wände. Geben Sie ihnen das, und Aurels Gunst öffnet Türen, die selbst Caldwens Name nicht vermag.\"",
      "npc_luxana_sylvaine_1": "Dame Sylvaine sieht nicht von der blassen Blüte in ihren behandschuhten Händen auf. \"Mondblume. Eine Berührung echten Tageslichts, und sie schwärzt für immer — doch sie muss am Mittag über den offenen Hof.\" Sie mustert Sie. \"Ich brauche Schatten, der mit ihr wandert und nicht einen Strahl durchlässt. Schatten gehört zum Licht; Sie sollten das beherrschen. Gehen Sie neben mir. Halten Sie es dunkel.\"",
      "npc_luxana_brannoc_1": "Das Archiv ist eine Schlucht aus Regalen, erhellt von einer störrischen Lampe. Brannoc taucht auf, bis zu den Ellenbogen voll Tinte — dann sieht er die schuppendunkle Scherbe, die du trägst, und erstarrt. \"Älter als der Hof, der diesen Raum gebaut hat.\" Schon schlurft er zu den tiefen Stapeln. \"Kommen Sie wieder, wenn ich Zeit mit den alten Rollen hatte. Und erwähnen Sie es nicht bei den Vergoldeten oben.\"",
      "npc_luxana_brannoc_2": "Brannoc hat nicht geschlafen. Er rollt etwas so Altes aus, dass das Pergament seufzt — ein Schattendrache in verblassender Tinte, Schwingen wie verschüttete Nacht. Er deutet nicht auf das Gesicht. Er muss es nicht. \"Ich sage nur, was ich beweisen kann: Das ist alt, das ist Schatten, und das bist *du*.\" Seine Hände sind nicht ganz ruhig. \"So etwas bleibt nicht geheim. Jemand mit einem Schwert wird davon hören.\"",
      "npc_luxana_veyl_1": "Veyl wartet, wo der Korridor sich verengt. \"Ich höre, das Archiv hat ein Bildnis zutage gefördert. Jahrhundertealt, und es trägt Ihr Gesicht.\" Ihr Ton ist beinahe freundlich, was schlimmer ist. \"Ich habe nichts gegen Sie. Aber Sie schlüpfen durch Gitter und stehen ungesehen in hellen Sälen — und ich bewache diesen Hof.\" Sie tritt beiseite, gerade so. \"Ich bringe es vor den Hof. Seien Sie da. Lieber hören Sie es von mir als aus einer Zelle.\"",
      "npc_luxana_pell_1": "Eine Page, kaum größer als dein Ellenbogen, fällt neben dir in Schritt. \"Du bist der Schatten. Ich bin Pell — ich trage Sachen, meistens Geheimnisse.\" Dey grinst. \"Caldwens Tresor ist nicht das Einzige von ihm, das unter Wasser steht. Der Vicomte schuldet seinem Schneider mehr, als sein Gut wert ist. Eine Page bemerkt niemand, also bemerke ich alles. Sei nett zu mir, und ich bin dir nützlich.\"",
      "npc_luxana_pell_2": "Pell wartet in einem Türrahmen, die Stimme leise. \"Das Bild, das der alte Archivar ausgegraben hat? Die Hauptmann war zweimal da und hat gefragt, was ein Schatten kann.\" Dey zupft am Ärmel. \"Veyl ist nicht grausam — das ist das Problem. Sie kommt dir gerade ins Gesicht, nach den Regeln. Also gib ihr keinen Grund. Du hast jetzt Freunde hier. Nutz uns.\"",
      "npc_luxana_voss_1": "Ondra Voss erscheint in einer Wolke aus teurem Duft. \"Der Schatten, nach dem alle schnappen. Ich habe das Haus, den Wein, die richtigen Gäste — was mir fehlt, ist der *Anlass*. Sie sind ein Gesprächsthema.\" Ein helles, brüchiges Lächeln. \"Einen Abend in meinem Salon. Tun Sie etwas Wunderbares. Nennen Sie Ihren Preis — Preise verstehe ich.\"",
      "npc_luxana_voss_2": "Sie sagen Voss, dass Sie niemandes Schaustück sein werden. Sie erstarrt — dann lacht sie, hässlich und warm. \"Das erste ehrliche 'Nein', seit ich mich durch jene Tür gekauft habe.\" Sie betrachtet Sie aufs Neue. \"Behalten Sie Ihren Schatten für sich. Doch das Wohlwollen einer emporgekommenen Händlerin — die einzige wahre Währung an diesem Hof — haben Sie. Ohne Vorstellung.\"",
      "npc_teacher_vandara_letter": "\"Bevor du gehst, {player}... das hier ist heute Morgen für dich angekommen.\" Aria zieht einen gefalteten Brief aus ihrer Tasche. Das Siegel schimmert in einem warmen Roségold. \"Aus Vandara. Die Roségold-Akademie. Ich habe ihnen geschrieben, nachdem ich gesehen habe, wie ernsthaft du gelernt hast. Es ist nur eine Einladung — keine Verpflichtung. Aber wenn du wissen willst, was du wirklich bist, ist das vielleicht der richtige Weg.\"",
      "npc_vandara_olie_1": "Sekretär Olié sieht von seinem Stapel Akten auf — eine elegant gefiederte Schlange mit irisierenden Schuppen, die wie nasse Kieselsteine glänzen. \"Ah. Eine Neueinschreibung.\" Er lächelt höflich, aber distanziert. \"Bitte nehmen Sie Platz. Wir gehen das Notwendige der Reihe nach durch. Name, Herkunft, Element wenn bekannt.\" Sein Federkamm zuckt leicht, als du beim letzten Punkt zögerst. \"Unbekannt ist auch eine Antwort, keine Sorge.\"",
      "npc_vandara_olie_2": "\"So, die Einschreibegebühr.\" Olié schiebt dir ein winziges Bronzeschälchen über den Tisch. \"Fünfundzwanzig Splitter, einmalig. Die Akademie selbst ist kostenfrei — wir sind nicht das Kristallreich. Die Gebühr deckt nur den Verwaltungsaufwand und einen Schluck Tee, falls Sie länger warten müssen.\"",
      "npc_vandara_olie_3": "\"Hier ist Ihr Ausweis.\" Olié reicht dir ein dünnes, schweres Plättchen aus poliertem Roségold. \"Damit kommen Sie überall hin, wo Sie hindürfen — und ein paar Orte, wo Sie eigentlich nicht hindürften, aber die niemand kontrolliert.\" Er tippt auf eine Liste auf seinem Schreibtisch. \"Ihre Mentoren. Lektor Ormias hält Drachenkunde. Doktor Quinell betreut die Arkanen Grundlagen. Und Praktikerin Pamle gibt Alchemie, allerdings ergibt ihr Unterricht erst Sinn, wenn Sie sich ein Alchemielabor eingerichtet haben.\" Eine höfliche Pause. \"Da Sie Ihr Element nicht angeben konnten, schicke ich Sie zusätzlich zu Magistra Veyra. Sie führt die Diagnostik durch — keine Vorlesung, eine Sprechstunde. Die Beste der Stadt. Die Akademie hat Glück, sie zu halten.\" Ein höfliches Nicken. \"Willkommen in Vandara, Studentin.\"",
      "npc_vandara_olie_4": "Olié schaut von seinem Stapel auf, höflich wie immer. \"Ah. Das Element-Feld auf Ihrer Studierenden-Akte. Ich habe es offengelassen, wie besprochen.\" Er zieht eine dünne Feder hervor. \"Ich trage es jetzt nach.\" Eine Pause, während er schreibt. \"Schatten. Sub-Variante Licht. Vermerk: selten.\" Er pustet die Tinte trocken. \"So. Ordnungsgemäß eingetragen. Die Akademie-Archive schätzen Genauigkeit mehr als Neuheit, aber in diesem Fall bekommen sie beides.\" Ein höfliches Nicken. \"Machen Sie weiter, Studierende.\"",
      "npc_vandara_olie_5": "Olié legt seine Feder in dem Moment ab, in dem Sie eintreten — er hat offensichtlich gewartet. \"Ihre Akte ist vollständig. Drei Grundkurse, eine Element-Diagnostik, eine eigenständig organisierte Schatten-Praxis. Der Rat hat Sie zur Abschluss-Prüfung zugelassen.\" Er schiebt eine dünne roségoldene Marke über den Tisch. \"Ihr Prüfungs-Pass. Zeigen Sie ihn an jeder Station. Magistra Veyra führt die Praxis durch — sie erwartet Shadow Bind unter kontrollierten Bedingungen. Lektor Ormias prüft Sie mündlich in Drachenkunde. Doktor Quinell prüft Sie schriftlich in den Arkanen Grundlagen.\" Eine kleine, formale Pause. \"Sie können die Reihenfolge wählen. Kehren Sie danach zu mir zurück. Ich werde hier sein. Ich bin immer hier.\"",
      "npc_vandara_olie_6": "Olié erhebt sich. Er erhebt sich selten. \"Alle drei Teile bestanden. Magistra Veyra notierte, ich zitiere: 'beispielhafte Kontrolle für eine:n Erstjähre:r:n Schattenwandler:in — zumindest die:der erste, die:der mir je begegnet ist.' Lektor Ormias notierte: 'kannte alle sieben und benannte die achte unaufgefordert.' Doktor Quinell notierte nur 'zufriedenstellend'. Das ist das höchste Lob, das er je auf ein Abschluss-Formular geschrieben hat, in meinen vierzig Jahren.\" Er holt ein gefaltetes Dokument aus schwerem cremefarbenen Papier mit roségoldenem Siegel hervor. \"Ihr Diplom. Die Roségold-Akademie von Vandara bestätigt hiermit, dass Sie den Grundkurs abgeschlossen haben.\" Er reicht es Ihnen mit beiden Händen. \"Glückwunsch, Absolvent:in. Die Akademie steht in Ihrer Schuld für eine:n Schattenwandler:in. Wohin Sie als Nächstes gehen, steht nicht in unserer Akte.\" Ein kleines, fast warmes Lächeln. \"Viel Glück, {player}.\"",
      "npc_vandara_kalre_1": "Eine junge Drachenwandlerin mit silberblauen Haaren und einem Stand voller Glasgefäße ruft dir zu. \"Du bist neu, ja? Sieht man.\" Sie grinst breit. \"Kal're, aus dem Kristallreich. Windlinie. Habe ich schon gesagt, dass ich aus dem Kristallreich bin? Das tu ich gern, dann fragt niemand, warum ich Schuppen wie Glas habe.\" Sie schiebt dir ein Schälchen Ascheblumen zu. \"Schnupper mal. Riecht nach Vulkanstaub und nach einer Sache, die du nicht benennen kannst. Wenn du jemals in ein Alchemielabor kommst, wirst du sie brauchen.\"",
      "npc_vandara_kalre_2": "\"Du bist wieder da! Gut, gut.\" Kal're sortiert Glitzerstaub in winzige Tütchen. \"Wirst sehen, in Vandara redet jeder mit jedem und alle wissen alles. Außer das, was sie nicht wissen sollen — da sind sie erstaunlich diszipliniert.\"",
      "npc_vandara_kalre_3": "\"Du fragst dich, ob ich dir traue, ja?\" Sie lacht. \"Genug. Hör mal — du kaufst andauernd meine Reagenzien, aber du hast nichts, wo du sie verarbeiten könntest. Die meisten Akademie-Studenten stellen sich ein kleines Alchemielabor ins Haus. Zwei Regale, ein Kupferbecken, ein Abzug.\" Sie skizziert es auf die Rückseite einer Tüte. \"Hier. Bring Holz und Stein mit, jetzt weißt du, wie's zusammengeht.\"",
      "npc_vandara_kalre_4": "Kal're winkt dich näher. \"Weißt du, was das Lustige an Vandara ist? Die Akademie tut so, als wäre sie das Herz der Stadt. Aber die echten Sachen passieren in den Hinterzimmern. Auf den Straßen. In den Katakomben unten.\" Sie blinzelt. \"Sag's nicht weiter.\"",
      "npc_vandara_kalre_5": "\"Du bist jetzt einer von meinen Stammkunden.\" Kal're tippt sich gegen die Stirn. \"Wenn du je was Seltenes brauchst — was wirklich Seltenes — komm zu mir, bevor du irgendwen anders fragst. Ich finde es. Oder kenne jemanden, der's findet.\"",
      "npc_vandara_fafa_1": "Eine alte Drachenwandlerin sitzt zusammengesunken am Rand des Brunnens, in einen verstaubten grauen Umhang gehüllt. Schuppen wie geborstener Granit lugen unter dem Stoff hervor. Sie hebt nicht den Kopf, aber eine knochige Hand streckt sich dir entgegen. \"Ein paar Splitter für eine alte Erddrachin?\" Als du gibst, blickt sie endlich auf — graue Augen, scharf wie frisch geschliffene Klingen. \"Danke, Kind. Du bist neu. Diese Stadt hat Namen, weißt du? Nicht nur den, der oben am Tor steht. Komm wieder — ich erzähle dir einen.\"",
      "npc_vandara_fafa_2": "Fafa nimmt die Splitter, ohne hinzusehen. \"Vandara heißt 'Wandel'. Aber sie sagen dir nie, wer den Wandel will und wer ihn fürchtet.\" Sie deutet auf die Akademie hinter dir. \"König Archivaris, der alte Knochenhalter, will alles so behalten wie's war. König- Rektorin Novia will alles neu. Die beiden streiten sich seit Jahren vor dem Kaiserhof. Solange sie streiten, regiert in Wahrheit niemand. Das macht Vandara... interessant. Komm wieder.\"",
      "npc_vandara_fafa_3": "\"Du kommst immer wieder. Das ist selten.\" Fafa lächelt, und für einen Moment sieht sie nicht alt aus, sondern müde. \"Hör zu, Kind. Die Studenten in den oberen Hörsälen lernen, was die Mentoren beibringen dürfen. Was sie wirklich wissen wollen, lernen sie woanders. Unter der Stadt. Komm noch einmal wieder, und ich zeige dir, wo.\"",
      "npc_vandara_fafa_4": "Diesmal nimmt Fafa keine Splitter. Sie steht auf — und ist auf einmal größer, als du gedacht hast. \"Komm.\" Sie führt dich zu einem unscheinbaren Gully hinter dem Brunnen, schiebt das Eisen beiseite, als wäre es ein Vorhang. \"Die Katakomben. Die alten Tunnel aus der Zeit vor dem Unaussprechlichen. Hier unten findest du die, die dir wirklich helfen können — wenn du den Mut hast herunterzukommen.\" Sie blickt dich lange an. \"Geh nicht alleine hin, bis du jemanden kennst, dem du dort vertraust. Aber geh.\"",
      "npc_vandara_veyra_1": "Magistra Veyra empfängt dich in einem sonnenhellen Sprechzimmer — hohe Fenster, eine samtene Untersuchungsliege, Instrumente säuberlich auf einem Beistelltisch, daneben eine kleine Karaffe gekühltes Wasser. Sie ist eine Sonnen-Amphithere, Gold und sanftes Orange, ihre Federn werfen das Tageslicht über jede Fläche. \"Willkommen, {player}. Olié hat Sie geschickt, ja? Gut. Das hier ist kein Unterricht — das ist eine Sprechstunde. Sie konnten ihm kein Element nennen. Völlig in Ordnung.\" Sie weist auf die Liege. \"Wir finden es gemeinsam heraus. Die meisten Studenten wissen es schon von zuhause. Die paar, die nicht — sind oft die interessantesten.\"",
      "npc_vandara_veyra_2": "\"Zuerst die Anamnese.\" Veyra macht Notizen auf eine kleine Schiefertafel, ihr gefiederter Kamm aufmerksam geneigt. \"Erzählen Sie mir, was Sie zuhause gespürt haben. Irgendetwas, das an Ihnen gezogen hat — Wärme in den Händen, Schwere in der Brust, Trockenheit im Hals wenn Sie wütend waren, ein Geräusch, das sonst niemand gehört hat. Auch nichts ist eine Antwort.\" Sie hört geduldig zu. \"Magie ist an Ihr Element gebunden. Sie können nicht wechseln, nur finden. Manche erkennen es in einem einzigen Moment. Andere brauchen Übungen. Wir machen beides. Beim nächsten Mal beginnen wir mit den Resonanztests.\"",
      "npc_vandara_veyra_3": "\"Erster Resonanztest.\" Veyra zieht die Vorhänge halb zu, holt einen niedrigen Hocker heran und setzt sich neben die Liege. \"Hände entspannt im Schoß, Handflächen nach oben. Nicht drücken. Nicht greifen. Lassen Sie Ihren Äther von selbst zur Ruhe kommen.\" Ihre Feder schwebt über der Schiefertafel. Sie wartet — lang, länger als bequem ist. Dann, leise: \"Hm. Da ist etwas. Aber es liegt nicht sauber unter einer der Standard-Signaturen. Ich würde gerne nächste Sitzung eine ordentliche Batterie laufen lassen. Kommen Sie ausgeschlafen — auf einem ruhigen Körper läuft das glatter.\"",
      "npc_vandara_veyra_4": "\"Heute die Standard-Batterie.\" Veyra hat fünf Gegenstände auf einem kleinen Tablett neben der Liege ausgelegt — einen Stein, eine Schale Wasser, eine Kerze, eine Feder, einen Spiegel. \"Ein Material pro Element. Sie berühren jedes der Reihe nach. Ich beobachte, was Ihr Äther tut. Es gibt keine richtige Antwort und keine falsche — auch 'nichts passiert' ist ein sauberes Ergebnis.\" Sie hebt einen Finger. \"Eins nur: nicht drücken. Der Äther lügt nicht, wenn man ihn ehrlich lässt. Lassen Sie sich Zeit. Wann immer Sie bereit sind.\"",
      "npc_vandara_veyra_5": "\"Sie sind wiedergekommen. Gut. Bitte setzen Sie sich.\" Veyra hat die Vorhänge bereits ganz zugezogen — nur eine einzige kleine Kerze brennt auf dem Beistelltisch. \"Die Lichtreaktion in Ihrer Batterie — das war kein Nullergebnis. Es war auch keine saubere Licht-Signatur. Ich würde gerne einen kontrollierten Isolations-Test laufen lassen. Hände offen, nicht drücken, strecken Sie sich zur Kerze hin.\" Lange Stille. Dann ihre Stimme, plötzlich anders — nicht mehr der gemessene Ton der Diagnostikerin: \"Oh. Oh, {player}. Sie machen keinen Schatten. Sie ZIEHEN den Schatten an. Von der Wand. Von der Decke. Von mir.\" Ein atemloses Halblachen. \"Sie sind kein Lichtwandler. Sie sind ein Schattenwandler. In vierzig Jahren Diagnostik habe ich noch nie einen gesehen.\"",
      "npc_vandara_veyra_6": "Veyra ist deutlich nachdenklicher heute. \"Schatten ist eine Sub-Variante von Licht. So wie Traum eine Sub-Variante von Gezeiten ist. Aber sie ist selten. Sehr selten. In vierzig Jahren Diagnostik habe ich noch nie eine gesehen.\" Sie schaut Sie ernst an. \"Ich kann Ihnen die Theorie geben. Aber die Praxis — da bin ich nicht zuhause. Ich kann Ihnen nicht beibringen, was ich selbst nie gefühlt habe.\" Sie legt die Feder ab, zögert, dann leiser: \"Es gab vor langer Zeit eine Kollegin hier. Sariel. Brillant. Auf dem Papier element-agnostisch, bis dey das selbst widerlegt hat. Wir haben uns aus den Augen verloren, als dey die Akademie verließ — vor vierzig Jahren, ungefähr. Ich habe deren Namen lange nicht mehr gehört, und ich weiß nicht, ob dey noch lehrt. Aber wenn Ihnen jemand die Praxis des Schattens beibringen kann, dann Sariel.\" Sie sucht Ihren Blick. \"Seien Sie vorsichtig, {player}. 'Schatten' klingt romantisch. Nicht jeder in dieser Stadt sieht es so.\"",
      "npc_vandara_veyra_7": "Veyra hat das Sprechzimmer von jedem persönlichen Gegenstand geräumt — nur die samtene Liege, die kleine Kerze und ihre Schiefertafel sind übrig. \"Sie sind mit dem Pass gekommen. Gut. Die Praxis ist kurz.\" Sie deutet auf die Kerze. \"Binden Sie einen Schatten an sie. Halten Sie ihn. Reden Sie mit mir über etwas Unrelatedes, dreißig Sekunden lang. Lassen Sie den Schatten nicht fallen, lassen Sie das Gespräch nicht versanden. Die Prüfung geht nicht um Stärke — sie geht darum, zwei Dinge gleichzeitig zu tun, ohne dass eines das andere verschluckt.\" Sie beobachtet. Notiert. Beobachtet weiter. Dann ein kleines Lächeln, ganz Diagnostikerin und gar nicht Prüferin. \"Ja. Sauber gearbeitet. Vierzig Jahre und ein Erstes. Sie bestehen. Sagen Sie es Olié.\"",
      "vandara_trial_fire_dialog": "Du legst die Hand über die kleine Flamme. Wärme, klar — aber keine Resonanz. Veyra schüttelt den Kopf. \"Kein Feuer.\"",
      "vandara_trial_earth_dialog": "Der Stein liegt schwer in deiner Hand. Du wartest. Nichts. Veyra notiert sich etwas. \"Kein Erde.\"",
      "vandara_trial_wind_dialog": "Du hältst die Feder hoch. Sie schwebt einen Moment, fällt dann. Normal — kein magisches Heben. Veyra: \"Kein Wind.\"",
      "vandara_trial_tide_dialog": "Die Hand über der Wasserschale. Die Oberfläche kräuselt sich leicht — von deinem Atem, nicht von dir. Veyra: \"Kein Gezeiten.\"",
      "vandara_trial_light_dialog": "Du blickst in den kleinen Spiegel. Etwas zuckt. Nicht im Spiegel — IM Raum hinter dir. Veyra hebt scharf den Kopf. \"Da. Da war was. Aber kein klares Licht. Komm zurück, sobald du kannst — ich will das genauer untersuchen.\"",
      "npc_vandara_sariel_1": "Der Tunnel öffnet sich zu einer kleinen Kammer. Eine einzige Kerze brennt auf einem niedrigen Tisch. Die Person dahinter dreht sich nicht um — dey sortiert weiter Notizen auf dem Tisch mit den Fingerspitzen. \"Du bist viel zu groß für deine Schritte, {player}. Lauf leiser, wenn du in einem Tunnel bist. Sonst hörst du nicht, wenn jemand vor dir steht.\" Deren Schuppen — wenn man sie überhaupt so nennen kann, scharfe schwarze Kristalle entlang des Halses — klirren leise. Sariel hebt den Kopf, sieht in deine Richtung, aber nicht in deine Augen. \"Ah. Setz dich. Ich bin Sariel. Mach es dir bequem — die Kerze reicht für uns beide, ich brauche kein Licht.\"",
      "npc_vandara_sariel_2": "\"Du willst wissen, was Schatten ist.\" Sariel neigt den Kopf einen Hauch. \"Ich habe die Bindung gehört, als du runtergekommen bist. Billige Heftung, dünnes Papier, riecht nach der Archiv-Tinte der Akademie. Quinell benutzt immer noch denselben Drucker wie vor vierzig Jahren. Er hat dich hergeschickt, oder? Oder dafür gesorgt, dass du dich selbst herschickst.\" Ein kleines trockenes Geräusch, das fast, aber nicht ganz ein Lachen ist. \"Er hat dir sein Kapitel mitgegeben — Kapitel sechs, nehme ich an.\" \"Er hat zwei Jahre in meiner Klasse gesessen und alles mitgeschrieben, was ich gesagt habe. Das Kapitel ist seins. Ich habe in meinem ganzen Leben kein einziges Wort geschrieben — ich bin blind, schon länger, als ich je hinter einem Pult stand. Was du da hattest, war Quinells Mitschrift von mir, keine Abschrift von irgendwas Meinem. Es gab nichts abzuschreiben. Ob er es richtig getroffen hat, ist eine Sache zwischen ihm und seiner Ehrlichkeit.\" Dey pausiert. \"Die Kurzfassung ist kurz. Schatten ist Licht, das genug Tiefe hat, dass es einen Eigenwillen entwickelt. Ein Lichtwandler macht Helligkeit. Du machst Hohlräume. Die Hohlräume HÖREN dir zu. Verstanden? Nein? Gut — das war eine Lüge, weil ich's kurz machen wollte. Lies sein Kapitel trotzdem. Er hat's sauberer geschrieben, als ich's zweimal sagen würde.\"",
      "npc_vandara_sariel_3": "\"Steh in das Licht.\" Sariel deutet auf die Kerze. \"Jetzt streck die Hand aus. Nicht zur Kerze. Zum Schatten den du wirfst.\" Du zögerst. Sariel grinst, das erste Mal heute. \"Ja, das geht. Fühl, nicht denk. Schatten sind dichter als normales Licht — spürbar, wenn man weiß wo.\" Lange Stille. Dann: \"Ah. Da. Du hast ihn gegriffen. Spürst du das Gewicht? Sehr gut. So habe ich das auch gelernt, mit zwölf, von einer Wandlerin im Smaragd-Wald. Auch blind, wie ich jetzt. Sie hat damals gemeint, Augen seien nur ein Weg von vielen. Ich hab's erst geglaubt als ich es musste.\"",
      "npc_vandara_pamle_1": "Pamle ist ein kompakter Magma-Drachenwandler, in humanoider Form gerade so groß wie deine Schulter, mit Schuppen wie verkrusteter Lava über den Unterarmen. Sie steht vor einem improvisierten Tisch voller leerer Phiolen und zerstoßener Pflanzenreste. \"{player}, oder? Setz dich. Ich mach das schnell: ich bin Pamle, ich unterrichte Alchemie. Wir fangen mit zwei ganz simplen Rezepten an — Energietrank und Magietrank. Mehr als Kräuter, Wasser und ein bisschen Hitze brauchen die nicht.\" Sie tippt sich gegen die Schläfe. \"Geh nach Hause, bau dir die Werkstatt von Kal'res Bauplan, stell den Alchemietisch in dein Zimmer. Dann kannst du das brauen. Komm wieder wenn du drei Energietränke gemacht hast — DREI, nicht zwei, nicht 'fast drei'. Dann zeige ich dir was Besseres.\"",
      "npc_vandara_pamle_2": "Pamle wartet schon mit ausgestreckter Hand. \"Drei Energietränke, ja? Gut.\" Sie nimmt sie kommentarlos entgegen und stellt sie in ein Regal hinter sich. \"Ich verkaufe die übrigens an die Erstsemester für gutes Geld, falls du dich gefragt hast. Bildung ist nicht umsonst.\" Ein scharfes Grinsen. \"Jetzt zu Tier zwei: Wachpollen-Tee — Regeneration über Zeit. Und Funkenlicht-Phiole — die wirst du noch zu schätzen wissen, glaub mir. Sariel unten in den Katakomben hat sie früher kistenweise bestellt.\" Sie hustet, als hätte sie zu viel gesagt. \"Üb. Bring mir drei Funkenlicht-Phiolen wenn du soweit bist.\"",
      "npc_vandara_pamle_3": "\"Funkenlicht-Phiolen. Drei. Schön.\" Pamle wiegt sie in der Hand, prüft die Helligkeit. \"Sauber gearbeitet. Du verstehst die Dosierung.\" Sie räumt sie ins Regal. \"Letzte Runde. Arkanwasser ist Standard für jeden Studenten, der Magie betreibt. Und Aschebrand-Tinktur — die ist meine eigene Erfindung. Aus den Pollen einer Asche-Weide. Macht dich für zwei Minuten zur Holzfäll-Maschine. Du wirst nicht glauben, wie viele Aufträge die Akademie dafür von den Bauunternehmen bekommt.\" Sie nickt zur Tür. \"Komm einmal noch wieder. Dann hab ich dir alles beigebracht was ich grad anbieten kann.\"",
      "npc_vandara_pamle_4": "\"So.\" Pamle wischt sich die Hände an einer Schürze ab, die schon viel zu viel gesehen hat. \"Das war's mit den Grundlagen. Du beherrscht jetzt die sechs Basis-Rezepte. Was kommt, wird schwerer — Sternenfrüchte sind selten, Glut-Lotos noch seltener, und einige Rezepte verlangen Reagenzien die nur Gewitter-Seraphe einsammeln können. Aber bis dahin hast du noch was zu tun.\" Sie reicht dir die Hand. \"Geh und braue. Wenn ich je was Neues unterrichte, weißt du wo du mich findest. Ach — und Pamle ist nicht mein voller Name, ich hab nie einen bekommen. Spar dir die Frage.\"",
      "npc_vandara_pamle_5": "Pamle mustert dich vom Werktisch aus. \"Aha. Das hat sich rumgesprochen. Du bist die Schatten-Person.\" Sie wirkt nicht überrascht. \"Heißt, ich sollte vielleicht überlegen, welche Reagenzien für deine Sorte Sinn machen. Asche von erloschenen Kerzen, Spiegelscherben-Staub, sowas. Ich sag Bescheid wenn mir was einfällt.\" Ein scharfes Grinsen. \"Und erwarte keinen Rabatt. Seltenes Element heißt nicht pleite. Jetzt verzieh dich, ich muss der nächsten Gruppe Tier-drei beibringen.\"",
      "npc_vandara_sariel_4": "\"Du bist jetzt nicht ausgebildet. Du bist aufgewacht — das ist was anderes.\" Sariel sortiert wieder deren Notizen. \"Was du brauchst, lernst du jetzt von selbst. Komm wieder, wenn du etwas Komplizierteres versuchen willst. Beim nächsten Mal bring mir eine Schale Wasser mit — zeig ich dir, wie du einen Schatten holen lässt, der sie hält, während du andere Sachen machst. Das ist eigentlich der praktische Teil.\" Dey lacht trocken. \"Vierzig Jahre Lehrkraft und ich verspreche immer noch das Spannende für die nächste Stunde.\"",
      "npc_vandara_sariel_5": "\"Du hast die Schale mitgebracht. Gut. Stell sie ab — dort, auf den Boden zwischen uns.\" Sariel bewegt sich nicht vom Stuhl, aber die Kerzenflamme flackert einmal. \"So. Der Trick, den ich dir versprochen habe. Schatten sind nicht umsonst. Sie sind du, ein Teil von dir, den du in die Welt schiebst. Einen zu binden kostet deine eigene Magie, fortlaufend, solange du ihn draußen hältst.\" Eine lange, langsame Pause. \"Wähl eine Aufgabe. Irgendetwas, das du mit den Händen machst — Hacken, Brauen, Wasser schöpfen. Schau auf deinen Schatten. Dann bitte ihn, die Aufgabe statt deiner zu machen. Nicht laut. Mit dem gleichen wortlosen Druck, mit dem du letztens den Schatten von der Wand gegriffen hast.\" Du versuchst es. Der Schatten zu deinen Füßen wird länger — und dann hebt er die Schale. Hält sie. Ruhig. Sariel lächelt schwach. \"Ja. Genau das. Jetzt kannst du etwas anderes tun, während der Schatten weitermacht. Magie läuft die ganze Zeit ab, vergiss das nicht. Wenn sie zur Neige geht, lässt der Schatten los.\" Noch eine Pause. \"Einen Schatten. Eine Aufgabe. Mehr kann ich dir nicht beibringen. Aufmerksamkeit weiter zu spalten als das ist die Arbeit der nächsten vierzig Jahre, nicht der nächsten Stunde.\" Dey lehnt sich zurück. \"Geh. Mach zwei Dinge gleichzeitig. Das ist das Nächste, was die meisten von uns je dem Freisein kommen.\"",
      "npc_vandara_ormias_1": "Lektor Ormias ist alt. Sehr alt. Sein Drachenform-Schädel schimmert beim Reden in der Sonne — Magma-Lindwurm-Linie, Schuppen wie erstarrte Lava. Er trägt zerknitterte Roben und eine Brille, die ihm wirklich nicht passt. \"Setz dich, Studierende. Drachenkunde, Grundkurs. Sieben Hauptarten kennen wir: Großdrachen, Wyvern, Lindwürmer, Amphithere, Leviathane, Seraphe, Fae. Dazu noch die kaiserlichen Lung-Drachen — eine Ausnahme, die nehmen wir uns zuletzt vor.\" Er hustet. \"Eine pro Sitzung. Keine Abkürzungen. Und merk dir das absolut Wichtigste über sie alle: sie haben alle Flügel.\" Eine Pause. \"Ja. Alle.\"",
      "npc_vandara_ormias_2": "\"Großdrachen. Die Hüter der Reiche. Das Brot-und-Butter-Volk aus dem Kristallreich im Westen.\" Ormias skizziert eine vierbeinige Silhouette an die Tafel — die Kreide bricht. \"Kräftiger Körperbau, vier Beine, ein Paar breite Lederschwingen, oft eine gepanzerte Schwanzspitze und große Hörner. Die häufigste Art mit Abstand. Viele Spätzünder — Flügel kommen manchmal erst mit zwanzig oder dreißig.\" Er schaut dich über seine Brille an. \"Statistisch bist du höchstwahrscheinlich einer von diesen. Geduld. Sie kommen.\"",
      "npc_vandara_ormias_3": "\"Wyvern. Die Jäger der Lüfte.\" Wieder eine Skizze — die Kreide bricht erneut. \"Nur zwei Hinterbeine. Die Vorderbeine sind in der Evolution mit den Flügeln verschmolzen. Schnelle, muskulöse Flieger, meist mit einem Giftstachel oder einer schweren Keule am Schwanzende. Die Sturm-Wyvern haben Flügelkanten so scharf, dass sie den Wind wie Klingen schneiden.\" Er schiebt seine Brille hoch. Sie rutscht sofort wieder runter. \"Häufig im westlichen Tiefland. Du wüsstest, wenn du einer wärst — die fliegen jung.\"",
      "npc_vandara_ormias_4": "\"Lindwürmer. Die Erdgebundenen.\" Zum ersten Mal heute lächelt Ormias kurz. \"Meinesgleichen. Massiver Körper, nur zwei Vorderbeine, die hintere Hälfte ist eine lange Schlange, die wir hinter uns herziehen. Flügel haben wir auch, aber schwerfällig — in der Luft sind wir nicht graziös. Wir graben, wir klettern, wir sind langsam und stur. Zwei Hauptlinien: Magma-Lindwürmer, Schuppen wie glühende Lava, leben nahe dem Lavameer. Und Sumpf-Lindwürmer, Schuppen wie Algen und Rinde, getarnt im Urwald von Smaragd.\" Er hustet. \"Von Fremden manchmal zu westlichen Drachen geworfen. Wir sind östlich. Bring das nicht durcheinander.\"",
      "npc_vandara_ormias_5": "\"Amphithere. Die gefiederten Schlangen.\" Ormias gestikuliert breit mit beiden Armen. \"Keine Gliedmaßen. Nur ein langer Schlangenkörper und ein einziges Paar gewaltiger, prächtiger Federschwingen — die übrigens magische Energie speichern können. Selten. Schön — das gebe sogar ich zu. Zwei bekannte Sub-Arten: Traum-Amphithere, deren Flügelschläge Illusionsnebel erzeugen. Und Sonnen-Amphithere, goldene Federn, die bei Bedrohung in eine blendende Licht-Explosion entladen können.\" Er hebt eine Augenbraue. \"Magistra Veyra ist eine. Sag ihr nicht, dass ich gesagt habe, sie sei schön.\"",
      "npc_vandara_ormias_6": "\"Leviathane. Die Herrscher der Extreme.\" Ormias' Stimme wird tiefer — Respekt, kein Stolz. \"Sie leben dort, wo sonst niemand kann. Gezeiten-Leviathane beherrschen die schwebenden Wasserinseln und Wasserwege; sehnige Schwingen, die unter Wasser als Flossen dienen, feine Kiemenschlitze, absolute Herrscher der Strömungen. Magma-Leviathane auf den untersten, heißesten Inseln über dem Lavameer; massive gepanzerte Flügel, obsidianbeschichtete Schuppen, Lungen die superheiße Gase filtern. Einmal im Jahr treffen sie sich an den Lavafällen und handeln.\" Eine kurze Pause. \"Die angesehensten Handwerker im Reich.\"",
      "npc_vandara_ormias_7": "\"Seraph-Drachen. Die Himmelsstürmer.\" Ormias' Tonfall wird trocken. \"Schlank, aerodynamisch, vier bis sechs schmale Flügel übereinander gestapelt. Sie leben dort, wo die Luft so dünn ist, dass ein Großdrache das Bewusstsein verlieren würde, und lachen über unsere Stürme, weil das, was wir Hurrikan nennen, ihre Morgenbrise ist.\" Er winkt ab. \"Erwarte nicht, einen zu sehen — sie kommen fast nie runter. Wenn doch, sei höflich.\"",
      "npc_vandara_ormias_8": "\"Fae-Drachen. Die Smaragd-Weber.\" Ormias' Mund zuckt — fast Zuneigung. \"Die Kleinsten. Libellenflügel, Chamäleon-Tarnung, ursprünglich aus dem tiefen Urwald von Smaragd. Heute zwei Kulturen: die wilden Wald-Fae, die noch immer in der Rinde verschwinden, und die Stadt-Fae, die sich an das urbane Leben angepasst haben und prächtige, knallbunte Schuppen tragen, weil sie in der Stadt nichts mehr fürchten müssen.\" Er lächelt fast. \"Wenn du jemals einen in einer Taverne triffst, gib ihm einen Drink aus. Bester Klatsch in Draconia.\"",
      "npc_vandara_ormias_9": "\"Und zum Schluss — die Lung-Drachen. Die Himmelsläufer.\" Ormias klopft demonstrativ auf seinen Schreibtisch. \"Schlangenartig, flügellos, vier Beine mit scharfen Klauen, charakteristische Bartfäden am Kopf. Sie fliegen rein durch Magie — keine Flügel. Die einzige Ausnahme zu meiner Eröffnungsregel.\" Seine Brille rutscht und er fängt sie diesmal nicht auf. \"Und bevor du fragst: ja, ich habe gesehen, dass du keine Flügel hast. Komm nicht auf Ideen. Lung-Drachen sind ein absoluter genetischer Sonderfall — sie kommen ausschließlich in der kaiserlichen Blutlinie vor, und selbst dort existieren aktuell nur zwei. Kaiser Ignis Aurum und Prinz Ryuga. Das ist die Liste.\" Er räuspert sich. \"Du bist höchstwahrscheinlich ein Spätzünder-Großdrache. In achtzig Prozent der Fälle. Geduld.\"",
      "npc_vandara_ormias_10": "\"Aha.\" Ormias rückt seine Brille zurecht, die sofort wieder rutscht. \"Ich hab's gehört. Gerüchte laufen schnell durch die Akademie-Korridore, vor allem wenn's um das Unmögliche geht.\" Er hustet. \"Erlaub mir einen Moment professionelle Verlegenheit. Ich hab dir mit einiger Sicherheit gesagt, du seist höchstwahrscheinlich ein Spätzünder-Großdrache. Anscheinend lag ich daneben — wobei, in aller Fairness, auch nicht ganz daneben. Schatten ist eine Sub-Variante des Lichts. Lichtwandler sind Großdrachen. Also technisch, statistisch, halten die achtzig Prozent immer noch. Knapp.\" Er gestikuliert vage. \"Ich würde Kapitel Zwei meines Buches sehr gerne aktualisieren. Komm gelegentlich wieder vorbei — ich werde neue Fragen haben, und die Fragen sind meistens interessanter als die Antworten.\"",
      "npc_vandara_ormias_11": "Ormias hat seinen üblichen Chaos vom Schreibtisch geräumt und ein einzelnes Blatt Papier hingelegt, auf dem genau ein Wort steht: PROCEED. Er schaut dich von der Seite an. \"Also gut. Mündliche Prüfung. Ich sage die Frage, du sprichst die Antwort. Keine Notizen. Versuch, mich nicht anzuhusten.\" Er räuspert sich, als wolle er es demonstrieren. \"Nenne die sieben Hauptarten der Drachenwandler, in beliebiger Reihenfolge, mit je einem unterscheidenden Merkmal.\" Lange Stille, während du rezitierst. Er nickt durch jede. \"Gut, gut, gut.\" Dann: \"Und die achte.\" Eine Pause. \"Ja, die achte. Wir beide wissen, dass es eine gibt. Nenn sie, und das eine Merkmal, das sie von allen anderen unterscheidet.\" Eine weitere Pause, während du antwortest. Seine Brille rutscht und er fängt sie auch diesmal nicht auf. \"Lung-Drachen. Flügellos. Genau.\" Er lächelt kurz. \"Du bestehst. Sag's Olié. Und komm später wieder für ein längeres Gespräch. Ich habe einige Fragen aktualisiert.\"",
      "npc_vandara_quinell_1": "Doktor Quinell ist Kristalldrachenwandler — Schuppen wie geschliffener Bergkristall, die das Hörsaallicht in alle Spektrum-Farben brechen. Er steht hinter einem Stehpult, ohne jede Bewegung. \"Willkommen. Arkane Grundlagen ist die langweiligste Vorlesung, die Sie an dieser Akademie hören werden. Und die wichtigste. Wenn Sie nicht verstehen, was Magie IST, werden Sie sie niemals präzise anwenden. Sie werden zaubern wie ein Hund schwimmt — funktional, hässlich, ineffizient. Sieben Sitzungen: die Definition, vier Gesetze, und die Ausnahmen, die sie rahmen. Keine Abkürzungen. Wir beginnen mit der Definition.\"",
      "npc_vandara_quinell_2": "\"Definition.\" Quinell bewegt sich beim Sprechen nicht. \"Magie ist die Manipulation des Äthers durch einen drachischen Geist. Beachten Sie: der Äther — nicht 'Energie', nicht 'Kraft'. Beachten Sie: drachischer Geist — nicht drachischer Körper. Der Körper ist ein Werkzeug, der Geist ist der Zauberer.\" Er pausiert zwei Sekunden. \"Wenn Sie aus diesem gesamten Kurs nur zwei Wörter behalten, dann diese: Äther. Geist. Alles andere folgt daraus.\"",
      "npc_vandara_quinell_3": "\"Erstes Gesetz. Das Drei-Komponenten-Gesetz.\" Quinell zeichnet drei Kreise an die Tafel, perfekt symmetrisch. \"Jede Handlung von Magie braucht drei Elemente gleichzeitig. Element — Ihre angeborene Ausrichtung, das eine Element, das Ihre Blutlinie Ihnen gibt. Wille — der geübte Fokus Ihres drachischen Geistes. Substrat — das physische Material, durch das die Wirkung manifestiert. Die eigene Form, ein Werkzeug, die Luft selbst.\" Sein Tonfall wird schärfer. \"Drei. Immer drei. Wer sie nicht im Kopf trennen kann, scheitert an jedem höheren Kurs dieser Akademie.\"",
      "npc_vandara_quinell_4": "\"Zweites Gesetz. Das Gesetz der Element-Bindung.\" Quinells Tonfall wird nicht wärmer. \"Sie können Ihr Element nicht 'wählen'. Sie können nicht 'wechseln'. Was Ihnen Ihre Blutlinie bei der Geburt gegeben hat, ist, was Sie für den Rest Ihres Lebens zaubern werden. Ein Feuerwandler, der versucht Wasser zu bändigen, produziert nichts — kein schwaches Wasser, gar kein Wasser.\" Er schaut an dir vorbei, nicht in dich hinein. \"Gelegentlich kommen Studierende mit der Überzeugung an, sie könnten sich ein zweites Element antrainieren. Können sie nicht. Geben Sie sich diese Illusion jetzt auf.\"",
      "npc_vandara_quinell_5": "\"Drittes Gesetz. Das Erhaltungsgesetz.\" Quinell hebt einen schweren Quarzstab neben dem Stehpult an, hält ihn, legt ihn wieder ab. \"Magie kommt nicht aus dem Nichts. Was Sie in die Welt schicken, kommt aus Ihnen. Persönliche Energie raus, magischer Effekt rein — eins zu eins, keine Ausnahmen in der Buchhaltung. Der Äther ist ein Medium, keine Quelle.\" Er pausiert. \"Wer Ihnen 'freie Magie' verspricht, verkauft Ihnen Betrug oder einen Salon-Trick. Wahrscheinlich beides.\"",
      "npc_vandara_quinell_6": "\"Viertes Gesetz. Das Erschöpfungs-Gesetz.\" Quinell lässt zum ersten Mal einen kleinen Ausdruck über sein Gesicht ziehen — fast Zustimmung. \"Das ist das Gesetz, das Studierende am häufigsten missverstehen. Erschöpfung ist kein Versagen. Erschöpfung ist das Maß Ihrer Wirkung. Müde heißt: die Magie ist geschehen. Nicht müde heißt: sie ist nicht geschehen.\" Er ebnet seinen Ton wieder ein. \"Wer ohne Erschöpfung zaubert, hat nichts getan. Wer sich beim Zaubern einer Teetasse erschöpft, hat eine echte Teetasse gezaubert. Wenden Sie beide Hälften dieses Gesetzes an, und Sie zaubern bereits besser als drei Viertel der Studierenden in diesem Saal.\"",
      "npc_vandara_quinell_7": "\"Letzte Sitzung. Ausnahmen.\" Quinell legt ein dünnes Heft auf das Stehpult, schiebt es aber nicht zu dir. \"Vier Gesetze. Sie sind korrekt. Sie sind auch nur einen Ausnahmefall davon entfernt, falsch zu sein — sehr wenige, sehr selten, in achtzig Prozent der Fälle gelten die Gesetze restlos. Die restlichen zwanzig Prozent sind das, woraus Doktorarbeiten gemacht werden.\" Zum ersten Mal pausiert er merklich. \"Es gab hier einmal eine Lehrkraft. Sariel. Element-agnostisch laut Akten, bis dey das selbst widerlegt hat. Kapitel sechs dieses Skripts ist meines — ich habe es aus deren Vorlesungen mitgeschrieben. Dey ist blind, schon länger, als ich dey kenne; das Schreiben war immer mein Teil der Abmachung. Dey las vor, ich notierte. Das Kapitel ist die einzige Abhandlung, die ich über Schatten als Sub-Variante des Lichts kenne. Niemand hat je einen dokumentierten Schatten-Wandler kennengelernt, der bereit war, sich untersuchen zu lassen. Dey verließ die Akademie vor vierzig Jahren. Ob dey noch lebt, weiß ich nicht.\" Ein kleiner Atemzug, dann nichts. \"Lesen Sie das Kapitel. Wenn Sie je Belege für einen aktuellen Schatten-Wandler finden, schreiben Sie die Arbeit. Widmen Sie sie angemessen.\"",
      "npc_vandara_quinell_8": "Quinell bewegt sich nicht, als Sie eintreten — aber der Winkel seines Kopfes verschiebt sich, ganz leicht. \"Ich habe gehört.\" Eine Pause. \"Sariel hatte also Recht. Die Akten waren falsch; das Vorlesungs-Kapitel war richtig. Ich werde es im Archiv vermerken.\" Eine weitere, längere Pause. \"Wenn Sie jemals — wenn Sie wieder zu dey hinunter gehen — sagen Sie Sariel, dass das Kapitel immer noch funktioniert. Vierzig Jahre später bestehen die Studierenden es immer noch. Dey erinnert sich vielleicht nicht an mich, aber ich habe mich an dey erinnert.\" Seine Stimme verändert die Tonhöhe nicht, aber etwas im Raum tut es. \"Das ist alles. Gehen Sie. Studieren Sie. Wenden Sie die Gesetze an. Sie werden jedes einzelne brauchen.\"",
      "npc_vandara_quinell_9": "Quinell bewegt sich nicht, als Sie eintreten. Auf dem Stehpult wartet ein einzelnes Blatt Papier mit vier vorgedruckten Zeilen. \"Setzen Sie sich. Schreiben Sie. Nennen Sie jedes der vier Gesetze beim Namen plus einen Satz mit Substanz. Sie können sich angemessen Zeit lassen. Benutzen Sie den Stift, nicht den Finger.\" Lange Stille. Sie schreiben. Er wartet bewegungslos. Als Sie den Stift ablegen, liest er das Blatt ausdruckslos, faltet es einmal und lässt es in ein Fach mit der Aufschrift BESTANDEN fallen. \"Zufriedenstellend. Kehren Sie zu Olié zurück.\" Eine Pause, die für ihn als warm zählt. \"Wenden Sie sie ehrlich an. Die Gesetze interessieren sich nicht, ob Sie sich an sie erinnern. Nur, ob Sie sie respektieren.\"",
      "npc_vandara_gate_guard_admit": "Der Torwächter, ein massiver Erddrachenwandler mit Schuppen wie geschliffenem Stein, betrachtet dich gemessen, als du den Brief hervorholst. Sein Blick gleitet über das roségoldene Siegel, dann nickt er knapp. \"Erstes Mal in Vandara, ja? Akademie-Einladungen sehen wir alle paar Wochen. Du wirst dich noch wundern, wie groß diese Stadt unter der Oberfläche ist.\" Mit einer Handbewegung öffnet sich das große Tor hinter ihm. \"Willkommen, {player}. Geh ruhig — die Mentoren werden dir den Rest erklären.\"",
      "npc_vandara_gate_guard_respect": "Der Wächter erkennt dich, noch bevor du das Tor erreichst. Er richtet sich auf, die Hand kurz an der Brust — keine förmliche Geste, sondern eine, die Erddrachenwandler nutzen, wenn sie jemanden meinen. \"Du hast die Stadt unter der Stadt gesehen. Das ändert einen.\" Er lächelt knapp. \"Die meisten kommen mit dem Brief, gehen mit dem Brief, sehen nur die Hälfte. Du gehörst jetzt zu denen, die beide Hälften kennen. Pass auf dich auf, {player}.\"",
      "npc_vandara_korren_1": "Korren blickt von einem niedrigen Werktisch auf, vollgehäuft mit zerbrochenen Tonscherben und alten Metallfragmenten. Seine Haut hat den rostbraunen Ton alter Erde an Hals und Händen, wo die Schuppen durchscheinen, und seine Flügel — wenn er sich auf dem Hocker dreht — entfalten sich tiefrot hinter ihm. \"Du bist runtergekommen. Gut. Nachrichten reisen, sogar bis hier.\" Er deutet auf den Werktisch. \"Ich bin Korren. Ich — naja. Ich arbeite für König Archivaris. Nicht offiziell, verstehst du. Offiziell bin ich Studierender im dritten Jahr, der 'mit Drachenkunde zurückgefallen' ist. Inoffiziell bin ich hier unten, um etwas zu beweisen.\" Er hebt einen korrodierten Ring auf. \"Echo-Beschwörung. Alte Gegenstände erinnern sich. Ich wecke sie gerade genug, um zu flüstern. Die Akademie hält das für Nekromantie. Ist es nicht — keine Seele, nur Resonanz. Aber die Akademie kümmert sich nicht um Feinheiten, wenn sie die Mathematik nicht sieht.\" Er hält dir den Ring hin. \"Hilf mir. Ich brauche einen Faden deiner Magie, um das Echo zu verankern. Fünf Fäden, mehr nicht. Der Ring wird mir verraten, wie der Schmied gestorben ist, der ihn gemacht hat. Kleine Sache. Ein Beweis.\"",
      "npc_vandara_korren_2": "Korren ist energisch — läuft auf und ab, Schuppen dunkler, lebendiger. \"Ich hab gehört, Iska hat es geschafft. Die Wyvern mit dem Puppentrick. Hat einen Teelöffel zehn Sekunden lang stehen lassen.\" Ein bitteres Grinsen. \"Niedlich. Animation ist das Einfache. Jeder kann Materie anstupsen, damit sie zuckt. Was ich mache, ist schwerer — ich reiche durch die Zeit. Aber der Korridor hat über Iska geredet, nicht über mich, und das heißt, mein König verliert das heutige Argument.\" Er schiebt den Ring zurück auf einen Haufen. \"Wir gehen größer. Ich habe eine Münze, Militär-Ausgabe, aus dem Krieg vor vierzig Jahren. Sie hat einen Mann sterben sehen. Wenn ich sie dazu bringe, mir zu sagen WIE, kann die Akademie den Echo-Trick nicht mehr Salon-Magie nennen. Zehn Fäden. Jetzt.\"",
      "npc_vandara_korren_3": "Korren hat kaum geschlafen. Der Werktisch ist mit Gegenständen übersät. \"Iska animiert eine Leichen-Puppe. Eine KLEINE, aber trotzdem. Die ganze Stadt wird das bis Ende der Woche wissen, und wenn Archivaris bis dahin keine Antwort hat, gewinnt Novias Fraktion diese Runde am Hof. Also wecken wir jetzt eine echte Erinnerung.\" Er hält etwas in Stoff Gewickeltes hoch. \"Eine Scherbe aus dem kaiserlichen Archiv. Frag nicht, wie ich sie bekommen habe. Sie hat — egal was sie gesehen hat. Zwanzig Fäden Magie, und wir werden wissen, ob die offiziellen Akten die tatsächlichen Akten sind.\" Die Scherbe summt, als du sie berührst. Die Kerzenflamme erlischt für eine ganze Sekunde. Korren lacht — zu dünn. \"Es hat funktioniert. Oh, es hat funktioniert. Wart ab, bis ich das aufschreibe. Wart ab, bis—\" Er bricht mitten im Satz ab, starrt ins Nichts.",
      "npc_vandara_iska_1": "Eine Wyvern in humanoider Form steht an einer Werkbank, umgeben von Krimskrams — ein Löffel, eine Drahtschlinge, eine Schachfigur. Ihre Haare sind dunkel, stehen schief ab, und ihre Patchwork-Robe ist ein wildes Farbgewitter. Ihre Flügel klappen tiefrot hinter ihr aus — dieselbe Form wie Korrens den Gang runter. \"Hi, hi, setz dich, mach den Kreis nicht kaputt.\" Sie blickt nicht auf. \"Iska. Wind-Linie. Ich sollte eigentlich nicht hier sein, ich sollte bei Pamles Tier-drei-Vorlesung sein, aber Pamle unterrichtet BRAUEN und ich will Sachen BEWEGEN.\" Sie deutet auf den Löffel. \"Pass auf. Fünf Fäden Magie von dir, mehr brauch ich nicht. Der Löffel steht auf. Vielleicht. Beim letzten Mal ist er aufgestanden und hat mich gestochen, also. Geh in Deckung.\" Sie grinst. \"König Novia würde das lieben. Die Alten sagen, Materie ist träge. Materie ist nicht träge. Materie ist nur schüchtern.\"",
      "npc_vandara_iska_2": "Iska grinst breiter als zuvor, gestikuliert mit beiden Händen gleichzeitig. \"Korren hat das Ring-Ding gemacht. Hat ihn flüstern lassen. Flüstern. Jeder kann flüstern. Ich will BEWEGEN.\" Sie deutet auf ein Uhrwerks-Gestell auf ihrem Werktisch. \"Ich verdrahte Runen ins Uhrwerk. Nicht nur zucken — laufen. Drei Schritte. Der Hof wird Korren aus dem Raum lachen, wenn sie das sehen. Zehn Fäden, bitte, schnell, ich hab die Geometrie im Kopf und verliere sie, wenn du mich warten lässt.\"",
      "npc_vandara_iska_3": "Iska sieht zerrüttet aus. Beide Augen gerötet. Auf dem Werktisch liegt etwas Kleines unter einem Tuch. \"Korren geht ins kaiserliche Archiv. Wusstest du das? Ich weiß es. Die Wände hier unten hören mit.\" Sie deckt das Tuch ab. Eine kleine Puppen-Figur aus Holz, Draht, und etwas, das verdächtig nach einem Fingerknochen aussieht. \"Frag nicht. Geliehen. Aus einem alten Grab. Das Grab ist seit hundert Jahren niemandem mehr wichtig. Zwanzig Fäden, und ich lasse sie einen Kreis laufen. Wenn ich das schaffe, gehören die Hörsäle für ein Jahrzehnt Novias Fraktion.\" Die Figur regt sich, als du die Magie kanalisierst. Steht auf. Macht einen Schritt, dann noch einen, dann einen dritten, dann — sie dreht den winzigen Kopf zu dir. Iska lacht, ekstatisch. \"JA. Das. Hast du das gesehen? Sie hat geschaut. Sie hat GESCHAUT—\"",
      "npc_vandara_daven_1": "Ein hochgewachsener Großdrachen-Wandler tritt in die kerzenbeleuchtete Kammer. Deren Schuppen sind schiefergrau, deren Mantel tiefrot mit einem einzigen Faden Akademie-Gold am Kragen. Dey schaut Sie an, nicht die Werktische. \"Sie. Studierende. Mir wurde berichtet, dass Sie hier unten zu Besuch waren. Ich bin Marschall Daven, Vollstreckung des Rats von Vandara.\" Ein knappes Nicken. \"Ich verhafte Sie nicht — noch nicht. Ich frage, weil Sie die beiden gesehen haben. Korren der Echo-Beschwörer und Iska die Animatorin. Was haben die vor? Sprechen Sie offen. Der Rat hat Beschwerden von den Agenten beider Könige bekommen, was selten genug ist, um eigene Beweisqualität zu haben. Sagen Sie mir, was Sie wissen. Über Ihre eigene Rolle reden wir danach.\"",
      "npc_vandara_daven_2": "Daven hört zu, macht Notizen auf einer kleinen Schiefertafel. \"Ein Echo aus einer kaiserlichen Archiv-Scherbe. Eine animierte Figur aus grabgeraubtem Knochen. Beide an Ihrer eigenen Magie verankert.\" Dey seufzt einmal, kurz. \"Das ist das Muster, das ich alle fünfzehn, zwanzig Jahre sehe. Zwei Studierende, jeder für einen König. Sie fangen klein an, sie überbieten sich gegenseitig, und irgendwann geht jemand ans kaiserliche Archiv oder an ein Grab. Sie haben das nicht angefangen. Sie haben allerdings den magischen Faden geliefert, der beide über die Linie geschoben hat.\" Dey sieht Sie zum ersten Mal direkt an. \"Ich schätze Ihre Kooperation. Eine letzte Frage. Zeigen Sie mir, wo die zwei arbeiten. Genau wo. Der Rat bevorzugt eine saubere Festnahme.\"",
      "npc_vandara_daven_3": "Sie führen Daven zu Korrens Werktisch, dann zu Iskas. Dey nickt einmal bei jedem. Zwei weitere Wachen treten hinter dey ein — ruhig, professionell. Es wird nicht geschrien; beide Studierende scheinen auf ihre eigene Art gewartet zu haben. Korren richtet sich auf, sieht Sie nicht an. Iska schaut Sie an und grinst, zwinkert, und lässt sich abführen. \"Danke für den Boost, Kind! Sag Pamle, mir tut die Brau-Stunde leid!\" Daven kommt allein zu Ihnen zurück. \"Erledigt. Der Rat wird sie in einem Monat anhören. Wahrscheinlich für zwei Jahre suspendiert, wahrscheinlich danach wieder an der Akademie, mit je einem anderen Mentor. Kein Gefängnis. Sie sind Kinder.\" Eine Pause. \"Sie. Ihre Rolle wird in der Akte als 'kooperierende Zeug:in' vermerkt. Das ist großzügiger als 'Mittäter:in', was es ebenso gut sein könnte. Gehen Sie vorsichtig, Studierende. Glauben Sie nicht alles, was Ihnen die Agenten eines Vassals erzählen.\" Dey wendet sich zum Gehen. \"Und wenn das nächste Mal jemand in den Katakomben Sie nach Magie fragt — sagen Sie nein. Einmal. Sagen Sie nein.\""
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
      "knowledge": "Wissen",
      "ash_flower": "Ascheblume",
      "glitter_dust": "Glitzerstaub"
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
      "nav_housing": "Zuhause",
      "cat_gather": "Sammeln",
      "cat_work": "Arbeit",
      "cat_crafting": "Handwerk",
      "cat_upgrades": "Besitztümer & Artefakte",
      "cat_furniture": "Möbel",
      "cat_locations": "Orte & Reise",
      "cat_village": "Das Dorf",
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
      "ui_shadow_bind": "Schatten-Bindung",
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
      "ui_shadow_released": "Schatten gelöst (Bedingungen nicht mehr erfüllt).",
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
      "ui_switch_home": "Zuhause wechseln",
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
      "help_vitality_desc": "Energie und Magie sind dein Treibstoff. Sättigung beeinflusst alle Erträge — wenn du satt bist, arbeitest du effizienter, wenn du hungerst, verlieren manche Aktionen ihre Wirkung.",
      "help_library_desc": "Studiere deine gesammelten Bücher, um mehr über die Welt zu erfahren.",
      "help_magic_desc": "Erforsche die arkanen Energien deiner Seelenform.",
      "settings_tab_general": "Generell",
      "settings_name": "Name des Wandlers",
      "settings_tab_controls": "Steuerung",
      "controls_intro": "Du kannst das Spiel komplett mit der Tastatur bedienen.",
      "controls_primary": "Hauptaktionen (Ausruhen, Meditieren, Beeren essen)",
      "controls_tabs_number": "Direkt zum jeweiligen Tab springen",
      "controls_tabs_arrow": "Tab vor / zurück (mit Wrap-around)",
      "controls_enter": "Bestätigen — z. B. Dialog weiterklicken oder Modal schließen",
      "controls_esc": "Einstellungen öffnen / schließen, Prolog überspringen",
      "controls_tab_nav": "Zwischen Buttons innerhalb einer Ansicht wechseln",
      "controls_laptop_note": "Hinweis: Auf manchen Laptops müssen F-Tasten zusammen mit der Fn-Taste gedrückt werden.",
      "sidebar_help_title": "Tastatur",
      "sidebar_help_desc": "Tabs wechseln: Zifferntasten 1-6 oder Pfeil hoch / runter. Hauptaktionen oben: F1 Ausruhen, F2 Meditieren, F3 Beeren essen. Volle Übersicht in den Einstellungen unter Steuerung.",
      "settings_tab_audio": "Audio & Klang",
      "settings_tab_addons": "Addons",
      "settings_addons_intro": "Diese Addons sind gerade aktiv. \"Build\" heißt direkt ins Spiel einkompiliert; \"Runtime\" heißt aus dem `addons/`-Ordner neben der .exe geladen — kannst du löschen/umbenennen ohne neu zu builden.",
      "settings_addons_source_build": "Build",
      "settings_addons_source_runtime": "Runtime",
      "settings_addons_by": "von",
      "settings_addons_required_tooltip": "Dieses Addon ist erforderlich — ohne es ist kein Spiel mehr da.",
      "settings_addons_restart_required": "Wird beim Neustart angewendet.",
      "settings_addons_reenable_all": "Alle wieder einschalten",
      "settings_addons_open_folder": "Addons-Ordner öffnen",
      "settings_addons_note": "Spielstände merken sich, welche Addons aktiv waren. Beim Laden warnt das Spiel wenn jetzt was fehlt oder die Version anders ist.",
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
      "ui_teacher_label": "Lehrkraft",
      "ui_titles": "Titel",
      "ui_none": "Keiner",
      "title_unlocked": "Titel freigeschaltet: {title}",
      "title_set": "Aktiver Titel: {title}",
      "particle_meditation": "Innere Ruhe...",
      "particle_blessing": "Segen!",
      "ui_duration": "Laufzeit",
      "ui_remaining_prefix": "Noch",
      "ui_seconds": "Sekunden",
      "ui_shadow_bind_toggle": "Schatten an diese Aktion binden",
      "nav_inventory": "Inventar und Ressourcen",
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
      "chapter_collection": "Chroniken",
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
      "shadow_bind_cost_title": "Schatten-Bindungs-Kosten",
      "shadow_bind_cost_desc": "Verringert den Magie-Verbrauch eines gebundenen Schattens.",
      "location_village_name": "Dorf",
      "main_subtab_general_name": "Allgemein",
      "main_subtab_herstellen_name": "Herstellen",
      "ui_placed_suffix": "(platziert)",
      "location_luxana_name": "Luxana",
      "chapter_luxana": "Luxana",
      "ui_luxana-exp-vault": "Caldwens Tresor",
      "ui_luxana-exp-cradle": "Mirelles Wiege",
      "ui_luxana-exp-stage": "Aurels Soirée",
      "ui_luxana-exp-bloom": "Sylvaines Mondblume",
      "ui_luxana-archive-revealed": "Brannocs Fund",
      "ui_luxana-captain-confronted": "Veyls Forderung",
      "npc_luxana_elian_name": "Meister Elian",
      "npc_luxana_caldwen_name": "Lord Caldwen",
      "npc_luxana_mirelle_name": "Lady Mirelle",
      "npc_luxana_aurel_name": "Vicomte Aurel",
      "npc_luxana_sylvaine_name": "Dame Sylvaine",
      "npc_luxana_brannoc_name": "Brannoc der Archivar",
      "npc_luxana_veyl_name": "Hauptmann Veyl",
      "npc_luxana_pell_name": "Pell, Hofpage",
      "npc_luxana_voss_name": "Ondra Voss",
      "smoke_witness_name": "Rauchzeugin",
      "smoke_settings_tab": "Rauch",
      "location_vandara_name": "Vandara",
      "chapter_vandara": "Vandara",
      "npc_vandara_gate_guard_name": "Torwächter",
      "npc_vandara_olie_name": "Sekretär Olié",
      "npc_vandara_kalre_name": "Händlerin Kal're",
      "npc_vandara_fafa_name": "Bettlerin Fafa",
      "npc_vandara_veyra_name": "Magistra Veyra",
      "npc_vandara_ormias_name": "Lektor Ormias",
      "npc_vandara_quinell_name": "Doktor Quinell",
      "npc_vandara_sariel_name": "Sariel",
      "npc_vandara_pamle_name": "Magistra Pamle",
      "npc_vandara_korren_name": "Korren",
      "npc_vandara_iska_name": "Iska",
      "npc_vandara_daven_name": "Marschall Daven",
      "ui_vandara-invited": "Einladungsschreiben",
      "ui_vandara-admitted": "In Vandara aufgenommen",
      "ui_vandara-enrolled": "An der Akademie eingeschrieben",
      "ui_build-vandara-alchemy-laboratory": "Alchemielabor gebaut",
      "ui_vandara-katakomben-unlocked": "Zugang zu den Katakomben",
      "ui_vandara-veyra-intro-done": "Veyras Grundkurs absolviert",
      "ui_vandara-ormias-intro-done": "Ormias' Grundkurs absolviert",
      "ui_vandara-quinell-intro-done": "Quinells Grundkurs absolviert",
      "ui_vandara-tested-fire": "Feuerprobe versucht",
      "ui_vandara-tested-earth": "Erdprobe versucht",
      "ui_vandara-tested-wind": "Windprobe versucht",
      "ui_vandara-tested-tide": "Gezeitenprobe versucht",
      "ui_vandara-tested-light": "Lichtprobe versucht",
      "ui_vandara-light-resonance-found": "Lichtresonanz festgestellt",
      "ui_vandara-shadow-revealed": "Schattenelement entdeckt",
      "ui_vandara-shadow-trained": "Schatten-Grundlagen erlernt",
      "ui_vandara-alchemy-mastered": "Alchemie-Grundkurs absolviert",
      "ui_ash_flower": "Ascheblume",
      "ui_glitter_dust": "Glitzerstaub",
      "ui_tab_vandara_alchemy": "Alchemie",
      "ui_vandara_shadow_shifter_label": "Schatten-Drachenwandler",
      "home_vandara_dorm_title": "Studentenbude",
      "home_vandara_dorm_desc": "Ein schmales gemietetes Zimmer über einer Seitengasse von Vandara. Kaum größer als das Bett, aber es ist deins — und nah genug an der Akademie, um aus dem Bett direkt in die Vorlesung zu rollen.",
      "home_vandara_loft_title": "Gelehrten-Loft",
      "home_vandara_loft_desc": "Ein helles Loft im Obergeschoss, den ganzen Tag strömt Sonne durch hohe Fenster. All das Licht bedeutet Schatten im Überfluss — einen zu binden kostet dich hier weniger.",
      "home_vandara_catacomb_title": "Katakomben-Kammer",
      "home_vandara_catacomb_desc": "Ein trockener, verborgener Raum in den alten Tunneln nahe Sariel. Geräumig und billig, und kein Beamter verirrt sich je hier herunter. Dunkel allerdings — wenig Licht, kaum Schatten zum Arbeiten."
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
      },
      "act-npc-luxana-elian": {
        "title": "Meister Elian"
      },
      "act-npc-luxana-caldwen": {
        "title": "Lord Caldwen — The Flooded Vault"
      },
      "act-npc-luxana-mirelle": {
        "title": "Lady Mirelle — The Fragile Cradle"
      },
      "act-npc-luxana-aurel": {
        "title": "Vicomte Aurel — The Shadow Theatre"
      },
      "act-npc-luxana-sylvaine": {
        "title": "Dame Sylvaine — Shade the Moonbloom"
      },
      "act-npc-luxana-brannoc": {
        "title": "Brannoc — The Court Archive"
      },
      "act-npc-luxana-veyl": {
        "title": "Hauptmann Veyl — A Matter of Security"
      },
      "act-npc-luxana-pell": {
        "title": "Pell — Court Whispers"
      },
      "act-npc-luxana-voss": {
        "title": "Ondra Voss — A Useful Shadow"
      },
      "act-smoke-ping": {
        "title": "Send Smoke Ping",
        "desc": "Emit a quiet pulse. Increments the smoke_test state counters and fires the smokeFlash effect."
      },
      "act-npc-vandara-gate-guard": {
        "title": "Gate Warden",
        "unlocks": "Access to Vandara"
      },
      "act-npc-vandara-olie": {
        "title": "Secretary Olié"
      },
      "act-npc-vandara-kalre": {
        "title": "Trader Kal're"
      },
      "act-npc-vandara-fafa": {
        "title": "Beggar Fafa",
        "unlocks": "Access to the Catacombs"
      },
      "act-vandara-buy-ash-flower": {
        "title": "Buy Ash Flower",
        "effect": "ash_flower"
      },
      "act-vandara-buy-glitter-dust": {
        "title": "Buy Glitter Dust",
        "effect": "glitter_dust"
      },
      "act-vandara-buy-glowpollen": {
        "title": "Buy Glowpollen",
        "effect": "glowpollen"
      },
      "act-vandara-buy-resin": {
        "title": "Buy Resin",
        "effect": "resin"
      },
      "act-vandara-buy-arcane-dust": {
        "title": "Buy Arcane Dust",
        "effect": "arcane_dust"
      },
      "build-vandara-alchemy-laboratory": {
        "title": "Build Alchemy Laboratory",
        "unlocks": "Pamle's brew recipes (after teaching)"
      },
      "build-vandara-dorm": {
        "title": "Rent Student Lodging"
      },
      "build-vandara-loft": {
        "title": "Furnish Scholar's Loft"
      },
      "build-vandara-catacomb": {
        "title": "Claim Catacomb Chamber"
      },
      "act-npc-vandara-veyra": {
        "title": "Magistra Veyra"
      },
      "act-npc-vandara-ormias": {
        "title": "Lector Ormias"
      },
      "act-npc-vandara-quinell": {
        "title": "Doctor Quinell"
      },
      "act-npc-vandara-korren": {
        "title": "Student Korren"
      },
      "act-npc-vandara-iska": {
        "title": "Student Iska"
      },
      "act-npc-vandara-daven": {
        "title": "Marshal Daven"
      },
      "act-vandara-try-fire": {
        "title": "Fire Trial"
      },
      "act-vandara-try-earth": {
        "title": "Earth Trial"
      },
      "act-vandara-try-wind": {
        "title": "Wind Trial"
      },
      "act-vandara-try-tide": {
        "title": "Tide Trial"
      },
      "act-vandara-try-light": {
        "title": "Light Trial"
      },
      "act-npc-vandara-sariel": {
        "title": "Sariel"
      },
      "act-npc-vandara-pamle": {
        "title": "Magistra Pamle"
      },
      "act-vandara-brew-energy-potion-small": {
        "title": "Brew Small Energy Potion",
        "desc": "Pamle's first recipe. Herbs crushed in a mortar, hot water poured over, stirred once. Tastes of meadow and bad tea — but it works immediately."
      },
      "act-vandara-brew-magic-potion-small": {
        "title": "Brew Small Magic Potion",
        "desc": "Blossoms distilled in water. Turns pale purple when ready. Helps you focus, tastes like the first sip of something you shouldn't drink."
      },
      "act-vandara-brew-pollen-tea": {
        "title": "Brew Wakeful Pollen Tea",
        "desc": "Glow pollen dusted over blossoms, steeped for a minute. Bright infusion that regenerates you steadily for a while instead of one short jolt."
      },
      "act-vandara-brew-spark-vial": {
        "title": "Brew Spark Light Vial",
        "desc": "Glitter dust bound inside an ash flower. The vial glows on its own — a portable light you can hang from your belt. Lowers the magic cost of a bound shadow."
      },
      "act-vandara-brew-arcane-water": {
        "title": "Brew Arcane Water",
        "desc": "Student standard: arcane dust dissolved in water, stabilised with a pinch of glitter dust. Crisp magic boost now, gentle aftereffect."
      },
      "act-vandara-brew-ash-tincture": {
        "title": "Brew Ash Burn Tincture",
        "desc": "Pamle's own invention. Ash-flower pollen concentrated with resin. Turns you into a logging machine for two minutes — more yield from every strike."
      }
    },
    "buffs": {
      "item_gourmet_meal_title": "Gourmet Meal",
      "buff_gourmet_desc": "Nourishes the body sustainably.",
      "buff_harvest_title": "Ancestral Blessing",
      "buff_harvest_desc": "Nature responds to your call (+1 to all gathering yields).",
      "buff_vandara_wakeful_pollen_title": "Wakeful Pollen Tea",
      "buff_vandara_wakeful_pollen_desc": "Gentle energy boost. +1 energy regen per tick, 60 seconds.",
      "buff_vandara_spark_light_title": "Spark Light",
      "buff_vandara_spark_light_desc": "Portable light source. Cuts a bound shadow's magic drain noticeably. 90 seconds.",
      "buff_vandara_ash_burn_title": "Ash Burn",
      "buff_vandara_ash_burn_desc": "Hot, pulsing energy rush. Wood and stone yield +1 per action, 2 minutes.",
      "buff_vandara_echo_clarity_1_title": "Echo Clarity",
      "buff_vandara_echo_clarity_1_desc": "A faint resonance lingers around you after Korren's experiment. +1 magic regen, 60 seconds.",
      "buff_vandara_echo_clarity_2_title": "Deep Echo Clarity",
      "buff_vandara_echo_clarity_2_desc": "A stronger lingering resonance. +2 magic regen, 90 seconds.",
      "buff_vandara_animated_tools_1_title": "Animated Tools",
      "buff_vandara_animated_tools_1_desc": "Your tools twitch helpfully on their own. +1 wood yield, 60 seconds.",
      "buff_vandara_animated_tools_2_title": "Walking Tools",
      "buff_vandara_animated_tools_2_desc": "Tools you touch start moving with you. +1 wood yield and +1 stone yield, 90 seconds."
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
      "item_crystal_apple_desc": "A glass-like shimmering apple that nourishes magically (+30 Satiation, +20 Energy).",
      "item_luxana_summons_title": "Court Summons",
      "item_luxana_summons_desc": "A heavy document sealed in deep imperial red, requesting you by name and by element. The court at Luxana wishes the rare shadow gift studied properly — under Meister Elian of the Hofmagier collegium. Graduates are rarely called straight to the capital. Apparently you are not most graduates.",
      "item_vandara_letter_title": "Rose Gold Academy Invitation",
      "item_vandara_letter_desc": "A folded, heavy letter on cream-coloured paper, sealed with rose gold wax. Inside, in elegant handwriting, the academy invites you to Vandara. \"We welcome dragon-shifters of all backgrounds to find their own way.\" A map of the city is enclosed.",
      "item_vandara_student_id_title": "Rose Gold Academy Student ID",
      "item_vandara_student_id_desc": "A small, weighty plaque of polished rose gold with your name, a serial number, and the academy crest. Issued by the secretariat — Secretary Olié had you spell your name twice, \"to keep the record clean.\"",
      "item_vandara_diploma_title": "Rose Gold Academy Diploma",
      "item_vandara_diploma_desc": "A folded document of heavy cream paper sealed with rose-gold wax. Inside, in fine calligraphy, the academy confirms you have completed the basic curriculum — Dragon Studies, Arcane Foundations, Element Diagnostics — and demonstrated practical shadow control. Three examiners signed it. Olié notarised it with the dignity of a man who has filed thirty years of these."
    },
    "logs": {
      "save_success": "Game saved successfully.",
      "save_corrupted_msg": "Your save was corrupted and has been set aside for safety. Starting fresh.",
      "save_failed_msg": "Save failed — storage may be full. Progress since the last save is not preserved.",
      "addon_compat_title": "Addon compatibility",
      "addon_compat_missing_heading": "Missing addons",
      "addon_compat_missing_hint": "Content from these addons is referenced by the save, but they aren't loaded right now. Quests may get stuck, inventory items may become unusable.",
      "addon_compat_version_heading": "Version changes",
      "addon_compat_added_heading": "Newly active (weren't in the save)",
      "addon_compat_load_anyway": "Load anyway",
      "addon_compat_cancel": "Cancel",
      "intro_welcome": "Welcome back to solid ground, {player}.",
      "reward_unlock_npc": "New acquaintance: {name}",
      "reward_unlock_recipe": "New recipe unlocked: {title}",
      "reward_unlock_item": "Item discovered: {title}",
      "reward_blueprint_lake": "Blueprint for the Lake House received.",
      "reward_blueprint_tower": "Received blueprint for the Aura Tower.",
      "unlock_whisper_grove": "Mina leads you to a secret path: The Whisper Grove is now accessible.",
      "receive_books": "Books received! You can read them in the Main tab — once finished, they'll be archived in your Collection.",
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
      "ui_shadow_released": "Shadow released (conditions no longer met).",
      "ui_shadow_no_slots": "No free shadow to bind. Free one up or earn another.",
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
      "shadow_broken_magic": "Your magic energy is depleted. The bound shadow slips away.",
      "receive_luxana_summons": "Olié hands you a court summons. Luxana wants your shadow studied — Meister Elian awaits at the Hofmagier collegium.",
      "luxana_elian_met": "You've met Meister Elian — the tutor who taught every element but shadow. He hands you straight to the nobles.",
      "luxana_caldwen_done": "The signet rises dripping through the grate. Caldwen lets slip the court is watching now. Two more nobles ask for you by evening.",
      "luxana_vault_relic": "Something else came up with the signet — a scale-dark shard that fits no record, older than the vault. The court archivist might know.",
      "luxana_mirelle_done": "The charm lifts free; the cradle never creaks, the child never stirs. Lady Mirelle weeps with relief.",
      "luxana_aurel_done": "Shadows dance across the ballroom walls, brighter for the chandeliers. Aurel's soirée — and you — are the talk of Luxana.",
      "luxana_sylvaine_done": "Steady shade travels with the moonbloom across the sunlit court; not a petal wilts. Dame Sylvaine nods — high praise, from her.",
      "luxana_brannoc_met": "Brannoc turns the shard over, muttering. \"Older than the archive.\" He sends you off while he digs through the deep rolls.",
      "luxana_archive_revealed": "Brannoc unrolls a centuries-old painting: a shadow-dragon with your face. Neither of you says it aloud — and the find won't stay quiet.",
      "luxana_veyl_confronted": "Hauptmann Veyl blocks your path. A thing that slips through bars is a hole in every wall she guards — she'll put the shadow before the court.",
      "luxana_pell_met": "Pell, the court page, knows every feud and which doors stick. A friend worth having where everyone smiles.",
      "luxana_pell_warned": "Pell finds you first: \"The captain's been asking about you. Quiet-like.\" Dey slips away before you can thank dem.",
      "luxana_voss_met": "Ondra Voss bought her salon and half its guests; what she can't buy is a title. She'd love to be seen with the court's famous shadow.",
      "luxana_voss_resolved": "You let Voss down gently — you're no one's ornament. She laughs, and means it. An odd ally, but a real one.",
      "luxana_elian_finale": "The court hears Veyl out — and sides with Elian and the nobles you served. No leash, no cell. You leave Luxana free, a second shadow at your call, and an old painted face you can't stop seeing.",
      "smoke_ping_log": "A soft pulse rolls through the valley.",
      "smoke_panel_title": "Smoke test diagnostics",
      "smoke_panel_hint": "These values update live from the `smoke_test` addonState slot. If the tick count climbs, the hook is running; if Vandara shows ✔, the isAddonLoaded check fired.",
      "smoke_stat_ticks": "Ticks",
      "smoke_stat_flashes": "Smoke flashes fired",
      "smoke_stat_vandara": "Vandara loaded",
      "receive_vandara_letter": "Aria hands you a letter sealed in rose gold wax. An invitation to the Academy in Vandara.",
      "vandara_admitted": "You've been admitted to Vandara. The academy lies before you.",
      "vandara_enrolled": "Olié hands you the student ID. You are officially a student of the Rose Gold Academy.",
      "vandara_alchemy_laboratory_built": "Your Alchemy Laboratory is up. Now you just need someone to show you what to do with it.",
      "vandara_dorm_built": "You've rented a student room in Vandara. Small, but your own.",
      "vandara_loft_built": "You've moved into a sunlit scholar's loft. Light everywhere — shadows come easy here.",
      "vandara_catacomb_built": "You've claimed a hidden chamber in the catacombs. Quiet, dark, and entirely off the records.",
      "vandara_katakomben_unlocked": "Fafa shows you the hidden entrance to the catacombs beneath Vandara. Another city lies below.",
      "vandara_veyra_intro_done": "You've completed Veyra's element diagnostic consultation.",
      "vandara_ormias_intro_done": "You've completed Ormias's basic course on Dragon Studies.",
      "vandara_quinell_intro_done": "You've completed Quinell's basic course on Arcane Foundations.",
      "vandara_trial_fire": "Fire trial — no resonance.",
      "vandara_trial_earth": "Earth trial — no resonance.",
      "vandara_trial_wind": "Wind trial — no resonance.",
      "vandara_trial_tide": "Tide trial — no resonance.",
      "vandara_trial_light": "Light trial — something flickered. But not clean light. Veyra is unsettled-fascinated.",
      "vandara_shadow_revealed": "Veyra has confirmed it: you are a shadow-shifter. A sub-variant of Light, extremely rare. She gives you a name — Sariel, an old colleague who left the academy forty years ago.",
      "vandara_shadow_trained": "Sariel has walked you through the basics. You're awake — the rest comes with practice.",
      "vandara_shadow_bind_learned": "Sariel has taught you to bind a shadow to a task. Magic drains while it works; one shadow at a time for now.",
      "vandara_ormias_reveal_reaction": "Ormias gracefully eats his \"late-blooming Great Dragon\" prediction. He'd like you back for more questions.",
      "vandara_quinell_reveal_reaction": "Quinell quietly acknowledges Sariel was right all along.",
      "vandara_olie_reveal_reaction": "Olié updates your student record. Element: Shadow. Sub-Light. Rare.",
      "vandara_pamle_reveal_reaction": "Pamle has heard. Says she'll think about shadow-flavoured reagents.",
      "vandara_exam_scheduled": "Olié has scheduled your graduation exam. Three stations: Veyra for the practical, Ormias for the oral, Quinell for the written.",
      "vandara_exam_veyra_done": "Practical exam passed. Veyra's note: \"exemplary control for a first-year shadow-shifter.\"",
      "vandara_exam_ormias_done": "Oral exam passed. Ormias's note: \"remembered all seven and named the eighth without prompting.\"",
      "vandara_exam_quinell_done": "Written exam passed. Quinell's note: \"satisfactory\" — his highest praise in forty years.",
      "vandara_graduated": "You have graduated from the Rose Gold Academy of Vandara.",
      "vandara_pamle_intro_done": "Pamle showed you the two basic recipes — energy potion and magic potion.",
      "vandara_pamle_tier2_done": "Pamle takes your three energy potions and teaches you tier-2 — Wakeful Pollen Tea and Spark Light Vial.",
      "vandara_pamle_tier3_done": "Pamle takes three Spark Light Vials and teaches you Arcane Water and Ash Burn Tincture.",
      "vandara_alchemy_mastered": "You've mastered Pamle's full basics. More complex recipes will come later.",
      "vandara_korren_1_done": "Korren has woken a faint echo from a smith's ring. He's pleased.",
      "vandara_korren_2_done": "Korren has pulled a fuller echo out of an old military coin. He's pacing.",
      "vandara_korren_arc_done": "Korren has cracked an imperial archive shard open. The candle went out for a second. He doesn't look well.",
      "vandara_iska_1_done": "Iska's spoon stood up by itself for ten seconds. She is delighted and slightly bleeding.",
      "vandara_iska_2_done": "Iska's clockwork figure took three steps. The court will hear.",
      "vandara_iska_arc_done": "Iska's bone puppet walked a circle and turned to look at you. Iska is laughing. You are not.",
      "vandara_daven_tip_1": "Marshal Daven has arrived and asked you for a general account.",
      "vandara_daven_tip_2": "You have described both experiments in detail. Daven is taking notes.",
      "vandara_catacomb_students_busted": "You led Marshal Daven to both workbenches. Korren and Iska have been arrested. Your role: cooperating witness."
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
      "modifier_magic_regen_passive_title": "Passive Magic Regeneration",
      "modifier_magic_regen_passive_desc": "Magic regenerates passively over time.",
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
      "lore_2_step_10": "<i>The Accord of Luxana is renewed every hundred years to strengthen the bond between dragon species.</i>",
      "npc_olie_luxana_summons": "Olié slides one last sealed document across the desk. \"The court at Luxana has asked for you — by name, and by element. A summons to the Hofmagier collegium, under Meister Elian himself.\" A rare pause. \"We don't often send a fresh graduate straight to court. Congratulations — twice over, it seems.\"",
      "npc_luxana_elian_1": "A cluttered study, crystal staves drifting in midair, an ancient tutor peering over slipping glasses. \"Ah — you're the one. Meister Elian. Forty years I've taught at this court — every element but shadow. And now they hand me the first shadow-shifter.\" He leans in. \"Truth be told, I've no idea where to begin. We'll work it out together. Old Lord Caldwen's been hounding me for a week — go, see what a shadow can do that a drake cannot.\"",
      "npc_luxana_elian_2": "The hall is packed. Hauptmann Veyl lays out her case: a thing that slips through bars and weighs nothing cannot wander unwatched. On the table — Brannoc's centuries-old painting of a shadow-dragon with your face. Elian rises. \"Captain, you'd cage what you haven't troubled to understand.\" One by one the nobles step forward for you. Veyl inclines her head — a truce, not defeat. Later, quietly: \"You can hold a second shadow now. Bind it as Sariel taught you.\" He hesitates. \"That picture... go carefully. Luxana has no answer for what you are. Perhaps somewhere does.\"",
      "npc_luxana_caldwen_1": "Caldwen doesn't rise when you enter. \"The court's pet shadow.\" A vault beneath his estate flooded; his three-centuries-old family signet sits behind an iron grate too narrow for any claw, in water no servant will dive. \"They say a shadow needs neither breath nor width. Reach through. Bring it up. Succeed, and the court hears of it from me — worth more than you know.\"",
      "npc_luxana_mirelle_1": "Lady Mirelle meets you with a finger to her lips. \"Softly — please.\" A child sleeps in a cradle of spun heartwood. \"A warding charm slipped beneath the mattress, and now it hums where it should be silent — but the wood won't bear a hand, and claws would wake her.\" Her composure trembles. \"They say your shadow weighs nothing. Lift it out. Don't wake my daughter.\"",
      "npc_luxana_aurel_1": "Vicomte Aurel is mid-gesture before you arrive. \"My soirée needs something they've never seen and cannot buy.\" He flings open the ballroom doors onto a blaze of chandeliers. \"They say shadow is strongest where the light burns brightest. A living shadow-play, across these walls. Give them that, and Aurel's favour opens doors even Caldwen's name cannot.\"",
      "npc_luxana_sylvaine_1": "Dame Sylvaine doesn't look up from the pale flower in her gloved hands. \"Moonbloom. One touch of true daylight and it blackens forever — yet it must cross the sunlit court at noon.\" She measures you. \"I need shade that moves with it and lets not one ray through. Shadow belongs to light; you should manage it. Walk beside me. Keep it dark.\"",
      "npc_luxana_brannoc_1": "The archive is a canyon of shelves lit by one stubborn lamp. Brannoc emerges, ink to the elbows — then sees the scale-dark shard you carry and goes still. \"Older than the court that built this room.\" He's already shuffling toward the deep stacks. \"Come back when I've had time with the old rolls. And don't mention this to the gilded ones upstairs.\"",
      "npc_luxana_brannoc_2": "Brannoc hasn't slept. He unrolls something so old the vellum sighs — a shadow-dragon in failing ink, wings like spilled night. He doesn't point at the face. He doesn't have to. \"I'll say only what I can prove: this is old, it is shadow, and it is *you*.\" His hands aren't quite steady. \"Word like this doesn't keep. Someone with a sword will hear of it.\"",
      "npc_luxana_veyl_1": "Veyl waits where the corridor narrows. \"I hear the archive turned up a portrait. Centuries old, wearing your face.\" Her tone is almost kind, which is worse. \"I've nothing against you. But you slip through bars and stand unseen in bright rooms — and I guard this court.\" She steps aside, barely. \"I'll put it before the court. Be there. Better you hear it from me than from a cell.\"",
      "npc_luxana_pell_1": "A page no taller than your elbow falls into step beside you. \"You're the shadow. I'm Pell — I carry things, mostly secrets.\" Dey grins. \"Caldwen's vault isn't the only thing of his that's underwater. The Vicomte owes his tailor more than his estate's worth. Nobody notices a page, so I notice everything. Be kind to me and I'll be useful.\"",
      "npc_luxana_pell_2": "Pell waits in a doorway, voice low. \"That picture the old archivist dug up? The captain's been by twice, asking what a shadow can do.\" Dey picks at a sleeve. \"Veyl's not cruel — that's the trouble. She'll come at you straight, by the rules. So don't give her a reason. You've got friends here now. Use us.\"",
      "npc_luxana_voss_1": "Ondra Voss arrives in a cloud of expensive scent. \"The shadow everyone's gasping about. I have the house, the wine, the right guests — what I lack is *occasion*. You are a talking point.\" A bright, brittle smile. \"One evening in my salon. Do something marvellous. Name your fee — I do understand fees.\"",
      "npc_luxana_voss_2": "You tell Voss you won't be anyone's centrepiece. She goes still — then laughs, ugly and warm. \"The first honest 'no' I've had since I bought my way through that door.\" She studies you anew. \"Keep your shadow to yourself, then. But a jumped-up merchant's goodwill — the only true currency at this court — is yours. No performance required.\"",
      "npc_teacher_vandara_letter": "\"Before you go, {player}... this came for you this morning.\" Aria pulls a folded letter from her bag. The seal shimmers in warm rose gold. \"From Vandara. The Rose Gold Academy. I wrote to them after seeing how seriously you studied. It's just an invitation — not an obligation. But if you want to find out what you really are, this might be the way.\"",
      "npc_vandara_olie_1": "Secretary Olié looks up from his stack of files — an elegantly feathered serpent with iridescent scales like wet pebbles. \"Ah. A new enrolment.\" He smiles, polite but distant. \"Please have a seat. We'll go through the necessary in order. Name, origin, element if known.\" His feathered crest twitches when you hesitate on the last. \"Unknown is also an answer, don't worry.\"",
      "npc_vandara_olie_2": "\"Now, the enrolment fee.\" Olié slides a tiny bronze dish across the desk. \"Twenty-five shards, one-off. The academy itself is free — we are not the Crystal Realm. The fee just covers paperwork and a sip of tea should you have to wait.\"",
      "npc_vandara_olie_3": "\"Here is your ID.\" Olié hands you a thin, weighty plaque of polished rose gold. \"It gets you anywhere you're allowed — and a few places you're not, but nobody checks.\" He taps a list on his desk. \"Your mentors. Lector Ormias holds Dragon Studies. Doctor Quinell handles Arcane Foundations. And Practitioner Pamle gives Alchemy, though her class only makes sense once you've arranged a workshop yourself.\" A polite pause. \"Since you couldn't state your element, I'll also send you to Magistra Veyra. She handles the diagnostics — not a class, a consultation. The best in the city. The academy is fortunate to keep her.\" A polite nod. \"Welcome to Vandara, student.\"",
      "npc_vandara_olie_4": "Olié looks up from his stack, polite as ever. \"Ah. The element field on your student record. I left it blank, as we discussed.\" He pulls out a thin pen. \"I will fill it in now.\" A pause as he writes. \"Shadow. Sub-variant Light. Note: rare.\" He blows on the ink. \"There. Properly recorded. The academy archives appreciate accuracy more than novelty, but in this case they get both.\" A polite nod. \"Carry on, student.\"",
      "npc_vandara_olie_5": "Olié sets down his pen the moment you arrive — clearly he has been waiting. \"Your file is complete. Three basic courses, one element diagnostic, one independently arranged shadow- practice. The Council has authorised you to sit your graduation examination.\" He slides a thin rose-gold token across the desk. \"Your exam permit. Show it at each station. Magistra Veyra will run the practical — she expects to see Shadow Bind under controlled conditions. Lector Ormias will examine you orally on Dragon Studies. Doctor Quinell will examine you in writing on Arcane Foundations.\" A small, formal pause. \"Take them in any order. Return to me afterwards. I will be here. I am always here.\"",
      "npc_vandara_olie_6": "Olié rises. He does not rise often. \"All three sections passed. Magistra Veyra noted, and I quote, 'exemplary control for a first-year shadow-shifter — at least, the first I have ever met.' Lector Ormias noted, 'remembered all seven and named the eighth without prompting.' Doctor Quinell noted only 'satisfactory'. That is the highest praise he has ever written on a graduation form, in my forty years.\" He produces a folded document of heavy cream paper with the rose-gold seal. \"Your diploma. The Rose Gold Academy of Vandara hereby confirms that you have completed the basic curriculum.\" He hands it across with both hands. \"Congratulations, graduate. The academy is in your debt for one shadow-shifter. Where you go next is not in our file.\" A small, almost warm smile. \"Good luck, {player}.\"",
      "npc_vandara_kalre_1": "A young dragon-shifter with silver-blue hair and a stall full of glass jars calls out to you. \"You're new, yeah? Easy to tell.\" She grins wide. \"Kal're, from the Crystal Realm. Wind line. Did I already mention I'm from the Crystal Realm? I like saying it — then nobody asks why my scales are like glass.\" She nudges a small dish of ash flowers towards you. \"Sniff. Smells like volcanic dust and one other thing you can't quite name. If you ever set foot in an alchemy lab, you'll need these.\"",
      "npc_vandara_kalre_2": "\"You're back! Good, good.\" Kal're sorts glitter dust into tiny pouches. \"You'll see — in Vandara everyone talks to everyone and everyone knows everything. Except the things they shouldn't, on those they're surprisingly disciplined.\"",
      "npc_vandara_kalre_3": "\"Wondering if I trust you yet, eh?\" She laughs. \"Enough. Listen — you keep buying my reagents, but you've nowhere to use them. Most academy students put a small alchemy laboratory in their home. Two shelves, a copper basin, a flue.\" She sketches it on the back of a wrapper. \"Here. Bring the wood and stone, you'll know how to put it together now.\"",
      "npc_vandara_kalre_4": "Kal're waves you closer. \"Know what's funny about Vandara? The academy acts like it's the heart of the city. But the real things happen in the back rooms. The streets. The catacombs below.\" She winks. \"Don't repeat that.\"",
      "npc_vandara_kalre_5": "\"You're a regular now.\" Kal're taps her forehead. \"If you ever need anything rare — really rare — come to me before you ask anyone else. I'll find it. Or I'll know someone who'll find it.\"",
      "npc_vandara_fafa_1": "An old dragon-shifter sits hunched at the edge of the fountain, wrapped in a dusty grey cloak. Scales like cracked granite peek from under the cloth. She doesn't raise her head, but a bony hand stretches towards you. \"A few shards for an old earth- dragon?\" When you give, she finally looks up — grey eyes, sharp as freshly honed blades. \"Thank you, child. You're new. This city has names, you know. Not just the one above the gate. Come back — I'll tell you one.\"",
      "npc_vandara_fafa_2": "Fafa pockets the shards without looking. \"Vandara means 'change'. But they never tell you who wants the change and who fears it.\" She gestures at the academy behind you. \"King Archivaris, the old keeper of bones, wants everything kept as it was. King- Rectoress Novia wants everything made new. They've been arguing before the imperial court for years. While they argue, no one truly rules. That makes Vandara... interesting. Come back.\"",
      "npc_vandara_fafa_3": "\"You keep coming back. That's rare.\" Fafa smiles, and for a moment she doesn't look old, just tired. \"Listen, child. The students in the upper halls learn what the mentors are allowed to teach. What they really want to know they learn elsewhere. Beneath the city. Come back one more time, and I'll show you where.\"",
      "npc_vandara_fafa_4": "This time Fafa takes no shards. She stands — and is suddenly taller than you thought. \"Come.\" She leads you to an unremarkable storm drain behind the fountain, slides the iron aside as if it were a curtain. \"The catacombs. The old tunnels from before the Unspeakable. Down here you'll find the ones who can really help you — if you have the courage to descend.\" She looks at you for a long moment. \"Don't go alone until you know someone there you can trust. But go.\"",
      "npc_vandara_veyra_1": "Magistra Veyra welcomes you into a sun-bright consultation room — tall windows, a velvet examination couch, instruments arranged on a side table beside a small carafe of cooled water. She is a Sun Amphithere, gold and soft orange, her feathers scattering the daylight across every surface. \"Welcome, {player}. Olié sent you, yes? Good. This isn't a class — it's a consultation. You couldn't give him an element. That's quite alright.\" She gestures at the couch. \"We'll find out together. Most students already know from home. The few who don't — often the most interesting ones.\"",
      "npc_vandara_veyra_2": "\"First, the anamnesis.\" Veyra makes notes on a small slate, her feathered crest tilted with attention. \"Tell me what you've felt at home. Anything that pulled at you — warmth in your hands, weight in your chest, dryness in your throat when angry, a sound no one else heard. Even nothing is an answer.\" She listens patiently. \"Magic is bound to your element. You can't switch, you can only find. Some recognise it from a single moment. Others need exercises. We'll do both. Next time we begin the resonance tests.\"",
      "npc_vandara_veyra_3": "\"First resonance test.\" Veyra draws the curtains halfway, pulls a low stool over and sits beside the couch. \"Hands relaxed in your lap, palms up. Don't push. Don't reach. Let your aether settle on its own.\" Her quill hovers above her slate. She waits — long, longer than is comfortable. Then, quietly: \"Hm. There is something. But it doesn't sit cleanly under any of the standard signatures. I'd like to run a proper battery next session. Come back rested — it goes smoother on a calm body.\"",
      "npc_vandara_veyra_4": "\"Today the standard battery.\" Veyra has laid five objects on a small tray beside the couch — a stone, a bowl of water, a candle, a feather, a mirror. \"One material per element. You touch each in turn. I watch what your aether does. There is no right answer and no wrong one — even 'nothing happens' is a clean result.\" She raises a finger. \"One thing only: don't push. The aether doesn't lie when you let it be honest. Take your time. Ready when you are.\"",
      "npc_vandara_veyra_5": "\"You came back. Good. Please sit.\" Veyra has already drawn the curtains entirely; only a single small candle burns on the side table. \"The light reaction during your battery — that was not a null result. It was also not a clean light signature. I'd like to run a controlled isolation test. Hands open, no pushing, reach toward the candle.\" Long silence. Then her voice, suddenly different — no longer the clinician's measured tone: \"Oh. Oh, {player}. You are not casting a shadow. You are PULLING the shadow toward you. From the wall. From the ceiling. From me.\" A breathless half-laugh. \"You are not a light-shifter. You are a shadow-shifter. In forty years of diagnostics I have never seen one.\"",
      "npc_vandara_veyra_6": "Veyra is markedly more thoughtful today. \"Shadow is a sub- variant of Light. Like Dream is a sub-variant of Tide. But it is rare. Very rare. In forty years of diagnostics I have never seen one.\" She looks at you seriously. \"I can give you the theory. But the practice — I am out of my depth. I cannot teach you what I have never felt.\" She sets down her quill, hesitates, then continues quieter. \"There was a colleague here, a long time ago. Sariel. Brilliant. Element-agnostic on paper until they disproved it themselves. We lost touch when they left the academy — forty years ago, give or take. I haven't heard their name in a long time, and I don't know whether they still lecture. But if anyone can teach you the practice of shadow, it is Sariel.\" She meets your eyes. \"Be careful, {player}. 'Shadow' sounds romantic. Not everyone in this city sees it that way.\"",
      "npc_vandara_veyra_7": "Veyra has cleared the consultation room of every personal object — only the velvet couch, the small candle, and her slate remain. \"You came with the permit. Good. The practical is short.\" She gestures at the candle. \"Bind a shadow to it. Hold it. Talk to me about something unrelated for a count of thirty. Do not let the shadow drop, do not let the conversation falter. The exam is not about strength — it is about doing two things at once without one swallowing the other.\" She watches. Notes. Watches some more. Then a small smile that is entirely the diagnostician and not at all the proctor. \"Yes. Cleanly done. Forty years and a first. You pass. Tell Olié.\"",
      "vandara_trial_fire_dialog": "You hold your hand over the small flame. Warmth, of course — but no resonance. Veyra shakes her head. \"No fire.\"",
      "vandara_trial_earth_dialog": "The stone sits heavy in your hand. You wait. Nothing. Veyra notes something down. \"No earth.\"",
      "vandara_trial_wind_dialog": "You hold the feather up. It floats a moment, then falls. Normal — no magical lift. Veyra: \"No wind.\"",
      "vandara_trial_tide_dialog": "Hand over the water bowl. The surface ripples faintly — from your breath, not from you. Veyra: \"No tide.\"",
      "vandara_trial_light_dialog": "You look into the small mirror. Something flickers. Not in the mirror — IN the room behind you. Veyra snaps her head up. \"There. That was something. But not clean light. Come back as soon as you can — I want to look at this more closely.\"",
      "npc_vandara_sariel_1": "The tunnel opens into a small chamber. A single candle burns on a low table. The person behind it doesn't turn around — they keep sorting notes on the table with their fingertips. \"You're far too loud for your size, {player}. Walk softer when you're in a tunnel. Otherwise you don't hear when someone's standing in front of you.\" Their scales — if you can even call them that, sharp black crystals along the neck — clink faintly. Sariel raises their head, looks in your direction but not into your eyes. \"Ah. Sit down. I'm Sariel. Make yourself comfortable — the candle is plenty for both of us, I don't need any light.\"",
      "npc_vandara_sariel_2": "\"You want to know what shadow is.\" Sariel tilts their head a fraction. \"I heard the binding when you came down. Cheap stitch, thin paper, smells like the academy's archive ink. Quinell still uses the same printer he did forty years ago. He sent you, didn't he. Or made you send yourself.\" A small dry sound that isn't quite a laugh. \"He gave you that chapter of his — chapter six, I'd assume.\" \"He sat in my class for two years scratching down everything I said. The chapter is his. I have never written a single word in my life — I have been blind since before I ever stood at a lectern. So when he handed you that book, what you held was Quinell's transcription of me, not a copy of anything mine. There was nothing to copy. Whether he got it right is between him and his own honesty.\" A pause. \"The gist is short. Shadow is light that has enough depth to develop a will of its own. A light-shifter makes brightness. You make hollows. The hollows LISTEN. Got it? No? Good — that was a lie because I wanted to keep it short. Read his chapter anyway. He wrote it cleaner than I'd speak it twice.\"",
      "npc_vandara_sariel_3": "\"Stand in the light.\" Sariel gestures at the candle. \"Now reach out. Not toward the candle. Toward the shadow you cast.\" You hesitate. Sariel grins, the first time today. \"Yes, that works. Feel, don't think. Shadows are denser than ordinary light — palpable, when you know where.\" Long silence. Then: \"Ah. There. You grabbed it. Feel the weight? Very good. Same way I learned it, at twelve, from a shifter in the Emerald Forest. Blind too, like me now. She said back then, eyes are just one way of many. Took me until I had to before I believed it.\"",
      "npc_vandara_pamle_1": "Pamle is a compact magma-dragon-shifter, in humanoid form just shoulder-height to you, with scales like crusted lava across her forearms. She stands at an improvised table piled with empty vials and crushed plant remains. \"{player}, right? Sit. I'll make this quick: I'm Pamle, I teach alchemy. We start with two very simple recipes — energy potion and magic potion. They need nothing more than herbs, water, and a bit of heat.\" She taps her temple. \"Go home, build the workshop from Kal're's blueprint, place the alchemy table in your room. Then you can brew them. Come back when you've made three energy potions — THREE, not two, not 'almost three'. Then I'll show you something better.\"",
      "npc_vandara_pamle_2": "Pamle waits with her hand already out. \"Three energy potions, yes? Good.\" She takes them without comment and stores them on a shelf behind her. \"I sell them to the first-years for decent money, by the way, in case you were wondering. Education isn't free.\" A sharp grin. \"Now tier two: Wakeful Pollen Tea — regen over time. And Spark Light Vial — you'll learn to appreciate that one, trust me. Sariel down in the catacombs used to order them by the crate.\" She coughs as if she'd said too much. \"Practice. Bring me three Spark Light Vials when you're ready.\"",
      "npc_vandara_pamle_3": "\"Spark Light Vials. Three. Nice.\" Pamle weighs them in her hand, checks the brightness. \"Cleanly done. You understand the dosing.\" She racks them. \"Last round. Arcane Water is standard for any student who casts magic. And Ash Burn Tincture — that's my own invention. Made from Ash Willow pollen. Turns you into a logging machine for two minutes. You wouldn't believe how many orders the academy gets from construction firms for it.\" She nods to the door. \"Come back once more. Then I'll have taught you everything I currently offer.\"",
      "npc_vandara_pamle_4": "\"So.\" Pamle wipes her hands on an apron that's seen far too much. \"That's the basics. You handle the six base recipes. What's next gets harder — Star Berries are rare, Ember Lotus rarer still, and some recipes demand reagents only Storm Seraphs can gather. But until then you've got plenty to do.\" She offers her hand. \"Go and brew. If I ever teach anything new, you know where to find me. Oh — and Pamle isn't my full name, I never had one. Save the question.\"",
      "npc_vandara_pamle_5": "Pamle eyes you from the workbench. \"So. Word's around. You're the shadow one.\" She doesn't seem surprised. \"Means I should probably think about what reagents make sense for your sort. Ash from extinguished candles, mirror-shard dust, that kind of thing. I'll let you know if I come up with something.\" A sharp grin. \"And don't expect a discount. Rare element doesn't mean broke. Now scoot, I've got tier-three brewing to teach the next batch.\"",
      "npc_vandara_sariel_4": "\"You're not trained now. You're awake — that's something else.\" Sariel goes back to sorting notes. \"What you need from here, you'll learn yourself. Come back if you want to try something more complicated. Next time bring me a bowl of water — I'll show you how to fetch a shadow that holds it while you do other things. That's actually the practical part.\" They laugh drily. \"Forty years teaching and I still promise the interesting stuff for next session.\"",
      "npc_vandara_sariel_5": "\"You brought the bowl. Good. Set it down — there, on the floor between us.\" Sariel doesn't move from the chair, but the candle flame flickers once. \"Now. The trick I promised. Shadows aren't free. They are you, a part you push out into the world. So binding one costs your own magic, continuously, for as long as you keep it out.\" A long, slow pause. \"Pick a task. Anything you do with your hands — chopping, brewing, drawing water. Look at your shadow. Then ask it to do that task instead of you. Not aloud. With the same wordless push you used when you grabbed the shadow off the wall last time.\" You try. The shadow at your feet lengthens — and then it lifts the bowl. Holds it. Steady. Sariel smiles, faintly. \"Yes. That. Now you can do something else while the shadow carries on. Magic drains the whole time, mind you. When it runs out the shadow lets go.\" Another pause. \"One shadow. One task. That's the cap I can teach you. Splitting your attention further than that is for the next forty years, not the next hour.\" They lean back. \"Go. Do two things at once. It is the closest most of us ever come to being free.\"",
      "npc_vandara_ormias_1": "Lector Ormias is old. Very old. His dragon-form skull shimmers when he speaks — Magma Lindwurm line, scales like hardened lava. He wears rumpled robes and a pair of glasses that really don't fit. \"Sit, student. Dragon Studies, basic course. We know seven main types: Great Dragons, Wyverns, Lindwurms, Amphitheres, Leviathans, Seraphs, Fae. Plus the imperial Lungs — an exception we'll get to last.\" He coughs. \"One per session. No shortcuts. And remember the single most important thing about every one of them: they all have wings.\" A pause. \"Yes. All of them.\"",
      "npc_vandara_ormias_2": "\"Great Dragons. Guardians of the Realms. The bread-and-butter people from the Crystal Realm in the west.\" Ormias sketches a four-legged silhouette on the board — chalk breaks. \"Strong build, four legs, a pair of broad leather wings, often an armoured tail-tip and large horns. The most common type by far. Many late bloomers — wings don't always come in until twenty or thirty.\" He glances at you over his glasses. \"Statistically you are most likely one of these. Patience. They'll come.\"",
      "npc_vandara_ormias_3": "\"Wyverns. Hunters of the skies.\" Another sketch — the chalk breaks again. \"Two hindlegs only. Their front limbs fused with the wings during evolution. Fast, muscular flyers, usually with a venom-stinger or a heavy club at the tail. The Storm-Wyverns have wing-edges so sharp they cut wind like blades.\" He pushes his glasses up. They slide down immediately. \"Common in the western lowlands. You'd remember if you were one — they fly young.\"",
      "npc_vandara_ormias_4": "\"Lindwurms. The Earth-Bound.\" For the first time today, Ormias smiles, briefly. \"My kind. Massive body, only two forelegs, the rear half a long serpent we drag behind us. Wings we have, but heavy — we are not graceful in the air. We dig, we climb, we are slow, and we are stubborn. Two main lines: Magma Lindwurms, scales like glowing lava, living near the magma sea. And Swamp Lindwurms, scales like algae and bark, blending into the Emerald jungle.\" He coughs. \"Foreigners sometimes lump us in with western dragons. We are eastern. Don't confuse us.\"",
      "npc_vandara_ormias_5": "\"Amphitheres. The Feathered Serpents.\" Ormias gestures broadly with both arms. \"No limbs at all. Just a long serpentine body and a single pair of enormous, magnificent feathered wings — which, by the way, can store magical energy. Rare. Beautiful — even I admit it. Two sub-types we know of: Dream-Amphitheres, whose wing-strokes spin illusion-mist. And Sun-Amphitheres, golden feathers that can detonate into a blinding flash when threatened.\" He raises an eyebrow. \"Magistra Veyra is one. Don't tell her I said she's beautiful.\"",
      "npc_vandara_ormias_6": "\"Leviathans. Rulers of the Extremes.\" Ormias's voice drops — respect, not pride. \"They live where no one else can. Tide- Leviathans command the floating water islands and the sea routes; sinewy wings doubling as fins underwater, fine gill- slits, absolute lords of the currents. Magma-Leviathans on the lowest, hottest islands above the lava sea; massive armoured wings, obsidian-plated scales, lungs that filter superheated gas. Once a year they meet at the lava-falls and trade.\" A short pause. \"The most prestigious craft-folk in the empire.\"",
      "npc_vandara_ormias_7": "\"Seraph Dragons. The Sky-Stormers.\" Ormias's tone goes dry. \"Slender, aerodynamic, four to six narrow wings stacked one above the other. They live where the air is thin enough that a Great Dragon would lose consciousness, and they laugh at our storms because what we call a hurricane is their morning breeze.\" He waves a hand. \"Don't expect to see one — they almost never come down. If you do, be polite.\"",
      "npc_vandara_ormias_8": "\"Fae Dragons. The Emerald Weavers.\" Ormias's mouth twitches — something like fondness. \"The smallest. Dragonfly wings, chameleon camouflage, originally from the deep Emerald jungle. Two cultures now: the wild Forest-Fae who still vanish into bark, and the City-Fae who've adapted to urban life and grow brilliant, gaudy scales because nothing in town wants to eat them anymore.\" He almost smiles. \"If you ever meet one in a tavern, buy them a drink. Best gossip in Draconia.\"",
      "npc_vandara_ormias_9": "\"And finally — the Lung Dragons. The Sky-Walkers.\" Ormias taps his desk pointedly. \"Serpentine, wingless, four legs with sharp claws, characteristic beard-whiskers at the head. They fly by pure magic — no wings at all. The single exception to my opening rule.\" His glasses slip and he doesn't catch them this time. \"And before you ask: yes, I noticed you have no wings. Don't get excited. Lung Dragons are an absolute genetic outlier — they only appear in the imperial bloodline, and even there currently only two exist. Emperor Ignis Aurum and Prince Ryuga. That is the list.\" He clears his throat. \"You are most likely a late-blooming Great Dragon. In eighty percent of cases. Patience.\"",
      "npc_vandara_ormias_10": "\"Ah.\" Ormias adjusts his glasses, which immediately slip back down. \"I heard. Word travels fast in academy corridors, especially when it involves the impossible.\" He coughs. \"Allow me one moment of professional embarrassment. I told you, with some confidence, that you were most likely a late-blooming Great Dragon. I appear to have been incorrect — though, in fairness, also not entirely wrong. Shadow is a sub-variant of Light. Light-shifters are Great Dragons. So technically, statistically, the eighty percent still holds. Just.\" He gestures vaguely. \"I would very much like to update Chapter Two of my book. Come and visit again sometime — I will have new questions for you, and the questions are usually more interesting than the answers.\"",
      "npc_vandara_ormias_11": "Ormias has cleared his usual chaos off the desk and lined up a single sheet of paper, on which exactly one word is written: PROCEED. He looks at you sideways. \"Right. Oral exam. I will say the prompt, you will speak the answer. No notes. Try not to cough on me.\" He clears his throat as if to demonstrate. \"Name the seven main types of dragon-shifter, in any order, with one distinguishing feature each.\" Long silence as you recite. He nods through each. \"Good, good, good.\" Then: \"And the eighth.\" A pause. \"Yes, the eighth. We both know there is one. Name it, and the one identifying feature that disqualifies all of the others.\" Another pause as you answer. His glasses slip and he does not catch them this time either. \"Lung-Drachen. Wingless. Exactly.\" He smiles, briefly. \"You pass. Tell Olié. And come back later for a longer conversation. I have updated some questions.\"",
      "npc_vandara_quinell_1": "Doctor Quinell is a crystal-dragon-shifter — scales like cut rock crystal that refract the hall's light into every colour of the spectrum. He stands behind a lectern, motionless. \"Welcome. Arcane Foundations is the most boring lecture you will hear at this academy. And the most important. If you don't understand what magic IS, you will never apply it precisely. You will cast like a dog swims — functional, ugly, inefficient. Seven sessions: the definition, four laws, and the exceptions that frame them. No shortcuts. We begin with the definition.\"",
      "npc_vandara_quinell_2": "\"Definition.\" Quinell does not move while speaking. \"Magic is the manipulation of the aether through a draconic mind. Note: the aether — not 'energy', not 'force'. Note: draconic mind — not draconic body. The body is a tool, the mind is the caster.\" He pauses for two seconds. \"If you remember nothing else from this entire course, remember those two words. Aether. Mind. Everything else follows.\"",
      "npc_vandara_quinell_3": "\"First law. The Three-Component Law.\" Quinell draws three circles on the board, perfectly symmetrical. \"Every act of magic requires three elements at once. Element — your innate alignment, the one element your bloodline grants you. Will — the trained focus of your draconic mind. Substrate — the physical material through which the effect manifests. Your own form, a tool, the air itself.\" His tone sharpens. \"Three. Always three. Whoever cannot separate them in their mind will fail every advanced course at this academy.\"",
      "npc_vandara_quinell_4": "\"Second law. The Element-Binding Law.\" Quinell's tone does not warm. \"You cannot 'choose' your element. You cannot 'switch'. Whatever your bloodline gave you at birth is what you will cast for the entirety of your life. A fire-shifter who tries to wield water produces nothing — not weak water, no water at all.\" He looks past you, not at you. \"Students occasionally arrive convinced they can train themselves into a second element. They cannot. Disabuse yourself now.\"",
      "npc_vandara_quinell_5": "\"Third law. The Conservation Law.\" Quinell lifts a heavy quartz staff from beside the lectern, holds it, sets it down again. \"Magic does not come from nothing. What you send into the world comes from you. Personal energy out, magical effect in — one to one, no exceptions to the accounting. The aether is a medium, not a source.\" He pauses. \"Anyone who tells you they have found 'free magic' is selling you a fraud or performing a parlour trick. Probably both.\"",
      "npc_vandara_quinell_6": "\"Fourth law. The Exhaustion Law.\" Quinell finally lets a small expression cross his face — almost approval. \"This is the law students misunderstand most. Exhaustion is not failure. Exhaustion is the measure of your effect. Tired means the magic happened. Untired means it did not.\" His voice levels again. \"Whoever casts without exhaustion has done nothing. Whoever exhausts themselves casting a teacup has cast a real teacup. Apply both halves of that rule and you will already cast better than three quarters of the students sitting in this hall.\"",
      "npc_vandara_quinell_7": "\"Final session. Exceptions.\" Quinell sets a thin booklet on the lectern but does not push it toward you. \"Four laws. They are correct. They are also exceptions away from being incorrect — very few, very rare, in eighty percent of cases the laws hold without remainder. The remaining twenty are what doctoral theses are made of.\" For the first time, he pauses noticeably. \"There was a colleague here once. Sariel. Element-agnostic, the records said, until they themselves disproved that. Chapter six of these notes is mine — I transcribed it from their lectures. They are blind, have been since before I knew them; the writing was always my part of the arrangement. They lectured, I wrote. The chapter is the only treatise I know on Shadow as a sub-variant of Light. No one has ever met a documented shadow-shifter willing to be examined. They left the academy forty years ago. Whether they still live, I do not know.\" A small breath, then nothing. \"Read the chapter. If you ever find evidence of a current shadow-shifter, write the thesis. Dedicate it appropriately.\"",
      "npc_vandara_quinell_8": "Quinell does not move when you enter — but the angle of his head shifts, ever so slightly. \"I heard.\" A pause. \"Sariel was correct, then. The records were wrong; the lecture chapter was right. I will note it in the archives.\" Another pause, longer. \"If you ever — when you go back down to them — tell Sariel that the chapter still works. Forty years on, students still pass it. They may not remember me, but I have remembered them.\" His voice does not change pitch, but something in the room does. \"That is all. Go. Study. Apply the laws. You will need every one of them.\"",
      "npc_vandara_quinell_9": "Quinell does not move when you enter. A single sheet of paper waits on the lectern with four lines printed on it. \"Sit. Write. State each of the four laws by name and one sentence of substance. You may take as long as you require within reason. Use the pen, not your finger.\" Long silence. You write. He waits, motionless. When you set the pen down he reads the sheet without expression, then folds it once and drops it into a tray marked PASSED. \"Satisfactory. Return to Olié.\" A pause that for him counts as warm. \"Apply them honestly. The laws do not care whether you remember them. Only whether you respect them.\"",
      "npc_vandara_gate_guard_admit": "The gate warden — a massive earth-dragon shifter with scales like polished stone — looks you over slowly as you produce the letter. His gaze drifts across the rose-gold seal, then he gives a short nod. \"First time in Vandara, eh? We see academy invitations every few weeks. You'll be surprised how big this city is below the surface.\" A wave of his hand and the great gate swings open behind him. \"Welcome, {player}. Go on through — the mentors will explain the rest.\"",
      "npc_vandara_gate_guard_respect": "The warden recognizes you before you've even reached the gate. He straightens up and brings a hand briefly to his chest — not a formal salute, more the gesture earth-dragon shifters use when they mean someone. \"You've seen the city beneath the city. That changes a person.\" A small smile. \"Most come with the letter, leave with the letter, see only half. You belong to those who know both halves now. Take care of yourself, {player}.\"",
      "npc_vandara_korren_1": "Korren looks up from a low workbench cluttered with broken pottery and old metal fragments. His skin has the rust-brown tone of old earth at the neck and hands where the scales show through, and his wings — when he shifts on his stool — fan out behind him in deep red membrane. \"You came down. Good. Word travels, even to here.\" He gestures at the bench. \"I'm Korren. I'm — well. I work for King Archivaris. Not officially, you understand. Officially I'm a third-year student who 'fell behind on Dragon Studies'. Unofficially I'm down here proving something.\" He picks up a corroded ring. \"Echo-summoning. Old objects remember. I bring them up just enough to whisper. The academy thinks it's necromancy. It isn't — there's no soul, just resonance. But the academy doesn't care about distinctions when it can't see the math.\" He holds the ring out. \"Help me. I need a thread of your magic to anchor the echo. Five threads' worth, that's all. The ring will tell me how the smith who made it died. Small thing. Proof.\"",
      "npc_vandara_korren_2": "Korren is energised — pacing, scales darker, more vivid. \"I heard Iska did it. The Wyvern with the puppet. Made a teaspoon stand up by itself for ten seconds.\" A bitter grin. \"Cute. Animation is the easy thing. Anyone can poke matter and make it twitch. What I'm doing is harder — I'm reaching across time. But the corridor talked about Iska, not me, and that means my king loses today's argument.\" He shoves the ring back into a pile. \"We're going bigger. I have a coin, military issue, from the war forty years ago. It's seen a man die. If I can make it tell me HOW, the academy can't call the echo trick parlour magic any more. Ten threads. Now.\"",
      "npc_vandara_korren_3": "Korren has barely slept. The workbench is covered in objects. \"Iska is animating a corpse-doll. A SMALL one, but still. The whole city will hear about that by the end of the week, and if Archivaris doesn't have an answer by then, Novia's faction wins this round in court. So we're going to wake a real memory.\" He holds up something wrapped in cloth. \"A shard from the imperial archive. Don't ask how I got it. It saw — never mind what it saw. Twenty threads of magic, and we'll know whether the official records are the actual records.\" The shard hums when you touch it. The candle flame goes out for a full second. Korren laughs — too thinly. \"It worked. Oh, it worked. Wait until I write this up. Wait until—\" He cuts off, staring at nothing.",
      "npc_vandara_iska_1": "A Wyvern in humanoid form stands at a workbench surrounded by trinkets — a spoon, a coil of wire, a chess piece. Her hair is dark, sticking up at angles, and her patchwork robe is a riot of colour. Her wings flick out behind her in deep red, the same shape as Korren's down the corridor. \"Hi, hi, sit down, don't break my circle.\" She doesn't look up. \"Iska. Wind line. I'm not supposed to be here, I'm supposed to be at Pamle's tier-three lecture, but Pamle teaches BREWING and I want to make things MOVE.\" She points at the spoon. \"Watch. Five threads of magic from you, that's all I need. The spoon stands up. Maybe. Last time it stood up and stabbed me, so. Stand back.\" She grins. \"King Novia would love this. The old people say matter is inert. Matter is not inert. Matter is just shy.\"",
      "npc_vandara_iska_2": "Iska is grinning wider than before, gesturing with both hands at once. \"Korren did the ring thing. Made it whisper. Whisper. Anyone can whisper. I want to MOVE.\" She points at a clockwork chassis on her workbench. \"I'm wiring runes into a clockwork. Not just twitch — walk. Three steps. The court will laugh Korren out of the room when they see this. Ten threads, please, fast, I've got the geometry held in my head and I'll lose it if you make me wait.\"",
      "npc_vandara_iska_3": "Iska looks haggard. Both eyes red-rimmed. On the workbench is something small under a cloth. \"Korren is going to the imperial archive. Did you know that? I know it. The walls down here listen.\" She uncovers the cloth. A small puppet figure made of wood, wire, and something that looks suspiciously like a finger-bone. \"Don't ask. Borrowed. From an old grave. The grave's a hundred years past anyone caring. Twenty threads, and I make it walk a circle. If I do, Novia's faction owns the lecture halls for a decade.\" The figure stirs when you channel the magic. Stands. Takes one step, then another, then a third, then — it turns its tiny head toward you. Iska laughs, ecstatic. \"YES. That. Did you see that? It looked. It LOOKED—\"",
      "npc_vandara_daven_1": "A tall Great Dragon shifter steps into the candlelit chamber. Their scales are slate-grey, their coat a deep red with a single thread of academy gold at the collar. They look at you, not at the workbenches. \"You. Student. I've been told you've been visiting down here. I'm Marshal Daven, Council-of-Vandara enforcement.\" A small nod. \"I'm not arresting you — yet. I'm asking because you've seen them. Korren the echo-summoner and Iska the animator. What are they up to? Speak plainly. The Council has had complaints from both kings' agents, which is rare enough to be its own kind of evidence. Tell me what you can. We can speak about your own role afterwards.\"",
      "npc_vandara_daven_2": "Daven listens, taking notes on a small slate. \"An echo from an imperial archive shard. An animated figure made from grave-robbed bone. Both anchored to your own magic.\" They sigh once, briefly. \"This is the pattern I've seen every fifteen or twenty years. Two students, one for each king. They start small, they escalate against each other, and somebody eventually goes to the imperial archive or to a grave. You did not start this. You did, however, contribute the magical thread that pushed both of them past the line.\" They look at you directly for the first time. \"I appreciate your cooperation. One last question. Show me where they work. Exactly where. The Council prefers a clean arrest.\"",
      "npc_vandara_daven_3": "You lead Daven to Korren's workbench, then to Iska's. They nod once at each. Two more guards step in behind them — quiet, professional. There is no shouting; both students seem to have been waiting, in their own way. Korren straightens, refuses to look at you. Iska looks at you and grins, then winks, and lets herself be led out. \"Thanks for the boost, kid! Tell Pamle I'm sorry about the brewing class!\" Daven returns to you alone. \"It's done. The Council will hear them in a month. Probably suspended for two years, probably back at the academy after that with a different mentor each. No prison. They are children.\" A pause. \"You. Your role will be noted in the file as 'cooperating witness'. That is more generous than 'accomplice', which it could just as easily be. Walk carefully, student. Do not believe everything every Vassal's agent tells you.\" They turn to leave. \"And the next time someone in the catacombs asks for your magic — say no. Just once. Say no.\""
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
      "knowledge": "Knowledge",
      "ash_flower": "Ash Flower",
      "glitter_dust": "Glitter Dust"
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
      "nav_housing": "Home",
      "cat_gather": "Gather",
      "cat_work": "Work",
      "cat_crafting": "Crafting",
      "cat_upgrades": "Possessions & Artifacts",
      "cat_furniture": "Furniture",
      "cat_locations": "Locations & Travel",
      "cat_village": "The Village",
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
      "ui_shadow_bind": "Shadow Bind",
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
      "ui_teacher_label": "Instructor",
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
      "ui_shadow_released": "Shadow released (conditions no longer met).",
      "ui_placed_furniture": "Placed Furniture",
      "ui_stored_furniture": "Warehouse (Furniture)",
      "ui_place": "Place",
      "ui_remove": "Remove",
      "ui_space_cost": "Space",
      "fail_furniture_space": "Not enough space in your home!",
      "ui_home": "Your Home",
      "ui_furniture_space": "Furniture Space",
      "ui_switch_home": "Switch Home",
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
      "help_vitality_desc": "Energy and Magic are your fuel. Satiation affects all yields — well-fed you work more efficiently, starving you lose effectiveness on many actions.",
      "settings_tab_general": "General",
      "settings_name": "Shifter Name",
      "settings_tab_controls": "Controls",
      "controls_intro": "You can play the game entirely with the keyboard.",
      "controls_primary": "Primary actions (Rest, Meditate, Eat Berries)",
      "controls_tabs_number": "Jump directly to that tab",
      "controls_tabs_arrow": "Cycle to previous / next tab (wraps around)",
      "controls_enter": "Confirm — e.g. advance dialogue or close a modal",
      "controls_esc": "Open / close settings, skip prologue",
      "controls_tab_nav": "Move focus between buttons inside a view",
      "controls_laptop_note": "Note: On some laptops the F-keys need the Fn key held.",
      "sidebar_help_title": "Keyboard",
      "sidebar_help_desc": "Switch tabs: number keys 1-6 or Arrow Up / Down. Top primary actions: F1 Rest, F2 Meditate, F3 Eat Berries. Full reference in Settings under Controls.",
      "settings_tab_audio": "Audio & Sounds",
      "settings_tab_addons": "Addons",
      "settings_addons_intro": "These addons are active right now. \"Build\" means baked into the game executable; \"Runtime\" means loaded from the `addons/` folder next to the .exe — you can delete or rename those without rebuilding.",
      "settings_addons_source_build": "Build",
      "settings_addons_source_runtime": "Runtime",
      "settings_addons_by": "by",
      "settings_addons_required_tooltip": "This addon is required — disabling it would remove the game.",
      "settings_addons_restart_required": "Takes effect on restart.",
      "settings_addons_reenable_all": "Re-enable all",
      "settings_addons_open_folder": "Open addons folder",
      "settings_addons_note": "Saves remember which addons were active. On load, the game warns if something is missing or has changed version.",
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
      "ui_shadow_bind_toggle": "Bind a shadow to this action",
      "nav_inventory": "Inventory and resources",
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
      "chapter_collection": "Chronicles",
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
      "shadow_bind_cost_title": "Shadow Bind Cost",
      "shadow_bind_cost_desc": "Reduces the magic drain of a bound shadow.",
      "location_village_name": "Village",
      "main_subtab_general_name": "General",
      "main_subtab_herstellen_name": "Crafting",
      "ui_placed_suffix": "(placed)",
      "location_luxana_name": "Luxana",
      "chapter_luxana": "Luxana",
      "ui_luxana-exp-vault": "Caldwen's vault",
      "ui_luxana-exp-cradle": "Mirelle's cradle",
      "ui_luxana-exp-stage": "Aurel's soirée",
      "ui_luxana-exp-bloom": "Sylvaine's moonbloom",
      "ui_luxana-archive-revealed": "Brannoc's discovery",
      "ui_luxana-captain-confronted": "Veyl's challenge",
      "npc_luxana_elian_name": "Meister Elian",
      "npc_luxana_caldwen_name": "Lord Caldwen",
      "npc_luxana_mirelle_name": "Lady Mirelle",
      "npc_luxana_aurel_name": "Vicomte Aurel",
      "npc_luxana_sylvaine_name": "Dame Sylvaine",
      "npc_luxana_brannoc_name": "Brannoc the Archivist",
      "npc_luxana_veyl_name": "Hauptmann Veyl",
      "npc_luxana_pell_name": "Pell, the Court Page",
      "npc_luxana_voss_name": "Ondra Voss",
      "smoke_witness_name": "Smoke Witness",
      "smoke_settings_tab": "Smoke",
      "location_vandara_name": "Vandara",
      "chapter_vandara": "Vandara",
      "npc_vandara_gate_guard_name": "Gate Warden",
      "npc_vandara_olie_name": "Secretary Olié",
      "npc_vandara_kalre_name": "Trader Kal're",
      "npc_vandara_fafa_name": "Beggar Fafa",
      "npc_vandara_veyra_name": "Magistra Veyra",
      "npc_vandara_ormias_name": "Lector Ormias",
      "npc_vandara_quinell_name": "Doctor Quinell",
      "npc_vandara_sariel_name": "Sariel",
      "npc_vandara_pamle_name": "Magistra Pamle",
      "npc_vandara_korren_name": "Korren",
      "npc_vandara_iska_name": "Iska",
      "npc_vandara_daven_name": "Marshal Daven",
      "ui_vandara-invited": "Invitation letter",
      "ui_vandara-admitted": "Admitted to Vandara",
      "ui_vandara-enrolled": "Enrolled at the Academy",
      "ui_build-vandara-alchemy-laboratory": "Alchemy Laboratory built",
      "ui_vandara-katakomben-unlocked": "Catacombs access",
      "ui_vandara-veyra-intro-done": "Veyra's basic course completed",
      "ui_vandara-ormias-intro-done": "Ormias's basic course completed",
      "ui_vandara-quinell-intro-done": "Quinell's basic course completed",
      "ui_vandara-tested-fire": "Fire trial attempted",
      "ui_vandara-tested-earth": "Earth trial attempted",
      "ui_vandara-tested-wind": "Wind trial attempted",
      "ui_vandara-tested-tide": "Tide trial attempted",
      "ui_vandara-tested-light": "Light trial attempted",
      "ui_vandara-light-resonance-found": "Light resonance detected",
      "ui_vandara-shadow-revealed": "Shadow element discovered",
      "ui_vandara-shadow-trained": "Shadow basics learned",
      "ui_vandara-alchemy-mastered": "Alchemy basics mastered",
      "ui_ash_flower": "Ash Flower",
      "ui_glitter_dust": "Glitter Dust",
      "ui_tab_vandara_alchemy": "Alchemy",
      "ui_vandara_shadow_shifter_label": "Shadow Shifter",
      "home_vandara_dorm_title": "Student Lodging",
      "home_vandara_dorm_desc": "A narrow rented room above a Vandara side-street. Barely bigger than the bed, but it's yours — and close enough to the academy to roll out of bed into a lecture.",
      "home_vandara_loft_title": "Scholar's Loft",
      "home_vandara_loft_desc": "A bright upper-floor loft, sun pouring through tall windows all day. All that light means shadows in abundance — binding one costs you less here.",
      "home_vandara_catacomb_title": "Catacomb Chamber",
      "home_vandara_catacomb_desc": "A dry, hidden room in the old tunnels near Sariel. Roomy and cheap, and nobody official ever comes down here. Dark, though — little light, few shadows to work with."
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
