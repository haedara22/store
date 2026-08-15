# الحامد للتجارة | متجر إلكتروني احترافي

متجر إلكتروني عصري ومتطور متخصص في إكسسوارات الموبايلات، مضخمات الصوت، الأجهزة الكهربائية والإلكترونية.

## 🎨 الهوية البصرية

التصميم يعتمد على هوية بصرية راقية بألوان:
- **الأبيض**: المساحات النظيفة والخلفيات
- **الأسود**: النصوص الرئيسية والعناصر المهمة
- **البرتقالي** (#f97316): اللون الأساسي للعلامة التجارية

## ✨ المميزات

### التصميم
- ✅ تصميم عصري Premium بمستوى عالمي
- ✅ UI/UX احترافي مدروس بعناية
- ✅ دعم كامل للغة العربية مع RTL
- ✅ متجاوب بالكامل مع جميع أحجام الشاشات (320px - 2560px)
- ✅ Design System متكامل وموحد
- ✅ Animations خفيفة واحترافية
- ✅ Dark mode ready

### الوظائف
- 🛍️ عرض المنتجات باحترافية
- 🔍 بحث متقدم وفلترة
- 🛒 سلة تسوق متطورة
- 💳 دعم الدفع عند الاستلام وشام كاش
- 📦 نظام تتبع الطلبات
- 🎯 إدارة المخزون
- 📊 لوحة إدارة احترافية
- 📱 تكامل مع WhatsApp

### الأداء
- ⚡ تحميل سريع جداً
- 🚀 Server Components
- 📦 Image Optimization
- 🎯 Core Web Vitals محسّنة
- 🔄 ISR & SSG عند الحاجة

### SEO & Accessibility
- 🔍 SEO-friendly من البداية
- ♿ WCAG 2.1 compliant
- 📱 Mobile-first approach
- 🎯 Semantic HTML
- 🏷️ Structured Data

## 🛠️ التقنيات

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Deployment**: Cloudflare Pages
- **Language**: TypeScript (Strict Mode)
- **Validation**: Zod
- **Authentication**: NextAuth (للإدارة)

## 📦 التثبيت

```bash
# تثبيت المكتبات
npm install

# إعداد قاعدة البيانات
npm run db:generate
npm run db:push

# إضافة بيانات تجريبية (اختياري)
npm run db:seed

# تشغيل السيرفر
npm run dev
```

## 🌍 المتغيرات البيئية

أنشئ ملف `.env` وأضف:

```env
DATABASE_URL="your_neon_database_url"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 📱 الصفحات

### صفحات العملاء
- `/` - الصفحة الرئيسية
- `/products` - جميع المنتجات
- `/products/[slug]` - تفاصيل المنتج
- `/cart` - سلة المشتريات
- `/checkout` - إتمام الطلب
- `/order-success` - نجاح الطلب
- `/order-tracking` - تتبع الطلب

### صفحات الإدارة
- `/admin` - لوحة التحكم
- `/admin/products` - إدارة المنتجات
- `/admin/orders` - إدارة الطلبات
- `/admin/categories` - إدارة التصنيفات
- `/admin/settings` - الإعدادات

## 🎯 نظام التصميم

### الألوان
```css
/* Brand Colors */
orange-500: #f97316  /* Primary */
neutral-900: #171717 /* Text */
neutral-50: #fafafa  /* Background */
```

### الخطوط
```css
font-family: 'Cairo', -apple-system, system-ui, sans-serif;
```

### التباعد
```
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px
```

### الحواف المستديرة
```
sm: 0.375rem, md: 0.625rem, lg: 0.75rem, xl: 1rem
```

## 📐 Breakpoints

```css
sm: 640px   /* Mobile Large */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop Large */
2xl: 1536px /* Desktop XL */
```

## 🚀 الأوامر

```bash
# التطوير
npm run dev

# البناء
npm run build

# التشغيل (Production)
npm run start

# Lint
npm run lint

# قاعدة البيانات
npm run db:generate  # إنشاء Migrations
npm run db:push      # تطبيق Migrations
npm run db:studio    # فتح Drizzle Studio
npm run db:seed      # إضافة بيانات تجريبية
```

## 📝 العملة

جميع الأسعار بالليرة السورية الجديدة (ل.س)

## 🔐 الأمان

- ✅ Validation على جميع المدخلات
- ✅ حماية API Routes
- ✅ Session Management آمن
- ✅ Rate Limiting
- ✅ CSRF Protection
- ✅ XSS Prevention

## 📄 الترخيص

هذا المشروع مطور خصيصاً لمحل الحامد للتجارة.

---

Made with ❤️ for Al-Hamed Trading
