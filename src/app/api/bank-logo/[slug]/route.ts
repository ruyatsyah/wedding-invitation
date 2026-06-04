import { NextRequest, NextResponse } from 'next/server';

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/idn-finlogos/dist/icons';

// Cache di server selama 7 hari
export const revalidate = 604800;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Sanitize slug - only allow safe characters
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const res = await fetch(`${CDN_BASE}/${slug}.svg`, {
      next: { revalidate: 604800 },
    });

    if (!res.ok) {
      return new NextResponse(null, { status: 404 });
    }

    const svg = await res.text();

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
