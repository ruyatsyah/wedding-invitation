import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';
import Template from '@/models/Template';
import User from '@/models/User';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Cari user di DB berdasarkan email session
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ success: false, error: 'User tidak ditemukan' }, { status: 404 });
    }

    const body = await req.json();
    const { coupleName, customUrl, themeId } = body;

    if (!coupleName || !customUrl || !themeId) {
      return NextResponse.json({ success: false, error: 'Semua field wajib diisi' }, { status: 400 });
    }

    // Periksa apakah URL sudah digunakan
    const existingProject = await Project.findOne({ customUrl });
    if (existingProject) {
      return NextResponse.json({ success: false, error: 'Custom URL sudah digunakan oleh orang lain. Silakan pilih URL lain.' }, { status: 400 });
    }

    // Ambil harga tema saat ini
    const template = await Template.findById(themeId);
    if (!template) {
      return NextResponse.json({ success: false, error: 'Tema tidak ditemukan' }, { status: 404 });
    }

    const finalPrice = template.price * (1 - template.discount / 100);

    // Buat project baru dengan userId dari session
    const newProject = await Project.create({
      userId: dbUser._id,
      clientName: dbUser.name,
      coupleName,
      customUrl,
      themeId,
      priceSnapshot: finalPrice,
      status: 'pending',
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error: any) {
    console.error('[API/projects] Error creating project:', error);
    return NextResponse.json({ success: false, error: error.message || 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Cari user di DB berdasarkan email session
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    // Hanya ambil project milik user yang login
    const projects = await Project.find({ userId: dbUser._id })
      .populate('themeId')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
