# Game Design Document: Your Earned Wings

**Status:** v3.7 — TypeScript Hardened (Core 3.7)
**Aesthetics:** Survival · Somber Cozy · High Fantasy

---

## 1. Vision Statement

> _While the villagers inhabit the sky, you find your strength on and in the solid ground._

**Your Earned Wings** is an atmospheric simulation about slowing down and identity. A wingless character builds a life on the edge of a village of "Winged" beings through crafting, knowledge, and community.

---

## 2. Gameplay Mechanics

### 2.1 Resources

| Resource          | Acquisition          | Use                            |
| ----------------- | -------------------- | ------------------------------ |
| **Wood**          | Gathering / Chopping | Construction & Crafting        |
| **Stone**         | Gathering / Mining   | Construction & Crafting        |
| **Meat**          | Hunting              | Food & Trading                 |
| **Shards**        | Trading / Working    | Currency                       |
| **Astral Shards** | Meditation (Sanctum) | Advanced Artifacts & Infusions |

### 2.2 Survival Stats & Magic

- **No Passive Regeneration**: Energy and Magic must be managed through active rest, meditation, and food.
- **Active Satiation Drain**: Satiation does **NOT** drain passively over time. It only decreases when **Energy** or **Magic** is consumed (Ratio: 10% of cost).
- **Malus**: Satiation < 20% significantly increases Energy/Magic costs (up to 50% more drain).
- **Resting**: Energy recovery is optimized; no satiation is drained during rest.
- **Study**: Permanently increases the magic limit (e.g., to 60 for the finale). Requires a **Sturdy Table** to enable.

### 2.3 NPC & Community

NPCs are the key to story progression, secrets, and the decentralized market.

- **Story Progression**: Deepening bonds (Level 5) with key inhabitants is required for the finale.
- **Decentralized Market**: There is no central marketplace. All trades occur on character cards (e.g., Baker buys Wood, Hunter buys/sells Meat).
- **Unlocks**: Key actions (like 'Work' or 'Study') are gated behind reputation or specific story milestones.

### 2.4 Construction & Capacity

- **Storage**: Starting capacity is **25**. Building specific **Stone and Wood Storages** expands this to 50.
- **The House**: Unlocks advanced upgrades (Kitchen, Sanctum, Garden) and further expands global storage limits to 125+.
- **Consolidated Crafting**: All buildings and furniture are managed via a single, unified construction registry.

### 2.5 Automation: Arcane Focus

Automation is a high-level feature unlocked via Archmage Aris:

- **Mechanism**: The ✨ **Arcane Focus** automates any `isLoopable` action.
- **Efficiency**: Consumes **3.0 Magic per second**.
- **Utility**: Replaces the **Energy cost** of an action with Magic, enabling continuous gathering.

---

## 3. UI & UX

- **Aesthetics**: Premium Glassmorphism with dark, transparent layers and vibrant accent colors (Teal, Gold, Purple).
- **Responsive Layout**: Native fluid grid supporting wide screens (1080p) down to tablet viewports.
- **Haptics**: Pulse-danger animations, magnetic hover effects, and progress-tracking scanbeams.

---

## 4. Technical Design

- **Runtime**: Electron / Vite / TypeScript.
- **Engine**: Draconia Engine 3.6 (The TypeScript Ascension).
- **Architecture**: Domain-Driven Modular Architecture.
- **Separation of Concerns**: Features are isolated in `src/features/`, while technical services reside in `src/core/`.
- **Type Safety**: 100% strict TypeScript coverage for all game IDs, IPC channels, and state.
- **Logic**: Content-agnostic engine; all gameplay rules, production loops, and milestones are managed via external registries.

---

## 5. Core Terminology (Glossary)

To maintain architectural integrity, we strictly distinguish between these categories:

| Term          | Definition                                                                 | Technical Implementation                |
| :------------ | :------------------------------------------------------------------------- | :-------------------------------------- |
| **Items**     | Objects and consumables (e.g. materials, resources). Includes meals/dishes. | `img/items/`                            |
| **Tools**     | Single-craft equipment acting as permanent passive upgrades with modifiers.  | `img/tools/`                            |
| **Housing**   | Primary residences and base structures.                                    | `img/housing/`                          |
| **Addon**     | Expansions and extensions (additional rooms or increased storage).         | `img/addons/`                           |
| **Furniture** | Interior objects; can be toggled to provide passive bonuses or features.   | `img/crafting/`                         |
| **Buff**      | Temporary status effects providing limited-time modifiers.                 | `BUFF_REGISTRY`                         |
| **Milestone** | Achievement-based triggers that advance the story or world state.          | `MILESTONE_REGISTRY`                    |
| **Blueprint** | Special items or flags required to unlock advanced construction.           | `Flag` (e.g. `blueprint-garden`)        |

> [!IMPORTANT]
> **Minimum Registry Standard**: Every entry in the registries (Items, Tools, Housing, Addons, Furniture) MUST define these fields for the tooltip: **Title, Desc, Effect, Cost**.

---

## 6. Development Best Practices

To ensure long-term maintainability and "Golden Master" quality:

1.  **Zero Hardcoding**: Never write user-facing text directly in HTML or TS. Use `store.t(key, context)`.
2.  **Registry-First**: All gameplay objects must be defined in `src/data/definitions/`. The engine must remain content-agnostic.
3.  **Modifier Centralization**: Use `MODIFIER_REGISTRY` for all internal logic values (yields, costs, limits).
4.  **Asset Integrity**: Every registry entry MUST have a valid icon or image path that passes the `check-assets` script.
5.  **Logic Simulation**: All new features must pass `check-logic` to ensure game-breaking loops or unreachable states are avoided.
6.  **Sensory Feedback**: Every active action must define `sfx` and `particleType` to ensure consistent player feedback.
7.  **Strict Flag Access**: Always cast string keys to `FlagId` when accessing the `store.flags` object to maintain TypeScript integrity.
8.  **Counter Utilization**: Use standardized counters (e.g., `wood`, `magic`) for tracking repeatability and milestones.
9.  **Tooltip Consistency**: Every gameplay object (Item, Tool, Addon, etc.) MUST have a title, description, effect, and cost defined in the registry to ensure the dynamic tooltip system always has data to display.

---

Last updated: April 2026 · v3.8 - Active Survival Update
