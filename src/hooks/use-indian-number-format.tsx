import { useState, useCallback } from 'react';

export function useIndianNumberFormat() {
  const [value, setValue] = useState('');

  const formatValue = useCallback((input: string) => {
    // Remove non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    
    // Format the number
    if (digitsOnly) {
      const number = parseInt(digitsOnly, 10);
      return number.toLocaleString('en-IN');
    }
    return '';
  }, []);

  const handleChange = useCallback((newValue: string) => {
    const formatted = formatValue(newValue);
    setValue(formatted);
    return formatted;
  }, [formatValue]);

  return {
    value,
    onChange: handleChange,
    formatValue
  };
}

