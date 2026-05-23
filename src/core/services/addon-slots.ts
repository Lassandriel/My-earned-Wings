/**
 * Addon slot-injection (Phase 17: gaps 🎨 #3).
 *
 * Base views declare named insertion points via
 *   <div data-slot="my-slot-id"></div>
 *
 * Addons ship HTML at
 *   content/addons/<name>/slots/my-slot-id.html
 *
 * At boot the build-time payload (ADDON_SLOTS_GENERATED) is merged
 * with runtime addon contributions and appended into each matching
 * slot container. Multiple addons can target the same slot — their
 * blocks are appended in load order (build-time addons
 * alphabetically, then runtime addons in their discovery order).
 *
 * After injection we call `Alpine.initTree` on the new nodes so
 * x-show / x-text / @click directives in the injected HTML wire up
 * to the live store the same way base-game markup does.
 */

import { ADDON_SLOTS_GENERATED } from '../../generated/addon-slots';
import { makeLogger } from '../log';

const log = makeLogger('ADDON-SLOTS');

export interface SlotBlock {
  addonName: string;
  fileName: string;
  html: string;
}

/**
 * Append an HTML block into the slot container, tag it with
 * `data-addon-slot="<addon>/<file>"` for de-dup + DevTools clarity,
 * and let Alpine pick up any directives inside.
 */
const appendBlockToSlot = (slotEl: HTMLElement, slotId: string, block: SlotBlock): boolean => {
  const tagId = `${block.addonName}/${block.fileName}`;
  if (slotEl.querySelector(`[data-addon-slot="${tagId}"]`)) {
    log.warn(`slot "${slotId}" already has block "${tagId}" — skipped`);
    return false;
  }
  const wrap = document.createElement('div');
  wrap.dataset.addonSlot = tagId;
  wrap.innerHTML = block.html;
  slotEl.appendChild(wrap);
  // Alpine is on window in this project's bootstrap (see main.ts).
  const Alpine = (window as any).Alpine;
  if (Alpine && typeof Alpine.initTree === 'function') {
    try {
      Alpine.initTree(wrap);
    } catch (err) {
      log.warn(`Alpine init on slot "${tagId}" failed:`, err);
    }
  }
  return true;
};

export interface SlotInjectionResult {
  injected: number;
  missingSlots: string[];
}

/**
 * Inject build-time + runtime slot blocks into the DOM. Idempotent:
 * blocks already tagged with their addon/file id are skipped, so a
 * second call (e.g. after a soft reload) doesn't duplicate them.
 */
export const injectAddonSlots = (runtime: Record<string, SlotBlock[]> = {}): SlotInjectionResult => {
  const result: SlotInjectionResult = { injected: 0, missingSlots: [] };
  // Merge build-time + runtime per slot id, build-time first so
  // dedicated layout addons stay before drop-in tweaks.
  const merged: Record<string, SlotBlock[]> = {};
  for (const [slotId, blocks] of Object.entries(ADDON_SLOTS_GENERATED)) {
    merged[slotId] = [...blocks];
  }
  for (const [slotId, blocks] of Object.entries(runtime)) {
    (merged[slotId] ??= []).push(...blocks);
  }

  for (const [slotId, blocks] of Object.entries(merged)) {
    const slotEl = document.querySelector(`[data-slot="${slotId}"]`);
    if (!slotEl) {
      result.missingSlots.push(slotId);
      continue;
    }
    for (const block of blocks) {
      if (appendBlockToSlot(slotEl as HTMLElement, slotId, block)) result.injected++;
    }
  }

  if (result.missingSlots.length > 0) {
    log.warn(
      `Slots with no matching <div data-slot> in DOM (HTML probably belongs to a view that's not mounted yet): ${result.missingSlots.join(', ')}`,
    );
  }
  return result;
};
