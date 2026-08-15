import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, products, productImages } from '@/db';
import { generateId } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

// POST /api/admin/products
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    await requireAuth();

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

    // Check if slug is unique
    const existingProduct = await db.query.products.findFirst({
      where: eq(products.slug, slug),
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'الرابط المختصر مستخدم بالفعل' },
        { status: 400 }
      );
    }

    // Create product
    const productId = generateId('prod');
    const [newProduct] = await db
      .insert(products)
      .values({
        id: productId,
        name,
        slug,
        description,
        price: parseInt(price),
        compareAtPrice: compareAtPrice ? parseInt(compareAtPrice) : null,
        categoryId,
        stock: parseInt(stock || 0),
        specifications: specifications || null,
        featured: featured || false,
      })
      .returning();

    // إضافة الصور إذا كانت موجودة
    if (images && Array.isArray(images) && images.length > 0) {
      const imageRecords = images.map((url: string, index: number) => ({
        id: generateId('img'),
        productId: productId,
        url: url,
        alt: `${name} - صورة ${index + 1}`,
        order: index,
      }));

      await db.insert(productImages).values(imageRecords);
    }

    // جلب المنتج مع الصور
    const productWithImages = await db.query.products.findFirst({
      where: eq(products.id, productId),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      product: productWithImages,
      message: 'تم إنشاء المنتج بنجاح',
    });
  } catch (error) {
    console.error('Error creating product:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء المنتج' },
      { status: 500 }
    );
  }
}

// GET /api/admin/products
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    await requireAuth();

    const productsData = await db.query.products.findMany({
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
        variants: true,
      },
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Error fetching products:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب المنتجات' },
      { status: 500 }
    );
  }
}
