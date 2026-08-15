'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { STORE_NAME } from '@/lib/constants';
import { getCart, getCartItemCount } from '@/lib/cart';
import { CartIcon } from '@/components/icons/CartIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';

const navLinks = [
  { href: '/',                                    label: 'الرئيسية'           },
  { href: '/products',                            label: 'المنتجات'           },
  { href: '/products?category=mobile-accessories',label: 'إكسسوارات الموبايل'},
  { href: '/products?category=chargers',          label: 'الشواحن والكابلات' },
  { href: '/products?category=headphones',        label: 'السماعات'           },
  { href: '/products?category=speakers',          label: 'مضخمات الصوت'       },
  { href: '/products?featured=true',              label: 'العروض', highlight: true },
  { href: '/order-tracking',                      label: 'تتبع الطلب'         },
];

interface SiteSettings {
  storeName: string;
  phone: string;
  whatsapp: string;
  address: string;
}

export function Header() {
  const [cartCount,      setCartCount]      = useState(0);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [scrolled,       setScrolled]       = useState(false);
  const [settings,       setSettings]       = useState<SiteSettings>({
    storeName: STORE_NAME,
    phone: '09XX XXX XXX',
    whatsapp: '963900000000',
    address: 'سوريا - دمشق',
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* ── Fetch Settings from API ── */
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data as SiteSettings))
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  /* ── Cart & Scroll ── */
  useEffect(() => {
    const sync = () => setCartCount(getCartItemCount());
    sync();
    window.addEventListener('cartUpdated', sync);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('cartUpdated', sync);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Auto-focus search input when opened ── */
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  /* ── Close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Prevent body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 glass-panel-strong transition-all duration-300 ${
          scrolled ? 'shadow-lg backdrop-blur-xl' : 'shadow-sm'
        }`}
        role="banner"
      >
        {/* ── Announcement Bar - Premium Glass Style ── */}
        <div className="glass-light border-b border-neutral-200/40">
          <div className="container-custom">
            <div className="flex items-center justify-between h-10 text-xs font-semibold">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 text-neutral-700 hover:text-orange-600 transition-colors"
                aria-label="اتصل بنا"
              >
                <PhoneIcon className="w-4 h-4" />
                <span>{settings.phone}</span>
              </a>
              <span className="hidden sm:block text-neutral-600">
                📦 شحن سريع لجميع المحافظات السورية
              </span>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>واتساب</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Header Row ── */}
        <div className="container-custom">
          <div className="flex items-center gap-4 h-16 md:h-18">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group"
              aria-label={`${settings.storeName} - الصفحة الرئيسية`}
            >
              <div style={{background: "orange"}} className="w-11 h-11 gradient-orange rounded-xl flex items-center justify-center text-oange-600 font-black text-lg shadow-orange group-hover:shadow-orange-lg transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                ح
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="block text-base font-black text-neutral-900 tracking-tight group-hover:text-orange-600 transition-colors">{settings.storeName}</span>
                <span className="block text-xs text-neutral-600 font-semibold">جودة · ثقة · ابتكار</span>
              </div>
            </Link>

            {/* Search Bar – Desktop - Premium Design */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="w-full group" role="search">
                <div className="relative">
                  {/* Search Icon on Right */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-neutral-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  
                  {/* Input Field */}
                  <input
                    type="search"
                    placeholder="ابحث عن سماعات، شواحن، إكسسوارات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pr-12 pl-24 rounded-xl border-2 border-neutral-200/60 bg-white/80 backdrop-blur-sm text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 transition-all duration-300"
                    aria-label="ابحث عن منتج"
                  />
                  
                  {/* Search Button */}
                  <button
                    type="submit"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold rounded-lg shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                    aria-label="بحث"
                  >
                    <span>بحث</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mr-auto lg:mr-0">
              {/* Search toggle – Mobile/Tablet */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-neutral-600 hover:bg-white/80 hover:text-orange-600 transition-all"
                aria-label="بحث"
                aria-expanded={searchOpen}
              >
                <SearchIcon className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-11 h-11 flex items-center justify-center rounded-xl text-neutral-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
                aria-label={`سلة المشتريات ${cartCount > 0 ? `(${cartCount} عناصر)` : ''}`}
              >
                <CartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-[1.25rem] bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-scale-in shadow-orange">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-neutral-600 hover:bg-white/80 transition-all"
                aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                {mobileOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Search Bar - Premium Design ── */}
        {searchOpen && (
          <div className="lg:hidden glass-light border-t border-neutral-200/40 animate-slide-down">
            <div className="container-custom py-4">
              <form onSubmit={handleSearch} className="group" role="search">
                <div className="relative">
                  {/* Search Icon on Right */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-neutral-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  
                  {/* Input Field */}
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="ابحث عن سماعات، شواحن..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pr-12 pl-20 rounded-xl border-2 border-neutral-200/60 bg-white/80 backdrop-blur-sm text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-orange-400 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 transition-all duration-300"
                    aria-label="ابحث عن منتج"
                  />
                  
                  {/* Search Button */}
                  <button
                    type="submit"
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-8 px-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold rounded-lg shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-1"
                    aria-label="بحث"
                  >
                    <span>بحث</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Desktop Navigation ── */}
        <nav
          className="hidden lg:block glass-light border-t border-neutral-200/40"
          aria-label="التنقل الرئيسي"
        >
          <div className="container-custom">
            <ul className="flex items-center gap-1 h-12" role="list">
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center h-full px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      link.highlight
                        ? 'text-orange-600 hover:bg-orange-50'
                        : 'text-neutral-700 hover:text-orange-600 hover:bg-white/60'
                    }`}
                  >
                    {link.label}
                    {link.highlight && (
                      <span className="mr-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500 text-white leading-none shadow-sm">
                        جديد
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30 animate-fade-in"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Menu Panel ── */}
      <nav
        id="mobile-nav"
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-80 glass-panel-strong shadow-2xl transition-transform duration-300 ease-smooth flex flex-col ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="قائمة التنقل للجوال"
        aria-hidden={!mobileOpen}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200/60">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center text-white font-bold shadow-orange">
              ح
            </div>
            <span className="font-black text-neutral-900">{settings.storeName}</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-white/80 transition-all"
            aria-label="إغلاق القائمة"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Links */}
        <ul className="flex-1 overflow-y-auto py-4 px-4" role="list">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between w-full px-5 py-4 rounded-xl mb-1 text-sm font-semibold transition-all ${
                  link.highlight
                    ? 'text-orange-600 bg-orange-50 hover:bg-orange-100'
                    : 'text-neutral-800 hover:bg-white/80 hover:text-orange-600'
                }`}
              >
                <span>{link.label}</span>
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        {/* Panel Footer */}
        <div className="p-5 border-t border-neutral-200/60 space-y-3">
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-3 w-full px-5 py-3.5 glass hover:bg-white/90 rounded-xl text-sm font-semibold text-neutral-800 transition-all"
          >
            <PhoneIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <span>اتصل بنا</span>
          </a>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-5 py-3.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-sm font-semibold text-white transition-all shadow-sm"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>واتساب</span>
          </a>
        </div>
      </nav>
    </>
  );
}
