import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'الصفحة غير موجودة | الحامد للتجارة',
  description: 'عذراً، الصفحة التي تبحث عنها غير موجودة',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-orange-500 selection:text-white font-sans dir-rtl">
      <Header />

      <main className="flex-1 relative overflow-hidden flex items-center justify-center py-20 lg:py-32">
        {/* Decorative Ambient Background Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-zinc-100 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Ultra-Modern 404 Number Badge & Visual */}
            <div className="relative mb-8 flex justify-center items-center">
              <span className="text-[140px] sm:text-[180px] md:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 via-zinc-100 to-white select-none leading-none tracking-tighter drop-shadow-sm">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-950 text-white shadow-xl shadow-zinc-950/20 border border-zinc-800 text-sm font-medium animate-bounce">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span>عذراً! المحتوى مفقود</span>
                </div>
              </div>
            </div>

            {/* Message Header */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4 leading-tight">
              الصفحة التي تبحث عنها غير موجودة
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-600 mb-10 leading-relaxed max-w-xl mx-auto">
              ربما تم نقل الصفحة، أو حذفها، أو أن الرابط الذي استخدمته غير صحيح. لا تقلق، يمكنك العودة واستكشاف أفضل منتجاتنا!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/" className="w-full sm:w-auto">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>العودة للرئيسية</span>
                  <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>

              <Link href="/products" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-950 font-bold border border-zinc-200/80 rounded-2xl transition-all duration-300 hover:border-zinc-300 flex items-center justify-center gap-2"
                >
                  <span>تصفح المنتجات</span>
                  <span className="text-lg">🛍️</span>
                </Button>
              </Link>
            </div>

            {/* Quick Help Cards Section */}
            <div className="pt-10 border-t border-zinc-200/80">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-6">
                هل تحتاج مساعدة سريعة؟
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
                <Link 
                  href="/order-tracking" 
                  className="group p-4 rounded-2xl bg-zinc-50/50 hover:bg-white border border-zinc-200/80 hover:border-orange-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-orange-50 border border-zinc-200/60 group-hover:border-orange-200 flex items-center justify-center text-lg transition-colors">
                    📦
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-950 group-hover:text-orange-600 transition-colors">
                      تتبع طلبك
                    </h2>
                    <p className="text-xs text-zinc-500">معرفة حالة الشحن</p>
                  </div>
                </Link>

                <a 
                  href="https://wa.me/963" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-zinc-50/50 hover:bg-white border border-zinc-200/80 hover:border-orange-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-orange-50 border border-zinc-200/60 group-hover:border-orange-200 flex items-center justify-center text-lg transition-colors">
                    💬
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-950 group-hover:text-orange-600 transition-colors">
                      تواصل معنا
                    </h2>
                    <p className="text-xs text-zinc-500">الدعم المباشر عبر واتساب</p>
                  </div>
                </a>

                <Link 
                  href="/cart" 
                  className="group p-4 rounded-2xl bg-zinc-50/50 hover:bg-white border border-zinc-200/80 hover:border-orange-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-orange-50 border border-zinc-200/60 group-hover:border-orange-200 flex items-center justify-center text-lg transition-colors">
                    🛒
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-950 group-hover:text-orange-600 transition-colors">
                      سلة المشتريات
                    </h2>
                    <p className="text-xs text-zinc-500">مراجعة منتجاتك المختارة</p>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}