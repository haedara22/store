'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { getCart, getCartTotal, clearCart } from '@/lib/cart';
import { formatCurrency } from '@/lib/utils';
import { SYRIAN_GOVERNORATES, PAYMENT_METHODS } from '@/lib/constants';
import { CartItem } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    governorate: SYRIAN_GOVERNORATES[0],
    area: '',
    address: '',
    notes: '',
    paymentMethod: 'cash' as 'cash' | 'shamcash',
  });

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [shamcashData, setShamcashData] = useState<{
    accountName: string;
    accountNumber: string;
    qrCode: string;
  } | null>(null);

  useEffect(() => {
    const cartData = getCart();
    if (cartData.length === 0) {
      router.push('/cart');
    }
    setCart(cartData);

    fetch('/api/settings/shamcash')
      .then(res => res.json())
      .then((data: any) => setShamcashData(data))
      .catch(console.error);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, paymentProof: 'حجم الملف يجب أن يكون أقل من 5 ميجابايت' }));
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({ ...prev, paymentProof: 'يرجى اختيار صورة بصيغة JPG أو PNG' }));
        return;
      }
      setPaymentProof(file);
      setErrors(prev => ({ ...prev, paymentProof: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'الاسم مطلوب';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'رقم الهاتف مطلوب';
    } else if (!/^(09|٠٩)\d{8}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'رقم هاتف سوري غير صحيح';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'المنطقة مطلوبة';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب';
    }

    if (formData.paymentMethod === 'shamcash' && !paymentProof) {
      newErrors.paymentProof = 'يرجى رفع إثبات الدفع';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      let paymentProofUrl = '';
      if (paymentProof) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', paymentProof);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });
        const uploadData: any = await uploadRes.json();
        paymentProofUrl = uploadData.url;
      }

      const orderData = {
        ...formData,
        items: cart,
        subtotal: getCartTotal(cart),
        total: getCartTotal(cart),
        paymentProofUrl,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('فشل إنشاء الطلب');
      }

      const order: any = await response.json();
      clearCart();
      router.push(`/order-success?orderId=${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const total = getCartTotal(cart);

  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
          
          {/* Header - Compact */}
          <div className="mb-5 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              إتمام الطلب
            </h1>
            <p className="text-sm text-zinc-500 font-medium mt-0.5">
              املأ المعلومات لإتمام طلبك
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            {/* Customer Information - Compact */}
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-zinc-200">
              <h2 className="text-sm sm:text-base font-bold text-zinc-900 mb-4 tracking-tight">
                معلومات العميل
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  label="الاسم الكامل"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  error={errors.customerName}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="h-9 sm:h-10 text-sm"
                />
                <Input
                  label="رقم الهاتف"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  error={errors.customerPhone}
                  placeholder="09XX XXX XXX"
                  required
                  className="h-9 sm:h-10 text-sm"
                />
              </div>
            </div>

            {/* Shipping Address - Compact */}
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-zinc-200">
              <h2 className="text-sm sm:text-base font-bold text-zinc-900 mb-4 tracking-tight">
                عنوان التوصيل
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <Select
                  label="المحافظة"
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleInputChange}
                  options={SYRIAN_GOVERNORATES.map(gov => ({ value: gov, label: gov }))}
                  required
                  className="h-9 sm:h-10 text-sm"
                />
                <Input
                  label="المنطقة"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  error={errors.area}
                  placeholder="مثال: المزة، الميدان"
                  required
                  className="h-9 sm:h-10 text-sm"
                />
                <Textarea
                  label="العنوان التفصيلي"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  placeholder="الشارع، رقم البناء، الطابق"
                  rows={2}
                  required
                  className="text-sm"
                />
                <Textarea
                  label="ملاحظات (اختياري)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="أي ملاحظات إضافية للتوصيل"
                  rows={1}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Payment Method - Compact */}
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-zinc-200">
              <h2 className="text-sm sm:text-base font-bold text-zinc-900 mb-4 tracking-tight">
                طريقة الدفع
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-3 p-3 sm:p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === method.value
                        ? 'border-orange-500 bg-orange-50/60 shadow-sm'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-600 border-zinc-300 focus:ring-1 focus:ring-orange-500 flex-shrink-0"
                    />
                    <span className="text-2xl flex-shrink-0">{method.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm sm:text-base text-zinc-900">
                        {method.label}
                      </div>
                    </div>
                  </label>
                ))}

                {/* ShamCash Instructions - Compact */}
                {formData.paymentMethod === 'shamcash' && shamcashData && (
                  <div className="mt-4 p-4 sm:p-5 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                    <h3 className="font-bold text-sm sm:text-base text-green-900 mb-3">
                      معلومات الدفع عبر شام كاش
                    </h3>
                    
                    {shamcashData.qrCode && (
                      <div className="mb-4 flex justify-center">
                        <img
                          src={shamcashData.qrCode}
                          alt="ShamCash QR Code"
                          className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-white rounded-lg shadow-md"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5 text-xs sm:text-sm text-green-900 font-medium">
                      <p><strong className="font-bold">اسم الحساب:</strong> {shamcashData.accountName}</p>
                      <p><strong className="font-bold">رقم الحساب:</strong> {shamcashData.accountNumber}</p>
                    </div>

                    <div className="mt-3 p-3 sm:p-4 bg-white rounded-lg border border-green-200">
                      <p className="font-bold text-xs sm:text-sm text-green-900 mb-2">الخطوات:</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-zinc-700">
                        <li>افتح تطبيق شام كاش</li>
                        <li>امسح رمز QR أو أدخل رقم الحساب</li>
                        <li>أدخل المبلغ: <strong className="text-orange-600">{formatCurrency(total)}</strong></li>
                        <li>أكمل عملية الدفع وارفع إثبات الدفع</li>
                      </ol>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs sm:text-sm font-semibold text-zinc-700 mb-1.5">
                        رفع إثبات الدفع *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-xs sm:text-sm text-zinc-500
                          file:mr-3 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-xs sm:file:text-sm file:font-semibold
                          file:bg-orange-50 file:text-orange-700
                          hover:file:bg-orange-100 cursor-pointer transition-all
                          border border-dashed border-zinc-300 rounded-lg p-2"
                      />
                      {errors.paymentProof && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.paymentProof}</p>
                      )}
                      {paymentProof && (
                        <p className="mt-1.5 text-xs text-green-600 font-medium">
                          ✓ تم اختيار: {paymentProof.name}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary - Compact */}
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-zinc-200">
              <h2 className="text-sm sm:text-base font-bold text-zinc-900 mb-3 tracking-tight">
                ملخص الطلب
              </h2>
              
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-600 font-medium truncate max-w-[60%]">
                      {item.productName} × {item.quantity}
                    </span>
                    <span className="font-semibold text-zinc-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-zinc-200 mb-4" />

              <div className="flex items-center justify-between text-base sm:text-lg font-bold text-zinc-900 p-3 bg-zinc-50 rounded-lg">
                <span>الإجمالي</span>
                <span className="text-orange-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Submit Button - Compact */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full shadow-md shadow-orange-500/20 h-11 text-sm font-bold rounded-lg"
              isLoading={isLoading}
            >
              {isLoading ? 'جارٍ إرسال الطلب...' : 'تأكيد الطلب ✓'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}