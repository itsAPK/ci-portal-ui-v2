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

export const ArchiveTable = ({ data, pageCount }: { data: any[]; pageCount: number }) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
        value: "project_title",
        label: "Project Title",
    },
    {
      label: 'Baseline',
      value: 'baseline',
    },
    {
      label: 'Target',
      value: 'target',
    },
    {
      label: 'Result',
      value: 'result',
    }
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

  return (
    <Shell className="gap-2 w-full">
      <DataTable table={table} size={'w-full'} pagination={true}>
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
        <AddArchive />
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
