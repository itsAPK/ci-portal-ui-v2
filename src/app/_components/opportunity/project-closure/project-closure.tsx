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
import { RiPresentationFill } from '@remixicon/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { tools } from '@/lib/data';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileUploadText,
} from '@/components/ui/file-upload';
import { AlertTriangle, CheckCircle, Loader2, Paperclip } from 'lucide-react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const ProjectClosure = ({ opportunities }: { opportunities: any }) => {
  const [open, setOpen] = useState(false);
  console.log(opportunities.project_closure);
  const userId = getCookie('ci-portal.user_id');
  const [successRate, setSuccessRate] = useState<any>();
  const [tangibleBenifits, setTangibleBenifits] = useState<any>();
  const [intangibleBenifits, setIntangibleBenifits] = useState<any>();
  const [horizantalDeployment, setHorizantalDeployment] = useState<any>();
  const [standardization, setStandardization] = useState<any>();
  const [estimatedSavings, setEstimatedSavings] = useState<any>();
  const [closureDocument, setClosureDocument] = useState<File[] | null>([]);
  const [beforeImprovement, setBeforeImprovement] = useState<File[] | null>([]);
  const [afterImprovement, setAfterImprovement] = useState<File[] | null>([]);

  const queryClient = useQueryClient();
  const submitProjectClosure = useMutation({
    mutationKey: ['submit-project-closure'],
    mutationFn: async () => {

      if (!successRate) {
        throw new Error('Please enter Success Rate');
      }

      if (!tangibleBenifits) {
        throw new Error('Please enter Tangible Benefits');
      }

      if (!intangibleBenifits) {
        throw new Error('Please enter Intangible Benefits');
      }

      if (!horizantalDeployment) {
        throw new Error('Please enter Horizontal Deployment');
      }

      if (!standardization) {
        throw new Error('Please enter Standardization');
      }

      if (!estimatedSavings) {
        throw new Error('Please enter Estimated Savings');
      }

      if (!closureDocument || closureDocument.length === 0) {
        throw new Error('Please upload Closure Document');
      }

      if (!beforeImprovement || beforeImprovement.length === 0) {
        throw new Error('Please upload Before Improvement');
      }

      if (!afterImprovement || afterImprovement.length === 0) {
        throw new Error('Please upload After Improvement');
      }

    


      const response = await api
        .post(`/opportunity/project-closure/${opportunities._id.$oid}`, {
          tangible_benifits: tangibleBenifits,
          intangible_benifits: intangibleBenifits,
          horizantal_deployment: horizantalDeployment,
          standardization: standardization,
          estimated_savings: estimatedSavings,
          success_rate: successRate,
          suspected_cause: opportunities.measure_analysis_phase.data.map(
            (i: any, index: number) => i.suspected_source,
          ),
          pin_pointed_root_cause: opportunities.measure_analysis_phase.data
            .filter((k: any) => k.root_cause === 'Confirmed')
            .map((i: any, index: number) => i.suspected_source),
          actions_implemented: opportunities.improvement_phase.data.map(
            (i: any, index: number) => i.action_taken,
          ),
          tools_used: opportunities.control_phase.data.map(
            (i: any, index: number) => i.contol_tools,
          ),
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data;
        });

      if (closureDocument && closureDocument.length > 0) {
        const formData = new FormData();
        formData.append('file', closureDocument[0]);
        await api
          .post(
            `/opportunity/project-closure/upload/closure-document/${opportunities._id.$oid}`,
            formData,
          )
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            toast.success('Closure Document uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if (beforeImprovement && beforeImprovement.length > 0) {
        const formData = new FormData();
        formData.append('file', beforeImprovement[0]);
        await api
          .post(
            `/opportunity/project-closure/upload/before-improvement/${opportunities._id.$oid}`,
            formData,
          )
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            toast.success('Before Improvement Document uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
            return res.data;
          });
      }

      if (afterImprovement && afterImprovement.length > 0) {
        const formData = new FormData();
        formData.append('file', afterImprovement[0]);
        await api
          .post(
            `/opportunity/project-closure/upload/after-improvement/${opportunities._id.$oid}`,
            formData,
          )
          .then((res) => {
            return res.data;
          })
          .then((res) => {
            toast.success('After Improvement Document uploaded successfully', {
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
      toast.success('Project Closure completed successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-opportunities'],
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant="link" size={'sm'} className="gap-2">

          <RiPresentationFill className="h-4 w-4" />
          Proceed To Project Closure
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-h-[90%] max-w-[1200px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Closure</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <Card className="broder">
            <CardHeader>
              <CardTitle className="text-sm">Suspected Causes for Problem </CardTitle>
            </CardHeader>
            <CardContent className="gap-4 text-sm">
              {opportunities.measure_analysis_phase.data.map((i: any, index: number) => (
                <div key={index}>
                  {index + 1}. {i.suspected_source}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="broder">
            <CardHeader>
              <CardTitle className="text-sm">Pin pointed Root Cause for the problem </CardTitle>
            </CardHeader>
            <CardContent className="gap-4 text-sm">
              {opportunities.measure_analysis_phase.data
                .filter((k: any) => k.root_cause === 'Confirmed')
                .map((i: any, index: number) => (
                  <div key={index}>
                    {index + 1}. {i.suspected_source}
                  </div>
                ))}
            </CardContent>
          </Card>
          <Card className="broder">
            <CardHeader>
              <CardTitle className="text-sm">Actions implemented </CardTitle>
            </CardHeader>
            <CardContent className="gap-4 text-sm">
              {opportunities.improvement_phase.data.map((i: any, index: number) => (
                <div key={index}>
                  {index + 1}. {i.action_taken}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="broder">
            <CardHeader>
              <CardTitle className="text-sm">Tools/Techniques used</CardTitle>
            </CardHeader>
            <CardContent className="gap-4 text-sm">
              {opportunities.control_phase.data.map((i: any, index: number) => (
                <div key={index}>
                  {index + 1}. {i.contol_tools}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="broder">
            <CardHeader>
              <CardTitle className="text-sm">Results</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {' '}
                  <Label className="px-1 pb-1">Project Success Rate</Label>
                  <Select defaultValue={successRate} onValueChange={(e) => setSuccessRate(e)}>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['Successfully Completed', 'Failure', 'Dropped', 'Partial Success'].map(
                        (i: any) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="px-1 pb-1">Estimated Savings</Label>
                  <Input
                    value={estimatedSavings}
                    onChange={(e) => setEstimatedSavings(e.target.value)}
                    className="h-12 w-full"
                  />
                </div>
              </div>
              <div>
                <Label className="px-1 pb-1">Tangible Benefits</Label>
                <Input
                  value={tangibleBenifits}
                  onChange={(e) => setTangibleBenifits(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              <div>
                <Label className="px-1 pb-1">Intangible Benefits</Label>
                <Input
                  value={intangibleBenifits}
                  onChange={(e) => setIntangibleBenifits(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              <Label className="px-1 pb-1">Horizontal Deployment</Label>
              <div>
                {' '}
                <Input
                  value={horizantalDeployment}
                  onChange={(e) => setHorizantalDeployment(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              <div>
                {' '}
                <Label className="px-1 pb-1">Standardization</Label>
                <Input
                  value={standardization}
                  onChange={(e) => setStandardization(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              <div className="grid grid-cols-3 pt-5">
                <div className="flex flex-col gap-2">
                  <Label className="-mb-2 px-2">Closure Document </Label>
                  <FileUploader
                    value={closureDocument}
                    onValueChange={async (file: any) => {
                      setClosureDocument(file);
                    }}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 5,
                      multiple: false,
                      accept: {
                        'image/png': ['.png'],
                        'image/jpg': ['.jpg'],
                        'image/jpeg': ['.jpeg'],
                        'application/pdf': ['.pdf'],
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
                          '.xlsx',
                        ],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                          '.docx',
                        ],
                      },
                    }}
                    className="relative rounded-lg bg-white p-2"
                  >
                    <FileInput className="outline-dashed outline-1 outline-white">
                      <div className="flex w-full flex-col pb-2 pt-3">
                        <FileUploadText
                          label={'Browse File'}
                          description="Max file size is 5MB,  Suitable files are  .jpg, .png, .jpeg .pdf .docx .xlxs"
                        />
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {closureDocument &&
                        closureDocument.length > 0 &&
                        closureDocument.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="-mb-2 px-2">Before Improvement </Label>
                  <FileUploader
                    value={beforeImprovement}
                    onValueChange={async (file: any) => {
                      setBeforeImprovement(file);
                    }}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 1,
                      multiple: false,
                      accept: {
                        'image/png': ['.png'],
                        'image/jpg': ['.jpg'],
                        'image/jpeg': ['.jpeg'],
                      },
                    }}
                    className="relative rounded-lg bg-white p-2"
                  >
                    <FileInput className="outline-dashed outline-1 outline-white">
                      <div className="flex w-full flex-col pb-2 pt-3">
                        <FileUploadText
                          label={'Browse File'}
                          description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                        />
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {beforeImprovement &&
                        beforeImprovement.length > 0 &&
                        beforeImprovement.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="-mb-2 px-2">After Improvement </Label>
                  <FileUploader
                    value={afterImprovement}
                    onValueChange={async (file: any) => {
                      setAfterImprovement(file);
                    }}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 1,
                      multiple: false,
                      accept: {
                        'image/png': ['.png'],
                        'image/jpg': ['.jpg'],
                        'image/jpeg': ['.jpeg'],
                        'application/pdf': ['.pdf'],
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
                          '.xlsx',
                        ],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                          '.docx',
                        ],
                      },
                    }}
                    className="relative rounded-lg bg-white p-2"
                  >
                    <FileInput className="outline-dashed outline-1 outline-white">
                      <div className="flex w-full flex-col pb-2 pt-3">
                        <FileUploadText
                          label={'Browse File'}
                          description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                        />
                      </div>
                    </FileInput>
                    <FileUploaderContent>
                      {afterImprovement &&
                        afterImprovement.length > 0 &&
                        afterImprovement.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end pt-5">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={'sm'} className="w-[200px] gap-1" disabled={submitProjectClosure.isPending}>
              {submitProjectClosure.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Submit For Approval
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
                  <AlertDialogAction onClick={async () => {
                await submitProjectClosure.mutateAsync()
                  }}>
                    Submit For Approval
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
