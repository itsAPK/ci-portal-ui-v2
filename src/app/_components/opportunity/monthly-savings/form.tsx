import { DatePickerWrapper } from '@/components/date-picker-wrapper';
import { FormWrapper } from '@/components/form-wrapper';
import { IndianNumberInput } from '@/components/indian-number-input';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MonthlySavingsSchema, monthlySavingsSchema } from '@/schema/opportunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

export interface MonthlySavingsFormProps {
  defaultValues?: Partial<MonthlySavingsSchema>;
  onSubmit: (data: MonthlySavingsSchema) => void;
}
export const MonthlySavingsForm = ({ defaultValues, onSubmit }: MonthlySavingsFormProps) => {
  const form = useForm<MonthlySavingsSchema>({
    defaultValues,
    resolver: zodResolver(monthlySavingsSchema),
  });
  return (
    <FormWrapper
      form={form}
      onSubmit={form.handleSubmit((data: MonthlySavingsSchema) => {
        onSubmit(data);
      })}
    >
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className={cn('grid grid-cols-3 gap-6')}>
            <SelectField
              control={form.control}
              name="year"
              label="Year"
              options={[
                ...Array.from({ length: 21 }, (_, i) => String(new Date().getFullYear() + i -1 )),
              ].map((year) => ({ label: String(year), value: year }))}
            />
            <SelectField
              control={form.control}
              name="month"
              label="Month"
              options={[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ].map((year) => ({ label: String(year), value: String(year) }))}
            />
            <Controller
              name="savings"
              control={form.control}
              rules={{ required: 'required' }}
              render={({ field }) => (
                <IndianNumberInput label="Savings (in Lakh)" placeholder="" {...field} />
              )}
            />
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
