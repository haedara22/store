import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { db, orders } from '@/db';
import { desc, eq } from 'drizzle-orm';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageContainer, PageContent, Section } from '@/components/admin/PageContainer';
import { UnifiedPageHeader, HeaderStats, HeaderStatCard } from '@/components/admin/UnifiedPageHeader';
import { UnifiedFilterBar, FilterSelect, FilterActions, FilterButton } from '@/components/admin/UnifiedFilterBar';
import { UnifiedEmptyState } from '@/components/admin/UnifiedEmptyState';
import { Card } from '@/components/ui/Card';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { getOrderStatusStyle } from '@/lib/design-system';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface SearchParams {
  status?: string;
}

async function getOrders(searchParams: SearchParams) {
  try {
    const where = searchParams.status ? eq(orders.status, searchParams.status) : undefined;

    return await db.query.orders.findMany({
      where,
      orderBy: [desc(orders.createdAt)],
      limit: 100,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export default async function AdminOrdersPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const ordersData = await getOrders(searchParams);

  const statusOptions = [
    { value: '', label: 'جميع الطلبات' },
    { value: 'pending', label: 'قيد الانتظار' },
    { value: 'payment_verification', label: 'التحقق من الدفع' },
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'processing', label: 'قيد التجهيز' },
    { value: 'ready', label: 'جاهز للتوصيل' },
    { value: 'delivered', label: 'تم التوصيل' },
    { value: 'cancelled', label: 'ملغي' },
  ];

  // حساب إحصائيات الطلبات
  const pendingCount = ordersData.filter(o => o.status === 'pending').length;
  const processingCount = ordersData.filter(o => 
    ['confirmed', 'processing', 'ready', 'payment_verification'].includes(o.status)
  ).length;
  const deliveredCount = ordersData.filter(o => o.status === 'delivered').length;

  return (
    <AdminLayout>
      <PageContainer maxWidth="xl">
        <PageContent spacing="md" className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          
          {/* Page Header with Stats - Compact */}
          <Section className="mb-3 sm:mb-4">
            <UnifiedPageHeader
              title="إدارة الطلبات"
              description={`${ordersData.length} طلب`}
              icon="📦"
              stats={
                <HeaderStats>
                  <HeaderStatCard
                    label="المعلقة"
                    value={pendingCount}
                    icon="⏳"
                    color="orange"
                  />
                  <HeaderStatCard
                    label="قيد المعالجة"
                    value={processingCount}
                    icon="⚙️"
                    color="blue"
                  />
                  <HeaderStatCard
                    label="مكتملة"
                    value={deliveredCount}
                    icon="✅"
                    color="green"
                  />
                </HeaderStats>
              }
            />
          </Section>

          {/* Filter Section - Compact */}
          <Section className="mb-3 sm:mb-4">
            <UnifiedFilterBar className="p-2.5 sm:p-3 gap-2 sm:gap-2.5">
              <FilterSelect
                label="تصفية حسب الحالة"
                name="status"
                options={statusOptions}
                defaultValue={searchParams.status}
                className="text-xs sm:text-sm"
              />

              <FilterActions className="gap-1.5 sm:gap-2">
                <FilterButton type="submit" variant="primary" className="h-8 sm:h-9 text-[10px] sm:text-xs px-3 sm:px-4">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>تطبيق</span>
                </FilterButton>

                {searchParams.status && (
                  <Link href="/admin/orders">
                    <FilterButton variant="secondary" className="h-8 sm:h-9 text-[10px] sm:text-xs px-3 sm:px-4">
                      إلغاء
                    </FilterButton>
                  </Link>
                )}
              </FilterActions>
            </UnifiedFilterBar>
          </Section>

          {/* Orders List Section - Compact */}
          <Section>
            {ordersData.length === 0 ? (
              <UnifiedEmptyState
                icon="📦"
                title="لا توجد طلبات"
                description={
                  searchParams.status 
                    ? 'لا توجد طلبات تطابق الفلتر المحدد'
                    : 'لم يتم تقديم أي طلبات بعد. ستظهر الطلبات الجديدة هنا.'
                }
              />
            ) : (
              <div className="space-y-2.5 sm:space-y-3">
                {ordersData.map((order) => {
                  const statusStyle = getOrderStatusStyle(order.status as any);
                  
                  return (
                    <Card 
                      key={order.id} 
                      hoverable
                      padding="sm"
                      radius="md"
                      className="group border border-zinc-200/70 hover:border-orange-200/60 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="space-y-3 sm:space-y-4">
                        
                        {/* Top Section - Order Header - Compact */}
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2.5 sm:gap-3 pb-3 sm:pb-4 border-b border-zinc-100">
                          
                          {/* Left Side - Order Info */}
                          <div className="flex-1 space-y-2.5">
                            
                            {/* Order Number and Badges */}
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              <Link
                                href={`/admin/orders/${order.id}`}
                                className="inline-block font-bold text-sm sm:text-base text-zinc-950 hover:text-orange-600 transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
                              >
                                #{order.orderNumber}
                              </Link>
                              
                              <span className={`inline-flex items-center text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                <span className="ml-1">{statusStyle.icon}</span>
                                {statusStyle.label}
                              </span>
                              
                              {order.paymentMethod === 'shamcash' && (
                                <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border bg-emerald-50 text-emerald-700 border-emerald-200">
                                  <span className="ml-1">💳</span>
                                  شام كاش
                                </span>
                              )}
                            </div>
                            
                            {/* Order Details Grid - Compact */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                              <div>
                                <span className="text-zinc-500 font-medium">العميل:</span>
                                <span className="font-semibold text-zinc-900 mr-1">{order.customerName}</span>
                              </div>
                              <div>
                                <span className="text-zinc-500 font-medium">الهاتف:</span>
                                <span className="font-semibold text-zinc-900 mr-1 direction-ltr">{order.customerPhone}</span>
                              </div>
                              <div>
                                <span className="text-zinc-500 font-medium">المحافظة:</span>
                                <span className="font-semibold text-zinc-900 mr-1">{order.governorate}</span>
                              </div>
                              <div>
                                <span className="text-zinc-500 font-medium">الوقت:</span>
                                <span className="font-semibold text-zinc-900 mr-1">{formatRelativeTime(order.createdAt)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right Side - Price and Action - Compact */}
                          <div className="flex flex-row sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 flex-shrink-0">
                            
                            {/* Total Price */}
                            <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg border border-orange-200/40">
                              <div className="text-[9px] sm:text-[10px] font-bold text-orange-700/80">
                                الإجمالي
                              </div>
                              <div className="text-base sm:text-lg font-bold text-orange-600 tabular-nums">
                                {formatCurrency(order.total)}
                              </div>
                            </div>

                            {/* View Details Button - Compact */}
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="h-8 sm:h-9 px-3 sm:px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-[10px] sm:text-xs rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 flex items-center justify-center whitespace-nowrap"
                            >
                              عرض التفاصيل
                            </Link>
                          </div>
                        </div>
                        
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </Section>

        </PageContent>
      </PageContainer>
    </AdminLayout>
  );
}