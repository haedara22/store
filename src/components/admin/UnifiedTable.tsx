import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * ============================================================
 * UnifiedTable - جدول موحد لعرض البيانات (مضغوط)
 * ============================================================
 * 
 * مواصفات موحدة:
 * - أحجام خطوط متسقة
 * - مسافات موحدة بين الصفوف والأعمدة
 * - ألوان موحدة للخلفيات والحدود
 * - hover effects متسقة
 */

interface Column {
  key: string;
  label: string;
  align?: 'right' | 'left' | 'center';
  width?: string;
  render?: (value: any, row: any) => ReactNode;
}

interface UnifiedTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  className?: string;
}

export function UnifiedTable({
  columns,
  data,
  onRowClick,
  emptyMessage = 'لا توجد بيانات',
  className,
}: UnifiedTableProps) {
  const getAlignment = (align: 'right' | 'left' | 'center' = 'right') => {
    const alignments = {
      right: 'text-right',
      left: 'text-left',
      center: 'text-center',
    };
    return alignments[align];
  };

  if (data.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="text-center py-10 sm:py-12 px-4">
          <div className="text-4xl mb-3 opacity-20">📋</div>
          <p className="text-sm font-semibold text-zinc-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header - Compact */}
          <thead>
            <tr className="bg-gradient-to-b from-zinc-50 to-white border-b border-zinc-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-3 sm:px-4 py-2.5 sm:py-3',
                    'text-[10px] sm:text-xs font-semibold text-zinc-600 uppercase tracking-wider',
                    'whitespace-nowrap',
                    getAlignment(column.align),
                    column.width
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body - Compact */}
          <tbody className="divide-y divide-zinc-100">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'transition-all duration-150',
                  'hover:bg-orange-50/40',
                  onRowClick && 'cursor-pointer hover:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.1)]'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-3 sm:px-4 py-2.5 sm:py-3',
                      'text-xs sm:text-sm text-zinc-700',
                      getAlignment(column.align)
                    )}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * ============================================================
 * TableCell Helpers - مساعدات خلايا الجدول (مضغوطة)
 * ============================================================
 */

interface BadgeCellProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

export function TableBadgeCell({ text, variant = 'default' }: BadgeCellProps) {
  const variants = {
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    default: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold border',
        variants[variant]
      )}
    >
      {text}
    </span>
  );
}

interface ActionsCellProps {
  children: ReactNode;
}

export function TableActionsCell({ children }: ActionsCellProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      {children}
    </div>
  );
}

interface TruncatedTextCellProps {
  text: string;
  maxLength?: number;
}

export function TableTruncatedTextCell({ text, maxLength = 40 }: TruncatedTextCellProps) {
  const truncated = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  
  return (
    <span className="block max-w-xs truncate text-xs sm:text-sm" title={text}>
      {truncated}
    </span>
  );
}

/**
 * ============================================================
 * SimpleTable - جدول بسيط للبيانات الصغيرة (مضغوط)
 * ============================================================
 */

interface SimpleTableProps {
  rows: Array<{
    label: string;
    value: ReactNode;
  }>;
  className?: string;
}

export function SimpleTable({ rows, className }: SimpleTableProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-zinc-200 bg-white',
        className
      )}
    >
      <table className="w-full">
        <tbody className="divide-y divide-zinc-100">
          {rows.map((row, index) => (
            <tr
              key={index}
              className="transition-colors hover:bg-zinc-50"
            >
              <td className="px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-zinc-500 w-1/3">
                {row.label}
              </td>
              <td className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-zinc-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}