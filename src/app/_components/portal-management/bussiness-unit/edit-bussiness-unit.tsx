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
import { BussinessUnitForm } from './bussiness-unit-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import { BussinessUnit, BussinessUnitSchema } from '@/schema/portal-management';

export const EditBussinessUnit = ({data} : {data : BussinessUnit}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const editBussinessUnit = useMutation({
    mutationKey: ['edit-bussiness-unit'],
    mutationFn: async (d: BussinessUnitSchema) => {
      return await api.patch(`/bussiness-unit/${data._id}`, { ...d }).then((res) => {
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
      toast.success('Bussiness Unit added successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-bussiness-unit'],
      });

      setOpen(false);
    },
  });

  const handleSubmit = async (data: BussinessUnitSchema) => {
    await editBussinessUnit.mutateAsync(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      
          <Button size="xs" variant="default" className="mt-1 gap-1 px-3">
            <RiEditFill className="h-3 w-3" /> Edit
          </Button>
    
      </DialogTrigger>
      <DialogContent className="min-w-xl max-w-[425px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Division</DialogTitle>
        </DialogHeader>
        <BussinessUnitForm onSubmit={handleSubmit} defaultValues={data} />
      </DialogContent>
    </Dialog>
  );
};
