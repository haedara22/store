'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: any = await response.json();

      if (!response.ok) {
        setError(data.error || 'حدث خطأ أثناء تسجيل الدخول');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Decorative Background - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-300/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo Section - Compact */}
        <div className="text-center mb-6 sm:mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/20 mb-4">
            <span className="text-2xl sm:text-3xl">🔐</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
            لوحة التحكم
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
            متجر الحامد الإلكتروني
          </p>
        </div>

        {/* Login Form - Compact */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100/40 p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {error && (
              <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm font-medium animate-fade-in flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <Input
              label="اسم المستخدم"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="أدخل اسم المستخدم"
              required
              autoComplete="username"
              className="h-9 sm:h-10 text-sm"
            />

            <Input
              label="كلمة المرور"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="أدخل كلمة المرور"
              required
              autoComplete="current-password"
              className="h-9 sm:h-10 text-sm"
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full shadow-md shadow-orange-500/20 h-10 sm:h-11 text-sm font-bold rounded-lg"
              isLoading={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>
        </div>

        {/* Footer - Compact */}
        <p className="text-center text-[10px] sm:text-xs text-zinc-400 mt-5 sm:mt-6">
          © 2024 متجر الحامد. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  );
}