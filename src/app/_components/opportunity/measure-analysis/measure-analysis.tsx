import { getCookie } from 'cookies-next';
import { useState } from 'react';
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

export const MeasureAnalysis = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  console.log(opportunities.measure_analysis_phase);
  const userId = getCookie('ci-portal.user_id');
  const [file, setFile] = useState<File[] | null>([]);
  const queryClient = useQueryClient();
  const [tools, setTools] = useState<any>([
    ...opportunities.ssv_tools.data.map((i: any) =>
      opportunities.measure_analysis_phase &&
      opportunities.measure_analysis_phase.data.find((j: any) => j.tool_id.$oid === i._id.$oid)
        ? {
            suspected_source: i.suspected_source,
            tools: i.tools,
            tool_id: i._id.$oid,
            root_cause: opportunities.measure_analysis_phase.data.find((j: any) => j.tool_id.$oid === i._id.$oid)
              .root_cause,
          }
        : {
            suspected_source: i.suspected_source,
            tools: i.tools,
            tool_id: i._id.$oid,
            root_cause: null,
          },
    ),
  ]);

  const addMeasureAnalysis = useMutation({
    mutationKey: ['add-measure-analysis'],
    mutationFn: async (status: 'Pending' | 'Completed') => {
      if (status === 'Completed' && (!file || file.length === 0)) {
        throw new Error('Please upload Document');
      }

      const response = await api
        .post(`/opportunity/measure-analysis/${opportunities._id.$oid}?status=${status}`, tools)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

      if (file && file.length > 0) {
        const formData = new FormData();
        formData.append('file', file![0]);
        await api
          .post(
            `/opportunity/measure-analysis/upload/${opportunities._id.$oid}?status=${status}`,
            formData,
          )
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            toast.success('Document uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
       
      }
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
        variables === 'Pending'
          ? 'Measure Analysis added successfully'
          : 'Measure Analysis completed successfully',
        {
          icon: <CheckCircle className="h-4 w-4" />,
        },
      );
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="link" size={'sm'} className="gap-2">
          <RiToolsFill className="mr-2 h-4 w-4" /> Measure & Analyze
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-h-[90%] max-w-[1000px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Measure & Analyze</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[300px] bg-primary text-center text-xs">
                  Suspected Source of Variation{' '}
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">Selected Tool</TableHead>
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
                    <TableCell className="text-center text-xs">{item.tools}</TableCell>
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
        <div>
          <div className="col-span-4 py-3">
            <FileUploader
              value={file}
              onValueChange={async (file: any) => {
                setFile(file);
              }}
              dropzoneOptions={{
                maxFiles: 1,
                maxSize: 1024 * 1024 * 5,
                multiple: false,
                accept: {
                  'application/pdf': ['.pdf'],
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                    '.docx',
                  ],
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                },
              }}
              className="relative rounded-lg bg-white p-2"
            >
              <FileInput className="outline-dashed outline-1 outline-white">
                <div className="flex w-full flex-col">
                  <FileUploadText
                    label={'Browse File'}
                    description="Max file size is 5MB,  Suitable files are .pdf, .xlsx, .docx, .jpg, .png, .jpeg"
                  />
                </div>
              </FileInput>
              <FileUploaderContent>
                {file &&
                  file.length > 0 &&
                  file.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-2 pt-5">
          <Button
            variant="outline"
            size={'sm'}
            className="w-[200px] gap-1"
            onClick={async () => await addMeasureAnalysis.mutateAsync('Pending')}
          >
            {addMeasureAnalysis.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Update
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={'sm'} className="w-[200px] gap-1">
                Complete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. If you save it will be non editable.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => await addMeasureAnalysis.mutateAsync('Completed')}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
