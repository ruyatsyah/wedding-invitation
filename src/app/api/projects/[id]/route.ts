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
