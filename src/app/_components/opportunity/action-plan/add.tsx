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
import { ActionPlanSchema } from '@/schema/opportunity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ActionPlanForm } from './form';

export const AddActionPlan = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const addActionPlan = useMutation({
    mutationKey: ['add-action-plan'],
    mutationFn: async (data: ActionPlanSchema) => {
      return await api.post(`/opportunity/action-plan/${opportunities._id.$oid}`, { ...data }).then((res) => {
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
      toast.success('Action Plan added successfully', {
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
        <Button size={'sm'}>
          <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Action Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl  max-w-[805px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Action Plant</DialogTitle>
        </DialogHeader>
        <ActionPlanForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
