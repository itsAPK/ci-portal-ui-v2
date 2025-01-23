import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import { RiMoneyRupeeCircleFill } from '@remixicon/react';
  import { useState } from 'react';
  import { Button } from '@/components/ui/button';
  import api from '@/lib/api';
  import { MonthlySavingsSchema } from '@/schema/opportunity';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import { AlertTriangle, CheckCircle } from 'lucide-react';
  import { toast } from 'sonner';
  import { MonthlySavingsForm } from './form';
  
  export const AddMonthlySavings = ({ opportunities }: { opportunities: any }) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const addMonthlySavings= useMutation({
      mutationKey: ['add-monthySavings'],
      mutationFn: async (data: MonthlySavingsSchema) => {
        return await api.post(`/opportunity/monthly-savings/${opportunities._id.$oid}`, { ...data }).then((res) => {
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
        toast.success('Monthly Savings added successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['get-opportunities'],
        });
      },
    });
  
    const handleSubmit = async (data: MonthlySavingsSchema) => {
      await addMonthlySavings.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <RiMoneyRupeeCircleFill className="mr-2 h-4 w-4" /> Entry Monthly Savings
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl  max-w-[805px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Monthly Savings</DialogTitle>
          </DialogHeader>
          <MonthlySavingsForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  