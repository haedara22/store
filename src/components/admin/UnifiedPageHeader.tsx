import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * ============================================================
 * UnifiedPageHeader - رأس صفحة موحد (مضغوط)
 * ============================================================
 * 
 * يوفر:
 * - عنوان موحد بنفس الحجم والوزن
 * - وصف اختياري
 * - أيقونة اختيارية
 * - إجراءات (أزرار) على اليسار
 * - breadcrumbs اختيارية
 */

interface PageHeaderAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

interface Breadcrumb {
  label: string;
  href?: string;
}

interface UnifiedPageHeaderProps {
  title: string;
  description?: string;
  icon?: string | ReactNode;
  actions?: PageHeaderAction[];
  breadcrumbs?: Breadcrumb[];
  stats?: ReactNode;
  className?: string;
}

export function UnifiedPageHeader({
  title,
  description,
  icon,
  actions,
  breadcrumbs,
  stats,
  className,
}: UnifiedPageHeaderProps) {
  return (
    <div className={cn('space-y-4 sm:space-y-5 py-4 px-5', className)}>
      {/* Breadcrumbs - Compact */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="font-medium text-zinc-500 hover:text-orange-600 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-zinc-900">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Main Header - Compact */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-5">
        {/* Left: Title, Description, Icon */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start gap-3">
            {/* Icon - Compact */}
            {icon && (
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm shadow-orange-500/20">
                {typeof icon === 'string' ? (
                  <span className="text-base sm:text-lg">{icon}</span>
                ) : (
                  icon
                )}
              </div>
            )}

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight leading-tight">
                {title}
              </h1>
              
              {/* Description */}
              {description && (
                <p className="mt-0.5 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions - Compact */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {actions.map((action, index) => {
              const buttonContent = (
                <>
                  {action.icon && action.icon}
                  <span>{action.label}</span>
                </>
              );

              const baseClasses = cn(
                'inline-flex items-center justify-center gap-1.5',
                'h-9 sm:h-10',
                'px-3 sm:px-4',
                'text-[10px] sm:text-xs font-semibold rounded-lg',
                'transition-all duration-200 ease-out',
                'focus:outline-none focus:ring-1 focus:ring-offset-1',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'whitespace-nowrap',
                'transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
                'will-change-transform'
              );

              const variantClasses = {
                primary: cn(
                  'bg-gradient-to-r from-orange-500 to-orange-600',
                  'hover:from-orange-600 hover:to-orange-700',
                  'text-white',
                  'shadow-sm shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/30',
                  'focus:ring-orange-500'
                ),
                secondary: cn(
                  'bg-zinc-900 hover:bg-zinc-800',
                  'text-white',
                  'shadow-sm hover:shadow-md',
                  'focus:ring-zinc-800'
                ),
                outline: cn(
                  'bg-white hover:bg-zinc-50',
                  'border border-zinc-300 hover:border-zinc-400',
                  'text-zinc-700 hover:text-zinc-900',
                  'focus:ring-zinc-400'
                ),
              };

              const classes = cn(
                baseClasses,
                variantClasses[action.variant || 'primary']
              );

              if (action.href) {
                return (
                  <Link key={index} href={action.href} className={classes}>
                    {buttonContent}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={classes}
                >
                  {buttonContent}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats Row */}
      {stats && <div className="w-full">{stats}</div>}
    </div>
  );
}

/**
 * ============================================================
 * HeaderStats - صف الإحصائيات في الرأس (مضغوط)
 * ============================================================
 */

interface HeaderStatsProps {
  children: ReactNode;
  className?: string;
}

export function HeaderStats({ children, className }: HeaderStatsProps) {
  return (
    <div
      className={cn(
        'grid gap-3 sm:gap-3.5',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * ============================================================
 * HeaderStatCard - بطاقة إحصائية صغيرة في الرأس (مضغوطة)
 * ============================================================
 */

interface HeaderStatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'amber';
  className?: string;
}

export function HeaderStatCard({
  label,
  value,
  icon,
  color = 'blue',
  className,
}: HeaderStatCardProps) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-50 to-blue-100/60',
      border: 'border-blue-200/50',
      text: 'text-blue-700',
      label: 'text-blue-600/70',
    },
    green: {
      bg: 'from-green-50 to-green-100/60',
      border: 'border-green-200/50',
      text: 'text-green-700',
      label: 'text-green-600/70',
    },
    orange: {
      bg: 'from-orange-50 to-orange-100/60',
      border: 'border-orange-200/50',
      text: 'text-orange-700',
      label: 'text-orange-600/70',
    },
    purple: {
      bg: 'from-purple-50 to-purple-100/60',
      border: 'border-purple-200/50',
      text: 'text-purple-700',
      label: 'text-purple-600/70',
    },
    red: {
      bg: 'from-red-50 to-red-100/60',
      border: 'border-red-200/50',
      text: 'text-red-700',
      label: 'text-red-600/70',
    },
    amber: {
      bg: 'from-amber-50 to-amber-100/60',
      border: 'border-amber-200/50',
      text: 'text-amber-700',
      label: 'text-amber-600/70',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        'group px-3 sm:px-3.5 py-3 sm:py-3.5',
        `bg-gradient-to-br ${colors.bg}`,
        `rounded-lg border ${colors.border}`,
        'shadow-sm hover:shadow-md',
        'transition-all duration-200 ease-out',
        'hover:scale-[1.02] hover:-translate-y-0.5',
        'will-change-transform',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className={cn('text-[9px] sm:text-[10px] font-semibold mb-1 tracking-wide', colors.label)}>
            {label}
          </div>
          <div
            className={cn(
              'text-base sm:text-lg font-bold leading-none tabular-nums',
              colors.text
            )}
          >
            {value}
          </div>
        </div>
        <div
          className={cn(
            'text-xl sm:text-2xl flex-shrink-0',
            'transform group-hover:scale-110 group-hover:rotate-6',
            'transition-transform duration-200'
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}