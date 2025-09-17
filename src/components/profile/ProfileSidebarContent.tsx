"use client";
import { authKey } from "@/constants/authkey";
import { deleteCookies } from "@/service/actions/deleteCookies";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface ProfileSidebarContentProps {
  setOpen: (open: boolean) => void;
}

const ProfileSidebarContent = ({ setOpen }: ProfileSidebarContentProps) => {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(authKey);
    deleteCookies([authKey]);
    setOpen(false);
    router.push("/");
  };

  return (
    <div className="h-full flex flex-col">
      <nav className="flex flex-col h-full">
        <div className="flex-1">
          <Link
            href={"/profile"}
            className={` ${
              pathname === "/profile" ? "bg-primary text-white" : ""
            } block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-all duration-300 hover:text-primary`}
          >
            User Profile
          </Link>
          <Link
            href="/user-orders"
            className={` ${
              pathname === "/user-orders" ? "bg-primary text-white" : ""
            } block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-all duration-300 hover:text-primary`}
            onClick={() => setOpen(false)}
          >
            Orders
          </Link>
          <Link
            href="/user-address"
            className={` ${
              pathname === "/user-address" ? "bg-primary text-white" : ""
            } block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-all duration-300 hover:text-primary`}
            onClick={() => setOpen(false)}
          >
            Address
          </Link>
          {/* <Link
            href="/payments"
            className={` ${
              pathname === "/payments" ? "bg-primary text-white" : ""
            } block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-all duration-300 hover:text-primary`}
            onClick={() => setOpen(false)}
          >
            Payments
          </Link> */}
        </div>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-start flex items-center cursor-pointer  text-rose-600 hover:text-rose-700"
          >
            <span>Log Out</span>
            <LogOut className="ml-2 h-4 w-4" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfileSidebarContent;
