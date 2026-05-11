import path from 'path';
import { app } from 'electron';

// better-sqlite3 is a native module that requires a rebuild for Electron's
// Node ABI (run `npm run rebuild:electron`, needs VS Build Tools on Windows).
// Until that's in place we keep the import lazy and degrade gracefully so
// the rest of the app still runs from localStorage.
type DbModule = typeof import('better-sqlite3');
let Database: DbModule | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Database = require('better-sqlite3');
} catch (err) {
  console.warn('[DB] better-sqlite3 unavailable (run `npm run rebuild:electron`):', (err as Error).message);
}

/**
 * SQLite save database for My-earned-Wings (Phase 3).
 *
 * Lives in the OS user-data directory:
 *   Windows : %APPDATA%/my-earned-wings/saves.db
 *   macOS   : ~/Library/Application Support/my-earned-wings/saves.db
 *   Linux   : ~/.config/my-earned-wings/saves.db
 *
 * Schema is intentionally tiny for v1 — slot 0 is the auto-save, future
 * versions can use slot 1+ for named saves. Achievements / action history
 * tables are reserved for later phases.
 */

const SCHEMA_VERSION = 1;

export interface SaveRow {
  slot: number;
  player_name: string;
  data: string;
  schema_version: number;
  created_at: number;
  updated_at: number;
  total_play_time: number;
}

export interface SaveMeta {
  slot: number;
  playerName: string;
  schemaVersion: number;
  createdAt: number;
  updatedAt: number;
  totalPlayTime: number;
}

let _db: import('better-sqlite3').Database | null = null;

const open = (): import('better-sqlite3').Database | null => {
  if (_db) return _db;
  if (!Database) return null; // module unavailable, gracefully no-op

  const dbPath = path.join(app.getPath('userData'), 'saves.db');
  _db = new Database(dbPath);
  _db.pragma('journal_mode = WAL');

  _db.exec(`
    CREATE TABLE IF NOT EXISTS saves (
      slot            INTEGER PRIMARY KEY,
      player_name     TEXT    NOT NULL DEFAULT '',
      data            TEXT    NOT NULL,
      schema_version  INTEGER NOT NULL DEFAULT 1,
      created_at      INTEGER NOT NULL,
      updated_at      INTEGER NOT NULL,
      total_play_time INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS achievements (
      save_id        INTEGER NOT NULL,
      achievement_id TEXT    NOT NULL,
      unlocked_at    INTEGER NOT NULL,
      PRIMARY KEY (save_id, achievement_id)
    );

    CREATE TABLE IF NOT EXISTS history (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      save_id      INTEGER NOT NULL,
      action_id    TEXT    NOT NULL,
      performed_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_history_save ON history(save_id, performed_at);
  `);

  return _db;
};

export const saveSlot = (
  slot: number,
  playerName: string,
  data: string,
  totalPlayTime: number,
): boolean => {
  try {
    const db = open();
    if (!db) return false;
    const now = Date.now();
    const existing = db
      .prepare('SELECT created_at FROM saves WHERE slot = ?')
      .get(slot) as { created_at: number } | undefined;

    db.prepare(
      `INSERT INTO saves (slot, player_name, data, schema_version, created_at, updated_at, total_play_time)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(slot) DO UPDATE SET
         player_name     = excluded.player_name,
         data            = excluded.data,
         schema_version  = excluded.schema_version,
         updated_at      = excluded.updated_at,
         total_play_time = excluded.total_play_time`,
    ).run(
      slot,
      playerName,
      data,
      SCHEMA_VERSION,
      existing?.created_at ?? now,
      now,
      totalPlayTime,
    );
    return true;
  } catch (err) {
    console.error('[DB] saveSlot failed:', err);
    return false;
  }
};

export const loadSlot = (slot: number): SaveRow | null => {
  try {
    const db = open();
    if (!db) return null;
    const row = db.prepare('SELECT * FROM saves WHERE slot = ?').get(slot) as SaveRow | undefined;
    return row ?? null;
  } catch (err) {
    console.error('[DB] loadSlot failed:', err);
    return null;
  }
};

export const listSlots = (): SaveMeta[] => {
  try {
    const db = open();
    if (!db) return [];
    const rows = db
      .prepare('SELECT slot, player_name, schema_version, created_at, updated_at, total_play_time FROM saves ORDER BY slot')
      .all() as SaveRow[];
    return rows.map((r) => ({
      slot: r.slot,
      playerName: r.player_name,
      schemaVersion: r.schema_version,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      totalPlayTime: r.total_play_time,
    }));
  } catch (err) {
    console.error('[DB] listSlots failed:', err);
    return [];
  }
};

export const deleteSlot = (slot: number): boolean => {
  try {
    const db = open();
    if (!db) return false;
    db.prepare('DELETE FROM saves WHERE slot = ?').run(slot);
    db.prepare('DELETE FROM achievements WHERE save_id = ?').run(slot);
    db.prepare('DELETE FROM history WHERE save_id = ?').run(slot);
    return true;
  } catch (err) {
    console.error('[DB] deleteSlot failed:', err);
    return false;
  }
};

export const close = (): void => {
  if (_db) {
    _db.close();
    _db = null;
  }
};
