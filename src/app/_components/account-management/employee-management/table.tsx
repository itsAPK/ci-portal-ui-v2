'use client';
import { useDataTable } from '@/hooks/use-data-table';
import { employeeColumns } from './columns';
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { Shell } from '@/components/ui/shell';
import { DataTableFilterField } from '@/types';
import { DataTableAdvancedToolbar } from '@/components/data-table/toolbar';
// import { AddTools } from './add-tools';
import { getCookie } from 'cookies-next';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Employee } from '@/schema/employee';
import { AddEmployee } from './add-employee';
import { ExportEmployee } from './export';
import { FileUploadDialog } from '@/components/file-upload-dialog';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { DeleteButton } from '@/components/delete-all-button';
import { Badge } from '@/components/ui/badge';

export const EmployeeTable = ({
  data,
  pageCount,
  refetch,
  total
}: {
  data: Employee[];
  pageCount: number;
  total : number;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const filterFields: DataTableFilterField<Employee>[] = [
    {
      value: 'name',
      label: 'Employee Name',
    },
    {
      value: 'employee_id',
      label: 'Employee ID',
    },
    {
      value: 'role',
      label: 'Role',
      options: ['Admin', 'Employee', 'Project Leader', 'HOD', 'LOF', 'CI Head', 'CI Team'].map(
        (i: any) => ({
          value: i.replace(' ', '_').toLowerCase(),
          label: i,
        }),
      ),
    },
    {
      value: 'company',
      label: 'Company',
    },
    {
      value: 'bussiness_unit',
      label: 'Division',
    },
    {
      value: 'plant',
      label: 'Plant',
    },
    {
      value: 'designation',
      label: 'Designation',
    },
    {
      value: 'department',
      label: 'Department',
    },
    {
      value: 'grade',
      label: 'Grade',
    },
    {
      value: 'working_location',
      label: 'Working Location',
    },
  ];
  const columns = React.useMemo(() => employeeColumns(), []);
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: true,
    defaultPerPage: 100,
  });

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const role = getCookie('ci-portal.role');

  const upload = useMutation({
    mutationKey: ['upload-employee'],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/employee/upload', formData, {
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
      toast.success('Upload is in progress. It will take sometime', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-employee'],
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
    router.push(`${process.env.NEXT_PUBLIC_EMPLOYEE_TEMPLATE_URL}`);
  };

  const onDeleteSuccess = () => {
    toast.success('Employees deleted successfully');
  };

  return (
    <Shell className="w-full gap-2">
      <DataTable table={table} pagination={true} isServer refetchFn={refetch}>
        <DataTableAdvancedToolbar
          table={table}
          filterFields={filterFields}
          isServer
          refetchFn={refetch}
        >
          {role === 'admin' && (
            <>
              <FileUploadDialog
                onUpload={onUpload}
                onDownloadSample={onDownloadSample}
                triggerButtonText="Upload"
                dialogTitle="Upload Employee"
                allowedFileTypes="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <AddEmployee />
              <DeleteButton
                title="Delete Employees"
                deleteUrl="/employee/erase-all"
                onDeleteSuccess={onDeleteSuccess}
              />
            </>
          )}
          {role && ['admin', 'ci_head', 'ci_team', 'hod', 'lof'].includes(role.toString()) && (
            <ExportEmployee />
          )}
          <Badge variant={'ghost'} className="text-xs h-8 rounded-full font-bold">  
            Total Employees: {total}
          </Badge>
        </DataTableAdvancedToolbar>
      </DataTable>
    </Shell>
  );
};
