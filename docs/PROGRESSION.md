# Progression Tree: Your Earned Wings

This document provides a detailed overview of the dependencies and unlock chains in Draconia, structured by chapters and systems, aligned with **Project Core 6.0 (Audit Hardened)**.

---

## Chapter 1: The Beginning (Village Life)

Focuses on basic survival and establishing a presence in the village.

```mermaid
graph TD
    Start[Start Drifting] --> Gather[Gather Twigs and Pebbles]
    Start --> Baker[NPC Baker]
    Start --> Teacher[NPC Teacher]
    Start --> Hunter[NPC Hunter]

    Gather --> Campfire[Build Campfire]
    Campfire --> FlowerGirl[Talking to Mina]
    FlowerGirl --> PickFlowers[Unlock: Pick Flowers]
```

---

## Chapter 2: Establishment and Crafting

Focuses on shelter, resource storage, and the introduction of tools.

```mermaid
graph TD
    Campfire --> Tent[Build Tent]
    Tent --> HomeTent[Home Tent]

    Tent --> TownHall[NPC Town Hall]
    TownHall -- Rewards --> Deed[Permit: Land Deed]

    Tent --> WoodStorage[Wood Storage]
    Tent --> StoneStorage[Stone Storage]

    WoodStorage & StoneStorage --> Artisan[NPC Artisan]

    Artisan --> Axe[Craft: Axe]
    Artisan --> Pickaxe[Craft: Pickaxe]

    Pickaxe --> MineQuartz[Unlock: Mine Quartz]
    Pickaxe --> DigClay[Unlock: Dig Clay]
```

---

## Chapter 3: Refinement and Knowledge

Focuses on permanent housing, furniture, and advanced locations.

```mermaid
graph TD
    House[Build House] --> Kitchen[Addon Kitchen]

    House --> LocalSage[NPC Sage]
    Sage --> Library[Bookshelf & Desk]

    House --> Garden[Build Garden]
    Garden --> Meadow[Meadow Gathering]

    UpgradeGarden[Garden Upgrade] --> WhisperingGrove[Whispering Grove]
```

---

## Minimum Standard Checklist

Every new progression node added to the registries must follow this flow:

1.  Requirement: Flags or Resource costs (Verified by `check-logic`).
2.  Execution: Action definition in core.ts or construction.ts.
3.  Unlock: onSuccess effects (setFlag, unlockRecipe, unlockNPC).
4.  Feedback: Unique SFX, Particle, and Recursive Log entry.

---

Last updated: April 2026 · v6.0 (Audit Hardened)
