export default {
  ui: {
    nav_story: "Main",
    nav_crafting: "Crafting",
    nav_housing: "Building & Housing",
    nav_inventory: "Assets",
    nav_village: "Village",
    cat_gather: "Gather",
    cat_eat: "Food & Care",
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
    ui_herbs: "Herbs",
    ui_meat: "Meat",
    ui_satiation: "Satiation",
    ui_buff_active: "Active Buff",
    ui_buff_actions: "Actions left",
    ui_details: "Details",
    ui_ready: "Ready",
    ui_need: "Requires",
    ui_base: "Base",
    ui_no_shelter: "No Shelter",
    ui_extensions: "Extensions",
    ui_placeholder: "Wanderer...",
    ui_placeholder_desc: "Choose an action to learn more.",
    inv_empty: "Nothing here yet.",
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
    btn_reset: "🗑️ Reset all Progress",
    intro_welcome: "Welcome back to solid ground."
  },
  actions: {
    'action-essen': {
      title: "Eat Berries",
      desc: "Gather wild berries from the ground. They barely fill your belly, but better than nothing.",
      effect: "+15 Satiation"
    },
    'action-herbs': {
      title: "Gather Herbs",
      desc: "Search for edible herbs in the undergrowth. They smell of damp earth.",
      effect: "+1 Herbs"
    },
    'action-eat-meat': {
      title: "Eat Meat",
      desc: "Roasted meat from the fire — one of the few things that truly satisfies.",
      effect: "Full Satiation + Buff (with Stove)"
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
    'trade-buy-wood': {
      title: "Buy Wood",
      desc: "The trader brought some pristine wood from the peaks.",
      effect: "-10 Shards, +1 Wood"
    },
    'trade-buy-book': {
      title: "Book of Knowledge",
      desc: "Ancient wisdom from the archives. Hard to grasp, but invaluable.",
      effect: "-50 Shards, Allows Study"
    },
    'action-work': {
      title: "Clear Paths",
      desc: "Clean the walking trails. No one but you uses the ground.",
      effect: "+1 Labor, +12 Shards"
    },
    'npc-baker': {
      title: "Baker",
      dialogues: [
        "Baker: \"A wanderer? You look dusty. Here, take a crumb.\"",
        "Baker: \"We live up high so the dirt doesn't reach us.\"",
        "Baker: \"But I see you like the ground. It makes you strong.\"",
        "Baker: \"I'll put in a good word for you with the council.\"",
        "Baker: \"I often forget how far the forest is on foot. Take care.\""
      ],
      effect: "+1 Rep (Baker)"
    },
    'npc-flowerGirl': {
      title: "Flower Girl",
      dialogues: [
        "Girl: \"Oh! Who are you? Did you fall from the sky?\"",
        "Girl: \"There are flowers down there? Will you show them to me?\"",
        "Girl: \"I usually only gather the ones that grow up high.\"",
        "Girl: \"You have calloused hands... but you're kind.\"",
        "Girl: \"I'll tell the blacksmith about everything you carry!\""
      ],
      effect: "+1 Rep (Bloom)",
      unlocks: "Unlocks: 'Blacksmith'"
    },
    'npc-artisan': {
      title: "Artisan",
      dialogues: [
        "Artisan: \"Hmph. Your tools are primitive.\"",
        "Artisan: \"Wood and stone... lacking any sharpness.\"",
        "Artisan: \"You create order on the ground? I like that. Let me show you something.\""
      ],
      effect: "Teaches toolmaking",
      unlocks: "Recipes: 'Axe', 'Pickaxe'"
    },
    'npc-teacher': {
      title: "Teacher",
      dialogues: [
        "Teacher: \"Why do you stir up the dirt?\"",
        "Teacher: \"Don't you know the ground belongs to the past?\"",
        "Teacher: \"There was someone once... a hunter who loved the ground too. You should find him.\""
      ],
      effect: "Broadens your horizon",
      unlocks: "Village NPC: 'Hunter'"
    },
    'npc-hunter': {
      title: "Hunter",
      dialogues: [
        "Hunter: \"Stay quiet. They can hear us from above.\"",
        "Hunter: \"You have strong arms, wanderer. But you lack reach.\"",
        "Hunter: \"Take this knowledge. Build a weapon from the woods.\"",
        "Hunter: \"When your bow is strung, I'll teach you to hunt.\""
      ],
      effect: "Teaches Ranged Weapons",
      unlocks: "Recipe: 'Bow'"
    },
    'npc-townHall': {
      title: "Town Hall",
      dialogues: [
        "Clerk: \"Name? Origin? ...You live DOWN THERE?!\"",
        "Clerk: \"That violates Paragraph four, Section two!\"",
        "Clerk: \"We need to issue a special permit.\"",
        "Clerk: \"You are persistent. I like paperwork.\"",
        "Clerk: \"Here. Your official land deed for the ground.\""
      ],
      effect: "Unlocks bureaucracy",
      unlocks: "Allows House Building"
    },
    'npc-blacksmith': {
      title: "Blacksmith",
      dialogues: [
        "Blacksmith: \"The girl says you need help.\"",
        "Blacksmith: \"Show me your axe. Pah, blunt stone!\"",
        "Blacksmith: \"Fire needs air. Forging needs heat.\"",
        "Blacksmith: \"Your will is like iron. It can be shaped.\"",
        "Blacksmith: \"Come back when you are strong enough.\""
      ],
      effect: "Unlocks metalworking"
    },
    'npc-sage': {
      title: "Old Sage",
      dialogues: [
        "Sage: \"You touch the earth... you have true power, wanderer. Take this.\""
      ],
      effect: "Gifts an Amulet of Vitality",
      unlocks: "Boundless endurance"
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
    'craft-bow': {
        title: "Bow",
        desc: "Strung from strong ash wood. Allows you to take down wild game from afar.",
        effect: "Allows Hunting",
        emoji: "🏹"
    },
    'book': {
        title: "Book of Knowledge",
        desc: "Pages filled with wisdom from ages past. Your table can hold only so many.",
        effect: "+2 Max Magic when Studying",
        emoji: "📖"
    },
    'Official Land Deed': {
        title: "Land Deed",
        desc: "A sealed document from the Town Hall. It grants you the right to build on this ground.",
        effect: "Enables House Building",
        emoji: "📜"
    },
    'Amulet of Vitality': {
        title: "Amulet of Vitality",
        desc: "An ancient, glowing amulet. Handed to you by the Sage as recognition of your efforts.",
        effect: "+50 Max Energy",
        emoji: "💚"
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
        desc: "A place to work and study your books. Extends your room.",
        effect: "Provides space for books",
        unlocks: "Knowledge, 'Bookcase'"
    },
    'house-build': {
        title: "Build Hut",
        desc: "Your hut stands firm on the ground. A monument to your will.",
        effect: "Permanent Base (+50 capacity)",
        unlocks: "Crafting Furniture ('Chair', 'Bed')"
    },
    'house-bookcase': {
        title: "Bookcase",
        desc: "This noble structure provides room for all the texts you collect.",
        effect: "+15 Max Magic",
        unlocks: "Bonus when studying"
    },
    'house-stove': {
        title: "Stove",
        desc: "A simple stone stove. It just needs a roof above it and gives purpose to cooking.",
        effect: "Unlocks Cooking",
        unlocks: "Eat meat with Buff"
    }
  },
  logs: {
    save_success: "Game saved successfully.",
    load_success: "Game loaded successfully.",
    study_success: "Your knowledge grows through concentration (+{gain} Magic Limit).",
    sage_gift: "The Sage blesses you with an amulet full of life force (+50 Max Energy).",
    // Action Logs
    eat_log: "Berries eaten. Satiation +15.",
    herbs_log: "Herbs found. +1 Herbs.",
    eat_meat_log: "Meat eaten. Satiation full.",
    eat_meat_buff_log: "Meat eaten. Satiation full. Bonus active for 5 actions!",
    rest_log: "Rested. +{gain} Energy.",
    meditate_log: "Meditated. +15 Magic.",
    wood_log: "{gain} twigs gathered.",
    wood_axe_log: "{gain} wood chopped.",
    stone_log: "{gain} pebbles gathered.",
    stone_axe_log: "{gain} stones quarried.",
    sell_wood_log: "Wood traded. +5 Shards.",
    sell_stone_log: "Stone traded. +8 Shards.",
    buy_wood_log: "Wood purchased from trader. -10 Shards.",
    buy_book_log: "Acquired ancient book. The knowledge feels heavy (-50 Shards).",
    work_log: "Paths cleared. +12 Shards.",
    // Crafting Logs
    craft_wanderstock: "Walking stick carved.",
    craft_axe: "Stone axe crafted.",
    craft_pickaxe: "Pickaxe crafted.",
    craft_bow: "Bow strung and finished.",
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
    milestone_table: "Massive table placed. A foundation for new knowledge.",
    milestone_house: "Hut built. Now you must furnish it.",
    milestone_bookcase: "Bookcase crafted. Your thoughts find more room (+15 Max Magic).",
    milestone_stove: "Stove set up. The fire crackles. Now you can cook properly.",
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
