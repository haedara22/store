'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 p-6 sm:p-8">
      <div className="max-w-sm text-center">
        {icon && (
          <div className="mb-4 text-5xl sm:text-6xl opacity-40">{icon}</div>
        )}
        <h3 className="mb-1.5 text-base sm:text-lg font-bold text-zinc-900">{title}</h3>
        <p className="mb-4 text-xs sm:text-sm text-zinc-500">{description}</p>
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm text-white shadow-sm shadow-orange-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            <span>{action.label}</span>
          </Link>
        )}
      </div>
    </div>
  );
}