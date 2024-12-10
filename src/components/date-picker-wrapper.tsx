import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "./ui/textarea";
  import { DatePicker } from "@/components/ui/date-picker";
  
  interface FieldProps {
    control?: any;
    name?: any;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: any;
  }
  
  export const DatePickerWrapper: React.FC<FieldProps> = ({
    control,
    name,
    label,
    placeholder = "",
    className,
    disabled,
  }) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );