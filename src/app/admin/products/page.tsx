import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { db, products } from '@/db';
import { desc, like, eq, and } from 'drizzle-orm';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageContainer, PageContent, Section } from '@/components/admin/PageContainer';
import { UnifiedPageHeader } from '@/components/admin/UnifiedPageHeader';
import { UnifiedFilterBar, FilterInput, FilterSelect, FilterActions, FilterButton, SearchIcon } from '@/components/admin/UnifiedFilterBar';
import { UnifiedEmptyState, SearchEmptyState } from '@/components/admin/UnifiedEmptyState';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { DeleteProductButton } from '@/components/admin/DeleteProductButton';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SearchParams {
  search?: string;
  category?: string;
}

async function getProducts(searchParams: SearchParams) {
  try {
    const conditions = [];

    if (searchParams.search) {
      conditions.push(like(products.name, `%${searchParams.search}%`));
    }

    if (searchParams.category) {
      conditions.push(eq(products.categoryId, searchParams.category));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    return await db.query.products.findMany({
      where,
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)], limit: 1 },
        category: true,
      },
      orderBy: [desc(products.createdAt)],
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await db.query.categories.findMany({
      orderBy: (categories, { asc }) => [asc(categories.name)],
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function AdminProductsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const [productsData, categoriesData] = await Promise.all([
    getProducts(searchParams),
    getCategories(),
  ]);

  // تحضير خيارات التصنيفات
  const categoryOptions = [
    { value: '', label: 'كل التصنيفات' },
    ...categoriesData.map(cat => ({ value: cat.id, label: cat.name }))
  ];

  const hasFilters = searchParams.search || searchParams.category;

  return (
    <AdminLayout>
      <PageContainer maxWidth="xl">
        <PageContent spacing="md" className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          
          {/* Page Header */}
          <Section className="mb-5 sm:mb-6">
            <UnifiedPageHeader
              title="إدارة المنتجات"
              description={`${productsData.length} منتج`}
              icon="📦"
              actions={[
                {
                  label: 'منتج جديد',
                  href: '/admin/products/new',
                  icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  ),
                  variant: 'primary',
                },
              ]}
              breadcrumbs={[
                { label: 'لوحة التحكم', href: '/admin/dashboard' },
                { label: 'المنتجات' },
              ]}
            />
          </Section>

          {/* Filter Section */}
          <Section className="mb-5 sm:mb-6">
            <UnifiedFilterBar>
              <FilterInput
                label="البحث عن منتج"
                name="search"
                placeholder="ابحث بالاسم..."
                defaultValue={searchParams.search}
                icon={<SearchIcon />}
              />

              <FilterSelect
                label="التصنيف"
                name="category"
                options={categoryOptions}
                defaultValue={searchParams.category}
              />

              <FilterActions>
                <FilterButton type="submit" variant="primary">
                  <SearchIcon />
                  <span>بحث</span>
                </FilterButton>

                {hasFilters && (
                  <Link href="/admin/products">
                    <FilterButton variant="secondary">
                      إلغاء
                    </FilterButton>
                  </Link>
                )}
              </FilterActions>
            </UnifiedFilterBar>
          </Section>

          {/* Products Grid Section */}
          <Section>
            {productsData.length === 0 ? (
              hasFilters ? (
                <SearchEmptyState
                  searchTerm={searchParams.search}
                  onClearSearch={() => {}}
                />
              ) : (
                <UnifiedEmptyState
                  icon="📦"
                  title="لا توجد منتجات"
                  description="ابدأ بإضافة أول منتج لك الآن"
                  action={{
                    label: 'إضافة منتج جديد',
                    href: '/admin/products/new',
                  }}
                />
              )
            ) : (
              <div className="grid gap-2.5 sm:gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productsData.map((product) => (
                  <Card
                    key={product.id}
                    hoverable
                    padding="sm"
                    radius="md"
                    className="group overflow-hidden border border-zinc-200/70 hover:border-orange-300/60 shadow-sm hover:shadow-md"
                  >
                    {/* Product Image - Compact */}
                    <Link href={`/admin/products/${product.id}/edit`} className="block">
                      <div className="relative aspect-square w-full bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-t-lg overflow-hidden">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl opacity-20 group-hover:opacity-30 transition-opacity">
                            📦
                          </div>
                        )}
                        {product.featured && (
                          <div className="absolute left-2 top-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-2 py-0.5 text-[8px] font-bold text-white shadow-sm">
                            ⭐ مميز
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info - Compact */}
                    <div className="p-2.5 sm:p-3 space-y-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="block text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 leading-snug transition-colors hover:text-orange-600"
                      >
                        {product.name}
                      </Link>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="primary" className="text-[9px] sm:text-[10px] px-1.5 py-0.5">
                          {product.category?.name || 'بدون تصنيف'}
                        </Badge>
                        <Badge
                          variant={
                            product.stock === 0
                              ? 'danger'
                              : product.stock <= 5
                              ? 'warning'
                              : 'success'
                          }
                          className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5"
                        >
                          {product.stock === 0
                            ? '❌ نفد'
                            : `✓ ${product.stock}`}
                        </Badge>
                      </div>

                      <div>
                        <div className="text-base sm:text-lg font-bold text-zinc-900 tabular-nums">
                          {formatCurrency(product.price)}
                        </div>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] sm:text-[10px] text-zinc-500 line-through tabular-nums">
                              {formatCurrency(product.compareAtPrice)}
                            </span>
                            <Badge variant="danger" className="text-[8px] sm:text-[9px] font-bold px-1 py-0.5">
                              {Math.round(
                                ((product.compareAtPrice - product.price) /
                                  product.compareAtPrice) *
                                  100
                              )}%
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Actions - Compact */}
                      <div className="flex gap-1.5 pt-1.5">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="flex-1 rounded-md bg-blue-500 px-2 py-1.5 sm:px-3 sm:py-2 text-center font-semibold text-[10px] sm:text-xs text-white transition-all hover:bg-blue-600 active:scale-95 shadow-sm hover:shadow-md"
                        >
                          تعديل
                        </Link>
                        <DeleteProductButton
                          productId={product.id}
                          productName={product.name}
                        />
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