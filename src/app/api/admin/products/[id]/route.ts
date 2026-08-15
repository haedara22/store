import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, products, productImages, productVariants } from '@/db';
import { generateId } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

// DELETE /api/admin/products/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await context.params;

    // Check if product exists
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!product) {
      return NextResponse.json(
        { error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    // Delete product (cascade will delete images and variants)
    await db.delete(products).where(eq(products.id, id));

    return NextResponse.json({
      success: true,
      message: 'تم حذف المنتج بنجاح',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المنتج' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/[id]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await context.params;
    const body: any = await request.json();

    const {
      name,
      slug,
      description,
      price,
      compareAtPrice,
      categoryId,
      stock,
      specifications,
      featured,
      images,
    } = body;

    // Validate required fields
    if (!name || !slug || !description || price === undefined || !categoryId) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة يجب أن تكون مملوءة' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });

    if (!product) {
      return NextResponse.json(
        { error: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    // Check if slug is unique (excluding current product)
    const existingProduct = await db.query.products.findFirst({
      where: (products, { and, eq, ne }) => and(
        eq(products.slug, slug),
        ne(products.id, id)
      ),
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'الرابط المختصر مستخدم بالفعل' },
        { status: 400 }
      );
    }

    // Update product
    const [updatedProduct] = await db
      .update(products)
      .set({
        name,
        slug,
        description,
        price: parseInt(price),
        compareAtPrice: compareAtPrice ? parseInt(compareAtPrice) : null,
        categoryId,
        stock: parseInt(stock || 0),
        specifications: specifications || null,
        featured: featured || false,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    // تحديث الصور إذا كانت موجودة
    if (images && Array.isArray(images)) {
      // حذف الصور القديمة
      await db.delete(productImages).where(eq(productImages.productId, id));

      // إضافة الصور الجديدة
      if (images.length > 0) {
        const imageRecords = images.map((url: string, index: number) => ({
          id: generateId('img'),
          productId: id,
          url: url,
          alt: `${name} - صورة ${index + 1}`,
          order: index,
        }));

        await db.insert(productImages).values(imageRecords);
      }
    }

    // جلب المنتج المحدث مع الصور
    const productWithImages = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      product: productWithImages,
      message: 'تم تحديث المنتج بنجاح',
    });
  } catch (error) {
    console.error('Error updating product:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المنتج' },
      { status: 500 }
    );
  }
}

// GET /api/admin/products/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await context.params;

    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        variants: true,
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

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المنتج' },
      { status: 500 }
    );
  }
}
