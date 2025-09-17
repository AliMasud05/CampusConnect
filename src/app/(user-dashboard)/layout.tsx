import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LiaIdBadgeSolid } from "react-icons/lia";
import { GiReceiveMoney } from "react-icons/gi";
import { RiLockPasswordLine } from "react-icons/ri";

import type React from "react"; // Import React
import { MdOutlineSchool } from "react-icons/md";

const navLinks = [
    {
      icon: <MdOutlineSchool />, // Represents learning or courses
      href: "/user-dashboard",
      label: "My Profile",
    },
  {
    icon: <LiaIdBadgeSolid />,
    href: "/user-dashboard/my-courses",
    label: "My Courses",
  },
  {
    icon: <GiReceiveMoney />,
    href: "/user-dashboard/refund-request",
    label: "Refund Request",
  },
  {
    icon: <RiLockPasswordLine />,
    href: "/user-dashboard/profile-settings",
    label: "Profile Settings",
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <div className="min-h-screen bg-white">
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
          <div className="hidden lg:block fixed inset-y-0 bg-[#ffffff] text-black left-0 w-68  bg-card">
            <Sidebar navLinks={navLinks} />
          </div>

          {/* Main Content */}
          <div className="lg:pl-68 overflow-y-hidden">
            <Header />
            <main className="p-4  h-full  overflow-y-auto ">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
