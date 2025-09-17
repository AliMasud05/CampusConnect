"use client"
import { Dispatch, SetStateAction } from 'react';
import { Plus, Video, X } from 'lucide-react';
import { toast } from 'sonner';

interface VideoResource {
  id?: string
  title: string
  url: string
  order: number
  file?: File
  isNew?: boolean
  isDeleted?: boolean
}

interface ModuleVideo {
  id?: string
  title: string
  url: string
  order: number
  file?: File
  videoResources: VideoResource[]
  isNew?: boolean
  isDeleted?: boolean
}

interface Module {
  id?: string
  title: string
  order: number
  videos: ModuleVideo[]
  isNew?: boolean
  isDeleted?: boolean
}

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
  modules: Module[];
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

interface CourseModulesProps {
  formData: CourseFormData
  setFormData: Dispatch<SetStateAction<CourseFormData>>
  fileStates: FileStates
  setFileStates: Dispatch<SetStateAction<FileStates>>
  isLoading: boolean
}

export default function CourseModules({ formData, setFormData, fileStates, setFileStates, isLoading }: CourseModulesProps) {
  
  const handleModuleChange = (moduleIndex: number, field: string, value: string) => {
    const newModules = [...formData.modules];
    if (field === "title") {
      newModules[moduleIndex].title = value;
    }
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  const handleVideoChange = (moduleIndex: number, videoIndex: number, field: string, value: string) => {
    const newModules = [...formData.modules];
    if (field === "title") {
      newModules[moduleIndex].videos[videoIndex].title = value;
    } else if (field === "url") {
      newModules[moduleIndex].videos[videoIndex].url = value;
    }
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  const handleResourceChange = (moduleIndex: number, videoIndex: number, resourceIndex: number, field: string, value: string) => {
    const newModules = [...formData.modules];
    if (field === "title") {
      newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].title = value;
    } else if (field === "url") {
      newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].url = value;
    }
    setFormData(prev => ({ ...prev, modules: newModules }));
  };

  const handleFileUpload = (
    type: string,
    event: React.ChangeEvent<HTMLInputElement>,
    moduleIndex?: number,
    videoIndex?: number,
    resourceIndex?: number,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "moduleVideo" && moduleIndex !== undefined && videoIndex !== undefined) {
        setFileStates(prev => {
          const newModuleVideos = { ...prev.moduleVideos };
          if (!newModuleVideos[moduleIndex]) newModuleVideos[moduleIndex] = {};
          newModuleVideos[moduleIndex][videoIndex] = file;
          return { ...prev, moduleVideos: newModuleVideos };
        });
      } else if (type === "videoResource" && moduleIndex !== undefined && videoIndex !== undefined && resourceIndex !== undefined) {
        setFileStates(prev => {
          const newVideoResources = { ...prev.videoResources };
          if (!newVideoResources[moduleIndex]) newVideoResources[moduleIndex] = {};
          if (!newVideoResources[moduleIndex][videoIndex]) newVideoResources[moduleIndex][videoIndex] = {};
          newVideoResources[moduleIndex][videoIndex][resourceIndex] = file;
          return { ...prev, videoResources: newVideoResources };
        });
      }
      toast.success(`File selected successfully!`);
    }
  };

  // Module operations
  const addNewModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, { 
        title: "", 
        order: prev.modules.length + 1,
        videos: [{ 
          title: "", 
          url: "", 
          order: 1,
          videoResources: [{ title: "", url: "", order: 1 }],
          isNew: true
        }],
        isNew: true
      }]
    }));
    toast.success("New module added!");
  };

  const removeModule = (moduleIndex: number) => {
    const mod = formData.modules[moduleIndex];
    
    if (mod.id) {
      // Mark existing module for deletion
      const newModules = [...formData.modules];
      newModules[moduleIndex].isDeleted = true;
      setFormData(prev => ({ ...prev, modules: newModules }));
    } else {
      // Remove new module completely
      const newModules = formData.modules.filter((_, i) => i !== moduleIndex);
      newModules.forEach((m, index) => {
        m.order = index + 1;
      });
      setFormData(prev => ({ ...prev, modules: newModules }));
    }
    toast.success("Module marked for removal!");
  };

  // Video operations
  const addNewVideo = (moduleIndex: number) => {
    const newModules = [...formData.modules];
    const newOrder = newModules[moduleIndex].videos.length + 1;
    newModules[moduleIndex].videos.push({
      title: "",
      url: "",
      order: newOrder,
      videoResources: [{ title: "", url: "", order: 1 }],
      isNew: true
    });
    setFormData(prev => ({ ...prev, modules: newModules }));
    toast.success("New video added!");
  };

  const removeVideo = (moduleIndex: number, videoIndex: number) => {
    const video = formData.modules[moduleIndex].videos[videoIndex];
    const newModules = [...formData.modules];
    
    if (video.id) {
      // Mark existing video for deletion
      newModules[moduleIndex].videos[videoIndex].isDeleted = true;
    } else {
      // Remove new video completely
      newModules[moduleIndex].videos.splice(videoIndex, 1);
      newModules[moduleIndex].videos.forEach((video, index) => {
        video.order = index + 1;
      });
    }
    
    setFormData(prev => ({ ...prev, modules: newModules }));
    toast.success("Video marked for removal!");
  };

  // Resource operations
  const addNewResource = (moduleIndex: number, videoIndex: number) => {
    const newModules = [...formData.modules];
    const newOrder = newModules[moduleIndex].videos[videoIndex].videoResources.length + 1;
    newModules[moduleIndex].videos[videoIndex].videoResources.push({
      title: "",
      url: "",
      order: newOrder,
      isNew: true
    });
    setFormData(prev => ({ ...prev, modules: newModules }));
    toast.success("New resource added!");
  };

  const removeResource = (moduleIndex: number, videoIndex: number, resourceIndex: number) => {
    const resource = formData.modules[moduleIndex].videos[videoIndex].videoResources[resourceIndex];
    const newModules = [...formData.modules];
    
    if (resource.id) {
      // Mark existing resource for deletion
      newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].isDeleted = true;
    } else {
      // Remove new resource completely
      newModules[moduleIndex].videos[videoIndex].videoResources.splice(resourceIndex, 1);
      newModules[moduleIndex].videos[videoIndex].videoResources.forEach((resource, index) => {
        resource.order = index + 1;
      });
    }
    
    setFormData(prev => ({ ...prev, modules: newModules }));
    toast.success("Resource marked for removal!");
  };

  // Filter out deleted items for display
  const visibleModules = formData.modules.filter(module => !module.isDeleted);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Course Modules</h2>
        <button
          type="button"
          onClick={addNewModule}
          disabled={isLoading}
          className="flex items-center px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Module
        </button>
      </div>

      <div className="space-y-8">
        {visibleModules.map((module, moduleIndex) => {
          const actualModuleIndex = formData.modules.findIndex(m => m === module);
          const visibleVideos = module.videos.filter(video => !video.isDeleted);
          
          return (
            <div key={module.id || `new-${moduleIndex}`} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
              {/* Module Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Module {module.order} {module.title && `- ${module.title}`}
                  {module.isNew && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">NEW</span>}
                </h3>
                <button
                  type="button"
                  onClick={() => removeModule(actualModuleIndex)}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Module Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Title
                </label>
                <input
                  type="text"
                  placeholder={`Module ${module.order} Title`}
                  value={module.title}
                  onChange={(e) => handleModuleChange(actualModuleIndex, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent bg-white"
                />
              </div>

              {/* Videos Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-700">Videos</h4>
                  <button
                    type="button"
                    onClick={() => addNewVideo(actualModuleIndex)}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1 bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 text-sm rounded-md transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Video
                  </button>
                </div>

                {/* Videos List */}
                <div className="space-y-4">
                  {visibleVideos.map((video, videoIndex) => {
                    const actualVideoIndex = module.videos.findIndex(v => v === video);
                    const visibleResources = video.videoResources.filter(resource => !resource.isDeleted);
                    
                    return (
                      <div key={video.id || `new-video-${videoIndex}`} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-medium text-gray-600">
                            Video {video.order} {video.title && `- ${video.title}`}
                            {video.isNew && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">NEW</span>}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeVideo(actualModuleIndex, actualVideoIndex)}
                            disabled={isLoading}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Video Title */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video Title
                          </label>
                          <input
                            type="text"
                            placeholder={`Video ${video.order} Title`}
                            value={video.title}
                            onChange={(e) => handleVideoChange(actualModuleIndex, actualVideoIndex, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Video Upload */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Video
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <div className="w-6 h-6 mx-auto mb-2 bg-[#017f00] rounded-full flex items-center justify-center">
                              <Video className="w-4 h-4 text-white" />
                            </div>
                            {video.url && (
                              <p className="text-xs text-blue-600 mb-2">
                                Current: {video.url.split('/').pop()}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mb-2">Mp4 - Max 300MB</p>
                            <label className="px-3 py-1 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-xs rounded-md transition-colors cursor-pointer">
                              Choose New Video
                              <input
                                type="file"
                                accept="video/mp4"
                                className="hidden"
                                onChange={(e) => handleFileUpload("moduleVideo", e, actualModuleIndex, actualVideoIndex)}
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              {fileStates.moduleVideos[actualModuleIndex]?.[actualVideoIndex]?.name || "No New File Chosen"}
                            </p>
                          </div>
                        </div>

                        {/* Video Resources */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h6 className="text-sm font-medium text-gray-700">Resources</h6>
                            <button
                              type="button"
                              onClick={() => addNewResource(actualModuleIndex, actualVideoIndex)}
                              disabled={isLoading}
                              className="flex items-center px-2 py-1 bg-green-100 border border-green-300 text-green-700 hover:bg-green-200 text-xs rounded-md transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Resource
                            </button>
                          </div>

                          <div className="space-y-3">
                            {visibleResources.map((resource, resourceIndex) => {
                              const actualResourceIndex = video.videoResources.findIndex(r => r === resource);
                              
                              return (
                                <div key={resource.id || `new-resource-${resourceIndex}`} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-600">
                                      Resource {resource.order} {resource.title && `- ${resource.title}`}
                                      {resource.isNew && <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">NEW</span>}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => removeResource(actualModuleIndex, actualVideoIndex, actualResourceIndex)}
                                      disabled={isLoading}
                                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      placeholder="Resource Title"
                                      value={resource.title}
                                      onChange={(e) => handleResourceChange(actualModuleIndex, actualVideoIndex, actualResourceIndex, "title", e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#017f00] focus:border-transparent text-xs"
                                    />
                                    
                                    <div className="flex gap-2">
                                      <label className="px-2 py-1 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-xs rounded-md transition-colors cursor-pointer flex-shrink-0">
                                        Choose New File
                                        <input
                                          type="file"
                                          accept=".zip,.rar,.pdf,.doc,.docx"
                                          className="hidden"
                                          onChange={(e) => handleFileUpload("videoResource", e, actualModuleIndex, actualVideoIndex, actualResourceIndex)}
                                        />
                                      </label>
                                      <div className="flex flex-col text-xs text-gray-500 self-center truncate">
                                        {resource.url && (
                                          <span className="text-blue-600">Current: {resource.url.split('/').pop()}</span>
                                        )}
                                        <span>
                                          {fileStates.videoResources[actualModuleIndex]?.[actualVideoIndex]?.[actualResourceIndex]?.name || "No New File"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}