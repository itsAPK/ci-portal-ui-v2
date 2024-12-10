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
import { EmployeeForm } from './employee-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import { EmployeeSchema } from '@/schema/employee';
export const AddEmployee = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const addEmployee = useMutation({
    mutationKey: ['add-employee'],
    mutationFn: async (data: EmployeeSchema) => {
      return await api.post('/employee', { ...data, password: 'amararaja' }).then((res) => {
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
      toast.success('Employee added successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-employee'],
      });
      router.push(`${pathname}?${params.toString()}`);
      router.refresh();

      setOpen(false);
    },
  });

  const handleSubmit = async (data: EmployeeSchema) => {
    await addEmployee.mutateAsync(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90%]  max-w-[925px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <EmployeeForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};
