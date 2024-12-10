import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { RiUserUnfollowFill, RiUserFollowFill } from '@remixicon/react';
import { Loader2 } from 'lucide-react';
import { usePathname, useSearchParams ,useRouter} from 'next/navigation';
import { Badge } from '@/components/ui/badge';
export const requestPlantColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: 'employee.employee_id',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Employee ID</div>
      ),
    },
    {
      accessorKey: 'employee.name',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Employee Name</div>
      ),
    },
    {
      accessorKey: 'current_plant.name',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">
          Current Plant/Division
        </div>
      ),
    },
    {
      accessorKey: 'requested_plant.name',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">
          New Plant/Division
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Status</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center text-center text-xs font-medium">
          {row.getValue('status') === 'pending' ? (
            <Badge variant="ghost" className="text-xs">
              Pending
            </Badge>
          ) : (
            row.getValue('status') === 'approved' ? (
              <Badge variant="success" className="text-xs">
                Approved
              </Badge>
            ) : (
            <Badge variant="destructive" className="text-xs">
              Rejected
            </Badge>)
          )}
        </div>
      ),
    },

    {
      id: 'actions',
      cell: function Cell({ row }) {
        const queryClient = useQueryClient();
        const pathname = usePathname();
        const params = useSearchParams();
        const router = useRouter();
        const approve = useMutation({
          mutationFn: async () => {
            const data = await api.get(`/employee/plant-change/approve/${row.original._id.$oid}`);
            if (!data.data.success) {
              throw new Error(data.data.message);
            }
            return data.data.data;
          },
          onSuccess: () => {
            toast.success('Plant change approved successfully');
            queryClient.refetchQueries({
              queryKey: ['get-plant-change'],
            });
            router.push(`${pathname}?${params.toString()}`);
            router.refresh();
          
          },
          onError: (err: any) => {
            toast.error(err.response.data.message);
          },
        });

        const reject = useMutation({
          mutationFn: async () => {
            const data = await api.get(`/employee/plant-change/reject/${row.original._id.$oid}`);
            if (!data.data.success) {
              throw new Error(data.data.message);
            }
            return data.data.data;
          },
          onSuccess: () => {
            toast.success('Plant change rejected successfully');
            queryClient.refetchQueries({
              queryKey: ['get-plant-change'],
            });
            router.push(`${pathname}?${params.toString()}`);
            router.refresh();
          
          },
          onError: (err: any) => {
            toast.error(err.response.data.message);
          },
        });
        return (
          <div className="flex justify-center space-x-2 pl-2">
            <Button
              variant="edit"
              size={'sm'}
              className="gap-2 text-xs"
              disabled={row.getValue('status') !== 'pending'}
              onClick={async () => await approve.mutateAsync()}
            >
              {approve.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RiUserFollowFill className="h-4 w-4" />
              )}{' '}
              Approve
            </Button>
            <Button
              variant="destructive-ghost"
              size={'sm'}
              className="gap-2 text-xs"
              disabled={row.getValue('status') !== 'pending'}
              onClick={async () => await reject.mutateAsync()}
            >
              {reject.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RiUserUnfollowFill className="h-4 w-4" />
              )}{' '}
              Reject
            </Button>
          </div>
        );
      },
    },
  ];
};
