"use client";
import SignupComponent from "@/components/auth/SignupComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginMutation } from "@/redux/api/authApi";
import setAccessToken from "@/service/actions/setAccessToken";
import { LocalStorageUtil } from "@/service/localstorage";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const [loginFN, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginFN(userFormData).unwrap();
      setAccessToken(res.data.token);
      LocalStorageUtil.setItem("token", res.data.token);
      toast.success("Login successful");
      router.push("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh]  flex items-center justify-center">
      <Tabs defaultValue="password" className="w-[424px] shadow-2xl  rounded-sm ">
        <TabsList className="grid w-full grid-cols-2 border-b p-0 m-0 bg-white">
          <TabsTrigger
            className="shadow-none  data-[state=active]:shadow-none  data-[state=active]:rounded-none border-b data-[state=active]:border-b-primary rounded-none border-2 "
            value="account"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            className="shadow-none data-[state=active]:shadow-none border-b data-[state=active]:rounded-none data-[state=active]:border-b-primary rounded-none border-2"
            value="password"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className=" mt-2 bg-white rounded-md  z-50 text-black">
            <div className="p-6">
              <div className="mb-6 text-center">
                <h1 className="text-xl font-semibold text-gray-900">Sign in to your account</h1>
              </div>

              <div className="">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      value={userFormData.email}
                      onChange={(e) => setUserFormData((prev) => ({ ...prev, email: e.target.value }))}
                      id="email"
                      type="email"
                      className="h-12"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:text-rose-600">
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
                    {isLoading ? (
                      <FaSpinner className="animate-spin h-5 w-5" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </form>

                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                    Don&apos;t have account
                  </span>
                </div>

                <Button
                  variant="outline"
                  className="h-12 w-full border-rose-500 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                >
                  CREATE ACCOUNT
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <SignupComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
