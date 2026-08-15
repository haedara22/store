'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { addToCart } from '@/lib/cart';

interface ProductCardProps {
  product: Product & { images: { url: string; alt?: string | null }[] };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  
  const discount = product.compareAtPrice 
    ? calculateDiscountPercentage(product.compareAtPrice, product.price)
    : 0;
  
  // استخدام صورة placeholder احترافية SVG
  const mainImage = product.images[0]?.url || '/product-placeholder.svg';
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    setIsAdding(true);
    
    addToCart({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      price: product.price,
      image: mainImage,
      stock: product.stock,
    }, 1);

    setTimeout(() => {
      setIsAdding(false);
      window.dispatchEvent(new Event('cartUpdated'));
    }, 500);
  };

  return (
    <div className="group product-card bg-white rounded-xl overflow-hidden block shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container - Clickable */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-neutral-50">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Badges */}
          {(discount > 0 || product.featured || isOutOfStock) && (
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {discount > 0 && (
                <Badge variant="danger" size="md" className="shadow-md backdrop-blur-sm bg-red-500 text-white border-0">
                  خصم {discount}%
                </Badge>
              )}
              {product.featured && !isOutOfStock && (
                <Badge variant="warning" size="md" className="shadow-md backdrop-blur-sm bg-orange-500 text-white border-0">
                  مميز
                </Badge>
              )}
              {isOutOfStock && (
                <Badge variant="default" size="md" className="shadow-md backdrop-blur-sm bg-neutral-800 text-white border-0">
                  غير متوفر
                </Badge>
              )}
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-2.5 hover:text-orange-600 transition-colors min-h-[3rem] text-base leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-xl font-bold text-neutral-900">
            {formatCurrency(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-neutral-500 line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!isOutOfStock ? (
          <>
            {product.stock <= 5 && (
              <p className="text-xs text-orange-600 font-medium mb-3">
                متبقي {product.stock} قطع فقط
              </p>
            )}
          </>
        ) : (
          <p className="text-xs text-neutral-500 font-medium mb-3">
            غير متوفر حالياً
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdding}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isOutOfStock 
              ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed' 
              : isAdding
              ? 'bg-orange-400 text-white cursor-wait'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md active:scale-95'
          }`}
        >
          {isAdding ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              جارٍ الإضافة...
            </>
          ) : isOutOfStock ? (
            'غير متوفر'
          ) : (
            <>
              <span>🛒</span>
              إضافة للسلة
            </>
          )}
        </button>

        {/* View Details Link */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-2 block w-full text-center py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
        >
          عرض التفاصيل ←
        </Link>
      </div>
    </div>
  );
}
