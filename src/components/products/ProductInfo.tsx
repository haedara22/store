'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { addToCart } from '@/lib/cart';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ProductInfoProps {
  product: Product & { 
    images: any[]; 
    category?: { name: string };
    variants?: any[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [whatsapp, setWhatsapp] = useState('963900000000');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then((data: any) => setWhatsapp(data.whatsapp))
      .catch(console.error);
  }, []);

  const discount = product.compareAtPrice 
    ? calculateDiscountPercentage(product.compareAtPrice, product.price)
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      price: product.price,
      image: product.images[0]?.url,
      stock: product.stock,
    }, quantity);

    setTimeout(() => {
      setIsAdding(false);
      window.dispatchEvent(new Event('cartUpdated'));
    }, 500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      window.location.href = '/cart';
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Category */}
      {product.category && (
        <div>
          <a 
            href={`/products?category=${product.category.name}`}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            {product.category.name}
          </a>
        </div>
      )}

      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          {product.featured && (
            <Badge variant="warning" size="md">مميز</Badge>
          )}
          {discount > 0 && (
            <Badge variant="danger" size="md">خصم {discount}%</Badge>
          )}
          {isLowStock && (
            <Badge variant="warning" size="md">كمية محدودة</Badge>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4">
        <span className="text-4xl md:text-5xl font-bold text-neutral-900">
          {formatCurrency(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-2xl text-neutral-500 line-through">
            {formatCurrency(product.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {isOutOfStock ? (
          <p className="text-red-600 font-semibold text-base">غير متوفر في المخزون</p>
        ) : isLowStock ? (
          <p className="text-orange-600 font-semibold text-base">
            متبقي {product.stock} قطع فقط
          </p>
        ) : (
          <p className="text-green-600 font-semibold text-base">متوفر في المخزون</p>
        )}
      </div>

      <div className="h-px bg-neutral-200" />

      {/* Quantity */}
      {!isOutOfStock && (
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-3">
            الكمية
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 border-2 border-neutral-300 rounded-lg hover:bg-neutral-100 hover:border-neutral-400 transition-all flex items-center justify-center font-bold text-lg"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setQuantity(Math.max(1, Math.min(product.stock, value)));
              }}
              className="w-20 text-center border-2 border-neutral-300 rounded-lg px-3 py-2.5 font-semibold text-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              min="1"
              max={product.stock}
            />
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-11 h-11 border-2 border-neutral-300 rounded-lg hover:bg-neutral-100 hover:border-neutral-400 transition-all flex items-center justify-center font-bold text-lg"
            >
              +
            </button>
            <span className="text-sm text-neutral-600 font-medium">
              ({product.stock} متوفر)
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-2">
        {!isOutOfStock ? (
          <>
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isAdding}
            >
              {isAdding ? 'جارٍ الإضافة...' : 'إضافة إلى السلة 🛒'}
            </Button>
            <Button
              onClick={handleBuyNow}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              اشترِ الآن ⚡
            </Button>
          </>
        ) : (
          <Button variant="outline" size="lg" className="w-full" disabled>
            غير متوفر حالياً
          </Button>
        )}
        
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-6 py-3.5 border-2 border-green-500 text-green-700 hover:bg-green-50 font-semibold rounded-xl transition-all"
        >
          تواصل للاستفسار عبر واتساب 💬
        </a>
      </div>

      {/* Features */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <span className="text-neutral-700 font-medium">توصيل سريع لجميع المحافظات</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <span className="text-neutral-700 font-medium">ضمان الجودة والأصالة</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <span className="text-neutral-700 font-medium">دعم فني متواصل</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-green-600 text-lg">✓</span>
          <span className="text-neutral-700 font-medium">إمكانية الدفع عند الاستلام</span>
        </div>
      </div>
    </div>
  );
}
