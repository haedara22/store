'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/admin/DataTable';
import { formatCurrency } from '@/lib/utils';

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: Date;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

function getStatusBadge(status: string) {
  const statusConfig: Record<
    string,
    { label: string; variant: 'default' | 'success' | 'warning' | 'danger' }
  > = {
    pending: { label: 'قيد الانتظار', variant: 'warning' },
    processing: { label: 'قيد المعالجة', variant: 'default' },
    shipped: { label: 'تم الشحن', variant: 'default' },
    delivered: { label: 'تم التوصيل', variant: 'success' },
    cancelled: { label: 'ملغي', variant: 'danger' },
  };

  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  return <Badge variant={config.variant} className="text-[10px] sm:text-xs px-2 py-0.5">{config.label}</Badge>;
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <DataTable
      data={orders}
      columns={[
        {
          key: 'id',
          label: 'رقم الطلب',
          width: '12%',
          render: (order) => (
            <Link
              href={`/admin/orders/${order.id}`}
              className="font-mono text-[10px] sm:text-xs font-semibold text-orange-600 hover:underline"
            >
              #{order.id.slice(0, 8)}
            </Link>
          ),
        },
        {
          key: 'customerName',
          label: 'اسم العميل',
          width: '28%',
          render: (order) => (
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-[10px] sm:text-xs font-bold text-white flex-shrink-0">
                {order.customerName.charAt(0)}
              </div>
              <span className="font-semibold text-zinc-900 truncate text-[10px] sm:text-xs">{order.customerName}</span>
            </div>
          ),
        },
        {
          key: 'totalAmount',
          label: 'المبلغ',
          width: '18%',
          render: (order) => (
            <span className="text-xs sm:text-sm font-bold text-zinc-900 whitespace-nowrap">
              {formatCurrency(order.total)}
            </span>
          ),
        },
        {
          key: 'status',
          label: 'الحالة',
          width: '18%',
          align: 'center',
          render: (order) => getStatusBadge(order.status),
        },
        {
          key: 'createdAt',
          label: 'التاريخ',
          width: '14%',
          render: (order) => (
            <span className="text-[10px] sm:text-xs text-zinc-500 whitespace-nowrap">
              {new Date(order.createdAt).toLocaleDateString('ar-SY', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          ),
        },
      ]}
      emptyState={
        <div>
          <div className="mb-2 text-4xl sm:text-5xl">📭</div>
          <p className="mb-1 text-xs sm:text-sm font-semibold text-zinc-900">لا توجد طلبات حتى الآن</p>
          <p className="text-[10px] sm:text-xs text-zinc-500">ستظهر الطلبات هنا بمجرد استلامها</p>
        </div>
      }
    />
  );
}