"use client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { HiTrash, HiUpload } from "react-icons/hi";
import Image from "next/image";

interface FileUploadProps {
  name: string;
  label?: string;
  accept?: string; // e.g., "image/*", "application/pdf"
  maxFiles?: number; // Default is unlimited
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  previewClassName?: string;
  deleteButtonClassName?: string;
}

const MyFileUpload = ({
  name,
  label,
  accept = "*", // Accepts all file types by default
  maxFiles,
  className,
  labelClassName,
  inputClassName,
  previewClassName,
  deleteButtonClassName,
}: FileUploadProps) => {
  const { control, setValue } = useFormContext();
  const files = useWatch({ control, name }) || [];


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    if (maxFiles === 1) {
      setValue(name, newFiles.slice(0, 1)); // Only allow one file
    } else {
      setValue(name, [...files, ...newFiles].slice(0, maxFiles)); // Enforce max limit
    }
  };

  const removeFile = (index: number) => {
    setValue(
      name,
      files.filter((_: File, i: number) => i !== index)
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className={cn("text-sm font-medium", labelClassName)}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ fieldState: { error } }) => (
          <div>
            <label
              className={cn(
                "relative border p-3 rounded-lg cursor-pointer flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 transition",
                inputClassName
              )}
            >
              <HiUpload size={20} />
              <span>Upload File{maxFiles === 1 ? "" : "s"}</span>
              <input
                type="file"
                accept={accept}
                multiple={maxFiles !== 1}
                className={`hidden`}
                onChange={handleFileChange}
              />
            </label>
            {error && (
              <small className="text-red-500 text-xs">{error.message}</small>
            )}
            <div className={cn("mt-2 flex flex-wrap gap-2", previewClassName)}>
              {files.map((file: File, index: number) => (
                <div
                  key={index}
                  className="relative flex items-center gap-2 p-2 border rounded-md bg-white shadow-xs"
                >
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      width={50}
                      height={50}
                      className="rounded-md object-cover w-12 h-12"
                    />
                  ) : (
                    <span className="truncate max-w-[150px] text-sm">
                      {file.name}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={cn(
                      "text-red-500 hover:text-red-700 transition",
                      deleteButtonClassName
                    )}
                  >
                    <HiTrash size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyFileUpload;
