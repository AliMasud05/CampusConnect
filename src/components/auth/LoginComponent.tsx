"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation } from "@/redux/api/authApi";
import setAccessToken from "@/service/actions/setAccessToken";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

export default function LoginComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginFN, { isLoading }] = useLoginMutation();
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const popupRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginFN(userFormData).unwrap();
  
      setAccessToken(res.data.token);
      // clg
      // dispatch(setUser({

      // }))
      // LocalStorageUtil.setItem(authKey, res.data.token);
      toast.success("Login successful");
      router.push("/");
      setIsOpen(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      // close if clicking outside

      className="relative"
    >
      {/* Profile Icon Button */}
      <div
        onClick={toggleDropdown}
        className="relative shadow-none hover:bg-transparent dark:hover:bg-transparent !bg-secondary cursor-pointer rounded-full"
        aria-label="Profile"
      >
        <User className="h-6 w-6" />
      </div>

      {/* Login Dropdown */}
      {isOpen && (
        <div ref={popupRef} className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 text-black">
          <div className="p-6">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-semibold text-gray-900">Sign in to your account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  value={userFormData.email}
                  onChange={(e) => setUserFormData((prev) => ({ ...prev, email: e.target.value }))}
                  id="email"
                  type="email"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-rose-600"
                  >
                    Forget Password
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    value={userFormData.password}
                    onChange={(e) => setUserFormData((prev) => ({ ...prev, password: e.target.value }))}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="h-12 w-full flex gap-2 bg-primary hover:bg-rose-600">
                {" "}
                {isLoading ? "LOGGING IN" : "LOGIN"}
                {isLoading ? <FaSpinner className="animate-spin h-5 w-5" /> : <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  Don&apos;t have account
                </span>
              </div>

              <Link href={"/authenticate"}>
                <Button
                  variant="outline"
                  className="h-12 w-full border-primabg-primary text-primabg-primary hover:bg-rose-50 hover:text-rose-600"
                >
                  CREATE ACCOUNT
                </Button>
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
