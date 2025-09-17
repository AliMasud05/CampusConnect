"use client";

import Link from "next/link";
import NavLink from "./NavLink";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { JSX } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import getUserInfo from "@/utils/getUserInfo";
import { useGetMeQuery } from "@/redux/api/authApi";

function Sidebar({ 
  navLinks,
}: {
  navLinks: {
    icon: JSX.Element;
    href: string;
    label: string;
  }[];
}) 
{
  const router = useRouter();
  const user = getUserInfo();
  const Admin =useGetMeQuery(({}))


  

  return (
    <div className="flex px-5 flex-col h-full bg-[#d9ecd9] z-30">
      <div className="px-6 pb-6 pt-4 flex items-center justify-center ">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logo.src}
            width={1000}
            height={1000}
            alt="Logo"
            className="h-36  w-auto cursor-pointer"
          />
        </Link>
      </div>
      <nav className="flex justify-between h-full mb-10 flex-col">
        <div className="flex-1 h-full flex flex-col items-center gap-4 pb-4">
          <h4 className="text-[#363636] text-[24px]  font-normal leading-[15px]">
            Dashboard
          </h4>
          <h2 className="text-[#817F9B] text-sm font-normal leading-[30px]">
            Hi, {Admin?.data?.name || user?.name}. Welcome back!
          </h2>
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              // Render regular nav links
              return (
                <NavLink key={index} icon={link.icon} href={link.href}>
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>
         
       
          <Link
            href="/login"
            onClick={() => {
              localStorage.removeItem('token');
              document.cookie =
                "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

              router.push('/login');
            }}
            className=" flex items-center justify-start gap-4 text-lg bg-[#D9ECD9] text-[#363636]
            hover:bg-[#D9ECD9]/90 rounded-lg  py-2 transition-colors duration-200 mr-16 mt-20
            cursor-pointer hoevr:text-[#363636]/90"
          >
            <RiLogoutCircleRLine />
            <p>Logout</p>
          </Link>
          
        </div>
        <div>
          
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
