'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/types';
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal } from '@/lib/cart';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const loadCart = () => {
    setCart(getCart());
    setIsLoading(false);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemove = (productId: string) => {
    if (confirm('هل أنت متأكد من إزالة هذا المنتج من السلة؟')) {
      removeFromCart(productId);
      loadCart();
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const total = getCartTotal(cart);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-zinc-50 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="animate-pulse space-y-3">
              <div className="h-7 bg-zinc-200 rounded-lg w-48" />
              <div className="h-4 bg-zinc-200 rounded-lg w-32" />
              <div className="h-64 bg-zinc-200 rounded-lg" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          
          {/* Header - Compact */}
          <div className="mb-5 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              سلة المشتريات
            </h1>
            <p className="text-sm text-zinc-500 font-medium mt-0.5">
              {cart.length > 0 ? `${cart.length} منتج في السلة` : 'سلتك فارغة'}
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl p-10 sm:p-12 text-center shadow-sm border border-zinc-200">
              <div className="text-6xl mb-4 opacity-30">🛒</div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
                سلتك فارغة
              </h2>
              <p className="text-sm text-zinc-500 mb-6">
                لم تقم بإضافة أي منتجات بعد
              </p>
              <Link href="/products">
                <Button variant="primary" size="md" className="shadow-md shadow-orange-500/20">
                  تصفح المنتجات 🛍️
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
              
              {/* Cart Items - Compact */}
              <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-zinc-200 hover:border-zinc-300 transition-all animate-fade-in"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      
                      {/* Image - Compact */}
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-zinc-50 rounded-md overflow-hidden border border-zinc-200 hover:border-orange-400 transition-all"
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-contain p-1.5"
                            sizes="80px"
                          />
                        )}
                      </Link>

                      {/* Info - Compact */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.productSlug}`}
                          className="font-semibold text-sm sm:text-base text-zinc-900 hover:text-orange-600 transition-colors line-clamp-2 leading-snug"
                        >
                          {item.productName}
                        </Link>

                        <div className="text-base sm:text-lg font-bold text-zinc-900 mt-1">
                          {formatCurrency(item.price)}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap mt-1.5">
                          {/* Quantity - Compact */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 border border-zinc-300 rounded-md hover:bg-zinc-100 hover:border-zinc-400 transition-all flex items-center justify-center font-bold text-xs sm:text-sm"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-bold text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="w-7 h-7 sm:w-8 sm:h-8 border border-zinc-300 rounded-md hover:bg-zinc-100 hover:border-zinc-400 transition-all flex items-center justify-center font-bold text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="text-red-500 hover:text-red-700 text-[10px] sm:text-xs font-semibold transition-colors px-2 py-0.5 hover:bg-red-50 rounded-md"
                          >
                            🗑️ إزالة
                          </button>
                        </div>

                        {item.quantity >= item.stock && (
                          <p className="text-[10px] sm:text-xs text-orange-600 mt-1.5 font-medium">
                            ⚠️ الحد الأقصى: {item.stock}
                          </p>
                        )}
                      </div>

                      {/* Total - Desktop */}
                      <div className="hidden md:flex flex-col items-end justify-center">
                        <div className="text-base sm:text-lg font-bold text-zinc-900">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        <div className="text-[10px] sm:text-xs text-zinc-500">
                          {item.quantity} × {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>

                    {/* Total - Mobile */}
                    <div className="md:hidden mt-2.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-medium">الإجمالي:</span>
                      <span className="text-base font-bold text-zinc-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - Compact */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-zinc-200 sticky top-20">
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 mb-4 tracking-tight">
                    ملخص الطلب
                  </h2>

                  <div className="space-y-2.5 mb-4 text-sm sm:text-base">
                    <div className="flex items-center justify-between text-zinc-600">
                      <span className="font-medium">المجموع الفرعي</span>
                      <span className="font-bold">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-600">
                      <span className="font-medium">التوصيل</span>
                      <span className="font-semibold text-green-600 text-xs sm:text-sm">سيتم حسابه</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-600">
                      <span className="font-medium">عدد المنتجات</span>
                      <span className="font-semibold">{cart.length}</span>
                    </div>
                  </div>

                  <div className="h-px bg-zinc-200 mb-4" />

                  <div className="flex items-center justify-between text-base sm:text-lg font-bold text-zinc-900 mb-5 p-3 bg-zinc-50 rounded-lg">
                    <span>الإجمالي</span>
                    <span className="text-orange-600">{formatCurrency(total)}</span>
                  </div>

                  <div className="space-y-2.5">
                    <Link href="/checkout">
                      <Button variant="primary" size="md" className="w-full shadow-md shadow-orange-500/20 text-sm">
                        متابعة إلى الدفع 💳
                      </Button>
                    </Link>

                    <Link href="/products">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                        متابعة التسوق 🛍️
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-2.5">
                      <span className="text-orange-500 text-base flex-shrink-0">💳</span>
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold text-orange-900 mb-0.5">
                          طرق الدفع
                        </p>
                        <p className="text-[10px] sm:text-xs text-orange-800 leading-relaxed">
                          الدفع عند الاستلام • شام كاش
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2.5">
                      <span className="text-green-500 text-base flex-shrink-0">✓</span>
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold text-green-900 mb-0.5">
                          توصيل سريع
                        </p>
                        <p className="text-[10px] sm:text-xs text-green-800 leading-relaxed">
                          نوصل لجميع المحافظات
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}