import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { useForm } from 'react-hook-form';

interface ToolsFormProps {
  defaultValues?: Partial<any>;
  onSubmit: (data: any) => void;
}

export const ToolsForm = ({ defaultValues, onSubmit }: ToolsFormProps) => {
  const form = useForm<any>({
    defaultValues,
  });
  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormFieldInput
              control={form.control}
              name="name"
              label="Name"
              className="col-span-1"
            />
            <FormFieldInput
              control={form.control}
              name="category"
              label="Category"
              className="col-span-1"
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
