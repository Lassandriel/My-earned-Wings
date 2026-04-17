export const createJuiceSystem = () => ({
  container: null,

  init() {
    this.container = document.getElementById('juice-container');
    if (!this.container) {
      console.warn("Juice container not found. Particles disabled.");
    }
  },

  spawnParticle(x, y, text, type = 'normal') {
    const store = Alpine.store('game');
    const settings = store.settings || {};
    if (!this.container || !settings.showJuice) return;

    const el = document.createElement('div');
    // Using the new high-polish animation name
    el.className = `juice-particle p-${type}`;
    el.style.animation = 'float-up-fade-juice 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    el.innerText = text;

    // Center on cursor with a bit of randomness
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 10;
    el.style.left = `${x + offsetX}px`;
    el.style.top = `${y - 20 + offsetY}px`;

    this.container.appendChild(el);

    // Remove after animation completes
    setTimeout(() => {
      el.remove();
    }, 1300);
  },

  boot(store) {
    store.bus.on(store.EVENTS.PARTICLE_TRIGGERED, (data) => {
      this.spawnParticle(data.x, data.y, data.text, data.type);
    });
  }
});
