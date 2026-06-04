import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Wish from '@/models/Wish';

// GET all wishes for a specific project
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    const query = projectId ? { projectId } : {};
    const wishes = await Wish.find(query).sort({ createdAt: -1 });
    
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
    
    if (!body.projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required' }, { status: 400 });
    }

    const wish = await Wish.create(body);
    return NextResponse.json({ success: true, data: wish }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
