export const createJuiceSystem = () => ({
  container: null,

  init() {
    this.container = document.getElementById('juice-container');
    if (!this.container) {
      console.warn("Juice container not found. Particles disabled.");
    }
  },

  spawnParticle(x, y, text, type = 'normal') {
    if (!this.container) return;

    const el = document.createElement('div');
    el.className = `juice-particle p-${type}`;
    el.innerText = text;

    // Random slight horizontal offset for variety
    const offsetX = (Math.random() - 0.5) * 40;
    el.style.left = `${x + offsetX}px`;
    el.style.top = `${y}px`;

    this.container.appendChild(el);

    // Remove after animation completes (matched to CSS duration)
    setTimeout(() => {
      el.remove();
    }, 2000);
  }
});
