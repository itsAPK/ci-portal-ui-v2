import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import UILayout from '@/components/ui-layout';
import { opportunities, tools } from '@/lib/data';
import React from 'react';
import { TrainingTable } from './table';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';

export function Training() {
  const params = useSearchParams();

  const training = useQuery({
    queryKey: ['get-training'],
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
        params.get('category')
          ? (() => {
              const parsed = parseFilterInput(params.get('category') as string);
              return parsed
                ? buildFilter({
                    column: 'category',
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
        params.get('batch')
          ? (() => {
              const parsed = parseFilterInput(params.get('batch') as string);
              return parsed
                ? buildFilter({
                    column: 'batch',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
          params.get('year')
          ? (() => {
              const parsed = parseFilterInput(params.get('year') as string);
              return parsed
                ? buildFilter({
                    column: 'year',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('trainer')
          ? (() => {
              const parsed = parseFilterInput(params.get('trainer') as string);
              return parsed
                ? buildFilter({
                    column: 'trainer',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
      ].filter(Boolean);

      const filters = [...expressions];
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
        .post(`/training/query?${query}`, data)
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
   
      <div className="">
         
         
            <div className="w-full">
              <TrainingTable
                data={training.data ? training.data.data : []}
                pageCount={training.data ? (training.data.total_pages ?? 1) : 1}
                refetchFn={training.refetch}
                total={training.data ? training.data.total_items : 0}
              />
            </div>
        
      </div>
  
  );
}
