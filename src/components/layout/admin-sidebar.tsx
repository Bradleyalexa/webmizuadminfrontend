"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ClipboardList,
  Wrench,
  CalendarDays,
  UserCog,
  Receipt,
  BarChart3,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
  Briefcase,
  Droplets,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Contracts", href: "/admin/contracts", icon: FileText },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Tasks", href: "/admin/tasks", icon: CalendarDays },
  { label: "Technicians", href: "/admin/technicians", icon: UserCog },
  { label: "Invoices", href: "/admin/invoices", icon: Receipt },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Support Chat", href: "/admin/chat", icon: MessageSquare },
]

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const isFirstRender = useRef(true)

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onClose()
  }, [pathname, onClose])

  return (
    <TooltipProvider delayDuration={0}>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          onTouchEnd={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-[#0A2540] text-white transition-all duration-200 ease-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-16" : "lg:w-64",
          "w-64",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-3 group">
               <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-200">
                 <Image 
                    src="/logo.jpg" 
                    alt="Mizu Firuta" 
                    fill
                    className="object-contain" // The white bg of jpg will blend with bg-white container
                 />
               </div>
               <div className="flex flex-col">
                   <span className="font-heading text-lg font-bold bg-gradient-to-r from-cyan-100 via-white to-cyan-100 bg-clip-text text-transparent filter drop-shadow-sm leading-none">
                     Mizu Firuta
                   </span>
                   <span className="text-[10px] text-cyan-200/70 font-medium tracking-wider uppercase">
                     Admin Panel
                   </span>
               </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose()
              } else {
                setCollapsed(!collapsed)
              }
            }}
            className={cn("h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white", collapsed && "mx-auto")}
          >
            <X className="h-4 w-4 lg:hidden" />
            {collapsed ? (
              <ChevronRight className="h-4 w-4 hidden lg:block" />
            ) : (
              <ChevronLeft className="h-4 w-4 hidden lg:block" />
            )}
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => {
              const isActive = isActiveLink(item.href)
              const Icon = item.icon

              const linkContent = (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out",
                    isActive ? "bg-[#00C49A] text-white" : "text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed && "lg:justify-center lg:px-2",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
                </Link>
              )

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="bg-[#0A2540] text-white hidden lg:block">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return <div key={item.href}>{linkContent}</div>
            })}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  )
}
