'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { templateColumns } from './columns';
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
import { AddTemplate } from './add';
import { getCookie } from 'cookies-next';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import { DeleteButton } from '@/components/delete-all-button';
import { toast } from 'sonner';

export const DocumentTable = ({
  data,
  pageCount,
  refetchFn,
}: {
  data: any[];
  pageCount: number;
  refetchFn: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const columns = React.useMemo(() => templateColumns(), []);
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    enableAdvancedFilter: false,

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
      <DataTable table={table} size={'w-full'} pagination={false} isServer refetchFn={refetchFn}>
        <DataTableAdvancedToolbar table={table} isServer refetchFn={refetchFn}>
          {role === 'admin' && (
            <>
              <AddTemplate />
              <DeleteButton
                title="Delete Template"
                deleteUrl="/documents/earse-all"
                onDeleteSuccess={() => {
                  toast.success('Templates Deleted Successfully');
                }}
              />
            </>
          )}
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
