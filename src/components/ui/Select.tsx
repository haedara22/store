import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, placeholder, options, className, id, value, defaultValue, ...props }, ref) => {
    // Fallback ID for accessibility
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-sm font-bold text-zinc-900 tracking-tight"
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              'w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-zinc-900 font-medium text-sm md:text-base appearance-none cursor-pointer',
              'ps-4 pe-10', // Responsive padding for custom arrow icon in both RTL & LTR
              'focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
              'hover:border-zinc-400 transition-all duration-200 shadow-xs',
              'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:border-zinc-300',
              error && 'border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/20 hover:border-red-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-zinc-400">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
                className="text-zinc-900 font-medium py-1"
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom Chevron Down Arrow */}
          <div className="absolute inset-y-0 end-3.5 flex items-center pointer-events-none text-zinc-500">
            <svg 
              className="w-4 h-4 shrink-0 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

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

Select.displayName = 'Select';