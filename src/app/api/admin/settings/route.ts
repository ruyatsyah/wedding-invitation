import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { SystemSetting } from '@/models/SystemSetting';
import { auth } from '@/lib/auth';

export const GET = auth(async (req: any) => {
  try {
    const session = req.auth;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    await connectToDatabase();
    let settings = await SystemSetting.findOne();
    
    if (!settings) {
      settings = await SystemSetting.create({
        invitationActivePeriod: '1 Year Auto-lock',
        maintenanceMode: false,
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
});

export const PATCH = auth(async (req: any) => {
  try {
    const session = req.auth;
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    await connectToDatabase();

    let settings = await SystemSetting.findOne();
    if (!settings) {
      settings = new SystemSetting();
    }

    if (body.invitationActivePeriod !== undefined) {
      settings.invitationActivePeriod = body.invitationActivePeriod;
    }
    if (body.maintenanceMode !== undefined) {
      settings.maintenanceMode = body.maintenanceMode;
    }
    
    settings.updatedAt = new Date();
    await settings.save();

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
});
