# Progression Tree: Your Earned Wings

This document provides an overview of the dependencies and unlock chains in the game.

```mermaid
graph TD
    %% Start
    Start["Start on the Ground"] --> Gather["Gather Twigs & Pebbles"]
    Gather --> Campfire["Campfire (5 Wood)"]
    Campfire --> FlowerGirl["NPC: Flower Girl"]
    
    %% Flower Girl Chain
    FlowerGirl -- "Reputation 5/5" --> Blacksmith["NPC: Blacksmith (Future)"]
    
    %% Housing Chain
    Campfire --> Tent["Tent (15 Wood, 5 Stone)"]
    Tent --> TownHall["NPC: Town Hall"]
    Tent --> Storage["Storage (20 Wood / 20 Stone)"]
    Storage --> Artisan["NPC: Artisan"]
    
    %% Tools
    Artisan -- "Reputation 3/3" --> Axe["Recipe: Stone Axe"]
    Artisan -- "Reputation 3/3" --> Pickaxe["Recipe: Stone Pickaxe"]
    
    %% Advanced Housing
    TownHall -- "Buy Deed" --> House["Build House (50 Wood/Stone)"]
    House --> Table["Recipe: Solid Table (40 Wood)"]
    Table --> Sage["NPC: Ancient Sage"]
    
    %% Magic Chain
    Sage -- "Knowledge 1/1" --> Study["Action: Study"]
    Study --> MagicCap["Increase Magic Limit"]
    
    %% Furniture Synergies
    Table --> Chair["Recipe: Chair (10 Wood)"]
    Chair -- "Bonus" --> Study
    
    House --> Stove["Recipe: Stove (25 Stone)"]
    Stove -- "Bonus" --> Eat["Action: Eat (Berries)"]
    
    %% Hunter Saga
    Start --> Hunter["NPC: Hunter"]
    Hunter -- "Training 2/5" --> Bow["Recipe: Hunting Bow (30 Wood)"]
    Bow --> Hunt["Action: Hunt (Story)"]
    Hunter -- "Training 5/5" --> MeatTrade["Meat Trade (Village)"]
    Hunt -- "Provides" --> Meat["Resource: Meat"]
    Meat --> MeatTrade
```

## Explanation
- **Structures & Furniture**: Often unlock new interactions or passive bonuses.
- **NPCs**: Require progress (interactions) to release rewards like recipes or new actions.
- **Tools**: Massively increase yield per click (e.g., Axe: 1 Wood -> 2 Wood).
- **Architecture**: The game uses a centralized Resource Manager to handle these transitions efficiently.
