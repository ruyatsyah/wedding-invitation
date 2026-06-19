import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Nama tidak valid' }, { status: 400 });
    }

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { name: name.trim() } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profil berhasil diperbarui', user: { name: updatedUser.name } });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
