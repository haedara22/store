# دليل النشر على Cloudflare Workers

## المشكلة الحالية
`@opennextjs/cloudflare` غير متوافق تماماً مع Windows ويفشل في عملية البناء.

## الحل: النشر عبر GitHub Actions

### الخطوة 1: رفع المشروع إلى GitHub

```powershell
# إضافة الملفات الجديدة
git add .

# إنشاء commit
git commit -m "Add Cloudflare deployment configuration"

# رفع إلى GitHub
git push origin main
```

### الخطوة 2: إعداد Secrets في GitHub

اذهب إلى repository على GitHub:
1. Settings → Secrets and variables → Actions
2. أضف Secrets التالية:

- `CLOUDFLARE_API_TOKEN`: 
  - اذهب إلى https://dash.cloudflare.com/profile/api-tokens
  - Create Token → Use template "Edit Cloudflare Workers"
  - انسخ الـ Token وأضفه

- `DATABASE_URL`: رابط قاعدة البيانات Neon
  ```
  postgresql://neondb_owner:npg_Qxo38FgzaDRt@ep-icy-dust-axg4cqjq-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
  ```

- `ADMIN_USERNAME`: اسم مستخدم الأدمن (مثلاً: admin)

- `ADMIN_PASSWORD`: كلمة مرور قوية للأدمن

### الخطوة 3: تشغيل Workflow

1. اذهب إلى تبويب "Actions" في repository
2. اختر "Deploy to Cloudflare Workers"
3. اضغط "Run workflow"

### الخطوة 4: إضافة المتغيرات البيئية في Cloudflare

بعد النشر الأول، أضف المتغيرات في Cloudflare Dashboard:

1. اذهب إلى https://dash.cloudflare.com
2. Workers & Pages → alhamed-store → Settings → Variables
3. أضف المتغيرات:
   - `DATABASE_URL`: رابط قاعدة البيانات
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD`: كلمة المرور
   - `NEXT_PUBLIC_SITE_URL`: https://alhamed-store.workers.dev

## طريقة بديلة: Cloudflare Pages

إذا واجهت مشاكل، يمكنك استخدام Cloudflare Pages:

1. اذهب إلى https://dash.cloudflare.com
2. Workers & Pages → Create application → Pages
3. Connect to Git → اختر repository
4. Build settings:
   - Framework preset: Next.js
   - Build command: `npx opennextjs-cloudflare build`
   - Build output directory: `.open-next/assets`
5. Environment variables: أضف المتغيرات المطلوبة
6. Deploy

## الوصول للموقع

بعد النشر الناجح:
- الموقع: https://alhamed-store.workers.dev
- لوحة التحكم: https://alhamed-store.workers.dev/admin/login

## ملاحظات مهمة

1. البناء يتم على Linux في GitHub Actions، لذلك لن تواجه مشاكل Windows
2. كل push إلى main سيؤدي إلى نشر تلقائي
3. يمكنك مراقبة عملية النشر من تبويب Actions في GitHub
4. إذا فشل النشر، راجع logs في GitHub Actions

## استكشاف الأخطاء

### إذا فشل Build في GitHub Actions:
- تأكد من أن جميع Secrets مضافة بشكل صحيح
- تأكد من أن CLOUDFLARE_API_TOKEN لديه صلاحيات كافية

### إذا لم يعمل الموقع بعد النشر:
- تأكد من إضافة المتغيرات البيئية في Cloudflare Dashboard
- تأكد من أن قاعدة البيانات متاحة ويمكن الوصول إليها

### للنشر اليدوي من WSL أو Linux:
```bash
npm run clean
npx opennextjs-cloudflare build
wrangler deploy
```
