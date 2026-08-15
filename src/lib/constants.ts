// Syrian governorates
export const SYRIAN_GOVERNORATES = [
  'دمشق',
  'ريف دمشق',
  'حلب',
  'حمص',
  'حماة',
  'اللاذقية',
  'طرطوس',
  'إدلب',
  'الحسكة',
  'دير الزور',
  'الرقة',
  'درعا',
  'السويداء',
  'القنيطرة',
];

// Payment methods
export const PAYMENT_METHODS = [
  {
    value: 'cash',
    label: 'الدفع عند الاستلام',
    icon: '💵',
  },
  {
    value: 'shamcash',
    label: 'شام كاش',
    icon: '💳',
  },
];

// Order statuses
export const ORDER_STATUSES = {
  pending: { label: 'قيد الانتظار', color: 'gray' },
  awaiting_payment: { label: 'بانتظار الدفع', color: 'yellow' },
  payment_verification: { label: 'التحقق من الدفع', color: 'blue' },
  confirmed: { label: 'مؤكد', color: 'green' },
  processing: { label: 'قيد التجهيز', color: 'blue' },
  ready: { label: 'جاهز للتوصيل', color: 'purple' },
  delivered: { label: 'تم التوصيل', color: 'green' },
  cancelled: { label: 'ملغي', color: 'red' },
} as const;

// Payment statuses
export const PAYMENT_STATUSES = {
  pending: { label: 'قيد الانتظار', color: 'gray' },
  verified: { label: 'تم التحقق', color: 'green' },
  rejected: { label: 'مرفوض', color: 'red' },
  completed: { label: 'مكتمل', color: 'green' },
} as const;

// Delivery areas with prices (in SYP)
export const DELIVERY_PRICES: Record<string, number> = {
  'دمشق': 0,
  'ريف دمشق': 5000,
  'حلب': 15000,
  'حمص': 10000,
  'حماة': 12000,
  'اللاذقية': 18000,
  'طرطوس': 20000,
  'إدلب': 15000,
  'الحسكة': 25000,
  'دير الزور': 22000,
  'الرقة': 20000,
  'درعا': 12000,
  'السويداء': 10000,
  'القنيطرة': 15000,
};

// Site configuration
export const SITE_CONFIG = {
  name: 'متجر الحامد',
  description: 'متجر إلكتروني لبيع المنتجات في سوريا',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: '963900000000',
  },
};

// Exported for backward compatibility
export const STORE_NAME = SITE_CONFIG.name;
export const STORE_DESCRIPTION = SITE_CONFIG.description;

// Cookie keys
export const COOKIE_KEYS = {
  CART: 'cart',
  ADMIN_SESSION: 'admin_session',
};

// Local storage keys
export const STORAGE_KEYS = {
  CART: 'alhamed_cart',
};

// Image upload configuration
export const IMAGE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
};

// Pagination
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 50,
  ORDERS_PER_PAGE: 20,
};

// Sort options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'oldest', label: 'الأقدم' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
];
