import { NextResponse } from 'next/server';
import User from '@/models/User';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email wajib diisi' }, { status: 400 });
    }

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const user = await User.findOne({ email });

    // Return success even if user not found to prevent email enumeration
    if (!user) {
      return NextResponse.json({ message: 'Jika email terdaftar, tautan reset telah dikirim ke email Anda.' });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Token expires in 1 hour
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // Construct reset URL
    const url = new URL(req.url);
    const resetUrl = `${url.origin}/reset-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail(user.email, resetUrl, user.name);

    return NextResponse.json({ message: 'Jika email terdaftar, tautan reset telah dikirim ke email Anda.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengirim email. Pastikan konfigurasi email sudah benar.' }, { status: 500 });
  }
}
