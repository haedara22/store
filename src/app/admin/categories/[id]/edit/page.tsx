'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { slugify } from '@/lib/utils';

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // فك Promise
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  useEffect(() => {
    fetch(`/api/admin/categories/${id}`)
      .then((res) => res.json())
      .then((category: any) => {
        setFormData({
          name: category.name,
          slug: category.slug,
          description: category.description || '',
        });
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
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: any = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل تحديث التصنيف');
        return;
      }

      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('حدث خطأ أثناء تحديث التصنيف');
    } finally {
      setIsSaving(false);
    }
  };

  // Skeleton Loading - Compact
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6">
          <div className="py-3 sm:py-4 space-y-4 sm:space-y-5 animate-pulse">
            <div className="space-y-2.5">
              <div className="h-4 bg-zinc-200 rounded-lg w-32" />
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-zinc-200 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-6 bg-zinc-200 rounded-lg w-48" />
                  <div className="h-3.5 bg-zinc-200 rounded-lg w-64" />
                </div>
              </div>
            </div>
            <div className="h-80 bg-zinc-200 rounded-lg max-w-3xl" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="space-y-4 sm:space-y-5 py-3 sm:py-4">
          
          {/* ============ HEADER SECTION - COMPACT ============ */}
          <div>
            <div className="flex flex-col gap-3 sm:gap-4">
              
              {/* Breadcrumb Navigation - Compact */}
              <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-zinc-600">
                <button
                  type="button"
                  onClick={() => router.push('/admin/dashboard')}
                  className="hover:text-orange-600 transition-colors"
                >
                  لوحة التحكم
                </button>
                <span className="text-zinc-400">/</span>
                <button
                  type="button"
                  onClick={() => router.push('/admin/categories')}
                  className="hover:text-orange-600 transition-colors"
                >
                  التصنيفات
                </button>
                <span className="text-zinc-400">/</span>
                <span className="text-zinc-900 font-semibold">تعديل تصنيف</span>
              </nav>
              
              {/* Page Title - Compact */}
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-base sm:text-lg shadow-md shadow-blue-500/20 flex-shrink-0">
                  ✏️
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-tight">
                    تعديل التصنيف
                  </h1>
                  <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-0.5">
                    قم بتحديث معلومات التصنيف وحفظ التغييرات
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ============ FORM SECTION - COMPACT ============ */}
          <div className="max-w-3xl pb-6">
            
            {/* Error Alert - Compact */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <span className="text-red-600 text-base flex-shrink-0">⚠️</span>
                  <p className="text-xs sm:text-sm text-red-900 font-semibold">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Main Information Card - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <div className="space-y-4 sm:space-y-5">
                  
                  {/* Card Header - Compact */}
                  <div className="pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                      <h2 className="text-base sm:text-lg font-bold text-zinc-950">
                        المعلومات الأساسية
                      </h2>
                    </div>
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-medium mt-1 mr-3">
                      الحقول المطلوبة بعلامة <span className="text-red-500 font-bold">*</span>
                    </p>
                  </div>

                  {/* Form Fields - Compact */}
                  <div className="grid grid-cols-1 gap-4 sm:gap-5">
                    
                    {/* Category Name */}
                    <div>
                      <Input
                        label="اسم التصنيف"
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="مثال: إكسسوارات الموبايل"
                        required
                        className="text-sm font-semibold h-9 sm:h-10"
                      />
                      <p className="text-[10px] sm:text-xs text-zinc-500 font-medium mt-1.5 mr-1">
                        💡 اختر اسماً واضحاً وسهل التذكر
                      </p>
                    </div>

                    {/* Slug Field - Compact */}
                    <div>
                      <div className="space-y-1.5">
                        <label className="block text-xs sm:text-sm font-semibold text-zinc-900">
                          الرابط المختصر (Slug)
                          <span className="text-red-500 mr-1">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                          placeholder="mobile-accessories"
                          required
                          dir="ltr"
                          className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-zinc-200 
                                   bg-white text-zinc-900 font-mono text-xs sm:text-sm
                                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                                   transition-all duration-200
                                   placeholder:text-zinc-400
                                   text-left h-9 sm:h-10"
                        />
                        <p className="text-[10px] sm:text-xs text-zinc-500 font-medium">
                          يُستخدم في URL - أحرف إنجليزية صغيرة وشرطات
                        </p>
                      </div>
                      {formData.slug && (
                        <div className="mt-2 p-2 sm:p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                          <p className="text-[9px] sm:text-[10px] text-zinc-500 font-semibold mb-1">معاينة:</p>
                          <p className="text-[10px] sm:text-xs font-mono text-zinc-900 break-all" dir="ltr">
                            /products?category={formData.slug}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Description - Compact */}
                    <div>
                      <Textarea
                        label="الوصف"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="وصف تفصيلي للتصنيف..."
                        rows={4}
                        className="text-sm leading-relaxed"
                      />
                      <p className="text-[10px] sm:text-xs text-zinc-500 font-medium mt-1.5 mr-1">
                        اختياري - يظهر للعملاء عند تصفح التصنيف
                      </p>
                    </div>

                  </div>
                </div>
              </Card>

              {/* Action Buttons - Compact */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="md"
                  isLoading={isSaving} 
                  className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg
                           shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25
                           transform hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-200"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      <span>جاري الحفظ...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>✓</span>
                      <span>حفظ التعديلات</span>
                    </span>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => router.back()}
                  disabled={isSaving}
                  className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg
                           border hover:bg-zinc-50
                           transition-all duration-200"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✕</span>
                    <span>إلغاء</span>
                  </span>
                </Button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}