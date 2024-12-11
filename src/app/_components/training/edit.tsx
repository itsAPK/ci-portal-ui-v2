import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiAddCircleFill, RiEditFill } from '@remixicon/react';
import { TrainingForm } from './training-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Training, TrainingSchema } from '@/schema/training';
export const EditTraining = ({ training }: { training: Training }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const updateTraining = useMutation({
    mutationKey: ['update-training'],
    mutationFn: async (data: TrainingSchema) => {
      return await api.patch(`/training/${training._id.$oid}`, { ...data }).then((res) => {
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
      toast.success('Certified Belt updated successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-training'],
      });

      setOpen(false);
    },
  });

  const handleSubmit = async (data: TrainingSchema) => {
    await updateTraining.mutateAsync(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="edit" size={'sm'} className="text-xs">
          <RiEditFill className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90%] max-w-[925px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Certified Belts</DialogTitle>
        </DialogHeader>
        <TrainingForm onSubmit={handleSubmit} defaultValues={training} mode ='update' />
      </DialogContent>
    </Dialog>
  );
};
