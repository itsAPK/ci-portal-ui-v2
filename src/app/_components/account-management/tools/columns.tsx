import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { EditTools } from './edit-tools';
import { TrashIcon } from '@radix-ui/react-icons';
import api from '@/lib/api';
import { ToolsSchema } from '@/schema/tools';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle,Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
export const toolsColumns = (): ColumnDef<any>[] => {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Tools</div>
      ),
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Category</div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <div className="flex justify-center text-center text-xs font-medium">Status</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center text-center text-xs font-medium">
          {row.getValue('status') ? (
            <Badge variant="ghost" className="text-xs">
              Active
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Inactive
            </Badge>
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
        const deleteTool = useMutation({
          mutationKey: ['delete-tools'],
          mutationFn: async () => {
            return await api.delete(`/tools/${row.original._id.$oid}`).then((res) => {
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
            toast.success('Tool Deleted successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            queryClient.refetchQueries({
              queryKey: ['get-tools'],
            });
            router.push(`${pathname}?${params.toString()}`);
            router.refresh();
          },
        });
        return (
          <div className="flex justify-center space-x-2 pl-2">
            <EditTools tools={row.original} />
            <Button
              variant="destructive-ghost"
              size={'sm'}
              className="text-xs gap-1"
              onClick={async () => await deleteTool.mutateAsync()}
            >
              {deleteTool.isPending ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <TrashIcon className="h-4 w-4" />
              )} Delete
            </Button>
          </div>
        );
      },
    },
  ];
};
