import api from '@/lib/api';
import { RiDeleteBin6Fill } from '@remixicon/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const DeleteBussinessUnit = ({ bussinessUnitId }: { bussinessUnitId: string }) => {
  const queryClient = useQueryClient();
  const deleteBussinessUnit = useMutation({
    mutationKey: ['delete-bussiness-unit'],
    mutationFn: async () => {
      return await api
        .delete(`/bussiness-unit/${bussinessUnitId}`)
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
        queryKey: ['get-bussiness-unit'],
      });

      toast.success('Bussiness Unit deleted successfully');
    },
  });
  return (
    <Button
      size="xs"
      variant="destructive"
      className="w-[80px] gap-1"
      onClick={() => deleteBussinessUnit.mutate()}
    >
      {deleteBussinessUnit.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <RiDeleteBin6Fill className="h-3 w-3" />
      )}
      Delete
    </Button>
  );
};
