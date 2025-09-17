"use client";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { HiTrash, HiUpload } from "react-icons/hi";
import Image from "next/image";

type FileUploadProps = {
  name: string;
  label?: string;
  accept?: string;
  maxFiles?: number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  previewClassName?: string;
  deleteButtonClassName?: string;
  dropzoneClassName?: string;
};

const FileUploadDragger = ({
  name,
  label,
  accept = "*",
  maxFiles,
  className,
  labelClassName,
  inputClassName,
  previewClassName,
  deleteButtonClassName,
  dropzoneClassName,
}: FileUploadProps) => {
  const { control, setValue } = useFormContext();
  const files = useWatch({ control, name }) || [];
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    updateFiles(newFiles);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const newFiles = event.dataTransfer.files
      ? Array.from(event.dataTransfer.files)
      : [];
    updateFiles(newFiles);
  };

  const updateFiles = (newFiles: File[]) => {
    if (maxFiles === 1) {
      setValue(name, newFiles.slice(0, 1));
    } else {
      setValue(name, [...files, ...newFiles].slice(0, maxFiles));
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
              htmlFor={`file-upload-${name}`}
              className={cn(
                "border p-6 rounded-lg cursor-pointer flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition relative",
                dragging && "bg-gray-300",
                dropzoneClassName
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <HiUpload size={30} className="text-gray-600" />
              <span className="text-gray-600">Drag & Drop Files Here</span>
              <span className="text-sm text-gray-400">or click to upload</span>
              <input
                id={`file-upload-${name}`}
                type="file"
                accept={accept}
                multiple={maxFiles !== 1}
                className={cn("hidden", inputClassName)}
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

export default FileUploadDragger;
