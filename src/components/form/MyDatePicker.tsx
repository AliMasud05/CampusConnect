"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HiCalendar } from "react-icons/hi";
import dayjs from "dayjs";

interface MyDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  onValueChange?: (value: Date | null) => void;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  name,
  label,
  placeholder = "Select a date",
  required = true,
  className,
  labelClassName,
  inputClassName,
  onValueChange,
}) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && <label className={`text-sm font-medium ${labelClassName}`}>{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} is required` } : {}}
        render={({ field, fieldState: { error } }) => (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex justify-between w-full px-4 py-2 border rounded-md focus:outline-hidden focus:ring-2 ring-primary ${
                  error ? "border-red-500 focus:ring-0" : "border-gray-300"
                } ${inputClassName}`}
              >
                {field.value ? dayjs(field.value).format("YYYY-MM-DD") : placeholder}
                <HiCalendar className="ml-auto" size={20} />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2 w-48">
              {/* Manual Native Date Input */}
              <input
                type="date"
                className="w-full border p-2 rounded-md"
                value={field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : null;
                  field.onChange(selectedDate);
                  setIsOpen(false);
                  if (onValueChange) onValueChange(selectedDate);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default MyDatePicker;
