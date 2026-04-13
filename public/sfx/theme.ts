export function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Initial state from data attribute or localStorage
        const currentTheme = document.documentElement.dataset.theme || localStorage.getItem('theme') || 'dark';
        themeToggle.textContent = currentTheme === 'light' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.toggle('light-theme');
            const newTheme = isLight ? 'light' : 'dark';
            document.documentElement.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);

            themeToggle.textContent = isLight ? '☀️' : '🌙';
        });
    }
}
