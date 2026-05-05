import Alpine from 'alpinejs';
import { GameState, LogStore } from '../../types/game';

/**
 * Logger System - TypeScript Edition
 * Manages game logs, grouping, and history pruning.
 */
export const createLoggerSystem = () => ({
  metadata: { id: 'logger' },
  addLog(store: GameState, id: string, context?: string, color?: string, params?: any) {
    const logStore = Alpine.store('logs') as LogStore;
    
    let type = 'normal';
    if (color && (color.includes('teal') || color.includes('184, 166'))) type = 'success';
    else if (color && (color.includes('gold') || color.includes('251, 191'))) type = 'milestone';
    else if (color && (color.includes('purple') || color.includes('210, 180'))) type = 'story';
    else if (color && (color.includes('red') || color.includes('239, 68'))) type = 'failure';

    const lastLog = logStore.list[0];
    const finalColor = color || 'rgba(226, 232, 240, 0.7)';
    const finalContext = context || 'logs';

    // Grouping logic: If identical to the last message, just increment count
    const noGroupIds = ['intro_1', 'intro_welcome', 'milestone_tree_of_life'];

    let finalParams = params || {};
    // Inject playerName for easy replacement in translations
    if (!finalParams.playerName) {
      finalParams.playerName = store.playerName || 'Entdecker';
    }

    if (
      !noGroupIds.includes(id) &&
      lastLog &&
      lastLog.id === id &&
      lastLog.context === finalContext &&
      JSON.stringify(lastLog.params) === JSON.stringify(finalParams)
    ) {
      lastLog.count++;
      lastLog.timestamp = Date.now() + Math.random();
      return;
    }

    logStore.addLog({
      id: id,
      context: finalContext,
      params: finalParams,
      color: finalColor,
      type,
      count: 1,
      timestamp: Date.now() + Math.random(),
    });
  },

  boot(store: GameState) {
    store.bus.on(store.EVENTS.LOG_ADDED, (data: any) => {
      this.addLog(store, data.id, data.context, data.color, data.params);
    });
  },
});
