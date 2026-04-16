export default {
  ui: {
    nav_story: "Main",
    nav_crafting: "Crafting",
    nav_housing: "Construction",
    nav_inventory: "Possessions",
    nav_village: "Village",
    cat_gather: "Gather",
    cat_trade: "Trade",
    cat_work: "Work",
    cat_crafting: "Handicraft & Studies",
    cat_housing: "Construction & Storage",
    cat_inventory: "Possessions & Items",
    cat_village: "The Village",
    cat_log: "Chronicle",
    cat_log_enhanced: "Chronicle",
    ui_source_world: "Draconia",
    ui_empty_story: "Your story has just begun. Make meaningful choices to fill these pages.",
    nav_story_tab: "Story",
    nav_traits: "Titles & Traits",
    nav_story_tab_header: "Your Story",
    nav_traits_tab_header: "Your Accomplishments",
    ui_vitality: "Resources",
    ui_shards: "Soul Shards",
    ui_wood: "Wood",
    ui_stone: "Stone",
    ui_meat: "Meat",
    ui_water: "Water",
    ui_nature: "Nature & Knowledge",
    ui_books: "Books",
    ui_materials: "Materials",
    ui_mixed: "Materials",
    ui_provisions: "Provisions",
    ui_knowledge: "Knowledge",
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
    settings_scale: "UI Scaling",
    settings_scale_auto: "Auto-Fit",
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
    crafting_desc: "Transform collected materials into useful tools or deepen your knowledge of the ground.",
    housing_desc: "Build a permanent home at the edge of the village and take root in the community.",
    inventory_desc: "Manage your collected treasures and use provisions for your further travels.",
    traits_desc: "Your actions on the ground define who you are. Unlock titles that honor your heritage.",
    chronicle_desc: "The records of your life on the ground. Every action leaves a trace in history.",
    nav_story_desc: "Your daily survival actions: Gather, Trade and Work.",
    nav_crafting_desc: "Here you can process materials, build tools or study new knowledge.",
    nav_inventory_desc: "Your collected items and equipment. Some can be consumed.",
    nav_traits_desc: "Special titles earned through your deeds. They provide permanent bonuses.",
    nav_village_desc: "Visit the inhabitants of Draconia to hear their stories and get help.",
    nav_chronicle_desc: "A detailed log of your journey on the ground so far.",
    nav_gather_desc: "Gather materials from the ground. Higher tool levels increase your yield significantly.",
    nav_trade_desc: "Trade surplus materials for Soul Shards. The market is the heart of your economy.",
    nav_work_desc: "Clean the paths of Draconia for the inhabitants. A demanding but safe way to earn shards.",
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
    ui_use: "Use",
    ui_inventory_empty: "Your inventory is currently empty.",
    ui_salary: "Cost",
    ui_yield: "Yield",
    ui_load_at: "Loaded at",
    status_working: "Busy",
    status_idle: "Idle",
    menu_continue: "Continue",
    menu_new_game: "New Game",
    menu_version: "v1.0.0 - Draconia Edition",
    finale_title: "The Heart of Draconia",
    finale_congrats: "Congratulations! You have reached the end of the demo.",
    finale_hint: "You can continue living on the ground in this save (Sandbox), but the story ends here for now.",
    finale_stats: "Your journey in numbers:",
    btn_continue_sandbox: "Continue"
  },
  actions: {
    'action-essen': {
      title: "Eat Berries",
      desc: "Gather wild berries from the ground. They taste of earth and power.",
      effect: "+{sGain} Satiation, +{eGain} Energy"
    },
    'action-ausruhen': {
      title: "Rest",
      desc: "Close your eyes and listen to the distant beating of wings.",
      effect: "+{val} Energy"
    },
    'action-meditieren': {
      title: "Focusing",
      desc: "You look up. Their shadows cast questions on your heart, but you focus on your inner magic.",
      effect: "+{val} Magic"
    },
    'action-study': {
      title: "Study",
      desc: "Immerse yourself in old books on your massive table.",
      effect: "+{val} Magic Limit"
    },
    'action-wood': {
      title: "Gather Twigs",
      title_alt: "Chop Wood",
      desc: "Laboriously gather fallen branches from the forest floor.",
      desc_alt: "Use your axe to chop healthy wood from the trees.",
      effect: "+{val} Wood"
    },
    'action-stone': {
      title: "Gather Pebbles",
      title_alt: "Quarry Stones",
      desc: "Search for usable pebbles in the stream bed.",
      desc_alt: "Shatter rocks with your pickaxe for high-quality material.",
      effect: "+{val} Stone"
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
      effect: "+12 Shards"
    },
    'npc-baker': {
      title: "Baker",
      desc: "Baker: \"I need fresh wood for my oven to bake the best bread in Draconia.\"",
      effect: "Builds Bond"
    },
    'npc-flowerGirl': {
      title: "Flower Girl",
      desc: "She collects flowers she could never reach while flying.",
      effect: "Bloom Bond",
      unlocks: "Enables: 'Blacksmith'"
    },
    'npc-artisan': {
      title: "Artisan",
      desc: "Artisan: \"You create order on the ground? I like that.\"",
      effect: "Teaches Toolmaking",
      unlocks: "Recipes: 'Axe', 'Pickaxe'"
    },
    'npc-teacher': {
      title: "Teacher",
      desc: "He teaches the history of those who forgot the ground.",
      effect: "Knowledge Exchange",
      unlocks: "Preparation for the Finale"
    },
    'npc-townHall': {
      title: "Town Hall",
      desc: "Bureaucracy and land deeds. This is where life is regulated.",
      effect: "Unlocks Bureaucracy",
      unlocks: "Enables House Building"
    },
    'npc-blacksmith': {
      title: "Blacksmith",
      desc: "Forging metal on the anvil. He gives power to your tools.",
      effect: "Unlocks Metalworking"
    },
    'npc-sage': {
      title: "Old Sage",
      desc: "\"You touch the earth... you have true power, wanderer.\"",
      effect: "Gifts a Book of Knowledge",
      unlocks: "The Path to the Heart of the World"
    },
    'npc-hunter': {
      title: "Hunter",
      desc: "A silent man with scars on his arms. He knows the forests.",
      effect: "Teaches Bowmaking and Hunting",
      unlocks: "Recipes: 'Bow', Action: 'Hunt'"
    },
    'npc-treeOfLife': {
      title: "Tree of Life",
      desc: "The majestic heart of the ground. This is where your search ends and your new life begins.",
      effect: "The Demo Finale"
    },
    'house-garden': {
      title: "Build Garden",
      desc: "A piece of fertile ground for plants and water sources.",
      effect: "Enables Water Collection"
    },
    'garden-water': {
      title: "Collect Water",
      desc: "Fresh spring water for the community.",
      effect: "+1 Water"
    },
    'action-hunt': {
      title: "Hunt",
      desc: "Go deep into the forest and search for game. Your bow sings when you shoot.",
      effect: "+{val} Meat"
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
        effect: "+1 Wood yield"
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
        unlocks: "Village NPC: 'Flower Girl', Next step: Tent"
    },
    'house-tent': {
        title: "Tent",
        desc: "Your first real roof. A refuge from the wind.",
        effect: "More space",
        unlocks: "Village NPC: 'Town Hall', Next step: Storage Options"
    },
    'house-wood-storage': {
        title: "Wood Storage",
        desc: "A dry place for more supplies.",
        effect: "+10 Max Wood",
        unlocks: "Village NPC: 'Artisan', Next step: Build Hut"
    },
    'house-stone-storage': {
        title: "Stone Storage",
        desc: "A stable foundation for your growing realm.",
        effect: "+10 Max Stone",
        unlocks: "Village NPC: 'Artisan', Next step: Build Hut"
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
        effect: "+5 Book capacity"
    },
    'craft-book': {
        title: "Scribe Book",
        desc: "Permanently record your findings. Each book increases the effectiveness of your studies.",
        effect: "+1 Book"
    },
    'house-build': {
        title: "Build Hut",
        desc: "Your hut stands firm on the ground. A monument to your will.",
        effect: "Permanent Base (+50 capacity)",
        unlocks: "Furniture: 'Massive Table', Next step: Garden"
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
    wood_log: "+{gain} Wood",
    wood_axe_log: "+{gain} Wood",
    stone_log: "+{gain} Stone",
    stone_axe_log: "+{gain} Stone",
    sell_wood_log: "Wood traded. +5 Soul Shards.",
    sell_stone_log: "Stone traded. +8 Soul Shards.",
    work_log: "Paths cleared. +12 Shards.",
    // Crafting Logs
    craft_wanderstock: "Walking stick carved.",
    craft_axe: "Stone axe crafted.",
    craft_pickaxe: "Pickaxe crafted.",
    craft_bed: "Bed built.",
    craft_chair: "Chair crafted.",
    // Milestones
    milestone_campfire: "Campfire lit. The warmth drives away the cold of night.",
    milestone_tent: "Tent pitched. Your first real roof over your head.",
    milestone_wood_storage: "Wood storage built. +10 maximum wood.",
    milestone_stone_storage: "Stone storage built. +10 maximum stone.",
    milestone_table: "Massive table set up. A place of knowledge.",
    milestone_house: "House built. A monument to your will on the ground.",
    milestone_garden: "Garden built. The earth begins to bloom under your hands.",
    npc_hunter: "Hunter: \"Hear that? That's the forest breathing.\"",
    npc_hunter_bow: "Hunter: \"You have talent. Here, that's how you build a bow.\"",
    npc_hunter_final: "Hunter: \"Take my old hunting spot. The forests are yours.\"",
    hunt_log: "Successfully hunted. +{gain} Meat.",
    water_gain: "Fresh water collected.",
    item_consumed: "Used {name}.",
    sell_meat_log: "Meat sold. +15 Shards.",
    buy_meat_log: "Bought meat from the hunter. +1 meat.",
    craft_stove: "Stove installed in the hut.",
    craft_bow: "Hunting bow finished.",
    craft_bookshelf: "Bookshelf set up. You can now collect more knowledge.",
    craft_book: "Book scribed. Your mental horizons are expanding.",
    // Intro
    intro_1: "Above you, a magnificent Wind Dragon glides effortlessly from roof to roof.",
    intro_2: "You take the long way on foot. Your steps are heavy and earthbound.",
    intro_3: "Perhaps it is time to take root.",
    intro_4: "Rain sets in. The others shake out their wings – leather, feathers, scales – and fly home.",
    intro_5: "You stay below. You miss a connection you've never felt...",
    intro_6: "But here, at the edge of the village, you will build a life.",
    intro_7: "Welcome to your new home, you wingless mystery. A dragon without a dragon form...",
    // Ellie Tutorial
    tutorial_ellie_1: "Whoa! Where did you come from? You look... stuck to the ground.",
    tutorial_ellie_2: "I'm Ellie. And what do they call you, little wanderer?",
    tutorial_ellie_3: "Nice to meet you, {name}. Starting a new life far from Luxana? That's brave. But you look exhausted... almost as if something is draining your strength.",
    tutorial_ellie_4: "Your wings... they look heavy, motionless. You won't survive long out here if you lack strength. Keep a close eye on your Energy and Satiation!",
    tutorial_ellie_5: "Let's see if your claws are still good for something. Go gather a few branches over there. Wood is the beginning of everything here.",
    tutorial_ellie_6: "Good work. A warm fire would help you regain your strength. You need to stand firm before you try to fly.",
    tutorial_ellie_7: "You can't sleep on bare stone forever. Check out the Crafting tab as soon as you have enough materials. A proper house protects you from the cold shadows.",
    tutorial_ellie_8: "And down there... the village. You'll find companions there. Maybe they can help you understand what happened to your wings.",
    tutorial_ellie_9: "Try it on your own first. And if you're really stuck... well, then there's always the long journey to the Caldera to ask the Emperor and Empress. But that's a story for another day. Good luck!",
    // NPC Dialogues
    npc_baker_1: "Baker: \"Welcome. Without wood for my fire, there would be no bread here. Do you have some today?\"",
    npc_baker_2: "Baker: \"You're a hard worker. The scent of fresh bread is much more intense on the ground, don't you think?\"",
    npc_baker_3: "Baker: \"The traders above often forget that grain grows on the earth, not in the clouds.\"",
    npc_baker_4: "Baker: \"I baked a loaf specifically for you today. It strengthens the mind for long journeys.\"",
    npc_baker_5: "Baker: \"You're part of this community now. Let's enrich the village together.\"",
    npc_flowerGirl_1: "Flower Girl: \"Oh... hello. Please... be careful where you step. The buds are delicate.\"",
    npc_flowerGirl_2: "Flower Girl: \"This flower only blooms at night. It glows like the heart of Draconia.\"",
    npc_flowerGirl_3: "Flower Girl: \"Did you know that roots hold the islands together? Just as trust holds us.\"",
    npc_flowerGirl_4: "Flower Girl: \"I feel safer on the ground when you're nearby. You have no wings, but strong shoulders.\"",
    npc_flowerGirl_5: "Flower Girl: \"Let's plant a garden that reaches to the horizon. I'll help you.\"",
    npc_artisan_1: "Artisan: \"Order on the ground? A rare sight in this time of flying haste.\"",
    npc_artisan_2: "Artisan: \"Your tools speak of hard work. You respect the material.\"",
    npc_artisan_3: "Artisan: \"Good work requires patience. I'll show you how to truly tame the stone.\"",
    npc_teacher_1: "Teacher: \"Look down. Beneath us boils the endless sea of lava. Only the magic of these chains keeps Draconia from sinking into the fire.\"",
    npc_teacher_2: "Teacher: \"A dragon without a dragon form... others call it a disability, a fate for cripples. I call it an opportunity to see the world from a perspective hidden from the sky.\"",
    npc_teacher_3: "Teacher: \"Your inner magic is like the rain of Draconia – it must flow. A full stomach is your anchor; when your body is nourished, your magic works most efficiently.\"",
    npc_teacher_4: "Teacher: \"The ancestors knew that true strength comes from the connection to the deep. Study and knowledge are your true wings, even if they remain invisible to the eye.\"",
    npc_teacher_5: "Teacher: \"It is time. The roots of the Tree of Life are calling. There, deep in the heart of the island, lies the answer to the silence in your blood.\"",
    npc_townHall_1: "Official: \"Another application? The pile isn't getting any smaller. Come back later... or wait.\"",
    npc_townHall_2: "Official: \"Your file is... incomplete. A dragon without a dragon form. A cripple of the ground? Tragic, but we still need those taxes.\"",
    npc_townHall_3: "Official: \"I acknowledge your efforts. Stability on the ground benefits the whole village.\"",
    npc_townHall_4: "Official: \"Almost there. The wheels of bureaucracy turn slowly, but they turn for you.\"",
    npc_townHall_5: "Official: \"Here is your official land deed. You have earned your place on this island.\"",
    npc_blacksmith_1: "Blacksmith: \"Metal never lies. It's either strong or it breaks under the hammer.\"",
    npc_blacksmith_2: "Blacksmith: \"The fire on the ground burns hotter than in the clouds, wanderer. Remember that.\"",
    npc_blacksmith_3: "Blacksmith: \"Good strike. You have strength in your arms, even without wings.\"",
    npc_blacksmith_4: "Blacksmith: \"I'll show you how to tame the iron. It takes will, not flight.\"",
    npc_blacksmith_5: "Blacksmith: \"At the anvil, we are all equal. Let's strengthen the village together.\"",
    npc_sage_1: "Old Sage: \"Your origin is a mystery, wanderer. That your true form is withheld from you must have a reason. Take this book.\"",
    npc_sage_2: "Old Sage: \"Your magic begins to flow. The ground acknowledges you and nourishes your mind.\"",
    npc_sage_3: "Old Sage: \"Do you feel the tremor? That is the heart of Draconia beating beneath your feet.\"",
    npc_sage_4: "Old Sage: \"You have reached maturity. The path to the heart of the world reveals itself only to those without wings.\"",
    npc_sage_5: "Old Sage: \"Go now. The Tree of Life waits in the forest of ancestors. It is the beginning and the end of your journey.\"",
    npc_treeOfLife_1: "Tree of Life: \"Welcome, wanderer. Your wings have grown not from feathers or scales, but from loyalty to the ground. Here your searching ends – and your place in this world is secured forever.\"",
    npc_hunter_1: "Hunter: \"The forest is watching you. Stay quiet if you want to survive.\"",
    npc_hunter_2: "Hunter: \"Your step has become surer. You're beginning to hear the breath of the earth.\"",
    npc_hunter_3: "Hunter: \"Here, take this bow. It will be your voice in the thicket, if you respect it.\"",
    npc_hunter_4: "Hunter: \"Never waste a life. The ground gives us everything, but it takes back as well.\"",
    npc_hunter_5: "Hunter: \"The shadows belong to both of us now. I hunt by your side, companion.\"",
    // Failures
    fail_energy: "Too exhausted.",
    fail_magic: "Not enough magic.",
    fail_resources: "Not enough resources.",
    fail_full_wood: "Wood storage full.",
    fail_full_stone: "Stone storage full.",
    fail_full_meat: "Meat storage full.",
    fail_full_shards: "Wallet full (Max Shards).",
    fail_salary: "Not enough Shards for salary! Work stopped.",
    log_trait_unlocked: "TITLE UNLOCKED: {title}!",
    particle_new_trait: "NEW TITLE: {title}"
  },
  traits: {
    woodcutter: {
      title: "Woodcutter",
      desc: "You have learned the rhythm of the forest.",
      bonus: "+10% Wood Yield"
    },
    prospector: {
      title: "Prospector",
      desc: "Every crack in the stone tells you where to strike.",
      bonus: "+10% Stone Yield"
    },
    meditator: {
      title: "High-Seeker",
      desc: "The sky is no longer just a void to you.",
      bonus: "+20% Magic Gain"
    },
    survivor: {
      title: "Ground Survivor",
      desc: "Berries and wild roots are your allies.",
      bonus: "Satiation drops 15% slower"
    },
    merchant: {
      title: "Shard Merchant",
      desc: "You know exactly what they value up there.",
      bonus: "+5% Shards from Trading"
    }
  },
  atmosphere: [
    "A distant wingbeat echoes through the silence.",
    "Shadows pull across the ground, cast by those who fly.",
    "You feel the solid ground beneath your feet. It gives you stability.",
    "The wind carries down the laughter of those who inhabit the sky.",
    "Wildflowers by the wayside remind you that beauty can grow on the ground too."
  ]
};
