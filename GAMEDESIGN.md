# Game Design Document: Your Earned Wings (Lassandriel)

**Status:** Draft v1.3 — In Entwicklung  
**Genre:** Narrative Life-Sim / RPG / Resource Management  
**Plattform:** PC (Electron / Vite / Alpine.js)  
**Ästhetik:** Dark Academia · Somber Cozy · Mystical Forest · Vibrant Accents

---

## 1. Vision Statement

> _Während die Dorfbewohner den Himmel bewohnen, findest du deine Stärke im festen Boden._

**Your Earned Wings** ist ein atmosphärisches Spiel über Entschleunigung, Identität und den Wert harter Arbeit. In einer Welt, in der Mobilität und Status durch das Fliegen definiert werden, spielt der Nutzer einen Charakter der am Boden bleiben muss.

Das Ziel ist nicht unbedingt das Fliegen selbst — sondern das **Verdienen** einer eigenen Identität durch Handwerk, Wissen und Gemeinschaft.

---

## 2. Kern-Säulen (Design Pillars)

1. **Erdung (Groundedness):** Jeder Fortschritt ist haptisch und manuell. Holz schlagen, Steine klopfen, Pfade säubern. Die Mechaniken betonen die Schwere der physischen Welt.
2. **Kontrast:** Ständiger visueller und narrativer Kontrast zwischen der Leichtigkeit der Geflügelten (NPCs) und der Anstrengung des Spielers.
3. **Wachsende Weisheit:** Magie und Wissen sind die Werkzeuge, um über physische Begrenzungen hinauszuwachsen.
4. **Visuelle Identität:** Das Flügel-Logo kommuniziert direkt den inneren Fortschritt des Spielers (Energie & Magie als Füllstand).
5. **Bewusste Entschleunigung:** Kein Auto-Regen. Kein Cooldown-Spam. Das Energiemanagement und die Lagerlimits sind die natürliche Bremse — nicht künstliche Timers.

---

## 3. Gameplay Loop

```
Sammeln/Arbeiten → Energie Management → Ressourcen ins Lager
     ↓                                          ↓
Bauen & Aufrüsten ←←←←←←←←←←←←←← Splitter verdienen
     ↓
NPC-Interaktionen → Rezepte & Fähigkeiten freischalten
     ↓
Crafting → bessere Werkzeuge → mehr Ertrag → höhere Limiten
     ↓
Haus bauen → Phase 2 (Magie, Zauberer, Flügel)
```

**Kein Cooldown-System.** Das Energiemanagement (100 EP, kein passiver Regen) und die Lagerkapazität (anfangs 10 Holz / 10 Stein) regulieren natürlich die Spielgeschwindigkeit. Wer spamt, leert nur schneller seine Energie.

---

## 4. Spielmechaniken (aktueller Stand)

### 4.1 Ressourcen & Ökonomie

| Ressource  | Startlimit | Früher erweiterbar durch |
| ---------- | ---------- | ------------------------ |
| Holz       | 10         | Holzlager (+10)          |
| Stein      | 10         | Steinlager (+10)         |
| Splitter ✦ | unbegrenzt | Handel, Arbeit           |

- **Splitter (✦):** Währung der Welt. Ausgabe-Ziele folgen in Phase 2 (Händler, Dorfmarkt, Magieshop).
- **Limit-System:** Das Inventar ist durch Lagerkapazität begrenzt. Das erzwingt frühzeitige Investitionen in Infrastruktur.

### 4.2 Energie & Magie

**Energie (Grüner Flügel — Physisch):**

- Start: 100 / 100
- Kosten: Zweige (−10), Kiesel (−15), NPC-Gespräche (−5 bis −25), Pfade (−30)
- Regeneration: Beeren essen (+5), Ausruhen (+10 bis +50 je nach Housing)
- **Kein passiver Regen** — bewusste Design-Entscheidung

**Magie (Violetter Flügel — Spirituell):**

- Start: 100 / 100 (Limit steigt durch Studieren)
- Kosten: Studieren (−20), Weiser (−20)
- Regeneration: Blick nach oben (+15)
- **Geplant:** Frühes Magie-Gameplay via Zauberer-NPC (Aktion "Aufräumen per Zauber")

**Visualisierung:** Die Flügelsilhouetten füllen sich dynamisch von unten nach oben (`clip-path: inset`) entsprechend dem Energie- bzw. Magieprozentsatz.

### 4.3 Housing & Bau (Progression)

Die Housing-Kette ist die sichtbare Beweislinie des Fortschritts:

```
🌿 Kein Lager
   ↓  5 Holz
🏕️ Lagerfeuer      → +10 Erholung · Schaltet Blumenmädchen frei
   ↓  15 Holz + 5 Stein
⛺ Zelt             → Mehr Platz · Schaltet Rathaus + Lager-Optionen frei
   ↓  20 Holz (Holzlager) + 20 Stein (Steinlager)
📦 Lager ausgebaut  → +10 Max-Holz/-Stein · Schaltet Handwerker frei
   ↓  40 Holz
🪑 Massiver Tisch   → Schaltet Studieren + Weisen frei
   ↓  50 Holz + 50 Stein + Landurkunde
🏠 Hütte           → Finales Ziel Phase 1 · +50 Holz-/Steinlimit
```

### 4.4 NPC-Beziehungssystem

NPCs werden durch Housing-Meilensteine freigeschaltet und haben einen **Fortschritts-Zähler (X/Y)** der im Button sichtbar ist (z.B. _"Bäcker 2/5"_).

| NPC           | Voraussetzung     | Belohnung                          |
| ------------- | ----------------- | ---------------------------------- |
| Bäcker        | Start             | Atmosphäre / Ruf                   |
| Lehrer        | Start             | Wissen / Atmosphäre                |
| Blumenmädchen | Lagerfeuer        | Schaltet Schmied frei (5/5)        |
| Rathaus       | Zelt              | Ermöglicht Hausbau                 |
| Handwerker    | Holz-/Steinlager  | Rezepte: Axt, Spitzhacke (3/3)     |
| Schmied       | Blumenmädchen 5/5 | Metallbau (geplant)                |
| Alter Weiser  | Tisch             | Buch des Wissens → Studieren (1/1) |
| **Zauberer**  | _(geplant)_       | Magische Aktionen im Early Game    |

### 4.5 Crafting-System

Rezepte werden durch NPC-Beziehungen freigeschaltet. Items verschwinden aus der Liste sobald gecrafted (one-time crafts).

| Item           | Kosten             | Effekt                              |
| -------------- | ------------------ | ----------------------------------- |
| Wanderstock    | 5 Holz             | +0.5 Holzertrag                     |
| Bett           | 25 Holz            | +25 Erholung beim Ausruhen          |
| Stuhl          | 10 Holz            | Studium: +10 anstatt +5 Magie-Limit |
| Steinaxt       | 20 Holz            | Erhöht Holzertrag auf 2/Aktion      |
| Spitzhacke     | 15 Stein + 10 Holz | Erhöht Steinertrag auf 2/Aktion     |

Craftingitems können **Bilder** hinterlegt haben (`image: '/img/...'`). Ohne Bild werden sie als Textkarte dargestellt.

---

## 5. Narratives Design

### 5.1 Die Chronik (Log-System)

Der Log ist das Herzstück der Story. Er hat **5 Eintragstypen** mit eindeutiger visueller Sprache:

| Typ         | Farbe          | Stil   | Verwendung                          |
| ----------- | -------------- | ------ | ----------------------------------- |
| `story`     | Sepia / Warm   | Kursiv | Intro-Sätze, narrative Momente      |
| `normal`    | Weiß/Grau      | Normal | Aktions-Logs: "3 Zweige gesammelt." |
| `success`   | Teal           | Normal | Splitter-Gewinn, Unlock             |
| `milestone` | Gold           | Fett   | Lagerfeuer gebaut, Meilensteine     |
| `failure`   | Rot (gedämpft) | Normal | "Zu erschöpft.", "Holzlager voll."  |

**Textregel:** Keine poetischen Texte in Aktions-Logs. Klar und direkt: _"5 Holz geschlagen."_ Atmosphäre kommt durch Story-Einträge, nicht durch Aktions-Feedback.

### 5.2 Intro-Sequenz

7 kursive Sepia-Logs beim ersten Spielstart, die die Welt etablieren — einer alle 2.5 Sekunden. Danach `hasSeenIntro = true`.

### 5.3 NPC-Perspektive

NPCs sehen den Spieler mit einer Mischung aus Mitleid und Neugier. Ihre Dialog-Logs sollen die Gesellschaft der Geflügelten widerspiegeln — nicht feindselig, aber distanziert.

---

## 6. Ästhetik & Technik

### 6.1 Farbpalette

| Bereich                | Farbe                               |
| ---------------------- | ----------------------------------- |
| Panel-Hintergrund      | Deep Slate / Navy + Glassmorphismus |
| Energie (Flügel links) | Smaragdgrün `#14b8a6`               |
| Magie (Flügel rechts)  | Violett `#8b5cf6`                   |
| Meilenstein / Gold     | `rgba(251, 191, 36)`                |
| Story / Atmosphäre     | Sepia `rgba(210, 180, 140)`         |
| Fehler                 | Rot `rgba(239, 68, 68)`             |

### 6.2 UI-Prinzipien

- **Detail-Box** (rechtes Panel): Immer sichtbar, stabile Größe — `opacity: 0` bei keiner Hover-Aktion, nicht `display: none`. Kein Layout-Jumping.
- **Fehlschlag-Feedback:** Button-Shake-Animation (0.35s) + Chronik-Eintrag mit Grund.
- **Kosten-Anzeige:** "Kostenlos" wenn cost = 0. Sonst "Kosten: X TYP".
- **Housing-Status:** Direkt unter den Flügeln im rechten Panel — prominenteste Position.
- **NPC-Buttons:** Format `"Name X/Y"` (z.B. "Bäcker 2/5").

### 6.3 Save-System

- **Auto-Load** beim Start (falls Spielstand vorhanden)
- **Auto-Save** alle 5 Minuten (silent, kein Log-Eintrag)
- **Manuelles Speichern** nach jeder erfolgreichen Aktion
- **Fehlerresistenz:** `try/catch` bei korrupten Speicherständen

---

## 7. Geplante Erweiterungen (Roadmap)

### Phase 2: Magie & Zauberei

- **Zauberer-NPC** im Early Game: Lehrt magische Aktionen. Erste Aktion: "Aufräumen per Zauber" (kostet Magie statt Energie, räumt Pfade effizienter auf).
- **Weitere Magie-Aktionen** die Splitter oder Energie sparen/ersetzen.
- **Splitter-Ausgabeziel:** Dorfmarkt, Händler, Magie-Items.

### Phase 3: Progression & Welt

- **Jahreszeiten:** Einfluss auf Ressourcen-Ertrag und benötigte Ausrüstung/Heizung.
- **Tagebuch-System:** Eigene Aufzeichnungen des Spielers, die sich mit NPC-Kontakten füllen.
- **Besitz-Tab:** Vollständige Item-Ansicht mit Bild, Effekt und Beschreibung.

### Late Game

- **Flügel-Metamorphose:** Durch Magie erschafft der Spieler eigene „Schwingen" — nicht zum Fliegen, sondern als Symbol der verdienten Identität. Verändert den Gameplay-Loop fundamental.
- **Ressourcen-Evolution:** Von manueller Sammlung zu halbautomatisierten Systemen.

---

## 8. Offene Design-Fragen

- Was können Splitter früh kaufen? (Händler-System fehlt noch)
- Wie soll der Zauberer visuell eingeführt werden? (Trigger: erstes Lagerfeuer? Oder Zelt?)
- Wie viele NPC-Beziehungsstufen soll es letztendlich geben?

---

_Zuletzt aktualisiert: April 2026 · v1.3_
