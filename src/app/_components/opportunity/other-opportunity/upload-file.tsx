'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle, EditIcon, Paperclip, UploadIcon } from 'lucide-react';
import api from '@/lib/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
  FileUploadText,
} from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import { OpportunityForm } from './form';
import { OpportunitySchema } from '@/schema/opportunity';

export const UploadFile = ({opportunity_id }: { opportunity_id: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File[] | null>([]);

  const addOpportunity = useMutation({
    mutationKey: ['upload-file'],
    mutationFn: async (file : File[] | null) => {
    
  if (!file || file.length === 0) {
        throw new Error('Please upload a document.');
      }
   

    

     
      

      if (file && file.length > 0) {
        // Iterate over each file
    
          try {
            const formData = new FormData();
            file.forEach((f) => {
              formData.append('files', f); // Use 'files' as the key for multiple files
          });
      
            // Await the file upload API call
            const r = await api.post(`/opportunity/upload/${opportunity_id}`, formData);
            
            // Handle success response
            toast.success('Document uploaded successfully', {
              icon: <CheckCircle className="h-4 w-4" />,
            });
      
            // Optionally, handle the response data if needed
            return r.data;
      
          } catch (error) {
            // Handle error (file upload failed)
            toast.error('Failed to upload document');
            console.error("Error uploading file:", error);
          }
        
      }
      

    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('File Uploaded successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
     setOpen(false);
      queryClient.refetchQueries({
        queryKey: ['get-other-opportunities'],
      });
    },
  });

  const handleSubmit = async () => {
    await addOpportunity.mutateAsync(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
     
          <Button variant="link" size={'sm'} className="gap-2">
                 <UploadIcon className="mr-2 h-4 w-4" />  <span className="-mt-[1px]">Upload File</span>
                </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
          <div className="col-span-2 flex flex-col gap-2">
                <Label className="-mb-2 px-2">Upload Opportunity File </Label>
                <FileUploader
                  value={file ? file : []}
                  onValueChange={async (file: any) => {
                    setFile?.(file);
                  }}
                  dropzoneOptions={{
                    maxFiles: 10,
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
                        description="Max file size is 5MB,  Suitable files are  .jpg, .png, .jpeg, .pdf, .xlxs"
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
              <div>
                <Button onClick={handleSubmit} className="w-full">
                    Submit
                </Button>
              </div>
      </DialogContent>
    </Dialog>
  );
};
