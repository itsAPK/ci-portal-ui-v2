import { FormWrapper } from '@/components/form-wrapper';
import { FormFieldInput } from '@/components/input-field';
import { SelectField } from '@/components/select-field-wrapper';
import { Loader2, Paperclip } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  FileUploader,
  FileUploadText,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DefinePhaseSchema, definePhaseSchema } from '@/schema/opportunity';
import { zodResolver } from '@hookform/resolvers/zod';

export interface DefinePhaseFormProps {
  onSubmit: (data: DefinePhaseSchema) => void;
  defaultValues?: DefinePhaseSchema;
  mode?: 'edit' | 'create';
  isoPlotFile?: [File[] | null, Dispatch<SetStateAction<File[] | null>>];
  pChartFile?: [File[] | null, Dispatch<SetStateAction<File[] | null>>];
  conentractionChartFile?: [File[] | null, Dispatch<SetStateAction<File[] | null>>];
  processFlowDiagram?: [File[] | null, Dispatch<SetStateAction<File[] | null>>];
  departmentKPI?: [File[] | null, Dispatch<SetStateAction<File[] | null>>];
  lastSixMonthsTrend?: [File[] | null, Dispatch<SetStateAction<File[] | null>>];
}

export const DefinePhaseForm = ({
  onSubmit,
  defaultValues,
  isoPlotFile,
  pChartFile,
  conentractionChartFile,
  processFlowDiagram,
  departmentKPI,
  lastSixMonthsTrend,
}: DefinePhaseFormProps) => {
  const form = useForm<DefinePhaseSchema>({
    defaultValues,
    resolver: zodResolver(definePhaseSchema),
  });
  console.log(form.formState.errors);
  const [file, setFile] = useState<File[] | null>([]);
  const [is_iso_plot, is_p_chart_done, is_conecentration] = useWatch({
    control: form.control,
    name: ['is_iso_plot', 'is_p_chart_done', 'is_conecentration'],
  });
  return (
    <FormWrapper form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid h-full grid-cols-1 md:grid-cols-4">
        <div className="col-span-4 px-2 py-1 md:px-7">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
            <FormFieldInput
              type="text"
              name="part_no"
              control={form.control}
              label="Part number/Machine/Customer/Supplier selected for study"
            />
            <FormFieldInput
              type="text"
              name="part_having_problem"
              control={form.control}
              label="Other Similar Part numbers/Machine/Customer/Supplier having problem"
            />
            <FormFieldInput
              type="text"
              name="part_not_having_problem"
              control={form.control}
              className="col-span-1"
              label="Other similar Part numbers/Products/Customers/Suppliers not having the problem"
            />
            <FormFieldInput
              type="text"
              name="suspected_phenomenon"
              control={form.control}
              label="Suspected Phenomenon(s) that is creating the problem"
            />
            <FormFieldInput
              type="text"
              name="last_manufacturing"
              control={form.control}
              label="Suspected last manufacturing stage where the problem is generated"
            />
            <FormFieldInput
              type="text"
              name="no_machines"
              control={form.control}
              label="Number of Machines used in the suspected last manufacturing stage"
            />
            <FormFieldInput
              type="text"
              name="no_streams"
              label="Number of Streams within each Machine"
            />
            <FormFieldInput
              type="text"
              name="process_stage"
              control={form.control}
              label="Process stages where the problem is inspected"
            />
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput control={form.control} type="text" name="baseline" label="Baseline" />
              <FormFieldInput control={form.control} type="text" name="target" label="Target" />
              <FormFieldInput
                control={form.control}
                type="text"
                name="max_value_of_baseline"
                label="Maximum Value of the Baseline in the last 6 months"
              />
              <FormFieldInput
                control={form.control}
                type="text"
                name="max_month"
                label="In which month the Maximum Value has come"
              />
              <FormFieldInput
                type="text"
                control={form.control}
                name="min_value_of_baseline"
                label="Minimum Value of the Baseline in the last 6 months"
              />
              <FormFieldInput
                control={form.control}
                type="text"
                name="min_month"
                label="In which month the Minimum Value has come"
              />
              <SelectField
                control={form.control}
                name="response_type"
                label="Response Type"
                options={[
                  { value: 'Variable', label: 'Variable' },
                  { value: 'Attribute', label: 'Attribute' },
                ]}
              />
              <SelectField
                control={form.control}
                name="is_iso_plot"
                label="“Have you ISO plot / Attribute Agreement Analysis?"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                ]}
              />
              <FormFieldInput
                type="text"
                name="specification"
                label="Specification"
                className="col-span-1"
              />
              <SelectField
                control={form.control}
                name="is_conecentration"
                label="Is Conecentration Chart Available"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                ]}
              />
              <FormFieldInput
                type="text"
                control={form.control}
                name="conculsion"
                label="If Yes, what is the conclusion based on Concentration chart"
                className="col-span-2"
              />
              <SelectField
                control={form.control}
                name="is_audited"
                label="Have you audited the process?"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                ]}
              />
              <SelectField
                control={form.control}
                name="is_p_chart_done"
                label="Have you done p-chart?"
                options={[
                  { value: 'Yes', label: 'Yes' },
                  { value: 'No', label: 'No' },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-3 gap-4 py-3">
          <div className="flex flex-col gap-2">
            <Label className="-mb-2 px-2">Department KPI </Label>
            <FileUploader
              value={departmentKPI ? departmentKPI[0] : []}
              onValueChange={async (file: any) => {
                if (departmentKPI) {
                  departmentKPI[1](file);
                }
              }}
              dropzoneOptions={{
                maxFiles: 1,
                maxSize: 1024 * 1024 * 1,
                multiple: false,
                accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                },
              }}
              className="relative rounded-lg bg-white p-2"
            >
              <FileInput className="outline-dashed outline-1 outline-white">
                <div className="flex w-full flex-col pb-2 pt-3">
                  <FileUploadText
                    label={'Browse File'}
                    description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                  />
                </div>
              </FileInput>
              <FileUploaderContent>
                {departmentKPI &&
                  departmentKPI[0] &&
                  departmentKPI[0].length > 0 &&
                  departmentKPI[0].map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="-mb-2 px-2">Last 6 months trend</Label>
            <FileUploader
              value={lastSixMonthsTrend ? lastSixMonthsTrend[0] : []}
              onValueChange={async (file: any) => {
                if (lastSixMonthsTrend) {
                  lastSixMonthsTrend[1](file);
                }
              }}
              dropzoneOptions={{
                maxFiles: 1,
                maxSize: 1024 * 1024 * 1,
                multiple: false,
                accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                },
              }}
              className="relative rounded-lg bg-white p-2"
            >
              <FileInput className="outline-dashed outline-1 outline-white">
                <div className="flex w-full flex-col pb-2 pt-3">
                  <FileUploadText
                    label={'Browse File'}
                    description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                  />
                </div>
              </FileInput>
              <FileUploaderContent>
                {lastSixMonthsTrend &&
                  lastSixMonthsTrend[0] &&
                  lastSixMonthsTrend[0].length > 0 &&
                  lastSixMonthsTrend[0].map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </div>{' '}
          <div className="flex flex-col gap-2">
            <Label className="-mb-2 px-2">Process Flow Diagram</Label>
            <FileUploader
              value={processFlowDiagram ? processFlowDiagram[0] : []}
              onValueChange={async (file: any) => {
                if (processFlowDiagram) {
                  processFlowDiagram[1](file);
                }
              }}
              dropzoneOptions={{
                maxFiles: 1,
                maxSize: 1024 * 1024 * 1,
                multiple: false,
                accept: {
                  'image/png': ['.png'],
                  'image/jpg': ['.jpg'],
                  'image/jpeg': ['.jpeg'],
                },
              }}
              className="relative rounded-lg bg-white p-2"
            >
              <FileInput className="outline-dashed outline-1 outline-white">
                <div className="flex w-full flex-col pb-2 pt-3">
                  <FileUploadText
                    label={'Browse File'}
                    description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                  />
                </div>
              </FileInput>
              <FileUploaderContent>
                {processFlowDiagram &&
                  processFlowDiagram[0] &&
                  processFlowDiagram[0].length > 0 &&
                  processFlowDiagram[0].map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </div>
          {is_iso_plot === 'Yes' && (
            <div className="flex flex-col gap-2">
              <Label className="-mb-2 px-2">ISO plot / AAA Chart</Label>
              <FileUploader
                value={isoPlotFile ? isoPlotFile[0] : []}
                onValueChange={async (file: any) => {
                  if (isoPlotFile) {
                    isoPlotFile[1](file);
                  }
                }}
                dropzoneOptions={{
                  maxFiles: 1,
                  maxSize: 1024 * 1024 * 1,
                  multiple: false,
                  accept: {
                    'image/png': ['.png'],
                    'image/jpg': ['.jpg'],
                    'image/jpeg': ['.jpeg'],
                  },
                }}
                className="relative rounded-lg bg-white p-2"
              >
                <FileInput className="outline-dashed outline-1 outline-white">
                  <div className="flex w-full flex-col pb-2 pt-3">
                    <FileUploadText
                      label={'Browse File'}
                      description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                    />
                  </div>
                </FileInput>
                <FileUploaderContent>
                  {isoPlotFile &&
                    isoPlotFile[0] &&
                    isoPlotFile[0].length > 0 &&
                    isoPlotFile[0].map((file, i) => (
                      <FileUploaderItem key={i} index={i}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
                      </FileUploaderItem>
                    ))}
                </FileUploaderContent>
              </FileUploader>
            </div>
          )}
          {is_conecentration === 'Yes' && (
            <div className="flex flex-col gap-2">
              <Label className="-mb-2 px-2"> Concentration Chart </Label>
              <FileUploader
                value={conentractionChartFile ? conentractionChartFile[0] : []}
                onValueChange={async (file: any) => {
                  if (conentractionChartFile) {
                    conentractionChartFile[1](file);
                  }
                }}
                dropzoneOptions={{
                  maxFiles: 1,
                  maxSize: 1024 * 1024 * 1,
                  multiple: false,
                  accept: {
                    'image/png': ['.png'],
                    'image/jpg': ['.jpg'],
                    'image/jpeg': ['.jpeg'],
                  },
                }}
                className="relative rounded-lg bg-white p-2"
              >
                <FileInput className="outline-dashed outline-1 outline-white">
                  <div className="flex w-full flex-col pb-2 pt-3">
                    <FileUploadText
                      label={'Browse File'}
                      description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                    />
                  </div>
                </FileInput>
                <FileUploaderContent>
                  {conentractionChartFile &&
                    conentractionChartFile[0] &&
                    conentractionChartFile[0].map((file, i) => (
                      <FileUploaderItem key={i} index={i}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
                      </FileUploaderItem>
                    ))}
                </FileUploaderContent>
              </FileUploader>
            </div>
          )}
          {is_p_chart_done === 'Yes' && (
            <div className="flex flex-col gap-2">
              <Label className="-mb-2 px-2">P Chart</Label>
              <FileUploader
                value={pChartFile ? pChartFile[0] : []}
                onValueChange={async (file: any) => {
                  if (pChartFile) {
                    pChartFile[1](file);
                  }
                }}
                dropzoneOptions={{
                  maxFiles: 1,
                  maxSize: 1024 * 1024 * 1,
                  multiple: false,
                  accept: {
                    'image/png': ['.png'],
                    'image/jpg': ['.jpg'],
                    'image/jpeg': ['.jpeg'],
                  },
                }}
                className="relative rounded-lg bg-white p-2"
              >
                <FileInput className="outline-dashed outline-1 outline-white">
                  <div className="flex w-full flex-col pb-2 pt-3">
                    <FileUploadText
                      label={'Browse File'}
                      description="Max file size is 1MB,  Suitable files are  .jpg, .png, .jpeg"
                    />
                  </div>
                </FileInput>
                <FileUploaderContent>
                  {pChartFile &&
                    pChartFile[0] &&
                    pChartFile[0].map((file, i) => (
                      <FileUploaderItem key={i} index={i}>
                        <Paperclip className="h-4 w-4 stroke-current" />
                        <span>{file.name}</span>
                      </FileUploaderItem>
                    ))}
                </FileUploaderContent>
              </FileUploader>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="btn-primary" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4" />}
          Save
        </Button>
      </div>
    </FormWrapper>
  );
};
