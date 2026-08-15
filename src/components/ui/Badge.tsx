import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'dark' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className, 
  ...props 
}: BadgeProps) {
  const variants = {
    // Default Gray
    default: 'bg-zinc-100 text-zinc-900 border border-zinc-200/90 font-semibold',
    
    // Primary Brand Orange - High Contrast
    primary: 'bg-orange-100 text-orange-950 border border-orange-300 font-bold',
    
    // Success Green
    success: 'bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold',
    
    // Warning Amber
    warning: 'bg-amber-100 text-amber-950 border border-amber-300 font-bold',
    
    // Danger Red
    danger: 'bg-red-100 text-red-950 border border-red-300 font-bold',
    
    // Ultra-Dark High Contrast (Great for dark sections)
    dark: 'bg-zinc-950 text-white border border-zinc-800 font-bold shadow-xs',
    
    // Subtle Border Outline
    outline: 'bg-transparent text-zinc-800 border border-zinc-300 font-semibold',
  };
  
  const sizes = {
    sm: 'text-[11px] leading-tight px-2.5 py-0.5 tracking-wide',
    md: 'text-xs md:text-sm px-3 py-1 font-bold',
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full shrink-0 transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}