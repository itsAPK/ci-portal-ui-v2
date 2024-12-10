import {
    DialogHeader,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { AlertTriangle, CheckCircle } from 'lucide-react';
  import { usePathname, useSearchParams , useRouter} from 'next/navigation';
  import { useState } from 'react';
  import { Button } from '@/components/ui/button';
  import { RiAddCircleFill , RiEditFill} from '@remixicon/react';
  import { ToolsForm } from './tools-form';
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import api from '@/lib/api';
  import { toast } from 'sonner';
  import { Tools, ToolsSchema } from '@/schema/tools';
  export const EditTools = ({tools  }: {tools : Tools}) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
      const editTools = useMutation({
        mutationKey: ["edit-tools"],
        mutationFn: async (data: ToolsSchema) => {
          return await api.patch(`/tools/${tools._id.$oid}`, {
            ...data,
            status: data.status === 'Active' ? true : false,
          }).then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data;
          });
        },
        onError: (error : any) => {
          toast.error(error.response.data.detail.message,  {
            icon: <AlertTriangle className="h-4 w-4" />,
          });
        },
        onSuccess: () => {
  
        setOpen(false);
        toast.success("Tool Updated successfully", {
            icon: <CheckCircle className="h-4 w-4" />,
          });
        queryClient.refetchQueries({
          queryKey: ['get-tools'],
        });
        router.push(`${pathname}?${params.toString()}`);
        router.refresh();
  
        setOpen(false);
        },
      });
  
    const handleSubmit = async (data: ToolsSchema) => {
      await editTools.mutateAsync(data);
    };
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          
          <Button variant="edit" size={"sm"} className="text-xs">
            <RiEditFill className="mr-2 h-4 w-4" /> Edit
               </Button>
        </DialogTrigger>
        <DialogContent className="min-w-xl max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tools</DialogTitle>
          </DialogHeader>
          <ToolsForm defaultValues={{...tools,status: tools.status ? 'Active' : 'Inactive'}} onSubmit={handleSubmit} mode='edit' />
        </DialogContent>
      </Dialog>
    );
  };
  