import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// تكامل مع Cloudflare Images
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'لم يتم رفع ملف' },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'حجم الملف يجب أن يكون أقل من 5 ميجابايت' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'نوع الملف غير مدعوم. يُسمح فقط بـ JPG, PNG, WEBP' },
        { status: 400 }
      );
    }

    // استخدام Cloudflare Images إذا كان متاحًا
    const env = process.env as any;
    if (env.IMAGES && env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_API_TOKEN) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('file', file);

        const response = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
            },
            body: imageFormData,
          }
        );

        const result = await response.json() as any;

        if (result.success && result.result) {
          return NextResponse.json({
            url: result.result.variants[0], // الصورة المحسّنة
            id: result.result.id,
            message: 'تم رفع الصورة بنجاح إلى Cloudflare Images',
          });
        }
      } catch (cloudflareError) {
        console.error('Cloudflare Images error:', cloudflareError);
        // سنستمر في استخدام الطريقة البديلة
      }
    }

    // طريقة بديلة: حفظ في KV أو إرجاع data URL مؤقت
    const fileId = nanoid(10);
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${fileId}.${fileExtension}`;

    // تحويل الملف إلى ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // محاولة حفظ في KV إذا كان متاحًا
    if (env.IMAGES) {
      try {
        const base64 = btoa(String.fromCharCode(...buffer));
        await env.IMAGES.put(`images/${fileName}`, base64, {
          metadata: {
            contentType: file.type,
            size: file.size,
            uploadedAt: new Date().toISOString(),
          },
        });

        return NextResponse.json({
          url: `/api/images/${fileName}`,
          id: fileName,
          message: 'تم رفع الصورة بنجاح',
        });
      } catch (kvError) {
        console.error('KV storage error:', kvError);
      }
    }

    // آخر خيار: إرجاع data URL (للتطوير المحلي فقط)
    const base64 = btoa(String.fromCharCode(...buffer));
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      url: dataUrl,
      id: fileName,
      message: 'تم رفع الصورة بنجاح (مؤقتًا)',
      warning: 'يُستخدم data URL مؤقتًا. قم بإعداد Cloudflare Images أو R2 للإنتاج',
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء رفع الملف' },
      { status: 500 }
    );
  }
}
