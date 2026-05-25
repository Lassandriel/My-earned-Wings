# DEV TOOLS — My-earned-Wings

> Phase 4 · Standalone Electron-Fenster für Content-Inspektion und Live-Cheats

***

## Was ist das?

Ein zweites Fenster im Spiel, das Designern + Entwicklern hilft, schneller mit dem Spielinhalt zu arbeiten — **ohne im Code zu wühlen oder den Spielstand mühsam aufzubauen**. Statt jedes Mal stundenlang Holz zu sammeln um eine späte Aktion zu testen, klickst du einen Button und hast was du brauchst.

Aktuell **read-only Browser** für alle Registries plus **Live-Cheats**. Editor-Funktionen kommen in den nächsten Iterationen.

***

## Wie öffnen?

1. **Spiel im Electron-Modus starten:** `npm run dev`
2. Im Hauptfenster ganz oben rechts neben dem ⚙️ Button erscheint ein **🛠️ Werkzeug-Icon**
3. Drauf klicken → zweites Fenster öffnet sich

> **Hinweis:** Das 🛠️ Icon ist *nur sichtbar wenn der Spielstand in Electron läuft* (also wenn `window.electronAPI.openDevtools` existiert). In der nackten Browser-Vorschau (`vite` ohne Electron) ist es nicht da.

Falls du das Dev-Tools-Fenster schließt, öffnet ein erneuter Klick auf 🛠️ es einfach wieder. Falls es bereits offen ist, holt der Klick es nach vorne.

***

## Was kann ich da drin machen?

### Tabs

| Tab | Inhalt |
| --- | ------ |
| **Actions** | Alle 78+ Aktionen (Sammeln, Bauen, Quests, Story-Beats). Aus YAML-Build + TypeScript-Specials zusammengeführt. |
| **Items** | Crafting-Items, Möbel, Verbrauchsgegenstände aus `items.data.ts`. |
| **NPCs** | Dorfbewohner + Vandara-NPCs aus den Village/Vandara Registries. |
| **Modifiers** | Pipeline-Modifier (Calculation-Keys mit Base-Wert) aus YAML. |
| **Buffs** | Aktive Effekte aus `buffs.ts` (Definitionen, nicht laufende Buffs). |
| **Cheats** | Live-Befehle ans Hauptspiel. Siehe unten. |
| **Validation** | `npm run check-all` direkt im Fenster ausführen. Siehe unten. |
| **Modifier Tree** | Welche Quellen (Buffs/Items/Homes) wirken auf welchen Calculation-Key. |

### Suchen

Im Sidebar gibt's ein Filterfeld. Tippt sich live durch ID + Kategorie. Funktioniert pro Tab.

### Detail-Ansicht

Klick auf einen Eintrag links → rechts erscheint:

* Header mit ID + Kategorie
* **Stat-Cards** (Cost, Duration, Yield, Producer-Konfiguration, Space — was zutrifft)
* **YAML-Preview** des kompletten Eintrags

Praktisch zum schnellen Nachschlagen: „Wie hieß nochmal die Action ID für Schmieden?", „Was kostet Vandara-Quest 3?", „Welche Modifier ändern wood\_yield?".

***

## Cheats — Live-Befehle ans Spiel

Der **Cheats-Tab** ist der Hauptgrund warum das Tool für's Testen so wertvoll ist.

### Wie funktioniert das technisch?

Das Dev-Tools-Fenster und das Hauptspiel kommunizieren über die **BroadcastChannel API** des Browsers (Channel-Name: `mw-devtools`). Beide laufen im selben Origin (lokaler Vite-Server bzw. dieselbe Electron-App), darum sehen sie sich.

* **Dev-Tools** sendet eine Nachricht (`postMessage`)
* **Hauptspiel** hört zu (Listener in `src/main.ts`) und führt den Befehl aus
* Spielinhalt aktualisiert sich live, kein Reload nötig

Wenn der Channel nicht funktioniert (z.B. weil das Spiel-Fenster nicht offen ist), zeigt der Cheats-Tab unten ein **„✗ Not connected"** an.

### Verfügbare Cheats

| Bereich | Buttons | Was passiert |
| ------- | ------- | ------------ |
| **Quick stats** | „Max all stats & resources" | Ruft das vorhandene `settingsSystem.applyCheats` auf — alle Stats auf 9999, alle Limits auf 9999, alle Resourcen voll |
| **Quick stats** | +100 Energy / Magic / Satiation | Direkter Add auf den jeweiligen Stat (kein Limit-Check, läuft auch über Maximum) |
| **Resources** | +100 Holz / Stein / 50 Kräuter / Baumharz / Shards | Geht durch `resource.add()` → respektiert Limits (sammelt nicht über `getLimit()`) |
| **Flags** | Arcane Focus / School / Vandara unlock + Academy Phase 1/2/Graduate | Setzt das Flag auf `true`, invalidiert Pipeline + Resource Caches |
| **Activate buff** | Pro registriertem Buff ein Button (z.B. „buff-harvest (60s)") | Wendet den Buff via `addBuff` Effect-Handler an, gleiche Quelle wie In-Game |
| **NPCs** | „Unlock ALL NPCs" + pro NPC ein eigener Button | Routet durch `unlockNPC` Effect-Handler → Log-Entry fürs Unlock erscheint |
| **Jump to view** | main / crafting / upgrades / village / housing / collection / finale / menu | Setzt `store.view` direkt — Sprung zu beliebiger Game-View |
| **Demo / save management** | „Mark demo as completed" | Setzt `demoCompleted = true` + `unlocked-library` Flag |
| **Demo / save management** | „Wipe save & reload" (rot) | Löscht `wings_save` aus localStorage und lädt die Seite neu |
| **Custom resource** | Eigenes ID-Feld + Anzahl | Gleicher Pfad wie die Resource-Buttons, aber mit beliebiger Resource-ID |

### Wichtig

* Cheats **triggern automatisch ein Save** danach — wenn du also was Verqueres machst, am besten in einem Test-Slot oder mit einem Backup deines `wings_save` localStorage-Eintrags
* Stats-Cheats umgehen das Maximum (z.B. Energy 55/50 möglich) — gewollt, damit Tester:innen flexibel sind
* Resource-Cheats respektieren Limits — was im Spiel überhaupt nicht passt, wird einfach abgewiesen

***

## Editor-Modus (Iter 3)

Auf dem **Actions-Tab** erscheint im Detail-Header ein **„✎ Edit"** Button. Drauf klicken → Form mit den Top-Level-Scalar-Feldern und zwei dynamischen Listen erscheint:

**Top-Level-Scalars** (Iter 3):
- `category`
- `cost`
- `costType`
- `duration` (in ms)
- `yieldType`

**Nested Listen** (Iter 7):
- **Rewards**: Tabelle mit Resource-ID + Anzahl. „+ add reward" macht eine neue Zeile, „✕" entfernt eine. Numerische Werte werden Zahlen; Strings (z.B. Pipeline-Keys wie `wood_yield`) bleiben Strings.
- **Costs (multi-resource)**: gleiche Mechanik. Hier kannst du beliebig viele Kosten-Resourcen kombinieren statt nur einen einzigen `cost`/`costType`.

Zwei Save-Buttons:

- **„Save YAML only"** — schreibt die geänderten Felder zurück in die richtige `content/actions/*.yaml`. Spielinhalt bleibt unberührt bis du manuell rebuildest.
- **„Save & rebuild"** — schreibt UND ruft `npm run build:content` automatisch auf. Vite hot-reloaded das Hauptspiel mit den neuen Werten.

### Wichtig

- **Nur in Electron-Mode** verfügbar. In der Browser-Vorschau (vite ohne Electron) erscheint der Edit-Button nicht.
- **Kommentare in der YAML werden gestrippt** (Limitation von `js-yaml`). Falls du wichtige Kommentare hast — vor dem Editieren committen.
- **Requirements + onSuccess** sind weiterhin nicht im Editor — komplexere verschachtelte Strukturen brauchen direkten YAML-Edit.
- **Items / NPCs / Translations** sind aktuell nicht editierbar im Tool — die Files liegen in TypeScript (nicht YAML), das wäre ein eigener Migrations-Schritt.
- **Patch-only**: nur Felder die du tatsächlich änderst werden geschrieben. Andere Felder bleiben byte-identisch.
- **Komplettes Entfernen einer Liste** (alle Rewards/Costs auf null setzen) geht aktuell nicht über das UI — entferne dann manuell die Zeile im YAML.
- Vor dem Schreiben wird die neue YAML re-parsed → bei kaputtem Output kein Save (Original bleibt).

### Beispiel-Workflow

1. Dev-Tools öffnen
2. Actions-Tab → „chop_wood" anklicken
3. „✎ Edit" → cost auf 8 ändern (war 5)
4. „Save & rebuild" → Status zeigt „✓ Wrote and rebuilt"
5. Hauptspiel: chop_wood Tooltip zeigt jetzt „Cost: 8 Energy" — ohne Game-Reload

## Validation-Tab (Iter 5)

Klick auf **„▶ Run check-all"** → führt `npm run check-all` im Projekt-Root aus, Output landet direkt im Panel. Zeilen werden eingefärbt:

- 🔴 rot bei `✗` / `error` / `FAIL` / `fehlt`
- 🟡 gelb bei `⚠` / `warn`
- 🟢 grün bei `✓` / `OK` / `PASS` / `perfect`

Macht den Wechsel zwischen Game-Window und Terminal überflüssig wenn du Inhalt änderst und schnell prüfen willst ob alles noch konsistent ist.

---

## Modifier-Tree-Tab (Iter 6)

Sidebar listet alle 49 Calculation-Keys (z.B. `wood_yield`, `magic_regen_passive`, `arcane_focus_cost`, alle `*_limit` Keys). Hinter jedem steht in Klammern die Anzahl der Quellen die ihn modifizieren.

Klick auf einen Key → rechts:

- **Base value** (aus `MODIFIER_REGISTRY_GENERATED`)
- **Buffs** Liste mit `+X` / `×Y` Operationen
- **Items** Liste mit Kategorie + Operation
- **Homes** Liste

Beispiel `wood_yield`:
- Base: 3
- Buffs: `buff-harvest +1`
- Items: `item-walking-stick +1`, `item-axe ×2`, `item-cart-reinforced +1`

Praktisch fürs Balancing: „warum ist mein Holz-Yield plötzlich so hoch?" → Modifier-Tree → alles sichtbar.

---

## Wofür benutze ich das im Alltag?

### Beispiel-Workflows

**„Ich teste eine späte Quest und brauche viele Ressourcen schnell"**
→ Cheats-Tab → „Max all stats & resources" → Quest spielen → fertig. Statt 30 Min farmen, 1 Klick.

**„Ich entwerfe eine neue NPC-Quest und will die existierenden NPCs als Vorlage sehen"**
→ NPCs-Tab → Klick auf z.B. „npc-baker" → YAML-Struktur anschauen → eigene NPC-YAML danach modellieren.

**„Welche Modifier zielen auf `magic_regen_passive`?"**
→ Modifiers-Tab → Filter „magic\_regen" → alle Treffer auf einen Blick.

**„Ich will Demo-Ende testen ohne den Prologue zu durchklicken"**
→ Hauptspiel: Prologue durch (oder skip) → Dev-Tools → Cheats → Flags → die richtigen Phase-Flags setzen → Sprung zur entsprechenden View.

**„Bug-Report: Ein Spieler sagt Action X bricht ab"**
→ Actions-Tab → Filter „X" → Detail-Ansicht zeigt Cost/Requirements/onSuccess als YAML — schnell verifizieren ob die Definition stimmt.

***

## Was kommt noch (Roadmap)

| Iteration | Inhalt |
| --------- | ------ |
| ✅ MVP | Read-only Browser für Actions, YAML-Preview |
| ✅ Iter 2 | Tabs für alle Entity-Typen, Cheats-Panel |
| ✅ Iter 3 | **Editier-Modus** für Action-Top-Level-Felder + Auto-Rebuild |
| ✅ Iter 4 | Mehr Cheats (Buffs, NPCs, View, Demo, Save wipen) |
| ✅ Iter 5 | Validation-Panel (`npm run check-all` im Fenster) |
| ✅ Iter 6 | Modifier-Tree (welche Quellen wirken auf welchen Calculation-Key) |
| 🟢 Iter 7a | Nested Editor: rewards + costs als dynamische Listen |
| 🟡 Iter 7b | requirements + onSuccess für Actions; Items / NPCs / Translations editieren — diese leben noch in TS, brauchen YAML-Migration zuerst |

***

## Technische Details (für später)

* **Vite-Setup:** `vite.config.js` definiert zwei Entry-Points (`index.html` + `devtools.html`). Vite-Dev-Server liefert beide unter ihrer URL aus, der Build erzeugt zwei separate `.html`-Dateien in `dist/`.
* **Electron-Fenster:** `src/electron/main.ts` öffnet das zweite Fenster on-demand via IPC-Channel `OPEN_DEVTOOLS`. Wiederverwendet, falls schon offen (kein Doppelfenster).
* **Renderer:** `src/devtools/devtools.ts` ist eine **standalone Renderer-Datei** ohne Alpine.js — der gesamte Game-Runtime wird hier nicht geladen. Lediglich die Registries (TypeScript-Imports aus `src/data/` + `src/generated/content`) und `js-yaml` für die Preview.
* **BroadcastChannel-Protokoll:** Channel-Name `mw-devtools`. Nachrichtenformat:

    ```ts
    { type: 'addResource', resource: string, amount: number }
    { type: 'addStat', stat: string, amount: number }
    { type: 'setFlag', flag: string, value: boolean }
    { type: 'addBuff', buffId: string }
    { type: 'unlockNPC', npcId: string }
    { type: 'unlockAllNPCs' }
    { type: 'setView', view: string }
    { type: 'completeDemo' }
    { type: 'resetSave' }     // wipes localStorage + reloads
    { type: 'applyCheats' }
    ```

    Listener in `src/main.ts` (DOMContentLoaded → nach Alpine.start). Erweitern: einfach neues `case` im `switch` ergänzen + Button im Cheats-Panel mit passenden `data-*` Attributen.

***

*Gehört zu Phase 4 von [`docs/archive/ARCHITECTURE.md`](archive/ARCHITECTURE.md).*