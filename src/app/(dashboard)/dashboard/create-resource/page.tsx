"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Camera, FileText, Plus, X } from "lucide-react";
import { useSingleFileUploadMutation } from "@/redux/api/fileUploadApi";
import { useCreateResourceMutation } from "@/redux/api/resourceApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateIncludedMutation } from "@/redux/api/includedApi";

type ResourceType = "PDF" | "DOC" | "LINK" | "OTHERS";
type ResourceStatus = "FREE" | "PAID";

interface LearningDataItem {
  comment: string;
}

interface ResourceFormData {
  title: string;
  topic: string;
  type: ResourceType;
  price: string;
  discount: string;
  thumbnail: FileList | null;
  resourceFile: FileList | null;
  learningData: LearningDataItem[];
  uses: string;
}

interface ResourceCreateData {
  title: string;
  topic: string;
  type: ResourceType;
  status: ResourceStatus;
  price?: number | null;
  discount?: number | null;
  thumbnail?: string | null;
  file: string;
  uses?: string | null;
}

// Define supported file types
const SUPPORTED_FILE_TYPES = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  // Documents
  pdf: "application/pdf",
  txt: "text/plain",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // Media
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  // Archives
  rar: "application/x-rar-compressed",
  zip: "application/zip",
};

// Create accept string for file inputs
const THUMBNAIL_ACCEPT = ".jpg,.jpeg,.png,.gif,.webp,.svg";
const RESOURCE_FILE_ACCEPT = Object.keys(SUPPORTED_FILE_TYPES)
  .map((ext) => `.${ext}`)
  .join(",");

// Helper function to get file extension
const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || "";
};

// Helper function to validate file type
const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  const extension = getFileExtension(file.name);
  return allowedTypes.includes(extension);
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function CreateResource() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ResourceFormData>({
    defaultValues: {
      title: "",
      topic: "",
      type: "PDF",
      price: "",
      discount: "0",
      thumbnail: null,
      resourceFile: null,
      learningData: [{ comment: "" }],
      uses: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "learningData",
  });

  const [singleFileUpload] = useSingleFileUploadMutation();
  const [createResource] = useCreateResourceMutation();
  const [createIncludedFN] = useCreateIncludedMutation();

  const [fileStates, setFileStates] = useState({
    thumbnail: null as File | null,
    resourceFile: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const priceValue = watch("price");
  const discountValue = watch("discount");

  const handleFileUpload = (
    type: keyof typeof fileStates,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (type === "thumbnail") {
      const allowedThumbnailTypes = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "svg",
      ];
      if (!isValidFileType(file, allowedThumbnailTypes)) {
        setMessage(
          "Invalid thumbnail file type. Please upload: JPG, JPEG, PNG, GIF, WEBP, or SVG files."
        );
        return;
      }
      // Check file size for thumbnails (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Thumbnail file size must be less than 5MB.");
        return;
      }
    } else if (type === "resourceFile") {
      const allowedResourceTypes = Object.keys(SUPPORTED_FILE_TYPES);
      if (!isValidFileType(file, allowedResourceTypes)) {
        setMessage(
          "Invalid resource file type. Please check the supported formats."
        );
        return;
      }
      // Check file size for resource files (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setMessage("Resource file size must be less than 100MB.");
        return;
      }
    }

    setFileStates((prev) => ({ ...prev, [type]: file }));
    setMessage(
      `${
        type === "thumbnail" ? "Thumbnail" : "Resource file"
      } (${formatFileSize(file.size)}) uploaded successfully!`
    );
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await singleFileUpload(formData).unwrap();
      return response.data.fileUrl;
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error("File upload failed");
    }
  };

  const addNewLearningData = () => {
    append({ comment: "" });
  };

  const removeLearningData = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: ResourceFormData) => {
    if (!fileStates.resourceFile) {
      setMessage("Resource file is required!");
      return;
    }

    setIsSubmitting(true);
    setMessage("Creating resource...");

    try {
      // Upload resource file (required)
      const resourceFileUrl = await uploadFile(fileStates.resourceFile);

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (fileStates.thumbnail) {
        thumbnailUrl = await uploadFile(fileStates.thumbnail);
      }

      // Determine status based on price
      const price = parseFloat(data.price) || 0;
      const discount = parseFloat(data.discount) || 0;
      const status = price > 0 ? "PAID" : "FREE";

      // Prepare resource data
      const resourceData: ResourceCreateData = {
        title: data.title,
        topic: data.topic,
        type: data.type,
        status: status,
        price: price > 0 ? price : null,
        discount: discount > 0 ? discount : null,
        thumbnail: thumbnailUrl,
        file: resourceFileUrl,
        uses: data.uses || null,
      };

      // Create the resource
      const resourceResponse = await createResource(resourceData).unwrap();
      const resourceId = resourceResponse.data.id;

      // Create included items for each learning data
      if (data.learningData && data.learningData.length > 0) {
        const includedCreationPromises = data.learningData
          .filter((learningItem) => learningItem.comment.trim())
          .map((learningItem) =>
            createIncludedFN({
              resourceId: resourceId,
              comment: learningItem.comment,
            }).unwrap()
          );

        await Promise.all(includedCreationPromises);
        toast.success("All learning points added successfully!");
      }

      setMessage("Resource created successfully!");
      toast.success("Resource created successfully!");

      reset();
      router.push(`/dashboard/manage-course`);
      setFileStates({ thumbnail: null, resourceFile: null });
    } catch (error) {
      console.error("Error creating resource:", error);
      setMessage("Failed to create resource. Please try again.");
      toast.error("Failed to create resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setMessage("Resource creation cancelled");
    reset();
    router.push("/dashboard/manage-course");
    setFileStates({ thumbnail: null, resourceFile: null });
  };

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    const price = parseFloat(priceValue) || 0;
    const discount = parseFloat(discountValue) || 0;

    if (price > 0 && discount > 0) {
      const discountedPrice = price - (price * discount) / 100;
      return discountedPrice.toFixed(2);
    }
    return price.toFixed(2);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Create new resource
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md ${
              message.includes("success")
                ? "bg-green-50 border-green-200"
                : message.includes("error") ||
                  message.includes("fail") ||
                  message.includes("Invalid") ||
                  message.includes("must be")
                ? "bg-red-50 border-red-200"
                : "bg-blue-50 border-blue-200"
            } border`}
          >
            <p
              className={
                message.includes("success")
                  ? "text-green-700"
                  : message.includes("error") ||
                    message.includes("fail") ||
                    message.includes("Invalid") ||
                    message.includes("must be")
                  ? "text-red-700"
                  : "text-blue-700"
              }
            >
              {message}
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Resource title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Title *
                </label>
                <input
                  {...register("title", {
                    required: "Resource title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter resource title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic *
                </label>
                <input
                  {...register("topic", {
                    required: "Topic is required",
                    minLength: {
                      value: 3,
                      message: "Topic must be at least 3 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter topic"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.topic.message}
                  </p>
                )}
              </div>

              {/* Resource Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Type *
                </label>
                <select
                  {...register("type", {
                    required: "Resource type is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOC">Document</option>
                  <option value="LINK">Link</option>
                  <option value="OTHERS">Others</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (Leave empty or 0 for free)
                </label>
                <input
                  {...register("price", {
                    validate: (value) => {
                      const numValue = parseFloat(value);
                      if (isNaN(numValue)) return true; // Empty is allowed
                      return numValue >= 0 || "Price cannot be negative";
                    },
                  })}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Status: {parseFloat(priceValue) > 0 ? "PAID" : "FREE"}
                </p>
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  {...register("discount", {
                    validate: (value) => {
                      const numValue = parseFloat(value);
                      if (isNaN(numValue)) return true; // Empty is allowed
                      if (numValue < 0) return "Discount cannot be negative";
                      if (numValue > 100) return "Discount cannot exceed 100%";
                      return true;
                    },
                  })}
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
                {errors.discount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.discount.message}
                  </p>
                )}

                {/* Display discounted price if applicable */}
                {parseFloat(priceValue) > 0 &&
                  parseFloat(discountValue) > 0 && (
                    <div className="mt-2 p-2 bg-green-50 rounded-md">
                      <p className="text-sm text-green-700">
                        Discounted Price: €{calculateDiscountedPrice()}
                      </p>
                      <p className="text-xs text-green-600">
                        You&apos;re saving {parseFloat(discountValue)}% off the
                        original price
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Thumbnail (Optional)
                  </label>
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      {fileStates.thumbnail && (
                        <div>
                          <p className="text-sm text-gray-600 mt-2 truncate">
                            {fileStates.thumbnail.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(fileStates.thumbnail.size)}
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-4 mt-2">
                      Formats: JPG, JPEG, PNG, GIF, WEBP, SVG - Max 5MB each
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-start">
                      <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                        Choose File
                        <input
                          type="file"
                          accept={THUMBNAIL_ACCEPT}
                          className="hidden"
                          onChange={(e) => handleFileUpload("thumbnail", e)}
                        />
                      </label>
                      {fileStates.thumbnail && (
                        <button
                          type="button"
                          onClick={() =>
                            setFileStates((prev) => ({
                              ...prev,
                              thumbnail: null,
                            }))
                          }
                          className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-sm rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Upload Resource file */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resource File *
                  </label>
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      {fileStates.resourceFile && (
                        <div>
                          <p className="text-sm text-gray-600 mt-2 truncate">
                            {fileStates.resourceFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(fileStates.resourceFile.size)}
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-4 mt-2">
                      Formats: Images (JPG, PNG, GIF, WEBP, SVG), Documents
                      (PDF, DOC, DOCX, TXT, XLS, XLSX), Media (MP4, MP3),
                      Archives (ZIP, RAR) - Max 100 MB each
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-start">
                      <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                        Choose File
                        <input
                          type="file"
                          accept={RESOURCE_FILE_ACCEPT}
                          className="hidden"
                          onChange={(e) => handleFileUpload("resourceFile", e)}
                        />
                      </label>
                      {fileStates.resourceFile && (
                        <button
                          type="button"
                          onClick={() =>
                            setFileStates((prev) => ({
                              ...prev,
                              resourceFile: null,
                            }))
                          }
                          className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-sm rounded-md transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {!fileStates.resourceFile && (
                      <p className="mt-1 text-sm text-red-600">
                        Resource file is required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Learning Data Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Points
                </label>
                <Button
                  type="button"
                  onClick={addNewLearningData}
                  disabled={isSubmitting}
                  className="flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors mb-4"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Learning Point
                </Button>
                <div className="space-y-4 mb-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-4">
                      <input
                        {...register(`learningData.${index}.comment`)}
                        type="text"
                        placeholder={`Learning Point ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLearningData(index)}
                          disabled={isSubmitting}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Uses Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How to use this resource
                </label>
                <textarea
                  {...register("uses", {
                    maxLength: {
                      value: 500,
                      message: "Description must be less than 500 characters",
                    },
                  })}
                  placeholder="Explain how to use this resource..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
                {errors.uses && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.uses.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || !fileStates.resourceFile}
              className={`px-8 py-3 bg-[#017f00] border border-[#017f00] text-white hover:text-[#017f00] hover:bg-transparent font-medium rounded-full cursor-pointer transition-colors ${
                isSubmitting || !fileStates.resourceFile
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-8 py-3 border hover:bg-[#017f00] border-[#017f00] hover:text-white text-[#017f00] bg-transparent font-medium rounded-full cursor-pointer transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
