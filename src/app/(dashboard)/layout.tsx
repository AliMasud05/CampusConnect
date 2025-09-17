import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Tickets } from "lucide-react";

import type React from "react"; // Import React

import {
  MdOutlineMenuBook,
  MdOutlineSettings,
  MdOutlineEmail,
  MdOutlineAnalytics,
  MdOutlinePayment,
  MdOutlinePeopleAlt,
} from "react-icons/md";

const navLinks = [
  {
    icon: <MdOutlineMenuBook />,
    href: "/dashboard/manage-course",
    label: "Manage Course",
  },
  {
    icon: <MdOutlinePeopleAlt />,
    href: "/dashboard/user-management",
    label: "User Management",
  },
  {
    icon: <MdOutlinePayment />,
    href: "/dashboard/orders-payments",
    label: "Orders & Payments",
  },
  {
    icon: <MdOutlineAnalytics />,
    href: "/dashboard/reporting-analytics",
    label: "Reporting & Analytics",
  },
  {
    icon: <MdOutlineEmail />,
    href: "/dashboard/newsletter-subscribers",
    label: "Newsletter Subscribers",
  },
  {
    icon: <Tickets />,
    href: "/dashboard/coupon",
    label: "Coupon Management",
  },
  {
    icon: <MdOutlineSettings />,
    href: "/dashboard/system-settings",
    label: "System Settings",
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
              className="xl:hidden  fixed left-4 top-4 z-50"
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
          <div className="hidden xl:block fixed inset-y-0 bg-[#ffffff] text-black left-0 w-68  bg-card">
            <Sidebar navLinks={navLinks} />
          </div>

          {/* Main Content */}
          <div className="xl:pl-68 overflow-y-hidden">
            <Header />
            <main className="p-4  h-full  overflow-y-auto ">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
