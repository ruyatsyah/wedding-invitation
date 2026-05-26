import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { coupleName: { $regex: search, $options: 'i' } },
        { customUrl: { $regex: search, $options: 'i' } },
        { clientName: { $regex: search, $options: 'i' } },
      ];
    }

    if (status !== 'all') {
      query.status = status;
    }

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .populate('themeId', 'templateName thumbnailUrl')
      .populate('userId', 'name email image role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();


    // Auto-expire: tandai project yang sudah melewati expiresAt
    await Project.updateMany(
      { status: 'active', expiresAt: { $lte: new Date() } },
      { $set: { status: 'expired' } }
    );

    // Stats
    const totalActive = await Project.countDocuments({ status: 'active' });
    const totalExpired = await Project.countDocuments({ status: 'expired' });
    const totalAll = await Project.countDocuments();


    return NextResponse.json({
      success: true,
      data: projects,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
      stats: { totalAll, totalActive, totalExpired },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'id and status required' }, { status: 400 });
    }

    // Hitung expiresAt berdasarkan priceSnapshot (tier paket)
    const updateFields: Record<string, any> = { status };

    if (status === 'active') {
      const project = await Project.findById(id).select('priceSnapshot activatedAt');
      if (project && !project.activatedAt) {
        // Hanya set jika belum pernah diaktifkan sebelumnya
        const now = new Date();
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

        updateFields.activatedAt = now;
        updateFields.expiresAt   = expiresAt;
      }
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).populate('userId', 'name email');

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Project tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });
    }

    await connectToDatabase();

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Project tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Undangan berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
