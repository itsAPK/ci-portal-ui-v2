import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { Option } from "@/types";
  import { Controller } from "react-hook-form";
  
  export const SelectField = ({
    control,
    name,
    label,
    options,
    placeholder,
    className,
    disabled,
    onChange,
  }: {
    control: any;
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    className?: string;
    disabled?: any;
    onChange?: (value: any) => void;
  }) => (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(e) => {
                onChange && onChange(e);
                field.onChange(e);
              }}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option: Option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );