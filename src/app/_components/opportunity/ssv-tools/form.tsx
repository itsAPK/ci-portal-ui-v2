import { FormWrapper } from "@/components/form-wrapper";
import { FormFieldInput } from "@/components/input-field";
import { ssvToolsSchema, SSVToolsSchema } from "@/schema/opportunity";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { SelectField } from "@/components/select-field-wrapper";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { MultiSelector, MultiSelectorTrigger, MultiSelectorInput, MultiSelectorContent, MultiSelectorList, MultiSelectorItem } from "@/components/ui/multi-select";

export interface SSVToolsFormProps {
  defaultValues?: Partial<SSVToolsSchema>;
  onSubmit: (data: SSVToolsSchema) => void;
  category : string;
}


export const SSVToolsForm = ({
  defaultValues,
  onSubmit,
  category,
}: SSVToolsFormProps) => {
    const form = useForm<SSVToolsSchema>({
        defaultValues,
      resolver: zodResolver(ssvToolsSchema)
    });
    
    const tools = useQuery({
      queryKey: ['get-tools-export'],
      queryFn: async (): Promise<any> => {
        return await api
          .post('/tools/export',{
            filter : [
                {
                    $match: {
                        category : {$eq : category},
                        status : {$eq : true}
                      
                    }
                }
            ]
          })
          .then((res) => {
            if (!res.data.success) throw new Error(res.data.message);
            return res.data.data.data;
          })
          .catch((err) => {
            throw err;
          });
      },
    });

  return (
      <FormWrapper
        form={form}
        onSubmit={form.handleSubmit((data: SSVToolsSchema) => {
          onSubmit(data);
        })}
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-4">
          <div className="col-span-4 px-2 py-1 md:px-7">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <FormFieldInput
                name="suspected_source"
                control={form.control}
                className="col-span-2"
                label="Suspected Source of Variation"

              />
              {/* <SelectField
                control={form.control}
                name="tools"
                label="Tools"
                className="col-span-2"
                options={tools.data ? tools.data.map((i: any) => ({
                  value: i.name,
                  label: i.name,
                })) : []}
              /> */}
              
              <SelectField
                control={form.control}
                name="type_of_ssv"
                label="Type of SSV"
                className="col-span-2"
                options={['Design SSV', "Variation SSV"].map((i: any) => ({
                  value: i,
                  label: i,
                }))}
              />
               <FormField
                control={form.control}
                name="tools"
                render={({ field }) => (
                  <FormItem className="w-full col-span-3">
                    <div className="flex flex-col space-y-1 mt-2">
                      <FormLabel>Tools</FormLabel>
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
                              {tools.data ? tools.data.map((i: any, index: number) => (
                                <MultiSelectorItem key={i.name} value={i.name}>
                                  {i.name}
                                </MultiSelectorItem> 
                              ) ): null}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div >
          <Button type="submit" size='lg' className="btn-primary  w-[200px] mt-9" variant={'ghost-1'} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4" />}
            Save
          </Button>
        </div>
            </div>
          </div>
        </div>
        
      </FormWrapper>
  );
};