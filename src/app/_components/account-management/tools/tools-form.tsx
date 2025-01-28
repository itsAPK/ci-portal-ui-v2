import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toolsSchema, ToolsSchema } from '@/schema/tools';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectField } from '@/components/select-field-wrapper';
import { categories } from '@/lib/data';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem } from '@/components/ui/multi-select';

interface ToolsFormProps {
  defaultValues?: Partial<ToolsSchema>;
  onSubmit: (data: ToolsSchema) => void;
  mode?: 'add' | 'edit'
}

export const ToolsForm = ({ defaultValues, onSubmit , mode = 'add'}: ToolsFormProps) => {
  const form = useForm<any>({
    defaultValues,
    resolver: zodResolver(toolsSchema),
  });
  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <FormFieldInput
              control={form.control}
              name="name"
              label="Name"
              className="col-span-1"
            />
           
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full col-span-3">
                    <div className="flex flex-col space-y-1 mt-2">
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value ? [...field.value] : []}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              { categories.map((i: any, index: number) => (
                                <MultiSelectorItem key={i} value={i}>
                                  {i}
                                </MultiSelectorItem> 
                              ) )}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            {
              mode === 'edit' &&  <SelectField
              control={form.control}
              name="status"
              label="Status"
              options={['Active', 'Inactive'].map(
                (i: any) => ({
                  value: i,
                  label: i,
                }),
              )}
            />
            }
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
