# 🚀 دليل نشر الموقع على Cloudflare Workers

## ✅ الخطوات المطلوبة

### 1️⃣ إضافة Secrets في GitHub

اذهب إلى repository على GitHub:
- https://github.com/haedara22/store

ثم:
1. اضغط على **Settings** (في الأعلى)
2. من القائمة اليسرى اختر **Secrets and variables** → **Actions**
3. اضغط **New repository secret**

أضف الـ Secrets التالية:

#### 🔑 CLOUDFLARE_API_TOKEN
1. اذهب إلى: https://dash.cloudflare.com/profile/api-tokens
2. اضغط **Create Token**
3. اختر template: **Edit Cloudflare Workers**
4. اضغط **Continue to summary** ثم **Create Token**
5. انسخ الـ Token
6. أضفه في GitHub Secrets باسم: `CLOUDFLARE_API_TOKEN`

#### 🗄️ DATABASE_URL
```
postgresql://neondb_owner:npg_Qxo38FgzaDRt@ep-icy-dust-axg4cqjq-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### 👤 ADMIN_USERNAME
```
admin
```
(أو أي اسم مستخدم تختاره)

#### 🔐 ADMIN_PASSWORD
اختر كلمة مرور قوية للوحة التحكم

---

### 2️⃣ تشغيل النشر

بعد إضافة الـ Secrets:

1. اذهب إلى تبويب **Actions** في repository
2. ستجد workflow اسمه: **Deploy to Cloudflare Workers**
3. اضغط عليه
4. اضغط **Run workflow** → **Run workflow**

سيبدأ البناء والنشر تلقائياً! ⏳

---

### 3️⃣ إضافة المتغيرات في Cloudflare Dashboard

بعد النشر الأول بنجاح، أضف المتغيرات السرية:

1. اذهب إلى: https://dash.cloudflare.com
2. من القائمة اليسرى: **Workers & Pages**
3. اختر: **alhamed-store**
4. اذهب إلى **Settings** → **Variables and Secrets**
5. أضف المتغيرات التالية (اضغط Add variable for each):

**Plain text variables:**
- `NEXT_PUBLIC_SITE_URL`: `https://alhamed-store.workers.dev`

**Encrypted variables (Secrets):**
اضغط **Encrypt** لكل متغير:
- `DATABASE_URL`: رابط قاعدة البيانات
- `ADMIN_USERNAME`: `admin`
- `ADMIN_PASSWORD`: كلمة المرور

6. اضغط **Save and Deploy**

---

## 🎉 الموقع جاهز!

الآن يمكنك الوصول إلى:

- **الموقع الرئيسي**: https://alhamed-store.workers.dev
- **لوحة التحكم**: https://alhamed-store.workers.dev/admin/login

---

## 🔄 التحديثات المستقبلية

كل مرة تقوم بـ `git push` إلى branch `main`، سيتم النشر تلقائياً!

---

## ⚠️ ملاحظات مهمة

1. ✅ البناء يتم على Linux في GitHub Actions (لا مشاكل Windows)
2. ✅ النشر تلقائي عند كل push
3. ✅ يمكنك متابعة عملية النشر من تبويب Actions
4. ⚠️ لا تنس إضافة الـ Secrets في Cloudflare Dashboard بعد أول نشر

---

## 🐛 استكشاف الأخطاء

### إذا فشل Build في GitHub Actions:
- تأكد من أن جميع Secrets مضافة في GitHub
- تأكد من أن CLOUDFLARE_API_TOKEN صحيح وله الصلاحيات المطلوبة
- افتح تبويب Actions وشاهد الـ logs

### إذا لم يعمل الموقع بعد النشر:
- تأكد من إضافة المتغيرات في Cloudflare Dashboard
- تحديداً `DATABASE_URL` مهم جداً
- جرب إعادة Deploy من Cloudflare Dashboard

---

## 📞 الدعم

إذا واجهت أي مشاكل، تأكد من:
1. ✅ GitHub Secrets مضافة بشكل صحيح
2. ✅ Cloudflare API Token لديه صلاحيات
3. ✅ المتغيرات في Cloudflare Dashboard مضافة
4. ✅ قاعدة البيانات Neon تعمل بشكل صحيح
