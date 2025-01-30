import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
// import { EditTools } from './edit-tools';
import { TrashIcon } from '@radix-ui/react-icons';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Employee } from '@/schema/employee';
import { EditEmployee } from './edit-employee';

export const employeeColumns = (): ColumnDef<Employee>[] => {
  return [
    {
      accessorKey: 'employee_id',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[100px]">Employee ID</div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[150px]">Name</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[150px]">E-mail</div>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[150px]">Role</div>
      ),
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        return <div className="flex justify-center text-center text-xs  capitalize">{role.replace('_', ' ').toUpperCase()}</div>;
      },
    },
    {
      accessorKey: 'company',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium  w-[100px]">Company</div>
      ),
    },
    {
      accessorKey: 'bussiness_unit',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium  w-[100px]">Division</div>
      ),
    },
    {
      accessorKey: 'plant',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium  w-[100px]">Plant</div>
      ),
    },
    {
      accessorKey: 'department',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium  w-[100px]">Department</div>
      ),
    },
    {
      accessorKey: 'grade',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[100px]" >Grade</div>
      ),
    },
    {
      accessorKey: 'working_location',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[150px]">Working Location</div>
      ),
    },
    {
      accessorKey: 'designation',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium w-[150px]">Designation</div>
      ),
    },
    // {
    //   accessorKey: 'date_of_birth',
    //   header: ({ column }) => (
    //     <div className="flex justify-center text-center text-xs font-medium w-[150px]">Date of Birth</div>
    //   ),
    //   cell: ({ row }) => {
    //     const dateOfBirth = row.getValue('date_of_birth') as { $date: string };
    //     return new Date(dateOfBirth.$date).toDateString();
    //   },
    // },
    // {
    //   accessorKey: 'date_of_joining',
    //   header: ({ column }) => (
    //     <div className="flex justify-center text-center text-xs font-medium w-[150px]">Date of Joining</div>
    //   ),
    //   cell: ({ row }) => {
    //     const dateOfJoining = row.getValue('date_of_joining') as { $date: string };
    //     return new Date(dateOfJoining.$date).toDateString();
    //   },
    // },

    {
      id: 'actions',
      cell: function Cell({ row }) {
        const queryClient = useQueryClient();
        const pathname = usePathname();
        const params = useSearchParams();
        const router = useRouter();
        const deleteEmployee = useMutation({
          mutationKey: ['delete-employee'],
          mutationFn: async () => {
            return await api.delete(`/employee/${row.original._id.$oid}`).then((res) => {
              if (!res.data.success) throw new Error(res.data.message);
              return res.data;
            });
          },
          onError: (error: any) => {
            toast.error(error.response.data.detail.message, {
              icon: <AlertTriangle className="h-4 w-4" />,
            });
          },
          onSuccess: () => {
            toast.success('Employee Deleted successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            queryClient.refetchQueries({
              queryKey: ['get-employee'],
            });
            router.push(`${pathname}?${params.toString()}`);
            router.refresh();
          },
        });
        return (
          <div className="flex justify-center space-x-2 pl-2 w-[200px]">
            <EditEmployee employee={row.original} />
            <Button
              variant="destructive-ghost"
              size={'sm'}
              className="gap-1 text-xs"
              onClick={async () => await deleteEmployee.mutateAsync()}
            >
              {deleteEmployee.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="h-4 w-4" />
              )}{' '}
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
};
