import api from '@/lib/api';
import { RiDeleteBin6Fill } from '@remixicon/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const DeleteCompany = ({ companyId }: { companyId: string }) => {
  const queryClient = useQueryClient();
  const deleteCompany = useMutation({
    mutationKey: ['delete-company'],
    mutationFn: async () => {
      return await api
        .delete(`/company/${companyId}`)
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
        queryKey: ['get-company'],
      });

      toast.success('Company deleted successfully');
    },
  });
  return (
    <Button
      size="xs"
      variant="destructive-ghost"
      className="w-[80px] gap-1"
      onClick={() => deleteCompany.mutate()}
    >
      {deleteCompany.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <RiDeleteBin6Fill className="h-3 w-3" />
      )}
      Delete
    </Button>
  );
};
