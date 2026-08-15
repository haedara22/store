'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  href?: string;
  gradient: string;
  iconBg: string;
  textColor: string;
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  href,
  gradient,
  iconBg,
  textColor,
}: StatsCardProps) {
  const content = (
    <>
      {/* Background Gradient - Subtle */}
      <div className={`absolute inset-0 opacity-3 ${gradient}`} />

      {/* Content */}
      <div className="relative flex items-start justify-between gap-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-medium text-zinc-500 mb-1.5 truncate">{title}</p>
          <div className="flex items-baseline gap-1 mb-1.5">
            <h3 className={`text-xl sm:text-2xl font-bold ${textColor} leading-none`}>{value}</h3>
            {trend && (
              <span
                className={`flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold ${
                  trend.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {trend && (
            <p className="text-[9px] sm:text-[10px] text-zinc-400 truncate">{trend.label}</p>
          )}
        </div>

        {/* Icon - Compact */}
        <div
          className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-lg ${iconBg} text-base sm:text-lg shadow-sm transition-transform duration-200 group-hover:scale-105 group-hover:rotate-2`}
        >
          {icon}
        </div>
      </div>

      {/* Hover Effect Bar - Thinner */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${gradient} transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100`} />

      {/* Link Arrow - Compact */}
      {href && (
        <div className="mt-2 flex items-center gap-1 text-[10px] sm:text-xs font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className={textColor}>عرض</span>
          <svg
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 transform transition-transform duration-200 group-hover:translate-x-0.5 ${textColor}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      )}
    </>
  );

  const className = `group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-3 sm:p-4 transition-all duration-200 hover:shadow-md ${
    href ? 'cursor-pointer hover:border-orange-300' : ''
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}