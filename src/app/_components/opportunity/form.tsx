import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { opportunitySchema, OpportunitySchema } from '@/schema/opportunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueries } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface OpportunityFormProps {
  defaultValues?: Partial<OpportunitySchema>;
  onSubmit: (data: OpportunitySchema) => void;
}

export const OpportunityForm = ({ defaultValues, onSubmit }: OpportunityFormProps) => {
  const form = useForm<OpportunitySchema>({
    defaultValues,
    resolver: zodResolver(opportunitySchema),
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

            <FormFieldInput
              control={form.control}
              name="business_unit"
              label="Business Unit"
              className="col-span-1"
            />
            <SelectField
              control={form.control}
              name="plant"
              label="Plant"
              placeholder="Select Plant"
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
              name="project_type"
              
              label="Project Type"
              options={['Type-1', 'Type-2', 'Type-3'].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />

            <FormFieldInput
              control={form.control}
              name="problem_statement"
              label="Problem Statement"
              className="col-span-2"
            />

            <SelectField
              control={form.control}
              name="nature_of_work"
              label="Nature of Work"
              options={[
                'Problem Solving',
                'Process Optimization',
                'Innovation',
                'Perceived Quality',
              ].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <SelectField
              control={form.control}
              name="impact_on_internal"
              label="Impact on Internal Customer"
              options={[
                'Low',
                'Medium',
                'High',
                'Very High',
                'Extremely High',
                'Not Applicable',
              ].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <SelectField
              control={form.control}
              name="impact_on_external"
              label="Impact on External Customer"
              options={[
                'Low',
                'Medium',
                'High',
                'Very High',
                'Extremely High',
                'Not Applicable',
              ].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <SelectField
              control={form.control}
              name="data_oriented_analysis"
              label="Data Oriented Analysis"
              options={['No Data', 'Less Data', 'Medium Data', 'Data Intensive'].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <SelectField
              control={form.control}
              name="cross_functional_rating"
              label="Cross Functional Rating"
              options={['Low', 'Medium', 'High', 'Very High', 'Extremely High'].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <SelectField
              control={form.control}
              name="estimated_savings"
              label="Expected Savings (in Lakh)"
              options={[
                '<= 1 Lakh',
                '>1 and <=5 Lakh',
                '>5 and <=10 Lakh',
                '>10 and <=20 Lakh',
                '>20 Lakh',
              ].map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
          </div>
          <div className='flex justify-end pt-5'>
          <Button type="submit" size="lg" className='w-[200px]'>Submit</Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
