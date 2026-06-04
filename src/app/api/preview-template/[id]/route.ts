import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import connectToDatabase from '@/lib/mongoose';
import Template from '@/models/Template';

type RouteContext = { params: Promise<{ id: string }> };

// ── Logo Map ─────────────────────────────────────────────────────────────────
const LOGO_MAP: Record<string, string> = {
  'bca': '/bank-logos/bca.png',
  'bni': '/bank-logos/bni.png',
  'bri': '/bank-logos/bri.png',
  'bsi': '/bank-logos/bsi.png',
  'cimb': '/bank-logos/cimb-niaga.png',
  'cimb niaga': '/bank-logos/cimb-niaga.png',
  'dana': '/bank-logos/dana.png',
  'gopay': '/bank-logos/gopay.png',
  'jenius': '/bank-logos/Jenius-logo.png',
  'link aja': '/bank-logos/link-aja.png',
  'linkaja': '/bank-logos/link-aja.png',
  'mandiri': '/bank-logos/mandiri.png',
  'ovo': '/bank-logos/ovo.png',
  'shopeepay': '/bank-logos/shoppepay.png',
  'shoppepay': '/bank-logos/shoppepay.png',
};

// ── Date Formatter ───────────────────────────────────────────────────────────
function formatDateID(dateStr: string) {
  const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const DAYS   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const dt = new Date(dateStr + 'T00:00:00');
  return {
    dayName:   DAYS[dt.getDay()],
    dayNum:    String(dt.getDate()),
    monthYear: `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`,
    full:      `${DAYS[dt.getDay()]}, ${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`,
  };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const template = await Template.findById(id).lean() as any;
    if (!template || !template.sourceCodeUrl) {
      return new NextResponse('Template tidak ditemukan atau file belum di-upload.', { status: 404 });
    }

    const sourceCodeUrl: string = template.sourceCodeUrl;
    if (sourceCodeUrl.endsWith('.zip')) {
      return new NextResponse('Format template belum diekstrak (masih ZIP).', { status: 400 });
    }

    const htmlPath = join(process.cwd(), 'public', sourceCodeUrl);
    if (!existsSync(htmlPath)) {
      return new NextResponse('File HTML template tidak ditemukan di server.', { status: 404 });
    }

    let html = await readFile(htmlPath, 'utf-8');

    const origin = req.nextUrl.origin;
    const templateDir = sourceCodeUrl.substring(0, sourceCodeUrl.lastIndexOf('/'));
    const baseUrl = `${origin}${templateDir}/`;

    // ── Dummy Data ───────────────────────────────────────────────────────────
    const GROOM_PHOTO = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80';
    const BRIDE_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
    const EVENT_DATE  = '2027-12-31';
    const EVENT_TIME  = '09:00';
    const EVENT_TZ    = 'WIB';
    const VENUE       = 'Verona Grand Ballroom, Jakarta Selatan';
    const GROOM_NAME  = 'Romeo Montague';
    const BRIDE_NAME  = 'Juliet Capulet';
    const COUPLE_NAME = 'Romeo & Juliet';

    const galleries = [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    ];

    const digitalEnvelopes = [
      { bankName: 'BCA', bankAccount: '1234567890', bankHolder: GROOM_NAME },
      { bankName: 'GoPay', bankAccount: '081234567890', bankHolder: BRIDE_NAME },
    ];

    const loveStories = [
      { date: '14 Februari 2020', title: 'Pertemuan Pertama', story: 'Kami bertemu pertama kali di sebuah kedai kopi kecil di sudut kota saat hujan turun deras.' },
      { date: '31 Desember 2022', title: 'Lamaran', story: 'Di bawah kembang api pergantian tahun, ia berlutut dan menanyakan satu pertanyaan yang mengubah segalanya.' },
      { date: '31 Desember 2027', title: 'Hari Bahagia', story: 'Hari yang selalu kami impikan akhirnya tiba. Kami memulai babak baru bersama, untuk selamanya.' },
    ];

    const fmt = formatDateID(EVENT_DATE);
    const groomFirst  = GROOM_NAME.split(' ')[0];
    const brideFirst  = BRIDE_NAME.split(' ')[0];
    const coupleShort = `${groomFirst} & ${brideFirst}`;
    const eventTimeFmt = `${EVENT_TIME} ${EVENT_TZ} - Selesai`;
    const ytEmbed = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

    // ── STEP 1: Replace all {{PLACEHOLDER}} BEFORE injecting <base> tag ──────
    // This is critical — <base> must only be injected after all {{...}} are gone,
    // otherwise the browser resolves them as relative paths causing 404s.
    const flatData: Record<string, string> = {
      COUPLE_NAME:     COUPLE_NAME,
      GROOM_NAME:      GROOM_NAME,
      GROOM_PARENTS:   'Putra dari Bapak Montague & Ibu Montague',
      GROOM_INSTAGRAM: '@romeo.montague',
      GROOM_PHOTO:     GROOM_PHOTO,
      BRIDE_NAME:      BRIDE_NAME,
      BRIDE_PARENTS:   'Putri dari Bapak Capulet & Ibu Capulet',
      BRIDE_INSTAGRAM: '@juliet.cap',
      BRIDE_PHOTO:     BRIDE_PHOTO,
      EVENT_DATE:      fmt.full,
      EVENT_TIME:      eventTimeFmt,
      EVENT_TIMEZONE:  EVENT_TZ,
      VENUE:           VENUE,
      MAPS_URL:        'https://maps.google.com/?q=Verona+Grand+Ballroom+Jakarta',
      YOUTUBE_URL:     'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      BANK_NAME:       'BCA',
      BANK_ACCOUNT:    '1234567890',
      BANK_HOLDER:     GROOM_NAME,
      CUSTOM_URL:      'preview-demo',
      PROJECT_ID:      'preview',
      GALLERY_1:       galleries[0],
      GALLERY_2:       galleries[1],
      GALLERY_3:       galleries[2],
      GALLERY_4:       galleries[3],
      GALLERY_5:       galleries[4],
      BG_MUSIC:        '',
      QUOTE_TEXT:      '"Mencintai bukanlah mencari seseorang yang sempurna, melainkan melihat seseorang yang tidak sempurna dengan cara yang sempurna."',
      QUOTE_SOURCE:    '— Sam Keen',
      IG_STORY_URL:    'https://instagram.com/',
    };

    // Replace all string placeholders
    for (const [key, val] of Object.entries(flatData)) {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      html = html.replace(regex, val);
    }

    // ── STEP 2: CSS-class & attribute based replacements ─────────────────────
    // Title
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>Demo Preview – ${coupleShort}</title>`);

    // Couple names
    html = html.replace(/(<h1[^>]*class="[^"]*couple-name-cover[^"]*"[^>]*>)[^<]*/i, `$1${coupleShort}`);
    html = html.replace(/(<h2[^>]*class="[^"]*couple-title[^"]*"[^>]*>)[^<]*/i, `$1${coupleShort}`);

    // Date-formatted spans
    html = html.replace(/<span[^>]*class="day-name"[^>]*>[^<]*<\/span>/gi, `<span class="day-name">${fmt.dayName}</span>`);
    html = html.replace(/<span[^>]*class="day-num"[^>]*>[^<]*<\/span>/gi, `<span class="day-num">${fmt.dayNum}</span>`);
    html = html.replace(/<span[^>]*class="month-year"[^>]*>[^<]*<\/span>/gi, `<span class="month-year">${fmt.monthYear}</span>`);

    // Event time / date text
    html = html.replace(/<p[^>]*class="event-time"[^>]*>[^<]*<\/p>/gi, `<p class="event-time">${eventTimeFmt}</p>`);

    // Venue
    html = html.replace(/<p[^>]*class="venue-name"[^>]*><strong>[^<]*<\/strong><\/p>/gi,
      `<p class="venue-name"><strong>${VENUE}</strong></p>`);
    html = html.replace(/<p[^>]*class="venue-address"[^>]*>[^<]*<\/p>/gi,
      `<p class="venue-address">${VENUE}</p>`);

    // Mempelai photos by alt attribute
    html = html.replace(/<img([^>]*alt="Mempelai Pria"[^>]*)>/gi,
      (m) => m.replace(/src="[^"]*"/, `src="${GROOM_PHOTO}"`));
    html = html.replace(/<img([^>]*alt="Mempelai Wanita"[^>]*)>/gi,
      (m) => m.replace(/src="[^"]*"/, `src="${BRIDE_PHOTO}"`));
    
    // Mempelai photos by class
    let groomImgDone = false;
    html = html.replace(/<img([^>]*class="[^"]*mempelai-img[^"]*"[^>]*)>/gi, (m) => {
      if (!groomImgDone) { groomImgDone = true; return m.replace(/src="[^"]*"/, `src="${GROOM_PHOTO}"`); }
      return m.replace(/src="[^"]*"/, `src="${BRIDE_PHOTO}"`);
    });

    // Gallery images
    html = html.replace(/(<img[^>]*id="featured-photo"[^>]*src=")[^"]*(")/, `$1${galleries[0]}$2`);
    let thumbIdx = 0;
    html = html.replace(/<img[^>]*class="[^"]*thumbnail[^"]*"[^>]*>/g, (m) => {
      const replaced = m.replace(/src="[^"]*"/, `src="${galleries[thumbIdx] || ''}"`);
      thumbIdx++;
      return replaced;
    });

    // YouTube embed
    html = html.replace(/(<iframe[^>]*src=")[^"]*("[^>]*>)/gi, `$1${ytEmbed}$2`);

    // ── STEP 3: Server-side render ARRAYS ────────────────────────────────────
    // Love Stories
    const lsHtml = loveStories.map(s =>
      `<div class="love-story-item">
        <h4 class="story-title">${s.title}</h4>
        <span class="story-date">${s.date}</span>
        <p class="story-text">${s.story}</p>
      </div>`
    ).join('');
    html = html.replace(
      /(<div[^>]*id="love-stories-container"[^>]*>)([\s\S]*?)(<\/div>)/i,
      `$1${lsHtml}$3`
    );

    // Digital Envelopes
    const envHtml = digitalEnvelopes.map(env => {
      const bKey = env.bankName.toLowerCase().trim();
      const logo = LOGO_MAP[bKey];
      const header = logo
        ? `<img src="${logo}" alt="${env.bankName}" style="height:32px;object-fit:contain;margin-bottom:12px;display:block;">`
        : `<h4 style="margin-bottom:12px;">${env.bankName}</h4>`;
      return `<div class="envelope-item">${header}<p class="envelope-account">${env.bankAccount}</p><p class="envelope-holder">a.n. ${env.bankHolder}</p></div>`;
    }).join('');
    html = html.replace(
      /(<div[^>]*id="digital-envelopes-container"[^>]*>)([\s\S]*?)(<\/div>)/i,
      `$1${envHtml}$3`
    );

    // ── STEP 4: Aggressive cleanup — remove ALL remaining {{...}} ────────────
    // Any placeholder not matched above is blanked out so nothing raw is shown
    html = html.replace(/\{\{[^}]*\}\}/g, '');

    // ── STEP 5: NOW inject <base> tag — AFTER all replacements are done ──────
    if (!html.includes('<base ')) {
      html = html.replace(/<head([^>]*)>/i, `<head$1>\n  <base href="${baseUrl}">`);
    }

    // ── STEP 6: JS script for data-bg hero + edge-case fallbacks ─────────────
    const dataScript = `
<script>
  window.__INVITATION_DATA__ = ${JSON.stringify({
    ...flatData,
    DIGITAL_ENVELOPES: digitalEnvelopes,
    LOVE_STORIES: loveStories,
    ENABLE_RSVP: true,
    ENABLE_GUESTBOOK: true,
  })};

  document.addEventListener('DOMContentLoaded', function() {
    var d = window.__INVITATION_DATA__;

    // Apply hero background image from data-bg attribute
    document.querySelectorAll('[data-bg]').forEach(function(el) {
      var bgUrl = el.getAttribute('data-bg');
      if (bgUrl) {
        el.style.backgroundImage = 'linear-gradient(rgba(253,251,247,0.8),rgba(253,251,247,0.8)), url("' + bgUrl + '")';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    });

    // Fallback: couple names if somehow still empty
    document.querySelectorAll('.couple-name-cover, .couple-title').forEach(function(el) {
      if (!el.textContent.trim()) el.textContent = d.COUPLE_NAME;
    });
    document.querySelectorAll('footer h3, .wedding-footer h3').forEach(function(el) {
      if (!el.textContent.trim()) el.textContent = d.COUPLE_NAME;
    });

    // Fallback: groom card
    var groomCard = document.querySelectorAll('.mempelai-card')[0];
    if (groomCard) {
      var h = groomCard.querySelector('h3');
      if (h && !h.textContent.trim()) h.textContent = d.GROOM_NAME;
      var img = groomCard.querySelector('.mempelai-img, img');
      if (img && (!img.src || img.src.endsWith('/'))) img.src = d.GROOM_PHOTO;
    }

    // Fallback: bride card
    var brideCard = document.querySelectorAll('.mempelai-card')[1];
    if (brideCard) {
      var h2 = brideCard.querySelector('h3');
      if (h2 && !h2.textContent.trim()) h2.textContent = d.BRIDE_NAME;
      var img2 = brideCard.querySelector('.mempelai-img, img');
      if (img2 && (!img2.src || img2.src.endsWith('/'))) img2.src = d.BRIDE_PHOTO;
    }

    // Block form submit in demo mode
    document.querySelectorAll('form').forEach(function(f) {
      f.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Ini adalah mode DEMO. Form tidak dapat dikirim. Beli template ini untuk menggunakan fitur RSVP asli.');
      });
    });
  });
</script>`;

    html = html.replace(/<\/head>/i, `${dataScript}\n</head>`);

    // ── STEP 7: Preview Banner ────────────────────────────────────────────────
    const banner = `<div style="position:fixed;top:0;left:0;right:0;background:#ec4899;color:#fff;text-align:center;font-size:11px;font-weight:700;font-family:sans-serif;padding:8px 16px;z-index:2147483647;letter-spacing:0.5px;box-shadow:0 2px 10px rgba(236,72,153,0.4);">
  🔍 MODE DEMO — Semua data adalah contoh (dummy). Beli tema ini untuk menggunakan data undangan Anda sendiri.
</div>
<div style="height:36px;"></div>`;
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${banner}`);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });

  } catch (error: any) {
    console.error('[preview-template API]', error);
    return new NextResponse('Server error: ' + error.message, { status: 500 });
  }
}
