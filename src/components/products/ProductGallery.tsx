'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: { url: string; alt?: string | null }[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // استخدام صورة placeholder بسيطة كـ data URL
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f5f5f5" width="400" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="40" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3E📦%3C/text%3E%3C/svg%3E';
  
  const displayImages = images.length > 0 ? images : [{ url: placeholderImage, alt: productName }];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
        <Image
          src={displayImages[selectedImage].url}
          alt={displayImages[selectedImage].alt || productName}
          fill
          className="object-contain p-6"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-orange-500 ring-2 ring-orange-200 shadow-md'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} - ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 25vw, 12.5vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
