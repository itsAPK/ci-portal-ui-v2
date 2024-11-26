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
// import { AddOpportunity } from './add';

export const RequestPlantTable = ({ data, pageCount }: { data: any[]; pageCount: number }) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
      value: 'id',
      label: 'Employee ID',
    },
    {
        value: "name",
        label: "Employee Name",
    },
    {
      value: 'current_plant',
      label: 'Current Plant/Division',
    },
    {
      value: 'new_plant',
      label: 'New Plant/Division',
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
    <Shell className="gap-2 w-full">
      <DataTable table={table} size={'w-full'} pagination={true}>
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
