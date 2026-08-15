'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // تحديث الوقت الحي - less frequent
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('ar-SY', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // إغلاق القائمة الجانبية عند تغيّر المسار
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (!confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      alert('حدث خطأ أثناء تسجيل الخروج');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navigation = [
    { 
      name: 'لوحة التحكم', 
      href: '/admin/dashboard', 
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      name: 'المنتجات', 
      href: '/admin/products', 
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    { 
      name: 'التصنيفات', 
      href: '/admin/categories', 
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    { 
      name: 'الطلبات', 
      href: '/admin/orders', 
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      badge: 'جديد'
    },
    { 
      name: 'محتوى الرئيسية', 
      href: '/admin/homepage', 
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    { 
      name: 'الإعدادات', 
      href: '/admin/settings', 
      icon: (
        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50/50 font-sans dir-rtl antialiased">
      {/* Top Header - Compact */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/98 backdrop-blur-md shadow-sm">
        <div className="flex h-12 sm:h-14 items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-1.5 sm:p-2 text-zinc-600 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 lg:hidden"
              aria-label="فتح القائمة"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/admin/dashboard" className="flex items-center gap-2 group min-w-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 font-bold text-sm text-white shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
                ح
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-bold text-sm leading-tight text-zinc-900 truncate">لوحة التحكم</div>
                <div className="text-[10px] font-medium text-zinc-500 truncate">متجر الحامد</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Live Clock Display */}
            {currentTime && (
              <div className="hidden md:flex items-center gap-1.5 rounded-lg bg-zinc-100/80 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-zinc-700 border border-zinc-200/50">
                <svg className="h-3 w-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="tabular-nums">{currentTime}</span>
              </div>
            )}

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-zinc-100/80 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-zinc-700 transition-all duration-200 hover:bg-zinc-200 active:scale-95"
            >
              <span className="whitespace-nowrap">زيارة المتجر</span>
              <svg className="h-3 w-3 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              isLoading={isLoggingOut}
              className="h-7 sm:h-8 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold text-[10px] sm:text-xs px-2 sm:px-3"
            >
              {isLoggingOut ? 'جارٍ الخروج...' : 'تسجيل الخروج'}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar - Desktop Compact */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0 border-l border-zinc-200/60 bg-white sticky top-12 sm:top-14 h-[calc(100vh-3rem)] sm:h-[calc(100vh-3.5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent hover:scrollbar-thumb-zinc-400">
          <nav className="p-2.5 xl:p-3 space-y-0.5">
            {navigation.map((item) => {
              const isActive = item.href === '/admin/dashboard'
                ? pathname === '/admin/dashboard'
                : pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20'
                      : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`}>
                      {item.icon}
                    </div>
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[9px] rounded-full font-bold flex-shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700 border border-orange-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar - Mobile Drawer */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm transition-all duration-300"
              onClick={() => setIsSidebarOpen(false)}
            />

            <aside className="relative right-0 w-72 max-w-[85vw] bg-white h-full shadow-xl flex flex-col z-10 border-l border-zinc-200 animate-in slide-in-from-right duration-300">
              <div className="p-3.5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-b from-zinc-50 to-white">
                <div className="font-bold text-sm text-zinc-900">القائمة الرئيسية</div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all active:scale-95"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="p-2.5 space-y-0.5 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
                {navigation.map((item) => {
                  const isActive = item.href === '/admin/dashboard'
                    ? pathname === '/admin/dashboard'
                    : pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20'
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 text-[9px] rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-zinc-100 bg-gradient-to-t from-zinc-50 to-white">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-zinc-100 text-[10px] sm:text-xs font-semibold text-zinc-700 hover:bg-zinc-200 transition-all active:scale-95"
                >
                  <span>زيارة المتجر</span>
                  <svg className="h-3 w-3 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}