# Addon-System — Lückenliste

**Source of truth** für was das Addon-System NICHT kann. Wird Punkt
für Punkt abgearbeitet — Reihenfolge nach Pain-Prio am Ende des
Dokuments.

Beim Abhaken: `❌` → `✅` umstellen, kurzen Commit-Hash dazuschreiben.

---

## 🔧 Patches — viele Operationen fehlen noch

Aktuell unterstützt:
- `targetType: action` → appendSteps, prependSteps, replaceStep,
  removeStep, addOnSuccess, addRequirement, modifyCost, setIcon,
  setImage
- `targetType: npc` → bumpMaxProgress, addTradeActions, setIcon,
  setColor, setImage, mergeDialogues
- `targetType: item` → addModifiers, setSpaceCost, setImage
- `targetType: buff/resource/home/navigation/milestone/section` →
  jeweils 2-4 Basis-Ops

### Es fehlt noch:

- ❌ **Actions:** `setCategory`
- ❌ **NPCs:** `setChapter`, `setLocation`
- ❌ **Sections:** `appendActions` (für dynamische Action-Kategorien)
- ❌ **Modifier-Patches** komplett (bewusst übersprungen — sind reine
  Translation-Metadata, prüfen ob doch Use-Cases entstehen)
- ❌ **Generischer `setField`** als Fallback — riskant, übersprungen.
  Reanalysieren wenn neue Op-Wünsche auftauchen.

---

## 🎨 UI / Views — eingeschränkt

- ❌ **Sub-Tabs sind hardcoded in jeder View-HTML.** Orte hat
  "village/vandara"-Logik auto via npc.location, aber Main hat fixed
  "general/herstellen" — Addons können keinen neuen Main-Sub-Tab
  "Kampf" oder "Reisen" hinzufügen ohne HTML-Edit
- ❌ **Addons können kein CSS shippen.** Nur HTML-View-Fragments
- ❌ **Addons können nicht in spezifische Slots existierender Views
  injecten** — nur ganze Top-Level-Views oder Section-Karten
- ❌ **Settings-Menü, Pause-Menü, Save-Dialog** sind Base-Game-exklusiv
- ❌ **Warn-Modal beim Laden** wenn Addon fehlt — heute nur Toast,
  kein interaktiver "Sicher dass laden?"-Dialog

---

## ⚙️ Engine / Code — Runtime-Addons stark eingeschränkt

- ❌ **Runtime-Addons können kein `handlers.ts` shippen** (TS braucht
  Build) — nur Build-Time-Addons
- ❌ **Addons können keine neuen Effect-Types registrieren**
  (modifyResource, addBuff, modifyCounter, etc. sind base). Wenn ein
  Addon `summonShadow` als Effekt will, muss Base-Game erweitert
  werden. Use-Case: Schatten-Helfer-Mechanik (Sariels Drop 3)
- ❌ **Keine neuen Modifier-Keys** — addons können nur existierende
  Pipeline-Keys nutzen
- ❌ **Keine neuen State-Felder in GameState** — wenn ein Addon
  `shadowEnergy` als eigene Resource-artige Sache braucht, muss das
  im Type definiert sein
- ❌ **Kein System-Tick-Hook** für periodische Addon-Logik
- ❌ **Kein Boot-Hook** — Addon kann keinen Init-Code laufen lassen
- ❌ **Kein Save/Load-Hook** — Addons können nicht auf Save/Load
  reagieren (z.B. für Migration)

---

## 💾 Saves — Addon-Awareness MVP, Tiefe fehlt

- ✅ **Save kennt aktive Addons** (Name+Version) — `115de27`
- ✅ **Warn-Toast beim Laden wenn Addon fehlt** — `115de27`
- ❌ **Keine Save-Migration aus Addons** — wenn Vandara v0.2 einen
  Flag umbenennt, alte v0.1-Saves brechen. Addons brauchen einen
  Migration-Hook (z.B. `migrations.ts` neben `handlers.ts`).
- ❌ **Kein Warn-Modal** beim Laden — heute nur unauffälliger Toast.
  Sollte ein blocking Dialog "Spielstand braucht Addon X v0.3 — du
  hast 0.1 oder gar nicht. Trotzdem laden?" werden.

---

## 🤝 Inter-Addon

- ❌ **`requires:` in manifest wird geparst aber nicht erzwungen**
  (Build fail / Runtime warn wenn dep fehlt)
- ❌ **Keine Runtime-Abfrage "ist Addon X geladen?"** — Addons können
  ihren Content nicht conditional auf andere Addons aufbauen
- ❌ **Override-Kollisionen zwischen 2 Addons:** nur warning, kein
  Resolver. Aktuell wins-last-loaded silent.

---

## 🏆 Pain-Prio

1. ✅ **Save-Awareness** (P1) — fertig
2. ✅ **Mehr Patch-Ops** (P2) — fast fertig (nur 3 Restops + Doku)
3. ❌ **Custom Effect-Types data-driven** (P3) — bewegt
   Schatten-Helfer-Mechanik in Reichweite, würde alte
   Vandara-Vorhaben + generelle Mods ermöglichen
4. ❌ **Addon-CSS** (P5-Teil) — Polish, kein Show-Stopper
5. ❌ **Save-Migration & Modal** (P1-Tiefe)
6. ❌ **Inter-Addon Deps + Lifecycle-Hooks** (P4 + P6)
7. ❌ **UI: neue Sub-Tabs aus Addons, Slot-Injection** (P5-Rest)

---

## Workflow beim Abarbeiten

- Pro Iteration **EIN Block** (Patches, Effects, Saves, Inter-Addon, …)
- Erst Engine-Erweiterung, dann **Tests** dazu, dann **Doku**
  (`docs/ADDON_AUTHORING.md`)
- Tests grün halten (Baseline siehe `npm test`)
- check-all grün halten
- Base-Game-Änderungen **explizit** im Commit-Body kennzeichnen — nicht
  still mit Content vermischen
