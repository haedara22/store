import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * ============================================================
 * PageContainer - حاوية موحدة لجميع صفحات لوحة التحكم
 * ============================================================
 * 
 * مكون موحد يوفر:
 * - عرض أقصى ثابت ومتوسط
 * - مسافات داخلية موحدة ومتجاوبة
 * - مسافات عمودية متسقة بين الأقسام
 */

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  noPadding?: boolean;
  className?: string;
}

export function PageContainer({
  children,
  maxWidth = 'xl',
  noPadding = false,
  className,
  ...props
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-[1280px]',
    '3xl': 'max-w-[1440px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        // Base styles
        'w-full mx-auto',
        
        // Max width
        maxWidthClasses[maxWidth],
        
        // Responsive padding - Compact 8px grid system
        !noPadding && 'px-3 sm:px-4 lg:px-6 xl:px-8',
        
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * ============================================================
 * PageContent - محتوى الصفحة مع المسافات العمودية
 * ============================================================
 */

interface PageContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PageContent({
  children,
  spacing = 'md',
  className,
  ...props
}: PageContentProps) {
  const spacingClasses = {
    sm: 'space-y-3 sm:space-y-4',           // 12-16px
    md: 'space-y-4 sm:space-y-5',           // 16-20px
    lg: 'space-y-5 sm:space-y-6',           // 20-24px
  };

  return (
    <div
      className={cn(
        // Vertical spacing between sections
        spacingClasses[spacing],
        
        // Top padding - Compact
        'py-3 sm:py-4 lg:py-5',
        
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * ============================================================
 * Section - قسم داخل الصفحة
 * ============================================================
 */

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn('w-full', className)} {...props}>
      {children}
    </section>
  );
}