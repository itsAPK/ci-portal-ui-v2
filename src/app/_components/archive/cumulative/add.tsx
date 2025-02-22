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
  import { CumulativeArchiveForm } from './form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { CumulativeArchiveSchema } from '@/schema/archive';
  export const AddCumulative = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const addCumulative = useMutation({
      mutationKey: ['add-archive-cumulative'],
      mutationFn: async (data: CumulativeArchiveSchema) => {
        return await api.post('/archive/cumulative', { ...data }).then((res) => {
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
        toast.success('Cumulative added successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['total-cumulative'],
          
        });

       
        
  
        setOpen(false);
      },
    });
  
    const handleSubmit = async (data: CumulativeArchiveSchema) => {
      await addCumulative.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Cumulative
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle> Cumulative</DialogTitle>
          </DialogHeader>
          <CumulativeArchiveForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  