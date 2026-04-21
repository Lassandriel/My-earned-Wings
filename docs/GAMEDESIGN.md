# Game Design Document: Your Earned Wings

**Status:** v3.7 — TypeScript Hardened (Core 3.7)
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
| **Astral Shards** | Meditation (Sanctum) | Advanced Artifacts & Infusions |

### 2.2 Survival Stats & Magic

* **No Passive Regeneration**: Energy and Magic must be managed through active rest, meditation, and food.
* **Satiation**: Keeping satiation high is vital.
  * **Neutral**: Satiation > 20% allows normal operation.
  * **Malus**: Satiation < 20% significantly increases Energy/Magic costs (up to 50% more drain).
* **Resting**: Energy recovery is optimized; no satiation is drained during rest.
* **Study**: Permanently increases the magic limit (e.g., to 60 for the finale). Requires a **Sturdy Table** to enable.

### 2.3 NPC & Community

NPCs are the key to story progression, secrets, and the decentralized market.
* **Story Progression**: Deepening bonds (Level 5) with key inhabitants is required for the finale.
* **Decentralized Market**: There is no central marketplace. All trades occur on character cards (e.g., Baker buys Wood, Hunter buys/sells Meat).
* **Unlocks**: Key actions (like 'Work' or 'Study') are gated behind reputation or specific story milestones.

### 2.4 Construction & Capacity

* **Storage**: Starting capacity is **25**. Building specific **Stone and Wood Storages** expands this to 50.
* **The House**: Unlocks advanced upgrades (Kitchen, Sanctum, Garden) and further expands global storage limits to 125+.
* **Consolidated Crafting**: All buildings and furniture are managed via a single, unified construction registry.

### 2.5 Automation: Arcane Focus

Automation is a high-level feature unlocked via Archmage Aris:
* **Mechanism**: The ✨ **Arcane Focus** automates any `isLoopable` action.
* **Efficiency**: Consumes **3.0 Magic per second**.
* **Utility**: Replaces the **Energy cost** of an action with Magic, enabling continuous gathering.

---

## 3. UI & UX

* **Aesthetics**: Premium Glassmorphism with dark, transparent layers and vibrant accent colors (Teal, Gold, Purple).
* **Responsive Layout**: Native fluid grid supporting wide screens (1080p) down to tablet viewports.
* **Haptics**: Pulse-danger animations, magnetic hover effects, and progress-tracking scanbeams.

---

## 4. Technical Design

* **Runtime**: Electron / Vite / TypeScript.
* **Engine**: Draconia Engine 3.6 (The TypeScript Ascension).
* **Architecture**: Domain-Driven Modular Architecture.
* **Separation of Concerns**: Features are isolated in `src/features/`, while technical services reside in `src/core/`.
* **Type Safety**: 100% strict TypeScript coverage for all game IDs, IPC channels, and state.
* **Logic**: Content-agnostic engine; all gameplay rules, production loops, and milestones are managed via external registries.

---

Last updated: April 2026 · v3.6 TypeScript Hardened Update
