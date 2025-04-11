'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { toolsColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';
import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { AddTools } from './add-tools';
import { getCookie } from 'cookies-next';
import { categories } from '@/lib/data';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Tools } from '@/schema/tools';
import { DeleteButton } from '@/components/delete-all-button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
export const ToolsTable = ({
  data,
  pageCount,
  total,
  refetch,
}: {
  data: Tools[];
  total : number;
  pageCount: number;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
      value: 'name',
      label: 'Tools',
    },

    {
      label: 'Category',
      value: 'category',
      options: categories.map((i: any) => ({
        value: i,
        label: i,
      })),
    },

    {
      label: 'Status',
      value: 'status',
      options: ['Active', 'Inactive'].map((i: any) => ({
        value: i,
        label: i,
      })),
    },
  ];
  const columns = React.useMemo(() => toolsColumns(), []);
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: true,
    defaultPerPage: 50,
  });

  const role = getCookie('ci-portal.role');

  const onDeleteSuccess = () => {
    toast.success('Tools deleted successfully');
  };
  return (
    <Shell className="w-full gap-2">
      <DataTable table={table} size={'w-full'} pagination={true} isServer refetchFn={refetch}>
        <DataTableAdvancedToolbar
          table={table}
          filterFields={filterFields}
          isServer
          refetchFn={refetch}
        >
          {role === 'admin' && (
            <>
              {' '}
              <AddTools />{' '}
              <DeleteButton
                title="Delete Tools"
                deleteUrl="/tools/erase-all"
                onDeleteSuccess={onDeleteSuccess}
              />
            </>
          )}
          <Badge variant={'ghost'} className="text-xs h-8 rounded-full font-bold">
            Total Tools: {total}
          </Badge>
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
