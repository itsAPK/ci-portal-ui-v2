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
import { opportunityCategories } from '@/lib/utils';
import { categories } from '@/lib/data';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import api from '@/lib/api';
import { ExportOppurtunity } from './export';
import { Badge } from '@/components/ui/badge';
export const OpportunityTable = ({
  data,
  pageCount,
  total ,
  refetchFn,
}: {
  data: any[];
  total : number;
  pageCount: number;
  refetchFn: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
      value: 'opportunity_id',
      label: 'Project ID',
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
      label: 'Division',
      value : 'division'
    },
    {
      label: 'Employee (PL) ID',
      value: 'employee_id',
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
      label: 'Type',
      value: 'project_type',
      options: opportunityCategories.project_type.map((i: any) => ({
        value: i.name,
        label: i.name,
      })),
    },
    {
      label: 'Savings Type',
      value: 'savings_type',
      options: ['Soft', 'Hard'].map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
      label: 'Estimated Savings',
      value: 'estimated_savings',
      dtype: 'int',
    },

    {
      label: 'Impact Score',
      value: 'project_score',
      dtype: 'int',
    },
    {
      label: 'Problem Impact',
      value: 'project_impact',
      options: ['Low', 'Medium', 'High'].map((i: any) => ({
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
    defaultPerPage: 100,
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
    <Shell className="gap-2 pt-10" variant={'sidebar'}>
      <DataTable table={table} size={'w-full'} pagination={true} isServer refetchFn={refetchFn}>
        <DataTableAdvancedToolbar
          table={table}
          filterFields={filterFields}
          isServer
          refetchFn={refetchFn}
        >
         
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
              setTimeout(() => {
                refetchFn();
              }, 1000);
            }}
            className="h-8"
          />
           <div>
            <Badge variant={'ghost'} className="text-xs h-8 rounded-full font-bold">
              Total Opportunities: {total}
            </Badge>
          </div>
          {(role === 'admin' || role === 'ci_head' || role === 'ci_team') && (
            <>
              <AddOpportunity />
              <ExportOppurtunity />
            </>
          )}
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
