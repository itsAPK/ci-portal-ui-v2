import { Button } from "@/components/ui/button";
import { TooltipProvider, TooltipTrigger, TooltipContent,Tooltip } from "@/components/ui/tooltip";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import {toast} from "sonner";
import { RiDeleteBin2Fill } from "@remixicon/react";

export const DeleteActionPlan = ({actionPlanId} : {actionPlanId : string}) => {
   const queryClient = useQueryClient();
    const deleteActionPlant = useMutation({
      mutationKey: ['delete-action-plan'],
      mutationFn: async () => {
        return await api.delete(`/opportunity/action-plan/${actionPlanId}`).then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });
      },
      onError: (error: any) => {
        toast.error(error.response.data.detail.message, {
          icon: <RiDeleteBin2Fill className="h-4 w-4" />,
        });
      },
      onSuccess: () => {
        toast.success('Action Plan deleted successfully', {
          icon: <RiDeleteBin2Fill className="h-4 w-4" />,
        });
         queryClient.refetchQueries({
          queryKey: ['get-opportunities'],
        });
      },
    });
    return (
    <Button
    variant="ghost-1"
    size={'sm'}
    onClick={async () => deleteActionPlant.mutateAsync()}
    className="flex h-6 gap-2 border-red-500 bg-red-500/40 hover:bg-red-500/60"
  >
    <TooltipProvider >
      <Tooltip  >
        <TooltipTrigger asChild>
          <RiDeleteBin2Fill className="h-3 w-3" />
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </Button>
  );
};