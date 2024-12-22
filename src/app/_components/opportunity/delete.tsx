import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { RiDeleteBin6Fill } from '@remixicon/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export const DeleteOpportunity = ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
  const deleteOpportunity = useMutation({
    mutationKey: ['delete-opportunity'],
    mutationFn: async () => {
      return await api
        .delete(`/opportunity/${id}`)
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
      toast.success('Opportunity deleted successfully');
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });
  return (
    <Button variant="link" size={'sm'} className="flex gap-2" onClick={() => deleteOpportunity.mutate()}>
      {deleteOpportunity.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <RiDeleteBin6Fill className="h-4 w-4 " /> 
      )} <span className='-mt-[1px] '>Delete</span>
    </Button>
  );
};
