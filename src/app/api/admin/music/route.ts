import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Music } from '@/models/Music';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/auth';

export const GET = auth(async (req: any) => {
  try {
    const session = req.auth;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }
    await connectToDatabase();
    const music = await Music.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: music }, { status: 200 });
  } catch (error: any) {
    console.error('[API/admin/music GET] Error:', error.message);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
});

export const POST = auth(async (req: any) => {
  try {
    const session = req.auth;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    await connectToDatabase();
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const file = formData.get('file') as File | null;

    if (!title || !file) {
      return NextResponse.json(
        { success: false, error: 'Judul dan file musik wajib diisi' },
        { status: 400 }
      );
    }

    // Save audio file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${suffix}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const dir = join(process.cwd(), 'public', 'uploads', 'music');
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, filename), buffer);
    const url = `/uploads/music/${filename}`;

    const newMusic = new Music({ title, url });
    await newMusic.save();

    return NextResponse.json(
      { success: true, message: 'Musik berhasil ditambahkan', data: newMusic },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API/admin/music POST] Error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
});
