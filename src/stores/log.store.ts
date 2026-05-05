import { LogEntry, LogStore } from '../types/game';

/**
 * Alpine.js Store for Game Logs
 */
export const createLogStore = (): LogStore => ({
  list: [],
  
  addLog(entry: LogEntry) {
    this.list.unshift(entry);
    // Prune history to keep performance stable
    if (this.list.length > 50) {
      this.list.pop();
    }
  },

  clear() {
    this.list = [];
  }
});
