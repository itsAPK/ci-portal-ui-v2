'use client';
import React from 'react';
import { ArchiveTable } from './/table';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';
import { CumulativeArchives } from './cumulative/cumulative';
import { TotalCumulative } from './cumulative/total-cumulative';
export function Archive() {
  const params = useSearchParams();

  const archive = useQuery({
    queryKey: ['get-archive'],
    queryFn: async (): Promise<any> => {
      const query = `page=${params.get('page') ? Number(params.get('page')) : 1}&page_size=${params.get('per_page') ? Number(params.get('per_page')) : 50}`;
      const expressions: (any | undefined)[] = [
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
        params.get('project_title')
          ? (() => {
              const parsed = parseFilterInput(params.get('project_title') as string);
              return parsed
                ? buildFilter({
                    column: 'project_title',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('baseline')
          ? (() => {
              const parsed = parseFilterInput(params.get('baseline') as string);
              return parsed
                ? buildFilter({
                    column: 'baseline',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
        params.get('target')
          ? (() => {
              const parsed = parseFilterInput(params.get('target') as string);
              return parsed
                ? buildFilter({ column: 'target', operator: parsed.operator, value: parsed.value })
                : undefined;
            })()
          : undefined,
        params.get('result')
          ? (() => {
              const parsed = parseFilterInput(params.get('result') as string);
              return parsed
                ? buildFilter({ column: 'result', operator: parsed.operator, value: parsed.value })
                : undefined;
            })()
          : undefined,
        params.get('project_leader')
          ? (() => {
              const parsed = parseFilterInput(params.get('project_leader') as string);
              return parsed
                ? buildFilter({
                    column: 'project_leader.name',
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
                ? buildFilter({ column: 'plant', operator: parsed.operator, value: parsed.value })
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
        .post(`/archive/query?${query}`, data)
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
    <>
    <div className="flex justify-between items-center"> <div className="p-3 text-xl font-semibold text-gray-800 dark:text-white">Archive</div>
    <CumulativeArchives/>
    </div> 
    <TotalCumulative/>
      <ArchiveTable
        refetchFn={archive.refetch}
        data={archive.data ? archive.data.data : []}
        pageCount={archive.data ? (archive.data.total_pages ?? 1) : 1}
      />
    </>
  );
}
