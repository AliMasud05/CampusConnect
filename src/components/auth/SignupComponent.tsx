"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

interface SignupFormInputs {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function SignupComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const [registrationFn, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: SignupFormInputs) => {
    // check for

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    const reformedData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
    };

    try {
      await registrationFn(reformedData).unwrap();
      toast.success("Registration successful, Please verify your email to login");
      router.push(`/verify-email?email=${data.email}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      toast.error(error.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            id="name"
            type="text"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            {...register("phone", {
              required: "Phone number is required",
            })}
            id="phone"
            type="number"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-3 rounded flex gap-2 items-center justify-center font-medium"
        >
          {isLoading ? "SIGNING UP" : "SIGN UP"}
          {isLoading ? <FaSpinner className="animate-spin" size={18} /> : <ArrowRight className="ml-2" size={18} />}
        </button>
      </form>
    </div>
  );
}
