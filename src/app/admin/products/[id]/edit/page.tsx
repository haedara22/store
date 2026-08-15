'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { slugify } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  stock: number;
  featured: boolean;
  specifications: Record<string, string> | null;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // فك Promise
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [productImages, setProductImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    compareAtPrice: '',
    categoryId: '',
    stock: '0',
    featured: false,
    specifications: {} as Record<string, string>,
  });

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${id}`).then((res) => res.json()),
      fetch('/api/admin/categories').then((res) => res.json()),
    ])
      .then(([product, cats]: [any, any]) => {
        setFormData({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price.toString(),
          compareAtPrice: product.compareAtPrice?.toString() || '',
          categoryId: product.categoryId,
          stock: product.stock.toString(),
          featured: product.featured,
          specifications: product.specifications || {},
        });
        // جلب صور المنتج الحالية
        if (product.images && product.images.length > 0) {
          setProductImages(product.images.map((img: any) => img.url));
        }
        setCategories(cats);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugify(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: productImages,
        }),
      });

      const data: any = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل تحديث المنتج');
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error updating product:', error);
      setError('حدث خطأ أثناء تحديث المنتج');
    } finally {
      setIsSaving(false);
    }
  };

  // Skeleton Loading - Compact
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="max-w-3xl space-y-4 animate-pulse">
            <div className="space-y-2">
              <div className="h-6 bg-zinc-200 rounded-lg w-48" />
              <div className="h-3.5 bg-zinc-200 rounded-lg w-64" />
            </div>
            <div className="h-96 bg-zinc-200 rounded-lg" />
            <div className="flex gap-3">
              <div className="h-10 bg-zinc-200 rounded-lg flex-1" />
              <div className="h-10 bg-zinc-200 rounded-lg flex-1" />
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="max-w-3xl">
          
          {/* Header - Compact */}
          <div className="mb-4 sm:mb-5">
            <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
              تعديل المنتج
            </h1>
            <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-0.5">
              قم بتحديث معلومات المنتج
            </p>
          </div>

          {/* Error Alert - Compact */}
          {error && (
            <Card padding="sm" radius="md" className="mb-4 bg-red-50 border-red-200 shadow-sm">
              <p className="text-xs sm:text-sm text-red-700 font-medium flex items-start gap-2">
                <span className="text-red-500">⚠️</span>
                <span>{error}</span>
              </p>
            </Card>
          )}

          {/* Form - Compact */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <Card padding="md" radius="md" className="shadow-sm">
              <h2 className="text-sm sm:text-base font-bold text-zinc-950 mb-4 sm:mb-5">
                المعلومات الأساسية
              </h2>

              <div className="space-y-4 sm:space-y-5">
                {/* Product Name */}
                <Input
                  label="اسم المنتج *"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="مثال: سماعات لاسلكية"
                  required
                  className="h-9 sm:h-10 text-sm"
                />

                {/* Slug */}
                <Input
                  label="الرابط المختصر (Slug) *"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="wireless-headphones"
                  required
                  helperText="يستخدم في رابط URL المنتج"
                  className="h-9 sm:h-10 text-sm font-mono"
                />

                {/* Description */}
                <Textarea
                  label="الوصف *"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="وصف تفصيلي للمنتج..."
                  rows={4}
                  required
                  className="text-sm leading-relaxed"
                />

                {/* Image Uploader */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-zinc-700 mb-2">
                    صور المنتج 📸
                  </label>
                  <ImageUploader
                    images={productImages}
                    onImagesChange={setProductImages}
                    maxImages={5}
                  />
                </div>

                {/* Price & Compare Price */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    label="السعر (ل.س) *"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="150000"
                    required
                    className="h-9 sm:h-10 text-sm"
                  />

                  <Input
                    label="السعر قبل الخصم"
                    type="number"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData((prev) => ({ ...prev, compareAtPrice: e.target.value }))}
                    placeholder="200000"
                    className="h-9 sm:h-10 text-sm"
                  />
                </div>

                {/* Category & Stock */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Select
                    label="التصنيف *"
                    value={formData.categoryId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, categoryId: e.target.value }))}
                    options={[
                      { value: '', label: 'اختر التصنيف' },
                      ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                    ]}
                    required
                    className="h-9 sm:h-10 text-sm"
                  />

                  <Input
                    label="الكمية المتوفرة"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                    placeholder="0"
                    className="h-9 sm:h-10 text-sm"
                  />
                </div>

                {/* Featured Checkbox */}
                <label className="flex items-center gap-2.5 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-orange-600 border-zinc-300 rounded focus:ring-1 focus:ring-orange-500 focus:ring-offset-1"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                    منتج مميز ⭐ (يظهر في الصفحة الرئيسية)
                  </span>
                </label>
              </div>
            </Card>

            {/* Action Buttons - Compact */}
            <div className="flex gap-2.5 sm:gap-3">
              <Button 
                type="submit" 
                variant="primary" 
                size="md"
                isLoading={isSaving} 
                className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => router.back()}
                disabled={isSaving}
                className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg border hover:bg-zinc-50 transition-all duration-200"
              >
                إلغاء
              </Button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
}