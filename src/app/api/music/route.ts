import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Music } from '@/models/Music';

export async function GET() {
  try {
    await connectToDatabase();
    const music = await Music.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: music }, { status: 200 });
  } catch (error: any) {
    console.error('[API/music GET] Error:', error.message);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
