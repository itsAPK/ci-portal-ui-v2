import { Card, CardContent, CardFooter } from '@/components/ui/card';
import requestPlant from './request-plant';
import { RequestPlantTable } from './table';
import { useForm } from 'react-hook-form';
import { getCookie } from 'cookies-next';
import { FormWrapper } from '@/components/form-wrapper';
import { SelectField } from '@/components/select-field-wrapper';
import api from '@/lib/api';
import { useMutation, useQueries } from '@tanstack/react-query';
import { FormFieldInput } from '@/components/input-field';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { requestPlantSchema, RequestPlantSchema } from '@/schema/employee';
import { zodResolver } from '@hookform/resolvers/zod';
export const RequestPlantForm = () => {
  const form = useForm<RequestPlantSchema>({
    defaultValues: {
      employee_id: getCookie('ci-portal.user_id') as string,
      requested_plant_id: undefined,
      current_plant_id: getCookie('ci-portal.plant') as string,
    },
    resolver: zodResolver(requestPlantSchema),
  });

  const requestPlant = useMutation({
    mutationKey: ['request-plant'],
    mutationFn: async (data: RequestPlantSchema) => {
      if (data.requested_plant_id !== '') {
        const res = await api.post('/employee/plant-change', {
          employee_id: data.employee_id,
          requested_plant_id: data.requested_plant_id,
        });
        if (!res.data.success) throw new Error(res.data.message);
        return res.data;
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        icon: <AlertTriangle className="h-4 w-4" />,
      });
    },
    onSuccess: () => {
      toast.success('Requested Plant/Division Change Successfully', {
        icon: <CheckCircle className="h-4 w-4" />,
      });
    },
  });

  const [plant] = useQueries({
    queries: [
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
  const onSubmit = async (data: RequestPlantSchema) => {
    await requestPlant.mutateAsync(data);
  };
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-background">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Request Plant/Division Change</div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <div className="w-full">
            <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldInput
                control={form.control}
                name="current_plant_id"
                label="Current Plant"
                className="col-span-1"
                disabled
              />
              <SelectField
                control={form.control}
                name="requested_plant_id"
                label="New Plant"
                className="col-span-2"
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
              <CardFooter className="flex justify-end p-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-[200px]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </CardFooter>{' '}
            </FormWrapper>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
