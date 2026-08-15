import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * ============================================================
 * UnifiedStatsCard - بطاقة إحصائية موحدة (مضغوطة)
 * ============================================================
 * 
 * مواصفات موحدة:
 * - ارتفاع ثابت: min-h-[120px]
 * - padding موحد: p-4 sm:p-5
 * - أحجام خطوط موحدة
 * - ألوان متسقة حسب النوع
 * - hover effects موحدة
 */

interface UnifiedStatsCardProps {
  title: string;
  value: string | number;
  icon: string | ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'amber';
  trend?: {
    value: number | string;
    label: string;
    isPositive?: boolean;
  };
  href?: string;
  subtitle?: string;
  className?: string;
}

// دالة مساعدة للحصول على الألوان حسب النوع
function getStatsColors(color: string) {
  const colors: Record<string, { bg: string; border: string; text: string; shadow: string; ring: string; icon: string }> = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/60',
      border: 'border-blue-200/50',
      text: 'text-blue-700',
      shadow: 'shadow-blue-500/5 hover:shadow-blue-500/15',
      ring: 'ring-blue-100',
      icon: 'text-blue-500',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100/60',
      border: 'border-green-200/50',
      text: 'text-green-700',
      shadow: 'shadow-green-500/5 hover:shadow-green-500/15',
      ring: 'ring-green-100',
      icon: 'text-green-500',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100/60',
      border: 'border-orange-200/50',
      text: 'text-orange-700',
      shadow: 'shadow-orange-500/5 hover:shadow-orange-500/15',
      ring: 'ring-orange-100',
      icon: 'text-orange-500',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/60',
      border: 'border-purple-200/50',
      text: 'text-purple-700',
      shadow: 'shadow-purple-500/5 hover:shadow-purple-500/15',
      ring: 'ring-purple-100',
      icon: 'text-purple-500',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100/60',
      border: 'border-red-200/50',
      text: 'text-red-700',
      shadow: 'shadow-red-500/5 hover:shadow-red-500/15',
      ring: 'ring-red-100',
      icon: 'text-red-500',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/60',
      border: 'border-amber-200/50',
      text: 'text-amber-700',
      shadow: 'shadow-amber-500/5 hover:shadow-amber-500/15',
      ring: 'ring-amber-100',
      icon: 'text-amber-500',
    },
  };
  return colors[color] || colors.blue;
}

export function UnifiedStatsCard({
  title,
  value,
  icon,
  color = 'blue',
  trend,
  href,
  subtitle,
  className,
}: UnifiedStatsCardProps) {
  const colors = getStatsColors(color);

  const cardContent = (
    <div
      className={cn(
        // Fixed dimensions - Compact
        'min-h-[120px]',
        'p-4 sm:p-5',
        
        // Styling
        `${colors.bg}`,
        `rounded-lg border ${colors.border}`,
        'shadow-sm hover:shadow-md',
        `${colors.shadow}`,
        
        // Transitions - Faster
        'transition-all duration-200 ease-out',
        'hover:scale-[1.02] hover:-translate-y-0.5',
        'will-change-transform',
        
        // Group for child animations
        'group',
        
        className
      )}
    >
      <div className="flex flex-col h-full justify-between gap-3">
        {/* Top: Icon and Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'text-[10px] sm:text-xs font-semibold mb-1.5 tracking-wide',
                `${colors.text} opacity-70`
              )}
            >
              {title}
            </h3>
            
            {/* Value - Compact */}
            <div
              className={cn(
                'text-xl sm:text-2xl font-bold leading-none tabular-nums',
                colors.text
              )}
            >
              {value}
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <p className={cn('text-[10px] sm:text-xs mt-1', `${colors.text} opacity-60`)}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Icon - Compact */}
          <div
            className={cn(
              'flex-shrink-0',
              'w-10 h-10 sm:w-11 sm:h-11',
              'bg-white/50 backdrop-blur-sm',
              'rounded-lg',
              'flex items-center justify-center',
              'shadow-sm',
              `${colors.ring} ring-2`,
              'transform group-hover:scale-105 group-hover:rotate-6',
              'transition-transform duration-200'
            )}
          >
            {typeof icon === 'string' ? (
              <span className="text-xl sm:text-2xl">{icon}</span>
            ) : (
              icon
            )}
          </div>
        </div>

        {/* Bottom: Trend or Link */}
        {trend && (
          <div className="flex items-center gap-1.5">
            {trend.isPositive !== undefined && (
              <span
                className={cn(
                  'inline-flex items-center justify-center',
                  'w-5 h-5 rounded-full',
                  trend.isPositive
                    ? 'bg-green-500/15 text-green-700'
                    : 'bg-red-500/15 text-red-700'
                )}
              >
                {trend.isPositive ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                )}
              </span>
            )}
            <div>
              <span
                className={cn(
                  'text-xs sm:text-sm font-bold tabular-nums',
                  colors.text
                )}
              >
                {trend.value}
              </span>
              <span className={cn('text-[10px] sm:text-xs mr-1', `${colors.text} opacity-60`)}>
                {trend.label}
              </span>
            </div>
          </div>
        )}

        {/* Link indicator - Compact */}
        {href && (
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className={colors.text}>عرض</span>
            <svg
              className={cn('w-3 h-3', colors.icon)}
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
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/**
 * ============================================================
 * StatsGrid - شبكة البطاقات الإحصائية (مضغوطة)
 * ============================================================
 */

interface StatsGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({ children, columns = 4, className }: StatsGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div
      className={cn(
        'grid gap-3 sm:gap-3.5',
        columnClasses[columns],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * ============================================================
 * CompactStatsCard - بطاقة إحصائية مصغرة (مضغوطة)
 * ============================================================
 * للاستخدام في أماكن ضيقة أو كبطاقات ثانوية
 */

interface CompactStatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'amber';
  className?: string;
}

export function CompactStatsCard({
  label,
  value,
  icon,
  color = 'blue',
  className,
}: CompactStatsCardProps) {
  const colors = getStatsColors(color);

  return (
    <div
      className={cn(
        'px-3 py-2.5 sm:px-3.5 sm:py-3',
        `${colors.bg}`,
        `rounded-lg border ${colors.border}`,
        'shadow-sm hover:shadow-sm',
        'transition-all duration-200',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex-1 min-w-0">
          <div className={cn('text-[9px] sm:text-[10px] font-semibold mb-0.5 tracking-wide', `${colors.text} opacity-70`)}>
            {label}
          </div>
          <div className={cn('text-sm sm:text-base font-bold tabular-nums', colors.text)}>
            {value}
          </div>
        </div>
        {icon && (
          <div className="text-lg sm:text-xl flex-shrink-0 opacity-80">{icon}</div>
        )}
      </div>
    </div>
  );
}