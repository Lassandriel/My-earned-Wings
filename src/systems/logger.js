export const createLoggerSystem = () => ({
  addLog(store, text, color) {
    let type = 'normal';
    if (color && color.includes('184, 166')) type = 'success';
    else if (color && color.includes('251, 191')) type = 'milestone';
    else if (color && color.includes('210, 180')) type = 'story';
    else if (color && color.includes('239, 68')) type = 'failure';

    store.logs.unshift({
      text,
      color: color || 'rgba(226, 232, 240, 0.7)',
      type,
      id: Date.now() + Math.random()
    });

    if (store.logs.length > 40) store.logs.pop();
  }
});
