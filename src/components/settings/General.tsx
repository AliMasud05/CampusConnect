// import React, { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Mail, Phone, Edit } from "lucide-react"; // Added Edit icon
// import { Input } from "../ui/input";
// import Image from "next/image";
// import { useGetMeQuery, useUpdateUSerMutation } from "@/redux/api/authApi";
// import { toast } from "sonner";

// const General = () => {
//   const [email, setEmail] = useState("store@cuanky.com");
//   const [profileName, setProfileName] = useState("Cuanky");
//   const [phone, setPhone] = useState("+12345678910");
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [uploadSingleImage] = useSingleUploadImageMutation();
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [updateUserFn, { isLoading: updateUserLoading }] = useUpdateUSerMutation();

//   const { data: userData } = useGetMeQuery({});


//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     const formData = new FormData();
//     if (file) {
//       formData.append("file", file);
//     }

//     try {
//       const response = await uploadSingleImage(formData).unwrap();

//       setImageUrl(response.data.imageUrl);
//     } catch (error) {
//       console.error(error);
//     }

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }

//     // Reset the file input value to allow re-uploading the same file
//     event.target.value = "";
//   };

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const data = {
//       name: profileName,
//       profileImage: imageUrl || userData?.data?.profileImage || "",
//     };

//     try {
//       const response = await updateUserFn(data).unwrap();
    
//       if (response.success) {
//         toast.success(response.message);
//       }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.error(error);
//       toast.error(error?.data?.message);
//     }
//   };

//   useEffect(() => {
//     if (userData?.data) {
//       setProfileName(userData.data.name);
//       setProfileImage(userData.data.profileImage);
//     }
//   }, [userData?.data]);

//   return (
//     <div>
//       <div className="space-y-8">
//         <h2 className="text-xl font-semibold mb-6">General Settings</h2>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Profile Image */}
//           <div>
//             <h3 className="font-medium mb-1">Profile Image</h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Upload or change your store&apos;s logo to give it a unique identity.
//             </p>
//             <div className="flex items-center gap-4">
//               <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 border">
//                 {profileImage ? (
//                   <Image
//                     height={50}
//                     width={50}
//                     src={profileImage}
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <label
//                     htmlFor="profile-image-upload"
//                     className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground cursor-pointer"
//                   >
//                     Image here
//                   </label>
//                 )}
//                 <input
//                   id="profile-image-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageUpload}
//                 />
//               </div>
//               <label htmlFor="profile-image-upload" className="flex items-center gap-2 cursor-pointer text-primary">
//                 <Edit className="h-5 w-5" /> {/* Pencil icon */}
//                 <span>Change Image</span>
//               </label>
//             </div>

//             {/* Profile Name */}
//             <div className="mt-5">
//               <h3 className="font-medium mb-1">Profile Name</h3>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Edit your profile name as it will appear to customers.
//               </p>
//               <Input value={profileName} onChange={(e) => setProfileName(e.target.value)} className="max-w-xs" />
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h3 className="font-medium mb-1">Contact Information</h3>
//             <p className="text-sm text-muted-foreground mb-4">
//               Set up the contact email and phone number for customer inquiries.
//             </p>
//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Mail className="h-5 w-5 text-muted-foreground" />
//                 <Input value={email} onChange={(e) => setEmail(e.target.value)} className="max-w-xs" />
//               </div>
//               <div className="flex items-center gap-2">
//                 <Phone className="h-5 w-5 text-muted-foreground" />
//                 <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="max-w-xs" />
//               </div>
//             </div>

//             <Button className="mt-4 bg-primary hover:bg-primary/90 cursor-pointer">Save Websites Contacts</Button>
//           </div>
//         </div>

//         <div className="pt-4">
//           <Button
//             disabled={updateUserLoading}
//             onClick={handleUpdateProfile}
//             className="bg-primary disabled:bg-primary/50 hover:bg-primary/90 cursor-pointer"
//           >
//             Update Profile
            
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default General;


import React from 'react'

const General = () => {
  return (
    <div>General</div>
  )
}

export default General