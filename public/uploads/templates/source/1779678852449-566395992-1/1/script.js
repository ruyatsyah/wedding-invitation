document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-in Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // 2. Bottom Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 3. Audio Controller
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.remove('active');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            isPlaying = false;
        } else {
            playMusic();
        }
    }

    function playMusic() {
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('active');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        }).catch(e => {
            console.log("Auto-play prevented by browser. Waiting for interaction...");
            document.addEventListener('click', playOnInteract, { once: true });
            document.addEventListener('touchstart', playOnInteract, { once: true });
            document.addEventListener('scroll', playOnInteract, { once: true });
        });
    }

    function playOnInteract() {
        if (!isPlaying) {
            playMusic();
        }
    }

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusic();
    });

    // 4. Auto Scroll Feature
    const autoScrollBtn = document.getElementById('autoscroll-btn');
    let autoScrollInterval;
    let isAutoScrolling = false;

    autoScrollBtn.addEventListener('click', () => {
        if (isAutoScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });

    function startAutoScroll() {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        autoScrollBtn.style.background = '#fff';
        autoScrollInterval = setInterval(() => {
            window.scrollBy(0, 1);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                stopAutoScroll();
            }
        }, 30);
    }

    function stopAutoScroll() {
        isAutoScrolling = false;
        autoScrollBtn.style.background = 'var(--primary)';
        clearInterval(autoScrollInterval);
    }

    window.addEventListener('wheel', stopAutoScroll);
    window.addEventListener('touchstart', stopAutoScroll, { passive: true });

    // 5. Cover Logic & Initialize Auto-play and Auto-scroll
    const coverOverlay = document.getElementById('cover');
    const openInvitationBtn = document.getElementById('open-invitation');
    const guestNameEl = document.getElementById('guest-name');

    // Get guest name from URL if exist (e.g., ?to=Budi)
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        guestNameEl.textContent = guestName;
    }

    // Try to play music immediately on load
    setTimeout(() => {
        playMusic();
    }, 500);

    openInvitationBtn.addEventListener('click', () => {
        // Slide up the cover
        coverOverlay.classList.add('slide-up');
        // Unlock scroll
        document.body.classList.remove('locked');
        
        // Start auto-scroll after a short delay for smooth transition
        setTimeout(() => {
            // Also ensure music is playing in case user didn't interact before clicking this button
            if (!isPlaying) playMusic();
            startAutoScroll();
        }, 500);
    });
});
