# Progression Tree: Your Earned Wings

Hier findest du eine Übersicht über die Abhängigkeiten und Freischalt-Ketten im Spiel.

```mermaid
graph TD
    %% Start
    Start["Start am Boden"] --> Gather["Zweige & Kiesel sammeln"]
    Gather --> Campfire["Lagerfeuer (5 Holz)"]
    Campfire --> FlowerGirl["NPC: Blumenmädchen"]
    
    %% Flower Girl Chain
    FlowerGirl -- "Reputation 5/5" --> Blacksmith["NPC: Schmied (Zukunft)"]
    
    %% Housing Chain
    Campfire --> Tent["Zelt (15 Holz, 5 Stein)"]
    Tent --> TownHall["NPC: Rathaus"]
    Tent --> Storage["Lager-Plätze (20 Holz / 20 Stein)"]
    Storage --> Artisan["NPC: Handwerker"]
    
    %% Tools
    Artisan -- "Reputation 3/3" --> Axe["Rezept: Steinaxt"]
    Artisan -- "Reputation 3/3" --> Pickaxe["Rezept: Spitzhacke"]
    
    %% Advanced Housing
    TownHall -- "Urkunde kaufen" --> House["Hütte bauen (50 Holz/Stein)"]
    House --> Table["Rezept: Massiver Tisch (40 Holz)"]
    Table --> Sage["NPC: Alter Weiser"]
    
    %% Magic Chain
    Sage -- "Wissen 1/1" --> Study["Aktion: Studieren"]
    Study --> MagicCap["Magie-Limit erhöhen"]
    
    %% Furniture Synergies
    Table --> Chair["Rezept: Stuhl (10 Holz)"]
    Chair -- "Bonus" --> Study
    
    House --> Stove["Rezept: Ofen (25 Stein)"]
    Stove -- "Bonus" --> Eat["Aktion: Essen (Beeren)"]
    
    %% Hunter Saga
    Start --> Hunter["NPC: Jäger"]
    Hunter -- "Training 2/5" --> Bow["Rezept: Jagdbogen (30 Holz)"]
    Bow --> Hunt["Aktion: Jagen (Story)"]
    Hunter -- "Training 5/5" --> MeatTrade["Fleisch Handel (Dorf)"]
    Hunt -- "Gibt" --> Meat["Ressource: Fleisch"]
    Meat --> MeatTrade
```

## Erläuterung
- **Bauwerke & Möbel**: Schalten oft neue Interaktionen oder passive Boni frei.
- **NPCs**: Benötigen Fortschritt (Interaktionen), um Belohnungen wie Rezepte oder neue Aktionen freizugeben.
- **Werkzeuge**: Erhöhen den Ertrag pro Klick massiv (z.B. Axt: 1 Holz -> 2 Holz).
