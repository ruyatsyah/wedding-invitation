import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';
import { auth } from '@/lib/auth';
import User from '@/models/User';

type RouteContext = { params: Promise<{ id: string }> };

async function saveFile(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email });
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project tidak ditemukan' }, { status: 404 });
    }

    const isOwner = dbUser && project.userId?.toString() === dbUser._id.toString();
    const isAdmin = (session.user as any).role === 'admin';
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const formData = await req.formData();
    const slot = formData.get('slot') as string; // 'groomPhoto' | 'bridePhoto' | 'gallery_0..4'
    const file = formData.get('file') as File | null;

    if (!slot || !file) {
      return NextResponse.json({ success: false, error: 'slot dan file wajib diisi' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'File harus berupa gambar' }, { status: 400 });
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'Ukuran file maksimal 5MB' }, { status: 400 });
    }

    const folder = `projects/${id}`;
    const url = await saveFile(file, folder);

    let update: Record<string, any> = {};

    if (slot === 'groomPhoto') {
      update = { groomPhoto: url };
    } else if (slot === 'bridePhoto') {
      update = { bridePhoto: url };
    } else if (slot.startsWith('gallery_')) {
      const idx = parseInt(slot.replace('gallery_', ''));
      const gallery = [...(project.gallery || [])];
      gallery[idx] = url;
      update = { gallery };
    } else {
      return NextResponse.json({ success: false, error: 'Slot tidak valid' }, { status: 400 });
    }

    const updated = await Project.findByIdAndUpdate(id, { $set: update }, { new: true });
    return NextResponse.json({ success: true, url, data: updated });
  } catch (error: any) {
    console.error('[upload]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
