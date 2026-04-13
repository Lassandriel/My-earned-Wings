export default {
  ui: {
    nav_story: "Main",
    nav_crafting: "Crafting",
    nav_housing: "Construction",
    nav_inventory: "Assets",
    nav_village: "Village",
    cat_gather: "Gather",
    cat_trade: "Trade",
    cat_work: "Work",
    cat_crafting: "Handicraft & Studies",
    cat_housing: "Construction & Storage",
    cat_inventory: "Possessions & Objects",
    cat_village: "The Village",
    cat_log: "Chronicle",
    nav_story_tab: "Chronicle",
    nav_traits: "Titles & Traits",
    nav_story_tab_header: "History & Chronicle",
    nav_traits_tab_header: "Your Accomplishments",
    ui_vitality: "Vitality",
    ui_shards: "Shards",
    ui_wood: "Wood",
    ui_stone: "Stone",
    ui_meat: "Meat",
    ui_details: "Details",
    ui_energy: "Energy",
    ui_magic: "Magic",
    ui_satiation: "Satiation",
    ui_unlocks: "Unlocks:",
    ui_ready: "Ready",
    ui_need: "Requires",
    ui_bonus: "Bonus",
    ui_base: "Base",
    ui_no_shelter: "No Shelter",
    ui_placeholder: "Wanderer...",
    ui_placeholder_desc: "Choose an action to learn more.",
    settings_title: "Settings",
    settings_lang: "Language / Sprache",
    settings_name: "Player Name",
    settings_reset: "Reset Game",
    confirm_reset: "Are you sure? All progress will be lost!",
    village_desc: "Speak with the inhabitants to learn more.",
    save_at: "Saved: ",
    save_never: "Last saved: Never",
    btn_save: "Save",
    btn_load: "Load",
    btn_quit: "Quit",
    btn_back: "Back",
    intro_welcome: "Welcome back to solid ground.",
    settings_tab_general: "General",
    settings_tab_audio: "Audio",
    settings_tab_system: "System",
    settings_vol_global: "Global Volume",
    settings_vol_music: "Music",
    settings_vol_sfx: "SFX",
    settings_mute: "Mute All",
    btn_assign_work: "Assign",
    btn_stop_work: "Stop",
    ui_salary: "Cost",
    ui_yield: "Yield",
    status_working: "Busy",
    status_idle: "Idle"
  },
  actions: {
    'action-essen': {
      title: "Eat Berries",
      desc: "Gather wild berries from the ground. They taste of earth and power.",
      effect: "+20 Satiation, +2 Energy"
    },
    'action-ausruhen': {
      title: "Rest",
      desc: "Close your eyes and listen to the distant beating of wings.",
      effect: "+10-50 Energy (Bonus for beds/fire)"
    },
    'action-meditieren': {
      title: "Look Up",
      desc: "Look to the sky. Their shadows cast questions into your heart.",
      effect: "+15 Magic"
    },
    'action-study': {
      title: "Study",
      desc: "Immerse yourself in old books on your massive table.",
      effect: "+5 Magic Limit (+10 with chair)"
    },
    'action-wood': {
      title: "Gather Twigs",
      title_alt: "Chop Wood",
      desc: "Laboriously gather fallen branches from the forest floor.",
      desc_alt: "Use your axe to chop healthy wood from the trees.",
      effect: "+1-2.5 Wood"
    },
    'action-stone': {
      title: "Gather Pebbles",
      title_alt: "Quarry Stones",
      desc: "Search for usable pebbles in the stream bed.",
      desc_alt: "Shatter rocks with your pickaxe for high-quality material.",
      effect: "+1-2 Stone"
    },
    'action-sell-wood': {
      title: "Trade Wood",
      desc: "Bring wood to the village market. They need it for their nests.",
      effect: "+5 Shards"
    },
    'action-sell-stone': {
      title: "Trade Stone",
      desc: "Their towers need foundations they don't want to build themselves.",
      effect: "+8 Shards"
    },
    'action-work': {
      title: "Clear Paths",
      desc: "Clean the walking trails. No one but you uses the ground.",
      effect: "+1 Labor, +12 Shards"
    },
    'npc-baker': {
      title: "Baker",
      desc: "Baker: \"I often forget how far the forest is on foot.\"",
      effect: "+1 Rep (Baker)"
    },
    'npc-flowerGirl': {
      title: "Flower Girl",
      desc: "She gathers flowers she couldn't reach in flight.",
      effect: "+1 Rep (Bloom)",
      unlocks: "Unlocks: 'Blacksmith'"
    },
    'npc-artisan': {
      title: "Artisan",
      desc: "Artisan: \"You create order on the ground? I like that.\"",
      effect: "Teaches toolmaking",
      unlocks: "Recipes: 'Axe', 'Pickaxe'"
    },
    'npc-teacher': {
      title: "Teacher",
      desc: "He teaches the history of those who forgot the ground.",
      effect: "+1 Rep (Knowledge)"
    },
    'npc-townHall': {
      title: "Town Hall",
      desc: "Bureaucracy and land deeds. This is where life is regulated.",
      effect: "Unlocks bureaucracy",
      unlocks: "Allows House Building"
    },
    'npc-blacksmith': {
      title: "Blacksmith",
      desc: "Pounding metal on the anvil. He gives your tools power.",
      effect: "Unlocks metalworking"
    },
    'npc-sage': {
      title: "Old Sage",
      desc: "\"You touch the earth... you have true power, wanderer.\"",
      effect: "Gifts a book of knowledge",
      unlocks: "Action: 'Study'"
    },
    'npc-hunter': {
      title: "Hunter",
      desc: "A silent man with scars on his arms. He knows the forests.",
      effect: "Teaches archery and hunting",
      unlocks: "Recipes: 'Bow', Action: 'Hunt'"
    },
    'action-hunt': {
      title: "Hunt",
      desc: "Go deep into the forest and search for game. Your bow sings when you shoot.",
      effect: "+2 Meat"
    },
    'action-sell-meat': {
      title: "Sell Meat",
      desc: "Fresh meat is in high demand in the village, as few hunt on the ground.",
      effect: "+15 Shards"
    },
    'action-buy-meat': {
      title: "Buy Meat",
      desc: "Buy supplies from the hunter when your luck in the forest fails.",
      effect: "+1 Meat"
    },
    'craft-wanderstock': {
        title: "Walking Stick",
        desc: "A solid ash stick. It carries your burden on long journeys.",
        effect: "+0.5 Wood yield"
    },
    'craft-axe': {
        title: "Stone Axe",
        desc: "A sturdy tool. Not pretty, but sharp enough.",
        effect: "Increases wood yield"
    },
    'craft-pickaxe': {
        title: "Pickaxe",
        desc: "Strike the stones with it. The metal sings.",
        effect: "Increases stone yield"
    },
    'craft-bed': {
        title: "Bed",
        desc: "A soft place to sleep. Much better than bare earth.",
        effect: "Strong recovery (+25)"
    },
    'craft-chair': {
        title: "Chair",
        desc: "Sit comfortably while reading. Increases concentration.",
        effect: "Doubles study yield (+10 MS)"
    },
    'craft-stove': {
        title: "Stove",
        desc: "A cast-iron stove. It warms the hut and cooks your berries.",
        effect: "Doubles berry recovery"
    },
    'craft-bow': {
        title: "Hunting Bow",
        desc: "A light but stable bow. Perfect for the ground.",
        effect: "Allows Hunting"
    },
    'house-campfire': {
        title: "Campfire",
        desc: "The fire drives away the shadows of passing wings.",
        effect: "+10 Recovery",
        unlocks: "Village NPC: 'Flower Girl'"
    },
    'house-tent': {
        title: "Tent",
        desc: "Your first real roof. A refuge from the wind.",
        effect: "More space",
        unlocks: "Village NPC: 'Town Hall', Storage Options"
    },
    'house-wood-storage': {
        title: "Wood Storage",
        desc: "A dry place for more supplies.",
        effect: "+10 Max Wood",
        unlocks: "Village NPC: 'Artisan'"
    },
    'house-stone-storage': {
        title: "Stone Storage",
        desc: "A stable foundation for your growing realm.",
        effect: "+10 Max Stone",
        unlocks: "Village NPC: 'Artisan'"
    },
    'house-table': {
        title: "Sturdy Table",
        desc: "A place to work and study your books.",
        effect: "Enables Study",
        unlocks: "Village NPC: 'Old Sage'"
    },
    'craft-bookshelf': {
        title: "Bookshelf",
        desc: "A place for collected knowledge. Increases focus while studying.",
        effect: "+5 Magic while studying"
    },
    'house-build': {
        title: "Build Hut",
        desc: "Your hut stands firm on the ground. A monument to your will.",
        effect: "Permanent Base (+50 capacity)",
        unlocks: "Furniture: 'Massive Table'"
    }
  },
  logs: {
    save_success: "Game saved successfully.",
    load_success: "Game loaded successfully.",
    study_success: "Your knowledge grows through concentration (+{gain} Magic Limit).",
    sage_gift: "The Sage gifts you an old book full of symbols.",
    // Action Logs
    eat_log: "Berries eaten. +{gain} Satiation.",
    rest_log: "Rested. +{gain} Energy.",
    meditate_log: "Meditated. +15 Magic.",
    wood_log: "{gain} twigs gathered.",
    wood_axe_log: "{gain} wood chopped.",
    stone_log: "{gain} pebbles gathered.",
    stone_axe_log: "{gain} stones quarried.",
    sell_wood_log: "Wood traded. +5 Shards.",
    sell_stone_log: "Stone traded. +8 Shards.",
    work_log: "Paths cleared. +12 Shards.",
    // Crafting Logs
    craft_wanderstock: "Walking stick carved.",
    craft_axe: "Stone axe crafted.",
    craft_pickaxe: "Pickaxe crafted.",
    craft_bed: "Bed built.",
    craft_chair: "Chair crafted.",
    // NPC Logs
    npc_baker: "Baker: \"Nice to see you again.\"",
    npc_flowerGirl: "Flower Girl smiles and presses a blossom into your hand.",
    npc_artisan: "Artisan: \"You're doing well. Keep it up.\"",
    npc_teacher: "Teacher explains the history of the village to you.",
    npc_townHall: "Town Hall clerk stamps another application.",
    npc_blacksmith: "Blacksmith: \"Come back when you need metal.\"",
    npc_sage: "Old Sage nods slowly and closes his eyes.",
    // Milestones
    milestone_campfire: "Campfire lit. The warmth drives away the cold of night.",
    milestone_tent: "Tent pitched. Your first real roof over your head.",
    milestone_wood_storage: "Wood storage built. +10 maximum wood.",
    milestone_stone_storage: "Stone storage built. +10 maximum stone.",
    milestone_table: "Massive table placed. A place of learning.",
    milestone_house: "Hut built. A monument to your will on the ground.",
    npc_hunter: "Hunter: \"Hear that? That's the forest breathing.\"",
    npc_hunter_bow: "Hunter: \"You have talent. Here, that's how you build a bow.\"",
    npc_hunter_final: "Hunter: \"Take my old hunting spot. The forests are yours.\"",
    hunt_log: "Hunt successful. +{gain} Meat.",
    sell_meat_log: "Meat sold. +15 Shards.",
    buy_meat_log: "Bought meat from the hunter. +1 meat.",
    craft_stove: "Stove installed in the hut.",
    craft_bow: "Hunting bow finished.",
    craft_bookshelf: "Bookshelf set up.",
    // Intro
    intro_1: "Someone glides effortlessly from roof to roof above you.",
    intro_2: "You walk the long way on foot. Your steps are heavy.",
    intro_3: "A trader lands before the village gate. He doesn't notice you.",
    intro_4: "Rain sets in. The others shake out their wings and fly home.",
    intro_5: "You stay below. You miss something you never had...",
    intro_6: "But here, at the edge of the village, you will build a life.",
    intro_7: "Welcome to your new home.",
    // Failures
    fail_energy: "Too exhausted.",
    fail_magic: "Not enough magic.",
    fail_resources: "Not enough resources.",
    fail_full_wood: "Wood storage full.",
    fail_full_stone: "Stone storage full.",
    fail_full_meat: "Meat storage full.",
    fail_full_shards: "Wallet full (Max Shards).",
    fail_salary: "Not enough Shards for salary! Work stopped."
  },
  atmosphere: [
    "A distant wingbeat echoes through the silence.",
    "Shadows pull across the ground, cast by those who fly.",
    "You feel the solid ground beneath your feet. It gives you stability.",
    "The wind carries down the laughter of those who inhabit the sky.",
    "Wildflowers by the wayside remind you that beauty can grow on the ground too."
  ]
};
