# docs — Wo finde ich was

Diese Datei ist der Index. Wenn du nach etwas Bestimmtem suchst,
hier ist die Karte.

## 🛠️ Wenn du am Spiel bauen willst

| Datei | Wofür |
|---|---|
| [`ROADMAP.md`](ROADMAP.md) | Was wir gemacht haben, was als nächstes kommt. Erste Anlaufstelle für "wo stehen wir?" |
| [`GAMEDESIGN.md`](GAMEDESIGN.md) | Vision, Technical Pillars, Core Mechanics. "Was IST dieses Spiel?" |
| [`PROGRESSION.md`](PROGRESSION.md) | Chapter-Outline, was der Spieler nacheinander erlebt |
| [`LOCALIZATION.md`](LOCALIZATION.md) | i18n-System: Übersetzungen, Kontexte, Debugging fehlender Keys |
| [`DEVTOOLS.md`](DEVTOOLS.md) | Standalone Electron-DevTools-Fenster: Cheats, Editor, Inspektion |

## 🧩 Wenn du ein Addon schreiben willst

| Datei | Wofür |
|---|---|
| [`ADDON_AUTHORING.md`](ADDON_AUTHORING.md) | Der vollständige Autoren-Guide: Folder-Struktur, Manifest, Patches, Handlers/Effects/Ticks/Migrations/Schema, Slots, CSS/SFX/Images, Inter-Addon. Lesen vor du startest. |
| [`../content/addons/smoke_test/`](../content/addons/smoke_test/) | Worked example. Benutzt jede Capability einmal — als Template kopierbar. |

## 🌍 Wenn du Lore lesen oder schreiben willst

| Datei | Wofür |
|---|---|
| [`DRACONIA.md`](DRACONIA.md) | World Guide (Welt-Ordnung, Locations, Drachen-Arten, Lore) |
| [`RP_ Draconia.md`](RP_%20Draconia.md) | Personen-Übersicht im RP-Stil |
| `NEWEST_Draconia.md` / `Vandara NPCs.md` | Working Notes (nicht versioniert) |

## 📦 Wenn du verstehen willst warum etwas so gebaut wurde

| Datei | Wofür |
|---|---|
| [`archive/ARCHITECTURE.md`](archive/ARCHITECTURE.md) | Decision Record für die YAML-Pipeline + ECS + SQLite Migration. Migration ist durch, das Doc bleibt als "warum Option B?" Referenz. |
| [`archive/ADDON_SYSTEM_PLAN.md`](archive/ADDON_SYSTEM_PLAN.md) | Original Design-Doc für das Addon-System. Implementierung ist teilweise abgewichen — für den aktuellen Stand → `ADDON_AUTHORING.md`. |
| [`archive/PHASE2_STAGE2_AUDIT.md`](archive/PHASE2_STAGE2_AUDIT.md) | Migration-Audit für die engine-state Trennung. "Warum ist X so?" Antworten. |

---

**Konvention:** Living-Docs sind die im oberen Bereich. Sie beschreiben
den aktuellen Stand und sollen aktuell gehalten werden. `archive/`
enthält Docs deren Inhalt historisch wertvoll ist, aber nicht mehr
laufend gepflegt wird.
