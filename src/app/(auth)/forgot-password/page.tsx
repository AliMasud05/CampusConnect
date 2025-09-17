"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [ForgotPasswordFn, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here

    try {
      const res = await ForgotPasswordFn(email).unwrap();
      if (res.success) {
        toast.success("Password reset code sent successfully");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to send code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Forget Password?</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Enter the email address or mobile phone number associated with your RandM account.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" />
              </div>
              <Button type="submit" className="w-full flex gap-2 bg-primary hover:bg-primary/80">
                {isLoading ? "Sending..." : "SEND CODE"}
                {isLoading ? <FaSpinner className="animate-spin" size={10} /> : <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-sm">
              Already have account?{" "}
              <Link href="/authenticate" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
            <p className="text-sm">
              Don&apos;t have account?{" "}
              <Link href="/authenticate" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
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
  );
}
