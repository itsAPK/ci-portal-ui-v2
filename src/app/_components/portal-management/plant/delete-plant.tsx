import api from '@/lib/api';
import { RiDeleteBin6Fill } from '@remixicon/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const DeletePlant = ({ plantId }: { plantId: string }) => {
  const queryClient = useQueryClient();
  const deletePlant = useMutation({
    mutationKey: ['delete-plant'],
    mutationFn: async () => {
      return await api
        .delete(`/plant/${plantId}`)
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
        queryKey: ['get-plant'],
      });

      toast.success('Plant deleted successfully');
    },
  });
  return (
    <Button
      size="xs"
      variant="destructive-ghost"
      className="w-[80px] gap-1"
      onClick={() => deletePlant.mutate()}
    >
      {deletePlant.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <RiDeleteBin6Fill className="h-3 w-3" />
      )}
      Delete
    </Button>
  );
};
