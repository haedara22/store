import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, storeSettings } from '@/db';
import { generateId } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

// GET /api/admin/settings
export async function GET() {
  try {
    await requireAuth();

    const settings = await db.query.storeSettings.findFirst();

    return NextResponse.json(settings || {});
  } catch (error) {
    console.error('Error fetching settings:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الإعدادات' },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body: any = await request.json();

    const {
      storeName,
      phone,
      whatsapp,
      address,
      workingHours,
      heroProductId,
      shamcashAccountName,
      shamcashAccountNumber,
      shamcashQrCode,
      facebook,
      instagram,
      twitter,
      tiktok,
      youtube,
      telegram,
    } = body; 

    // Check if settings exist
    const existingSettings = await db.query.storeSettings.findFirst();

    if (existingSettings) {
      // Update existing settings
      const [updated] = await db
        .update(storeSettings)
        .set({
          storeName,
          phone,
          whatsapp,
          address,
          workingHours: workingHours || null,
          heroProductId: heroProductId || null,
          shamcashAccountName: shamcashAccountName || null,
          shamcashAccountNumber: shamcashAccountNumber || null,
          shamcashQrCode: shamcashQrCode || null,
          facebook: facebook || null,
          instagram: instagram || null,
          twitter: twitter || null,
          tiktok: tiktok || null,
          youtube: youtube || null,
          telegram: telegram || null,
          updatedAt: new Date(),
        })
        .where(eq(storeSettings.id, existingSettings.id))
        .returning();

      return NextResponse.json({
        success: true,
        settings: updated,
        message: 'تم تحديث الإعدادات بنجاح',
      });
    } else {
      // Create new settings
      const [created] = await db
        .insert(storeSettings)
        .values({
          id: generateId('settings'),
          storeName,
          phone,
          whatsapp,
          address,
          workingHours: workingHours || null,
          heroProductId: heroProductId || null,
          shamcashAccountName: shamcashAccountName || null,
          shamcashAccountNumber: shamcashAccountNumber || null,
          shamcashQrCode: shamcashQrCode || null,
          facebook: facebook || null,
          instagram: instagram || null,
          twitter: twitter || null,
          tiktok: tiktok || null,
          youtube: youtube || null,
          telegram: telegram || null,
        })
        .returning();

      return NextResponse.json({
        success: true,
        settings: created,
        message: 'تم إنشاء الإعدادات بنجاح',
      });
    }
  } catch (error) {
    console.error('Error saving settings:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء حفظ الإعدادات' },
      { status: 500 }
    );
  }
}
