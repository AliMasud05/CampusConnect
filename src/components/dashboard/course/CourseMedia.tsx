/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { Camera, Calendar, Video } from 'lucide-react';
import { toast } from 'sonner';

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

interface FileStates {
  demoVideo: File | null
  thumbnail: File | null
  moduleVideos: {[moduleIndex: number]: {[videoIndex: number]: File | null}}
  videoResources: {[moduleIndex: number]: {[videoIndex: number]: {[resourceIndex: number]: File | null}}}
}

interface CourseMediaProps {
  formData: CourseFormData
  setFormData: Dispatch<SetStateAction<CourseFormData>>
  fileStates: FileStates
  setFileStates: Dispatch<SetStateAction<FileStates>>
}

export default function CourseMedia({ formData, setFormData, fileStates, setFileStates }: CourseMediaProps) {
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (
    type: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "demoVideo" || type === "thumbnail") {
        setFileStates(prev => ({ ...prev, [type]: file }));
      }
      toast.success(`File selected successfully!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Demo video and Thumbnail */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Media</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload Demo video */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Demo Video
            </label>
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                {formData.demoVideo && (
                  <p className="text-xs text-blue-600 mb-2">
                    Current: {formData.demoVideo.split('/').pop()}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-4 mt-2">
                Formats: Mp4 - Max 300MB
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-start">
                <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                  Choose New Video
                  <input
                    type="file"
                    accept="video/mp4"
                    className="hidden"
                    onChange={(e) => handleFileUpload("demoVideo", e)}
                  />
                </label>
                <span className="text-sm text-gray-500 self-center">
                  {fileStates.demoVideo ? fileStates.demoVideo.name : "No New File Chosen"}
                </span>
              </div>
            </div>
          </div>

          {/* Upload Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail
            </label>
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                {formData.thumnail && (
                  <p className="text-xs text-blue-600 mb-2">
                    Current: {formData.thumnail.split('/').pop()}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-4 mt-2">
                Formats: JPG, PNG, JPEG - Max 5MB
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-start">
                <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                  Choose New Image
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="hidden"
                    onChange={(e) => handleFileUpload("thumbnail", e)}
                  />
                </label>
                <span className="text-sm text-gray-500 self-center">
                  {fileStates.thumbnail ? fileStates.thumbnail.name : "No New File Chosen"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Status and Release Date */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Status</h2>
        
        <div className="space-y-6">
          {/* Course Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
            </select>
          </div>

          {/* Release Date - show for upcoming */}
          {formData.status === "UPCOMING" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Release Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}