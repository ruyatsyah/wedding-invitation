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
    const data = {
      COUPLE_NAME:      project.coupleName || '',
      GROOM_NAME:       project.groomFullName || '',
      GROOM_PARENTS:    project.groomParents || '',
      GROOM_INSTAGRAM:  project.groomInstagram || '',
      GROOM_PHOTO:      project.groomPhoto ? `${req.nextUrl.origin}${project.groomPhoto}` : '',
      BRIDE_NAME:       project.brideFullName || '',
      BRIDE_PARENTS:    project.brideParents || '',
      BRIDE_INSTAGRAM:  project.brideInstagram || '',
      BRIDE_PHOTO:      project.bridePhoto ? `${req.nextUrl.origin}${project.bridePhoto}` : '',
      EVENT_DATE:       project.eventDate || '',
      EVENT_TIME:       project.eventTime || '',
      EVENT_TIMEZONE:   project.eventTimezone || 'WIB',
      VENUE:            project.venue || '',
      MAPS_URL:         project.mapsUrl || '',
      YOUTUBE_URL:      project.youtubeUrl || '',
      BANK_NAME:        project.bankName || '',
      BANK_ACCOUNT:     project.bankAccount || '',
      BANK_HOLDER:      project.bankHolder || '',
      CUSTOM_URL:       project.customUrl || '',
      PROJECT_ID:       project._id?.toString() || '',
      GALLERY_1:        project.gallery?.[0] ? `${req.nextUrl.origin}${project.gallery[0]}` : '',
      GALLERY_2:        project.gallery?.[1] ? `${req.nextUrl.origin}${project.gallery[1]}` : '',
      GALLERY_3:        project.gallery?.[2] ? `${req.nextUrl.origin}${project.gallery[2]}` : '',
      GALLERY_4:        project.gallery?.[3] ? `${req.nextUrl.origin}${project.gallery[3]}` : '',
      GALLERY_5:        project.gallery?.[4] ? `${req.nextUrl.origin}${project.gallery[4]}` : '',
      BG_MUSIC:         (project.bgMusic && project.bgMusic !== '') ? `${req.nextUrl.origin}${project.bgMusic}` : '',
    };

    // ── Replace {{PLACEHOLDER}} patterns ─────────────────────────────────────
    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      html = html.replace(regex, value);
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
