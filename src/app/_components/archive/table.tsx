'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { archiveColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';

import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
// import { AddOpportunity } from './add';
import { AddArchive } from './add';
import { categories } from '@/lib/data';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { DeleteButton } from '@/components/delete-all-button';
import { toast } from 'sonner';

export const ArchiveTable = ({
  data,
  pageCount,
  refetchFn,
}: {
  data: any[];
  pageCount: number;
  refetchFn: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
      value: 'company',
      label: 'Company',
    },
    {
      value: 'department',
      label: 'Department',
    },
    {
      value: 'plant',
      label: 'Plant',
    },
    {
      value: 'category',
      label: 'Category',
      options: categories.map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
      value: 'year',
      label: 'Year',
      options: Array.from(
        { length: 20 },
        (_, i) => `${new Date().getFullYear() - i}-${new Date().getFullYear() - i + 1}`,
      ).map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
      value: 'project_leader',
      label: 'Project Leader',
    },
    {
      value: 'project_title',
      label: 'Project Title',
    },
    {
      label: 'Baseline',
      value: 'baseline',
      dtype: 'int',
    },
    {
      label: 'Target',
      value: 'target',
      dtype: 'int',
    },
    {
      label: 'Result',
      value: 'result',
    },
  ];
  const columns = React.useMemo(() => archiveColumns(), []);
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: true,
    defaultPerPage: 50,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  const role = getCookie('ci-portal.role');
  return (
    <Shell className="w-full gap-2">
      <DataTable table={table} size={'w-full'} pagination={true} refetchFn={refetchFn} isServer>
        <DataTableAdvancedToolbar
          table={table}
          filterFields={filterFields}
          refetchFn={refetchFn}
          isServer
        >
          {role === 'admin' && (
            <>
              <AddArchive />
              <DeleteButton
                title="Delete Archive"
                deleteUrl="/archive/earse-all"
                onDeleteSuccess={() => {
                  toast.success('Archives Deleted Successfully');
                }}
              />
            </>
          )}
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
