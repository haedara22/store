import { NextResponse } from 'next/server';
import { db } from '@/db';

export const runtime = 'edge';

// GET /api/settings - Public endpoint for site settings
export async function GET() {
  try {
    const settings = await db.query.storeSettings.findFirst();

    // Return only public information
    return NextResponse.json({
      storeName: settings?.storeName || 'متجر الحامد',
      phone: settings?.phone || '09XX XXX XXX',
      whatsapp: settings?.whatsapp || '963900000000',
      address: settings?.address || 'سوريا - دمشق',
      workingHours: settings?.workingHours || '',
      heroProductId: settings?.heroProductId || null,
      facebook: settings?.facebook || '',
      instagram: settings?.instagram || '',
      twitter: settings?.twitter || '',
      tiktok: settings?.tiktok || '',
      youtube: settings?.youtube || '',
      telegram: settings?.telegram || '',
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    
    // Return default values on error
    return NextResponse.json({
      storeName: 'متجر الحامد',
      phone: '09XX XXX XXX',
      whatsapp: '963900000000',
      address: 'سوريا - دمشق',
      workingHours: '',
      heroProductId: null,
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      youtube: '',
      telegram: '',
    });
  }
}
