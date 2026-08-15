import { NextResponse } from 'next/server';
import { logoutAdmin } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST() {
  try {
    await logoutAdmin();

    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح',
    });
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تسجيل الخروج' },
      { status: 500 }
    );
  }
}
