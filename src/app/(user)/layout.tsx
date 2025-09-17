import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import type React from "react"; // Import React
import {
  MdOutlineSchool,
  MdOutlineReplay,
  MdOutlineLockReset,
} from "react-icons/md";

const navLinks = [

  {
    icon: <MdOutlineReplay />, // Symbolizes refund/return
    href: "/user/refund-request",
    label: "Refund Request",
  },
  {
    icon: <MdOutlineLockReset />, // Specifically represents password reset/change
    href: "/user/change-password",
    label: "Change Password",
  },
  {
    icon: <MdOutlineSchool />, // Represents learning or courses
    href: "/user/my-courses",
    label: "My Courses",
  },
  {
    icon: <MdOutlineReplay />, // Symbolizes refund/return
    href: "/user/refund-request",
    label: "Refund Request",
  },
  {
    icon: <MdOutlineLockReset />, // Specifically represents password reset/change
    href: "/user/change-password",
    label: "Change Password",
  },
];

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <div className="min-h-screen bg-background">
          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger
              asChild
              className="lg:hidden  fixed left-4 top-4 z-50"
            >
              <Button className="bg-white  border" size="icon">
                <Menu className="h-6 w-6 text-black bg-white" />

                {/* <span className="sr-only">Toggle navigation menu</span> */}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-white">
              <Sidebar navLinks={navLinks} />
            </SheetContent>
          </Sheet>

          {/* Desktop Nav */}
          <div className="hidden lg:block fixed inset-y-0 bg-[#ffffff] text-black left-0 w-64  bg-card">
            <Sidebar navLinks={navLinks} />
          </div>

          {/* Main Content */}
          <div className="lg:pl-64 overflow-y-hidden">
            <Header />
            <main className="p-4  h-full  overflow-y-auto ">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
