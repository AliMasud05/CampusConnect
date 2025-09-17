"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import ProfileSidebarContent from "./ProfileSidebarContent";

const ProfileSidebar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="sticky top-0 z-50 flex h-fit">
      {" "}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden absolute top-4  z-10">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-56">
          <ProfileSidebarContent setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-56 bg-white shadow-md">
        <ProfileSidebarContent setOpen={setOpen} />
      </div>
    </div>
  );
};

export default ProfileSidebar;
