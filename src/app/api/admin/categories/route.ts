import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, categories } from '@/db';
import { generateId } from '@/lib/utils';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/admin/categories
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body: any = await request.json();
    const { name, slug, description, image } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'الاسم والرابط المختصر مطلوبان' },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, slug),
    });

    if (existing) {
      return NextResponse.json(
        { error: 'الرابط المختصر مستخدم بالفعل' },
        { status: 400 }
      );
    }

    const [category] = await db
      .insert(categories)
      .values({
        id: generateId('cat'),
        name,
        slug,
        description: description || null,
        image: image || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      category,
      message: 'تم إنشاء التصنيف بنجاح',
    });
  } catch (error) {
    console.error('Error creating category:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء التصنيف' },
      { status: 500 }
    );
  }
}

// GET /api/admin/categories
export async function GET() {
  try {
    await requireAuth();

    const categoriesData = await db.query.categories.findMany({
      orderBy: (categories, { asc }) => [asc(categories.name)],
    });

    return NextResponse.json(categoriesData);
  } catch (error) {
    console.error('Error fetching categories:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب التصنيفات' },
      { status: 500 }
    );
  }
}
