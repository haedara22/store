'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface Settings {
  id?: string;
  storeName: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  heroProductId: string; // المنتج المميز في Hero
  shamcashAccountName: string;
  shamcashAccountNumber: string;
  shamcashQrCode: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  telegram: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    storeName: '',
    phone: '',
    whatsapp: '',
    address: '',
    workingHours: '',
    heroProductId: '',
    shamcashAccountName: '',
    shamcashAccountNumber: '',
    shamcashQrCode: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    telegram: '',
  });

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
    fetchProducts();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      const data: any = await response.json();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data: any = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleQrFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('حجم الملف يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    setQrFile(file);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data: any = await response.json();
      if (response.ok) {
        setSettings((prev) => ({ ...prev, shamcashQrCode: data.url }));
        setSuccess('تم رفع صورة QR بنجاح');
      }
    } catch (error) {
      console.error('Error uploading QR:', error);
      setError('فشل رفع صورة QR');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data: any = await response.json();

      if (!response.ok) {
        setError(data.error || 'فشل حفظ الإعدادات');
        return;
      }

      setSuccess('تم حفظ الإعدادات بنجاح ✓');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 rounded-lg" />
              <div className="h-6 bg-zinc-200 rounded w-48" />
            </div>
            <div className="h-3.5 bg-zinc-200 rounded w-64" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-zinc-200 rounded-lg" />
                <div className="h-64 bg-zinc-200 rounded-lg" />
              </div>
              <div className="h-96 bg-zinc-200 rounded-lg" />
            </div>
            <div className="h-12 bg-zinc-200 rounded-lg" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        
        {/* Header - Compact */}
        <div className="mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md shadow-orange-500/20 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight">
                إعدادات المتجر
              </h1>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-medium mt-0.5">
                إدارة معلومات المتجر وإعدادات الدفع والتواصل
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages - Compact */}
        {success && (
          <div className="mb-4 p-3 sm:p-3.5 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2.5">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <p className="text-xs sm:text-sm text-green-900 font-semibold">{success}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 sm:p-3.5 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2.5">
              <span className="text-red-600 text-lg flex-shrink-0">⚠️</span>
              <p className="text-xs sm:text-sm text-red-900 font-semibold">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            
            {/* Main Column - Compact */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              
              {/* Store Information - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5 pb-3 border-b border-zinc-100">
                  <span className="text-base">🏪</span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-zinc-950">معلومات المتجر</h2>
                    <p className="text-[10px] sm:text-xs text-zinc-500">البيانات الأساسية</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <Input
                    label="اسم المتجر *"
                    value={settings.storeName}
                    onChange={(e) => setSettings((prev) => ({ ...prev, storeName: e.target.value }))}
                    placeholder="متجر الحامد"
                    required
                    className="h-9 sm:h-10 text-sm"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      label="رقم الهاتف *"
                      value={settings.phone}
                      onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="09XX XXX XXX"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />

                    <Input
                      label="رقم الواتساب *"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings((prev) => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="963900000000"
                      required
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>

                  <Textarea
                    label="العنوان *"
                    value={settings.address}
                    onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="دمشق، سوريا"
                    rows={2}
                    required
                    className="text-sm"
                  />

                  <Input
                    label="ساعات العمل"
                    value={settings.workingHours}
                    onChange={(e) => setSettings((prev) => ({ ...prev, workingHours: e.target.value }))}
                    placeholder="السبت - الخميس: 9 ص - 9 م"
                    className="h-9 sm:h-10 text-sm"
                  />

                  {/* Hero Product Selection */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-zinc-700 mb-2">
                      المنتج المميز في Hero (الصفحة الرئيسية)
                    </label>
                    <select
                      value={settings.heroProductId}
                      onChange={(e) => setSettings((prev) => ({ ...prev, heroProductId: e.target.value }))}
                      className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm h-10"
                    >
                      <option value="">اختر منتج مميز للعرض</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {product.price} ل.س
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] sm:text-xs text-zinc-500 mt-1.5 font-medium">
                      هذا المنتج سيظهر في البطاقة المميزة في Hero الصفحة الرئيسية
                    </p>
                  </div>
                </div>
              </Card>

              {/* ShamCash Settings - Compact */}
              <Card padding="md" radius="md" className="shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5 pb-3 border-b border-zinc-100">
                  <span className="text-base">💳</span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-zinc-950">إعدادات شام كاش</h2>
                    <p className="text-[10px] sm:text-xs text-zinc-500">معلومات الدفع الإلكتروني</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Input
                      label="اسم الحساب"
                      value={settings.shamcashAccountName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, shamcashAccountName: e.target.value }))}
                      placeholder="متجر الحامد"
                      className="h-9 sm:h-10 text-sm"
                    />

                    <Input
                      label="رقم الحساب"
                      value={settings.shamcashAccountNumber}
                      onChange={(e) => setSettings((prev) => ({ ...prev, shamcashAccountNumber: e.target.value }))}
                      placeholder="09XX XXX XXX"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-zinc-700 mb-2">
                      رمز QR للدفع
                    </label>

                    {settings.shamcashQrCode && (
                      <div className="mb-3 p-3 sm:p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                        <div className="bg-white p-3 rounded-lg inline-block shadow-sm">
                          <img
                            src={settings.shamcashQrCode}
                            alt="ShamCash QR Code"
                            className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                          />
                        </div>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-2 font-medium text-center">
                          رمز QR الحالي
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrFileChange}
                      className="block w-full text-[10px] sm:text-xs text-zinc-600
                        file:mr-3 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-xs file:font-bold
                        file:bg-gradient-to-r file:from-orange-500 file:to-orange-600
                        file:text-white file:shadow-sm
                        hover:file:from-orange-600 hover:file:to-orange-700
                        file:transition-all file:duration-200
                        cursor-pointer border border-dashed border-zinc-300
                        rounded-lg p-2.5 sm:p-3 hover:border-orange-400 
                        hover:bg-orange-50/30 transition-all"
                    />
                    <p className="mt-2 text-[10px] sm:text-xs text-zinc-500 flex items-start gap-1.5">
                      <span className="text-blue-500 text-sm">ℹ️</span>
                      <span>الحد الأقصى: 5 ميجابايت</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Social Media - Compact */}
            <div className="lg:col-span-1">
              <Card padding="md" radius="md" className="shadow-sm sticky top-4">
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5 pb-3 border-b border-zinc-100">
                  <span className="text-base">📱</span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-zinc-950">التواصل الاجتماعي</h2>
                    <p className="text-[10px] sm:text-xs text-zinc-500">روابط التواصل</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1.5">
                      <span className="text-blue-600">f</span>
                      <span>فيسبوك</span>
                    </label>
                    <Input
                      value={settings.facebook}
                      onChange={(e) => setSettings((prev) => ({ ...prev, facebook: e.target.value }))}
                      placeholder="https://facebook.com/..."
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1.5">
                      <span className="text-pink-600">📸</span>
                      <span>إنستغرام</span>
                    </label>
                    <Input
                      value={settings.instagram}
                      onChange={(e) => setSettings((prev) => ({ ...prev, instagram: e.target.value }))}
                      placeholder="https://instagram.com/..."
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1.5">
                      <span className="text-zinc-900">𝕏</span>
                      <span>تويتر / X</span>
                    </label>
                    <Input
                      value={settings.twitter}
                      onChange={(e) => setSettings((prev) => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://x.com/..."
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1.5">
                      <span className="text-zinc-900">🎵</span>
                      <span>تيك توك</span>
                    </label>
                    <Input
                      value={settings.tiktok}
                      onChange={(e) => setSettings((prev) => ({ ...prev, tiktok: e.target.value }))}
                      placeholder="https://tiktok.com/@..."
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1.5">
                      <span className="text-red-600">▶</span>
                      <span>يوتيوب</span>
                    </label>
                    <Input
                      value={settings.youtube}
                      onChange={(e) => setSettings((prev) => ({ ...prev, youtube: e.target.value }))}
                      placeholder="https://youtube.com/@..."
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1.5">
                      <span className="text-sky-600">✈</span>
                      <span>تيليجرام</span>
                    </label>
                    <Input
                      value={settings.telegram}
                      onChange={(e) => setSettings((prev) => ({ ...prev, telegram: e.target.value }))}
                      placeholder="https://t.me/..."
                      className="h-8 sm:h-9 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="pt-3 mt-3 border-t border-zinc-100 p-2.5 bg-blue-50/60 rounded-lg">
                    <p className="text-[9px] sm:text-[10px] text-blue-800 leading-relaxed">
                      💡 الروابط الاجتماعية ستظهر في تذييل الموقع بعد الحفظ
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Save Button - Compact */}
          <div className="sticky bottom-4 z-20 pt-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                className="w-full py-2.5 sm:py-3 px-4 text-sm font-bold bg-transparent hover:bg-white/10 transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2.5">
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>حفظ الإعدادات</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}