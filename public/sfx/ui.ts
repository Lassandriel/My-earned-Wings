import { translations, getCurrentLanguage } from './i18n';

export function setupUI() {
    setupFAQ();
    setupContactForm();
}

function setupFAQ() {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.faq-header');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const contentId = btn.getAttribute('aria-controls');
            const content = contentId ? document.getElementById(contentId) : null;

            // Close all others
            buttons.forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherId = other.getAttribute('aria-controls');
                    const otherContent = otherId ? document.getElementById(otherId) : null;
                    if (otherContent) {
                        otherContent.style.maxHeight = '0px';
                        otherContent.style.opacity = '0';
                    }
                }
            });

            // Toggle current
            btn.setAttribute('aria-expanded', (!expanded).toString());
            if (content) {
                if (expanded) {
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                } else {
                    content.style.maxHeight = '300px';
                    content.style.opacity = '1';
                }
            }
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;

    let successMsg = document.querySelector('.contact-success-msg') as HTMLElement;
    if (!successMsg) {
        successMsg = document.createElement('p');
        successMsg.className = 'contact-success-msg';
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn?.insertAdjacentElement('afterend', successMsg);
    }

    const toggleBtns = form.querySelectorAll<HTMLButtonElement>('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (form.querySelector('#name') as HTMLInputElement).value.trim();
        const message = (form.querySelector('#message') as HTMLTextAreaElement).value.trim();
        const activeToggle = form.querySelector<HTMLButtonElement>('.toggle-btn.active');
        const inquiryType = activeToggle?.dataset.value ?? 'business';

        const currentLang = getCurrentLanguage();
        const strings = translations[currentLang];
        const subjectPrefix = strings?.['contact_subject_prefix'] ?? 'Message from';
        const recipient = inquiryType === 'fan' ? 'fan@nhywyll.com' : 'contact@nhywyll.com';

        const subject = encodeURIComponent(`${subjectPrefix} ${name}`);
        const body = encodeURIComponent(message);
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        window.location.href = mailto;

        successMsg.textContent = strings?.['contact_success'] ?? 'Opened mail program!';
        successMsg.style.display = 'block';
        form.reset();
        toggleBtns.forEach((b, i) => b.classList.toggle('active', i === 0));

        setTimeout(() => { successMsg.style.display = 'none'; }, 7000);
    });
}
