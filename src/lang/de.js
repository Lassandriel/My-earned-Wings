export default {
  ui: {
    nav_story: "Haupt",
    nav_crafting: "Crafting",
    nav_housing: "Bau & Housing",
    nav_inventory: "Besitz",
    nav_village: "Dorf",
    cat_gather: "Sammeln",
    cat_eat: "Essen & Versorgen",
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
    ui_herbs: "Kräuter",
    ui_meat: "Fleisch",
    ui_satiation: "Sättigung",
    ui_buff_active: "Aktiver Buff",
    ui_buff_actions: "Aktionen verbleibend",
    ui_details: "Details",
    ui_ready: "Bereit",
    ui_need: "Benötigt",
    ui_base: "Basis",
    ui_no_shelter: "Kein Lager",
    ui_extensions: "Erweiterungen",
    ui_placeholder: "Wanderer...",
    ui_placeholder_desc: "Wähle eine Handlung aus, um mehr zu erfahren.",
    inv_empty: "Noch nichts dabei.",
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
    btn_reset: "🗑️ Alles zurücksetzen",
    intro_welcome: "Willkommen zurück auf festem Boden."
  },
  actions: {
    'action-essen': {
      title: "Beeren essen",
      desc: "Wilde Beeren vom Boden sammeln. Sie stillen den Hunger kaum, aber besser als nichts.",
      effect: "+15 Sättigung"
    },
    'action-herbs': {
      title: "Kräuter sammeln",
      desc: "Suche nach essbaren Kräutern im Unterholz. Sie riechen nach feuchter Erde.",
      effect: "+1 Kräuter"
    },
    'action-eat-meat': {
      title: "Fleisch essen",
      desc: "Gebratenes Fleisch vom Feuer — eins der wenigen Dinge, das wirklich sättigt.",
      effect: "Volle Sättigung + Buff (mit Herd)"
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
    'trade-buy-wood': {
      title: "Holz einkaufen",
      desc: "Der Händler hat erstklassiges Holz von den Gipfeln mitgebracht.",
      effect: "-10 Splitter, +1 Holz"
    },
    'trade-buy-book': {
      title: "Buch des Wissens",
      desc: "Altes Wissen aus den Archiven der Geflügelten. Schwer zu verstehen, aber wertvoll.",
      effect: "-50 Splitter, Erlaubt Studium"
    },
    'action-work': {
      title: "Pfade säubern",
      desc: "Säubere die Wanderwege. Niemand außer dir nutzt den Boden.",
      effect: "+1 Arbeit, +12 Splitter"
    },
    'npc-baker': {
      title: "Bäcker",
      dialogues: [
        "Bäcker: \"Ein Wanderer? Du siehst staubig aus. Hier, nimm ein Krümelbrot.\"",
        "Bäcker: \"Wir leben hoch oben, damit uns der Schmutz nicht erreicht.\"",
        "Bäcker: \"Doch ich sehe, du magst den Boden. Er macht dich stark.\"",
        "Bäcker: \"Ich werde mich für dich einsetzen, wenn der Rat fragt.\"",
        "Bäcker: \"Ich vergesse oft, wie weit der Wald zu Fuß ist. Pass auf dich auf.\""
      ],
      effect: "+1 Ruf (Bäcker)"
    },
    'npc-flowerGirl': {
      title: "Blumenmädchen",
      dialogues: [
        "Mädchen: \"Oh! Wer bist du? Bist du vom Himmel gefallen?\"",
        "Mädchen: \"Dort unten gibt es Blumen? Zeigst du sie mir?\"",
        "Mädchen: \"Ich sammle sonst nur die, die hoch wuchern.\"",
        "Mädchen: \"Du hast harte Hände... aber du bist freundlich.\"",
        "Mädchen: \"Ich werde dem Schmied erzählen, was du alles trägst!\""
      ],
      effect: "+1 Ruf (Blüte)",
      unlocks: "Ermöglicht: 'Schmied'"
    },
    'npc-artisan': {
      title: "Handwerker",
      dialogues: [
        "Handwerker: \"Hmpf. Deine Werkzeuge sind primitiv.\"",
        "Handwerker: \"Holz und Stein... es fehlt die Schärfe.\"",
        "Handwerker: \"Du schaffst Ordnung am Boden? Das gefällt mir. Ich zeige dir was.\""
      ],
      effect: "Lehrt Werkzeugbau",
      unlocks: "Rezepte: 'Axt', 'Spitzhacke'"
    },
    'npc-teacher': {
      title: "Lehrer",
      dialogues: [
        "Lehrer: \"Warum wirbt du Schmutz auf?\"",
        "Lehrer: \"Weißt du nicht, dass der Boden der Vergangenheit gehört?\"",
        "Lehrer: \"Es gab da mal jemanden... einen Jäger, der auch den Boden liebte. Du solltest ihn finden.\""
      ],
      effect: "Erweitert deinen Horizont",
      unlocks: "Dorf-NPC: 'Jäger'"
    },
    'npc-hunter': {
      title: "Jäger",
      dialogues: [
        "Jäger: \"Bleib leise. Sie hören uns von oben.\"",
        "Jäger: \"Du hast kräftige Arme, Wanderer. Aber dir fehlt die Reichweite.\"",
        "Jäger: \"Nimm dieses Wissen. Baue dir eine Waffe aus dem Holz des Waldes.\"",
        "Jäger: \"Wenn dein Bogen gespannt ist, zeige ich dir das Jagen.\""
      ],
      effect: "Lehrt Fernkampfwaffen",
      unlocks: "Rezept: 'Bogen'"
    },
    'npc-townHall': {
      title: "Rathaus",
      dialogues: [
        "Beamter: \"Namen? Herkunft? ...Du wohnst UNTEN?!\"",
        "Beamter: \"Das verstößt gegen Paragraph vier, Absatz zwei!\"",
        "Beamter: \"Wir müssen ein Sonderformular ausstellen.\"",
        "Beamter: \"Du bist hartnäckig. Ich mag Formulare.\"",
        "Beamter: \"Hier. Deine offizielle Urkunde für den Boden.\""
      ],
      effect: "Schaltet Bürokratie frei",
      unlocks: "Ermöglicht Hausbau"
    },
    'npc-blacksmith': {
      title: "Schmied",
      dialogues: [
        "Schmied: \"Das Mädchen meint, du brauchst Hilfe.\"",
        "Schmied: \"Zeig mir deine Axt. Pah, stumpfer Stein!\"",
        "Schmied: \"Feuer braucht Luft. Schmieden braucht Hitze.\"",
        "Schmied: \"Dein Wille ist wie Eisen. Er lässt sich formen.\"",
        "Schmied: \"Komm wieder, wenn du stark genug bist.\""
      ],
      effect: "Schaltet Metallbau frei"
    },
    'npc-sage': {
      title: "Alter Weiser",
      dialogues: [
        "Weiser: \"Du berührst die Erde... du hast wahre Kraft, Wanderer. Nimm dies.\""
      ],
      effect: "Schenkt ein Amulett der Vitalität",
      unlocks: "Ermöglicht grenzenlose Ausdauer"
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
    'craft-bow': {
        title: "Bogen",
        desc: "Gespannt aus starkem Eschenholz. Erlaubt dir, das Wild des Waldes aus der Ferne zu erlegen.",
        effect: "Ermöglicht Jagen",
        emoji: "🏹"
    },
    'book': {
        title: "Buch des Wissens",
        desc: "Seiten voll mit Wissen aus vergangenen Zeiten. Dein Tisch braucht Platz.",
        effect: "+2 Max Magie beim Studieren",
        emoji: "📖"
    },
    'Official Land Deed': {
        title: "Landurkunde",
        desc: "Ein versiegeltes Dokument des Rathauses. Es gewährt dir das Recht, auf diesem Boden zu bauen.",
        effect: "Ermöglicht Hausbau",
        emoji: "📜"
    },
    'Amulet of Vitality': {
        title: "Amulett der Vitalität",
        desc: "Ein altes, glühendes Amulett. Es wurde vom Weisen überreicht als Zeichen deiner Bemühungen.",
        effect: "+50 Max Energie",
        emoji: "💚"
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
        effect: "+10 Erholung",
        unlocks: "Dorf-NPC: 'Blumenmädchen'"
    },
    'house-tent': {
        title: "Leinenzelt",
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
        desc: "Ein Ort zum Arbeiten und Studieren deiner Bücher. Erweitert deinen Raum.",
        effect: "Gibt Raum für Bücher",
        unlocks: "Wissen, 'Bücherregal'"
    },
    'house-build': {
        title: "Hütte bauen",
        desc: "Deine Hütte steht fest am Boden. Ein Denkmal deines Willens.",
        effect: "Permanente Basis (+50 Kapazität)",
        unlocks: "Möbel fertigen ('Stuhl', 'Bett')"
    },
    'house-bookcase': {
        title: "Bücherregal",
        desc: "Dieses edle Konstrukt bietet Platz für all die Schriften, die du sammelst.",
        effect: "+15 Max Magie",
        unlocks: "Boni beim Studieren"
    },
    'house-stove': {
        title: "Herd",
        desc: "Ein einfacher, steinerner Herd. Er braucht nur ein Dach über sich und gibt dem Kochen Sinn.",
        effect: "Schaltet Kochen frei",
        unlocks: "Fleisch essen mit Buff"
    }
  },
  logs: {
    save_success: "Spielstand gesichert.",
    load_success: "Spielstand geladen.",
    study_success: "Dein Wissen wächst durch Konzentration (+{gain} Magie-Limit).",
    sage_gift: "Der Weise segnet dich mit einem Amulett voller Lebenskraft (+50 Max Energie).",
    // Aktions-Logs
    eat_log: "Beeren gegessen. Sättigung +15.",
    herbs_log: "Kräuter gefunden. +1 Kräuter.",
    eat_meat_log: "Fleisch gegessen. Sättigung voll.",
    eat_meat_buff_log: "Fleisch gegessen. Sättigung voll. Bonus aktiv für 5 Aktionen!",
    rest_log: "Ausgeruht. +{gain} Energie.",
    meditate_log: "Meditiert. +15 Magie.",
    wood_log: "{gain} Zweige gesammelt.",
    wood_axe_log: "{gain} Holz geschlagen.",
    stone_log: "{gain} Kiesel gesammelt.",
    stone_axe_log: "{gain} Steine gebrochen.",
    sell_wood_log: "Holz getauscht. +5 Splitter.",
    sell_stone_log: "Stein getauscht. +8 Splitter.",
    buy_wood_log: "Holz beim Händler erworben. -10 Splitter.",
    buy_book_log: "Altes Buch erstanden. Das Wissen ist schwer (-50 Splitter).",
    work_log: "Pfade gesäubert. +12 Splitter.",
    // Handwerk-Logs
    craft_wanderstock: "Wanderstock geschnitzt.",
    craft_axe: "Steinaxt gefertigt.",
    craft_pickaxe: "Spitzhacke gefertigt.",
    craft_bow: "Bogen gespannt und fertiggestellt.",
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
    milestone_table: "Massiver Tisch aufgestellt. Die Grundlage für neues Wissen.",
    milestone_house: "Hütte gebaut. Nun bist du auf Möbel angewiesen.",
    milestone_bookcase: "Bücherregal gezimmert. Deine Gedanken finden mehr Platz (+15 Max Magie).",
    milestone_stove: "Herd aufgestellt. Das Feuer knistert. Jetzt kannst du richtig kochen.",
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
