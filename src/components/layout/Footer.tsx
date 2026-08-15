'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { STORE_NAME } from '@/lib/constants';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';

interface SiteSettings {
  storeName: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  telegram: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<SiteSettings>({
    storeName: STORE_NAME,
    phone: '09XX XXX XXX',
    whatsapp: '963900000000',
    address: 'سوريا - دمشق',
    workingHours: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    youtube: '',
    telegram: '',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data as SiteSettings))
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  return (
    <footer className="relative mt-20">
      {/* Premium Light Glass Background */}
      <div className="glass-light border-t border-neutral-200/60">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/3 w-96 h-32 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            
            {/* About Section */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-orange">
                  ح
                </div>
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{settings.storeName}</h3>
              </div>
              
              <p className="text-neutral-700 text-sm md:text-base leading-relaxed font-medium">
                متجرك الموثوق لإكسسوارات الموبايلات والأجهزة الإلكترونية في سوريا. 
                نقدم منتجات عالية الجودة بأسعار منافسة.
              </p>
              
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                {settings.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="صفحة الفيسبوك"
                    className="w-11 h-11 glass hover:bg-blue-600 text-neutral-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {settings.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="صفحة الإنستغرام"
                    className="w-11 h-11 glass hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 text-neutral-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {settings.twitter && (
                  <a
                    href={settings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="صفحة تويتر"
                    className="w-11 h-11 glass hover:bg-black text-neutral-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {settings.tiktok && (
                  <a
                    href={settings.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="صفحة تيك توك"
                    className="w-11 h-11 glass hover:bg-black text-neutral-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                )}
                {settings.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="قناة يوتيوب"
                    className="w-11 h-11 glass hover:bg-red-600 text-neutral-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {settings.telegram && (
                  <a
                    href={settings.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="قناة تيليجرام"
                    className="w-11 h-11 glass hover:bg-blue-500 text-neutral-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                )}
                {!settings.facebook && !settings.instagram && !settings.twitter && !settings.tiktok && !settings.youtube && !settings.telegram && (
                  <p className="text-sm text-neutral-500 py-1">يمكن إضافة روابط التواصل من لوحة التحكم</p>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-neutral-900 font-black mb-6 text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                روابط سريعة
              </h4>
              <ul className="space-y-3.5 text-sm md:text-base font-medium">
                <li>
                  <Link href="/" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    جميع المنتجات
                  </Link>
                </li>
                <li>
                  <Link href="/products?featured=true" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    العروض الخاصة
                  </Link>
                </li>
                <li>
                  <Link href="/order-tracking" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    تتبع الطلب
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    سلة المشتريات
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-neutral-900 font-black mb-6 text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                التصنيفات
              </h4>
              <ul className="space-y-3.5 text-sm md:text-base font-medium">
                <li>
                  <Link href="/products?category=mobile-accessories" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    إكسسوارات الموبايل
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=chargers" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    الشواحن والكابلات
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=headphones" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    السماعات
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=speakers" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    مضخمات الصوت
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=electronics" className="text-neutral-700 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                    <span className="text-xs text-orange-500 transition-transform group-hover:-translate-x-1">◀</span>
                    أجهزة إلكترونية
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-neutral-900 font-black mb-6 text-lg flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                تواصل معنا
              </h4>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneIcon className="w-4.5 h-4.5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">الهاتف</p>
                    <a href={`tel:${settings.phone}`} className="text-neutral-700 hover:text-orange-600 font-semibold transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                    <WhatsAppIcon className="w-4.5 h-4.5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">واتساب</p>
                    <a href={`https://wa.me/${settings.whatsapp}`} className="text-neutral-700 hover:text-emerald-600 font-semibold transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4.5 h-4.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">العنوان</p>
                    <p className="text-neutral-700 font-semibold">{settings.address}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200/60">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-semibold text-neutral-600">
              <p>© {currentYear} <span className="text-neutral-900 font-black">{settings.storeName}</span>. جميع الحقوق محفوظة.</p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="hover:text-orange-600 transition-colors">سياسة الخصوصية</Link>
                <span className="text-neutral-300">•</span>
                <Link href="/terms" className="hover:text-orange-600 transition-colors">الشروط والأحكام</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-50 no-print">
        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
        <a
          href={`https://wa.me/${settings.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="تواصل عبر واتساب"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      </div>
    </footer>
  );
}