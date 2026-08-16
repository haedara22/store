import { db, products, categories, orders } from '@/db';
import { count, sql, desc, eq, inArray } from 'drizzle-orm';
import { RecentOrdersTable } from '@/components/admin/RecentOrdersTable';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { PageContainer, PageContent, Section } from '@/components/admin/PageContainer';
import { UnifiedStatsCard, StatsGrid } from '@/components/admin/UnifiedStatsCard';
import { Card } from '@/components/ui/Card';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getDashboardData() {
  try {
    const [
      [productStats],
      [featuredProducts],
      [categoryStats],
      [orderStats],
      [pendingOrders],
      [processingOrders],
      [salesData],
      recentOrders,
    ] = await Promise.all([
      db.select({ total: count() }).from(products),
      db.select({ total: count() }).from(products).where(eq(products.featured, true)),
      db.select({ total: count() }).from(categories),
      db.select({ total: count() }).from(orders),
      db.select({ total: count() }).from(orders).where(eq(orders.status, 'pending')),
      db.select({ total: count() }).from(orders).where(eq(orders.status, 'processing')),
      db.select({ total: sql<number>`COALESCE(SUM(${orders.total}), 0)` })
        .from(orders)
        .where(inArray(orders.status, ['completed', 'shipped', 'delivered'])),
      db.select({
        id: orders.id,
        customerName: orders.customerName,
        total: orders.total,
        status: orders.status,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5)
    ]);

    return {
      products: {
        total: productStats?.total || 0,
        featured: featuredProducts?.total || 0,
      },
      categories: categoryStats?.total || 0,
      orders: {
        total: orderStats?.total || 0,
        pending: pendingOrders?.total || 0,
        processing: processingOrders?.total || 0,
      },
      sales: Number(salesData?.total || 0),
      recentOrders,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      products: { total: 0, featured: 0 },
      categories: 0,
      orders: { total: 0, pending: 0, processing: 0 },
      sales: 0,
      recentOrders: [],
    };
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  const activeOrdersCount = data.orders.pending + data.orders.processing;

  return (
    <PageContainer maxWidth="xl">
      <PageContent spacing="md" className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Welcome Banner - Compact */}
        <Section className="mb-4 sm:mb-5">
          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white shadow-md border-0">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
            
            <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-4 sm:py-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm border border-white/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  نشط
                </div>
                
                <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-tight">
                  مرحباً بك في لوحة التحكم
                </h1>
                <p className="text-[11px] sm:text-xs text-orange-100/90 leading-relaxed">
                  متابعة أداء متجرك وإدارة الطلبات
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 rounded-lg bg-zinc-900 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold text-white shadow-md transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.97]"
                >
                  <svg className="h-3.5 w-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>منتج جديد</span>
                </Link>
                
                <Link
                  href="/admin/orders"
                  className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-9 rounded-lg bg-white/15 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-sm border border-white/20 transition-all hover:bg-white/25 active:scale-[0.97]"
                >
                  <span>الطلبات</span>
                  <svg className="h-3.5 w-3.5 rtl:rotate-180 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </Card>
        </Section>

        {/* Stats Grid - Compact */}
        <Section className="mb-4 sm:mb-5">
          <StatsGrid columns={4} className="gap-2.5 sm:gap-3">
            <UnifiedStatsCard
              title="المنتجات"
              value={data.products.total}
              icon="📦"
              color="blue"
              href="/admin/products"
              trend={{
                value: data.products.featured,
                label: `مميز`,
                isPositive: true,
              }}
              className="p-3 sm:p-3.5"
            />

            <UnifiedStatsCard
              title="التصنيفات"
              value={data.categories}
              icon="🏷️"
              color="purple"
              href="/admin/categories"
              className="p-3 sm:p-3.5"
            />

            <UnifiedStatsCard
              title="الطلبات"
              value={data.orders.total}
              icon="🛒"
              color="green"
              href="/admin/orders"
              trend={{
                value: activeOrdersCount,
                label: `نشط`,
                isPositive: activeOrdersCount > 0,
              }}
              className="p-3 sm:p-3.5"
            />

            <UnifiedStatsCard
              title="المبيعات"
              value={formatCurrency(data.sales)}
              icon="💰"
              color="orange"
              className="p-3 sm:p-3.5"
            />
          </StatsGrid>
        </Section>

        {/* Quick Actions - Compact */}
        <Section className="mb-4 sm:mb-5">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight">إجراءات سريعة</h2>
              <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">الأكثر استخداماً</span>
            </div>
            
            <div className="grid gap-2 sm:gap-2.5 grid-cols-2 lg:grid-cols-4">
              <QuickActionCard
                title="منتج جديد"
                description="إضافة منتج"
                icon="➕"
                href="/admin/products/new"
                color="blue"
              />
              <QuickActionCard
                title="تصنيف جديد"
                description="إضافة تصنيف"
                icon="🏷️"
                href="/admin/categories/new"
                color="purple"
              />
              <QuickActionCard
                title="الطلبات"
                description="متابعة الطلبات"
                icon="📋"
                href="/admin/orders"
                color="green"
              />
              <QuickActionCard
                title="الإعدادات"
                description="إدارة المتجر"
                icon="⚙️"
                href="/admin/settings"
                color="red"
              />
            </div>
          </div>
        </Section>

        {/* Recent Orders - Compact */}
        <Section className="mb-4 sm:mb-5">
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight">أحدث الطلبات</h2>
                <p className="text-[10px] sm:text-xs text-zinc-500 font-medium mt-0.5">آخر 5 طلبات مسجلة</p>
              </div>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <span>عرض الكل</span>
                <svg className="h-3 w-3 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <Card className="overflow-hidden border border-zinc-200 shadow-sm">
              <RecentOrdersTable orders={data.recentOrders} />
            </Card>
          </div>
        </Section>

        {/* System Status - Compact */}
        <Section>
          <div className="grid gap-2.5 sm:gap-3 grid-cols-1 lg:grid-cols-3">
            {/* Server Status */}
            <Card className="border border-zinc-200 shadow-sm p-3 sm:p-3.5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-semibold text-zinc-950">حالة النظام</h3>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </div>
              <div className="space-y-1.5 text-[10px] sm:text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                  <span className="text-zinc-600">قاعدة البيانات</span>
                  <span className="font-semibold text-emerald-600 text-[10px] sm:text-xs">✓ متصل</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-100">
                  <span className="text-zinc-600">تخزين الصور</span>
                  <span className="font-semibold text-emerald-600 text-[10px] sm:text-xs">✓ جاهز</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-zinc-600">خدمة الدفع</span>
                  <span className="font-semibold text-emerald-600 text-[10px] sm:text-xs">✓ تعمل</span>
                </div>
              </div>
            </Card>

            {/* Progress Metrics */}
            <Card className="border border-zinc-200 shadow-sm p-3 sm:p-3.5">
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-950 mb-3">مؤشرات الأداء</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-zinc-600">المنتجات المميزة</span>
                    <span className="font-semibold text-zinc-950 tabular-nums text-[10px] sm:text-xs">
                      {data.products.featured} / {data.products.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{
                        width: `${data.products.total > 0 ? (data.products.featured / data.products.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                    <span className="text-zinc-600">الطلبات النشطة</span>
                    <span className="font-semibold text-zinc-950 tabular-nums text-[10px] sm:text-xs">
                      {activeOrdersCount} / {data.orders.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                      style={{
                        width: `${data.orders.total > 0 ? (activeOrdersCount / data.orders.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Tip */}
            <Card className="flex flex-col justify-between border border-orange-200 bg-orange-50/60 shadow-sm p-3 sm:p-3.5">
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-semibold text-zinc-950">نصيحة اليوم 💡</h3>
                <p className="text-[10px] sm:text-xs leading-relaxed text-zinc-700">
                  متابعة الطلبات المعلقة تزيد من موثوقية متجرك.
                </p>
              </div>
              
              <Link
                href="/admin/orders?status=pending"
                className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span>معالجة المعلقة</span>
                <svg className="h-3 w-3 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
          </div>
        </Section>
      </PageContent>
    </PageContainer>
  );
}

// Quick Action Card Component - Compact
function QuickActionCard({
  title,
  description,
  icon,
  href,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'blue' | 'purple' | 'green' | 'red';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    green: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    red: 'from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900',
  };

  return (
    <Link
      href={href}
      className={`group block p-3 sm:p-3.5 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97]`}
    >
      <div className="flex flex-col gap-1.5 text-white">
        <span className="text-lg sm:text-xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-xs sm:text-sm leading-tight">{title}</h3>
          <p className="text-[9px] sm:text-[10px] text-white/80 leading-tight">{description}</p>
        </div>
      </div>
    </Link>
  );
}