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
  import { DepartmentForm } from './department-form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { DepartmentSchema ,Department} from '@/schema/portal-management';
  export const EditDepartment = ({data} : {data : Department}) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const editDepartment = useMutation({
      mutationKey: ['edit-department'],
      mutationFn: async (d: DepartmentSchema) => {
        //@ts-ignore
        return await api.patch(`/department/${data._id}`, { ...d}).then((res) => {
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
        toast.success('Department updated successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['get-Department'],
        });
       
  
        setOpen(false);
      },
    });
  
    const handleSubmit = async (data: DepartmentSchema) => {
      await editDepartment.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button size='xs' variant="leaf" className='gap-1 w-[80px]'> 
                     <RiEditFill className="h-3 w-3" />
                     Edit
                        </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl   max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <DepartmentForm onSubmit={handleSubmit} defaultValues={{
            department_code: String(data.department_code),
            name: data.name,
          }} />
        </DialogContent>
      </Dialog>
    );
  };
  