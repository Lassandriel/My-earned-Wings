import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

/**
 * Phase 3 SQLite save database for My-earned-Wings.
 *
 * Implementation: sql.js (pure JS / WASM build of SQLite). No native
 * rebuild needed, works with any Electron version. Trade-off: DB lives
 * in memory and we serialize it to disk after each write — fine for a
 * single-player save file (a few KB). The file lives at:
 *   Windows : %APPDATA%/my-earned-wings/saves.db
 *   macOS   : ~/Library/Application Support/my-earned-wings/saves.db
 *   Linux   : ~/.config/my-earned-wings/saves.db
 *
 * Schema is intentionally tiny for v1 — slot 0 is the auto-save, future
 * versions can use slot 1+ for named saves. Achievements / action history
 * tables are reserved for later phases.
 */

// Save-data shape version. Bumped whenever the JSON state shape inside the
// `data` column changes in a way that breaks older loads. Migrations live
// in src/core/services/save-migrations.ts — keep these two in sync.
const SCHEMA_VERSION = 2;

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

let _SQL: SqlJsStatic | null = null;
let _db: Database | null = null;
let _dbPath: string | null = null;

const SCHEMA_SQL = `
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
`;

/**
 * Loads the WASM runtime once, opens the DB file (or creates one),
 * runs the schema migrations. Returns null on failure.
 */
export const open = async (): Promise<Database | null> => {
  if (_db) return _db;

  try {
    if (!_SQL) {
      _SQL = await initSqlJs({
        locateFile: (file) =>
          path.join(path.dirname(require.resolve('sql.js')), file),
      });
    }

    _dbPath = path.join(app.getPath('userData'), 'saves.db');
    if (fs.existsSync(_dbPath)) {
      const fileBuffer = fs.readFileSync(_dbPath);
      _db = new _SQL.Database(new Uint8Array(fileBuffer));
    } else {
      _db = new _SQL.Database();
    }

    _db.exec(SCHEMA_SQL);
    return _db;
  } catch (err) {
    console.error('[DB] open failed:', err);
    return null;
  }
};

/** Persist the in-memory DB snapshot to disk. */
const flush = (): void => {
  if (!_db || !_dbPath) return;
  try {
    const data = _db.export();
    fs.writeFileSync(_dbPath, Buffer.from(data));
  } catch (err) {
    console.error('[DB] flush failed:', err);
  }
};

export const saveSlot = async (
  slot: number,
  playerName: string,
  data: string,
  totalPlayTime: number,
): Promise<boolean> => {
  const db = await open();
  if (!db) return false;
  try {
    const now = Date.now();

    const existingResult = db.exec('SELECT created_at FROM saves WHERE slot = ?', [slot]);
    const firstRow = existingResult[0];
    const createdAt =
      firstRow && firstRow.values.length
        ? (firstRow.values[0]![0] as number)
        : now;

    db.run(
      `INSERT INTO saves (slot, player_name, data, schema_version, created_at, updated_at, total_play_time)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(slot) DO UPDATE SET
         player_name     = excluded.player_name,
         data            = excluded.data,
         schema_version  = excluded.schema_version,
         updated_at      = excluded.updated_at,
         total_play_time = excluded.total_play_time`,
      [slot, playerName, data, SCHEMA_VERSION, createdAt, now, totalPlayTime],
    );

    flush();
    return true;
  } catch (err) {
    console.error('[DB] saveSlot failed:', err);
    return false;
  }
};

export const loadSlot = async (slot: number): Promise<SaveRow | null> => {
  const db = await open();
  if (!db) return null;
  try {
    const result = db.exec('SELECT * FROM saves WHERE slot = ?', [slot]);
    const r0 = result[0];
    if (!r0 || !r0.values.length) return null;

    const cols = r0.columns;
    const row = r0.values[0]!;
    const obj: Record<string, unknown> = {};
    cols.forEach((col, i) => (obj[col] = row[i]));
    return obj as unknown as SaveRow;
  } catch (err) {
    console.error('[DB] loadSlot failed:', err);
    return null;
  }
};

export const listSlots = async (): Promise<SaveMeta[]> => {
  const db = await open();
  if (!db) return [];
  try {
    const result = db.exec(
      'SELECT slot, player_name, schema_version, created_at, updated_at, total_play_time FROM saves ORDER BY slot',
    );
    if (!result.length) return [];
    return result[0]!.values.map((row) => ({
      slot: row[0] as number,
      playerName: row[1] as string,
      schemaVersion: row[2] as number,
      createdAt: row[3] as number,
      updatedAt: row[4] as number,
      totalPlayTime: row[5] as number,
    }));
  } catch (err) {
    console.error('[DB] listSlots failed:', err);
    return [];
  }
};

export const deleteSlot = async (slot: number): Promise<boolean> => {
  const db = await open();
  if (!db) return false;
  try {
    db.run('DELETE FROM saves WHERE slot = ?', [slot]);
    db.run('DELETE FROM achievements WHERE save_id = ?', [slot]);
    db.run('DELETE FROM history WHERE save_id = ?', [slot]);
    flush();
    return true;
  } catch (err) {
    console.error('[DB] deleteSlot failed:', err);
    return false;
  }
};

export const close = (): void => {
  if (_db) {
    flush();
    _db.close();
    _db = null;
  }
};
