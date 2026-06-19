import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Template from '@/models/Template';

export async function GET() {
  try {
    await connectToDatabase();
    
    await Template.create({
      name: 'Minimalist Interactive',
      category: 'Minimalist',
      price: 150000,
      thumbnailUrl: '/templates/example/thumbnail.png', // Fallback to existing thumbnail
      sourceCodeUrl: '/templates/minimalist/index.html',
      features: ['Responsive', 'Animasi Halus', 'Kado Digital Copy', 'Musik Auto-play']
    });
    
    return new NextResponse('Minimalist template seeded successfully.', { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new NextResponse('Error seeding template: ' + error.message, { status: 500 });
  }
}
