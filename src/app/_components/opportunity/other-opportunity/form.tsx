import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
  FileUploadText,
} from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { categories } from '@/lib/data';
import { calculateImpactScore, cn, opportunityCategories } from '@/lib/utils';
import { opportunitySchema, OpportunitySchema } from '@/schema/opportunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueries } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { AlertTriangle, Loader2, Paperclip } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { IndianNumberInput } from '@/components/indian-number-input';
import { DatePickerWrapper } from '@/components/date-picker-wrapper';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AutoComplete } from '@/components/ui/autocomplete';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

interface OpportunityFormProps {
  defaultValues?: Partial<OpportunitySchema>;
  onSubmit: (data: OpportunitySchema) => void;
  setImpactScore: React.Dispatch<React.SetStateAction<number>>;
  mode?: 'create' | 'update';
  file?: File[] | null;
  setFile?: React.Dispatch<React.SetStateAction<File[] | null>>;
  projectLeader: any | undefined;
  setProjectLeader: React.Dispatch<React.SetStateAction<any | undefined>>;
}

export const OpportunityForm = ({
  defaultValues,
  onSubmit,
  setImpactScore,
  mode = 'create',
  file,
  setFile,
  projectLeader,
  setProjectLeader,
}: OpportunityFormProps) => {
  const form = useForm<OpportunitySchema>({
    defaultValues: {
      ...defaultValues,
      category: 'Black Belt',
    },
    resolver: zodResolver(opportunitySchema),
  });
  const [category, setCategory] = useState<string>(defaultValues?.category ?? 'Black Belt');
  console.log(form.formState.errors);
  // Watch relevant form fields

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


  const [company, department, plant, bussinessUnit] = useQueries({
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
      {
        queryKey: ['get-bussiness-unit'],
        queryFn: async (): Promise<any> => {
          return await api
            .get('/bussiness-unit')
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
      // {
      //   queryKey: ['get-employee-by-role'],
      //   queryFn: async (): Promise<any> => {
      //     return await api
      //       .post('/employee/export', {
      //         filter: [
      //           {
      //             $match: {
      //               role: {
      //                 $in: ['project_leader', 'ci_head', 'ci_team', 'cs_head', 'lof', 'admin'],
      //               },
      //             },
      //           },
      //         ],
      //       })
      //       .then((res) => {
      //         if (!res.data.success) {
      //           throw new Error(res.data.message);
      //         }
      //         return res.data.data.data;
      //       })
      //       .catch((err) => {
      //         throw err;
      //       });
      //   },
      // },
    ],
  });

  const role = getCookie('ci-portal.role');

  return (
    <FormWrapper
      form={form}
      onSubmit={form.handleSubmit((data: OpportunitySchema) => {
        onSubmit(data);
        setImpactScore(0);
      })}
    >
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectField
              control={form.control}
              name="company"
              label="Company"
              disabled={mode === 'update' || role !== 'admin'}
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
              name="bussiness_unit"
              label="Division"
              disabled={mode === 'update' || role !== 'admin'}
              options={
                bussinessUnit.data
                  ? bussinessUnit.data.map((i: any) => ({
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
              disabled={mode === 'update' || role !== 'admin'}
              options={
                plant.data
                  ? plant.data.map((i: any) => ({
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
              disabled={mode === 'update' || role !== 'admin'}
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
              name="category"
              label="Project Category"
              onChange={(e) => {
                setCategory(e);
              }}
              options={categories
                .filter((i: any) => i !== 'Black Belt')
                .map((i: any) => ({
                  value: i,
                  label: i,
                }))}
            />

            {['Green Belt', 'Kaizen', 'Poka-Yoke', '3M'].includes(category) && (
              <SelectField
                control={form.control}
                name="sub_category"
                label={
                  category === 'Green Belt'
                    ? 'Greenbelt Category'
                    : category === 'Kaizen'
                      ? 'Kaizen Category'
                      : category === 'Poka-Yoke'
                        ? 'Poka-Yoke Type'
                        : category === '3M'
                          ? '3M Category'
                          : 'Sub Category'
                }
                options={
                  category === 'Green Belt'
                    ? ['Problem Solving', 'Optimisation'].map((i: any) => ({
                        value: i,
                        label: i,
                      }))
                    : category === 'Kaizen'
                      ? ['Restorative', 'Renovative', 'Innovative', 'Breakthrough'].map(
                          (i: any) => ({
                            value: i,
                            label: i,
                          }),
                        )
                      : category === 'Poka-Yoke'
                        ? ['Alarm', 'Shutdown', 'Control'].map((i: any) => ({
                            value: i,
                            label: i,
                          }))
                        : category === '3M'
                          ? ['Muri (Overburden)', 'Mura (Unevenness)', 'Muda (Waste)'].map(
                              (i: any) => ({
                                value: i,
                                label: i,
                              }),
                            )
                          : []
                }
              />
            )}
            <DatePickerWrapper
              control={form.control}
              name="start_date"
              label="Start Date"
              disabled={mode === 'update'}
            />
            <DatePickerWrapper
              control={form.control}
              name="end_date"
              label="Completed"
              disabled={mode === 'update'}
            />

            <FormFieldInput
              control={form.control}
              name="statement"
              disabled={mode === 'update'}
              label="Problem Statement"
              className="col-span-1"
            />

            <SelectField
              control={form.control}
              name="expected_savings"
              disabled={mode === 'update'}
              label="Expected Savings (in Lakh)"
              options={opportunityCategories.expected_savings.map((i: any) => ({
                value: i.name,
                label: i.name,
              }))}
            />

            <div
              className={cn(
                ['Green Belt', 'Kaizen', 'Poka-Yoke', '3M'].includes(category)
                  ? 'col-span-2 w-full'
                  : 'col-span-1',
              )}
            >
              {' '}
              <Controller
                name="estimated_savings"
                control={form.control}
                rules={{ required: 'Estimated Savings (in Lakh) is required' }}
                render={({ field }) => (
                  <IndianNumberInput
                    label="Estimated Savings (in Lakh)"
                    placeholder="Enter Estimated Savings (in Lakh)"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-2">
                <Label className="-mb-1 px-2">Project Leader</Label>
                 <Popover modal>
          <PopoverTrigger asChild>
            <button
              type="button"
              role="combobox"
              className={cn(
                'flex h-12 items-center rounded-md border border-primary bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-[#099bab] focus-visible:ring-1 focus-visible:ring-[#099bab] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              {projectLeader ? projectLeader.label : ''}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="h-full w-full bg-white">
            <AutoComplete
              options={
                employee.data
                  ? employee.data.map((i: any) => ({
                      value: String(i._id.$oid),
                      label: `${i.employee_id} | ${i.name} (${i.designation && i.designation.split('-')[0]} - ${i.department})`,
                    }))
                  : []
              }
              onSearch={async (e) => setTimeout(async () =>await employee.mutateAsync(e),1000)}
              value={projectLeader}
              emptyMessage="No Employee Found."
              isLoading={employee.isPending}
              onValueChange={(e : any) => {
                setProjectLeader(e);
              }}
            />
          </PopoverContent>
        </Popover>
             
            </div>
            {
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
                      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
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
            }
          </div>
          <div className="flex justify-end pt-5">
            <Button type="submit" size="lg" className="w-[200px] gap-3">
              {form.formState.isSubmitting && <Loader2 className="h-4 w-4" />} Submit
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
