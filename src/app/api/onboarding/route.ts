import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectMongo from '@/lib/mongoose';
import { Project } from '@/models/Project';

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();

    const importUser = (await import('@/models/User')).default;
    const dbUser = await importUser.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ success: false, error: 'User tidak ditemukan' }, { status: 404 });
    }

    const userId = dbUser._id;

    const body = await req.json();
    const { coupleName, customUrl, plan } = body;

    if (!coupleName || !customUrl || !plan) {
      return NextResponse.json(
        { success: false, error: 'Mohon lengkapi semua field yang dibutuhkan.' },
        { status: 400 }
      );
    }

    await connectMongo();

    // Check if custom URL is already taken
    const existingProject = await Project.findOne({ customUrl: customUrl.toLowerCase() });
    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'URL tersebut sudah digunakan, silakan pilih URL lain.' },
        { status: 400 }
      );
    }

    // Determine price snapshot based on plan
    let priceSnapshot = 0;
    const Package = (await import('@/models/Package')).default;
    
    if (body.paidPrice !== undefined) {
      priceSnapshot = Number(body.paidPrice);
    } else if (body.planId) {
      const pkg = await Package.findById(body.planId);
      if (pkg && pkg.price) {
        priceSnapshot = parseInt(pkg.price.replace(/[^0-9]/g, ''), 10) || 0;
      }
    } else {
      // Fallback if no planId provided
      if (plan.includes('silver')) priceSnapshot = 49000;
      if (plan.includes('gold')) priceSnapshot = 99000;
    }

    // Create the project (pending theme selection)
    const newProject = await Project.create({
      userId,
      coupleName,
      customUrl: customUrl.toLowerCase(),
      plan,
      priceSnapshot,
      status: 'pending', 
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error: any) {
    console.error('Onboarding Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memproses onboarding.' },
      { status: 500 }
    );
  }
}
