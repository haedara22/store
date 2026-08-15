import { NextResponse } from 'next/server';
import { db, storeSettings } from '@/db';

export const runtime = 'edge';

export async function GET() {
  try {
    const settings = await db.query.storeSettings.findFirst();
    
    if (!settings) {
      return NextResponse.json({
        accountName: 'الحامد للتجارة',
        accountNumber: '09XX XXX XXX',
        qrCode: null,
      });
    }

    return NextResponse.json({
      accountName: settings.shamcashAccountName || 'الحامد للتجارة',
      accountNumber: settings.shamcashAccountNumber || '09XX XXX XXX',
      qrCode: settings.shamcashQrCode || null,
    });
  } catch (error) {
    console.error('Error fetching ShamCash settings:', error);
    return NextResponse.json({
      accountName: 'الحامد للتجارة',
      accountNumber: '09XX XXX XXX',
      qrCode: null,
    });
  }
}
