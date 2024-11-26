import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import api from '@/lib/api';
import { useQueries } from '@tanstack/react-query';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem } from '@/components/ui/multi-select';

export const AssignCIHead = () => {
  const form = useForm({
    defaultValues: {
      plant: '',
      ci_head: '',
      hod: '',
      lof: '',
      cs_head: '',
     
    },
  });
  const [ plant] = useQueries({
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
  return (
    <div className="py-4">
      <Card className="border-gray-500/20 bg-white">
        <div className="flex justify-between p-4">
          <div className="pt-2 text-base font-semibold">Change Password</div>
        </div>
        <CardContent className="overflow-y-auto p-4 pt-0">
          <FormWrapper form={form} onSubmit={() => {}}>
            <div className="grid h-full grid-cols-1">
              <div className="col-span-4 px-2 py-1 md:px-7">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <SelectField
              control={form.control}
              name="plant"
              label="Plant"
              className='col-span-2'
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
              <FormField
                  control={form.control}
                  name="ci_head"
                  render={({ field }) => (
                    <FormItem className="w-full pt-2">
                      <div className="flex flex-col ">
                        <FormLabel>
                          CI HEAD
                          {" "}
                        </FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value ? [...field.value] : []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select CI HEAD" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {['Arun Kumar', 'Dileep Kumar', 'Rahul Kumar'].map((i, index) => (
                                  <MultiSelectorItem key={i} value={i}>
                                    {i}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="hod"
                  render={({ field }) => (
                    <FormItem className="w-full pt-2">
                      <div className="flex flex-col ">
                        <FormLabel>
                        HOD
                          {" "}
                        </FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value ? [...field.value] : []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select HOD" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {['Arun Kumar', 'Dileep Kumar', 'Rahul Kumar'].map((i, index) => (
                                  <MultiSelectorItem key={i} value={i}>
                                    {i}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="lof"
                  render={({ field }) => (
                    <FormItem className="w-full pt-2">
                      <div className="flex flex-col ">
                        <FormLabel>
LOF                          {" "}
                        </FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value ? [...field.value] : []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select LOF" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {['Arun Kumar', 'Dileep Kumar', 'Rahul Kumar'].map((i, index) => (
                                  <MultiSelectorItem key={i} value={i}>
                                    {i}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="cs_head"
                  render={({ field }) => (
                    <FormItem className="w-full pt-2">
                      <div className="flex flex-col ">
                        <FormLabel>
                          CS HEAD
                          {" "}
                        </FormLabel>
                        <FormControl>
                          <MultiSelector
                            onValuesChange={field.onChange}
                            values={field.value ? [...field.value] : []}
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select CS Head" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList>
                                {['Arun Kumar', 'Dileep Kumar', 'Rahul Kumar'].map((i, index) => (
                                  <MultiSelectorItem key={i} value={i}>
                                    {i}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
              </div>
            </div>
          </FormWrapper>
        </CardContent>
        <CardFooter className="p-4 flex justify-end">
            <Button type="submit" size="lg" className='w-[200px]'>Submit</Button>
          </CardFooter>
      </Card>
             
        
    </div>
  );
};
