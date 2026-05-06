## Save fixtures (optional)

Drop one or more `*.json` files into this folder to have `npm run check-all` validate them.

### What gets validated
- `discoveredItems`: every entry must be a real `item-*` that exists in the `items` registry
- `unlockedRecipes`: every entry must exist in the `actions` registry
- `unlockedNPCs`: every entry must exist in the `npcs` registry
- `discoveredTitles`: every entry must exist in the `titles` registry

### Minimal fixture example
Create a file like `example.json`:

```json
{
  "discoveredItems": ["item-arrowhead"],
  "unlockedRecipes": ["build-campfire"],
  "unlockedNPCs": ["npc-flowerGirl"],
  "discoveredTitles": []
}
```

If the folder is empty, the save fixture phase is skipped (still green).

