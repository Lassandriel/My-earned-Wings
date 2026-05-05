# GAME DESIGN DOCUMENT - MY-EARNED-WINGS

## 1. Vision & Core Concept
`My-earned-Wings` is an atmospheric, narrative-driven incremental simulation. The player takes the role of a wingless wanderer in a world of flying beings (Draconia). The focus lies on "Grounded Survival", community building, and uncovering the mystery of one's own origin.

## 2. Technical Pillars (v1.2.1-stable)
- **Engine**: 1s Heartbeat Ticks with 100ms High-Frequency Task Tickers.
- **Precision**: Delta-Time Accumulator + Silent Resource Updates for performance.
- **Architecture**: Decentralized Alpine.js Stores (Breaking the Monolith).
- **Type Safety**: Strict `GameState` interface enforcement (No `any` policy).
- **UI**: Vanilla CSS (Glassmorphism) + Juice Feedback System.
- **Data**: Registry-first architecture (Data-driven Satiation & Cost scaling).
- **Simulation**: Grounded approach. No offline progress; simulation is only active while the application is running.
- **UI Architecture**: Atomic Utility System. All layouts must use standardized `panel-premium` and `card-premium` classes to ensure visual consistency.
- **Terminology Baseline**: 
    - Narratives: "Chronik" (Chronicle) 
    - Locations: "Werkstatt" (Workshop)
    - Categories: "Handwerk" (Crafting)
    - Resources: "Seelensplitter" (Soul Shards)

## 3. Core Mechanics

### 3.1 Vitality & Resources
- **Energy**: Primary resource for physical labor.
- **Magic**: Required for arcane research and automation.
- **Satiation**: A data-driven active drain system. It decreases based on individual resource `satiationDrain` values. Low satiation reduces worker efficiency and increases costs (capped for fairness).
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
---
Status: v1.2.1-stable · May 2026
