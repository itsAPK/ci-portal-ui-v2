import { DatePickerWrapper } from '@/components/date-picker-wrapper';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { categories } from '@/lib/data';
import { CumulativeArchive, CumulativeArchiveSchema, cumulativeArchiveSchema } from '@/schema/archive';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertTriangle, Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CumulativeArchiveFormProps {
  onSubmit: (data: CumulativeArchiveSchema) => Promise<void>;
  defaultValues?: CumulativeArchiveSchema;
}

export const CumulativeArchiveForm = ({ onSubmit, defaultValues }: CumulativeArchiveFormProps) => {
  const form = useForm<any>({
    resolver: zodResolver(cumulativeArchiveSchema),
    defaultValues,
  });


  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 py-4">
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

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="projects"
            label="Number of Projects"
            type="number"
          />
        </div>

        <div className="col-span-1">
          <FormFieldInput
            control={form.control}
            name="cumulative"
            label="Cumulative"
            type="number"
          />
        </div>

       


       
      
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
