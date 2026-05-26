import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongo from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Semua kolom wajib diisi.' },
        { status: 400 }
      );
    }

    await connectMongo();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar. Silakan gunakan email lain atau login.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'client',
      provider: 'credentials',
    });

    return NextResponse.json(
      {
        message: 'Registrasi berhasil',
        user: { id: newUser._id, email: newUser.email, name: newUser.name },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan sistem saat mendaftar.' },
      { status: 500 }
    );
  }
}
