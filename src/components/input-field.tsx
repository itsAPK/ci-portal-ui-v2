"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide icons
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  placeholder = "",
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
            <div className="relative">
              <Input
                {...field}
                type={
                  type === "password" && !showPassword ? "password" : "text"
                }
                className={cn(inputClassName)}
                placeholder={placeholder}
                value={value ?? field.value}
                {...(type === "number" ? { valueAsNumber: true } : {})}
                onChange={(e) => {
                  field.onChange(
                    type === "number" ? Number(e.target.value) : e.target.value
                  );
                }}
                disabled={disabled}
              />
              {type === "password" && (
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};