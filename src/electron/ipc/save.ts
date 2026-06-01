/**
 * IPC: SQLite save system. Thin wrapper around src/electron/db.ts —
 * the renderer never touches the database directly; everything flows
 * through these four async handlers.
 */

import { ipcMain } from 'electron';
import { IpcChannel, SaveSlotPayload } from '../ipc.js';
import { saveSlot, loadSlot, listSlots, deleteSlot } from '../db.js';

export function registerSaveIpc() {
  ipcMain.handle(IpcChannel.DB_SAVE, async (_event, payload: SaveSlotPayload): Promise<boolean> => {
    return saveSlot(payload.slot, payload.playerName, payload.data, payload.totalPlayTime);
  });

  ipcMain.handle(IpcChannel.DB_LOAD, async (_event, slot: number) => {
    const row = await loadSlot(slot);
    if (!row) return null;
    return {
      slot: row.slot,
      playerName: row.player_name,
      data: row.data,
      schemaVersion: row.schema_version,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      totalPlayTime: row.total_play_time,
    };
  });

  ipcMain.handle(IpcChannel.DB_LIST, async () => listSlots());

  ipcMain.handle(IpcChannel.DB_DELETE, async (_event, slot: number): Promise<boolean> => deleteSlot(slot));
}
