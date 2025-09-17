/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm, useWatch } from "react-hook-form"; // Fixed missing useWatch import
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface MyFormWrapperProps {
  onSubmit: (data: any) => void;
  isReset?: boolean;
  className?: string;
  children: React.ReactNode;
  defaultValues?: any;
  resolver?: import("react-hook-form").Resolver<any, any>;
  setFormState?: (data: any) => void; // Optional state setter function
  externalErrors?: { [key: string]: string };
}

const MyFormWrapper = ({
  onSubmit,
  isReset,
  className,
  children,
  defaultValues,
  resolver,
  setFormState, // Optional setter function
  externalErrors, // API errors
}: MyFormWrapperProps) => {
  const methods = useForm({
    defaultValues,
    resolver,
  });
  const { handleSubmit, reset, control, setError } = methods;

  // Watch the entire form state
  const formValues = useWatch({ control });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // Apply external API errors to form fields
  useEffect(() => {
    if (externalErrors) {
      Object.entries(externalErrors).forEach(([key, message]) => {
        setError(key, { type: "server", message });
      });
    }
  }, [externalErrors, setError]);

  // Update external state on change
  useEffect(() => {
    if (setFormState) {
      setFormState(formValues);
    }
  }, [formValues, setFormState]);

  useEffect(() => {
    if (isReset) {
      reset();
    }
  }, [isReset, reset]);

  const submit = (data: any) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={cn("", className)} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default MyFormWrapper;
