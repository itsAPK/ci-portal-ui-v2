import * as React from 'react';
import { flexRender, type Table as TanstackTable } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/data-table/pagination';
import { ColumnResizer } from './column-resizer';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;

  /**
   * The floating bar to render at the bottom of the table on row selection.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBar={<TasksTableFloatingBar table={table} />}
   */
  floatingBar?: React.ReactNode | null;
  size?: string;
  pagination?: boolean;
  isServer?: boolean;
  refetchFn?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

export function DataTable<TData>({
  table,
  floatingBar = null,
  children,
  className,
  pagination = true,
  size = '100%',
  isServer = true,
  refetchFn,
  ...props
}: DataTableProps<TData>) {
  return (
    <div className={cn('w-full space-y-2.5 overflow-auto', className)} {...props}>
      {children}
      <div className={cn('rounded-md border ')}>
        <Table style={{ width: size ?? '100%' }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header,index) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                      className={cn("relative bg-primary", index === 0 && "rounded-t", headerGroup.headers.length === index + 1 && "rounded-t")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      <ColumnResizer header={header} />
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 text-center text-xs">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex flex-col gap-2.5">
          <DataTablePagination isServer={isServer} refetchFn={refetchFn} table={table} />
          {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
        </div>
      )}
    </div>
  );
}
