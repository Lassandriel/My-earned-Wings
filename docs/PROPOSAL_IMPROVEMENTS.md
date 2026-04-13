# 🦅 Spiel-Verbesserungs-Vorschläge (Senior Game Designer Perspective)

Dieses Dokument enthält eine kuratierte Liste von Verbesserungen, um die Spielerfahrung zu optimieren, die Immersion zu steigern und technische Mängel zu beheben.

> [!NOTE]
> Wir arbeiten diese Liste **langsam und bewusst** ab, um die Stabilität des Projekts zu gewährleisten.

---

## 🛠️ 1. Dringende Technische Korrekturen (Prio: Hoch)
Bevor wir das Spiel "schön" machen, muss es einwandfrei funktionieren.

- [ ] **Routing-Fix**: Der Tab "Haupt" (Sammeln/Gameplay) ist in der UI fehlerhaft verknüpft. Die Sidebar-Logik verwechselt `story` und `story_tab`.
- [ ] **NPC-Karten Reparatur**: Im Dorf-Tab werden NPCs als leere Cards angezeigt. Die Datenbindung (Namen & Aktionen) muss korrigiert werden.
- [ ] **Sättigungs-Logik**: Überprüfung der Sättigungs-Anzeige auf "undefined" oder fehlende Werte.
- [ ] **Audio-Balancing**: Der "Fail"-Sound ist zu laut und "furchtbar". Eine sanftere Version ist nötig.

---

## 🎨 2. UX & Visuelles Feedback (Prio: Mittel)
"Juice" macht den Unterschied zwischen einem Tool und einem Spiel.

- [ ] **Partikel-Feedback**: Kleine schwebende Texte (z.B. "+1 Holz") direkt an der Klick-Position.
- [ ] **Hover-Effekte**: Buttons sollten sanft glühen oder ihre Farbe ändern (Glassmorphism verstärken).
- [ ] **Story-Atmosphäre**: Die Chronik sollte mit einem atmosphärischen Einstiegstext starten.
- [ ] **Sanfte Balken**: CSS Transitions für die Ressourcen-Balken, damit sie flüssiger animieren.

---

## ⚖️ 3. Game Design & Balancing (Prio: Mittel)
Strategische Tiefe und Motivations-Kurve.

- [ ] **NPC-Porträts**: Hinzufügen von Charakter-Bildern für die Bewohner im Dorf-Tab.
- [ ] **Tooltips**: Ausführlichere Tooltips für die Ressourcen-Balken (z.B. genaue Werte beim Drüberfahren).
- [ ] **Belohnungs-Kurve**: Überprüfung der Splitter-Kosten für Gefährten (evtl. zu teuer für den Anfang?).

---