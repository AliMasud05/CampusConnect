/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';

interface CourseFormData {
  title: string;
  subtitle: string;
  price: string;
  discount: string;
  courseType: "PAID" | "FREE";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "";
  duration: string;
  language: string;
  classes: string;
  description: string;
  status: "UPCOMING" | "ONGOING";
  releaseDate: string;
  demoVideo: string;
  thumnail: string;
  modules: any[];
  learningData?: {
    id?: string;
    comment: string;
    order: number;
  }[];
}

interface BasicCourseInfoProps {
  formData: CourseFormData
  setFormData: Dispatch<SetStateAction<CourseFormData>>
  errors: {[key: string]: string}
  setErrors: Dispatch<SetStateAction<{[key: string]: string}>>
}

export default function BasicCourseInfo({ formData, setFormData, errors, setErrors }: BasicCourseInfoProps) {
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Basic Information
      </h2>

      <div className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            placeholder="Enter course title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle *
          </label>
          <input
            type="text"
            placeholder="Enter subtitle"
            value={formData.subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
          {errors.subtitle && (
            <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <input
            type="number"
            placeholder="Enter price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Discount( %)
          </label>
          <input
            type="number"
            placeholder="Enter price"
            min="0"
            step="0.01"
            value={formData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Course Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Type
          </label>
          <select
            value={formData.courseType}
            onChange={(e) => handleInputChange("courseType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          >
            <option value="PAID">Paid</option>
            <option value="FREE">Free</option>
          </select>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill Level *
          </label>
          <select
            value={formData.level}
            onChange={(e) => handleInputChange("level", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          >
            <option value="">Select skill level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-600">{errors.level}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes) *
          </label>
          <input
            type="number"
            placeholder="Enter duration in hours"
            min="1"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language *
          </label>
          <input
            type="text"
            placeholder="e.g., English, Spanish"
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
          {errors.language && (
            <p className="mt-1 text-sm text-red-600">{errors.language}</p>
          )}
        </div>

        {/* Total Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Classes
          </label>
          <input
            type="text"
            placeholder="e.g., 8 Classes"
            value={formData.classes}
            onChange={(e) => handleInputChange("classes", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Description *
          </label>
          <textarea
            placeholder="Describe your course..."
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}