# نظام التصميم الموحد للوحة التحكم - متجر الحامد

## 📋 نظرة عامة

تم إعادة تصميم وتوحيد جميع صفحات لوحة تحكم الأدمن بشكل احترافي وعصري مع نظام تصميم موحد يضمن التناسق والاحترافية عبر جميع الصفحات.

---

## 🎨 المبادئ الأساسية

### 1. نظام الشبكة (Grid System)
- **الوحدة الأساسية**: 8px
- **المسافات المعيارية**: 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **التطبيق**: جميع المسافات والأبعاد تتبع مضاعفات 8px

### 2. نظام الألوان الموحد

#### الألوان الأساسية
```
Primary (Orange):
- 50: #fff8f1
- 500: #f97316 (Main Brand)
- 600: #ea580c
- 700: #c54309
```

#### ألوان الحالات
```
Success (Green): #10b981
Warning (Yellow/Amber): #f59e0b
Error (Red): #ef4444
Info (Blue): #3b82f6
```

#### الألوان المحايدة
```
Zinc Scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
```

### 3. نظام الطباعة (Typography)

#### أحجام الخطوط الموحدة
```
xs: 12px (0.75rem)
sm: 14px (0.875rem)
base: 15px (0.9375rem)
lg: 17px (1.0625rem)
xl: 19px (1.1875rem)
2xl: 24px (1.5rem)
3xl: 30px (1.875rem)
4xl: 36px (2.25rem)
5xl: 48px (3rem)
```

#### أوزان الخطوط
```
normal: 400
medium: 500
semibold: 600
bold: 700
black: 800
```

### 4. الظلال (Shadows)

```css
sm: '0 1px 3px 0 rgba(0, 0, 0, 0.06)'
md: '0 4px 6px -1px rgba(0, 0, 0, 0.06)'
lg: '0 10px 15px -3px rgba(0, 0, 0, 0.06)'
xl: '0 20px 25px -5px rgba(0, 0, 0, 0.07)'
2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.12)'

/* Brand Shadows */
orange: '0 8px 24px -4px rgba(249, 115, 22, 0.2)'
card-hover: '0 20px 40px -15px rgba(0, 0, 0, 0.08)'
```

### 5. الحواف المدورة (Border Radius)

```
sm: 6px
md: 8px
lg: 14px
xl: 16px
2xl: 20px
3xl: 24px
4xl: 32px
```

---

## 🧩 المكونات الموحدة

### 1. PageContainer
**الاستخدام**: حاوية رئيسية لجميع الصفحات

```tsx
<PageContainer maxWidth="2xl">
  <PageContent spacing="lg">
    {/* محتوى الصفحة */}
  </PageContent>
</PageContainer>
```

**الخصائص**:
- `maxWidth`: sm | md | lg | xl | 2xl | 3xl | full
- `noPadding`: boolean
- Responsive padding: 16px (mobile) → 24px (tablet) → 32px (desktop) → 48px (large)

### 2. UnifiedPageHeader
**الاستخدام**: رأس موحد لجميع الصفحات

```tsx
<UnifiedPageHeader
  title="عنوان الصفحة"
  description="وصف قصير"
  icon="🎯"
  actions={[
    {
      label: 'إضافة جديد',
      href: '/path',
      icon: <PlusIcon />,
      variant: 'primary'
    }
  ]}
  stats={<HeaderStats>...</HeaderStats>}
  breadcrumbs={[...]}
/>
```

**الخصائص**:
- `title`: string (required)
- `description`: string (optional)
- `icon`: string | ReactNode (optional)
- `actions`: Array<PageHeaderAction> (optional)
- `stats`: ReactNode (optional)
- `breadcrumbs`: Array<Breadcrumb> (optional)

### 3. UnifiedStatsCard
**الاستخدام**: بطاقات إحصائية موحدة

```tsx
<UnifiedStatsCard
  title="إجمالي المنتجات"
  value={120}
  icon="📦"
  color="blue"
  trend={{
    value: 15,
    label: 'منتج جديد',
    isPositive: true
  }}
  href="/admin/products"
/>
```

**الأبعاد الموحدة**:
- Min Height: 160px
- Padding: 24px (mobile) → 28px (tablet) → 32px (desktop)
- Icon Size: 48px

**الألوان المتاحة**: blue | green | orange | purple | red

### 4. UnifiedFilterBar
**الاستخدام**: شريط فلترة موحد

```tsx
<UnifiedFilterBar>
  <FilterInput
    label="البحث"
    name="search"
    placeholder="ابحث..."
    icon={<SearchIcon />}
  />
  
  <FilterSelect
    label="التصنيف"
    name="category"
    options={[...]}
  />
  
  <FilterActions>
    <FilterButton type="submit" variant="primary">
      بحث
    </FilterButton>
  </FilterActions>
</UnifiedFilterBar>
```

**الأبعاد الموحدة**:
- Input Height: 48px
- Button Height: 48px
- Gap: 16px (mobile) → 20px (desktop)

### 5. UnifiedTable
**الاستخدام**: جداول بيانات موحدة

```tsx
<UnifiedTable
  columns={[
    { key: 'name', label: 'الاسم', align: 'right' },
    { key: 'status', label: 'الحالة', render: (val) => <Badge>{val}</Badge> }
  ]}
  data={items}
  onRowClick={(row) => {}}
  emptyMessage="لا توجد بيانات"
/>
```

**المساعدات**:
- `TableBadgeCell`: عرض حالات
- `TableActionsCell`: أزرار الإجراءات
- `TableTruncatedTextCell`: نص مختصر

### 6. UnifiedEmptyState
**الاستخدام**: حالات فارغة موحدة

```tsx
<UnifiedEmptyState
  icon="📦"
  title="لا توجد منتجات"
  description="ابدأ بإضافة أول منتج"
  action={{
    label: 'إضافة منتج',
    href: '/admin/products/new'
  }}
/>
```

**الأنواع**:
- `UnifiedEmptyState`: حالة فارغة عامة
- `SearchEmptyState`: حالة بحث فارغ
- `LoadingState`: حالة تحميل
- `ErrorState`: حالة خطأ

---

## 📐 معايير التخطيط

### أبعاد الحاويات (Container Widths)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1400px
3xl: 1600px
```

### المسافات بين الأقسام (Section Gaps)
```
Mobile: 24px
Tablet: 32px
Desktop: 40px
```

### مسافات البطاقات (Card Padding)
```
sm: 16px
md: 24px
lg: 32px
xl: 40px
```

---

## 🎯 أنماط الأزرار الموحدة

### الارتفاعات المعيارية
```
xs: 32px
sm: 38px
md: 44px
lg: 52px
xl: 60px
```

### الأنواع (Variants)
```tsx
primary: Orange gradient (Main actions)
secondary: Dark gray (Secondary actions)
outline: Bordered (Alternative actions)
ghost: Transparent (Subtle actions)
danger: Red gradient (Destructive actions)
success: Green gradient (Confirmation)
warning: Amber gradient (Caution)
```

---

## 🎨 أنماط البطاقات الإحصائية

### التخطيط الشبكي
```tsx
// شبكة 4 أعمدة (Dashboard)
<StatsGrid columns={4}>
  <UnifiedStatsCard ... />
</StatsGrid>

// شبكة 3 أعمدة (Headers)
<HeaderStats>
  <HeaderStatCard ... />
</HeaderStats>
```

### ألوان البطاقات
```
Blue: معلومات عامة، إحصائيات
Green: حالات إيجابية، نجاح
Orange: تحذيرات، انتظار
Purple: معلومات ثانوية
Red: أخطاء، حالات سلبية
Amber: تحذيرات خفيفة
```

---

## 📱 التجاوب (Responsive Design)

### نقاط التوقف (Breakpoints)
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### الشبكات المتجاوبة
```tsx
// بطاقات الإحصائيات
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

// بطاقات المنتجات/التصنيفات
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

// عمودين
grid-cols-1 lg:grid-cols-2
```

---

## ⚡ الانتقالات والحركات

### المدد الزمنية
```
fast: 150ms
normal: 200ms
slow: 300ms
slower: 400ms
```

### التوقيتات
```
ease-out: للحركات الطبيعية
smooth: cubic-bezier(0.16, 1, 0.3, 1)
```

### التأثيرات الشائعة
```tsx
// Hover Lift
hover:-translate-y-1

// Hover Scale
hover:scale-[1.02]

// Active Press
active:scale-[0.98]

// Smooth transition
transition-all duration-200 ease-out
```

---

## 📊 حالات الطلبات (Order Statuses)

### الأنماط الموحدة
```tsx
pending: {
  bg: 'bg-yellow-50',
  text: 'text-yellow-700',
  border: 'border-yellow-200',
  icon: '⏳',
  label: 'قيد الانتظار'
}

confirmed: {
  bg: 'bg-green-50',
  text: 'text-green-700',
  border: 'border-green-200',
  icon: '✅',
  label: 'مؤكد'
}

// ... باقي الحالات
```

**استخدام**:
```tsx
import { getOrderStatusStyle } from '@/lib/design-system';

const statusStyle = getOrderStatusStyle(order.status);
```

---

## 🛠️ دوال المساعدة

### buildClassName
```tsx
import { buildClassName } from '@/lib/design-system';

const classes = buildClassName(
  'base-class',
  condition && 'conditional-class',
  anotherCondition ? 'true-class' : 'false-class'
);
```

### getStatsCardClasses
```tsx
import { getStatsCardClasses } from '@/lib/design-system';

const colorClasses = getStatsCardClasses('blue');
// Returns: { bg, border, text, icon, ring, shadow }
```

---

## 📝 أمثلة الاستخدام الكامل

### مثال: صفحة Dashboard
```tsx
import { PageContainer, PageContent, Section } from '@/components/admin/PageContainer';
import { UnifiedStatsCard, StatsGrid } from '@/components/admin/UnifiedStatsCard';

export default function DashboardPage() {
  return (
    <PageContainer maxWidth="2xl">
      <PageContent spacing="lg">
        <Section>
          <StatsGrid columns={4}>
            <UnifiedStatsCard
              title="المنتجات"
              value={120}
              icon="📦"
              color="blue"
            />
            {/* ... */}
          </StatsGrid>
        </Section>
      </PageContent>
    </PageContainer>
  );
}
```

### مثال: صفحة مع فلترة
```tsx
<PageContainer>
  <PageContent>
    <Section>
      <UnifiedPageHeader title="المنتجات" ... />
    </Section>
    
    <Section>
      <UnifiedFilterBar>
        <FilterInput name="search" ... />
        <FilterSelect name="category" ... />
        <FilterActions>
          <FilterButton type="submit">بحث</FilterButton>
        </FilterActions>
      </UnifiedFilterBar>
    </Section>
    
    <Section>
      {/* Grid of items */}
    </Section>
  </PageContent>
</PageContainer>
```

---

## ✅ قائمة التحقق للصفحات الجديدة

عند إضافة صفحة جديدة، تأكد من:

- [ ] استخدام `PageContainer` و `PageContent`
- [ ] استخدام `UnifiedPageHeader` للرأس
- [ ] المسافات تتبع نظام 8px grid
- [ ] الألوان من لوحة الألوان الموحدة
- [ ] أحجام الخطوط من النظام الموحد
- [ ] الأزرار بارتفاعات موحدة (44px default)
- [ ] البطاقات الإحصائية متساوية الارتفاع (160px min)
- [ ] استخدام `UnifiedEmptyState` للحالات الفارغة
- [ ] Hover effects موحدة
- [ ] Responsive على جميع الأحجام
- [ ] استخدام `Card` للبطاقات
- [ ] استخدام `Badge` للحالات والتصنيفات

---

## 🎓 أفضل الممارسات

### 1. التناسق
- استخدم دائماً المكونات الموحدة بدلاً من التكرار
- التزم بنظام 8px grid في جميع المسافات
- استخدم الألوان المعيارية فقط

### 2. الأداء
- استخدم `will-change-transform` للعناصر المتحركة
- Lazy load للصور الكبيرة
- تحسين الصور باستخدام Next.js Image

### 3. إمكانية الوصول
- استخدم `aria-label` للأزرار بدون نص
- توفير focus states واضحة
- دعم التنقل بلوحة المفاتيح

### 4. التجاوب
- اختبر على جميع نقاط التوقف
- استخدم الشبكات المتجاوبة المعيارية
- تأكد من وضوح النصوص على جميع الأحجام

---

## 📦 الملفات الرئيسية

```
src/
├── lib/
│   └── design-system.ts          # النظام الموحد الكامل
├── components/
│   ├── admin/
│   │   ├── PageContainer.tsx     # حاويات الصفحات
│   │   ├── UnifiedPageHeader.tsx # رؤوس الصفحات
│   │   ├── UnifiedStatsCard.tsx  # البطاقات الإحصائية
│   │   ├── UnifiedTable.tsx      # الجداول
│   │   ├── UnifiedEmptyState.tsx # الحالات الفارغة
│   │   └── UnifiedFilterBar.tsx  # شريط الفلترة
│   └── ui/
│       ├── Card.tsx              # البطاقات الأساسية
│       ├── Button.tsx            # الأزرار
│       ├── Badge.tsx             # الشارات
│       ├── Input.tsx             # حقول الإدخال
│       └── Select.tsx            # القوائم المنسدلة
└── app/
    └── admin/
        ├── dashboard/page.tsx    # ✅ محدثة
        ├── orders/page.tsx       # ✅ محدثة
        ├── categories/page.tsx   # ✅ محدثة
        ├── products/page.tsx     # ✅ محدثة
        └── settings/page.tsx     # 🔄 قيد التحديث
```

---

## 🚀 الخلاصة

تم تطبيق نظام تصميم موحد شامل يضمن:

✅ **التناسق**: جميع الصفحات تتبع نفس المعايير  
✅ **الاحترافية**: تصميم عصري ونظيف  
✅ **سهولة الصيانة**: مكونات قابلة لإعادة الاستخدام  
✅ **التجاوب**: يعمل بشكل مثالي على جميع الأحجام  
✅ **الأداء**: محسّن للسرعة والكفاءة  
✅ **قابلية التوسع**: سهل إضافة صفحات ومكونات جديدة  

---

**تاريخ التحديث**: 2024  
**الإصدار**: 1.0  
**الحالة**: ✅ مكتمل
