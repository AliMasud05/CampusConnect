/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useForgotPasswordMutation,
  useGoogleLoginMutation,
  useLoginMutation,
} from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";

import authLogo from "@/assets/authLogo.png";
import logo from "@/assets/logo.png";
import auth from "@/utils/firebase";
import getUserInfo from "@/utils/getUserInfo";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const provider = new GoogleAuthProvider();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMutation, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation();
  const [googleLoginFN] = useGoogleLoginMutation();

  const handleSignUpBtn = () => {
    router.push("/register");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();

      if (response?.success) {
        if (response.data?.message?.includes("verify your email")) {
          toast.success("Verification required", {
            description:
              response.data.message || "Please verify your email to continue",
          });
          router.push(`/verify-email?email=${data.email}`);
          return;
        }

        toast.success("Login successful!", {
          description: response.message || "Welcome back!",
        });

        if (response.data?.token) {
          document.cookie = `token=${response.data.token}; path=/; max-age=86400; SameSite=Lax`;
        }

        const user = getUserInfo();
        console.log(user, "user");
        if (user?.role == "SUPER_ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/user-dashboard");
        }
      } else {
        throw new Error(response?.message || "Login failed");
      }
    } catch (error: any) {
      let errorMessage = "Login failed";
      if (error?.data) {
        errorMessage = error.data.message || errorMessage;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast.error("Error", {
        description: errorMessage,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const response = await googleLoginFN({
          email: user.email,
          profileImage: user.photoURL || "",
          name: user.displayName || "",
        }).unwrap();

        if (response?.success) {
          toast.success("Login successful!", {
            description: response.message || "Welcome back!",
          });

          if (response.data?.token) {
            Cookies.set("token", response.data.token, {
              expires: 1,
              path: "/",
            });
            localStorage.setItem("token", response.data.token);
            const user = getUserInfo();
            if (user?.role == "SUPER_ADMIN") {
              router.push("/dashboard");
            } else {
              router.push("/user-dashboard");
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setGoogleLoading(true);
  };

  return (
    <section className="min-h-screen flex">
      {/* Left side - Logo */}
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

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-2xl xxl:max-w-6xl xxl:w-full">
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
                Welcome back
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Welcome back! Continue where you left off and keep building your
                skills.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-secondary focus:border-text-sering-text-secondary outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-text-secondary hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-text-secondary focus:border-text-sering-text-secondary outline-none transition-colors duration-200 text-gray-900 placeholder-gray-400"
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

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full bg-text-secondary hover:bg-primary disabled:bg-primary/70 text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="cursor-pointer w-full flex 
                items-center justify-center px-4 py-3 
                border border-gray-300 rounded-lg 
                hover:bg-gray-50 focus:outline-none 
                focus:ring-2 focus:ring-primary 
                focus:ring-offset-2 transition-colors 
                duration-200"
              >
                <FcGoogle className="w-5 h-5 mr-3" />
                <span className="text-gray-700 font-medium">
                  Log in with Google
                </span>
              </button>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={handleSignUpBtn}
                    disabled={googleLoading}
                    className="cursor-pointer underline font-medium hover:underline transition-colors duration-200"
                  >
                    Sign up for free
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-white/20 shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Forgot Password
              </h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail("");
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Enter your email address and we&lsquo;ll send you a link to reset
              your password.
            </p>
            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-text-secondary bg-white/70"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail("");
                }}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!forgotPasswordEmail) {
                    toast.error("Please enter your email");
                    return;
                  }
                  try {
                    const response = await forgotPasswordMutation({
                      email: forgotPasswordEmail,
                    }).unwrap();
                    if (response?.success) {
                      toast.success("Email sent", {
                        description:
                          response.message ||
                          "Please check your email for reset instructions",
                      });
                      setShowForgotPassword(false);
                      setForgotPasswordEmail("");
                    } else {
                      throw new Error(
                        response?.message || "Failed to send reset email"
                      );
                    }
                  } catch (error: any) {
                    toast.error("Error", {
                      description:
                        error?.data?.message ||
                        error?.message ||
                        "Failed to send reset email",
                    });
                  }
                }}
                disabled={isForgotPasswordLoading}
                className="px-4 py-2 bg-text-secondary cursor-pointer text-white rounded-lg hover:bg-primary disabled:bg-primary/70 transition-colors"
              >
                {isForgotPasswordLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
