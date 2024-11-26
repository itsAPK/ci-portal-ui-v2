import { FileUploader, FileUploadText } from '@/components/file-upload';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import api from '@/lib/api';
import { useQueries } from '@tanstack/react-query';
import { profile } from 'console';
import { FileIcon, FileInput } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from 'recharts';
interface TemplateFormProps {
  defaultValues?: Partial<any>;
  onSubmit: (data: any) => void;
}

export const TemplateForm = ({ defaultValues, onSubmit }: TemplateFormProps) => {
  const form = useForm<any>({
    defaultValues,
  });
 
  const [file, setFile] = useState<File[] | null>([]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
            <FormFieldInput
              control={form.control}
              name="template_name"
              label="Template Title"
              className="col-span-2"
            />
           
          </div>
        </div>
        <Card className="col-span-4 border-none shadow-none">
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-col items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 p-6">
              <FileIcon className="h-12 w-12" />
              <span className="text-sm font-medium text-gray-500">
                Drag and drop a file or click to browse
              </span>
              <span className="text-xs text-gray-500">PDF, xlxs, docs</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end pt-5">
        {' '}
        <Button type="submit" size="lg" className="w-[200px]">
          Submit
        </Button>
      </div>
    </FormWrapper>
  );
};
