import { db, products, categories } from '@/db';
import { desc, eq } from 'drizzle-orm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { CategoryCard } from '@/components/home/CategoryCard';
import { ProductCard } from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getFeaturedProducts() {
  try {
    return await db.query.products.findMany({
      where: eq(products.featured, true),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
      limit: 8,
      orderBy: [desc(products.createdAt)],
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getLatestProducts() {
  try {
    return await db.query.products.findMany({
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
      limit: 8,
      orderBy: [desc(products.createdAt)],
    });
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, latestProducts] = await Promise.all([
    getFeaturedProducts(),
    getLatestProducts(),
  ]);

  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white font-sans">
      <Header />
      
      <main className="relative overflow-hidden">
        {/* Premium Light Ambient Background */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-400/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-orange-300/6 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <Hero />

        {/* Categories Section */}
        <section className="py-20 md:py-28 relative">
          <div className="container-custom">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold badge-orange mb-5 uppercase tracking-wider shadow-sm">
                ✨ التصنيفات المتاحة
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-5">
                تصفح حسب الفئة
              </h2>
              <div className="h-1.5 w-20 bg-orange-500 rounded-full mb-5 shadow-orange"></div>
              <p className="text-base md:text-lg text-neutral-700 font-medium max-w-2xl leading-relaxed">
                اختر من بين مجموعة واسعة من المنتجات الإلكترونية المميزة والمصممة لتلائم احتياجاتك
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <CategoryCard
                title="إكسسوارات الموبايل"
                icon="📱"
                href="/products?category=mobile-accessories"
                description="حافظات، واقيات شاشة وأكثر"
              />
              <CategoryCard
                title="الشواحن والكابلات"
                icon="🔌"
                href="/products?category=chargers"
                description="شواحن سريعة وكابلات متينة"
              />
              <CategoryCard
                title="السماعات"
                icon="🎧"
                href="/products?category=headphones"
                description="سماعات سلكية ولاسلكية"
              />
              <CategoryCard
                title="مضخمات الصوت"
                icon="🔊"
                href="/products?category=speakers"
                description="سماعات بلوتوث وسلكية"
              />
              <CategoryCard
                title="أجهزة إلكترونية"
                icon="💻"
                href="/products?category=electronics"
                description="أجهزة وملحقات متنوعة"
              />
              <CategoryCard
                title="أجهزة كهربائية"
                icon="⚡"
                href="/products?category=electrical"
                description="أجهزة كهربائية عملية"
              />
              <CategoryCard
                title="العروض الخاصة"
                icon="🏷️"
                href="/products?featured=true"
                description="خصومات وعروض حصرية"
              />
              <CategoryCard
                title="المنتجات الجديدة"
                icon="✨"
                href="/products?sort=newest"
                description="أحدث المنتجات المضافة"
              />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-20 md:py-28 relative">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse shadow-orange" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">منتجات مختارة بعناية</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-3">
                    المنتجات المميزة
                  </h2>
                  <p className="text-neutral-700 font-medium text-base md:text-lg">
                    أفضل العروض والمنتجات المختارة خصيصاً لك
                  </p>
                </div>
                
                <a
                  href="/products?featured=true"
                  className="hidden md:inline-flex items-center gap-2.5 text-neutral-900 hover:text-orange-600 font-bold transition-all group duration-300 text-base"
                >
                  <span className="border-b-2 border-neutral-900 group-hover:border-orange-600 pb-0.5 transition-colors">عرض جميع المميزة</span>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                    <svg className="w-4.5 h-4.5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center mt-12 md:hidden">
                <a
                  href="/products?featured=true"
                  className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl btn-primary"
                >
                  <span>عرض المزيد من المنتجات</span>
                  <svg className="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Latest Products Section - Premium Light Glass */}
        {latestProducts.length > 0 && (
          <section className="py-20 md:py-28 relative">
            {/* Glass Background Layer */}
            <div className="absolute inset-0 glass-light pointer-events-none" />
            
            <div className="container-custom relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-3 block">✨ وصل حديثاً</span>
                  <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-3">
                    أحدث المنتجات
                  </h2>
                  <p className="text-neutral-700 text-base md:text-lg font-medium">
                    تصفح أحدث الإضافات والتقنيات المتوفرة الآن
                  </p>
                </div>
                
                <a
                  href="/products"
                  className="hidden md:inline-flex items-center gap-2.5 text-neutral-900 hover:text-orange-600 font-bold transition-all group duration-300 text-base"
                >
                  <span className="border-b-2 border-neutral-900 group-hover:border-orange-600 pb-0.5 transition-colors">عرض جميع المنتجات</span>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                    <svg className="w-4.5 h-4.5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
                {latestProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center mt-12 md:hidden">
                <a
                  href="/products"
                  className="inline-flex items-center justify-center w-full py-4 px-6 rounded-xl btn-primary"
                >
                  <span>عرض جميع المنتجات</span>
                  <svg className="w-5 h-5 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us - Premium Benefits */}
        <section className="py-20 md:py-28 relative">
          <div className="container-custom">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-3">💎 مميزات الحامد</span>
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight mb-5">
                لماذا تختار الحامد للتجارة؟
              </h2>
              <div className="h-1.5 w-20 bg-orange-500 rounded-full mx-auto mb-5 shadow-orange"></div>
              <p className="text-neutral-700 text-base md:text-lg font-medium leading-relaxed">
                نضع الجودة والثقة في صدارة أولوياتنا لنقدم لك تجربة تسوق استثنائية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon="🛍️"
                title="منتجات متنوعة"
                description="مجموعة واسعة من أحدث الإكسسوارات والأجهزة الإلكترونية المتميزة"
              />
              <FeatureCard
                icon="💰"
                title="أسعار منافسة"
                description="أفضل الأسعار في السوق السوري مع عروض حصرية ومستمرة"
              />
              <FeatureCard
                icon="🏪"
                title="خدمة موثوقة"
                description="متجر معتمد ومتواجد دائماً لخدمتك وضمان رضاك الكامل"
              />
              <FeatureCard
                icon="🚀"
                title="توصيل سريع"
                description="شبكة توصيل تغطي جميع المحافظات السورية بسرعة وكفاءة"
              />
            </div>
          </div>
        </section>

        {/* Premium Call To Action - Light Glass Style */}
        <section className="py-20 md:py-28 relative">
          <div className="container-custom">
            <div className="glass-panel-strong rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
              
              {/* Ambient Glow Effects */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-orange-300/8 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-orange mb-6 shadow-sm">
                  <span>💬 دعم فني مباشر</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight mb-5">
                  هل تحتاج مساعدة في الاختيار؟
                </h2>
                
                <p className="text-neutral-700 text-base sm:text-lg mb-10 leading-relaxed font-medium">
                  فريقنا متواجد دائماً للرد على استفساراتك ومساعدتك في اختيار المنتج المناسب لك
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/963"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>تواصل عبر واتساب</span>
                  </a>
                  
                  <a
                    href="tel:+963"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 btn-primary"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>اتصل بنا مباشرة</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="group glass-card p-8 hover:bg-white/95 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
      <div className="w-16 h-16 rounded-2xl bg-white/80 border border-orange-200/60 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 group-hover:border-orange-300 group-hover:bg-orange-50/80 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black text-neutral-900 mb-3 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm md:text-base text-neutral-700 font-medium leading-relaxed">
        {description}
      </p>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}