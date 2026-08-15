import { NextRequest, NextResponse } from 'next/server';
import { db, orders, orderItems } from '@/db';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { generateOrderNumber } from '@/lib/utils';

export const runtime = 'edge';

// GET /api/orders?orderId=xxx or ?orderNumber=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const orderNumber = searchParams.get('orderNumber');

    if (!orderId && !orderNumber) {
      return NextResponse.json(
        { error: 'يجب توفير رقم الطلب' },
        { status: 400 }
      );
    }

    let order;
    if (orderId) {
      order = await db.query.orders.findFirst({
        where: eq(orders.id, orderId),
        with: {
          items: true,
        },
      });
    } else if (orderNumber) {
      order = await db.query.orders.findFirst({
        where: eq(orders.orderNumber, orderNumber),
        with: {
          items: true,
        },
      });
    }

    if (!order) {
      return NextResponse.json(
        { error: 'الطلب غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الطلب' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      customerName: string;
      customerPhone: string;
      governorate: string;
      area: string;
      address: string;
      notes?: string;
      paymentMethod: string;
      paymentProofUrl?: string;
      items: Array<{
        productId: string;
        productName: string;
        price: number;
        quantity: number;
      }>;
      subtotal: number;
      total: number;
    };
    
    const {
      customerName,
      customerPhone,
      governorate,
      area,
      address,
      notes,
      paymentMethod,
      paymentProofUrl,
      items,
      subtotal,
      total,
    } = body;

    // Validation
    if (!customerName || !customerPhone || !governorate || !area || !address) {
      return NextResponse.json(
        { error: 'معلومات العميل ناقصة' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'لا توجد منتجات في الطلب' },
        { status: 400 }
      );
    }

    // Create order
    const orderId = nanoid();
    const orderNumber = generateOrderNumber();

    const paymentStatus = paymentMethod === 'shamcash' && paymentProofUrl 
      ? 'payment_verification' 
      : paymentMethod === 'shamcash' 
      ? 'awaiting_payment' 
      : 'pending';

    const orderStatus = paymentMethod === 'shamcash' && paymentProofUrl
      ? 'payment_verification'
      : paymentMethod === 'shamcash'
      ? 'awaiting_payment'
      : 'pending';

    await db.insert(orders).values({
      id: orderId,
      orderNumber,
      customerName,
      customerPhone,
      governorate,
      area,
      address,
      notes: notes || null,
      paymentMethod,
      paymentStatus,
      paymentProofUrl: paymentProofUrl || null,
      status: orderStatus,
      subtotal,
      total,
    });

    // Create order items
    for (const item of items) {
      await db.insert(orderItems).values({
        id: nanoid(),
        orderId,
        productId: item.productId,
        productName: item.productName,
        productPrice: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      });
    }

    return NextResponse.json({ 
      id: orderId,
      orderNumber,
      message: 'تم إنشاء الطلب بنجاح' 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الطلب' },
      { status: 500 }
    );
  }
}
