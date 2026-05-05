import { ActionDefinition } from '../types/game';

/**
 * Alpine.js Store for UI State
 */
export const createUIStore = () => ({
  view: 'menu',
  hoveredAction: null as { id: string; data?: ActionDefinition; [key: string]: any } | null,
  activeFocus: null as string | null,
  lastMouseX: 0,
  lastMouseY: 0,
  settingsOpen: false,
  currentScale: 1,
  
  confirmModal: {
    open: false,
    message: '',
    onConfirm: null as (() => void) | null
  },

  setHovered(id: string | null, data: any = null) {
    this.hoveredAction = id ? { id, data } : null;
  },

  setView(v: string) {
    this.view = v;
  },

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  },

  showConfirm(message: string, onConfirm: () => void) {
    this.confirmModal = { open: true, message, onConfirm };
  },

  resolveConfirm(confirmed: boolean) {
    if (confirmed && this.confirmModal.onConfirm) {
      this.confirmModal.onConfirm();
    }
    this.confirmModal.open = false;
  }
});
