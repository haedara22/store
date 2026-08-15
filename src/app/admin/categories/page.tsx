import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { db, categories, products } from '@/db';
import { desc, eq, count } from 'drizzle-orm';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageContainer, PageContent, Section } from '@/components/admin/PageContainer';
import { UnifiedPageHeader, HeaderStats, HeaderStatCard } from '@/components/admin/UnifiedPageHeader';
import { UnifiedEmptyState } from '@/components/admin/UnifiedEmptyState';
import { Card } from '@/components/ui/Card';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function getCategoriesWithCounts() {
  try {
    const categoriesData = await db.query.categories.findMany({
      orderBy: [desc(categories.createdAt)],
    }).catch((err) => {
      console.error('Database connection error:', err);
      throw new Error('تعذر الاتصال بقاعدة البيانات.');
    });

    const categoriesWithCounts = await Promise.all(
      categoriesData.map(async (category) => {
        try {
          const productCount = await db
            .select({ count: count() })
            .from(products)
            .where(eq(products.categoryId, category.id));

          return {
            ...category,
            productCount: productCount[0]?.count || 0,
          };
        } catch (error) {
          console.error(`Error counting products for category ${category.id}:`, error);
          return {
            ...category,
            productCount: 0,
          };
        }
      })
    );

    return categoriesWithCounts;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const categoriesData = await getCategoriesWithCounts();

  // حساب الإحصائيات
  const totalProducts = categoriesData.reduce((sum, cat) => sum + cat.productCount, 0);
  const activeCategories = categoriesData.filter(cat => cat.productCount > 0).length;
  const emptyCategories = categoriesData.filter(cat => cat.productCount === 0).length;

  return (
    <AdminLayout>
      <PageContainer maxWidth="xl">
        <PageContent spacing="md" className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          
          {/* Page Header with Stats - Compact */}
          <Section className="mb-3 sm:mb-4">
            <UnifiedPageHeader
              title="إدارة التصنيفات"
              description={`${categoriesData.length} تصنيف`}
              icon="🏷️"
              actions={[
                {
                  label: 'تصنيف جديد',
                  href: '/admin/categories/new',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  ),
                  variant: 'primary',
                },
              ]}
              stats={
                categoriesData.length > 0 ? (
                  <HeaderStats>
                    <HeaderStatCard
                      label="المنتجات"
                      value={totalProducts}
                      icon="📦"
                      color="blue"
                    />
                    <HeaderStatCard
                      label="نشطة"
                      value={activeCategories}
                      icon="✅"
                      color="green"
                    />
                    <HeaderStatCard
                      label="فارغة"
                      value={emptyCategories}
                      icon="📭"
                      color="amber"
                    />
                  </HeaderStats>
                ) : undefined
              }
            />
          </Section>

          {/* Categories List Section - Compact */}
          <Section>
            {categoriesData.length === 0 ? (
              <UnifiedEmptyState
                icon="🏷️"
                title="لا توجد تصنيفات"
                description="ابدأ بإضافة أول تصنيف لتنظيم منتجاتك"
                action={{
                  label: 'إضافة تصنيف جديد',
                  href: '/admin/categories/new',
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3 auto-rows-fr">
                {categoriesData.map((category) => (
                  <Card 
                    key={category.id} 
                    hoverable
                    padding="sm"
                    radius="md"
                    className="group relative overflow-hidden h-full flex flex-col border border-zinc-200/60 hover:border-orange-300/50 transition-all duration-200 hover:shadow-md"
                  >
                    {/* Decorative Background - Subtle */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-50/30 to-transparent rounded-full blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex flex-col h-full p-2.5 sm:p-3 space-y-2.5">
                      
                      {/* Header Section */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center text-sm flex-shrink-0 shadow-sm shadow-orange-500/15 group-hover:scale-105 transition-transform duration-200">
                          🏷️
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-zinc-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors duration-200">
                            {category.name}
                          </h3>

                          {category.description ? (
                            <p className="text-[10px] text-zinc-500 line-clamp-1 leading-relaxed mt-0.5">
                              {category.description}
                            </p>
                          ) : (
                            <p className="text-[10px] text-zinc-400 italic mt-0.5">
                              لا يوجد وصف
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-zinc-200/70 to-transparent" />

                      {/* Stats Section */}
                      <div className="space-y-2 flex-grow">
                        {/* Product Count */}
                        <div className="flex items-center justify-center">
                          <span className={`inline-flex items-center justify-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-md border w-full transition-all duration-200 ${category.productCount > 0 ? 'bg-blue-50/60 text-blue-700 border-blue-200/50 hover:bg-blue-100/60' : 'bg-zinc-50 text-zinc-600 border-zinc-200/50 hover:bg-zinc-100'}`}>
                            <span className="text-xs">
                              {category.productCount > 0 ? '📦' : '📭'}
                            </span>
                            <span className="tabular-nums">
                              {category.productCount} منتج
                            </span>
                          </span>
                        </div>

                        {/* Slug */}
                        {category.slug && (
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50/60 rounded-md border border-zinc-200/50 hover:bg-zinc-100/60 transition-colors duration-200">
                            <span className="text-[9px] font-semibold text-zinc-500 flex-shrink-0">
                              الرابط:
                            </span>
                            <code className="text-[9px] font-mono text-zinc-700 truncate flex-1" dir="ltr">
                              /{category.slug}
                            </code>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons - Compact */}
                      <div className="flex gap-1.5 pt-1.5 mt-auto">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="flex-1 h-7 sm:h-8 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-[10px] rounded-md transition-all duration-200 shadow-sm shadow-blue-500/15 hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 flex items-center justify-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>تعديل</span>
                        </Link>

                        <Link
                          href={`/products?category=${category.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-7 sm:h-8 px-2.5 bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-700 hover:text-zinc-900 font-semibold text-[10px] rounded-md transition-all duration-200 border border-zinc-300/70 hover:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:ring-offset-1 flex items-center justify-center gap-1 group/btn"
                        >
                          <svg className="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="hidden sm:inline">عرض</span>
                        </Link>
                      </div>
                      
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>

        </PageContent>
      </PageContainer>
    </AdminLayout>
  );
}