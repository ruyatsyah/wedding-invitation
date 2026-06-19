import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Guest from '@/models/Guest';

// GET all guests for a specific project
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    const query = projectId ? { projectId } : {};
    const guests = await Guest.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: guests });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    if (!body.projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required' }, { status: 400 });
    }
    
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
