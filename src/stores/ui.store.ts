import { HoverActionData } from '../types/game';

/**
 * Alpine.js Store for UI State
 */

export const createUIStore = () => ({
  view: 'menu',
  hoveredAction: null as HoverActionData | null,
  activeShadow: null as string | null,
  lastMouseX: 0,
  lastMouseY: 0,
  settingsOpen: false,
  currentScale: 1,
  
  confirmModal: {
    open: false,
    message: '',
    onConfirm: null as (() => void) | null
  },

  setHovered(id: string | null, data: HoverActionData | null = null) {
    this.hoveredAction = id ? (data ? { ...data, id } : { id }) : null;
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
