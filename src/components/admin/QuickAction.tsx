'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface QuickActionProps {
  title: string;
  description?: string;
  icon: ReactNode;
  href: string;
  gradient: string;
  iconBg: string;
}

export function QuickAction({
  title,
  description,
  icon,
  href,
  gradient,
  iconBg,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-3 sm:p-4 transition-all duration-200 hover:border-orange-300 hover:shadow-md"
    >
      {/* Background Gradient - Subtle */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-5 ${gradient}`} />

      {/* Icon - Compact */}
      <div
        className={`mb-2 sm:mb-2.5 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg ${iconBg} text-lg sm:text-xl shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-md`}
      >
        {icon}
      </div>

      {/* Content - Compact */}
      <h3 className="mb-1 text-sm sm:text-base font-bold text-zinc-900 transition-colors group-hover:text-orange-600">
        {title}
      </h3>
      {description && (
        <p className="text-[10px] sm:text-xs text-zinc-500 line-clamp-2">{description}</p>
      )}

      {/* Arrow Icon - Compact */}
      <div className="mt-2 sm:mt-2.5 flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-orange-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span>ابدأ</span>
        <svg
          className="h-2.5 w-2.5 sm:h-3 sm:w-3 transform transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      {/* Bottom Accent Line - Thinner */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${gradient} transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100`} />
    </Link>
  );
}