import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';
import { auth } from '@/lib/auth';
import User from '@/models/User';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const project = await Project.findById(id).populate('themeId');
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    // Verify ownership
    const dbUser = await User.findOne({ email: session.user.email });
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project tidak ditemukan' }, { status: 404 });
    }

    // Allow if owner or admin
    const isOwner = dbUser && project.userId?.toString() === dbUser._id.toString();
    const isAdmin = (session.user as any).role === 'admin';

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();

    // ── Publish / Aktifkan undangan ──────────────────────────────────────────
    if (body.publish === true) {
      // Hanya bisa publish jika status masih pending
      if (project.status !== 'pending') {
        return NextResponse.json(
          { success: false, error: project.status === 'active' ? 'Undangan sudah aktif.' : 'Undangan sudah kedaluwarsa.' },
          { status: 400 }
        );
      }

      const now   = new Date();
      const price = project.priceSnapshot ?? 0;
      let expiresAt: Date;

      if (price <= 150000) {
        // Bronze: 2 hari
        expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
      } else if (price <= 350000) {
        // Silver: 3 bulan
        expiresAt = new Date(now);
        expiresAt.setMonth(expiresAt.getMonth() + 3);
      } else {
        // Gold: 6 bulan
        expiresAt = new Date(now);
        expiresAt.setMonth(expiresAt.getMonth() + 6);
      }

      const published = await Project.findByIdAndUpdate(
        id,
        { $set: { status: 'active', activatedAt: now, expiresAt } },
        { new: true }
      ).populate('themeId');

      return NextResponse.json({ success: true, data: published }, { status: 200 });
    }

    // Fields that are allowed to be updated
    const allowedFields = [
      'coupleName',
      'groomFullName', 'groomParents', 'groomInstagram', 'groomPhoto',
      'brideFullName', 'brideParents', 'brideInstagram', 'bridePhoto',
      'gallery',
      'eventDate', 'eventTime', 'eventTimezone',
      'venue', 'mapsUrl', 'youtubeUrl',
      'enableRsvp', 'enableGuestbook',
      'bankName', 'bankAccount', 'bankHolder',
      'bgMusic',
      'guests',
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('themeId');

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    console.error('[PATCH /api/projects/[id]]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
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

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
