import api from '@/lib/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { AlertTriangle, Loader2, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

export const SelfAssignOpportunity = ({ opportunityId }: { opportunityId: string }) => {
  const queryClient = useQueryClient();
  const userId = getCookie('ci-portal.user_id');
  const assignProjectLeader = useMutation({
    mutationKey: ['assign-project-leader'],
    mutationFn: async () => {
      return await api
        .post(`/opportunity/assign-project-leader`, {
          opportunity_id: opportunityId,
          employee_id: userId,
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
      toast.success('Project Leader Assigned successfully');
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });
  return (
    <div className="flex gap-2" onClick={async () => await assignProjectLeader.mutateAsync()}>
      {assignProjectLeader.isPending ? (
        <Loader2 className="h-3 w-3" />
      ) : (
        <UserCheck className="h-4 w-4" />
      )}
      <span className="text-xs">Self Assign</span>
    </div>
  );
};
