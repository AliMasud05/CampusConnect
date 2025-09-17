/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { useCreateCourseMutation, useCreateModuleMutation, useCreateVideoMutation, useCreateVideoResourceMutation } from "@/redux/api/courseApi"
import { useSingleFileUploadMutation } from "@/redux/api/fileUploadApi"
import { useCreateLearningDataMutation } from "@/redux/api/learnignApi"
import { Calendar, Camera, Loader2, Plus, Video, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

// Mock Redux hooks - replace with your actual imports
// const useCreateCourseMutation = () => [
//   async (data: any) => {
//     console.log("Creating course:", data)
//     return { data: { id: "course-123" } }
//   },
//   { isLoading: false }
// ]

// const useCreatemoduleMutation = () => [
//   async (data: any) => {
//     console.log("Creating module:", data)
//     return { data: { id: `module-${Date.now()}` } }
//   },
//   { isLoading: false }
// ]

// const useCreateVideoMutation = () => [
//   async (data: any) => {
//     console.log("Creating video:", data)
//     return { data: { id: `video-${Date.now()}` } }
//   },
//   { isLoading: false }
// ]

// const useCreateVideoResourceMutation = () => [
//   async (data: any) => {
//     console.log("Creating video resource:", data)
//     return { data: { id: `resource-${Date.now()}` } }
//   },
//   { isLoading: false }
// ]

// const useSingleFileUploadMutation = () => [
//   async (data: any) => {
//     console.log("Uploading file:", data)
//     return { data: { url: `https://example.com/file-${Date.now()}` } }
//   },
//   { isLoading: false }
// ]

// // Simple toast implementation for demo
// const toast = {
//   success: (message: string) => alert(`✅ ${message}`),
//   error: (message: string) => alert(`❌ ${message}`),
//   info: (message: string) => alert(`ℹ️ ${message}`)
// }

interface VideoResource {
  title: string
  url: string
  order: number
  file?: File
}

interface ModuleVideo {
  title: string
  url: string
  order: number
  file?: File
  videoResources: VideoResource[]
}

interface Module {
  title: string
  order: number
  videos: ModuleVideo[]
}
interface LearningData {
  courseId: string,
  comment: string,
  order?: number
}

interface CourseFormData {
  title: string
  subtitle: string
  price: string
  discount:string
  courseType: "PAID" | "FREE"
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | ""
  duration: string
  language: string
  classes: string
  description: string
  learningData: LearningData[]
  status: "UPCOMING" | "ONGOING"
  releaseDate: string
  modules: Module[]
}

export default function CreateCourse() {
    const router = useRouter()
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    subtitle: "",
    price: "",
    discount:"",
    courseType: "PAID",
    level: "",
    duration: "",
    language: "",
    classes: "",
    description: "",
    status: "UPCOMING",
    releaseDate: "",
    learningData: [{
      courseId: "",
      comment: "",
      order: 1,
    }],    
   
    modules: [{ 
      title: "", 
      order: 1,
      videos: [{ 
        title: "", 
        url: "", 
        order: 1,
        videoResources: [{ title: "", url: "", order: 1 }] 
      }] 
    }],
  })

  const [fileStates, setFileStates] = useState({
    demoVideo: null as File | null,
    thumbnail: null as File | null,
    moduleVideos: {} as {[moduleIndex: number]: {[videoIndex: number]: File | null}},
    videoResources: {} as {[moduleIndex: number]: {[videoIndex: number]: {[resourceIndex: number]: File | null}}},
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redux hooks
  const [createCourse, { isLoading: isCreatingCourse }] = useCreateCourseMutation()
  const [createModule, { isLoading: isCreatingModule }] = useCreateModuleMutation()
  const [createVideo, { isLoading: isCreatingVideo }] = useCreateVideoMutation()
  const [createVideoResource, { isLoading: isCreatingVideoResource }] = useCreateVideoResourceMutation()
  const [uploadFile, { isLoading: isUploadingFile }] = useSingleFileUploadMutation()
  const [createLearningData] =useCreateLearningDataMutation();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleModuleChange = (moduleIndex: number, field: string, value: string) => {
    const newModules = [...formData.modules]
    if (field === "title") {
      newModules[moduleIndex].title = value
    }
    setFormData(prev => ({ ...prev, modules: newModules }))
  }

  const handleVideoChange = (moduleIndex: number, videoIndex: number, field: string, value: string) => {
    const newModules = [...formData.modules]
    if (field === "title") {
      newModules[moduleIndex].videos[videoIndex].title = value
    } else if (field === "url") {
      newModules[moduleIndex].videos[videoIndex].url = value
    }
    setFormData(prev => ({ ...prev, modules: newModules }))
  }

  const handleResourceChange = (moduleIndex: number, videoIndex: number, resourceIndex: number, field: string, value: string) => {
    const newModules = [...formData.modules]
    if (field === "title") {
      newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].title = value
    } else if (field === "url") {
      newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].url = value
    }
    setFormData(prev => ({ ...prev, modules: newModules }))
  }

  const shouldShowUploads = formData.status === "ONGOING"

  const handleFileUpload = (
    type: string,
    event: React.ChangeEvent<HTMLInputElement>,
    moduleIndex?: number,
    videoIndex?: number,
    resourceIndex?: number,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === "demoVideo" || type === "thumbnail") {
        setFileStates(prev => ({ ...prev, [type]: file }))
      } else if (type === "moduleVideo" && moduleIndex !== undefined && videoIndex !== undefined) {
        setFileStates(prev => {
          const newModuleVideos = { ...prev.moduleVideos }
          if (!newModuleVideos[moduleIndex]) newModuleVideos[moduleIndex] = {}
          newModuleVideos[moduleIndex][videoIndex] = file
          return { ...prev, moduleVideos: newModuleVideos }
        })
      } else if (type === "videoResource" && moduleIndex !== undefined && videoIndex !== undefined && resourceIndex !== undefined) {
        setFileStates(prev => {
          const newVideoResources = { ...prev.videoResources }
          if (!newVideoResources[moduleIndex]) newVideoResources[moduleIndex] = {}
          if (!newVideoResources[moduleIndex][videoIndex]) newVideoResources[moduleIndex][videoIndex] = {}
          newVideoResources[moduleIndex][videoIndex][resourceIndex] = file
          return { ...prev, videoResources: newVideoResources }
        })
      }
      toast.success(`File selected successfully!`)
    }
  }

  const uploadFileToServer = async (file: File): Promise<string> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await uploadFile(formData)
      console.log("File upload response:", response)
      
      // Handle the response structure: { success, message, data: { fileUrl } }
      if (response.data && response.data.success && response.data.data && response.data.data.fileUrl) {
        return response.data.data.fileUrl
      } else {
        console.error("Unexpected file upload response structure:", response)
        throw new Error("Invalid response structure from file upload")
      }
    } catch (error: any) {
      console.error("File upload failed:", error)
      
      // Provide more specific error message
      let errorMessage = "File upload failed"
      if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      throw new Error(errorMessage)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.title.trim()) newErrors.title = "Course title is required"
    if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required"
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Valid price is required"
    if (!formData.level) newErrors.level = "Skill level is required"
    if (!formData.duration || isNaN(Number(formData.duration))) newErrors.duration = "Valid duration is required"
    if (!formData.language.trim()) newErrors.language = "Language is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Step 1: Upload demo video and thumbnail if provided
      let demoVideoUrl = ""
      let thumbnailUrl = ""

      if (fileStates.demoVideo) {
        demoVideoUrl = await uploadFileToServer(fileStates.demoVideo)
      }

      if (fileStates.thumbnail) {
        thumbnailUrl = await uploadFileToServer(fileStates.thumbnail)
      }

      // Step 2: Create the course
      const courseData = {
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
        thumnail: thumbnailUrl, // Note: matches your schema field name
        status: formData.status,
        releaseDate: formData.releaseDate ? new Date(formData.releaseDate).toISOString() : null,
      }

      const courseResponse = await createCourse(courseData)
      
      // Handle the response structure: { success, message, data: { course data } }
      let courseId
      if (courseResponse.data && courseResponse.data.success && courseResponse.data.data && courseResponse.data.data.id) {
        courseId = courseResponse.data.data.id
      } else if (courseResponse.data && courseResponse.data.id) {
        // Fallback in case response structure is different
        courseId = courseResponse.data.id
      } else {
        throw new Error("Invalid response structure from course creation")
      }

      console.log("Extracted courseId:", courseId)
      
      if (!courseId) {
        throw new Error("Failed to extract courseId from course creation response")
      }

      //step 3 create learning data
      const learningData = formData.learningData
      for (let i = 0; i < learningData.length; i++) {
        const learningDataItem = learningData[i]
        const response = await createLearningData({
          courseId: courseId,
          comment: learningDataItem.comment,
          
        })
        toast.success("Learning data created successfully!")
        console.log("Learning data created:", response)
        if (response.error) {
          toast.error("Failed to create learning data")
          throw new Error("Failed to create learning data")
        }

      }

      // Step 3: Create modules, videos, and resources if status is ONGOING
      if (formData.status === "ONGOING" && formData.modules.length > 0) {
        for (let moduleIndex = 0; moduleIndex < formData.modules.length; moduleIndex++) {
          const moduleData = formData.modules[moduleIndex]
          
          if (moduleData.title.trim()) {
            // Create module
            const moduleResponse = await createModule({
              title: moduleData.title,
              order: moduleIndex + 1,
              courseId: courseId,
            })
            console.log("Module creation response:", moduleResponse)
            
            // Handle module response structure
            let moduleId
            if (moduleResponse.data && moduleResponse.data.success && moduleResponse.data.data && moduleResponse.data.data.id) {
              moduleId = moduleResponse.data.data.id
            } else if (moduleResponse.data && moduleResponse.data.id) {
              moduleId = moduleResponse.data.id
            } else {
              console.error("Unexpected module response structure:", moduleResponse)
              throw new Error("Invalid response structure from module creation")
            }

            console.log("Extracted moduleId:", moduleId)
            
            if (!moduleId) {
              throw new Error("Failed to extract moduleId from module creation response")
            }

            // Create videos for this module
            for (let videoIndex = 0; videoIndex < moduleData.videos.length; videoIndex++) {
              const videoData = moduleData.videos[videoIndex]
              
              if (videoData.title.trim()) {
                // Upload video file if exists
                let videoUrl = ""
                const videoFile = fileStates.moduleVideos[moduleIndex]?.[videoIndex]
                if (videoFile) {
                  videoUrl = await uploadFileToServer(videoFile)
                }

                // Create video
                const videoResponse = await createVideo({
                  title: videoData.title,
                  url: videoUrl,
                  order: videoIndex + 1,
                  moduleId: moduleId,
                })
                
                // Handle video response structure
                let videoId
                if (videoResponse.data && videoResponse.data.success && videoResponse.data.data && videoResponse.data.data.id) {
                  videoId = videoResponse.data.data.id
                } else if (videoResponse.data && videoResponse.data.id) {
                  videoId = videoResponse.data.id
                } else {
                  throw new Error("Invalid response structure from video creation")
                }

                console.log("Extracted videoId:", videoId)
                
                if (!videoId) {
                  throw new Error("Failed to extract videoId from video creation response")
                }

                // Create video resources
                for (let resourceIndex = 0; resourceIndex < videoData.videoResources.length; resourceIndex++) {
                  const resourceData = videoData.videoResources[resourceIndex]
                  
                  if (resourceData.title.trim()) {
                    // Upload resource file if exists
                    let resourceUrl = ""
                    const resourceFile = fileStates.videoResources[moduleIndex]?.[videoIndex]?.[resourceIndex]
                    if (resourceFile) {
                      resourceUrl = await uploadFileToServer(resourceFile)
                    }

                    // Create video resource
                    await createVideoResource({
                      title: resourceData.title,
                      url: resourceUrl,
                      order: resourceIndex + 1,
                      videoId: videoId,
                    })
                  }
                }
              }
            }
          }
        }
      }

      toast.success("Course created successfully!")
     router.push(`/dashboard/manage-course`) // Redirect to the course page
      
      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        price: "",
        discount:"",
        courseType: "PAID",
        level: "",
        duration: "",
        language: "",
        classes: "",
        description: "",
        status: "UPCOMING",
        releaseDate: "",
        learningData: [{
          courseId: "",
          comment: "",
        }],
        modules: [{ 
          title: "", 
          order: 1,
          videos: [{ 
            title: "", 
            url: "", 
            order: 1,
            videoResources: [{ title: "", url: "", order: 1 }] 
          }] 
        }],
      })
      setFileStates({
        demoVideo: null,
        thumbnail: null,
        moduleVideos: {},
        videoResources: {},
      })

    } catch (error: any) {
      console.error("Course creation failed:", error)
      
      // Provide more detailed error information
      let errorMessage = "Failed to create course. Please try again."
      
      if (error?.data?.message) {
        errorMessage = error.data.message
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      // If it's a validation error, show specific field errors
      if (error?.data?.errorSources) {
        console.error("Validation errors:", error.data.errorSources)
        errorMessage = `Validation error: ${error.data.errorSources.join(", ")}`
      }
      
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          videoResources: [{ title: "", url: "", order: 1 }] 
        }] 
      }]
    }))
    toast.success("New module added!")
  }

  const removeModule = (moduleIndex: number) => {
    if (formData.modules.length > 1) {
      const newModules = formData.modules.filter((_, i) => i !== moduleIndex)
      // Update order numbers
      newModules.forEach((module, index) => {
        module.order = index + 1
      })
      setFormData(prev => ({ ...prev, modules: newModules }))
      toast.success("Module removed!")
    }
  }

  // Video operations
  const addNewVideo = (moduleIndex: number) => {
    const newModules = [...formData.modules]
    const newOrder = newModules[moduleIndex].videos.length + 1
    newModules[moduleIndex].videos.push({
      title: "",
      url: "",
      order: newOrder,
      videoResources: [{ title: "", url: "", order: 1 }]
    })
    setFormData(prev => ({ ...prev, modules: newModules }))
    toast.success("New video added!")
  }

  const removeVideo = (moduleIndex: number, videoIndex: number) => {
    const newModules = [...formData.modules]
    if (newModules[moduleIndex].videos.length > 1) {
      newModules[moduleIndex].videos.splice(videoIndex, 1)
      // Update order numbers
      newModules[moduleIndex].videos.forEach((video, index) => {
        video.order = index + 1
      })
      setFormData(prev => ({ ...prev, modules: newModules }))
      toast.success("Video removed!")
    }
  }

  // Resource operations
  const addNewResource = (moduleIndex: number, videoIndex: number) => {
    const newModules = [...formData.modules]
    const newOrder = newModules[moduleIndex].videos[videoIndex].videoResources.length + 1
    newModules[moduleIndex].videos[videoIndex].videoResources.push({
      title: "",
      url: "",
      order: newOrder
    })
    setFormData(prev => ({ ...prev, modules: newModules }))
    toast.success("New resource added!")
  }

  const removeResource = (moduleIndex: number, videoIndex: number, resourceIndex: number) => {
    const newModules = [...formData.modules]
    if (newModules[moduleIndex].videos[videoIndex].videoResources.length > 1) {
      newModules[moduleIndex].videos[videoIndex].videoResources.splice(resourceIndex, 1)
      // Update order numbers
      newModules[moduleIndex].videos[videoIndex].videoResources.forEach((resource, index) => {
        resource.order = index + 1
      })
      setFormData(prev => ({ ...prev, modules: newModules }))
      toast.success("Resource removed!")
    }
  }

  //add new learning data
const addNewLearningData = () => {
  setFormData(prev => ({
    ...prev,
    learningData: [...prev.learningData, { 
      courseId: "",
      comment: "",
    }],
  }))
  toast.success("New learning data added!")
}

//remove learning data
const removeLearningData = (index: number) => {
  if (formData.learningData.length > 1) {
    const newLearningData = formData.learningData.filter((_, i) => i !== index)
    // Update order numbers
    newLearningData.forEach((learningData, index) => {
      learningData.order = index + 1
    })
    setFormData(prev => ({ ...prev, learningData: newLearningData }))
    toast.success("Learning data removed!")
  }
}

  const handleCancel = () => {
    toast.info("Course creation cancelled")
    router.push(`/dashboard/manage-course`)
  }

  const isLoading = isSubmitting || isCreatingCourse || isCreatingModule || isCreatingVideo || isCreatingVideoResource || isUploadingFile

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Create New Course
        </h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
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
              {/* Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount %
                </label>
                <input
                  type="number"
                  placeholder="Enter discount percentage"
                  min="0"
                  step="100"
                  value={formData.discount}
                  onChange={(e) => handleInputChange("discount", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                />
                {errors.discount && (
                  <p className="mt-1 text-sm text-red-600">{errors.discount}</p>
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
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  placeholder="Enter duration in minutes"
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

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Demo video and Thumbnail */}
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
                    </div>
                    <p className="text-xs text-gray-500 mb-4 mt-2">
                      Formats: Mp4 - Max 300MB
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-start">
                      <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                        Choose Video
                        <input
                          type="file"
                          accept="video/mp4"
                          className="hidden"
                          onChange={(e) => handleFileUpload("demoVideo", e)}
                        />
                      </label>
                      <span className="text-sm text-gray-500 self-center">
                        {fileStates.demoVideo ? fileStates.demoVideo.name : "No File Chosen"}
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
                    </div>
                    <p className="text-xs text-gray-500 mb-4 mt-2">
                      Formats: JPG, PNG, JPEG - Max 5MB
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-start">
                      <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                        Choose Image
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          className="hidden"
                          onChange={(e) => handleFileUpload("thumbnail", e)}
                        />
                      </label>
                      <span className="text-sm text-gray-500 self-center">
                        {fileStates.thumbnail ? fileStates.thumbnail.name : "No File Chosen"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* upload learning data */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What you will learn
                </label>
                <Button
                  type="button"
                  onClick={addNewLearningData}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors disabled:opacity-50 mb-4"
                  >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Learning Data
                </Button>
                <div className="space-y-4 mb-4">
                  {formData.learningData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder={`Learning Data ${index + 1}`}
                        value={data.comment}
                        onChange={(e) => {
                          const newLearningData = [...formData.learningData]
                          newLearningData[index].comment = e.target.value
                          setFormData(prev => ({ ...prev, learningData: newLearningData }))
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeLearningData(index)}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Upload learning data only when the course is ongoing.
                </p>


              </div>

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

              {/* Course Modules - Only show when status is "ONGOING" */}
              {shouldShowUploads && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <label className="text-lg font-medium text-gray-700">
                      Course Modules
                    </label>
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
                    {formData.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                        {/* Module Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-800">
                            Module {module.order} {module.title && `- ${module.title}`}
                          </h3>
                          {formData.modules.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeModule(moduleIndex)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
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
                            onChange={(e) => handleModuleChange(moduleIndex, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent bg-white"
                          />
                        </div>

                        {/* Videos Section */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-md font-medium text-gray-700">Videos</h4>
                            <button
                              type="button"
                              onClick={() => addNewVideo(moduleIndex)}
                              disabled={isLoading}
                              className="flex items-center px-3 py-1 bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 text-sm rounded-md transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Video
                            </button>
                          </div>

                          {/* Videos List */}
                          <div className="space-y-4">
                            {module.videos.map((video, videoIndex) => (
                              <div key={videoIndex} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="text-sm font-medium text-gray-600">
                                    Video {video.order} {video.title && `- ${video.title}`}
                                  </h5>
                                  {module.videos.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeVideo(moduleIndex, videoIndex)}
                                      disabled={isLoading}
                                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  )}
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
                                    onChange={(e) => handleVideoChange(moduleIndex, videoIndex, "title", e.target.value)}
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
                                    <p className="text-xs text-gray-500 mb-2">Mp4 - Max 300MB</p>
                                    <label className="px-3 py-1 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-xs rounded-md transition-colors cursor-pointer">
                                      Choose Video
                                      <input
                                        type="file"
                                        accept="video/mp4"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload("moduleVideo", e, moduleIndex, videoIndex)}
                                      />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {fileStates.moduleVideos[moduleIndex]?.[videoIndex]?.name || "No File Chosen"}
                                    </p>
                                  </div>
                                </div>

                                {/* Video Resources */}
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h6 className="text-sm font-medium text-gray-700">Resources</h6>
                                    <button
                                      type="button"
                                      onClick={() => addNewResource(moduleIndex, videoIndex)}
                                      disabled={isLoading}
                                      className="flex items-center px-2 py-1 bg-green-100 border border-green-300 text-green-700 hover:bg-green-200 text-xs rounded-md transition-colors disabled:opacity-50"
                                    >
                                      <Plus className="w-3 h-3 mr-1" />
                                      Add Resource
                                    </button>
                                  </div>

                                  <div className="space-y-3">
                                    {video.videoResources.map((resource, resourceIndex) => (
                                      <div key={resourceIndex} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs font-medium text-gray-600">
                                            Resource {resource.order} {resource.title && `- ${resource.title}`}
                                          </span>
                                          {video.videoResources.length > 1 && (
                                            <button
                                              type="button"
                                              onClick={() => removeResource(moduleIndex, videoIndex, resourceIndex)}
                                              disabled={isLoading}
                                              className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          )}
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <input
                                            type="text"
                                            placeholder="Resource Title"
                                            value={resource.title}
                                            onChange={(e) => handleResourceChange(moduleIndex, videoIndex, resourceIndex, "title", e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#017f00] focus:border-transparent text-xs"
                                          />
                                          
                                          <div className="flex gap-2">
                                            <label className="px-2 py-1 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-xs rounded-md transition-colors cursor-pointer flex-shrink-0">
                                              Choose File
                                              <input
                                                type="file"
                                                accept=".zip,.rar,.pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload("videoResource", e, moduleIndex, videoIndex, resourceIndex)}
                                              />
                                            </label>
                                            <span className="text-xs text-gray-500 self-center truncate">
                                              {fileStates.videoResources[moduleIndex]?.[videoIndex]?.[resourceIndex]?.name || "No File"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-primary cursor-pointer text-white font-medium rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Course...
                </>
              ) : (
                "Publish Course"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-8 py-3 border cursor-pointer border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}