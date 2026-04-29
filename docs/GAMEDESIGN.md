# GAME DESIGN DOCUMENT - MY-EARNED-WINGS

## 1. Vision & Core Concept
`My-earned-Wings` is an atmospheric, narrative-driven incremental simulation. The player takes the role of a wingless wanderer in a world of flying beings (Draconia). The focus lies on "Grounded Survival", community building, and uncovering the mystery of one's own origin.

## 2. Technical Pillars (v1.1.0-stable)
- **Engine**: 1s Heartbeat Ticks with 100ms High-Frequency Task Tickers.
- **Precision**: Delta-Time Accumulator to prevent resource loss.
- **UI**: Alpine.js + Vanilla CSS (Glassmorphism design).
- **Data**: Registry-first architecture (Actions, Resources, NPCs, Items).

## 3. Core Mechanics

### 3.1 Vitality & Resources
- **Energy**: Primary resource for physical labor.
- **Magic**: Required for arcane research and automation.
- **Satiation**: An active drain system. It only decreases when the player actively spends Energy or Magic. Higher hunger increases resource costs.
- **Soul Shards**: The primary currency earned through work.

### 3.2 The Progression Loop
- **Gathering**: Manual collection of base materials (Wood, Stone, Herbs).
- **Construction**: Building structures (Campfire, Tent, House) and addons (Wood Storage, Kitchen).
- **NPC Bonds**: Advancing storylines with village inhabitants to unlock new locations and blueprints.
- **Arcane Focus**: Background automation that consumes Magic to repeat actions.

## 4. World Hierarchy
- **The Ground**: Starting area (Forest, Mine, Meadow).
- **The Village**: Social hub and trade center.
- **The Home**: The player's base, expandable with addons like the **Kitchen** and the **Arcane Sanctum** (Magic hub).
- **The Tree of Life**: The final milestone of the current demo.

## 5. Narrative Direction
The story is told through environmental cues and NPC dialogues. The theme of "Weight and Ascent" is central. Progression is marked by **Titles** and **Milestones** rather than traditional levels, emphasizing the unique nature of the protagonist.

---
Status: v1.1.0-stable · April 2026
