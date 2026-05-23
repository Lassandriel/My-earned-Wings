// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// Source: content/addons/<name>/sfx/*.{mp3,ogg,wav,m4a}
// Regenerate: npm run build:content

/**
 * Build-time addon SFX registry. Each entry is keyed by the sfx key
 * that YAML refers to (`<addon>/<basename-no-ext>`) and carries the
 * physical url + provenance metadata for DevTools / debugging.
 *
 * The audio engine (src/core/visuals/audio.ts) reads this at boot and
 * merges every url into its sfxSources map. Runtime addons add to the
 * same map later via the IPC payload + registerAddonSfx().
 *
 * Audio files are copied into public/sfx/addons/<name>/ during build
 * so Vite serves them at the same path as base SFX. The public/sfx/
 * addons/ directory is .gitignored — re-running build:content
 * recreates it from content/addons/<name>/sfx/.
 */
export interface AddonSfxEntry {
  key: string;
  addonName: string;
  fileName: string;
  url: string;
}

export const ADDON_SFX_GENERATED: Record<string, AddonSfxEntry> = {};
