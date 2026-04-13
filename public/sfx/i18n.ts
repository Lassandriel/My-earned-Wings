import { translations } from '../lang/index';
export { translations };

let currentLanguage = localStorage.getItem('language') || 'de';

export function updateTexts() {
    console.log("updateTexts running for:", currentLanguage);
    const strings = translations[currentLanguage];
    if (!strings) {
        console.error("No translations found for:", currentLanguage);
        return;
    }

    const elements = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-placeholder]');

    elements.forEach(el => {
        const htmlEl = el as HTMLElement;
        const key = htmlEl.getAttribute('data-i18n') ||
            htmlEl.getAttribute('data-i18n-html') ||
            htmlEl.getAttribute('data-i18n-placeholder');

        if (key && strings[key]) {
            if (htmlEl.hasAttribute('data-i18n')) {
                htmlEl.textContent = strings[key];
            } else if (htmlEl.hasAttribute('data-i18n-html')) {
                htmlEl.innerHTML = strings[key];
            } else if (htmlEl.hasAttribute('data-i18n-placeholder')) {
                (htmlEl as HTMLInputElement).placeholder = strings[key];
            }
        }
    });

    document.documentElement.lang = currentLanguage;
    updateActiveButton();
}

function updateActiveButton() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        const lang = (btn as HTMLElement).dataset.lang;
        if (lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

export function setupLanguage() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = (btn as HTMLElement).dataset.lang;
            if (lang && lang !== currentLanguage) {
                currentLanguage = lang;
                localStorage.setItem('language', lang);
                updateTexts();
            }
        });
    });

    // Make globally available for emergencies
    (window as any).setLanguage = (lang: string) => {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        updateTexts();
    };

    updateTexts();
}

export function getCurrentLanguage() {
    return currentLanguage;
}
