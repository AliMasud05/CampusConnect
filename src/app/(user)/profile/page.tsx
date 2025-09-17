"use client";

import PasswordChangePopup from "@/components/popup/PasswordChangePopup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetMeQuery,
  useUpdatePasswordMutation,
  useUpdateUserByIdMutation,
} from "@/redux/api/authApi";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const ProfilePage = () => {
  const { data, isLoading: getUserLoading } = useGetMeQuery({});
  const user = data?.data;
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>(user?.name || ""); // State for name
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  ); // State for name
  const [userUploadFn, { isLoading: userUploadLoading }] =
    useUpdateUserByIdMutation();

  const [open, setOpen] = useState(false);
  const [isUploading, ] = useState(false);

  useUpdatePasswordMutation();

  //Set profile image and name when user data is loaded
  useEffect(() => {
    if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
   
  };

  //update name
  const updateName = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty."); // Show error toast
      return;
    }

    // Check if the new name is the same as the current name (case-insensitive)
    if (user?.name?.trim().toLowerCase() === name.trim().toLowerCase()) {
      toast.error("The new name is the same as the current name."); // Show error toast
      return;
    }

    try {
      const userResponse = await userUploadFn([user?.id, { name }]).unwrap();

      setName(userResponse?.data.name); // Update state with new name
      toast.success("Name updated successfully!"); // Show success toast
    } catch (error) {
      console.error("Name update failed:", error);
      toast.error("Failed to update name."); // Show error toast
    }
  };
  //update number
  const updatePhoneNumber = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Phone number cannot be empty."); // Show error toast
      return;
    }

    try {
      const userResponse = await userUploadFn([
        user?.id,
        { phoneNumber },
      ]).unwrap();
      //success condition
      if (userResponse?.data.phoneNumber) {
        toast.success("Phone number updated successfully!"); // Show success toast
      }

      toast.success("Phone number updated successfully!"); // Show success toast
    } catch (error) {
      console.error("Phone number update failed:", error);
      toast.error("Failed to update phone number."); // Show error toast
    }
  };

  if (getUserLoading) {
    return <div>Loading...</div>; // Show loading state while fetching user data
  }

  return (
    <div className="flex-1 p-6 md:p-6">
      <div className="mb-6 md:ml-0 ml-8">
        <h1 className="text-2xl font-medium">User profile</h1>
        <p className="text-gray-600">Manage your personal details</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Info */}
        <div className="md:w-64 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-3 flex items-center justify-center bg-gray-300 rounded-full border overflow-hidden">
            {profileImage ? (
             <Image
             src={
               profileImage
                 ? profileImage.startsWith("http")
                   ? profileImage
                   : `/${profileImage}`
                 : "/images/default-avatar.png" // Fallback image
             }
             alt="Profile picture"
             width={128}
             height={128}
             className="rounded-full object-cover"
           />
            ) : (
              <span className="text-4xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImageInput"
              onChange={handleImageChange}
              disabled={isUploading} // Disable input while uploading
            />

            {/* Pencil Icon as Button */}
            <label
              htmlFor="profileImageInput"
              className={`absolute right-5 bottom-2 cursor-pointer ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Pencil
                className="h-8 w-8 text-black hover:text-gray-500 p-1"
                color="red"
              />
            </label>
          </div>

          <h3 className="text-lg font-medium">{user?.name}</h3>
          <p className="text-gray-600">{user?.phoneNumber}</p>
        </div>

        {/* Forms */}
        <div className="flex-1 space-y-6   ">
          {/* General Information */}
          <div className="border rounded-md p-6 bg-background">
            <h3 className="font-medium mb-4">General Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm mb-1">
                  Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  defaultValue={user?.name}
                  onChange={(e) => setName(e.target.value)} // Update name state
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission
                  updateName(); // Call the updateName function
                }}
                disabled={userUploadLoading} // Disable button while updating
                className="bg-primary hover:scale-105 transition-all duration-300 ">
                  update name
              </Button>
            </div>
          </div>

          {/* Security */}
          <div className="border rounded-md p-6 bg-background">
            <h3 className="font-medium mb-4">Security</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-1">
                  Password
                </label>
                <div className="w-full p-2 h-10 border rounded">
                  ***********
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm mb-1">
                  Phone number
                </label>
                <Input
                  id="phone"
                  type="number"
                  defaultValue={user?.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="hidden md:block"></div>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="bg-primary hover:scale-105 transition-all duration-300 hover:bg-rose-700 hidden md:block"
              >
                Change password
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default form submission behavior
                  updatePhoneNumber();
                }}
                disabled={userUploadLoading} // Disable button while updating
                className="bg-primary hover:scale-105 transition-all duration-300 hidden md:block"
              >
              update phone number
                
              </Button>
              <Button
                onClick={updatePhoneNumber}
                className="bg-primary hover:scale-105 transition-all duration-300 hover:bg-rose-700 text-xs block md:hidden"
              >
                Change phone number
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="bg-primary hover:scale-105 transition-all duration-300 hover:bg-rose-700 text-xs block md:hidden"
              >
                Change password
              </Button>
            </div>
          </div>
        </div>
      </div>
      {<PasswordChangePopup open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ProfilePage;
