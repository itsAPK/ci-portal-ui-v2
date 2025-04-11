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
import { RiFolderUploadFill, RiRemoteControlFill } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { formatToIndianNumber } from '../../../../lib/utils';
import { IndianNumberInput } from '@/components/indian-number-input';

export const EditControlPhase = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  console.log(opportunities.control_phase);
  const userId = getCookie('ci-portal.user_id');
  const [file, setFile] = useState<File[] | null>([]);
  const queryClient = useQueryClient();
  const [actualReponse, setActualReponse] = useState<any>(
    opportunities.control_phase && opportunities.control_phase.control_response
      ? opportunities.control_phase.control_response.actual
      : null,
  );
  const [actualCost, setActualCost] = useState<any>(
    opportunities.control_phase && opportunities.control_phase.control_cost
      ? String(opportunities.control_phase.control_cost.actual)
      : '0',
  );
  const [responseUOM, setResponseUOM] = useState<any>(
    opportunities.control_phase && opportunities.control_phase.control_response
      ? opportunities.control_phase.control_response.uom
      : null,
  );
  const [tools, setTools] = useState<any>([
    ...opportunities.improvement_phase.data.map((i: any) =>
      opportunities.control_phase &&
      opportunities.control_phase.data.find((j: any) => j.confirmed_cause === i.confirmed_cause)
        ? {
            confirmed_cause: i.confirmed_cause,
            mechanism: opportunities.control_phase.data.find(
              (j: any) => j.confirmed_cause === i.confirmed_cause,
            ).mechanism,
            improvement_id: i._id,
            contol_tools:
              opportunities.control_phase.data.find(
                (j: any) => j.confirmed_cause === i.confirmed_cause,
              ).contol_tools ?? null,
          }
        : {
            confirmed_cause: i.confirmed_cause,
            mechanism: null,
            improvement_id: i._id,
            contol_tools: null,
          },
    ),
  ]);

  const toolsData = useQuery({
    queryKey: ['get-tools-export'],
    queryFn: async (): Promise<any> => {
      return await api
        .post('/tools/export', {
          filter: [
            {
              $match: {
                category: { $eq: opportunities.category },
                status: { $eq: true },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  });

  const addControl = useMutation({
    mutationKey: ['add-contorl'],
    mutationFn: async () => {
    

      const response = await api
        .patch(`/opportunity/control/update/${opportunities._id}`, tools)
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

      await api
        .patch(`/opportunity/control/${opportunities._id}`, {
          control_response: {
            baseline: opportunities.define_phase.baseline,
            target: opportunities.define_phase.target,
            actual: actualReponse,
            uom: responseUOM ?? 'PPM',
          },
          control_cost: {
            estimated: String(opportunities.estimated_savings),
            actual: actualCost.replace(/,/g, ''),
            uom: 'Rupees in Lakhs',
          },
        })
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
     
          'Control Phase updated successfully',
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
          <RiRemoteControlFill className="h-4 w-4" />Edit Control Phase
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-h-[90%] max-w-[1000px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Control Phase</DialogTitle>
        </DialogHeader>
        <div className="w-full rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[300px] bg-primary text-center text-xs">
                  Confirmed Cause{' '}
                </TableHead>
                <TableHead className="bg-primary text-center text-xs">
                  Control Mechanism Implemented{' '}
                </TableHead>
                <TableHead className="rounded-tr-xl bg-primary text-center text-xs">
                  Control Tools
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
                        value={item.mechanism}
                        onChange={(e) =>
                          setTools(
                            tools.map((i: any) =>
                              i.improvement_id === item.improvement_id
                                ? { ...i, mechanism: e.target.value }
                                : i,
                            ),
                          )
                        }
                        className="h-10 w-full"
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs">
                      <Select
                        defaultValue={item.contol_tools}
                        onValueChange={(e) =>
                          setTools(
                            tools.map((i: any) =>
                              i.improvement_id === item.improvement_id
                                ? { ...i, contol_tools: e }
                                : i,
                            ),
                          )
                        }
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Select Type Of Action" />
                        </SelectTrigger>
                        <SelectContent>
                          {toolsData.data &&
                            toolsData.data.map((i: any) => (
                              <SelectItem key={i._id.$oid} value={i.name}>
                                {i.name}
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
        <Card className="broder">
          <CardHeader>
            <CardTitle>Result Achived</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label className="px-1 text-xs">Baseline</Label>
              <Input
                value={opportunities.define_phase.baseline}
                disabled
                className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2"
              />
            </div>
            <div>
              <Label className="px-1 text-xs">Target</Label>
              <Input
                value={opportunities.define_phase.target}
                disabled
                className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2"
              />
            </div>
            <div>
              <div className="flex gap-2">
                <div>
                  <Label className="px-1 text-xs">Actual</Label>
                  <Input
                    value={actualReponse}
                    onChange={(e) => setActualReponse(e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2"
                  />
                </div>
                <div>
                  <Label className="px-1 text-xs">UOM</Label>
                  <Select
                    onValueChange={(e) => {
                      setResponseUOM(e);
                    }}
                    value={responseUOM}
                  >
                    <SelectTrigger className="w-[100px] h-10">
                      <SelectValue  />
                    </SelectTrigger>
                    <SelectContent>
                      {['PPM', '%', "No's"].map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                 
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="broder">
          <CardHeader>
            <CardTitle>Savings</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label className="px-1 text-xs">Estimated</Label>
              <Input
                value={formatToIndianNumber(opportunities.estimated_savings)}
                disabled
                className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2"
              />
            </div>
            <div>
              <Label className="px-1 text-xs">Actual</Label>
             
              <IndianNumberInput
                label=""
                placeholder=""
                value={actualCost}
                onChange={(e) => setActualCost(e)}
                className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2"
              />
            </div>
            <div>
              <Label className="px-1 text-xs"></Label>
              <Input
                value={'Rupees in Lakhs'}
                disabled
                className="h-10 w-full rounded-lg border border-gray-400 px-3 py-2"
              />
            </div>
          </CardContent>
        </Card>
     
        <DialogFooter className="flex justify-end gap-2">
          <div className="flex flex-col gap-5">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size={'sm'}
                className="w-[200px] gap-1"
                onClick={async () => await addControl.mutateAsync()}
              >
                {addControl.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Update
              </Button>
            
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
