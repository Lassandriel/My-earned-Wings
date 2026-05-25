# GAME DESIGN DOCUMENT - MY-EARNED-WINGS

## 1\. Vision & Core Concept

`My-earned-Wings` is an atmospheric, narrative-driven incremental simulation. The player takes the role of a wingless wanderer in a world of flying beings called *Dragonshifters*. The focus lies on grounded survival, community building, and uncovering the mystery of one's own origin.

## 2\. Design Pillars

* **Grounded simulation**: No offline progress. The world only advances while the application is running — the player is *present* with the world, not optimizing a spreadsheet that ran overnight.
* **Look & Feel**: Vanilla CSS Glassmorphism with a Juice Feedback System (particles, micro-animations, SFX) on every meaningful action.
* **Terminology Baseline** (German is canonical, English is the translation):
    * Main Tab: "Haupt" (Main) — where the player's actions live, including cooking/alchemy
    * Locations: "Werkstatt" (Workshop)
    * Categories: "Handwerk" (Crafting)
    * Resources: "Seelensplitter" (Soul Shards)

## 3\. Core Mechanics

### 3.1 Vitality & Resources

* **Energy**: Primary resource for physical labor.
* **Magic**: Required for arcane research and automation.
* **Satiation**: A data-driven active drain system. It decreases based on individual resource `satiationDrain` values. Low satiation reduces worker efficiency and increases costs (capped for fairness).
* **Soul Shards**: The primary currency earned through work.

### 3.2 Primary Game Loops

* **Gathering**: Manual collection of base materials in the Ground (Wood, Stone, Berries, Herbs, …).
* **Restoration**: Rest / Meditation / Eating to refill Energy, Magic, Satiation.
* **Construction**: Building base structures (Campfire, Tent, House) and home addons (Wood Storage, Kitchen, Arcane Sanctum).
* **Crafting**: Workshop turns raw materials into tools, furniture, and consumables.
* **Garden Cycle**: Plant → grow → harvest. Provides food and herbs without manual gathering once established.
* **Kitchen**: Combine raw food into prepared meals that restore more Satiation than the inputs.
* **NPC Bonds**: Multi-step storylines with village inhabitants. Each successful step can unlock new locations, blueprints, items, recipes, or further NPCs.
* **Lore Discovery**: Read books / scrolls obtained from NPCs. Reading sets story flags that gate downstream content (e.g. graduation, academy entry).
* **Magic & Focus**: Meditation produces Magic. Magic enables the Arcane Sanctum and "Arcane Focus" — a toggle that auto-repeats a chosen action while consuming Magic.
* **Trading**: Some merchant NPCs accept Soul Shards in exchange for materials, recipes, or rare items.
* **Passive Production**: Once built, certain structures (e.g. the Garden) generate resources over time without manual clicks.

### 3.3 Secondary Mechanics

* **Furniture**: Items placed in the home grant stat bonuses or unlock new features (e.g. an alchemy table enables brewing actions).
* **Buffs**: Time-limited modifier bundles applied by certain actions or items.
* **Milestones**: One-shot unlock markers that mark major progression beats (e.g. the Tree of Life finale).
* **Collection / Chronicle**: An in-game journal that tracks every story beat, NPC met, item discovered, and recipe unlocked.

## 4\. World Hierarchy

* **The Ground**: Starting area (Forest, Mine, Meadow).
* **The Village**: Social hub and trade center.
* **The Home**: The player's base, expandable with addons like the **Kitchen** and the **Arcane Sanctum** (Magic hub).
* **Vandara — The Rose-Gold Academy**: Planned official content addon. Reached after the village arc via Aria's letter; introduces academy mentors, branching specializations, alchemy, and the shadow reveal arc. Lives at `content/addons/vandara/`.
* **The Tree of Life**: The final milestone of the current demo.

## 5\. Important Stuff


| Resource | Acquisition | Use |
| -------- | ----------- | --- |
| **Energy** | Resting, sleeping, food | Actions in Main, NPCs, Crafting in workshop |
| **Magic** | Meditation | Spells, certain NPCs |
| **Satiation** | Food | The more satutation the more yield. If you're hungry you won't work as efficent! |

| Resource | Acquisition | Use |
| -------- | ----------- | --- |
| **Wood** | Gathering / Chopping | Construction & Crafting |
| **Stone** | Gathering / Mining | Construction & Crafting |
| **Meat** | Hunting | Food & Trading |
| **Shards** | Trading / Working | Currency |
| **Astral Shards** | Meditation (Sanctum) | Advanced Artifacts & Infusions |

| Entity | Definition | Obtainable via | Usable in Tab |
| :----- | :--------- | :------------- | :------------ |
| **Items** | Objects and consumables. | Gathering / Cooking | Inventory |
| **Tools** | Permanent passive modifiers. | Workshop | Passive |
| **Housing** | Primary residences and base structures. | Workshop / Story | Housing |
| **Addons** | Extensions like Kitchens or Sanctums. | Workshop / Story | Passive |
| **Furniture** | Objects providing bonuses or new features. | Workshop | Housing |

***

Status: v1.7.0 · May 2026