/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetMeQuery,
  useUpdatePasswordMutation,
  useUpdateUserByIdMutation,
} from "@/redux/api/authApi";
import { useSingleFileUploadMutation } from "@/redux/api/fileUploadApi";
import { useUploadResumeMutation } from "@/redux/api/resumeApi";
import { Eye, EyeOff, FileText, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function SystemSettings() {
  const [singleFileUploadFN, ] = useSingleFileUploadMutation();
  const { data, isLoading: getUserLoading, refetch } = useGetMeQuery({});
  console.log(data,"user data")
  const user = data?.data;

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State management
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullAddress, setFullAddress] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const [userUploadFn, { isLoading: userUploadLoading }] = useUpdateUserByIdMutation();
  const [updatePasswordFn, { isLoading: passwordUpdateLoading }] = useUpdatePasswordMutation();
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Resume states
  const [fileStates, setFileStates] = useState({
    resourceFile: null as File | null,
  });

  const [singleFileUpload] = useSingleFileUploadMutation();
  const [uploadResume] = useUploadResumeMutation();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Set initial values when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || null);
      setName(user.name || "");
      setPhoneNumber(user.phoneNumber || "");
      setHouseNumber(user.houseNumber || "");
      setFullAddress(user.fullAddress || "");
      setStreet(user.street || "");
      setCity(user.city || "");
      setState(user.state || "");
      setPostalCode(user.postalCode || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Handle image upload
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPG, PNG, or GIF)");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsImageUploading(true);

    try {
      // Upload file
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadResponse = await singleFileUploadFN(formData).unwrap();
      
      if (uploadResponse?.success && uploadResponse?.data?.fileUrl) {
        // Update user profile with new image
        const userResponse = await userUploadFn([
          user?.id, 
          { profileImage: uploadResponse.data.fileUrl }
        ]).unwrap();
        
        if (userResponse?.success) {
          setProfileImage(userResponse.data.profileImage);
          toast.success("Profile image updated successfully!");
          refetch();
        } else {
          toast.error("Failed to update profile image");
        }
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error: any) {
      console.error("Image upload failed:", error);
      toast.error(error?.data?.message || "Failed to upload image");
    } finally {
      setIsImageUploading(false);
      event.target.value = '';
    }
  };

  // Helper function to get proper image URL
  const getImageUrl = (imageUrl: string | null | undefined) => {
    if (!imageUrl) return "/images/default-avatar.png";
    
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith("/")) {
      return imageUrl;
    }
    
    return `/${imageUrl}`;
  };

  // Update profile information
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      toast.error("Name cannot be empty");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Name must be at least 2 characters long");
      return;
    }

    // Basic phone number validation if provided
    // if (phoneNumber.trim() && !/^[\+]?[1-9][\d]{0,15}$/.test(phoneNumber.trim())) {
    //   toast.error("Please enter a valid phone number");
    //   return;
    // }

    try {
      const updateData = {
        name: trimmedName,
        phoneNumber: phoneNumber.trim() || null,
        fullAddress: fullAddress.trim() || null,
        street: street.trim() || null,
        city: city.trim() || null,
        state: state.trim() || null,
        houseNumber: houseNumber.trim() || null,
        postalCode: postalCode.trim() || null,
      };

      const userResponse = await userUploadFn([user?.id, updateData]).unwrap();

      if (userResponse?.success) {
        toast.success("Profile updated successfully!");
        refetch();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error: any) {
      console.error("Profile update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  // Update password
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword.trim()) {
      toast.error("Current password is required");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("New password is required");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    try {
      const response = await updatePasswordFn({
        oldPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      }).unwrap();

      if (response?.success) {
        toast.success("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to update password");
      }
    } catch (error: any) {
      console.error("Password update failed:", error);
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  //upload resume

  
    const handleFileUpload = (
      field: "resourceFile",
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileStates((prev) => ({
          ...prev,
          [field]: file,
        }));
        setUploadError(null);
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!fileStates.resourceFile) {
        setUploadError("Resource file is required");
        return;
      }
  
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(false);
  
      try {
        // First upload the file
        const formData = new FormData();
        formData.append("file", fileStates.resourceFile);
  
        const uploadResponse = await singleFileUpload(formData).unwrap();
  
        if (uploadResponse.success && uploadResponse.data.fileUrl) {
          // Then create the resume record with the file URL
          const resumeResponse = await uploadResume({
            url: uploadResponse.data.fileUrl,
          }).unwrap();

          if (resumeResponse.success) {
            toast.success("Resume uploaded successfully!");
          } else {
            toast.error("Failed to upload resume");
          }

  
          setUploadSuccess(true);
          // Reset form after successful upload
          setFileStates({ resourceFile: null });
        } else {
          throw new Error("File upload failed");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadError("Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };
  

  if (getUserLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-white p-6 mb-10">
      <div className="max-w-5xl md:ml-20">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          System Settings
        </h1>

        {/* Tabs */}
        <Tabs defaultValue="edit-profile" className="w-full">
          <TabsList className="grid max-w-6xl grid-cols-2 content-center bg-transparent h-auto p-0 mb-8">
            <TabsTrigger
              value="edit-profile"
              className="px-0 py-3 mr-8 font-medium border-b-2 border-transparent
               data-[state=active]:border-gray-900 data-[state=active]:text-gray-900
                text-gray-500 bg-transparent shadow-none rounded-none justify-start
                text-2xl cursor-pointer text-center"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="change-password"
              className="px-0 py-3 font-medium border-b-2 border-transparent data-[state=active]:border-gray-900
               data-[state=active]:text-gray-900 text-gray-500 bg-transparent shadow-none rounded-none justify-start text-2xl cursor-pointer"
            >
              <p>Change Password</p>
            </TabsTrigger>
            <TabsTrigger
              value="change-cv"
              className="px-0 py-3 font-medium border-b-2 border-transparent data-[state=active]:border-gray-900
               data-[state=active]:text-gray-900 text-gray-500 bg-transparent shadow-none rounded-none justify-start text-2xl cursor-pointer"
            >
              <p>Update CV</p>
            </TabsTrigger>
          </TabsList>

          {/* Edit Profile Tab Content */}
          <TabsContent value="edit-profile" className="mt-0">
            <div className="bg-white flex flex-col  rounded-xl   ">
              {/* Profile Photo Section */}
              <div className="flex items-center gap-4 mb-8  bg border-2 border-gray-100 p-10 rounded-2xl">
                <div className="relative w-28 h-28  flex items-center justify-center  rounded-full    overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={getImageUrl(profileImage)}
                      alt="Profile picture"
                      width={500}
                      height={500}
                      className="rounded-full object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "/images/default-avatar.png";
                      }}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}

                  {/* Loading overlay */}
                  {isImageUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileImageInput"
                    onChange={handleImageChange}
                    disabled={isImageUploading}
                  />

                  {/* Upload Icon as Button */}
                  {/* <label
                    htmlFor="profileImageInput"
                    className={`absolute right-0 bottom-0 cursor-pointer bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow ${
                      isImageUploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Change profile picture"
                  >
                    {isImageUploading ? (
                      <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 text-gray-600 hover:text-green-600" />
                    )}
                  </label> */}
                </div>
                <div className="flex-1   ">
                  <Button
                    onClick={() =>
                      document.getElementById("profileImageInput")?.click()
                    }
                    className="bg-[#017F00] text-secondary px-4 py-4 cursor-pointer rounded-lg text-base  hover:bg-green-400 transition-colors mb-2 font-light"
                    disabled={isImageUploading}
                  >
                    {isImageUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload new photo"
                    )}
                  </Button>
                  <p className="text-xs md:text-sm text-gray-500 font-normal">
                    At least 800×600 px recommended.
                    <br /> JPG or PNG is allowed
                  </p>
                </div>
              </div>
              <div className="py-3 rounded-2xl ">
                {/* Form Fields */}
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                      Name{" "}
                    </label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div className="relative">
                    <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                      Email{" "}
                    </label>
                    <Input
                      type="email"
                      value={email}
                      className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                      readOnly
                    />
                  </div>
                  {/* Full Address */}
                  <div className="relative">
                    <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                      Full Address{" "}
                    </label>
                    <div className="absolute left-2 top-0 mt-[1px] h-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="17"
                        viewBox="0 0 12 17"
                        fill="none"
                      >
                        <path
                          d="M6.125 0.5C3.02181 0.5 0.5 3.02188 0.5 6.125C0.5 7.175 0.790688 8.19691 1.34378 9.07816L5.74369 16.2786C5.81875 16.4005 5.93125 16.4755 6.06253 16.4943C6.2406 16.5224 6.43757 16.4474 6.54066 16.2693L10.9532 9.00313C11.4781 8.14066 11.75 7.13753 11.75 6.125C11.75 3.02188 9.22819 0.5 6.125 0.5ZM6.125 8.9375C4.55006 8.9375 3.3125 7.6625 3.3125 6.125C3.3125 4.5781 4.5781 3.3125 6.125 3.3125C7.67191 3.3125 8.9375 4.5781 8.9375 6.125C8.9375 7.65313 7.71872 8.9375 6.125 8.9375Z"
                          fill="#017F00"
                        />
                        <path
                          d="M6.125 0.5V3.3125C7.67191 3.3125 8.9375 4.5781 8.9375 6.125C8.9375 7.65313 7.71872 8.9375 6.125 8.9375V16.4997C6.28497 16.5034 6.44947 16.4268 6.54062 16.2693L10.9531 9.00313C11.4781 8.14066 11.75 7.13753 11.75 6.125C11.75 3.02188 9.22819 0.5 6.125 0.5Z"
                          fill="#017F00"
                        />
                      </svg>
                    </div>

                    <Input
                      type="text"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0 pl-6"
                      placeholder="Enter your full address"
                    />
                  </div>

                  {/* Street */}
                  {/* <div className="relative">
                  <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                    Street{" "}
                  </label>
                  <div className="absolute left-2 top-0 mt-[1px] h-full flex items-center justify-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="17"
                      viewBox="0 0 12 17"
                      fill="none"
                    >
                      <path
                        d="M6.125 0.5C3.02181 0.5 0.5 3.02188 0.5 6.125C0.5 7.175 0.790688 8.19691 1.34378 9.07816L5.74369 16.2786C5.81875 16.4005 5.93125 16.4755 6.06253 16.4943C6.2406 16.5224 6.43757 16.4474 6.54066 16.2693L10.9532 9.00313C11.4781 8.14066 11.75 7.13753 11.75 6.125C11.75 3.02188 9.22819 0.5 6.125 0.5ZM6.125 8.9375C4.55006 8.9375 3.3125 7.6625 3.3125 6.125C3.3125 4.5781 4.5781 3.3125 6.125 3.3125C7.67191 3.3125 8.9375 4.5781 8.9375 6.125C8.9375 7.65313 7.71872 8.9375 6.125 8.9375Z"
                        fill="#017F00"
                      />
                      <path
                        d="M6.125 0.5V3.3125C7.67191 3.3125 8.9375 4.5781 8.9375 6.125C8.9375 7.65313 7.71872 8.9375 6.125 8.9375V16.4997C6.28497 16.5034 6.44947 16.4268 6.54062 16.2693L10.9531 9.00313C11.4781 8.14066 11.75 7.13753 11.75 6.125C11.75 3.02188 9.22819 0.5 6.125 0.5Z"
                        fill="#017F00"
                      />
                    </svg>
                  </div>
                  <Input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0 pl-6"
                    placeholder="Enter your street"
                  />
                </div> */}

                  {/* City and State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                        Street{" "}
                      </label>
                      <div className="absolute left-2 top-0 mt-[1px] h-full flex items-center justify-center ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="17"
                          viewBox="0 0 12 17"
                          fill="none"
                        >
                          <path
                            d="M6.125 0.5C3.02181 0.5 0.5 3.02188 0.5 6.125C0.5 7.175 0.790688 8.19691 1.34378 9.07816L5.74369 16.2786C5.81875 16.4005 5.93125 16.4755 6.06253 16.4943C6.2406 16.5224 6.43757 16.4474 6.54066 16.2693L10.9532 9.00313C11.4781 8.14066 11.75 7.13753 11.75 6.125C11.75 3.02188 9.22819 0.5 6.125 0.5ZM6.125 8.9375C4.55006 8.9375 3.3125 7.6625 3.3125 6.125C3.3125 4.5781 4.5781 3.3125 6.125 3.3125C7.67191 3.3125 8.9375 4.5781 8.9375 6.125C8.9375 7.65313 7.71872 8.9375 6.125 8.9375Z"
                            fill="#017F00"
                          />
                          <path
                            d="M6.125 0.5V3.3125C7.67191 3.3125 8.9375 4.5781 8.9375 6.125C8.9375 7.65313 7.71872 8.9375 6.125 8.9375V16.4997C6.28497 16.5034 6.44947 16.4268 6.54062 16.2693L10.9531 9.00313C11.4781 8.14066 11.75 7.13753 11.75 6.125C11.75 3.02188 9.22819 0.5 6.125 0.5Z"
                            fill="#017F00"
                          />
                        </svg>
                      </div>
                      <Input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0 pl-6"
                        placeholder="Enter your street"
                      />
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                        House Number{" "}
                      </label>
                      <Input
                        type="text"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                        placeholder="Enter your house number"
                      />
                    </div>
                  </div>
                  {/* City and State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                        City{" "}
                      </label>
                      <Input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                        placeholder="Enter your city"
                      />
                    </div>
                    <div className="relative">
                      <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                        State{" "}
                      </label>
                      <Input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Postal Code */}
                    <div className="relative">
                      <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                        Postal Code{" "}
                      </label>
                      <Input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                        placeholder="Enter your postal code"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <label className="absolute -top-2 left-2 block text-sm text-gray-600 mb-2 z-30 bg-white px-2">
                        Phone Number{" "}
                      </label>
                      <Input
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-7 border border-gray-300 rounded-lg   z-20  text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6">
                    <Button
                      type="submit"
                      className="bg-[#017F00] text-secondary cursor-pointer px-6 py-3 rounded-lg font-medium hover:bg-[#016a00] "
                      disabled={userUploadLoading}
                    >
                      {userUploadLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border border-gray-300 cursor-pointer text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        // Reset form to original values
                        if (user) {
                          setName(user.name || "");
                          setPhoneNumber(user.phoneNumber || "");
                          setFullAddress(user.fullAddress || "");
                          setStreet(user.street || "");
                          setCity(user.city || "");
                          setState(user.state || "");
                          setPostalCode(user.postalCode || "");
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </TabsContent>

          {/* Change Password Tab Content */}
          <TabsContent value="change-password" className="max-w-lg mt-8">
            <h3 className="text-center text-3xl font-semibold mb-1 tracking-wide">
              Change Password
            </h3>
            <p className="text-center text-base text-[#9E9E9E] ">
              To change your password, please fill in the fields <br /> below.
            </p>
            <div className="rounded-xl p-6 mt-10 ">
              <form
                onSubmit={handlePasswordUpdate}
                className="space-y-6 mt-0 max-w-5xl mx-auto"
              >
                <div className="relative">
                  <label className=" block text-base text-gray-600 mb-2 z-30 bg-white ">
                    Current Password{" "}
                  </label>
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-6 border border-gray-300 rounded-lg text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0 pr-10"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} className="mt-7" />
                    ) : (
                      <Eye size={18} className="mt-7" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <label className=" block text-base text-gray-600 mb-2 z-30 bg-white ">
                    New Password{" "}
                  </label>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-6 border border-gray-300 rounded-lg text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0 pr-10"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} className="mt-7" />
                    ) : (
                      <Eye size={18} className="mt-7" />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-base text-gray-600 mb-2 z-30 bg-white ">
                    Confirm New Password{" "}
                  </label>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-6 border border-gray-300 rounded-lg text-sm tracking-wide text-gray-900 focus:outline-none focus-visible:ring-1 focus:border-0 pr-10"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} className="mt-7" />
                    ) : (
                      <Eye size={18} className="mt-7" />
                    )}
                  </button>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    className="bg-[#017F00] w-full text-secondary px-6 py-6 rounded-3xl 
                font-medium hover:bg-green-600 transition-colors text-lg cursor-pointer"
                    disabled={passwordUpdateLoading}
                  >
                    {passwordUpdateLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="change-cv" className="max-w-lg mt-8">
            <h3 className="text-center text-3xl font-semibold mb-1 tracking-wide">
              Update Recent CV
            </h3>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Upload Resume
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Resource File *
                  </label>
                  <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <div className="w-10 h-10 mx-auto mb-4 bg-[#017f00] rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      {fileStates.resourceFile && (
                        <p className="text-sm text-gray-600 mt-2 truncate">
                          {fileStates.resourceFile.name}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-4 mt-2">
                      Formats: zip, rar, pdf, doc - Max 100 MB each
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-start">
                      <label className="px-4 py-2 bg-[#e6f2e6] border border-[#379a36] text-black hover:text-[#379a36] hover:bg-transparent text-sm rounded-md transition-colors cursor-pointer">
                        Choose File
                        <input
                          type="file"
                          accept=".zip,.rar,.pdf,.doc,.docx"
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

                {uploadError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                    {uploadError}
                  </div>
                )}

                {uploadSuccess && (
                  <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-md">
                    File uploaded successfully!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!fileStates.resourceFile || isUploading}
                  className={`w-full py-2 px-4 rounded-md text-white cursor-pointer ${
                    isUploading || !fileStates.resourceFile
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#017f00] hover:bg-[#016a00]"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload File"}
                </button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}