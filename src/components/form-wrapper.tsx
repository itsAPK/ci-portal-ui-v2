import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";

interface FormWrapperProps {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit: (event: React.BaseSyntheticEvent) => void;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  form,
  children,
  onSubmit,
}) => (
  <Form {...form}>
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-1">
        {children}
      </div>
    </form>
  </Form>
);