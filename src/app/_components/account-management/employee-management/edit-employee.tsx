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
import { EmployeeForm } from './employee-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Employee, EmployeeSchema } from '@/schema/employee';

export const EditEmployee = ({ employee }: { employee: Employee }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const editEmployee = useMutation({
    mutationKey: ['update-employee'],
    mutationFn: async (data: EmployeeSchema) => {
      return await api.patch(`/employee/${employee._id.$oid}`, { ...data }).then((res) => {
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
    await editEmployee.mutateAsync(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'leaf'} size={'sm'}>
          <RiEditFill className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90%] max-w-[925px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <EmployeeForm onSubmit={handleSubmit} defaultValues={{
            ...employee,
            //@ts-ignore
            date_of_birth: employee.date_of_birth.$date,
            //@ts-ignore
            date_of_joining: employee.date_of_joining.$date
        }} />
      </DialogContent>
    </Dialog>
  );
};
