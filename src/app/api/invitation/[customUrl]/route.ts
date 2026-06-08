import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';

type RouteContext = { params: Promise<{ customUrl: string }> };

/**
 * Serves the uploaded HTML template with client data injected.
 * The original template file is never modified.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { customUrl } = await params;

    await connectToDatabase();
    const project = await Project.findOne({ customUrl }).populate('themeId').lean() as any;

    if (!project) {
      return new NextResponse('Undangan tidak ditemukan.', { status: 404 });
    }

    const sourceCodeUrl: string = project.themeId?.sourceCodeUrl || '';

    if (!sourceCodeUrl || sourceCodeUrl.endsWith('.zip')) {
      return new NextResponse('Template tidak valid atau belum dikonfigurasi.', { status: 400 });
    }

    const htmlPath = join(process.cwd(), 'public', sourceCodeUrl);

    if (!existsSync(htmlPath)) {
      return new NextResponse('File template tidak ditemukan.', { status: 404 });
    }

    let html = await readFile(htmlPath, 'utf-8');

    // ── Base URL fix: make relative paths absolute ────────────────────────────
    // Get the directory of the HTML file relative to /public
    const templateDir = sourceCodeUrl.substring(0, sourceCodeUrl.lastIndexOf('/'));
    const baseUrl = `${req.nextUrl.origin}${templateDir}/`;

    // Inject <base> tag so relative assets (CSS, JS, images) resolve correctly
    if (!html.includes('<base ')) {
      html = html.replace(/<head([^>]*)>/i, `<head$1>\n  <base href="${baseUrl}">`);
    }

    // ── Data injection ────────────────────────────────────────────────────────
    const origin = req.nextUrl.origin;

    // Helper: parse "Putra dari Bapak X & Ibu Y" → { ayah, ibu }
    const parseParents = (raw: string) => {
      const match = raw.match(/Bapak\s+(.+?)\s*[&dan]+\s*Ibu\s+(.+)/i);
      return { ayah: match?.[1]?.trim() || raw, ibu: match?.[2]?.trim() || '' };
    };
    const groomP = parseParents(project.groomParents || '');
    const brideP = parseParents(project.brideParents || '');

    // Helper: Instagram username (strip @ and URL)
    const igUsername = (ig: string) =>
      ig.replace(/https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/$/, '');
    const groomIgUser = igUsername(project.groomInstagram || '');
    const brideIgUser = igUsername(project.brideInstagram || '');
    const groomIgUrl  = groomIgUser ? `https://instagram.com/${groomIgUser}` : '#';
    const brideIgUrl  = brideIgUser ? `https://instagram.com/${brideIgUser}` : '#';

    // Helper: format date (date string YYYY-MM-DD)
    const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const DAYS_ID   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    const fmtDate = (dateStr: string) => {
      if (!dateStr) return '';
      const dt = new Date(dateStr + 'T00:00:00');
      return `${DAYS_ID[dt.getDay()]}, ${dt.getDate()} ${MONTHS_ID[dt.getMonth()]} ${dt.getFullYear()}`;
    };
    const eventDateFormatted = fmtDate(project.eventDate || '');
    const eventTimeFull = project.eventTime
      ? `${project.eventTime} ${(project.eventTimezone || 'WIB').split(' ')[0]} - Selesai`
      : '';
    const countdownISO = project.eventDate
      ? `${project.eventDate}T${project.eventTime || '08:00'}:00`
      : '';

    // Helper: gallery full URLs
    const galleryUrls = (project.gallery || []).map((g: string) => g ? `${origin}${g}` : '');

    // Helper: Logo map for bank/ewallet
    const LOGO_MAP: Record<string, string> = {
      'bca': '/bank-logos/bca.png', 'bni': '/bank-logos/bni.png',
      'bri': '/bank-logos/bri.png', 'bsi': '/bank-logos/bsi.png',
      'mandiri': '/bank-logos/mandiri.png', 'dana': '/bank-logos/dana.png',
      'gopay': '/bank-logos/gopay.png', 'ovo': '/bank-logos/ovo.png',
      'shopeepay': '/bank-logos/shoppepay.png', 'shoppepay': '/bank-logos/shoppepay.png',
      'jenius': '/bank-logos/Jenius-logo.png', 'link aja': '/bank-logos/link-aja.png',
      'linkaja': '/bank-logos/link-aja.png', 'cimb': '/bank-logos/cimb-niaga.png',
      'cimb niaga': '/bank-logos/cimb-niaga.png',
    };

    // ── Render HTML for array fields ─────────────────────────────────────────
    // Love stories HTML
    const loveStoriesHtml = (project.loveStories || []).map((s: any) =>
      `<div class="love-story-item story-item">
        <div class="story-dot"></div>
        <div class="story-content">
          <span class="story-date">${s.date || ''}</span>
          <h4 class="story-title">${s.title || ''}</h4>
          <p class="story-text">${s.story || ''}</p>
        </div>
      </div>`
    ).join('') || '<p style="opacity:.5;text-align:center">Belum ada kisah cinta.</p>';

    // Gallery HTML
    const galleryHtml = galleryUrls.filter(Boolean).map((url: string, i: number) =>
      `<div class="gallery-item"><img src="${url}" alt="Foto ${i + 1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:8px;"></div>`
    ).join('') || '';

    // Digital envelopes HTML
    const envelopesHtml = (project.digitalEnvelopes || []).map((env: any) => {
      const key = (env.bankName || '').toLowerCase().trim();
      const logo = LOGO_MAP[key];
      const header = logo
        ? `<img src="${logo}" alt="${env.bankName}" style="height:32px;object-fit:contain;display:block;margin-bottom:10px;">`
        : `<strong>${env.bankName}</strong>`;
      return `<div class="gift-card envelope-item">
        ${header}
        <p class="envelope-account" style="font-size:1.2rem;font-family:monospace;letter-spacing:2px;margin:8px 0;">${env.bankAccount}</p>
        <p class="envelope-holder" style="font-size:.85rem;opacity:.7;">a.n. ${env.bankHolder}</p>
      </div>`;
    }).join('') || '<p style="opacity:.5;text-align:center">Belum ada rekening.</p>';

    // Planner timeline HTML
    const plannerHtml = (project.plannerTasks || []).map((t: any) =>
      `<li class="${t.isCompleted ? 'done' : ''}"><span class="timeline-time">${t.category || ''}</span><span class="timeline-event">${t.title || ''}</span></li>`
    ).join('') || '<li><span class="timeline-event">Belum ada susunan acara.</span></li>';

    // Music URL (absolute)
    const bgMusicUrl = (project.bgMusic && project.bgMusic !== '')
      ? `${origin}${project.bgMusic}` : '';

    const data = {
      // ── Standard placeholders (English) ─────────────────────────────────────
      COUPLE_NAME:      project.coupleName || '',
      GROOM_NAME:       project.groomFullName || '',
      GROOM_PARENTS:    project.groomParents || '',
      GROOM_INSTAGRAM:  project.groomInstagram || '',
      GROOM_PHOTO:      project.groomPhoto ? `${origin}${project.groomPhoto}` : '',
      BRIDE_NAME:       project.brideFullName || '',
      BRIDE_PARENTS:    project.brideParents || '',
      BRIDE_INSTAGRAM:  project.brideInstagram || '',
      BRIDE_PHOTO:      project.bridePhoto ? `${origin}${project.bridePhoto}` : '',
      EVENT_DATE:       project.eventDate || '',
      EVENT_TIME:       project.eventTime || '',
      EVENT_TIMEZONE:   project.eventTimezone || 'WIB',
      VENUE:            project.venue || '',
      MAPS_URL:         project.mapsUrl || '',
      YOUTUBE_URL:      project.youtubeUrl || '',
      BANK_NAME:        project.bankName || '',
      BANK_ACCOUNT:     project.bankAccount || '',
      BANK_HOLDER:      project.bankHolder || '',
      DIGITAL_ENVELOPES: project.digitalEnvelopes || [],
      CUSTOM_URL:       project.customUrl || '',
      PROJECT_ID:       project._id?.toString() || '',
      GALLERY_1:        galleryUrls[0] || '',
      GALLERY_2:        galleryUrls[1] || '',
      GALLERY_3:        galleryUrls[2] || '',
      GALLERY_4:        galleryUrls[3] || '',
      GALLERY_5:        galleryUrls[4] || '',
      BG_MUSIC:         bgMusicUrl,
      QUOTE_TEXT:       project.quoteText || '',
      QUOTE_SOURCE:     project.quoteSource || '',
      IG_STORY_URL:     project.igStoryUrl || '',
      LOVE_STORIES:     project.loveStories || [],
      ENABLE_RSVP:      project.enableRsvp ?? true,
      ENABLE_GUESTBOOK: project.enableGuestbook ?? true,
      GUESTS:           project.guests || [],
      PLANNER_TASKS:    project.plannerTasks || [],
      STATUS:           project.status || 'active',
      PLAN:             project.plan || 'bronze',

      // ── Indonesian placeholder aliases ────────────────────────────────────────
      // Musik
      MUSIK_URL:                      bgMusicUrl,
      // Pengantin Pria
      PENGANTIN_PRIA_NAMA_LENGKAP:    project.groomFullName || '',
      PENGANTIN_PRIA_PANGGILAN:       (project.groomFullName || '').split(' ')[0] || '',
      PENGANTIN_PRIA_FOTO:            project.groomPhoto ? `${origin}${project.groomPhoto}` : '',
      PENGANTIN_PRIA_AYAH:            groomP.ayah,
      PENGANTIN_PRIA_IBU:             groomP.ibu,
      PENGANTIN_PRIA_IG:              groomIgUrl,
      PENGANTIN_PRIA_IG_USERNAME:     groomIgUser,
      PENGANTIN_PRIA_ORANG_TUA:       project.groomParents || '',
      // Pengantin Wanita
      PENGANTIN_WANITA_NAMA_LENGKAP:  project.brideFullName || '',
      PENGANTIN_WANITA_PANGGILAN:     (project.brideFullName || '').split(' ')[0] || '',
      PENGANTIN_WANITA_FOTO:          project.bridePhoto ? `${origin}${project.bridePhoto}` : '',
      PENGANTIN_WANITA_AYAH:          brideP.ayah,
      PENGANTIN_WANITA_IBU:           brideP.ibu,
      PENGANTIN_WANITA_IG:            brideIgUrl,
      PENGANTIN_WANITA_IG_USERNAME:   brideIgUser,
      PENGANTIN_WANITA_ORANG_TUA:     project.brideParents || '',
      // Nama Pasangan
      NAMA_PASANGAN:                  project.coupleName || '',
      NAMA_PENGANTIN:                 project.coupleName || '',
      // Acara
      ACARA_TANGGAL:                  eventDateFormatted,
      ACARA_WAKTU:                    eventTimeFull,
      ACARA_LOKASI:                   project.venue || '',
      ACARA_ALAMAT:                   project.venue || '',
      ACARA_MAPS_LINK:                project.mapsUrl || '',
      ACARA_COUNTDOWN_ISO:            countdownISO,
      // Akad
      ACARA_AKAD_TANGGAL:             eventDateFormatted,
      ACARA_AKAD_WAKTU:               project.eventTime ? `${project.eventTime} ${(project.eventTimezone || 'WIB').split(' ')[0]}` : '',
      ACARA_AKAD_LOKASI:              project.venue || '',
      ACARA_AKAD_ALAMAT_LENGKAP:      project.venue || '',
      ACARA_AKAD_MAPS_LINK:           project.mapsUrl || '',
      // Resepsi (same data — single venue model)
      ACARA_RESEPSI_TANGGAL:          eventDateFormatted,
      ACARA_RESEPSI_WAKTU:            project.eventTime ? `${project.eventTime} ${(project.eventTimezone || 'WIB').split(' ')[0]}` : '',
      ACARA_RESEPSI_LOKASI:           project.venue || '',
      ACARA_RESEPSI_ALAMAT_LENGKAP:   project.venue || '',
      ACARA_RESEPSI_MAPS_LINK:        project.mapsUrl || '',
      // Quote
      QUOTE_TEKS:                     project.quoteText || '',
      QUOTE_SUMBER:                   project.quoteSource || '',
      KUTIPAN:                        project.quoteText || '',
      KUTIPAN_SUMBER:                 project.quoteSource || '',
      // Streaming
      STREAMING_URL:                  project.youtubeUrl || '',
      STREAMING_LINK:                 project.youtubeUrl || '',
      YOUTUBE_EMBED:                  (() => {
        const m = (project.youtubeUrl || '').match(/(?:v=|youtu\.be\/)([^&?/]+)/);
        return m ? `https://www.youtube.com/embed/${m[1]}` : '';
      })(),
      // Galeri
      FOTO_1:                         galleryUrls[0] || '',
      FOTO_2:                         galleryUrls[1] || '',
      FOTO_3:                         galleryUrls[2] || '',
      FOTO_4:                         galleryUrls[3] || '',
      FOTO_5:                         galleryUrls[4] || '',
      // IG Story
      STORY_IG_URL:                   project.igStoryUrl || '',
      IG_STORY_LINK:                  project.igStoryUrl || '',
      // Project & System
      INVITATION_ID:                  project._id?.toString() || '',
      PROJECT_CUSTOM_URL:             project.customUrl || '',
      SISTEM_BRANDING_FOOTER:         'Wedding Invitation System',
      TEMA_WARNA:                     'elegant',
      // HTML-generating placeholders (rendered server-side as HTML)
      KISAH_CINTA_HTML_SNIPPET:       loveStoriesHtml,
      GALERI_FOTO_ITEMS_HTML:         galleryHtml,
      KADO_REKENING_ITEMS_HTML:       envelopesHtml,
      AMPLOP_DIGITAL_HTML:            envelopesHtml,
      PLANNER_TIMELINE_ITEMS:         plannerHtml,
      BUKU_TAMU_UCAPAN_LIST_HTML:     '',  // rendered dynamically via RSVP API
    };

    // ── Replace {{PLACEHOLDER}} patterns ─────────────────────────────────────
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
        html = html.replace(regex, value);
      }
    }


    // ── Server-side direct HTML replacement ───────────────────────────────────
    // Build couple short name
    const groomFirst = data.GROOM_NAME.split(' ')[0];
    const brideFirst = data.BRIDE_NAME.split(' ')[0];
    const coupleShort = groomFirst && brideFirst
      ? `${groomFirst} & ${brideFirst}`
      : data.COUPLE_NAME;

    // Format date server-side
    const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const dayNames = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
    let dayName = '', dayNum = '', monthYear = '';
    if (data.EVENT_DATE) {
      const dt = new Date(data.EVENT_DATE + 'T00:00:00');
      dayName = dayNames[dt.getDay()];
      dayNum = dt.getDate().toString();
      monthYear = months[dt.getMonth()] + ' ' + dt.getFullYear();
    }
    const eventTimeStr = data.EVENT_TIME
      ? `${data.EVENT_TIME} ${data.EVENT_TIMEZONE.split(' ')[0]} - Selesai`
      : '';

    // YouTube embed ID
    let ytEmbed = '';
    if (data.YOUTUBE_URL) {
      const ytMatch = data.YOUTUBE_URL.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
      if (ytMatch) ytEmbed = `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Replace title
    if (coupleShort) {
      html = html.replace(
        /<title>[^<]*<\/title>/i,
        `<title>Undangan Pernikahan - ${coupleShort}</title>`
      );
    }

    // Replace couple name in cover & hero (exact text match)
    if (coupleShort) {
      // h1.couple-name-cover
      html = html.replace(
        /(<h1[^>]*class="[^"]*couple-name-cover[^"]*"[^>]*>)[^<]*/i,
        `$1${coupleShort}`
      );
      // h2.couple-title
      html = html.replace(
        /(<h2[^>]*class="[^"]*couple-title[^"]*"[^>]*>)[^<]*/i,
        `$1${coupleShort}`
      );
      // footer h3
      html = html.replace(
        /(<footer[^>]*>[\s\S]*?<h3>)[^<]*/i,
        `$1${coupleShort}`
      );
    }

    // Replace groom name (first h3 in first .mempelai-card)
    if (data.GROOM_NAME) {
      html = html.replace(
        /(class="mempelai-card[^"]*"[\s\S]*?<h3>)[^<]*/,
        `$1${data.GROOM_NAME}`
      );
    }

    // Replace bride name (second h3 in second .mempelai-card)
    if (data.BRIDE_NAME) {
      // Find second mempelai-card
      let count = 0;
      html = html.replace(/(<h3>)(Anindya[^<]*|[^<]*S\.E\.[^<]*)/g, (match, tag) => {
        count++;
        return count === 1 && data.BRIDE_NAME ? `${tag}${data.BRIDE_NAME}` : match;
      });
    }

    // Replace groom parents
    if (data.GROOM_PARENTS) {
      html = html.replace(
        /(<p class="parent-info">[\s\S]*?Putra[^<]*dari[\s\S]*?<\/p>)/i,
        `<p class="parent-info">${data.GROOM_PARENTS}</p>`
      );
    }

    // Replace bride parents
    if (data.BRIDE_PARENTS) {
      html = html.replace(
        /(<p class="parent-info">[\s\S]*?Putri[^<]*dari[\s\S]*?<\/p>)/i,
        `<p class="parent-info">${data.BRIDE_PARENTS}</p>`
      );
    }

    // Replace groom photo — match img with alt="Mempelai Pria" regardless of attribute order
    if (data.GROOM_PHOTO) {
      html = html.replace(
        /<img([^>]*alt="Mempelai Pria"[^>]*)>/gi,
        (match) => match.replace(/src="[^"]*"/, `src="${data.GROOM_PHOTO}"`)
      );
      // Also target first .mempelai-img
      let groomImgReplaced = false;
      html = html.replace(/<img([^>]*class="[^"]*mempelai-img[^"]*"[^>]*)>/gi, (match) => {
        if (!groomImgReplaced) {
          groomImgReplaced = true;
          return match.replace(/src="[^"]*"/, `src="${data.GROOM_PHOTO}"`);
        }
        return match;
      });
    }

    // Replace bride photo — match img with alt="Mempelai Wanita" regardless of attribute order
    if (data.BRIDE_PHOTO) {
      html = html.replace(
        /<img([^>]*alt="Mempelai Wanita"[^>]*)>/gi,
        (match) => match.replace(/src="[^"]*"/, `src="${data.BRIDE_PHOTO}"`)
      );
      // Also target second .mempelai-img
      let brideImgCount = 0;
      html = html.replace(/<img([^>]*class="[^"]*mempelai-img[^"]*"[^>]*)>/gi, (match) => {
        brideImgCount++;
        if (brideImgCount === 2) {
          return match.replace(/src="[^"]*"/, `src="${data.BRIDE_PHOTO}"`);
        }
        return match;
      });
    }

    // Replace all .day-name spans
    if (dayName) {
      html = html.replace(/<span class="day-name">[^<]*<\/span>/g, `<span class="day-name">${dayName}</span>`);
    }
    // Replace all .day-num spans
    if (dayNum) {
      html = html.replace(/<span class="day-num">[^<]*<\/span>/g, `<span class="day-num">${dayNum}</span>`);
    }
    // Replace all .month-year spans
    if (monthYear) {
      html = html.replace(/<span class="month-year">[^<]*<\/span>/g, `<span class="month-year">${monthYear}</span>`);
    }
    // Replace event-time
    if (eventTimeStr) {
      html = html.replace(/<p class="event-time">[^<]*<\/p>/g, `<p class="event-time">${eventTimeStr}</p>`);
    }

    // Replace venue-name and venue-address
    if (data.VENUE) {
      html = html.replace(/<p class="venue-name"><strong>[^<]*<\/strong><\/p>/g,
        `<p class="venue-name"><strong>${data.VENUE}</strong></p>`);
      html = html.replace(/<p class="venue-address">[^<]*<\/p>/g,
        `<p class="venue-address">${data.VENUE}</p>`);
    }

    // Replace YouTube embed
    if (ytEmbed) {
      html = html.replace(
        /(<iframe[^>]*src=")[^"]*youtube[^"]*("[^>]*>)/gi,
        `$1${ytEmbed}$2`
      );
    }

    // Replace gallery images
    const galleryImgs = [data.GALLERY_1, data.GALLERY_2, data.GALLERY_3, data.GALLERY_4, data.GALLERY_5].filter(Boolean);
    if (galleryImgs.length > 0) {
      // Replace featured photo
      html = html.replace(
        /(<img[^>]*id="featured-photo"[^>]*src=")[^"]*(")/i,
        `$1${galleryImgs[0]}$2`
      );
      // Replace thumbnails
      let thumbIdx = 0;
      html = html.replace(/<img class="thumbnail[^"]*"[^>]*src="[^"]*"/g, (match) => {
        if (thumbIdx < galleryImgs.length) {
          const replaced = match.replace(/src="[^"]*"/, `src="${galleryImgs[thumbIdx]}"`);
          thumbIdx++;
          return replaced;
        }
        return match;
      });
    }

    // ── Background Music ──────────────────────────────────────────────────────
    if (data.BG_MUSIC) {
      // Match the opening audio tag with id="bg-music", capture everything up to (not including) the >
      html = html.replace(
        /<audio(\b[^>]*\bid="bg-music"[^>]*)>/gi,
        (_match, attrs) => {
          const newAttrs = /\bsrc=/.test(attrs)
            ? attrs.replace(/\bsrc="[^"]*"/, `src="${data.BG_MUSIC}"`)
            : attrs + ` src="${data.BG_MUSIC}"`;
          return `<audio${newAttrs}>`;
        }
      );
      // If no audio element with id="bg-music" exists, inject one before </body>
      if (!/<audio[^>]*id="bg-music"/i.test(html)) {
        html = html.replace(
          /<\/body>/i,
          `<audio id="bg-music" loop src="${data.BG_MUSIC}" style="display:none"></audio>\n</body>`
        );
      }
    } else {
      // Client chose "no music" — set src to empty so template script can't play it
      html = html.replace(
        /<audio(\b[^>]*\bid="bg-music"[^>]*)>/gi,
        (_match, attrs) => {
          const newAttrs = /\bsrc=/.test(attrs)
            ? attrs.replace(/\bsrc="[^"]*"/, 'src=""')
            : attrs;
          return `<audio${newAttrs}>`;
        }
      );
    }

    // Also inject a global JS object so templates can access data via JS
    const dataScript = `
<script>
  window.__INVITATION_DATA__ = ${JSON.stringify(data)};

  (function() {
    var d = window.__INVITATION_DATA__;

    // Helper: set text of all matching selectors
    function setText(sel, val) {
      if (!val) return;
      document.querySelectorAll(sel).forEach(function(el) { el.textContent = val; });
    }
    function setHTML(sel, val) {
      if (!val) return;
      document.querySelectorAll(sel).forEach(function(el) { el.innerHTML = val; });
    }
    function setAttr(sel, attr, val) {
      if (!val) return;
      document.querySelectorAll(sel).forEach(function(el) { el.setAttribute(attr, val); });
    }
    function setSrc(sel, val) {
      if (!val) return;
      document.querySelectorAll(sel).forEach(function(el) { el.src = val; });
    }

    // Format date from YYYY-MM-DD
    function formatDate(dateStr) {
      if (!dateStr) return null;
      var months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
      var days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
      var dt = new Date(dateStr + 'T00:00:00');
      return {
        dayName: days[dt.getDay()],
        dayNum: dt.getDate().toString(),
        monthYear: months[dt.getMonth()] + ' ' + dt.getFullYear(),
        full: days[dt.getDay()] + ', ' + dt.getDate() + ' ' + months[dt.getMonth()] + ' ' + dt.getFullYear()
      };
    }

    function run() {
      var coupleName = (d.GROOM_NAME && d.BRIDE_NAME)
        ? d.GROOM_NAME.split(' ')[0] + ' & ' + d.BRIDE_NAME.split(' ')[0]
        : d.COUPLE_NAME;

      // ── Couple name (cover + hero + footer) ──────────────────────────────
      setText('.couple-name-cover', coupleName);
      setText('.couple-title', coupleName);
      document.querySelectorAll('footer h3, .wedding-footer h3').forEach(function(el) {
        el.textContent = coupleName;
      });
      document.title = 'Undangan Pernikahan - ' + coupleName;

      // ── Groom ─────────────────────────────────────────────────────────────
      var groomCard = document.querySelectorAll('.mempelai-card')[0];
      if (groomCard) {
        var groomH3 = groomCard.querySelector('h3');
        if (groomH3 && d.GROOM_NAME) groomH3.textContent = d.GROOM_NAME;
        var groomParent = groomCard.querySelector('.parent-info');
        if (groomParent && d.GROOM_PARENTS) groomParent.innerHTML = d.GROOM_PARENTS;
        var groomImg = groomCard.querySelector('.mempelai-img, img');
        if (groomImg && d.GROOM_PHOTO) groomImg.src = d.GROOM_PHOTO;
        // Instagram
        var groomIg = groomCard.querySelector('a[href*="instagram"], .instagram-link');
        if (groomIg && d.GROOM_INSTAGRAM) {
          groomIg.href = 'https://instagram.com/' + d.GROOM_INSTAGRAM.replace('@','');
          groomIg.textContent = d.GROOM_INSTAGRAM;
        }
      }

      // ── Bride ─────────────────────────────────────────────────────────────
      var brideCard = document.querySelectorAll('.mempelai-card')[1];
      if (brideCard) {
        var brideH3 = brideCard.querySelector('h3');
        if (brideH3 && d.BRIDE_NAME) brideH3.textContent = d.BRIDE_NAME;
        var brideParent = brideCard.querySelector('.parent-info');
        if (brideParent && d.BRIDE_PARENTS) brideParent.innerHTML = d.BRIDE_PARENTS;
        var brideImg = brideCard.querySelector('.mempelai-img, img');
        if (brideImg && d.BRIDE_PHOTO) brideImg.src = d.BRIDE_PHOTO;
        var brideIg = brideCard.querySelector('a[href*="instagram"], .instagram-link');
        if (brideIg && d.BRIDE_INSTAGRAM) {
          brideIg.href = 'https://instagram.com/' + d.BRIDE_INSTAGRAM.replace('@','');
          brideIg.textContent = d.BRIDE_INSTAGRAM;
        }
      }

      // ── Date & Time ───────────────────────────────────────────────────────
      if (d.EVENT_DATE) {
        var fmt = formatDate(d.EVENT_DATE);
        document.querySelectorAll('.day-name').forEach(function(el) { el.textContent = fmt.dayName; });
        document.querySelectorAll('.day-num').forEach(function(el) { el.textContent = fmt.dayNum; });
        document.querySelectorAll('.month-year').forEach(function(el) { el.textContent = fmt.monthYear; });
        document.querySelectorAll('.event-date-text, .tanggal-acara').forEach(function(el) { el.textContent = fmt.full; });
      }
      if (d.EVENT_TIME) {
        document.querySelectorAll('.event-time').forEach(function(el) {
          el.textContent = d.EVENT_TIME + ' ' + (d.EVENT_TIMEZONE || 'WIB') + ' - Selesai';
        });
      }

      // ── Venue ─────────────────────────────────────────────────────────────
      if (d.VENUE) {
        document.querySelectorAll('.venue-name').forEach(function(el) {
          el.innerHTML = '<strong>' + d.VENUE + '</strong>';
        });
        document.querySelectorAll('.venue-address').forEach(function(el) {
          el.textContent = d.VENUE;
        });
      }
      if (d.MAPS_URL) {
        document.querySelectorAll('.btn-primary.btn-sm, a[href*="maps"], button.btn-maps').forEach(function(el) {
          if (el.tagName === 'A') el.href = d.MAPS_URL;
          else {
            el.onclick = function() { window.open(d.MAPS_URL, '_blank'); };
          }
        });
      }

      // ── Gallery ───────────────────────────────────────────────────────────
      var galleryImgs = [d.GALLERY_1, d.GALLERY_2, d.GALLERY_3, d.GALLERY_4, d.GALLERY_5].filter(Boolean);
      if (galleryImgs.length > 0) {
        var featured = document.getElementById('featured-photo');
        if (featured) featured.src = galleryImgs[0];
        var thumbs = document.querySelectorAll('.thumbnail');
        galleryImgs.forEach(function(url, i) {
          if (thumbs[i]) thumbs[i].src = url;
        });
      }

      // ── YouTube ───────────────────────────────────────────────────────────
      if (d.YOUTUBE_URL) {
        var ytId = d.YOUTUBE_URL.match(/(?:v=|youtu\\.be\\/)([^&?/]+)/);
        if (ytId) {
          document.querySelectorAll('.video-container iframe, iframe[src*="youtube"]').forEach(function(el) {
            el.src = 'https://www.youtube.com/embed/' + ytId[1];
          });
        }
      }

      // ── Bank / Gift ───────────────────────────────────────────────────────
      if (d.BANK_NAME) setText('.bank-name, .rekening-bank, .gift-bank', d.BANK_NAME);
      if (d.BANK_ACCOUNT) setText('.bank-number, .rekening-number, .gift-number, .no-rekening', d.BANK_ACCOUNT);
      if (d.BANK_HOLDER) setText('.bank-holder, .rekening-atas-nama, .gift-holder, .atas-nama', d.BANK_HOLDER);

      // Multi digital envelopes rendering
      var envelopesContainer = document.getElementById('digital-envelopes-container');
      if (envelopesContainer && d.DIGITAL_ENVELOPES && d.DIGITAL_ENVELOPES.length > 0) {
        var logoMap = {
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
          'shoppepay': '/bank-logos/shoppepay.png'
        };
        var htmlStr = '';
        d.DIGITAL_ENVELOPES.forEach(function(env) {
          var bName = (env.bankName || '').toLowerCase().trim();
          var logoPath = logoMap[bName];
          var headerHtml = logoPath 
            ? '<img src="' + logoPath + '" alt="' + env.bankName + '" style="height: 30px; object-fit: contain; margin-bottom: 10px;" />'
            : '<h4 style="margin-bottom: 10px;">' + env.bankName + '</h4>';
            
          htmlStr += '<div class="envelope-item">' + headerHtml + '<p class="envelope-account">' + env.bankAccount + '</p><p class="envelope-holder">a.n. ' + env.bankHolder + '</p></div>';
        });
        envelopesContainer.innerHTML = htmlStr;
      }

      // ── Quotes ────────────────────────────────────────────────────────────
      if (d.QUOTE_TEXT) setText('.quote-text', d.QUOTE_TEXT);
      if (d.QUOTE_SOURCE) setText('.quote-source', d.QUOTE_SOURCE);

      // ── IG Story ──────────────────────────────────────────────────────────
      if (d.IG_STORY_URL) {
        document.querySelectorAll('.ig-story-link, a[href*="instagram.com/stories"]').forEach(function(el) {
          if (el.tagName === 'A') el.href = d.IG_STORY_URL;
        });
      }

      // ── Love Stories ──────────────────────────────────────────────────────
      var loveStoriesContainer = document.getElementById('love-stories-container');
      if (loveStoriesContainer && d.LOVE_STORIES && d.LOVE_STORIES.length > 0) {
        var lsHtml = '';
        d.LOVE_STORIES.forEach(function(story) {
          lsHtml += '<div class="love-story-item"><h4 class="story-title">' + story.title + '</h4><span class="story-date">' + story.date + '</span><p class="story-text">' + story.story + '</p></div>';
        });
        loveStoriesContainer.innerHTML = lsHtml;
      }

      // ── RSVP & Guestbook Visibility ───────────────────────────────────────
      if (d.ENABLE_RSVP === false) {
        document.querySelectorAll('.rsvp-section, #rsvp').forEach(function(el) { el.style.display = 'none'; });
      }
      if (d.ENABLE_GUESTBOOK === false) {
        document.querySelectorAll('.guestbook-section, #guestbook').forEach(function(el) { el.style.display = 'none'; });
      }

      // ── Background Music ──────────────────────────────────────────────────
      var audioEl = document.getElementById('bg-music');
      if (audioEl) {
        if (d.BG_MUSIC) {
          // Set the correct music source before template script plays it
          audioEl.src = d.BG_MUSIC;
          audioEl.load();
        } else {
          // No music — prevent autoplay
          audioEl.src = '';
          audioEl.pause();
          // Override play to do nothing
          audioEl.play = function() { return Promise.resolve(); };
        }
      }

      // ── Countdown target date ─────────────────────────────────────────────
      if (d.EVENT_DATE && typeof weddingDate !== 'undefined') {
        try { weddingDate = new Date(d.EVENT_DATE + 'T' + (d.EVENT_TIME || '08:00') + ':00'); } catch(e) {}
      }
      // Override window.weddingDate for countdown scripts
      if (d.EVENT_DATE) {
        window.weddingDate = new Date(d.EVENT_DATE + 'T' + (d.EVENT_TIME || '08:00') + ':00');
        window.targetDate = window.weddingDate;
        window.eventDate = window.weddingDate;
      }

      // ── data-field fallback ───────────────────────────────────────────────
      Object.entries(d).forEach(function(entry) {
        var key = entry[0], value = entry[1];
        document.querySelectorAll('[data-field="' + key + '"]').forEach(function(el) {
          if (el.tagName === 'IMG') el.src = value;
          else if (el.tagName === 'A') el.href = value;
          else el.textContent = value;
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  })();
</script>`;

    // ── Inject data script BEFORE template's own script ─────────────────────
    // Place before </head> so window.__INVITATION_DATA__ is available when
    // template scripts initialize, AND run DOM replacement after DOMContentLoaded
    html = html.replace(/<\/head>/i, `${dataScript}\n</head>`);

    // Also remove the </body> injection if it was added before
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('[invitation API]', error);
    return new NextResponse('Server error: ' + error.message, { status: 500 });
  }
}
