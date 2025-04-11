'use client'
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
import { RiFolderUploadFill, RiToolsFill } from '@remixicon/react';
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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export const EditImprovementPhase = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  const userId = getCookie('ci-portal.user_id');
  const [file, setFile] = useState<File[] | null>([]);
  const queryClient = useQueryClient();
  const [isBvsC, setIsBvsC] = useState(
   opportunities.improvement_phase && opportunities.improvement_phase.is_b_vs_c ? true : false,
  );
  const [tools, setTools] = useState<any>([
    ...(opportunities?.measure_analysis_phase?.data || [])
      .filter((k: any) => k.root_cause === 'Confirmed')
      .map((i: any) => {
        const improvementMatch = (opportunities?.improvement_phase?.data || []).find(
          (j: any) => j.confirmed_cause === i.suspected_source,
        );
  
        return {
          confirmed_cause: i.suspected_source,
          action_taken: improvementMatch?.action_taken ?? null,
          measure_analysis_id: i._id,
          type_of_action: improvementMatch?.type_of_action ?? null,
        };
      }),
  ]);
  
  

  const updateImprovement = useMutation({
    mutationKey: ['update-improvement'],
    mutationFn: async () => {
      const response = await api
        .patch(`/opportunity/improvement/update/${opportunities._id}`, tools)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

     await api.patch(`/opportunity/improvement/${opportunities._id}`, {
        is_b_vs_c: isBvsC,
      }).then((res) => {
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
        'Improvement Phase Updated successfully',
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

          <RiFolderUploadFill className="h-4 w-4" /> Edit Improvement Phase
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-h-[90%] max-w-[1000px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Improvement Phase</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[300px] bg-primary text-center text-xs">
                  Confirmed Cause{' '}
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">Action Taken</TableHead>
                <TableHead className="rounded-tr-xl bg-primary text-center text-xs">
                  Type Of Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.length > 0 ? (
                tools.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="max-w-[300px] text-center text-xs">
                      {item.confirmed_cause}
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      <Input
                        value={item.action_taken}
                        onChange={(e) =>
                          setTools(
                            tools.map((i: any) =>
                              i.measure_analysis_id === item.measure_analysis_id
                                ? { ...i, action_taken: e.target.value }
                                : i,
                            ),
                          )
                        }
                        className="h-10 w-full"
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      <Select
                        defaultValue={item.type_of_action}
                        onValueChange={(e) =>
                          setTools(
                            tools.map((i: any) =>
                              i.measure_analysis_id === item.measure_analysis_id
                                ? { ...i, type_of_action: e }
                                : i,
                            ),
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Select Type Of Action" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Abnormality Correction', 'Process Design', 'Product Design'].map(
                            (i: any) => (
                              <SelectItem key={i} value={i}>
                                {i}
                              </SelectItem>
                            ),
                          )}
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
        
        <DialogFooter className="flex justify-end gap-2 ">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-end space-x-2">
            <Checkbox id="terms" checked={isBvsC} onCheckedChange={(e) => setIsBvsC((prev) => !prev)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Is B vs C Done
            </label>
          </div>
          <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size={'sm'}
            className="w-[200px] gap-1"
            onClick={async () => await updateImprovement.mutateAsync()}
          >
            {updateImprovement.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Update
          </Button>
          </div></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
