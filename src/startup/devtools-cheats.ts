/**
 * BroadcastChannel listener that wires the dev-tools window's cheat
 * buttons to the live game store. Same-origin channel "mw-devtools"
 * is opened by both windows; this side handles the inbound messages
 * by mutating the engine state directly + triggering a save.
 *
 * Used only in dev/electron builds — gated on the BroadcastChannel
 * API being available (most browsers, all Electron renderers).
 */

import type { GameState } from '../types/game';
import type { Logger } from '../core/log';

interface CheatCommand {
  type: string;
  [k: string]: any;
}

export function registerDevtoolsCheatChannel(getStore: () => GameState, log: Logger): void {
  if (typeof BroadcastChannel === 'undefined') return;

  const devChannel = new BroadcastChannel('mw-devtools');
  devChannel.addEventListener('message', (ev) => {
    const cmd = ev.data as CheatCommand;
    const store = getStore();
    if (!store || !cmd?.type) return;

    try {
      switch (cmd.type) {
        case 'applyCheats':
          store.applyCheats?.();
          break;
        case 'addResource':
          if (cmd.resource && typeof cmd.amount === 'number') {
            store.resource.add(store, cmd.resource, cmd.amount);
          }
          break;
        case 'addStat':
          if (cmd.stat && typeof cmd.amount === 'number') {
            store.stats[cmd.stat] = (store.stats[cmd.stat] || 0) + cmd.amount;
          }
          break;
        case 'setFlag':
          if (cmd.flag !== undefined) {
            (store.flags as Record<string, boolean>)[cmd.flag] = cmd.value;
            store.pipeline?.invalidateCache?.();
            store.resource?.invalidateCache?.();
          }
          break;
        case 'grantShadowSlot': {
          const handler = store.actions?.effectHandlers?.grantShadowSlot;
          const by = typeof cmd.amount === 'number' ? cmd.amount : 1;
          if (handler) handler(store, { type: 'grantShadowSlot', by } as any);
          break;
        }
        case 'addBuff':
          if (cmd.buffId) {
            const handler = store.actions?.effectHandlers?.addBuff;
            if (handler) handler(store, { type: 'addBuff', buffId: cmd.buffId } as any);
          }
          break;
        case 'unlockNPC':
          if (cmd.npcId) {
            const handler = store.actions?.effectHandlers?.unlockNPC;
            if (handler) handler(store, { type: 'unlockNPC', id: cmd.npcId } as any);
          }
          break;
        case 'unlockAllNPCs': {
          const npcs = (store.content as any)?.registries?.npcs ?? {};
          const handler = store.actions?.effectHandlers?.unlockNPC;
          if (handler) {
            for (const npcId of Object.keys(npcs)) {
              if (!store.unlockedNPCs.includes(npcId as any)) {
                handler(store, { type: 'unlockNPC', id: npcId } as any);
              }
            }
          }
          break;
        }
        case 'setView':
          if (cmd.view) store.view = cmd.view;
          break;
        case 'completeDemo':
          store.demoCompleted = true;
          (store.flags as Record<string, boolean>)['unlocked-library'] = true;
          store.pipeline?.invalidateCache?.();
          break;
        case 'resetSave':
          localStorage.removeItem('wings_save');
          localStorage.removeItem('hasSave');
          window.location.reload();
          return; // skip the save trigger
      }
      store.bus?.emit?.(store.EVENTS.SAVE_REQUESTED);
    } catch (err) {
      log.warn('cheat failed:', err);
    }
  });
}
