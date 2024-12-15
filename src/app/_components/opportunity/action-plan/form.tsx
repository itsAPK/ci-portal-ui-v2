import { DatePickerWrapper } from '@/components/date-picker-wrapper';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { actionPlanSchema, ActionPlanSchema } from '@/schema/opportunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

export interface ActionPlanFormProps {
  defaultValues?: Partial<ActionPlanSchema>;
  onSubmit: (data: ActionPlanSchema) => void;
  mode?: 'create' | 'update';
}
export const ActionPlanForm = ({
  defaultValues,
  onSubmit,
  mode = 'create',
}: ActionPlanFormProps) => {
  const form = useForm<ActionPlanSchema>({
    defaultValues,
    resolver: zodResolver(actionPlanSchema),
  });
  return (
    <FormWrapper
      form={form}
      onSubmit={form.handleSubmit((data: ActionPlanSchema) => {
        onSubmit(data);
      })}
    >
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div
            className={cn(
              'grid grid-cols-1 gap-6',
              mode === 'create' ? 'md:grid-cols-1' : 'md:grid-cols-2',
            )}
          >
            <FormFieldInput
              control={form.control}
              name="action"
              label="Action"
              className="col-span-1"
            />
            <DatePickerWrapper control={form.control} name="target_date" label="Target Date" />
            {mode === 'update' && (
              <>
                <FormFieldInput
                  control={form.control}
                  name="findings"
                  label="Findings"
                  className="col-span-1"
                />
                <SelectField
                  control={form.control}
                  name="status"
                  label="Status"
                  options={['In Process', 'Completed', 'Referred', 'For Info'].map((i: any) => ({
                    value: i,
                    label: i,
                  }))}
                />
              </>
            )}
          </div>
          <div className="flex justify-end pt-5">
          <Button type="submit" size="lg" className="w-[200px] gap-2">
            {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Submit
          </Button>
        </div>
        </div>
       
      </div>
    </FormWrapper>
  );
};
