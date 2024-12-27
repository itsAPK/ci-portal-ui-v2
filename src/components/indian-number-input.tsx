import React, { forwardRef, useEffect } from 'react';
import { useIndianNumberFormat } from '@/hooks/use-indian-number-format';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IndianNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const IndianNumberInput = forwardRef<HTMLInputElement, IndianNumberInputProps>(
  ({ label, value, onChange, ...props }, ref) => {
    const { value: internalValue, onChange: handleInternalChange, formatValue } = useIndianNumberFormat();

    useEffect(() => {
      if (value !== undefined) {
        handleInternalChange(value);
      }
    }, [value, handleInternalChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = handleInternalChange(e.target.value);
      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <div className="space-y-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={internalValue}
          onChange={handleChange}
          aria-label={label || "Enter amount in Indian Rupees"}
          {...props}
        />
      </div>
    );
  }
);

IndianNumberInput.displayName = 'IndianNumberInput';

