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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <FormFieldInput
                name="suspected_source"
                control={form.control}
                className="col-span-2"
                label="Suspected Source of Variation"

              />
              <SelectField
                control={form.control}
                name="tools"
                label="Tools"
                className="col-span-2"
                options={tools.data ? tools.data.map((i: any) => ({
                  value: i.name,
                  label: i.name,
                })) : []}
              />
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
              <div >
          <Button type="submit" size='lg' className="btn-primary col-span-1 w-[200px] mt-9" variant={'ghost-1'} disabled={form.formState.isSubmitting}>
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