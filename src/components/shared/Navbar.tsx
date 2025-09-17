"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import logo from "@/assets/WebsiteLogo.png";
import { LayoutDashboard } from "lucide-react";

interface DecodedToken {
  role: string; // Assuming the JWT contains a 'role' field
}

// Helper function to get cookie value by name
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Helper function to get user info from token in cookie
const getUserInfo = (): DecodedToken | null => {
  try {
    const token = getCookie("token");
    if (!token) return null;
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default function Navbar() {
  const router = useRouter();
  const user = getUserInfo();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear the token cookie by setting an expired date
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 bg-secondary/30 lg:bg-transparent backdrop-blur-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Website Logo" width={68} height={80} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex font-medium items-center space-x-8 bg-[#BCBCBC66] px-6 py-4 border border-gray-300 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href ? "text-primary" : "text-text-primary"
              } text-[#008000]`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end space-x-4 w-9/12 lg:w-auto pr-2">
          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === "SUPER_ADMIN" ? (
                <Link href="/dashboard" passHref>
                  <button className="cursor-pointer bg-[#014C00] border border-primary text-white hover:text-primary hover:bg-transparent rounded-full px-8 py-3 flex items-center space-x-2 transition duration-300 ease-in-out">
                    <LayoutDashboard />
                  </button>
                </Link>
              ) : (
                <Link href="/user-dashboard" passHref>
                  <button className="cursor-pointer bg-[#014C00] border border-primary text-white hover:text-primary hover:bg-transparent rounded-full px-8 py-3 flex items-center space-x-2 transition duration-300 ease-in-out">
                    <LayoutDashboard />
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-[#014C00] border border-primary text-white hover:text-primary hover:bg-transparent rounded-full px-8 py-3 flex items-center space-x-2 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" passHref>
              <button className="cursor-pointer bg-[#014C00] border border-primary text-white hover:text-primary hover:bg-transparent rounded-full px-8 py-3 flex items-center space-x-2 transition duration-300 ease-in-out">
                Log In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-primary focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full bg-secondary z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="Website Logo"
                width={40}
                height={40}
              />
            </div>
            <button
              onClick={toggleSidebar}
              className="text-primary focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-primary" : "text-black"
                } hover:text-secondary py-2 border-b border-black`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50" onClick={toggleSidebar}></div>}
    </nav>
  );
}