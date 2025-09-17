/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useSingleFileUploadMutation } from "@/redux/api/fileUploadApi";
import { useCreateRefundRequestMutation } from "@/redux/api/refundApi";
import { FolderOpen, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function RefundRequestForm() {
  const { data: userData } = useGetMeQuery({});
  console.log("User ID:", userData?.data?.id);
  console.log(userData, "user data");

  const [singleFileUpload, { isLoading: isUploading }] =
    useSingleFileUploadMutation();
  const [createRefundRequest, { isLoading: isSubmitting }] =
    useCreateRefundRequestMutation();
  const enrollments = userData?.data?.enrollments || [];
  const [selectedCourse, setSelectedCourse] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert("File size must be less than 100MB");
      return;
    }

    setUploadedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    if (!uploadedFile) {
      alert("Please upload an invoice");
      return;
    }

    try {
      // Find the selected enrollment
      const selectedEnrollment = enrollments.find(
        (enrollment: any) => enrollment.course.id === selectedCourse
      );

      if (!selectedEnrollment) {
        alert("Selected course not found in your enrollments");
        return;
      }

      // Upload the file first
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const fileUploadResponse = await singleFileUpload(formData).unwrap();

      if (fileUploadResponse.success) {
        const fileUrl = fileUploadResponse.data.fileUrl;

        // Submit the refund request
        const refundResponse = await createRefundRequest({
          userId: userData?.data?.id,
          enrollmentId: selectedEnrollment.id,
          invoice: fileUrl,
        }).unwrap();

        if (refundResponse.success) {
          toast.success("Refund request submitted successfully!");
          handleCancel();
        }
      }
    } catch (error: any) {
      // Handle RTK Query error
      if (error.data) {
        // The error response from the API
        const apiError = error.data;
        if (apiError.message) {
          toast.error(apiError.message);
        } else if (apiError.errorSources && apiError.errorSources.length > 0) {
          // Use the first error source details if message is not available
          toast.error(apiError.errorSources[0].details);
        } else {
          toast.error("Failed to submit refund request");
        }
      } else {
        // Fallback for other types of errors
        const errorMessage = error.message || "Unknown error occurred";
        toast.error(`Error: ${errorMessage}`);
      }
      console.error("Error submitting refund request:", error);
    }
  };
  const handleCancel = () => {
    setSelectedCourse("");
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isLoading = isUploading || isSubmitting;

  return (
    <div className="min-h-screen max-w-5xl py-12 px-4 bg-white">
      <div className="max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Request for a refund
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Selection */}
          <div className="space-y-2">
            <Label
              htmlFor="course"
              className="text-sm font-medium text-gray-700"
            >
              Enrolled Course name
            </Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="text-2xl font-semibold tracking-wide">
                {enrollments.map((course: any) => (
                  <SelectItem key={course.id} value={course?.course?.id}>
                    {course?.course?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Upload Invoice
            </Label>

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-green-400 bg-green-50"
                  : uploadedFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <FolderOpen className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <FolderOpen className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Drag and drop your invoice here</p>
                    <p className="text-xs text-gray-500 mt-1">
                      or click to browse
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex flex-col max-w-40 gap-4 text-xs text-gray-500">
              <span>Formats: pdf - Max 100 MB each</span>
              {!uploadedFile && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-green-600 py-5 text-base bg-green-400/20 border-green-600 hover:bg-green-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-[#017F00] hover:bg-green-700 text-white py-6 rounded-4xl cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Send Request"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-green-600 py-6 rounded-4xl cursor-pointer text-green-600 hover:bg-green-50 bg-transparent"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
