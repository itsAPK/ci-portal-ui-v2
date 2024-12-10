import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import UILayout from '@/components/ui-layout';
import { opportunities, tools , requestPlant} from '@/lib/data';
import React from 'react';
import { RequestPlantTable } from './table';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';
import { useQuery } from '@tanstack/react-query';

export default function RequestPlant() {
  const params = useSearchParams();

  const requestPlant = useQuery({
    queryKey: ['get-plant-change'],
    queryFn: async (): Promise<any> => {
      const query = `page=${params.get('page') ? Number(params.get('page')) : 1}&page_size=${params.get('page_size') ? Number(params.get('page_size')) : 50}`;
      const expressions: (any | undefined)[] = [
        params.get('employee_name')
          ? (() => {
              const parsed = parseFilterInput(params.get('employee_name') as string);
              return parsed
                ? buildFilter({
                    column: 'employee.name',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('employee_name')
          ? (() => {
              const parsed = parseFilterInput(params.get('employee_name') as string);
              return parsed
                ?   buildFilter({
                  column: 'employee.name',
                  operator: parsed.operator,
                  value: parsed.value,
                })
                : undefined;
            })()
          : undefined,
        params.get('current_plant')
          ? (() => {
              const parsed = parseFilterInput(params.get('current_plant') as string);
              return parsed
                ? buildFilter({
                    column: 'current_plant.name',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
          params.get('requested_plant')
          ? (() => {
              const parsed = parseFilterInput(params.get('requested_plant') as string);
              return parsed
                ? buildFilter({
                    column: 'requested_plant.name',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
          params.get('status')
          ? (() => {
              const parsed = parseFilterInput(params.get('status') as string);
              return parsed
                ? buildFilter({
                    column: 'status',
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
        .post(`/employee/plant-change/query?${query}`, data)
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

  console.log(requestPlant.data);
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
            <div className="pt-2 text-base font-semibold">Request Plant/Division Change</div>
          </div>
          <CardContent className="overflow-y-auto p-4 pt-0">
            <div className="w-full">
              <RequestPlantTable refetchFn={requestPlant.refetch} data={requestPlant.data ? requestPlant.data.data : []} pageCount={requestPlant.data ? requestPlant.data.page_count : 1} />
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Suspense>
  );
}
