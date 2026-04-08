export default {
  ui: {
    nav_story: "Story",
    nav_crafting: "Crafting",
    nav_housing: "Building & Housing",
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
    ui_vitality: "Vitality",
    ui_shards: "Shards",
    ui_wood: "Wood",
    ui_stone: "Stone",
    ui_details: "Details",
    ui_ready: "Ready",
    ui_need: "Requires",
    settings_title: "Settings",
    settings_lang: "Language / Sprache",
    settings_name: "Player Name",
    village_desc: "Speak with the inhabitants to learn more.",
    save_at: "Saved: ",
    save_never: "Last saved: Never",
    btn_save: "Save",
    btn_load: "Load",
    btn_quit: "Quit",
    btn_back: "Back",
    intro_welcome: "Welcome back to solid ground."
  },
  actions: {
    'action-essen': {
      title: "Eat Berries",
      desc: "Gather wild berries from the ground. They taste of earth and power.",
      effect: "+5 Energy"
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
        title: "Scholar's Chair",
        desc: "Sit comfortably while reading. Increases concentration.",
        effect: "Doubles study yield (+10 MS)"
    },
    'house-campfire': {
        title: "Campfire",
        desc: "The fire drives away the shadows of passing wings.",
        effect: "+10 Recovery",
        unlocks: "Village NPC: 'Flower Girl'"
    },
    'house-tent': {
        title: "Canvas Tent",
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
        title: "Massive Table",
        desc: "A place to work and study your books.",
        effect: "Allows studying",
        unlocks: "Village NPC: 'Old Sage'"
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
    intro_1: "Someone glides effortlessly from roof to roof above you.",
    intro_2: "You walk the long way on foot. Your steps are heavy.",
    intro_3: "A trader lands before the village gate. He doesn't notice you.",
    intro_4: "Rain sets in. The others shake out their wings and fly home.",
    intro_5: "You stay below. You miss something you never had...",
    intro_6: "But here, at the edge of the village, you will build a life.",
    intro_7: "Welcome to your new home."
  },
  atmosphere: [
    "A distant wingbeat echoes through the silence.",
    "Shadows pull across the ground, cast by those who fly.",
    "You feel the solid ground beneath your feet. It gives you stability.",
    "The wind carries down the laughter of those who inhabit the sky.",
    "Wildflowers by the wayside remind you that beauty can grow on the ground too."
  ]
};
