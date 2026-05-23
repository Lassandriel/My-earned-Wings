# Addon-System — Lücken & Arbeitsliste

> **Status: Priorität 1. Das ist der einzige Plan. Bis diese Liste
> komplett abgearbeitet ist, kommt nichts anderes dazu.**
>
> Diese Liste lebt — Häkchen kommen rein wenn Sachen fertig sind,
> aber neue Punkte sind nur erlaubt wenn sie aus der bereits
> existierenden Struktur folgen. Kein Scope-Creep aus anderen
> Quellen.

Status-Marker:
- ✅ Fertig
- ⚠️ MVP fertig, Tiefe fehlt
- ❌ Offen

---

## 🔧 Patches — ✅ **Sektion komplett**

> Alle 10 Inhalts-Kategorien sind patchbar. Patches funktionieren
> identisch in build-time + runtime, fail-fast im Build (`throw`),
> nachsichtig im Runtime (`warn`).

**Was geht (alphabetisch):**

- **Actions**
  - ✅ `prependSteps`
  - ✅ `replaceStep`
  - ✅ `removeStep`
  - ✅ `addOnSuccess`
  - ✅ `addRequirement`
  - ✅ `modifyCost`
  - ✅ `setIcon` / `setImage`
- **NPCs**
  - ✅ `image` / `color` / `icon` ändern
  - ✅ `dialogues` ergänzen (`mergeDialogues`)
  - ✅ `chapter` umhängen (`setChapter`)
  - ✅ `location` umhängen (`setLocation`, leerer String = renderer default)
- **Items**
  - ✅ Modifier ergänzen (`addModifiers`)
  - ✅ `spaceCost` ändern
  - ✅ `image`
- **Andere Kategorien**: bisher null Patch-Ops für resources,
  modifiers, buffs, homes, milestones, navigation, sections
  - ✅ Resources: `setInitial`, `setInitialLimit`, `setColor`
  - ✅ Modifiers: `setBaseValue` — rebalanciert die Default-Werte
    (limits, focus-cost, regen-rates, etc.)
  - ✅ Buffs: `setDuration`, `addModifiers`
  - ✅ Homes: `setCapacity`, `setImage`
  - ✅ Milestones: `addRequirement`, `addOnUnlock`
  - ✅ Navigation: `setIcon`, `setImage`, `setLabel`, `setRequiredFlag`
  - ✅ Sections: `setHeaderLabel`, `setRequiresFlag`, `setActionCategory`

---

## 🎨 UI / Views — 🚧 **aktuelle Arbeitssektion**

**Reihenfolge nach Hebelwirkung:**

1. ✅ **Sub-Tabs sind data-driven** — neue Content-Kategorie
   `subTabs` mit `parentView` Feld. Base shippt seine 2 Tabs als
   YAML; Addons können beliebige Sub-Tabs für `parentView: main`
   hinzufügen (oder spätere views). Visibility automatisch
   abgeleitet aus aktiven Sections (oder explizit über
   `alwaysShown` / `requiresFlag`). Patches für subTabs noch nicht
   im Patch-System (bei Bedarf nachrüstbar).
2. ✅ **Addons können CSS shippen** über `styles/*.css`. Build-Time-
   Addons werden zur Build-Zeit in `src/generated/addon-styles.css`
   konkateniert und über main.ts importiert (Vite bundled mit).
   Runtime-Addons liefern CSS-Strings per IPC mit; Renderer injiziert
   sie als `<style data-addon-style="<addon>/<file>">` Tags am Boot.
3. ✅ **Slot-Injection in existierende Views.** Base-Views deklarieren
   `<div data-slot="<id>">`-Marker, Addons shippen
   `slots/<id>.html`. Build-Time-Slots werden zur Build-Zeit in
   `src/generated/addon-slots.ts` als typed Map kompiliert, Runtime-
   Slots kommen per IPC. Slot-Service injiziert beim Boot in matching
   Container und ruft `Alpine.initTree` für die neuen Nodes, damit
   x-show/x-text/etc. live wird. De-Dup via `data-addon-slot` Attr.
   **Base-Views müssen ggf. Slot-Marker zugefügt werden** — heute
   gibt's noch keine etablierten Slots, das ist Sache der jeweiligen
   View-HTML wenn ein Addon Bedarf hat.
4. ❌ **Settings-Menü, Pause-Menü, Save-Dialog** sind Base-Game-exklusiv.
   Niedrigster Bedarf (Addons sollten sich aus diesen Kern-UIs eher
   raushalten), letzter Punkt.
5. ❌ **Audio-Pipeline für Addons nicht etabliert** — actions haben
   `sfx: <key>`, base ships sounds unter `/public/sfx/`. Pfad-
   Convention für Addons (z.B. `/public/sfx/addons/<name>/`) noch
   nicht festgelegt + nicht von `check-assets` validiert

---

## ⚙️ Engine / Code — Runtime-Addons stark eingeschränkt

- ❌ **Runtime-Addons können kein `handlers.ts` shippen** (TS braucht
  Build) — nur Build-Time-Addons
- ❌ **Addons können keine neuen Effect-Types registrieren**
  (`modifyResource`, `addBuff`, etc. sind base). Wenn ein Addon
  "summonShadow" als Effekt will, muss Base-Game erweitert werden
- ❌ **Keine neuen Modifier-Keys** — addons können nur existierende
  Pipeline-Keys nutzen
- ❌ **Keine neuen State-Felder in `GameState`** — wenn ein Addon
  "shadowEnergy" als eigene Resource-artige Sache braucht, muss das
  im Type definiert sein
- ❌ **Kein System-Tick-Hook** für periodische Addon-Logik
- ❌ **Hardcoded NPC-IDs in TS-Code** (z.B. `village.logic.ts`
  hat npc-teacher-spezifische Fehlermeldungen) — kein Mechanismus
  für Addon-NPCs sowas zu liefern ohne handlers.ts (build-time)
- ❌ **Particle-Types sind fixed** — Renderer kennt nur die
  base-Types, unbekannte sind unsichtbar
- ❌ **`PRIMARY_ACTIONS` hardcoded** (F1/F2/F3 = act-rest/-meditate/-eat),
  Addons können keine eigenen Hotkey-Bindings hinzufügen
- ❌ **Fixed Item-Categories & Resource-Categories** in TS-Enums —
  Addons können keine neue Category wie `'reagent'` deklarieren
- ❌ **Schema-Validierung ist fixed** — Addons können keine
  eigenen Pflichtfelder für ihre Entries definieren

---

## 💾 Saves — Addon-Awareness fehlt

- ✅ **Save kennt jetzt welche Addons aktiv waren** — wenn jemand
  Vandara entfernt nach 20h Spielzeit, wird der Spieler beim Laden
  per Toast gewarnt
- ❌ **Keine Save-Migration aus Addons** — wenn Vandara v0.2 einen
  Flag umbenennt, alte v0.1-Saves brechen
- ⚠️ **Beim Laden gibt's nur einen Toast**, keinen Warn-Dialog
  "Dieser Spielstand braucht Addon X v0.3 — du hast v0.1.
  Trotzdem laden?"

---

## 🤝 Inter-Addon

- ❌ `requires:` in manifest wird geparst aber **nicht erzwungen**
- ❌ Keine Runtime-Abfrage **"ist Addon X geladen?"**
- ❌ Override-Kollisionen zwischen 2 Addons: nur warning, **kein
  Resolver**

---

## 🔍 Audit "Was kann base, das Addons nicht können?"

> Durchgeführt vor dem Start der UI/Views-Sektion, um die Lücken-
> Liste zu validieren. Drei Buckets: **Parität bestätigt** (base
> nutzt das, Addons auch), **schon als Gap bekannt** (anderswo in
> diesem Doc), **NEU entdeckt** (muss in die Liste).

### ✅ Parität — base und Addons können das gleiche

- Alle 10 Content-Kategorien als YAML
- Translations (overrides + neue Keys, beide mit warning auf Kollision)
- View-Fragments als top-level Tabs
- Sections in Sub-Tabs
- `handlers.ts` mit `customExecute` (build-time)
- Assets unter `public/img/addons/<name>/` (gleicher Pfad-Style wie base)
- Patches (alle 10 Kategorien)
- Manifest-Validierung greift gleich

### 📋 Schon als Gap bekannt — siehe Sektionen oben

- Sub-Tabs zu Main hinzufügen (🎨 UI/Views #1)
- Addon-CSS shippen (🎨 UI/Views #2)
- HTML-Slot-Injection (🎨 UI/Views #3)
- Settings/Pause/Save-Dialoge (🎨 UI/Views #4)
- Runtime-`handlers.ts` (⚙️ Engine)
- Custom Effect-Types (⚙️ Engine)
- Neue Modifier-Keys (⚙️ Engine)
- Neue State-Felder (⚙️ Engine)
- System-Tick-Hook (⚙️ Engine)
- Save-Migration aus Addons (💾 Saves)
- Modal-Dialog beim Laden (💾 Saves)
- `requires:` erzwingen + addonLoaded check + Override-Resolver (🤝 Inter-Addon)

### 🆕 NEU entdeckt durch das Audit

Diese Lücken stehen so noch nicht in der Liste:

**⚙️ Engine — vergessene Items:**

- ❌ **Hardcoded NPC-IDs in TS-Code**: `src/features/village/village.logic.ts`
  hat NPC-spezifische Sonderfälle (z.B. spezielle Fehlermeldung bei
  `npc-teacher` ohne Haus). Ein Addon-NPC kann das nicht — nur via
  customExecute-Handler, was Runtime-Addons gar nicht haben.
- ❌ **Particle-Types**: actions haben `particleType: <key>`,
  Renderer hat hardcoded particle-shapes per Type. Addons können
  eigene Strings nutzen, aber der Renderer ignoriert unbekannte
  Types stillschweigend → unsichtbare Effekte.
- ❌ **SFX-Convention für Addons**: actions haben `sfx: <key>`,
  base ships audio in `/public/sfx/`. Können Addons SFX-Dateien
  shippen? Pfad-Convention nicht etabliert / nicht dokumentiert,
  wahrscheinlich aber technisch möglich. **Audit-Aufgabe.**
- ❌ **`PRIMARY_ACTIONS` hardcoded**: F1/F2/F3 Hotkeys binden
  `act-rest`/`act-meditate`/`act-eat`. Addons können keine eigenen
  Hotkey-Bindings hinzufügen.

**🏗️ Schema/Type-System — vergessene Items:**

- ❌ **Fixed Item-Categories**: `'tools' | 'items' | 'furniture' |
  'addon' | 'food' | 'lore'` ist ein TS-Enum. Addons können keine
  neue Category wie `'reagent'` definieren.
- ❌ **Fixed Resource-Categories**: Renderer gruppiert nach festen
  Category-Strings. Neue Categories vermutlich invisible.
- ❌ **Schema-Validierung ist fixed**: Build-Skript validiert
  Standard-Schema. Addons können nicht eigene Pflichtfelder für
  ihre Entries deklarieren (z.B. ein Schatten-Addon will, dass
  alle seine Items ein `shadowAffinity` Feld haben).

**📦 Distribution — vergessene Items:**

- ❌ **Audio-Pipeline für Addons**: Pfad + Convention nicht
  dokumentiert (siehe SFX oben).
- ❌ **Asset-Validierung läuft nur über base**: `check-assets`
  script weiß nicht von Addon-Asset-Pfaden.

## 🏗️ Zukunfts-Item — "Base als Core-Addon"

> **Nicht jetzt. Erst nachdem alle anderen Lücken hier durch sind.**

Heute: `content/base/` ist explizit anders behandelt als
`content/addons/*` (Build-Skript skippt es nicht weil's "base"
heißt, aber es ist überall der "Standard" und Addons sind die
"Erweiterungen").

Ziel: `content/base/` → `content/addons/_core/` (oder ähnlich)
verschieben, marked `required: true` (kann nicht deaktiviert
werden). Dadurch:

- Keine "base vs addon"-Sonderfälle im Code mehr
- Addon-System ist stress-getestet, weil base es nutzt
- Modder können theoretisch ganze Kern-Bereiche durch andere
  Addons ersetzen (z.B. "Anderes-Dorf"-Mod als
  Core-Addon-Replacement)

**Wann angehen**: Nachdem die unten gelisteten Punkte (UI/Views,
Engine, Saves-Tiefe, Inter-Addon) ALLE durch sind. Sonst Risiko
"base bewegt, X nicht möglich, gestrandet."

---

## 🏆 Was am schmerzhaftesten ist

1. **Mehr Patch-Ops** — ✅ **fertig**, alle 10 Kategorien patchbar
2. **Save-Awareness** — Spieler verlieren Stunden, wenn Addon weg ist
   - ✅ MVP fertig
   - ❌ Tiefe (Migration aus Addons, Modal-Dialog) offen
3. **🎨 UI/Views — Sub-Tabs / CSS / Slots** — größter Hebel für
   Addon-Sichtbarkeit ⬅️ **als nächstes dran**
4. **Custom Effect-Types als data-driven Mechanik** — würde
   Schatten-Helfer, alte Vandara-Vorhaben, Mods generell ermöglichen
5. **Inter-Addon** — requires erzwingen, runtime-Check
