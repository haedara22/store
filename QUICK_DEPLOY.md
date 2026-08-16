# 🚀 دليل النشر السريع

## ✅ ما تم إصلاحه:

1. ✅ إضافة dummy DATABASE_URL للبناء
2. ✅ تفعيل `force-dynamic` لكل API routes
3. ✅ إصلاح next.config.ts
4. ✅ تحديث GitHub Actions workflow

---

## 📋 الخطوات المطلوبة منك:

### 1️⃣ إضافة CLOUDFLARE_API_TOKEN في GitHub

**الطريقة:**
1. اذهب إلى: https://dash.cloudflare.com/profile/api-tokens
2. **Create Token** → **Edit Cloudflare Workers** template
3. انسخ الـ Token
4. اذهب إلى: https://github.com/haedara22/store/settings/secrets/actions
5. **New repository secret**
6. Name: `CLOUDFLARE_API_TOKEN`
7. Value: الصق الـ Token
8. **Add secret**

### 2️⃣ إضافة DATABASE_URL في GitHub (اختياري لكن مفضل)

1. نفس الخطوات السابقة
2. Name: `DATABASE_URL`
3. Value: 
```
postgresql://neondb_owner:npg_Qxo38FgzaDRt@ep-icy-dust-axg4cqjq-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 3️⃣ تشغيل النشر

الآن GitHub Actions سيعمل تلقائياً! اذهب إلى:
https://github.com/haedara22/store/actions

سترى الـ workflow يعمل، انتظر حتى ينتهي (حوالي 3-5 دقائق).

### 4️⃣ إضافة Secrets في Cloudflare

بعد نجاح النشر، أضف المتغيرات في Cloudflare:

**من PowerShell:**
```powershell
# إضافة DATABASE_URL
wrangler secret put DATABASE_URL --name alhamed-store
# الصق: postgresql://neondb_owner:npg_Qxo38FgzaDRt@ep-icy-dust-axg4cqjq-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# إضافة ADMIN_USERNAME
wrangler secret put ADMIN_USERNAME --name alhamed-store
# اكتب: admin

# إضافة ADMIN_PASSWORD
wrangler secret put ADMIN_PASSWORD --name alhamed-store
# اكتب كلمة مرور قوية
```

**أو من Dashboard:**
1. https://dash.cloudflare.com
2. Workers & Pages → alhamed-store
3. Settings → Variables and Secrets
4. أضف:
   - `DATABASE_URL` (Encrypt ✓)
   - `ADMIN_USERNAME` (Encrypt ✓)
   - `ADMIN_PASSWORD` (Encrypt ✓)
   - `NEXT_PUBLIC_SITE_URL` (Plain text): `https://alhamed-store.workers.dev`

---

## 🎉 النتيجة

الموقع سيكون جاهز على:
- **الموقع**: https://alhamed-store.workers.dev
- **الأدمن**: https://alhamed-store.workers.dev/admin/login

---

## 🔄 التحديثات المستقبلية

كل `git push` إلى `main` سيتم نشره تلقائياً! ✨

---

## ⚠️ ملاحظة مهمة

إذا لم يضاف CLOUDFLARE_API_TOKEN في GitHub، سيفشل النشر! تأكد من إضافته أولاً.
