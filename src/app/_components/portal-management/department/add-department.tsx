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
  import { DepartmentForm } from './department-form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { DepartmentSchema } from '@/schema/portal-management';
  export const AddDepartment = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const addDepartment = useMutation({
      mutationKey: ['add-department'],
      mutationFn: async (data: DepartmentSchema) => {
        return await api.post('/department', { ...data}).then((res) => {
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
        toast.success('Department added successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['get-department'],
        });
       
  
        setOpen(false);
      },
    });
  
    const handleSubmit = async (data: DepartmentSchema) => {
      await addDepartment.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Department
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl   max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
          </DialogHeader>
          <DepartmentForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  