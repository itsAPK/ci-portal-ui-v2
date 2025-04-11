import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { RiAddCircleFill, RiDeleteBin2Fill, RiToolsFill } from '@remixicon/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getCookie } from 'cookies-next';
import { SSVToolsSchema } from '@/schema/opportunity';
import { SSVToolsForm } from './form';
import api from '@/lib/api';
import { AlertTriangle, CheckCircle, Paperclip, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FileUploader,
  FileUploaderContent,
  FileInput,
  FileUploaderItem,
  FileUploadText,
} from '@/components/ui/file-upload';

export const EditSSVTools = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  const role = getCookie('ci-portal.role');
  const plant = getCookie('ci-portal.plant');
  const userId = getCookie('ci-portal.user_id');
  const [ssvTools, setSSVTools] = useState<any>(opportunities.ssv_tools ? opportunities.ssv_tools.data : []);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [file, setFile] = useState<File[] | null>([]);
  const queryClient = useQueryClient();
  const onSubmit = async (data: SSVToolsSchema) => {
    setSSVTools([
      ...ssvTools,
      {
        ...data,
        id: ssvTools.length + 1,
      },
    ]);
    setIsFromOpen(false);
  };

  const addSSVTools = useMutation({
    mutationKey: ['update-ssv-tools'],
    mutationFn: async () => {
      if (ssvTools.length === 0) {
        throw new Error('Please add SSV Tools');
      }

    

      const data = await api
        .patch(`/opportunity/ssv-tool/${opportunities._id}`, ssvTools)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

    
      return data;
    },
    onError: (error: any) => {
      if (error.message) {
        toast.error(error.message, {
          icon: <AlertTriangle className="h-4 w-4" />,
        });
      } else {
        console.log(error);
        toast.error(error.response.data.detail.message, {
          icon: <AlertTriangle className="h-4 w-4" />,
        });
      }
    },
    onSuccess: () => {
      setOpen(false);
      toast.success('SSV Tools added successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: [`get-opportunity-${opportunities._id}`],
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost-1" size={'sm'} className="gap-2">
          <RiToolsFill className="h-4 w-4" />
        Edit SSV's & Tools Selection
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl min-h-[300px] max-w-[1000px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit SSV's & Tools</DialogTitle>
        </DialogHeader>

        {!isFromOpen && (
          <div className="flex justify-end pt-5">
            <Button
              variant="ghost-1"
              size={'sm'}
              className="gap-1"
              onClick={() => setIsFromOpen(true)}
            >
              <RiAddCircleFill className="h-3 w-3" /> Add SSV's & Tools
            </Button>
          </div>
        )}

        {isFromOpen && <SSVToolsForm onSubmit={onSubmit} category={opportunities.category} />}

        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-center text-xs">
                  Suspected Source of Variation{' '}
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">Tools</TableHead>
                <TableHead className="bg-primary text-center text-xs">Type of SSV</TableHead>
                <TableHead className="rounded-tr-xl bg-primary text-center text-xs"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ssvTools.length > 0 ? (
                ssvTools.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center text-xs">{item.suspected_source}</TableCell>
                    <TableCell className="text-center text-xs flex flex-wrap gap-2 justify-center">{item.tools.map((i: any) => <Badge variant={'ghost'} key={i}>{i}</Badge>)}</TableCell>
                    <TableCell className="text-center text-xs">{item.type_of_ssv}</TableCell>
                    <TableCell className="flex gap-1 -mt-3 ">
                      {userId === opportunities.project_leader._id && (
                        <>
                          <Button
                            variant="destructive-ghost"
                            size={'sm'}
                            className="flex h-6 gap-2"
                            onClick={() =>
                              setSSVTools(ssvTools.filter((i: any) => i.suspected_source !== item.suspected_source))
                            }
                          >
                            <RiDeleteBin2Fill className="h-3 w-3" /> Remove
                          </Button>
                        </>
                      )}
                    </TableCell>
                 
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="flex items-center justify-center" colSpan={10}>
                    No Record Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
       
          <div className="flex justify-end pt-5">
            <Button
              variant="ghost-1"
              size={'sm'}
              className="w-[200px] gap-1"
              onClick={async () => await addSSVTools.mutateAsync()}
            >
              {addSSVTools.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
