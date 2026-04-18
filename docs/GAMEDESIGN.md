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
    - **Malus**: Satiation < 20% significantly increases costs.
- **Resting**: Energy recovery is optimized; no satiation is drained during rest.
- **Study**: Permanently increases the magic limit (e.g., to 60 for the finale).

### 2.3 NPC & Community
NPCs are the gateway to story, secrets, and trade.
- **Story Progression**: Deepening bonds (Level 5) unlocks the finale.
- **Decentralized Commerce**: Trading is integrated directly into NPC interactions. There is no central marketplace; instead, the player trades with trusted community members.
- **Reputation-Gated Trades**: Trading options (e.g., selling wood to the Baker) unlock as the player increases their bond with the respective NPC.

### 2.4 Housing & Capacity
- **Storage**: Increased early-game capacity (50) allows for smooth house progression.
- **House**: Costs 40 Wood / 40 Stone. Unlocks Kitchen and Sanctum.

### 2.5 Automation: Arcane Focus
The core of late-game efficiency is the **Arcane Focus**:
- **Mechanism**: Automates any `isLoopable` action.
- **Drain**: Consumes **3 Magic per second** while active.
- **Benefit**: Replaces the **Energy cost** of the action with Magic, allowing effortless gathering while focused.

---

## 3. UI & UX

- **Aesthetics**: Glassmorphism with dark, transparent layers and vibrant accent colors (Teal, Gold, Purple).
- **Automation UI**: Loopable actions feature a "Magic Eye" ✨ toggle for Arcane Focus.
- **Tabs**: Modular architecture (Gameplay, Village, Upgrades, Story).

---

## 4. Technical Design

- **Runtime**: Electron / Vite.
- **Engine**: Draconia Engine 2.1 (The Arcane Shift).
- **Architecture**: Service-Oriented (SOA) with a centralized Event Bus and ValuePipeline for complex modifiers.

---
_Last updated: April 2026 · v3.0 Social Commerce Update_