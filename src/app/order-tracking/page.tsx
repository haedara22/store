'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, getOrderStatusText, getPaymentMethodText, formatDate } from '@/lib/utils';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
    total: number;
  }>;
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);

    if (!orderNumber.trim() || !phone.trim()) {
      setError('يرجى إدخال رقم الطلب ورقم الهاتف');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/orders/track?orderNumber=${orderNumber}&phone=${phone}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('لم يتم العثور على نتائج. يرجى التأكد من رقم الطلب ورقم الهاتف');
        } else {
          setError('حدث خطأ أثناء الاتصال بالسيرفر');
        }
        return;
      }

      const data: any = await response.json();
      setOrder(data);
    } catch (err) {
      console.error('Error tracking order:', err);
      setError('حدث خطأ غير متوقع أثناء تتبع الطلب');
    } finally {
      setIsLoading(false);
    }
  };

  const getStepStatus = (currentStatus: string, stepIndex: number) => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    
    if (currentStatus === 'cancelled') return 'cancelled';
    if (currentIndex >= stepIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans dir-rtl flex flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-orange-50/20 via-white to-orange-50/10 relative overflow-hidden py-8 sm:py-10 lg:py-12">
        {/* Background - Subtle */}
        <div className="absolute top-10 right-1/2 translate-x-1/2 w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-3xl relative z-10">
          
          {/* Header - Compact */}
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200/60 mb-3 tracking-wider uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              خدمة المتابعة
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight mb-2">
              تتبع حالة طلبك
            </h1>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">
              أدخل رقم الطلب ورقم الهاتف للتعرف على مكان شحنتك
            </p>
          </div>

          {/* Search Form - Compact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md border border-orange-100/50 mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="رقم الطلب"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="ORD-XXXXXX"
                  required
                  className="h-9 sm:h-10 text-sm rounded-lg"
                />
                <Input
                  label="رقم الهاتف"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XX XXX XXX"
                  required
                  className="h-9 sm:h-10 text-sm rounded-lg"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full h-10 sm:h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 shadow-md shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                isLoading={isLoading}
              >
                {isLoading ? (
                  <span>جاري الاستعلام...</span>
                ) : (
                  <>
                    <span>تتبع الشحنة</span>
                    <span className="text-base">🔍</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Error Alert - Compact */}
          {error && (
            <div className="bg-red-50/80 border border-red-200 text-red-900 rounded-lg p-3 sm:p-4 mb-6 flex items-start gap-2.5 shadow-sm animate-fade-in">
              <span className="text-red-500 text-base flex-shrink-0">⚠️</span>
              <p className="text-xs sm:text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Order Details - Compact */}
          {order && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in">
              
              {/* Main Status */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md border border-orange-100/50 relative overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 pb-3 mb-4 border-b border-zinc-100">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-0.5">رقم الطلب</span>
                    <p className="text-lg sm:text-xl font-bold text-zinc-950">{order.orderNumber}</p>
                  </div>
                  <Badge className="px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-orange-500 text-white border-0 shadow-sm shadow-orange-500/20">
                    {getOrderStatusText(order.status)}
                  </Badge>
                </div>

                {/* Progress Stepper - Compact */}
                {order.status !== 'cancelled' ? (
                  <div className="my-5">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-4 text-center sm:text-right">
                      مراحل التوصيل
                    </p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      {[
                        { title: 'تم الطلب', icon: '📝' },
                        { title: 'تجهيز', icon: '⚙️' },
                        { title: 'شحن', icon: '🚚' },
                        { title: 'تسليم', icon: '🎉' },
                      ].map((step, idx) => {
                        const status = getStepStatus(order.status, idx);
                        const isCompleted = status === 'completed';

                        return (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base font-bold transition-all duration-200 mb-1.5 border ${
                              isCompleted 
                                ? 'bg-orange-500 text-white border-orange-500 shadow-sm shadow-orange-500/20' 
                                : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                            }`}>
                              {step.icon}
                            </div>
                            <span className={`text-[9px] sm:text-[10px] font-semibold ${isCompleted ? 'text-zinc-900' : 'text-zinc-400'}`}>
                              {step.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-center text-xs font-bold my-3">
                    هذا الطلب ملغي 🛑
                  </div>
                )}

                {/* Order Info Grid - Compact */}
                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-zinc-100">
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="text-[9px] font-bold text-zinc-500 block mb-0.5">📅 التاريخ</span>
                    <p className="text-[11px] sm:text-xs font-semibold text-zinc-900">{formatDate(order.createdAt)}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="text-[9px] font-bold text-zinc-500 block mb-0.5">💳 الدفع</span>
                    <p className="text-[11px] sm:text-xs font-semibold text-zinc-900">{getPaymentMethodText(order.paymentMethod)}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="text-[9px] font-bold text-zinc-500 block mb-0.5">👤 العميل</span>
                    <p className="text-[11px] sm:text-xs font-semibold text-zinc-900">{order.customerName}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100">
                    <span className="text-[9px] font-bold text-zinc-500 block mb-0.5">📍 العنوان</span>
                    <p className="text-[11px] sm:text-xs font-semibold text-zinc-900 truncate">{order.governorate}</p>
                  </div>
                </div>
              </div>

              {/* Order Items - Compact */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-md border border-orange-100/50">
                <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-3">تفاصيل المنتجات</h2>
                
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2.5 bg-zinc-50/70 rounded-lg border border-zinc-100">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-white border border-zinc-200/80 flex items-center justify-center text-[10px] font-bold text-zinc-700">
                          {item.quantity}x
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                          {item.productName}
                        </span>
                      </div>
                      <span className="font-semibold text-xs sm:text-sm text-zinc-950">
                        {formatCurrency(item.total)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-3 mt-3">
                    <div className="flex items-center justify-between p-3 bg-zinc-950 text-white rounded-lg shadow-md shadow-zinc-950/10">
                      <span className="font-bold text-xs sm:text-sm">الإجمالي</span>
                      <span className="text-base sm:text-lg font-bold text-orange-400">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Help - Compact */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-xl p-4 sm:p-5 text-center relative overflow-hidden border border-zinc-800 shadow-md">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-sm sm:text-base font-bold mb-1">لديك سؤال بخصوص الطلب؟</h3>
                <p className="text-zinc-400 text-xs sm:text-sm mb-3 max-w-md mx-auto">
                  فريق الدعم جاهز للإجابة على استفساراتك
                </p>
                
                <a
                  href="https://wa.me/963"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-md shadow-emerald-900/30 hover:scale-[1.02]"
                >
                  <span>محادثة الدعم</span>
                  <span className="text-base">💬</span>
                </a>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}