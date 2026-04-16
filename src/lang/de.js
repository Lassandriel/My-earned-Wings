export default {
  ui: {
    nav_story: "Haupt",
    nav_crafting: "Handwerk",
    nav_housing: "Hausbau",
    nav_inventory: "Upgrades",
    nav_village: "Dorf",
    cat_gather: "Sammeln",
    cat_trade: "Handel",
    cat_work: "Arbeit",
    cat_crafting: "Baupläne & Studium",
    cat_housing: "Hausbau & Lager",
    cat_inventory: "Upgrades & Gegenstände",
    cat_village: "Das Dorf",
    cat_log: "Chronik",
    objective_label: "Ziel",
    objective_find_answers: "Finde heraus, wer du bist und werde stärker.",
    ui_source_world: "Draconia",
    ui_empty_story: "Deine Geschichte hat gerade erst begonnen...",
    nav_story_tab: "Geschichte",
    nav_story_tab_header: "Deine Geschichte",
    ui_vitality: "Ressourcen",
    ui_shards: "Seelensplitter",
    ui_wood: "Holz",
    ui_stone: "Stein",
    ui_meat: "Fleisch",
    ui_books: "Bücher",
    ui_water: "Wasser",
    ui_nature: "Natur & Wissen",
    ui_materials: "Materialien",
    ui_mixed: "Materialien",
    ui_provisions: "Proviant",
    ui_knowledge: "Wissen",
    ui_details: "Details",
    ui_energy: "Energie",
    ui_magic: "Magie",
    ui_satiation: "Sättigung",
    ui_unlocks: "Schaltet frei:",
    ui_ready: "Bereit",
    ui_need: "Benötigt",
    ui_bonus: "Bonus",
    ui_base: "Basis",
    ui_no_shelter: "Kein Lager",
    ui_placeholder: "Wanderer...",
    ui_placeholder_desc: "Wähle eine Handlung aus, um mehr zu erfahren.",
    settings_title: "Einstellungen",
    settings_lang: "Sprache / Language",
    settings_scale: "UI Skalierung",
    settings_scale_auto: "Automatisch",
    settings_name: "Spieler Name",
    settings_reset: "Spiel zurücksetzen",
    confirm_reset: "Bist du sicher? Alle Fortschritte werden gelöscht!",
    village_desc: "Spreche mit den Bewohnern, um von ihrem Wissen zu profitieren.",
    save_at: "Gespeichert: ",
    save_never: "Zuletzt gespeichert: Nie",
    btn_save: "Speichern",
    btn_load: "Laden",
    btn_quit: "Beenden",
    btn_back: "Zurück",
    crafting_desc: "Verwandle gesammelte Materialien in nützliche Werkzeuge oder vertiefe dein Wissen über den Boden.",
    housing_desc: "Errichte ein dauerhaftes Heim am Rande des Dorfes und schlage Wurzeln in der Gemeinschaft.",
    inventory_desc: "Verwalte deine gesammelten Schätze und nutze Vorräte für deine weiteren Reisen.",
    chronicle_desc: "Die Aufzeichnungen deines Lebens am Boden. Jede Tat hinterlässt eine Spur in der Geschichte.",
    nav_story_desc: "Deine täglichen Überlebens-Aktionen: Sammeln, Tauschen und Arbeiten.",
    nav_crafting_desc: "Hier kannst du Materialien verarbeiten, Werkzeuge bauen oder neues Wissen studieren.",
    nav_inventory_desc: "Deine gesammelten Gegenstände und Ausrüstung. Manche können konsumiert werden.",
    nav_village_desc: "Besuche die Bewohner von Draconia, um ihre Geschichten zu hören und Hilfe zu erhalten.",
    nav_chronicle_desc: "Ein detaillierter Log deiner bisherigen Reise am Boden.",
    nav_gather_desc: "Sammle Materialien vom Boden. Nutze Werkzeuge, um deinen Ertrag massiv zu steigern.",
    nav_trade_desc: "Tausche überschüssiges Material gegen Seelensplitter. Der Markt ist das Herz deiner Wirtschaft.",
    nav_work_desc: "Säubere die Pfade Draconias für die Bewohner. Ein anstrengender, aber sicherer Weg an Splitter zu kommen.",
    intro_welcome: "Willkommen zurück auf festem Boden.",
    settings_tab_general: "Allgemein",
    settings_tab_audio: "Audio",
    settings_tab_system: "System",
    settings_vol_global: "Gesamtlautstärke",
    settings_vol_music: "Musik",
    settings_vol_sfx: "Effekte",
    settings_mute: "Stummschalten",
    btn_assign_work: "Zuweisen",
    btn_stop_work: "Stoppen",
    ui_use: "Benutzen",
    ui_inventory_empty: "Dein Inventar ist noch leer.",
    ui_salary: "Kosten",
    ui_yield: "Ertrag",
    ui_load_at: "Geladen um",
    status_working: "Beschäftigt",
    status_idle: "Frei",
    menu_continue: "Fortfahren",
    menu_new_game: "Neues Spiel",
    menu_version: "v1.0.0 - Lassandriel & Nhywyll"
  },
  actions: {
    'action-essen': {
      title: "Beeren essen",
      desc: "Wilde Beeren vom Boden sammeln. Sie schmecken nach Erde und Kraft.",
      effect: "+{sGain} Sättigung, +{eGain} Energie"
    },
    'action-ausruhen': {
      title: "Ausruhen",
      desc: "Du schließt die Augen und lauschst dem fernen Schlagen von Schwingen.",
      effect: "+{val} Energie"
    },
    'action-meditieren': {
      title: "Fokusieren",
      desc: "Dir wird bewusst das alles mit Magie verbunden ist.",
      effect: "+{val} Magie"
    },
    'action-study': {
      title: "Studieren",
      desc: "Vertiefe dich in die alten Bücher auf deinem massiven Tisch.",
      effect: "+{val} Magie-Limit"
    },
    'action-wood': {
      title: "Zweige sammeln",
      title_alt: "Holz schlagen",
      desc: "Sammle mühsam herabgefallene Zweige vom Waldboden.",
      desc_alt: "Nutze deine Axt, um gesundes Holz von den Bäumen zu schlagen.",
      effect: "+{val} Holz"
    },
    'action-stone': {
      title: "Kiesel sammeln",
      title_alt: "Steine klopfen",
      desc: "Suche nach brauchbaren Kieseln im Bachbett.",
      desc_alt: "Zertrümmere Felsen mit deiner Spitzhacke für hochwertiges Material.",
      effect: "+{val} Stein"
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
      effect: "+12 Splitter"
    },
    'npc-baker': {
      title: "Bäcker",
      desc: "Bäcker: \"Ich brauche immer frisches Holz für meinen Ofen, um das beste Brot zu backen.\"",
      effect: "Baut Bindung auf"
    },
    'npc-flowerGirl': {
      title: "Blumenmädchen",
      desc: "Sie sammelt Blumen, die sie im Flug nicht erreichen könnte.",
      effect: "Blüten-Bindung",
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
      effect: "Wissens-Austausch",
      unlocks: "Vorbereitung auf das Finale"
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
      unlocks: "Der Pfad zum Herzen der Welt"
    },
    'npc-hunter': {
      title: "Jäger",
      desc: "Ein schweigsamer Mann mit Narben an den Armen. Er kennt die Wälder.",
      effect: "Lehrt Bogenbau und Jagd",
      unlocks: "Rezepte: 'Bogen', Aktion: 'Jagen'"
    },
    'npc-treeOfLife': {
      title: "Baum des Lebens",
      desc: "Das majestätische Herz des Bodens. Hier endet deine Suche und beginnt dein neues Leben.",
      effect: "Das Demo-Finale"
    },
    'house-garden': {
      title: "Garten anlegen",
      desc: "Ein Stück fruchtbarer Boden für Pflanzen und Wasserquellen.",
      effect: "Ermöglicht Wasser-Gewinnung"
    },
    'garden-water': {
      title: "Wasser sammeln",
      desc: "Frisches Quellwasser für die Gemeinschaft.",
      effect: "+1 Wasser"
    },
    'action-hunt': {
      title: "Jagen",
      desc: "Gehe tief in den Wald und suche nach Wild. Dein Bogen singt beim Schuss.",
      effect: "+{val} Fleisch"
    },
    'action-sell-meat': {
      title: "Fleisch verkaufen",
      desc: "Frisches Fleisch ist im Dorf begehrt, da kaum jemand am Boden jagt.",
      effect: "+15 Splitter"
    },
    'action-buy-meat': {
      title: "Fleisch kaufen",
      desc: "Kaufe Vorräte vom Jäger, wenn dein Glück im Wald nachlässt.",
      effect: "+1 Fleisch"
    },
    'craft-wanderstock': {
        title: "Wanderstock",
        desc: "Ein solider Stock aus Esche. Er trägt deine Last auf langen Wegen.",
        effect: "+1 Holz-Ertrag"
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
    'craft-stove': {
        title: "Ofen",
        desc: "Ein gusseiserner Ofen. Er wärmt die Hütte und gart deine Beeren.",
        effect: "Verdoppelt Beeren-Erholung"
    },
    'craft-bow': {
        title: "Jagdbogen",
        desc: "Ein leichter, aber stabiler Bogen. Perfekt für den Boden.",
        effect: "Ermöglicht Jagd"
    },
    'house-campfire': {
        title: "Lagerfeuer",
        desc: "Das Feuer vertreibt die Schatten der vorbeiziehenden Schwingen.",
        effect: "+10 Erholung",
        unlocks: "Dorf-NPC: 'Blumenmädchen', Nächster Schritt: Zelt"
    },
    'house-tent': {
        title: "Zelt",
        desc: "Dein erstes echtes Dach. Ein Rückzugsort vor dem Wind.",
        effect: "Mehr Platz",
        unlocks: "Dorf-NPC: 'Rathaus', Nächster Schritt: Lager-Optionen"
    },
    'house-wood-storage': {
        title: "Holzlager",
        desc: "Ein trockener Ort für mehr Vorräte.",
        effect: "+10 Max Holz",
        unlocks: "Dorf-NPC: 'Handwerker', Nächster Schritt: Hütte bauen"
    },
    'house-stone-storage': {
        title: "Steinlager",
        desc: "Ein stabiles Fundament für dein wachsendes Reich.",
        effect: "+10 Max Stein",
        unlocks: "Dorf-NPC: 'Handwerker', Nächster Schritt: Hütte bauen"
    },
    'house-table': {
        title: "Massiver Tisch",
        desc: "Ein Ort zum Arbeiten und Studieren deiner Bücher.",
        effect: "Ermöglicht Studium",
        unlocks: "Dorf-NPC: 'Alter Weiser'"
    },
    'craft-bookshelf': {
        title: "Bücherregal",
        desc: "Ein Ort für gesammeltes Wissen. Erhöht den Fokus beim Studium.",
        effect: "+5 Buch-Kapazität"
    },
    'craft-book': {
        title: "Buch verfassen",
        desc: "Halte deine Erkenntnisse dauerhaft fest. Jedes Buch erhöht die Effektivität deines Studiums.",
        effect: "+1 Buch"
    },
    'house-build': {
        title: "Hütte bauen",
        desc: "Deine Hütte steht fest am Boden. Ein Denkmal deines Willens.",
        effect: "Permanente Basis (+50 Kapazität)",
        unlocks: "Möbel: 'Massiver Tisch', Nächster Schritt: Garten"
    }
  },
  logs: {
    save_success: "Spielstand gesichert.",
    load_success: "Spielstand geladen.",
    study_success: "Dein Geist weitet sich... die Worte des Weisen brennen wie flüssiges Licht in deinem Verstand (+{gain} Magie-Limit).",
    sage_gift: "Der Weise schenkt dir ein altes Buch voller Symbole... es vibriert in deinen Händen.",
    // Aktions-Logs
    eat_log: "Beeren gegessen. +{gain} Sättigung.",
    rest_log: "Ausgeruht. +{gain} Energie. Dein Magen knurrt nach dem Schlaf.",
    meditate_log: "Meditiert. +15 Magie.",
    wood_log: "+{gain} Holz",
    wood_axe_log: "+{gain} Holz",
    stone_log: "+{gain} Stein",
    stone_axe_log: "+{gain} Stein",
    sell_wood_log: "Holz getauscht. +5 Seelensplitter.",
    sell_stone_log: "Stein getauscht. +8 Seelensplitter.",
    work_log: "Pfade gesäubert. +12 Splitter.",
    // Handwerk-Logs
    craft_wanderstock: "Wanderstock geschnitzt.",
    craft_axe: "Steinaxt gefertigt.",
    craft_pickaxe: "Spitzhacke gefertigt.",
    craft_bed: "Bett gebaut.",
    craft_chair: "Stuhl gefertigt.",
    // Meilensteine
    milestone_campfire: "Lagerfeuer entzündet. Die Wärme vertreibt die Kälte der Nacht.",
    milestone_tent: "Zelt aufgestellt. Dein erstes echtes Dach über dem Kopf.",
    milestone_wood_storage: "Holzlager errichtet. +10 maximales Holz.",
    milestone_stone_storage: "Steinlager errichtet. +10 maximaler Stein.",
    milestone_table: "Massiver Tisch aufgestellt. Ein Ort des Wissens inmitten der Asche.",
    milestone_house: "Die Hütte steht fest am Boden – ein Monument deines Willens in dieser Welt aus Lava und Schwingen.",
    milestone_garden: "Garten angelegt. Die Erde beginnt unter deinen Händen zu blühen.",
    hunt_log: "Erfolgreich gejagt. +{gain} Fleisch.",
    water_gain: "Frisches Wasser gesammelt.",
    item_consumed: "{name} benutzt.",
    sell_meat_log: "Fleisch verkauft. +15 Splitter.",
    buy_meat_log: "Fleisch beim Jäger gekauft. +1 Fleisch.",
    craft_stove: "Ofen in der Hütte installiert.",
    craft_bow: "Jagdbogen gefertigt.",
    craft_bookshelf: "Bücherregal aufgestellt. Du kannst nun mehr Wissen sammeln.",
    craft_book: "Buch verfasst. Dein geistiger Horizont erweitert sich.",
    // Intro
    intro_1: "Über dir gleitet ein prächtiger Winddrache mühelos von Dach zu Dach. In seiner humanoiden Form wirken seine zusammengeklappten Schwingen wie ein edler Mantel.",
    intro_2: "Du gehst den langen Weg zu Fuß. Deine Schritte sind schwer und erdgebunden.",
    intro_3: "Ein Händler-Wyvern landet vor dem Dorftor. Er bemerkt dich nicht.",
    intro_4: "Regen setzt ein. Die anderen schütteln ihre Schwingen – Leder, Federn, Schuppen – und fliegen nach Hause.",
    intro_5: "Du bleibst unten. Du vermisst eine Verbindung, die du nie gespürt hast...",
    intro_6: "Doch hier, am Rande des Dorfes, wirst du dir ein Leben aufbauen.",
    intro_7: "Willkommen in deinem neuen Zuhause. Ein Drache ohne Drachenform... in Draconia nennt man das ein Rätsel. Du bleibst in deiner humanoiden Gestalt gefangen, während andere die Lüfte beherrschen.",
    // NPC Dialoge
    npc_baker_1: "Bäcker: \"Willkommen. Auch wir Drachen am Boden schätzen ein gutes Feuer. Ohne Holz für meine Glut gäbe es hier kein Brot. Hast du heute welches dabei?\"",
    npc_baker_2: "Bäcker: \"Du bist fleißig. Der Duft von frischem Brot ist am Boden viel intensiver, findest du nicht?\"",
    npc_baker_3: "Bäcker: \"Die Händler oben vergessen oft, dass das Getreide auf der Erde wächst, nicht in den Wolken.\"",
    npc_baker_4: "Bäcker: \"Ich habe heute ein Brot extra für dich gebacken. Es stärkt den Geist für lange Reisen.\"",
    npc_baker_5: "Bäcker: \"Du gehörst jetzt fest zu dieser Gemeinschaft. Lass uns das Dorf gemeinsam bereichern.\"",
    npc_flowerGirl_1: "Blumenmädchen: \"Oh... hallo. Bitte... sei vorsichtig, wo du hintrittst. Die Knospen sind zart.\"",
    npc_flowerGirl_2: "Blumenmädchen: \"Diese Blume hier blüht nur nachts. Sie leuchtet wie das Herz von Draconia.\"",
    npc_flowerGirl_3: "Blumenmädchen: \"Wusstest du, dass die Wurzeln die Inseln zusammenhalten? So wie das Vertrauen uns hält.\"",
    npc_flowerGirl_4: "Blumenmädchen: \"Ich fühle mich am Boden sicherer, wenn du in der Nähe bist. Du hast keine Flügel, aber starke Schultern.\"",
    npc_flowerGirl_5: "Blumenmädchen: \"Lass uns einen Garten anlegen, der bis zum Horizont reicht. Ich helfe dir dabei.\"",
    npc_artisan_1: "Handwerker: \"Ordnung am Boden? Ein seltener Anblick in dieser Zeit der fliegenden Hektik.\"",
    npc_artisan_2: "Handwerker: \"Dein Werkzeug erzählt von harter Arbeit. Du respektierst das Material.\"",
    npc_artisan_3: "Handwerker: \"Gute Arbeit erfordert Geduld. Ich zeige dir, wie man den Stein wirklich zähmt.\"",
    npc_teacher_1: "Lehrer: \"Blick abwärts... Wir alle sind Kinder Draconias, ob wir nun fliegen oder am Boden wandeln. Nur die Magie dieser Ketten hält Draconia davor, im Feuer zu versinken.\"",
    npc_teacher_2: "Lehrer: \"Ein Drache ohne Drachenform... die anderen nennen es eine Behinderung, ein Schicksal für Krüppel. Ich nenne es eine Chance, die Welt aus einer Perspektive zu sehen, die dem Himmel verborgen bleibt.\"",
    npc_teacher_3: "Lehrer: \"Deine innere Magie ist wie der Regen Draconias – sie muss fließen. Ein satter Magen ist dein Anker; wenn dein Körper genährt ist, wirkt deine Magie am effizientesten.\"",
    npc_teacher_4: "Lehrer: \"Die Ahnen wussten, dass wahre Kraft aus der Verbindung zur Tiefe kommt. Studium und Wissen sind deine wahren Schwingen, auch wenn sie für das Auge unsichtbar bleiben.\"",
    npc_teacher_5: "Lehrer: \"Es ist Zeit. Die Wurzeln des Weltenbaums rufen. Dort, tief im Herzen der Insel, liegt die Antwort auf die Stille in deinem Blut.\"",
    npc_townHall_1: "Beamte: \"Noch ein Antrag? Der Stapel wird nicht kleiner. Komm später wieder... oder warte.\"",
    npc_townHall_2: "Beamte: \"Deine Akte ist... lückenhaft. Ein Drache ohne Drachenform. Ein Krüppel am Boden? Traurig, aber wir brauchen die Steuern trotzdem.\"",
    npc_townHall_3: "Beamte: \"Ich erkenne deine Bemühungen an. Stabilität am Boden nützt dem ganzen Dorf.\"",
    npc_townHall_4: "Beamte: \"Fast geschafft. Die Mühlen der Bürokratie mahlen langsam, aber sie mahlen für dich.\"",
    npc_townHall_5: "Beamte: \"Hier ist deine offizielle Landurkunde. Du hast dir deinen Platz auf dieser Insel verdient.\"",
    npc_blacksmith_1: "Schmied: \"Metall lügt nie. Es ist entweder stark oder es zerbricht unter dem Hammer.\"",
    npc_blacksmith_2: "Schmied: \"Das Feuer am Boden brennt heißer als in den Wolken, Wanderer. Merk dir das.\"",
    npc_blacksmith_3: "Schmied: \"Guter Schlag. Du hast Kraft in den Armen, auch ohne Schwingen.\"",
    npc_blacksmith_4: "Schmied: \"Ich werde dir zeigen, wie man das Eisen zähmt. Es braucht Willen, keinen Flug.\"",
    npc_blacksmith_5: "Schmied: \"Am Amboss sind wir alle gleich. Lass uns gemeinsam das Dorf stärken.\"",
    npc_sage_1: "Alter Weiser: \"Deine Herkunft ist ein Geheimnis, Wanderer. Dass deine Form dir verwehrt bleibt, muss einen Grund haben. Nimm dieses Buch.\"",
    npc_sage_2: "Alter Weiser: \"Deine Magie beginnt zu fließen. Der Boden erkennt dich an und nährt deinen Geist.\"",
    npc_sage_3: "Alter Weiser: \"Spürst du das Zittern? Das ist das Herz von Draconia, das unter deinen Füßen schlägt.\"",
    npc_sage_4: "Alter Weiser: \"Du hast die Reife erlangt. Der Pfad zum Herz der Welt offenbart sich nur denen ohne Flügel.\"",
    npc_sage_5: "Alter Weiser: \"Geh nun. Der Baum des Lebens wartet im Wald der Ahnen. Er ist der Anfang und das Ende deines Weges.\"",
    npc_treeOfLife_1: "Baum des Lebens: \"Willkommen, Wanderer. Deine Flügel sind nicht aus Federn oder Schuppen, sondern aus Treue zum Boden gewachsen. Hier endet dein Suchen – und dein Platz in dieser Welt ist auf ewig gesichert.\"",
    npc_hunter_1: "Jäger: \"Der Wald beobachtet dich. Bleib leise, wenn du überleben willst.\"",
    npc_hunter_2: "Jäger: \"Dein Tritt ist sicherer geworden. Du fängst an, den Atem der Erde zu hören.\"",
    npc_hunter_3: "Jäger: \"Hier, nimm diesen Bogen. Er wird deine Stimme im Dickicht sein, wenn du ihn achtest.\"",
    npc_hunter_4: "Jäger: \"Verschwende niemals ein Leben. Der Boden gibt uns alles, aber er nimmt auch zurück.\"",
    npc_hunter_5: "Jäger: \"Die Schatten gehören uns beiden nun. Ich jage an deiner Seite, Gefährte.\"",
    // Fehlschläge
    fail_energy: "Zu erschöpft.",
    fail_magic: "Nicht genug Magie.",
    fail_resources: "Nicht genug Ressourcen.",
    fail_full_wood: "Holzlager voll.",
    fail_full_stone: "Steinlager voll.",
    fail_full_meat: "Fleischlager voll.",
    fail_full_shards: "Geldbeutel voll (Max Splitter).",
    fail_salary: "Nicht genug Splitter für Gehälter! Arbeit eingestellt.",
  },
};
