'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    href: string;
    icon?: ReactNode;
  };
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function PageHeader({
  title,
  description,
  icon,
  action,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="mb-3 sm:mb-4">
      {/* Breadcrumbs - Compact */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-1.5 sm:mb-2 flex items-center gap-1 text-[10px] sm:text-xs overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1 flex-shrink-0">
              {index > 0 && (
                <svg
                  className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-zinc-400"
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
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="font-medium text-zinc-500 transition-colors hover:text-orange-600 whitespace-nowrap"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-zinc-900 whitespace-nowrap">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Header - Compact */}
      <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-2 sm:gap-2.5 min-w-0 flex-1">
          {icon && (
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-base sm:text-lg shadow-sm shadow-orange-500/20">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-lg font-bold text-zinc-900 truncate">{title}</h1>
            {description && (
              <p className="text-[10px] sm:text-xs text-zinc-500 line-clamp-1 mt-0.5">{description}</p>
            )}
          </div>
        </div>

        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-white shadow-sm shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.97] flex-shrink-0"
          >
            {action.icon && (
              <span className="flex-shrink-0">{action.icon}</span>
            )}
            <span className="whitespace-nowrap">{action.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}