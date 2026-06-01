"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Menu, 
  X, 
  Home, 
  Clock, 
  Building2, 
  CalendarCheck, 
  Bell, 
  MapPin,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/info", label: "이용안내", icon: Clock },
  { href: "/facilities", label: "시설소개", icon: Building2 },
  { href: "/reservation", label: "예약하기", icon: CalendarCheck },
  { href: "/notice", label: "공지사항", icon: Bell },
  { href: "/location", label: "오시는 길", icon: MapPin },
  { href: "/inquiry", label: "문의하기", icon: MessageSquare },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg lg:hidden"
        aria-label="메뉴 열기"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-sidebar text-sidebar-foreground shadow-xl border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-sidebar-accent text-sidebar-foreground lg:hidden"
          aria-label="메뉴 닫기"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex h-24 items-center justify-center border-b border-sidebar-border px-6">
          <Link href="/" className="flex flex-col items-center" onClick={() => setIsOpen(false)}>
            <br></br>
            <span className="text-2xl font-bold tracking-tight text-primary">서울형 키즈카페 <br></br>등촌3동점</span>
            <span className="text-sm text-sidebar-foreground/60">Seoul Kids Cafe</span>
            <br></br>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-6">
          <div className="text-center text-sm text-sidebar-foreground/60">
            <p>운영시간: 10:00 - 20:00</p>
            <p className="mt-1">Tel: 02-1234-5678</p>
          </div>
        </div>
      </aside>
    </>
  )
}
