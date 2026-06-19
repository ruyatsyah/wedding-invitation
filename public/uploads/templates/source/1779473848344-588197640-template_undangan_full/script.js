document.addEventListener('DOMContentLoaded', function() {
    
    const btnBukaUndangan = document.getElementById('btn-buka-undangan');
    const weddingCover = document.getElementById('wedding-cover');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    btnBukaUndangan.addEventListener('click', function() {
        weddingCover.style.opacity = '0';
        weddingCover.style.visibility = 'hidden';
        mainContent.classList.remove('hidden');
        bgMusic.play().catch(error => {
            console.log("Autoplay ditolak");
        });
        checkScrollAnimations();
    });

    const targetDate = new Date('October 18, 2026 08:00:00').getTime();

    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerHTML = "<h4>Acara Telah Berlangsung!</h4>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    document.getElementById('btn-save-date').addEventListener('click', function() {
        alert("Tanggal pernikahan Bram & Anin (18 Oktober 2026) berhasil ditambahkan ke pengingat Anda!");
    });

    const wishTextarea = document.getElementById('wish-text');
    const charCountSpan = document.getElementById('char-count');

    wishTextarea.addEventListener('input', function() {
        const remaining = 300 - wishTextarea.value.length;
        charCountSpan.innerText = remaining;
    });

    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nama = document.getElementById('rsvp-nama').value;
        const konfirmasi = document.getElementById('rsvp-konfirmasi').value;
        
        let statusText = "menghadiri";
        if (konfirmasi === 'tidak') statusText = "tidak menghadiri";
        if (konfirmasi === 'ragu') statusText = "mungkin menghadiri";

        alert(`Terima kasih ${nama}, konfirmasi Anda bahwa Anda akan "${statusText}" acara kami telah berhasil dikirim!`);
        rsvpForm.reset();
    });

    const wishesForm = document.getElementById('wishes-form');
    const wishesWall = document.getElementById('wishes-wall');

    wishesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nama = document.getElementById('wish-nama').value;
        const ucapan = document.getElementById('wish-text').value;
        const initialLetter = nama.charAt(0).toUpperCase();

        const newWish = document.createElement('div');
        newWish.className = 'wish-item';
        newWish.innerHTML = `
            <div class="wish-avatar">${initialLetter}</div>
            <div class="wish-body">
                <h4>${nama}</h4>
                <p>${ucapan}</p>
                <span class="wish-time">Baru saja</span>
            </div>
        `;

        wishesWall.insertBefore(newWish, wishesWall.firstChild);
        wishesForm.reset();
        charCountSpan.innerText = 300;
        alert("Ucapan & doa restu Anda berhasil dikirim!");
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function checkScrollAnimations() {
        const triggerBottom = window.innerHeight * 0.85;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScrollAnimations);
});

function updateGallery(element) {
    document.getElementById('featured-photo').src = element.src.replace('?w=400', '?w=800');
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}
