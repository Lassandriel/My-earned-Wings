export const createLoggerSystem = () => ({
  addLog(store, id, context, color, params) {
    let type = 'normal';
    if (color && (color.includes('teal') || color.includes('184, 166'))) type = 'success';
    else if (color && (color.includes('gold') || color.includes('251, 191'))) type = 'milestone';
    else if (color && (color.includes('purple') || color.includes('210, 180'))) type = 'story';
    else if (color && (color.includes('red') || color.includes('239, 68'))) type = 'failure';

    store.logs.unshift({
      id: id,
      context: context || 'logs',
      params: params || {},
      color: color || 'rgba(226, 232, 240, 0.7)',
      type,
      timestamp: Date.now() + Math.random() // Unique ID for Alpine :key
    });

    if (store.logs.length > 40) store.logs.pop();
  },

  boot(store) {
    store.bus.on(store.EVENTS.LOG_ADDED, (data) => {
      this.addLog(store, data.id, data.context, data.color, data.params);
    });
  }
});
