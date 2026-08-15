'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDateTime } from '@/lib/utils';

interface OrderItem {
  id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string | null;
  paymentMethod: string;
  paymentStatus: string;
  paymentProofUrl: string | null;
  status: string;
  subtotal: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // فك Promise
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${id}`);
      const data: any = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchOrder();
        alert('تم تحديث حالة الطلب بنجاح');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('حدث خطأ أثناء تحديث الطلب');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaymentStatusUpdate = async (newStatus: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (response.ok) {
        await fetchOrder();
        alert('تم تحديث حالة الدفع بنجاح');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('حدث خطأ أثناء تحديث حالة الدفع');
    } finally {
      setIsSaving(false);
    }
  };

  // Skeleton Loading - Compact
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="space-y-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-3.5 bg-zinc-200 rounded w-32" />
              <div className="flex items-center justify-between">
                <div className="h-6 bg-zinc-200 rounded w-48" />
                <div className="h-7 bg-zinc-200 rounded w-28" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 space-y-3">
                <div className="h-64 bg-zinc-200 rounded-lg" />
                <div className="h-40 bg-zinc-200 rounded-lg" />
              </div>
              <div className="space-y-3">
                <div className="h-40 bg-zinc-200 rounded-lg" />
                <div className="h-32 bg-zinc-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <Card padding="md" radius="md" className="shadow-sm">
            <div className="text-center py-10 sm:py-12">
              <div className="text-4xl mb-3">❌</div>
              <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                الطلب غير موجود
              </h3>
              <Link href="/admin/orders" className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-semibold">
                العودة إلى الطلبات →
              </Link>
            </div>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      payment_verification: 'bg-blue-100 text-blue-700',
      confirmed: 'bg-green-100 text-green-700',
      processing: 'bg-blue-100 text-blue-700',
      ready: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-zinc-100 text-zinc-700';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'قيد الانتظار',
      payment_verification: 'التحقق من الدفع',
      confirmed: 'مؤكد',
      processing: 'قيد التجهيز',
      ready: 'جاهز للتوصيل',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي',
    };
    return labels[status] || status;
  };

  const getPaymentStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'قيد الانتظار',
      verified: 'تم التحقق',
      rejected: 'مرفوض',
      completed: 'مكتمل',
    };
    return labels[status] || status;
  };

  const getPaymentMethodLabel = (method: string) => {
    return method === 'cash' ? '💵 الدفع عند الاستلام' : '💳 شام كاش';
  };

  return (
    <AdminLayout>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="space-y-3 sm:space-y-4">
          
          {/* Header - Compact */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <Link href="/admin/orders" className="text-[10px] sm:text-xs text-zinc-500 hover:text-orange-600 font-medium inline-block mb-1.5">
                ← العودة إلى الطلبات
              </Link>
              <h1 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                طلب #{order.orderNumber}
              </h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-medium mt-0.5">
                تم الإنشاء: {formatDateTime(order.createdAt)}
              </p>
            </div>

            <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md ${getStatusColor(order.status)} flex-shrink-0 self-start sm:self-center`}>
              {getStatusLabel(order.status)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            
            {/* Main Column - Compact */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              
              {/* Order Items - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-3 sm:mb-4">المنتجات</h2>
                <div className="space-y-2.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2.5 sm:p-3 bg-zinc-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm text-zinc-900 truncate">{item.productName}</div>
                        <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                          الكمية: {item.quantity} × {formatCurrency(item.productPrice)}
                        </div>
                      </div>
                      <div className="font-bold text-sm sm:text-base text-zinc-900 flex-shrink-0 mr-2">
                        {formatCurrency(item.total)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 mt-3 sm:mt-4 pt-3 sm:pt-4">
                  <div className="flex justify-between text-sm sm:text-base font-bold">
                    <span>الإجمالي:</span>
                    <span className="text-orange-600">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </Card>

              {/* Customer Information - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-3 sm:mb-4">معلومات العميل</h2>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-[10px] sm:text-xs">
                  <div>
                    <div className="text-zinc-500 font-medium mb-0.5">الاسم</div>
                    <div className="font-semibold text-zinc-900">{order.customerName}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 font-medium mb-0.5">الهاتف</div>
                    <div className="font-semibold text-zinc-900 direction-ltr">{order.customerPhone}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 font-medium mb-0.5">المحافظة</div>
                    <div className="font-semibold text-zinc-900">{order.governorate}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 font-medium mb-0.5">المنطقة</div>
                    <div className="font-semibold text-zinc-900">{order.area}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-zinc-500 font-medium mb-0.5">العنوان</div>
                    <div className="font-semibold text-zinc-900">{order.address}</div>
                  </div>
                  {order.notes && (
                    <div className="col-span-2">
                      <div className="text-zinc-500 font-medium mb-0.5">ملاحظات</div>
                      <div className="font-semibold text-zinc-900">{order.notes}</div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Payment Proof - Compact */}
              {order.paymentProofUrl && (
                <Card padding="md" radius="md" className="shadow-sm">
                  <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-3 sm:mb-4">إثبات الدفع</h2>
                  <div className="relative w-full h-48 sm:h-56 bg-zinc-100 rounded-lg overflow-hidden">
                    <Image
                      src={order.paymentProofUrl}
                      alt="Payment Proof"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <a
                    href={order.paymentProofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-block text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    عرض بالحجم الكامل →
                  </a>
                </Card>
              )}
            </div>

            {/* Sidebar - Compact */}
            <div className="space-y-3 sm:space-y-4">
              
              {/* Update Status - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-3 sm:mb-4">تحديث الحالة</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5">
                      حالة الطلب
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      disabled={isSaving}
                      className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium text-xs sm:text-sm h-9 sm:h-10"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="payment_verification">التحقق من الدفع</option>
                      <option value="confirmed">مؤكد</option>
                      <option value="processing">قيد التجهيز</option>
                      <option value="ready">جاهز للتوصيل</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5">
                      حالة الدفع
                    </label>
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => handlePaymentStatusUpdate(e.target.value)}
                      disabled={isSaving}
                      className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium text-xs sm:text-sm h-9 sm:h-10"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="verified">تم التحقق</option>
                      <option value="rejected">مرفوض</option>
                      <option value="completed">مكتمل</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Payment Info - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-3 sm:mb-4">معلومات الدفع</h2>
                <div className="space-y-2.5 text-[10px] sm:text-xs">
                  <div>
                    <div className="text-zinc-500 font-medium mb-0.5">طريقة الدفع</div>
                    <div className="font-semibold text-zinc-900">
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-500 font-medium mb-0.5">حالة الدفع</div>
                    <div className="font-semibold text-zinc-900">
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}