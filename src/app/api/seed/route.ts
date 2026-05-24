import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// One-time seed endpoint — inserts admin users if they don't exist yet
export async function GET() {
  try {
    await connectToDatabase();

    const admins = [
      { name: 'Ruyatsyah', email: 'ruyatsyah2203@gmail.com' },
      { name: 'Aldi Rifaldi', email: 'aldirifaldi@gmail.com' },
    ];

    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);

    const results = [];

    for (const admin of admins) {
      const existing = await User.findOne({ email: admin.email });
      if (existing) {
        // Update role and password if already exists
        existing.role = 'admin';
        existing.password = hashedPassword;
        existing.provider = 'credentials';
        await existing.save();
        results.push({ email: admin.email, status: 'updated' });
      } else {
        await User.create({
          name: admin.name,
          email: admin.email,
          password: hashedPassword,
          role: 'admin',
          provider: 'credentials',
          emailVerified: new Date(),
        });
        results.push({ email: admin.email, status: 'created' });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('[seed] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
