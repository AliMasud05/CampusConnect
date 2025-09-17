"use client";
import { useGetMeQuery } from "@/redux/api/authApi";
import getUserInfo from "@/utils/getUserInfo";
import Image from "next/image";
import GetHeaderTitle from "./GetHeaderTitle";

function Header() {
    const user = getUserInfo();
  const Admin =useGetMeQuery(({}))
  console.log(Admin?.data?.data?.profileImage,"Admin Data");
  return (
    <header className="fixed top-0 left-0 right-0 z-0 h-20 flex items-center justify-between px-4 lg:px-8 bg-white md:bg-transparent">
      {/* Spacer for mobile */}
      <div className="flex items-center gap-2 pl-12 lg:pl-0">
        <h1 className="text-lg font-semibold">
          <GetHeaderTitle />
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <h1>{Admin?.data?.name || user?.name}</h1>
        <Image
          src={Admin?.data?.data?.profileImage || "https://avatar.iran.liara.run/public"}
          alt="Logo"
          width={1000}
          height={1000}
          className="h-12 w-12 border border-amber-950 rounded-full cursor-pointer "
        />
      </div>
    </header>
  );
}

export default Header;


