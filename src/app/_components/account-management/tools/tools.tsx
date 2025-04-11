import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import UILayout from '@/components/ui-layout';
import { opportunities, tools } from '@/lib/data';
import React from 'react';
import { ToolsTable } from './table';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';

export default function Tools() {
  const params = useSearchParams();

  const tools = useQuery({
    queryKey: ['get-tools'],
    queryFn: async (): Promise<any> => {
      const query = `page=${params.get('page') ? Number(params.get('page')) : 1}&page_size=${params.get('page_size') ? Number(params.get('page_size')) : 50}`;
      const expressions: (any | undefined)[] = [
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
        params.get('status')
          ? (() => {
              const parsed = parseFilterInput(params.get('status') as string);
              return parsed
                ? ({'status': {'$eq': parsed.value === 'Active' ? true : false}})
                : undefined;
            })()
          : undefined,
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
        .post(`/tools/query?${query}`, data)
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
            <div className="pt-2 text-base font-semibold">Tools</div>
          </div>
          <CardContent className="overflow-y-auto p-4 pt-0">
            <div className="w-full">
              <ToolsTable
                data={tools.data ? tools.data.data : []}
                pageCount={tools.data ? (tools.data.total_pages ?? 1) : 1}
                refetch={tools.refetch}
                total={tools.data ? tools.data.total_items : 0}

              />
            </div>
          </CardContent>
        </Card>
      </div>
    </React.Suspense>
  );
}
