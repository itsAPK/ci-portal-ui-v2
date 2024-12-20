import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '@/components/form-wrapper';
import { SelectField } from '@/components/select-field-wrapper';
import api from '@/lib/api';
import { useMutation, useQueries } from '@tanstack/react-query';
import { AssignCIHeadSchema, assignCIHeadSchema, Employee } from '@/schema/employee';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export const AssignCIHead = () => {
  const form = useForm<AssignCIHeadSchema>({
    resolver: zodResolver(assignCIHeadSchema),
  });
  const [plant, employee] = useQueries({
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
      {
        queryKey: ['get-employee-by-role'],
        queryFn: async (): Promise<any> => {
          return await api
            .post('/employee/export', {
              filter: [
                {
                  $match: {
                    role: {
                      $in: ['hod', 'ci_head', 'ci_team', 'cs_head', 'lof'],
                    },
                  },
                },
              ],
            })
            .then((res) => {
              if (!res.data.success) {
                throw new Error(res.data.message);
              }
              return res.data.data.data;
            })
            .catch((err) => {
              throw err;
            });
        },
      },
    ],
  });

  

  const assignCIHead = useMutation({
    mutationKey: ['assign-ci-head'],
    mutationFn: async (data: AssignCIHeadSchema) => {
      return await api.post('/plant/assign-ci-head', data);
    },
    onSuccess: (data) => {
      toast.success('CI Roles Assigned Successfully');
      plant.refetch();
    },
    onError: (err: any) => {
      toast.error(err.response.data.detail.message);
    },
  });

  const onSubmit = async (data: AssignCIHeadSchema) => {
    await assignCIHead.mutateAsync(data);
    console.log(data)
  };

  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-background">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Assign CI Head</div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <FormWrapper form={form} onSubmit={() => form.handleSubmit(onSubmit)}>
            <div className="grid h-full grid-cols-1">
              <div className="col-span-4 px-2 py-1 md:px-7">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <SelectField
                    control={form.control}
                    name="plant_id"
                    label="Plant"
                    className="col-span-1"
                    placeholder="Select Plant"
                    onChange={async (e) => {
                      const p = plant.data.find((i: any) => i._id === e);
                      form.setValue('ci_head', p.ci_head ? p.ci_head._id : "");
                      form.setValue('ci_team', p.ci_team ? p.ci_team._id : "");
                      form.setValue('cs_head', p.cs_head ? p.cs_head._id : "");
                      form.setValue('lof', p.lof ? p.lof._id : "");
                      form.setValue('hod', p.hod ? p.hod._id : "");
                    }}
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
                    name="ci_head"
                    label="CI Head"
                    className="col-span-1"
                    placeholder="Select CI Head"
                    options={
                      employee.data && employee.data.length > 0
                        ? employee.data
                            .filter((k: Employee) => k.role === 'ci_head')
                            .map((i: any) => ({
                              value: i._id.$oid,
                              label: `${i.employee_id} - ${i.name}`,
                            }))
                        : []
                    }
                  />
                  <SelectField
                    control={form.control}
                    name="hod"
                    label="HOD"
                    className="col-span-1"
                    placeholder="Select HOD"
                    options={
                      employee.data && employee.data.length > 0
                        ? employee.data
                            .filter((k: Employee) => k.role === 'hod')
                            .map((i: any) => ({
                              value:i._id.$oid,
                              label: `${i.employee_id} - ${i.name}`,
                            }))
                        : []
                    }
                  />
                  <SelectField
                    control={form.control}
                    name="lof"
                    label="LOF"
                    className="col-span-1"
                    placeholder="Select LOF"
                    options={
                      employee.data && employee.data.length > 0
                        ? employee.data
                            .filter((k: Employee) => k.role === 'lof')
                            .map((i: any) => ({
                              value:i._id.$oid,
                              label: `${i.employee_id} - ${i.name}`,
                            }))
                        : []
                    }
                  />
                  <SelectField
                    control={form.control}
                    name="cs_head"
                    label="CS Head"
                    className="col-span-1"
                    placeholder="Select CS Head"
                    options={
                      employee.data && employee.data.length > 0
                        ? employee.data
                            .filter((k: Employee) => k.role === 'cs_head')
                            .map((i: any) => ({
                              value: i._id.$oid,
                              label: `${i.employee_id} - ${i.name}`,
                            }))
                        : []
                    }
                  />
                  <SelectField
                    control={form.control}
                    name="ci_team"
                    label="CI Team"
                    className="col-span-1"
                    placeholder="Select CI Team"
                    options={
                      employee.data && employee.data.length > 0
                        ? employee.data
                            .filter((k: Employee) => k.role === 'ci_team')
                            .map((i: any) => ({
                              value: i._id.$oid,
                              label: `${i.employee_id} - ${i.name}`,
                            }))
                        : []
                    }
                  />
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-end p-4">
              <Button
                type="button"
                size="lg"
                className="w-[200px]"
                onClick={form.handleSubmit(onSubmit)}
                disabled={assignCIHead.isPending}
              >
                {assignCIHead.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Submit
              </Button>
            </CardFooter>
          </FormWrapper>
        </CardContent>
      </Card>
    </div>
  );
};
