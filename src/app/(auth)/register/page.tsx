/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import authLogo from "@/assets/authLogo.png";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useGoogleLoginMutation, useRegisterMutation } from "@/redux/api/authApi";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
// import logo_bg from '@/assets/login/logo-bg.png'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "@/utils/firebase";
import Cookies from "js-cookie";
import getUserInfo from "@/utils/getUserInfo";



const registerSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();  
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
    const [googleLoginFN] = useGoogleLoginMutation();
        const [googleLoading, setGoogleLoading] = useState(false);
    
        const provider = new GoogleAuthProvider();

  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data).unwrap();
      
      // Check if response is valid
      if (response?.success) {
        toast.success("Registration successful!", {
          description: response.message || "You can now log in",
        });
        reset();
        router.push(`/verify-email?email=${data.email}`);
      } else {
        throw new Error(response?.message || "Registration failed");
      }
    } catch (error: any ) {
      // Handle different types of errors
      let errorMessage = "Registration failed";
      
      if (error?.data) {
        // If error has data property (from unwrap)
        errorMessage = error.data.message || errorMessage;
      } else if (error?.message) {
        // If error has message property
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      toast.error("Error", {
        description: errorMessage,
      });
    }
  };

const handleGoogleRegister = async () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("handleGoogleSignIn", result);
      console.log(user.displayName);
      console.log(user.email);
      console.log(user.emailVerified);
      console.log(user.photoURL);
      //send this data to backend
      const response = await googleLoginFN({
        email: user.email,
        profileImage: user.photoURL || "",
        name: user.displayName || "",
      }).unwrap();
      console.log(response);

      if (response?.success) {
        // If email is verified, proceed with normal login
        toast.success("Login successful!", {
          description: response.message || "Welcome back!",
        });

        // Store token in cookies and localStorage
        if (response.data?.token) {
          // Store in cookie
          Cookies.set("token", response.data.token, { expires: 1, path: "/" });

          // Store in localStorage if needed
          localStorage.setItem("token", response.data.token);

          // Dispatch user to Redux store
          const user = getUserInfo();
          console.log(user, "user");
          if (user?.role == "SUPER_ADMIN") {
            router.push("/dashboard");
          } else {
            router.push("/user-dashboard");
          }

          console.log(response.data);
        }
      }
    })
    .catch((error) => {
      console.error(error);
      // ...
    });

  console.log("handleGoogleSignIn");

  setGoogleLoading(true);
};

  return (
    <section className="min-h-screen flex">
      {/* Left - Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-no-repeat bg-cover bg-center items-center justify-center gradient_bg ">
        <div
          // style={{
          //   backgroundImage: `url(${logo_bg.src})`,
          //   width: "100%",
          //   height: "100%",
          // }}
          className="flex items-center justify-center "
        >
          <div className="relative  ">
            <div className="w-96 xxl:w-[1000px] h-96  flex items-center justify-center">
              <Link href={"/"}>
                <Image src={authLogo} alt="Website Logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-300">
            {/* Logo */}
            <div className="flex items-center justify-center pb-6">
              <Link href="/" className="flex items-center">
                <Image src={logo} alt="Website Logo" width={40} height={40} />
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Create an account
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Create your free account to access courses, tools, and exclusive
                downloads.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="Name"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-secondary focus:border-text-secondary outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="email@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-secondary focus:border-text-secondary outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-secondary focus:border-text-secondary outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full bg-text-secondary hover:bg-primary disabled:bg-primary/70 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={googleLoading}
                className="cursor-pointer w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              >
                <FcGoogle className="w-5 h-5 mr-3" />
                <span className="text-gray-700 font-medium">
                  Register with Google
                </span>
              </button>

              {/* Already have an account */}
              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline font-medium hover:underline transition-colors duration-200"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}