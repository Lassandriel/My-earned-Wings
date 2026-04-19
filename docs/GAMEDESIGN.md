# Game Design Document: Your Earned Wings

**Status:** v3.5 — Golden Master (Core 3.0)
**Aesthetics:** Survival · Somber Cozy · High Fantasy

---

## 1. Vision Statement

> _While the villagers inhabit the sky, you find your strength in the solid ground._

**Your Earned Wings** is an atmospheric simulation about slowing down and identity. A wingless character builds a life on the edge of a village of "Winged" beings through crafting, knowledge, and community.

---

## 2. Gameplay Mechanics

### 2.1 Resources

| Resource | Acquisition | Use |
| --------- | ------ | ---------- |
| **Wood** | Gathering / Chopping | Construction & Crafting |
| **Stone** | Gathering / Mining | Construction & Crafting |
| **Meat** | Hunting | Food & Trading |
| **Shards** | Trading / Working | Currency & Salaries |
| **Astral Shards** | Meditation (Sanctum) | Advanced Artifacts & Infusions |

### 2.2 Survival Stats & Magic

* **No Passive Regeneration**: Energy and Magic must be managed through active rest, meditation, and food.
* **Satiation**: Keeping satiation high is vital.
  * **Neutral**: Satiation > 20% allows normal operation.
  * **Malus**: Satiation < 20% significantly increases Energy/Magic costs (up to 50% more drain).
* **Study**: Permanently increases the magic limit. Requires a **Sturdy Table** to enable.
  * **Malus**: Satiation < 20% significantly increases costs.
* **Resting**: Energy recovery is optimized; no satiation is drained during rest.
* **Study**: Permanently increases the magic limit (e.g., to 60 for the finale).

### 2.3 NPC & Community

NPCs sind der Schlüssel zu Story, Geheimnissen und dem Markt.
* **Story-Progression**: Das Vertiefen von Bindungen (Level 5) ist notwendig für das Finale.
* **Dezentraler Markt**: Es gibt keinen zentralen Marktplatz. Handel findet individuell bei NPCs statt (Bäcker kauft Holz, Handwerker kauft Stein, Jäger handelt mit Fleisch).
* **Zugangsbeschränkungen**: Bestimmte Aktionen wie der „Tagelohn“ (Work) müssen erst questbasiert freigeschaltet werden (z.B. durch die Arbeitserlaubnis des Rathaus-Beamten).

### 2.4 Gehäuse & Kapazität

* **Lagerraum**: Startkapazität von **25** sorgt für einen strategischen Start. Lagergebäude erhöhen dies massiv.
* **Haus**: Kostet 40 Holz / 40 Stein. Schaltet Küche und Sanktum frei.

### 2.5 Automatisierung: Arkaner Fokus

Die Automatisierung ist ein exklusives Feature, das Magie erfordert:
* **Mechanismus**: Der ✨ **Arcane Focus** automatisiert jede `isLoopable` Aktion.
* **Kosten**: Verbraucht **3 Magie pro Sekunde**. Es gibt keine „Gratis-Dauerschleife“.
* **Nutzen**: Ersetzt die **Energiekosten** der Aktion durch Magie, was das Sammeln während Ruhephasen ermöglicht.

---

## 3. UI & UX

* **Aesthetics**: Glassmorphism with dark, transparent layers and vibrant accent colors (Teal, Gold, Purple).
* **Automation UI**: Loopable actions feature a "Magic Eye" ✨ toggle for Arcane Focus.
* **Tabs**: Modular architecture (Gameplay, Village, Upgrades, Story).

---

## 4. Technical Design

* **Runtime**: Electron / Vite.
* **Engine**: Draconia Engine 3.0 (The Golden Master).
* **Architecture**: 100% Data-Driven & Modular. Effects and Navigation are registered dynamically. The core systems are content-agnostic and rely on static registries for all gameplay rules.
* **Logic**: Modifiers, Passive Production, and Milestones are managed via specialized JSON-like registries.

---

Last updated: April 2026 · v3.5 Golden Master Update
