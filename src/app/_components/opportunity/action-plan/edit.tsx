import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RiAddCircleFill } from '@remixicon/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { opportunities } from '../../../../lib/data';
import api from '@/lib/api';
import { ActionPlan, ActionPlanSchema } from '@/schema/opportunity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, PencilIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ActionPlanForm } from './form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { processValues } from '@/lib/utils';

export const EditActionPlan = ({ actionPlan }: { actionPlan: ActionPlan }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const addActionPlan = useMutation({
    mutationKey: ['add-action-plan'],
    mutationFn: async (data: ActionPlanSchema) => {
        console.log(data);
      return await api
        .patch(`/opportunity/action-plan/${actionPlan._id.$oid}`, { ...data })
        .then((res) => {
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
      setOpen(false);
      toast.success('Action Plan updated successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  const handleSubmit = async (data: ActionPlanSchema) => {
    await addActionPlan.mutateAsync(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost-1" className="flex h-6 gap-2" size={'sm'}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PencilIcon className="h-3 w-3" />
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-w-[805px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Action Plant</DialogTitle>
        </DialogHeader>
        <ActionPlanForm
          onSubmit={handleSubmit}
          defaultValues={processValues({
            ...actionPlan,
            target_date : actionPlan.target_date.$date 
          })}
          mode="update"
        />
      </DialogContent>
    </Dialog>
  );
};
