import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Package from '@/models/Package';

export async function GET() {
  try {
    await connectToDatabase();
    const packages = await Package.find({}).sort({ sortOrder: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: packages }, { status: 200 });
  } catch (error: any) {
    console.error('[API/packages GET] Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, tagline, price, originalPrice, period, popular, features, cta, sortOrder } = body;

    if (!name || !price || !period || !features) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPackage = new Package({
      name,
      tagline,
      price,
      originalPrice: originalPrice || '',
      period,
      popular: popular || false,
      features,
      cta: cta || 'Pilih Paket',
      sortOrder: sortOrder || 0,
    });

    await newPackage.save();

    return NextResponse.json(
      { success: true, message: 'Paket harga berhasil ditambahkan', package: newPackage },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API/packages POST] Error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Package ID wajib diisi' }, { status: 400 });
    }

    await connectToDatabase();
    const body = await req.json();

    const updatedPackage = await Package.findByIdAndUpdate(id, body, { new: true });

    if (!updatedPackage) {
      return NextResponse.json({ success: false, error: 'Paket harga tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Paket harga berhasil diupdate', package: updatedPackage });
  } catch (error: any) {
    console.error('[API/packages PUT] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Package ID wajib diisi' }, { status: 400 });
    }

    await connectToDatabase();

    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return NextResponse.json({ success: false, error: 'Paket harga tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Paket harga berhasil dihapus' });
  } catch (error: any) {
    console.error('[API/packages DELETE] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
