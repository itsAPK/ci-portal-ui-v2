import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { Button } from '@/components/ui/button';
import { DepartmentSchema, departmentSchema } from '@/schema/portal-management';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
export interface DepartmentFormProps {
  defaultValues?: Partial<DepartmentSchema>;
  onSubmit: (data: DepartmentSchema) => void;
}

export const DepartmentForm = ({ defaultValues, onSubmit }: DepartmentFormProps) => {
  const form = useForm<any>({
    defaultValues,
    resolver: zodResolver(departmentSchema),
  });

  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <FormFieldInput
              control={form.control}
              name="department_code"
              label="Department Code"
              placeholder="Enter Department Code"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="name"
              label="Department Name"
              placeholder="Enter Department Name"
              className="col-span-1"
            />
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
