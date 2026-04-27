# Game Design Document: Your Earned Wings

**Status:** v6.0 — Precision & Audit Release (Project Core 6.0)
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
- **Malus**: Satiation < 20% increases Energy/Magic costs. No satiation is drained during rest.
- **Study**: Permanently increases the magic limit. Requires a **Sturdy Table**.

### 2.3 NPC & Community

- **Story Progression**: Deepening bonds with inhabitants like **Mina** or **Aris** is required for the finale.
- **Decentralized Market**: Trades occur on character cards (e.g., Blacksmith sells Iron Parts).
- **Unlocks**: Key actions are gated behind reputation or specific story milestones.

### 2.4 Construction & Capacity

- **Registry-First**: Every furniture, addon, or tool is defined in a central registry.
- **The House**: Unlocks advanced upgrades (Kitchen, Sanctum, Garden) and sets the stage for the Aura Tower.

### 2.5 Automation: Arcane Focus

- **High-Precision Engine**: Automation uses a **Delta-Time Accumulator** to ensure zero resource loss.
- **Efficiency**: Consumes Magic per second to replace Energy costs of loopable actions.

---

## 3. UI & UX

- **Aesthetics**: Premium Glassmorphism with vibrant accent colors and magnetic hover effects.
- **Responsive Design**: Fixed layouts ensure no clipping on wide screens or tablet viewports.
- **Feedback**: Dynamic particle effects and serialized audit-compliant logs.

---

## 4. Technical Design

- **Engine**: Project Core 6.0 (The Audit Release).
- **Language**: 100% Strict TypeScript for all core systems and registries.
- **Persistence**: LZW-compressed save games for high-efficiency storage.
- **Reliability**: Automated Global Audit System for 100% logic and parity integrity.

---

## 5. Core Terminology (Glossary)

| Entity        | Definition                                 | Obtainable via      | Usable in Tab |
| :------------ | :----------------------------------------- | :------------------ | :------------ |
| **Items**     | Objects and consumables.                   | Gathering / Cooking | Inventory     |
| **Tools**     | Permanent passive modifiers.               | Workshop            | Passive       |
| **Housing**   | Primary residences and base structures.    | Workshop / Story    | Housing       |
| **Addons**    | Extensions like Kitchens or Sanctums.      | Workshop / Story    | Passive       |
| **Furniture** | Objects providing bonuses or new features. | Workshop            | Housing       |

---

## 6. Development Best Practices

1. **Zero Hardcoding**: Use `t(key)` for all text; support recursive parameter resolution.
2. **Registry-First**: Engine remains content-agnostic; all rules live in registries.
3. **Logic Integrity**: All changes must pass `npm run check-all` (unreachable flag detection).
4. **Precision-First**: Use `deltaTime` for all production and cost calculations.

---

Last updated: April 2026 · v6.0 - Precision & Audit Update
