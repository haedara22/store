'use client';

import { ReactNode } from 'react';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  align?: 'right' | 'center' | 'left';
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  emptyState?: ReactNode;
  isLoading?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  emptyState,
  isLoading,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div className="animate-pulse space-y-3 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 flex-1 rounded-md bg-zinc-100" />
              <div className="h-8 w-24 rounded-md bg-zinc-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-8 sm:p-10 text-center">
        {emptyState || (
          <div>
            <div className="mb-3 text-4xl">📋</div>
            <p className="text-sm text-zinc-500 font-medium">لا توجد بيانات لعرضها</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-zinc-600 uppercase tracking-wider ${
                    column.align === 'center'
                      ? 'text-center'
                      : column.align === 'left'
                      ? 'text-left'
                      : 'text-right'
                  }`}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors duration-150 ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-orange-50/60'
                    : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 text-xs sm:text-sm ${
                      column.align === 'center'
                        ? 'text-center'
                        : column.align === 'left'
                        ? 'text-left'
                        : 'text-right'
                    }`}
                  >
                    {column.render ? column.render(item) : item[column.key]}
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