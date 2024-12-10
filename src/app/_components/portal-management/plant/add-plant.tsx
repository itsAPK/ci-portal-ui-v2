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
  import { PlantForm } from './plant-form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { PlantSchema } from '@/schema/portal-management';
  export const AddPlant = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const addPlant = useMutation({
      mutationKey: ['add-plant'],
      mutationFn: async (data: PlantSchema) => {
        return await api.post('/plant', { ...data}).then((res) => {
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
        toast.success('Plant added successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['get-plant'],
        });
       
  
        setOpen(false);
      },
    });
  
    const handleSubmit = async (data: PlantSchema) => {
      await addPlant.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Plant
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl   max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Plant</DialogTitle>
          </DialogHeader>
          <PlantForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  