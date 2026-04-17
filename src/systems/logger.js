export const createLoggerSystem = () => ({
  addLog(store, id, context, color, params) {
    let type = 'normal';
    if (color && (color.includes('teal') || color.includes('184, 166'))) type = 'success';
    else if (color && (color.includes('gold') || color.includes('251, 191'))) type = 'milestone';
    else if (color && (color.includes('purple') || color.includes('210, 180'))) type = 'story';
    else if (color && (color.includes('red') || color.includes('239, 68'))) type = 'failure';

    const lastLog = store.logs[0];
    const finalColor = color || 'rgba(226, 232, 240, 0.7)';
    const finalContext = context || 'logs';

    // IDs that should always show a new entry (no grouping)
    const instantLogIds = ['herbs_gain', 'wood_gain', 'stone_gain', 'action_study', 'garden_harvest_log'];

    // Grouping logic: If identical to the last message, just increment count
    if (!instantLogIds.includes(id) && lastLog && lastLog.id === id && lastLog.context === finalContext && lastLog.color === finalColor) {
      lastLog.count++;
      lastLog.timestamp = Date.now() + Math.random(); // Update timestamp to trigger Alpine :key update
      return;
    }

    store.logs.unshift({
      id: id,
      context: finalContext,
      params: params || {},
      color: finalColor,
      type,
      count: 1,
      timestamp: Date.now() + Math.random()
    });

    if (store.logs.length > 40) store.logs.pop();
  },

  boot(store) {
    store.bus.on(store.EVENTS.LOG_ADDED, (data) => {
      this.addLog(store, data.id, data.context, data.color, data.params);
    });
  }
});
