import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { db, products } from '@/db';
import { desc, eq } from 'drizzle-orm';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  try {
    return await db.query.products.findMany({
      where: eq(products.featured, true),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)], limit: 1 },
        category: true,
      },
      orderBy: [desc(products.createdAt)],
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getAllProducts() {
  try {
    return await db.query.products.findMany({
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)], limit: 1 },
        category: true,
      },
      orderBy: [desc(products.createdAt)],
      limit: 50,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function HomepageManagementPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const [featuredProducts, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
  ]);

  return (
    <AdminLayout>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="space-y-4 sm:space-y-5">
          
          {/* Header - Compact */}
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
              إدارة محتوى الصفحة الرئيسية
            </h1>
            <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-0.5">
              إدارة المنتجات المميزة التي تظهر في الصفحة الرئيسية
            </p>
          </div>

          {/* Featured Products Section - Compact */}
          <Card padding="md" radius="md" className="shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                المنتجات المميزة ⭐
              </h2>
              <span className="text-[10px] sm:text-xs font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-md">
                {featuredProducts.length} منتج
              </span>
            </div>

            {featuredProducts.length === 0 ? (
              <div className="text-center py-8 sm:py-10 bg-zinc-50 rounded-lg">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="text-sm font-bold text-zinc-900 mb-1.5">
                  لا توجد منتجات مميزة
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-600 mb-4">
                  قم بتحديد المنتجات المميزة من القائمة أدناه
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-gradient-to-br from-orange-50 to-orange-100/70 rounded-lg border border-orange-200/70"
                  >
                    <div className="relative w-full h-24 sm:h-28 bg-white rounded-md mb-2.5">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-contain p-1.5"
                          sizes="200px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          📦
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm text-zinc-900 mb-1.5 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    <div className="text-base font-bold text-orange-600 mb-2.5">
                      {formatCurrency(product.price)}
                    </div>

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="block w-full px-3 py-1.5 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold text-[10px] sm:text-xs rounded-md transition-colors text-center border border-zinc-200"
                    >
                      تعديل
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* All Products - Quick Toggle - Compact */}
          <Card padding="md" radius="md" className="shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                جميع المنتجات
              </h2>
              <Link
                href="/admin/products"
                className="text-[10px] sm:text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                إدارة المنتجات →
              </Link>
            </div>

            <div className="bg-orange-50 border border-orange-200/70 rounded-lg p-2.5 sm:p-3 mb-4">
              <p className="text-[10px] sm:text-xs text-orange-900 font-medium">
                💡 <strong>نصيحة:</strong> لتحديد منتج كـ "مميز"، اذهب إلى صفحة تعديل المنتج وقم بتفعيل خيار "منتج مميز"
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {allProducts.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className={`p-2.5 rounded-lg border ${
                    product.featured
                      ? 'bg-orange-50/60 border-orange-200/70'
                      : 'bg-zinc-50/60 border-zinc-200/70'
                  }`}
                >
                  <div className="relative w-full h-16 sm:h-20 bg-white rounded-md mb-2">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="150px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        📦
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-0.5 right-0.5 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                        ⭐
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-[10px] sm:text-xs text-zinc-900 mb-1.5 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>

                  <div className="text-[10px] sm:text-xs font-bold text-zinc-700 mb-2">
                    {formatCurrency(product.price)}
                  </div>

                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="block w-full px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-semibold rounded-md transition-colors text-center"
                  >
                    تعديل
                  </Link>
                </div>
              ))}
            </div>

            {allProducts.length > 8 && (
              <div className="mt-4 text-center">
                <Link
                  href="/admin/products"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[10px] sm:text-xs rounded-lg transition-all shadow-sm"
                >
                  عرض جميع المنتجات ({allProducts.length}) →
                </Link>
              </div>
            )}
          </Card>

          {/* Preview Link - Compact */}
          <Card padding="md" radius="md" className="bg-gradient-to-br from-green-50 to-green-100/60 border-green-200/70 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-green-900 mb-1">
                  معاينة الصفحة الرئيسية
                </h3>
                <p className="text-[10px] sm:text-xs text-green-800">
                  شاهد كيف تبدو للزوار
                </p>
              </div>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-[10px] sm:text-xs rounded-lg transition-all shadow-sm"
              >
                <span>معاينة</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}