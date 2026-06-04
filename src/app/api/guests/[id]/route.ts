import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Guest from '@/models/Guest';
import mongoose from 'mongoose';

type RouteContext = { params: Promise<{ id: string }> };

// Helper: detect if param is a MongoDB ObjectId or a slug
function isObjectId(value: string) {
  return mongoose.Types.ObjectId.isValid(value) && value.length === 24;
}

// GET guest by id or slug
export async function GET(request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const guest = isObjectId(id)
      ? await Guest.findById(id)
      : await Guest.findOne({ slug: id });

    if (!guest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: guest });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

// PATCH guest by id or slug
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const guest = isObjectId(id)
      ? await Guest.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
      : await Guest.findOneAndUpdate({ slug: id }, { $set: body }, { new: true, runValidators: true });

    if (!guest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: guest });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// DELETE guest by id
export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedGuest = isObjectId(id)
      ? await Guest.findByIdAndDelete(id)
      : await Guest.findOneAndDelete({ slug: id });

    if (!deletedGuest) {
      return NextResponse.json({ success: false, error: 'Guest not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedGuest });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
