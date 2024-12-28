import { DatePickerWrapper } from '@/components/date-picker-wrapper';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { categories } from '@/lib/data';
import { Training, TrainingSchema, trainingSchema } from '@/schema/training';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertTriangle, Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface TrainingFormProps {
  onSubmit: (data: TrainingSchema) => Promise<void>;
  defaultValues?: TrainingSchema;
  mode?: 'create' | 'update';
}

export const TrainingForm = ({ onSubmit, defaultValues, mode = 'create' }: TrainingFormProps) => {
  const form = useForm<any>({
    resolver: zodResolver(trainingSchema),
    defaultValues,
  });

  const [employeeId, setEmployeeId] = useState<string>();
   console.log(employeeId);
  const employee = useMutation({
    mutationKey: ['get-employee-by-id'],
    mutationFn: async () => {
      if (!employeeId) throw new Error('Employee ID is required');
      const res = await api.get(`/employee/by-id/${employeeId}`);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      form.setValue('employee_id', res.data.data.employee_id);
      form.setValue('name', res.data.data.name);
      form.setValue('department', res.data.data.department);
      form.setValue('grade', res.data.data.grade);
      form.setValue('working_location', res.data.data.working_location);
      form.setValue('bussiness_unit', res.data.data.bussiness_unit);
      form.setValue('plant', res.data.data.plant);
      form.setValue('company', res.data.data.company);
      return res.data.data;
    },
    // @ts-ignore
    onError: (error: any) => {
      toast.error(error.response.data.detail.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Employee data fetched successfully');
    },
  });

  const handleSearch = async (event: React.MouseEvent) => {
    event.preventDefault();
    const searchId = employeeId;
    if (searchId) {
      setEmployeeId(searchId);
      employee.mutateAsync();
    } else {
      toast.error('Employee ID is required to search');
    }
  };

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-4">
        {mode === 'create' ? <div className="col-span-1 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2">
            <Label className="col-span-1">Employee ID</Label>
          <Input
              placeholder="Search By Employee ID"
              type="text"
              className="col-span-2 mt-[5px] border-primary bg-gray-100"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            /></div>
               <div className="relative col-span-1 flex ">
          <Button size='lg' className=" mt-8  rounded-full hover:shadow-lg" type='button' onClick={handleSearch}>
            {employee.isPending ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <span>Search</span>
            )}
          </Button>
        </div>
        </div> :  <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="employee_id"
            label="Employee ID"
            placeholder="Enter Employee ID"
            type="text"
            
            disabled
          />
        </div>}
      

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="name"
            label="Employee Name"
            placeholder="Enter Employee Name"
            type="text"
            
            disabled
          />
        </div>

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="grade"
            label="Grade"
            placeholder="Enter Grade"
            type="text"
            disabled
          />
        </div>

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="company"
            label="Company"
            placeholder="Enter Company"
            type="text"
            disabled
          />
        </div>
        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="bussiness_unit"
            label="Bussiness Unit"
            placeholder="Enter Bussiness Unit"
            type="text"
            disabled
          />
        </div>

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="plant"
            label="Plant"
            placeholder="Enter Plant"
            type="text"
            disabled
          />
        </div>

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="department"
            label="Department"
            placeholder="Enter Department"
            type="text"
            disabled
          />
        </div>

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="working_location"
            label="Working Location"
            placeholder="Enter Working Location"
            type="text"
            disabled
          />
        </div>
        <div className="col-span-1">
            <SelectField
              control={form.control}
              name="category"
              label="Category"
              placeholder="Select Category"
              options={categories.map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
        </div>
        <div className="col-span-1">
          <SelectField
            control={form.control}
            name="batch"
            label="Batch"
            placeholder="Select Batch"
            options={Array.from({ length: 20 }, (_, i) => `${new Date().getFullYear() - i}`).map(
              (i: any) => ({
                value: i,
                label: i,
              }),
            )}
          />
        </div>
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
          name="trainer"
          label="Trainer"
          placeholder="Enter Trainer"
          type="text"
        />
      </div>

      <div className="flex justify-center px-3 pb-10 lg:justify-end">
        <Button type="submit" className="rounded-full hover:shadow-lg">
          {form.formState.isSubmitting ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </div>
    </FormWrapper>
  );
};
