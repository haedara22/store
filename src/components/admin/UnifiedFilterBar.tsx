import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

/**
 * ============================================================
 * UnifiedFilterBar - شريط فلترة موحد واحترافي
 * ============================================================
 * 
 * مع هوامش وقياسات محسّنة لتجربة مستخدم أفضل
 */

interface UnifiedFilterBarProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function UnifiedFilterBar({
  children,
  onSubmit,
  className,
}: UnifiedFilterBarProps) {
  return (
    <Card 
      padding="md" 
      radius="xl"
      className={cn(
        'border-2 border-zinc-200/90',
        'shadow-sm hover:shadow-md',
        'transition-shadow duration-200',
        'bg-white',
        className
      )}
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-5"
      >
        {children}
      </form>
    </Card>
  );
}

/**
 * ============================================================
 * FilterInput - حقل بحث في الفلتر
 * ============================================================
 */

interface FilterInputProps {
  label?: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  icon?: ReactNode;
  className?: string;
}

export function FilterInput({
  label,
  name,
  placeholder,
  defaultValue,
  icon,
  className,
}: FilterInputProps) {
  return (
    <div className={cn('flex-1 min-w-0', className)}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-bold text-zinc-900 mb-2.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          type="text"
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn(
            'w-full h-11 sm:h-12',
            'px-4 py-2.5 sm:py-3',
            icon ? 'pr-11' : '',
            'bg-white border-2 border-zinc-200 rounded-xl',
            'text-sm sm:text-base font-semibold text-zinc-900',
            'placeholder-zinc-400 placeholder:font-normal',
            'focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
            'hover:border-zinc-300',
            'transition-all duration-200',
            'shadow-sm'
          )}
        />
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ============================================================
 * FilterSelect - قائمة منسدلة في الفلتر
 * ============================================================
 */

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label?: string;
  name: string;
  options: FilterSelectOption[];
  defaultValue?: string;
  className?: string;
}

export function FilterSelect({
  label,
  name,
  options,
  defaultValue,
  className,
}: FilterSelectProps) {
  return (
    <div className={cn('sm:w-56', className)}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-bold text-zinc-900 mb-2.5"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={cn(
          'w-full h-11 sm:h-12',
          'px-4 py-2.5 sm:py-3',
          'bg-white border-2 border-zinc-200 rounded-xl',
          'text-sm sm:text-base font-semibold text-zinc-900',
          'focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
          'hover:border-zinc-300',
          'transition-all duration-200',
          'shadow-sm cursor-pointer',
          'appearance-none',
          'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")]',
          'bg-[length:1.25rem] bg-[center_left_0.75rem] bg-no-repeat'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * ============================================================
 * FilterActions - أزرار الإجراءات في الفلتر
 * ============================================================
 */

interface FilterActionsProps {
  children: ReactNode;
  className?: string;
}

export function FilterActions({ children, className }: FilterActionsProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row gap-3 sm:gap-3.5 sm:items-end flex-shrink-0', className)}>
      {children}
    </div>
  );
}

/**
 * ============================================================
 * FilterButton - زر في شريط الفلترة
 * ============================================================
 */

interface FilterButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FilterButton({
  type = 'button',
  variant = 'primary',
  children,
  onClick,
  className,
}: FilterButtonProps) {
  const variants = {
    primary: cn(
      'bg-gradient-to-r from-orange-500 to-orange-600',
      'hover:from-orange-600 hover:to-orange-700',
      'active:from-orange-700 active:to-orange-800',
      'text-white',
      'shadow-md hover:shadow-lg',
      'shadow-orange-500/20 hover:shadow-orange-500/30'
    ),
    secondary: cn(
      'bg-zinc-100 hover:bg-zinc-200',
      'active:bg-zinc-300',
      'text-zinc-700 hover:text-zinc-900',
      'border-2 border-zinc-200 hover:border-zinc-300',
      'shadow-sm'
    ),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'flex-1 sm:flex-initial min-w-[110px]',
        'h-11 sm:h-12',
        'px-5 sm:px-6',
        'font-bold text-sm sm:text-base rounded-xl',
        'transition-all duration-200',
        'transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
        'flex items-center justify-center gap-2',
        'whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * ============================================================
 * SearchIcon - أيقونة البحث
 * ============================================================
 */

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-5 h-5', className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}