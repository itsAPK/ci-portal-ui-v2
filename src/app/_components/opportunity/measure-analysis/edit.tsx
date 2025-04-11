import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { RiToolsFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle, Loader2, Paperclip } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileUploadText,
} from '@/components/ui/file-upload';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { Badge } from '@/components/ui/badge';

export const EditMeasureAnalysis = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  console.log(opportunities.measure_analysis_phase);
  const userId = getCookie('ci-portal.user_id');
  const [file, setFile] = useState<File[] | null>([]);
  const queryClient = useQueryClient();
  const [tools, setTools] = useState<any>([]);

  useEffect(() => {
    const ssv = opportunities?.ssv_tools?.data || [];
    const phase = opportunities?.measure_analysis_phase?.data || [];
  
    const updatedTools = ssv.map((i: any) => {
      
      const matchedTool = phase.find((j: any) => String(j.suspected_source) === String(i.suspected_source));
      console.log(matchedTool);
      return {
        suspected_source: i.suspected_source,
        tools: i.tools,
        tool_id: i._id,
        root_cause: matchedTool ? matchedTool.root_cause : null,
      };
    });
  
    setTools(updatedTools);
  }, [opportunities.ssv_tools, opportunities.measure_analysis_phase]);
  
  const addMeasureAnalysis = useMutation({
    mutationKey: ['update-measure-analysis'],
    mutationFn: async () => {
     

      const response = await api
        .patch(`/opportunity/measure-analysis/${opportunities._id}`, tools)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

     
      return response;
    },
    onError: (error: any) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: (data, variables, context) => {
      setOpen(false);
      toast.success(
         'Measure Analysis updated successfully',
        {
          icon: <CheckCircle className="h-4 w-4" />,
        },
      );
      queryClient.refetchQueries({
        queryKey: [`get-opportunity-${opportunities._id}`],
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="ghost-1" size={'sm'} className="gap-2">
          <RiToolsFill className="mr-2 h-4 w-4" /> Edit Measure & Analyze
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-h-[90%] max-w-[1000px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Measure & Analyze</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[300px] bg-primary text-center text-xs">
                  Suspected Source of Variation{' '}
                </TableHead>
                <TableHead className="bg-primary text-center text-xs w-[400px]">Selected Tool</TableHead>
                <TableHead className="rounded-tr-xl bg-primary text-center text-xs">
                  Identified Root Cause
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.length > 0 ? (
                tools.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="max-w-[300px] text-center text-xs">
                      {item.suspected_source}
                    </TableCell>
                    <TableCell className="text-center text-xs flex flex-wrap gap-2 justify-center w-[400px]">{item.tools.map((i: any) => <Badge variant={'ghost'} key={i}>{i}</Badge>)}</TableCell>
                    <TableCell className="text-center text-xs">
                      <Select
                        defaultValue={item.root_cause}
                        onValueChange={(e) =>
                          setTools(
                            tools.map((i: any) =>
                              i.tool_id === item.tool_id ? { ...i, root_cause: e } : i,
                            ),
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Select Root Cause" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Confirmed', 'Eliminated'].map((i: any) => (
                            <SelectItem key={i} value={i}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
        
        <DialogFooter className="flex justify-end gap-2 pt-5">
          <Button
            variant="outline"
            size={'sm'}
            className="w-[200px] gap-1"
            onClick={async () => await addMeasureAnalysis.mutateAsync()}
          >
            {addMeasureAnalysis.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Update
          </Button>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
