let isTransitionsInitialized = false;

export function setupNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            menuToggle.classList.toggle('open');
            navUl.classList.toggle('open');
        });
    }

    setupPageTransitions();
}

function setupPageTransitions() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent || isTransitionsInitialized) return;

    isTransitionsInitialized = true;
    mainContent.classList.add('page-enter');

    mainContent.addEventListener('animationend', (e) => {
        if (e.animationName === 'pageEnterAnim') {
            mainContent.classList.remove('page-enter');
        }
    });

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        if (!link || !link.href) return;

        const targetAttr = link.getAttribute('target');

        try {
            const url = new URL(link.href);

            if (url.origin === window.location.origin && targetAttr !== '_blank') {
                if (url.pathname === window.location.pathname) {
                    return;
                }

                if (link.getAttribute('href')?.startsWith('mailto:')) return;

                e.preventDefault();
                
                const main = document.getElementById('main-content');
                if (main) {
                    main.classList.remove('page-enter');
                    main.classList.add('page-exit');

                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 500);
                }
            }
        } catch (err) {
            // Ignore invalid URLs
        }
    });
}
