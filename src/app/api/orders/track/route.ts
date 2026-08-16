import { NextRequest, NextResponse } from 'next/server';
import { db, orders } from '@/db';
import { eq, and } from 'drizzle-orm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/orders/track?orderNumber=xxx&phone=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');
    const phone = searchParams.get('phone');

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: 'يجب توفير رقم الطلب ورقم الهاتف' },
        { status: 400 }
      );
    }

    const order = await db.query.orders.findFirst({
      where: and(
        eq(orders.orderNumber, orderNumber),
        eq(orders.customerPhone, phone)
      ),
      with: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود أو رقم الهاتف غير صحيح' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error tracking order:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تتبع الطلب' },
      { status: 500 }
    );
  }
}
