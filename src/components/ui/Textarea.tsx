import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    // Fallback ID for accessibility
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label 
            htmlFor={textareaId} 
            className="block text-sm font-bold text-zinc-900 tracking-tight"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            className={cn(
              'w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl text-zinc-900 font-medium placeholder:text-zinc-400 text-sm md:text-base leading-relaxed',
              'min-h-[100px] resize-y',
              'focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
              'hover:border-zinc-400 transition-all duration-200 shadow-xs',
              'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:border-zinc-300',
              error && 'border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/20 hover:border-red-500',
              className
            )}
            {...props}
          />
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p className="text-xs md:text-sm text-zinc-500 mt-1">
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

Textarea.displayName = 'Textarea';