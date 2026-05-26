import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Project } from '@/models/Project';
import User from '@/models/User';
import Template from '@/models/Template';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await connectToDatabase();

    const now = new Date();
    
    // Start of Today
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Start of Month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Start of Year
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [
      projectsToday,
      projectsMonth,
      projectsYear,
      activeUsers,
      liveInvitations,
      recentProjects,
      templates
    ] = await Promise.all([
      Project.find({ createdAt: { $gte: startOfToday } }),
      Project.find({ createdAt: { $gte: startOfMonth } }),
      Project.find({ createdAt: { $gte: startOfYear } }),
      User.countDocuments(),
      Project.countDocuments({ status: 'active' }),
      Project.find().sort({ createdAt: -1 }).limit(3).populate('userId', 'name email').populate('themeId', 'templateName'),
      Template.find().limit(4)
    ]);

    const todayRevenue = projectsToday.reduce((sum, p) => sum + (p.priceSnapshot || 0), 0);
    const monthlyRevenue = projectsMonth.reduce((sum, p) => sum + (p.priceSnapshot || 0), 0);
    const annualRevenue = projectsYear.reduce((sum, p) => sum + (p.priceSnapshot || 0), 0);

    const recentActivity = recentProjects.map(p => ({
      id: p._id,
      type: 'New Template Sale',
      title: 'New Invitation Created',
      desc: `Invitation '${p.coupleName || 'No Name'}' created by ${p.clientName || 'Unknown'} using '${(p.themeId as any)?.templateName || 'Unknown Template'}'`,
      time: new Date(p.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' today'
    }));

    const trendingTemplates = templates.map(t => ({
      id: t._id,
      name: t.templateName,
      price: t.price || 0,
      category: t.category || 'Premium Series',
      sales: Math.floor(Math.random() * 500) + 100, // mock sales
      image: t.thumbnailUrl || '/assets/landing/hero-1.png'
    }));

    return NextResponse.json({
      success: true,
      data: {
        todayRevenue,
        monthlyRevenue,
        annualRevenue,
        activeUsers,
        liveInvitations,
        recentActivity,
        trendingTemplates
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
