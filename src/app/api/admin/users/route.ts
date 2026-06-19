import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';
import { Project } from '@/models/Project';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || 'all';
    const status = searchParams.get('status') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role !== 'all') query.role = role;
    if (status === 'banned') query.banned = true;
    if (status === 'active') query.banned = { $ne: true };

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Count projects per user
    const userIds = users.map((u: any) => u._id);
    const projectCounts = await Project.aggregate([
      { $match: { userId: { $in: userIds } } },
      { $group: { _id: '$userId', count: { $sum: 1 } } },
    ]);
    const countMap: Record<string, number> = {};
    projectCounts.forEach((p: any) => { countMap[p._id.toString()] = p.count; });

    const enriched = users.map((u: any) => ({
      ...u,
      projectCount: countMap[u._id.toString()] ?? 0,
    }));

    // Stats
    const totalUsers = await User.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalBanned = await User.countDocuments({ banned: true });

    return NextResponse.json({
      success: true,
      data: enriched,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
      stats: { totalUsers, totalClients, totalAdmins, totalBanned },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    const { name, email, password, role } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'name, email, password wajib diisi' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Email sudah terdaftar' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || 'client',
      provider: 'credentials',
      emailVerified: new Date(),
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 201 });
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

    const { id, action, role, name } = await req.json();
    if (!id || !action) {
      return NextResponse.json({ success: false, error: 'id and action required' }, { status: 400 });
    }

    let update: Record<string, any> = {};
    if (action === 'ban') update = { banned: true };
    else if (action === 'unban') update = { banned: false };
    else if (action === 'setRole') update = { role };
    else if (action === 'updateName') update = { name };
    else return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });

    const updated = await User.findByIdAndUpdate(id, { $set: update }, { new: true }).select('-password');
    if (!updated) {
      return NextResponse.json({ success: false, error: 'User tidak ditemukan' }, { status: 404 });
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
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    // Prevent deleting yourself
    const currentUser = session.user as any;
    await connectToDatabase();
    const target = await User.findById(id);
    if (!target) return NextResponse.json({ success: false, error: 'User tidak ditemukan' }, { status: 404 });
    if (target.email === currentUser.email) {
      return NextResponse.json({ success: false, error: 'Tidak bisa menghapus akun sendiri' }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
