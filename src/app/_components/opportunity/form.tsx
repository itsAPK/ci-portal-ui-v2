import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { categories } from '@/lib/data';
import { calculateImpactScore, cn, opportunityCategories } from '@/lib/utils';
import { opportunitySchema, OpportunitySchema } from '@/schema/opportunity';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueries } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

interface OpportunityFormProps {
  defaultValues?: Partial<OpportunitySchema>;
  onSubmit: (data: OpportunitySchema) => void;
  setImpactScore: React.Dispatch<React.SetStateAction<number>>;
}

export const OpportunityForm = ({
  defaultValues,
  onSubmit,
  setImpactScore,
}: OpportunityFormProps) => {
  const form = useForm<OpportunitySchema>({
    defaultValues,
    resolver: zodResolver(opportunitySchema),
  });
  const [category, setCategory] = useState<string>(defaultValues?.category ?? 'Black Belt');
console.log(form.formState.errors);
  // Watch relevant form fields
  const [
    baseline,
    cross_functional_rating,
    data_analysis,
    external_customer,
    internal_customer,
    project_type,
    project_nature,
    expected_savings,
  ] = useWatch({
    control: form.control,
    name: [
      'baseline',
      'cross_ratio',
      'data_analysis',
      'external_customer_impact',
      'internal_customer_impact',
      'project_type',
      'project_nature',
      'expected_savings',
    ],
  });

  const impactScore = useMemo(() => {
    return calculateImpactScore({
      baseline,
      cross_functional_rating,
      data_analysis,
      external_customer,
      internal_customer,
      project_type,
      project_nature,
      expected_savings,
    });
  }, [
    baseline,
    cross_functional_rating,
    data_analysis,
    external_customer,
    internal_customer,
    project_type,
    project_nature,
    expected_savings,
  ]);

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
    ],
  });

  return (
    <FormWrapper
      form={form}
      onSubmit={form.handleSubmit((data: OpportunitySchema) => {
        onSubmit(data);
        setImpactScore(impactScore);
      })}
    >
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
              name="bussiness_unit"
              label="Business Unit"
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
              name="category"
              label="Project Category"
              onChange={(e) => {
                setCategory(e);
              }}
              options={categories.map((i: any) => ({
                value: i,
                label: i,
              }))}
            />
            <FormFieldInput
              control={form.control}
              name="statement"
              label="Problem Statement"
              className="col-span-1"
            />
            {category === 'Black Belt' && (
              <>
                <SelectField
                  control={form.control}
                  name="project_type"
                  label="Project Type"
                  options={opportunityCategories.project_type.map((i: any) => ({
                    value: i.name,
                    label: i.name,
                  }))}
                />

                <SelectField
                  control={form.control}
                  name="project_nature"
                  label="Nature of Project"
                  options={opportunityCategories.project_nature.map((i: any) => ({
                    value: i.name,
                    label: i.name,
                  }))}
                />
                <SelectField
                  control={form.control}
                  name="internal_customer_impact"
                  label="Impact on Internal Customer"
                  options={opportunityCategories.internal_customer.map((i: any) => ({
                    value: i.name,
                    label: i.name,
                  }))}
                />
                <SelectField
                  control={form.control}
                  name="external_customer_impact"
                  label="Impact on External Customer"
                  options={opportunityCategories.external_customer.map((i: any) => ({
                    value: i.name,
                    label: i.name,
                  }))}
                />
                <SelectField
                  control={form.control}
                  name="data_analysis"
                  label="Data Oriented Analysis"
                  options={opportunityCategories.data_analysis.map((i: any) => ({
                    value: i.name,
                    label: i.name,
                  }))}
                />
                <SelectField
                  control={form.control}
                  name="cross_ratio"
                  label="Cross Functional Rating"
                  options={opportunityCategories.cross_function_rating.map((i: any) => ({
                    value: i.name,
                    label: i.name,
                  }))}
                />
              </>
            )}
            <SelectField
              control={form.control}
              name="expected_savings"
              label="Expected Savings (in Lakh)"
              options={opportunityCategories.expected_savings.map((i: any) => ({
                value: i.name,
                label: i.name,
              }))}
            />
            {project_nature === 'Problem Solving' && (
              <SelectField
                control={form.control}
                name="baseline"
                label="Baseline"
                options={opportunityCategories.baseline.map((i: any) => ({
                  value: i.name,
                  label: i.name,
                }))}
              />
            )}
            {
              <div
                className={cn(project_nature === 'Problem Solving' ? 'col-span-2' : 'col-span-1')}
              >
                <Label>Project Impact Score</Label>
                <Card
                  className={cn(
                    'mt-2 h-12 w-full',
                    impactScore >= 80
                      ? 'border-green-500 bg-green-500/20'
                      : impactScore >= 60 && impactScore < 80
                        ? 'border-yellow-500 bg-yellow-500/20'
                        : impactScore < 60
                          ? impactScore >= 40 && impactScore < 60
                            ? 'border-red-500 bg-red-500/20'
                            : 'border-gray-300 bg-gray-300/20'
                          : null,
                  )}
                >
                  <CardContent className="flex items-center justify-center pt-2 text-xl font-bold">
                    <div className="text-center">{impactScore}</div>
                  </CardContent>
                </Card>
              </div>
            }
          </div>
          <div className="flex justify-end pt-5">
            <Button type="submit" size="lg" className="w-[200px] gap-3">
         {form.formState.isSubmitting && <Loader2 className=" h-4 w-4" />}  Submit
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
