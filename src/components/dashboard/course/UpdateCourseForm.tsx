/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useUpdateCourseByIdMutation,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useCreateVideoResourceMutation,
  useUpdateVideoResourceMutation,
  useDeleteVideoResourceMutation,
} from "@/redux/api/courseApi";
import { useSingleFileUploadMutation } from "@/redux/api/fileUploadApi";
import CourseMedia from "./CourseMedia";
import BasicCourseInfo from "./BasicCourseInfo";
import CourseModules from "./CourseModules";
import CourseActions from "./CourseActions";
import { useRouter } from "next/navigation";
import UpdateLearning from "./UpdateLearning";
import {
  useCreateLearningDataMutation,
  useDeleteLearningDataMutation,
  useUpdateLearningDataMutation,
} from "@/redux/api/learnignApi";

interface VideoResource {
  id?: string;
  title: string;
  url: string;
  order: number;
  file?: File;
  isNew?: boolean;
  isDeleted?: boolean;
}

interface ModuleVideo {
  id?: string;
  title: string;
  url: string;
  order: number;
  file?: File;
  videoResources: VideoResource[];
  isNew?: boolean;
  isDeleted?: boolean;
}

interface Module {
  id?: string;
  title: string;
  order: number;
  videos: ModuleVideo[];
  isNew?: boolean;
  isDeleted?: boolean;
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
    isDeleted?: boolean;
  }[];
}

interface UpdateCourseFormProps {
  courseId: string;
  courseData: any;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function UpdateCourseForm({
  courseId,
  courseData,
  onSuccess,
  onCancel,
}: UpdateCourseFormProps) {
  const router = useRouter();
  console.log(router);
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    subtitle: "",
    price: "",
    discount: "",
    courseType: "PAID",
    level: "",
    duration: "",
    language: "",
    classes: "",
    description: "",
    status: "UPCOMING",
    releaseDate: "",
    demoVideo: "",
    thumnail: "",
    modules: [],
    learningData: [],
  });

  const [fileStates, setFileStates] = useState({
    demoVideo: null as File | null,
    thumbnail: null as File | null,
    moduleVideos: {} as {
      [moduleIndex: number]: { [videoIndex: number]: File | null };
    },
    videoResources: {} as {
      [moduleIndex: number]: {
        [videoIndex: number]: { [resourceIndex: number]: File | null };
      };
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API hooks
  const [updateCourse, { isLoading: isUpdatingCourse }] =
    useUpdateCourseByIdMutation();
  const [createModule, { isLoading: isCreatingModule }] =
    useCreateModuleMutation();
  const [updateModule, { isLoading: isUpdatingModule }] =
    useUpdateModuleMutation();
  const [deleteModule, { isLoading: isDeletingModule }] =
    useDeleteModuleMutation();
  const [createVideo, { isLoading: isCreatingVideo }] =
    useCreateVideoMutation();
  const [updateVideo, { isLoading: isUpdatingVideo }] =
    useUpdateVideoMutation();
  const [deleteVideo, { isLoading: isDeletingVideo }] =
    useDeleteVideoMutation();
  const [createVideoResource, { isLoading: isCreatingVideoResource }] =
    useCreateVideoResourceMutation();
  const [updateVideoResource, { isLoading: isUpdatingVideoResource }] =
    useUpdateVideoResourceMutation();
  const [deleteVideoResource, { isLoading: isDeletingVideoResource }] =
    useDeleteVideoResourceMutation();
  const [uploadFile, { isLoading: isUploadingFile }] =
    useSingleFileUploadMutation();
  const [updateLearningData] = useUpdateLearningDataMutation();
  const [createLearningData] = useCreateLearningDataMutation();
  const [deleteLearningData] = useDeleteLearningDataMutation();

  // Load course data when component mounts
  useEffect(() => {
    if (courseData) {
      setFormData({
        title: courseData.title || "",
        subtitle: courseData.subtitle || "",
        price: courseData.price?.toString() || "",
        discount: courseData.discount?.toString() || "",
        courseType: courseData.courseType || "PAID",
        level: courseData.level || "",
        duration: courseData.duration?.toString() || "",
        language: courseData.language || "",
        classes: courseData.classes || "",
        description: courseData.description || "",
        status: courseData.status || "UPCOMING",
        releaseDate: courseData.releaseDate
          ? new Date(courseData.releaseDate).toISOString().split("T")[0]
          : "",
        demoVideo: courseData.demoVideo || "",
        thumnail: courseData.thumnail || "",
        modules: courseData.modules
          ? [...courseData.modules]
              .sort((a, b) => a.order - b.order)
              .map((module: any, moduleIndex: number) => ({
                id: module.id,
                title: module.title || "",
                order: module.order || moduleIndex + 1,
                videos: module.videos
                  ? [...module.videos]
                      .sort((a, b) => a.order - b.order)
                      .map((video: any, videoIndex: number) => ({
                        id: video.id,
                        title: video.title || "",
                        url: video.url || "",
                        order: video.order || videoIndex + 1,
                        videoResources: video.videoResources
                          ? [...video.videoResources]
                              .sort((a, b) => a.order - b.order)
                              .map((resource: any, resourceIndex: number) => ({
                                id: resource.id,
                                title: resource.title || "",
                                url: resource.url || "",
                                order: resource.order || resourceIndex + 1,
                              }))
                          : [{ title: "", url: "", order: 1 }],
                      }))
                  : [
                      {
                        title: "",
                        url: "",
                        order: 1,
                        videoResources: [{ title: "", url: "", order: 1 }],
                      },
                    ],
              }))
          : [
              {
                title: "",
                order: 1,
                videos: [
                  {
                    title: "",
                    url: "",
                    order: 1,
                    videoResources: [{ title: "", url: "", order: 1 }],
                  },
                ],
              },
            ],
        learningData: courseData.learningData
          ? [...courseData.learningData]
              .sort((a, b) => a.order - b.order)
              .map((item: any) => ({
                id: item.id,
                comment: item.comment || "",
                order: item.order || 0,
              }))
          : [],
      });
    }
  }, [courseData]);

  const handleLearningDataUpdate = async () => {
    if (!formData.learningData) return;

    // Process deletions first
    for (const item of formData.learningData) {
      if (item.isDeleted && item.id) {
        await deleteLearningData(item.id);
      }
    }

    // Process updates and creations
    for (let i = 0; i < formData.learningData.length; i++) {
      const item = formData.learningData[i];

      if (item.isDeleted) continue;

      if (item.comment.trim()) {
        if (item.id) {
          // Update existing learning data
          await updateLearningData({
            id: item.id,
            data: {
              comment: item.comment,
              order: i + 1,
            },
          });
        } else {
          // Create new learning data
          await createLearningData({
            comment: item.comment,
            order: i + 1,
            courseId: courseId,
          });
        }
      }
    }
  };

  const uploadFileToServer = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData);

      if (
        response.data &&
        response.data.success &&
        response.data.data &&
        response.data.data.fileUrl
      ) {
        return response.data.data.fileUrl;
      } else {
        throw new Error("Invalid response structure from file upload");
      }
    } catch (error: any) {
      console.error("File upload failed:", error);
      let errorMessage = "File upload failed";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Course title is required";
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required";
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = "Valid price is required";
    if (!formData.level) newErrors.level = "Skill level is required";
    if (!formData.duration || isNaN(Number(formData.duration)))
      newErrors.duration = "Valid duration is required";
    if (!formData.language.trim()) newErrors.language = "Language is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload new files if provided
      let demoVideoUrl = formData.demoVideo;
      let thumbnailUrl = formData.thumnail;

      if (fileStates.demoVideo) {
        demoVideoUrl = await uploadFileToServer(fileStates.demoVideo);
      }

      if (fileStates.thumbnail) {
        thumbnailUrl = await uploadFileToServer(fileStates.thumbnail);
      }

      // Step 2: Update the course
      const courseUpdateData = {
        title: formData.title,
        subtitle: formData.subtitle,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        courseType: formData.courseType,
        level: formData.level,
        duration: parseInt(formData.duration),
        language: formData.language,
        classes: formData.classes,
        description: formData.description,
        demoVideo: demoVideoUrl,
        thumnail: thumbnailUrl,
        status: formData.status,
        releaseDate: formData.releaseDate
          ? new Date(formData.releaseDate).toISOString()
          : null,
      };

      await updateCourse({ id: courseId, data: courseUpdateData });

      // Step 3: Handle learning data
      await handleLearningDataUpdate();

      // Step 4: Handle modules, videos, and resources if status is ONGOING
      if (formData.status === "ONGOING" && formData.modules.length > 0) {
        await handleModulesUpdate();
      }

      toast.success("Course updated successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Course update failed:", error);
      let errorMessage = "Failed to update course. Please try again.";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      if (error?.data?.errorSources) {
        errorMessage = `Validation error: ${error.data.errorSources.join(
          ", "
        )}`;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModulesUpdate = async () => {
    // Process deletions first
    for (const courseModule of formData.modules) {
      if (courseModule.isDeleted && courseModule.id) {
        await deleteModule(courseModule.id);
        continue;
      }

      for (const video of courseModule.videos) {
        if (video.isDeleted && video.id) {
          await deleteVideo(video.id);
          continue;
        }

        for (const resource of video.videoResources) {
          if (resource.isDeleted && resource.id) {
            await deleteVideoResource(resource.id);
          }
        }
      }
    }

    // Process updates and creations
    for (
      let moduleIndex = 0;
      moduleIndex < formData.modules.length;
      moduleIndex++
    ) {
      const moduleData = formData.modules[moduleIndex];

      if (moduleData.isDeleted) continue;

      if (moduleData.title.trim()) {
        let moduleId = moduleData.id;

        if (moduleData.isNew || !moduleId) {
          // Create new module
          const moduleResponse = await createModule({
            title: moduleData.title,
            order: moduleIndex + 1,
            courseId: courseId,
          });

          if (
            moduleResponse.data &&
            moduleResponse.data.success &&
            moduleResponse.data.data &&
            moduleResponse.data.data.id
          ) {
            moduleId = moduleResponse.data.data.id;
          } else if (moduleResponse.data && moduleResponse.data.id) {
            moduleId = moduleResponse.data.id;
          }
        } else {
          // Update existing module
          await updateModule({
            id: moduleId,
            data: {
              title: moduleData.title,
              order: moduleIndex + 1,
            },
          });
        }

        if (!moduleId) {
          throw new Error("Failed to get moduleId");
        }

        // Handle videos for this module
        await handleVideosUpdate(moduleData.videos, moduleId, moduleIndex);
      }
    }
  };

  const handleVideosUpdate = async (
    videos: ModuleVideo[],
    moduleId: string,
    moduleIndex: number
  ) => {
    for (let videoIndex = 0; videoIndex < videos.length; videoIndex++) {
      const videoData = videos[videoIndex];

      if (videoData.isDeleted) continue;

      if (videoData.title.trim()) {
        // Upload video file if new file is provided
        let videoUrl = videoData.url;
        const videoFile = fileStates.moduleVideos[moduleIndex]?.[videoIndex];
        if (videoFile) {
          videoUrl = await uploadFileToServer(videoFile);
        }

        let videoId = videoData.id;

        if (videoData.isNew || !videoId) {
          // Create new video
          const videoResponse = await createVideo({
            title: videoData.title,
            url: videoUrl,
            order: videoIndex + 1,
            moduleId: moduleId,
          });

          if (
            videoResponse.data &&
            videoResponse.data.success &&
            videoResponse.data.data &&
            videoResponse.data.data.id
          ) {
            videoId = videoResponse.data.data.id;
          } else if (videoResponse.data && videoResponse.data.id) {
            videoId = videoResponse.data.id;
          }
        } else {
          // Update existing video
          await updateVideo({
            id: videoId,
            data: {
              title: videoData.title,
              url: videoUrl,
              order: videoIndex + 1,
            },
          });
        }

        if (!videoId) {
          throw new Error("Failed to get videoId");
        }

        // Handle video resources
        await handleResourcesUpdate(
          videoData.videoResources,
          videoId,
          moduleIndex,
          videoIndex
        );
      }
    }
  };

  const handleResourcesUpdate = async (
    resources: VideoResource[],
    videoId: string,
    moduleIndex: number,
    videoIndex: number
  ) => {
    for (
      let resourceIndex = 0;
      resourceIndex < resources.length;
      resourceIndex++
    ) {
      const resourceData = resources[resourceIndex];

      if (resourceData.isDeleted) continue;

      if (resourceData.title.trim()) {
        // Upload resource file if new file is provided
        let resourceUrl = resourceData.url;
        const resourceFile =
          fileStates.videoResources[moduleIndex]?.[videoIndex]?.[resourceIndex];
        if (resourceFile) {
          resourceUrl = await uploadFileToServer(resourceFile);
        }

        if (resourceData.isNew || !resourceData.id) {
          // Create new resource
          await createVideoResource({
            title: resourceData.title,
            url: resourceUrl,
            order: resourceIndex + 1,
            videoId: videoId,
          });
        } else {
          // Update existing resource
          await updateVideoResource({
            id: resourceData.id,
            data: {
              title: resourceData.title,
              url: resourceUrl,
              order: resourceIndex + 1,
            },
          });
        }
      }
    }
  };

  const isLoading =
    isSubmitting ||
    isUpdatingCourse ||
    isCreatingModule ||
    isUpdatingModule ||
    isDeletingModule ||
    isCreatingVideo ||
    isUpdatingVideo ||
    isDeletingVideo ||
    isCreatingVideoResource ||
    isUpdatingVideoResource ||
    isDeletingVideoResource ||
    isUploadingFile;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Update Course: {formData.title}
            </h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <BasicCourseInfo
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              <UpdateLearning
                formData={formData}
                setFormData={setFormData}
                fileStates={fileStates}
                setFileStates={setFileStates}
              />
              <CourseMedia
                formData={formData}
                setFormData={setFormData}
                fileStates={fileStates}
                setFileStates={setFileStates}
              />
              {formData.status === "ONGOING" && (
                <CourseModules
                  formData={formData}
                  setFormData={setFormData}
                  fileStates={fileStates}
                  setFileStates={setFileStates}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>

          <CourseActions
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
