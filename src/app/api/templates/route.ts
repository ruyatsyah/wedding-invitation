import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Template from '@/models/Template';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import AdmZip from 'adm-zip';

export async function GET() {
  try {
    await connectToDatabase();
    const templates = await Template.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: templates }, { status: 200 });
  } catch (error: any) {
    console.error('[API/templates GET] Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const templateName = formData.get('templateName') as string;
    const price        = formData.get('price') as string;
    const discount     = formData.get('discount') as string;
    const enableWaBlast      = formData.get('enableWaBlast') === 'true';
    const guestListOnly      = formData.get('guestListOnly') === 'true';
    const dailyLimit         = formData.get('dailyLimit') as string;
    const publishImmediately = formData.get('publishImmediately') === 'true';
    const sourceCode = formData.get('sourceCode') as File | null;
    const thumbnail  = formData.get('thumbnail') as File | null;

    if (!templateName || !price || !sourceCode || !thumbnail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (templateName, price, sourceCode, thumbnail)' },
        { status: 400 }
      );
    }

    // ── Save thumbnail ────────────────────────────────────────────────────────
    const saveFile = async (file: File, folder: string): Promise<string> => {
      const bytes  = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${suffix}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
      const dir = join(process.cwd(), 'public', 'uploads', folder);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, filename), buffer);
      return `/uploads/${folder}/${filename}`;
    };

    const thumbnailUrl = await saveFile(thumbnail, 'templates/thumbnails');

    // ── Handle source code (ZIP or single HTML) ───────────────────────────────
    const srcBytes  = await sourceCode.arrayBuffer();
    const srcBuffer = Buffer.from(srcBytes);
    const isZip     = sourceCode.name.toLowerCase().endsWith('.zip');

    const suffix    = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const folderName = `${suffix}-${sourceCode.name.replace(/[^a-zA-Z0-9._-]/g, '').replace(/\.(zip|html?)$/i, '')}`;
    const extractDir = join(process.cwd(), 'public', 'uploads', 'templates', 'source', folderName);
    await mkdir(extractDir, { recursive: true });

    let sourceCodeUrl: string;

    if (isZip) {
      // Extract ZIP contents
      const zip = new AdmZip(srcBuffer);
      const entries = zip.getEntries();

      // Find index.html — could be at root or inside a subfolder
      let indexEntry = entries.find(e => e.entryName.toLowerCase() === 'index.html');
      if (!indexEntry) {
        // Try one level deep: folder/index.html
        indexEntry = entries.find(e => /^[^/]+\/index\.html$/i.test(e.entryName));
      }
      if (!indexEntry) {
        return NextResponse.json(
          { success: false, error: 'ZIP tidak mengandung index.html. Pastikan file index.html ada di dalam ZIP.' },
          { status: 400 }
        );
      }

      // Extract all files
      for (const entry of entries) {
        if (entry.isDirectory) continue;
        const entryPath = join(extractDir, entry.entryName);
        const entryDir  = join(entryPath, '..');
        await mkdir(entryDir, { recursive: true });
        await writeFile(entryPath, entry.getData());
      }

      sourceCodeUrl = `/uploads/templates/source/${folderName}/${indexEntry.entryName}`;
    } else {
      // Single HTML file
      const htmlFilename = `${suffix}-${sourceCode.name.replace(/[^a-zA-Z0-9._-]/g, '')}`;
      await writeFile(join(extractDir, htmlFilename), srcBuffer);
      sourceCodeUrl = `/uploads/templates/source/${folderName}/${htmlFilename}`;
    }

    // ── Save to DB ────────────────────────────────────────────────────────────
    const newTemplate = new Template({
      templateName,
      price:    Number(price.replace(/[^0-9]/g, '')) || 0,
      discount: Number(discount) || 0,
      enableWaBlast,
      guestListOnly,
      dailyLimit:         Number(dailyLimit) || 100,
      publishImmediately,
      sourceCodeUrl,
      thumbnailUrl,
    });

    await newTemplate.save();

    return NextResponse.json(
      { success: true, message: 'Template saved successfully', template: newTemplate },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[API/templates POST] Error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Template ID wajib diisi' }, { status: 400 });
    }

    await connectToDatabase();

    const template = await Template.findByIdAndDelete(id);
    if (!template) {
      return NextResponse.json({ success: false, error: 'Template tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Template berhasil dihapus' });
  } catch (error: any) {
    console.error('[API/templates DELETE] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Template ID wajib diisi' }, { status: 400 });
    }

    const body = await req.json();
    
    await connectToDatabase();

    const template = await Template.findByIdAndUpdate(
      id,
      { $set: { showOnLanding: body.showOnLanding } },
      { new: true }
    );

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status template berhasil diupdate', template });
  } catch (error: any) {
    console.error('[API/templates PATCH] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
