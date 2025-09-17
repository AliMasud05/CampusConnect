"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authKey } from "@/constants/authkey";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// import NEXT_PUBLIC_BASE_URL from env

const url = process.env.NEXT_PUBLIC_BASE_URL;

const fullUrl = `${url}/auth/reset-password`;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useSearchParams();

  const token = params.get("token");

  const router = useRouter();

  // const [resetPasswordFn, { isLoading }] = useResetPasswordMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Invalid token");
        return;
      }
      localStorage.setItem(authKey, JSON.stringify(token));
    } catch {
      toast.error("Invalid token");
      return;
    }

    // check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // const res = await resetPasswordFn({ password }).unwrap();
      // use raw fetch
      // send  authorization header

      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ password: password }),
      }).then((res) => res.json());

      if (res.success) {
        toast.success("Password reset successful. You can now login.");
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message);
    } finally {
      // localStorage.removeItem(authKey);
    }

    // Handle password reset logic here
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-white">
      <Card className="w-full max-w-md shadow-sm border-gray-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl font-medium">Reset Password</CardTitle>
          <p className="text-center text-gray-500 text-sm mt-2">
            To create a strong password use special characters and don&apos;t share it with anyone.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8+ characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full border-primary bg-primary hover:bg-primary/80">
              RESET PASSWORD
              <span className="ml-2">→</span>
            </Button>

            <div className="text-center text-sm text-gray-500">
              You may{" "}
              <a href="#" className="text-primary hover:underline">
                contact us
              </a>{" "}
              for help restoring access to your account.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
