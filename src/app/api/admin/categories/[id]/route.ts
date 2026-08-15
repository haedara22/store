import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, categories } from '@/db';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

// GET /api/admin/categories/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;

    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!category) {
      return NextResponse.json(
        { error: 'التصنيف غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب التصنيف' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/categories/[id]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;
    const body: any = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'الاسم والرابط المختصر مطلوبان' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!category) {
      return NextResponse.json(
        { error: 'التصنيف غير موجود' },
        { status: 404 }
      );
    }

    // Check if slug is unique (excluding current category)
    const existingCategory = await db.query.categories.findFirst({
      where: (categories, { and, eq, ne }) => and(
        eq(categories.slug, slug),
        ne(categories.id, id)
      ),
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'الرابط المختصر مستخدم بالفعل' },
        { status: 400 }
      );
    }

    // Update category
    const [updatedCategory] = await db
      .update(categories)
      .set({
        name,
        slug,
        description: description || null,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      category: updatedCategory,
      message: 'تم تحديث التصنيف بنجاح',
    });
  } catch (error) {
    console.error('Error updating category:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث التصنيف' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/categories/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;

    // Check if category exists
    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!category) {
      return NextResponse.json(
        { error: 'التصنيف غير موجود' },
        { status: 404 }
      );
    }

    // Delete category (will fail if products exist due to foreign key)
    await db.delete(categories).where(eq(categories.id, id));

    return NextResponse.json({
      success: true,
      message: 'تم حذف التصنيف بنجاح',
    });
  } catch (error) {
    console.error('Error deleting category:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'غير مصرح' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف التصنيف. تأكد من عدم وجود منتجات في هذا التصنيف.' },
      { status: 500 }
    );
  }
}
