'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { opportunityColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';

import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { AddOpportunity } from './add';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';

export const OpportunityTable = ({ data, pageCount }: { data: any[]; pageCount: number }) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
        value: "project_id",
        label: "Project ID",
    },
    {
      value: 'company',
      label: 'Company',
    },
    {
      label: 'Department',
      value: 'department',
    },
    {
      label: 'Plant',
      value: 'plant',
    },
    {
      label: 'Employee (PL) ID',
      value: 'employee_id',
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
      label: 'Type',
      value: 'type',
      options: ['Type-1', 'Type-2', 'Type-3'].map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
      label: 'Savings Type',
      value: 'savings_type',
      dtype: 'int',
    },
    {
      label: 'Estimated Savings',
      value: 'estimated_savings',
      dtype: 'int',
    },
    {
      label: 'Problem Impact',
      value: 'problem_impact',
      options: ['Low', 'Medium', 'High', 'Very High', 'Extremely High'].map((i: any) => ({
        value: i,
        label: i,
      })),
    },

    {
      label: 'Status',
      value: 'status',
      options: [
        'Open for Assigning',
        'Project Assign Pending (CIHead)',
        'Project Assign Pending (HOD)',
        'PL Approved',
        'Details Updated',
        'Teams Updated',
        'Opportunity Completed',
        'Define Completed',
        'Revoke',
        'Define Phase Pending',
        'Define Phase Completed',
        'Measure/Analyze Phase Pending',
        'Measure/Analyze Phase Completed',
        'Improve Phase Pending',
        'Improve Phase Completed',
        'Control Phase Pending',
        'Control Phase Completed',
        'Closure Completed',
        'Project Closure Pending (CIHead)',
        'Project Closure Pending (HOD)',
        'Project Closure Pending (LOF)',
        'Project Closure Pending (Costing Head)',
        'Project Completed',
        'Expired',
      ].map((i: any) => ({
        value: i,
        label: i,
      })),
    },
  ];
  const columns = React.useMemo(() => opportunityColumns(), []);
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
    <Shell className="gap-2">
      <DataTable table={table} size={'w-full'} pagination={true}>
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <CalendarDatePicker
            date={date}
            onDateSelect={({ from, to }) => {
              setDate({ from, to });
              const params = new URLSearchParams(searchParams.toString());

              params.set('from', from!.toISOString());
              params.set('to', to!.toISOString());

              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            className="h-8"
          />
             <AddOpportunity/>  
             <Button variant={'ghost-1'} size={'sm'} className="text-xs">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export 
          </Button>
        </DataTableAdvancedToolbar>
     
      </DataTable>
    </Shell>
  );
};
