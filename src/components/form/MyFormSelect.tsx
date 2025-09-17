"use client";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Default Icons
import React, { useState } from "react";

interface MyFormSelectProps {
  name: string;
  defaultName?: string; // Default selected option value (Optional)
  label?: string;
  options: { label: string; value: string; icon?: React.ReactNode }[];
  required?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  setSelectedState?: (value: string | number) => void;
  upIcon?: React.ReactNode; // Custom Up Icon (Optional)
  downIcon?: React.ReactNode; // Custom Down Icon (Optional)
  attributes?: React.SelectHTMLAttributes<HTMLSelectElement>; // Additional attributes for the select element (Optional)
}

const MyFormSelect = ({
  name,
  defaultName,
  label,
  options,
  required = true,
  className,
  labelClassName,
  selectClassName,
  setSelectedState,
  upIcon = <FaChevronUp />, // Default Up Icon
  downIcon = <FaChevronDown />, // Default Down Icon
  attributes,
}: MyFormSelectProps) => {
  const { control } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className={cn("relative flex flex-col gap-1 w-full ", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("text-sm font-medium", labelClassName)}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label || name} is required` } : {}} // Fix: Show correct field name
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <div className="relative">
            {/* Custom Select Dropdown */}
            <select
              {...field}
              value={value || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                onChange(newValue);
                setSelectedValue(newValue);
                if (setSelectedState) setSelectedState(newValue);
                setIsOpen(false); // Fix: Close dropdown immediately after selection
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              className={cn(
                "w-full px-4 py-2 border rounded-md focus:outline-hidden focus:ring-2 ring-primary appearance-none",
                "transition-all ease-in-out cursor-pointer disabled:cursor-not-allowed",
                error ? "border-danger" : "border-gray-300",
                selectClassName,
                selectedValue ? `text-primary` : "text-gray-400" // Change text color based on selection
              )}
              {...attributes}
            >
              <option className="text-primary" value="" disabled>
                Select {defaultName || ""}
              </option>
              {options?.map(({ label, value }) => (
                <option
                  className="text-primary hover:bg-primary checked:bg-primary checked:text-white"
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>

            {/* Custom Up/Down Icons */}
            <div className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all">
              {isOpen ? upIcon : downIcon}
            </div>

            <div className="h-4 my-1">
              {error && (
                <small className="text-red-500 text-xs">{error.message}</small>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyFormSelect;
