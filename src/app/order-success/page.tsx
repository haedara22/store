'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, getOrderStatusText, getPaymentMethodText } from '@/lib/utils';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string | null;
  paymentMethod: string;
  total: number;
  items: OrderItem[];
}

interface SiteSettings {
  whatsapp: string;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [settings, setSettings] = useState<SiteSettings>({ whatsapp: '963900000000' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    Promise.all([
      fetch(`/api/orders?orderId=${orderId}`).then(res => res.json()),
      fetch('/api/settings').then(res => res.json())
    ])
      .then(([orderData, settingsData]) => {
        setOrder(orderData as Order);
        setSettings(settingsData as SiteSettings);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-zinc-50 py-8 sm:py-10 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-zinc-600 font-semibold">جارٍ تحميل تفاصيل الطلب...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-zinc-50 py-8 sm:py-10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-zinc-900 mb-4">الطلب غير موجود</p>
            <Link href="/">
              <Button variant="primary">العودة للرئيسية</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 py-8 sm:py-10">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-6">
          
          {/* Success Message - Compact */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 shadow-md">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
              تم استلام طلبك بنجاح! 🎉
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium">
              شكراً لك على ثقتك بالحامد للتجارة
            </p>
          </div>

          {/* Order Details - Compact */}
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden mb-6">
            
            {/* Header - Compact */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[10px] sm:text-xs text-orange-100 font-medium">رقم الطلب</p>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">{order.orderNumber}</p>
                </div>
                <Badge 
                  variant={order.status === 'payment_verification' ? 'warning' : 'success'}
                  size="sm"
                  className="bg-white text-orange-600 border-0 shadow-sm text-[10px] sm:text-xs"
                >
                  {getOrderStatusText(order.status)}
                </Badge>
              </div>
            </div>

            {/* Body - Compact */}
            <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
              
              {/* Customer Info */}
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  معلومات العميل
                </p>
                <p className="text-zinc-900 font-semibold text-sm sm:text-base">{order.customerName}</p>
                <p className="text-zinc-600 text-xs sm:text-sm">{order.customerPhone}</p>
              </div>

              <div className="h-px bg-zinc-200" />

              {/* Shipping Address */}
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  عنوان التوصيل
                </p>
                <p className="text-zinc-900 font-semibold text-sm sm:text-base">
                  {order.governorate} - {order.area}
                </p>
                <p className="text-zinc-600 text-xs sm:text-sm">{order.address}</p>
                {order.notes && (
                  <p className="text-xs text-zinc-500 mt-1.5 p-2 bg-zinc-50 rounded-lg">
                    <strong>ملاحظات:</strong> {order.notes}
                  </p>
                )}
              </div>

              <div className="h-px bg-zinc-200" />

              {/* Payment Method */}
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                  طريقة الدفع
                </p>
                <p className="text-zinc-900 font-semibold text-sm sm:text-base">
                  {getPaymentMethodText(order.paymentMethod)}
                </p>
                {order.paymentMethod === 'shamcash' && (
                  <p className="text-xs text-green-700 mt-1.5 p-2 bg-green-50 rounded-lg font-medium">
                    {order.status === 'payment_verification' 
                      ? '✓ تم استلام إثبات الدفع - سيتم التحقق قريباً'
                      : '⏳ بانتظار الدفع'}
                  </p>
                )}
              </div>

              <div className="h-px bg-zinc-200" />

              {/* Products */}
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  المنتجات
                </p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-zinc-700 font-medium">
                        {item.productName} <span className="text-zinc-400">× {item.quantity}</span>
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-zinc-900">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-zinc-200" />

              {/* Total */}
              <div className="flex items-center justify-between text-base sm:text-lg font-bold p-3 sm:p-4 bg-orange-50 rounded-lg">
                <span className="text-zinc-900">الإجمالي</span>
                <span className="text-orange-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Next Steps - Compact */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-5 mb-6">
            <h2 className="font-bold text-sm sm:text-base text-orange-900 mb-3">الخطوات التالية 📋</h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-orange-800">
              {order.paymentMethod === 'shamcash' && order.status === 'payment_verification' ? (
                <>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-600 text-base flex-shrink-0">✓</span>
                    <span>سيقوم فريقنا بالتحقق من الدفع خلال ساعات</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-600 text-base flex-shrink-0">✓</span>
                    <span>سنتصل بك لتأكيد الطلب</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-600 text-base flex-shrink-0">✓</span>
                    <span>سيتم تجهيز طلبك وشحنه في أقرب وقت</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-600 text-base flex-shrink-0">✓</span>
                    <span>سنتصل بك خلال 24 ساعة لتأكيد الطلب</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-600 text-base flex-shrink-0">✓</span>
                    <span>سيتم تجهيز الطلب خلال 1-3 أيام عمل</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-600 text-base flex-shrink-0">✓</span>
                    <span>ستصلك رسالة عند شحن الطلب</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Actions - Compact */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-8">
            <Link href={`/order-tracking?orderNumber=${order.orderNumber}`} className="flex-1">
              <Button variant="primary" size="md" className="w-full shadow-md shadow-orange-500/20 text-sm font-bold rounded-lg h-10 sm:h-11">
                تتبع الطلب 📦
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button variant="outline" size="md" className="w-full text-sm font-bold rounded-lg h-10 sm:h-11">
                متابعة التسوق 🛍️
              </Button>
            </Link>
          </div>

          {/* Contact - Compact */}
          <div className="text-center p-5 sm:p-6 bg-white rounded-xl border border-zinc-200">
            <p className="text-zinc-700 font-semibold text-sm sm:text-base mb-3">هل لديك أي استفسار؟</p>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-105"
            >
              <span>تواصل معنا عبر واتساب</span>
              <span className="text-xl">💬</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}