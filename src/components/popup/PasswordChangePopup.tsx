"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "@/redux/api/authApi";

export default function PasswordChangePopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePasswordFn, { isLoading: updatePasswordLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      // Call the mutation to update the password
      const response = await updatePasswordFn({  newPassword,oldPassword}).unwrap();
      if (response.success) {
        toast.success("Password updated successfully!");
        setOpen(false); // Close the dialog
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password. Please check your old password.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Change password</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="old-password">Old password</Label>
          <div className="relative">
            <Input
              id="old-password"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showOldPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
        </div>
  
        {/* Validation Error Message */}
        {newPassword !== confirmPassword && confirmPassword !== "" && (
          <p className="text-red-500 text-sm">New password and confirm password do not match.</p>
        )}
  
        <Button
          type="submit"
          disabled={updatePasswordLoading}
          className={`w-full bg-primary cursor-pointer ${
            updatePasswordLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
        >
          {updatePasswordLoading ? "Updating..." : "Save changes"}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
  );
}