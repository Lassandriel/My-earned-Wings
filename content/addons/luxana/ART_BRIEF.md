# Luxana — NPC Portrait Art Brief

Ready-to-use image-generation prompts (e.g. for Google Antigravity).
**9 portraits.** Names are kept; copy a prompt block as-is or tweak.

**Follows the same convention as the Vandara NPCs** — see `docs/Vandara NPCs.md`
and give Antigravity an existing Vandara portrait as a style reference, e.g.
`content/addons/vandara/resources/img/sariel.webp`. Aim for one cohesive cast.

**Output:** generate as **PNG on a solid white #FFFFFF background** (background
gets removed manually afterwards, then converted to .webp).
Final file per portrait: `content/addons/luxana/img/addons/luxana/<name>.webp`
(referenced in YAML as `img/addons/luxana/<name>.webp`).

> ⚠️ **The white #FFFFFF is the BACKGROUND ONLY.** The characters are NOT pale
> or white-skinned. Each has an explicit **skin tone** below — render the cast
> **diverse**: warm browns, deep umber, olive, dusky, golden — NOT pale faces.
>
> ⚠️ **Wings are mandatory and clearly visible** on every character (folded is
> fine, but present and drawn — never omit them).
>
> ⚠️ **Scales and wings are bright, colourful and varied — colour is FREE and
> NOT tied to the element or species.** Draconia's dragons come in any hue
> regardless of element: do NOT make "fire = red, water = blue, earth = brown".
> The **species** only sets the **form** (wing type, build, feathered vs
> membranous, scale texture) — never the palette. Spread the cast across the
> whole rainbow; each portrait colourful and distinct.

---

## Shared style (prepend to EVERY prompt — this is the important part)

> **Full-body** character illustration, head to toe, standing, centered, with a
> little headroom. **Solid plain white #FFFFFF background — only the character
> and the items they carry, NO scene, NO room, NO environment.** **Cel-shaded
> comic / illustration style with clean bold outlines and flat, controlled
> shading** (NOT a soft digital painting, NOT a painterly bust portrait),
> matching the base-game NPC art.
>
> Subject is a **dragon-shifter in HUMANOID form: a person** with draconic
> traits — pointed ears, partial scales on arms/legs/torso, draconic eyes, horns,
> and **clearly visible wings and/or a tail** — but a **largely humanoid /
> elf-like face, NOT a full dragon snout, NOT a quadruped beast.** Rich, non-white
> skin tone and bright colourful scales/wings (see each prompt). Match the line
> weight, proportions and shading of the reference image.
>
> **Do NOT give any character white-and-red hair** — that design is reserved for
> the imperial family. No text, no watermark, no border.

---
*Per character: SPECIES = body form. SKIN / HAIR / SCALES = the look (colours
chosen for variety, deliberately not element-themed — change freely as long as
the cast stays colourful and diverse).*

## 1 — Meister Elian  (`elian.webp`)
> Elderly male dragon-shifter scholar, gentle and slightly overwhelmed.
> **Form:** feathered-serpent — iridescent **feathered** wings, long feathered
> head-crest, serpentine grace. **Skin:** warm olive-tan, aged. **Hair:** long
> silver. **Scales/feathers:** iridescent amethyst shading to gold. Pointed ears,
> round spectacles sliding down his nose, kind tired eyes. Holds an open book; a
> couple of slim crystal-tipped staves float beside him. Robes in violet/silver.

## 2 — Lord Caldwen  (`caldwen.webp`)
> Haughty older male dragon-shifter noble, old money. **Form:** earth-dragon —
> heavy stone-like **armored scale texture**, big ridged horns, sturdy build,
> leathery wings (folded). **Skin:** deep brown. **Hair:** iron grey, swept back.
> **Scales:** deep crimson-and-bronze. Pointed ears, stern face looking down his
> nose. Rich, severe old-fashioned court attire, a prominent gold signet ring.
> Optional: a small twin-tailed "aura-fox" pet at his feet.

## 3 — Lady Mirelle  (`mirelle.webp`)
> Gentle, weary female dragon-shifter, a worried young mother. **Form:**
> tide/dream-dragon — soft **translucent misty wings** (folded). **Skin:** warm
> medium brown. **Hair:** dark auburn. **Scales:** soft rose-gold and coral.
> Pointed ears, tender but exhausted face. Fine noble dress, one hand pressed
> protectively to her chest.

## 4 — Vicomte Aurel  (`aurel.webp`)
> Vain, flamboyant male dragon-shifter socialite. **Form:** city-fae — unusually
> tall and slender, translucent shimmering **dragonfly-like double wings**.
> **Skin:** golden-brown. **Hair:** vivid teal, styled. **Scales:** bright
> iridescent emerald-and-magenta. Pointed ears, handsome confident grin.
> Theatrical extravagant court robes, mid-flourish pose.

## 5 — Dame Sylvaine  (`sylvaine.webp`)
> Reserved, dry female dragon-shifter botanist. **Form:** forest-fae — tall,
> translucent **dragonfly-like wings** (folded). **Skin:** deep olive. **Hair:**
> silver. **Scales:** deep indigo-and-violet. Pointed ears, cool measuring face.
> Gloved hands cradling a single pale, folded "moonbloom" flower. Botanical attire.

## 6 — Brannoc  (`brannoc.webp`)
> Low-born elderly male dragon-shifter archivist, stooped and absent-minded.
> **Form:** earth-dragon — modest small horns, small leathery wings (folded).
> **Skin:** weathered tan-brown. **Hair:** thinning grey. **Scales:** muted ochre
> with a faint teal sheen. Pointed ears, half-moon reading glasses, wrinkled face.
> Ink-stained sleeves and fingers, plain clerk's robes, holding a rolled ancient
> scroll.

## 7 — Hauptmann Veyl  (`veyl.webp`)
> Disciplined female dragon-shifter guard captain. **Form:** storm-wyvern —
> athletic, narrow **sickle-shaped wings** (folded back), a tail ending in a
> weapon. **Skin:** dark dusky brown. **Hair:** close-cropped black. **Scales:**
> burnt copper-orange. Pointed ears, hard calm unhurried face. Worn functional
> armor with a captain's insignia, hand resting on a weapon.

## 8 — Pell  (`pell.webp`)
> Young androgynous (non-binary, they/them) dragon-shifter court page, small and
> nimble. **Form:** city-fae — small translucent **dragonfly wings** (folded).
> **Skin:** warm brown, youthful. **Hair:** dark with faint shifting tints.
> **Scales:** shifting pastel iridescence (pink/lilac/mint, chameleon-like).
> Pointed ears, sharp mischievous androgynous face. Page's livery uniform.

## 9 — Ondra Voss  (`voss.webp`)
> Nouveau-riche female dragon-shifter merchant-climber, ostentatiously wealthy.
> **Form:** tide-leviathan — broad **manta-ray-like wing membranes** (folded),
> sleek skin, fine gill slits. **Skin:** rich deep brown. **Hair:** dark,
> elaborately styled with gold ornaments. **Scales/sheen:** opulent gold-and-violet.
> Pointed ears, brittle bright calculating smile. Overdone lavish finery and heavy
> expensive gold-and-gemstone jewelry.

---

## Optional extra (not a portrait — a prop image, style can differ)
**The ancient depiction** Brannoc uncovers: a centuries-old painting / scroll of
a **shadow-dragon** rendered in failing, faded ink — wings like spilled night —
whose face unmistakably resembles the player (Tenebre). Aged vellum, archival,
ominous. In-scene/item art for the plot breadcrumb.
`img/addons/luxana/depiction-shadowdragon.webp`
