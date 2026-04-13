import { updateTexts } from './i18n';

export function setupCookieBanner(forceShow = false) {
    const consent = localStorage.getItem('cookieConsent');
    
    if (!forceShow) {
        if (consent === 'all') {
            initAnalytics();
            return;
        } else if (consent === 'essential') {
            return;
        }
    }

    if (document.getElementById('cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner glass-card entrance-animate';
    banner.innerHTML = `
        <div class="cookie-content">
            <h3 data-i18n="cookie_title">cookie_title</h3>
            <p data-i18n="cookie_text">cookie_text</p>
            <div class="cookie-links">
                <a href="imprint.html#imprint" data-i18n="imprint_link">Impressum</a> |
                <a href="imprint.html#privacy" data-i18n="privacy_link">Datenschutz</a>
            </div>
        </div>
        <div class="cookie-buttons">
            <button id="cookie-reject" class="btn btn-secondary" data-i18n="cookie_reject">Nur essenzielle</button>
            <button id="cookie-accept" class="btn" data-i18n="cookie_accept">Alle akzeptieren</button>
        </div>
    `;

    document.body.appendChild(banner);
    updateTexts();

    const closeBanner = (status: 'all' | 'essential') => {
        localStorage.setItem('cookieConsent', status);
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(90%)';
        setTimeout(() => banner.remove(), 400);
        if (status === 'all') initAnalytics();
    };

    document.getElementById('cookie-accept')?.addEventListener('click', () => closeBanner('all'));
    document.getElementById('cookie-reject')?.addEventListener('click', () => closeBanner('essential'));
}

export function initCookieBannerListener() {
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'open-cookie-banner' || target.closest('#open-cookie-banner')) {
            e.preventDefault();
            setupCookieBanner(true);
        }
    });
}

function initAnalytics() {
    console.log("Analytics initialized (Consent granted).");
    
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-R18WRP31XQ';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-R18WRP31XQ');
    `;
    document.head.appendChild(script2);
}
