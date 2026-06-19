import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Music } from '@/models/Music';
import { auth } from '@/lib/auth';
import { unlink } from 'fs/promises';
import { join } from 'path';

export const DELETE = auth(async (req: any, { params }: { params: { id: string } }) => {
  try {
    const session = req.auth;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID wajib diisi' }, { status: 400 });
    }

    await connectToDatabase();
    const music = await Music.findById(id);
    
    if (!music) {
      return NextResponse.json({ success: false, error: 'Musik tidak ditemukan' }, { status: 404 });
    }

    // Attempt to delete the file
    try {
      const filePath = join(process.cwd(), 'public', music.url);
      await unlink(filePath);
    } catch (fsError) {
      console.warn('[API/admin/music DELETE] Could not delete file:', fsError);
    }

    await Music.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Musik berhasil dihapus' });
  } catch (error: any) {
    console.error('[API/admin/music DELETE] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
});
