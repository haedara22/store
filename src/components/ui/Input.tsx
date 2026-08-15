import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    // Generate a fallback ID for accessiblity if needed
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-bold text-zinc-900 tracking-tight"
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-zinc-900 font-medium placeholder:text-zinc-400 text-sm md:text-base',
              'focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
              'hover:border-zinc-400 transition-all duration-200 shadow-xs',
              'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:border-zinc-300',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error ? 'border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/20 hover:border-red-500' : '',
              className
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute right-3.5 text-zinc-400 pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p className="text-xs text-zinc-500 mt-1">
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="flex items-center gap-1 text-xs md:text-sm font-semibold text-red-600 mt-1">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';