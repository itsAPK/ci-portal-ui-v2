'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { requestPlantColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';

import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
// import { AddOpportunity } from './add';

export const RequestPlantTable = ({
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
      value: 'employee_id',
      label: 'Employee ID',
    },
    {
      value: 'employee_name',
      label: 'Employee Name',
    },
    {
      value: 'current_plant',
      label: 'Current Plant/Division',
    },
    {
      value: 'requested_plant',
      label: 'New Plant/Division',
    },
    {
      value: 'status',
      label: 'Status',
      options: ['Pending', 'Approved', 'Rejected'].map((i: string) => ({
        value: i.toLowerCase(),
        label: i,
      })),
    }
  ];
  const columns = React.useMemo(() => requestPlantColumns(), []);
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

  return (
    <Shell className="w-full gap-2">
      <DataTable table={table} size={'w-full'} pagination={true} isServer refetchFn={refetchFn}>
        <DataTableAdvancedToolbar
          table={table}
          isServer
          refetchFn={refetchFn}
          filterFields={filterFields}
        ></DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
