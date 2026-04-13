export default {
  ui: {
    nav_story: "Story",
    nav_crafting: "Crafting",
    nav_housing: "Bau & Housing",
    nav_inventory: "Besitz",
    nav_village: "Dorf",
    cat_gather: "Sammeln",
    cat_trade: "Handel",
    cat_work: "Arbeit",
    cat_crafting: "Handwerk & Studium",
    cat_housing: "Hausbau & Lager",
    cat_inventory: "Besitz & Gegenstände",
    cat_village: "Das Dorf",
    cat_log: "Chronik",
    ui_vitality: "Vitalität",
    ui_shards: "Splitter",
    ui_wood: "Holz",
    ui_stone: "Stein",
    ui_details: "Details",
    ui_energy: "Energie",
    ui_magic: "Magie",
    ui_unlocks: "Schaltet frei:",
    ui_ready: "Bereit",
    ui_need: "Benötigt",
    ui_base: "Basis",
    ui_no_shelter: "Kein Lager",
    ui_placeholder: "Wanderer...",
    ui_placeholder_desc: "Wähle eine Handlung aus, um mehr zu erfahren.",
    settings_title: "Einstellungen",
    settings_lang: "Sprache / Language",
    settings_name: "Spieler Name",
    village_desc: "Spreche mit den Bewohnern, um von ihrem Wissen zu profitieren.",
    save_at: "Gespeichert: ",
    save_never: "Zuletzt gespeichert: Nie",
    btn_save: "Speichern",
    btn_load: "Laden",
    btn_quit: "Beenden",
    btn_back: "Zurück",
    intro_welcome: "Willkommen zurück auf festem Boden."
  },
  actions: {
    'action-essen': {
      title: "Beeren essen",
      desc: "Wilde Beeren vom Boden sammeln. Sie schmecken nach Erde und Kraft.",
      effect: "+5 Energie"
    },
    'action-ausruhen': {
      title: "Ausruhen",
      desc: "Du schließt die Augen und lauschst dem fernen Schlagen von Schwingen.",
      effect: "+10-50 Energie (Boni durch Betten/Feuer)"
    },
    'action-meditieren': {
      title: "Blick nach oben",
      desc: "Blicke zum Himmel. Ihre Schatten werfen Fragen auf dein Herz.",
      effect: "+15 Magie"
    },
    'action-study': {
      title: "Studieren",
      desc: "Vertiefe dich in die alten Bücher auf deinem massiven Tisch.",
      effect: "+5 Magie-Limit (+10 mit Stuhl)"
    },
    'action-wood': {
      title: "Zweige sammeln",
      title_alt: "Holz schlagen",
      desc: "Sammle mühsam herabgefallene Zweige vom Waldboden.",
      desc_alt: "Nutze deine Axt, um gesundes Holz von den Bäumen zu schlagen.",
      effect: "+1-2.5 Holz"
    },
    'action-stone': {
      title: "Kiesel sammeln",
      title_alt: "Steine klopfen",
      desc: "Suche nach brauchbaren Kieseln im Bachbett.",
      desc_alt: "Zertrümmere Felsen mit deiner Spitzhacke für hochwertiges Material.",
      effect: "+1-2 Stein"
    },
    'action-sell-wood': {
      title: "Holz tauschen",
      desc: "Bringe Holz zum Dorfmarkt. Sie brauchen es für ihre Nester.",
      effect: "+5 Splitter"
    },
    'action-sell-stone': {
      title: "Stein tauschen",
      desc: "Ihre Türme brauchen Fundamente, die sie selbst nicht bauen wollen.",
      effect: "+8 Splitter"
    },
    'action-work': {
      title: "Pfade säubern",
      desc: "Säubere die Wanderwege. Niemand außer dir nutzt den Boden.",
      effect: "+1 Arbeit, +12 Splitter"
    },
    'npc-baker': {
      title: "Bäcker",
      desc: "Bäcker: \"Ich vergesse oft, wie weit der Wald zu Fuß ist.\"",
      effect: "+1 Ruf (Bäcker)"
    },
    'npc-flowerGirl': {
      title: "Blumenmädchen",
      desc: "Sie sammelt Blumen, die sie im Flug nicht erreichen könnte.",
      effect: "+1 Ruf (Blüte)",
      unlocks: "Ermöglicht: 'Schmied'"
    },
    'npc-artisan': {
      title: "Handwerker",
      desc: "Handwerker: \"Du schaffst Ordnung am Boden? Das gefällt mir.\"",
      effect: "Lehrt Werkzeugbau",
      unlocks: "Rezepte: 'Axt', 'Spitzhacke'"
    },
    'npc-teacher': {
      title: "Lehrer",
      desc: "Er lehrt die Geschichte derer, die den Boden vergaßen.",
      effect: "+1 Ruf (Wissen)"
    },
    'npc-townHall': {
      title: "Rathaus",
      desc: "Amtsschimmel und Landurkunden. Hier wird das Leben geregelt.",
      effect: "Schaltet Bürokratie frei",
      unlocks: "Ermöglicht Hausbau"
    },
    'npc-blacksmith': {
      title: "Schmied",
      desc: "Metall klopfen auf dem Amboss. Er gibt deinen Werkzeugen Kraft.",
      effect: "Schaltet Metallbau frei"
    },
    'npc-sage': {
      title: "Alter Weiser",
      desc: "\"Du berührst die Erde... du hast wahre Kraft, Wanderer.\"",
      effect: "Schenkt ein Buch des Wissens",
      unlocks: "Aktion: 'Studieren'"
    },
    'craft-wanderstock': {
        title: "Wanderstock",
        desc: "Ein solider Stock aus Esche. Er trägt deine Last auf langen Wegen.",
        effect: "+0.5 Holz-Ertrag"
    },
    'craft-axe': {
        title: "Steinaxt",
        desc: "Ein robustes Werkzeug. Nicht schön, aber scharf genug.",
        effect: "Erhöht Holz-Ertrag"
    },
    'craft-pickaxe': {
        title: "Spitzhacke",
        desc: "Schlag damit auf Steine ein. Das Metallsingt.",
        effect: "Erhöht Stein-Ertrag"
    },
    'craft-bed': {
        title: "Bett",
        desc: "Ein weicher Ort zum Schlafen. Viel besser als nackte Erde.",
        effect: "Starke Erholung (+25)"
    },
    'craft-chair': {
        title: "Stuhl",
        desc: "Bequem sitzen beim Lesen. Erhöht die Konzentration.",
        effect: "Verdoppelt Studium-Ertrag (+10 MS)"
    },
    'house-campfire': {
        title: "Lagerfeuer",
        desc: "Das Feuer vertreibt die Schatten der vorbeiziehenden Schwingen.",
        effect: "+10 Erholung",
        unlocks: "Dorf-NPC: 'Blumenmädchen'"
    },
    'house-tent': {
        title: "Zelt",
        desc: "Dein erstes echtes Dach. Ein Rückzugsort vor dem Wind.",
        effect: "Mehr Platz",
        unlocks: "Dorf-NPC: 'Rathaus', Lager-Optionen"
    },
    'house-wood-storage': {
        title: "Holzlager",
        desc: "Ein trockener Ort für mehr Vorräte.",
        effect: "+10 Max Holz",
        unlocks: "Dorf-NPC: 'Handwerker'"
    },
    'house-stone-storage': {
        title: "Steinlager",
        desc: "Ein stabiles Fundament für dein wachsendes Reich.",
        effect: "+10 Max Stein",
        unlocks: "Dorf-NPC: 'Handwerker'"
    },
    'house-table': {
        title: "Massiver Tisch",
        desc: "Ein Ort zum Arbeiten und Studieren deiner Bücher.",
        effect: "Ermöglicht Studium",
        unlocks: "Dorf-NPC: 'Alter Weiser'"
    },
    'house-build': {
        title: "Hütte bauen",
        desc: "Deine Hütte steht fest am Boden. Ein Denkmal deines Willens.",
        effect: "Permanente Basis (+50 Kapazität)",
        unlocks: "Möbel: 'Massiver Tisch'"
    }
  },
  logs: {
    save_success: "Spielstand gesichert.",
    load_success: "Spielstand geladen.",
    study_success: "Dein Wissen wächst durch Konzentration (+{gain} Magie-Limit).",
    sage_gift: "Der Weise schenkt dir ein altes Buch voller Symbole.",
    // Aktions-Logs
    eat_log: "Beeren gegessen. +5 Energie.",
    rest_log: "Ausgeruht. +{gain} Energie.",
    meditate_log: "Meditiert. +15 Magie.",
    wood_log: "{gain} Zweige gesammelt.",
    wood_axe_log: "{gain} Holz geschlagen.",
    stone_log: "{gain} Kiesel gesammelt.",
    stone_axe_log: "{gain} Steine gebrochen.",
    sell_wood_log: "Holz getauscht. +5 Splitter.",
    sell_stone_log: "Stein getauscht. +8 Splitter.",
    work_log: "Pfade gesäubert. +12 Splitter.",
    // Handwerk-Logs
    craft_wanderstock: "Wanderstock geschnitzt.",
    craft_axe: "Steinaxt gefertigt.",
    craft_pickaxe: "Spitzhacke gefertigt.",
    craft_bed: "Bett gebaut.",
    craft_chair: "Stuhl gefertigt.",
    // NPC-Logs
    npc_baker: "Bäcker: \"Schön, dich wieder zu sehen.\"",
    npc_flowerGirl: "Blumenmädchen lächelt und drückt dir eine Blüte in die Hand.",
    npc_artisan: "Handwerker: \"Du machst das gut. Weiter so.\"",
    npc_teacher: "Lehrer erklärt dir die Geschichte des Dorfes.",
    npc_townHall: "Rathaus-Beamter stempelt einen weiteren Antrag ab.",
    npc_blacksmith: "Schmied: \"Komm wieder, wenn du Metall brauchst.\"",
    npc_sage: "Alter Weiser nickt langsam und schließt die Augen.",
    // Meilensteine
    milestone_campfire: "Lagerfeuer entzündet. Die Wärme vertreibt die Kälte der Nacht.",
    milestone_tent: "Zelt aufgestellt. Dein erstes echtes Dach über dem Kopf.",
    milestone_wood_storage: "Holzlager errichtet. +10 maximales Holz.",
    milestone_stone_storage: "Steinlager errichtet. +10 maximaler Stein.",
    milestone_table: "Massiver Tisch aufgestellt. Ein Ort des Wissens.",
    milestone_house: "Hütte gebaut. Ein Monument deines Willens am Boden.",
    // Intro
    intro_1: "Über dir gleitet jemand mühelos von Dach zu Dach.",
    intro_2: "Du gehst den langen Weg zu Fuß. Deine Schritte sind schwer.",
    intro_3: "Ein Händler landet vor dem Dorftor. Er bemerkt dich nicht.",
    intro_4: "Regen setzt ein. Die anderen schütteln ihre Flügel aus und fliegen nach Hause.",
    intro_5: "Du bleibst unten. Du vermisst etwas, das du nie hattest...",
    intro_6: "Aber hier, am Rande des Dorfes, wirst du dir ein Leben aufbauen.",
    intro_7: "Willkommen in deinem neuen Zuhause.",
    // Fehlschläge
    fail_energy: "Zu erschöpft.",
    fail_magic: "Nicht genug Magie.",
    fail_resources: "Nicht genug Ressourcen.",
    fail_full_wood: "Holzlager voll.",
    fail_full_stone: "Steinlager voll."
  },
  atmosphere: [
    "Ein ferner Flügelschlag hallt durch die Stille.",
    "Schatten ziehen über den Boden, geworfen von jenen, die fliegen.",
    "Du spürst den festen Boden unter deinen Füßen. Er gibt dir Halt.",
    "Der Wind trägt das Lachen derer herab, die den Himmel bewohnen.",
    "Wilde Blumen am Wegrand erinnern dich daran, dass auch Schönheit am Boden wachsen kann."
  ]
};
