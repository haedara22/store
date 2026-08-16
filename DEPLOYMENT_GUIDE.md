# 🚀 دليل النشر السريع على Cloudflare

## ⚠️ ملاحظة مهمة
OpenNext Cloudflare لا يعمل بشكل مثالي على Windows. لذلك سنستخدم طريقة النشر عبر Cloudflare Dashboard.

---

## 📋 الطريقة الموصى بها: النشر عبر GitHub + Cloudflare Pages

### الخطوة 1: رفع المشروع على GitHub

```bash
# تم بالفعل عمل commit للتغييرات
# الآن ارفع على GitHub

# إذا لم تكن أضفت remote بعد:
git remote add origin https://github.com/YOUR_USERNAME/alhamed.git

# ارفع الكود:
git push -u origin master
```

### الخطوة 2: إنشاء مشروع على Cloudflare Pages

1. **اذهب إلى:** https://dash.cloudflare.com
2. **اختر:** `Workers & Pages` من القائمة اليسرى
3. **انقر:** `Create application`
4. **اختر:** `Pages` Tab
5. **انقر:** `Connect to Git`

### الخطوة 3: ربط GitHub Repository

1. **اختر GitHub** وصرّح لـ Cloudflare بالوصول
2. **اختر repository:** `alhamed`
3. **انقر:** `Begin setup`

### الخطوة 4: إعدادات البناء (Build Settings)

```
Framework preset: Next.js
Build command: npm run build && npx @opennextjs/cloudflare build
Build output directory: .open-next/assets
```

**أو استخدم الإعدادات التالية:**

```yaml
Production branch: master
Build command: npm run build
Build output directory: .next
Node version: 20
```

### الخطوة 5: المتغيرات البيئية (Environment Variables)

أضف المتغيرات التالية في `Environment variables`:

```
DATABASE_URL=your_neon_database_url
SESSION_SECRET=your_random_32_char_secret
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

**للحصول على ADMIN_PASSWORD_HASH:**
```bash
npm install -g bcryptjs
node -e "console.log(require('bcryptjs').hashSync('your_password', 10))"
```

### الخطوة 6: النشر

1. **انقر:** `Save and Deploy`
2. **انتظر:** 3-5 دقائق حتى يكتمل البناء
3. **ستحصل على رابط:** `https://alhamed.pages.dev`

---

## 🔧 الطريقة البديلة: النشر المباشر عبر CLI

### المتطلبات:
```bash
# تثبيت wrangler globally
npm install -g wrangler

# تسجيل الدخول
wrangler login
```

### البناء والنشر:
```bash
# بناء المشروع
npm run build

# محاولة النشر (قد لا يعمل على Windows)
npx @opennextjs/cloudflare build
npx @opennextjs/cloudflare deploy
```

**إذا واجهت خطأ على Windows:**
استخدم WSL (Windows Subsystem for Linux):

```bash
# في WSL
wsl

# ثم نفذ الأوامر
cd /mnt/c/Users/DELL/Desktop/alhamed
npm run build
npx @opennextjs/cloudflare build
npx @opennextjs/cloudflare deploy
```

---

## 🗄️ إعداد قاعدة البيانات (Neon)

### 1. إنشاء قاعدة بيانات

1. اذهب إلى: https://neon.tech
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. انسخ `DATABASE_URL`

### 2. تشغيل Migrations

```bash
# تثبيت الأدوات
npm install -g drizzle-kit tsx

# رفع الـ schema
npm run db:push

# أو إنشاء migrations جديدة
npm run db:generate

# إنشاء أدمن افتراضي
npm run db:setup
```

---

## 🔐 إنشاء Admin User

### الطريقة 1: باستخدام البرنامج النصي

```bash
npm run db:setup
```

سيطلب منك:
- Email: `admin@alhamed.com`
- Password: `اختر كلمة سر قوية`

### الطريقة 2: يدوياً

```sql
-- في Neon SQL Editor
INSERT INTO users (id, email, password_hash, role, created_at)
VALUES (
  'usr_' || substr(md5(random()::text), 0, 22),
  'admin@alhamed.com',
  '$2a$10$...your_bcrypt_hash...',
  'admin',
  NOW()
);
```

---

## 📦 إعداد Cloudflare Bindings

### 1. KV Namespace (لتخزين الصور)

```bash
# إنشاء KV namespace
wrangler kv:namespace create IMAGES

# سيعطيك ID مثل:
# { binding = "IMAGES", id = "abc123..." }
```

### 2. إضافة في wrangler.jsonc

```json
{
  "kv_namespaces": [
    {
      "binding": "IMAGES",
      "id": "your_kv_namespace_id"
    }
  ]
}
```

### 3. Cloudflare Images (اختياري للصور الاحترافية)

1. اذهب إلى Cloudflare Dashboard
2. `Images` → `Keys & API Tokens`
3. انسخ:
   - `Account ID`
   - `API Token`

4. أضفها كمتغيرات بيئية:
```
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

---

## ✅ التحقق من النشر

بعد النشر، تأكد من:

### 1. الصفحة الرئيسية
```
✓ https://your-site.pages.dev
```

### 2. صفحة Admin
```
✓ https://your-site.pages.dev/admin/login
```

### 3. API Endpoints
```bash
# اختبار API
curl https://your-site.pages.dev/api/settings

# يجب أن يعيد:
{
  "storeName": "متجر الحامد",
  "phone": "...",
  ...
}
```

---

## 🐛 استكشاف الأخطاء

### المشكلة: Build يفشل

**الحل:**
```bash
# امسح cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### المشكلة: Database connection error

**الحل:**
- تأكد من `DATABASE_URL` صحيح في Environment Variables
- تأكد من أن Neon database active
- جرّب الاتصال محلياً أولاً

### المشكلة: Admin login لا يعمل

**الحل:**
```bash
# أنشئ admin جديد
npm run db:setup

# أو غيّر الباسورد في database مباشرة
```

### المشكلة: الصور لا تُرفع

**الحل:**
- تأكد من إعداد KV namespace
- تأكد من binding name = `IMAGES`
- للتطوير: ستستخدم Data URLs تلقائياً

---

## 🔄 تحديثات مستقبلية

### لتحديث الموقع:

```bash
# 1. اعمل التغييرات
# 2. commit
git add .
git commit -m "Update feature X"

# 3. push
git push origin master

# ✓ Cloudflare ستبني وتنشر تلقائياً!
```

---

## 📊 المراقبة والتحليلات

### Cloudflare Analytics

1. اذهب إلى Dashboard
2. `Workers & Pages` → `alhamed`
3. `Metrics & Analytics`

ستجد:
- عدد الطلبات
- سرعة الاستجابة
- الأخطاء
- حركة المرور

---

## 🚀 نصائح للأداء

### 1. تفعيل Caching
```javascript
// في wrangler.jsonc
{
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "alhamed"
    }
  ]
}
```

### 2. تحسين الصور
```bash
# استخدم Cloudflare Images
# أو قلل حجم الصور قبل الرفع
```

### 3. استخدام CDN
- كل ملفات Static تُخدم من CDN تلقائياً
- سرعة عالمية ممتازة

---

## 📞 الدعم

### روابط مفيدة:
- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **Next.js on Cloudflare:** https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **OpenNext Cloudflare:** https://opennext.js.org/cloudflare

### إذا واجهت مشاكل:
1. راجع Logs في Cloudflare Dashboard
2. راجع `DEPLOYMENT.md` للتفاصيل الكاملة
3. جرّب البناء محلياً أولاً

---

## 🎉 تهانينا!

موقعك الآن منشور على Cloudflare Pages! 🚀

**الرابط:** `https://alhamed.pages.dev`

**اختياري:** يمكنك ربط Domain مخصص من:
`Custom domains` → `Set up a custom domain`
