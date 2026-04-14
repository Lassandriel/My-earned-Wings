# 🦅 Spiel-Verbesserungs-Vorschläge (Senior Game Designer Perspective)

Dieses Dokument enthält eine kuratierte Liste von Verbesserungen, um die Spielerfahrung zu optimieren, die Immersion zu steigern und technische Mängel zu beheben.

> [!NOTE]
> Wir arbeiten diese Liste **langsam und bewusst** ab, um die Stabilität des Projekts zu gewährleisten.

---

## 🛠️ 1. Dringende Technische Korrekturen (Prio: Hoch)
Bevor wir das Spiel "schön" machen, muss es einwandfrei funktionieren.

- [x] **Routing-Fix**: Der Tab "Haupt" (Sammeln/Gameplay) ist in der UI fehlerhaft verknüpft. Die Sidebar-Logik verwechselt `story` und `story_tab`. (Bereinigt durch Refactoring)
- [x] **Audio-Balancing**: Der "Fail"-Sound ist zu laut und "furchtbar". Eine sanftere Version ist nötig. (Optionen für Lautstärke hinzugefügt)

---

## 🎨 2. UX & Visuelles Feedback (Prio: Mittel)
"Juice" macht den Unterschied zwischen einem Tool und einem Spiel.

- [ ] **Partikel-Feedback**: Kleine schwebende Texte (z.B. "+1 Holz") direkt an der Klick-Position.
- [x] **Hover-Effekte**: Buttons sollten sanft glühen oder ihre Farbe ändern (Glassmorphism verstärken).
- [x] **Story-Atmosphäre**: Redesign der Chronik als kompaktes, narratives Journal mit Gruppierung. (Implementiert)
- [ ] **Sanfte Balken**: CSS Transitions für die Ressourcen-Balken, damit sie flüssiger animieren.

---

## ⚖️ 3. Game Design & Balancing (Prio: Mittel)
Strategische Tiefe und Motivations-Kurve.

- [ ] **NPC-Porträts**: Hinzufügen von Charakter-Bildern für die Bewohner im Dorf-Tab.
- [ ] **Tooltips**: Ausführlichere Tooltips für die Ressourcen-Balken (z.B. genaue Werte beim Drüberfahren).
- [ ] **Belohnungs-Kurve**: Überprüfung der Splitter-Kosten für Gefährten (evtl. zu teuer für den Anfang?).

---