# 📸 دليل نظام رفع الصور - متجر الحامد

## نظرة عامة

تم تجهيز نظام رفع الصور بالكامل مع دعم **Cloudflare Images** و **KV Storage** و **Data URLs** كخيارات احتياطية.

---

## ✨ الميزات

### 1. **مكون ImageUploader المتكامل**
- ✅ رفع متعدد للصور (حتى 5 صور لكل منتج)
- ✅ معاينة فورية للصور
- ✅ إعادة ترتيب الصور بسهولة (سحب وإفلات)
- ✅ حذف الصور
- ✅ تحديد الصورة الرئيسية
- ✅ إرشادات واضحة للمستخدم
- ✅ التحقق من نوع وحجم الملف

### 2. **التحقق من الصور**
- **الأنواع المدعومة:** JPG, PNG, WEBP
- **الحجم الأقصى:** 5 ميجابايت لكل صورة
- **الأبعاد المثالية:** 1000 × 1000 بكسل (مربع)

### 3. **طرق التخزين**

#### أ) Cloudflare Images (الأفضل للإنتاج)
```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

**المميزات:**
- تحسين تلقائي للصور
- CDN عالمي
- تحميل سريع
- تغيير الحجم التلقائي

#### ب) Cloudflare KV Storage (بديل جيد)
```env
# في wrangler.toml
[[kv_namespaces]]
binding = "IMAGES"
id = "your_kv_namespace_id"
```

**المميزات:**
- تخزين موزع
- سريع
- مجاني حتى 100,000 عملية قراءة/يوم

#### ج) Data URLs (للتطوير المحلي فقط)
- يعمل تلقائيًا بدون إعدادات
- ⚠️ غير موصى به للإنتاج

---

## 🚀 الاستخدام

### في صفحة إضافة منتج جديد

```typescript
import { ImageUploader } from '@/components/admin/ImageUploader';

const [productImages, setProductImages] = useState<string[]>([]);

// في الـ JSX
<ImageUploader
  images={productImages}
  onImagesChange={setProductImages}
  maxImages={5}
/>

// عند الإرسال
const response = await fetch('/api/admin/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData,
    images: productImages, // ✅ الصور ستُحفظ تلقائيًا
  }),
});
```

### في صفحة تعديل منتج

```typescript
// جلب الصور الحالية
useEffect(() => {
  fetch(`/api/admin/products/${id}`)
    .then(res => res.json())
    .then(product => {
      if (product.images && product.images.length > 0) {
        setProductImages(product.images.map(img => img.url));
      }
    });
}, [id]);

// التحديث
const response = await fetch(`/api/admin/products/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    ...formData,
    images: productImages, // ✅ ستُحدّث الصور تلقائيًا
  }),
});
```

---

## 📁 هيكل الملفات

```
src/
├── components/
│   └── admin/
│       └── ImageUploader.tsx          # مكون رفع الصور
├── app/
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts               # API رفع الصور
│   │   ├── images/
│   │   │   └── [filename]/
│   │   │       └── route.ts           # API قراءة الصور من KV
│   │   └── admin/
│   │       └── products/
│   │           ├── route.ts           # إنشاء منتج + حفظ صور
│   │           └── [id]/
│   │               └── route.ts       # تحديث منتج + صور
│   └── admin/
│       └── products/
│           ├── new/
│           │   └── page.tsx           # ✅ يحتوي على ImageUploader
│           └── [id]/
│               └── edit/
│                   └── page.tsx       # ✅ يحتوي على ImageUploader
```

---

## 🔧 API Endpoints

### 1. رفع صورة
```
POST /api/upload

Body: FormData with 'file'

Response:
{
  "url": "https://imagedelivery.net/...",
  "id": "image_id",
  "message": "تم رفع الصورة بنجاح"
}
```

### 2. قراءة صورة من KV
```
GET /api/images/[filename]

Response: Image binary data
```

### 3. إنشاء منتج مع صور
```
POST /api/admin/products

Body:
{
  "name": "...",
  "slug": "...",
  ...
  "images": ["url1", "url2", "url3"]
}
```

### 4. تحديث منتج مع صور
```
PUT /api/admin/products/[id]

Body:
{
  "name": "...",
  ...
  "images": ["url1", "url2"]  // سيتم حذف القديمة وإضافة الجديدة
}
```

---

## 💡 نصائح للحصول على صور احترافية

### الإضاءة
- استخدم إضاءة طبيعية أو صندوق إضاءة
- تجنب الظلال القوية
- تأكد من إضاءة المنتج بالتساوي

### التصوير
- استخدم كاميرا عالية الدقة (هاتف حديث كافٍ)
- صوّر من زوايا متعددة (3-5 صور)
- املأ الإطار بالمنتج
- حافظ على ثبات الكاميرا

### المعالجة
- أزل الخلفية باستخدام [remove.bg](https://remove.bg)
- اجعل الخلفية بيضاء نقية
- اقتصص الصورة لتكون مربعة (1:1)
- احفظ بجودة عالية

### الأدوات المجانية
- **remove.bg** - إزالة الخلفية
- **Canva** - تعديل وتحسين الصور
- **TinyPNG** - تقليل حجم الصور
- **Photopea** - بديل مجاني لـ Photoshop

---

## 🐛 استكشاف الأخطاء

### الصورة لا تُرفع
1. ✅ تحقق من حجم الملف (أقل من 5 ميجابايت)
2. ✅ تحقق من نوع الملف (JPG, PNG, WEBP فقط)
3. ✅ افتح Console في المتصفح وابحث عن أخطاء

### الصورة لا تظهر بعد الرفع
1. ✅ تحقق من أن API `/api/upload` يعمل
2. ✅ افحص الـ Network Tab في DevTools
3. ✅ تأكد من أن الـ URL صحيح

### الصورة لا تُحفظ مع المنتج
1. ✅ تحقق من أن `productImages` يحتوي على URLs
2. ✅ افحص payload المرسل في DevTools
3. ✅ تأكد من أن API يستقبل `images` في body

---

## 🔐 الأمان

- ✅ التحقق من نوع الملف (MIME type)
- ✅ التحقق من حجم الملف
- ✅ استخدام IDs عشوائية للملفات
- ✅ التحقق من صلاحيات الأدمن
- ✅ منع رفع ملفات خطيرة

---

## 📊 الأداء

### تحسينات مطبقة
- ✅ Lazy loading للصور
- ✅ Next.js Image component
- ✅ CDN caching (عند استخدام Cloudflare)
- ✅ ضغط الصور تلقائيًا

### توصيات إضافية
- استخدم WebP بدلاً من JPG/PNG
- قلل دقة الصور إلى 1000×1000
- فعّل Cloudflare Images للتحسين التلقائي

---

## 🌟 الميزات القادمة (اختياري)

- [ ] Drag & Drop لرفع الصور
- [ ] Crop & Resize في المتصفح
- [ ] Bulk upload (رفع عدة منتجات دفعة واحدة)
- [ ] AI لإزالة الخلفية تلقائيًا
- [ ] Watermarking للحماية

---

## 📞 الدعم

إذا واجهت مشاكل:
1. راجع Console في المتصفح
2. افحص Network Tab
3. تحقق من logs السيرفر
4. راجع `IMAGE_REQUIREMENTS.md` للمواصفات

---

## ✅ الخلاصة

نظام رفع الصور جاهز بالكامل ويعمل في:
- ✅ صفحة إضافة منتج `/admin/products/new`
- ✅ صفحة تعديل منتج `/admin/products/[id]/edit`
- ✅ عرض الصور في صفحة المنتج `/products/[slug]`
- ✅ عرض الصور في قائمة المنتجات

**ابدأ الآن برفع صور منتجاتك واستمتع بمتجر احترافي! 🚀**
