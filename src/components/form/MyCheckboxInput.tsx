"use client";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";

interface MyCheckboxInputProps {
  name: string; // Field name for react-hook-form
  label?: string; // Label text
  onValueChange?: (value: boolean) => void; // Optional callback for value changes
  required?: boolean; // Optional required validation, default is false
  className?: string; // Custom className for input container
  labelClassName?: string; // Custom className for label
  checkboxClassName?: string; // Custom className for checkbox
  checkboxLabelClassName?: string; // Custom className for checkbox label
}

const MyCheckboxInput = ({
  name,
  label,
  onValueChange,
  required = false,
  className,
  labelClassName,
  checkboxClassName,
}: MyCheckboxInputProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? false; // Ensure no undefined value

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? false} // Ensures controlled behavior
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field, fieldState: { error } }) => (
          <div className="relative">
            <div className="flex items-center">
              <input
                {...field}
                id={name}
                type="checkbox"
                className={cn(
                  "form-checkbox accent-primary",
                  checkboxClassName,
                  error ? "border-red-500" : "border-gray-300"
                )}
                checked={field.value}
              />
              {label && (
                <label
                  htmlFor={name}
                  className={cn("ml-2 text-sm", labelClassName)}
                >
                  {label}
                </label>
              )}
            </div>
            {error && (
              <div className="h-4 my-1 w-full">
                <small className="text-red-500 text-xs">{error.message}</small>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default MyCheckboxInput;
