// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import {
//   useCreateModuleMutation,
//   useCreateVideoMutation,
//   useCreateVideoResourceMutation,
//   useDeleteModuleMutation,
//   useDeleteVideoMutation,
//   useDeleteVideoResourceMutation,
//   useGetCourseByIdQuery,
//   useUpdateCourseByIdMutation,
  
//   useUpdateModuleMutation,
  
//   useUpdateVideoMutation,
//   useUpdateVideoResourceMutation
// } from "@/redux/api/courseApi"
// import { useSingleFileUploadMutation } from "@/redux/api/fileUploadApi"
// import { ArrowLeft, Calendar, Camera, Loader2, Plus, Video, X } from "lucide-react"
// import { useRouter } from "next/navigation"
// import type React from "react"
// import { useEffect, useState } from "react"
// import { toast } from "sonner"

// interface VideoResource {
//   id?: string
//   title: string
//   url: string
//   order: number
//   file?: File
//   isNew?: boolean
//   isDeleted?: boolean
// }

// interface ModuleVideo {
//   id?: string
//   title: string
//   url: string
//   order: number
//   file?: File
//   videoResources: VideoResource[]
//   isNew?: boolean
//   isDeleted?: boolean
// }

// interface Module {
//   id?: string
//   title: string
//   order: number
//   videos: ModuleVideo[]
//   isNew?: boolean
//   isDeleted?: boolean
// }

// interface CourseFormData {
//   title: string
//   subtitle: string
//   price: string
//   courseType: "PAID" | "FREE"
//   level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | ""
//   duration: string
//   language: string
//   classes: string
//   description: string
//   status: "UPCOMING" | "ONGOING"
//   releaseDate: string
//   demoVideo: string
//   thumnail: string
//   modules: Module[]
// }

// interface UpdateCourseProps {
//   courseId: string
// }

// export default function UpdateCourse({ courseId }: UpdateCourseProps) {
//   const router = useRouter()
  
//   const [formData, setFormData] = useState<CourseFormData>({
//     title: "",
//     subtitle: "",
//     price: "",
//     courseType: "PAID",
//     level: "",
//     duration: "",
//     language: "",
//     classes: "",
//     description: "",
//     status: "UPCOMING",
//     releaseDate: "",
//     demoVideo: "",
//     thumnail: "",
//     modules: [],
//   })

//   const [fileStates, setFileStates] = useState({
//     demoVideo: null as File | null,
//     thumbnail: null as File | null,
//     moduleVideos: {} as {[moduleIndex: number]: {[videoIndex: number]: File | null}},
//     videoResources: {} as {[moduleIndex: number]: {[videoIndex: number]: {[resourceIndex: number]: File | null}}},
//   })

//   const [errors, setErrors] = useState<{[key: string]: string}>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isDataLoaded, setIsDataLoaded] = useState(false)

//   // API hooks
//   const { data: courseData, isLoading: isLoadingCourse, error: courseError } = useGetCourseByIdQuery(courseId)
//   const [updateCourse, { isLoading: isUpdatingCourse }] = useUpdateCourseByIdMutation()
//   const [createModule, { isLoading: isCreatingModule }] = useCreateModuleMutation()
//   const [updateModule, { isLoading: isUpdatingModule }] = useUpdateModuleMutation()
//   const [deleteModule, { isLoading: isDeletingModule }] = useDeleteModuleMutation()
//   const [createVideo, { isLoading: isCreatingVideo }] = useCreateVideoMutation()
//   const [updateVideo, { isLoading: isUpdatingVideo }] = useUpdateVideoMutation()
//   const [deleteVideo, { isLoading: isDeletingVideo }] = useDeleteVideoMutation()
//   const [createVideoResource, { isLoading: isCreatingVideoResource }] = useCreateVideoResourceMutation()
//   const [updateVideoResource, { isLoading: isUpdatingVideoResource }] = useUpdateVideoResourceMutation()
//   const [deleteVideoResource, { isLoading: isDeletingVideoResource }] = useDeleteVideoResourceMutation()
//   const [uploadFile, { isLoading: isUploadingFile }] = useSingleFileUploadMutation()

//   // Load course data when component mounts
//   useEffect(() => {
//     if (courseData?.data && !isDataLoaded) {
//       const course = courseData.data
      
//       setFormData({
//         title: course.title || "",
//         subtitle: course.subtitle || "",
//         price: course.price?.toString() || "",
//         courseType: course.courseType || "PAID",
//         level: course.level || "",
//         duration: course.duration?.toString() || "",
//         language: course.language || "",
//         classes: course.classes || "",
//         description: course.description || "",
//         status: course.status || "UPCOMING",
//         releaseDate: course.releaseDate ? new Date(course.releaseDate).toISOString().split('T')[0] : "",
//         demoVideo: course.demoVideo || "",
//         thumnail: course.thumnail || "",
//         modules: course.modules?.map((module: any, moduleIndex: number) => ({
//           id: module.id,
//           title: module.title || "",
//           order: module.order || moduleIndex + 1,
//           videos: module.videos?.map((video: any, videoIndex: number) => ({
//             id: video.id,
//             title: video.title || "",
//             url: video.url || "",
//             order: video.order || videoIndex + 1,
//             videoResources: video.videoResources?.map((resource: any, resourceIndex: number) => ({
//               id: resource.id,
//               title: resource.title || "",
//               url: resource.url || "",
//               order: resource.order || resourceIndex + 1,
//             })) || [{ title: "", url: "", order: 1 }]
//           })) || [{ 
//             title: "", 
//             url: "", 
//             order: 1,
//             videoResources: [{ title: "", url: "", order: 1 }] 
//           }]
//         })) || [{ 
//           title: "", 
//           order: 1,
//           videos: [{ 
//             title: "", 
//             url: "", 
//             order: 1,
//             videoResources: [{ title: "", url: "", order: 1 }] 
//           }] 
//         }]
//       })
      
//       setIsDataLoaded(true)
//     }
//   }, [courseData, isDataLoaded])

//   const handleInputChange = (field: string, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }))
//     }
//   }

//   const handleModuleChange = (moduleIndex: number, field: string, value: string) => {
//     const newModules = [...formData.modules]
//     if (field === "title") {
//       newModules[moduleIndex].title = value
//     }
//     setFormData(prev => ({ ...prev, modules: newModules }))
//   }

//   const handleVideoChange = (moduleIndex: number, videoIndex: number, field: string, value: string) => {
//     const newModules = [...formData.modules]
//     if (field === "title") {
//       newModules[moduleIndex].videos[videoIndex].title = value
//     } else if (field === "url") {
//       newModules[moduleIndex].videos[videoIndex].url = value
//     }
//     setFormData(prev => ({ ...prev, modules: newModules }))
//   }

//   const handleResourceChange = (moduleIndex: number, videoIndex: number, resourceIndex: number, field: string, value: string) => {
//     const newModules = [...formData.modules]
//     if (field === "title") {
//       newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].title = value
//     } else if (field === "url") {
//       newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].url = value
//     }
//     setFormData(prev => ({ ...prev, modules: newModules }))
//   }

//   const shouldShowUploads = formData.status === "ONGOING"

//   const handleFileUpload = (
//     type: string,
//     event: React.ChangeEvent<HTMLInputElement>,
//     moduleIndex?: number,
//     videoIndex?: number,
//     resourceIndex?: number,
//   ) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       if (type === "demoVideo" || type === "thumbnail") {
//         setFileStates(prev => ({ ...prev, [type]: file }))
//       } else if (type === "moduleVideo" && moduleIndex !== undefined && videoIndex !== undefined) {
//         setFileStates(prev => {
//           const newModuleVideos = { ...prev.moduleVideos }
//           if (!newModuleVideos[moduleIndex]) newModuleVideos[moduleIndex] = {}
//           newModuleVideos[moduleIndex][videoIndex] = file
//           return { ...prev, moduleVideos: newModuleVideos }
//         })
//       } else if (type === "videoResource" && moduleIndex !== undefined && videoIndex !== undefined && resourceIndex !== undefined) {
//         setFileStates(prev => {
//           const newVideoResources = { ...prev.videoResources }
//           if (!newVideoResources[moduleIndex]) newVideoResources[moduleIndex] = {}
//           if (!newVideoResources[moduleIndex][videoIndex]) newVideoResources[moduleIndex][videoIndex] = {}
//           newVideoResources[moduleIndex][videoIndex][resourceIndex] = file
//           return { ...prev, videoResources: newVideoResources }
//         })
//       }
//       toast.success(`File selected successfully!`)
//     }
//   }

//   const uploadFileToServer = async (file: File): Promise<string> => {
//     try {
//       const formData = new FormData()
//       formData.append('file', file)
      
//       const response = await uploadFile(formData)
      
//       if (response.data && response.data.success && response.data.data && response.data.data.fileUrl) {
//         return response.data.data.fileUrl
//       } else {
//         throw new Error("Invalid response structure from file upload")
//       }
//     } catch (error: any) {
//       console.error("File upload failed:", error)
//       let errorMessage = "File upload failed"
//       if (error?.data?.message) {
//         errorMessage = error.data.message
//       } else if (error?.message) {
//         errorMessage = error.message
//       }
//       throw new Error(errorMessage)
//     }
//   }

//   const validateForm = (): boolean => {
//     const newErrors: {[key: string]: string} = {}
    
//     if (!formData.title.trim()) newErrors.title = "Course title is required"
//     if (!formData.subtitle.trim()) newErrors.subtitle = "Subtitle is required"
//     if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Valid price is required"
//     if (!formData.level) newErrors.level = "Skill level is required"
//     if (!formData.duration || isNaN(Number(formData.duration))) newErrors.duration = "Valid duration is required"
//     if (!formData.language.trim()) newErrors.language = "Language is required"
//     if (!formData.description.trim()) newErrors.description = "Description is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const onSubmit = async () => {
//     if (!validateForm()) {
//       toast.error("Please fill in all required fields")
//       return
//     }

//     setIsSubmitting(true)
    
//     try {
//       // Step 1: Upload new files if provided
//       let demoVideoUrl = formData.demoVideo
//       let thumbnailUrl = formData.thumnail

//       if (fileStates.demoVideo) {
//         demoVideoUrl = await uploadFileToServer(fileStates.demoVideo)
//       }

//       if (fileStates.thumbnail) {
//         thumbnailUrl = await uploadFileToServer(fileStates.thumbnail)
//       }

//       // Step 2: Update the course
//       const courseUpdateData = {
//         title: formData.title,
//         subtitle: formData.subtitle,
//         price: parseFloat(formData.price),
//         courseType: formData.courseType,
//         level: formData.level,
//         duration: parseInt(formData.duration),
//         language: formData.language,
//         classes: formData.classes,
//         description: formData.description,
//         demoVideo: demoVideoUrl,
//         thumnail: thumbnailUrl,
//         status: formData.status,
//         releaseDate: formData.releaseDate ? new Date(formData.releaseDate).toISOString() : null,
//       }

//       await updateCourse({ id: courseId, data: courseUpdateData })

//       // Step 3: Handle modules, videos, and resources if status is ONGOING
//       if (formData.status === "ONGOING" && formData.modules.length > 0) {
//         // Process deletions first
//         for (const courseModule of formData.modules) {
//           if (courseModule.isDeleted && courseModule.id) {
//             await deleteModule(courseModule.id)
//             continue
//           }

//           for (const video of courseModule.videos) {
//             if (video.isDeleted && video.id) {
//               await deleteVideo(video.id)
//               continue
//             }

//             for (const resource of video.videoResources) {
//               if (resource.isDeleted && resource.id) {
//                 await deleteVideoResource(resource.id)
//               }
//             }
//           }
//         }

//         // Process updates and creations
//         for (let moduleIndex = 0; moduleIndex < formData.modules.length; moduleIndex++) {
//           const moduleData = formData.modules[moduleIndex]
          
//           if (moduleData.isDeleted) continue
          
//           if (moduleData.title.trim()) {
//             let moduleId = moduleData.id

//             if (moduleData.isNew || !moduleId) {
//               // Create new module
//               const moduleResponse = await createModule({
//                 title: moduleData.title,
//                 order: moduleIndex + 1,
//                 courseId: courseId,
//               })
              
//               if (moduleResponse.data && moduleResponse.data.success && moduleResponse.data.data && moduleResponse.data.data.id) {
//                 moduleId = moduleResponse.data.data.id
//               } else if (moduleResponse.data && moduleResponse.data.id) {
//                 moduleId = moduleResponse.data.id
//               }
//             } else {
//               // Update existing module
//               await updateModule({
//                 id: moduleId,
//                 data: {
//                   title: moduleData.title,
//                   order: moduleIndex + 1,
//                 }
//               })
//             }

//             if (!moduleId) {
//               throw new Error("Failed to get moduleId")
//             }

//             // Handle videos for this module
//             for (let videoIndex = 0; videoIndex < moduleData.videos.length; videoIndex++) {
//               const videoData = moduleData.videos[videoIndex]
              
//               if (videoData.isDeleted) continue
              
//               if (videoData.title.trim()) {
//                 // Upload video file if new file is provided
//                 let videoUrl = videoData.url
//                 const videoFile = fileStates.moduleVideos[moduleIndex]?.[videoIndex]
//                 if (videoFile) {
//                   videoUrl = await uploadFileToServer(videoFile)
//                 }

//                 let videoId = videoData.id

//                 if (videoData.isNew || !videoId) {
//                   // Create new video
//                   const videoResponse = await createVideo({
//                     title: videoData.title,
//                     url: videoUrl,
//                     order: videoIndex + 1,
//                     moduleId: moduleId,
//                   })
                  
//                   if (videoResponse.data && videoResponse.data.success && videoResponse.data.data && videoResponse.data.data.id) {
//                     videoId = videoResponse.data.data.id
//                   } else if (videoResponse.data && videoResponse.data.id) {
//                     videoId = videoResponse.data.id
//                   }
//                 } else {
//                   // Update existing video
//                   await updateVideo({
//                     id: videoId,
//                     data: {
//                       title: videoData.title,
//                       url: videoUrl,
//                       order: videoIndex + 1,
//                     }
//                   })
//                 }

//                 if (!videoId) {
//                   throw new Error("Failed to get videoId")
//                 }

//                 // Handle video resources
//                 for (let resourceIndex = 0; resourceIndex < videoData.videoResources.length; resourceIndex++) {
//                   const resourceData = videoData.videoResources[resourceIndex]
                  
//                   if (resourceData.isDeleted) continue
                  
//                   if (resourceData.title.trim()) {
//                     // Upload resource file if new file is provided
//                     let resourceUrl = resourceData.url
//                     const resourceFile = fileStates.videoResources[moduleIndex]?.[videoIndex]?.[resourceIndex]
//                     if (resourceFile) {
//                       resourceUrl = await uploadFileToServer(resourceFile)
//                     }

//                     if (resourceData.isNew || !resourceData.id) {
//                       // Create new resource
//                       await createVideoResource({
//                         title: resourceData.title,
//                         url: resourceUrl,
//                         order: resourceIndex + 1,
//                         videoId: videoId,
//                       })
//                     } else {
//                       // Update existing resource
//                       await updateVideoResource({
//                         id: resourceData.id,
//                         data: {
//                           title: resourceData.title,
//                           url: resourceUrl,
//                           order: resourceIndex + 1,
//                         }
//                       })
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//       toast.success("Course updated successfully!")
//       router.push("/courses") // Redirect to courses list or wherever appropriate

//     } catch (error: any) {
//       console.error("Course update failed:", error)
      
//       let errorMessage = "Failed to update course. Please try again."
      
//       if (error?.data?.message) {
//         errorMessage = error.data.message
//       } else if (error?.message) {
//         errorMessage = error.message
//       }
      
//       if (error?.data?.errorSources) {
//         errorMessage = `Validation error: ${error.data.errorSources.join(", ")}`
//       }
      
//       toast.error(errorMessage)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Module operations
//   const addNewModule = () => {
//     setFormData(prev => ({
//       ...prev,
//       modules: [...prev.modules, { 
//         title: "", 
//         order: prev.modules.length + 1,
//         videos: [{ 
//           title: "", 
//           url: "", 
//           order: 1,
//           videoResources: [{ title: "", url: "", order: 1 }],
//           isNew: true
//         }],
//         isNew: true
//       }]
//     }))
//     toast.success("New module added!")
//   }

//   const removeModule = (moduleIndex: number) => {
//     const mod = formData.modules[moduleIndex]
    
//     if (mod.id) {
//       // Mark existing module for deletion
//       const newModules = [...formData.modules]
//       newModules[moduleIndex].isDeleted = true
//       setFormData(prev => ({ ...prev, modules: newModules }))
//     } else {
//       // Remove new module completely
//       const newModules = formData.modules.filter((_, i) => i !== moduleIndex)
//       newModules.forEach((modItem, index) => {
//         modItem.order = index + 1
//       })
//       setFormData(prev => ({ ...prev, modules: newModules }))
//     }
//     toast.success("Module marked for removal!")
//   }

//   // Video operations
//   const addNewVideo = (moduleIndex: number) => {
//     const newModules = [...formData.modules]
//     const newOrder = newModules[moduleIndex].videos.length + 1
//     newModules[moduleIndex].videos.push({
//       title: "",
//       url: "",
//       order: newOrder,
//       videoResources: [{ title: "", url: "", order: 1 }],
//       isNew: true
//     })
//     setFormData(prev => ({ ...prev, modules: newModules }))
//     toast.success("New video added!")
//   }

//   const removeVideo = (moduleIndex: number, videoIndex: number) => {
//     const video = formData.modules[moduleIndex].videos[videoIndex]
//     const newModules = [...formData.modules]
    
//     if (video.id) {
//       // Mark existing video for deletion
//       newModules[moduleIndex].videos[videoIndex].isDeleted = true
//     } else {
//       // Remove new video completely
//       newModules[moduleIndex].videos.splice(videoIndex, 1)
//       newModules[moduleIndex].videos.forEach((video, index) => {
//         video.order = index + 1
//       })
//     }
    
//     setFormData(prev => ({ ...prev, modules: newModules }))
//     toast.success("Video marked for removal!")
//   }

//   // Resource operations
//   const addNewResource = (moduleIndex: number, videoIndex: number) => {
//     const newModules = [...formData.modules]
//     const newOrder = newModules[moduleIndex].videos[videoIndex].videoResources.length + 1
//     newModules[moduleIndex].videos[videoIndex].videoResources.push({
//       title: "",
//       url: "",
//       order: newOrder,
//       isNew: true
//     })
//     setFormData(prev => ({ ...prev, modules: newModules }))
//     toast.success("New resource added!")
//   }

//   const removeResource = (moduleIndex: number, videoIndex: number, resourceIndex: number) => {
//     const resource = formData.modules[moduleIndex].videos[videoIndex].videoResources[resourceIndex]
//     const newModules = [...formData.modules]
    
//     if (resource.id) {
//       // Mark existing resource for deletion
//       newModules[moduleIndex].videos[videoIndex].videoResources[resourceIndex].isDeleted = true
//     } else {
//       // Remove new resource completely
//       newModules[moduleIndex].videos[videoIndex].videoResources.splice(resourceIndex, 1)
//       newModules[moduleIndex].videos[videoIndex].videoResources.forEach((resource, index) => {
//         resource.order = index + 1
//       })
//     }
    
//     setFormData(prev => ({ ...prev, modules: newModules }))
//     toast.success("Resource marked for removal!")
//   }

//   const handleCancel = () => {
//     router.push("/courses") // Navigate back to courses list
//   }

//   const isLoading = isSubmitting || isUpdatingCourse || isCreatingModule || isUpdatingModule || isDeletingModule || 
//                    isCreatingVideo || isUpdatingVideo || isDeletingVideo || isCreatingVideoResource || 
//                    isUpdatingVideoResource || isDeletingVideoResource || isUploadingFile

//   if (isLoadingCourse) {
//     return (
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="flex items-center">
//               <Loader2 className="w-6 h-6 mr-2 animate-spin" />
//               Loading course data...
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (courseError) {
//     return (
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto">
//           <div className="text-center text-red-600">
//             Error loading course data. Please try again.
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!isDataLoaded) {
//     return (
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <div className="container mx-auto">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="flex items-center">
//               <Loader2 className="w-6 h-6 mr-2 animate-spin" />
//               Preparing course data...
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Filter out deleted items for display
//   const visibleModules = formData.modules.filter(module => !module.isDeleted)

//   return (
//     <div className="py-8 px-4 sm:px-6 lg:px-8">
//       <div className="container mx-auto">
//         <div className="flex items-center mb-8">
//           <button
//             onClick={handleCancel}
//             className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </button>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Update Course: {formData.title}
//           </h1>
//         </div>

//         <div className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column */}
//             <div className="lg:col-span-1 space-y-6">
//               {/* Course Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Course Title *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter course title"
//                   value={formData.title}
//                   onChange={(e) => handleInputChange("title", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 />
//                 {errors.title && (
//                   <p className="mt-1 text-sm text-red-600">{errors.title}</p>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subtitle *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter subtitle"
//                   value={formData.subtitle}
//                   onChange={(e) => handleInputChange("subtitle", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 />
//                 {errors.subtitle && (
//                   <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
//                 )}
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price *
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter price"
//                   min="0"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => handleInputChange("price", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 />
//                 {errors.price && (
//                   <p className="mt-1 text-sm text-red-600">{errors.price}</p>
//                 )}
//               </div>

//               {/* Course Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Course Type
//                 </label>
//                 <select
//                   value={formData.courseType}
//                   onChange={(e) => handleInputChange("courseType", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 >
//                   <option value="PAID">Paid</option>
//                   <option value="FREE">Free</option>
//                 </select>
//               </div>

//               {/* Skill Level */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Skill Level *
//                 </label>
//                 <select
//                   value={formData.level}
//                   onChange={(e) => handleInputChange("level", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 >
//                   <option value="">Select skill level</option>
//                   <option value="BEGINNER">Beginner</option>
//                   <option value="INTERMEDIATE">Intermediate</option>
//                   <option value="ADVANCED">Advanced</option>
//                 </select>
//                 {errors.level && (
//                   <p className="mt-1 text-sm text-red-600">{errors.level}</p>
//                 )}
//               </div>

//               {/* Duration */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Duration (hours) *
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter duration in hours"
//                   min="1"
//                   value={formData.duration}
//                   onChange={(e) => handleInputChange("duration", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 />
//                 {errors.duration && (
//                   <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
//                 )}
//               </div>

//               {/* Language */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Language *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., English, Spanish"
//                   value={formData.language}
//                   onChange={(e) => handleInputChange("language", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 />
//                 {errors.language && (
//                   <p className="mt-1 text-sm text-red-600">{errors.language}</p>
//                 )}
//               </div>

//               {/* Total Classes */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Total Classes
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., 8 Classes"
//                   value={formData.classes}
//                   onChange={(e) => handleInputChange("classes", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Course Description *
//                 </label>
//                 <textarea
//                   placeholder="Describe your course..."
//                   rows={4}
//                   value={formData.description}
//                   onChange={(e) => handleInputChange("description", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent resize-none"
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-sm text-red-600">{errors.description}</p>
//                 )}
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Upload Demo video and Thumbnail */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Upload Demo video */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Demo Video
//                   </label>
//                   <div>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
//                       <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
//                         <Video className="w-6 h-6 text-white" />
//                       </div>
//                       {formData.demoVideo && (
//                         <p className="text-xs text-blue-600 mb-2">
//                           Current: {formData.demoVideo.split('/').pop()}
//                         </p>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500 mb-4 mt-2">
//                       Formats: Mp4 - Max 300MB
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-2 justify-start">
//                       <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
//                         Choose New Video
//                         <input
//                           type="file"
//                           accept="video/mp4"
//                           className="hidden"
//                           onChange={(e) => handleFileUpload("demoVideo", e)}
//                         />
//                       </label>
//                       <span className="text-sm text-gray-500 self-center">
//                         {fileStates.demoVideo ? fileStates.demoVideo.name : "No New File Chosen"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Upload Thumbnail */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Thumbnail
//                   </label>
//                   <div>
//                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
//                       <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
//                         <Camera className="w-6 h-6 text-white" />
//                       </div>
//                       {formData.thumnail && (
//                         <p className="text-xs text-blue-600 mb-2">
//                           Current: {formData.thumnail.split('/').pop()}
//                         </p>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500 mb-4 mt-2">
//                       Formats: JPG, PNG, JPEG - Max 5MB
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-2 justify-start">
//                       <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
//                         Choose New Image
//                         <input
//                           type="file"
//                           accept="image/jpeg,image/jpg,image/png"
//                           className="hidden"
//                           onChange={(e) => handleFileUpload("thumbnail", e)}
//                         />
//                       </label>
//                       <span className="text-sm text-gray-500 self-center">
//                         {fileStates.thumbnail ? fileStates.thumbnail.name : "No New File Chosen"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Course Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Course Status
//                 </label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => handleInputChange("status", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent"
//                 >
//                   <option value="UPCOMING">Upcoming</option>
//                   <option value="ONGOING">Ongoing</option>
//                 </select>
//               </div>

//               {/* Release Date - show for upcoming */}
//               {formData.status === "UPCOMING" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Release Date
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       value={formData.releaseDate}
//                       onChange={(e) => handleInputChange("releaseDate", e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent pr-10"
//                     />
//                     <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                   </div>
//                 </div>
//               )}

//               {/* Course Modules - Only show when status is "ONGOING" */}
//               {shouldShowUploads && (
//                 <div>
//                   <div className="flex items-center justify-between mb-6">
//                     <label className="text-lg font-medium text-gray-700">
//                       Course Modules
//                     </label>
//                     <button
//                       type="button"
//                       onClick={addNewModule}
//                       disabled={isLoading}
//                       className="flex items-center px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors disabled:opacity-50"
//                     >
//                       <Plus className="w-4 h-4 mr-1" />
//                       Add Module
//                     </button>
//                   </div>

//                   <div className="space-y-8">
//                     {visibleModules.map((module, moduleIndex) => {
//                       const actualModuleIndex = formData.modules.findIndex(m => m === module)
//                       const visibleVideos = module.videos.filter(video => !video.isDeleted)
                      
//                       return (
//                         <div key={module.id || `new-${moduleIndex}`} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
//                           {/* Module Header */}
//                           <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-medium text-gray-800">
//                               Module {module.order} {module.title && `- ${module.title}`}
//                               {module.isNew && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">NEW</span>}
//                             </h3>
//                             <button
//                               type="button"
//                               onClick={() => removeModule(actualModuleIndex)}
//                               disabled={isLoading}
//                               className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
//                             >
//                               <X className="w-5 h-5" />
//                             </button>
//                           </div>

//                           {/* Module Title */}
//                           <div className="mb-6">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Module Title
//                             </label>
//                             <input
//                               type="text"
//                               placeholder={`Module ${module.order} Title`}
//                               value={module.title}
//                               onChange={(e) => handleModuleChange(actualModuleIndex, "title", e.target.value)}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent bg-white"
//                             />
//                           </div>

//                           {/* Videos Section */}
//                           <div className="mb-4">
//                             <div className="flex items-center justify-between mb-4">
//                               <h4 className="text-md font-medium text-gray-700">Videos</h4>
//                               <button
//                                 type="button"
//                                 onClick={() => addNewVideo(actualModuleIndex)}
//                                 disabled={isLoading}
//                                 className="flex items-center px-3 py-1 bg-blue-100 border border-blue-300 text-blue-700 hover:bg-blue-200 text-sm rounded-md transition-colors disabled:opacity-50"
//                               >
//                                 <Plus className="w-3 h-3 mr-1" />
//                                 Add Video
//                               </button>
//                             </div>

//                             {/* Videos List */}
//                             <div className="space-y-4">
//                               {visibleVideos.map((video, videoIndex) => {
//                                 const actualVideoIndex = module.videos.findIndex(v => v === video)
//                                 const visibleResources = video.videoResources.filter(resource => !resource.isDeleted)
                                
//                                 return (
//                                   <div key={video.id || `new-video-${videoIndex}`} className="bg-white border border-gray-200 rounded-lg p-4">
//                                     <div className="flex items-center justify-between mb-3">
//                                       <h5 className="text-sm font-medium text-gray-600">
//                                         Video {video.order} {video.title && `- ${video.title}`}
//                                         {video.isNew && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">NEW</span>}
//                                       </h5>
//                                       <button
//                                         type="button"
//                                         onClick={() => removeVideo(actualModuleIndex, actualVideoIndex)}
//                                         disabled={isLoading}
//                                         className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                                       >
//                                         <X className="w-4 h-4" />
//                                       </button>
//                                     </div>

//                                     {/* Video Title */}
//                                     <div className="mb-4">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Video Title
//                                       </label>
//                                       <input
//                                         type="text"
//                                         placeholder={`Video ${video.order} Title`}
//                                         value={video.title}
//                                         onChange={(e) => handleVideoChange(actualModuleIndex, actualVideoIndex, "title", e.target.value)}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017f00] focus:border-transparent text-sm"
//                                       />
//                                     </div>

//                                     {/* Video Upload */}
//                                     <div className="mb-4">
//                                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Upload Video
//                                       </label>
//                                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
//                                         <div className="w-6 h-6 mx-auto mb-2 bg-[#017f00] rounded-full flex items-center justify-center">
//                                           <Video className="w-4 h-4 text-white" />
//                                         </div>
//                                         {video.url && (
//                                           <p className="text-xs text-blue-600 mb-2">
//                                             Current: {video.url.split('/').pop()}
//                                           </p>
//                                         )}
//                                         <p className="text-xs text-gray-500 mb-2">Mp4 - Max 300MB</p>
//                                         <label className="px-3 py-1 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-xs rounded-md transition-colors cursor-pointer">
//                                           Choose New Video
//                                           <input
//                                             type="file"
//                                             accept="video/mp4"
//                                             className="hidden"
//                                             onChange={(e) => handleFileUpload("moduleVideo", e, actualModuleIndex, actualVideoIndex)}
//                                           />
//                                         </label>
//                                         <p className="text-xs text-gray-500 mt-1">
//                                           {fileStates.moduleVideos[actualModuleIndex]?.[actualVideoIndex]?.name || "No New File Chosen"}
//                                         </p>
//                                       </div>
//                                     </div>

//                                     {/* Video Resources */}
//                                     <div>
//                                       <div className="flex items-center justify-between mb-3">
//                                         <h6 className="text-sm font-medium text-gray-700">Resources</h6>
//                                         <button
//                                           type="button"
//                                           onClick={() => addNewResource(actualModuleIndex, actualVideoIndex)}
//                                           disabled={isLoading}
//                                           className="flex items-center px-2 py-1 bg-green-100 border border-green-300 text-green-700 hover:bg-green-200 text-xs rounded-md transition-colors disabled:opacity-50"
//                                         >
//                                           <Plus className="w-3 h-3 mr-1" />
//                                           Add Resource
//                                         </button>
//                                       </div>

//                                       <div className="space-y-3">
//                                         {visibleResources.map((resource, resourceIndex) => {
//                                           const actualResourceIndex = video.videoResources.findIndex(r => r === resource)
                                          
//                                           return (
//                                             <div key={resource.id || `new-resource-${resourceIndex}`} className="border border-gray-200 rounded-md p-3 bg-gray-50">
//                                               <div className="flex items-center justify-between mb-2">
//                                                 <span className="text-xs font-medium text-gray-600">
//                                                   Resource {resource.order} {resource.title && `- ${resource.title}`}
//                                                   {resource.isNew && <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">NEW</span>}
//                                                 </span>
//                                                 <button
//                                                   type="button"
//                                                   onClick={() => removeResource(actualModuleIndex, actualVideoIndex, actualResourceIndex)}
//                                                   disabled={isLoading}
//                                                   className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                                                 >
//                                                   <X className="w-3 h-3" />
//                                                 </button>
//                                               </div>
                                              
//                                               <div className="space-y-2">
//                                                 <input
//                                                   type="text"
//                                                   placeholder="Resource Title"
//                                                   value={resource.title}
//                                                   onChange={(e) => handleResourceChange(actualModuleIndex, actualVideoIndex, actualResourceIndex, "title", e.target.value)}
//                                                   className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#017f00] focus:border-transparent text-xs"
//                                                 />
                                                
//                                                 <div className="flex gap-2">
//                                                   <label className="px-2 py-1 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-xs rounded-md transition-colors cursor-pointer flex-shrink-0">
//                                                     Choose New File
//                                                     <input
//                                                       type="file"
//                                                       accept=".zip,.rar,.pdf,.doc,.docx"
//                                                       className="hidden"
//                                                       onChange={(e) => handleFileUpload("videoResource", e, actualModuleIndex, actualVideoIndex, actualResourceIndex)}
//                                                     />
//                                                   </label>
//                                                   <div className="flex flex-col text-xs text-gray-500 self-center truncate">
//                                                     {resource.url && (
//                                                       <span className="text-blue-600">Current: {resource.url.split('/').pop()}</span>
//                                                     )}
//                                                     <span>
//                                                       {fileStates.videoResources[actualModuleIndex]?.[actualVideoIndex]?.[actualResourceIndex]?.name || "No New File"}
//                                                     </span>
//                                                   </div>
//                                                 </div>
//                                               </div>
//                                             </div>
//                                           )
//                                         })}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 )
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       )
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
//             <button
//               type="button"
//               onClick={onSubmit}
//               disabled={isLoading}
//               className="px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Updating Course...
//                 </>
//               ) : (
//                 "Update Course"
//               )}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={isLoading}
//               className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page