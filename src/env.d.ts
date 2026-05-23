declare module '@alpinejs/collapse';
declare module '*.css';

import type { Alpine as AlpineType } from 'alpinejs';

declare global {
  interface Window {
    electronAPI?: {
      // Window controls
      quitApp: () => void;
      resizeWindow: (width: number, height: number) => void;

      // Phase 3: SQLite save system
      dbSave: (payload: {
        slot: number;
        playerName: string;
        data: string;
        totalPlayTime: number;
      }) => Promise<boolean>;
      dbLoad: (slot: number) => Promise<{
        slot: number;
        playerName: string;
        data: string;
        schemaVersion: number;
        createdAt: number;
        updatedAt: number;
        totalPlayTime: number;
      } | null>;
      dbList: () => Promise<Array<{
        slot: number;
        playerName: string;
        schemaVersion: number;
        createdAt: number;
        updatedAt: number;
        totalPlayTime: number;
      }>>;
      dbDelete: (slot: number) => Promise<boolean>;

      // Phase 4: Dev tools
      openDevtools: () => void;

      // Phase 4 Iter 3: content authoring
      contentFind: (entityType: string, id: string) => Promise<string | null>;
      contentRead: (relativePath: string) => Promise<string | null>;
      contentWriteAction: (id: string, patch: Record<string, unknown>) => Promise<{ ok: boolean; error?: string }>;
      contentWrite: (entityType: string, id: string, patch: Record<string, unknown>) => Promise<{ ok: boolean; error?: string }>;
      contentWriteTranslation: (lang: string, context: string, key: string, value: string | null) => Promise<{ ok: boolean; error?: string }>;
      contentBuild: () => Promise<{ ok: boolean; output: string }>;
      contentValidate: () => Promise<{ ok: boolean; output: string }>;

      // Phase 16: Runtime addon discovery (user-installable addons)
      addonsDiscoverRuntime: () => Promise<{
        scannedDirs: string[];
        addons: Array<{
          name: string;
          version: string;
          description?: string;
          author?: string;
          sourceDir: string;
          data: Record<string, any[]>;
          translations: Record<string, Record<string, Record<string, string>>>;
          views: Record<string, string>;
          styles: Record<string, string>;
          slots: Record<string, string>;
          sfx: Record<string, string>;
          patches: any[];
        }>;
        warnings: string[];
      }>;
    };
    Alpine: AlpineType;
    TRANSLATIONS: import('./types/i18n').Translations;
    ALPINE_STARTED?: boolean;
  }

  var Alpine: AlpineType;
}

export {};
