import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Wish from '@/models/Wish';

// GET all wishes
export async function GET() {
  try {
    await connectToDatabase();
    const wishes = await Wish.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// POST create wish
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const wish = await Wish.create(body);
    return NextResponse.json({ success: true, data: wish }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
