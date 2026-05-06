import { GameState, HoverActionData } from './game';
import { TranslationParams } from './i18n';

export interface LogEntry {
  id: string;
  context: string;
  params: TranslationParams;
  color: string;
  type: string;
  count: number;
  timestamp: number;
}

export interface LogStore {
  list: LogEntry[];
  addLog: (entry: LogEntry) => void;
  clear: () => void;
}

export interface UIStore {
  view: string;
  hoveredAction: HoverActionData | null;
  activeFocus: string | null;
  lastMouseX: number;
  lastMouseY: number;
  settingsOpen: boolean;
  confirmModal: {
    open: boolean;
    message: string;
    onConfirm: (() => void) | null;
  };
  setHovered: (id: string | null, data?: HoverActionData) => void;
  setView: (v: string) => void;
  toggleSettings: () => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
  resolveConfirm: (confirmed: boolean) => void;
}

/** Reference to the settings logic system */
export interface SettingsSystemRef {
  calculateScale: (store: GameState) => void;
  setResolution: (store: GameState, res: string) => void;
  setLanguage: (store: GameState, lang: string) => void;
  toggleSettings: (store: GameState) => void;
  applyCheats: (store: GameState) => void;
}

export interface SettingsStore {
  volumeGlobal: number;
  volumeMusic: number;
  volumeSfx: number;
  mute: boolean;
  showParticles: boolean;
  showJuice: boolean;
  uiScale: 'auto' | string;
  resolution: 'auto' | string;
  system: SettingsSystemRef | null;
  init: (system: SettingsSystemRef) => void;
  toggleSettings: (store: GameState) => void;
  calculateScale: (store: GameState) => void;
  setLanguage: (store: GameState, lang: string) => void;
  applyCheats: (store: GameState) => void;
}
