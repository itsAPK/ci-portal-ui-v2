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

export const ExportEmployee = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { page, per_page, sort } = Object.fromEntries(params.entries());

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
  ].filter(Boolean);

  const filters = [...expressions, { is_active: { $eq: true } }];

  let data: any = {
    query: [
      {
        $match: filters.reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {}),
      },
      { $sort: parseSort(sort as string) },
    ],
  };

  const response = useMutation({
    mutationKey: ['get-employee-export'],
    mutationFn: async (key: string): Promise<any> => {
      return await api
        .post(`/employee/export`, { data: data })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          const fetchedData = res.data.data.data;

          if (key === 'sheet') {
            if (fetchedData.length > 0) {
              exportToExcel(
                fetchedData.map((i: any) => {
                  delete i.password;
                  delete i._id;

                  return {
                    ...i,
                    date_of_birth: i.date_of_birth.$date,
                    date_of_joining: i.date_of_joining.$date,
                  };
                }),
                'employee',
              );
            } else {
              toast.error('No Data found', {
                icon: <AlertCircle />,
              });
            }
          } else {
            exportToPDF(
              [
                { header: 'Employee Name', dataKey: 'name' },
                { header: 'Employee ID', dataKey: 'employee_id' },
                { header: 'Business Unit', dataKey: 'bussiness_unit' },
                { header: 'Plant', dataKey: 'plant' },
                { header: 'Designation', dataKey: 'designation' },
                { header: 'Department', dataKey: 'department' },
                { header: 'Grade', dataKey: 'grade' },
                { header: 'Working Location', dataKey: 'working_location' },
                { header: 'Date of Joining', dataKey: 'date_of_joining' },
                { header: 'Date of Birth', dataKey: 'date_of_birth' },
                { header: 'Email', dataKey: 'email' },
              ],
              fetchedData.map((i: any) => {
                delete i.password;
                delete i._id;

                return {
                  ...i,
                  date_of_birth: i.date_of_birth.$date,
                  date_of_joining: i.date_of_joining.$date,
                };
              }),
              'employees',
            );
          }
          return fetchedData;
        })
        .catch((err) => {
          console.log(err.response.data.data);
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              response.mutateAsync('pdf');
            }}
          >
            <div>Export as PDF</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
