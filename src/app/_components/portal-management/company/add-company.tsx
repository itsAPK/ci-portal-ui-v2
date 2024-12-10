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
  import { CompanyForm } from './company-form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { CompanySchema } from '@/schema/portal-management';
  export const AddCompany = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const addCompany = useMutation({
      mutationKey: ['add-company'],
      mutationFn: async (data: CompanySchema) => {
        return await api.post('/company', { ...data}).then((res) => {
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
        toast.success('Company added successfully', {
          icon: <CheckCircle className="h-4 w-4" />,
        });
        queryClient.refetchQueries({
          queryKey: ['get-company'],
        });
       
  
        setOpen(false);
      },
    });
  
    const handleSubmit = async (data: CompanySchema) => {
      await addCompany.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={'sm'}>
            <RiAddCircleFill className="mr-2 h-4 w-4" /> Add Company
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl   max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Company</DialogTitle>
          </DialogHeader>
          <CompanyForm onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  