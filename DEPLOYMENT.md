# دليل النشر | Deployment Guide

## 🚀 نشر المتجر على Cloudflare Pages

### المتطلبات الأساسية

1. **حساب Cloudflare**
2. **قاعدة بيانات Neon PostgreSQL**
3. **Git Repository** (GitHub, GitLab, or Bitbucket)

---

## 📋 خطوات النشر

### 1. تجهيز قاعدة البيانات

```bash
# تطبيق الـ Schema على قاعدة البيانات
npm run db:push

# إضافة بيانات تجريبية (اختياري)
npm run db:seed
```

### 2. تجهيز المتغيرات البيئية

في Cloudflare Pages، أضف المتغيرات التالية:

```
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. إعدادات Build في Cloudflare

- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Node version**: 18.x أو أحدث

### 4. Cloudflare Pages Setup

```bash
# تثبيت Wrangler CLI
npm install -g wrangler

# تسجيل الدخول
wrangler login

# نشر المشروع
npm run build
npx wrangler pages deploy .next
```

---

## ⚙️ إعدادات مهمة

### Environment Variables

| المتغير | الوصف | مطلوب |
|---------|--------|-------|
| `DATABASE_URL` | رابط قاعدة بيانات Neon | ✅ نعم |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع | ✅ نعم |

### Custom Domain

1. اذهب إلى **Cloudflare Pages Settings**
2. اضغط على **Custom Domains**
3. أضف اسم النطاق الخاص بك
4. سيتم إعداد SSL تلقائياً

---

## 🔐 الأمان

### بعد النشر

1. **غيّر بيانات الدخول للإدارة**
   - اذهب إلى قاعدة البيانات
   - حدّث `admin_users` table
   - استخدم bcrypt لتشفير كلمة المرور

2. **فعّل Cloudflare Security Features**
   - WAF (Web Application Firewall)
   - Rate Limiting
   - Bot Protection

3. **راجع CORS Settings** إذا كنت تستخدم API خارجي

---

## 📊 المراقبة والأداء

### Cloudflare Analytics

- عدد الزوار
- استهلاك Bandwidth
- أوقات الاستجابة
- معدلات الخطأ

### تحسين الأداء

```javascript
// في next.config.ts
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

---

## 🔄 التحديثات

### Git Push Deployment

عند push إلى branch الرئيسي، سيتم النشر تلقائياً.

```bash
git add .
git commit -m "Update: feature description"
git push origin main
```

---

## 📝 بعد النشر

### قائمة تحقق

- [ ] اختبار جميع الصفحات
- [ ] اختبار عملية الشراء كاملة
- [ ] اختبار تتبع الطلبات
- [ ] اختبار الموقع على الموبايل
- [ ] اختبار شام كاش
- [ ] مراجعة سرعة الموقع (PageSpeed Insights)
- [ ] فحص SEO (Google Search Console)
- [ ] إعداد Google Analytics (اختياري)
- [ ] إضافة معلومات المتجر الحقيقية
- [ ] رفع QR Code شام كاش
- [ ] تحديث أرقام التواصل

---

## 🛠️ استكشاف الأخطاء

### مشكلة: Database Connection Failed

```bash
# تحقق من صحة DATABASE_URL
# تأكد من أن IP الخاص بـ Cloudflare مسموح في Neon
```

### مشكلة: Build Fails

```bash
# نظف الـ cache وأعد البناء
rm -rf .next
npm run build
```

### مشكلة: Images لا تظهر

```bash
# تحقق من إعدادات images في next.config.ts
# تأكد من أن الصور موجودة في المسار الصحيح
```

---

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع logs في Cloudflare Dashboard
2. تحقق من الـ Environment Variables
3. راجع Database Logs في Neon

---

## 🎉 تهانينا!

متجرك الإلكتروني الآن على الإنترنت! 🚀

الموقع جاهز لاستقبال الطلبات والعملاء.
