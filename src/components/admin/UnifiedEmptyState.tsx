import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * ============================================================
 * UnifiedEmptyState - حالة فارغة موحدة (مضغوطة)
 * ============================================================
 * 
 * يستخدم عندما لا توجد بيانات لعرضها
 * - أيقونة متوسطة
 * - عنوان واضح
 * - وصف مفيد
 * - إجراء اختياري (زر مضغوط)
 */

interface UnifiedEmptyStateProps {
  icon: string | ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function UnifiedEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: UnifiedEmptyStateProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm',
        className
      )}
    >
      <div className="text-center py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
        {/* Icon - Compact */}
        <div className="inline-block text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
          {typeof icon === 'string' ? icon : <div>{icon}</div>}
        </div>

        {/* Title - Compact */}
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-1.5 sm:mb-2 tracking-tight">
          {title}
        </h3>

        {/* Description - Compact */}
        <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed mb-4 sm:mb-5">
          {description}
        </p>

        {/* Action Button - Compact */}
        {action && (
          <>
            {action.href ? (
              <Link
                href={action.href}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'h-9 sm:h-10',
                  'px-4 sm:px-5',
                  'bg-gradient-to-r from-orange-500 to-orange-600',
                  'hover:from-orange-600 hover:to-orange-700',
                  'text-white font-semibold text-xs sm:text-sm rounded-lg',
                  'transition-all duration-200',
                  'shadow-sm shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/30',
                  'transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
                  'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1'
                )}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>{action.label}</span>
              </Link>
            ) : (
              <button
                onClick={action.onClick}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'h-9 sm:h-10',
                  'px-4 sm:px-5',
                  'bg-gradient-to-r from-orange-500 to-orange-600',
                  'hover:from-orange-600 hover:to-orange-700',
                  'text-white font-semibold text-xs sm:text-sm rounded-lg',
                  'transition-all duration-200',
                  'shadow-sm shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/30',
                  'transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
                  'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1'
                )}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>{action.label}</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * ============================================================
 * SearchEmptyState - حالة فارغة لنتائج البحث (مضغوطة)
 * ============================================================
 */

interface SearchEmptyStateProps {
  searchTerm?: string;
  onClearSearch?: () => void;
  className?: string;
}

export function SearchEmptyState({
  searchTerm,
  onClearSearch,
  className,
}: SearchEmptyStateProps) {
  return (
    <UnifiedEmptyState
      icon="🔍"
      title="لم يتم العثور على نتائج"
      description={
        searchTerm
          ? `لم نتمكن من العثور على نتائج تطابق "${searchTerm}"`
          : 'حاول استخدام كلمات بحث مختلفة'
      }
      action={
        onClearSearch
          ? {
              label: 'إلغاء البحث',
              onClick: onClearSearch,
            }
          : undefined
      }
      className={className}
    />
  );
}

/**
 * ============================================================
 * LoadingState - حالة التحميل (مضغوطة)
 * ============================================================
 */

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'جارٍ التحميل...',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm',
        className
      )}
    >
      <div className="text-center py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
        {/* Spinner - Compact */}
        <div className="inline-block mb-3">
          <svg
            className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>

        {/* Message - Compact */}
        <p className="text-sm sm:text-base font-semibold text-zinc-600">{message}</p>
      </div>
    </div>
  );
}

/**
 * ============================================================
 * ErrorState - حالة الخطأ (مضغوطة)
 * ============================================================
 */

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'حدث خطأ',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <UnifiedEmptyState
      icon="⚠️"
      title={title}
      description={message}
      action={
        onRetry
          ? {
              label: 'إعادة المحاولة',
              onClick: onRetry,
            }
          : undefined
      }
      className={className}
    />
  );
}