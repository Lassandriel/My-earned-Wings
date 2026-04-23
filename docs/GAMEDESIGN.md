# Game Design Document: Your Earned Wings

**Status:** v3.9 — Active Survival Update (Core 3.9)
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
- **Malus**: Satiation < 20% significantly increases Energy/Magic costs (up to 150% more drain at critical hunger).
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

To maintain clarity and long-term scalability, we strictly separate **Gameplay Entities** (what exists) from **System Logic** (how it behaves).

---

### 5.1 Gameplay Entities (World & Objects)

| Term          | Definition                                                   | Tech. Impl./Images | Obtainable via      | Usable in Tab | Notes                                  |
| :------------ | :----------------------------------------------------------- | :----------------- | :------------------ | :------------ | :------------------------------------- |
| **Items**     | Objects and consumables (e.g. materials, resources, meals).  | `img/items/`       | Gathering / Cooking | Inventory     | Stackable resources or consumables.    |
| **Tools**     | Equipment that provides permanent passive modifiers.         | `img/tools/`       | Workshop            | Passive       | Non-stackable, permanent upgrades.     |
| **Housing**   | Primary residences and base structures.                      | `img/housing/`     | Workshop / Story    | Housing       | Core progression gates.                |
| **Addons**    | Expansions to housing (e.g. rooms, storage upgrades).        | `img/addons/`      | Workshop / Story    | Passive       | Extends housing functionality.         |
| **Furniture** | Interior objects providing passive bonuses or new features.  | `img/furniture/`   | Workshop            | Housing       | Toggleable within the house interface. |
| **Blueprint** | Unlock state required for advanced construction or crafting. | `requirements`     | Story / NPC Trades  | Workshop      | Gates access to higher-tier content.   |

---

### 5.2 Actions & System Logic (Behavior & Mechanics)

| Term               | Definition                                                 | Tech. Impl.         | Usable in Tab | Notes                                                    |
| :----------------- | :--------------------------------------------------------- | :------------------ | :------------ | :------------------------------------------------------- |
| **Action**         | Any player-triggered interaction.                          | `executeAction`     | Main          | Core interaction layer.                                  |
| **Instant Action** | Action executed immediately without duration.              | No duration         | Main          | Example: Resting, Study.                                 |
| **Timed Action**   | Action with fixed duration that runs once.                 | `duration: X`       | Main          | Example: Cooking; often used for gated outcomes.         |
| **Loop Action**    | Repeatable action with progress that can run continuously. | `isLoopable: true`  | Main          | Primary resource generation loop; automatable.           |
| **Location**       | Organizational layer grouping actions by context or area.  | `locationId`        | Main          | Not a gameplay entity; used for structure and discovery. |
| **Modifier**       | Any value change applied to player stats or systems.       | `MODIFIER_REGISTRY` | Passive       | Can be permanent or temporary; core balancing element.   |
| **Buff**           | Temporary modifier with duration and visible feedback.     | `BUFF_REGISTRY`     | HUD / Items   | A presented form of modifiers with UI feedback.          |

---

> [!IMPORTANT]  
> **Minimum Registry Standard**: Every Gameplay Entity (Items, Tools, Housing, Addons, Furniture) MUST define the following fields for tooltips:  
> **Title, Description, Effect, Cost**

## 6. Development Best Practices

To ensure long-term maintainability and "Golden Master" quality:

1. **Zero Hardcoding**: Never write user-facing text directly in HTML or TS. Use `store.t(key, context)`.
2. **Registry-First**: All gameplay objects must be defined in `src/data/definitions/`. The engine must remain content-agnostic.
3. **Modifier Centralization**: Use `MODIFIER_REGISTRY` for all internal logic values (yields, costs, limits).
4. **Asset Integrity**: Every registry entry MUST have a valid icon or image path that passes the `check-assets` script.
5. **Logic Simulation**: All new features must pass `check-logic` to ensure game-breaking loops or unreachable states are avoided.
6. **Sensory Feedback**: Every active action must define `sfx` and `particleType` to ensure consistent player feedback.
7. **Strict Flag Access**: Always cast string keys to `FlagId` when accessing the `store.flags` object to maintain TypeScript integrity.
8. **Counter Utilization**: Use standardized counters (e.g., `wood`, `magic`) for tracking repeatability and milestones.
9. **Tooltip Consistency**: Every gameplay object (Item, Tool, Addon, etc.) MUST have a title, description, effect, and cost defined in the registry to ensure the dynamic tooltip system always has data to display.

---

Last updated: April 2026 · v3.9 - Active Survival Update
