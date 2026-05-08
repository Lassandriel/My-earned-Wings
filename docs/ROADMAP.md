# PROJECT ROADMAP - MY-EARNED-WINGS

## Status: v1.3.7-stable (UI Polish & Consistency)
Die Architektur wurde vollständig auf ein modulares, datengesteuertes System umgestellt. Der Fokus liegt aktuell auf maximaler Typsicherheit, Datenkonsistenz und UI-Stabilität.

---

## 🏛️ Abgeschlossene Meilensteine

### Fundament & Weltaufbau (Phasen 1-11)
- [x] **Core Engine & Simulation**: Energie/Magie-System, Ressourcen-Sammeln und die `ValuePipeline` mit Delta-Time-Akkumulatoren.
- [x] **Infrastruktur**: Zentralisierte Registries für Items, NPCs und Gebäude. TypeScript-Migration und Asset-Optimierung (.webp).
- [x] **Qualitätssicherung**: Globale Validierungssuite (`check-all`), I18N-System (DE/EN) und Cross-Browser Hardening.
- [x] **Welt-Expansion**: Implementierung von Orten (Wald, Mine, Wiese, Flüsterhain) und komplexen Questreihen (Lehrerin Aria, Vandara Akademie).

### Architektur & Typsicherheit (Phasen 12-13)
- [x] **Dezentralisierung (v1.2.0)**: Aufbrechen des State-Monolithen in spezialisierte Alpine-Stores für bessere Performance.
- [x] **System-Registry (v1.3.0)**: Einführung einer metadatengesteuerten System-Registrierung und automatisierten Delegation.
- [x] **UI/UX Hardening (v1.3.1)**: Premium-Aesthetics (Glassmorphism), reaktive Tooltips und optimierte Layouts.
- [x] **Total Type Hardening (v1.3.3)**: Eliminierung von `any`-Typen im Core-Store, den Registries und Logik-Systemen. 100% Compiler-Konformität.
- [x] **I18N & Tooltip Polish (v1.3.4)**: Behebung fehlender Sprachschlüssel für NPC-Dialoge, Korrektur der Tooltip-Positionierung und Einführung einer automatisierten Inhalts-Validierung beim Start.
- [x] **Full Localization & Cleanup (v1.3.5)**: Vollständige Eliminierung von hartcodierten Texten in HTML-Views und Logik. Dynamische Seitentitel-Aktualisierung und Bereinigung von Fallback-Strings.
- [x] **Tooltip Logic Refinement (v1.3.6)**: Behebung fehlender Datenlabels in Kostenanzeigen, Filtern interner Requirements und Optimierung der Übersetzungs-Fallbacks für dynamische Keys.
- [x] **Tooltip Unification (v1.3.7)**: Vereinheitlichung der Tooltip-Formate für Kosten und Anforderungen. Umstellung auf Linksbündigkeit und das "Wert Label"-Format für eine konsistente Anzeige. Einführung von Echtzeit-Statusanzeigen (Bestand/Limit) direkt in der Kostenübersicht.

---

## 🗺️ Zukünftige Horizonte

### Phase 13.5: Verzweigte Schicksale & Endings
- [ ] **Pfad-spezifisches Gameplay**: Die gewählte Akademie-Fachrichtung beeinflusst das Late-Game (exklusive Rezepte & Mechaniken).
- [ ] **Erweiterte Story**: Neue NPCs in Vandara, Schwarzmarkt-Interaktionen und individuelle Endsequenzen.

### Phase 14: Der Zyklus der Inkarnation
- [ ] **Automation (Ancient Echoes)**: Nutzung von Schatten früherer Leben zur Automatisierung von Produktionsketten.
- [ ] **Tree of Life Finale**: Die finale spirituelle Erweckung und das Erreichen des Palastes über den Wolken.

---
Zuletzt aktualisiert: 8. Mai 2026 · v1.3.7-stable (Tooltip Unification complete)
