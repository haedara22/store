'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface HeroProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  images: { url: string }[];
}

export function Hero() {
  const [whatsapp, setWhatsapp] = useState('963900000000');
  const [heroProduct, setHeroProduct] = useState<HeroProduct | null>(null);

  useEffect(() => {
    // جلب الإعدادات ورقم الواتساب والمنتج المميز
    fetch('/api/settings')
      .then(res => res.json())
      .then((data: any) => {
        setWhatsapp(data.whatsapp || '963900000000');
        
        // جلب المنتج المميز إذا كان محدداً
        if (data.heroProductId) {
          fetch(`/api/products/${data.heroProductId}`)
            .then(res => res.json())
            .then((product: any) => setHeroProduct(product))
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, []);
  return (
    <div className="relative overflow-hidden">
      
      {/* Premium Light Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fef3c7_0.5px,transparent_0.5px),linear-gradient(to_bottom,#fef3c7_0.5px,transparent_0.5px)] bg-[size:4rem_4rem] opacity-[0.15] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-orange-300/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-orange-200/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Content */}
      <section className="relative pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-40">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Text & Call to Actions */}
            <div className="lg:col-span-7 text-center lg:text-right">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 glass-card mb-8 shadow-sm">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-orange" />
                <span className="text-sm font-bold text-orange-600 tracking-wide">
                  الوجهة الأولى للإلكترونيات في سوريا 🇸🇾
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-neutral-900">
                كل ما تحتاجه لعالمك{' '}
                <span className="text-gradient-orange">
                  الرقمي الحديث
                </span>
              </h1>
              
              {/* Sub-Headline */}
              <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                أحدث إكسسوارات الموبايل، السماعات اللاسلكية، الشواحن السريعة، والأجهزة الذكية بجودة عالية وأسعار منافسة
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/products" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto btn-primary text-lg px-10 py-4 rounded-xl">
                    تصفح المنتجات 🛍️
                  </button>
                </Link>

                <a 
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto btn-secondary text-lg px-10 py-4 rounded-xl">
                    تواصل عبر واتساب 💬
                  </button>
                </a>
              </div>

              {/* Metrics */}
              <div className="pt-8 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-right">
                  <p className="text-3xl sm:text-4xl font-black text-neutral-900">+5000</p>
                  <p className="text-sm text-neutral-600 font-semibold mt-1">عميل سعيد</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-3xl sm:text-4xl font-black text-orange-600">100%</p>
                  <p className="text-sm text-neutral-600 font-semibold mt-1">منتجات أصلية</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-3xl sm:text-4xl font-black text-neutral-900">24/7</p>
                  <p className="text-sm text-neutral-600 font-semibold mt-1">دعم متواصل</p>
                </div>
              </div>

            </div>

            {/* Visual Product Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-orange-400/40 rounded-3xl blur-2xl opacity-60 animate-pulse" />
                
                {/* Main Card */}
                <div className="relative glass-panel-strong p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <span className="badge-orange font-black shadow-sm">
                      🔥 العرض الأفضل
                    </span>
                    <span className="text-xs font-semibold text-neutral-600">متوفر الآن</span>
                  </div>

                  <div className="w-full h-56 rounded-2xl bg-gradient-to-b from-neutral-50/80 to-white border border-neutral-200/60 flex items-center justify-center text-8xl shadow-inner mb-6 relative overflow-hidden group">
                    {heroProduct && heroProduct.images && heroProduct.images[0] ? (
                      <Image
                        src={heroProduct.images[0].url}
                        alt={heroProduct.name}
                        fill
                        className="object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span className="transform group-hover:scale-110 transition-transform duration-500">🎧</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {heroProduct?.name || 'سماعات بريميوم لاسلكية'}
                    </h3>
                    <p className="text-sm text-neutral-600 font-medium">
                      {heroProduct?.description?.substring(0, 60) || 'عزل ضوضاء فعال مع بطارية تدوم 30 ساعة'}
                      {heroProduct?.description && heroProduct.description.length > 60 && '...'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60">
                    <div>
                      <span className="text-xs text-neutral-500 block mb-1">السعر الخاص</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-orange-600">
                          {heroProduct ? formatCurrency(heroProduct.price) : '185,000 ل.س'}
                        </span>
                        {heroProduct?.compareAtPrice && (
                          <span className="text-sm text-neutral-400 line-through">
                            {formatCurrency(heroProduct.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link 
                      href={heroProduct ? `/products/${heroProduct.slug}` : '/products'} 
                     style={{color: "white"}} className="px-5 py-3 bg-neutral-900 hover:bg-orange-500 font-bold text-sm rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                      عرض التفاصيل ←
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Wave Transition */}
      <div className="relative w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-20 sm:h-28 md:h-36 fill-current text-white" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C150,90 350,-40 500,65 C650,165 900,10 1200,40 L1200,120 L0,120 Z" 
            className="fill-orange-400/5" 
          />
          <path 
            d="M0,30 C300,110 550,10 800,75 C980,120 1120,40 1200,50 L1200,120 L0,120 Z" 
          />
        </svg>

        {/* Features Grid Below Wave */}
        <div className="bg-white pb-16 pt-2">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-20 sm:-mt-24 relative z-30">
              <FeatureItem icon="🚚" title="توصيل سريع" desc="لجميع المحافظات" />
              <FeatureItem icon="💯" title="جودة مضمونة" desc="منتجات أصلية" />
              <FeatureItem icon="💰" title="أسعار منافسة" desc="أفضل قيمة مقابل السعر" />
              <FeatureItem icon="💬" title="دعم سريع" desc="تجاوب فوري عبر واتساب" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 p-5 glass-panel rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-white/80 border border-orange-200/60 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-orange-50 group-hover:border-orange-300 transition-all duration-300 flex-shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">{title}</h4>
        <p className="text-xs text-neutral-600 mt-0.5 font-medium">{desc}</p>
      </div>
    </div>
  );
}