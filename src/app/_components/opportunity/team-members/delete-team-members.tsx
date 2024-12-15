import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle, TrashIcon } from "lucide-react";
import { toast } from "sonner";

export const DeleteTeamMembers = ({teamMemberId} : {teamMemberId : string}) => {
const queryClient = useQueryClient();
const deleteTeamMember = useMutation({
  mutationKey: ['delete-team-member'],
  mutationFn: async () => {
    return await api.delete(`/opportunity/team-member/${teamMemberId}`).then((res) => {
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
    toast.success('Team Member deleted successfully', {
      icon: <CheckCircle className="h-4 w-4" />,
    });
    queryClient.refetchQueries({
      queryKey: ['get-opportunities'],
      });
  },
});
  return <Button
  variant="ghost-1"
  size={'sm'}
  onClick={async () => deleteTeamMember.mutateAsync()}
  className="flex h-6 gap-2 border-red-500 bg-red-500/40 hover:bg-red-500/60"
>
  
        <TrashIcon className="h-3 w-3" />
      Delete
  
</Button>
};