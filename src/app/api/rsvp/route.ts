import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Guest from '@/models/Guest';

/**
 * POST /api/rsvp
 * Simpan konfirmasi kehadiran tamu dari halaman undangan publik.
 * Tidak memerlukan autentikasi karena halaman undangan bersifat publik.
 */
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { projectId, name, rsvpStatus, pax } = body;

    if (!projectId || !name) {
      return NextResponse.json(
        { success: false, error: 'projectId dan name wajib diisi' },
        { status: 400 }
      );
    }

    // Buat slug dari nama
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    // Pastikan slug unik
    let finalSlug = baseSlug;
    let count = 1;
    while (await Guest.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${count}`;
      count++;
    }

    const guest = await Guest.create({
      projectId,
      name,
      slug: finalSlug,
      rsvpStatus: rsvpStatus || 'ATTENDING',
      pax: pax || 1,
      isOpened: true,
    });

    return NextResponse.json({ success: true, data: guest }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
