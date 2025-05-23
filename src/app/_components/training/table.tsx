'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { trainingColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';

import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';

import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { CalendarDatePicker } from '@/components/calender-date-picker';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, DownloadIcon, UploadIcon } from 'lucide-react';
import {
  RefetchOptions,
  QueryObserverResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
// import { AddOpportunity } from './add';
import { AddTraining } from './add';
import { categories } from '@/lib/data';
import { ExportTraining } from './export';
import api from '@/lib/api';
import { toast } from 'sonner';
import { FileUploadDialog } from '@/components/file-upload-dialog';
import { getCookie } from 'cookies-next';
import { DeleteButton } from '@/components/delete-all-button';
import { Badge } from '@/components/ui/badge';
export const TrainingTable = ({
  data,
  pageCount,
  refetchFn,
  total
}: {
  data: any[];
  total : number;
  pageCount: number;
  refetchFn: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const filterFields: DataTableFilterField<any>[] = [
    {
      label: 'Employee ID',
      value: 'employee_id',
    },
    {
      label: 'Employee Name',
      value: 'employee_name',
    },
    {
      label: 'Department',
      value: 'department',
    },

    {
      label: 'Category',
      value: 'category',
      options: ['Black Belt', 'Green Belt'].map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
      label: 'Division',
      value: 'bussiness_unit',
    },
    {
      label: 'Plant',
      value: 'plant',
    },
    {
      label: 'Company',
      value: 'company',
    },
    {
      label: 'Department',
      value: 'department',
    },
    {
      label: 'Grade',
      value: 'grade',
    },
    {
      label: 'Working Location',
      value: 'working_location',
    },
    {
      label: 'Batch',
      value: 'batch',
      options: Array.from({ length: 20 }, (_, i) => `${new Date().getFullYear() - i}}`).map(
        (i: any) => ({
          value: i,
          label: i,
        }),
      ),
    },
    {
      label: 'Year',
      value: 'year',
      options: Array.from(
        { length: 20 },
        (_, i) => `${new Date().getFullYear() - i}-${new Date().getFullYear() - i + 1}`,
      ).map((i: any) => ({
        value: i,
        label: i,
      })),
    },
    {
      label: 'Trainer',
      value: 'trainer',
    },
  ];
  const columns = React.useMemo(() => trainingColumns(), []);
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

  const queryClient = useQueryClient();
  const params = useSearchParams();
  const role : any = getCookie('ci-portal.role');
  const upload = useMutation({
    mutationKey: ['upload-employee'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/training/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onError: (error: any) => {
      toast.error(error.response.data.detail.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Uploading', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-training'],
      });
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();
    },
  });

  const onUpload = async (file: File) => {
    const { data } = await upload.mutateAsync(file);
    console.log(data);
  };

  const onDownloadSample = () => {
    router.push(`${process.env.NEXT_PUBLIC_TRAINING_TEMPLATE_URL}`);
  };

  const onDeleteSuccess = () => {
    toast.success('All trainings deleted successfully');
    refetchFn();
  };

  return (
    <Shell className="w-full gap-2">
      <DataTable table={table} size={'140%'} pagination={true} isServer refetchFn={refetchFn}>
        <DataTableAdvancedToolbar
          table={table}
          filterFields={filterFields}
          isServer
          refetchFn={refetchFn}
        >
          {role === 'admin' && (
            <>
              <AddTraining />
              <FileUploadDialog
                onUpload={onUpload}
                onDownloadSample={onDownloadSample}
                triggerButtonText="Upload Certified Belts"
                dialogTitle="Upload Certified Belts"
                allowedFileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <DeleteButton title="Delete Certified Belts" deleteUrl="/training/erase-all" onDeleteSuccess={onDeleteSuccess} />
            </>
          )}
          <div>
            <Badge variant={'ghost'} className="text-xs h-8 rounded-full font-bold">
              Total Certified Belts: {total}
            </Badge>
          </div>
          {
            ['admin', 'ci_team', 'ci_head','hod','lof'].includes(role) && <ExportTraining />
          }

        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
