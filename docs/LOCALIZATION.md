# Localization & Translation System (i18n)

## Overview

The game uses a custom i18n system (`src/core/services/i18n.ts`) to handle displaying textual strings, UI elements, and dialogues to the player based on their selected language.

## Architectural Decision: Flat Structure vs. Nested Objects

Translation files (such as `src/lang/de/logs.ts` and `src/lang/en/logs.ts`) leverage a **flat dictionary structure** instead of nested objects.

### Why Flat?

1. **Dynamic Key Generation:** The game's engine logic frequently constructs translation keys dynamically on the fly (e.g., `'fail_full_' + yieldType`, `'fail_' + resourceName`). Supporting this via deeply nested properties (e.g., `log.fail.full.wood`) would require intensive string parsing within the core `i18n.t()` service and risky refactoring across the gameplay logic.
2. **Performance:** Shallow property lookups (`contextData[key]`) are extremely fast, keeping the translation engine lightweight, which is highly beneficial for the web game's performance.
3. **Safety & Robustness:** Prevents breaking core game features due to missing/undefined nested object layers or typo-prone dot notations.

### Grouping and Maintenance Standard

To maintain excellent readability and prevent files like `logs.ts` from becoming cluttered 'Spaghetti data', we strictly utilize **visual structural grouping** using comments rather than code-level nesting.

When editing localization files, do **not** convert them into nested objects. Instead, maintain the existing categories to organize related keys:

```typescript
export default {
  // ==========================================
  // SYSTEM & GENERAL
  // ==========================================
  save_success: 'Game saved successfully...',
  // ...

  // ==========================================
  // REWARDS & UNLOCKS
  // ==========================================
  reward_unlock_npc: 'New acquaintance: {name}',
  // ...

  // ==========================================
  // INTRO, STORY & DIALOGUES
  // ==========================================
  // ...

  // ==========================================
  // FAILURES (FAILS)
  // ==========================================
  // Fails - Missing Resources
  fail_wood: 'Not enough wood.',
  // Fails - Storage / Limit Full
  fail_full_wood: 'Wood storage is full.',

  // ==========================================
  // ACTIONS & EVENTS (LOGS)
  // ==========================================
  // ...

  // ==========================================
  // CRAFTING & MILESTONES
  // ==========================================
  // ...
};
```

## Adding New Translations

1. Determine the appropriate category for your new string.
2. If prefixing keys (e.g., `fail_` or `reward_`), ensure the prefix logically maps to the existing conventions. This guarantees compatibility with the engine resolving those keys procedurally.
3. Add the string to the correct visual block.
4. **Always** update all language files in parallel (e.g., `de/logs.ts` **and** `en/logs.ts`) to maintain feature parity.
