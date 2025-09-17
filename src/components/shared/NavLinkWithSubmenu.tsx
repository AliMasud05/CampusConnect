"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLinkWithSubmenuProps {
  icon: React.ReactNode
  href: string
  label: string
  children: React.ReactNode
  subItems: {
    href: string
    label: string
  }[]
}

function NavLinkWithSubmenu({ icon, href, label, subItems }: NavLinkWithSubmenuProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(subItems.some((item) => pathname.startsWith(item.href)))

  const isActive = pathname === href || pathname.startsWith(href)

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full p-[14px_16px] gap-2 rounded-[8px] transition-colors",
          isActive ? "bg-[#b52020] text-black font-medium" : "text-[#817F9B] hover:bg-[#F5F5F5] hover:text-black",
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="ml-8 mt-1 flex flex-col gap-1">
          {subItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "p-[10px_16px] rounded-[8px] transition-colors",
                pathname === item.href
                  ? "bg-[#fbe7e8] text-[#D00E11] font-medium"
                  : "text-[#817F9B] hover:bg-[#F5F5F5] hover:text-black",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavLinkWithSubmenu

