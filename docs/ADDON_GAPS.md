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

1. ❌ **Sub-Tabs sind hardcoded** in jeder View-HTML. Orte hat
   "village/vandara"-Logik auto via npc.location, aber Main hat fixed
   "general/herstellen" — Addons können keinen neuen Main-Sub-Tab
   "Kampf" oder "Reisen" hinzufügen ohne HTML-Edit. **Biggest win
   when fixed — viele Addon-Konzepte brauchen das.**
2. ❌ **Addons können kein CSS shippen.** Nur HTML-View-Fragments.
   Polish, kein Show-Stopper, aber wenn ein Addon einen neuen Tab
   hat, will man ihn auch stylen können.
3. ❌ **Addons können nicht in spezifische Slots existierender Views
   injecten** — nur ganze Top-Level-Views oder Section-Karten.
   Section-System reicht für "card-list mit Filter-Pattern", aber
   nicht für custom Layouts in z.B. NPC-Detail-Views.
4. ❌ **Settings-Menü, Pause-Menü, Save-Dialog** sind Base-Game-exklusiv.
   Niedrigster Bedarf (Addons sollten sich aus diesen Kern-UIs eher
   raushalten), letzter Punkt.

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
