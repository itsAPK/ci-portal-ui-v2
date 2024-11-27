'use client';
import { useDataTable } from '@/hooks/use-data-table';
import {  trainingColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';

import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { Button } from '@/components/ui/button';
import { DownloadIcon, UploadIcon } from 'lucide-react';
// import { AddOpportunity } from './add';

export const TrainingTable = ({ data, pageCount }: { data: any[]; pageCount: number }) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
        label : 'Employee ID',
        value: "employee_id",
    },
    {
        label : "Employee Name",
        value: "employee_name",
    },
    {
        label : "Department",
        value: "department",
    },
  
    {
      label : 'Category',
      value: 'category',
      options: ['Black Belt', 'Green Belt', 'SITG'].map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
     label : "Bussiness Unit",
     value: "bussiness_unit",
    },
    {
        label : "Division",
        value: "division",
    },
    {
        label : "Company",
        value: "company",
    },
    {
        label : "Batch",
        value: "batch",
    },
    {
        label : "Year",
        value: "year",
    },
    {
        label : "Trainer",
        value: "trainer",
    }

    
  ];
  const columns = React.useMemo(() => trainingColumns(), []);
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
      <DataTable table={table} size={'140%'} pagination={true}>
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <Button  size={'sm'} className=" text-xs">
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload 
          </Button>
          <Button variant={'ghost-1'} size={'sm'} className="text-xs">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export 
          </Button>
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
