import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import UILayout from '@/components/ui-layout';
import { opportunities, tools } from '@/lib/data';
import React from 'react';
import { EmployeeTable } from './table';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';
import { TotalEmployees } from '@/app/_components/dashboard/user-by-role';
import { CompanyWiseEmployee } from '@/app/_components/account-management/employee-management/company-wise-employees';
export default function Employee() {
  const params = useSearchParams();

  const employee = useQuery({
    queryKey: ['get-employee'],
    queryFn: async (): Promise<any> => {
      const query = `page=${params.get('page') ? Number(params.get('page')) : 1}&page_size=${params.get('per_page') ? Number(params.get('per_page')) : 50}`;
      const expressions: (any | undefined)[] = [
        params.get('name')
          ? (() => {
              const parsed = parseFilterInput(params.get('name') as string);
              return parsed
                ? buildFilter({
                    column: 'name',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('employee_id')
          ? (() => {
              const parsed = parseFilterInput(params.get('employee_id') as string);
              return parsed
                ? buildFilter({
                    column: 'employee_id',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('company')
          ? (() => {
              const parsed = parseFilterInput(params.get('company') as string);
              return parsed
                ? buildFilter({
                    column: 'company',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('bussiness_unit')
          ? (() => {
              const parsed = parseFilterInput(params.get('bussiness_unit') as string);
              return parsed
                ? buildFilter({
                    column: 'bussiness_unit',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('plant')
          ? (() => {
              const parsed = parseFilterInput(params.get('plant') as string);
              return parsed
                ? buildFilter({
                    column: 'plant',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('designation')
          ? (() => {
              const parsed = parseFilterInput(params.get('designation') as string);
              return parsed
                ? buildFilter({
                    column: 'designation',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('department')
          ? (() => {
              const parsed = parseFilterInput(params.get('department') as string);
              return parsed
                ? buildFilter({
                    column: 'department',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('grade')
          ? (() => {
              const parsed = parseFilterInput(params.get('grade') as string);
              return parsed
                ? buildFilter({
                    column: 'grade',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('working_location')
          ? (() => {
              const parsed = parseFilterInput(params.get('working_location') as string);
              return parsed
                ? buildFilter({
                    column: 'working_location',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('role')
          ? (() => {
              const parsed = parseFilterInput(params.get('role') as string);
              return parsed
                ? buildFilter({
                    column: 'role',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
      ].filter(Boolean);

      const filters = [...expressions, { is_active: { $eq: true } }];
      let data: any = {
        filter: [
          {
            $match: filters.reduce((acc, curr) => {
              return { ...acc, ...curr };
            }, {}),
          },
          {
            $sort: params.get('sort')
              ? parseSort(params.get('sort') as string)
              : { created_at: -1 },
          },
        ],
      };

      return await api
        .post(`/employee/query?${query}`, data)
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          return res.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });

  return (
    <React.Suspense
      fallback={
        <DataTableSkeleton
          columnCount={5}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={['10rem', '20rem', '12rem', '12rem', '8rem']}
          shrinkZero
        />
      }
    >
      <div className="py-4">
        <Card className="border-gray-500/20 bg-background">
          <div className="flex justify-between p-4">
            <div className="pt-2 text-base font-semibold">Employees Management</div>
          </div>
          <CardContent className="overflow-y-auto p-4 pt-0">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <div className="pb-8">
                <TotalEmployees isDashboard />
              </div>
              <div className=''>
                <CompanyWiseEmployee />
              </div>
            </div>
            <div className="w-full">
              <EmployeeTable
                data={employee.data ? employee.data.data : []}
                pageCount={employee.data ? (employee.data.total_pages ?? 1) : 1}
                refetch={employee.refetch}
                total={employee.data ? employee.data.total_items : 0}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Suspense>
  );
}
