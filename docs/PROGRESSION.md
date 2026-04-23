# Progression Tree: Your Earned Wings

This document provides a detailed overview of the dependencies and unlock chains in Draconia, structured by chapters and systems, aligned with **Golden Master (Core 3.9)**.

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
    Campfire --> FlowerGirl[NPC Flower Girl]
    Campfire --> TentReq[Requirement for Tent]
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
    
    WoodStorage --> Artisan[NPC Artisan]
    StoneStorage --> Artisan
    
    Artisan --> Tools[Tools: Axe and Pickaxe]
    Tools --> Yields[Increased Resource Yields]
```

---

## Chapter 3: Refinement and Knowledge

Focuses on permanent housing, furniture, and advanced magic.

```mermaid
graph TD
    Tent[Build Tent]
    TownHall[NPC Town Hall] -- Official Land Deed --> Deed[Permit: Land Deed]
    
    Tent & Deed --> House[Build House]
    
    House --> HomeHouse[Home House]
    House --> Furniture[Basic Furniture]
    House --> Table[Build Table]
    House --> Kitchen[Addon Kitchen]
    
    Table --> Sage[NPC Ancient Sage]
    Sage --> Bookshelf[Build Bookshelf]
    
    Table & House --> Sanctum[Addon Arcane Sanctum]
    Sanctum --> Mages[NPCs Ellie and Aris]
    Sanctum --> Meditate[Action Meditate]
```

---

## Specialized Paths and Endgame

Optional expansions and advanced housing.

```mermaid
graph TD
    subgraph Nature_Path
        BlueprintGarden[Blueprint Garden] --> Garden[Build Garden]
        Garden --> UpgradeGarden[Garden Upgrade]
    end

    subgraph Advanced_Housing
        BlueprintLake[Blueprint Lake House] --> LakeHouse[Build Lake House]
        BlueprintTower[Blueprint Tower] --> Tower[Build Aura Tower]
    end
    
    subgraph The_Ascent
        Community[Max Community Bonds] --> TreeOfLife[The Tree of Life]
        Wisdom[Max Wisdom] --> TreeOfLife
    end
```

---

## Minimum Standard Checklist

Every new progression node added to the registries must follow this flow:
1.  Requirement: Flags or Resource costs.
2.  Execution: Action definition in core.ts or construction.ts.
3.  Unlock: onSuccess effects (setFlag, unlockRecipe, unlockNPC).
4.  Feedback: Unique SFX and log entries.

---

Last updated: April 2026 · v3.9
