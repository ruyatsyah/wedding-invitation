// 1. Fungsi Mengambil Parameter Nama Tamu dari URL
function getGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('to');
    if (guest) {
        document.getElementById('guest-name').innerText = guest;
    }
}

// Panggil saat dokumen dimuat
window.addEventListener('DOMContentLoaded', () => {
    getGuestName();
    initCountdown();
});

// 2. Fungsi Buka Undangan (Memicu musik dan membuka layer penutup)
function bukaUndangan() {
    // Sembunyikan Cover
    const cover = document.getElementById('cover-page');
    cover.classList.add('dismissed');
    
    // Tampilkan Konten Utama
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('section-hide');
    
    // Putar Musik Latar
    const audio = document.getElementById('bg-music');
    if(audio) {
        // Cek jika sistem sudah menyuntikkan src musik, jika kosong beri contoh default
        if(!audio.src || audio.src === window.location.href) {
            audio.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
        }
        audio.play().catch(error => console.log("Autoplay dicegah oleh browser:", error));
    }
    
    // Tampilkan Tombol Kontrol Musik
    const musicCtrl = document.getElementById('music-control');
    musicCtrl.classList.remove('hidden');
    musicCtrl.classList.add('playing');
    
    // Refresh Scroll Reveal untuk mendeteksi elemen hero pertama
    setTimeout(handleScrollReveal, 100);
}

// 3. Fungsi Toggle Main/Pause Musik Mandiri
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const musicCtrl = document.getElementById('music-control');
    
    if (audio.paused) {
        audio.play();
        musicCtrl.classList.add('playing');
    } else {
        audio.pause();
        musicCtrl.classList.remove('playing');
    }
}

// 4. Hitung Mundur Waktu Acara (Countdown Timer)
function initCountdown() {
    const timerElement = document.getElementById('countdown-timer');
    let targetISO = timerElement.getAttribute('data-countdown');
    
    // Jika masih berupa placeholder mentah dari sistem templating, pakai default tanggal masa depan
    if (targetISO.includes('{{') || !targetISO) {
        targetISO = "2026-12-25T08:00:00"; 
    }
    
    const targetDate = new Date(targetISO).getTime();
    
    if (isNaN(targetDate)) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(interval);
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
    }, 1000);
}

// 5. Animasi Bergerak Saat Scroll (Intersection Observer / Scroll Listener Fallback)
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 100; // Offset piksel pemicu
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleScrollReveal);

// Interaktivitas Galeri Foto (Ganti Foto Utama Saat Thumbnail Di-klik)
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const mainPhoto = document.getElementById('featured-photo');
        if(mainPhoto) {
            mainPhoto.src = this.src;
        }
    });
});
