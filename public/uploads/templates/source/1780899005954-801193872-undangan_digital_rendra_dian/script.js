/**
 * Dynamic Digital Wedding Invitation Engine
 * Native JavaScript handling music, dynamic custom particles, counts down, and RSVP.
 */

// Countdown system
const weddingDateTarget = new Date('2026-10-17T09:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDateTarget - now;
    
    if (distance < 0) {
        document.getElementById('days').innerText = "00";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        document.getElementById('seconds').innerText = "00";
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Falling Floral Particles
const floralEmojis = ["🌸", "🌹", "🏵️", "🍂", "✨"];
const particlesContainer = document.getElementById('floral-particles-container');

function createPetal() {
    if (!particlesContainer) return;
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.innerText = floralEmojis[Math.floor(Math.random() * floralEmojis.length)];
    
    // Random position and duration
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 6 + 6 + "s"; // between 6s & 12s
    petal.style.fontSize = Math.random() * 12 + 12 + "px"; // between 12px & 24px
    petal.style.opacity = Math.random() * 0.6 + 0.3;
    
    particlesContainer.appendChild(petal);
    
    // Self release
    setTimeout(() => {
        petal.remove();
    }, 12000);
}

// Start particle spawning
let particleTimer = null;
function startFallingPetals() {
    particleTimer = setInterval(createPetal, 450);
}

function stopFallingPetals() {
    if (particleTimer) clearInterval(particleTimer);
}

// Navigation highlight on scroll
const sectionsList = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let currentId = '';
    sectionsList.forEach(sec => {
        const topOfSection = sec.offsetTop;
        const sectionHeight = sec.clientHeight;
        if (window.scrollY >= topOfSection - 150) {
            currentId = sec.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + currentId || 
           (currentId === 'hero' && item.getAttribute('href') === '#hero') ||
           (currentId === 'mempelai-pria' && item.getAttribute('href') === '#mempelai') ||
           (currentId === 'mempelai-wanita' && item.getAttribute('href') === '#mempelai')) {
            item.classList.add('active');
        }
    });
});

// Clipboard interactive Salin Rekening
function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("No. Rekening berhasil disalin!");
    }).catch(err => {
        console.error("Gagal menyalin no. rekening: ", err);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Media Audio handles
const audioElem = document.getElementById('bg-music');
const controlBtn = document.getElementById('music-control');

function toggleMusic() {
    if (!audioElem || !controlBtn) return;
    if (audioElem.paused) {
        audioElem.play().catch(e => console.log('Audio Autoplay Blocked:', e));
        controlBtn.classList.add('play');
        controlBtn.style.animationPlayState = 'running';
    } else {
        audioElem.pause();
        controlBtn.classList.remove('play');
        controlBtn.style.animationPlayState = 'paused';
    }
}

// Open invitation flow
function openInvitation() {
    const cover = document.getElementById('cover');
    const mainWrap = document.getElementById('main-content');
    
    if (cover) {
        cover.classList.add('slide-up');
    }
    
    if (mainWrap) {
        mainWrap.classList.remove('hide');
    }
    
    // Play Background audio
    if (audioElem) {
        audioElem.play().catch(e => {
            console.log("Audio play deferred or blocked by browser policy:", e);
        });
    }
    
    // Activate particles floating around
    startFallingPetals();
}

// View Photo switching active image
function viewPhoto(url) {
    const featured = document.getElementById('featured-photo');
    if (featured) {
        featured.style.opacity = '0.4';
        setTimeout(() => {
            featured.src = url;
            featured.style.opacity = '1';
        }, 200);
    }
    
    // Highlight thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.getAttribute('src') === url) {
            thumb.classList.add('active');
        }
    });
}

// RSVP form submission simulation
function handleRSVPSubmit(event) {
    event.preventDefault();
    const guestName = document.getElementById('rsvp-name').value;
    const countVal = document.getElementById('rsvp-count').value;
    const rsvpStatus = document.querySelector('input[name="status-radio"]:checked').value;
    const msg = document.getElementById('rsvp-message').value;
    
    // Add logic to show visual response
    const alertBox = document.getElementById('rsvp-alert');
    if (alertBox) {
        alertBox.innerText = `Terima kasih ${guestName}! RSVP Anda (${rsvpStatus} - ${countVal} Orang) berhasil dikirim.`;
        alertBox.classList.remove('hide');
    }
    
    // Dynamically insert into Guestbook as a demo simulation
    const commentsList = document.getElementById('comments-list');
    if (commentsList) {
        const comment = document.createElement('div');
        comment.className = 'comment-item';
        
        let statusClass = 'badge-hadir';
        if (rsvpStatus === 'Ragu-ragu') statusClass = 'badge-ragu';
        else if (rsvpStatus === 'Tidak Hadir') statusClass = 'badge-tidakhadir';
        
        comment.innerHTML = `
            <p class="comment-author">${guestName} <span class="badge-status ${statusClass}">${rsvpStatus}</span></p>
            <p class="comment-text">${msg || 'Mengirim ucapan doa restu tulus.'}</p>
            <span class="comment-time">Baru saja</span>
        `;
        
        commentsList.insertBefore(comment, commentsList.firstChild);
    }
    
    // Reset inputs
    document.getElementById('rsvp-name').value = '';
    document.getElementById('rsvp-message').value = '';
}

// Initial triggers
document.addEventListener('DOMContentLoaded', () => {
    // Read and render guest query parameter in URL (e.g. ?to=Budi+Darmawan)
    const urlParams = new URLSearchParams(window.location.search);
    const guestQuery = urlParams.get('to');
    const guestNameLabel = document.getElementById('guest-name');
    if (guestQuery && guestNameLabel) {
        guestNameLabel.innerText = decodeURIComponent(guestQuery.replace(/\+/g, ' '));
    }
    
    // Set first thumbnail as active
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }
    
    // Start countdown timer updates
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
