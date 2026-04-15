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

### 2.2 Vitality & Magic
- **No Passive Regeneration**: Energy and Magic must be managed through active rest, meditation, and food.
- **Satiation**: High satiation (>80%) provides a 20% cost reduction, while low satiation (<20%) increases costs by 50%.
- **Study**: Permanently increases the magic limit.
    - Requires: **Sturdy Table** to enable the action.
    - Enhancements: **Chair** and **Books** (stored in the **Bookshelf**) increase the gain per study session.

### 2.3 NPC Mentor & Community System
NPCs unlock new abilities or items through repeated interaction (Progress X/5):
- **Baker & Teacher**: Available from the start; provide world-building and early-game flavor.
- **Hunter**: Teaches bowmaking (Level 2) and hunting (Level 5). Also offers meat trading.
- **Artisan**: Unlocked via Storage; teaches tool crafting (Level 3).
- **Flower Girl**: Unlocked via Campfire; gateway to magic/shards and unlocks the Blacksmith.
- **Blacksmith**: Advanced metalworking and tool refinement.
- **Ancient Sage**: Grants the *Book of Knowledge* (Knowledge Level 1).

### 2.4 Housing & Synergies
- **Campfire**: +10 energy recovery, unlocks the Flower Girl NPC.
- **Tent**: Enables storage expansions and unlocks the Town Hall.
- **House**: Permanent base, unlocks bed, chair, and stove.
- **Stove**: Significantly increases satiation and energy gain from food (Berries/Meat).
- **Furniture Synergies**: Combinations of furniture (e.g., Table + Chair + Bookshelf) maximize the efficiency of self-improvement actions.

### 2.5 Village & Companions (Mid-Game)
- **Assignments**: NPCs with maxed friendship can be assigned to work in the Village.
- **Passive Yield**: Companions generate resources (Wood, Meat, Magic) over time.
- **Salaries**: Each companion requires a salary in **Shards** per tick. If shards run out, work stops.

### 2.6 Titles & Traits
- **Milestones**: Performing actions cumulative amounts (e.g., chopping 100 wood) unlocks **Titles**.
- **Permanent Boni**: Each title provides a passive multiplier to yields, speed, or cost efficiency.

---

## 3. UI & UX

- **Tabbed Interface**:
    - **Main**: Core actions (Gathering, Hunting, Rest).
    - **Crafting**: Production of tools and basic items.
    - **Housing**: Expansion of the base and furniture.
    - **Village**: Assignment and management of Companions.
    - **Titles**: Overview of unlocked traits and progress.
    - **Chronicle**: A narrative journal of your journey.
- **Aesthetics**: Glassmorphism with dark, transparent layers and vibrant accent colors (Teal, Gold, Purple).
- **Juice**: White floating particles for successful actions and smooth transitions.

---

## 4. Technical Design

- **Runtime**: Electron (Cross-platform support).
- **Persistence**: LocalStorage with encrypted/structured savegames.
- **Localization**: Full DE/EN support through a centralized translation system.
- **Game Loop**: A background loop handles companion progress and periodic auto-saves.

---
_Last updated: April 2026 · v1.5_