import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// Types
// ============================================================
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'neumorph';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

interface CardSubProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// ============================================================
// Padding & Radius Maps - Compact & Precise
// ============================================================
const paddingMap = {
  none: 'p-0',
  sm: 'p-2.5 sm:p-3',
  md: 'p-3 sm:p-3.5 md:p-4',
  lg: 'p-3.5 sm:p-4 md:p-4.5 lg:p-5',
  xl: 'p-4 sm:p-5 md:p-6 lg:p-7',
};

const radiusMap = {
  none: 'rounded-none',
  sm: 'rounded-md sm:rounded-lg',
  md: 'rounded-lg sm:rounded-xl',
  lg: 'rounded-xl sm:rounded-2xl',
  xl: 'rounded-2xl sm:rounded-3xl',
  full: 'rounded-full',
};

// ============================================================
// Main Card Component - Compact
// ============================================================
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      hoverable = false,
      variant = 'default',
      padding = 'md',
      radius = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        'bg-white border border-zinc-200/70 shadow-sm shadow-zinc-200/20',
      elevated:
        'bg-white border-0 shadow-md shadow-zinc-300/30 hover:shadow-lg hover:shadow-zinc-400/25 transition-shadow',
      outlined:
        'bg-transparent border border-zinc-300/70 shadow-none',
      glass: 'bg-white/60 backdrop-blur-md border border-white/30 shadow-md shadow-zinc-200/20',
      neumorph:
        'bg-zinc-100 shadow-[inset_1.5px_1.5px_6px_rgba(0,0,0,0.05),inset_-1.5px_-1.5px_6px_rgba(255,255,255,0.7),6px_6px_12px_rgba(0,0,0,0.06),-6px_-6px_12px_rgba(255,255,255,0.6)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base - Reduced transitions
          'overflow-hidden transition-all duration-200 ease-out will-change-transform',
          radiusMap[radius],
          paddingMap[padding],
          variants[variant],

          // Hover - Subtle
          hoverable && 'cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300/50 active:scale-[0.98] active:translate-y-0',

          // Focus - Thin ring
          'focus-within:ring-1 focus-within:ring-zinc-800 focus-within:ring-offset-1',

          // Dark mode - Refined
          'dark:bg-zinc-900 dark:border-zinc-700/50',
          variant === 'default' && 'dark:bg-zinc-900 dark:border-zinc-700/50 dark:shadow-zinc-800/20',
          variant === 'elevated' && 'dark:bg-zinc-900 dark:shadow-zinc-800/40',
          variant === 'outlined' && 'dark:border-zinc-600 dark:bg-transparent',
          variant === 'glass' && 'dark:bg-zinc-900/50 dark:border-zinc-700/20 dark:shadow-zinc-800/15',
          variant === 'neumorph' && 'dark:bg-zinc-800 dark:shadow-[inset_1.5px_1.5px_6px_rgba(0,0,0,0.25),inset_-1.5px_-1.5px_6px_rgba(255,255,255,0.04),6px_6px_12px_rgba(0,0,0,0.35),-6px_-6px_12px_rgba(255,255,255,0.02)]',

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================================
// CardHeader - Compact
// ============================================================
export const CardHeader = forwardRef<HTMLDivElement, CardSubProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Reduced padding
          'px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 lg:px-6 lg:py-4',
          'border-b border-zinc-200/50 dark:border-zinc-700/40',
          'bg-gradient-to-b from-white/50 to-transparent dark:from-zinc-900/30',
          // Smaller headings
          '[&>h1]:text-lg [&>h1]:sm:text-xl [&>h1]:lg:text-2xl',
          '[&>h2]:text-base [&>h2]:sm:text-lg [&>h2]:lg:text-xl',
          '[&>h3]:text-sm [&>h3]:sm:text-base [&>h3]:lg:text-lg',
          '[&>h1]:font-bold [&>h2]:font-semibold [&>h3]:font-semibold',
          '[&>h1]:tracking-tight [&>h2]:tracking-tight [&>h3]:tracking-tight',
          '[&>h1]:text-zinc-900 [&>h2]:text-zinc-900 [&>h3]:text-zinc-800',
          'dark:[&>h1]:text-zinc-100 dark:[&>h2]:text-zinc-100 dark:[&>h3]:text-zinc-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================================
// CardBody - Compact
// ============================================================
export const CardBody = forwardRef<HTMLDivElement, CardSubProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Reduced padding
          'px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6',
          // Smaller text
          '[&>p]:text-xs [&>p]:sm:text-sm [&>p]:lg:text-base',
          '[&>p]:leading-relaxed [&>p]:text-zinc-700 dark:[&>p]:text-zinc-300',
          '[&>*+*]:mt-3 [&>*+*]:sm:mt-4',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// ============================================================
// CardFooter - Compact
// ============================================================
export const CardFooter = forwardRef<HTMLDivElement, CardSubProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Reduced padding
          'px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5',
          'border-t border-zinc-200/50 dark:border-zinc-700/40',
          'bg-zinc-50/40 dark:bg-zinc-800/30',
          'flex flex-wrap items-center justify-between gap-2',
          'text-xs sm:text-sm text-zinc-600 dark:text-zinc-400',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ============================================================
// CardTitle - Compact
// ============================================================
export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          // Smaller titles
          'text-base font-semibold text-zinc-900 dark:text-zinc-100',
          'sm:text-lg lg:text-xl',
          'tracking-tight leading-tight',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ============================================================
// CardDescription - Compact
// ============================================================
export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          // Smaller text
          'text-xs text-zinc-600 dark:text-zinc-400',
          'sm:text-sm',
          'mt-1 leading-relaxed',
          'max-w-prose',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

// ============================================================
// CardDivider - Compact
// ============================================================
export const CardDivider = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          'border-0 h-px w-full',
          'bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent',
          'dark:via-zinc-600/30',
          className
        )}
        {...props}
      />
    );
  }
);

CardDivider.displayName = 'CardDivider';

// ============================================================
// CardBadge - Compact
// ============================================================
export const CardBadge = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Smaller badge
          'inline-block px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase',
          'rounded-full bg-zinc-900/10 text-zinc-800',
          'dark:bg-zinc-100/10 dark:text-zinc-300',
          'border border-zinc-200/30 dark:border-zinc-700/30',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

CardBadge.displayName = 'CardBadge';

// ============================================================
// CardGroup - New Component for Grid Layout
// ============================================================
interface CardGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const gapMap = {
  sm: 'gap-2 sm:gap-2.5',
  md: 'gap-2.5 sm:gap-3',
  lg: 'gap-3 sm:gap-4',
};

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export const CardGroup = forwardRef<HTMLDivElement, CardGroupProps>(
  ({ children, cols = 2, gap = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          colsMap[cols],
          gapMap[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardGroup.displayName = 'CardGroup';