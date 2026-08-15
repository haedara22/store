import { NextRequest, NextResponse } from 'next/server';
import { db, products } from '@/db';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المنتج' },
      { status: 500 }
    );
  }
}
