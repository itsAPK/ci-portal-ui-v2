import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { RiDeleteBin6Fill } from '@remixicon/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export const DeleteTraining = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
  const deleteTraining = useMutation({
    mutationKey: ['delete-training'],
    mutationFn: async () => {
      return await api
        .delete(`/training/${id}`)
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
      toast.success('Certified Belt deleted successfully');
      queryClient.refetchQueries({
        queryKey: ['get-training'],
      });
    },
  });
  return (
    <Button variant="destructive-ghost" size={'sm'} className="gap-2 text-xs" onClick={() => deleteTraining.mutate()}>
      {deleteTraining.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <RiDeleteBin6Fill className="h-3 w-3" /> 
      )}Delete
    </Button>
  );
};
