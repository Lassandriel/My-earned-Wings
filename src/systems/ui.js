export const createUISystem = () => ({
  calculateScale(store) {
    const setting = store.settings.uiScale;
    const targetW = 1920;
    const targetH = 1075;

    if (setting === 'auto') {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      store.currentScale = Math.min(winW / targetW, winH / targetH);
    } else {
      const scale = parseFloat(setting);
      store.currentScale = scale;
      
      if (window.electronAPI?.resizeWindow) {
        const idealW = Math.round(targetW * scale);
        const idealH = Math.round(targetH * scale);
        if (Math.abs(window.innerWidth - idealW) > 5 || Math.abs(window.innerHeight - idealH) > 5) {
          window.electronAPI.resizeWindow(idealW, idealH);
        }
      }
    }

    document.documentElement.style.setProperty('--app-scale', store.currentScale);
    
    // Calculate offsets for absolute positioning if needed (optional since we use translate(-50%))
    const offsetX = (window.innerWidth - targetW * store.currentScale) / 2;
    const offsetY = (window.innerHeight - targetH * store.currentScale) / 2;
    document.documentElement.style.setProperty('--app-offset-x', `${offsetX}px`);
    document.documentElement.style.setProperty('--app-offset-y', `${offsetY}px`);
  },

  handleMouseMove(e, store) {
    const wrapper = document.getElementById('game-wrapper');
    if (!wrapper || !store) return;

    const rect = wrapper.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / store.currentScale;
    const relY = (e.clientY - rect.top) / store.currentScale;
    
    store.lastMouseX = relX;
    store.lastMouseY = relY;
    document.documentElement.style.setProperty('--mx', relX + 'px');
    document.documentElement.style.setProperty('--my', relY + 'px');
  }
});
