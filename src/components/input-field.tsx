'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Using Lucide icons
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FieldProps {
  control?: any;
  name?: any;
  label?: string;
  type?: string; // Type of input (e.g., email, password, text)
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  value?: any;
}

export const FormFieldInput: React.FC<FieldProps> = ({
  control,
  name,
  label,
  type,
  placeholder = '',
  className,
  inputClassName,
  disabled,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type ?? 'text'}
              className={cn(inputClassName)}
              placeholder={placeholder}
              value={value ?? field.value} // Ensure this is correctly managed
              onChange={(e) => {
                const newValue = e.target.value;
                field.onChange(type === 'number' ? (newValue ? Number(newValue) : '') : newValue);
              }}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
