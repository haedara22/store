'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { slugify } from '@/lib/utils';

export default function NewCategoryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

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
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: any = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل إنشاء التصنيف');
        return;
      }

      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      console.error('Error creating category:', error);
      setError('حدث خطأ أثناء إنشاء التصنيف');
    } finally {
      setIsLoading(false);
    }
  };

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
                <span className="text-zinc-900 font-semibold">إضافة تصنيف</span>
              </nav>
              
              {/* Page Title - Compact */}
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-base sm:text-lg shadow-md shadow-orange-500/20 flex-shrink-0">
                  🏷️
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-tight">
                    إضافة تصنيف جديد
                  </h1>
                  <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-0.5">
                    أنشئ تصنيفاً لتنظيم منتجات المتجر
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
                      <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
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
                                   focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
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
                  isLoading={isLoading} 
                  className="flex-1 h-10 sm:h-11 text-sm font-bold rounded-lg
                           shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/25
                           transform hover:-translate-y-0.5 active:translate-y-0
                           transition-all duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      <span>جاري الإنشاء...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>✓</span>
                      <span>إنشاء التصنيف</span>
                    </span>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => router.back()}
                  disabled={isLoading}
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

              {/* Helper Info Card - Compact */}
              <Card padding="sm" radius="md" className="bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-200/50">
                <div className="flex items-start gap-2.5">
                  <span className="text-base flex-shrink-0">💡</span>
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-blue-900 mb-1.5">
                      نصائح لإنشاء تصنيف ناجح
                    </h3>
                    <ul className="space-y-1 text-[10px] sm:text-xs text-blue-800">
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>استخدم أسماء واضحة ومباشرة</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>تأكد من أن الرابط المختصر فريد</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>أضف وصفاً مفيداً لتحسين ظهور التصنيف</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

            </form>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}