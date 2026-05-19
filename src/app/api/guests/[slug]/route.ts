import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Guest from '@/models/Guest';

// GET specific guest by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const guest = await Guest.findOne({ slug });
    if (!guest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: guest });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PATCH update guest (e.g. RSVP status, pax, or isOpened)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();
    const { slug } = await params;
    const body = await request.json();
    const guest = await Guest.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );
    if (!guest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: guest });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
