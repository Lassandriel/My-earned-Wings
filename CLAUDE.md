# My-earned-Wings — Projektkontext

Atmosphärisches Idle-/Incremental-Spiel. TypeScript + Vite + Alpine.js, als Web-Build
(GitHub Pages) und als Electron-Anwendung.

**Die Doku ist gut und umfangreich — fang bei [docs/README.md](docs/README.md) an**, das
ist der Index über alle 15 Dokumente. Diese Datei hier verdoppelt sie nicht. Sie hält
fest, was man wissen muss, *bevor* man etwas anfasst, und was man sonst nur durch
Hineinlaufen lernt.

## Das Branch-Modell — zuerst lesen

`main` trägt die **spielbare Demo**, ohne Vandara und Luxana. Die Addon-Branches sind
**absichtlich langlebig**; sie sind keine liegengebliebene Arbeit.

```
main ───────> addons/vandara ───────> addons/luxana
(Demo)         (früher in der          (später in der
                Geschichte)             Geschichte)
```

Addons sind nach **Story-Chronologie** geordnet, und die Branches spiegeln das.
`addons/luxana` ist von `addons/vandara` abgezweigt, nicht von `main`, und enthält
Vandara deshalb mit. Daraus folgt die zentrale Regel: **Luxana darf Vandara ändern,
Vandara nicht Luxana.** Ein früheres Addon greift nicht nach vorn in etwas, das aus
seiner Sicht noch nicht geschehen ist.

Dass `addons/luxana` über hundert Commits vor `main` liegt, ist also der Normalzustand
und kein Rückstand.

Ausführlich steht das in `docs/BRANCH_MODEL.md` — **die Datei liegt allerdings nur auf
`main`**, weil die Addon-Branches älter sind als dieser Doku-Stand. Wer auf einem
Addon-Branch sucht, findet sie nicht.

## Alles ist ein Addon

Auch das Grundspiel: `content/addons/core/`. Inhalte kommen aus YAML unter
`content/addons/<name>/` und werden von einer Pipeline zu TypeScript verarbeitet.

```bash
npm run build:content   # YAML -> src/generated/*, muss vor allem anderen laufen
npm run check-all       # i18n, Assets, Logik, Parität
npm test                # vitest
npm run build           # build:content + vite build
npm run dev             # Vite + Electron parallel
```

`build:content` schreibt `src/generated/content.ts` — davon importiert praktisch alles.
Ohne diesen Schritt schlagen Type-Check, Tests und Validatoren fehl, weil die Datei
fehlt oder veraltet ist. Die CI macht es deshalb als ersten Schritt.

**`src/generated/` niemals von Hand bearbeiten.** Jede Änderung dort wird beim nächsten
Build überschrieben. Die Dateien sind trotzdem versioniert, damit ein Checkout ohne
Build-Schritt lauffähig ist.

Vorlagen für ein neues Addon: `content/addons/smoke_test/` benutzt jede Fähigkeit
einmal und ist zum Kopieren gedacht. Der Autorenleitfaden ist
[docs/ADDON_AUTHORING.md](docs/ADDON_AUTHORING.md).

## Zeilenenden: das ständige Rauschen

`git status` meldet auf diesem Branch regelmäßig acht geänderte Dateien in
`src/generated/`, obwohl inhaltlich fast nichts anders ist — LF im Arbeitsverzeichnis,
CRLF nach der Git-Konvertierung.

**Vor dem Committen mit `git diff --numstat` prüfen, welche Datei wirklich Zeilen
geändert hat.** Sonst landen sieben Dateien voller Scheinänderungen im Commit und
verdecken die eine echte.

## .gitignore mit Absicht kleinteilig

Zwei Einträge sind bewusst so und nicht breiter:

- `public/img/addons/*/` ignoriert **nur Unterordner**. Direkt in `public/img/addons/`
  liegen die Ausbau-Kacheln des Grundspiels (`wood_1.webp` und Geschwister), die
  versioniert gehören.
- `public/sfx/addons/` ist reine Build-Ausgabe, wird bei jedem `build:content` neu aus
  `content/addons/<name>/sfx/` befüllt.

Ebenfalls ignoriert: `.claude/`, `TODO.md`, `docs/RP_Draconia.md`.

## Commit-Konventionen

Conventional Commits auf Englisch: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`,
`style:`, optional mit Bereich (`feat(luxana):`).

Der Commit-Rumpf begründet ausführlich **warum** — die Historie ist hier ein
Entwurfstagebuch, keine Liste von Änderungen. Diesen Stil beibehalten.

Änderungen am Grundspiel gehören **ausdrücklich im Commit-Rumpf gekennzeichnet** und
nicht still mit Addon-Inhalten vermischt.

## Eigene Skills

Unter `.claude/skills/` liegen vier projekteigene Abläufe:

| Skill | Wofür |
|---|---|
| `addon-check` | `build:content` + `check-all`, ordnet jeden Fehler dem verursachenden Addon zu |
| `vandara-npc` | Legt einen Vandara-NPC über alle nötigen Dateien hinweg an (YAML, Aktionskette, i18n DE/EN, Bildpfad) |
| `docs-cleanup` | Prüft die Doku auf tote Verweise und veraltete Pfade |
| `release` | Version, Changelog, Validierung, Commit und Tag — hält vor dem Push an |

`.claude/` ist ignoriert, die Skills reisen also nicht mit einem Klon mit.

## Stolpersteine

**Das Ruleset auf `main` blockiert jeden Pull Request.** Es verlangt einen Status-Check
namens `build`. Der stammt aus dem Pages-Workflow (`deploy.yml`), und der läuft nur bei
Push auf `main`, nie bei einem PR. Bei PRs läuft stattdessen `ci.yml` unter dem Namen
„Tests, Type-Check, Validators" — die enthält bereits einen `npm run build` als
Absicherung. Solange der geforderte Name nicht angepasst ist, sammeln sich
Dependabot-PRs unbearbeitet an.

**`docs/README.md` verweist auf `DRACONIA.md`** — die liegt nur auf `main`. Auf den
Addon-Branches ist der Link tot.

**`android/` gehört zum `mobile-app`-Branch** (Capacitor, rund 135 MB). Auf den
Content-Branches ist es Streu und inzwischen ignoriert.

**Der Lückenstand des Addon-Systems** steht in `docs/ADDON_GAPS.md` — die Datei liegt
nur auf den `claude/*`-Branches und beschreibt einen Stand von Mai. Mehrere dort als
offen geführte Punkte sind auf `addons/luxana` längst gebaut, erkennbar an
`src/generated/addon-effects.ts`, `-migrations.ts`, `-ticks.ts`, `-slots.ts` und
`-styles.css`, die es auf `main` nicht gibt.
