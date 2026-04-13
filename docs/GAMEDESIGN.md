# Game Design Document: Your Earned Wings

**Status:** v1.4 — In Development  
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
| **Shards** | Trading / Working | Currency |

### 2.2 Energy & Magic
- **No Passive Regeneration**: Breaks and food must be actively planned.
- **Study**: Permanently increases the magic limit (requires Table + Book of Knowledge).

### 2.3 NPC Mentor System
NPCs unlock new abilities through progress (X/5):
- **Hunter**: Teaches bowmaking (Level 2) and hunting (Level 5).
- **Artisan**: Teaches tool crafting (Level 3).
- **Ancient Sage**: Grants knowledge (Level 1).

### 2.4 Housing & Synergies
- **Campfire**: +10 recovery, unlocks the Flower Girl NPC.
- **Tent**: Unlocks Town Hall and storage expansions.
- **Hut**: Base for Phase 2, unlocks furniture.
- **Stove**: Doubles energy regeneration from berries/food.
- **Chair + Table**: Doubles progress during study.

---

## 3. UI & UX

- **Main Tab**: Center for all resource actions (Gathering, Hunting).
- **Glassmorphism**: Dark, transparent design focused on atmosphere.
- **Hard Reset**: Function to reset progress in the settings.

---

## 4. Technical Design

- **Runtime**: Electron
- **Persistence**: LocalStorage with auto-save.
- **Localization**: Full localization (DE/EN) without hardcoding.
- **Packaging**: Windows .exe via Electron Packager with integrated icon.

---
_Last updated: April 2026 · v1.4_