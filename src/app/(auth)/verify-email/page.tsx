"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/redux/api/authApi";
import setAccessToken from "@/service/actions/setAccessToken";
import { LocalStorageUtil } from "@/service/localstorage";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

function VerifyEmail() {
  const params = useSearchParams();
  const email = params.get("email");
  const [verifyOtpFn, { isLoading }] = useVerifyOtpMutation();
  const [resendOptFn] = useResendOtpMutation();
  const router = useRouter();



  const [otp, setOtp] = React.useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle otp logic here


    try {
      const res = await verifyOtpFn({ email: email ?? "", otp: Number(otp) }).unwrap();

  

      //   {
      //     "success": true,
      //     "message": "OTP verified successfully.",
      //     "data": {
      //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0MTUyNTIxLWMxYmItNDMzNy05NmM0LWNkZTc3ODMyYWE1ZCIsImVtYWlsIjoibm92YUBvbGV0dGVycy5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc0Mjk3MTM1NiwiZXhwIjoxNzQ1NTYzMzU2fQ.DLU3FodAXbpzEEdtUmMLbrIyYm4L_XRjshycYpvNpVM"
      //     }
      // }

      setAccessToken(res.data.token);

      LocalStorageUtil.setItem('token', res.data.token);

      router.push("/");

      toast.success("OTP verified successfully.");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      toast.error(error.data.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOptFn({ email: email ?? "" }).unwrap();
      toast.success("OTP sent successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      toast.error(error.data.message);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold"> Verify your email address</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              We have sent you an email with your verification code. please don&apos;t share your code with anyone.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Code</Label>
                  <Input id="otp" type="number" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="" />
                </div>
                <Button type="submit" className="w-full uppercase bg-primary hover:bg-primary/80">
                  {isLoading ? "Submitting" : "Submit CODE"}
                  {isLoading ? (
                    <FaSpinner size={10} className="animate-spin" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={handleResendOtp}
                className="text-primary text-sm cursor-pointer hover:underline transition-all duration-300 mb-2"
              >
                Resend Otp
              </button>

              <p className="text-sm">
                You may{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact us
                </Link>{" "}
                for help restoring access to your account.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VerifyEmail;
