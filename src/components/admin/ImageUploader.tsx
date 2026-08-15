'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onImagesChange, maxImages = 5 }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // التحقق من عدد الصور
    if (images.length + files.length > maxImages) {
      setUploadError(`يمكنك رفع ${maxImages} صور كحد أقصى`);
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        // التحقق من نوع الملف
        if (!file.type.startsWith('image/')) {
          setUploadError(`${file.name} ليس ملف صورة`);
          continue;
        }

        // التحقق من حجم الملف (5MB)
        if (file.size > 5 * 1024 * 1024) {
          setUploadError(`${file.name} حجمه أكبر من 5 ميجابايت`);
          continue;
        }

        // رفع الصورة
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data: any = await response.json();
          uploadedUrls.push(data.url);
        } else {
          setUploadError(`فشل رفع ${file.name}`);
        }
      }

      if (uploadedUrls.length > 0) {
        onImagesChange([...images, ...uploadedUrls]);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadError('حدث خطأ أثناء رفع الصور');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* إرشادات الصور */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <div className="flex items-start gap-2">
          <span className="text-lg flex-shrink-0">💡</span>
          <div>
            <h4 className="text-xs font-bold text-blue-900 mb-1">متطلبات الصور</h4>
            <ul className="text-[10px] sm:text-xs text-blue-800 space-y-0.5">
              <li>• <strong>الأبعاد المثالية:</strong> 1000 × 1000 بكسل (مربع)</li>
              <li>• <strong>الحجم الأقصى:</strong> 5 ميجابايت لكل صورة</li>
              <li>• <strong>الصيغ:</strong> JPG, PNG, WEBP</li>
              <li>• <strong>الخلفية:</strong> بيضاء نقية (مُفضل)</li>
              <li>• <strong>الجودة:</strong> عالية ودقيقة</li>
            </ul>
          </div>
        </div>
      </div>

      {/* نصائح سريعة */}
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
        <div className="flex items-start gap-2">
          <span className="text-lg flex-shrink-0">✨</span>
          <div>
            <h4 className="text-xs font-bold text-orange-900 mb-1">نصائح للحصول على صور احترافية</h4>
            <ul className="text-[10px] sm:text-xs text-orange-800 space-y-0.5">
              <li>• استخدم إضاءة جيدة وتجنب الظلال</li>
              <li>• صوّر المنتج من زوايا متعددة (3-5 صور)</li>
              <li>• أزل الخلفية باستخدام <a href="https://remove.bg" target="_blank" rel="noopener noreferrer" className="underline font-bold">remove.bg</a></li>
              <li>• راجع <strong>IMAGE_REQUIREMENTS.md</strong> للتفاصيل الكاملة</li>
            </ul>
          </div>
        </div>
      </div>

      {/* عرض الصور المرفوعة */}
      {images.length > 0 && (
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-zinc-700 mb-2">
            الصور المرفوعة ({images.length}/{maxImages})
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg border-2 border-zinc-200 bg-zinc-50 overflow-hidden"
              >
                <Image
                  src={url}
                  alt={`صورة ${index + 1}`}
                  fill
                  className="object-contain p-2"
                />

                {/* شارة الترتيب */}
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-md">
                  {index === 0 ? 'رئيسية' : index + 1}
                </div>

                {/* أزرار التحكم */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {/* حذف */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-colors"
                    title="حذف"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  {/* نقل لليمين */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleReorder(index, index - 1)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-lg transition-colors"
                      title="تقديم"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* نقل لليسار */}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleReorder(index, index + 1)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-lg transition-colors"
                      title="تأخير"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* رفع صور جديدة */}
      {images.length < maxImages && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full py-4 border-2 border-dashed border-zinc-300 hover:border-orange-500 rounded-lg bg-zinc-50 hover:bg-orange-50 transition-all duration-200 flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-semibold text-zinc-700">جارٍ الرفع...</span>
              </>
            ) : (
              <>
                <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm font-semibold text-zinc-700">
                  انقر لرفع الصور
                </span>
                <span className="text-xs text-zinc-500">
                  أو اسحب الصور هنا (حتى {maxImages - images.length} صور)
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* رسالة خطأ */}
      {uploadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-lg">⚠️</span>
            <p className="text-xs text-red-700 font-semibold">{uploadError}</p>
          </div>
        </div>
      )}

      {/* معاينة placeholder */}
      {images.length === 0 && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center">
          <div className="w-24 h-24 mx-auto mb-3 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
            <Image
              src="/product-placeholder.svg"
              alt="Placeholder"
              width={80}
              height={80}
              className="opacity-50"
            />
          </div>
          <p className="text-xs text-zinc-600 font-medium">
            إذا لم تقم برفع صور، سيتم عرض أيقونة متجر الحامد الاحترافية
          </p>
        </div>
      )}
    </div>
  );
}
