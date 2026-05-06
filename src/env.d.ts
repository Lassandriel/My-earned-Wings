declare module '@alpinejs/collapse';
declare module '*.css';

import type { Alpine as AlpineType } from 'alpinejs';

declare global {
  interface Window {
    electronAPI?: {
      saveGame: (data: string) => Promise<boolean>;
      loadGame: () => Promise<string | null>;
      quitApp: () => void;
      resizeWindow: (width: number, height: number) => void;
    };
    Alpine: AlpineType;
    TRANSLATIONS: import('./types/i18n').Translations;
    ALPINE_STARTED?: boolean;
  }

  var Alpine: AlpineType;
}

export {};
