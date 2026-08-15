import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// Types
// ============================================================
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'warning'
    | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

// ============================================================
// Button Component
// ============================================================
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      rounded = 'lg',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // ============================================================
    // Styles Maps
    // ============================================================
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.96] shrink-0 gap-2';

    const roundedMap = {
      none: 'rounded-none',
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      full: 'rounded-full',
    };

    const variants = {
      // ===== Primary - Bold & Vibrant =====
      primary: `
        bg-gradient-to-br from-orange-500 to-orange-600
        text-white
        hover:from-orange-600 hover:to-orange-700
        active:from-orange-700 active:to-orange-800
        focus-visible:ring-orange-500
        shadow-md shadow-orange-500/30
        hover:shadow-xl hover:shadow-orange-500/40
        hover:-translate-y-0.5
      `,

      // ===== Secondary - Premium Dark =====
      secondary: `
        bg-zinc-900 text-white
        hover:bg-zinc-800
        active:bg-zinc-950
        focus-visible:ring-zinc-800
        shadow-sm shadow-zinc-900/20
        hover:shadow-md hover:shadow-zinc-900/30
        dark:bg-zinc-100 dark:text-zinc-900
        dark:hover:bg-zinc-200
        dark:active:bg-zinc-300
      `,

      // ===== Outline - Clean & Sharp =====
      outline: `
        border-2 border-orange-500
        text-orange-600
        hover:bg-orange-50
        active:bg-orange-100
        focus-visible:ring-orange-500
        dark:border-orange-400
        dark:text-orange-400
        dark:hover:bg-orange-950/30
        dark:active:bg-orange-950/50
      `,

      // ===== Ghost - Minimal & Subtle =====
      ghost: `
        text-zinc-700
        hover:bg-zinc-100
        active:bg-zinc-200
        focus-visible:ring-zinc-400
        dark:text-zinc-300
        dark:hover:bg-zinc-800
        dark:active:bg-zinc-700
      `,

      // ===== Danger - High Alert =====
      danger: `
        bg-gradient-to-br from-red-600 to-red-700
        text-white
        hover:from-red-700 hover:to-red-800
        active:from-red-800 active:to-red-900
        focus-visible:ring-red-500
        shadow-md shadow-red-500/30
        hover:shadow-xl hover:shadow-red-500/40
        hover:-translate-y-0.5
      `,

      // ===== Success - Confirmation =====
      success: `
        bg-gradient-to-br from-emerald-500 to-emerald-600
        text-white
        hover:from-emerald-600 hover:to-emerald-700
        active:from-emerald-700 active:to-emerald-800
        focus-visible:ring-emerald-500
        shadow-md shadow-emerald-500/30
        hover:shadow-xl hover:shadow-emerald-500/40
        hover:-translate-y-0.5
      `,

      // ===== Warning - Attention =====
      warning: `
        bg-gradient-to-br from-amber-500 to-amber-600
        text-white
        hover:from-amber-600 hover:to-amber-700
        active:from-amber-700 active:to-amber-800
        focus-visible:ring-amber-500
        shadow-md shadow-amber-500/30
        hover:shadow-xl hover:shadow-amber-500/40
        hover:-translate-y-0.5
      `,

      // ===== Gradient - Premium & Eye-catching =====
      gradient: `
        bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500
        text-white
        hover:from-purple-700 hover:via-pink-600 hover:to-orange-600
        active:from-purple-800 active:via-pink-700 active:to-orange-700
        focus-visible:ring-purple-500
        shadow-md shadow-purple-500/30
        hover:shadow-xl hover:shadow-purple-500/40
        hover:-translate-y-0.5
        bg-[length:200%_200%]
        hover:bg-[position:100%_100%]
        transition-[background-position]
      `,
    };

    const sizes = {
      xs: 'text-xs px-3 py-1.5 min-h-[32px]',
      sm: 'text-sm px-4 py-2 min-h-[38px]',
      md: 'text-sm md:text-base px-5 py-2.5 min-h-[44px]',
      lg: 'text-base md:text-lg px-7 py-3.5 min-h-[52px]',
      xl: 'text-lg md:text-xl px-8 py-4 min-h-[60px]',
    };

    // ============================================================
    // Loading Spinner
    // ============================================================
    const Spinner = () => (
      <svg
        className="h-4 w-4 shrink-0 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
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
    );

    // ============================================================
    // Render
    // ============================================================
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          roundedMap[rounded],
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          // Add padding adjustment when icon is present without children
          icon && !children ? 'px-3' : '',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>جارٍ التحميل...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================
// IconButton - For icon-only buttons
// ============================================================
interface IconButtonProps extends Omit<ButtonProps, 'children' | 'iconPosition'> {
  icon: ReactNode;
  label: string; // For accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = 'md', rounded = 'full', className, ...props }, ref) => {
    const sizeMap = {
      xs: 'p-1.5',
      sm: 'p-2',
      md: 'p-2.5',
      lg: 'p-3.5',
      xl: 'p-4',
    };

    return (
      <Button
        ref={ref}
        size={size}
        rounded={rounded}
        className={cn(sizeMap[size], className)}
        aria-label={label}
        icon={icon}
        {...props}
      >
        {null}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

// ============================================================
// ButtonGroup - Group multiple buttons
// ============================================================
interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md';
}

export const ButtonGroup = ({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'md',
}: ButtonGroupProps) => {
  const spacingMap = {
    none: 'gap-0',
    sm: 'gap-1.5',
    md: 'gap-2.5',
  };

  return (
    <div
      className={cn(
        'inline-flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        spacingMap[spacing],
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';