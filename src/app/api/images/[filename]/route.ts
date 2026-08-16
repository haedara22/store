import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ filename: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { filename } = await context.params;

    if (!filename) {
      return new NextResponse('اسم الملف مطلوب', { status: 400 });
    }

    const env = process.env as any;

    // محاولة قراءة من KV
    if (env.IMAGES) {
      const imageData = await env.IMAGES.get(`images/${filename}`, {
        type: 'text',
        cacheTtl: 86400, // Cache for 24 hours
      });

      if (imageData) {
        const metadata = await env.IMAGES.getWithMetadata(`images/${filename}`);
        const contentType = metadata?.metadata?.contentType || 'image/jpeg';

        // تحويل base64 إلى binary
        const binaryString = atob(imageData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        return new NextResponse(bytes, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    return new NextResponse('الصورة غير موجودة', { status: 404 });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('خطأ في تحميل الصورة', { status: 500 });
  }
}
