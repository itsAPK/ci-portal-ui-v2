import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import {
  usePathname,useSearchParams,useRouter
} from 'next/navigation'
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  isServer?: boolean;
  refetchFn?: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50, 100],
  isServer = true,
  refetchFn,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const newSearchParams = useSearchParams();
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex items-center space-x-2">
        <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            if (isServer) {
              router.push(`${pathname}?${newSearchParams}`);
              router.refresh();
              setTimeout(() => {
                refetchFn?.();
              }, 1000);
            }
          }}
        >
          <SelectTrigger className="h-8 w-[4.5rem]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              if (isServer) {
                router.push(`${pathname}?${newSearchParams}`);
                router.refresh();
                setTimeout(() => {
                  refetchFn?.();
                }, 1000);
              }
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              table.previousPage();
              if (isServer) {
                router.push(`${pathname}?${newSearchParams}`);
                router.refresh();
                setTimeout(() => {
                  refetchFn?.();
                }, 1000);
              }
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              table.nextPage();
              if (isServer) {
                router.push(`${pathname}?${newSearchParams}`);
                router.refresh();
                setTimeout(() => {
                  refetchFn?.();
                }, 1000);
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            
              if (isServer) {
                router.push(`${pathname}?${newSearchParams}`);
                router.refresh();
                setTimeout(() => {
                  refetchFn?.();
                }, 1000);
              }
            }}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
