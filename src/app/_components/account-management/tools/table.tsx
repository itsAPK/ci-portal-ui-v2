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
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { AddTools } from './add-tools';
// import { AddOpportunity } from './add';

export const ToolsTable = ({ data, pageCount }: { data: any[]; pageCount: number }) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
      value: 'tools',
      label: 'Tools',
    },

    {
      label: 'Category',
      value: 'category',
      options: ['Black Belt', 'Green Belt', 'SITG'].map((i: any) => ({
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  return (
    <Shell className="gap-2 w-full">
      <DataTable table={table} size={'w-full'} pagination={true}>
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <AddTools />
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
