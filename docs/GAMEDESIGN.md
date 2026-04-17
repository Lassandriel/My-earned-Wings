# Game Design Document: Your Earned Wings

**Status:** v1.5 — In Development  
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
| **Astral Shards**| Meditation (Sanctum) | Advanced Artifacts & Infusions |

### 2.2 Survival Stats & Magic
- **No Passive Regeneration**: Energy and Magic must be managed through active rest, meditation, and food.
- **Satiation**: Keeping satiation high is vital. 
    - **Neutral**: Satiation > 20% allows normal operation.
    - **Malus**: Satiation < 20% significantly increases Energy/Magic costs (up to 50% more drain).
- **Study**: Permanently increases the magic limit. Requires a **Sturdy Table** to enable.

### 2.3 NPC & Community
NPCs unlock new abilities or items through repeated interaction (Progress X/5):
- **Baker & Teacher**: Available from the start; provide world-building and early-game flavor.
- **Hunter**: Teaches bowmaking (Level 2) and hunting (Level 5).
- **Artisan**: Unlocked via Storage; teaches tool crafting (Level 3).
- **Flower Girl**: Unlocked via Campfire; gateway to magic and unlocks Ellie.
- **Ellie (Dream Wyvern)**: Unlocked via Flower Girl; provides Dream logic and time-speed-up bonuses.
- **Archmage Aris**: Unlocked via the Arcane Sanctum; provides Astral Magic.
- **Ancient Sage**: Grants the *Book of Knowledge*.

### 2.4 Housing & Synergies
- **Campfire**: Unlocks early NPC interactions.
- **House**: Permanent base, unlocks kitchen and sanctum.
- **Kitchen**: Enables Gourmet Cooking for powerful, time-based buffs.
- **Sanctum**: Enables Meditation for Astral Shards.
- **Garden**: Level 2 expansion allows parallel planting slots.

### 2.5 Automation & Flow (Loop Mode)
To manage the repetitive nature of survival, the **Loop Mode** allows for the automation of specific actions:
- **Scope**: Only actions tagged as `isLoopable` (Gathering, Mining, Watering) can be looped.
- **Logic**: The engine automatically restarts the action as long as requirements are met and the toggle is active.
- **Strategy**: Synergizes with Gourmet Meals to sustain high-speed automation.

---

## 3. UI & UX

- **Aesthetics**: Glassmorphism with dark, transparent layers and vibrant accent colors (Teal, Gold, Purple).
- **Juice**: Floating feedback text (`+1 Meat`), magnetic hover effects, and pulsing resource bars.
- **Tabs**: Modular architecture (Gameplay, Village, Upgrades, Story).

---

## 4. Technical Design

- **Runtime**: Electron.
- **Bilingual**: Centralized i18n system (DE/EN) with 100% parity.
- **Engine**: Draconia Engine 2.0 (Service-Oriented Architecture).
- **Latency**: Consolidated tickers (100ms for Progress, 1s for Buffs, 30s for Autosave).

---
_Last updated: April 2026 · v2.0 Hardened_