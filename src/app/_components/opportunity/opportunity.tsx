
import { ContentLayout } from '@/components/content-layout';
import { DataTableSkeleton } from '@/components/data-table/skeleton';
import UILayout from '@/components/ui-layout';
import { opportunities, tools } from '@/lib/data';
import React from 'react';
import {  OpportunityTable } from './table';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';

export default function Opportunities() {
  const params = useSearchParams();

  const opportunities = useQuery({
    queryKey: ['get-opportunities'],
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
        params.get('project_type')
          ? (() => {
              const parsed = parseFilterInput(params.get('project_type') as string);
              return parsed
                ? buildFilter({
                    column: 'project_type',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
         params.get('project_score')
          ? (() => {
              const parsed = parseFilterInput(params.get('project_score') as string);
              return parsed
                ? buildFilter({
                    column: 'project_score',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined,
          params.get('project_impact')
          ? (() => {
              const parsed = parseFilterInput(params.get('project_impact') as string);
              return parsed
                ? buildFilter({
                    column: 'project_impact',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })(): undefined,
        params.get('employee_id')
          ? (() => {
              const parsed = parseFilterInput(params.get('employee_id') as string);
              return parsed
                ? buildFilter({
                    column: 'project_leader.employee_id',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })(): undefined,
        params.get("status")
          ? (() => {
              const parsed = parseFilterInput(params.get("status") as string);
              return parsed
                ? buildFilter({
                    column: "status",
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })(): undefined,
        params.get("savings_type")
          ? (() => {
              const parsed = parseFilterInput(params.get("savings_type") as string);
              return parsed
                ? buildFilter({
                    column: "savings_type",
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })(): undefined,
        params.get("estimated_savings")
          ? (() => {
              const parsed = parseFilterInput(params.get("estimated_savings") as string);
              return parsed
                ? buildFilter({
                    column: "estimated_savings",
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })(): undefined,
        params.get('opportunity_id') ? (() => {
              const parsed = parseFilterInput(params.get('opportunity_id') as string);
              return parsed
                ? buildFilter({
                    column: 'opportunity_id',
                    operator: parsed.operator,
                    value: parsed.value,
                  })
                : undefined;
            })()
          : undefined
        
      
        
      ].filter(Boolean);

      const filters = [...expressions];
      if (params.get('from') && params.get('to')) {
        filters.push({
          formatted_date: {
            $gte: new Date(params.get('from') as string),
            $lte: new Date(params.get('to') as string),
          },
        });
      }
      let data: any = {
        filter: [
            {
                $addFields: {
                  formatted_date: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: "$created_at",
                    },
                  },
                },
              },
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
        .post(`/opportunity/query?${query}`, data)
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
  
      <div className="py-4">
        <Card className="border-gray-500/20 bg-background">
          <div className="flex justify-between p-4">
            <div className="pt-2 text-base font-semibold">Opportunities</div>
          </div>
          <CardContent className="overflow-y-auto p-4 pt-0">
            <div className="w-full">
              <OpportunityTable
                data={opportunities.data ? opportunities.data.data : []}
                pageCount={opportunities.data ? (opportunities.data.total_pages ?? 1) : 1}
                refetchFn={opportunities.refetch}
              
              />
            </div>
          </CardContent>
        </Card>
      </div>
   
  );
}
