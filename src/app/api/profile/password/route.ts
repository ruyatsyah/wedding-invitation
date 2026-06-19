import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import User from '@/models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { oldPassword, newPassword } = body;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json({ error: 'Password baru minimal 8 karakter' }, { status: 400 });
    }

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // If user already has a password, verify old password first
    if (user.password) {
      if (!oldPassword) {
        return NextResponse.json({ error: 'Password lama wajib diisi' }, { status: 400 });
      }
      
      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return NextResponse.json({ error: 'Password lama salah' }, { status: 400 });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Use findOneAndUpdate to avoid Mongoose schema validation issues on provider enum
    const updatedProvider = user.provider === 'google' ? 'hybrid' : (user.provider ?? 'credentials');
    
    await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { password: hashedPassword, provider: updatedProvider } }
    );

    return NextResponse.json({ message: 'Password berhasil diperbarui' });
  } catch (error) {
    console.error('Update password error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
