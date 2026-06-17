import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Guest from '@/models/Guest';

// GET all guests
export async function GET() {
  try {
    await connectToDatabase();
    const guests = await Guest.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: guests });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// POST create guest
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Create unique slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    // Check if slug already exists, if so append unique string
    let finalSlug = slug;
    let count = 1;
    while (await Guest.findOne({ slug: finalSlug })) {
      finalSlug = `${slug}-${count}`;
      count++;
    }

    const guest = await Guest.create({
      ...body,
      slug: finalSlug
    });
    
    return NextResponse.json({ success: true, data: guest }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
