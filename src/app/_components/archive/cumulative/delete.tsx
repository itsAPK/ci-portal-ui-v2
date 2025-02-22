import api from '@/lib/api';
import { RiDeleteBin6Fill } from '@remixicon/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const DeleteCumulativeArchive = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const deleteCumulative = useMutation({
    mutationKey: ['delete-cumulative-archive'],
    mutationFn: async () => {
      return await api
        .delete(`/archive/cumulative/${id}`)
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
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ['total-cumulative'],
      });

      toast.success('Cumulative Data deleted successfully');
    },
  });
  return (
    <Button
      size="xs"
      variant="destructive-ghost"
      className="w-[80px] gap-1"
      onClick={() => deleteCumulative.mutate()}
    >
      {deleteCumulative.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <RiDeleteBin6Fill className="h-3 w-3" />
      )}
      Delete
    </Button>
  );
};
