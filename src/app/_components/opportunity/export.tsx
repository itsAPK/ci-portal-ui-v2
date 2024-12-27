'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertCircle, DownloadIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { parseFilterInput, buildFilter, parseSort } from '@/lib/filter-parser';
import api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import 'jspdf-autotable';
import { exportToExcel, exportToPDF } from '@/lib/utils';
import { toast } from 'sonner';

export const ExportOppurtunity = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { page, per_page, sort } = Object.fromEntries(params.entries());
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
    params.get('plant.name')
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
        })()
      : undefined,
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
    params.get('savings_type')
      ? (() => {
          const parsed = parseFilterInput(params.get('savings_type') as string);
          return parsed
            ? buildFilter({
                column: 'savings_type',
                operator: parsed.operator,
                value: parsed.value,
              })
            : undefined;
        })()
      : undefined,
    params.get('estimated_savings')
      ? (() => {
          const parsed = parseFilterInput(params.get('estimated_savings') as string);
          return parsed
            ? buildFilter({
                column: 'estimated_savings',
                operator: parsed.operator,
                value: parsed.value,
              })
            : undefined;
        })()
      : undefined,
    params.get('opportunity_id')
      ? (() => {
          const parsed = parseFilterInput(params.get('opportunity_id') as string);
          return parsed
            ? buildFilter({
                column: 'opportunity_id',
                operator: parsed.operator,
                value: parsed.value,
              })
            : undefined;
        })()
      : undefined,
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
              date: '$created_at',
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
        $sort: params.get('sort') ? parseSort(params.get('sort') as string) : { created_at: -1 },
      },
    ],
  };
  const response = useMutation({
    mutationKey: ['get-opportunity-export'],
    mutationFn: async (key: string): Promise<any> => {
      return await api
        .post(`/opportunity/export`, { data: data })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          const fetchedData = res.data.data.data;
          console.log(fetchedData);

          if (key === 'sheet') {
            if (fetchedData.length > 0) {
              exportToExcel(
                fetchedData.map((i: any) => {
                  delete i._id;

                  return {
                    opportunity_id: i.opportunity_id,
                    company: i.company,
                    bussiness_unit: i.bussiness_unit,
                    plant: i.plant.name,
                    department: i.department,
                    category: i.category,
                    statement: i.statement,
                    expected_savings: i.expected_savings,
                    project_type: i.project_type,
                    project_nature: i.project_nature,
                    internal_customer_impact: i.internal_customer_impact,
                    external_customer_impact: i.external_customer_impact,
                    data_analysis: i.data_analysis,
                    cross_ratio: i.cross_ratio,
                    baseline: i.baseline,
                    status: i.status,
                    project_score: i.project_score,
                    project_impact: i.project_impact,
                    project_leader_id: i.project_leader ? i.project_leader.employee_id ?? "" : "",
                    project_leader_name: i.project_leader ? i.project_leader.name  ?? "" : "",
                    savings_type: i.savings_type,
                    estimated_savings: i.estimated_savings,
                    opportunity_year: i.opportunity_year,
                  };
                }),
                'opportunities',
              );
            } else {
              toast.error('No Data found', {
                icon: <AlertCircle />,
              });
            }
          } else {
            exportToPDF(
              [
                { header: 'Opportunity ID', dataKey: 'opportunity_id' },
                { header: 'Company', dataKey: 'company' },
                { header: 'Business Unit', dataKey: 'bussiness_unit' },
                { header: 'Plant', dataKey: 'plant' },
                { header: 'Department', dataKey: 'department' },
                { header: 'Category', dataKey: 'category' },
                { header: 'Project Statement', dataKey: 'statement' },
                { header: 'Expected Savings', dataKey: 'expected_savings' },
                { header: 'Project Type', dataKey: 'project_type' },
                { header: 'Project Nature', dataKey: 'project_nature' },
                { header: 'Internal Customer Impact', dataKey: 'internal_customer_impact' },
                { header: 'External Customer Impact', dataKey: 'external_customer_impact' },
                { header: 'Data Analysis', dataKey: 'data_analysis' },
                { header: 'Cross Ratio', dataKey: 'cross_ratio' },
                { header: 'Baseline', dataKey: 'baseline' },
                { header: 'Status', dataKey: 'status' },
                { header: 'Project Score', dataKey: 'project_score' },
                { header: 'Project Impact', dataKey: 'project_impact' },
                { header: 'Project Leader ID', dataKey: 'project_leader_id' },
                { header: 'Project Leader Name', dataKey: 'project_leader_name' },
                { header: 'Savings Type', dataKey: 'savings_type' },
                { header: 'Estimated Savings', dataKey: 'estimated_savings' },
                { header: 'Opportunity Year', dataKey: 'opportunity_year' },
              ],
              fetchedData.map((i: any) => {
                delete i._id;

                return {
                  ...i,
                  opportunity_id: i.opportunity_id,
                  company: i.company,
                  bussiness_unit: i.bussiness_unit,
                  plant: i.plant.name,
                  department: i.department,
                  category: i.category,
                  statement: i.statement,
                  expected_savings: i.expected_savings,
                  project_type: i.project_type,
                  project_nature: i.project_nature,
                  internal_customer_impact: i.internal_customer_impact,
                  external_customer_impact: i.external_customer_impact,
                  data_analysis: i.data_analysis,
                  cross_ratio: i.cross_ratio,
                  baseline: i.baseline,
                  status: i.status,
                  project_score: i.project_score,
                  project_impact: i.project_impact,
                  project_leader_id: i.project_leader? i.project_leader.employee_id ?? "" : "",
                  project_leader_name: i.project_leader? i.project_leader.name  ?? "" : "",
                  savings_type: i.savings_type,
                  estimated_savings: i.estimated_savings,
                  opportunity_year: i.opportunity_year,
                };
              }),
              'opportunities',
            );
          }
          return fetchedData;
        })
        .catch((err) => {
          throw err;
        });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 size-4 shrink-0" aria-hidden="true" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              response.mutateAsync('sheet');
            }}
          >
            <div>Export as Excel</div>
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => {
              response.mutateAsync('pdf');
            }}
          >
            <div>Export as PDF</div>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
