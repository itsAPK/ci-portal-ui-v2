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
interface ArchiveFormProps {
  defaultValues?: Partial<any>;
  onSubmit: (data: any) => void;
}

export const ArchiveForm = ({ defaultValues, onSubmit }: ArchiveFormProps) => {
  const form = useForm<any>({
    defaultValues,
  });
  const [company, department, plant] = useQueries({
    queries: [
      {
        queryKey: ['get-company'],
        queryFn: async (): Promise<any> => {
          return await api
            .get('/company')
            .then((res) => {
              if (!res.data.success) {
                throw new Error(res.data.message);
              }
              return res.data.data;
            })
            .catch((err) => {
              throw err;
            });
        },
      },
      {
        queryKey: ['get-department'],
        queryFn: async (): Promise<any> => {
          return await api
            .get('/department')
            .then((res) => {
              if (!res.data.success) {
                throw new Error(res.data.message);
              }
              return res.data.data;
            })
            .catch((err) => {
              throw err;
            });
        },
      },
      {
        queryKey: ['get-plant'],
        queryFn: async (): Promise<any> => {
          return await api
            .get('/plant')
            .then((res) => {
              if (!res.data.success) {
                throw new Error(res.data.message);
              }
              return res.data.data;
            })
            .catch((err) => {
              throw err;
            });
        },
      },
    ],
  });

  const [file, setFile] = useState<File[] | null>([]);

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectField
              control={form.control}
              name="company"
              label="Company"
              options={
                company.data
                  ? company.data.map((i: any) => ({
                      value: i._id,
                      label: i.name,
                    }))
                  : []
              }
            />

            <SelectField
              control={form.control}
              name="department"
              label="Department"
              options={
                department.data
                  ? department.data.map((i: any) => ({
                      value: i._id,
                      label: i.name,
                    }))
                  : []
              }
            />

            <SelectField
              control={form.control}
              name="category"
              label="Project Category"
              options={['Black Belt', 'Green Belt', 'SITG'].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <SelectField
              control={form.control}
              name="year"
              label="Year"
              options={Array.from(
                { length: 20 },
                (_, i) => `${new Date().getFullYear() - i}-${new Date().getFullYear() - i + 1}`,
              ).map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <FormFieldInput
              control={form.control}
              name="project_title"
              label="Project Title"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="Baseline"
              label="Baseline"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="Target"
              label="Target"
              className="col-span-1"
            />
            <FormFieldInput control={form.control} name="Result" label="Result" />
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
