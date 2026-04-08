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
    ui_ready: "Bereit",
    ui_need: "Benötigt",
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
      effect: "+1 Ruf (Blüte)"
    },
    'npc-artisan': {
      title: "Handwerker",
      desc: "Handwerker: \"Du schaffst Ordnung am Boden? Das gefällt mir.\"",
      effect: "Lehrt Werkzeugbau"
    },
    'npc-teacher': {
      title: "Lehrer",
      desc: "Er lehrt die Geschichte derer, die den Boden vergaßen.",
      effect: "+1 Ruf (Wissen)"
    },
    'npc-townHall': {
      title: "Rathaus",
      desc: "Amtsschimmel und Landurkunden. Hier wird das Leben geregelt.",
      effect: "Schaltet Bürokratie frei"
    },
    'npc-blacksmith': {
      title: "Schmied",
      desc: "Metall klopfen auf dem Amboss. Er gibt deinen Werkzeugen Kraft.",
      effect: "Schaltet Metallbau frei"
    },
    'npc-sage': {
      title: "Alter Weiser",
      desc: "\"Du berührst die Erde... du hast wahre Kraft, Wanderer.\"",
      effect: "Schenkt ein Buch des Wissens"
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
        title: "Gelehrtenstuhl",
        desc: "Bequem sitzen beim Lesen. Erhöht die Konzentration.",
        effect: "Verdoppelt Studium-Ertrag (+10 MS)"
    },
    'house-campfire': {
        title: "Lagerfeuer",
        desc: "Das Feuer vertreibt die Schatten der vorbeiziehenden Schwingen.",
        effect: "+10 Erholung, zieht Besucher an"
    },
    'house-tent': {
        title: "Leinenzelt",
        desc: "Dein erstes echtes Dach. Ein Rückzugsort vor dem Wind.",
        effect: "Schaltet Bürokratie & Lager frei"
    },
    'house-wood-storage': {
        title: "Holzlager",
        desc: "Ein trockener Ort für mehr Vorräte.",
        effect: "+10 Max Holz"
    },
    'house-stone-storage': {
        title: "Steinlager",
        desc: "Ein stabiles Fundament für dein wachsendes Reich.",
        effect: "+10 Max Stein"
    },
    'house-table': {
        title: "Massiver Tisch",
        desc: "Ein Ort zum Arbeiten und Studieren deiner Bücher.",
        effect: "Ermöglicht Studium"
    },
    'house-build': {
        title: "Hütte bauen",
        desc: "Deine Hütte steht fest am Boden. Ein Denkmal deines Willens.",
        effect: "Permanente Basis (+50 Kapazität)"
    }
  },
  logs: {
    save_success: "Spielstand gesichert.",
    load_success: "Spielstand geladen.",
    study_success: "Dein Wissen wächst durch Konzentration (+{gain} Magie-Limit).",
    sage_gift: "Der Weise schenkt dir ein altes Buch voller Symbole.",
    intro_1: "Über dir gleitet jemand mühelos von Dach zu Dach.",
    intro_2: "Du gehst den langen Weg zu Fuß. Deine Schritte sind schwer.",
    intro_3: "Ein Händler landet vor dem Dorftor. Er bemerkt dich nicht.",
    intro_4: "Regen setzt ein. Die anderen schütteln ihre Flügel aus und fliegen nach Hause.",
    intro_5: "Du bleibst unten. Du vermisst etwas, das du nie hattest...",
    intro_6: "Aber hier, am Rande des Dorfes, wirst du dir ein Leben aufbauen.",
    intro_7: "Willkommen in deinem neuen Zuhause."
  },
  atmosphere: [
    "Ein ferner Flügelschlag hallt durch die Stille.",
    "Schatten ziehen über den Boden, geworfen von jenen, die fliegen.",
    "Du spürst den festen Boden unter deinen Füßen. Er gibt dir Halt.",
    "Der Wind trägt das Lachen derer herab, die den Himmel bewohnen.",
    "Wilde Blumen am Wegrand erinnern dich daran, dass auch Schönheit am Boden wachsen kann."
  ]
};
