/**
 * ============================================================
 * نظام التصميم الموحد للوحة التحكم - Al-Hamed Store
 * ============================================================
 * 
 * هذا الملف يحتوي على جميع القيم والمعايير الموحدة المستخدمة
 * في جميع صفحات لوحة التحكم لضمان التناسق والاحترافية
 */

// ============================================================
// نظام الشبكة - Grid System (8px Base)
// ============================================================
export const SPACING = {
  // Base spacing unit: 8px
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
  '5xl': '5rem',   // 80px
} as const;

// ============================================================
// نظام الألوان الموحد - Unified Color Palette
// ============================================================
export const COLORS = {
  // Primary Brand Color - Orange
  primary: {
    50: '#fff8f1',
    100: '#ffedd5',
    200: '#fed8ab',
    300: '#fdc078',
    400: '#fb9c43',
    500: '#f97316',  // Main
    600: '#ea580c',
    700: '#c54309',
    800: '#9e350a',
    900: '#7c2d12',
  },
  
  // Status Colors
  status: {
    success: {
      light: '#d1fae5',
      main: '#10b981',
      dark: '#065f46',
      bg: '#f0fdf4',
    },
    warning: {
      light: '#fef3c7',
      main: '#f59e0b',
      dark: '#92400e',
      bg: '#fffbeb',
    },
    error: {
      light: '#fee2e2',
      main: '#ef4444',
      dark: '#991b1b',
      bg: '#fef2f2',
    },
    info: {
      light: '#dbeafe',
      main: '#3b82f6',
      dark: '#1e40af',
      bg: '#eff6ff',
    },
    pending: {
      light: '#fef3c7',
      main: '#f59e0b',
      dark: '#92400e',
      bg: '#fffbeb',
    },
  },
  
  // Neutral Grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e8e8e8',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
} as const;

// ============================================================
// نظام الطباعة - Typography System
// ============================================================
export const TYPOGRAPHY = {
  // Font Sizes - Unified across all pages
  size: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '0.9375rem',  // 15px
    lg: '1.0625rem',    // 17px
    xl: '1.1875rem',    // 19px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  // Font Weights
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '800',
  },
  
  // Line Heights
  leading: {
    tight: '1.2',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// ============================================================
// نظام الظلال - Shadow System
// ============================================================
export const SHADOWS = {
  // Soft shadows for cards and elements
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
  
  // Brand colored shadows
  orange: '0 8px 24px -4px rgba(249, 115, 22, 0.2)',
  'orange-lg': '0 16px 40px -8px rgba(249, 115, 22, 0.25)',
  
  // Hover shadows
  'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
} as const;

// ============================================================
// نظام الحواف المدورة - Border Radius System
// ============================================================
export const RADIUS = {
  none: '0',
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.875rem',   // 14px
  xl: '1rem',       // 16px
  '2xl': '1.25rem', // 20px
  '3xl': '1.5rem',  // 24px
  '4xl': '2rem',    // 32px
  full: '9999px',
} as const;

// ============================================================
// أبعاد الحاويات - Container Dimensions
// ============================================================
export const CONTAINER = {
  // Max widths for different page types
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    '3xl': '1600px',
    full: '100%',
  },
  
  // Padding for containers (responsive)
  padding: {
    mobile: '1rem',      // 16px
    tablet: '1.5rem',    // 24px
    desktop: '2rem',     // 32px
    wide: '3rem',        // 48px
  },
} as const;

// ============================================================
// مقاسات العناصر الموحدة - Component Sizes
// ============================================================
export const COMPONENT_SIZES = {
  // Button heights
  button: {
    xs: '32px',
    sm: '38px',
    md: '44px',
    lg: '52px',
    xl: '60px',
  },
  
  // Input heights
  input: {
    sm: '38px',
    md: '44px',
    lg: '52px',
  },
  
  // Card padding
  card: {
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '2.5rem',    // 40px
  },
  
  // Stats card dimensions
  statsCard: {
    minHeight: '140px',
    padding: '1.5rem',  // 24px
    iconSize: '48px',
  },
} as const;

// ============================================================
// مسافات الصفحات - Page Spacing
// ============================================================
export const PAGE_SPACING = {
  // Vertical spacing between sections
  sectionGap: {
    mobile: '1.5rem',   // 24px
    tablet: '2rem',     // 32px
    desktop: '2.5rem',  // 40px
  },
  
  // Header margins
  headerMargin: {
    mobile: '2rem',     // 32px
    tablet: '2.5rem',   // 40px
    desktop: '3rem',    // 48px
  },
  
  // Content padding
  contentPadding: {
    mobile: '1.5rem',   // 24px
    tablet: '2rem',     // 32px
    desktop: '2.5rem',  // 40px
  },
} as const;

// ============================================================
// حالات الطلبات - Order Status Styles
// ============================================================
export const ORDER_STATUS_STYLES = {
  pending: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: '⏳',
    label: 'قيد الانتظار',
  },
  awaiting_payment: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: '💳',
    label: 'بانتظار الدفع',
  },
  payment_verification: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: '🔍',
    label: 'التحقق من الدفع',
  },
  confirmed: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: '✅',
    label: 'مؤكد',
  },
  processing: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: '⚙️',
    label: 'قيد التجهيز',
  },
  ready: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: '📦',
    label: 'جاهز للتوصيل',
  },
  delivered: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: '✓',
    label: 'تم التوصيل',
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: '✕',
    label: 'ملغي',
  },
} as const;

// ============================================================
// الانتقالات والحركات - Transitions
// ============================================================
export const TRANSITIONS = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
  },
  
  timing: {
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

// ============================================================
// Grid Layouts - تخطيطات الشبكة
// ============================================================
export const GRID = {
  // Stats cards grid
  stats: {
    cols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    gap: 'gap-4 sm:gap-5 lg:gap-6',
  },
  
  // Product/Category cards grid
  cards: {
    cols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    gap: 'gap-5 sm:gap-6',
  },
  
  // Two column layout
  twoColumn: {
    cols: 'grid-cols-1 lg:grid-cols-2',
    gap: 'gap-6 lg:gap-8',
  },
  
  // Three column layout
  threeColumn: {
    cols: 'grid-cols-1 lg:grid-cols-3',
    gap: 'gap-6 lg:gap-8',
  },
} as const;

// ============================================================
// Utility Classes - فئات مساعدة
// ============================================================
export const UTILS = {
  // Text truncation
  truncate: 'truncate overflow-hidden text-ellipsis whitespace-nowrap',
  
  // Line clamp
  lineClamp: {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
  },
  
  // Smooth transitions
  transition: 'transition-all duration-200 ease-out',
  transitionSlow: 'transition-all duration-300 ease-out',
  
  // Hover effects
  hoverScale: 'hover:scale-[1.02] active:scale-[0.98]',
  hoverLift: 'hover:-translate-y-1 active:translate-y-0',
  
  // Focus styles
  focus: 'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
} as const;

// ============================================================
// Helper Functions - دوال مساعدة
// ============================================================

/**
 * دالة لبناء class names بشكل ديناميكي
 */
export function buildClassName(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * دالة للحصول على أنماط حالة الطلب
 */
export function getOrderStatusStyle(status: keyof typeof ORDER_STATUS_STYLES) {
  return ORDER_STATUS_STYLES[status] || ORDER_STATUS_STYLES.pending;
}

/**
 * دالة لتوحيد أنماط البطاقات الإحصائية
 */
export function getStatsCardClasses(color: 'blue' | 'green' | 'orange' | 'purple' | 'red' = 'blue') {
  const colorMap = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100/90',
      border: 'border-blue-200/70',
      text: 'text-blue-700',
      icon: 'text-blue-600',
      ring: 'ring-blue-100',
      shadow: 'hover:shadow-blue-200/60',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 via-green-50 to-green-100/90',
      border: 'border-green-200/70',
      text: 'text-green-700',
      icon: 'text-green-600',
      ring: 'ring-green-100',
      shadow: 'hover:shadow-green-200/60',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100/90',
      border: 'border-orange-200/70',
      text: 'text-orange-700',
      icon: 'text-orange-600',
      ring: 'ring-orange-100',
      shadow: 'hover:shadow-orange-200/60',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100/90',
      border: 'border-purple-200/70',
      text: 'text-purple-700',
      icon: 'text-purple-600',
      ring: 'ring-purple-100',
      shadow: 'hover:shadow-purple-200/60',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 via-red-50 to-red-100/90',
      border: 'border-red-200/70',
      text: 'text-red-700',
      icon: 'text-red-600',
      ring: 'ring-red-100',
      shadow: 'hover:shadow-red-200/60',
    },
  };
  
  return colorMap[color];
}

// ============================================================
// Export all as default for convenience
// ============================================================
export default {
  SPACING,
  COLORS,
  TYPOGRAPHY,
  SHADOWS,
  RADIUS,
  CONTAINER,
  COMPONENT_SIZES,
  PAGE_SPACING,
  ORDER_STATUS_STYLES,
  TRANSITIONS,
  GRID,
  UTILS,
  buildClassName,
  getOrderStatusStyle,
  getStatsCardClasses,
};
