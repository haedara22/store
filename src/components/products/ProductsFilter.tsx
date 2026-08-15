'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types';
import { Button } from '@/components/ui/Button';

interface ProductsFilterProps {
  categories: Category[];
  currentParams: any;
}

export function ProductsFilter({ categories, currentParams }: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(currentParams.category || '');
  const [sortBy, setSortBy] = useState(currentParams.sort || 'newest');

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    
    if (sortBy) {
      params.set('sort', sortBy);
    } else {
      params.delete('sort');
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSortBy('newest');
    router.push('/products');
  };

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-zinc-950 mb-2.5">
          ترتيب حسب
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2.5 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-base bg-white text-zinc-950"
        >
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
          <option value="price-asc">السعر: من الأقل للأعلى</option>
          <option value="price-desc">السعر: من الأعلى للأقل</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-semibold text-zinc-950 mb-2.5">
          التصنيف
        </label>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-4 h-4 text-orange-600 border-zinc-300 focus:ring-orange-500"
            />
            <span className="text-sm text-zinc-800 group-hover:text-zinc-950 font-medium">جميع التصنيفات</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={selectedCategory === category.slug}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-orange-600 border-zinc-300 focus:ring-orange-500"
              />
              <span className="text-sm text-zinc-800 group-hover:text-zinc-950 font-medium">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5">
        <Button onClick={applyFilters} variant="primary" size="md" className="w-full">
          تطبيق الفلاتر
        </Button>
        <Button onClick={resetFilters} variant="ghost" size="md" className="w-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100">
          إعادة تعيين
        </Button>
      </div>
    </div>
  );
}
