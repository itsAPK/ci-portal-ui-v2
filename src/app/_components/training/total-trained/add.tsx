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
  import { RiAddCircleFill } from '@remixicon/react';
  import { CumulativeTrainingForm } from './form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { CumulativeTrainingSchema } from '@/schema/training';
  export const AddCumulativeTraining = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const addTraining = useMutation({
      mutationKey: ['add-training'],
      mutationFn: async (data: CumulativeTrainingSchema) => {
        return await api.post('/training/cumulative', { ...data }).then((res) => {
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
        toast.success('Trained Certified Belt Count added successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['total-training-tarined'],
          
        });

        queryClient.refetchQueries({
          queryKey: ['total-training'],
          
        });
        
  
        setOpen(false);
      },
    });
  
    const handleSubmit = async (data: CumulativeTrainingSchema) => {
      await addTraining.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Trained Certified Belts
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Trained Certified Belts</DialogTitle>
          </DialogHeader>
          <CumulativeTrainingForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  