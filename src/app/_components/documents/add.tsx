import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiAddCircleFill } from '@remixicon/react';
import { TemplateSchema, templateSchema } from '@/schema/template';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Template } from '@/schema/template';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, FileIcon, Loader2, Paperclip } from 'lucide-react';
import api from '@/lib/api';
import {
  FileUploader,
  FileUploadText,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from '@/components/ui/file-upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const AddTemplate = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const form = useForm<TemplateSchema>({
    resolver: zodResolver(templateSchema),
  });

  const [file, setFile] = useState<File[] | null>([]);
  const queryClient = useQueryClient();
  const addTemplate = useMutation({
    mutationKey: ['add-template'],
    mutationFn: async (data: TemplateSchema) => {
      if (!file || file.length === 0) {
        throw new Error('Please select a file');
      }
      const formData = new FormData();
      formData.append('file', file[0]!);
      formData.append('document', JSON.stringify(data)); // sending as string (this is fine)

      return await api.post('/document', formData).then((res) => {
        if (!res.data.success) throw new Error(res.data.message);
        return res.data;
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      setOpen(false);
      toast.success('Template added successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-document'],
      });
      setOpen(false);
    },
  });

  const onSubmit = async (data: any) => {
    await addTemplate.mutateAsync(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <RiAddCircleFill className="mr-2 h-4 w-4" /> Upload Template
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl max-w-[435px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Template</DialogTitle>
        </DialogHeader>
        <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid h-full grid-cols-1 md:grid-cols-4">
            <div className="col-span-4 px-2 py-1 md:px-7">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormFieldInput
                  control={form.control}
                  name="name"
                  label="Template Title"
                  className="col-span-2"
                />
              </div>
            </div>
            <div className="col-span-4 border-b py-3">
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
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
                      '.pptx',
                    ],
                    'application/vnd.ms-powerpoint': ['ppt'],
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
                  <div className="flex w-full flex-col pb-2 pt-3">
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
          <div className="flex justify-end pt-5">
            {' '}
            <Button type="submit" size="lg" className="w-full">
              {addTemplate.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Submit
            </Button>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
