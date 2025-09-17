/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCreateLearningDataMutation, useUpdateLearningDataMutation } from "@/redux/api/learnignApi";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface CourseFormData {
  id?: string;
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
    isNew?: boolean;
    isDeleted?: boolean;
  }[];
}

interface UpdateLearningProps {
  formData: CourseFormData;
  setFormData: Dispatch<SetStateAction<CourseFormData>>;
  fileStates: any;
  setFileStates: Dispatch<SetStateAction<any>>;
}

const UpdateLearning = ({ formData, setFormData }: UpdateLearningProps) => {
  const [updateLearningData] = useUpdateLearningDataMutation();
  const [createLearningData] = useCreateLearningDataMutation();

  const handleLearningCommentChange = (index: number, value: string) => {
    const updatedLearningData = [...(formData.learningData || [])];
    if (!updatedLearningData[index]) {
      updatedLearningData[index] = {
        comment: "",
        order: index + 1,
        isNew: true,
      };
    }
    updatedLearningData[index].comment = value;
    setFormData((prev) => ({
      ...prev,
      learningData: updatedLearningData,
    }));
  };

  const handleAddLearningItem = () => {
    setFormData((prev) => ({
      ...prev,
      learningData: [
        ...(prev.learningData || []),
        {
          comment: "",
          order: (prev.learningData?.length || 0) + 1,
          isNew: true,
        },
      ],
    }));
  };

  const handleRemoveLearningItem = async (index: number) => {
    const itemToRemove = formData.learningData?.[index];

    if (itemToRemove?.id) {
      // Mark existing item for deletion (will be processed on form submit)
      const updatedLearningData = [...(formData.learningData || [])];
      updatedLearningData[index] = {
        ...itemToRemove,
        isDeleted: true,
      };
      setFormData((prev) => ({
        ...prev,
        learningData: updatedLearningData,
      }));
    } else {
      // Remove new item that wasn't saved yet
      const updatedLearningData = [...(formData.learningData || [])];
      updatedLearningData.splice(index, 1);

      // Update order for remaining items
      const withUpdatedOrder = updatedLearningData.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));

      setFormData((prev) => ({
        ...prev,
        learningData: withUpdatedOrder,
      }));
    }
  };

  const handleSaveLearningData = async (index: number) => {
    const learningItem = formData.learningData?.[index];
    if (!learningItem || !learningItem.comment.trim()) {
      toast.error("Please enter a learning comment");
      return;
    }

    try {
      if (learningItem.id && !learningItem.isNew) {
        // Update existing learning data
        await updateLearningData({
          id: learningItem.id,
          data: {
            comment: learningItem.comment,
            order: learningItem.order,
          },
        }).unwrap();

        // Update local state to mark as saved
        const updatedLearningData = [...(formData.learningData || [])];
        updatedLearningData[index] = {
          ...learningItem,
          isNew: false,
        };

        setFormData((prev) => ({
          ...prev,
          learningData: updatedLearningData,
        }));

        toast.success("Learning point updated successfully");
      } else {
        // Create new learning data
        const response = await createLearningData({
          comment: learningItem.comment,
          order: learningItem.order,
          courseId: formData.id, // Make sure your formData includes the course id
        }).unwrap();

        // Update local state with the new id
        const updatedLearningData = [...(formData.learningData || [])];
        updatedLearningData[index] = {
          ...response.data, // Assuming your API returns the created item
          isNew: false,
        };

        setFormData((prev) => ({
          ...prev,
          learningData: updatedLearningData,
        }));

        toast.success("Learning point created successfully");
      }
    } catch (error) {
      console.error("Failed to save learning data:", error);
      toast.error("Failed to save learning point");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        What Will Students Learn?
      </h2>

      <div className="space-y-4">
        {(formData.learningData || [])
          .filter((item) => !item.isDeleted)
          .map((item, index) => (
            <div
              key={item.id || `new-${index}`}
              className="flex items-start space-x-2"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Learning point ${index + 1}`}
                  value={item.comment || ""}
                  onChange={(e) =>
                    handleLearningCommentChange(index, e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleSaveLearningData(index)}
                  className="px-3 py-2 bg-[#017f00] text-white rounded-md hover:bg-[#016f00]"
                >
                  {item.id && !item.isNew ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveLearningItem(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        <button
          type="button"
          onClick={handleAddLearningItem}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          + Add Learning Point
        </button>
      </div>
    </div>
  );
};

export default UpdateLearning;
