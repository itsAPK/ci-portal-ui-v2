import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm, useWatch } from 'react-hook-form';
import { EmployeeSchema, employeeSchema } from '@/schema/employee';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectField } from '@/components/select-field-wrapper';
import api from '@/lib/api';
import { useMutation, useQueries } from '@tanstack/react-query';
import { DatePickerWrapper } from '@/components/date-picker-wrapper';

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeSchema>;
  onSubmit: (data: EmployeeSchema) => void;
  mode?: 'add' | 'edit';
}

export const EmployeeForm = ({ defaultValues, onSubmit, mode = 'add' }: EmployeeFormProps) => {
  const form = useForm<any>({
    defaultValues,
    resolver: zodResolver(employeeSchema),
  });

  const [company, department, bussinessUnit, plant] = useQueries({
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
      {
        queryKey: ['get-plant'],
        queryFn: async (): Promise<any> => {
          return await api
            .get('/plant/')
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

 

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormFieldInput
              control={form.control}
              name="employee_id"
              label="Employee ID"
              placeholder="Enter Employee ID"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter Name"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter Email"
              className="col-span-1"
            />
            <SelectField
              control={form.control}
              name="role"
              label="Role"
              placeholder="Select Role"
              options={[
                'Admin',
                'Employee',
                'Project Leader',
                'HOD',
                'LOF',
                'CS Head',
                'CI Head',
                "CI Team"
              ].map((i: any) => ({
                value: i.replace(' ', '_').toLowerCase(),
                label: i,
              }))}
            />
            <div className="col-span-2 grid grid-cols-1 gap-3 md:grid-cols-3">
              <SelectField
                control={form.control}
                name="company"
                label="Company"
                placeholder="Select Company"
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
                placeholder="Select Division"
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
                placeholder="Select Plant"
                options={
                  plant.data
                    ? plant.data.map((i: any) => ({
                        value: i.name,
                        label: i.name,
                      }))
                    : []
                }
              />
            </div>
            <SelectField
              control={form.control}
              name="department"
              label="Department"
              placeholder="Select Department"
              options={
                department.data
                  ? department.data.map((i: any) => ({
                      value: i.name,
                      label: i.name,
                    }))
                  : []
              }
            />
            <FormFieldInput
              control={form.control}
              name="grade"
              label="Grade"
              placeholder="Enter Grade"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="designation"
              label="Designation"
              placeholder="Enter Designation"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="working_location"
              label="Working Location"
              placeholder="Enter Working Location"
              className="col-span-1"
            />
            {/* <DatePickerWrapper
              control={form.control}
              name="date_of_birth"
              label="Date of Birth"
              placeholder="Pick Date of Birth"
            />

            <DatePickerWrapper
              control={form.control}
              name="date_of_joining"
              label="Date of Joining"
              placeholder="Pick Date of Joining"
            /> */}
          </div>
          <div className="flex justify-center py-10">
            <Button type="submit" size="lg" className="w-[200px] gap-2">
              {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Submit
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
