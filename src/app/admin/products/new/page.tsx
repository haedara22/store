'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { PageHeader } from '@/components/admin/PageHeader';
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

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
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

  // Fetch categories
  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data: any) => setCategories(data))
      .catch(console.error);
  }, []);

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
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: productImages,
        }),
      });

      const data: any = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل إنشاء المنتج');
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error creating product:', error);
      setError('حدث خطأ أثناء إنشاء المنتج');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'المعلومات الأساسية', icon: '📝' },
    { number: 2, title: 'التسعير والمخزون', icon: '💰' },
    { number: 3, title: 'الإعدادات', icon: '⚙️' },
  ];

  const isStep1Valid = formData.name && formData.slug && formData.description;
  const isStep2Valid = formData.price && formData.categoryId;

  return (
    <AdminLayout>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="max-w-3xl mx-auto">
          
          <PageHeader
            title="إضافة منتج جديد"
            description="قم بإنشاء منتج جديد وإضافته إلى متجرك"
            icon="➕"
            breadcrumbs={[
              { label: 'لوحة التحكم', href: '/admin/dashboard' },
              { label: 'المنتجات', href: '/admin/products' },
              { label: 'إضافة منتج جديد' },
            ]}
          />

          {/* Progress Steps - Compact */}
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-4 sm:top-5 right-0 left-0 h-0.5 bg-zinc-200 -z-10">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center flex-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.number)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20 scale-105'
                        : 'bg-white border border-zinc-300 text-zinc-400'
                    }`}
                  >
                    {currentStep > step.number ? '✓' : step.icon}
                  </button>
                  <p
                    className={`mt-1.5 text-[9px] sm:text-[10px] font-semibold text-center transition-colors ${
                      currentStep >= step.number ? 'text-zinc-900' : 'text-zinc-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Error Alert - Compact */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 sm:p-3.5">
              <div className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0">⚠️</span>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-red-900 mb-0.5">حدث خطأ</h3>
                  <p className="text-xs text-red-700">{error}</p>
                </div>
                <button
                  onClick={() => setError('')}
                  className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            {/* Step 1: Basic Information - Compact */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-blue-100 text-base">
                      📝
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-zinc-900">المعلومات الأساسية</h2>
                      <p className="text-[10px] sm:text-xs text-zinc-500">الاسم والوصف والتفاصيل</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    <Input
                      label="اسم المنتج *"
                      value={formData.name}
                      onChange={handleNameChange}
                      placeholder="مثال: سماعات لاسلكية"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />

                    <Input
                      label="الرابط المختصر (Slug) *"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="wireless-headphones"
                      required
                      helperText="يستخدم في رابط URL المنتج"
                      className="h-9 sm:h-10 text-sm font-mono"
                    />

                    <Textarea
                      label="وصف المنتج *"
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
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    variant="primary"
                    size="md"
                    className="h-10 sm:h-11 text-sm font-bold rounded-lg px-5 sm:px-6 shadow-md shadow-orange-500/20"
                    disabled={!isStep1Valid}
                  >
                    التالي
                    <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Pricing & Stock - Compact */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-green-100 text-base">
                      💰
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-zinc-900">التسعير والمخزون</h2>
                      <p className="text-[10px] sm:text-xs text-zinc-500">حدد السعر والكمية</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
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
                        helperText="يظهر كخط مشطوب"
                        className="h-9 sm:h-10 text-sm"
                      />
                    </div>

                    {formData.compareAtPrice && formData.price && 
                      Number(formData.compareAtPrice) > Number(formData.price) && (
                      <div className="rounded-lg bg-orange-50 border border-orange-200 p-2.5 sm:p-3">
                        <p className="text-[10px] sm:text-xs font-semibold text-orange-700">
                          🎉 خصم {Math.round(((Number(formData.compareAtPrice) - Number(formData.price)) / 
                            Number(formData.compareAtPrice)) * 100)}%
                        </p>
                      </div>
                    )}

                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
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
                  </div>
                </div>

                <div className="flex gap-2.5 sm:gap-3">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    size="md"
                    className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg"
                  >
                    <svg className="h-4 w-4 ml-1.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    السابق
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    variant="primary"
                    size="md"
                    className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg shadow-md shadow-orange-500/20"
                    disabled={!isStep2Valid}
                  >
                    التالي
                    <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Settings - Compact */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-purple-100 text-base">
                      ⚙️
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-zinc-900">الإعدادات النهائية</h2>
                      <p className="text-[10px] sm:text-xs text-zinc-500">خيارات إضافية للمنتج</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-3.5 sm:p-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="flex-shrink-0 pt-0.5">
                          <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                            className="w-4 h-4 text-orange-600 border-zinc-300 rounded focus:ring-1 focus:ring-orange-500 transition-all"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-base">⭐</span>
                            <span className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                              منتج مميز
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-zinc-500">
                            يظهر في القسم المميز بالصفحة الرئيسية
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Summary Card - Compact */}
                    <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100/70 border border-orange-200 p-3.5 sm:p-4">
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 mb-2.5 flex items-center gap-1.5">
                        <span className="text-base">📋</span>
                        ملخص المنتج
                      </h3>
                      <div className="space-y-1.5 text-[10px] sm:text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">الاسم:</span>
                          <span className="font-semibold text-zinc-900 text-left">{formData.name || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">السعر:</span>
                          <span className="font-semibold text-orange-600">
                            {formData.price ? `${new Intl.NumberFormat('ar-SY').format(Number(formData.price))} ل.س` : '-'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">التصنيف:</span>
                          <span className="font-semibold text-zinc-900">
                            {categories.find((c) => c.id === formData.categoryId)?.name || '-'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">المخزون:</span>
                          <span className="font-semibold text-zinc-900">{formData.stock || '0'}</span>
                        </div>
                        {formData.featured && (
                          <div className="pt-2 border-t border-orange-200">
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-orange-700">
                              <span>⭐</span>
                              منتج مميز
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 sm:gap-3">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    size="md"
                    className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg"
                  >
                    <svg className="h-4 w-4 ml-1.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    السابق
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isLoading}
                    className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg shadow-md shadow-orange-500/20"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        جاري الإنشاء...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        إنشاء المنتج
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="w-full h-8 sm:h-9 text-[10px] sm:text-xs font-medium text-zinc-500 hover:text-zinc-700"
                >
                  إلغاء وعودة للخلف
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}