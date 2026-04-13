# Game Design Document: Your Earned Wings (Lassandriel)

**Status:** Draft v1.4 — In Development  
**Genre:** Narrative Life-Sim / RPG / Resource Management  
**Platform:** PC (Electron / Vite / Alpine.js)  
**Aesthetic:** Survival · Somber Cozy · Mystical Forest · Vibrant Accents

---

## 1. Vision Statement

> _While the villagers inhabit the sky, you find your strength on solid ground._

**Your Earned Wings** is an atmospheric game about deceleration, identity, and the value of hard work. In a world where mobility and status are defined by the ability to fly, the user plays a character who must remain on the earth.

The goal is not necessarily to fly — but to **earn** one's own identity through craftsmanship, knowledge, and community.

---

## 2. Core Pillars (Design Pillars)

1. **Groundedness:** Every progression is haptic and manual. Chopping wood, breaking stones, clearing paths. The mechanics emphasize the weight of the physical world.
2. **Contrast:** Constant visual and narrative contrast between the lightness of the winged ones (NPCs) and the effort of the player.
3. **Growing Wisdom:** Magic and knowledge are the tools to grow beyond physical limitations.
4. **Visual Identity:** The wing logo directly communicates the player's inner progress (Energy & Magic as fill levels).
5. **Conscious Deceleration:** No auto-regen. No cooldown spam. Energy management and storage limits serve as natural brakes — not artificial timers.

---

## 3. Gameplay Loop

```
Gathering/Working → Energy Management → Resources to Storage
         ↓                                          ↓
Building & Upgrading ←←←←←←←←←←← Earn Shards
         ↓
NPC Interactions → Unlock Recipes & Abilities
         ↓
Crafting → Better Tools → Higher Yield → Increased Limits
         ↓
Build House → Phase 2 (Magic, Wizard, Wings)
```

**No Cooldown System.** Energy management (100 EP, no passive regen) and storage capacity (initially 10 Wood / 10 Stone) naturally regulate the game's pace. Those who spam simply deplete their energy faster.

---

## 4. Game Mechanics (Current State)

### 4.1 Resources & Economy

| Resource | Starting Limit | Early Expansion via |
| -------- | -------------- | ------------------- |
| Wood     | 10             | Wood Storage (+5)   |
| Stone    | 10             | Stone Storage (+5)  |
| Herbs    | 5              | Campfire built      |
| Meat     | 5              | Bow built           |
| Shards ✦ | unlimited      | Trade, Labor        |

- **Shards (✦):** Currency of the world. Can be spent early to purchase missing wood or expensive books of knowledge.
- **Limit System:** The inventory is restricted by storage capacity. This forces early investments into infrastructure.

### 4.2 Vitality, Magic & Satiation

**Energy (Green Wing — Physical):**

- Start: 100 / 100
- Costs: Twigs (−10), Pebbles (−15), NPC Conversations (−5 to −25), Paths (−30)
- Regeneration: Rest (+10 to +50 depending on Housing)
- **Satiation Impact:** If Satiation is < 25%, energy regeneration from resting is halved.

**Satiation (Amber Bar — Hunger):**

- Start: 80 / 100
- Decay: Every gathering or labor action costs −5 Satiation.
- Regeneration: Eat Berries (+15), Eat Meat (Full + Buff if Stove exists).

**Magic (Violet Wing — Spiritual):**

- Start: 100 / 100 (Limit increases by Studying)
- Costs: Study (−20), Sage (−20)
- Regeneration: Look Up (+15)

**Visualization:** The wing silhouettes fill dynamically from bottom to top corresponding to the energy or magic percentage. A dedicated status bar shows Satiation.

### 4.3 Housing & Building (Progression)

The Housing chain is the visible timeline of progression. It is divided into **Main Buildings** and **Extensions**.

```
🌿 No Shelter
   ↓  5 Wood
🏕️ Campfire        → +10 Rest · Unlocks Herbs & Flower Girl
   |
   +-- (Extension) 10 Wood → Wood Storage (+5 Max Wood)
   +-- (Extension) 10 Stone → Stone Storage (+5 Max Stone)
   ↓  15 Wood + 5 Stone
⛺ Tent            → More Space · Unlocks Town Hall
   ↓  50 Wood + 50 Stone + Land Deed
🏠 Cabin           → Final Goal Phase 1 · +50 Wood/Stone Limit, Enables Furniture Building
   |
   +-- (Extension) 15 Wood + 10 Stone → Stove (Cooking & Buffs)
```

### 4.5 Crafting System

Recipes are unlocked through NPC relationships. Items disappear from the list once crafted (one-time crafts).

| Item          | Cost               | Effect                              |
| ------------- | ------------------ | ----------------------------------- |
| Walking Stick | 5 Wood             | +0.5 Wood Yield                     |
| Stone Axe     | 20 Wood            | Increases Wood yield to 2/Action    |
| Pickaxe       | 15 Stone + 10 Wood | Increases Stone yield to 2/Action   |
| Bow           | 15 Wood            | Unlocks Hunting                     |
| Bed           | 25 Wood            | +25 Rest when Resting               |
| Chair         | 10 Wood            | Prerequisite for Solid Table        |
| Solid Table   | 40 Wood            | Enables buying Books via Trade      |
| Bookcase      | 30 Wood            | Increases Magic Limit when Studying |
| Stove         | 15 Wood + 10 Stone | Unlocks Meat/Herb Cooking           |

---

## 5. Narrative Design

### 5.1 The Chronicle (Log System)

The log is the heart of the story. It uses **5 entry types** with Juice animations:

- **log-slide-in**: New entries slide smoothly from the left.
- **Milestone Shimmer**: Major events get a golden shimmer effect.

---

## 7. Planned Expansions (Roadmap)

### Phase 2: Magic & Wizardry

- **Wizard NPC**: Teaches magical actions. First action: "Clean by Magic" (costs Magic instead of Energy).
- **Interactive Diary**: Player's own writings that fill up based on NPC interactions.

### Late Game

- **Wing Metamorphosis**: Through magic, the player crafts their own "Wings" — a symbol of earned identity.

---

## 8. Open Design Questions

- How should the Wizard be introduced visually? (Trigger: First Campfire? Or Tent?)
- Concrete Hunting Loop details: Specific loot drops and rarity levels for wild game.

---

_Last Updated: April 2026 · v1.5_
