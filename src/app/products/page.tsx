import { Suspense } from 'react';
import Link from 'next/link';
import { db, products, categories } from '@/db';
import { eq, desc, asc, like, and, sql } from 'drizzle-orm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductsFilter } from '@/components/products/ProductsFilter';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

interface SearchParams {
  search?: string;
  category?: string;
  sort?: string;
  featured?: string;
  minPrice?: string;
  maxPrice?: string;
}

async function getProducts(searchParams: SearchParams) {
  try {
    const conditions = [];
    
    if (searchParams.search) {
      conditions.push(like(products.name, `%${searchParams.search}%`));
    }
    
    if (searchParams.category) {
      const category = await db.query.categories.findFirst({
        where: eq(categories.slug, searchParams.category),
      });
      if (category) {
        conditions.push(eq(products.categoryId, category.id));
      }
    }
    
    if (searchParams.featured === 'true') {
      conditions.push(eq(products.featured, true));
    }
    
    if (searchParams.minPrice) {
      conditions.push(sql`${products.price} >= ${parseInt(searchParams.minPrice)}`);
    }
    if (searchParams.maxPrice) {
      conditions.push(sql`${products.price} <= ${parseInt(searchParams.maxPrice)}`);
    }

    let orderBy;
    switch (searchParams.sort) {
      case 'price-asc':
        orderBy = [asc(products.price)];
        break;
      case 'price-desc':
        orderBy = [desc(products.price)];
        break;
      case 'newest':
        orderBy = [desc(products.createdAt)];
        break;
      case 'oldest':
        orderBy = [asc(products.createdAt)];
        break;
      default:
        orderBy = [desc(products.createdAt)];
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    return await db.query.products.findMany({
      where,
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
      orderBy,
      limit: 50,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await db.query.categories.findMany({
      orderBy: [asc(categories.name)],
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  
  const [productsData, categoriesData] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ]);

  const hasActiveFilters = 
    searchParams.search || 
    searchParams.category || 
    searchParams.featured || 
    searchParams.minPrice || 
    searchParams.maxPrice;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans dir-rtl flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-orange-50/20 via-white to-orange-50/10 relative overflow-hidden py-6 sm:py-8 lg:py-10">
        {/* Background - Subtle */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange-300/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
          
          {/* Breadcrumb & Top Banner - Compact */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-sm mb-6 relative overflow-hidden border border-orange-100/40">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <div>
                <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 mb-1.5 font-medium">
                  <Link href="/" className="hover:text-orange-600 transition-colors">الرئيسية</Link>
                  <span>/</span>
                  <span className="text-zinc-900 font-semibold">المتجر</span>
                </nav>

                <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
                  {searchParams.search ? (
                    <span className="flex items-center gap-1.5 flex-wrap">
                      <span>نتائج بحث:</span>
                      <span className="text-orange-600">"{searchParams.search}"</span>
                    </span>
                  ) : (
                    'جميع المنتجات'
                  )}
                </h1>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 text-white shadow-sm shadow-orange-500/20 self-start sm:self-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-wide">
                  {productsData.length} منتج
                </span>
              </div>
            </div>

            {/* Active Filters - Compact */}
            {hasActiveFilters && (
              <div className="mt-3 pt-3 border-t border-zinc-200/60 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-zinc-500 font-semibold text-[10px]">الفلاتر:</span>
                
                {searchParams.search && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-semibold">
                    بحث: {searchParams.search}
                  </span>
                )}
                {searchParams.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200 text-[10px] font-semibold">
                    {searchParams.category}
                  </span>
                )}
                {searchParams.featured === 'true' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-500 text-white text-[10px] font-semibold shadow-sm">
                    ⭐ مميز
                  </span>
                )}

                <Link 
                  href="/products" 
                  className="text-[10px] font-bold text-red-500 hover:text-red-600 hover:underline mr-auto transition-colors"
                >
                  إلغاء الكل ✕
                </Link>
              </div>
            )}
          </div>

          {/* Main Content - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
            
            {/* Sidebar Filters - Compact */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 bg-white/70 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 shadow-sm border border-orange-100/40">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-200/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🎛️</span>
                    <h2 className="font-bold text-sm text-zinc-950">تصفية</h2>
                  </div>
                </div>

                <ProductsFilter 
                  categories={categoriesData}
                  currentParams={searchParams}
                />
              </div>
            </aside>

            {/* Products Grid - Compact */}
            <div className="lg:col-span-3">
              {productsData.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                  {productsData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* Empty State - Compact */
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 sm:p-10 text-center shadow-sm border border-orange-100/40 my-3">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-100 border border-orange-200/60 flex items-center justify-center text-3xl shadow-inner">
                    🔍
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 mb-2">
                    لم نجد نتائج
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mb-5 leading-relaxed">
                    لا توجد منتجات تطابق الفلترة المحددة
                  </p>
                  
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-sm shadow-orange-500/20 hover:scale-[1.02]"
                  >
                    <span>عرض الكل</span>
                    <svg className="w-3.5 h-3.5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}