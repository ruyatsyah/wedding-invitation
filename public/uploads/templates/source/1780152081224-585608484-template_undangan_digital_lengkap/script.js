// Countdown Logic (Modul: Acara)
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    const targetDateString = countdownElement.getAttribute('data-date');
    const targetDate = new Date(targetDateString).getTime();

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "<p style='grid-column: 1/-1;'>Acara Telah Berlangsung!</p>";
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

// Background Music Control (Modul: Musik)
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    if (music.paused) {
        music.play().catch(error => console.log("Autoplay dicegah oleh browser. Interaksi user diperlukan."));
        btn.innerText = "⏸️";
    } else {
        music.pause();
        btn.innerText = "🎵";
    }
}

// Trigger putar pertama kali otomatis saat user klik area mana saja di halaman (opsional/standard undangan digital)
document.addEventListener('click', function() {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        // Hanya trigger jika belum sengaja dipause manual
        // music.play().catch(() => {});
    }
}, { once: true });

// Modul: RSVP (Kirim Konfirmasi Data ke API)
function submitRSVP(event) {
    event.preventDefault();
    const idUndangan = document.getElementById('invitation-id').value;
    const name = document.getElementById('rsvp-name').value;
    const status = document.getElementById('rsvp-status').value;
    const count = document.getElementById('rsvp-count').value;

    alert(`Terima kasih ${name}! Konfirmasi "${status.toUpperCase()}" untuk ${count} orang berhasil disimpan. (Disambungkan ke Backend API oleh Developer)`);
    
    // Contoh implementasi fetch API untuk backend Anda nanti:
    /*
    fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invitation_id: idUndangan, nama: name, status: status, jumlah: count })
    }).then(res => res.json()).then(data => alert('Berhasil!'));
    */
}

// Modul: Buku Tamu & Ucapan (Kirim)
function submitComment(event) {
    event.preventDefault();
    const name = document.getElementById('comment-name').value;
    const text = document.getElementById('comment-text').value;

    // Render instan ke UI sebagai mockup sukses
    const area = document.getElementById('comments-display-area');
    const newComment = document.createElement('div');
    newComment.className = 'comment-item';
    newComment.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
    area.insertBefore(newComment, area.firstChild);

    // Reset Form
    document.getElementById('comment-text').value = '';
    alert('Ucapan Anda berhasil dikirim dan ditambahkan!');
}
