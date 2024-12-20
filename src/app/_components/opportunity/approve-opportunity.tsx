import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCheckIcon,Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const ApproveOpportunity = ({ opportunity, role }: { opportunity: any; role: string }) => {
  const queryClient = useQueryClient();
  const approveOpportunity = useMutation({
    mutationKey: ['approve-opportunity'],
    mutationFn: async () => {
      return await api
        .get(`/opportunity/approve/${opportunity._id.$oid}`, {
          params: {
            role: role,
          },
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Opportunity Approved successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  return(
    <div className="flex gap-2" onClick={async () => await approveOpportunity.mutateAsync()}>
      {approveOpportunity.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheckIcon className="h-4 w-4" />}
          <span className="-mt-[1px]">Approve Opportunity</span>
        </div>
  )
};
