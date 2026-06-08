import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Wish from '@/models/Wish';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const wish = await Wish.findByIdAndDelete(params.id);
    
    if (!wish) {
      return NextResponse.json({ success: false, error: 'Wish not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
