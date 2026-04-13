# Game Design Document: Your Earned Wings

**Status:** v1.4 — In Entwicklung  
**Ästhetik:** Dark Academia · Somber Cozy · Mystical Forest

---

## 1. Vision Statement

> _Während die Dorfbewohner den Himmel bewohnen, findest du deine Stärke im festen Boden._

**Your Earned Wings** ist eine atmosphärische Simulation über Entschleunigung und Identität. Ein flügelloser Charakter baut sich am Rande eines Dorfes von "Geflügelten" ein Leben durch Handwerk, Wissen und Gemeinschaft auf.

---

## 2. Spielmechaniken

### 2.1 Ressourcen
| Ressource | Erwerb | Verwendung |
| --------- | ------ | ---------- |
| **Holz** | Sammeln / Schlagen | Bauen & Handwerk |
| **Stein** | Sammeln / Klopfen | Bauen & Handwerk |
| **Fleisch** | Jagen | Nahrung & Handel |
| **Splitter** | Handel / Arbeit | Währung |

### 2.2 Energie & Magie
- **Keine passive Regeneration**: Pausen und Nahrung müssen aktiv geplant werden.
- **Studium**: Erhöht das Magie-Limit permanent (benötigt Tisch + Buch des Wissens).

### 2.3 NPC Mentor-System
NPCs schalten durch Fortschritt (X/5) neue Fähigkeiten frei:
- **Jäger**: Lehrt Bogenbau (Stufe 2) und Jagd (Stufe 5).
- **Handwerker**: Lehrt Werkzeugbau (Stufe 3).
- **Alter Weiser**: Schenkt Wissen (Stufe 1).

### 2.4 Housing & Synergien
- **Lagerfeuer**: +10 Erholung, schaltet NPC Blumenmädchen frei.
- **Zelt**: Schaltet Stadtverwaltung und Lager-Erweiterungen frei.
- **Hütte**: Basis für Phase 2, schaltet Möbel frei.
- **Ofen**: Verdoppelt Energie-Regeneration durch Beeren.
- **Stuhl + Tisch**: Verdoppelt Fortschritt beim Studieren.

---

## 3. UI & UX

- **Haupt-Tab (ehem. Story)**: Zentrum für alle Ressourcen-Aktionen (Sammeln, Jagen).
- **Glassmorphismus**: Dunkles, transparentes Design mit Fokus auf Atmosphäre.
- **Hard-Reset**: Funktion zum Zurücksetzen des Fortschritts in den Einstellungen.

---

## 4. Technisches Design

- **Runtime**: Electron
- **Persistenz**: LocalStorage mit Auto-Save.
- **Sprachen**: Vollständige Lokalisierung (DE/EN) ohne Hardcoding.
- **Packaging**: Windows .exe via Electron Packager mit integriertem Icon.

---
_Zuletzt aktualisiert: April 2026 · v1.4_