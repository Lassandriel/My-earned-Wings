import { ActionDefinition } from './features/actions';

export interface LogEntry {
  id: string;
  context: string;
  params: Record<string, any>;
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
  hoveredAction: { id: string; data?: ActionDefinition; [key: string]: any } | null;
  activeFocus: string | null;
  lastMouseX: number;
  lastMouseY: number;
  settingsOpen: boolean;
  confirmModal: {
    open: boolean;
    message: string;
    onConfirm: (() => void) | null;
  };
  setHovered: (id: string | null, data?: any) => void;
  setView: (v: string) => void;
  toggleSettings: () => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
  resolveConfirm: (confirmed: boolean) => void;
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
  system: any;
  init: (system: any) => void;
  toggleSettings: (store: any) => void;
  calculateScale: (store: any) => void;
  setLanguage: (store: any, lang: string) => void;
  applyCheats: (store: any) => void;
}
