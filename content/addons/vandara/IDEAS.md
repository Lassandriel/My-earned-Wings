# Vandara — Content-Ideen (Backlog)

Sammelplatz für Story-/Mechanik-Ideen, die noch nicht implementiert sind.
Reihenfolge ist grob "wann passt das in den Spielfluss", nicht Priorität.

---

## Katakomben-Studenten (Tausch-NPCs)

**Setting.** Unter der Akademie, in den Katakomben in denen Sariel lebt,
hocken ein paar Studenten und machen halb-offizielle Experimente. Keine
Lehrer, kein Lehrplan — das ist der Ort, wo man hingeht, wenn die
"normale" Magietheorie einen langweilt oder das Element nicht in
Quinells Raster passt. Sariel duldet sie, kennt sie wahrscheinlich
einzeln beim Namen, kommentiert sie aber nicht ungefragt.

**Freischaltung.** Erreichbar sobald `vandara-katakomben-unlocked`
gesetzt ist (= Fafa Step 4, Sariel-Erstkontakt). Also: gleich
zeitig mit Sariel, NICHT erst nach dem Schatten-Reveal. So fühlt sich
der "ich hab die Katakomben entdeckt"-Moment voller an als nur ein
einzelner NPC.

**Mechanik.** Jeder Student ist ein NPC mit eigener Action
(Standard `npc_execute`), aber die Steps sind **Tausch-orientiert**
statt reiner Story:

- Step-Requirement: "bring mir N von Resource X" (über `counters`
  oder direktes resource-check)
- Step-onSuccess: gibt Item / Buff / kleines Rezept zurück
- Story-Dialog drumherum: was das Experiment ist, warum die Zutat
  gebraucht wird, was rauskommt

Wichtig: **nicht** das alte `tradeActions`-System nehmen (das ist für
Bäcker/Händler-Verkauf). Diese hier sind echte NPCs mit Arc, nur eben
mit Material-Anforderungen statt Energie-Kosten.

**Skizze — 2-3 Studenten:**

1. **Alchemie-Student** — versucht aus Magie-Splittern einen Trank zu
   destillieren der Magie-Cap kurzfristig hebt. Spieler bringt Splitter
   → bekommt Buff oder Rezept für einen Magie-Trank.
2. **Resonanz-Student** — sammelt Echo-Steine (oder anderes
   thematisches Vandara-Material), gibt Spieler dafür einen kleinen
   Wahrnehmungs-Buff oder freischalt-Hinweis für ein verstecktes
   Detail in der Stadt.
3. **(Optional) Kodex-Student** — sammelt Notizen/Schriftrollen, gibt
   im Tausch ein Sprach-/Lese-Item das später Drachen-Inschriften
   lesbar macht (Setup für späteres Lung-Reveal).

**Scope pro Student.** 3-4 Steps. Step 1 = Vorstellung + erste Bitte,
Step 2-3 = wiederholbare Tausch-Beats (oder einmalige Eskalation),
letzter Step = Abschluss / dauerhafte Belohnung.

**Warum das gut ist.**
- Füllt die Katakomben mit Leben (sonst nur Sariel da unten).
- Gibt Resource-Sinks für Splitter/Echos/etc., die sonst nur sitzen.
- Belohnt "alles maxxen"-Spielstil mit konkreten Items, nicht nur
  Story.
- Hidden-until-achieved-Pattern nutzbar: einzelne Studenten könnten
  auf `vandara-shadow-revealed` reagieren ("ah du bist DER, von dem
  Sariel geredet hat") — ohne Pre-Reveal-Spoiler.

**Offene Fragen.**
- Welche Materialien existieren bereits in Vandara/Base als
  einsammelbar? Falls keine passen → neue Resource(n) definieren.
- Sollen die Studenten benannt sein oder generisch ("Alchemie-
  Student")? Tendenz: benannt, kleinere Persönlichkeit pro Stück.
- Triggern Tausch-Steps `extendNPCArc` auf Sariel? Eher nein —
  Sariels Arc gehört zum Element-Reveal, nicht zu Side-Trades.

---
