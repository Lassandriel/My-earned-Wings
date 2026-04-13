export function setupEffects() {
    setupParticles();
    setupBirdTracks();
    setupEasterEgg();
}

function setupParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    document.body.prepend(particlesContainer);

    const createFeather = () => {
        const feather = document.createElement('div');
        feather.className = 'feather-particle';
        
        const startPosX = Math.random() * 100;
        const size = Math.random() * 0.5 + 0.5;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        feather.style.left = `${startPosX}vw`;
        feather.style.transform = `scale(${size})`;
        feather.style.animationDuration = `${duration}s`;
        feather.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(feather);

        setTimeout(() => {
            feather.remove();
        }, (duration + delay) * 1000);
    };

    setInterval(createFeather, 800);

    for (let i = 0; i < 15; i++) {
        createFeather();
    }
}

function setupBirdTracks() {
    document.addEventListener('click', (e) => {
        const track = document.createElement('div');
        track.className = 'bird-track';
        
        track.style.left = `${e.clientX}px`;
        track.style.top = `${e.clientY}px`;
        
        const rotation = Math.random() * 40 - 20;
        track.style.setProperty('--track-rot', `${rotation}deg`);

        document.body.appendChild(track);

        setTimeout(() => {
            track.remove();
        }, 800);
    });
}

function setupEasterEgg() {
    const chickenEmojis = ['🐔', '🐣', '🐥', '🐤', '🦆', '🐧', '🐓', '🦅'];

    const triggerEasterEgg = () => {
        const emoji = document.createElement('span');
        emoji.className = 'easter-chicken';
        emoji.textContent = chickenEmojis[Math.floor(Math.random() * chickenEmojis.length)];
        emoji.style.fontSize = (Math.floor(Math.random() * 24) + 28) + 'px';
        emoji.style.top = Math.floor(Math.random() * 70) + 5 + '%';

        if (Math.random() > 0.5) {
            emoji.style.left = '-80px';
            emoji.style.animationName = 'chicken-run';
        } else {
            emoji.style.right = '-80px';
            emoji.style.animationName = 'chicken-run-rtl';
        }

        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 9000);
    };

    document.querySelectorAll('.easter-hint-container').forEach(el => {
        el.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) setTimeout(triggerEasterEgg, i * 200);
        });
        (el as HTMLElement).style.cursor = 'pointer';
    });
}
