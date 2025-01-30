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
import { ArchiveSchema, archiveSchema } from '@/schema/archive';
import api from '@/lib/api';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, FileIcon, Loader2, Paperclip } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { categories } from '@/lib/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FileUploader,
  FileUploadText,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from '@/components/ui/file-upload';
import { AutoComplete } from '@/components/ui/autocomplete';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';

export const AddArchive = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [file, setFile] = useState<File[] | null>([]);
  const [employeeId, setEmployeeId] = useState<any>();

  const form = useForm<ArchiveSchema>({
    resolver: zodResolver(archiveSchema),
  });

  console.log(form.formState.errors);
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

  const queryClient = useQueryClient();

  const addArchive = useMutation({
    mutationKey: ['add-archive'],
    mutationFn: async (data: ArchiveSchema) => {
      const formData = new FormData();
      if (!file || file.length === 0) {
        throw new Error('Please select a file');
      }
      formData.append('file', file[0]!);
      formData.append('archive', JSON.stringify(data)); // sending as string (this is fine)

      return await api.post('/archive', formData).then((res) => {
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
      toast.success('Archive added successfully', {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
      queryClient.refetchQueries({
        queryKey: ['get-archive'],
      });
      setOpen(false);
    },
  });

  const onSubmit = async (data: ArchiveSchema) => {
    await addArchive.mutateAsync(data);
  };

  const employee = useMutation({
    mutationKey: ['get-employee'],
    mutationFn: async (search: string) => {
      return await api
        .post(`/employee/export`, {
          filter: [
            {
              $match: {
                $or: [
                  { employee_id: { $regex: search, $options: 'i' } },
                  { name: { $regex: search, $options: 'i' } },
                ],
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) throw new Error(res.data.message);
          return res.data.data.data;
        });
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {},
  });

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <RiAddCircleFill className="mr-2 h-4 w-4" /> Upload Archive
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-xl h-[90vh] max-w-[805px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Archive</DialogTitle>
        </DialogHeader>
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
                          value: i.name,
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
                          value: i.name,
                          label: i.name,
                        }))
                      : []
                  }
                />

                <SelectField
                  control={form.control}
                  name="plant"
                  label="Plant"
                  options={
                    plant.data
                      ? plant.data.map((i: any) => ({
                          value: i.name,
                          label: i.name,
                        }))
                      : []
                  }
                />

              

<FormField
                  control={form.control}
                  name={'project_leader'}
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Project Leader</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              role="combobox"
                              className={cn(
                                'flex h-12 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-[#099bab] focus-visible:ring-1 focus-visible:ring-[#099bab] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                              )}
                            >
                              {employeeId ? employeeId.label : ''}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="h-full w-full bg-white">
                          <AutoComplete
                            options={
                              employee.data
                                ? employee.data.map((i: any) => ({
                                    value: String(i._id.$oid),
                                    label: `${i.employee_id} | ${i.name} | (${i.designation && i.designation.split('-')[0]} - ${i.department})`,
                                  }))
                                : []
                            }
                            onSearch={async (e) => await employee.mutateAsync(e)}
                            value={employeeId}
                            emptyMessage="No Employee Found."
                            isLoading={employee.isPending}
                            onValueChange={(e) => {
                              setEmployeeId(e);
                              field.onChange(e.value);
                            }}
                          />
                        </PopoverContent>
                      </Popover>{' '}
                    </FormItem>
                  )}
                />

                <SelectField
                  control={form.control}
                  name="category"
                  label="Project Category"
                  options={categories.map((i: any) => ({
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
                  name="baseline"
                  label="Baseline"
                  className="col-span-1"
                />
                <FormFieldInput
                  control={form.control}
                  name="target"
                  label="Target"
                  className="col-span-1"
                />
                <FormFieldInput control={form.control} name="result" label="Result" />
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
            <Button type="submit" size="lg" className="w-[200px] gap-2">
              {addArchive.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Submit
            </Button>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};
